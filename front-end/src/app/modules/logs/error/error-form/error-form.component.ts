import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ErrorDaoService } from 'src/app/dao/error-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Error } from 'src/app/models/error.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss']
})
export class ErrorFormComponent extends PageFormBase<Error, ErrorDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  constructor(public injector: Injector) {
    super(injector, Error, ErrorDaoService);
    this.form = this.fh.FormBuilder({
      message: {default: ""},
      data: {default: ""},
      trace: {default: ""},
      user_id: {default: ""},
      user_email: {default: ""},
      user_nome: {default: ""},
      date_time: {default: null},
      type: {default: ""}
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public loadData(entity: Error, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Error());
  }

  public saveData(form: IIndexable): Promise<Error> {
    return new Promise<Error>((resolve, reject) => {
      const error = this.util.fill(new Error(), this.entity!);
      resolve(this.util.fillForm(error, this.form!.value));
    });
  }

}