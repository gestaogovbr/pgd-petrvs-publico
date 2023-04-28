import { Injectable } from '@angular/core';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Documento } from 'src/app/models/documento.model';
import { DialogService } from 'src/app/services/dialog.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { TemplateService } from '../templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  
  constructor(
    public dialog: DialogService,
    public templateService: TemplateService,
    public allPages: ListenerAllPagesService,
    public documentoDao: DocumentoDaoService,
    public go: NavigateService
  ) { }

  /*public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates'], params: {filter: {especie}}};
  }*/

  public preview(data: any) {
    const documento = data as Documento;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, documento.conteudo!, []);
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

  public processoHint(row: any): string {
    return this.allPages.getButtonTitle(row.documento?.numero_processo, row.documento?.numero_documento);
  }

  public sign(documentos: Documento[]): Promise<Documento[] | undefined> {
    return new Promise<Documento[] | undefined>((resolve, reject) => {
      this.go.navigate({route: ["uteis", "documentos", "assinar"]}, {
        metadata: { documentos },
        modalClose: resolve
      });
    });
  }

}
