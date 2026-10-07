<?php

declare(strict_types=1);

namespace App\Repository\HistoricoExecutoraUnidade;

use App\Models\HistoricoExecutoraUnidade;
use App\Repository\HistoricoExecutoraUnidade\Contracts\HistoricoExecutoraUnidadeWriteRepositoryContract;

class HistoricoExecutoraUnidadeRepository
{
    public function __construct(
        private readonly HistoricoExecutoraUnidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function criar(array $attributes): HistoricoExecutoraUnidade
    {
        return $this->writeRepository->create($attributes);
    }

    public function encerrarPeriodoAberto(string $unidadeId, string $dataFim): void
    {
        $this->writeRepository->encerrarPeriodoAberto($unidadeId, $dataFim);
    }
}
