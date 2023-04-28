import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UnidadeIntegrante, UnidadeIntegranteConsolidado } from '../models/unidade-integrante.model';
import { Unidade } from '../models/unidade.model';

export type LoadIntegrantesResult = {
  integrantes: UnidadeIntegranteConsolidado[],
  unidade?: Unidade
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeIntegranteDaoService extends DaoBaseService<UnidadeIntegrante> {

  constructor(protected injector: Injector) { 
    super("UnidadeIntegrante", injector);
    this.searchFields = [];
  }  

  public loadIntegrantes(unidade_id: String): Promise<LoadIntegrantesResult> {
    return new Promise<LoadIntegrantesResult>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/load-integrantes', {unidade_id}).subscribe(response => {
        resolve({
          integrantes: response?.rows || [],
          unidade: response?.unidade
        });
      }, error => reject(error));
    });
  }

  public saveIntegrante(unidade_id: String, integrante: UnidadeIntegranteConsolidado): Promise<UnidadeIntegranteConsolidado | null> {
    return new Promise<UnidadeIntegranteConsolidado | null>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/save-integrante', {unidade_id, integrante}).subscribe(response => {
        resolve(response?.data || null);
      }, error => reject(error));
    });
  }

}

