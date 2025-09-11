import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SiapeBlacklistServidor } from 'src/app/models/siape-blacklist-servidor.model';
import { SiapeBlacklistServidorDaoService } from 'src/app/dao/siape-blacklist-servidor-dao.service';

@Component({
  selector: 'app-blacklist-servidor-list',
  templateUrl: './blacklist-servidor-list.component.html',
  styleUrls: ['./blacklist-servidor-list.component.scss']
})
export class BlacklistServidorListComponent extends PageListBase<SiapeBlacklistServidor, SiapeBlacklistServidorDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, SiapeBlacklistServidor, SiapeBlacklistServidorDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Blacklist Servidor');
    this.code = "MOD_SIAPE_BLACKLIST";
    this.filter = this.fh.FormBuilder({
      cpf: { default: '' },
      inativado: { default: null }
    });
    this.addOption(this.OPTION_EXCLUIR, "MOD_SIAPE_BLACKLIST_EXCL");
    this.options.push({
      icon: "bi bi-trash",
      label: "Remover",
      hint: "Remover da blacklist",
      color: "btn-outline-danger",
      onClick: (row: any) => this.removerCpf(row.cpf)
    });
  }

  public async removerCpf(cpf: string): Promise<void> {
    try {
      const sucesso = await this.dao?.removerCpf(cpf);
      if (sucesso) {
        this.dialog?.alert("Sucesso", "CPF removido da blacklist com sucesso!");
        if (this.grid?.query) {
          this.grid.query.refresh();
        }
      } else {
        this.dialog?.alert("Erro", "Falha ao remover CPF da blacklist.");
      }
    } catch (error) {
      this.dialog?.alert("Erro", "Erro ao remover CPF da blacklist.");
    }
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.cpf?.length) {
      result.push(["cpf", "like", "%" + form.cpf.trim().replace(" ", "%") + "%"]);
    }

    if (form.inativado !== null) {
      result.push(["inativado", "==", form.inativado]);
    }

    return result;
  }
}