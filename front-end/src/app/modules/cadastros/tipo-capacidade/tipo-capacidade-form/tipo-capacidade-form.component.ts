import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoCapacidade } from 'src/app/models/tipo-capacidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-tipo-capacidade-form',
  templateUrl: './tipo-capacidade-form.component.html',
  styleUrls: ['./tipo-capacidade-form.component.scss']
})
export class TipoCapacidadeFormComponent extends PageFormBase<TipoCapacidade, TipoCapacidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoCapacidade, TipoCapacidadeDaoService);
    this.form = this.fh.FormBuilder({
      codigo: {default: ""},
      descricao: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['descricao', 'codigo'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoCapacidade, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoCapacidade());
  }

  public saveData(form: IIndexable): Promise<TipoCapacidade> {
    return new Promise<TipoCapacidade>((resolve, reject) => {
      const tipoCapacidade = this.util.fill(new TipoCapacidade(), this.entity!);
      resolve(this.util.fillForm(tipoCapacidade, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoCapacidade): string => {
    return "Editando " + (entity?.descricao || ""); //A analisar se fica melhor visivelmente com [] ou sem. Ex: Editando [Requerimento] ao invés de Editando Requerimento
  }
}

