import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Template } from "../models/template.model";
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { Entidade } from '../models/entidade.model';
import { QueryOptions } from './query-options';

@Injectable({
  providedIn: 'root'
})
export class TemplateDaoService extends DaoBaseService<Template> {

  constructor(protected injector: Injector) {
    super("Template", injector);
    this.inputSearchConfig.searchFields = ["titulo"];
  }

  getDataset(especie: string, codigo: string){
    return new Promise<TemplateDataset[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/carrega-dataset', {
        codigo: codigo,
        especie: especie
      }).subscribe(response => {
        resolve(response?.dataset);
      }, error => reject(error));
    });
  }

  getReport(entidadeId: string, codigo: string, options: any){
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/gera-relatorio', {
        entidade: entidadeId,
        codigo: codigo,
        params: options || []
      }).subscribe(response => {
        resolve(response?.report);
      }, error => reject(error));
    });
  }

}

