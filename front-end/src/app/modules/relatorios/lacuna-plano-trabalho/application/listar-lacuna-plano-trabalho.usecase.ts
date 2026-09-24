import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LacunaPlanoTrabalhoApiClient } from '../infra/lacuna-plano-trabalho-api.client';
import { LacunaPlanoTrabalhoQueryParams, LacunaPlanoTrabalhoRow, Page } from '../domain/types';

@Injectable()
export class ListarLacunaPlanoTrabalho {
  private readonly api = inject(LacunaPlanoTrabalhoApiClient);

  execute(params: LacunaPlanoTrabalhoQueryParams): Observable<Page<LacunaPlanoTrabalhoRow>> {
    return this.api.query(params);
  }
}
