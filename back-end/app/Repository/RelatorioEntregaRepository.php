<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;

class RelatorioEntregaRepository
{
    public function __construct(
        private readonly RelatorioEntregaReadRepositoryContract $readRepository
    ) {
    }

    public function query(RelatorioEntregaQueryDTO $query): array
    {
        return $this->readRepository->query($query);
    }
}
