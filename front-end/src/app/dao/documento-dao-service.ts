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
        response.error ? reject(response.error) : resolve(response?.data ? this.getRow(response?.data) : undefined);
      }, error => reject(error));
    });
  }

  public assinar(documentosIds: string[]) {
    return new Promise<Documento[] | undefined>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/assinar', {documentos_ids: documentosIds}).subscribe(response => {
        if(response.error) reject(response.error);
        resolve(response?.rows ? this.getRows(response) : undefined);
      }, error => reject(error));
    });
  }

  public gerarPDF(documento_id: string): Promise<any>  {
    return new Promise<any>((resolve, reject) => {
        this.server.getPDF('api/' + this.collection + '/gerarPDF', {documento_id}).subscribe(
            response => {
                if (response.error) {
                    reject(response.error);
                } else {
                  resolve(this.toPDF(response));
                }
            },
            error => reject(error)
        );
    });
}

}

