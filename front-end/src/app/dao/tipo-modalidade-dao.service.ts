import { Injectable, Injector } from '@angular/core';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { TipoModalidade } from '../models/tipo-modalidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoModalidadeDaoService extends DaoBaseService<TipoModalidade> {

  constructor(protected injector: Injector) { 
    super("TipoModalidade", injector);
    this.searchFields = ["nome"];
  }
  
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" },
      { field: "ganho_produtividade", label: "% de ganho de produtividade" }
    ], deeps);
  }

}

