import { Component, Injector, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { Curso } from 'src/app/models/curso.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { Cargo } from 'src/app/models/cargo.model';
import { CargoDaoService } from 'src/app/dao/cargo-dao.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent extends PageListBase<Cargo, CargoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
 

  constructor(public injector: Injector) {
    super(injector, Cargo, CargoDaoService);
       /* Inicializações */
    this.title = this.lex.translate("Cargos");
    this.code = "MOD_RX";
    this.orderBy = [['nome','asc']];
    //this.join = ["area:nome","tipo:nome"];
  
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      descricao: {default: ""},
      nivel: {default: ""},
      siape:{default: ""},
      cbo: {default: ""},
      efetivo: {default: 1},
      ativo: {default: 1},
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
    filter.controls.descrição.setValue("");
    filter.controls.nivel.setValue("");
    filter.controls.siape.setValue("");
    filter.controls.cbo.setValue("");

    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    let valEfetivo = form.efetivo.value ? 1 : 0;
    let valAtivo = form.ativo.value ? 1 : 0;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if(form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
    }
    
    if(form.nivel?.length) {
      result.push(["nivel", "like", "%" + form.nivel.trim().replace(" ", "%") + "%"]);
    }
    if(form.siape?.length) {
      result.push(["siape", "like", "%" + form.siape.trim().replace(" ", "%") + "%"]);
    }
    if(form.cbo?.length) {
      result.push(["cbo", "like", "%" + form.cbo.trim().replace(" ", "%") + "%"]);
    }
    
    if(form.ativo) {
      result.push(["ativo", "==", 1 ]);
      //result.push(["ativo", "like", "%" + form.titulo + "%"]);
    }

    result.push(["efetivo", "==", form.efetivo ? 1 : 0]);

    return result;
  }

 
}


