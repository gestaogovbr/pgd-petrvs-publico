import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Notificacao } from '../models/notificacao.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoDaoService extends DaoBaseService<Notificacao>{
  constructor(protected injector: Injector) {
    super("Notificacao", injector);
  }

  public naoLidas(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/nao-lidas', {}).subscribe(response => {
        resolve(response?.nao_lidas || 0);
      }, error => reject(error));
    });
  }

}
