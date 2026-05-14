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
  total_entregas: number;
  /** Horas só do próprio nó (entregas concluídas). */
  esforco_proprio?: number;
  /** Horas próprias + descendentes na árvore do esforço. */
  esforco_total_horas: number;
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

type EntregasResponse = {
  success?: boolean;
  data?: ObjetivoEntregasListagemApi;
  error?: string;
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
}
