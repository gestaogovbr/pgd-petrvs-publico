import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { EnvioPlanoTrabalhoApiClient } from '../infra/envio-plano-trabalho-api.client';

@Injectable()
export class EnviarEnvioPlanoTrabalho {
  private readonly api = inject(EnvioPlanoTrabalhoApiClient);

  execute(id: string): Observable<{ success: boolean; message: string }> {
    return this.api.enviar(id).pipe(take(1));
  }
}
