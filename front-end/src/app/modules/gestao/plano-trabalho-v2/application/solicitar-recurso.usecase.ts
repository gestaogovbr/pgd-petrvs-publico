import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { AvaliacaoConsolidacao } from '../domain/types';

@Injectable()
export class SolicitarRecursoUseCase {
  private readonly api = inject(ConsolidacaoApiClient);

  execute(planoId: string, consolidacaoId: string, justificativa: string): Observable<AvaliacaoConsolidacao> {
    return this.api.solicitarRecurso(planoId, consolidacaoId, justificativa);
  }
}
