<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

use App\V2\ArvoreInstitucional\DTOs\EntregaDetalheLinhaDTO;
use App\V2\ArvoreInstitucional\DTOs\EntregasResumoDTO;
use App\V2\ArvoreInstitucional\DTOs\EsforcoResumoDTO;
use App\V2\ArvoreInstitucional\DTOs\PessoasResumoDTO;
use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;

/**
 * Assembler compartilhado para montagem de seções do painel lateral e linhas de detalhamento.
 * Usado por Planejamento Institucional e Cadeia de Valor.
 */
final class ArvoreInstitucionalPainelAssembler
{
    /**
     * Monta uma seção (item ou consolidado) a partir dos dados agregados do repository.
     */
    public function montarSecao(\stdClass $agg): SecaoResumoDTO
    {
        $disponivel = (float) ($agg->esforco_disponivel_horas ?? 0);
        $planejado = (float) ($agg->esforco_planejado_horas ?? 0);
        $executado = (float) ($agg->esforco_executado_horas ?? 0);
        $temPtPactuado = (bool) ($agg->tem_pt_pactuado ?? false);
        $temPtConcluido = (bool) ($agg->tem_pt_concluido ?? false);
        $peStatus = ($agg->tem_pe_homologado ?? false) ? 'ATIVO' : 'HOMOLOGANDO';

        $visibilidade = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco($peStatus, $temPtPactuado, $temPtConcluido);

        $somentePropria = (int) ($agg->participantes_somente_unidade_propria ?? 0);
        $somenteOutras = (int) ($agg->participantes_somente_outras_unidades ?? 0);
        $emAmbas = (int) ($agg->participantes_em_ambas ?? 0);
        $totalParticipantes = $somentePropria + $somenteOutras + $emAmbas;
        $totalEntregas = (int) ($agg->total_entregas ?? 0);
        $totalEntregasAvaliadas = (int) ($agg->total_entregas_avaliadas ?? 0);
        $concluidas = (int) ($agg->entregas_concluidas ?? 0);

        $basePercentual = (float) $totalEntregasAvaliadas;

        return new SecaoResumoDTO(
            esforco: new EsforcoResumoDTO(
                disponivel_horas: $disponivel,
                planejado_horas: $planejado,
                executado_horas: $executado,
                planejado_percentual_disponivel: ArvoreInstitucionalEsforcoSupport::percentual($planejado, $disponivel),
                executado_percentual_planejado: ArvoreInstitucionalEsforcoSupport::percentual($executado, $planejado),
                mostrar_disponivel: $visibilidade['mostrar_disponivel'],
                mostrar_planejado: $visibilidade['mostrar_planejado'],
                mostrar_executado: $visibilidade['mostrar_executado'],
            ),
            pessoas: new PessoasResumoDTO(
                total_participantes: $totalParticipantes,
                participantes_somente_unidade_propria: $somentePropria,
                participantes_somente_outras_unidades: $somenteOutras,
                participantes_em_ambas: $emAmbas,
                percentual_somente_unidade_propria: ArvoreInstitucionalEsforcoSupport::percentual((float) $somentePropria, (float) $totalParticipantes),
                percentual_somente_outras_unidades: ArvoreInstitucionalEsforcoSupport::percentual((float) $somenteOutras, (float) $totalParticipantes),
                percentual_em_ambas: ArvoreInstitucionalEsforcoSupport::percentual((float) $emAmbas, (float) $totalParticipantes),
            ),
            entregas: new EntregasResumoDTO(
                total_entregas: $totalEntregas,
                total_entregas_avaliadas: $totalEntregasAvaliadas,
                entregas_concluidas: $concluidas,
                percentual_concluidas: ArvoreInstitucionalEsforcoSupport::percentual((float) $concluidas, $basePercentual),
            ),
        );
    }

    /**
     * Monta uma linha de detalhamento de entrega.
     *
     * @param \stdClass $row Row do repository com dados da entrega
     * @param array{mostrar_disponivel: bool, mostrar_planejado: bool, mostrar_executado: bool} $visibilidade
     */
    public function montarLinha(\stdClass $row, array $visibilidade): EntregaDetalheLinhaDTO
    {
        return new EntregaDetalheLinhaDTO(
            plano_entrega_entrega_id: (string) $row->plano_entrega_entrega_id,
            unidade_id: (string) $row->unidade_id,
            unidade_sigla: (string) $row->unidade_sigla,
            unidade_nome: (string) $row->unidade_nome,
            plano_entrega_id: (string) $row->plano_entrega_id,
            plano_entrega_nome: (string) $row->plano_entrega_nome,
            plano_entrega_status: (string) $row->plano_entrega_status,
            plano_entrega_vigencia_inicio: (string) $row->plano_entrega_data_inicio,
            plano_entrega_vigencia_fim: $row->plano_entrega_data_fim ? (string) $row->plano_entrega_data_fim : null,
            entrega_titulo: (string) $row->entrega_titulo,
            entrega_descricao: (string) ($row->entrega_descricao ?? ''),
            descricao_meta: (string) ($row->descricao_meta ?? ''),
            etiquetas: $this->normalizarEtiquetas($row->etiquetas ?? null),
            progresso_esperado: (float) $row->progresso_esperado,
            progresso_realizado: (float) $row->progresso_realizado,
            meta: isset($row->meta) ? json_decode((string) $row->meta, true) : null,
            realizado: isset($row->realizado) ? json_decode((string) $row->realizado, true) : null,
            tipo_indicador: isset($row->tipo_indicador) ? (string) $row->tipo_indicador : null,
            lista_qualitativos: isset($row->lista_qualitativos) ? json_decode((string) $row->lista_qualitativos, true) : null,
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
            mostrar_disponivel: $visibilidade['mostrar_disponivel'],
            mostrar_planejado: $visibilidade['mostrar_planejado'],
            mostrar_executado: $visibilidade['mostrar_executado'],
            no_origem_id: isset($row->no_origem_id) ? (string) $row->no_origem_id : null,
            no_origem_nome: isset($row->no_origem_nome) ? (string) $row->no_origem_nome : null,
        );
    }

    /**
     * @return list<array{key: string, value: string, icon: string|null, color: string|null}>
     */
    private function normalizarEtiquetas(mixed $raw): array
    {
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            $raw = is_array($decoded) ? $decoded : [];
        }
        if (!is_array($raw)) {
            return [];
        }

        $out = [];
        foreach ($raw as $item) {
            if (!is_array($item)) {
                continue;
            }
            $value = isset($item['value']) ? trim((string) $item['value']) : '';
            if ($value === '') {
                continue;
            }
            $out[] = [
                'key' => (string) ($item['key'] ?? $value),
                'value' => $value,
                'icon' => isset($item['icon']) && $item['icon'] !== '' ? (string) $item['icon'] : null,
                'color' => isset($item['color']) && $item['color'] !== '' ? (string) $item['color'] : null,
            ];
        }

        return $out;
    }

    /**
     * Monta linhas de detalhamento + filtros a partir das rows do DataProvider.
     *
     * @param list<\stdClass> $rows
     * @return array{itens: list<EntregaDetalheLinhaDTO>, filtro_entregas: list<array{id: string, label: string}>, filtro_unidades: list<array{id: string, label: string}>}
     */
    public function montarDetalhamento(array $rows): array
    {
        $itens = [];
        foreach ($rows as $row) {
            $peStatus = (string) $row->plano_entrega_status;
            $temPtPactuado = (bool) ($row->tem_pt_pactuado ?? false);
            $temPtConcluido = (bool) ($row->tem_pt_concluido ?? false);
            $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco($peStatus, $temPtPactuado, $temPtConcluido);

            $itens[] = $this->montarLinha($row, $vis);
        }

        $filtros = $this->extrairFiltros($rows);

        return [
            'itens' => $itens,
            'filtro_entregas' => $filtros['filtro_entregas'],
            'filtro_unidades' => $filtros['filtro_unidades'],
        ];
    }

    /**
     * Extrai listas de opções de filtro a partir das rows de detalhamento.
     *
     * @param list<\stdClass> $rows
     * @return array{filtro_entregas: list<array{id: string, label: string}>, filtro_unidades: list<array{id: string, label: string}>}
     */
    public function extrairFiltros(array $rows): array
    {
        $filtroEntregas = [];
        $filtroUnidades = [];
        $seenEntregas = [];
        $seenUnidades = [];

        foreach ($rows as $row) {
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
        }

        return [
            'filtro_entregas' => $filtroEntregas,
            'filtro_unidades' => $filtroUnidades,
        ];
    }

}
