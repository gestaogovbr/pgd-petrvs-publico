import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvioParticipanteApiClient } from '../infra/envio-participante-api.client';
import { EnvioParticipanteQueryParams, EnvioParticipanteRow, Page } from '../domain/types';

@Injectable()
export class ListarEnvioParticipantes {
  private readonly api = inject(EnvioParticipanteApiClient);

  execute(params: EnvioParticipanteQueryParams): Observable<Page<EnvioParticipanteRow>> {
    return this.api.query(params);
  }
}
