import { Injectable, Injector } from '@angular/core';
import { TipoAvaliacao } from '../models/tipo-avaliacao.model';
import { DaoBaseService } from './dao-base.service';
import { Avaliacao } from '../models/avaliacao.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoDaoService extends DaoBaseService<Avaliacao> {

  constructor(protected injector: Injector) { 
    super("Avaliacao", injector);
    this.searchFields = [];
  }  

  public cancelarAvaliacao(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/cancelar-avaliacao', {id}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          resolve(true);
        }
      }, error => reject(error));
    });
  }

  public recorrer(avaliacao: Avaliacao, recurso: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/recorrer', {id: avaliacao.id, recurso}).subscribe(response => {
        if(response?.error) {
          reject(response?.error);
        } else {
          avaliacao.recurso = recurso;
          resolve(true);
        }
      }, error => reject(error));
    });
  }

}

