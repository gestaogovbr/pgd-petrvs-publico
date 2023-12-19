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
import { IntegranteConsolidado, UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';
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

  public formLotacao: FormGroup;
  public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public integranteDao: UnidadeIntegranteDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public planoDataset: TemplateDataset[];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.form = this.fh.FormBuilder({
      email: { default: "" },
      nome: { default: "" },
      cpf: { default: "" },
      matricula: { default: "" },
      apelido: { default: "" },
      telefone: { default: "" },
      uf: { default: "" },
      sexo: { default: null },
      url_foto: { default: "" },
      texto_complementar_plano: { default: "" },
      perfil_id: { default: null },
      data_nascimento: { default: null },
    }, this.cdRef, this.validate);
    this.formLotacao = this.fh.FormBuilder({
      unidade_lotacao_id: { default: "" },
    }, this.cdRef, this.validate);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["lotacao.unidade:id"];
  }

  public async loadData(entity: Usuario, form: FormGroup): Promise<void> {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.formLotacao.controls.unidade_lotacao_id.setValue(entity.lotacao?.unidade?.id);
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
    if(['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if (!this.formLotacao?.controls.unidade_lotacao_id.value?.length) {
      return "É obrigatória a definição da unidade de lotação do servidor!";
    }
    const erros_atribuicoes = [];
    this.unidadesIntegrantes?.grid?.items.forEach((unidadeIntegrante) => {
      if (unidadeIntegrante.unidade_id == '') erros_atribuicoes.push({ integrante: unidadeIntegrante, erro: 'Falta unidade_id' })
    });
    if (erros_atribuicoes.length) return "Na aba 'Atribuições' há unidade não salva. Salve-a antes de salvar o usuário!"
    return undefined;
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.unidadesIntegrantes!.grid!.confirm();
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      usuario.lotacao_id = this.formLotacao?.controls.unidade_lotacao_id.value;
      let integrantesConsolidados: IntegranteConsolidado[] = this.unidadesIntegrantes?.items || [];
      let indicesIntegrantesExcluir: number[] = [];
      integrantesConsolidados.filter(x => x._status == "DELETE").forEach((x,i) => indicesIntegrantesExcluir.push(i));
      let indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
      let lotacaoAlterada: boolean = indiceVinculoLotacao == -1 || usuario.lotacao_id != integrantesConsolidados[indiceVinculoLotacao].unidade_id;
      let usuarioEhGestor: boolean = integrantesConsolidados[indiceVinculoLotacao].atribuicoes.includes("GESTOR");
      if(lotacaoAlterada && usuarioEhGestor) {
        this.submitting = false;
        await this.dialog.alert("PROIBIDO ALTERAR A LOTAÇÃO !", "Não é possível alterar a lotação de um servidor que exerce a função de Gestor Titular da Unidade onde atualmente está lotado.");
        reject(false);
      } else {
        try {
          await this.dao?.save(Object.assign(usuario,{'lotacao_id': this.formLotacao?.controls.unidade_lotacao_id.value})).then(async usuarioBanco => {
  
            if (lotacaoAlterada) {    // garantindo a coerência entre o campo de lotação do usuário e o vínculo de lotado dos integrantes
              if(indiceVinculoLotacao != -1) integrantesConsolidados[indiceVinculoLotacao].atribuicoes = integrantesConsolidados[indiceVinculoLotacao].atribuicoes.filter(x => x != "LOTADO");
              let indiceNovaUnidadeLotacao = integrantesConsolidados.findIndex(ic => ic.unidade_id == usuario.lotacao_id);
              indiceNovaUnidadeLotacao == -1 ? integrantesConsolidados.push(Object.assign(new IntegranteConsolidado (), { unidade_id: usuario.lotacao_id, usuario_id: usuarioBanco.id, atribuicoes: ["LOTADO"] })) : integrantesConsolidados[indiceNovaUnidadeLotacao].atribuicoes.push("LOTADO");
              indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
            }
            // uma vez garantida a coerência entre o campo de lotação do usuário e o vínculo de lotado dos integrantes, vamos tratar do eventual vínculo a ser excluído 
            indicesIntegrantesExcluir.forEach( i => {
              //integrantesConsolidados[i].atribuicoes = i != indiceVinculoLotacao ? [] : ["LOTADO"];
              if(i != indiceVinculoLotacao) integrantesConsolidados[i].atribuicoes = [];
            });
            integrantesConsolidados.forEach(ic => ic.usuario_id = usuarioBanco.id);
            await this.integranteDao.saveIntegrante(integrantesConsolidados as IntegranteConsolidado[]);
          });
          resolve(true);
        } catch (error: any) {
          if (this.editableForm) this.editableForm.error = error;
        }
      }
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.nome || "");
  }

}

/*
TESTES A SEREM REALIZADOS NO FORM USUARIOS

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