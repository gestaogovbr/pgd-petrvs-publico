import { Injectable, Injector } from '@angular/core';
import { Change } from '../models/change.model';
import { LookupItem } from '../services/lookup.service';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeDaoService extends DaoBaseService<Change> {

  constructor(protected injector: Injector) {
    super("Change", injector);
    this.inputSearchConfig.searchFields = ["type", "date_time", "user_id", "row_id", "table_name"];
  }

  public showTables(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Petrvs/showTables', []).subscribe(response => {
        resolve(response.tabelas);
      }, error => {
        console.log("Erro ao buscar a lista das tabelas do banco de dados!", error);
        resolve([]);
      });
    });
  }


  public showResponsaveis(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Change/showResponsaveis', []).subscribe(response => {
        resolve(response.responsaveis);
      }, error => {
        console.log("Erro ao buscar a lista dos responsáveis pelas alterações no Banco de Dados-!", error);
        resolve([]);
      });
    });
  }

  public listModels(): Promise<LookupItem[]> {
    return new Promise<LookupItem[]>((resolve, reject) => {
      this.server.post('api/Change/list-models', []).subscribe(response => {
        resolve(response.models);
      }, error => {
        console.log("Erro ao buscar a lista de Modelos!", error);
        resolve([]);
      });
    });
  }
}
