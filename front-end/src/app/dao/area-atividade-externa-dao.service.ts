import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { AreaAtividadeExterna } from '../models/area-atividade-externa.model';

@Injectable({
  providedIn: 'root'
})
export class AreaAtividadeExternaDaoService extends DaoBaseService<AreaAtividadeExterna>{
 
  constructor(protected injector: Injector) { 
    super("AreaAtividadeExterna", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  
}

