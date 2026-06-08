import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { EnvioPlanoTrabalhoQueryParams, EnvioPlanoTrabalhoRow, Page } from '../domain/types';

@Injectable()
export class EnvioPlanoTrabalhoApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/envio-plano-trabalho';

  query(params: EnvioPlanoTrabalhoQueryParams): Observable<Page<EnvioPlanoTrabalhoRow>> {
    return this.getCollectionPaged<EnvioPlanoTrabalhoRow>(normalizeQueryParams(params), 50);
  }
}
