<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Contracts;

use App\Models\PlanejamentoObjetivo;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanejamentoObjetivo\Eloquent\EloquentPlanejamentoObjetivoReadRepository
 */
interface PlanejamentoObjetivoReadRepositoryContract
{
    /** @return PlanejamentoObjetivo|null */
    public function find(string|int $id): ?Model;

    /** @return list<string> */
    public function coletarIdsFechamento(string $objetivoId): array;

    /**
     * Ids do objetivo e de todos os itens hierarquicamente subordinados (inclui o próprio).
     *
     * @return list<string>
     */
    public function coletarIdsSubordinados(string $objetivoId): array;

    /**
     * @param  list<string>  $ids
     * @return array<string, string>
     */
    public function lookupNomes(array $ids): array;

    public function buscarDadosGeraisPainel(string $objetivoId): ?\stdClass;
}
