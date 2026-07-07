<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho;

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\StatusTemplates;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class PlanoTrabalhoAvaliacaoStatusService
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
    ) {}

    public function sincronizarAposMudancaConsolidacao(PlanoTrabalhoConsolidacao $consolidacao): void
    {
        $planoTrabalho = $consolidacao->planoTrabalho()->first();

        if ($planoTrabalho === null) {
            return;
        }

        $vigencia = CarbonPeriod::create(
            Carbon::parse($planoTrabalho->getAttribute('data_inicio'))->startOfDay(),
            Carbon::parse($planoTrabalho->getAttribute('data_fim'))->startOfDay(),
        );

        $consolidacoes = $this->consolidacaoRepository->findConsolidacoesVigentes(
            $planoTrabalho->id,
            $planoTrabalho->encerrado_at,
        );

        if ($consolidacoes->isEmpty()) {
            return;
        }

        $dispensadasIds = $this->dispensaPolicy->consolidacoesDispensadas(
            $planoTrabalho->getAttribute('usuario_id'),
            $vigencia,
            $consolidacoes,
        );

        $todasAvaliadas = $consolidacoes->filter(
            fn (PlanoTrabalhoConsolidacao $c) => $c->status !== StatusEnum::AVALIADO->value
                && !in_array($c->id, $dispensadasIds, true),
        )->isEmpty();

        if ($todasAvaliadas && $planoTrabalho->status === StatusEnum::ATIVO->value) {
            $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);
            StatusTemplates::concluirPTPorAvaliacoes($planoTrabalho);

            return;
        }

        if ($todasAvaliadas && $planoTrabalho->status === StatusEnum::CONCLUIDO->value && !$planoTrabalho->avaliado_at) {
            $planoTrabalho->update(['avaliado_at' => date('Y-m-d')]);

            return;
        }

        $foiRecurso = $consolidacao->possuiRecursoSemReavaliacao();

        if (!$todasAvaliadas && $planoTrabalho->status === StatusEnum::CONCLUIDO->value) {
            $planoTrabalho->update(['avaliado_at' => null]);

            if (!$planoTrabalho->encerrado_at && !$foiRecurso) {
                StatusTemplates::reabrirPTPorAvaliacoes($planoTrabalho);
            }
        }
    }
}
