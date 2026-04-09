import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { AvaliacaoConsolidacao, Consolidacao, PlanoTrabalho } from '../domain/types';

@Injectable()
export class ConsolidacaoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeAvaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    return this.auth.usuario?.id != planoTrabalho.usuario_id
      && consolidacao.status === 'CONCLUIDO'
      && this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id);
  }

  podeSolicitarRecurso(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao, planoTrabalho: PlanoTrabalho): boolean {
    return this.auth.usuario?.id === planoTrabalho.usuario_id
      && planoTrabalho.status === 'CONCLUIDO'
      && consolidacao.status === 'AVALIADO'
      && consolidacao.avaliacoes.length === 1
      && avaliacao.recurso === null;
  }

  podeReavaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    const ultimaAvaliacao = consolidacao.avaliacoes[consolidacao.avaliacoes.length - 1];
    return !!ultimaAvaliacao?.recurso
      && this.auth.usuario?.id != planoTrabalho.usuario_id
      && this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id);
  }
}