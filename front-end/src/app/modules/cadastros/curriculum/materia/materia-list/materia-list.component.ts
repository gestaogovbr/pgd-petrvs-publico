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
    this.title = this.lex.translate("Disciplinas");
    this.code = "MOD_RX";
    this.join = ["curso","curso.area_conhecimento"];
    this.orderBy = [['nome','asc']];
  
    this.filter = this.fh.FormBuilder({
      area_id:{default: ""},
      nome: {default: ""},
      horas_aula: {default:0},
      ativo: {default: true},
     });
    this.addOption(this.OPTION_EXCLUIR, "MOD_RX_OUT_EXCL");
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
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if(form.horas_aula?.length) {
      result.push(["horas_aula", "like", "%" + form.horas_aula.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }

 
}



