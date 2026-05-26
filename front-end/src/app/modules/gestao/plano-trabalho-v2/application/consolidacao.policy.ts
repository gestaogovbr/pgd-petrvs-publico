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
    if (planoTrabalho.encerrado_at && consolidacao.data_inicio > planoTrabalho.encerrado_at) return false;
    return this.auth.usuario?.id != planoTrabalho.usuario_id
      && consolidacao.status === ConsolidacaoStatus.CONCLUIDO
      && (this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id)
        || this.unidadeService.isGestorUnidade(planoTrabalho.unidade?.unidade_pai_id ?? null));
  }

  podeSolicitarRecurso(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao, planoTrabalho: PlanoTrabalho): boolean {
    const jaRecorreu = consolidacao.avaliacoes.some(a => a.recurso !== null);
    return this.auth.usuario?.id === planoTrabalho.usuario_id
      && consolidacao.status === ConsolidacaoStatus.AVALIADO
      && avaliacao.recurso === null
      && !jaRecorreu;
  }

  podeReavaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    const ultimaAvaliacao = consolidacao.avaliacoes[consolidacao.avaliacoes.length - 1];
    return consolidacao.avaliacoes.length === 1
      && !!ultimaAvaliacao?.recurso
      && this.auth.usuario?.id != planoTrabalho.usuario_id
      && (this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id)
        || this.unidadeService.isGestorUnidade(planoTrabalho.unidade?.unidade_pai_id ?? null));
  }

  podeCancelarAvaliacao(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao): boolean {
    const ultimaAvaliacao = consolidacao.avaliacoes.reduce<AvaliacaoConsolidacao | null>((latest, item) => {
      if (!latest) return item;
      return Date.parse(item.data_avaliacao) > Date.parse(latest.data_avaliacao) ? item : latest;
    }, null);

    return consolidacao.status === ConsolidacaoStatus.AVALIADO
      && ultimaAvaliacao?.id === avaliacao.id
      && avaliacao.avaliador?.id === this.auth.usuario?.id;
  }
}