import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";
import { IIndexable } from "../../../../models/base.model";
import { PageFormBase } from "../../../base/page-form-base";
import { CadeiaValor } from "../../../../models/cadeia-valor.model";
import { CadeiaValorDaoService } from "../../../../dao/cadeia-valor-dao.service";
import { EditableFormComponent } from "../../../../components/editable-form/editable-form.component";
import { GridComponent } from 'src/app/components/grid/grid.component';


@Component({
  selector: 'app-cadeia-valor-form',
  templateUrl: './cadeia-valor-form.component.html',
  styleUrls: ['./cadeia-valor-form.component.scss']
})
export class CadeiaValorFormComponent extends PageFormBase<CadeiaValor, CadeiaValorDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      inicio: { default: new Date() },
      fim: { default: null },
      entidade_id: { default: this.auth.unidade?.entidade?.id }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if (controlName == 'fim' && control.value && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let result = null;
    if (this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) {
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
      console.log(this.form!.value);
      resolve(this.util.fillForm(cadeiaValor, this.form!.value));
    });
  }

  public titleEdit = (entity: CadeiaValor): string => {
    return "Editando " + (entity?.nome || "");
  }

}
