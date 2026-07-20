import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { AvaliacaoConsolidacao, Consolidacao, ConsolidacaoStatus, ConsolidacaoStatusGroups, PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoStatus } from 'src/app/models/plano-trabalho.model';

type PapelParticipante = 'titular' | 'substituto' | 'delegado' | 'lotado';

@Injectable()
export class ConsolidacaoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeRegistrar(planoTrabalho: PlanoTrabalho, consolidacao?: Consolidacao): boolean {
    if (planoTrabalho.status !== PlanoTrabalhoStatus.ATIVO && !planoTrabalho.encerrado_at) return false;
    if (consolidacao && ConsolidacaoStatusGroups.fechados.includes(consolidacao.status)) return false;
    return planoTrabalho.usuario_id === this.auth.usuario?.id
      || this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id);
  }

  podeAvaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    if (planoTrabalho.is_proprio) return false;
    if (planoTrabalho.encerrado_at && new Date(consolidacao.data_inicio) > new Date(planoTrabalho.encerrado_at)) return false;
    return this.auth.usuario?.id != planoTrabalho.usuario_id
      && consolidacao.status === ConsolidacaoStatus.CONCLUIDO
      && this.podeAvaliarPlano(planoTrabalho);
  }

  podeSolicitarRecurso(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao, planoTrabalho: PlanoTrabalho): boolean {
    const jaRecorreu = consolidacao.avaliacoes.some(a => a.recurso !== null);
    return this.auth.usuario?.id === planoTrabalho.usuario_id
      && consolidacao.status === ConsolidacaoStatus.AVALIADO
      && avaliacao.recurso === null
      && !avaliacao.tipo_avaliacao_nota?.aprova
      && !jaRecorreu;
  }

  podeReavaliarConsolidacao(consolidacao: Consolidacao, planoTrabalho: PlanoTrabalho): boolean {
    if (planoTrabalho.is_proprio) return false;
    const ultimaAvaliacao = consolidacao.avaliacoes[consolidacao.avaliacoes.length - 1];
    return consolidacao.avaliacoes.length === 1
      && !!ultimaAvaliacao?.recurso
      && this.auth.usuario?.id != planoTrabalho.usuario_id
      && this.podeAvaliarPlano(planoTrabalho);
  }

  podeCancelarAvaliacao(consolidacao: Consolidacao, avaliacao: AvaliacaoConsolidacao): boolean {
    return avaliacao.pode_cancelar === true;
  }

  /**
   * Regras de avaliação conforme PTR:TABELA_1.
   * Delegados não podem avaliar registros de execução.
   */
  private podeAvaliarPlano(planoTrabalho: PlanoTrabalho): boolean {
    const chefiaSuperior = this.isChefiaUnidadeSuperior(planoTrabalho);
    const papel = this.papelParticipanteNaUnidadeExecutora(planoTrabalho);

    switch (papel) {
      case 'titular':
        return chefiaSuperior;
      case 'substituto':
        return chefiaSuperior || this.isGestorTitularUnidade(planoTrabalho.unidade_id);
      default:
        return chefiaSuperior || this.unidadeService.isGestorUnidade(planoTrabalho.unidade_id, false);
    }
  }

  private papelParticipanteNaUnidadeExecutora(planoTrabalho: PlanoTrabalho): PapelParticipante {
    const unidade = this.auth.unidades?.find(u => u.id === planoTrabalho.unidade_id);
    const participanteId = planoTrabalho.usuario_id;

    if (!unidade) return 'lotado';
    if (unidade.gestor?.usuario_id === participanteId) return 'titular';
    if (unidade.gestores_substitutos?.some(g => g.usuario_id === participanteId)) return 'substituto';
    if (unidade.gestores_delegados?.some(g => g.usuario_id === participanteId)) return 'delegado';
    return 'lotado';
  }

  private isChefiaUnidadeSuperior(planoTrabalho: PlanoTrabalho): boolean {
    const unidadePaiId = planoTrabalho.unidade?.unidade_pai_id;
    return !!unidadePaiId && this.unidadeService.isGestorUnidade(unidadePaiId, false);
  }

  private isGestorTitularUnidade(unidadeId: string): boolean {
    const unidade = this.auth.unidades?.find(u => u.id === unidadeId);
    return unidade?.gestor?.usuario_id === this.auth.usuario?.id;
  }
}
