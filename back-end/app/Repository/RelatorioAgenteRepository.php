<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\RelatorioAgente\Contracts\RelatorioAgenteReadRepositoryContract;

class RelatorioAgenteRepository
{
    public function __construct(
        private readonly RelatorioAgenteReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data): array
    {
        return $this->readRepository->query($data);
    }
}
