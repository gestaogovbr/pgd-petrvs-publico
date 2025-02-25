import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { ProdutoClienteDaoService } from "src/app/dao/produto-cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoCliente } from "src/app/models/produto-cliente.model";
import { Produto } from "src/app/models/produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'produto-list-cliente',
  templateUrl: './produto-list-cliente.component.html',
  styleUrls: ['./produto-list-cliente.component.scss']
})
export class ProdutoListClienteComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('cliente', { static: false }) public cliente?: InputSearchComponent;


  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;
  public clienteDao?: ClienteDaoService;

  public get items(): ProdutoCliente[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoCliente());
    if (!this.gridControl.value.produto_cliente) this.gridControl.value.produto_cliente = [];
    return this.gridControl.value.produto_cliente;
  }

  private _disabled: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoClienteDaoService>(ProdutoClienteDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.clienteDao = injector.get<ClienteDaoService>(ClienteDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      cliente_id: { default: "" },
    }, this.cdRef);
    this.join = ["produtoCliente.cliente.tipoCliente"];
  }


  public async addCliente() {
    return Object.assign(new ProdutoCliente(), {
      _status: "ADD",
      id: this.dao!.generateUuid(),
      cliente_id: '',
    }) as IIndexable;
  }

  public async loadCliente(form: FormGroup, row: any) {
    let cliente: ProdutoCliente = row;
    if (cliente._status != "ADD") {
      form.controls.cliente_id.setValue(row.cliente_id);
    }
  }

  public async removeCliente(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      this.loading = true;
      try {
        this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
      } finally {
        this.loading = false;
      }
      return this.isNoPersist ? false : true; // (*3)
    } else {
      return false;
    }
  }

  public async saveCliente(form: FormGroup, row: any) { 
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {      
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.cliente_id = this.form!.controls.cliente_id.value;
      row.cliente = this.cliente!.selectedEntity;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}