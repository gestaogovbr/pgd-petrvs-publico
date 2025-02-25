import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Cidade } from 'src/app/models/cidade.model';
import { EntidadeEmail } from 'src/app/models/entidade-email';
import { Entidade } from 'src/app/models/entidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-entidade-form',
  templateUrl: './entidade-form.component.html',
  styleUrls: ['./entidade-form.component.scss']
})
export class EntidadeFormComponent extends PageFormBase<Entidade, EntidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('cidade', { static: false }) public cidade?: InputSearchComponent;
  @ViewChild('gestor', { static: false }) public gestor?: InputSearchComponent;
  @ViewChild('gestorSubstituto', { static: false }) public gestorSubstituto?: InputSearchComponent;
  @ViewChild('tipo_modalidade', { static: false }) public tipoModalidade?: InputSearchComponent;

  public tipoModalidadeDao: TipoModalidadeDaoService;
  public cidadeDao: CidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public campos: LookupItem[] = [];
  public formEmail: FormGroup;

  constructor(public injector: Injector, public util: UtilService) {
    super(injector, Entidade, EntidadeDaoService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      sigla: {default: ""},
      nome: {default: ""},
      abrangencia: {default: ""},
      codigo_ibge: {default: ""},
      gravar_historico_processo: {default: ""},
      layout_formulario_demanda: {default: ""},
      campos_ocultos_demanda: {default: ""},
      tipo_modalidade_id: {default: null},
      cidade_id: {default: null},
      gestor_id: {default: null},
      gestor_substituto_id: {default: null},
      expediente: {default: null},
      uf: {default: null},
      email_responsavel_siape: {default: ""},
      email_remetente_siape: {default: ""},
      emails: {default: []}
    }, this.cdRef, this.validate);
    this.join = ["cidade", "tipoModalidade", "gestor", "gestor_substituto", "emails"];
    this.formEmail = this.fh.FormBuilder({
      email: {default: ""},
    }, this.cdRef, this.validateEmail);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'sigla'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateEmail = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(!control.value?.length) {
      result = "Obrigatório";
    }

    if(!this.util.validarEmail(control.value)) {
      result = "Inválido";
    }
    
    return result;
  }

  public async addEmail() {
    return new EntidadeEmail({
      entidade_id: this.entity!.id
    }) as IIndexable;
  }

  public async removeEmail(row: any) {
    return await this.dialog.confirm("Excluir?", "Deseja realmente excluir?");
  }

  public async loadEmail(form: FormGroup, row: any) {
    form.patchValue(row);
  }

  public async saveEmail(form: FormGroup, row: any) {
    this.util.fillForm(row, form!.value)
    return row;
  }

  public async loadData(entity: Entidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    this.campos = entity.campos_ocultos_atividade || [];
    await Promise.all ([
      this.cidade?.loadSearch(entity.cidade || entity.cidade_id),
      this.gestor!.loadSearch(entity.gestor || entity.gestor_id),
      this.gestorSubstituto!.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id),
      this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Entidade());
  }

  public saveData(form: IIndexable): Promise<Entidade> {
    return new Promise<Entidade>((resolve, reject) => {
      let entidade = this.util.fill(new Entidade(), this.entity!);
      entidade = this.util.fillForm(entidade, this.form!.value);
      if(entidade.abrangencia == "MUNICIPAL" && this.cidade?.selectedEntity) {
        entidade.codigo_ibge = (this.cidade?.selectedEntity as Cidade).codigo_ibge;
      } else if(entidade.abrangencia == "ESTADUAL") {
        entidade.codigo_ibge = this.lookup.UF.find(x => x.key == entidade.uf)?.code;
      } else {
        entidade.codigo_ibge = null;
      }
      entidade.campos_ocultos_demanda = this.campos;
      resolve(entidade);
    });
  }

  public titleEdit = (entity: Entidade): string => {
    return "Editando " + this.lex.translate("Entidade") + ': ' + (entity?.sigla || "");
  }
}

