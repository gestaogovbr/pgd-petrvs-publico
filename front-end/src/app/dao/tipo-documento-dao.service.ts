import { Injectable, Injector } from '@angular/core';
import { TipoDocumentoSei } from '../listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { TipoDocumento } from '../models/tipo-documento.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoDaoService extends DaoBaseService<TipoDocumento> {

  constructor(protected injector: Injector) { 
    super("TipoDocumento", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  

  public atualizar(lista: TipoDocumentoSei[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/atualizar', {
        lista: lista
      }).subscribe(response => {
        resolve(response?.success);
      }, error => reject(error));
    });
  }

}

