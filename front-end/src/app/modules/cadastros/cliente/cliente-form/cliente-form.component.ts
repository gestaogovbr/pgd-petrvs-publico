import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { SelectItem } from "src/app/components/input/input-base";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";
import { InputTextComponent } from "src/app/components/input/input-text/input-text.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Cliente } from "src/app/models/cliente.model";
import { TipoCliente } from "src/app/models/tipo-cliente.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { LookupItem } from "src/app/services/lookup.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})

export class ClienteFormComponent extends PageFormBase<Cliente, ClienteDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('tipoCliente', { static: false }) public tipoCliente?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('nome', { static: false }) public nome?: InputTextComponent;

  public tipoClienteDao?: TipoClienteDaoService;
  public tiposCliente: LookupItem[] = [];
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Cliente, ClienteDaoService);
    this.tipoClienteDao = injector.get<TipoClienteDaoService>(TipoClienteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      tipo_cliente_id: { default: "" },
      unidade_id: { default: null }
    });
  }

  public async loadData(entity: Cliente, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let cliente = (this.util.fillForm(formValue, entity));
    const tiposCliente = await this.tipoClienteDao!.query({where: [['id', '!=', "c28122f5-708d-11ef-8e76-0242ac1c0002"]]}).getAll();
    this.tiposCliente = tiposCliente.map(tipo => ({ key: tipo.id, value: tipo.nome }));
 
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


  alteraTipo() {
    
    let tipo = this.tipoCliente?.value;
    if(tipo == "c28122f5-708d-11ef-8e76-0242ac1c0002"){
      // exibir unidade e esconder nome
      this.unidade?.selfElement?.nativeElement.classList.remove("d-none");
      this.nome?.selfElement?.nativeElement.classList.add("d-none");
    } else {
      // exibir nome e esconder unidade
      this.form?.controls.unidade_id.setValue(null);
      this.unidade?.selfElement?.nativeElement.classList.add("d-none");
      this.nome?.selfElement?.nativeElement.classList.remove("d-none");
    }
    
  }

  selecionaUnidade(event: SelectItem) {
    this.form?.controls.nome.setValue(event.entity?.nome);
  }

}