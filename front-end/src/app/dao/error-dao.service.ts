import { Injectable, Injector } from '@angular/core';
import { Error } from '../models/error.model';
import { DaoBaseService } from './dao-base.service';
import { LookupItem } from '../services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorDaoService extends DaoBaseService<Error> {

  constructor(protected injector: Injector) {
    super("Error", injector);
  }

  public showResponsaveis(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Error/showResponsaveis', []).subscribe(response => {
        resolve(response.responsaveis);
      }, error => {
        console.log("Erro ao buscar a lista dos responsáveis pelos registros de erros no Banco de Dados!", error);
        resolve([]);
      });
    });
  }

}
