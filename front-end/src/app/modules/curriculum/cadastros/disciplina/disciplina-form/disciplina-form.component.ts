import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { Disciplina } from 'src/app/models/disciplina.model';
import { DisciplinaDaoService } from 'src/app/dao/disciplina-dao.service';

@Component({
  selector: 'disciplina-form',
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.scss']
})
export class DisciplinaFormComponent extends PageFormBase<Disciplina, DisciplinaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('curso', { static: false }) public curso?: InputSelectComponent;

  public cursoDao?: CursoDaoService;
  public cursos: LookupItem[] = [];
  public titulo: LookupItem[] = [];
  public cursoWhere: any[] = [["id", "==", null]];

  constructor(public injector: Injector) {
    super(injector, Disciplina, DisciplinaDaoService);
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.join = [];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      sigla: { default: "" },
      ativo: { default: true },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome', 'sigla'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Disciplina, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Disciplina());
  }

  public saveData(form: IIndexable): Promise<Disciplina> {
    return new Promise<Disciplina>((resolve, reject) => {
      const disciplina = this.util.fill(new Disciplina(), this.entity!);
      resolve(this.util.fillForm(disciplina, this.form!.value));
    });
  }

  public titleEdit = (entity: Disciplina): string => {
    return "Editando " + (entity?.nome || "");
  }
}
