import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoApiClient } from '../infra/plano-api.client';
import { PlanoTrabalhoId } from '../domain/types';

@Injectable()
export class ExcluirPlanoUseCase {
  private readonly api = inject(PlanoApiClient);

  execute(id: PlanoTrabalhoId): Observable<void> {
    return this.api.delete(id);
  }
}
