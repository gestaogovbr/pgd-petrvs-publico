import { Injectable } from '@angular/core';
import { DaoBaseService } from '../dao/dao-base.service';
import { Base } from '../models/base.model';
import { Reacao } from '../models/reacao';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { ReacaoDaoService } from '../dao/reacao-dao.service';
import { LookupItem } from './lookup.service';

@Injectable({
  providedIn: 'root'
})
export class ReacaoService {

  constructor(
    public util: UtilService,
    public auth: AuthService,
    public dao: ReacaoDaoService
  ) { }

  reacaoUsuario(reacoes: Reacao[]): Reacao | undefined {
    return reacoes ? reacoes.find(reacao => reacao.usuario_id == this.auth.usuario?.id) : undefined
  }

  async criaReacao(reacao: LookupItem, coluna: string, id: string){
    const reacaoObjeto = new Reacao({
      usuario_id: this.auth.usuario?.id!,
      usuario: this.auth.usuario,
      tipo: reacao.key,
      atividade_id: coluna == "atividade_id" ? id : null,
      plano_entrega_entrega_id: coluna == "plano_entrega_entrega_id" ? id : null,
      plano_trabalho_entrega_id: coluna == "plano_trabalho_entrega_id" ? id : null,
    })
    const novaReacao = await this.dao.save(reacaoObjeto);
    if(novaReacao) novaReacao.usuario = this.auth.usuario;
    return novaReacao;
  }

  async atualizaReacao(novaReacao: LookupItem, reacao: Reacao){
    const reacaoAtualizada = await this.dao.update(reacao.id, {tipo: novaReacao.key});
    if(reacaoAtualizada) reacaoAtualizada.usuario = this.auth.usuario;
    return reacaoAtualizada;
  }

  async removeReacao(reacao: Reacao){
    return await this.dao.delete(reacao)
  }

}