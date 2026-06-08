import { inject, Injectable } from '@angular/core';
import { PlanoApiClient } from '../infra/plano-api.client';
import { Observable } from 'rxjs';
import { Page, PlanoTrabalho, QueryParams } from '../domain/types';

@Injectable()
export class ListarPlanos {
  private readonly api = inject(PlanoApiClient);
  execute(params: QueryParams): Observable<Page<PlanoTrabalho>> {
    return this.api.query(params);
  }
}
