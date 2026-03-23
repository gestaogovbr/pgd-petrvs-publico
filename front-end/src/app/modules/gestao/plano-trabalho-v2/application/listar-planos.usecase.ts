import { inject, Injectable } from '@angular/core';
import { PlanoTrabalhoApiClient } from '../infra/api-client';
import { Observable } from 'rxjs';
import { Page, PlanoTrabalho, QueryParams } from '../domain/types';

@Injectable({
  providedIn: 'root'
})
export class ListarPlanos {
  private readonly api = inject(PlanoTrabalhoApiClient);
  execute(params: QueryParams): Observable<Page<PlanoTrabalho>> {
    return this.api.query(params);
  }
}
