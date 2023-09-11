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
    this.title = this.lex.translate("Tipos de Processo");
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
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_PROC_EXCL");
  }

  public async atualizarPeloSei() {
    try {
      const lista = await this.allPages.getTiposProcessos();
    } catch (error) {
      this.dialog.alert("Erro ao consultar Sei", "Erro ao tentar obter a lista de Tipos de Processos do Sei!");
    }
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

