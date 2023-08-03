import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-modalidade-list',
  templateUrl: './tipo-modalidade-list.component.html',
  styleUrls: ['./tipo-modalidade-list.component.scss']
})
export class TipoModalidadeListComponent extends PageListBase<TipoModalidade, TipoModalidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoModalidade, TipoModalidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Modalidade");
    this.code="MOD_TIPO_MDL";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      atividades_homologadas: {default: ""},
      dispensa_avaliacao: {default: ""},
      exige_assinatura: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de modalidade
    if (this.auth.hasPermissionTo("MOD_TIPO_MDL_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de modalidade
    if (this.auth.hasPermissionTo("MOD_TIPO_MDL_EXCL")) {
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
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    return result;
  }
}

