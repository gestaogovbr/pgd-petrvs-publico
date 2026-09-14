<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho;

use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Models\Usuario;
use App\V2\Usuario\DispensaPlanoTrabalho\DTOs\DispensaPlanoTrabalhoHistoricoDTO;
use App\V2\Usuario\DispensaPlanoTrabalho\DTOs\DispensaPlanoTrabalhoResumoDTO;

final class DispensaPlanoTrabalhoAssembler
{
    /**
     * @param  list<DispensaPlanoTrabalhoHistorico>  $historicos
     */
    public function montarResumo(
        Usuario $agente,
        ?DispensaPlanoTrabalho $dispensa,
        array $historicos,
        bool $elegivel,
        bool $podeFormalizar,
    ): DispensaPlanoTrabalhoResumoDTO {
        $vigente = $dispensa?->isVigente() ?? false;
        $podeEncerrar = $vigente && $dispensa?->data_fim === null;

        $historicoDtos = array_map(
            fn (DispensaPlanoTrabalhoHistorico $h) => new DispensaPlanoTrabalhoHistoricoDTO(
                id: (string) $h->id,
                operacao: (string) $h->operacao,
                data_inicio: $h->data_inicio?->format('Y-m-d') ?? '',
                data_fim: $h->data_fim?->format('Y-m-d'),
                ciencia_em: $h->ciencia_em?->toIso8601String() ?? '',
                responsavel_id: (string) $h->responsavel_id,
                responsavel_nome: (string) ($h->responsavel?->nome_exibicao ?? $h->responsavel?->nome ?? ''),
                created_at: $h->created_at?->toIso8601String() ?? '',
            ),
            $historicos,
        );

        return new DispensaPlanoTrabalhoResumoDTO(
            usuario_id: (string) $agente->id,
            usuario_nome: (string) ($agente->nome_exibicao ?? $agente->nome),
            elegivel: $elegivel,
            pode_formalizar: $podeFormalizar,
            vigente: $vigente,
            pode_encerrar: $podeEncerrar,
            dispensa_id: $dispensa?->id !== null ? (string) $dispensa->id : null,
            data_inicio: $dispensa?->data_inicio?->format('Y-m-d'),
            data_fim: $dispensa?->data_fim?->format('Y-m-d'),
            ciencia_em: $dispensa?->ciencia_em?->toIso8601String(),
            responsavel_id: $dispensa?->responsavel_id !== null ? (string) $dispensa->responsavel_id : null,
            responsavel_nome: $dispensa?->responsavel !== null
                ? (string) ($dispensa->responsavel->nome_exibicao ?? $dispensa->responsavel->nome)
                : null,
            atualizado_em: $dispensa?->updated_at?->toIso8601String(),
            historico: $historicoDtos,
        );
    }
}
