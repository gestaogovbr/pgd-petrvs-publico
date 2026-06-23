import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { EnvioPlanoEntregaQueryParams, EnvioPlanoEntregaRow, Page } from '../domain/types';

@Injectable()
export class EnvioPlanoEntregaApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/envio-plano-entrega';

  query(params: EnvioPlanoEntregaQueryParams): Observable<Page<EnvioPlanoEntregaRow>> {
    return this.getCollectionPaged<EnvioPlanoEntregaRow>(normalizeQueryParams(params), 50);
  }
}
