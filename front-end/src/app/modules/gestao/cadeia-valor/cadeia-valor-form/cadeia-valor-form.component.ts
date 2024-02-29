import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";
import { IIndexable } from "../../../../models/base.model";
import { PageFormBase } from "../../../base/page-form-base";
import { CadeiaValor } from "../../../../models/cadeia-valor.model";
import { CadeiaValorDaoService } from "../../../../dao/cadeia-valor-dao.service";
import { EditableFormComponent } from "../../../../components/editable-form/editable-form.component";
import { CadeiaValorListProcessosComponent } from '../cadeia-valor-list-processos/cadeia-valor-list-processos.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'app-cadeia-valor-form',
  templateUrl: './cadeia-valor-form.component.html',
  styleUrls: ['./cadeia-valor-form.component.scss']
})
export class CadeiaValorFormComponent extends PageFormBase<CadeiaValor, CadeiaValorDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('processos', { static: false }) public processos?: CadeiaValorListProcessosComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  
  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.join = ['processos'];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      data_inicio: { default: new Date() },
      data_fim: { default: null },
      unidade_id: { default: "" },
      moveFilhos: { default: false }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome','unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let result = null;
    if (this.form!.controls.data_fim.value && this.form!.controls.data_inicio.value > this.form!.controls.data_fim.value) {
      return "A data do início não pode ser maior que a data do fim!";
    }
    return result;
  }

  public loadData(entity: CadeiaValor, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    this.entity = new CadeiaValor();
    this.loadData(this.entity, form);
  }

  public async saveData(form: IIndexable): Promise<CadeiaValor> {
    return new Promise<CadeiaValor>((resolve, reject) => {
      this.processos!.grid!.confirm();
      let cadeiaValor = this.util.fill(new CadeiaValor(), this.entity!);
      this.form!.value.entidade_id = this.auth.entidade?.id
      //this.form!.value.unidade_id = this.auth.unidade?.id
      cadeiaValor = this.util.fillForm(cadeiaValor, this.form!.value);
      cadeiaValor.processos = this.processos!.items;
      resolve(cadeiaValor);
    });
  }

  public titleEdit = (entity: CadeiaValor): string => {
    return "Editando " + this.lex.translate("Cadeia de Valor") + ': ' + (entity?.nome || "");
  }

}
