import { Injectable, Injector } from '@angular/core';
import { Unidade } from '../models/unidade.model';
import { AreaRelatorio } from '../modules/base/page-report-base';
import { DaoBaseService } from './dao-base.service';

export type UnidadeDashboard = {
  sigla: string,                                    // nome da Unidade
  qdePTAtivos: number,                              // quantidade de Planos de Trabalho ativos (vigentes)
  horasUteisTotaisPTAtivos: number,                 // total de horas úteis totais dos Planos de Trabalho ativos
  qdeServidores: number,                            // quantidade de servidores vinculados aos Planos de Trabalho da Unidade
  modalidadesPlanos: string[]
};

@Injectable({
  providedIn: 'root'
})
export class UnidadeDaoService extends DaoBaseService<Unidade> {

  constructor(protected injector: Injector) {
    super("Unidade", injector);
    this.searchFields = ["codigo", "sigla", "nome"];
  }

  public metadadosArea(unidade_id: String, programa_id: String): Promise<AreaRelatorio> {
    return new Promise<AreaRelatorio>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/metadadosArea', {unidade_id, programa_id}).subscribe(response => {
        resolve(response?.metadadosArea || []);
      }, error => reject(error));
    });
  }

  public dashboards(idsUnidades: string[], programa_id: String, unidadesSubordinadas: boolean): Promise<UnidadeDashboard[] | null> {
    return new Promise<UnidadeDashboard[] | null>((resolve, reject) => {
      if(idsUnidades?.length && programa_id.length){
        this.server.post('api/' + this.collection + '/dashboards', {idsUnidades, programa_id, unidadesSubordinadas}).subscribe(response => {
          resolve(response?.dashboards as UnidadeDashboard[]);
        }, error => reject(error));
      } else {
        resolve(null);
      }
    });
  }
}
