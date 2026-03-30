<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeDadosUORG;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGReadRepositoryContract;
use App\Repository\SiapeDadosUORG\Contracts\SiapeDadosUORGWriteRepositoryContract;

class SiapeDadosUORGRepository
{
    public function __construct(
        private readonly SiapeDadosUORGReadRepositoryContract $readRepository,
        private readonly SiapeDadosUORGWriteRepositoryContract $writeRepository,
    ) {}

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeDadosUORG
    {
        return $this->writeRepository->create($attributes);
    }

    public function forceDeleteProcessados(): void
    {
        $this->writeRepository->forceDeleteProcessados();
    }
}
