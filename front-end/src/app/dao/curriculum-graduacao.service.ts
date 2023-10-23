import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { CurriculumGraduacao } from '../models/currriculum-graduacao.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumGraduacaoDaoService extends DaoBaseService<CurriculumGraduacao>{
 
  constructor(protected injector: Injector) { 
    super("CurriculumGraduacao", injector);
    this.inputSearchConfig.searchFields = ["pretensão"];
  }  
}

