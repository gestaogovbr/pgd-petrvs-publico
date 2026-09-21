import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import {
  Page,
  RelatorioGeracaoQueryParams,
  RelatorioGeracaoRow,
} from '../domain/types';

@Injectable()
export class RelatorioGeracaoApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/relatorio-exportacao';

  query(params: RelatorioGeracaoQueryParams): Observable<Page<RelatorioGeracaoRow>> {
    const query = normalizeQueryParams({
      page: params.page,
      orderBy: params.orderBy,
      orderDir: params.orderDir,
      filters: params.filters,
    });
    return this.getCollectionPaged<RelatorioGeracaoRow>(query, 20);
  }

  statusPorIds(ids: string[]): Observable<RelatorioGeracaoRow[]> {
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('ids[]', id);
    }
    return this.http
      .get<{ success?: boolean; data?: RelatorioGeracaoRow[] }>(this.resourceUrl('/status'), { params })
      .pipe(map((response) => (Array.isArray(response.data) ? response.data : [])));
  }

  download(id: string): Observable<Blob> {
    return this.http.get(this.resourceUrl(`/${id}/download`), {
      responseType: 'blob',
    });
  }
}
