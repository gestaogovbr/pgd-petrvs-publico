import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Entrega } from 'src/app/models/entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-entrega-form',
  templateUrl: './entrega-form.component.html',
  styleUrls: ['./entrega-form.component.scss']
})
export class EntregaFormComponent extends PageFormBase<Entrega, EntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  

  constructor(public injector: Injector) {
    super(injector, Entrega, EntregaDaoService);

    this.form = this.fh.FormBuilder({
      codigo_ibge: {default: ""},
      nome: {default: ""},
      tipo: {default: ""},
      uf: {default: ""},
      timezone: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    }
    return result;
  }

  public loadData(entity: Entrega, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Entrega());
  }

  public saveData(form: IIndexable): Promise<Entrega> {
    return new Promise<Entrega>((resolve, reject) => {
      const cidade = this.util.fill(new Entrega(), this.entity!);
      resolve(this.util.fillForm(cidade, this.form!.value));
    });
  }

  public titleEdit = (entity: Entrega): string => {
    return "Editando "+ (entity?.nome || "");
  }
}

