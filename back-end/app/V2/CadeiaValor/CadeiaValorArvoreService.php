<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphDataProvider;
use App\V2\ArvoreInstitucional\DTOs\ArvoreResponseDTO;

class CadeiaValorArvoreService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalEsforcoGraphDataProvider $esforcoGraphDataProvider,
    ) {}

    /**
     * Retorna todos os processos da cadeia de valor como mapa de nós genérico (ArvoreResponseDTO).
     * Inclui nós cross-cadeia (processos de outras cadeias vinculados via entregas compartilhadas).
     */
    public function getArvore(string $cadeiaValorId, string $processoId): ArvoreResponseDTO
    {
        $cadeiaValor = $this->repository->findCadeiaValor($cadeiaValorId);
        if (!$cadeiaValor instanceof CadeiaValor) {
            throw new NotFoundException("Cadeia de valor com id '{$cadeiaValorId}' não encontrada.");
        }

        $processoFocal = $this->repository->findProcesso($processoId, $cadeiaValorId);
        if (!$processoFocal instanceof CadeiaValorProcesso) {
            throw new NotFoundException("Processo com id '{$processoId}' não encontrado na cadeia de valor.");
        }

        $esforcoMap = $this->esforcoGraphDataProvider->carregarEsforcoAcumulado(CadeiaValorNoConfig::get(), containerId: $cadeiaValorId);

        $crossCadeiaMap = $this->injetarVinculosCrossCadeia($esforcoMap, $cadeiaValorId);

        return ArvoreResponseDTO::fromMapa($processoId, $esforcoMap, subtitulo: $cadeiaValor->nome, metadata: [
            'cross_cadeia_map' => $crossCadeiaMap,
        ]);
    }

    /**
     * Busca processos de outras cadeias vinculados via entregas compartilhadas e os injeta no mapa.
     *
     * Para cada vínculo encontrado:
     * - Adiciona o processo cross-cadeia como nó no mapa (com container_nome = nome da outra cadeia)
     * - Popula filhos_secundario no processo de origem
     * - Popula no_pai_secundario_id no nó cross-cadeia apontando para o processo de origem
     *
     * @param array<string, array<string, mixed>> $mapa
     * @return array<string, string> Mapa processo_id → cadeia_valor_id (para navegação no front-end)
     */
    private function injetarVinculosCrossCadeia(array &$mapa, string $cadeiaValorIdAtual): array
    {
        $processoIds = array_keys($mapa);
        if ($processoIds === []) {
            return [];
        }

        $vinculos = $this->repository->buscarVinculosCrossCadeia($processoIds, $cadeiaValorIdAtual);
        if ($vinculos === []) {
            return [];
        }

        foreach ($mapa as &$node) {
            if (!isset($node['filhos_secundario'])) {
                $node['filhos_secundario'] = [];
            }
        }
        unset($node);

        $crossCadeiaMap = [];

        foreach ($vinculos as $vinculo) {
            $origemId = (string) $vinculo->processo_origem_id;
            $crossId = (string) $vinculo->processo_id;

            if (!isset($mapa[$origemId])) {
                continue;
            }

            if (!isset($crossCadeiaMap[$crossId])) {
                $mapa[$crossId] = [
                    'no_nome' => (string) $vinculo->processo_nome,
                    'no_pai_id' => null,
                    'no_pai_secundario_id' => $origemId,
                    'container_nome' => (string) $vinculo->cadeia_valor_nome,
                    'tipo_nome' => null,
                    'total_entregas' => 0,
                    'esforco_disponivel_horas' => 0,
                    'esforco_proprio' => 0,
                    'esforco_total_horas' => 0,
                    'planejado_percentual_disponivel' => 0,
                    'filhos_pai' => [],
                    'filhos_secundario' => [],
                    'filhos' => [],
                ];
                $crossCadeiaMap[$crossId] = (string) $vinculo->cadeia_valor_id;
            }

            if (!in_array($crossId, $mapa[$origemId]['filhos_secundario'], true)) {
                $mapa[$origemId]['filhos_secundario'][] = $crossId;
            }
        }

        return $crossCadeiaMap;
    }
}
