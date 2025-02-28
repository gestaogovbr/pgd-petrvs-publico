import { Component, ViewChild, Input, ChangeDetectorRef, Injector } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { ClienteDaoService } from "src/app/dao/cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoInsumoDaoService } from "src/app/dao/produto-insumo-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoInsumo, ProdutoOrigem } from "src/app/models/produto-insumo.model";
import { Produto } from "src/app/models/produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { LookupItem } from "src/app/services/lookup.service";

@Component({
  selector: 'produto-list-insumo',
  templateUrl: './produto-list-insumo.component.html',
  styleUrls: ['./produto-list-insumo.component.scss']
})
export class ProdutoListInsumoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('produtoRelacionado', { static: false }) public produtoRelacionado?: InputSearchComponent;
  @ViewChild('unidadeInsumo', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('cliente', { static: false }) public cliente?: InputSearchComponent;

  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;
  public unidadeDao?: UnidadeDaoService;
  public clienteDao?: ClienteDaoService;

  public get items(): ProdutoInsumo[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoInsumo());
    if (!this.gridControl.value.produto_insumos) this.gridControl.value.produto_insumos = [];
    return this.gridControl.value.produto_insumos;
  }

  private _disabled: boolean = false;
  public clientes: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoInsumoDaoService>(ProdutoInsumoDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.clienteDao = injector.get<ClienteDaoService>(ClienteDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      origem: { default: 'interna' },
      unidade_insumo_id: { default: null },
      produto_insumo_id: { default: null },
      cliente_id: { default: null },
      descricao: { default: "" },
    }, this.cdRef);
    this.join = [
      "produtoInsumos.produtoRelacionado",
      "produtoInsumos.unidade",
      "produtoInsumos.cliente",
      "produtoInsumos.cliente.tipoCliente"
    ];
  }

  public async addInsumo() {
    return Object.assign(new ProdutoInsumo(), {
      _status: "ADD",
      id: this.dao!.generateUuid(),
      origem: 'interna',
      unidade_insumo_id: '',
      produto_insumo_id: '',
      cliente_id: '',
      descricao: ''
    }) as IIndexable;
  }

  public async loadInsumo(form: FormGroup, row: any) {
    let produto: ProdutoInsumo = row;
    if (produto._status != "ADD") {
      form.controls.origem.setValue(produto.origem);
      form.controls.unidade_insumo_id.setValue(produto.unidade_id);
      form.controls.produto_insumo_id.setValue(produto.produto_insumo_id);
      form.controls.cliente_id.setValue(produto.cliente_id);
      form.controls.descricao.setValue(produto.descricao);
    }
  }

  public async removeInsumo(row: any) {
    let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir?");
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

  public async saveInsumo(form: FormGroup, row: any) { 
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.origem = this.form!.controls.origem.value;
      if (row.origem == ProdutoInsumo.ORIGEM_INTERNA) {
        row.unidade_id        = this.form!.controls.unidade_insumo_id.value;
        row.unidade           = this.unidade?.selectedEntity;
        row.produto_insumo_id = this.form!.controls.produto_insumo_id.value;
        row.produto_relacionado = this.produtoRelacionado?.selectedEntity;
        row.cliente_id        = null;
        row.cliente           = null;
        row.descricao         = null;
      } else {
        row.unidade_id        = null;
        row.unidade           = null;
        row.produto_insumo_id = null;
        row.produto_relacionado = null;
        row.cliente_id        = this.form!.controls.cliente_id.value;
        row.cliente           = this.cliente?.selectedEntity;
        row.descricao         = this.form!.controls.descricao.value;
         
        const cliente = await this.clienteDao?.getById(row.cliente_id, ['tipoCliente']);
        row.cliente.tipo_cliente = cliente?.tipo_cliente;
      }

      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }


  public dynamicButtons(row: ProdutoInsumo): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showInsumo.bind(this) });  
    return result;
  }

  public async showInsumo(row: ProdutoInsumo){
    this.go.navigate({route: ['gestao', 'produto', row.produto_insumo_id, "show"]}, {});    
  }

  public isInterno(origem: ProdutoOrigem = null) {
    return (origem ?? this.form!.controls.origem.value) === ProdutoInsumo.ORIGEM_INTERNA;
  }

  public isExterno(origem: ProdutoOrigem = null) {
    return (origem ?? this.form!.controls.origem.value) === ProdutoInsumo.ORIGEM_EXTERNA;
  }

}