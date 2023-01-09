import { Injectable, Injector } from '@angular/core';
import { TipoProcesso } from '../models/tipo-processo.model';
import { DaoBaseService } from './dao-base.service';

export type TipoProcessoSei = {codigo: string, nome: string};

@Injectable({
  providedIn: 'root'
})
export class TipoProcessoDaoService extends DaoBaseService<TipoProcesso> {

  constructor(protected injector: Injector) { 
    super("TipoProcesso", injector);
    this.searchFields = ["nome"];
  }  

  public atualizar(lista: TipoProcessoSei[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/atualizar', {
        lista: lista
      }).subscribe(response => {
        resolve(response?.success);
      }, error => reject(error));
    });
  }

}

