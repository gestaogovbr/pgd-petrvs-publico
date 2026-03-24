<?php

declare(strict_types=1);

namespace App\Repository\SiapeDadosUORG\Contracts;

/**
 * @see \App\Repository\SiapeDadosUORG\Eloquent\EloquentSiapeDadosUORGWriteRepository
 */
interface SiapeDadosUORGWriteRepositoryContract
{
    public function create(array $attributes): \App\Models\SiapeDadosUORG;
    public function forceDeleteProcessados(): void;
}