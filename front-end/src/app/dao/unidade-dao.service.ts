import { Injectable, Injector } from '@angular/core';
import { Unidade } from '../models/unidade.model';
import { AreaRelatorio } from '../modules/base/page-report-base';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeDaoService extends DaoBaseService<Unidade> {

  constructor(protected injector: Injector) {
    super("Unidade", injector);
    this.searchFields = ["codigo", "sigla", "nome"];
  }

  public metadadosArea(unidade_id: String): Promise<AreaRelatorio> {
    return new Promise<AreaRelatorio>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadadosArea', {unidade_id}).subscribe(response => {
        resolve(response?.metadadosArea || []);
      }, error => reject(error));
    });
  }
}
