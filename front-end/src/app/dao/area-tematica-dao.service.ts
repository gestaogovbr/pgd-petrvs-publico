import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { AreaTematica } from '../models/area-tematica.model';

@Injectable({
  providedIn: 'root'
})
export class AreaTematicaDaoService extends DaoBaseService<AreaTematica>{
 
  constructor(protected injector: Injector) { 
    super("AreaTematica", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

