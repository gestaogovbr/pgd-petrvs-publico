<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Contracts;

/**
 * @see \App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeWriteRepository
 */
interface IntegracaoUnidadeWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $attributes): \Illuminate\Database\Eloquent\Model;

    /**
     * @param array<string, mixed> $attributes
     */
    public function updateByIdServo(string $idServo, array $attributes): bool;
}