import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import {
  Page,
  RelatorioEntregaQueryParams,
  RelatorioEntregaRow,
} from '../domain/types';

@Injectable()
export class RelatorioEntregaApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/relatorio-entrega';

  query(params: RelatorioEntregaQueryParams): Observable<Page<RelatorioEntregaRow>> {
    const query = normalizeQueryParams({
      page: params.page,
      orderBy: params.orderBy,
      orderDir: params.orderDir,
      filters: params.filters,
    });
    return this.getCollectionPaged<RelatorioEntregaRow>(query, 15);
  }

  unidadePadrao(): Observable<string | null> {
    return this.http
      .get<{ success: boolean; data?: { unidade_id?: string | null } }>(
        this.resourceUrl('/unidade-padrao'),
      )
      .pipe(map((r) => r.data?.unidade_id ?? null));
  }

  exportXls(params: RelatorioEntregaQueryParams): Observable<Blob> {
    const query = normalizeQueryParams({
      orderBy: params.orderBy,
      orderDir: params.orderDir,
      filters: params.filters,
    });
    return this.http.get(this.resourceUrl('/xls'), {
      params: query,
      responseType: 'blob',
    });
  }
}
