import { Injectable, Injector } from '@angular/core';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Cidade } from '../models/cidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeDaoService extends DaoBaseService<Cidade> {

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "codigo_ibge", label: "Código" },
      { field: "nome", label: "Nome" },
      { field: "uf", label: "UF" }
    ]);
  }

  constructor(protected injector: Injector) { 
    super("Cidade", injector);
    this.searchFields = ["uf", "nome"];
  }  
}

