import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-teste-impersonate',
  templateUrl: './teste-impersonate.component.html',
  styleUrls: ['./teste-impersonate.component.scss']
})
export class TesteImpersonateComponent extends PageListBase<Usuario, UsuarioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public perfilDao: PerfilDaoService;

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Usuários");
    this.code = "MOD_CFG_USER";
    this.join = ["perfil:id,nome"];
    this.filter = this.fh.FormBuilder({
      usuario: { default: "" },
      unidade_id: { default: "" },
      perfil_id: { default: null },
      atribuicoes: { default: null }
    });
    this.addOption(this.OPTION_INFORMACOES, "MOD_USER");
    // this.addOption(this.OPTION_EXCLUIR, "MOD_USER_EXCL");       // Tratar de forma diferenciada a exclusão de usuário
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    // Testa se o usuário logado possui permissão para gerenciar as atribuições do usuário do grid
    if (this.auth.hasPermissionTo("MOD_USER_ATRIB")) result.push({ label: "Atribuições", icon: "bi bi-list-task",  onClick: (usuario: Usuario) => { this.go.navigate({ route: ['configuracoes', 'usuario', usuario.id, 'integrante'] }, { metadata: { entity: row } }); }});
    return result;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    if (filter?.controls.usuario?.value?.length) {
      result.push(["nome", "like", "%" + filter?.controls.usuario?.value.trim().replace(" ", "%") + "%"]);
    }
    if (filter?.controls.unidade_id?.value?.length) {
      result.push(["lotacao", "==", filter?.controls.unidade_id.value]);
    }
    if (filter?.controls.perfil_id?.value?.length) {
      result.push(["perfil_id", "==", filter?.controls.perfil_id?.value]);
    }
    if (filter?.controls.atribuicoes?.value?.length) {
      result.push(["atribuicoes", "==", filter?.controls.atribuicoes?.value]);
    }
    return result;
  }

  public impersonate (user:string){
    this.auth.impersonate(user);
  }
}
