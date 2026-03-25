<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Programa;
use App\Repository\Programa\Contracts\ProgramaReadRepositoryContract;
use App\Repository\Programa\Contracts\ProgramaWriteRepositoryContract;

class ProgramaRepository
{
    public function __construct(
        private readonly ProgramaReadRepositoryContract $readRepository,
        private readonly ProgramaWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?Programa
    {
        /** @var Programa|null */
        return $this->readRepository->findById($id);
    }
}