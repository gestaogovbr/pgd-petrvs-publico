import { Injectable, Injector } from '@angular/core';
import { PlanoEntregaEntrega } from '../models/plano-entrega-entrega.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaDaoService extends DaoBaseService<PlanoEntregaEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoEntregaEntrega", injector);
    this.inputSearchConfig.searchFields = ["descricao","destinatario"];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "descricao", label: "Descrição da entrega" },
      { field: "data_inicio", label: "Data início" },
      { field: "data_fim", label: "Data fim" },
      { field: "homologado", label: "Se a entrega já foi homologada" },
      { field: "progresso_esperado", label: "Percentual de progesso esperado da entrega" },
      { field: "progresso_realizado", label: "Percentual de progesso realizado da entrega" },
      { field: "destinatario", label: "Destinatário da entrega" }
    ], deeps);
  }
}

