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
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeIntegranteDaoService, Vinculo } from 'src/app/dao/unidade-integrante-dao.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(UsuarioIntegranteComponent, { static: false }) public atribuicoes?: UsuarioIntegranteComponent;
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
      email: {default: ""},
      nome: {default: ""},
      cpf: {default: ""},
      matricula: {default: ""},
      apelido: {default: ""},
      telefone: {default: ""},
      uf: {default: ""},
      sexo: {default: null},
      url_foto: {default: ""},
      texto_complementar_plano: {default: ""},
      perfil_id: {default: null},
      data_nascimento: { default: new Date() },
      //atribuicoes: { default: []}
    }, this.cdRef, this.validate);
    this.formLotacao = this.fh.FormBuilder({
      unidade_lotacao_id: {default: ""},
    }, this.cdRef, this.validate);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["lotacao.unidade:id"];
  }

  public validate = (control: AbstractControl, controlName: string) => {   
    let result = null;
    if(['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id', 'unidade_lotacao_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    } else if (['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }
  
  public formValidation = (form?: FormGroup) => {
    const nascimento = this.form?.controls.data_nascimento.value;
    if(!this.formLotacao?.controls.unidade_lotacao_id.value?.length) {
      return "É obrigatória a definição da unidade de lotação do servidor!";
    } else if (!this.dao?.validDateTime(nascimento)) {
      return "Data de nascimento inválida";
    }
    const erros_atribuicoes = [];
    this.atribuicoes?.grid?.items.forEach((atribuicao) => {
      if(atribuicao.unidade_id == '') erros_atribuicoes.push({ atribuicao: atribuicao, erro: 'Falta unidade_id'})
    });
    if(erros_atribuicoes.length) return "Na aba 'Atribuições' há unidade não salva. Salve-a antes de salvar o usuário!"
    return undefined;
  } 

  public loadData(entity: Usuario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.formLotacao.controls.unidade_lotacao_id.setValue(entity.lotacao?.unidade?.id);
    this.atribuicoes?.loadData(entity);
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Usuario();
    this.loadData(this.entity, form); 
  }
  
  public saveData(form: IIndexable): Promise<boolean> {      
    return new Promise<boolean>(async (resolve, reject) => {
      this.atribuicoes!.grid!.confirm();
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      usuario.lotacao_id = this.formLotacao?.controls.unidade_lotacao_id.value;
      let vinculos = this.atribuicoes?._items || [];
      try {
        await this.dao?.save(usuario).then(async resposta => {
          if(vinculos.length) {
            vinculos.forEach(v => v.usuario_id = resposta.id);
            await this.integranteDao.saveIntegrante(vinculos as Vinculo[]);
          }
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

  public onLotacaoChange(){
    //this.unidadesIntegrantes?.items.splice(this.unidadesIntegrantes?.items.indexOf(),1);
  }

}
