import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { TarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Tarefa } from 'src/app/models/tipo-tarefa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.scss']
})
export class TarefaFormComponent extends PageFormBase<Tarefa, TarefaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public entidadeDao: EntidadeDaoService;
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Tarefa, TarefaDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.modalWidth = 1100;
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tempo_estimado: {default: 0},
      documental: {default: false},
      comentario_predefinido: {default: ""},
      unidade_id: {default: null},
      entidade_id: {default: null}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Tarefa, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Tarefa());
  }

  public saveData(form: IIndexable): Promise<Tarefa> {
    return new Promise<Tarefa>((resolve, reject) => {
      const tarefa = this.util.fill(new Tarefa(), this.entity!);
      resolve(this.util.fillForm(tarefa, this.form!.value));
    });
  }

  public titleEdit = (entity: Tarefa): string => {
    return "Editando "+ (entity?.nome || "");
  }
}

