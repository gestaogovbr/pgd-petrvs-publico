import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoStatus, PlanoTrabalhoStatusGroups } from 'src/app/models/plano-trabalho.model';

@Injectable()
export class PlanoTrabalhoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeCancelar(p: PlanoTrabalho): boolean {
    return this.auth.hasPermissionTo('MOD_PTR_CNC')
      && PlanoTrabalhoStatusGroups.cancelavel.includes(p.status)
      && (this.auth.usuario?.id == p.usuario_id || this.unidadeService.isGestorUnidade(p.unidade_id));
  }

  podeEditar(p: PlanoTrabalho): boolean {
    return PlanoTrabalhoStatusGroups.editavel.includes(p.status)
      && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id);
  }

  podeCancelarAssinatura(p: PlanoTrabalho): boolean {
    return p.status === PlanoTrabalhoStatus.AGUARDANDO_ASSINATURA
      && p.usuario_id === this.auth.usuario?.id;
  }

  podeAssinar(p: PlanoTrabalho): boolean {
    return PlanoTrabalhoStatusGroups.assinavel.includes(p.status)
      && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id);
  }

  podeVerTcr(p: PlanoTrabalho): boolean {
    return !!p.documento_id
      && (p.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(p.unidade_id)
        || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null));
  }

  podeEncerrar(p: PlanoTrabalho): boolean {
    const hoje = new Date().toISOString().split('T')[0];
    return p.status === PlanoTrabalhoStatus.ATIVO
      && String(p.data_fim).slice(0, 10) >= hoje
      && (p.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(p.unidade_id)
        || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null));
  }

  podeExcluir(p: PlanoTrabalho): boolean {
    return PlanoTrabalhoStatusGroups.excluivel.includes(p.status)
      && (p.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(p.unidade_id)
        || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null));
  }

  podeClonar(p: PlanoTrabalho): boolean {
    return PlanoTrabalhoStatusGroups.clonavel.includes(p.status)
      && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id);
  }

  podeArquivar(p: PlanoTrabalho): boolean {
    return PlanoTrabalhoStatusGroups.arquivavel.includes(p.status)
      && (this.unidadeService.isGestorUnidade(p.unidade_id)
        || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null)
        || p.usuario_id === this.auth.usuario?.id)
      && !p.data_arquivamento;
  }
}
