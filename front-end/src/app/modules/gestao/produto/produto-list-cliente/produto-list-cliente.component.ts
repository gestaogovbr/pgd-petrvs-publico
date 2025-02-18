import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { ProdutoClienteDaoService } from "src/app/dao/produto-cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoCliente } from "src/app/models/produto-cliente.model";
import { Cliente } from "src/app/models/cliente.model";
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
  @ViewChild('tipoCliente', { static: false }) public tipoCliente?: InputSelectComponent;
  @ViewChild('cliente', { static: false }) public cliente?: InputSelectComponent;
  @ViewChild('unidade_relacionada', { static: false }) public unidade_relacionada?: InputSearchComponent;


  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;
  public clienteDao?: ClienteDaoService;
  public tipoClienteDao?: TipoClienteDaoService;
  public unidadeDao?: UnidadeDaoService;

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
    this.tipoClienteDao = injector.get<TipoClienteDaoService>(TipoClienteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      cliente_id: { default: "" },
      tipo_cliente_id: { default: "" },
      unidade_id: { default: "" },
      outro: { default: "" },
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

  public async loadCliente(form: FormGroup, entity: ProdutoCliente) {
    form.patchValue(this.util.fillForm(form, entity));
    if (entity._status != "ADD") {
      form.controls.cliente_id.setValue(entity.cliente_id);
      form.controls.tipo_cliente_id.setValue(entity.cliente?.tipo_cliente_id);
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
    this.entity!._metadata = this.entity!._metadata || {};
    this.entity!._metadata.produtoCliente = row as ProdutoCliente;
    if(this.form!.valid) {     
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;

      // se o tipo cliente for diferente de Administração Pública e Público externo
      if(this.tipoCliente?.selectedItem && ['Administração Pública', 'Público externo'].includes(this.tipoCliente.selectedItem.value)) {
        row.cliente_id = this.form!.controls.cliente_id.value;
        row.cliente = {
          ...this.cliente!.selectedItem,
          tipo_cliente_id: this.tipoCliente!.selectedItem!.key,
          nome: this.cliente!.selectedItem!.value,
          tipo_cliente: {
            nome: this.tipoCliente!.selectedItem!.value
          }
        };
        
      } else if(this.tipoCliente?.selectedItem?.value == 'Outros') {
        const queryResult = await this.clienteDao?.query({ where: [['nome', '==', this.form!.controls.outro.value]], join: ['tipoCliente'] }).asPromise();
        const cliente: Cliente[] = queryResult ? queryResult as unknown as Cliente[] : [];
        if(cliente && cliente.length > 0) {
          row.cliente_id = cliente[0].id;
          row.cliente = cliente[0];
        } else {
          const novoCliente = new Cliente();
          novoCliente.id = this.clienteDao!.generateUuid();
          novoCliente.nome = this.form!.controls.outro.value;
          novoCliente.tipo_cliente_id = this.tipoCliente?.selectedItem?.key;
          const cliente = await this.clienteDao?.save(novoCliente, ['tipoCliente']);
          if (cliente) {   
            row.cliente_id = cliente.id;
            row.outro = cliente.nome;
            row.cliente = cliente;
          }
        } 
      } else if(this.tipoCliente?.selectedItem?.value == 'Unidade de órgão/entidade') {
        const queryResult = await this.clienteDao?.query({ where: [['unidade_id', '==', this.form!.controls.unidade_id.value]], join: ['tipoCliente'] }).asPromise();
        const cliente: Cliente[] = queryResult ? queryResult as unknown as Cliente[] : [];
        if(cliente && cliente.length > 0) {
          row.cliente_id = cliente[0].id;
          row.cliente = cliente[0];
        } else {
          const novoCliente = new Cliente();
          novoCliente.id = this.clienteDao!.generateUuid();
          novoCliente.unidade_id = this.form!.controls.unidade_id.value;
          novoCliente.nome = this.unidade_relacionada?.selectedEntity?.nome;
          novoCliente.tipo_cliente_id = this.tipoCliente?.selectedItem?.key;
          const cliente = await this.clienteDao?.save(novoCliente, ['tipoCliente']);
          if (cliente) {            
            row.cliente_id = cliente.id;
            row.unidade_id = cliente.unidade_id;
            row.cliente = cliente;
          }
        }
      }
    
      this.entity!._metadata.produtoCliente.cliente = row.cliente;
      console.log(row);
      
      this.cdRef.detectChanges();
    }
    return this.entity!._metadata.produtoCliente;
  }

  changeTipoCliente() {
    console.log(this.tipoCliente?.selectedItem);
    
  }

}