import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Change } from 'src/app/models/change.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss']
})
export class ChangeFormComponent extends PageFormBase<Change, ChangeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;


  constructor(public injector: Injector) {
    super(injector, Change, ChangeDaoService);

    this.form = this.fh.FormBuilder({
      usuario: {default: ""},
      data_hora: {default: null},
      tabela: {default: ""},
      tipo: {default: ""}
    }, this.cdRef);
  }

  public loadData(entity: Change, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Change());
  }

  public saveData(form: IIndexable): Promise<Change> {
    return new Promise<Change>((resolve, reject) => {
      const change = this.util.fill(new Change(), this.entity!);
      resolve(this.util.fillForm(change, this.form!.value));
    });
  }

  public titleEdit = (entity: Change): string => {
    return "Editando Registro de Log";
  }
}
