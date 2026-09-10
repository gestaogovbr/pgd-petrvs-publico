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
  PainelResumoData
} from 'src/app/v2/components/arvore-institucional/domain/types';
import {
  CadeiaValorArvoreApiClient,
} from './cadeia-valor-arvore-api.client';

const ROTA_ARVORE = ['gestao', 'cadeia-valor', 'arvore'] as const;

@Injectable()
export class CadeiaValorArvoreAdapter implements ArvoreDataProvider {
  private readonly api = inject(CadeiaValorArvoreApiClient);
  private readonly go = inject(NavigateService);
  private cadeiaValorId = '';
  private crossCadeiaMap: Record<string, string> = {};

  carregarArvore(params: Record<string, string>): Observable<ArvoreData> {
    const cadeiaValorId = params['cadeiaValorId'] ?? '';
    const processoId = params['processoId'] ?? '';
    this.cadeiaValorId = cadeiaValorId;

    return this.api.getArvore(cadeiaValorId, processoId).pipe(
      map(data => {
        this.crossCadeiaMap = (data.metadata?.['cross_cadeia_map'] as Record<string, string>) ?? {};
        return {
          focalId: data.focal_id,
          nos: this.mapearNos(data.nos),
          subtitulo: data.subtitulo ?? null,
          metadata: data.metadata ?? {}
        };
      })
    );
  }

  carregarResumo(nodeId: string, filtros?: { unidade_id?: string }): Observable<PainelResumoData> {
    return this.api.getResumo(this.cadeiaValorId, nodeId, filtros).pipe(
      map(data => ({
        informacoesGerais: {
          processo_nome: data.processo_nome,
          tipo_elemento_nome: data.tipo_elemento_nome || '—',
          nivel: String(data.nivel),
        },
        item: data.item,
        consolidado: data.consolidado,
        filtro_unidades: data.filtro_unidades,
      }))
    );
  }

  carregarEntregasDetalhamento(
    nodeId: string,
    filtros?: EntregasDetalhamentoFiltros
  ): Observable<EntregasDetalhamentoData> {
    const params: Record<string, string> = {};
    if (filtros?.plano_entrega_entrega_id) params['plano_entrega_entrega_id'] = filtros.plano_entrega_entrega_id;
    if (filtros?.unidade_id) params['unidade_id'] = filtros.unidade_id;
    if (filtros?.data_inicio) params['data_inicio'] = filtros.data_inicio;
    if (filtros?.data_fim) params['data_fim'] = filtros.data_fim;
    if (filtros?.abrangencia) params['abrangencia'] = filtros.abrangencia;

    return this.api.getEntregasDetalhamento(this.cadeiaValorId, nodeId, params).pipe(
      map(data => ({
        itens: data.itens,
        filtro_entregas: data.filtro_entregas,
        filtro_unidades: data.filtro_unidades,
      }))
    );
  }

  navegarParaNo(nodeId: string): void {
    if (!nodeId || !this.cadeiaValorId) {
      return;
    }
    const crossCadeiaId = this.crossCadeiaMap[nodeId];
    const cadeiaId = crossCadeiaId ?? this.cadeiaValorId;
    void this.go.navigate({ route: [...ROTA_ARVORE, cadeiaId, nodeId] });
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
}

// ─── Configuração da Cadeia de Valor ───────────────────────────────────────────

export const CADEIA_VALOR_ARVORE_CONFIG: ArvoreInstitucionalConfig = {
  titulo: 'Árvore da Cadeia de Valor',
  legendaPrimary: 'hierarquia na mesma cadeia de valor',
  legendaSecondary: 'vínculo com outra cadeia de valor',
  breadcrumbParents: [
    { label: 'Cadeias de Valor', url: '/gestao/cadeia-valor' }
  ],
  rotaNavegacao: [...ROTA_ARVORE],
  camposCard: [
    { campo: 'nome' },
    { campo: 'containerNome', cssClass: 'node-card__plan' },
    { campo: 'tipoNome', cssClass: 'node-card__tipo' },
  ],
  camposInfoGeral: [
    { label: 'Nome', campo: 'processo_nome' },
    { label: 'Tipo', campo: 'tipo_elemento_nome' },
    { label: 'Nível', campo: 'nivel' },
  ],
  tooltips: null,
  badgeFocal: 'central',
  labelCentralizar: 'Centralizar neste processo',
  labelNoOrigem: 'Processo de origem',
};
