<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Models\PlanejamentoObjetivo;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use Illuminate\Support\Facades\DB;

class PlanejamentoObjetivoRepository
{
    public function find(string $id): ?PlanejamentoObjetivo
    {
        return PlanejamentoObjetivo::where('id', $id)->whereNull('deleted_at')->first();
    }

    /** @return array<string, EsforcoNodeDTO> */
    public function getEsforcoTotal(PlanejamentoObjetivo $objetivo): array
    {
        $map = $this->buildMap($objetivo->id);

        $map[$objetivo->id]['objetivo_pai'] = $objetivo->objetivo_pai_id
            ? ['id' => $objetivo->objetivoPai->id, 'nome' => $objetivo->objetivoPai->nome]
            : null;
        $map[$objetivo->id]['objetivo_superior'] = $objetivo->objetivo_superior_id
            ? ['id' => $objetivo->objetivoSuperior->id, 'nome' => $objetivo->objetivoSuperior->nome]
            : null;

        $result = [];
        foreach ($map as $id => $node) {
            $result[$id] = EsforcoNodeDTO::fromNode($node);
        }

        return $result;
    }

    private function buildMap(string $raizId): array
    {
        $rows = DB::select("
            WITH RECURSIVE descendentes AS (
                SELECT id, nome, objetivo_pai_id, objetivo_superior_id, 0 AS nivel
                FROM planejamentos_objetivos WHERE id = :raiz_id AND deleted_at IS NULL
                UNION ALL
                SELECT po.id, po.nome, po.objetivo_pai_id, po.objetivo_superior_id, d.nivel + 1
                FROM planejamentos_objetivos po
                INNER JOIN descendentes d ON po.objetivo_pai_id = d.id OR po.objetivo_superior_id = d.id
                WHERE po.deleted_at IS NULL
            )
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
            GROUP BY d.id, d.nome, d.objetivo_pai_id, d.objetivo_superior_id, pla.nome
            ORDER BY d.nome
        ", ['raiz_id' => $raizId]);

        $map = [];
        foreach ($rows as $row) {
            $map[$row->objetivo_id] = [
                'objetivo_id' => $row->objetivo_id,
                'objetivo_nome' => $row->objetivo_nome,
                'objetivo_pai_id' => $row->objetivo_pai_id,
                'objetivo_superior_id' => $row->objetivo_superior_id,
                'planejamento_nome' => $row->planejamento_nome,
                'total_entregas' => (int) $row->total_entregas,
                'esforco_proprio' => (float) $row->esforco_proprio,
                'esforco_total_horas' => (float) $row->esforco_proprio,
                'filhos' => [],
            ];
        }

        foreach ($map as $id => &$node) {
            $parentId = $node['objetivo_pai_id'];
            $superiorId = $node['objetivo_superior_id'];

            if ($parentId && isset($map[$parentId])) {
                $map[$parentId]['filhos'][] = $id;
            } elseif ($superiorId && isset($map[$superiorId])) {
                $map[$superiorId]['filhos'][] = $id;
            }
        }
        unset($node);

        $this->acumularHoras($raizId, $map);

        return $map;
    }

    private function acumularHoras(string $id, array &$map): float
    {
        $total = $map[$id]['esforco_proprio'];
        foreach ($map[$id]['filhos'] as $filhoId) {
            $total += $this->acumularHoras($filhoId, $map);
        }
        $map[$id]['esforco_total_horas'] = round($total, 2);
        return $total;
    }
}
