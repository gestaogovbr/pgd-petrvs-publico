import { Component, Injector, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { Materia } from 'src/app/models/materia.model';
import { MateriaDaoService } from 'src/app/dao/materia-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';

@Component({
  selector: 'materia-list',
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.scss']
})


export class MateriaListComponent extends PageListBase<Materia, MateriaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public area?: AreaConhecimentoDaoService;
  
  constructor(public injector: Injector) {
    super(injector, Materia, MateriaDaoService);
    this.area = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
   
       /* Inicializações */
    this.title = this.lex.translate("Matérias");
    this.code = "MOD_RX";
    this.join = ["curso:id,nome"];
    this.join = ["curso.area:id,nome"];
  
    this.filter = this.fh.FormBuilder({
      area_id:{default: ""},
      nome: {default: ""},
      horas_aula: {default:0},
      ativo: {default: true},
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
    filter.controls.horas_aula.setValue("");
  
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    if(form.horas_aula?.length) {
      result.push(["horas_aula", "like", "%" + form.horas_aula + "%"]);
    }

    return result;
  }

 
}



