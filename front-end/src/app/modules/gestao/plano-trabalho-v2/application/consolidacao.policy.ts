import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { AvaliacaoConsolidacao, Consolidacao, ConsolidacaoStatus, ConsolidacaoStatusGroups, PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoStatus } from 'src/app/models/plano-trabalho.model';

@Injectable()
export class ConsolidacaoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeRegistrar(planoTrabalho: PlanoTrabalho, consolidacao?: Consolidacao): boolean {
    if (planoTrabalho.status !== PlanoTrabalhoStatus.ATIVO) return false;
    if (consolidacao && ConsolidacaoStatusGroups.fechados.includes(consolidacao.status)) return false;
    return planoTrabalho.usuario_id === this.auth.usuario?.id
      || this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id);
  }

  podeAvaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    return this.auth.usuario?.id != planoTrabalho.usuario_id
      && consolidacao.status === ConsolidacaoStatus.CONCLUIDO
      && this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id);
  }

  podeSolicitarRecurso(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao, planoTrabalho: PlanoTrabalho): boolean {
    return this.auth.usuario?.id === planoTrabalho.usuario_id
      && planoTrabalho.status === PlanoTrabalhoStatus.CONCLUIDO
      && consolidacao.status === ConsolidacaoStatus.AVALIADO
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