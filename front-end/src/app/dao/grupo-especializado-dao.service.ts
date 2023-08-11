import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { GrupoEspecializado } from '../models/grupo-especializado.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoEspecializadoDaoService extends DaoBaseService<GrupoEspecializado>{
 
  constructor(protected injector: Injector) { 
    super("GrupoEspecializado", injector);
    this.searchFields = ["nome"]//, "ativo"];
  }  
}

