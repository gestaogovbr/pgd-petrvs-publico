import { Injectable, Injector } from '@angular/core';
import { Documento } from '../models/documento.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoDaoService extends DaoBaseService<Documento> {

  constructor(protected injector: Injector) { 
    super("Documento", injector);
  }

  public documentoPendenteSei(id_documento: number): Promise<Documento | undefined>  {
    return new Promise<Documento | undefined>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/pendente-sei', {id_documento}).subscribe(response => {
        resolve(response?.data ? this.getRow(response?.data) : undefined);
      }, error => reject(error));
    });
  }

  public assinar(documento_id: string) {
    return new Promise<Documento | undefined>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/assinar', {documento_id}).subscribe(response => {
        resolve(response?.data ? this.getRow(response?.data) : undefined);
      }, error => reject(error));
    });
  }

}

