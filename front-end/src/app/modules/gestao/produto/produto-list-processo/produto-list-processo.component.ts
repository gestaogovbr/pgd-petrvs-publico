import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { GridComponent } from "src/app/components/grid/grid.component";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { InputSelectComponent } from "src/app/components/input/input-select/input-select.component";
import { CadeiaValorDaoService } from "src/app/dao/cadeia-valor-dao.service";
import { CadeiaValorProcessoDaoService } from "src/app/dao/cadeia-valor-processo-dao.service";
import { ProdutoProcessoDaoService } from "src/app/dao/produto-processo-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { CadeiaValorProcesso } from "src/app/models/cadeia-valor-processo.model";
import { ProdutoProcesso } from "src/app/models/produto-processo.model";
import { Produto } from "src/app/models/produto.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { LookupItem } from "src/app/services/lookup.service";

@Component({
  selector: 'produto-list-processo',
  templateUrl: './produto-list-processo.component.html',
  styleUrls: ['./produto-list-processo.component.scss']
})
export class ProdutoListProcessoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('cadeiaValor', { static: false }) public cadeiaValor?: InputSearchComponent;
  @ViewChild('cadeiaProcesso', { static: false }) public cadeiaProcesso?: InputSelectComponent;

  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Produto | undefined) { super.entity = value; } get entity(): Produto | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;

  public get items(): ProdutoProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new ProdutoProcesso());
    if (!this.gridControl.value.produto_processo_cadeia_valor) this.gridControl.value.produto_processo_cadeia_valor = [];
    return this.gridControl.value.produto_processo_cadeia_valor;
  }

  public cadeiaValorDao?: CadeiaValorDaoService;
  public processosDao?: CadeiaValorProcessoDaoService;
  public processos: LookupItem[] = [];
  
  private _disabled: boolean = false;


  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProdutoProcessoDaoService>(ProdutoProcessoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.processosDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);

    this.form = this.fh.FormBuilder({
      cadeia_valor_processo_id: { default: null },
      cadeia_valor_id: { default: null }
    }, this.cdRef);
    this.join = ["cadeiaValorProcesso.cadeiaValor"];
  }

  async ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
  }

  public async addProcesso() {
    return Object.assign(new ProdutoProcesso(), {
      _status: "ADD",
      id: this.dao!.generateUuid(),
      cadeia_valor_processo_id: '',
    }) as IIndexable;
  }

  public async loadProcesso(form: FormGroup, row: any) {
    let processo: ProdutoProcesso = row;
    if (processo._status != "ADD") {
      form.controls.cadeia_valor_id.setValue(row.cadeia_valor_processo.cadeia_valor.id);
      form.controls.cadeia_valor_processo_id.setValue(row.cadeia_valor_processo.id);    
    }
  }

  public async removeProcesso(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      this.loading = true;
      try {
        this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
      } finally {
        this.loading = false;
        //this.atualizaPlanoTrabalhoEvent.emit(this.entity!.id);
      }
      return this.isNoPersist ? false : true; // (*3)
    } else {
      return false;
    }
  }

  public async saveProcesso(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.cadeia_valor_processo = this.cadeiaProcesso!.selectedItem?.data;
      row.cadeia_valor_processo.cadeia_valor = this.cadeiaValor!.selectedEntity;
      row.cadeia_valor_processo_id = this.form!.controls.cadeia_valor_processo_id.value;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
    
  }

  public saveEndProcesso(row: any) {
    
  }

  public async onCadeiaChange(row: any) {
    this.cdRef.detectChanges();
    this.loadProcessoCadeiaValor();
  }


  public loadProcessoCadeiaValor() {
    try {
      let cadeia_valor_id = this.form!.controls.cadeia_valor_id.value;
      this.processosDao?.query({ where: [["cadeia_valor_id", "=", cadeia_valor_id]] }).asPromise().then((data) => {
        this.processos = data.map((item) => {
          return { key: item.id, value: item.nome, data: item };
        });
      });
    } catch (error) {
      console.error('Error loading processo cadeia valor:', error);
      this.processos = [];
    }
  }
}