import { Base, IIndexable } from '../models/base.model';
import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Projeto } from '../models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoDaoService extends DaoBaseService<Projeto> {

  constructor(protected injector: Injector) { 
    super("Projeto", injector);
    this.searchFields = ["nome"];
  }

}

