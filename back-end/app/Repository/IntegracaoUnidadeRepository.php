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
}