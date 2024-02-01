import { Injectable } from '@angular/core';
import { UnidadeDaoService } from '../dao/unidade-dao.service';
import { LookupItem } from './lookup.service';
import { Unidade } from '../models/unidade.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UnidadeService {

  public unidade: LookupItem[] = [];
  public unidadeDao?: UnidadeDaoService;

  constructor(
    public auth: AuthService
  ) { }

  async getAllUnidades() {
    this.unidadeDao?.query().getAll().then((unidade) => {
      this.unidade = unidade.map(x => Object.assign({}, { key: x.id, value: x.sigla }) as LookupItem);
      return this.unidade;
    });
  }

  /**
   * Informa se o usuário logado é gestor(titular, substituto ou delegado) da unidade recebida como parâmetro. Se nenhuma unidade for repassada,
   * será adotada a unidade selecionada pelo servidor na homepage.
   * @param pUnidade
   * @returns
  */
  public isGestorUnidade(pUnidade: Unidade | string | null = null): boolean {
    let id_unidade = pUnidade == null ? this.auth.unidade?.id || null : (typeof pUnidade == "string" ? pUnidade : pUnidade.id);
    let areaTrabalho = this.auth.unidades?.find(x => x.id == id_unidade);
    return !!id_unidade && !!areaTrabalho && [areaTrabalho.gestor?.usuario_id, ...(areaTrabalho.gestores_substitutos?.map(x => x.usuario_id)), ...(areaTrabalho.gestores_delegados?.map(x => x.usuario_id))].includes(this.auth.usuario!.id);
  }
}
