<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

use Illuminate\Support\Facades\DB;

/**
 * Queries compartilhadas de agregação para o painel lateral da árvore institucional.
 * Monta SQL internamente a partir do NoOrigemQueryConfig declarativo.
 *
 * Usado por Planejamento Institucional e Cadeia de Valor.
 */
class ArvoreInstitucionalPainelDataProvider
{

    /**
     * Agrega esforço, participantes e entregas.
     *
     * @param list<string> $noIds
     */
    public function agregarEsforcoPessoasEntregas(NoOrigemQueryConfig $config, array $noIds, ?string $unidadeId = null): \stdClass
    {
        $chdSql = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $statusExecutado = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();
        $diasPeriodo = ArvoreInstitucionalEsforcoSupport::diasPeriodoPtSql();

        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        $unidadeFilter = $unidadeId ? 'AND pee.unidade_id = ?' : '';
        if ($unidadeId) {
            $bindings[] = $unidadeId;
        }

        $participantes = $this->calcularParticipantesCategorias($config, $noIds, $unidadeId);

        $row = DB::selectOne(<<<SQL
            SELECT
                COUNT(DISTINCT pee.id) AS total_entregas,
                COUNT(DISTINCT CASE WHEN pe.status = 'AVALIADO' THEN pee.id END) AS total_entregas_avaliadas,
                COUNT(DISTINCT CASE WHEN pe.status = 'AVALIADO' AND pee.progresso_realizado >= 100 THEN pee.id END) AS entregas_concluidas,

                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,

                ROUND(COALESCE(SUM(
                    ({$chdSql})
                    * {$diasPeriodo}
                    * (pte.forca_trabalho / 100.0)
                ), 0), 2) AS esforco_planejado_horas,

                ROUND(COALESCE(SUM(
                    CASE WHEN pt.status IN ({$statusExecutado})
                    THEN
                        ({$chdSql})
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                    ELSE 0 END
                ), 0), 2) AS esforco_executado_horas,

                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusPlanejado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_pactuado,
                CASE WHEN COUNT(CASE WHEN pt.status IN ({$statusExecutado}) THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pt_concluido,
                CASE WHEN COUNT(CASE WHEN pe.status IN ('ATIVO', 'CONCLUIDO', 'AVALIADO') THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_pe_homologado

            {$from}
            INNER JOIN planos_entregas pe
                ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE {$where}
            {$unidadeFilter}
        SQL, $bindings);

        return (object) [
            'esforco_disponivel_horas' => (float) ($row->esforco_disponivel_horas ?? 0),
            'esforco_planejado_horas' => (float) ($row->esforco_planejado_horas ?? 0),
            'esforco_executado_horas' => (float) ($row->esforco_executado_horas ?? 0),
            'tem_pt_pactuado' => (bool) ($row->tem_pt_pactuado ?? false),
            'tem_pt_concluido' => (bool) ($row->tem_pt_concluido ?? false),
            'tem_pe_homologado' => (bool) ($row->tem_pe_homologado ?? false),
            'participantes_somente_unidade_propria' => $participantes['somente_propria'],
            'participantes_somente_outras_unidades' => $participantes['somente_outras'],
            'participantes_em_ambas' => $participantes['em_ambas'],
            'total_entregas' => (int) ($row->total_entregas ?? 0),
            'total_entregas_avaliadas' => (int) ($row->total_entregas_avaliadas ?? 0),
            'entregas_concluidas' => (int) ($row->entregas_concluidas ?? 0),
        ];
    }

    /**
     * Lista unidades vinculadas (para dropdown de filtro).
     *
     * @return list<array{id: string, label: string}>
     */
    public function listarFiltroUnidades(NoOrigemQueryConfig $config, array $noIds): array
    {
        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        $rows = DB::select(<<<SQL
            SELECT DISTINCT u.id, u.sigla, u.nome
            {$from}
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            WHERE {$where}
            ORDER BY u.nome
        SQL, $bindings);

        return array_map(fn (\stdClass $row) => [
            'id' => (string) $row->id,
            'label' => (string) $row->sigla . ' — ' . (string) $row->nome,
        ], $rows);
    }

    /**
     * Lista entregas (para dropdown de filtro).
     *
     * @return list<array{id: string, label: string}>
     */
    public function listarFiltroEntregas(NoOrigemQueryConfig $config, array $noIds): array
    {
        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        $rows = DB::select(<<<SQL
            SELECT DISTINCT pee.id, pee.descricao AS label
            {$from}
            WHERE {$where}
            ORDER BY label
        SQL, $bindings);

        return array_map(fn (\stdClass $row) => [
            'id' => (string) $row->id,
            'label' => (string) $row->label,
        ], $rows);
    }

    /**
     * Detalhamento de entregas com esforço, participantes e progresso.
     *
     * @param array{plano_entrega_entrega_id?: string|null, unidade_ids?: list<string>|null, unidade_id?: string|null, data_inicio?: string|null, data_fim?: string|null} $filtros
     * @return list<\stdClass>
     */
    public function listarDetalhamentoEntregas(NoOrigemQueryConfig $config, array $noIds, array $filtros = []): array
    {
        $chd = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $ptPlanejadoIn = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();
        $ptExecutadoIn = ArvoreInstitucionalEsforcoSupport::ptStatusExecutadoIn();
        $diasPeriodo = ArvoreInstitucionalEsforcoSupport::diasPeriodoPtSql();

        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $baseBindings = $this->buildEntregaBindings($noIds);

        $noOrigemSelect = $this->buildNoOrigemSelect($config);
        $noOrigemJoin = $this->buildNoOrigemJoin($config);
        $noOrigemGroupBy = $this->buildNoOrigemGroupBy($config);

        $conditions = '';
        $filterBindings = [];

        if (!empty($filtros['plano_entrega_entrega_id'])) {
            $conditions .= ' AND pee.id = ?';
            $filterBindings[] = $filtros['plano_entrega_entrega_id'];
        }
        if (!empty($filtros['unidade_ids'])) {
            $uPlaceholders = implode(',', array_fill(0, count($filtros['unidade_ids']), '?'));
            $conditions .= " AND pee.unidade_id IN ({$uPlaceholders})";
            $filterBindings = array_merge($filterBindings, $filtros['unidade_ids']);
        } elseif (!empty($filtros['unidade_id'])) {
            $conditions .= ' AND pee.unidade_id = ?';
            $filterBindings[] = $filtros['unidade_id'];
        }
        if (!empty($filtros['data_inicio'])) {
            $conditions .= ' AND DATE(pt.data_fim) >= ?';
            $filterBindings[] = $filtros['data_inicio'];
        }
        if (!empty($filtros['data_fim'])) {
            $conditions .= ' AND DATE(pt.data_inicio) <= ?';
            $filterBindings[] = $filtros['data_fim'];
        }

        $bindingsCte = array_merge($baseBindings, $filterBindings);
        $bindingsMain = array_merge($baseBindings, $filterBindings);

        return DB::select(<<<SQL
            WITH pt_vinculo AS (
                SELECT
                    pee.id AS plano_entrega_entrega_id,
                    pt.usuario_id,
                    MAX(CASE WHEN pt.unidade_id = pee.unidade_id THEN 1 ELSE 0 END) AS tem_propria,
                    MAX(CASE WHEN pt.unidade_id <> pee.unidade_id THEN 1 ELSE 0 END) AS tem_outras
                {$from}
                INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
                LEFT JOIN planos_trabalhos_entregas pte
                    ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                LEFT JOIN planos_trabalhos pt
                    ON pt.id = pte.plano_trabalho_id
                    AND pt.deleted_at IS NULL
                    AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
                WHERE {$where}
                  AND pt.usuario_id IS NOT NULL
                  {$conditions}
                GROUP BY pee.id, pt.usuario_id
            ),
            participantes_por_entrega AS (
                SELECT
                    plano_entrega_entrega_id,
                    SUM(CASE WHEN tem_propria = 1 AND tem_outras = 0 THEN 1 ELSE 0 END) AS participantes_somente_unidade_propria,
                    SUM(CASE WHEN tem_propria = 0 AND tem_outras = 1 THEN 1 ELSE 0 END) AS participantes_somente_outras_unidades,
                    SUM(CASE WHEN tem_propria = 1 AND tem_outras = 1 THEN 1 ELSE 0 END) AS participantes_em_ambas
                FROM pt_vinculo
                GROUP BY plano_entrega_entrega_id
            )
            SELECT
                pee.id AS plano_entrega_entrega_id,
                u.id AS unidade_id,
                u.sigla AS unidade_sigla,
                u.nome AS unidade_nome,
                pe.id AS plano_entrega_id,
                pe.nome AS plano_entrega_nome,
                pe.status AS plano_entrega_status,
                pe.data_inicio AS plano_entrega_data_inicio,
                pe.data_fim AS plano_entrega_data_fim,
                COALESCE(pee.descricao, '') AS entrega_titulo,
                COALESCE(pee.descricao_entrega, '') AS entrega_descricao,
                COALESCE(pee.descricao_meta, '') AS descricao_meta,
                pee.etiquetas,
                COALESCE(MAX(peep.progresso_esperado), MAX(pee.progresso_esperado)) AS progresso_esperado,
                COALESCE(MAX(peep.progresso_realizado), MAX(pee.progresso_realizado)) AS progresso_realizado,
                COALESCE(MAX(peep.homologado), MAX(pee.homologado)) AS homologado,
                MAX(peep.registro_execucao) AS registro_execucao,
                COALESCE(MAX(peep.meta), pee.meta) AS meta,
                COALESCE(MAX(peep.realizado), pee.realizado) AS realizado,
                e.tipo_indicador,
                e.lista_qualitativos,
                {$noOrigemSelect}
                COALESCE(
                    MAX(pp.participantes_somente_unidade_propria)
                    + MAX(pp.participantes_somente_outras_unidades)
                    + MAX(pp.participantes_em_ambas),
                    0
                ) AS participantes_total,
                COALESCE(MAX(pp.participantes_somente_unidade_propria), 0) AS participantes_somente_unidade_propria,
                COALESCE(MAX(pp.participantes_somente_outras_unidades), 0) AS participantes_somente_outras_unidades,
                COALESCE(MAX(pp.participantes_em_ambas), 0) AS participantes_em_ambas,
                ROUND(COALESCE(SUM(
                    {$chd}
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        {$chd}
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_planejado_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptExecutadoIn}) THEN
                        {$chd}
                        * {$diasPeriodo}
                        * (COALESCE(pte.esforco_executado, pte.forca_trabalho) / 100.0)
                END), 0), 2) AS esforco_executado_horas,
                MAX(CASE WHEN pt.status IN ({$ptPlanejadoIn}) THEN 1 ELSE 0 END) AS tem_pt_pactuado,
                MAX(CASE WHEN pt.status IN ({$ptExecutadoIn}) THEN 1 ELSE 0 END) AS tem_pt_concluido
            {$from}
            {$noOrigemJoin}
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            LEFT JOIN entregas e ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas_progressos peep
                ON peep.id = (
                    SELECT p2.id
                    FROM planos_entregas_entregas_progressos p2
                    WHERE p2.plano_entrega_entrega_id = pee.id
                      AND p2.deleted_at IS NULL
                    ORDER BY p2.data_progresso DESC, p2.created_at DESC
                    LIMIT 1
                )
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
            LEFT JOIN participantes_por_entrega pp ON pp.plano_entrega_entrega_id = pee.id
            WHERE {$where}
            {$conditions}
            GROUP BY
                pee.id,
                u.id,
                u.sigla,
                u.nome,
                pe.id,
                pe.nome,
                pe.status,
                pe.data_inicio,
                pe.data_fim,
                pee.descricao_entrega,
                pee.descricao,
                pee.descricao_meta,
                pee.etiquetas,
                pee.meta,
                pee.realizado,
                e.tipo_indicador,
                e.lista_qualitativos
                {$noOrigemGroupBy}
            ORDER BY pe.data_inicio DESC, u.sigla, pee.descricao
        SQL, array_merge($bindingsCte, $bindingsMain));
    }

    /**
     * Lista entregas com progresso e esforço de PTs concluídos (para gráfico/listagem por nó).
     *
     * @return list<\stdClass>
     */
    public function listarEntregasPorNo(NoOrigemQueryConfig $config, array $noIds): array
    {
        $chd = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $diasPeriodo = ArvoreInstitucionalEsforcoSupport::diasPeriodoPtSql();

        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        return DB::select(<<<SQL
            SELECT
                pee.id AS plano_entrega_entrega_id,
                COALESCE(pee.descricao_entrega, pee.descricao, '') AS entrega_titulo,
                e.id AS entrega_catalogo_id,
                e.nome AS entrega_catalogo_nome,
                u.id AS entrega_unidade_id,
                u.nome AS entrega_unidade_nome,
                u.sigla AS entrega_unidade_sigla,
                pee.progresso_esperado,
                pee.progresso_realizado,
                pee.homologado,
                ROUND(
                    COALESCE(
                        SUM(
                            {$chd}
                            * {$diasPeriodo}
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_horas_total
            {$from}
            LEFT JOIN entregas e ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            WHERE {$where}
            GROUP BY
                pee.id, pee.descricao_entrega, pee.descricao,
                e.id, e.nome, u.id, u.nome, u.sigla,
                pee.progresso_esperado, pee.progresso_realizado, pee.homologado
            ORDER BY pee.descricao_entrega, pee.descricao
        SQL, $bindings);
    }

    /**
     * Agrupa esforço por unidade a partir de PTs concluídos (para listagem de equipes por nó).
     *
     * @return list<\stdClass>
     */
    public function listarEsforcoPorUnidade(NoOrigemQueryConfig $config, array $noIds): array
    {
        $chd = ArvoreInstitucionalEsforcoSupport::chdPtSql();
        $diasPeriodo = ArvoreInstitucionalEsforcoSupport::diasPeriodoPtSql();

        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        return DB::select(<<<SQL
            SELECT
                u.id AS unidade_id,
                u.nome AS unidade_nome,
                u.sigla AS unidade_sigla,
                ROUND(
                    COALESCE(
                        SUM(
                            {$chd}
                            * {$diasPeriodo}
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_horas_total
            {$from}
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            WHERE {$where}
            GROUP BY u.id, u.nome, u.sigla
            ORDER BY u.nome
        SQL, $bindings);
    }

    // ─── Builders internos ─────────────────────────────────────────────────────

    /**
     * FROM: tabela_vinculo → planos_entregas_entregas
     */
    private function buildEntregaFrom(NoOrigemQueryConfig $config): string
    {
        return <<<SQL
            FROM {$config->tabelaVinculo} vinculo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = vinculo.entrega_id AND pee.deleted_at IS NULL
        SQL;
    }

    /**
     * WHERE: filtra por noIds via tabela de vínculo
     *
     * @param list<string> $noIds
     */
    private function buildEntregaWhere(NoOrigemQueryConfig $config, array $noIds): string
    {
        $placeholders = implode(',', array_fill(0, count($noIds), '?'));

        return "vinculo.{$config->colunaFkNo} IN ({$placeholders}) AND vinculo.deleted_at IS NULL";
    }

    /**
     * Bindings para o WHERE (noIds)
     *
     * @param list<string> $noIds
     * @return list<string>
     */
    private function buildEntregaBindings(array $noIds): array
    {
        return $noIds;
    }

    /**
     * SELECT do nó de origem (para detalhamento)
     */
    private function buildNoOrigemSelect(NoOrigemQueryConfig $config): string
    {
        return "no_tbl.id AS no_origem_id, no_tbl.nome AS no_origem_nome,";
    }

    /**
     * JOIN com a tabela do nó (para detalhamento — obter nome do nó de origem)
     */
    private function buildNoOrigemJoin(NoOrigemQueryConfig $config): string
    {
        return "INNER JOIN {$config->tabelaNo} no_tbl ON no_tbl.id = vinculo.{$config->colunaFkNo} AND no_tbl.deleted_at IS NULL";
    }

    /**
     * GROUP BY do nó de origem
     */
    private function buildNoOrigemGroupBy(NoOrigemQueryConfig $config): string
    {
        return ', no_tbl.id, no_tbl.nome';
    }

    /**
     * @param list<string> $noIds
     * @return array{somente_propria: int, somente_outras: int, em_ambas: int}
     */
    private function calcularParticipantesCategorias(NoOrigemQueryConfig $config, array $noIds, ?string $unidadeId = null): array
    {
        $statusPlanejado = ArvoreInstitucionalEsforcoSupport::ptStatusPlanejadoIn();

        $from = $this->buildEntregaFrom($config);
        $where = $this->buildEntregaWhere($config, $noIds);
        $bindings = $this->buildEntregaBindings($noIds);

        $unidadeFilter = $unidadeId ? 'AND pee.unidade_id = ?' : '';
        if ($unidadeId) {
            $bindings[] = $unidadeId;
        }

        $rows = DB::select(<<<SQL
            SELECT
                pt.usuario_id,
                pt.unidade_id AS pt_unidade_id,
                pee.unidade_id AS entrega_unidade_id
            {$from}
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL
                AND pt.status IN ({$statusPlanejado})
            WHERE {$where}
              AND pt.usuario_id IS NOT NULL
            {$unidadeFilter}
        SQL, $bindings);

        $usuarios = [];
        foreach ($rows as $row) {
            $uid = (string) $row->usuario_id;
            if (!isset($usuarios[$uid])) {
                $usuarios[$uid] = ['propria' => false, 'outras' => false];
            }
            if ((string) $row->pt_unidade_id === (string) $row->entrega_unidade_id) {
                $usuarios[$uid]['propria'] = true;
            } else {
                $usuarios[$uid]['outras'] = true;
            }
        }

        $somentePropria = 0;
        $somenteOutras = 0;
        $emAmbas = 0;
        foreach ($usuarios as $u) {
            if ($u['propria'] && $u['outras']) {
                $emAmbas++;
            } elseif ($u['propria']) {
                $somentePropria++;
            } elseif ($u['outras']) {
                $somenteOutras++;
            }
        }

        return [
            'somente_propria' => $somentePropria,
            'somente_outras' => $somenteOutras,
            'em_ambas' => $emAmbas,
        ];
    }
}
