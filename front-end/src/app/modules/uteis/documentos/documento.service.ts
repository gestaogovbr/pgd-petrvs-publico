import { Injectable } from '@angular/core';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { Documento, DocumentoLink } from 'src/app/models/documento.model';
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
    public documentoDao: DocumentoDaoService,
    public go: NavigateService
  ) { }

  /*public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates'], params: {filter: {especie}}};
  }*/

  public preview(data: any) {
    const documento = data as Documento;
    this.go.navigate({route: ['uteis', 'documentos' , 'preview', documento.id]}, {metadata: {documento}});
    //this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, documento.conteudo!, []);
  }

  public onLinkClick(link: DocumentoLink) {
    if(link?.tipo == "URL") {
      this.go.openNewTab(link?.url || "#");
    }
  }

  public onDocumentoClick(documento: Documento) {
    if(documento.tipo == "LINK" && documento.link) {
      this.onLinkClick(documento.link);
    } else if(documento.tipo == "HTML") {
      this.preview(documento);
    }
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
