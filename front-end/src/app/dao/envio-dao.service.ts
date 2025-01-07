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
}
