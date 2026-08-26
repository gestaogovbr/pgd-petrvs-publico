<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphAssembler;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use stdClass;

/**
 * Monta o mapa de esforço acumulado (fechamento bidirecional) a partir das linhas do repository.
 * Delega a lógica genérica (conexão de filhos, acumulação, hidratação) ao assembler compartilhado.
 */
final class PlanejamentoEsforcoGraphAssembler
{
    public function __construct(
        private readonly ArvoreInstitucionalEsforcoGraphAssembler $graphAssembler,
    ) {}

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
        $this->graphAssembler->conectarFilhos($map, [
            ['field' => 'objetivo_pai_id', 'key' => 'filhos_pai'],
            ['field' => 'objetivo_superior_id', 'key' => 'filhos_superior'],
        ]);
        $this->graphAssembler->acumularHoras($map);
        $this->graphAssembler->hidratarNomes($map, ['objetivo_pai_id', 'objetivo_superior_id'], $lookupNomes);

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
            $disponivel = (float) ($row->esforco_disponivel_horas ?? 0);
            $planejado = (float) $row->esforco_proprio;

            $map[$row->no_id] = [
                'objetivo_id' => $row->no_id,
                'objetivo_nome' => $row->no_nome,
                'objetivo_pai_id' => $row->no_pai_id,
                'objetivo_superior_id' => $row->no_pai_secundario_id ?? null,
                'planejamento_nome' => $row->container_nome ?? '',
                'tipo_objetivo_nome' => isset($row->tipo_nome) ? (string) $row->tipo_nome : '',
                'total_entregas' => (int) $row->total_entregas,
                'esforco_disponivel_horas' => $disponivel,
                'esforco_proprio' => $planejado,
                'esforco_total_horas' => $planejado,
                'planejado_percentual_disponivel' => ArvoreInstitucionalEsforcoSupport::percentual($planejado, $disponivel),
            ];
        }

        return $map;
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
