import { Injectable, Injector } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { DaoBaseService } from './dao-base.service';

export type AtividadeDashboard = {
  total_atividades: number
};

@Injectable({
  providedIn: 'root'
})
export class AtividadeDaoService extends DaoBaseService<Atividade> {

  constructor(protected injector: Injector) {
    super("Atividade", injector);
    this.searchFields = ["nome"];
  }

  public atividadedashboard(unidade_id: string): Promise<AtividadeDashboard | null> {
    return new Promise<AtividadeDashboard | null>((resolve, reject) => {

        this.server.post('api/' + this.collection + '/atividade-dashboard',{unidade_id: unidade_id})
        .subscribe(response => {
          resolve(response.data as AtividadeDashboard);
        }, error => {
          //console.log("ERROR{atividadeDashboard}", error);
          resolve(null);
        });

        //console.log("ID em branco");
        //resolve(null);

    });
  }

  public homologar(atividade_id: string) {
    return new Promise<Atividade | undefined>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/homologar', {atividade_id}).subscribe(response => {
        resolve(response?.data ? this.getRow(response?.data) : undefined);
      }, error => reject(error));
    });
  }

}




