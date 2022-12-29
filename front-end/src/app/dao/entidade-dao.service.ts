import { Injectable, Injector } from '@angular/core';
import { Entidade } from '../models/entidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EntidadeDaoService extends DaoBaseService<Entidade> {

  constructor(protected injector: Injector) { 
    super("Entidade", injector);
    this.searchFields = ["sigla", "nome"];
  }  

  public generateApiKey(entidade_id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/generate-api-key', { entidade_id }).subscribe(response => {
        resolve(response?.api_public_key);
      }, error => reject(error));
    });
  }

}
