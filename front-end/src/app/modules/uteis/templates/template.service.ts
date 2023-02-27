import { Injectable } from '@angular/core';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { AdesaoDaoService } from 'src/app/dao/adesao-dao.service';
import { Template, TemplateEspecie } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { FullRoute } from 'src/app/services/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(
    public adesaoDao: AdesaoDaoService,
    public auth: AuthService
  ) { }

  public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates'], params: {filter: {especie}}};
  }

  public details(data: any) {
    console.log(data);
  }

  public dataset(especie: TemplateEspecie): TemplateDataset[] {
    return ["TCR", "TCR_CANCELAMENTO"].includes(especie) ? this.adesaoDao.dataset() : []; 
  }

  public template(especie: TemplateEspecie): Template | undefined {
    return especie == "TCR" ? this.auth.unidade?.entidade?.template_adesao : undefined;
  }

}
