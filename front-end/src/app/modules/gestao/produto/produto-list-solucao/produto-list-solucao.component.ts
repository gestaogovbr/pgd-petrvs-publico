import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { ProdutoSolucaoDaoService } from "src/app/dao/produto-solucao-dao.service";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { SolucaoUnidadeDaoService } from "src/app/dao/solucao-unidade-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { ProdutoSolucao } from "src/app/models/produto-solucao.model";
import { Produto } from "src/app/models/produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'produto-list-solucao',
  templateUrl: './produto-list-solucao.component.html',
  styleUrls: ['./produto-list-solucao.component.scss']
})
export class ProdutoListSolucaoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('solucao', { static: false }) public solucao?: InputSearchComponent;

  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public produtoDao?: ProdutoDaoService;
  public solucaoDao?: SolucaoDaoService;
  public solucaoUnidadeDao?: SolucaoUnidadeDaoService;

  public get items(): ProdutoSolucao[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoSolucao());
    if (!this.gridControl.value.produto_solucoes) this.gridControl.value.produto_solucoes = [];
    return this.gridControl.value.produto_solucoes;
  }

  private _disabled: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoSolucaoDaoService>(ProdutoSolucaoDaoService);
    this.produtoDao = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.solucaoDao = injector.get<SolucaoDaoService>(SolucaoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      solucao_id: { 
        default: "",
        async: true
      },
    }, this.cdRef, undefined, this.asyncValidate);
    this.join = ["produtoSolucao.solucao"];
  }

  public asyncValidate = async (control: AbstractControl, controlName: string): Promise<string | null> => {
    let result = null;

    if (['solucao_id'].indexOf(controlName) >= 0) {
        if (!control.value?.length) {
            result = "Obrigatório";
        } else {
            const isDuplicate = this.items.some(item => item.solucao_id === control.value);

            if (isDuplicate) {
                result = 'Solução já inserida neste Produto';
            } else {
                try {
                    const solucao = await this.solucaoDao?.getById(control.value);
                    const solucaoUnidade = await this.solucaoUnidadeDao?.getOne(control.value, this.entity?.unidade?.id as string).asPromise();
  
                    console.log(solucaoUnidade);
                    if (!solucaoUnidade || !solucaoUnidade[0] || !solucaoUnidade[0].status) {
                      result = 'Solução inativa não pode ser usada';
                    }
                } catch (error) {
                    result = 'Erro ao verificar a Solução';
                }
            }
        }
    }

    return result;
  }

  public async addSolucao() {
    return Object.assign(new ProdutoSolucao(), {
      _status: "ADD",
      id: this.dao!.generateUuid(),
      solucao_id: '',
    }) as IIndexable;
  }

  public async loadSolucao(form: FormGroup, row: any) {
    let solucao: ProdutoSolucao = row;
    if (solucao._status != "ADD") {
      form.controls.solucao_id.setValue(row.solucao_id);
    }
  }

  public async removeSolucao(row: any) {
    let confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir a Solução?");
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

  public async saveSolucao(form: FormGroup, row: any) { 
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.solucao_id = this.form!.controls.solucao_id.value;
      row.solucao = this.solucao!.selectedEntity;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}