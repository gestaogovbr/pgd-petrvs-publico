<?php

declare(strict_types=1);

namespace App\Observers;

use App\Enums\StatusEnum;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\StatusService;
use App\V2\StatusTemplates;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class AfastamentoObserver
{
    public function __construct(
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
        private readonly StatusService $statusService,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {
    }

    public function created(Afastamento $afastamento): void
    {
        $this->verificarConclusaoPTs($afastamento);
    }

    public function updated(Afastamento $afastamento): void
    {
        $this->verificarConclusaoPTs($afastamento);
    }

    public function deleted(Afastamento $afastamento): void
    {
        $this->verificarConclusaoPTs($afastamento);
    }

    private function verificarConclusaoPTs(Afastamento $afastamento): void
    {
        $planos = $this->planoTrabalhoRepository->planosAtivosPorData(
            Carbon::parse($afastamento->data_inicio)->toString(),
            Carbon::parse($afastamento->data_fim)->toString(),
            $afastamento->usuario_id,
        )->filter(fn (PlanoTrabalho $p) => in_array($p->status, [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value], true));

        foreach ($planos as $plano) {
            $this->verificarConclusao($plano, $afastamento);
        }
    }

    // TODO: ocorrências não podem sair concluindo e reabrindo consolidações ad infinitum. Principalmente as arquivadas não me parecem fazer sentido.
    private function verificarConclusao(PlanoTrabalho $plano, Afastamento $afastamento): void
    {
        $vigencia = CarbonPeriod::create(
            Carbon::parse($plano->getAttribute('data_inicio'))->startOfDay(),
            Carbon::parse($plano->getAttribute('data_fim'))->startOfDay(),
        );

        $consolidacoes = $this->consolidacaoRepository->findConsolidacoesVigentes($plano->id, $plano->encerrado_at);

        if ($consolidacoes->isEmpty()) {
            return;
        }

        $dispensadasIds = $this->dispensaPolicy->consolidacoesDispensadas(
            $plano->getAttribute('usuario_id'),
            $vigencia,
            $consolidacoes,
        );

        $todasAvaliadas = $consolidacoes->filter(fn(PlanoTrabalhoConsolidacao $c) => $c->status != StatusEnum::AVALIADO->value && !in_array($c->id, $dispensadasIds))->isEmpty();

        if ($todasAvaliadas && $plano->status === StatusEnum::ATIVO->value) {
            $this->planoTrabalhoRepository->update($plano->id, ['avaliado_at' => date('Y-m-d')]);
            StatusTemplates::concluirPTPorDispensa($plano, $afastamento->id);
        }

        if (!$todasAvaliadas && $plano->status === StatusEnum::CONCLUIDO->value && !$plano->encerrado_at) {
            $this->planoTrabalhoRepository->update($plano->id, ['avaliado_at' => null]);
            StatusTemplates::reabrirPTConcluidoPorDispensa($plano, $afastamento->id);
        }
    }
}
