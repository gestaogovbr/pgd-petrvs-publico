import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SiapeBlacklistUnidade } from 'src/app/models/siape-blacklist-unidade.model';
import { SiapeBlacklistUnidadeDaoService } from 'src/app/dao/siape-blacklist-unidade-dao.service';

@Component({
  selector: 'app-blacklist-unidade-list',
  templateUrl: './blacklist-unidade-list.component.html',
  styleUrls: ['./blacklist-unidade-list.component.scss']
})
export class BlacklistUnidadeListComponent extends PageListBase<SiapeBlacklistUnidade, SiapeBlacklistUnidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, SiapeBlacklistUnidade, SiapeBlacklistUnidadeDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Unidades indisponíveis');
    this.code = 'MOD_SIAPE_BLACKLIST_UNIDADE';
    this.filter = this.fh.FormBuilder({
      codigo: { default: '' },
      inativado: { default: null }
    });
    this.addOption(this.OPTION_EXCLUIR, 'MOD_SIAPE_BLACKLIST_UND_EXCL');
    this.options.push({
      icon: 'bi bi-trash',
      label: 'Remover',
      hint: 'Remover da lista',
      color: 'btn-outline-danger',
      onClick: (row: any) => this.removerUnidade(row.codigo)
    });
  }

  public async removerUnidade(codigo: string): Promise<void> {
    try {
      const sucesso = await this.dao?.removerUnidade(codigo);
      if (sucesso) {
        this.dialog?.alert('Sucesso', 'Unidade removida da blacklist com sucesso!');
        if (this.grid?.query) {
          this.grid.query.refresh();
        }
      } else {
        this.dialog?.alert('Erro', 'Falha ao remover unidade da blacklist.');
      }
    } catch (error) {
      this.dialog?.alert('Erro', 'Erro ao remover unidade da blacklist.');
    }
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.codigo?.length) {
      result.push(['codigo', 'like', '%' + form.codigo.trim().replace(' ', '%') + '%']);
    }

    if (form.inativado !== null) {
      result.push(['inativado', '==', form.inativado]);
    }

    return result;
  }
}