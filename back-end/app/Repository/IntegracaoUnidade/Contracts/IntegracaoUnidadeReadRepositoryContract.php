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
    public function getUnidadesComChefias(string $codigoOrgao): \Illuminate\Support\Collection;

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?\App\Models\IntegracaoUnidade;

    /**
     * @return \Illuminate\Support\Collection<int, non-falsy-string>
     */
    public function getCodigosByCpfTitular(string $cpf, string $codigoOrgao, ?string $codigoExcluido = null): \Illuminate\Support\Collection;
}
