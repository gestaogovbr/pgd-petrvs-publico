import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-avaliacao-list',
  templateUrl: './tipo-avaliacao-list.component.html',
  styleUrls: ['./tipo-avaliacao-list.component.scss']
})
export class TipoAvaliacaoListComponent extends PageListBase<TipoAvaliacao, TipoAvaliacaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Avaliação");
    this.code="MOD_TIPO_AVAL";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      nota_atribuida: {default: ""},
      aceita_entrega: {default: ""},
      pergunta: {default: ""},
      icone: {default: ""},
      cor: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de avaliação
    if (this.auth.hasPermissionTo("MOD_TIPO_AVAL_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de avaliação
    if (this.auth.hasPermissionTo("MOD_TIPO_AVAL_EXCL")) {
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


