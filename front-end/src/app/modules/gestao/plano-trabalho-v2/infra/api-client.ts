import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page, PlanoTrabalho, PlanoTrabalhoId, QueryParams } from '../domain/types';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoApiClient {
  private readonly http = inject(HttpClient);
  private readonly base = 'api/v2/planos-trabalho';

  query(params: QueryParams): Observable<Page<PlanoTrabalho>> {
    return this.http.get<Page<PlanoTrabalho>>(this.base, { params: this.normalize(params) as any });
    }

  getById(id: PlanoTrabalhoId, includes?: string[]): Observable<PlanoTrabalho> {
    const params = includes?.length ? { include: includes.join(',') } : undefined;
    return this.http.get<PlanoTrabalho>(`${this.base}/${id}`, { params });
  }

  create(payload: Partial<PlanoTrabalho>): Observable<PlanoTrabalho> {
    return this.http.post<PlanoTrabalho>(this.base, payload);
  }

  update(id: PlanoTrabalhoId, payload: Partial<PlanoTrabalho>): Observable<PlanoTrabalho> {
    return this.http.patch<PlanoTrabalho>(`${this.base}/${id}`, payload);
  }

  delete(id: PlanoTrabalhoId): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  private normalize(params: QueryParams): Record<string, string> {
    const out: Record<string, string> = {};
    if (typeof params.page === 'number') out['page'] = String(params.page);
    if (typeof params.pageSize === 'number') out['pageSize'] = String(params.pageSize);
    if (params.sort?.length) out['sort'] = params.sort;
    if (params.includes?.length) out['include'] = params.includes.join(',');
    if (params.filter) {
      Object.entries(params.filter).forEach(([k, v]) => {
        if (v !== undefined && v !== null) out[`filter[${k}]`] = String(v as any);
      });
    }
    return out;
  }
}
