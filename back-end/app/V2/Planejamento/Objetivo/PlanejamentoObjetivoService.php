<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Exceptions\NotFoundException;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEntregaPlanoItemDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEntregasListagemDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEsforcoPorUnidadeDTO;
use stdClass;

class PlanejamentoObjetivoService
{
    public function __construct(
        private readonly PlanejamentoObjetivoRepository $repository,
    ) {}

    /**
     * Retorna o fechamento bidirecional do objetivo (descendentes + ancestrais),
     * navegando pelas duas formas de vínculo (objetivo_pai_id e objetivo_superior_id),
     * com esforço acumulado em cada nó e nomes de pai/superior hidratados em todo o mapa.
     *
     * @return array<string, EsforcoNodeDTO>
     */
    public function getEsforcoTotal(string $objetivoId): array
    {
        $objetivo = $this->repository->find($objetivoId);
        if ($objetivo === null) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        $ids = $this->repository->coletarIdsFechamento($objetivo->id);
        if ($ids === []) {
            return [];
        }

        $map = $this->montarMapa($this->repository->loadEsforcoPorIds($ids));
        $this->conectarFilhos($map);
        $this->acumularHoras($map);
        $this->hidratarVinculos($map);

        return $this->mapaParaDTOs($map);
    }

    /**
     * Entregas do plano de entregas vinculadas ao objetivo (com progresso no PE) e esforço agregado
     * por entrega e por unidade (somente planos de trabalho concluídos), alinhado a {@see getEsforcoTotal}.
     */
    public function getEntregasComEsforco(string $objetivoId): ObjetivoEntregasListagemDTO
    {
        $objetivo = $this->repository->find($objetivoId);
        if ($objetivo === null) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        $rowsEntregas = $this->repository->listarEntregasPlanoEntregaPorObjetivoId($objetivoId);
        $rowsUnidades = $this->repository->listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId($objetivoId);

        $itens = array_map(fn (stdClass $row) => $this->linhaPlanoEntregaParaDto($row), $rowsEntregas);
        $porUnidade = array_map(
            static fn (stdClass $row) => new ObjetivoEsforcoPorUnidadeDTO(
                unidade_id: (string) $row->unidade_id,
                unidade_nome: (string) $row->unidade_nome,
                unidade_sigla: (string) $row->unidade_sigla,
                esforco_horas_total: (float) $row->esforco_horas_total,
            ),
            $rowsUnidades
        );

        return new ObjetivoEntregasListagemDTO(
            objetivo_id: $objetivoId,
            total_entregas: count($itens),
            itens: $itens,
            esforco_por_unidade: $porUnidade,
        );
    }

    private function linhaPlanoEntregaParaDto(stdClass $row): ObjetivoEntregaPlanoItemDTO
    {
        $catalogoIdRaw = $row->entrega_catalogo_id ?? null;
        $catalogoId = $catalogoIdRaw !== null && $catalogoIdRaw !== ''
            ? (string) $catalogoIdRaw
            : null;
        $catalogoNomeRaw = $row->entrega_catalogo_nome ?? null;
        $catalogoNome = $catalogoNomeRaw !== null && $catalogoNomeRaw !== ''
            ? (string) $catalogoNomeRaw
            : null;

        $homologado = (bool) ((int) ($row->homologado ?? 0) !== 0);

        return new ObjetivoEntregaPlanoItemDTO(
            plano_entrega_entrega_id: (string) $row->plano_entrega_entrega_id,
            entrega_titulo: (string) $row->entrega_titulo,
            entrega_catalogo_id: $catalogoId,
            entrega_catalogo_nome: $catalogoNome,
            entrega_unidade_id: (string) $row->entrega_unidade_id,
            entrega_unidade_nome: (string) $row->entrega_unidade_nome,
            entrega_unidade_sigla: (string) $row->entrega_unidade_sigla,
            progresso_esperado: (float) $row->progresso_esperado,
            progresso_realizado: (float) $row->progresso_realizado,
            homologado: $homologado,
            esforco_horas_total: (float) $row->esforco_horas_total,
        );
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
     * Monta listas de adjacência separadas para cada tipo de vínculo,
     * preservando a aresta quando um filho tem pai e superior simultaneamente.
     *
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
     * Calcula esforço acumulado em cada nó: próprio + soma dos descendentes
     * (alcançáveis por filhos_pai e filhos_superior). Memoizado e protegido contra ciclo.
     *
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
            return (float) $map[$id]['esforco_proprio'];
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
     * Preenche objetivo_pai e objetivo_superior ({id, nome}) em todos os nós.
     *
     * @param  array<string, array<string, mixed>>  $map
     */
    private function hidratarVinculos(array &$map): void
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

        $nomesPorId = $this->repository->lookupNomes($idsParaNome);

        foreach ($map as $id => &$node) {
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
