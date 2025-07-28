import { Component, Injector, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'unidade-list-grid',
  templateUrl: './unidade-list-grid.component.html',
  styleUrls: ['./unidade-list-grid.component.scss']
})
export class UnidadeListGridComponent extends PageListBase<Unidade, UnidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() selectable: boolean = false;
  @Input() snapshot?: ActivatedRouteSnapshot;
  @Input() unidade_pai?: string;
  @ViewChild('instituidora', { static: false }) public instituidora?: InputSwitchComponent;

  public cidadeDao: CidadeDaoService;
  public entidadeDao: EntidadeDaoService;
  public buttons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.join = ["cidade", "unidade_pai:id,sigla", "entidade:id,sigla", "gestor.usuario:id", "gestores_substitutos.usuario:id"];
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    /* Inicializações */
    this.code = "MOD_CFG_UND";
    this.filter = this.fh.FormBuilder({
      entidade_id: { default: this.auth.unidade?.entidade_id },
      inativos: { default: false },
      instituidora: { default: false },
      nome: { default: "" },
      tem_chefe_titular: { default: false },
      tem_chefe_substituto: { default: false }
    });
    this.groupBy = [{ field: "entidade.sigla", label: "Entidade" }];
    // Testa se o usuário possui permissão unificar unidade
    if (this.auth.hasPermissionTo("MOD_UND_UNIR")) {
      this.buttons.push({
        icon: "bi bi-arrows-collapse",
        color: "btn-outline-danger",
        label: "Unificar",
        onClick: (unidade: Unidade) => this.go.navigate({ route: ['logs', 'unidade', 'merge'] }, this.modalRefresh())
      });
    }
    this.addOption(this.OPTION_INFORMACOES, "MOD_UND");
    this.addOption(this.OPTION_EXCLUIR, "MOD_UND_EXCL");
    this.addOption(this.OPTION_LOGS);
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let unidade: Unidade = row as Unidade;
    // Testa se o usuário logado possui permissão de inativar a unidade do grid
    if (this.auth.hasPermissionTo("MOD_UND_INATV")) result.push({icon: unidade.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle", label: unidade.data_inativacao ? 'Reativar' : 'Inativar', onClick: async (unidade: Unidade) => await this.inativo(unidade, !unidade.data_inativacao)});
    // Testa se o usuário logado possui permissão para gerenciar integrantes da unidade do grid
    if (this.auth.hasPermissionTo("MOD_UND_INTG")) result.push({ label: "Integrantes", icon: "bi bi-people", onClick: (unidade: Unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', '', unidade.id, 'integrante'] }, { metadata: { unidade: row } })});
    return result;
  }

  public async inativo(unidade: Unidade, inativo: boolean) {
    if (await this.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar essa unidade (" + unidade.nome + ")?" : "Deseja reativar essa unidade (" + unidade.nome + ")?")) {
      try {
        this.submitting = true;
        await this.dao!.inativar(unidade.id, inativo);
        await this.modalRefreshId(unidade).modalClose!(undefined);
      } finally {
        this.submitting = false;
      }
    }
  }

  public filterClear(filter: FormGroup) {
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    /* Se for selectable trás somente os inativos ou os não inativos, se não for então trás juntamente os inativos se form.inativos */
    result.push(this.selectable ? ["data_inativacao", form.inativos ? "!=" : "==", null] : ["inativos", "==", form.inativos]);
    if (form.entidade_id?.length) result.push(["entidade_id", "==", form.entidade_id]);
    if (form.nome?.length) result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
    if (form.instituidora) result.push(["instituidora", "==", 1]);
    
    if (this.unidade_pai) {
       result.push(["unidade_pai", "==", this.unidade_pai]);
    }

    return result;
  }

  public get labelInfoInativas(): string {
    return this.selectable ? 'Se lista só as unidades inativas' : 'Se lista também as unidades inativas';
  }

  public temChefeTitular(row: Unidade): boolean {
    return  !(row.gestor == null);
  }
  public temChefeSubstituta(row: Unidade): boolean {
    return (row.gestores_substitutos != null) && row.gestores_substitutos.length > 0;
  } 
}