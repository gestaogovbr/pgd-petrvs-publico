import { Injectable } from '@angular/core';
import { UnidadeDaoService } from '../dao/unidade-dao.service';
import { LookupItem } from './lookup.service';

@Injectable({
  providedIn: 'root'
})

export class UnidadesService {

  public unidade: LookupItem[] = [];
  public unidadeDao?: UnidadeDaoService;

  constructor() { 


  }

  async getAllUnidades(){
    this.unidadeDao?.query().getAll().then((unidade) => {
      //console.log(unidade);
      this.unidade = unidade.map(x => Object.assign({}, { key: x.id, value: x.sigla }) as LookupItem);
      //console.log(this.unidade)
      return this.unidade;
    });
  }
}
