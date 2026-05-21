import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Page, PlanoTrabalho, PlanoTrabalhoCreatePayload, PlanoTrabalhoId, QueryParams } from '../domain/types';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';

@Injectable()
export class PlanoApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/plano-trabalho';

  query(params: QueryParams): Observable<Page<PlanoTrabalho>> {
    return this.getCollectionPaged<PlanoTrabalho>(normalizeQueryParams(params), 15);
  }

  getById(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http
      .get<any>(this.resourceUrl(`/${id}`))
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }

  create(payload: PlanoTrabalhoCreatePayload): Observable<PlanoTrabalho> {
    return this.http
      .post<any>(this.resourceUrl(), payload)
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }

  update(id: PlanoTrabalhoId, payload: Partial<PlanoTrabalho>): Observable<PlanoTrabalho> {
    return this.http.patch<{ success: boolean; data: PlanoTrabalho }>(this.resourceUrl(`/${id}`), payload)
      .pipe(map(r => r.data));
  }

  delete(id: PlanoTrabalhoId): Observable<void> {
    return this.http.delete<void>(this.resourceUrl(`/${id}`));
  }

  createEntrega(planoTrabalhoId: string, payload: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl(`/${planoTrabalhoId}/entrega`), payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  updateEntrega(planoTrabalhoId: string, entregaId: string, payload: any): Observable<any> {
    return this.http.put<any>(this.resourceUrl(`/${planoTrabalhoId}/entrega/${entregaId}`), payload)
      .pipe(map((r: any) => r?.data ?? r));
  }

  deleteEntrega(planoTrabalhoId: string, entregaId: string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl(`/${planoTrabalhoId}/entrega/${entregaId}`));
  }

  cancel(id: PlanoTrabalhoId, justificativa: string): Observable<PlanoTrabalho> {
    return this.http.patch<PlanoTrabalho>(this.resourceUrl(`/${id}/cancelar`), { justificativa });
  }

  archive(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.patch<any>(this.resourceUrl(`/${id}/arquivar`), {})
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }

  encerrar(id: PlanoTrabalhoId, justificativa: string): Observable<PlanoTrabalho> {
    return this.http.patch<any>(this.resourceUrl(`/${id}/encerrar`), { justificativa })
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }

  cancelAssinatura(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<any>(this.resourceUrl(`/${id}/cancelar-assinatura`), {})
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }

  clone(id: PlanoTrabalhoId): Observable<PlanoTrabalho> {
    return this.http.post<any>(this.resourceUrl(`/${id}/clonar`), {})
      .pipe(map((r: any) => (r?.data as PlanoTrabalho) ?? r));
  }
}
