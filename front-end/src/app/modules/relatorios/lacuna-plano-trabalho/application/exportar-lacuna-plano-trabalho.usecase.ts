import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LacunaPlanoTrabalhoApiClient } from '../infra/lacuna-plano-trabalho-api.client';
import { LacunaPlanoTrabalhoQueryParams } from '../domain/types';

@Injectable()
export class ExportarLacunaPlanoTrabalho {
  private readonly api = inject(LacunaPlanoTrabalhoApiClient);

  execute(params: LacunaPlanoTrabalhoQueryParams): Observable<Blob> {
    return this.api.exportXls(params);
  }
}
