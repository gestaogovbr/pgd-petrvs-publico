import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Reacao } from '../models/reacao';


@Injectable({
  providedIn: 'root'
})
export class ReacaoDaoService extends DaoBaseService<Reacao>{
 
  constructor(protected injector: Injector) { 
    super("Reacao", injector);
  }  
}

