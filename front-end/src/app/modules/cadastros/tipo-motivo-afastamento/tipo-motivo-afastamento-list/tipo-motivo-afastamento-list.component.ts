import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoMotivoAfastamento } from 'src/app/models/tipo-motivo-afastamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-motivo-afastamento-list',
  templateUrl: './tipo-motivo-afastamento-list.component.html',
  styleUrls: ['./tipo-motivo-afastamento-list.component.scss']
})
export class TipoMotivoAfastamentoListComponent extends PageListBase<TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Motivos de Afastamento");
    this.code="MOD_TIPO_MTV_AFT";
    this.filter = this.fh.FormBuilder({
      codigo: {default: null},
      nome: {default: ""},
      icone: {default: ""},
      cor: {default: ""},
      horas: {default: ""},
      integracao: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de motivo de afastamento
    if (this.auth.hasPermissionTo("MOD_TIPO_MTV_AFT_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de motivo de afastamento
    if (this.auth.hasPermissionTo("MOD_TIPO_MTV_AFT_EXCL")) {
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

