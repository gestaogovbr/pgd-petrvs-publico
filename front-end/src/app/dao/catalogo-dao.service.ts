import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Catalogo } from '../models/catalogo.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogoDaoService extends DaoBaseService<Catalogo>{
 
  constructor(protected injector: Injector) { 
    super("Catalogo", injector);
    this.inputSearchConfig.searchFields = ["nome"]
  }  
}

