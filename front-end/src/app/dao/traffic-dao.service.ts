import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Traffic } from '../models/traffic.model';

@Injectable({
  providedIn: 'root'
})
export class TrafficDaoService extends DaoBaseService<Traffic> {

  constructor(protected injector: Injector) {
    super("Traffic", injector);
  }


}
