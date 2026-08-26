import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';
import type { ArvoreApiResponse, EntregaDetalheLinha, FiltroOpcao, SecaoResumo } from 'src/app/v2/components/arvore-institucional/domain/types';

// ─── Tipos específicos da Cadeia de Valor (endpoint de árvore) ─────────────────

export type CadeiaValorArvoreApiResponse = ArvoreApiResponse;

// ─── Tipos do Painel (usam tipos centrais) ─────────────────────────────────────

export type CadeiaValorResumoApi = {
  processo_id: string;
  processo_nome: string;
  nivel: number;
  item: SecaoResumo;
  consolidado: SecaoResumo;
  filtro_unidades: FiltroOpcao[];
};

export type CadeiaValorPainelEntregasDetalhamentoApi = {
  processo_id: string;
  itens: EntregaDetalheLinha[];
  filtro_entregas: FiltroOpcao[];
  filtro_unidades: FiltroOpcao[];
};

// ─── Service ───────────────────────────────────────────────────────────────────

type ApiResponse<T> = { success?: boolean; data?: T; error?: string };

@Injectable()
export class CadeiaValorArvoreApiClient {
  private readonly http = inject(HttpClient);
  private readonly gb = inject(GlobalsService);
  private readonly base = '/api/v2/cadeia-valor';

  getArvore(cadeiaValorId: string, processoId: string): Observable<CadeiaValorArvoreApiResponse> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/arvore/${processoId}`;
    return this.http.get<ApiResponse<CadeiaValorArvoreApiResponse>>(url, { withCredentials: true }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }

  getResumo(cadeiaValorId: string, processoId: string, params?: { unidade_id?: string }): Observable<CadeiaValorResumoApi> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/processo/${processoId}/resumo`;
    const httpParams: Record<string, string> = {};
    if (params?.unidade_id) {
      httpParams['unidade_id'] = params.unidade_id;
    }
    return this.http.get<ApiResponse<CadeiaValorResumoApi>>(url, { withCredentials: true, params: httpParams }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }

  getEntregasDetalhamento(cadeiaValorId: string, processoId: string, params?: Record<string, string>): Observable<CadeiaValorPainelEntregasDetalhamentoApi> {
    const url = `${this.gb.servidorURL}${this.base}/${cadeiaValorId}/processo/${processoId}/entregas-detalhamento`;
    return this.http.get<ApiResponse<CadeiaValorPainelEntregasDetalhamentoApi>>(url, { withCredentials: true, params }).pipe(
      map(res => {
        if (res?.error) throw new Error(res.error);
        if (!res?.data) throw new Error('Resposta inválida do servidor.');
        return res.data;
      })
    );
  }
}
