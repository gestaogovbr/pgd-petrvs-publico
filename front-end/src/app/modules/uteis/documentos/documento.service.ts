import { Injectable } from '@angular/core';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { Documento } from 'src/app/models/documento.model';
import { Template, TemplateEspecie } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FullRoute } from 'src/app/services/navigate.service';
import { TemplateService } from '../templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  
  constructor(
    public dialog: DialogService,
    public templateService: TemplateService
) { }

  /*public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates'], params: {filter: {especie}}};
  }*/

  public preview(data: any) {
    const documento = data as Documento;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 800 }, documento.conteudo!, []);
  }

}
