<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna\Contracts;

use App\V2\RelatorioPlanoEntregaLacuna\DTOs\RelatorioPlanoEntregaLacunaQueryDTO;

interface RelatorioPlanoEntregaLacunaReadRepositoryContract
{
    /**
     * @return array{count: int, rows: \Illuminate\Support\Collection}
     */
    public function query(RelatorioPlanoEntregaLacunaQueryDTO $data): array;
}
