import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { TipoSituacao } from '../models/tipo-situacao.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSituacaoDaoService extends DaoBaseService<TipoSituacao> {

  constructor(protected injector: Injector) { 
    super("TipoSituacao", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }
  
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" }
    ], deeps);
  }

}

