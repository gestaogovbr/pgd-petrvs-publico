import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvioPlanoEntregaApiClient } from '../infra/envio-plano-entrega-api.client';
import { EnvioPlanoEntregaQueryParams, EnvioPlanoEntregaRow, Page } from '../domain/types';

@Injectable()
export class ListarEnvioPlanoEntrega {
  private readonly api = inject(EnvioPlanoEntregaApiClient);

  execute(params: EnvioPlanoEntregaQueryParams): Observable<Page<EnvioPlanoEntregaRow>> {
    return this.api.query(params);
  }
}
