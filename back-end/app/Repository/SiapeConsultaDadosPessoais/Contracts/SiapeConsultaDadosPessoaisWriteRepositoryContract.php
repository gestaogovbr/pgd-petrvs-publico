<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosPessoais\Contracts;

/**
 * @see \App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisWriteRepository
 */
interface SiapeConsultaDadosPessoaisWriteRepositoryContract
{
    public function create(array $attributes): \App\Models\SiapeConsultaDadosPessoais;
    public function forceDeleteByCpf(string $cpf): void;
    /** @param list<string> $cpfs */
    public function markProcessados(array $cpfs): int;
    public function truncate(): void;
    /** @param array<int, array<string, mixed>> $rows */
    public function insertMany(array $rows): void;
}
