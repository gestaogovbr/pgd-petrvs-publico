import { Injectable } from '@angular/core';
import { Entrega, EntregaValor } from 'src/app/models/entrega.model';
import { HasMetaRealizado, PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { LookupService } from 'src/app/services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaService {

  constructor(public lookup: LookupService) { }

  public getValorMeta(entrega: HasMetaRealizado): string {   
    let result = "";
    switch (entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM": result = entrega.meta.porcentagem + " %"; break;
      case "QUANTIDADE": result = entrega.meta.quantitativo + ""; break;
      case "VALOR": result = entrega.meta.valor + ""; break;
      case "QUALITATIVO": result = this.lookup.getValue(entrega.entrega.lista_qualitativos || [], entrega.meta.qualitativo); break;
      default: result = "Indicador desconhecido";
    }
    return result;
  }

  public getValorRealizado(entrega: HasMetaRealizado): string {
    let result = "";
    switch (entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM": result = entrega.realizado.porcentagem + " %"; break;
      case "QUANTIDADE": result = entrega.realizado.quantitativo + ""; break;
      case "VALOR": result = entrega.realizado.valor + ""; break;
      case "QUALITATIVO": result = this.lookup.getValue(entrega.entrega.lista_qualitativos || [], entrega.realizado.qualitativo); break;
      default: result = "Indicador desconhecido";
    }
    return result;
  }

  public getValor(entregaValor: EntregaValor): any {
    return typeof entregaValor.porcentagem != "undefined" ? entregaValor.porcentagem :
      typeof entregaValor.qualitativo != "undefined" ? entregaValor.qualitativo :
        typeof entregaValor.quantitativo != "undefined" ? entregaValor.quantitativo :
          typeof entregaValor.valor != "undefined" ? entregaValor.valor : 0;
  }

  public getEntregaValor(entrega: Entrega, valor: any): EntregaValor {
    let result: EntregaValor = {};
    if (entrega.tipo_indicador == "PORCENTAGEM") result.porcentagem = valor;
    if (entrega.tipo_indicador == "QUALITATIVO") result.qualitativo = valor;
    if (entrega.tipo_indicador == "QUANTIDADE") result.quantitativo = valor;
    if (entrega.tipo_indicador == "VALOR") result.valor = valor;
    return result;
  }

  public isPorcentagem(entrega: PlanoEntregaEntrega): boolean {
    return entrega.entrega?.tipo_indicador == "PORCENTAGEM";
  }

  /**
   * Informa se o plano de entregas recebido como parâmetro está ativo, ou seja: é um plano válido (não foi deletado, não foi cancelado,
   * não foi arquivado) e possui o status ATIVO.
   * @param planoEntrega 
   * @returns 
   */
  public isAtivo(planoEntrega: PlanoEntrega): boolean {
    return this.isValido(planoEntrega) && planoEntrega.status == 'ATIVO';
  }

  /**
   * Informa se o plano de entregas recebido como parâmetro é válido, ou seja, não foi deletado, não foi cancelado nem foi arquivado.
   * @param planoEntrega 
   * @returns 
   */
  public isValido(planoEntrega: PlanoEntrega): boolean {
    return !planoEntrega.deleted_at && planoEntrega.status != 'CANCELADO' && !planoEntrega.data_arquivamento;
  }

  /**
   * Informa a situação do plano de entregas recebido como parâmetro, ou seja, se foi EXCLUIDO ou ARQUIVADO, ou, caso contrário, o seu status atual.
   * @param planoEntrega 
   * @returns 
   */
  public situacaoPlano(planoEntrega: PlanoEntrega): string {
    if (planoEntrega.deleted_at) return "EXCLUIDO";
    else if (planoEntrega.data_arquivamento) return "ARQUIVADO";
    else return planoEntrega.status!;
  }

}
