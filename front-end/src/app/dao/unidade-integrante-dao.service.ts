import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UnidadeIntegrante, IntegranteConsolidado } from '../models/unidade-integrante.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';

export type LoadIntegrantesResult = {
  integrantes: IntegranteConsolidado[],
  unidade?: Unidade,
  usuario?: Usuario
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeIntegranteDaoService extends DaoBaseService<UnidadeIntegrante> {

  constructor(protected injector: Injector) { 
    super("UnidadeIntegrante", injector);
    this.inputSearchConfig.searchFields = [];
  }  

  /**
   * 
   * @param unidade_id 
   * @param usuario_id 
   * @returns 
   */
  public carregarIntegrantes(unidade_id: string, usuario_id: string): Promise<LoadIntegrantesResult> {
    return new Promise<LoadIntegrantesResult>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/carregar-integrantes', {unidade_id, usuario_id}).subscribe(response => {
        resolve({
          integrantes: response?.rows || [],
          //unidade: response?.unidade,
          //usuario: response?.usuario
        });
      }, error => reject(error));
    });
  }

  /**
   * 
   * @param integrantesConsolidados 
   * @returns 
   */
  public salvarIntegrantes(integrantesConsolidados: IntegranteConsolidado[], metadata?: any): Promise<IntegranteConsolidado[]> {
    return new Promise<IntegranteConsolidado[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/salvar-integrantes', {integrantesConsolidados, metadata}).subscribe(response => {
        if(response?.error) reject(response.error); else resolve(response?.data || null);
      }, 
      error => reject(error));
    });
  }

}

