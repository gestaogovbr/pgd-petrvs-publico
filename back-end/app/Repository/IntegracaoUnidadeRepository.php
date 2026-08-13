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
    public function getUnidadesComChefias(string $codigoOrgao): \Illuminate\Support\Collection
    {
        return $this->readRepository->getUnidadesComChefias($codigoOrgao);
    }

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?IntegracaoUnidade
    {
        return $this->readRepository->findByCodigoOrgao($codigoOrgao, $codigo);
    }

    /**
     * @return \Illuminate\Support\Collection<int, non-falsy-string>
     */
    public function getCodigosByCpfTitular(string $cpf, string $codigoOrgao, ?string $codigoExcluido = null): \Illuminate\Support\Collection
    {
        return $this->readRepository->getCodigosByCpfTitular($cpf, $codigoOrgao, $codigoExcluido);
    }
}
