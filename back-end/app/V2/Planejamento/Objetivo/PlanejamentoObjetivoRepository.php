<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Models\PlanejamentoObjetivo;
use Illuminate\Support\Facades\DB;
use stdClass;

class PlanejamentoObjetivoRepository
{
    /** Limite de profundidade da expansão para evitar loop por dado sujo no banco. */
    private const MAX_NIVEIS_FECHAMENTO = 50;

    /** Tamanho máximo do bloco para WHERE IN evitar excesso de placeholders. */
    private const CHUNK_IDS = 400;

    public function find(string $id): ?PlanejamentoObjetivo
    {
        return PlanejamentoObjetivo::query()
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();
    }

    /**
     * Coleta o fechamento bidirecional (descendentes + ancestrais) a partir do raiz,
     * seguindo as duas formas de vínculo: objetivo_pai_id e objetivo_superior_id.
     *
     * Implementado em BFS no PHP para evitar CTE recursivo (restrição ER_4008 do MariaDB
     * quando há subconsulta sobre a própria CTE) e para garantir proteção contra ciclos.
     *
     * @return list<string>
     */
    public function coletarIdsFechamento(string $raizId): array
    {
        $existeRaiz = DB::table('planejamentos_objetivos')
            ->where('id', $raizId)
            ->whereNull('deleted_at')
            ->exists();

        if (!$existeRaiz) {
            return [];
        }

        $visitados = [$raizId => true];
        $fronteira = [$raizId];
        $nivel = 0;

        while ($fronteira !== [] && $nivel < self::MAX_NIVEIS_FECHAMENTO) {
            $novosIds = $this->expandirVizinhos($fronteira);
            $proximaFronteira = [];

            foreach ($novosIds as $id) {
                if (!isset($visitados[$id])) {
                    $visitados[$id] = true;
                    $proximaFronteira[] = $id;
                }
            }

            if ($proximaFronteira === []) {
                break;
            }

            $fronteira = $proximaFronteira;
            $nivel++;
        }

        return array_keys($visitados);
    }

    /**
     * Carrega métricas agregadas (esforço próprio, total de entregas e planejamento)
     * para o conjunto de IDs informado. Sem CTE, sem recursão SQL.
     *
     * @param  list<string>  $ids
     * @return list<stdClass>
     */
    public function loadEsforcoPorIds(array $ids): array
    {
        $ids = array_values(array_unique(array_filter($ids)));
        if ($ids === []) {
            return [];
        }

        $rows = [];
        foreach (array_chunk($ids, self::CHUNK_IDS) as $chunk) {
            $placeholders = implode(',', array_fill(0, count($chunk), '?'));
            $sql = "
                SELECT
                    po.id AS objetivo_id,
                    po.nome AS objetivo_nome,
                    po.objetivo_pai_id,
                    po.objetivo_superior_id,
                    pla.nome AS planejamento_nome,
                    COUNT(DISTINCT pee.id) AS total_entregas,
                    ROUND(
                        COALESCE(
                            SUM(
                                (u.cod_jornada / 7.0)
                                * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                                * (pte.forca_trabalho / 100.0)
                            ),
                            0
                        ),
                        2
                    ) AS esforco_proprio
                FROM planejamentos_objetivos po
                JOIN planejamentos pla ON pla.id = po.planejamento_id
                LEFT JOIN planos_entregas_entregas_objetivos peeo
                    ON peeo.planejamento_objetivo_id = po.id AND peeo.deleted_at IS NULL
                LEFT JOIN planos_entregas_entregas pee
                    ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
                LEFT JOIN planos_trabalhos_entregas pte
                    ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
                LEFT JOIN planos_trabalhos pt
                    ON pt.id = pte.plano_trabalho_id AND pt.deleted_at IS NULL AND pt.status IN ('CONCLUIDO')
                LEFT JOIN usuarios u
                    ON u.id = pt.usuario_id AND u.deleted_at IS NULL
                WHERE po.id IN ({$placeholders})
                  AND po.deleted_at IS NULL
                GROUP BY po.id, po.nome, po.objetivo_pai_id, po.objetivo_superior_id, pla.nome
                ORDER BY po.nome
            ";

            $rows = array_merge($rows, DB::select($sql, $chunk));
        }

        return $rows;
    }

    /**
     * Entregas do plano de entregas vinculadas ao objetivo (progresso no PE; esforço somado só com PT concluído).
     *
     * @return list<stdClass>
     */
    public function listarEntregasPlanoEntregaPorObjetivoId(string $objetivoId): array
    {
        $sql = "
            SELECT
                pee.id AS plano_entrega_entrega_id,
                COALESCE(
                    NULLIF(TRIM(pee.descricao_entrega), ''),
                    NULLIF(TRIM(pee.descricao), ''),
                    NULLIF(TRIM(e.nome), ''),
                    '—'
                ) AS entrega_titulo,
                e.id AS entrega_catalogo_id,
                e.nome AS entrega_catalogo_nome,
                pee.unidade_id AS entrega_unidade_id,
                u_pe.nome AS entrega_unidade_nome,
                u_pe.sigla AS entrega_unidade_sigla,
                ROUND(COALESCE(pee.progresso_esperado, 0), 2) AS progresso_esperado,
                ROUND(COALESCE(pee.progresso_realizado, 0), 2) AS progresso_realizado,
                pee.homologado AS homologado,
                ROUND(COALESCE(ept_agg.esforco_horas_total, 0), 2) AS esforco_horas_total
            FROM planos_entregas_entregas pee
            INNER JOIN (
                SELECT DISTINCT peeo_inner.entrega_id AS entrega_pee_id
                FROM planos_entregas_entregas_objetivos peeo_inner
                WHERE peeo_inner.planejamento_objetivo_id = ?
                  AND peeo_inner.deleted_at IS NULL
            ) filtro_obj ON filtro_obj.entrega_pee_id = pee.id
            LEFT JOIN entregas e ON e.id = pee.entrega_id AND e.deleted_at IS NULL
            LEFT JOIN unidades u_pe ON u_pe.id = pee.unidade_id AND u_pe.deleted_at IS NULL
            LEFT JOIN (
                SELECT
                    pte.plano_entrega_entrega_id,
                    ROUND(
                        COALESCE(
                            SUM(
                                (u.cod_jornada / 7.0)
                                * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                                * (pte.forca_trabalho / 100.0)
                            ),
                            0
                        ),
                        2
                    ) AS esforco_horas_total
                FROM planos_trabalhos_entregas pte
                INNER JOIN planos_trabalhos pt
                    ON pt.id = pte.plano_trabalho_id
                    AND pt.deleted_at IS NULL
                    AND pt.status IN ('CONCLUIDO')
                INNER JOIN usuarios u ON u.id = pt.usuario_id AND u.deleted_at IS NULL
                WHERE pte.deleted_at IS NULL
                GROUP BY pte.plano_entrega_entrega_id
            ) ept_agg ON ept_agg.plano_entrega_entrega_id = pee.id
            WHERE pee.deleted_at IS NULL
            ORDER BY entrega_titulo ASC, pee.id ASC
        ";

        return DB::select($sql, [$objetivoId]);
    }

    /**
     * Esforço total por unidade do plano de trabalho (PT concluído) nas entregas do PE ligadas ao objetivo.
     *
     * @return list<stdClass>
     */
    public function listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId(string $objetivoId): array
    {
        $sql = "
            SELECT
                un.id AS unidade_id,
                un.nome AS unidade_nome,
                un.sigla AS unidade_sigla,
                ROUND(
                    COALESCE(
                        SUM(
                            (u.cod_jornada / 7.0)
                            * (DATEDIFF(pt.data_fim, pt.data_inicio) + 1)
                            * (pte.forca_trabalho / 100.0)
                        ),
                        0
                    ),
                    2
                ) AS esforco_horas_total
            FROM planos_entregas_entregas_objetivos peeo
            INNER JOIN planos_entregas_entregas pee ON pee.id = peeo.entrega_id AND pee.deleted_at IS NULL
            INNER JOIN planos_trabalhos_entregas pte ON pte.plano_entrega_entrega_id = pee.id AND pte.deleted_at IS NULL
            INNER JOIN planos_trabalhos pt
                ON pt.id = pte.plano_trabalho_id
                AND pt.deleted_at IS NULL
                AND pt.status IN ('CONCLUIDO')
            INNER JOIN usuarios u ON u.id = pt.usuario_id AND u.deleted_at IS NULL
            INNER JOIN unidades un ON un.id = pt.unidade_id AND un.deleted_at IS NULL
            WHERE peeo.planejamento_objetivo_id = ?
              AND peeo.deleted_at IS NULL
            GROUP BY un.id, un.nome, un.sigla
            ORDER BY un.nome ASC
        ";

        return DB::select($sql, [$objetivoId]);
    }

    /**
     * @param  list<string>  $ids
     * @return array<string, string>  id => nome
     */
    public function lookupNomes(array $ids): array
    {
        $ids = array_values(array_unique(array_filter($ids)));
        if ($ids === []) {
            return [];
        }

        return PlanejamentoObjetivo::query()
            ->whereIn('id', $ids)
            ->whereNull('deleted_at')
            ->pluck('nome', 'id')
            ->all();
    }

    /**
     * Uma iteração da BFS bidirecional: encontra todos os vizinhos imediatos
     * (ascendentes e descendentes) dos IDs da fronteira atual.
     *
     * @param  list<string>  $fronteira
     * @return list<string>
     */
    private function expandirVizinhos(array $fronteira): array
    {
        $ids = [];

        foreach (array_chunk($fronteira, self::CHUNK_IDS) as $chunk) {
            $placeholders = implode(',', array_fill(0, count($chunk), '?'));
            $bindings = array_merge($chunk, $chunk, $chunk, $chunk);

            $sql = "
                SELECT po.id
                FROM planejamentos_objetivos po
                WHERE po.deleted_at IS NULL
                  AND (
                      po.objetivo_pai_id IN ({$placeholders})
                      OR po.objetivo_superior_id IN ({$placeholders})
                      OR po.id IN (
                          SELECT p.objetivo_pai_id
                          FROM planejamentos_objetivos p
                          WHERE p.id IN ({$placeholders}) AND p.objetivo_pai_id IS NOT NULL
                          UNION
                          SELECT p.objetivo_superior_id
                          FROM planejamentos_objetivos p
                          WHERE p.id IN ({$placeholders}) AND p.objetivo_superior_id IS NOT NULL
                      )
                  )
            ";

            foreach (DB::select($sql, $bindings) as $row) {
                $ids[] = (string) $row->id;
            }
        }

        return array_values(array_unique($ids));
    }
}
