<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

use Illuminate\Support\Facades\DB;

/**
 * Queries de esforço por nó e acumulação bottom-up para montagem do grafo da árvore institucional.
 *
 * Responsável por: carregar métricas de esforço de cada nó e acumular via GraphAssembler.
 * Usado pela árvore (visualização completa do grafo) e pelo endpoint de esforço total (deprecated).
 */
class ArvoreInstitucionalEsforcoGraphDataProvider
{
    public function __construct(
        private readonly ArvoreInstitucionalEsforcoGraphAssembler $graphAssembler,
    ) {}

    /**
     * Carrega esforço e acumula bottom-up para todos os nós.
     * Encapsula: load → mapa → conectarFilhos → acumularHoras.
     *
     * @param list<string> $noIds IDs dos nós (ignorado se $containerId fornecido)
     * @param string|null $containerId Se fornecido, busca todos os nós do container
     * @return array<string, array{no_pai_id: string|null, no_pai_secundario_id: string|null, no_nome: string, container_nome: string|null, tipo_nome: string|null, total_entregas: int, esforco_disponivel_horas: float, esforco_proprio: float, esforco_total_horas: float, planejado_percentual_disponivel: float, filhos: list<string>}>
     */
    public function carregarEsforcoAcumulado(NoOrigemQueryConfig $config, array $noIds = [], ?string $containerId = null): array
    {
        $rows = $containerId !== null
            ? $this->loadEsforcoPorContainer($config, $containerId)
            : $this->loadEsforcoPorNos($config, $noIds);

        if ($rows === []) {
            return [];
        }

        $mapa = [];
        foreach ($rows as $row) {
            $disponivel = (float) ($row->esforco_disponivel_horas ?? 0);
            $planejado = (float) ($row->esforco_proprio ?? 0);

            $mapa[$row->no_id] = [
                'no_pai_id' => $row->no_pai_id ?? null,
                'no_pai_secundario_id' => $row->no_pai_secundario_id ?? null,
                'no_nome' => $row->no_nome ?? '',
                'container_nome' => $row->container_nome ?? null,
                'tipo_nome' => $row->tipo_nome ?? null,
                'total_entregas' => (int) ($row->total_entregas ?? 0),
                'esforco_disponivel_horas' => $disponivel,
                'esforco_proprio' => $planejado,
                'esforco_total_horas' => $planejado,
                'planejado_percentual_disponivel' => ArvoreInstitucionalEsforcoSupport::percentual($planejado, $disponivel),
            ];
        }

        $linkFields = [['field' => 'no_pai_id', 'key' => 'filhos_pai']];
        if ($config->colunaPaiSecundarioId !== null) {
            $linkFields[] = ['field' => 'no_pai_secundario_id', 'key' => 'filhos_secundario'];
        }

        $this->graphAssembler->conectarFilhos($mapa, $linkFields);
        $this->graphAssembler->acumularHoras($mapa);

        return $mapa;
    }

    /**
     * Esforço por nó para montagem do grafo — filtra por IDs específicos.
     *
     * @param list<string> $noIds
     * @return list<\stdClass>
     */
    public function loadEsforcoPorNos(NoOrigemQueryConfig $config, array $noIds): array
    {
        $placeholders = implode(',', array_fill(0, count($noIds), '?'));
        $whereSql = "no_tbl.id IN ({$placeholders}) AND no_tbl.deleted_at IS NULL";

        return $this->executarQueryEsforcoPorNos($config, $whereSql, $noIds);
    }

    /**
     * Esforço por nó para montagem do grafo — filtra por container (todos os nós de uma cadeia).
     *
     * @return list<\stdClass>
     */
    public function loadEsforcoPorContainer(NoOrigemQueryConfig $config, string $containerId): array
    {
        if ($config->containerFk === null) {
            return [];
        }

        $whereSql = "no_tbl.{$config->containerFk} = ? AND no_tbl.deleted_at IS NULL";

        return $this->executarQueryEsforcoPorNos($config, $whereSql, [$containerId]);
    }

    /**
     * Query interna compartilhada para esforço por nó.
     *
     * @param list<string> $bindings
     * @return list<\stdClass>
     */
    private function executarQueryEsforcoPorNos(NoOrigemQueryConfig $config, string $whereSql, array $bindings): array
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $ptPlanejadoIn = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $diasPeriodo = ArvoreInstitucionalEsforcoSupport::diasPeriodoPtSql();

        $noAlias = 'no_tbl';
        $tabelaNo = $config->tabelaNo;
        $tabelaVinculo = $config->tabelaVinculo;
        $colunaFkNo = $config->colunaFkNo;
        $colunaPaiId = $config->colunaPaiId;
        $colunaPaiSecundarioId = $config->colunaPaiSecundarioId;

        $paiSecundarioSelect = $colunaPaiSecundarioId
            ? "{$noAlias}.{$colunaPaiSecundarioId} AS no_pai_secundario_id"
            : 'NULL AS no_pai_secundario_id';

        $containerJoin = '';
        $containerSelect = 'NULL AS container_nome';
        if ($config->containerTabela && $config->containerFk) {
            $containerJoin = "INNER JOIN {$config->containerTabela} container_tbl ON container_tbl.id = {$noAlias}.{$config->containerFk}";
            $containerSelect = 'container_tbl.nome AS container_nome';
        }

        $tipoJoin = '';
        $tipoSelect = 'NULL AS tipo_nome';
        if ($config->tipoTabela && $config->tipoFk) {
            $tipoJoin = "LEFT JOIN {$config->tipoTabela} tipo_tbl ON tipo_tbl.id = {$noAlias}.{$config->tipoFk} AND tipo_tbl.deleted_at IS NULL";
            $tipoSelect = 'tipo_tbl.nome AS tipo_nome';
        }

        $containerGroupBy = $config->containerTabela ? ', container_tbl.nome' : '';
        $tipoGroupBy = $config->tipoTabela ? ', tipo_tbl.nome' : '';
        $paiSecundarioGroupBy = $colunaPaiSecundarioId ? ", {$noAlias}.{$colunaPaiSecundarioId}" : '';
        $orderBy = $config->orderBy;

        return DB::select(<<<SQL
            SELECT
                {$noAlias}.id AS no_id,
                {$noAlias}.nome AS no_nome,
                {$noAlias}.{$colunaPaiId} AS no_pai_id,
                {$paiSecundarioSelect},
                {$containerSelect},
                {$tipoSelect},
                COUNT(DISTINCT pee.id) AS total_entregas,
                ROUND(COALESCE(SUM(
                    {$chdSql}
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        {$chdSql}
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_proprio
            FROM {$tabelaNo} {$noAlias}
            {$containerJoin}
            {$tipoJoin}
            LEFT JOIN {$tabelaVinculo} vinculo
                ON vinculo.{$colunaFkNo} = {$noAlias}.id AND vinculo.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas pee
                ON pee.id = vinculo.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
            WHERE {$whereSql}
            GROUP BY {$noAlias}.id, {$noAlias}.nome, {$noAlias}.{$colunaPaiId}{$paiSecundarioGroupBy}{$containerGroupBy}{$tipoGroupBy}
            ORDER BY {$orderBy}
        SQL, $bindings);
    }
}
