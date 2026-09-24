<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaAuthorizationValidator;
use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoEntregaService
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $repository,
        private readonly PlanoTrabalhoEntregaStoreValidator $storeValidator,
        private readonly PlanoTrabalhoEntregaAuthorizationValidator $authorizationValidator,
        private readonly TCRInvalidador $tcrInvalidador,
        private readonly AtividadeRepository $atividadeRepository,
    ) {}

    public function store(PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $plano = $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $this->storeValidator->validar($dto);

        return DB::transaction(function () use ($dto, $plano) {
            $entrega = $this->repository->create($dto->toArray());

            $this->invalidarTcrSePlanejamento($plano);

            return $entrega;
        });
    }

    public function update(string $entregaId, PlanoTrabalhoEntregaStoreDTO $dto): PlanoTrabalhoEntrega
    {
        $plano = $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $this->storeValidator->validarUpdate($dto);

        return DB::transaction(function () use ($entregaId, $dto, $plano) {
            $entrega = $this->repository->update($entregaId, $dto->toArray());

            if ($entrega === null) {
                throw new NotFoundException('Entrega do Plano de Trabalho não encontrada.');
            }

            $this->invalidarTcrSePlanejamento($plano);

            return $entrega;
        });
    }

    public function destroy(string $planoTrabalhoId, string $entregaId, ?string $consolidacaoId = null): void
    {
        $plano = $this->authorizationValidator->validar($planoTrabalhoId, Auth::id());
        $this->storeValidator->validarDestroy($planoTrabalhoId, $entregaId, $consolidacaoId);

        DB::transaction(function () use ($entregaId, $plano) {
            if ($plano->status === StatusEnum::ATIVO->value) {
                $this->removerAtividadesDePeriodosAbertos($entregaId);
            }

            $this->repository->delete($entregaId)
                || throw new \RuntimeException('Falha ao remover a entrega.');

            $this->invalidarTcrSePlanejamento($plano);
        });
    }

    private function invalidarTcrSePlanejamento(PlanoTrabalho $plano): void
    {
        if ($plano->status === StatusEnum::ATIVO->value) {
            return;
        }

        $this->tcrInvalidador->invalidar($plano->id);
    }

    private function removerAtividadesDePeriodosAbertos(string $entregaId): void
    {
        foreach ($this->atividadeRepository->idsPorEntregaEmPeriodosIncluidos($entregaId) as $atividadeId) {
            $this->atividadeRepository->delete($atividadeId);
        }
    }
}
