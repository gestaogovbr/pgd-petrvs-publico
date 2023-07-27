import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UnidadeIntegrante, UnidadeIntegranteConsolidado, UsuarioIntegranteConsolidado } from '../models/unidade-integrante.model';
import { Unidade } from '../models/unidade.model';
import { Usuario } from '../models/usuario.model';

export type LoadUsuariosIntegrantesResult = {
  integrantes: UnidadeIntegranteConsolidado[],
  unidade?: Unidade
}

export type LoadUnidadesIntegrantesResult = {
  integrantes: UsuarioIntegranteConsolidado[],
  usuario?: Usuario
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeIntegranteDaoService extends DaoBaseService<UnidadeIntegrante> {

  constructor(protected injector: Injector) { 
    super("UnidadeIntegrante", injector);
    this.searchFields = [];
  }  

  public loadUsuariosIntegrantes(unidade_id: String): Promise<LoadUsuariosIntegrantesResult> {
    return new Promise<LoadUsuariosIntegrantesResult>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/load-usuarios-integrantes', {unidade_id}).subscribe(response => {
        resolve({
          integrantes: response?.rows || [],
          unidade: response?.unidade
        });
      }, error => reject(error));
    });
  }

  public loadUnidadesIntegrantes(usuario_id: String): Promise<LoadUnidadesIntegrantesResult> {
    return new Promise<LoadUnidadesIntegrantesResult>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/load-unidades-integrantes', {usuario_id}).subscribe(response => {
        resolve({
          integrantes: response?.rows || [],
          usuario: response?.usuario
        });
      }, error => reject(error));
    });
  }

  public saveUsuarioIntegrante(unidade_id: String, integrante: UnidadeIntegranteConsolidado): Promise<UnidadeIntegranteConsolidado | null> {
    return new Promise<UnidadeIntegranteConsolidado | null>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/save-usuario-integrante', {unidade_id, integrante}).subscribe(response => {
        resolve(response?.data || null);
      }, error => reject(error));
    });
  }

  public saveUnidadeIntegrante(usuario_id: String, integrante: UsuarioIntegranteConsolidado): Promise<UsuarioIntegranteConsolidado | null> {
    return new Promise<UsuarioIntegranteConsolidado | null>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/save-unidade-integrante', {usuario_id, integrante}).subscribe(response => {
        resolve(response?.data || null);
      }, error => reject(error));
    });
  }

}

