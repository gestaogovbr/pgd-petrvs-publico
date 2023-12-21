import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoConsolidacaoOcorrencia } from '../models/plano-trabalho-consolidacao-ocorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoConsolidacaoOcorrenciaDaoService extends DaoBaseService<PlanoTrabalhoConsolidacaoOcorrencia> {

  constructor(protected injector: Injector) {
    super("PlanoTrabalhoConsolidacaoOcorrencia", injector);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([], deeps);
  }

}

