import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { normalizeQueryParams } from 'src/app/v2/infra/normalize-query-params';
import { TenantV2ResourceApiBase } from 'src/app/v2/infra/tenant-v2-resource-api.base';
import { LacunaPlanoTrabalhoQueryParams, LacunaPlanoTrabalhoRow, Page } from '../domain/types';

@Injectable()
export class LacunaPlanoTrabalhoApiClient extends TenantV2ResourceApiBase {
  protected readonly apiPath = '/api/v2/relatorio-lacuna-plano-trabalho';

  query(params: LacunaPlanoTrabalhoQueryParams): Observable<Page<LacunaPlanoTrabalhoRow>> {
    return this.getCollectionPaged<LacunaPlanoTrabalhoRow>(normalizeQueryParams(params), 20);
  }
}
