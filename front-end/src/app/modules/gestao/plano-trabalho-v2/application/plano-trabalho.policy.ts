import { Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PlanoTrabalho } from '../domain/types';

@Injectable()
export class PlanoTrabalhoPolicy {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  podeCancelar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO'];
    return this.auth.hasPermissionTo('MOD_PTR_CNC')
      && statusPermitidos.includes(p.status)
      && this.unidadeService.isGestorUnidade(p.unidade_id);
  }

  podeEditar(p: PlanoTrabalho): boolean {
    const statusPermitidos = ['INCLUIDO', 'AGUARDANDO_ASSINATURA'];
    return p.usuario_id === this.auth.usuario?.id && statusPermitidos.includes(p.status);
  }
}
