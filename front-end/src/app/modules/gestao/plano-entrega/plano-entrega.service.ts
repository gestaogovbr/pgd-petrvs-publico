import { Injectable } from '@angular/core';
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
      case "PORCENTAGEM": entrega.meta.porcentagem + " %"; break;
      case "QUALITATIVO": entrega.meta.quantitativo; break;
      case "VALOR": entrega.meta.valor; break;
      case "QUALITATIVO": this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.meta.qualitativo); break;
      default: result = "Indicador desconhecido";
    }
    return result;
  }

  public getValorRealizado(entrega: PlanoEntregaEntrega): string {
    let result = "";
    switch(entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM": entrega.realizado.porcentagem + " %"; break;
      case "QUALITATIVO": entrega.realizado.quantitativo; break;
      case "VALOR": entrega.realizado.valor; break;
      case "QUALITATIVO": this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.realizado.qualitativo); break;
      default: result = "Indicador desconhecido";
    }
    return result;
  }

  public isPorcentagem(entrega: PlanoEntregaEntrega): boolean {
    return entrega.entrega?.tipo_indicador == "PORCENTAGEM";
  }

}
