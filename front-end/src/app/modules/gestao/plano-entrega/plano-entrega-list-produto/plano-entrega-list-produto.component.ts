import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { PlanoEntregaEntregaProdutoDaoService } from "src/app/dao/plano-entrega-entrega-produto-dao.service";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { PlanoEntregaEntregaProduto } from "src/app/models/plano-entrega-entrega-produto.model";
import { PlanoEntregaEntrega } from "src/app/models/plano-entrega-entrega.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'plano-entrega-list-produto',
  templateUrl: './plano-entrega-list-produto.component.html',
  styleUrls: ['./plano-entrega-list-produto.component.scss']
})
export class PlanoEntregaListProdutoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('produto', { static: false }) public produto?: InputSearchComponent;

  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: PlanoEntregaEntrega | undefined) { super.entity = value; } get entity(): PlanoEntregaEntrega | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;
  @Input() edit: boolean = false;

  public produtoDao?: ProdutoDaoService;

  public get items(): PlanoEntregaEntregaProduto[] {
    if (!this.gridControl.value) this.gridControl.setValue(new PlanoEntregaEntregaProduto());
    if (!this.gridControl.value.produtos) this.gridControl.value.produtos = [];
    return this.gridControl.value.produtos;
  }

  private _disabled: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoEntregaEntregaProdutoDaoService>(PlanoEntregaEntregaProdutoDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      produto_id: { 
        default: "",
        async: true
      },
    }, this.cdRef, undefined, this.asyncValidate);
    this.join = ["produto"];
  }

  public asyncValidate = async (control: AbstractControl, controlName: string): Promise<string | null> => {
    let result = null;

    if (['produto_id'].indexOf(controlName) >= 0) {
        if (!control.value?.length) {
            result = "Obrigatório";
        } else {
            const isDuplicate = this.items.some(item => item.produto_id === control.value);

            if (isDuplicate) {
                result = 'Produto já inserido nesta entrega';
            } else {
                try {
                    const produto = await this.produtoDao?.getById(control.value);
                    if (!produto?.data_ativado && produto?.data_desativado) {
                      result = 'Produto inativo não pode ser usado';
                    }
                } catch (error) {
                    result = 'Erro ao verificar o produto';
                }
            }
        }
    }

    return result;
  }

  public async addProduto() {
    return {
      id: this.dao!.generateUuid(),
      _status: "ADD"
    } as IIndexable;
  }

  public async loadProduto(form: FormGroup, row: any) {
    let produto: PlanoEntregaEntregaProduto = row;
    if (produto._status != "ADD") {
      form.controls.entrega_id.setValue(row.entrega_id);
    }
  }

  public async removeProduto(row: any) {
    let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir o Produto?");
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
      row.produto = this.produto!.selectedEntity;
      result = row;
      console.log(row);
      this.cdRef.detectChanges();
    }
    return result;
  }

}