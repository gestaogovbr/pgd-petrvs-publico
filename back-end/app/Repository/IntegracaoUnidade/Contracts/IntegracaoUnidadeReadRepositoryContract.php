<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Contracts;

/**
 * @see \App\Repository\IntegracaoUnidade\Eloquent\EloquentIntegracaoUnidadeReadRepository
 */
interface IntegracaoUnidadeReadRepositoryContract
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function getUnidadesComChefias(): \Illuminate\Support\Collection;
}