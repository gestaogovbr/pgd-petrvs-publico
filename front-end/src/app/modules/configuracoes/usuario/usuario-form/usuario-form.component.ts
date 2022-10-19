import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Lotacao } from 'src/app/models/lotacao.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public formLotacoes: FormGroup;

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
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
      lotacoes: {default: []},
      perfil_id: {default: null}
    }, this.cdRef, this.validate);
    this.formLotacoes = this.fh.FormBuilder({
      principal: {default: ""},
      unidade_id: {default: ""},
    }, this.cdRef, this.validateLotacoes);
    this.join = ["lotacoes.unidade"];
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
    if(!form?.controls.lotacoes.value?.length) {
      return "Obrigatório ao menos uma lotação";
    } else {
      const erros_lotacao = []
      form?.controls.lotacoes.value?.forEach((lotacao: Lotacao) => {
        if(lotacao.unidade_id == '') erros_lotacao.push({ lotacao: lotacao, erro: 'Falta unidade_id'})
      });
      if (erros_lotacao.length) return "Salve a lotação antes de salvar o usuário"

    }
    return undefined;
  } 

  public validateLotacoes = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Usuario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Usuario());
  }

  public saveData(form: IIndexable): Promise<Usuario> {      
    return new Promise<Usuario>((resolve, reject) => {
      const usuario = this.util.fill(new Usuario(), this.entity!);
      resolve(this.util.fillForm(usuario, this.form!.value));
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + (entity?.matricula || "") + ' - ' + (entity?.nome || "");
  }

  public async addLotacao() {
    return Object.assign(new Lotacao(), {usuario_id: this.entity?.id, _status: "ADD"}) as IIndexable;
  }

  public async loadLotacao(form: FormGroup, row: any) {
    form.controls.unidade_id.setValue(row.unidade_id);
    form.controls.principal.setValue(row.principal);
  }

  public async removeLotacao(row: any) {
    row._status = "DELETE";
    return false;
  }

  public async saveLotacao(form: FormGroup, row: any) {
    const lotacoes = (this.form?.controls.lotacoes?.value || []).filter((x: Lotacao) => x.id != row.id);
    const principal = lotacoes.find((x: Lotacao) => x.principal);
    row.unidade_id = form.controls.unidade_id.value;
    row.principal = form.controls.principal.value;
    row._status = row._status == "ADD" ? "ADD" : "EDIT";
    if(row.principal && principal) Object.assign(principal, {principal: false, _status: principal._status == "ADD" ? "ADD" : "EDIT"});
    if(!row.principal && !principal) Object.assign(lotacoes[0], {principal: true, _status: lotacoes[0]._status == "ADD" ? "ADD" : "EDIT"});
    this.dialog.showSppinerOverlay("Carregando dados da atividade...");
    try {
      row.unidade = await this.unidadeDao?.getById(row.unidade_id)!;
    } finally {
      this.dialog.closeSppinerOverlay();
    }
    return row;
  }

}
