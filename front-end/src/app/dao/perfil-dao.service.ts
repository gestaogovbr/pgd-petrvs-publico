import { Injectable, Injector } from '@angular/core';
import { Perfil } from '../models/perfil.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilDaoService extends DaoBaseService<Perfil> {

  constructor(protected injector: Injector) { 
    super("Perfil", injector);
    this.searchFields = ["nome"];
  }
}
  