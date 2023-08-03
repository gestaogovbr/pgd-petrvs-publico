import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-atividade-list',
  templateUrl: './tipo-atividade-list.component.html',
  styleUrls: ['./tipo-atividade-list.component.scss']
})
export class TipoAtividadeListComponent extends PageListBase<TipoAtividade, TipoAtividadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoAtividade, TipoAtividadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Atividade");
    this.code = "MOD_TIPO_ATV";
    this.filter = this.fh.FormBuilder({
      nome: { default: "" }
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de atividade
    if (this.auth.hasPermissionTo("MOD_TIPO_ATV_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de atividade
    if (this.auth.hasPermissionTo("MOD_ATV_EXCL")) {
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
    let form: any = filter.value;
    let result: any[] = [];
    if (form.nome?.length) result.push(["nome", "like", "%" + form.nome.replace(" ", "%") + "%"]);
    return result;
  }

  public getReportEtiquetas(row: TipoAtividade): string {
    let result = "";
    row.etiquetas.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

  public getReportChecklist(row: TipoAtividade): string {
    let result = "";
    row.checklist.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

}

