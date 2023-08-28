import { Injectable, Injector } from '@angular/core';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoEntregaDaoService extends DaoBaseService<PlanoTrabalhoEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoEntrega", injector);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "descricao", label: "Descrição da entrega" },
      { field: "forca_trabalho", label: "Percentual da força de trabalho" },
      { field: "orgao", label: "Orgão externo vinculado a entrega" },
      { field: "meta", label: "Meta extipulada para a entrega" }
    ], deeps);
  }

}

