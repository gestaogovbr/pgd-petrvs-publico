<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia;

use App\Enums\StatusEnum;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaImpactoDTO;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class OcorrenciaImpactoPolicy
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
    ) {}

    public function calcularImpacto(string $usuarioId, string $dataInicio, string $dataFim, ?string $ocorrenciaId, string $operacao): OcorrenciaImpactoDTO
    {
        $rows = $this->consolidacaoRepository->findConsolidacoesParaImpactoDispensa($usuarioId, $dataInicio, $dataFim);

        if ($rows->isEmpty()) {
            return OcorrenciaImpactoDTO::semImpacto();
        }

        $isExclusao = $operacao === 'excluir';

        $comMudanca = $rows->filter(fn (object $row) => $this->mudaEstadoDispensa($row, $usuarioId, $dataInicio, $dataFim, $ocorrenciaId, $isExclusao));

        if ($comMudanca->isEmpty()) {
            return OcorrenciaImpactoDTO::semImpacto();
        }

        $bloqueada = $comMudanca->contains(fn (object $row) =>
            $row->pt_status === StatusEnum::CONCLUIDO->value
            && ($row->has_recurso || $row->is_prazo_avaliacao_terminado)
        );

        if ($bloqueada) {
            return OcorrenciaImpactoDTO::bloqueada();
        }

        return OcorrenciaImpactoDTO::comImpacto();
    }

    private function mudaEstadoDispensa(object $row, string $usuarioId, string $dataInicio, string $dataFim, ?string $ocorrenciaId, bool $isExclusao): bool
    {
        $vigenciaPT = CarbonPeriod::create(
            Carbon::parse($row->pt_data_inicio)->startOfDay(),
            Carbon::parse($row->pt_data_fim)->startOfDay(),
        );

        $periodoConsolidacao = CarbonPeriod::create(
            Carbon::parse($row->cons_data_inicio)->startOfDay(),
            Carbon::parse($row->cons_data_fim)->startOfDay(),
        );

        $isDispensada = $this->dispensaPolicy->isConsolidacaoDispensada($usuarioId, $vigenciaPT, $periodoConsolidacao);

        $seraDispensada = $this->dispensaPolicy->isConsolidacaoDispensadaApos(
            $usuarioId,
            $vigenciaPT,
            $periodoConsolidacao,
            $isExclusao ? null : $dataInicio,
            $isExclusao ? null : $dataFim,
            $ocorrenciaId,
        );

        return $isDispensada !== $seraDispensada;
    }
}
