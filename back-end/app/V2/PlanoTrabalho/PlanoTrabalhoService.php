<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoCloneDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoEntregaCloneDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoArquivarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoClonarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoEncerrarValidator;
use App\V2\StatusService;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\V2\Traits\ValidaAutorizacaoTrait;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoService
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoWriteRepositoryContract $writeRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoStoreValidator $storeValidator,
        private readonly PlanoTrabalhoUpdateValidator $updateValidator,
        private readonly PlanoTrabalhoDestroyValidator $destroyValidator,
        private readonly PlanoTrabalhoCancelarValidator $cancelarValidator,
        private readonly PlanoTrabalhoEncerrarValidator $encerrarValidator,
        private readonly PlanoTrabalhoArquivarValidator $arquivarValidator,
        private readonly PlanoTrabalhoClonarValidator $clonarValidator,
        private readonly PlanoTrabalhoIndexValidator $indexValidator,
        private readonly StatusService $statusService,
        private readonly TCRInvalidador $tcrInvalidador,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}


    public function index(array $data): LengthAwarePaginator
    {
        $filtro = PlanoTrabalhoIndexDTO::fromRequest($data, Auth::id());
        $filtro = $this->indexValidator->validar($filtro);

        if ($filtro->subordinadas && $filtro->unidadesId) {
            $idsBase = $filtro->unidadesId;
            $subordinadasIds = $this->unidadeRepository->getSubordinadasRecursivas($idsBase)->pluck('id')->toArray();
            $filtro = $filtro->withUnidadesId(array_merge($idsBase, $subordinadasIds));
        }

        return $this->readRepository->buscarPlanosListagem($filtro);
    }

    public function store(array $data): PlanoTrabalho
    {
        $dto = PlanoTrabalhoStoreDTO::fromArray($data, Auth::id());
        $this->storeValidator->validarAutorizacao($dto);
        $this->storeValidator->validar($dto);

        return $this->writeRepository->create($dto->toArray());
    }

    public function update(string $id, array $data): PlanoTrabalho
    {
        $plano = $this->readRepository->findById($id);

        if ($plano === null) {
            throw new NotFoundException( 'Plano de Trabalho não encontrado.');
        }

        $dto = PlanoTrabalhoStoreDTO::fromArray($data, Auth::id());
        $this->storeValidator->validarAutorizacao($dto);
        $this->updateValidator->validar($dto, $id);

        return DB::transaction(function () use ($id, $dto) {
            $updated = $this->writeRepository->update($id, $dto->toArray());

            if ($updated === null) {
                throw new NotFoundException('Não foi possível atualizar o Plano de Trabalho.');
            }

            $this->tcrInvalidador->invalidar($id);

            return $updated;
        });
    }

    public function show(string $id): PlanoTrabalho
    {
        $plano = $this->readRepository->findByIdComRelacoes($id);

        if ($plano === null) {
            throw new NotFoundException( 'Plano de Trabalho não encontrado.');
        }

        if (!$this->isDonoOuChefia($plano, Auth::id(), $plano->unidade_id)) {
            $this->stripAfastamentos($plano);
        }

        return $plano;
    }

    public function destroy(string $id): bool
    {
        $this->destroyValidator->validar($id, Auth::id());

        return $this->writeRepository->delete($id);
    }

    public function statuses(): array
    {
        return PlanoTrabalho::STATUSES;
    }

    public function cancelar(string $id, string $justificativa): PlanoTrabalho
    {
        $plano = $this->cancelarValidator->validar($id, Auth::id());

        $this->statusService->atualizaStatus(
            $plano,
            StatusEnum::CANCELADO->value,
            'Plano cancelado. Justificativa: ' . $justificativa,
        );

        return $plano;
    }

    public function encerrar(string $id, string $justificativa): PlanoTrabalho
    {
        $plano = $this->encerrarValidator->validar($id, Auth::id());

        DB::transaction(function () use ($id, $plano, $justificativa) {
            $dataEncerramento = now()->format('Y-m-d');

            $this->writeRepository->update($id, [
                'encerrado_at' => $dataEncerramento,
                'data_fim' => $dataEncerramento,
            ]);

            // Ajustar data_fim do período vigente para a data do encerramento
            $this->consolidacaoRepository->ajustarDataFimVigente($id, $dataEncerramento);

            // Concluir todas as consolidações restantes
            $this->consolidacaoRepository->concluirTodas($id);

            $this->statusService->atualizaStatus(
                $plano,
                StatusEnum::CONCLUIDO->value,
                'Plano encerrado antecipadamente. Justificativa: ' . $justificativa,
            );
        });

        return $plano->refresh();
    }

    public function arquivar(string $id): PlanoTrabalho
    {
        $plano = $this->arquivarValidator->validar($id, Auth::id());

        $this->writeRepository->update($id, ['data_arquivamento' => now()]);

        return $plano->refresh();
    }

    public function clonar(string $id): PlanoTrabalho
    {
        $planoOriginal = $this->clonarValidator->validar($id, Auth::id());
        $planoDTO = PlanoTrabalhoCloneDTO::fromPlanoTrabalho($planoOriginal, Auth::id());

        return DB::transaction(function () use ($planoOriginal, $planoDTO) {
            $clone = $this->writeRepository->create($planoDTO->toArray());

            $planoOriginal->load('entregas.planoEntregaEntrega');

            foreach ($planoOriginal->entregas as $entrega) {
                $entregaDTO = PlanoTrabalhoEntregaCloneDTO::fromEntrega($entrega);

                if ($entregaDTO === null) {
                    continue;
                }

                $clone->entregas()->create($entregaDTO->toArray());
            }

            return $clone;
        });
    }


    private function stripAfastamentos(PlanoTrabalho $plano): void
    {
        if (!$plano->relationLoaded('consolidacoes')) {
            return;
        }

        $plano->consolidacoes->each(fn ($c) => $c->unsetRelation('afastamentos'));
    }
}
