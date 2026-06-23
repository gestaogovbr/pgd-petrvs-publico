import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { Consolidacao } from '../domain/types';

@Injectable()
export class ConcluirConsolidacaoUseCase {
  private readonly api = inject(ConsolidacaoApiClient);

  execute(planoId: string, consolidacaoId: string): Observable<Consolidacao> {
    return this.api.concluirConsolidacao(planoId, consolidacaoId);
  }
}
