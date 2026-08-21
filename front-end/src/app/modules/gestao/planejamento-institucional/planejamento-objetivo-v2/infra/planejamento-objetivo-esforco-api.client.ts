import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import type {
  EntregaDetalheLinha,
  EntregasDetalhamentoFiltros,
  FiltroOpcao,
  SecaoResumo
} from 'src/app/v2/components/arvore-institucional/domain/types';

// ─── Tipos específicos do Planejamento (endpoints de árvore/gráfico) ───────────

export type EsforcoObjetivoNodeApi = {
  objetivo_id: string;
  objetivo_nome: string;
  objetivo_pai_id: string | null;
  objetivo_superior_id: string | null;
  planejamento_nome: string;
  tipo_objetivo_nome?: string;
  total_entregas: number;
  total_vinculos?: number;
  esforco_disponivel_horas?: number;
  esforco_proprio?: number;
  esforco_total_horas: number;
  planejado_percentual_disponivel?: number;
  filhos?: string[];
  filhos_pai?: string[];
  filhos_superior?: string[];
  objetivo_pai?: { id: string; nome: string } | null;
  objetivo_superior?: { id: string; nome: string } | null;
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

/** Entrega do plano de entregas (PE) com progresso; usado no gráfico antigo. */
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

// ─── Tipos do Painel (usam tipos centrais) ─────────────────────────────────────

export type ObjetivoPainelResumoApi = {
  objetivo_id: string;
  nome: string;
  planejamento_nome: string;
  tipo_objetivo_nome: string;
  eixo_tematico_nome: string;
  item: SecaoResumo;
  consolidado: SecaoResumo;
  filtro_unidades: FiltroOpcao[];
};

export type ObjetivoPainelEntregasDetalhamentoApi = {
  objetivo_id: string;
  itens: EntregaDetalheLinha[];
  filtro_entregas: FiltroOpcao[];
  filtro_unidades: FiltroOpcao[];
};

// ─── Tipos internos de response ────────────────────────────────────────────────

type EsforcoTotalResponse = { success?: boolean; data?: Record<string, EsforcoObjetivoNodeApi>; error?: string };
type ArvoreVisualizacaoResponse = { success?: boolean; data?: ObjetivoArvoreVisualizacaoApi; error?: string };
type EntregasResponse = { success?: boolean; data?: ObjetivoEntregasListagemApi; error?: string };
type EquipesResponse = { success?: boolean; data?: ObjetivoEquipesListagemApi; error?: string };
type PainelResumoResponse = { success?: boolean; data?: ObjetivoPainelResumoApi; error?: string };
type EntregasDetalhamentoResponse = { success?: boolean; data?: ObjetivoPainelEntregasDetalhamentoApi; error?: string };

// ─── Service ───────────────────────────────────────────────────────────────────

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

  getPainelResumo(objetivoId: string, filtros: { unidade_id?: string } = {}): Observable<ObjetivoPainelResumoApi> {
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
    filtros: EntregasDetalhamentoFiltros = {}
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
