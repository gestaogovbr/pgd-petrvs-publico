<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Contracts;

use App\Models\PlanejamentoObjetivo;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\EntregasPorUnidadeDTO;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanejamentoObjetivo\Eloquent\EloquentPlanejamentoObjetivoReadRepository
 */
interface PlanejamentoObjetivoReadRepositoryContract
{
    /** @return PlanejamentoObjetivo|null */
    public function find(string|int $id): ?Model;

    /** @return array<string, EsforcoNodeDTO> */
    public function getEsforcoTotal(PlanejamentoObjetivo $objetivo): array;

    /** @return list<string> */
    public function coletarIdsFechamento(string $objetivoId): array;

    /**
     * Métricas de esforço e metadados por objetivo (uma linha por id).
     *
     * @param  list<string>  $ids
     * @return list<\stdClass>
     */
    public function loadEsforcoPorIds(array $ids): array;

    /**
     * @param  list<string>  $ids
     * @return array<string, string>
     */
    public function lookupNomes(array $ids): array;

    /** @return list<\stdClass> */
    public function listarEntregasPlanoEntregaPorObjetivoId(string $objetivoId): array;

    /** @return list<\stdClass> */
    public function listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId(string $objetivoId): array;

    /** @return EntregasPorUnidadeDTO[] */
    public function getEntregasAgrupadasPorUnidade(string $objetivoId): array;
}
