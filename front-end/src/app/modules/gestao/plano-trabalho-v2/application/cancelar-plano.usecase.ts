import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoApiClient } from '../infra/plano-api.client';
import { PlanoTrabalho, PlanoTrabalhoId } from '../domain/types';

@Injectable()
export class CancelarPlanoUseCase {
  private readonly api = inject(PlanoApiClient);

  execute(id: PlanoTrabalhoId, justificativa: string): Observable<PlanoTrabalho> {
    return this.api.cancel(id, justificativa);
  }
}
