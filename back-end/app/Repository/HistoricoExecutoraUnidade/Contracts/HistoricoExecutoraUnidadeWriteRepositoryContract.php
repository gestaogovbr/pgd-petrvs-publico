<?php

declare(strict_types=1);

namespace App\Repository\HistoricoExecutoraUnidade\Contracts;

use App\Models\HistoricoExecutoraUnidade;

interface HistoricoExecutoraUnidadeWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): HistoricoExecutoraUnidade;

    public function encerrarPeriodoAberto(string $unidadeId, string $dataFim): void;
}
