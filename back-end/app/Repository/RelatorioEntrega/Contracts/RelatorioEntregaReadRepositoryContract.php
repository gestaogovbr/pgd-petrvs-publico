<?php

declare(strict_types=1);

namespace App\Repository\RelatorioEntrega\Contracts;

use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;

interface RelatorioEntregaReadRepositoryContract
{
    /**
     * @return array{count: int, rows: \Illuminate\Support\Collection<int, RelatorioEntregaRowDTO>}
     */
    public function query(RelatorioEntregaQueryDTO $query): array;
}
