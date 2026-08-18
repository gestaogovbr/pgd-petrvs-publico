<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Enums\StatusEnum;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregaDetalheLinhaDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEsforcoResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelPessoasResumoDTO;
use App\V2\Planejamento\Objetivo\ObjetivoPainelEsforcoSupport;

final class CadeiaValorPainelAssembler
{
    /**
     * @param list<array{id: string, label: string}> $filtroUnidades
     */
    public function montarResumo(\stdClass $geral, \stdClass $agg, array $filtroUnidades): CadeiaValorPainelResumoDTO
    {
        $disponivel = (float) ($agg->esforco_disponivel_horas ?? 0);
        $planejado = (float) ($agg->esforco_planejado_horas ?? 0);
        $executado = (float) ($agg->esforco_executado_horas ?? 0);
        $temPtPactuado = (bool) ($agg->tem_pt_pactuado ?? false);
        $temPtConcluido = (bool) ($agg->tem_pt_concluido ?? false);
        $peStatus = ($agg->tem_pe_homologado ?? false) ? StatusEnum::ATIVO->value : StatusEnum::HOMOLOGANDO->value;

        $visibilidade = ObjetivoPainelEsforcoSupport::visibilidadeEsforco($peStatus, $temPtPactuado, $temPtConcluido);

        $somentePropria = (int) ($agg->participantes_somente_unidade_propria ?? 0);
        $somenteOutras = (int) ($agg->participantes_somente_outras_unidades ?? 0);
        $emAmbas = (int) ($agg->participantes_em_ambas ?? 0);
        $totalParticipantes = $somentePropria + $somenteOutras + $emAmbas;
        $totalEntregas = (int) ($agg->total_entregas ?? 0);
        $concluidas = (int) ($agg->entregas_concluidas ?? 0);

        return new CadeiaValorPainelResumoDTO(
            processo_id: (string) $geral->processo_id,
            processo_nome: (string) $geral->processo_nome,
            nivel: (int) $geral->nivel,
            esforco: new ObjetivoPainelEsforcoResumoDTO(
                disponivel_horas: $disponivel,
                planejado_horas: $planejado,
                executado_horas: $executado,
                planejado_percentual_disponivel: ObjetivoPainelEsforcoSupport::percentual($planejado, $disponivel),
                executado_percentual_planejado: ObjetivoPainelEsforcoSupport::percentual($executado, $planejado),
                mostrar_disponivel: $visibilidade['mostrar_disponivel'],
                mostrar_planejado: $visibilidade['mostrar_planejado'],
                mostrar_executado: $visibilidade['mostrar_executado'],
            ),
            pessoas: new ObjetivoPainelPessoasResumoDTO(
                total_participantes: $totalParticipantes,
                participantes_somente_unidade_propria: $somentePropria,
                participantes_somente_outras_unidades: $somenteOutras,
                participantes_em_ambas: $emAmbas,
                percentual_somente_unidade_propria: ObjetivoPainelEsforcoSupport::percentual((float) $somentePropria, (float) $totalParticipantes),
                percentual_somente_outras_unidades: ObjetivoPainelEsforcoSupport::percentual((float) $somenteOutras, (float) $totalParticipantes),
                percentual_em_ambas: ObjetivoPainelEsforcoSupport::percentual((float) $emAmbas, (float) $totalParticipantes),
            ),
            entregas: new ObjetivoPainelEntregasResumoDTO(
                total_entregas: $totalEntregas,
                entregas_concluidas: $concluidas,
                percentual_concluidas: ObjetivoPainelEsforcoSupport::percentual((float) $concluidas, (float) $totalEntregas),
            ),
            filtro_unidades: $filtroUnidades,
        );
    }

    /**
     * @param list<\stdClass> $rows
     */
    public function montarDetalhamento(string $processoId, array $rows): CadeiaValorPainelEntregasDetalhamentoDTO
    {
        $itens = [];
        $filtroEntregas = [];
        $filtroUnidades = [];
        $seenEntregas = [];
        $seenUnidades = [];

        foreach ($rows as $row) {
            $peStatus = (string) $row->plano_entrega_status;
            $temPtPactuado = (bool) ($row->tem_pt_pactuado ?? false);
            $temPtConcluido = (bool) ($row->tem_pt_concluido ?? false);
            $vis = ObjetivoPainelEsforcoSupport::visibilidadeEsforco($peStatus, $temPtPactuado, $temPtConcluido);

            $peeId = (string) $row->plano_entrega_entrega_id;
            $unidadeId = (string) $row->unidade_id;

            if (!isset($seenEntregas[$peeId])) {
                $seenEntregas[$peeId] = true;
                $filtroEntregas[] = [
                    'id' => $peeId,
                    'label' => (string) $row->entrega_titulo,
                ];
            }
            if (!isset($seenUnidades[$unidadeId])) {
                $seenUnidades[$unidadeId] = true;
                $filtroUnidades[] = [
                    'id' => $unidadeId,
                    'label' => (string) $row->unidade_sigla . ' — ' . (string) $row->unidade_nome,
                ];
            }

            $itens[] = new CadeiaValorPainelEntregaDetalheLinhaDTO(
                plano_entrega_entrega_id: $peeId,
                unidade_id: $unidadeId,
                unidade_sigla: (string) $row->unidade_sigla,
                unidade_nome: (string) $row->unidade_nome,
                plano_entrega_id: (string) $row->plano_entrega_id,
                plano_entrega_nome: (string) $row->plano_entrega_nome,
                plano_entrega_status: $peStatus,
                plano_entrega_vigencia_inicio: (string) $row->plano_entrega_data_inicio,
                plano_entrega_vigencia_fim: $row->plano_entrega_data_fim ? (string) $row->plano_entrega_data_fim : null,
                entrega_titulo: (string) $row->entrega_titulo,
                progresso_esperado: (float) $row->progresso_esperado,
                progresso_realizado: (float) $row->progresso_realizado,
                registro_execucao: isset($row->registro_execucao) && $row->registro_execucao !== ''
                    ? (string) $row->registro_execucao
                    : null,
                participantes_total: (int) ($row->participantes_total ?? 0),
                participantes_somente_unidade_propria: (int) ($row->participantes_somente_unidade_propria ?? 0),
                participantes_somente_outras_unidades: (int) ($row->participantes_somente_outras_unidades ?? 0),
                participantes_em_ambas: (int) ($row->participantes_em_ambas ?? 0),
                esforco_disponivel_horas: (float) ($row->esforco_disponivel_horas ?? 0),
                esforco_planejado_horas: (float) ($row->esforco_planejado_horas ?? 0),
                esforco_executado_horas: (float) ($row->esforco_executado_horas ?? 0),
                mostrar_disponivel: $vis['mostrar_disponivel'],
                mostrar_planejado: $vis['mostrar_planejado'],
                mostrar_executado: $vis['mostrar_executado'],
            );
        }

        return new CadeiaValorPainelEntregasDetalhamentoDTO(
            processo_id: $processoId,
            itens: $itens,
            filtro_entregas: $filtroEntregas,
            filtro_unidades: $filtroUnidades,
        );
    }
}
