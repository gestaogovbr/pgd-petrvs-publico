import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Cliente } from "src/app/models/cliente.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})

export class ClienteFormComponent extends PageFormBase<Cliente, ClienteDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('tipoCliente', { static: false }) public tipoCliente?: InputSearchComponent;

  constructor(public injector: Injector) {
    super(injector, Cliente, ClienteDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      tipo: { default: "" }
    });
  }

  public async loadData(entity: Cliente, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let cliente = (this.util.fillForm(formValue, entity));
    await Promise.all ([
      this.tipoCliente?.loadSearch(entity.tipoCliente || entity.tipo_cliente_id),
    ]);
    form.patchValue(cliente);
  }

  public initializeData(form: FormGroup): void {
    this.loadData(new Cliente(), form);
  }

  public saveData(form: IIndexable): Promise<Cliente> {
    return new Promise<Cliente>((resolve, reject) => {
      const cliente = this.util.fill(new Cliente(), this.entity!);
      resolve(this.util.fillForm(cliente, this.form!.value));
    });
  }

}