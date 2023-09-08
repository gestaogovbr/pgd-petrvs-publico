import { Injectable } from '@angular/core';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';

export type Items = {[entity: string]: LookupItem[]};

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  
  public itens: Items = {
    "PlanoTrabalho": this.lookup.PLANO_TRABALHO_STATUS,
    "PlanoEntrega": this.lookup.PLANO_ENTREGA_STATUS,
    "Atividade": this.lookup.ATIVIDADE_STATUS,
    "Consolidacao": this.lookup.CONSOLIDACAO_STATUS
  }

  constructor(public lookup: LookupService) { }

}
