<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Unidade;
use App\Repository\HistoricoExecutoraUnidade\HistoricoExecutoraUnidadeRepository;
use Carbon\Carbon;

class UnidadeExecutoraHistoricoService
{
    public function __construct(
        private readonly HistoricoExecutoraUnidadeRepository $historicoExecutoraUnidadeRepository,
    ) {
    }

    public function registrarCriacao(Unidade $unidade): void
    {
        $this->historicoExecutoraUnidadeRepository->criar([
            'unidade_id' => $unidade->id,
            'executora' => (bool) $unidade->executora,
            'data_inicio' => $this->dataInicioUnidade($unidade),
            'data_fim' => null,
        ]);
    }

    public function registrarAlteracaoExecutora(Unidade $unidade, bool $valorAnterior): void
    {
        if ((bool) $unidade->executora === $valorAnterior) {
            return;
        }

        $inicioNovo = Carbon::today()->toDateString();
        $fimAnterior = Carbon::today()->subDay()->toDateString();

        $this->historicoExecutoraUnidadeRepository->encerrarPeriodoAberto($unidade->id, $fimAnterior);

        $this->historicoExecutoraUnidadeRepository->criar([
            'unidade_id' => $unidade->id,
            'executora' => (bool) $unidade->executora,
            'data_inicio' => $inicioNovo,
            'data_fim' => null,
        ]);
    }

    private function dataInicioUnidade(Unidade $unidade): string
    {
        if ($unidade->created_at !== null) {
            return $unidade->created_at->toDateString();
        }

        return Carbon::today()->toDateString();
    }
}
