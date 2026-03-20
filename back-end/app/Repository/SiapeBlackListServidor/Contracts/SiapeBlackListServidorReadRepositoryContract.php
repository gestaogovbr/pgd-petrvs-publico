<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Contracts;

/**
 * @see \App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorReadRepository
 */
interface SiapeBlackListServidorReadRepositoryContract
{
    public function exists(string $cpf, string $matricula): bool;

    public function findByCpfAndOptionalMatricula(string $cpf, ?string $matricula = null): ?\App\Models\SiapeBlackListServidor;
}
