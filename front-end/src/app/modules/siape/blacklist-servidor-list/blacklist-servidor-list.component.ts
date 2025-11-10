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
    this.title = this.lex.translate('CPFs indisponíveis');
    this.code = "MOD_SIAPE_BLACKLIST";
    this.fields = [ "usuarios.matricula", "usuarios.nome", "siape_blacklist_servidores.*" ];
    this.leftJoin = [["usuarios", "siape_blacklist_servidores.cpf", "usuarios.cpf"]];
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
    return ['- O usuário cujo CPF está com STATUS 1 está INATIVO no sistema.',
    '- O usuário cujo CPF está com STATUS VAZIO não foi encontrado na consulta ao Siape. Se este CPF não for retirado da lista em até 30 dias, a partir da primeira consulta ao Siape na qual não foi encontrado, ele entrará no STATUS 1.',
    '- Ao retirar um CPF da lista, o usuário voltará a estar ATIVO no sistema, por isso, certifique-se de que realmente precisa realizar esta ação.',
    '- Ao retirar um CPF da lista, recomenda-se realizar a carga individual deste no Siape.'];
  }
}