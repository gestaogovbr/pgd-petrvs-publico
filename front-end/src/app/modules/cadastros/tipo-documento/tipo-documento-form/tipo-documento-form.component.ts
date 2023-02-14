import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-tipo-documento-form',
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.scss']
})
export class TipoDocumentoFormComponent extends PageFormBase<TipoDocumento, TipoDocumentoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoDocumento, TipoDocumentoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      entregavel: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoDocumento, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoDocumento());
  }

  public saveData(form: IIndexable): Promise<TipoDocumento> {
    return new Promise<TipoDocumento>((resolve, reject) => {
      const tipoDocumento = this.util.fill(new TipoDocumento(), this.entity!);
      resolve(this.util.fillForm(tipoDocumento, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoDocumento): string => {
    return "Editando " + (entity?.nome || ""); //A analisar se fica melhor visivelmente com [] ou sem. Ex: Editando [Requerimento] ao invés de Editando Requerimento
  }
}

