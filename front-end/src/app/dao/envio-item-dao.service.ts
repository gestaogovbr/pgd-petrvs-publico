import { Injectable, Injector } from '@angular/core';
import { EnvioItem } from '../models/envio-item.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioItemDaoService extends DaoBaseService<EnvioItem> {
  constructor(protected injector: Injector) {
    super("EnvioItem", injector);
  }
}
