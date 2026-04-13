<?php

declare(strict_types=1);

namespace App\Repository\Ocorrencia\Contracts;

use App\Models\Afastamento;

interface OcorrenciaWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Afastamento;

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?Afastamento;

    public function delete(string $id): bool;
}
