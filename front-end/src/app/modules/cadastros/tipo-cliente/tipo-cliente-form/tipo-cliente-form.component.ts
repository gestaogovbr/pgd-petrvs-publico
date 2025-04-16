import { TipoCliente } from "src/app/models/tipo-cliente.model";
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";

@Component({
  selector: 'app-tipo-cliente-form',
  templateUrl: './tipo-cliente-form.component.html',
  styleUrls: ['./tipo-cliente-form.component.scss']
})
export class TipoClienteFormComponent extends PageFormBase<TipoCliente, TipoClienteDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoCliente, TipoClienteDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""}
    }, this.cdRef, this.validate);
    this.title = "Tipo de Cliente";
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

   public loadData(entity: TipoCliente, form: FormGroup): void {
      let formValue = Object.assign({}, form.value);
      form.patchValue(this.util.fillForm(formValue, entity));
    }
  
    public initializeData(form: FormGroup): void {
      form.patchValue(new TipoCliente());
    }
  
    public saveData(form: IIndexable): Promise<TipoCliente> {
      return new Promise<TipoCliente>((resolve, reject) => {
        const tipoCliente = this.util.fill(new TipoCliente(), this.entity!);
        resolve(this.util.fillForm(tipoCliente, this.form!.value));
      });
    }
  
}
