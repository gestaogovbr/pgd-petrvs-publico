<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\SiapeConsultaDadosFuncionais;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisReadRepositoryContract;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;

class SiapeConsultaDadosFuncionaisRepository
{
    public function __construct(
        private readonly SiapeConsultaDadosFuncionaisReadRepositoryContract $readRepository,
        private readonly SiapeConsultaDadosFuncionaisWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): SiapeConsultaDadosFuncionais
    {
        return $this->writeRepository->create($attributes);
    }

    public function forceDeleteByCpf(string $cpf): void
    {
        $this->writeRepository->forceDeleteByCpf($cpf);
    }
}
