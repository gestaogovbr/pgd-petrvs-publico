import { Injectable, Injector } from '@angular/core';
import { TipoModalidade } from '../models/tipo-modalidade.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class TipoModalidadeDaoService extends DaoBaseService<TipoModalidade> {

  constructor(protected injector: Injector) { 
    super("TipoModalidade", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }
  
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" }
    ], deeps);
  }

}

