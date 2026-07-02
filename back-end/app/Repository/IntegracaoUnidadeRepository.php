<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\IntegracaoUnidade;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeWriteRepositoryContract;

class IntegracaoUnidadeRepository
{
    public function __construct(
        private readonly IntegracaoUnidadeReadRepositoryContract $readRepository,
        private readonly IntegracaoUnidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getUnidadesComChefias(): \Illuminate\Support\Collection
    {
        return $this->readRepository->getUnidadesComChefias();
    }

    public function findByCodigo(string $codigo): ?IntegracaoUnidade
    {
        return $this->readRepository->findByCodigo($codigo);
    }

    /**
     * @return \Illuminate\Support\Collection<int, non-falsy-string>
     */
    public function getCodigosByCpfTitular(string $cpf, ?string $codigoExcluido = null): \Illuminate\Support\Collection
    {
        return $this->readRepository->getCodigosByCpfTitular($cpf, $codigoExcluido);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\IntegracaoUnidade>
     */
    public function findAllAtivas(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->readRepository->findAllAtivas();
    }

    /**
     * @param array<string, mixed> $attributes
     * @return \App\Models\IntegracaoUnidade
     */
    public function create(array $attributes): \App\Models\IntegracaoUnidade
    {
        /** @var \App\Models\IntegracaoUnidade */
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function updateByIdServo(string $idServo, array $attributes): bool
    {
        return $this->writeRepository->updateByIdServo($idServo, $attributes);
    }
}
