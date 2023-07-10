import { Injectable, Injector } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class AtividadeDaoService extends DaoBaseService<Atividade> {

  constructor(protected injector: Injector) {
    super("Atividade", injector);
    this.searchFields = ["nome"];
  }

  /* REFECTORING
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

  public homologar(atividadesIds: string[], dataHomologacao: Date) {
    return this.server.post('api/' + this.collection + '/homologar', this.prepareToSave({
      atividades_ids: atividadesIds,
      data_homologacao: dataHomologacao
    })).toPromise();
  } */
}