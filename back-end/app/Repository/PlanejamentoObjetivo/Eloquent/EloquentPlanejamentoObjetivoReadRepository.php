<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Eloquent;

use App\Models\PlanejamentoObjetivo;
use App\Models\PlanoEntregaEntregaObjetivo;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\Planejamento\Objetivo\DTOs\EntregasPorUnidadeDTO;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class EloquentPlanejamentoObjetivoReadRepository implements PlanejamentoObjetivoReadRepositoryContract
{
    private const CACHE_TTL_MINUTES = 10;
    private const CACHE_TAG = 'esforco-total';

    // TODO: Invalidar cache (Cache::tags('esforco-total')->flush()) nos seguintes eventos:
    // - PlanoTrabalho: status muda para/de CONCLUIDO
    // - PlanoTrabalhoEntrega: create/update/delete (altera forca_trabalho ou vínculo)
    // - PlanoEntregaEntregaObjetivo: create/delete (altera quais entregas pertencem ao objetivo)
    // - Usuario: cod_jornada alterado (afeta cálculo de horas)
    // - PlanejamentoObjetivo: create/update/delete (altera hierarquia da árvore)

    public function find(string $id): ?PlanejamentoObjetivo
    {
        return PlanejamentoObjetivo::where('id', $id)->whereNull('deleted_at')->first();
    }

    /** @return array<string, EsforcoNodeDTO> */
    public function getEsforcoTotal(PlanejamentoObjetivo $objetivo): array
    {
        $treeKey = "esforco-total:tree:{$objetivo->id}";
        $nodeIds = Cache::tags(self::CACHE_TAG)->get($treeKey);

        if ($nodeIds) {
            $map = [];
            foreach ($nodeIds as $id) {
                $node = Cache::tags(self::CACHE_TAG)->get("esforco-total:node:{$id}");
                if (!$node) {
                    // Cache parcialmente invalidado, rebuild
                    return $this->buildAndCache($objetivo->id);
                }
                $map[$id] = $node;
            }
            return $map;
        }

        return $this->buildAndCache($objetivo->id);
    }

    private function buildAndCache(string $raizId): array
    {
        $map = $this->buildMap($raizId);
        $ttl = now()->addMinutes(self::CACHE_TTL_MINUTES);

        // Cache a lista de UUIDs da árvore
        Cache::tags(self::CACHE_TAG)->put("esforco-total:tree:{$raizId}", array_keys($map), $ttl);

        // Cache cada nó individualmente
        foreach ($map as $id => $node) {
            Cache::tags(self::CACHE_TAG)->put("esforco-total:node:{$id}", $node, $ttl);
        }

        return $map;
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

    private function buildMap(string $raizId): array
    {
        $rows = DB::select(<<<SQL
            WITH RECURSIVE descendentes AS (
                SELECT id, nome, objetivo_pai_id, objetivo_superior_id
                FROM planejamentos_objetivos WHERE id = :raiz_id AND deleted_at IS NULL
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
                            (u.cod_jornada / 7.0)
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
        SQL, ['raiz_id' => $raizId]);

        $map = [];
        foreach ($rows as $row) {
            $map[$row->objetivo_id] = EsforcoNodeDTO::fromRow($row);
        }

        foreach ($map as $id => $node) {
            $parentId = $node->objetivo_pai_id;
            $superiorId = $node->objetivo_superior_id;

            // NOTE: prioriza objetivo_pai_id sobre objetivo_superior_id para evitar duplicação.
            // Edge-case: se um nó tem pai E superior ambos presentes no mapa, ele só aparece
            // como filho do pai. Avaliar se há cenários onde deveria aparecer em ambos.
            if ($parentId && $parentId !== $id && isset($map[$parentId])) {
                $map[$parentId]->filhos[] = $id;
            } elseif ($superiorId && $superiorId !== $id && isset($map[$superiorId])) {
                $map[$superiorId]->filhos[] = $id;
            }
        }

        $this->acumularHoras($raizId, $map);

        return $map;
    }

    private function acumularHoras(string $id, array &$map): float
    {
        $total = $map[$id]->esforco_proprio;
        foreach ($map[$id]->filhos as $filhoId) {
            $total += $this->acumularHoras($filhoId, $map);
        }
        $map[$id]->esforco_total_horas = round($total, 2);
        return $total;
    }
}
