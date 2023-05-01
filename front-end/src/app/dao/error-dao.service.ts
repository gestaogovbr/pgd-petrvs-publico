import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Error } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorDaoService extends DaoBaseService<Error> {

  constructor(protected injector: Injector) {
    super("Error", injector);
  }


}
