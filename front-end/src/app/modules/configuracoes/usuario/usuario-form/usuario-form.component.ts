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

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(UsuarioIntegranteComponent, { static: false }) public unidadesIntegrantes?: UsuarioIntegranteComponent;

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

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id', 'unidade_lotacao_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    } else if (['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
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

  public loadData(entity: Usuario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.formLotacao.controls.unidade_lotacao_id.setValue(entity.lotacao?.unidade?.id);
    this.unidadesIntegrantes?.loadData(entity);
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Usuario();
    this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.unidadesIntegrantes!.grid!.confirm();
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      usuario.lotacao_id = this.formLotacao?.controls.unidade_lotacao_id.value;
      let integrantesConsolidados: IntegranteConsolidado[] = this.unidadesIntegrantes?.items || [];
      let indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
      let lotacaoAlterada: boolean = indiceVinculoLotacao == -1 || usuario.lotacao_id != integrantesConsolidados[indiceVinculoLotacao].unidade_id;
      try {
        await this.dao?.save(usuario).then(async usuarioBanco => {
          if (lotacaoAlterada) {
            if(indiceVinculoLotacao != -1) integrantesConsolidados[indiceVinculoLotacao].atribuicoes = integrantesConsolidados[indiceVinculoLotacao].atribuicoes.filter(x => x != "LOTADO");
            let index = integrantesConsolidados.findIndex(ic => ic.unidade_id == usuario.lotacao_id);
            index == -1 ? integrantesConsolidados.push(Object.assign(new IntegranteConsolidado (), { unidade_id: usuario.lotacao_id, usuario_id: usuarioBanco.id, atribuicoes: ["LOTADO"] })) : integrantesConsolidados[index].atribuicoes.push("LOTADO");
          }
          integrantesConsolidados.forEach(ic => ic.usuario_id = usuarioBanco.id);
          await this.integranteDao.saveIntegrante(integrantesConsolidados as IntegranteConsolidado[]);
        });
        resolve(true);
      } catch (error: any) {
        if (this.editableForm) this.editableForm.error = error;
      }
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.nome || "");
  }

}
