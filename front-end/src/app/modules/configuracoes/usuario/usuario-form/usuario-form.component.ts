import { Component, Injector, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuarioIntegrante', { static: false }) public usuarioIntegrante?: UsuarioIntegranteComponent;

  public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public planoDataset: TemplateDataset[]; 

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
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
      perfil_id: {default: null}
    }, this.cdRef, this.validate);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["unidades_integrante.unidade","unidades_integrante.atribuicoes:id, atribuicao"];
  }

  public validate = (control: AbstractControl, controlName: string) => {   
    let result = null;
    if(['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    else if(controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    }
    return result;
  }
  
  public formValidation = (form?: FormGroup) => {
    if(!form?.controls.atribuicoes.value?.length || form?.controls.atribuicoes.value.filter((u: { nome: string; unidade_id: string }) => u.nome == "LOTADO")) {
      return "Obrigatório ao menos a unidade de lotação do usuário!";
    } else {
      const erros_atribuicoes = []
      form?.controls.atribuicoes.value?.forEach((atribuicao: { nome: string; unidade_id: string }) => {
        if(atribuicao.unidade_id == '') erros_atribuicoes.push({ atribuicao: atribuicao, erro: 'Falta unidade_id'})
      });
      if (erros_atribuicoes.length) return "Salve a unidade antes de salvar o usuário"

    }
    return undefined;
  } 

  public loadData(entity: Usuario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Usuario();
    this.loadData(this.entity, form); 
    //form.patchValue(new Usuario());
  }

  public saveData(form: IIndexable): Promise<Usuario> {      
    return new Promise<Usuario>((resolve, reject) => {
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      usuario.atribuicoes = usuario.atribuicoes.filter((x: { _status: any; unidade_id: string; nome: string; }) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.unidade_id?.length && x.nome?.length);
      resolve(usuario);
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + (entity?.matricula || "") + ' - ' + (entity?.nome || "");
  }

}
