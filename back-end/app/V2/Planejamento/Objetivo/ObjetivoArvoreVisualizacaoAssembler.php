<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoArvoreSuperiorResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoArvoreVisualizacaoDTO;

/**
 * Monta a visualização em árvore a partir do mapa de esforço (fechamento bidirecional).
 */
final class ObjetivoArvoreVisualizacaoAssembler
{
    /**
     * @param  array<string, EsforcoNodeDTO>  $nos
     */
    public function assemble(string $objetivoRaizId, array $nos): ObjetivoArvoreVisualizacaoDTO
    {
        if (!isset($nos[$objetivoRaizId])) {
            return new ObjetivoArvoreVisualizacaoDTO(
                objetivo_raiz_id: $objetivoRaizId,
                nos: $nos,
                cadeia_superior: [],
            );
        }

        return new ObjetivoArvoreVisualizacaoDTO(
            objetivo_raiz_id: $objetivoRaizId,
            nos: $nos,
            cadeia_superior: $this->montarCadeiaSuperior($objetivoRaizId, $nos),
        );
    }

    /**
     * Sobe por objetivo_superior_id a partir do nó consultado.
     * Ordem da lista: imediato (nivel 1) → mais distante (maior nivel).
     * A UI exibe do mais distante para o imediato (topo → consultado).
     *
     * @param  array<string, EsforcoNodeDTO>  $nos
     * @return list<ObjetivoArvoreSuperiorResumoDTO>
     */
    private function montarCadeiaSuperior(string $partidaId, array $nos): array
    {
        $cadeia = [];
        $atualId = $partidaId;
        $nivel = 0;

        while (isset($nos[$atualId])) {
            $superiorId = $nos[$atualId]->objetivo_superior_id;
            if (!is_string($superiorId) || $superiorId === '' || !isset($nos[$superiorId])) {
                break;
            }

            $superior = $nos[$superiorId];
            $nivel++;

            $cadeia[] = new ObjetivoArvoreSuperiorResumoDTO(
                objetivo_id: $superior->objetivo_id,
                objetivo_nome: $superior->objetivo_nome,
                planejamento_nome: $superior->planejamento_nome,
                hierarquia_linhas: $this->montarHierarquiaInterna($superiorId, $nos),
                nivel_superior: $nivel,
                objetivo_superior_id: $superior->objetivo_superior_id,
            );

            $atualId = $superiorId;
        }

        return $cadeia;
    }

    /**
     * Caminho de objetivo_pai_id dentro do mesmo planejamento (raiz → nó).
     *
     * @param  array<string, EsforcoNodeDTO>  $nos
     * @return list<string>
     */
    private function montarHierarquiaInterna(string $objetivoId, array $nos): array
    {
        $nomes = [];
        $visitados = [];
        $atualId = $objetivoId;

        while (isset($nos[$atualId]) && !isset($visitados[$atualId])) {
            $visitados[$atualId] = true;
            $nomes[] = $nos[$atualId]->objetivo_nome;
            $paiId = $nos[$atualId]->objetivo_pai_id;
            if (!is_string($paiId) || $paiId === '' || !isset($nos[$paiId])) {
                break;
            }
            $atualId = $paiId;
        }

        return array_reverse($nomes);
    }
}
