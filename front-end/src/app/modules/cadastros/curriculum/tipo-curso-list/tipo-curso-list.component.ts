import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';
import { TipoCurso } from 'src/app/models/tipo-curso.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'tipo-curso-list',
  templateUrl: './tipo-curso-list.component.html',
  styleUrls: ['./tipo-curso-list.component.scss']
})
export class TipoCursoListComponent extends PageListBase<TipoCurso, TipoCursoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
 

  constructor(public injector: Injector) {
    super(injector, TipoCurso, TipoCursoDaoService);
       /* Inicializações */
    this.title = this.lex.translate("Tipos de Curso");
    this.code = "MOD_RX";
    //this.join = ["area:nome","tipo:nome"];
  
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      
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
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

   
    return result;
  }

 
}



