import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styleUrls: ['./unidade-list.component.scss']
})
export class UnidadeListComponent extends PageListBase<Unidade, UnidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public cidadeDao: CidadeDaoService;
  public entidadeDao: EntidadeDaoService;
  public buttons: ToolbarButton[] = [];
  public unidadesJaVinculadas: string[] = [];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.join = ["cidade", "unidade_pai:id,sigla", "entidade:id,sigla", "gestor.usuario:id", "gestor_substituto.usuario:id"];
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);

    /* Inicializações */
    this.title = this.lex.translate("Unidades");
    this.code = "MOD_CFG_UND";
    this.filter = this.fh.FormBuilder({
      entidade_id: { default: this.auth.unidade?.entidade_id },
      inativos: { default: false },
      instituidora: { default: false },
      nome: { default: "" }
    });
    this.groupBy = [{ field: "entidade.sigla", label: "Entidade" }];
    // Testa se o usuário possui permissão unificar unidade
    if (this.auth.hasPermissionTo("MOD_UND_UNIR")) {
      this.buttons.push({
        icon: "bi bi-arrows-collapse",
        color: "btn-outline-danger",
        label: "Unificar",
        onClick: (unidade: Unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', 'merge'] }, this.modalRefresh())
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.unidadesJaVinculadas = this.metadata?.unidadesJaVinculadas || this.unidadesJaVinculadas;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let unidade: Unidade = row as Unidade;
    // Testa se o usuário possui permissão para exibir dados da unidade
    if (this.auth.hasPermissionTo("MOD_UND_CONS")) result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
    // Testa se o usuário possui permissão de inativar a unidade
    if (this.auth.hasPermissionTo("MOD_UND_INATV")) result.push({icon: unidade.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle", label: unidade.data_inativacao ? 'Reativar' : 'Inativar', onClick: async (unidade: Unidade) => await this.inativo(unidade, !unidade.data_inativacao)});
    // Testa se o usuário possui permissão para gerenciar integrantes da unidade
    if (this.auth.hasPermissionTo("MOD_UND_INTG")) result.push({icon: "bi bi-people", label: "Integrantes", onClick: (unidade: Unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', 'NOPERSIST', unidade.id, 'integrante'] })});
    // Testa se o usuário possui permissão para excluir unidade
    if (this.auth.hasPermissionTo("MOD_UND_EXCL")) result.push({ icon: "bi bi-trash", label: "Excluir", onClick: this.delete.bind(this) });
    return result;
  }

  public async inativo(unidade: Unidade, inativo: boolean) {
    if (await this.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar a unidade?" : "Deseja reativar a unidade?")) {
      try {
        this.submitting = true;
        await this.dao!.inativo(unidade.id, inativo);
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
    if (this.unidadesJaVinculadas.length) result.push(["id","not in",this.unidadesJaVinculadas]);
    return result;
  }
}