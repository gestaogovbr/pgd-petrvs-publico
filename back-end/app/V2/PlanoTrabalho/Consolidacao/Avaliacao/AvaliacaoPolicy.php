<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao;

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use Carbon\Carbon;

class AvaliacaoPolicy
{
    public const PRAZO_CANCELAMENTO_DIAS = 20;
    public const DATA_CORTE_REGRAS_CANCELAMENTO = '2026-06-10';

    public function podeCancelar(Avaliacao $avaliacao, PlanoTrabalhoConsolidacao $consolidacao, string $usuarioLogadoId, ?PlanoTrabalho $planoTrabalho = null): bool
    {
        return $this->isStatusAvaliado($consolidacao)
            && $this->isAvaliador($avaliacao, $usuarioLogadoId)
            && $this->isMaisRecente($avaliacao, $consolidacao)
            && $this->naoTemRecurso($avaliacao, $planoTrabalho)
            && $this->estaDentroDoPrazo($consolidacao, $planoTrabalho);
    }

    public function isStatusAvaliado(PlanoTrabalhoConsolidacao $consolidacao): bool
    {
        return $consolidacao->status === StatusEnum::AVALIADO->value;
    }

    public function isAvaliador(Avaliacao $avaliacao, string $usuarioLogadoId): bool
    {
        return $avaliacao->avaliador_id === $usuarioLogadoId;
    }

    public function isMaisRecente(Avaliacao $avaliacao, PlanoTrabalhoConsolidacao $consolidacao): bool
    {
        $maisRecente = $consolidacao->avaliacoes->sortByDesc('data_avaliacao')->first();

        return $maisRecente?->id === $avaliacao->id;
    }

    public function naoTemRecurso(Avaliacao $avaliacao, ?PlanoTrabalho $planoTrabalho = null): bool
    {
        if (!$this->deveAplicarRestricaoCancelamento($planoTrabalho)) {
            return true;
        }

        return $avaliacao->recurso === null;
    }

    public function estaDentroDoPrazo(PlanoTrabalhoConsolidacao $consolidacao, ?PlanoTrabalho $planoTrabalho = null): bool
    {
        if (!$this->deveAplicarRestricaoCancelamento($planoTrabalho)) {
            return true;
        }

        $dataConclusao = $this->getDataConclusao($consolidacao);
        if ($dataConclusao === null) {
            return false;
        }

        $dataLimite = $dataConclusao->addDays(self::PRAZO_CANCELAMENTO_DIAS);

        return now()->lessThanOrEqualTo($dataLimite);
    }

    private function deveAplicarRestricaoCancelamento(?PlanoTrabalho $planoTrabalho): bool
    {
        if ($planoTrabalho === null) {
            return true;
        }

        return $planoTrabalho->created_at >= Carbon::parse(self::DATA_CORTE_REGRAS_CANCELAMENTO);
    }

    private function getDataConclusao(PlanoTrabalhoConsolidacao $consolidacao): ?Carbon
    {
        $registro = $consolidacao->statusHistorico
            ->where('codigo', StatusEnum::CONCLUIDO->value)
            ->sortByDesc('created_at')
            ->first();

        return $registro?->created_at ? Carbon::parse($registro->created_at) : null;
    }
}
