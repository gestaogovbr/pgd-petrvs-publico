<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\EnvioPlanoEntrega\Contracts\EnvioPlanoEntregaReadRepositoryContract;

class EnvioPlanoEntregaRepository
{
    public function __construct(
        private readonly EnvioPlanoEntregaReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data): array
    {
        return $this->readRepository->query($data);
    }
}
