import { Component, Injector, ViewChild, TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Perfil } from 'src/app/models/perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent extends PageListBase<Usuario, UsuarioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("justificativaDialog", { static: false }) public justificativaDialog?: TemplateRef<any>;
  public justificativaForm: FormGroup;
  
  public unidadeDao: UnidadeDaoService;
  public perfilDao: PerfilDaoService;
  public usuarioDao: UsuarioDaoService;

  public onDeleteMessage: string = "Este usuário deixará de ter acesso ao sistema. Deseja confirmar a exclusão?";

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);

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
    this.justificativaForm = this.fh.FormBuilder({
      justificativa: { default: ""},
      usuario_id: { default: null }
    }, this.cdRef, this.validateJustificativa);

    this.addOption(this.OPTION_INFORMACOES, "MOD_USER");
  }

  public validateJustificativa = (control: AbstractControl, controlName: string) => {
    let result = null;   
    if(controlName == 'justificativa' && !control.value.length){
      result = "Obrigatório";
    }
    return result;
  }


  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if (row.situacao_siape == 'INATIVO' && this.auth.hasPermissionTo("MOD_USER_REATIVAR")){
      result.push({ label: "Ativar temporariamente", icon: "bi bi-check2",  onClick: (usuario: Usuario) => { this.abrirFormAtivar(usuario); }});
    }

    if(row.perfil.nivel === Perfil.NIVEL.COLABORADOR && !!row.usuario_externo ) {
      result.push(this.OPTION_EXCLUIR)
    }

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

  public onCancel() {
    this.justificativaForm.reset();
  }
  
  public abrirFormAtivar(usuario: Usuario) {
    this.justificativaForm.controls.usuario_id.setValue(usuario.id);
    if (this.justificativaDialog) {
      this.dialog.template({title: "Ativar temporariamente"}, this.justificativaDialog, [], null);
    }
  }


  public onSubmit() {
    if (this.justificativaForm.valid) {
      this.dialog.confirm("Confirmação", "Ao confirmar, o usuário poderá realizar alterações no sistema durante 30 dias. Deseja continuar?").then((confirm: boolean) => {
        if (confirm) {
          const ativo = this.usuarioDao.ativarTemporariamente(this.justificativaForm.controls.usuario_id.value, this.justificativaForm.controls.justificativa.value)
          ativo.then(() => {
            this.dialog.alert("Sucesso", "Usuário ativado temporariamente.");
            this.justificativaForm.reset();
            this.cdRef.detectChanges();
          });   
          ativo.finally(() => {
            this.dialog.closeAll();
            this.refresh()

          });
        }
      });
    }
  }

}
