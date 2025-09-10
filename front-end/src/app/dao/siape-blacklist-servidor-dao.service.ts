import { Injectable, Injector } from '@angular/core';
import { SiapeBlacklistServidor } from '../models/siape-blacklist-servidor.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class SiapeBlacklistServidorDaoService extends DaoBaseService<SiapeBlacklistServidor> {

  constructor(protected injector: Injector) {
    super("SiapeBlacklistServidor", injector);
    this.inputSearchConfig.searchFields = ["cpf"];
  }

  public removerCpf(cpf: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/siape-blacklist/remover-cpf', { cpf }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

}