import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Page, PlanoTrabalho, PlanoTrabalhoCreatePayload, PlanoTrabalhoId, QueryParams } from '../domain/types';
import { GlobalsService } from 'src/app/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoApiClient {
  private readonly gb = inject(GlobalsService);
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v2/plano-trabalho';

  query(params: QueryParams): Observable<Page<PlanoTrabalho>> {
    return this.http
      .get<any>(this.gb.servidorURL + this.base, { params: this.normalize(params) as any })
      .pipe(
        map((response: any) => {
          const data = response?.data || {};
          const items = Array.isArray(data?.data) ? (data.data as PlanoTrabalho[]) : [];
          const total = typeof data?.total === 'number' ? data.total : 0;
          const page = typeof data?.current_page === 'number' ? data.current_page : 1;
          const perPage = typeof data?.per_page === 'number' ? data.per_page : (typeof data?.size === 'number' ? data.size : 15);
          const lastPage = typeof data?.last_page === 'number' ? data.last_page : Math.max(1, Math.ceil(total / Math.max(1, perPage)));
          return { items, total, page, perPage, lastPage } as Page<PlanoTrabalho>;
        })
      );
  }

  getById(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http
      .get<any>(`${this.gb.servidorURL}${this.base}/${id}`)
      .pipe(map((response: any) => (response?.data as PlanoTrabalho) ?? response));
  }

  create(payload: PlanoTrabalhoCreatePayload): Observable<PlanoTrabalho> {
    return this.http
      .post<any>(this.gb.servidorURL + this.base, payload)
      .pipe(map((response: any) => (response?.data as PlanoTrabalho) ?? response));
  }

  update(id: PlanoTrabalhoId, payload: Partial<PlanoTrabalho>): Observable<PlanoTrabalho> {
    return this.http.patch<PlanoTrabalho>(`${this.gb.servidorURL}${this.base}/${id}`, payload);
  }

  delete(id: PlanoTrabalhoId): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${id}`);
  }

  createEntrega(planoTrabalhoId: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/entrega`, payload)
      .pipe(map((response: any) => response?.data ?? response));
  }

  updateEntrega(planoTrabalhoId: string, entregaId: string, payload: any): Observable<any> {
    return this.http.put<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/entrega/${entregaId}`, payload)
      .pipe(map((response: any) => response?.data ?? response));
  }

  deleteEntrega(planoTrabalhoId: string, entregaId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/entrega/${entregaId}`);
  }

  getDocumento(planoTrabalhoId: string): Observable<any> {
    return this.http.get<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento`)
      .pipe(map((r: any) => r?.data ?? r));
  }

  createDocumento(planoTrabalhoId: string): Observable<any> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento`, {})
      .pipe(map((r: any) => r?.data ?? r));
  }

  assinarDocumento(planoTrabalhoId: string): Observable<any> {
    return this.http.post<any>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento/assinatura-tcr`, {})
      .pipe(map((r: any) => r?.data ?? r));
  }

  cancelarAssinaturaDocumento(planoTrabalhoId: string): Observable<void> {
    return this.http.delete<void>(`${this.gb.servidorURL}${this.base}/${planoTrabalhoId}/documento/assinatura-tcr`);
  }

  cancel(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<PlanoTrabalho>(`${this.gb.servidorURL}${this.base}/${id}/cancelar`, {});
  }

  archive(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<PlanoTrabalho>(`${this.gb.servidorURL}${this.base}/${id}/arquivar`, {});
  }

  cancelAssinatura(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<PlanoTrabalho>(`${this.gb.servidorURL}${this.base}/${id}/cancelar-assinatura`, {});
  }

  clone(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<PlanoTrabalho>(`${this.gb.servidorURL}${this.base}/${id}/clonar`, {});
  }

  

  private normalize(params: QueryParams): Record<string, string> {
    const out: Record<string, string> = {};
    if (typeof params.page === 'number') out['page'] = String(params.page);
    if (typeof params.pageSize === 'number') out['size'] = String(params.pageSize);
    if (params.sort?.length) out['sort'] = params.sort;
    if (params.filters) {
      Object.entries(params.filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null) out[`filters[${k}]`] = this.stringifyFilterValue(v);
      });
    }
    return out;
  }

  private stringifyFilterValue(value: unknown): string {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return value ? '1' : '0';
    return JSON.stringify(value);
  }
}
