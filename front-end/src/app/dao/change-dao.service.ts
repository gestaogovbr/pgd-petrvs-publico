import { Injectable, Injector } from '@angular/core';
import { Change } from '../models/change.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeDaoService extends DaoBaseService<Change> {

  constructor(protected injector: Injector) {
    super("Change", injector);
    this.searchFields = ["usuario", "data_hora", "tabela", "tipo"];
  }

  public showTables(): Promise<string[] | null> {
    return new Promise<string[] | null>((resolve, reject) => {
      this.server.post('api/Petrvs/showTables', []).subscribe(response => {
        resolve(response.data);
      }, error => {
        console.log("Erro ao buscar a lista das tabelas do banco de dados!", error);
        resolve(null);
      });
    });
  }
}
