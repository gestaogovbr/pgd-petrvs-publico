import { Injectable, Injector } from '@angular/core';
import { Capacidade } from '../models/capacidade.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class CapacidadeDaoService extends DaoBaseService<Capacidade> {

  constructor(protected injector: Injector) { 
    super("Capacidade", injector);
  }  
}

