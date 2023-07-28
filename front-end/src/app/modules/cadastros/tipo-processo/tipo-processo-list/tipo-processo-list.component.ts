import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-tipo-processo-list',
  templateUrl: './tipo-processo-list.component.html',
  styleUrls: ['./tipo-processo-list.component.scss']
})
export class TipoProcessoListComponent extends PageListBase<TipoProcesso, TipoProcessoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;

  constructor(public injector: Injector) {
    super(injector, TipoProcesso, TipoProcessoDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = "Tipos de " + this.lex.translate("Processo");
    this.code="MOD_TIPO_PROC";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });
    if(this.gb.isEmbedded) {
      this.toolbarButtons.push({
        icon: "bi bi-arrow-repeat",
        color: "btn-outline-primary",
        label: "Atualizar",
        onClick: this.atualizarPeloSei.bind(this)
      });
    }
    // Testa se o usuário possui permissão para exibir dados do tipo de processo
    if (this.auth.hasPermissionTo("MOD_TIPO_PROC_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de processo
    if (this.auth.hasPermissionTo("MOD_TIPO_PROC_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public async atualizarPeloSei() {
    try {
      const lista = await this.allPages.getTiposProcessos();
    } catch (error) {
      this.dialog.alert("Erro ao consultar Sei", "Erro ao tentar obter a lista de Tipos de Processos do Sei!");
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

