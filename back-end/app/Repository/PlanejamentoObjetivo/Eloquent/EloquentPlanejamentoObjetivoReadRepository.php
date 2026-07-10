<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Eloquent;

use App\Models\PlanejamentoObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\Planejamento\Objetivo\ObjetivoPainelEsforcoSupport;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<PlanejamentoObjetivo>
 */
class EloquentPlanejamentoObjetivoReadRepository extends AbstractEloquentReadRepository implements PlanejamentoObjetivoReadRepositoryContract
{
    /** Divisor aplicado a {@see \App\Models\Usuario::$cod_jornada} no cálculo de esforço (jornada semanal → fator diário). */
    private const ESFORCO_COD_JORNADA_SEMANA_DIVISOR = 5.0;

    /** Horas semanais padrão quando {@see \App\Models\Usuario::$cod_jornada} é NULL no cálculo de esforço. */
    private const ESFORCO_COD_JORNADA_PADRAO = 40;

    /**
     * Dias do período do PT no cálculo de esforço.
     * Alinhado às demais consultas deste repositório (esforço-total, entregas, equipes).
     */
    private const ESFORCO_DIAS_PERIODO_PT_SQL = '(DATEDIFF(pt.data_fim, pt.data_inicio) + 1)';

    public function __construct(PlanejamentoObjetivo $model)
    {
        $this->model = $model;
    }

    /** @return list<string> */
    public function coletarIdsFechamento(string $objetivoId): array
    {
        $seen = [];
        $queue = [$objetivoId];

        while ($queue !== []) {
            $id = array_shift($queue);
            if (isset($seen[$id])) {
                continue;
            }
            $seen[$id] = true;

            $row = DB::selectOne(
                'SELECT objetivo_pai_id, objetivo_superior_id FROM planejamentos_objetivos WHERE id = ? AND deleted_at IS NULL',
                [$id]
            );
            if ($row === null) {
                continue;
            }

            foreach ([$row->objetivo_pai_id, $row->objetivo_superior_id] as $parentId) {
                if (is_string($parentId) && $parentId !== '' && !isset($seen[$parentId])) {
                    $queue[] = $parentId;
                }
            }

            $childRows = DB::select(
                'SELECT id FROM planejamentos_objetivos WHERE deleted_at IS NULL AND (objetivo_pai_id = ? OR objetivo_superior_id = ?)',
                [$id, $id]
            );
            foreach ($childRows as $child) {
                $childId = (string) $child->id;
                if (!isset($seen[$childId])) {
                    $queue[] = $childId;
                }
            }
        }

        return array_keys($seen);
    }

    /**
     * @param  list<string>  $ids
     * @return list<\stdClass>
     */
    public function loadEsforcoPorIds(array $ids): array
    {
        $ids = array_values(array_unique(array_filter(array_map('strval', $ids))));
        if ($ids === []) {
            return [];
        }

        return $this->selectEsforcoMetricRowsForObjetivoIds($ids);
    }

    /**
     * @param  list<string>  $ids
     * @return array<string, string>
     */
    public function lookupNomes(array $ids): array
    {
        $ids = array_values(array_unique(array_filter(array_map('strval', $ids))));
        if ($ids === []) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $rows = DB::select(
            "SELECT id, nome FROM planejamentos_objetivos WHERE id IN ({$placeholders}) AND deleted_at IS NULL",
            $ids
        );

        $out = [];
        foreach ($rows as $row) {
            $out[(string) $row->id] = (string) $row->nome;
        }

        return $out;
    }

    /** @return list<\stdClass> */
    public function listarEntregasPlanoEntregaPorObjetivoId(string $objetivoId): array
    {
        $jornadaDivisor = self::ESFORCO_COD_JORNADA_SEMANA_DIVISOR;
        $jornadaPadrao = self::ESFORCO_COD_JORNADA_PADRAO;

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
                            (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                            * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_horas_total
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN entregas e ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            LEFT JOIN usuarios us ON us.id = pt.usuario_id AND us.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ? AND peeo.deleted_at IS NULL
            GROUP BY
                pee.id,
                pee.descricao_entrega,
                pee.descricao,
                e.id,
                e.nome,
                u.id,
                u.nome,
                u.sigla,
                pee.progresso_esperado,
                pee.progresso_realizado,
                pee.homologado
            ORDER BY pee.descricao_entrega, pee.descricao
        SQL, [$objetivoId]);
    }

    /** @return list<\stdClass> */
    /** Unidades do plano de entregas (PE) vinculadas ao objetivo, com esforço somado de PTs concluídos (pode ser zero). */
    public function listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId(string $objetivoId): array
    {
        $jornadaDivisor = self::ESFORCO_COD_JORNADA_SEMANA_DIVISOR;
        $jornadaPadrao = self::ESFORCO_COD_JORNADA_PADRAO;

        return DB::select(<<<SQL
            SELECT
                u.id AS unidade_id,
                u.nome AS unidade_nome,
                u.sigla AS unidade_sigla,
                ROUND(
                    COALESCE(
                        SUM(
                            (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                            * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_horas_total
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            LEFT JOIN usuarios us ON us.id = pt.usuario_id AND us.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ? AND peeo.deleted_at IS NULL
            GROUP BY u.id, u.nome, u.sigla
            ORDER BY u.nome
        SQL, [$objetivoId]);
    }

    /**
     * @param  list<string>  $ids
     * @return list<\stdClass>
     */
    private function selectEsforcoMetricRowsForObjetivoIds(array $ids): array
    {
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $ptPlanejadoIn = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $diasPeriodo = self::ESFORCO_DIAS_PERIODO_PT_SQL;

        return DB::select(<<<SQL
            SELECT
                d.id AS objetivo_id,
                d.nome AS objetivo_nome,
                d.objetivo_pai_id,
                d.objetivo_superior_id,
                pla.nome AS planejamento_nome,
                tpo.nome AS tipo_objetivo_nome,
                COUNT(DISTINCT pee.id) AS total_entregas,
                ROUND(COALESCE(SUM(
                    (COALESCE(u.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        (COALESCE(u.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_proprio
            FROM planejamentos_objetivos d
            INNER JOIN planejamentos pla ON pla.id = d.planejamento_id
            LEFT JOIN planejamentos_tipos_objetivos tpo
                ON tpo.id = d.tipo_objetivo_id AND tpo.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas_objetivos peeo
                ON peeo.planejamento_objetivo_id = d.id AND peeo.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
            LEFT JOIN usuarios u
                ON u.id = pt.usuario_id AND u.deleted_at IS NULL
            WHERE d.id IN ({$placeholders}) AND d.deleted_at IS NULL
            GROUP BY d.id, d.nome, d.objetivo_pai_id, d.objetivo_superior_id, pla.nome, tpo.nome
            ORDER BY d.nome
        SQL, $ids);
    }

    public function buscarDadosGeraisPainel(string $objetivoId): ?\stdClass
    {
        return DB::selectOne(<<<SQL
            SELECT
                po.id AS objetivo_id,
                po.nome AS objetivo_nome,
                pla.nome AS planejamento_nome,
                COALESCE(tpo.nome, '') AS tipo_objetivo_nome,
                COALESCE(et.nome, '') AS eixo_tematico_nome
            FROM planejamentos_objetivos po
            INNER JOIN planejamentos pla ON pla.id = po.planejamento_id
            LEFT JOIN planejamentos_tipos_objetivos tpo
                ON tpo.id = po.tipo_objetivo_id AND tpo.deleted_at IS NULL
            INNER JOIN eixos_tematicos et ON et.id = po.eixo_tematico_id
            WHERE po.id = ? AND po.deleted_at IS NULL
        SQL, [$objetivoId]);
    }

    public function agregarPainelEsforcoPessoasEntregas(
        string $objetivoId,
        ?string $unidadeId = null,
        ?string $dataInicio = null,
        ?string $dataFim = null,
    ): \stdClass {
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $ptPlanejadoIn = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $ptExecutadoIn = ObjetivoPainelEsforcoSupport::ptStatusExecutadoIn();
        $diasPeriodo = self::ESFORCO_DIAS_PERIODO_PT_SQL;

        $row = DB::selectOne(<<<SQL
            WITH pt_vinculo AS (
                SELECT
                    pt.usuario_id,
                    MAX(CASE WHEN pt.unidade_id = pee.unidade_id THEN 1 ELSE 0 END) AS tem_propria,
                    MAX(CASE WHEN pt.unidade_id <> pee.unidade_id THEN 1 ELSE 0 END) AS tem_outras
                FROM planos_entregas_entregas_objetivos peeo
                INNER JOIN planos_entregas_entregas pee
                    ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
                INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
                LEFT JOIN planos_trabalhos_entregas pte
                    ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                LEFT JOIN planos_trabalhos pt
                    ON pt.id = pte.plano_trabalho_id
                    AND pt.deleted_at IS NULL
                    AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
                WHERE peeo.planejamento_objetivo_id = ?
                  AND peeo.deleted_at IS NULL
                  AND pt.usuario_id IS NOT NULL
                  AND (? IS NULL OR pee.unidade_id = ?)
                  AND (? IS NULL OR DATE(pt.data_fim) >= ?)
                  AND (? IS NULL OR DATE(pt.data_inicio) <= ?)
                GROUP BY pt.usuario_id
            )
            SELECT
                COUNT(DISTINCT pee.id) AS total_entregas,
                COUNT(DISTINCT CASE
                    WHEN COALESCE(pee.progresso_realizado, 0) >= 100 OR pee.homologado = 1 THEN pee.id
                END) AS entregas_concluidas,
                (SELECT COALESCE(SUM(CASE WHEN tem_propria = 1 AND tem_outras = 0 THEN 1 ELSE 0 END), 0) FROM pt_vinculo) AS participantes_somente_unidade_propria,
                (SELECT COALESCE(SUM(CASE WHEN tem_propria = 0 AND tem_outras = 1 THEN 1 ELSE 0 END), 0) FROM pt_vinculo) AS participantes_somente_outras_unidades,
                (SELECT COALESCE(SUM(CASE WHEN tem_propria = 1 AND tem_outras = 1 THEN 1 ELSE 0 END), 0) FROM pt_vinculo) AS participantes_em_ambas,
                ROUND(COALESCE(SUM(
                    (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_planejado_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptExecutadoIn}) THEN
                        (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                        * {$diasPeriodo}
                        * (COALESCE(pte.esforco_executado, pte.forca_trabalho) / 100.0)
                END), 0), 2) AS esforco_executado_horas,
                MAX(CASE WHEN pt.status IN ({$ptPlanejadoIn}) THEN 1 ELSE 0 END) AS tem_pt_pactuado,
                MAX(CASE WHEN pt.status IN ({$ptExecutadoIn}) THEN 1 ELSE 0 END) AS tem_pt_concluido,
                MAX(CASE WHEN pe.status NOT IN ('INCLUIDO', 'HOMOLOGANDO') THEN 1 ELSE 0 END) AS tem_pe_homologado
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
            LEFT JOIN usuarios us ON us.id = pt.usuario_id AND us.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ?
              AND peeo.deleted_at IS NULL
              AND (? IS NULL OR pee.unidade_id = ?)
              AND (? IS NULL OR DATE(pt.data_fim) >= ?)
              AND (? IS NULL OR DATE(pt.data_inicio) <= ?)
        SQL, array_merge(
            [$objetivoId, $unidadeId, $unidadeId, $dataInicio, $dataInicio, $dataFim, $dataFim],
            [$objetivoId, $unidadeId, $unidadeId, $dataInicio, $dataInicio, $dataFim, $dataFim],
        ));

        return $row ?? (object) [
            'total_entregas' => 0,
            'entregas_concluidas' => 0,
            'participantes_somente_unidade_propria' => 0,
            'participantes_somente_outras_unidades' => 0,
            'participantes_em_ambas' => 0,
            'esforco_disponivel_horas' => 0,
            'esforco_planejado_horas' => 0,
            'esforco_executado_horas' => 0,
            'tem_pt_pactuado' => 0,
            'tem_pt_concluido' => 0,
            'tem_pe_homologado' => 0,
        ];
    }

    public function listarUnidadesPainelPorObjetivoId(string $objetivoId): array
    {
        return DB::select(<<<SQL
            SELECT DISTINCT
                u.id AS unidade_id,
                u.sigla AS unidade_sigla,
                u.nome AS unidade_nome
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ?
              AND peeo.deleted_at IS NULL
            ORDER BY u.sigla, u.nome
        SQL, [$objetivoId]);
    }

    public function listarDetalhamentoEntregasPainel(
        string $objetivoId,
        ?string $planoEntregaEntregaId = null,
        ?string $unidadeId = null,
        ?string $dataInicio = null,
        ?string $dataFim = null,
    ): array {
        $jornadaDivisor = ObjetivoPainelEsforcoSupport::jornadaDivisor();
        $jornadaPadrao = ObjetivoPainelEsforcoSupport::jornadaPadrao();
        $ptPlanejadoIn = ObjetivoPainelEsforcoSupport::ptStatusPlanejadoIn();
        $ptExecutadoIn = ObjetivoPainelEsforcoSupport::ptStatusExecutadoIn();
        $diasPeriodo = self::ESFORCO_DIAS_PERIODO_PT_SQL;

        return DB::select(<<<SQL
            WITH pt_vinculo AS (
                SELECT
                    pee.id AS plano_entrega_entrega_id,
                    pt.usuario_id,
                    MAX(CASE WHEN pt.unidade_id = pee.unidade_id THEN 1 ELSE 0 END) AS tem_propria,
                    MAX(CASE WHEN pt.unidade_id <> pee.unidade_id THEN 1 ELSE 0 END) AS tem_outras
                FROM planos_entregas_entregas_objetivos peeo
                INNER JOIN planos_entregas_entregas pee
                    ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
                INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
                LEFT JOIN planos_trabalhos_entregas pte
                    ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                LEFT JOIN planos_trabalhos pt
                    ON pt.id = pte.plano_trabalho_id
                    AND pt.deleted_at IS NULL
                    AND pt.status NOT IN ('CANCELADO', 'SUSPENSO')
                WHERE peeo.planejamento_objetivo_id = ?
                  AND peeo.deleted_at IS NULL
                  AND pt.usuario_id IS NOT NULL
                  AND (? IS NULL OR pee.id = ?)
                  AND (? IS NULL OR pee.unidade_id = ?)
                  AND (? IS NULL OR DATE(pt.data_fim) >= ?)
                  AND (? IS NULL OR DATE(pt.data_inicio) <= ?)
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
                COALESCE(pee.descricao_entrega, pee.descricao, '') AS entrega_titulo,
                COALESCE(MAX(peep.progresso_esperado), MAX(pee.progresso_esperado)) AS progresso_esperado,
                COALESCE(MAX(peep.progresso_realizado), MAX(pee.progresso_realizado)) AS progresso_realizado,
                COALESCE(MAX(peep.homologado), MAX(pee.homologado)) AS homologado,
                MAX(peep.registro_execucao) AS registro_execucao,
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
                    (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                    * {$diasPeriodo}
                ), 0), 2) AS esforco_disponivel_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptPlanejadoIn}) THEN
                        (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                        * {$diasPeriodo}
                        * (pte.forca_trabalho / 100.0)
                END), 0), 2) AS esforco_planejado_horas,
                ROUND(COALESCE(SUM(CASE
                    WHEN pt.status IN ({$ptExecutadoIn}) THEN
                        (COALESCE(us.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                        * {$diasPeriodo}
                        * (COALESCE(pte.esforco_executado, pte.forca_trabalho) / 100.0)
                END), 0), 2) AS esforco_executado_horas,
                MAX(CASE WHEN pt.status IN ({$ptPlanejadoIn}) THEN 1 ELSE 0 END) AS tem_pt_pactuado,
                MAX(CASE WHEN pt.status IN ({$ptExecutadoIn}) THEN 1 ELSE 0 END) AS tem_pt_concluido
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN unidades u ON u.id = pee.unidade_id AND u.deleted_at IS NULL
            INNER JOIN planos_entregas pe ON pe.id = pee.plano_entrega_id AND pe.deleted_at IS NULL
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
            LEFT JOIN usuarios us ON us.id = pt.usuario_id AND us.deleted_at IS NULL
            LEFT JOIN participantes_por_entrega pp ON pp.plano_entrega_entrega_id = pee.id
            WHERE peeo.planejamento_objetivo_id = ?
              AND peeo.deleted_at IS NULL
              AND (? IS NULL OR pee.id = ?)
              AND (? IS NULL OR pee.unidade_id = ?)
              AND (? IS NULL OR DATE(pt.data_fim) >= ?)
              AND (? IS NULL OR DATE(pt.data_inicio) <= ?)
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
                pee.descricao
            ORDER BY pe.data_inicio DESC, u.sigla, pee.descricao_entrega, pee.descricao
        SQL, array_merge(
            [
                $objetivoId,
                $planoEntregaEntregaId,
                $planoEntregaEntregaId,
                $unidadeId,
                $unidadeId,
                $dataInicio,
                $dataInicio,
                $dataFim,
                $dataFim,
            ],
            [
                $objetivoId,
                $planoEntregaEntregaId,
                $planoEntregaEntregaId,
                $unidadeId,
                $unidadeId,
                $dataInicio,
                $dataInicio,
                $dataFim,
                $dataFim,
            ],
        ));
    }
}
