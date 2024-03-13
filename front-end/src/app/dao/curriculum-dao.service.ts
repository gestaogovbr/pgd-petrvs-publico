import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { LookupCurriculum } from '../services/lookup.service';
import { Curriculum } from '../models/curriculum.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculumDaoService extends DaoBaseService<Curriculum>{

  constructor(protected injector: Injector) {
    super("Curriculum", injector);
    this.inputSearchConfig.searchFields = ["apresentacao", "telefone", "idiomas", "estado_civil", "quantidade_filhos"];
  }

  public lookupsCurriculum(): Promise<LookupCurriculum> {
    return new Promise<LookupCurriculum>((resolve, reject) => {
      this.server.post('api/Curriculum/lookups-curriculum', {}).subscribe(response => {
        resolve(response?.lookups || []);
        console.log(response.lookups);
      }, error => reject(error));
    });
  }
}

