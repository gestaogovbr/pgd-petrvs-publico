import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Planejamento} from "../../../../models/planejamento.model";
import {IIndexable} from "../../../../models/base.model";
import {PageFormBase} from "../../../base/page-form-base";
import {CadeiaValor} from "../../../../models/cadeia-valor.model";
import {CadeiaValorDaoService} from "../../../../dao/cadeia-valor-dao.service";
import {EditableFormComponent} from "../../../../components/editable-form/editable-form.component";
import {UnidadeDaoService} from "../../../../dao/unidade-dao.service";
import {PlanejamentoDaoService} from "../../../../dao/planejamento-dao.service";
import {EntidadeDaoService} from "../../../../dao/entidade-dao.service";
import { GridComponent } from 'src/app/components/grid/grid.component';

@Component({
  selector: 'app-cadeia-valor-form',
  templateUrl: './cadeia-valor-form.component.html',
  styleUrls: ['./cadeia-valor-form.component.scss']
})
export class CadeiaValorFormComponent extends PageFormBase<CadeiaValor, CadeiaValorDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public unidadeDao: UnidadeDaoService;
  public entidadeDao: EntidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      unidade_id: {default: ""},
      entidade_id: {default: ""},
      inicio: {default: new Date()},
      fim: {default: null}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','unidade_id', "entidade_id"].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if(['inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if(controlName == 'fim' && control.value && !this.dao?.validDateTime(control.value)){
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) =>{
    let result = null;
    if(this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) {
      return "A data do início não pode ser maior que a data do fim!";
    }
    return result;
  }

  public loadData(entity: CadeiaValor, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    form.patchValue(new CadeiaValor());
  }

  public async saveData(form: IIndexable): Promise<CadeiaValor> {
    return new Promise<CadeiaValor>((resolve, reject) => {
      const cadeiaValor = this.util.fill(new CadeiaValor(), this.entity!);
      resolve(this.util.fillForm(cadeiaValor, this.form!.value));
    });
  }

  public titleEdit = (entity: CadeiaValor): string => {
    return "Editando "+ (entity?.nome || "");
  }

}
