<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeListaUORGS;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSReadRepositoryContract;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSWriteRepositoryContract;

class SiapeListaUORGSRepository
{
    public function __construct(
        private readonly SiapeListaUORGSReadRepositoryContract $readRepository,
        private readonly SiapeListaUORGSWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findUnprocessed(): ?SiapeListaUORGS
    {
        return $this->readRepository->findUnprocessed();
    }
}
