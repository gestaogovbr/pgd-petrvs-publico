import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { Ocorrencia } from '../models/ocorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaDaoService extends DaoBaseService<Ocorrencia> {

  constructor(protected injector: Injector) {
    super("Ocorrencia", injector);
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([], deeps);
  }

}

