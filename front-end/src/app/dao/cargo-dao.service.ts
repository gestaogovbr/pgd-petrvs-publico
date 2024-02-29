import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Cargo } from '../models/cargo.model';


@Injectable({
  providedIn: 'root'
})
export class CargoDaoService extends DaoBaseService<Cargo>{
 
  constructor(protected injector: Injector) { 
    super("Cargo", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }  
}

