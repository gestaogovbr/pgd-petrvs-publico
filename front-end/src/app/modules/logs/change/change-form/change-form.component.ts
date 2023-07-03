import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
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
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public diferencas: any[] = [];
  
  constructor(public injector: Injector) {
    super(injector, Change, ChangeDaoService);
    this.diferencas = this.entity?.delta || this.diferencas;
    this.form = this.fh.FormBuilder({
      responsavel: {default: ""},
      user_id: {default: ""},
      date_time: {default: null},
      table_name: {default: ""},
      type: {default: ""},
      row_id: {default: ""},
      delta: {default: ""}
    }, this.cdRef);
  }

  public loadData(entity: Change, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.entity?.delta.forEach((value) => { this.diferencas.push([value[0], value[1] instanceof Object ? JSON.stringify(value[1]) : value[1], value[2] instanceof Object ? JSON.stringify(value[2]) : value[2]]); });
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

}