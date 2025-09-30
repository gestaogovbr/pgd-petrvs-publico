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
   * Informa se o usuário logado é gestor(titular, substituto ou delegado, se incluiDelegado) da unidade recebida como parâmetro. Se nenhuma unidade for repassada,
   * será adotada a unidade selecionada pelo servidor na homepage.
   * @param pUnidade
   * @param incluiDelegado 
   * @returns
  */
  public isGestorUnidade(pUnidade: Unidade | string | null = null, incluiDelegado: boolean = true, incluiSubstituto: boolean = true): boolean {
    let id_unidade = pUnidade == null ? this.auth.unidade?.id || null : (typeof pUnidade == "string" ? pUnidade : pUnidade.id);
    let areaTrabalho = this.auth.unidades?.find(x => x.id == id_unidade);
    let gestores = [areaTrabalho?.gestor?.usuario_id];
    if (incluiSubstituto) gestores.push(...(areaTrabalho?.gestores_substitutos?.map(x => x.usuario_id) || []));
    if (incluiDelegado) gestores.push(...(areaTrabalho?.gestores_delegados?.map(x => x.usuario_id) || []));
    return !!id_unidade && !!areaTrabalho && gestores.includes(this.auth.usuario!.id);
  }

  /**
   * Informa se o usuário logado é gestor de uma unidade superior(titular ou substituto) da unidade recebida como parâmetro. 
   * @param unidade
   * @returns
  */
  public isGestorUnidadeSuperior(unidade: Unidade): boolean {
    let gestoresIds = [];
    gestoresIds.push(unidade.unidade_pai?.gestor?.usuario_id);
    gestoresIds.push(...(unidade.unidade_pai?.gestores_substitutos?.map(x => x.usuario_id) ?? []));
    return gestoresIds.includes(this.auth.usuario!.id);
  }


  /**
   * Informa se o usuário logado é gestor titular da unidade recebida como parâmetro. 
   * @param unidade
   * @returns
  */
  public isGestorTitularUnidade(pUnidade: Unidade | string | null = null): boolean {
    let id_unidade = pUnidade == null ? this.auth.unidade?.id || null : (typeof pUnidade == "string" ? pUnidade : pUnidade.id);
    let areaTrabalho = this.auth.unidades?.find(x => x.id == id_unidade);
    let gestores = [areaTrabalho?.gestor?.usuario_id];
    return !!id_unidade && !!areaTrabalho && gestores.includes(this.auth.usuario!.id);
  }

  /**
   * Informa se o usuário informado é gestor da unidade do Plano de Trabalho(titular ou substituto) da unidade recebida como parâmetro. 
   * @param unidade
   * @param usuario_id
   * @returns
  */
  public isGestorUnidadePlano(unidade: Unidade, usuario_id: string): boolean {
    let gestoresIds = [];
    gestoresIds.push(unidade.gestor?.usuario_id);
    gestoresIds.push(...(unidade.gestores_substitutos?.map(x => x.usuario_id) ?? []));
    return gestoresIds.includes(usuario_id);
  }
}
