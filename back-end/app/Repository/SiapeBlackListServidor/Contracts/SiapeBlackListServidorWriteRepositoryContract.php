<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Contracts;

/**
 * @see \App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorWriteRepository
 */
interface SiapeBlackListServidorWriteRepositoryContract
{
    public function create(array $attributes): \App\Models\SiapeBlackListServidor;
    public function firstOrCreate(string $cpf, ?string $matricula, string $response): \App\Models\SiapeBlackListServidor;
    public function forceDelete(string $id): bool;
}
