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
      && (p.status != PlanoTrabalhoStatus.ATIVO || !p.has_consolidacao_concluida)
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
    if (!PlanoTrabalhoStatusGroups.assinavel.includes(p.status) || !temEntregas) return false;

    if (p.usuario_id === this.auth.usuario?.id) return true;

    if (p.is_proprio) return false;

    return this.unidadeService.isGestorUnidade(p.unidade_id)
      || this.unidadeService.isGestorUnidade(p.unidade?.unidade_pai_id ?? null);
  }

  podeVerTcr(p: PlanoTrabalho): boolean {
    return !!p.documento_id
  }

  podeEncerrar(p: PlanoTrabalho): boolean {
    return p.acoes?.encerrar === true;
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
    return !p.data_arquivamento
      && PlanoTrabalhoStatusGroups.arquivavel.includes(p.status);
  }
}
