import { Injectable, Injector } from '@angular/core';
import { SiapeBlacklistUnidade } from '../models/siape-blacklist-unidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class SiapeBlacklistUnidadeDaoService extends DaoBaseService<SiapeBlacklistUnidade> {

  constructor(protected injector: Injector) {
    super('SiapeBlacklistUnidade', injector);
    this.inputSearchConfig.searchFields = ['codigo'];
  }

  public removerUnidade(codigo: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/unidade/remover-blacklist', { codigo }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public queryBlacklist(options: any = {}): any {
    return this.server.post('api/SiapeBlacklistUnidade/query', options);
  }
}