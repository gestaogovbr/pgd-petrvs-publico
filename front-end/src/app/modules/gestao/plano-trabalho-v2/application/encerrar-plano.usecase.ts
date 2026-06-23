import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoApiClient } from '../infra/plano-api.client';
import { PlanoTrabalho, PlanoTrabalhoId } from '../domain/types';

@Injectable()
export class EncerrarPlanoUseCase {
  private readonly api = inject(PlanoApiClient);

  execute(id: PlanoTrabalhoId, justificativa: string): Observable<PlanoTrabalho> {
    return this.api.encerrar(id, justificativa);
  }
}
