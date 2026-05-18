<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Eloquent;

use App\Models\PlanejamentoObjetivo;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\Planejamento\Objetivo\DTOs\EntregasPorUnidadeDTO;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<PlanejamentoObjetivo>
 *
 * TODO: Invalidar cache (Cache::tags('esforco-total')->flush()) nos seguintes eventos:
 * - PlanoTrabalho: status muda para/de CONCLUIDO
 * - PlanoTrabalhoEntrega: create/update/delete (altera forca_trabalho ou vínculo)
 * - PlanoEntregaEntregaObjetivo: create/delete (altera quais entregas pertencem ao objetivo)
 * - Usuario: cod_jornada alterado (afeta cálculo de horas)
 * - PlanejamentoObjetivo: create/update/delete (altera hierarquia da árvore)
 */
class EloquentPlanejamentoObjetivoReadRepository extends AbstractEloquentReadRepository implements PlanejamentoObjetivoReadRepositoryContract
{
    private const CACHE_TTL_MINUTES = 10;
    private const CACHE_TAG = 'esforco-total';

    /** Divisor aplicado a {@see \App\Models\Usuario::$cod_jornada} no cálculo de esforço (jornada semanal → fator diário). */
    private const ESFORCO_COD_JORNADA_SEMANA_DIVISOR = 5.0;

    /** Horas semanais padrão quando {@see \App\Models\Usuario::$cod_jornada} é NULL no cálculo de esforço. */
    private const ESFORCO_COD_JORNADA_PADRAO = 40;

    public function __construct(PlanejamentoObjetivo $model)
    {
        $this->model = $model;
    }

    /** @return array<string, EsforcoNodeDTO> */
    public function getEsforcoTotal(PlanejamentoObjetivo $objetivo): array
    {
        $map = [];
        $missingIds = [];
        $this->loadEsforcoTotalFromCache($objetivo->id, $map, $missingIds);

        if (empty($missingIds)) {
            return $map;
        }

        // Rebuild apenas as subtrees dos nós ausentes
        $freshNodes = $this->buildMap($objetivo->id, $missingIds);
        $map = array_merge($map, $freshNodes);

        // Re-acumular totais do root (ancestrais dos nós frescos estão com totais stale)
        $pilhaAcumulo = [];
        $this->acumularHoras($objetivo->id, $map, $pilhaAcumulo);

        // Cachear todos os nós (frescos + atualizados)
        $ttl = now()->addMinutes(self::CACHE_TTL_MINUTES);
        foreach ($map as $id => $node) {
            Cache::tags(self::CACHE_TAG)->put("esforco-total:node:{$id}", $node, $ttl);
        }

        return $map;
    }

    /**
     * Tenta montar o mapa a partir do cache, navegando via filhos.
     * Coleta IDs dos nós ausentes em $missingIds.
     */
    private function loadEsforcoTotalFromCache(string $id, array &$map, array &$missingIds): void
    {
        if (isset($map[$id]) || in_array($id, $missingIds)) {
            return;
        }

        $node = Cache::tags(self::CACHE_TAG)->get("esforco-total:node:{$id}");
        if (!$node) {
            $missingIds[] = $id;
            return;
        }

        $map[$id] = $node;

        foreach ($node->filhos as $filhoId) {
            $this->loadEsforcoTotalFromCache($filhoId, $map, $missingIds);
        }
    }

    /** @return EntregasPorUnidadeDTO[] */
    public function getEntregasAgrupadasPorUnidade(string $objetivoId): array
    {
        return PlanoEntregaEntregaObjetivo::where('planejamento_objetivo_id', $objetivoId)
            ->with('entrega.unidade')
            ->get()
            ->pluck('entrega')
            ->filter()
            ->groupBy('unidade_id')
            ->map(fn($entregas) => EntregasPorUnidadeDTO::fromEntregas($entregas))
            ->values()
            ->all();
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
                pai.nome AS pai_nome,
                sup.nome AS sup_nome,
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
            LEFT JOIN planejamentos_objetivos pai ON pai.id = d.objetivo_pai_id AND pai.deleted_at IS NULL
            LEFT JOIN planejamentos_objetivos sup ON sup.id = d.objetivo_superior_id AND sup.deleted_at IS NULL
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
            GROUP BY d.id, d.nome, d.objetivo_pai_id, d.objetivo_superior_id, pla.nome, pai.nome, sup.nome
            ORDER BY d.nome
        SQL, $ids);
    }

    private function buildMap(string $raizId, array $seedIds = []): array
    {
        $ids = empty($seedIds) ? [$raizId] : $seedIds;
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $jornadaDivisor = self::ESFORCO_COD_JORNADA_SEMANA_DIVISOR;
        $jornadaPadrao = self::ESFORCO_COD_JORNADA_PADRAO;

        $rows = DB::select(<<<SQL
            WITH RECURSIVE descendentes AS (
                SELECT id, nome, objetivo_pai_id, objetivo_superior_id
                FROM planejamentos_objetivos WHERE id IN ({$placeholders}) AND deleted_at IS NULL
                UNION ALL
                SELECT po.id, po.nome, po.objetivo_pai_id, po.objetivo_superior_id
                FROM planejamentos_objetivos po
                INNER JOIN descendentes d ON (po.objetivo_pai_id = d.id OR po.objetivo_superior_id = d.id)
                WHERE po.deleted_at IS NULL
                  AND po.id != d.id -- previne auto-referência; ciclos indiretos (A→B→A) devem ser prevenidos na validação de escrita
            )
            SELECT
                d.id AS objetivo_id,
                d.nome AS objetivo_nome,
                d.objetivo_pai_id,
                d.objetivo_superior_id,
                pla.nome AS planejamento_nome,
                pai.nome AS pai_nome,
                sup.nome AS sup_nome,
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
            FROM descendentes d
            JOIN planejamentos_objetivos po ON po.id = d.id
            JOIN planejamentos pla ON pla.id = po.planejamento_id
            LEFT JOIN planejamentos_objetivos pai ON pai.id = d.objetivo_pai_id AND pai.deleted_at IS NULL
            LEFT JOIN planejamentos_objetivos sup ON sup.id = d.objetivo_superior_id AND sup.deleted_at IS NULL
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
            GROUP BY d.id, d.nome, d.objetivo_pai_id, d.objetivo_superior_id, pla.nome, pai.nome, sup.nome
            ORDER BY d.nome
        SQL, $ids);

        $map = [];
        foreach ($rows as $row) {
            $map[$row->objetivo_id] = EsforcoNodeDTO::fromRow($row);
        }

        foreach ($map as $id => $node) {
            $paiId = $node->objetivo_pai_id;
            $superiorId = $node->objetivo_superior_id;

            if (is_string($paiId) && $paiId !== '' && $paiId !== $id && isset($map[$paiId])) {
                $map[$paiId]->filhos_pai[] = $id;
            }
            if (is_string($superiorId) && $superiorId !== '' && $superiorId !== $id && isset($map[$superiorId])) {
                $map[$superiorId]->filhos_superior[] = $id;
            }
        }

        foreach ($map as $node) {
            $node->filhos = array_values(array_unique(array_merge($node->filhos_pai, $node->filhos_superior)));
        }

        return $map;
    }

    /**
     * @param  array<string, true>  $pilha
     */
    private function acumularHoras(string $id, array &$map, array &$pilha): float
    {
        if (!isset($map[$id])) {
            return 0.0;
        }
        if (isset($pilha[$id])) {
            return 0.0;
        }

        $pilha[$id] = true;
        $total = $map[$id]->esforco_proprio;
        foreach ($map[$id]->filhos as $filhoId) {
            $total += $this->acumularHoras((string) $filhoId, $map, $pilha);
        }
        unset($pilha[$id]);

        $map[$id]->esforco_total_horas = round($total, 2);

        return $total;
    }
}
