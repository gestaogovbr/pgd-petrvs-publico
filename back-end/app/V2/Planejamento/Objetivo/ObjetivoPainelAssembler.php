<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasDetalhamentoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelResumoDTO;

/**
 * Assembler do painel do Planejamento. Delega montagem de seções ao assembler compartilhado.
 */
final class ObjetivoPainelAssembler
{
    public function __construct(
        private readonly ArvoreInstitucionalPainelAssembler $painelAssembler,
    ) {}

    public function montarResumo(
        \stdClass $geral,
        \stdClass $aggItem,
        \stdClass $aggConsolidado,
        array $filtroUnidades = [],
    ): ObjetivoPainelResumoDTO {
        return new ObjetivoPainelResumoDTO(
            objetivo_id: (string) $geral->objetivo_id,
            nome: (string) $geral->objetivo_nome,
            planejamento_nome: (string) $geral->planejamento_nome,
            tipo_objetivo_nome: (string) $geral->tipo_objetivo_nome,
            eixo_tematico_nome: (string) $geral->eixo_tematico_nome,
            item: $this->painelAssembler->montarSecao($aggItem),
            consolidado: $this->painelAssembler->montarSecao($aggConsolidado),
            filtro_unidades: $filtroUnidades,
        );
    }

    /**
     * @param list<\stdClass> $rows
     */
    public function montarDetalhamento(string $objetivoId, array $rows): ObjetivoPainelEntregasDetalhamentoDTO
    {
        $detalhamento = $this->painelAssembler->montarDetalhamento($rows);

        return new ObjetivoPainelEntregasDetalhamentoDTO(
            objetivo_id: $objetivoId,
            itens: $detalhamento['itens'],
            filtro_entregas: $detalhamento['filtro_entregas'],
            filtro_unidades: $detalhamento['filtro_unidades'],
        );
    }
}
