<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Contracts;

use App\Models\SiapeBlackListServidor;

/**
 * @see \App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorWriteRepository
 */
interface SiapeBlackListServidorWriteRepositoryContract
{
    public function create(array $attributes): SiapeBlackListServidor;
    public function firstOrCreate(string $cpf, ?string $matricula, string $response): SiapeBlackListServidor;
    public function forceDelete(string $id): bool;
}
