<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\RelatorioEntrega\Contracts\RelatorioEntregaReadRepositoryContract;

class RelatorioEntregaRepository
{
    public function __construct(
        private readonly RelatorioEntregaReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data): array
    {
        return $this->readRepository->query($data);
    }
}
