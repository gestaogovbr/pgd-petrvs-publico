import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NavigateService } from 'src/app/services/navigate.service';
import type {
  ArvoreData,
  ArvoreDataProvider,
  ArvoreInstitucionalConfig,
  ArvoreNodeApi,
  ArvoreNodeData,
  EntregasDetalhamentoData,
  EntregasDetalhamentoFiltros,
  PainelResumoData,
  PainelSecaoTooltips
} from 'src/app/v2/components/arvore-institucional/domain/types';
import {
  PlanejamentoObjetivoEsforcoApiClient,
  type ObjetivoPainelResumoApi
} from './planejamento-objetivo-esforco-api.client';

const ROTA_ARVORE = ['gestao', 'planejamento', 'objetivo-arvore'] as const;

@Injectable()
export class PlanejamentoArvoreAdapter implements ArvoreDataProvider {
  private readonly api = inject(PlanejamentoObjetivoEsforcoApiClient);
  private readonly go = inject(NavigateService);

  carregarArvore(params: Record<string, string>): Observable<ArvoreData> {
    const id = params['id'] ?? '';
    return this.api.getArvoreVisualizacao(id).pipe(
      map(data => ({
        focalId: data.focal_id,
        nos: this.mapearNos(data.nos),
        metadata: data.metadata ?? {}
      }))
    );
  }

  carregarResumo(nodeId: string, filtros?: { unidade_id?: string }): Observable<PainelResumoData> {
    return this.api.getPainelResumo(nodeId, { unidade_id: filtros?.unidade_id }).pipe(
      map(data => this.mapearResumo(data))
    );
  }

  carregarEntregasDetalhamento(
    nodeId: string,
    filtros?: EntregasDetalhamentoFiltros
  ): Observable<EntregasDetalhamentoData> {
    return this.api.getEntregasDetalhamento(nodeId, filtros ?? {}).pipe(
      map(data => ({
        itens: data.itens,
        filtro_entregas: data.filtro_entregas,
        filtro_unidades: data.filtro_unidades
      }))
    );
  }

  navegarParaNo(nodeId: string): void {
    if (!nodeId) {
      return;
    }
    void this.go.navigate({ route: [...ROTA_ARVORE, nodeId] });
  }

  private mapearNos(nos: Record<string, ArvoreNodeApi>): Record<string, ArvoreNodeData> {
    const resultado: Record<string, ArvoreNodeData> = {};

    for (const [id, n] of Object.entries(nos)) {
      resultado[id] = {
        id: n.id,
        nome: n.nome,
        containerNome: n.container_nome,
        tipoNome: n.tipo_nome || null,
        parentId: n.parent_id,
        secondaryParentId: n.secondary_parent_id,
        filhosIds: n.filhos_ids ?? [],
        filhosSecondaryIds: n.filhos_secondary_ids ?? [],
        totalVinculos: n.total_vinculos ?? 0,
        esforcoDisponivel: n.esforco_disponivel_horas ?? 0,
        esforcoProprioHoras: n.esforco_proprio_horas ?? 0,
        esforcoTotalHoras: n.esforco_total_horas ?? 0,
        planejadoPercentualDisponivel: n.planejado_percentual_disponivel ?? 0,
      };
    }

    return resultado;
  }

  private mapearResumo(data: ObjetivoPainelResumoApi): PainelResumoData {
    return {
      informacoesGerais: {
        nome: data.nome,
        planejamento_nome: data.planejamento_nome,
        tipo_objetivo_nome: data.tipo_objetivo_nome || '—',
        eixo_tematico_nome: data.eixo_tematico_nome || '—',
      },
      item: data.item,
      consolidado: data.consolidado,
      filtro_unidades: data.filtro_unidades,
    };
  }

}

// ─── Configuração do Planejamento Institucional ────────────────────────────────

const TOOLTIPS_ITEM: PainelSecaoTooltips = {
  esforcoDisponivel:
    'Soma da carga horária disponível de todos os participantes do PGD lotados ou vinculados às unidades ' +
    'consideradas, independentemente de contribuírem para a realização das entregas.',
  esforcoPlanejado:
    'Soma das horas de trabalho planejadas, calculadas com base no percentual de contribuição de cada ' +
    'participante para a realização das entregas. O percentual indica quanto o esforço planejado representa ' +
    'em relação ao esforço total disponível.',
  esforcoExecutado:
    'Soma das horas de trabalho efetivamente registradas na execução da contribuição de cada participante ' +
    'para a realização das entregas. O percentual indica quanto o esforço executado representa em relação ' +
    'ao esforço total planejado.',
  participantes:
    'Quantidade de participantes envolvidos na realização das entregas. Cada participante é contabilizado ' +
    'uma única vez, ainda que esteja envolvido em mais de um Plano de Trabalho.',
  totalEntregas:
    'Quantidade total de entregas cadastradas nas unidades para a realização do item do Planejamento ' +
    'Institucional selecionado.',
  entregasConcluidas:
    'Quantidade de entregas concluídas em Planos de Entregas avaliados. O percentual indica quanto as ' +
    'entregas concluídas representam em relação ao total de entregas desses planos.',
};

const TOOLTIPS_CONSOLIDADO: PainelSecaoTooltips = {
  esforcoDisponivel:
    'Soma da carga horária disponível de todos os participantes do PGD lotados ou vinculados às unidades ' +
    'consideradas, abrangendo o item do Planejamento Institucional selecionado e todos os itens ' +
    'hierarquicamente subordinados, independentemente de contribuírem para a realização das entregas.',
  esforcoPlanejado:
    'Soma das horas de trabalho planejadas, calculadas com base no percentual de contribuição de cada ' +
    'participante para a realização das entregas do item do Planejamento Institucional selecionado e de ' +
    'todos os itens hierarquicamente subordinados. O percentual indica quanto o esforço planejado ' +
    'representa em relação ao esforço total disponível.',
  esforcoExecutado:
    'Soma das horas de trabalho efetivamente registradas na execução da contribuição de cada participante ' +
    'para a realização das entregas do item do Planejamento Institucional selecionado e de todos os itens ' +
    'hierarquicamente subordinados. O percentual indica quanto o esforço executado representa em relação ' +
    'ao esforço total planejado.',
  participantes:
    'Quantidade de participantes envolvidos na realização das entregas do item do Planejamento ' +
    'Institucional selecionado e de todos os itens hierarquicamente subordinados. Cada participante é ' +
    'contabilizado uma única vez, ainda que esteja envolvido em mais de um Plano de Trabalho.',
  totalEntregas:
    'Quantidade total de entregas cadastradas nas unidades para a realização do item do Planejamento ' +
    'Institucional selecionado e de todos os itens hierarquicamente subordinados.',
  entregasConcluidas:
    'Quantidade de entregas concluídas em Planos de Entregas avaliados, considerando o item do ' +
    'Planejamento Institucional selecionado e todos os itens hierarquicamente subordinados. O percentual ' +
    'indica quanto as entregas concluídas representam em relação ao total de entregas desses planos.',
};

export const PLANEJAMENTO_ARVORE_CONFIG: ArvoreInstitucionalConfig = {
  titulo: 'Árvore de objetivos',
  legendaPrimary: 'hierarquia no mesmo planejamento',
  legendaSecondary: 'vínculo entre planejamentos',
  breadcrumbParents: [
    { label: 'Planejamentos Institucionais', url: '/gestao/planejamento' }
  ],
  rotaNavegacao: [...ROTA_ARVORE],
  camposCard: [
    { campo: 'nome' },
    { campo: 'containerNome', cssClass: 'node-card__plan' },
    { campo: 'tipoNome', cssClass: 'node-card__tipo' },
  ],
  camposInfoGeral: [
    { label: 'Nome', campo: 'nome' },
    { label: 'Planejamento', campo: 'planejamento_nome' },
    { label: 'Tipo', campo: 'tipo_objetivo_nome' },
    { label: 'Eixo temático', campo: 'eixo_tematico_nome' },
  ],
  tooltips: { item: TOOLTIPS_ITEM, consolidado: TOOLTIPS_CONSOLIDADO },
  badgeFocal: 'consultado',
  labelCentralizar: 'Centralizar neste objetivo',
  labelNoOrigem: 'Item do planejamento',
};
