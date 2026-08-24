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

    /** @return list<\stdClass> Unidades do PE vinculadas ao objetivo; esforço soma PTs concluídos (pode ser zero). */
    public function listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId(string $objetivoId): array;

    public function buscarDadosGeraisPainel(string $objetivoId): ?\stdClass;

    /**
     * Agrega esforço/pessoas/entregas das entregas vinculadas aos objetivos informados
     * (participantes deduplicados por usuário em todo o conjunto).
     *
     * @param  list<string>  $objetivoIds
     */
    public function agregarPainelEsforcoPessoasEntregas(
        array $objetivoIds,
        ?string $unidadeId = null,
        ?string $dataInicio = null,
        ?string $dataFim = null,
    ): \stdClass;

    /** @return list<\stdClass> */
    public function listarUnidadesPainelPorObjetivoId(string $objetivoId): array;

    /**
     * @param  list<string>  $objetivoIds
     * @param  list<string>|null  $unidadeIds  null = sem filtro de unidade; [] = nenhum resultado
     * @return list<\stdClass>
     */
    public function listarDetalhamentoEntregasPainel(
        array $objetivoIds,
        ?string $planoEntregaEntregaId = null,
        ?array $unidadeIds = null,
        ?string $dataInicio = null,
        ?string $dataFim = null,
    ): array;
}
