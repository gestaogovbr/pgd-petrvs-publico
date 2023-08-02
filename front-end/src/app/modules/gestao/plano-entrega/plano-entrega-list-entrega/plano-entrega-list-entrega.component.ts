import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoEntregaService } from '../plano-entrega.service';

@Component({
  selector: 'plano-entrega-list-entrega',
  templateUrl: './plano-entrega-list-entrega.component.html',
  styleUrls: ['./plano-entrega-list-entrega.component.scss']
})
export class PlanoEntregaListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: PlanoEntregaEntrega | undefined) { super.entity = value; } get entity(): PlanoEntregaEntrega | undefined { return super.entity; }
  @Input() set planejamentoId(value: string | undefined) {
    if(this._planejamentoId != value) {
      this._planejamentoId = value;
      // verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get planejamentoId(): string | undefined {
    return this._planejamentoId;
  }
  @Input() set cadeiaValorId(value: string | undefined) {
    if(this._cadeiaValorId != value) {
      this._cadeiaValorId = value;
      // verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get cadeiaValorId(): string | undefined {
    return this._cadeiaValorId;
  }
  @Input() set unidadeId(value: string | undefined) {
    if(this._unidadeId != value) {
      this._unidadeId = value;
      // verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get unidadeId(): string | undefined {
    return this._unidadeId;
  }

  public get items(): PlanoEntregaEntrega[] {
    if (!this.gridControl.value) this.gridControl.setValue([]);
    return this.gridControl.value;
  }

  private _cadeiaValorId?: string;
  private _planejamentoId?: string;
  private _unidadeId?: string;

  public entityToControl = (value: any) => (value as PlanoEntrega).entregas || [];
  public options: ToolbarButton[] = [];
  public planoEntregaId: string = "";
  public dao: PlanoEntregaEntregaDaoService;
  public planoEntregaService: PlanoEntregaService;

  constructor(public injector: Injector) {
    super(injector);
    this.title = this.lex.translate("Entregas");
    this.join = ["unidade", "entidade", "entrega"];
    this.code = "MOD_PENT_CONS";
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.form = this.fh.FormBuilder({
      descricao: { default: "" },
      inicio: { default: new Date() },
      fim: { default: new Date() },
      meta: { default: "" },
      realizado: { default: null },
      entrega_id: { default: null },
      unidade_id: { default: null },
      progresso_esperado: { default: null },
      progresso_realizado: { default: null },
      destinatario: { default: null },
    }, this.cdRef, this.validate);
    // Testa se o usuário possui permissão para exibir dados do feriado
    if (true || this.auth.hasPermissionTo("")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o feriado
    if (true || this.auth.hasPermissionTo("MOD_FER_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntregaId = this.urlParams!.get("id") || "";
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["plano_entrega_id", "==", this.planoEntregaId]);
    return result;
  }

  public async add() {
    let entrega = new PlanoEntregaEntrega({
      _status: "ADD",
      id: this.dao!.generateUuid(),
      plano_entrega_id: this.entity?.id
    });
    this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega'] }, {
      metadata: {
        plano_entrega: this.entity!,
        planejamento_id: this.planejamentoId,
        cadeia_valor_id: this.cadeiaValorId,
        unidade_id: this.unidadeId,
        entrega: entrega,
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          try {
            this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.dao!.save(modalResult));
            this.cdRef.detectChanges();
          } catch (error: any) {
            this.error(error?.error || error?.message || error);
          }
        };
      }
    });
  }

  public async edit(entrega: PlanoEntregaEntrega) {
    entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(entrega);
    this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega'] }, {
      metadata: {
        plano_entrega: this.entity!,
        planejamento_id: this.planejamentoId,
        cadeia_valor_id: this.cadeiaValorId,
        unidade_id: this.unidadeId,
        entrega: entrega,
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          if (!this.isNoPersist) await this.dao?.save(modalResult);
          this.items[index] = modalResult;
        };
      }
    });
  }

  public async delete(entrega: PlanoEntregaEntrega) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(entrega);
      if (this.isNoPersist) {
        entrega._status = "DELETE";
      } else {
        await this.dao!.delete(entrega);
      };
    }
  }

  public async consult(entrega: PlanoEntregaEntrega) {
    this.go.navigate({route: ['', entrega.id, "consult"]});
  }

}
