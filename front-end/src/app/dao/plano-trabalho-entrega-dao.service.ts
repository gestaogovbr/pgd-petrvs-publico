import { Injectable, Injector } from '@angular/core';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoEntregaEntregaDaoService } from './plano-entrega-entrega-dao.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoEntregaDaoService extends DaoBaseService<PlanoTrabalhoEntrega> {

  public programaEntregaEntregaDao: PlanoEntregaEntregaDaoService;

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoEntrega", injector);
    this.programaEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "descricao", label: "Descrição da entrega" },
      { field: "forca_trabalho", label: "Percentual da força de trabalho" },
      { field: "orgao", label: "Orgão externo vinculado a entrega" },
      { field: "meta", label: "Meta extipulada para a entrega" },
      { field: "entrega", label: "Entrega do plano de entrega", fields: this.programaEntregaEntregaDao.dataset(), type: "OBJECT" },
    ], deeps);
  }

}

