import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoProcesso } from 'src/app/models/tipo-processo.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-tipo-processo-form',
  templateUrl: './tipo-processo-form.component.html',
  styleUrls: ['./tipo-processo-form.component.scss']
})
export class TipoProcessoFormComponent extends PageFormBase<TipoProcesso, TipoProcessoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoProcesso, TipoProcessoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      codigo: {default: ""},
      etiquetas: {default: []},
      checklist: {default: []},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      checklist_texto: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'codigo'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoProcesso, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoProcesso());
  }

  public saveData(form: IIndexable): Promise<TipoProcesso> {
    return new Promise<TipoProcesso>((resolve, reject) => {
      const tipoProcesso = this.util.fill(new TipoProcesso(), this.entity!);
      resolve(this.util.fillForm(tipoProcesso, this.form!.value));
    });
  }

  public addItemHandleChecklist(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.checklist_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.checklist.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.checklist_texto.value
      };
      this.form!.controls.checklist_texto.setValue("");
    }
    return result;
  };

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.etiqueta_texto.value,
        color: this.form!.controls.etiqueta_cor.value,
        icon: this.form!.controls.etiqueta_icone.value
      };
      this.form!.controls.etiqueta_texto.setValue("");
      this.form!.controls.etiqueta_icone.setValue(null);
      this.form!.controls.etiqueta_cor.setValue(null);
    }
    return result;
  };

  public titleEdit = (entity: TipoProcesso): string => {
    return "Editando " + (entity?.nome || ""); //A analisar se fica melhor visivelmente com [] ou sem. Ex: Editando [Requerimento] ao invés de Editando Requerimento
  }
}

