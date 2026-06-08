import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { EnvioParticipanteQueryParams, EnvioParticipanteRow, Page } from '../domain/types';

@Injectable()
export class EnvioParticipanteApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/envio-participante';

  query(params: EnvioParticipanteQueryParams): Observable<Page<EnvioParticipanteRow>> {
    return this.getCollectionPaged<EnvioParticipanteRow>(normalizeQueryParams(params), 50);
  }
}
