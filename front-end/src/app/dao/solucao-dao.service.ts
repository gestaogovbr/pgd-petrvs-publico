import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Solucao } from '../models/solucao.model';


@Injectable({
  providedIn: 'root'
})
export class SolucaoDaoService extends DaoBaseService<Solucao>{
 
  constructor(protected injector: Injector) { 
    super("Solucao", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }

  public ativarTodas(unidade_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/ativar-todos', { unidade_id }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public desativarTodas(unidade_id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/desativar-todos', { unidade_id }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
}

