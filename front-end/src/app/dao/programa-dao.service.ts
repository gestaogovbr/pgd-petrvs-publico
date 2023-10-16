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
    this.inputSearchConfig.searchFields = ["nome"];
  }  

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" },
      { field: "normativo", label: "Normativo" },
      { field: "data_inicio", label: "Data início" },
      { field: "data_fim", label: "Data término" }
    ], deeps);
  }

/*   public assinaturasExigidas(programa_id: string): Promise<string[]> {
    return new Promise<string[]>((resolve,reject) => {
      this.server.post('api/Programa/assinaturasExigidas',{ programa_id: programa_id})
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log("Erro no acesso aos dados das assinaturas!", error);
          resolve([]);
        });
    });
  } */

}

