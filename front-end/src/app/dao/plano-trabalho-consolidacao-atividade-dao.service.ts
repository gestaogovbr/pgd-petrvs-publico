import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoConsolidacaoAtividade } from '../models/plano-trabalho-consolidacao-atividade.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoConsolidacaoAtividadeDaoService extends DaoBaseService<PlanoTrabalhoConsolidacaoAtividade> {

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoConsolidacaoAtividade", injector);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([], deeps);
  }

}

