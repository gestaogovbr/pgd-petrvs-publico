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
}
