<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use stdClass;

/**
 * Monta o mapa de esforço acumulado (fechamento bidirecional) a partir das linhas do repository.
 */
final class EsforcoTotalGraphAssembler
{
    /**
     * @param  list<stdClass>  $rows
     * @param  callable(list<string>): array<string, string>  $lookupNomes
     * @return array<string, EsforcoNodeDTO>
     */
    public function assemble(array $rows, callable $lookupNomes): array
    {
        if ($rows === []) {
            return [];
        }

        $map = $this->montarMapa($rows);
        $this->conectarFilhos($map);
        $this->acumularHoras($map);
        $this->hidratarVinculos($map, $lookupNomes);

        return $this->mapaParaDTOs($map);
    }

    /**
     * @param  list<stdClass>  $rows
     * @return array<string, array<string, mixed>>
     */
    private function montarMapa(array $rows): array
    {
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
                'filhos_pai' => [],
                'filhos_superior' => [],
                'objetivo_pai' => null,
                'objetivo_superior' => null,
            ];
        }

        return $map;
    }

    /**
     * @param  array<string, array<string, mixed>>  $map
     */
    private function conectarFilhos(array &$map): void
    {
        foreach ($map as $id => $node) {
            $paiId = $node['objetivo_pai_id'] ?? null;
            $superiorId = $node['objetivo_superior_id'] ?? null;

            if (is_string($paiId) && $paiId !== '' && isset($map[$paiId])) {
                $map[$paiId]['filhos_pai'][] = $id;
            }
            if (is_string($superiorId) && $superiorId !== '' && isset($map[$superiorId])) {
                $map[$superiorId]['filhos_superior'][] = $id;
            }
        }

        foreach ($map as $id => &$node) {
            $node['filhos'] = array_values(array_unique(array_merge($node['filhos_pai'], $node['filhos_superior'])));
        }
        unset($node);
    }

    /**
     * @param  array<string, array<string, mixed>>  $map
     */
    private function acumularHoras(array &$map): void
    {
        $computado = [];
        $pilha = [];

        foreach ($map as $id => $_) {
            $this->acumularHorasRec($id, $map, $computado, $pilha);
        }
    }

    /**
     * @param  array<string, array<string, mixed>>  $map
     * @param  array<string, float>  $computado
     * @param  array<string, true>  $pilha
     */
    private function acumularHorasRec(string $id, array &$map, array &$computado, array &$pilha): float
    {
        if (!isset($map[$id])) {
            return 0.0;
        }
        if (isset($computado[$id])) {
            return $computado[$id];
        }
        if (isset($pilha[$id])) {
            return 0.0;
        }

        $pilha[$id] = true;

        $total = (float) $map[$id]['esforco_proprio'];
        foreach ($map[$id]['filhos'] as $filhoId) {
            $total += $this->acumularHorasRec((string) $filhoId, $map, $computado, $pilha);
        }

        unset($pilha[$id]);

        $totalArredondado = round($total, 2);
        $computado[$id] = $totalArredondado;
        $map[$id]['esforco_total_horas'] = $totalArredondado;

        return $totalArredondado;
    }

    /**
     * @param  array<string, array<string, mixed>>  $map
     * @param  callable(list<string>): array<string, string>  $lookupNomes
     */
    private function hidratarVinculos(array &$map, callable $lookupNomes): void
    {
        $idsParaNome = [];
        foreach ($map as $node) {
            if (!empty($node['objetivo_pai_id'])) {
                $idsParaNome[] = (string) $node['objetivo_pai_id'];
            }
            if (!empty($node['objetivo_superior_id'])) {
                $idsParaNome[] = (string) $node['objetivo_superior_id'];
            }
        }

        $nomesPorId = $lookupNomes($idsParaNome);

        foreach ($map as &$node) {
            $paiId = $node['objetivo_pai_id'] ?? null;
            $supId = $node['objetivo_superior_id'] ?? null;

            $node['objetivo_pai'] = (is_string($paiId) && $paiId !== '' && isset($nomesPorId[$paiId]))
                ? ['id' => $paiId, 'nome' => $nomesPorId[$paiId]]
                : null;
            $node['objetivo_superior'] = (is_string($supId) && $supId !== '' && isset($nomesPorId[$supId]))
                ? ['id' => $supId, 'nome' => $nomesPorId[$supId]]
                : null;
        }
        unset($node);
    }

    /**
     * @param  array<string, array<string, mixed>>  $map
     * @return array<string, EsforcoNodeDTO>
     */
    private function mapaParaDTOs(array $map): array
    {
        $result = [];
        foreach ($map as $id => $node) {
            $result[$id] = EsforcoNodeDTO::fromNode($node);
        }

        return $result;
    }
}
