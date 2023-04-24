import { Injectable, Injector } from '@angular/core';
import { Feriado } from '../models/feriado.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class FeriadoDaoService extends DaoBaseService<Feriado> {

  constructor(protected injector: Injector) { 
    super("Feriado", injector);
    this.searchFields = ["nome"];
  }  
}
