import { Component, ViewChild, Input, ChangeDetectorRef, Injector } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoProdutoDaoService } from "src/app/dao/produto-produto-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoProduto } from "src/app/models/produto-produto.model";
import { Produto } from "src/app/models/produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'produto-list-produto',
  templateUrl: './produto-list-produto.component.html',
  styleUrls: ['./produto-list-produto.component.scss']
})
export class ProdutoListProdutoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('produtoRelacionado', { static: false }) public produtoRelacionado?: InputSelectComponent;

  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;

  public get items(): ProdutoProduto[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoProduto());
    if (!this.gridControl.value.produto_produto) this.gridControl.value.produto_produto = [];
    return this.gridControl.value.produto_produto;
  }

  private _disabled: boolean = false;


  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoProdutoDaoService>(ProdutoProdutoDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      produto_id: { default: null },
      tipo: { default: "" },
    }, this.cdRef);
    this.join = ["produtoProduto.produtoRelacionado"];
  }

  public async addProduto() {
    return Object.assign(new ProdutoProduto(), {
      _status: "ADD",
      id: this.dao!.generateUuid(),
      produto_id: '',
    }) as IIndexable;
  }

  public async loadProduto(form: FormGroup, row: any) {
    let produto: ProdutoProduto = row;
    if (produto._status != "ADD") {
      form.controls.produto_id.setValue(row.produto_id);
      form.controls.tipo.setValue(row.tipo);
    }
  }

  public async removeProduto(row: any) {
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

  public async saveProduto(form: FormGroup, row: any) { 
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.produto_id = this.form!.controls.produto_id.value;
      row.tipo = this.form!.controls.tipo.value;
      row.produto_relacionado = this.produtoRelacionado!.selectedItem?.data;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}