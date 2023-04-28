import { Base, IIndexable } from '../models/base.model';
import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { ProgramaParticipante } from '../models/programa-participante.model';
import { UsuarioDaoService } from './usuario-dao.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaParticipanteDaoService extends DaoBaseService<ProgramaParticipante> {

  public usuarioDao: UsuarioDaoService;

  constructor(protected injector: Injector) { 
    super("ProgramaParticipante", injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
  }  

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "habilitado", label: "Habilitado" },
      { field: "usuario", label: "Usuário", fields: this.usuarioDao.dataset(), type: "OBJECT" }
    ], deeps);
  }

}

