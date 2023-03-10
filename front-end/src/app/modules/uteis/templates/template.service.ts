import { Injectable } from '@angular/core';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { Template, TemplateEspecie } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FullRoute } from 'src/app/services/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(
    public planoDao: PlanoDaoService,
    public auth: AuthService,
    public dialog: DialogService
  ) { }

  public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates'], params: {filter: {especie}}};
  }

  public details(data: any) {
    const template = data as Template;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 600 }, template.conteudo!, []);
  }

  public dataset(especie: TemplateEspecie): TemplateDataset[] {
    return ["TCR", "TERMO_ADESAO"].includes(especie) ? this.planoDao.dataset() : []; 
  }

  public template(especie: TemplateEspecie, extra?: any): Template | undefined {
    return undefined; //especie == "TCR" ? this.auth.entidade?.template_adesao : undefined;
    /* Continuar aqui */
  }

  public prepareDatasetToSave(dataset: TemplateDataset[]): TemplateDataset[] {
    for(let item of dataset) {
      item.dao = undefined;
      if(["OBJECT", "ARRAY"].includes(item.type || "")) this.prepareDatasetToSave(item.fields || []);
    }
    return dataset;
  }  

}
