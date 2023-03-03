import { Injectable, Injector } from '@angular/core';
import { Demanda } from '../models/demanda.model';
import { Plano } from '../models/plano.model';
import { Metadado, MetadadosPlano } from 'src/app/modules/base/page-report-base';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoDaoService extends DaoBaseService<Plano> {

  constructor(protected injector: Injector) {
    super("Plano", injector);
  }

  public metadados(plano: Plano, inicioPeriodo: string | null, fimPeriodo: string | null): Promise<Metadado> {
    return new Promise<Metadado>((resolve, reject) => {
      this.server.post('api/Relatorio/metadados', {
        plano: plano, inicioPeriodo: inicioPeriodo, fimPeriodo: fimPeriodo
      }).subscribe(response => {
        resolve(response?.metadados || []);
      }, error => reject(error));
    });
  }

  public metadadosPlano(plano_id: string): Promise<MetadadosPlano> {
    return new Promise<MetadadosPlano>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadadosPlano', {plano_id}).subscribe(response => {
        resolve(response?.metadadosPlano || []);
      }, error => reject(error));
    });
  }

}

