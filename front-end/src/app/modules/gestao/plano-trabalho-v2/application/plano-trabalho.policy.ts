import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoStatus, PlanoTrabalhoStatusGroups } from 'src/app/models/plano-trabalho.model';

@Injectable()
export class PlanoTrabalhoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeVerAcoes(): boolean {
    return !this.auth.isUsuarioConsulta();
  }

  podeVerLogs(): boolean {
    return this.auth.hasPermissionTo('MOD_AUDIT_LOG');
  }

  podeCancelar(p: PlanoTrabalho): boolean {
    return this.auth.hasPermissionTo('MOD_PTR_CNC')
      && PlanoTrabalhoStatusGroups.cancelavel.includes(p.status)
      && !p.has_consolidacao_concluida
      && (this.auth.usuario?.id == p.usuario_id || this.unidadeService.isGestorUnidade(p.unidade_id));
  }

  podeEditar(p: PlanoTrabalho): boolean {
    return p.acoes?.editar === true;
  }

  podeCancelarAssinatura(p: PlanoTrabalho): boolean {
    return p.status === PlanoTrabalhoStatus.AGUARDANDO_ASSINATURA
      && p.usuario_id === this.auth.usuario?.id;
  }

  podeAssinar(p: PlanoTrabalho): boolean {
    const temEntregas = (p.entregas?.length > 0) || (Number((p as any).carga_trabalho_total) > 0);
    return PlanoTrabalhoStatusGroups.assinavel.includes(p.status)
      && temEntregas
      && (p.usuario_id === this.auth.usuario?.id
        || this.unidadeService.isGestorUnidade(p.unidade_id)
        || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null));
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
    if (!PlanoTrabalhoStatusGroups.arquivavel.includes(p.status) || p.data_arquivamento) {
      return false;
    }

    if (p.usuario_id === this.auth.usuario?.id) {
      return true;
    }

    if (this.unidadeService.isGestorUnidade(p.unidade_id)
      || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null)) {
      return true;
    }

    if (this.auth.isUsuarioColaborador()) {
      return !!this.auth.usuario?.areas_trabalho?.some(area => area.unidade_id === p.unidade_id);
    }

    return false;
  }
}
