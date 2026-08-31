<?php

declare(strict_types=1);

namespace App\Repository\MuralAviso\Contracts;

use App\Models\MuralAviso;

interface MuralAvisoWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): MuralAviso;

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string|int $id, array $attributes): ?MuralAviso;

    public function delete(string|int $id): bool;
}
