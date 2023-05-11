import { Component, Injector, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { Curso } from 'src/app/models/curso.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';


@Component({
  selector: 'curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})

export class CursoListComponent extends PageListBase<Curso, CursoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
 

  constructor(public injector: Injector) {
    super(injector, Curso, CursoDaoService);
       /* Inicializações */
    this.title = this.lex.noun("Cursos",true);
    this.code = "MOD_RX";
    this.join = ["area:nome"];

    this.filter = this.fh.FormBuilder({
      nome_area: {default: ""},
      nome_curso: {default: ""},
      titulo: {default: ""},
     });
    // Testa se o usuário possui permissão para exibir dados de cursos
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o curso
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }

   

  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.nome_curso.setValue("");
    filter.controls.titulo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome_curso?.length) {
      result.push(["nome_curso", "like", "%" + form.nome_curso + "%"]);
    }

    if(form.nome_area?.length) {
      result.push(["nome_area", "like", "%" + form.nome_area + "%"]);
    }
    
    if(form.titulo?.length) {
      result.push(["titulo", "like", "%" + form.titulo + "%"]);
    }

    return result;
  }

 
}


