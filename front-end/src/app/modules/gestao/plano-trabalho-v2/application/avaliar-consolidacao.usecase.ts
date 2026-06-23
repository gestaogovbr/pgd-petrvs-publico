import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { AvaliacaoConsolidacao } from '../domain/types';

@Injectable()
export class AvaliarConsolidacaoUseCase {
  private readonly api = inject(ConsolidacaoApiClient);

  execute(planoId: string, consolidacaoId: string, payload: { tipo_avaliacao_nota_id: string; justificativa?: string }): Observable<AvaliacaoConsolidacao> {
    return this.api.avaliarConsolidacao(planoId, consolidacaoId, payload);
  }
}
