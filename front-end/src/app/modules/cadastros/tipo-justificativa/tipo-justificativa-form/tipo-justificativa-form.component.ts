import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoJustificativa } from 'src/app/models/tipo-justificativa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-entidade-form',
  templateUrl: './tipo-justificativa-form.component.html',
  styleUrls: ['./tipo-justificativa-form.component.scss']
})
export class TipoJustificativaFormComponent extends PageFormBase<TipoJustificativa, TipoJustificativaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoJustificativa, TipoJustificativaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoJustificativa, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoJustificativa());
  }

  public saveData(form: IIndexable): Promise<TipoJustificativa> {
    return new Promise<TipoJustificativa>((resolve, reject) => {
      const tipoJustificativa = this.util.fill(new TipoJustificativa(), this.entity!);
      resolve(this.util.fillForm(tipoJustificativa, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoJustificativa): string => {
    return "Editando " + (entity?.nome || "");
  }
}

