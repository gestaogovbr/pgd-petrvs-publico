import { Component, Injector, OnInit } from '@angular/core';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { Documento } from 'src/app/models/documento.model';
import { ListenerBase } from '../listener-base';

@Component({
  selector: 'app-editor-montar',
  templateUrl: './editor-montar.component.html',
  styleUrls: ['./editor-montar.component.scss']
})
export class EditorMontarComponent extends ListenerBase implements OnInit {

  public documentoDao: DocumentoDaoService;

  constructor(public injector: Injector) {
    super(injector, "editor-montar");
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public async documentoPendenteSei(id_documento: number) {
    const documento = await this.documentoDao.documentoPendenteSei(id_documento);
    if(documento) {
      const numero_documento = await this.execute<string>("setConteudoDocumento", [0, documento.conteudo]);
      if(numero_documento?.length) {
        await this.documentoDao.update(documento.id, {
          status: Documento.STATUS_GERADO,
          numero_documento: numero_documento
        });
      }
    }
  }

  public async loadToolbarButtons(buttons: string[]) {
    this.gb.toolbarButtons = [];
    /*if(buttons.includes("incluir")) {
      this.gb.toolbarButtons.push({
        icon: "bi bi-activity",
        color: "btn-outline-success",
        hint: "Incluir " + this.lex.noun("demanda"),
        onClick: this.incluirDemanda.bind(this) 
      });
    } */       
  }
}
