import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { RelatorioPlanoEntregaLacunaQueryParams, RelatorioPlanoEntregaLacunaRow, Page } from '../domain/types';

@Injectable()
export class RelatorioPlanoEntregaLacunaApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/relatorio-plano-entrega-lacuna';

  query(params: RelatorioPlanoEntregaLacunaQueryParams): Observable<Page<RelatorioPlanoEntregaLacunaRow>> {
    return this.getCollectionPaged<RelatorioPlanoEntregaLacunaRow>(normalizeQueryParams(params), 50);
  }

  exportXls(params: RelatorioPlanoEntregaLacunaQueryParams): Observable<Blob> {
    return this.http.get(this.resourceUrl('/xls'), {
      params: normalizeQueryParams(params),
      responseType: 'blob',
    });
  }
}
