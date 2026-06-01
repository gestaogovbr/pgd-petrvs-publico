<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\EnvioPlanoTrabalho\Contracts\EnvioPlanoTrabalhoReadRepositoryContract;

class EnvioPlanoTrabalhoRepository
{
    public function __construct(
        private readonly EnvioPlanoTrabalhoReadRepositoryContract $readRepository
    ) {
    }

    public function query(array $data): array
    {
        return $this->readRepository->query($data);
    }
}
