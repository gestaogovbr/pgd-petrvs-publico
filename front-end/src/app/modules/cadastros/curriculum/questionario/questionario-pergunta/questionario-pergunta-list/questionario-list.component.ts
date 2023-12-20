import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { Base } from 'src/app/models/base.model';
import { Questionario } from 'src/app/models/questionario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'questionario-list',
  templateUrl: './questionario-list.component.html',
  styleUrls: ['./questionario-list.component.scss']
})
export class QuestionarioListComponent extends PageListBase<Questionario, QuestionarioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public tipoQuestionario: LookupItem[] = [{ 'key': 'Interno', 'value': 'Interno' },{ 'key': 'Personalizado', 'value': 'Personalizado' }];
  public exibes : any[] = [];
  
  constructor(public injector: Injector) {
    super(injector, Questionario, QuestionarioDaoService);
    this.join = ["perguntas"];//perguntas.sequencia
    this.orderBy = [['nome','asc']];
    /* Inicializações */
  
    this.title = this.lex.translate("Questionários");
    this.code = "MOD_RX";
    //this.orderBy = [['sequencia','asc']];

    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      codigo: {default: ""},
      tipo: {default: ""}
     });
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
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
    filter.controls.codigo.setValue("");
    filter.controls.tipo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if(form.codigo?.length) {
      result.push(["codigo", "like", "%" + form.codigo.trim().replace(" ", "%") + "%"]);
    }

    if(form.tipo?.length) {
      result.push(["tipo", "like", "%" + form.tipo.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
 
  public onGridLoad(rows?: any[]) {
    //console.log('ITEMS',rows)
    rows?.forEach((questionario: Questionario) => {
      questionario.perguntas = questionario.perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
    });
  }
   
}

