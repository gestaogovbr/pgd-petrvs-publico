import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ProdutoClienteDaoService } from "src/app/dao/produto-cliente-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
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


  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;

  public get items(): ProdutoCliente[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoCliente());
    if (!this.gridControl.value.produto_produto) this.gridControl.value.produto_produto = [];
    return this.gridControl.value.produto_produto;
  }

  private _disabled: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoClienteDaoService>(ProdutoClienteDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      cliente_id: { default: "" },
    }, this.cdRef);
    this.join = ["produtoProduto.produtoRelacionado"];
  }

}