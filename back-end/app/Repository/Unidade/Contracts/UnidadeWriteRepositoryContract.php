<?php

declare(strict_types=1);

namespace App\Repository\Unidade\Contracts;

/**
 * @see \App\Repository\Unidade\Eloquent\EloquentUnidadeWriteRepository
 */
interface UnidadeWriteRepositoryContract
{
    public function cancelarInicioInativacaoPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int;

    public function reativarPorCodigoOrgaoCodigo(string $codigoOrgao, string $codigo): int;

    public function marcarAntigasPorCodigoOrgao(string $codigoOrgao): int;

    public function iniciarInativacao(string|int $id): bool;

    public function efetivarInativacao(string|int $id): bool;
}
