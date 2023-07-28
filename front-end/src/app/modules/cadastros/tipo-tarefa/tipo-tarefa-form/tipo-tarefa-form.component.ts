import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoTarefa } from 'src/app/models/tipo-tarefa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'tipo-tarefa-form',
  templateUrl: './tipo-tarefa-form.component.html',
  styleUrls: ['./tipo-tarefa-form.component.scss']
})
export class TipoTarefaFormComponent extends PageFormBase<TipoTarefa, TipoTarefaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoTarefa, TipoTarefaDaoService);
    this.modalWidth = 1100;
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tempo_estimado: {default: 0},
      documental: {default: false},
      comentario_predefinido: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: TipoTarefa, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoTarefa());
  }

  public saveData(form: IIndexable): Promise<TipoTarefa> {
    return new Promise<TipoTarefa>((resolve, reject) => {
      const tarefa = this.util.fill(new TipoTarefa(), this.entity!);
      resolve(this.util.fillForm(tarefa, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoTarefa): string => {
    return "Editando "+ (entity?.nome || "");
  }
}

