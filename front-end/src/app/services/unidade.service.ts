import { Injectable } from '@angular/core';
import { UnidadeDaoService } from '../dao/unidade-dao.service';
import { LookupItem } from './lookup.service';

@Injectable({
  providedIn: 'root'
})

export class UnidadeService {

  public unidade: LookupItem[] = [];
  public unidadeDao?: UnidadeDaoService;

  constructor() { }

  async getAllUnidades(){
    this.unidadeDao?.query().getAll().then((unidade) => {
      this.unidade = unidade.map(x => Object.assign({}, { key: x.id, value: x.sigla }) as LookupItem);
      return this.unidade;
    });
  }
}
