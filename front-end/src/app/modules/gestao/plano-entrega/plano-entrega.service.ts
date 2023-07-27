import { Injectable } from '@angular/core';
import { Entrega, EntregaValor } from 'src/app/models/entrega.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { LookupService } from 'src/app/services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaService {
  
  constructor(public lookup: LookupService) { }

  public getValorMeta(entrega: PlanoEntregaEntrega): string {
    let result = "";
    switch(entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM": result = entrega.meta.porcentagem + " %"; break;
      case "QUANTIDADE": result = entrega.meta.quantitativo + ""; break;
      case "VALOR": result = entrega.meta.valor + ""; break;
      case "QUALITATIVO": result = this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.meta.qualitativo); break;
      default: result = "Indicador desconhecido";
    }
    return result;
  }

  public getValorRealizado(entrega: PlanoEntregaEntrega): string {
    let result = "";
    switch(entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM": result = entrega.realizado.porcentagem + " %"; break;
      case "QUANTIDADE": result = entrega.realizado.quantitativo + ""; break;
      case "VALOR": result = entrega.realizado.valor + ""; break;
      case "QUALITATIVO": result = this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.realizado.qualitativo); break;
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
    if(entrega.tipo_indicador == "PORCENTAGEM") result.porcentagem = valor;
    if(entrega.tipo_indicador == "QUALITATIVO") result.qualitativo = valor;
    if(entrega.tipo_indicador == "QUANTIDADE") result.quantitativo = valor;
    if(entrega.tipo_indicador == "VALOR") result.valor = valor;
    return result;
  }

  public isPorcentagem(entrega: PlanoEntregaEntrega): boolean {
    return entrega.entrega?.tipo_indicador == "PORCENTAGEM";
  }

}
