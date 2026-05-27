<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Eloquent;

use App\Models\PlanejamentoObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
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
            INNER JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            INNER JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            INNER JOIN usuarios us ON us.id = pt.usuario_id AND us.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ? AND peeo.deleted_at IS NULL
            GROUP BY u.id, u.nome, u.sigla
            HAVING esforco_horas_total > 0
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
        $jornadaDivisor = self::ESFORCO_COD_JORNADA_SEMANA_DIVISOR;
        $jornadaPadrao = self::ESFORCO_COD_JORNADA_PADRAO;

        return DB::select(<<<SQL
            SELECT
                d.id AS objetivo_id,
                d.nome AS objetivo_nome,
                d.objetivo_pai_id,
                d.objetivo_superior_id,
                pla.nome AS planejamento_nome,
                COUNT(DISTINCT pee.id) AS total_entregas,
                ROUND(
                    COALESCE(
                        SUM(
                            (COALESCE(u.cod_jornada, {$jornadaPadrao}) / {$jornadaDivisor})
                            * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_proprio
            FROM planejamentos_objetivos d
            INNER JOIN planejamentos pla ON pla.id = d.planejamento_id
            LEFT JOIN planos_entregas_entregas_objetivos peeo
                ON peeo.planejamento_objetivo_id = d.id AND peeo.deleted_at IS NULL
            LEFT JOIN planos_entregas_entregas pee
                ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            LEFT JOIN planos_trabalhos_entregas pte
                ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            LEFT JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
            LEFT JOIN usuarios u
                ON u.id = pt.usuario_id AND u.deleted_at IS NULL
            WHERE d.id IN ({$placeholders}) AND d.deleted_at IS NULL
            GROUP BY d.id, d.nome, d.objetivo_pai_id, d.objetivo_superior_id, pla.nome
            ORDER BY d.nome
        SQL, $ids);
    }
}
