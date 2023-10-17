import { Injectable, Injector } from '@angular/core';
import { Cidade } from '../models/cidade.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeDaoService extends DaoBaseService<Cidade> {

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "codigo_ibge", label: "Código" },
      { field: "nome", label: "Nome" },
      { field: "uf", label: "UF" }
    ], deeps);
  }

  constructor(protected injector: Injector) { 
    super("Cidade", injector);
    this.inputSearchConfig.searchFields = ["uf", "nome"];
  }  
}

