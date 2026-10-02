<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\Planejamento\Objetivo\DTOs\ObjetivoArvoreSuperiorResumoDTO;

/**
 * Monta a cadeia de superiores a partir do mapa de esforço genérico (carregarEsforcoAcumulado).
 */
final class ObjetivoArvoreVisualizacaoAssembler
{
    /**
     * Sobe por no_pai_secundario_id (objetivo_superior_id) a partir do nó consultado.
     *
     * @param array<string, array<string, mixed>> $nos Mapa genérico do carregarEsforcoAcumulado
     * @return list<ObjetivoArvoreSuperiorResumoDTO>
     */
    public function montarCadeiaSuperior(string $partidaId, array $nos): array
    {
        if (!isset($nos[$partidaId])) {
            return [];
        }

        $cadeia = [];
        $atualId = $partidaId;
        $nivel = 0;

        while (isset($nos[$atualId])) {
            $superiorId = $nos[$atualId]['no_pai_secundario_id'] ?? null;
            if (!is_string($superiorId) || $superiorId === '' || !isset($nos[$superiorId])) {
                break;
            }

            $superior = $nos[$superiorId];
            $nivel++;

            $cadeia[] = new ObjetivoArvoreSuperiorResumoDTO(
                objetivo_id: $superiorId,
                objetivo_nome: (string) ($superior['no_nome'] ?? ''),
                planejamento_nome: (string) ($superior['container_nome'] ?? ''),
                hierarquia_linhas: $this->montarHierarquiaInterna($superiorId, $nos),
                nivel_superior: $nivel,
                objetivo_superior_id: $superior['no_pai_secundario_id'] ?? null,
            );

            $atualId = $superiorId;
        }

        return $cadeia;
    }

    /**
     * Caminho de no_pai_id (objetivo_pai_id) dentro do mesmo planejamento (raiz → nó).
     *
     * @param array<string, array<string, mixed>> $nos
     * @return list<string>
     */
    private function montarHierarquiaInterna(string $objetivoId, array $nos): array
    {
        $nomes = [];
        $visitados = [];
        $atualId = $objetivoId;

        while (isset($nos[$atualId]) && !isset($visitados[$atualId])) {
            $visitados[$atualId] = true;
            $nomes[] = (string) ($nos[$atualId]['no_nome'] ?? '');
            $paiId = $nos[$atualId]['no_pai_id'] ?? null;
            if (!is_string($paiId) || $paiId === '' || !isset($nos[$paiId])) {
                break;
            }
            $atualId = $paiId;
        }

        return array_reverse($nomes);
    }
}
