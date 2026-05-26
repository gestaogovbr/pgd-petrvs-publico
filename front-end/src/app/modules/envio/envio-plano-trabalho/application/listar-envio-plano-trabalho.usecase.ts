import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvioPlanoTrabalhoApiClient } from '../infra/envio-plano-trabalho-api.client';
import { EnvioPlanoTrabalhoQueryParams, EnvioPlanoTrabalhoRow, Page } from '../domain/types';

@Injectable()
export class ListarEnvioPlanoTrabalho {
  private readonly api = inject(EnvioPlanoTrabalhoApiClient);

  execute(params: EnvioPlanoTrabalhoQueryParams): Observable<Page<EnvioPlanoTrabalhoRow>> {
    return this.api.query(params);
  }
}
