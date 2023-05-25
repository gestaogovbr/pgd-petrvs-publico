import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { CentroTreinamento } from '../models/centro-treinamento.model';

@Injectable({
  providedIn: 'root'
})
export class CentroTreinamentoDaoService extends DaoBaseService<CentroTreinamento>{
 
  constructor(protected injector: Injector) { 
    super("CentroTreinamento", injector);
    this.searchFields = ["nome","ativo"];
  }  
}

