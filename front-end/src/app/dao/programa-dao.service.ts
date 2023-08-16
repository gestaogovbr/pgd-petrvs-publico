import { Injectable, Injector } from '@angular/core';
import { Programa } from '../models/programa.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaDaoService extends DaoBaseService<Programa> {

  constructor(protected injector: Injector) { 
    super("Programa", injector);
    this.searchFields = ["nome"];
  }  

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" },
      { field: "normativo", label: "Normativo" },
      { field: "data_inicio", label: "Data início" },
      { field: "data_fim", label: "Data término" }
    ], deeps);
  }

}

