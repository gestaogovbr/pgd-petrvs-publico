import { Injectable, Injector } from '@angular/core';
import { MaterialServico } from '../models/material-servico.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialServicoDaoService extends DaoBaseService<MaterialServico> {

  constructor(protected injector: Injector) { 
    super("MaterialServico", injector);
    this.inputSearchConfig.searchFields = ["codigo", "referencia", "descricao"];
  } 

}
