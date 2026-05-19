<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\StatusJustificativa;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaReadRepositoryContract;
use App\Repository\StatusJustificativa\Contracts\StatusJustificativaWriteRepositoryContract;

class StatusJustificativaRepository
{
    public function __construct(
        private readonly StatusJustificativaReadRepositoryContract $readRepository,
        private readonly StatusJustificativaWriteRepositoryContract $writeRepository,
    ) {}

    public function create(array $attributes): StatusJustificativa
    {
        /** @var StatusJustificativa */
        return $this->writeRepository->create($attributes);
    }
}
