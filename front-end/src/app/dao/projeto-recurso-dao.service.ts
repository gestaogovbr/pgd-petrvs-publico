import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { ProjetoRecurso } from '../models/projeto-recurso.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoRecursoDaoService extends DaoBaseService<ProjetoRecurso>{

  constructor(protected injector: Injector) {
    super("ProjetoRecurso", injector);
    this.searchFields = ["nome"];
  }
}
