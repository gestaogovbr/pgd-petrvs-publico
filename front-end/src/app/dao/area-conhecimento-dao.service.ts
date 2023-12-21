import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { AreaConhecimento } from '../models/area-conhecimento.model';

@Injectable({
  providedIn: 'root'
})
export class AreaConhecimentoDaoService extends DaoBaseService<AreaConhecimento>{
 
  constructor(protected injector: Injector) { 
    super("AreaConhecimento", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

