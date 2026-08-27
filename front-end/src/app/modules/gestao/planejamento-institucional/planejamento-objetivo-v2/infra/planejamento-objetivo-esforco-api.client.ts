import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

export type EsforcoObjetivoNodeApi = {
  objetivo_id: string;
  objetivo_nome: string;
  objetivo_pai_id: string | null;
  objetivo_superior_id: string | null;
  planejamento_nome: string;
  tipo_objetivo_nome?: string;
  total_entregas: number;
  total_vinculos?: number;
  /** Horas disponíveis do próprio nó (mesma regra do painel). */
  esforco_disponivel_horas?: number;
  /** Horas planejadas só do próprio nó. */
  esforco_proprio?: number;
  /** Horas planejadas próprias + descendentes na árvore do esforço. */
  esforco_total_horas: number;
  /** Planejado / disponível do próprio nó (igual ao painel). */
  planejado_percentual_disponivel?: number;
  /** União de filhos_pai e filhos_superior — mantido por compatibilidade. */
  filhos?: string[];
  /** Descendentes ligados por objetivo_pai_id (mesmo planejamento). */
  filhos_pai?: string[];
  /** Descendentes ligados por objetivo_superior_id (planejamento superior). */
  filhos_superior?: string[];
  objetivo_pai?: { id: string; nome: string } | null;
  objetivo_superior?: { id: string; nome: string } | null;
};

type EsforcoTotalResponse = {
  success?: boolean;
  data?: Record<string, EsforcoObjetivoNodeApi>;
  error?: string;
};

/** Entrega do plano de entregas (PE) com progresso; `esforco_horas_total` vem só de PTs concluídos. */
export type ObjetivoEntregaPlanoItemApi = {
  plano_entrega_entrega_id: string;
  entrega_titulo: string;
  entrega_catalogo_id: string | null;
  entrega_catalogo_nome: string | null;
  entrega_unidade_id: string;
  entrega_unidade_nome: string;
  entrega_unidade_sigla: string;
  progresso_esperado: number;
  progresso_realizado: number;
  homologado: boolean;
  esforco_horas_total: number;
};

export type ObjetivoEsforcoPorUnidadeApi = {
  unidade_id: string;
  unidade_nome: string;
  unidade_sigla: string;
  esforco_horas_total: number;
};

export type ObjetivoEntregasListagemApi = {
  objetivo_id: string;
  total_entregas: number;
  itens: ObjetivoEntregaPlanoItemApi[];
  esforco_por_unidade: ObjetivoEsforcoPorUnidadeApi[];
};

export type ObjetivoEquipesListagemApi = {
  objetivo_id: string;
  itens: ObjetivoEsforcoPorUnidadeApi[];
};

export type ObjetivoArvoreSuperiorResumoApi = {
  objetivo_id: string;
  objetivo_nome: string;
  planejamento_nome: string;
  hierarquia_linhas: string[];
  nivel_superior: number;
  objetivo_superior_id: string | null;
};

export type ObjetivoArvoreVisualizacaoApi = {
  objetivo_raiz_id: string;
  nos: Record<string, EsforcoObjetivoNodeApi>;
  cadeia_superior: ObjetivoArvoreSuperiorResumoApi[];
};

type ArvoreVisualizacaoResponse = {
  success?: boolean;
  data?: ObjetivoArvoreVisualizacaoApi;
  error?: string;
};

type EntregasResponse = {
  success?: boolean;
  data?: ObjetivoEntregasListagemApi;
  error?: string;
};

type EquipesResponse = {
  success?: boolean;
  data?: ObjetivoEquipesListagemApi;
  error?: string;
};

export type ObjetivoPainelEsforcoResumoApi = {
  disponivel_horas: number;
  planejado_horas: number;
  executado_horas: number;
  planejado_percentual_disponivel: number;
  executado_percentual_planejado: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
};

export type ObjetivoPainelFiltroOpcaoApi = { id: string; label: string };

export type ObjetivoPainelPessoasResumoApi = {
  total_participantes: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
  percentual_somente_unidade_propria: number;
  percentual_somente_outras_unidades: number;
  percentual_em_ambas: number;
};

export type ObjetivoPainelEntregasResumoApi = {
  total_entregas: number;
  /** Entregas em Planos de Entregas AVALIADOS — base do percentual de concluídas. */
  total_entregas_avaliadas: number;
  entregas_concluidas: number;
  percentual_concluidas: number;
};

/** Agrupamentos de uma seção do painel ("Item selecionado" ou "Consolidado"). */
export type ObjetivoPainelSecaoResumoApi = {
  esforco: ObjetivoPainelEsforcoResumoApi;
  pessoas: ObjetivoPainelPessoasResumoApi;
  entregas: ObjetivoPainelEntregasResumoApi;
};

export type ObjetivoPainelResumoApi = {
  objetivo_id: string;
  nome: string;
  planejamento_nome: string;
  tipo_objetivo_nome: string;
  eixo_tematico_nome: string;
  /** Seção "Item selecionado": somente o objetivo selecionado (RN02). */
  item: ObjetivoPainelSecaoResumoApi;
  /** Seção "Consolidado": item selecionado + subordinados (RN15). */
  consolidado: ObjetivoPainelSecaoResumoApi;
  filtro_unidades: ObjetivoPainelFiltroOpcaoApi[];
};

export type ObjetivoPainelEntregaEtiquetaApi = {
  key: string;
  value: string;
  icon?: string | null;
  color?: string | null;
};

/** Escopos do filtro Abrangência no detalhamento de entregas (RN33–RN39). */
export type ObjetivoEntregasAbrangencia =
  | 'item_selecionado'
  | 'itens_subordinados'
  | 'item_e_subordinados'
  | 'unidade_selecionada'
  | 'unidade_e_subordinadas';

export type ObjetivoPainelEntregaDetalheLinhaApi = {
  plano_entrega_entrega_id: string;
  planejamento_objetivo_id: string;
  planejamento_objetivo_nome: string;
  unidade_id: string;
  unidade_sigla: string;
  unidade_nome: string;
  plano_entrega_id: string;
  plano_entrega_nome: string;
  plano_entrega_status: string;
  plano_entrega_vigencia_inicio: string;
  plano_entrega_vigencia_fim: string | null;
  entrega_titulo: string;
  entrega_descricao: string;
  descricao_meta: string;
  etiquetas: ObjetivoPainelEntregaEtiquetaApi[];
  progresso_esperado: number;
  progresso_realizado: number;
  homologado: boolean;
  registro_execucao: string | null;
  participantes_total: number;
  participantes_somente_unidade_propria: number;
  participantes_somente_outras_unidades: number;
  participantes_em_ambas: number;
  esforco_disponivel_horas: number;
  esforco_planejado_horas: number;
  esforco_executado_horas: number;
  mostrar_disponivel: boolean;
  mostrar_planejado: boolean;
  mostrar_executado: boolean;
};

export type ObjetivoPainelEntregasDetalhamentoApi = {
  objetivo_id: string;
  itens: ObjetivoPainelEntregaDetalheLinhaApi[];
  filtro_entregas: ObjetivoPainelFiltroOpcaoApi[];
  filtro_unidades: ObjetivoPainelFiltroOpcaoApi[];
};

export type ObjetivoPainelResumoFiltros = {
  unidade_id?: string;
};

type PainelResumoResponse = {
  success?: boolean;
  data?: ObjetivoPainelResumoApi;
  error?: string;
};

type EntregasDetalhamentoResponse = {
  success?: boolean;
  data?: ObjetivoPainelEntregasDetalhamentoApi;
  error?: string;
};

export type ObjetivoEntregasDetalhamentoFiltros = {
  plano_entrega_entrega_id?: string;
  unidade_id?: string;
  data_inicio?: string;
  data_fim?: string;
  abrangencia?: ObjetivoEntregasAbrangencia;
};

@Injectable()
export class PlanejamentoObjetivoEsforcoApiClient {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = '/api/v2/planejamento/objetivo';

  getEsforcoTotal(objetivoId: string): Observable<Record<string, EsforcoObjetivoNodeApi>> {
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/esforco-total`;
    return this.http.get<EsforcoTotalResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }

  getEntregasPorObjetivo(objetivoId: string): Observable<ObjetivoEntregasListagemApi> {
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/entregas`;
    return this.http.get<EntregasResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }

  getEquipesPorObjetivo(objetivoId: string): Observable<ObjetivoEquipesListagemApi> {
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/equipes`;
    return this.http.get<EquipesResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }

  getArvoreVisualizacao(objetivoId: string): Observable<ObjetivoArvoreVisualizacaoApi> {
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/arvore-visualizacao`;
    return this.http.get<ArvoreVisualizacaoResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }

  getPainelResumo(objetivoId: string, filtros: ObjetivoPainelResumoFiltros = {}): Observable<ObjetivoPainelResumoApi> {
    const params = new URLSearchParams();
    if (filtros.unidade_id) {
      params.set('unidade_id', filtros.unidade_id);
    }
    const qs = params.toString();
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/painel-resumo${qs ? `?${qs}` : ''}`;
    return this.http.get<PainelResumoResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }

  getEntregasDetalhamento(
    objetivoId: string,
    filtros: ObjetivoEntregasDetalhamentoFiltros = {}
  ): Observable<ObjetivoPainelEntregasDetalhamentoApi> {
    const params = new URLSearchParams();
    if (filtros.plano_entrega_entrega_id) {
      params.set('plano_entrega_entrega_id', filtros.plano_entrega_entrega_id);
    }
    if (filtros.unidade_id) {
      params.set('unidade_id', filtros.unidade_id);
    }
    if (filtros.data_inicio) {
      params.set('data_inicio', filtros.data_inicio);
    }
    if (filtros.data_fim) {
      params.set('data_fim', filtros.data_fim);
    }
    if (filtros.abrangencia) {
      params.set('abrangencia', filtros.abrangencia);
    }
    const qs = params.toString();
    const url = `${this.gb.servidorURL}${this.base}/${objetivoId}/entregas-detalhamento${qs ? `?${qs}` : ''}`;
    return this.http.get<EntregasDetalhamentoResponse>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!res?.data || typeof res.data !== 'object') {
          throw new Error('Resposta inválida do servidor.');
        }
        return res.data;
      })
    );
  }
}
