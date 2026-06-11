<?php

declare(strict_types=1);

namespace App\Observers;

use App\Enums\StatusEnum;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\StatusService;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class AfastamentoObserver
{
    public function __construct(
        private readonly DispensaAvaliacaoPolicy $dispensaPolicy,
        private readonly StatusService $statusService,
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
        $planos = PlanoTrabalho::query()
            ->where('usuario_id', $afastamento->usuario_id)
            ->whereIn('status', [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value])
            ->where('data_fim', '>=', $afastamento->data_inicio)
            ->where('data_inicio', '<=', $afastamento->data_fim)
            ->get();

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

        $consolidacoes = $plano->consolidacoes()
            ->when($plano->encerrado_at, fn ($q) => $q->where('data_inicio', '<=', $plano->encerrado_at))
            ->get();

        if ($consolidacoes->isEmpty()) {
            return;
        }

        $dispensadasIds = $this->dispensaPolicy->consolidacoesDispensadas(
            $plano->getAttribute('usuario_id'),
            $vigencia,
            $consolidacoes,
        );

        $todasAvaliadas = $consolidacoes
            ->whereNotIn('id', $dispensadasIds)
            ->where('status', '!=', StatusEnum::AVALIADO->value)
            ->isEmpty();

        if ($todasAvaliadas && $plano->status === StatusEnum::ATIVO->value) {
            $plano->update(['avaliado_at' => date('Y-m-d')]);
            $this->statusService->atualizaStatus(
                $plano,
                StatusEnum::CONCLUIDO->value,
                "Plano de Trabalho concluído: a ocorrência {$afastamento->id} dispensou os períodos avaliativos.",
            );
        }

        if (! $todasAvaliadas && $plano->status === StatusEnum::CONCLUIDO->value) {
            $plano->update(['avaliado_at' => null]);
            $this->statusService->atualizaStatus(
                $plano,
                StatusEnum::ATIVO->value,
                "Plano de Trabalho reativado: os períodos dispensados pela ocorrência {$afastamento->id} deixaram de sê-lo, devido à sua edição ou remoção do sistema.",
            );
        }
    }
}
