<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlackListServidor\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

/**
 * @see \App\Repository\SiapeBlackListServidor\Eloquent\EloquentSiapeBlackListServidorReadRepository
 */
interface SiapeBlackListServidorReadRepositoryContract
{
    public function exists(string $cpf, string $matricula): bool;

    public function existsAnyByCpf(string $cpf): bool;

    /** @return list<string> */
    public function cpfsByProcessedStatus(bool $inativado): array;

    /** @return Collection<int, \App\Models\SiapeBlackListServidor> */
    public function findAllByCpfForUpdate(string $cpf): Collection;

    /** @return Collection<int, \App\Models\SiapeBlackListServidor> */
    public function findAllByCpf(string $cpf): Collection;

    public function applyUsuarioGridJoin(Builder $query): void;

    public function findByCpfAndOptionalMatricula(string $cpf, ?string $matricula = null): ?\App\Models\SiapeBlackListServidor;
}
