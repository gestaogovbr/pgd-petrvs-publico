<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

/**
 * Assembler genérico para grafo de esforço acumulado.
 * Fornece algoritmos de conexão de filhos, acumulação recursiva de horas
 * e hidratação de nomes — independentes do domínio (Planejamento ou Cadeia de Valor).
 */
final class ArvoreInstitucionalEsforcoGraphAssembler
{
    /**
     * Conecta filhos no mapa com base em N campos de parentesco.
     * Para cada campo, popula um array com a chave de saída correspondente no nó pai.
     * Também popula um array `filhos` com a união de todos.
     *
     * @param array<string, array<string, mixed>> $mapa
     * @param list<array{field: string, key: string}> $linkFields Campos de parentesco e suas chaves de saída
     *        Ex: [['field' => 'objetivo_pai_id', 'key' => 'filhos_pai'], ['field' => 'objetivo_superior_id', 'key' => 'filhos_superior']]
     */
    public function conectarFilhos(array &$mapa, array $linkFields): void
    {
        // Inicializar arrays de filhos
        foreach ($mapa as &$node) {
            foreach ($linkFields as $link) {
                if (!isset($node[$link['key']])) {
                    $node[$link['key']] = [];
                }
            }
            if (!isset($node['filhos'])) {
                $node['filhos'] = [];
            }
        }
        unset($node);

        // Popular filhos
        foreach ($mapa as $id => $node) {
            foreach ($linkFields as $link) {
                $parentId = $node[$link['field']] ?? null;
                if (!is_string($parentId) || $parentId === '' || !isset($mapa[$parentId])) {
                    continue;
                }
                $mapa[$parentId][$link['key']][] = $id;
            }
        }

        // Computar filhos (união) e total_vinculos
        foreach ($mapa as $id => &$node) {
            $allFilhos = [];
            foreach ($linkFields as $link) {
                foreach ($node[$link['key']] as $filhoId) {
                    $allFilhos[$filhoId] = true;
                }
            }
            $node['filhos'] = array_keys($allFilhos);
            $node['total_vinculos'] = count($node['filhos']);
        }
        unset($node);
    }

    /**
     * Acumula horas recursivamente: esforco_total_horas = esforco_proprio + sum(filhos.esforco_total_horas).
     * Opera sobre o mapa in-place. Cada nó deve ter 'esforco_proprio' e 'filhos' já populados.
     *
     * @param array<string, array<string, mixed>> $mapa
     */
    public function acumularHoras(array &$mapa): void
    {
        $computado = [];
        $pilha = [];

        foreach ($mapa as $id => $_) {
            $this->acumularHorasRec($id, $mapa, $computado, $pilha);
        }
    }

    /**
     * Hidrata nomes de referências (pai, superior, etc.) no mapa.
     * Para cada campo em $camposRef, busca o nome via $lookupNomes e popula
     * um campo associado no formato `{campo_sem_id}` = ['id' => ..., 'nome' => ...].
     *
     * @param array<string, array<string, mixed>> $mapa
     * @param list<string> $camposRef Campos de referência (ex: ['objetivo_pai_id', 'objetivo_superior_id'])
     * @param callable(list<string>): array<string, string> $lookupNomes
     */
    public function hidratarNomes(array &$mapa, array $camposRef, callable $lookupNomes): void
    {
        $idsParaNome = [];
        foreach ($mapa as $node) {
            foreach ($camposRef as $field) {
                $refId = $node[$field] ?? null;
                if (is_string($refId) && $refId !== '') {
                    $idsParaNome[] = $refId;
                }
            }
        }

        if ($idsParaNome === []) {
            return;
        }

        $nomesPorId = $lookupNomes(array_values(array_unique($idsParaNome)));

        foreach ($mapa as &$node) {
            foreach ($camposRef as $field) {
                $refId = $node[$field] ?? null;
                $nomeKey = str_replace('_id', '', $field);
                $node[$nomeKey] = (is_string($refId) && $refId !== '' && isset($nomesPorId[$refId]))
                    ? ['id' => $refId, 'nome' => $nomesPorId[$refId]]
                    : null;
            }
        }
        unset($node);
    }

    /**
     * @param array<string, array<string, mixed>> $mapa
     * @param array<string, float> $computado
     * @param array<string, true> $pilha
     */
    private function acumularHorasRec(string $id, array &$mapa, array &$computado, array &$pilha): float
    {
        if (!isset($mapa[$id])) {
            return 0.0;
        }
        if (isset($computado[$id])) {
            return $computado[$id];
        }
        if (isset($pilha[$id])) {
            return 0.0;
        }

        $pilha[$id] = true;

        $total = (float) ($mapa[$id]['esforco_proprio'] ?? 0);
        foreach ($mapa[$id]['filhos'] as $filhoId) {
            $total += $this->acumularHorasRec((string) $filhoId, $mapa, $computado, $pilha);
        }

        unset($pilha[$id]);

        $totalArredondado = round($total, 2);
        $computado[$id] = $totalArredondado;
        $mapa[$id]['esforco_total_horas'] = $totalArredondado;

        return $totalArredondado;
    }
}
