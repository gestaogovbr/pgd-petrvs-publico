<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosFuncionais\Contracts;

/**
 * @see \App\Repository\SiapeConsultaDadosFuncionais\Eloquent\EloquentSiapeConsultaDadosFuncionaisWriteRepository
 */
interface SiapeConsultaDadosFuncionaisWriteRepositoryContract
{
    public function create(array $attributes): \App\Models\SiapeConsultaDadosFuncionais;
    public function forceDeleteByCpf(string $cpf): void;
    /** @param list<string> $cpfs */
    public function markProcessados(array $cpfs): int;
    public function truncate(): void;
    /** @param array<int, array<string, mixed>> $rows */
    public function insertMany(array $rows): void;
}
