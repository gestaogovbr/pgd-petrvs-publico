import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Envio } from 'src/app/models/envio.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'envio-consult',
  templateUrl: './envio-consult.component.html',
  styleUrls: ['./envio-consult.component.scss']
})
export class EnvioConsultComponent extends PageFormBase<Envio, EnvioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  constructor(public injector: Injector) {
    super(injector, Envio, EnvioDaoService);
    this.form = this.fh.FormBuilder({
      erros: {default: ""},
      created_at: {default: null},
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public loadData(entity: Envio, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Envio());
  }

  public saveData(form: IIndexable): Promise<Envio> {
    return new Promise<Envio>((resolve, reject) => {
      const envio = this.util.fill(new Envio(), this.entity!);
      resolve(this.util.fillForm(envio, this.form!.value));
    });
  }

}