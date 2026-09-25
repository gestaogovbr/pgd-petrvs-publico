import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SiapeBlacklistServidor } from 'src/app/models/siape-blacklist-servidor.model';
import { SiapeBlacklistServidorDaoService } from 'src/app/dao/siape-blacklist-servidor-dao.service';
import {
  calcularPrazoInativacaoServidor,
  PrazoInativacaoServidor,
  recarregarGridBlacklistServidor
} from './blacklist-servidor-prazo';

@Component({
    selector: 'app-blacklist-servidor-list',
    templateUrl: './blacklist-servidor-list.component.html',
    styleUrls: ['./blacklist-servidor-list.component.scss'],
    standalone: false
})
export class BlacklistServidorListComponent extends PageListBase<SiapeBlacklistServidor, SiapeBlacklistServidorDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, SiapeBlacklistServidor, SiapeBlacklistServidorDaoService);
    /* Inicializações */
    this.title = this.lex.translate('CPFs indisponíveis');
    this.code = "MOD_SIAPE_BLACKLIST";
    this.fields = ["usuarios.nome", "siape_blacklist_servidores.*"];
    this.leftJoin = [];
    this.filter = this.fh.FormBuilder({
      cpf: { default: '' },
      inativado: { default: null }
    });
    this.addOption(this.OPTION_EXCLUIR, "MOD_SIAPE_BLACKLIST_EXCL");
    this.options.push({
      icon: "bi bi-trash",
      label: "Remover",
      hint: "Remover da lista",
      color: "btn-outline-danger",
      onClick: (row: any) => this.removerCpf(row.cpf)
    });
    this.toolbarButtons.push({
      icon: 'bi bi-arrow-clockwise',
      label: 'Recarregar lista',
      hint: 'Consultar novamente a situação após a execução da rotina diária',
      color: 'btn-outline-primary',
      onClick: () => this.recarregarLista()
    });
  }

  public prazoInativacao(row: SiapeBlacklistServidor): PrazoInativacaoServidor {
    return calcularPrazoInativacaoServidor(row.created_at, row.inativado);
  }

  public recarregarLista(): void {
    recarregarGridBlacklistServidor(this.grid);
  }

  public async removerCpf(cpf: string): Promise<void> {
    try {
      const confirm = await this.dialog.confirm("Remover da lista", "Ao retirar este CPF da lista, o usuário voltará a estar ATIVO no sistema. Deseja continuar?")
      if (!confirm) return;
      const sucesso = await this.dao?.removerCpf(cpf);
      if (sucesso) {
        this.dialog?.alert("Sucesso", "CPF removido da lista de CPF's com sucesso!");
        if (this.grid?.query) {
          this.grid.query.refresh();
        }
      } else {
        this.dialog?.alert("Erro", "Falha ao remover CPF da lista.");
      }
    } catch (error) {
      this.dialog?.alert("Erro", "Erro ao remover CPF da lista.");
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

  protected statusTitleHint = () : string => {
    return "O respectivo CPF não retornado pelo SIAPE deve passar por um processamento diário no PGD Petrvs e ser marcado como inativo";
  }

  protected topAlertMessages = () : string[] => {
    return ['- O usuário com situação INATIVADO já passou pelo processamento diário.',
    '- O prazo mostra quantos dias restam desde a primeira ausência confirmada no SIAPE até a inativação automática.',
    '- Se o prazo estiver vencido, recarregue a lista. Se permanecer assim após a rotina diária, verifique o scheduler e a fila SIAPE.',
    '- Ao retirar um CPF da lista, o usuário voltará a estar ATIVO no sistema, por isso, certifique-se de que realmente precisa realizar esta ação.',
    '- Ao retirar um CPF da lista, recomenda-se realizar a carga individual deste no Siape.'];
  }
}
