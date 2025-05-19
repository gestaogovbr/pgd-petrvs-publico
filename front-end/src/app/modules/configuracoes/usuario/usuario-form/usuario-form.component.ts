import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UsuarioIntegranteComponent } from '../usuario-integrante/usuario-integrante.component';
import { TemplateDataset } from 'src/app/modules/uteis/templates/template.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(UsuarioIntegranteComponent, { static: false }) public unidadesIntegrantes?: UsuarioIntegranteComponent;
  @ViewChild('lotacao', { static: false }) public lotacao?: InputSearchComponent;

  //public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public integranteDao: UnidadeIntegranteDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public planoDataset: TemplateDataset[];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    //this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.form = this.fh.FormBuilder({
      email: { default: "" },
      nome: { default: "" },
      cpf: { default: "" },
      apelido: { default: "" },
      usuario_externo: { default: true },
      telefone: { default: "" },
      uf: { default: "" },
      sexo: { default: null },
      url_foto: { default: "" },
      texto_complementar_plano: { default: "" },
      //perfil_id: { default: null },
      data_nascimento: { default: null },
    }, this.cdRef, this.validate);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["auditsExterno", "ultimoPlanoTrabalhoAtivo.documentos"]
  }

  public async loadData(entity: Usuario, form: FormGroup): Promise<void> {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    await this.unidadesIntegrantes?.loadData(entity);
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Usuario();
    this.loadData(this.entity, form);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    }
    if(controlName == 'data_nascimento' && control.value == null){
      return result;
    }
    if(['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if (!this.unidadesIntegrantes?.formPerfil.controls.perfil_id.value?.length) return "É obrigatório a definição de um " + this.lex.translate("perfil") + " para " + this.lex.translate("o servidor") + ". Utilize a aba 'Atribuições'.";
    // if (!this.unidadesIntegrantes?.grid?.items.find((item, index, array) => item.atribuicoes.includes('LOTADO'))) {
    //   return "É obrigatória a definição " + this.lex.translate('da unidade') + " " + this.lex.translate('de lotação') + " " + this.lex.translate('do servidor') + "! Defina-a na aba 'Atribuições'.";
    // }
    if (this.action != 'new' && this.unidadesIntegrantes?.grid?.items.find((item, index, array) => !(item.unidade_id.length && item.usuario_id.length))) return "Na aba 'Atribuições' há " + this.lex.translate('unidade') + " com edição não concluída. Conclua-a antes de salvar " + this.lex.translate('o servidor') + "!"
    return undefined;
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.unidadesIntegrantes!.grid!.confirm();
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      usuario.perfil_id = this.unidadesIntegrantes?.formPerfil.controls.perfil_id.value;
      let integrantesConsolidados: IntegranteConsolidado[] = this.unidadesIntegrantes?.items || [];
      let indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
      integrantesConsolidados.forEach((item, index, array) => { if(index != indiceVinculoLotacao && item._status == 'DELETE') item.atribuicoes = []; });
      usuario.integrantes = integrantesConsolidados;
          resolve(usuario);
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.nome || "");
  }

}

/*
TESTES MÍNIMOS RECOMENDADOS PARA A VALIDAÇÃO DO COMPONENTE - USUARIO-FORM

- Para verificar Lotação x Atribuições

CENÁRIO: CAMINHO FELIZ
Formulário completo do usuário
1. Incluir um usuário com lotação definida e sem atribuições.
2. Incluir um usuário com lotação definida e na mesma unidade inserir novas atribuições compatíveis (não deve estar disponível a atribuição 'LOTADO').
3. Incluir um usuário com lotação definida e na mesma unidade e em várias outras inserir atribuições compatíveis diversas.
4. Alterar um usuário, mudando sua lotação através da aba 'Principal', para uma unidade que não existe ainda na aba 'Atribuições'.
5. Alterar um usuário, mudando sua lotação através da aba 'Principal', para uma unidade que já existe na aba 'Atribuições'.
6. Alterar um usuário, apagando uma ou mais atribuições de uma mesma unidade.
7. Alterar um usuário, apagando o vínculo completo com uma unidade distinta da sua lotação.
8. Tentar incluir um usuário que já existe (mesmo e-mail funcional) e que foi desativado (apagado virtualmente).
9. Tentar incluir um usuário que já existe (mesmo cpf) e que foi desativado (apagado virtualmente).

CENÁRIO: CAMINHO ALTERNATIVO
Formulário completo do usuário
1. Incluir um usuário com lotação definida e com atribuições repetidas em uma mesma unidade.
2. Incluir um usuário com lotação definida e com atribuições incompatíveis em uma mesma unidade (mais de uma atribuição de gestor).
3. Alterar um usuário apagando sua atribuição de LOTADO na aba 'Atribuições'. 
4. Alterar um usuário inserindo atribuições repetidas em uma mesma unidade.
5. Alterar um usuário inserindo atribuições incompatíveis em uma mesma unidade.
6. Alterar um usuário apagando o vínculo completo com a unidade de sua lotação.
7. Alterar um usuário apagando vários vínculos completos com diversas unidades, sem incluir a unidade de lotação.
8. Alterar um usuário apagando vários vínculos completos com diversas unidades, incluindo sua unidade de lotação.
9. Alterar um usuário inserindo a atribuição de 'Gestor' a mais de uma unidade.

CENÁRIO: CAMINHO ALTERNATIVO
Formulário de 'Atribuições' (menu de opções: ...)
1. Alterar um usuário apagando sua atribuição de LOTADO. 
2. Alterar um usuário inserindo atribuições repetidas em uma mesma unidade.
3. Alterar um usuário inserindo atribuições incompatíveis em uma mesma unidade.
4. Alterar um usuário apagando o vínculo completo com a unidade de sua lotação.
5. Alterar um usuário apagando vários vínculos completos com diversas unidades, sem incluir a unidade de lotação.
6. Alterar um usuário apagando vários vínculos completos com diversas unidades, incluindo sua unidade de lotação.
7. Alterar um usuário inserindo a atribuição de 'Gestor' a mais de uma unidade.

 */