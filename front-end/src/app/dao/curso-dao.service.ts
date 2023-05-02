import { Injectable,Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoDaoService extends DaoBaseService<Curso>{
  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome_curso", label: "Nome do Curso" },
      { field: "titulo", label: "Titulação" },
      { field: "ativo", label: "Ativo" },
      { field: "area_curso_id", label: "Área Vinculada" }
    ], deeps);
  }

  constructor(protected injector: Injector) { 
    super("Curso", injector);
    this.searchFields = ["nome_curso", "titulo"];
  }  
}

