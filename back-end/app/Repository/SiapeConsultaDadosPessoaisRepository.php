<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeConsultaDadosPessoais;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;

class SiapeConsultaDadosPessoaisRepository
{
    public function __construct(
        private readonly SiapeConsultaDadosPessoaisReadRepositoryContract $readRepository,
        private readonly SiapeConsultaDadosPessoaisWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeConsultaDadosPessoais
    {
        return $this->writeRepository->create($attributes);
    }

    public function forceDeleteByCpf(string $cpf): void
    {
        $this->writeRepository->forceDeleteByCpf($cpf);
    }
}
