import { Injectable, Injector } from '@angular/core';
import { Envio } from '../models/envio.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioDaoService extends DaoBaseService<Envio> {
  constructor(protected injector: Injector) {
    super("Envio", injector);
  }

  public reiniciar() {
    return this.server.post('api/Envio/reiniciar');
  }

  public forcar(entidade_id: string) {
    return this.server.post('api/Envio/forcar', { id: entidade_id });
  }
}
