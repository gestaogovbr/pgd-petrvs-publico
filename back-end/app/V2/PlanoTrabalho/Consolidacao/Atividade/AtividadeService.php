<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade;

use App\Exceptions\NotFoundException;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoEntrega;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeDestroyDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeWriteValidator;
use App\V2\PlanoTrabalho\Entrega\Validators\CargaHorariaJustificativaValidator;
use Illuminate\Support\Facades\DB;

class AtividadeService
{
    public function __construct(
        private readonly AtividadeRepository $atividadeRepository,
        private readonly PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
        private readonly AtividadeAuthorizationValidator $authValidator,
        private readonly AtividadeWriteValidator $writeValidator,
        private readonly CargaHorariaJustificativaValidator $cargaHorariaJustificativaValidator,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
    ) {}

    public function store(AtividadeStoreDTO $dto): Atividade
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);
        $this->validarJustificativaEsforco(
            $dto->planoTrabalhoId(),
            $dto->planoTrabalhoEntregaId(),
            $dto->esforcoExecutado(),
            $dto->justificativa,
        );

        return DB::transaction(function () use ($dto, $plano) {
            $atividade = $this->atividadeRepository->create($dto->toPersistArray($plano->id, $plano->unidade_id));

            $this->planoTrabalhoEntregaRepository->update(
                $dto->planoTrabalhoEntregaId(),
                ['esforco_executado' => $dto->esforcoExecutado()],
            );
            $this->persistirJustificativa($dto->planoTrabalhoId(), $dto->justificativa);

            return $atividade;
        });
    }

    public function update(AtividadeUpdateDTO $dto): Atividade
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);
        $atividade = $this->writeValidator->validarExistencia($dto);

        $entregaId = $atividade->plano_trabalho_entrega_id;
        $esforcoExecutado = $dto->esforcoExecutado();

        if ($esforcoExecutado !== null) {
            $this->validarJustificativaEsforco(
                $dto->planoTrabalhoId(),
                $entregaId,
                $esforcoExecutado,
                $dto->justificativa,
            );
        }

        return DB::transaction(function () use ($dto, $atividade, $entregaId, $esforcoExecutado) {
            $this->atividadeRepository->update($dto->atividadeId(), $dto->toArray());

            if ($esforcoExecutado !== null) {
                $this->planoTrabalhoEntregaRepository->update(
                    $entregaId,
                    ['esforco_executado' => $esforcoExecutado],
                );
            }
            $this->persistirJustificativa($dto->planoTrabalhoId(), $dto->justificativa);

            return $this->atividadeRepository->findById($atividade->id);
        });
    }

    private function validarJustificativaEsforco(
        string $planoTrabalhoId,
        string $entregaId,
        float $esforcoExecutado,
        ?string $justificativa,
    ): void {
        $entrega = $this->planoTrabalhoEntregaRepository->findById($entregaId);

        if ($entrega === null) {
            throw new NotFoundException('Entrega do Plano de Trabalho não encontrada.');
        }

        $somatorios = $this->planoTrabalhoEntregaRepository->somatoriosEsforcoProjetados(
            $planoTrabalhoId,
            $entregaId,
            (float) $entrega->forca_trabalho,
            $esforcoExecutado,
        );

        $this->cargaHorariaJustificativaValidator->validar($somatorios, $justificativa);
    }

    private function persistirJustificativa(string $planoTrabalhoId, ?string $justificativa): void
    {
        if ($justificativa === null || $justificativa === '') {
            return;
        }

        $this->planoTrabalhoRepository->update($planoTrabalhoId, [
            'justificativa' => $justificativa,
        ]);
    }

    public function destroy(AtividadeDestroyDTO $dto): void
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);
        $atividade = $this->writeValidator->validarExistencia($dto);

        DB::transaction(function () use ($dto, $atividade) {
            $entrega = PlanoTrabalhoEntrega::query()->findOrFail($atividade->plano_trabalho_entrega_id);

            $this->atividadeRepository->delete($dto->atividadeId());

            $this->planoTrabalhoEntregaRepository->update(
                $entrega->id,
                ['esforco_executado' => $entrega->forca_trabalho],
            );
        });
    }
}
