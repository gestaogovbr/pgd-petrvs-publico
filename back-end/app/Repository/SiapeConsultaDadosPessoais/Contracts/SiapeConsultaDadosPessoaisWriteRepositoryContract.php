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
}
