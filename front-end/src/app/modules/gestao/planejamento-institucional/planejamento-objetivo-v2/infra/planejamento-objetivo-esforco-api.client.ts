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
  filhos?: string[];
  objetivo_pai?: { id: string; nome: string } | null;
  objetivo_superior?: { id: string; nome: string } | null;
};

type EsforcoTotalResponse = {
  success?: boolean;
  data?: Record<string, EsforcoObjetivoNodeApi>;
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
}
