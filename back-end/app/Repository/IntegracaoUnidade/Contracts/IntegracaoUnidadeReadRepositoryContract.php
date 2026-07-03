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

    public function findByCodigo(string $codigo): ?\App\Models\IntegracaoUnidade;

    /**
     * @return \Illuminate\Support\Collection<int, non-falsy-string>
     */
    public function getCodigosByCpfTitular(string $cpf, ?string $codigoExcluido = null): \Illuminate\Support\Collection;

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\IntegracaoUnidade>
     */
    public function findAllAtivas(): \Illuminate\Database\Eloquent\Collection;

    /**
     * Retorna unidades com CPF de titular e/ou substituto para atribuição de gestores.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getUnidadesComChefiasCompleto(): \Illuminate\Support\Collection;
}
