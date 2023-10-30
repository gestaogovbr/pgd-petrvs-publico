import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoDaoService extends DaoBaseService<Curso>{
 
  constructor(protected injector: Injector) { 
    super("Curso", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }  

  public idInstitucional(): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.server.post('api/Curso/id-institucional',{}).subscribe(response => {
        resolve(response);
        console.log(response);
      }, error => reject(error));
    });
  }
}

