<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia;

use App\Enums\StatusEnum;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaImpactoDTO;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class OcorrenciaImpactoPolicy
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
    ) {}

    public function calcularImpacto(OcorrenciaOperacaoDTO $dto): OcorrenciaImpactoDTO
    {
        $rows = $this->consolidacaoRepository->findConsolidacoesParaImpactoDispensa($dto->usuarioId, $dto->dataInicio, $dto->dataFim);

        if ($rows->isEmpty()) {
            return OcorrenciaImpactoDTO::semImpacto();
        }

        $comMudanca = $rows->filter(fn (object $row) => $this->mudaEstadoDispensa($row, $dto));

        if ($comMudanca->isEmpty()) {
            return OcorrenciaImpactoDTO::semImpacto();
        }

        $geraDispensa = false;
        $removeDispensa = false;

        foreach ($comMudanca as $row) {
            if ($this->isDispensadaAtual($row, $dto)) {
                $removeDispensa = true;
            } else {
                $geraDispensa = true;
            }
        }

        $bloqueada = $comMudanca->contains(fn (object $row) =>
            $row->pt_status === StatusEnum::CONCLUIDO->value
            && ($row->has_recurso || $row->is_prazo_avaliacao_terminado)
        );

        return OcorrenciaImpactoDTO::fromFlags($geraDispensa, $removeDispensa, $bloqueada);
    }

    private function isDispensadaAtual(object $row, OcorrenciaOperacaoDTO $dto): bool
    {
        $vigenciaPT = CarbonPeriod::create(
            Carbon::parse($row->pt_data_inicio)->startOfDay(),
            Carbon::parse($row->pt_data_fim)->startOfDay(),
        );

        $periodoConsolidacao = CarbonPeriod::create(
            Carbon::parse($row->cons_data_inicio)->startOfDay(),
            Carbon::parse($row->cons_data_fim)->startOfDay(),
        );

        return $this->dispensaPolicy->isConsolidacaoDispensada($dto->usuarioId, $vigenciaPT, $periodoConsolidacao);
    }

    private function mudaEstadoDispensa(object $row, OcorrenciaOperacaoDTO $dto): bool
    {
        $vigenciaPT = CarbonPeriod::create(
            Carbon::parse($row->pt_data_inicio)->startOfDay(),
            Carbon::parse($row->pt_data_fim)->startOfDay(),
        );

        $periodoConsolidacao = CarbonPeriod::create(
            Carbon::parse($row->cons_data_inicio)->startOfDay(),
            Carbon::parse($row->cons_data_fim)->startOfDay(),
        );

        $isDispensada = $this->dispensaPolicy->isConsolidacaoDispensada($dto->usuarioId, $vigenciaPT, $periodoConsolidacao);

        $seraDispensada = $this->dispensaPolicy->isConsolidacaoDispensadaApos(
            $dto->usuarioId,
            $vigenciaPT,
            $periodoConsolidacao,
            $dto->isExclusao() ? null : $dto->dataInicio,
            $dto->isExclusao() ? null : $dto->dataFim,
            $dto->ocorrenciaId,
        );

        return $isDispensada !== $seraDispensada;
    }
}
