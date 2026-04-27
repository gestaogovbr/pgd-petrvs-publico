import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PlanoTrabalho } from '../domain/types';

@Injectable()
export class PlanoTrabalhoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeCancelar(p: PlanoTrabalho): boolean {
    return this.auth.hasPermissionTo('MOD_PTR_CNC')
      && p.status === 'ATIVO'
      && this.unidadeService.isGestorUnidade(p.unidade_id);
  }

  podeEditar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['INCLUIDO', 'AGUARDANDO_ASSINATURA'];
    return p.usuario_id === this.auth.usuario?.id && statusPermitidos.includes(p.status);
  }

  podeCancelarAssinatura(p: PlanoTrabalho): boolean {
    return p.status === 'AGUARDANDO_ASSINATURA' && p.usuario_id === this.auth.usuario?.id;
  }

  podeAssinar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['INCLUIDO', 'AGUARDANDO_ASSINATURA'];
    return statusPermitidos.includes(p.status) && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id);
  }

  podeExcluir(p: PlanoTrabalho): boolean {
    return p.status === 'INCLUIDO' && p.usuario_id === this.auth.usuario?.id;
  }

  podeClonar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['ATIVO', 'CONCLUIDO'];
    return statusPermitidos.includes(p.status) && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id);
  }

  podeArquivar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['CONCLUIDO', 'CANCELADO'];
    return statusPermitidos.includes(p.status)
      && (this.unidadeService.isGestorUnidade(p.unidade_id) || p.usuario_id === this.auth.usuario?.id)
      && !p.data_arquivamento;
  }
}
