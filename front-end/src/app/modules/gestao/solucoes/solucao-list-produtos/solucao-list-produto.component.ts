import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { SolucaoEntregaDaoService } from 'src/app/dao/solucao-entrega-dao.service';
import { SolucaoEntrega } from 'src/app/models/solucao-entrega.model';
import { Solucao } from 'src/app/models/solucao.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { SolucaoService } from '../solucao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { Checklist } from 'src/app/models/atividade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { Base } from 'src/app/models/base.model';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { SolucaoDaoService } from 'src/app/dao/solucao-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'solucao-list-entrega',
  templateUrl: './solucao-list-entrega.component.html',
  styleUrls: ['./solucao-list-entrega.component.scss']
})
export class SolucaoListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() disabled: boolean = false;
  @Input() parent?: PageListBase<Solucao, SolucaoDaoService>;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Solucao | undefined) { super.entity = value; } get entity(): Solucao | undefined { return super.entity; }
  @Input() set planejamentoId(value: string | undefined) {
    if(this._planejamentoId != value) {
      this._planejamentoId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get planejamentoId(): string | undefined {
    return this._planejamentoId;
  }
  @Input() set cadeiaValorId(value: string | undefined) {
    if(this._cadeiaValorId != value) {
      this._cadeiaValorId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planejamento e remove-los
      // será removido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get cadeiaValorId(): string | undefined {
    return this._cadeiaValorId;
  }
  @Input() set unidadeId(value: string | undefined) {
    if(this._unidadeId != value) {
      this._unidadeId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  } get unidadeId(): string | undefined {
    return this._unidadeId;
  }
  @Input() set dataFim(value: Date | undefined) {
    if(this._dataFim != value) {
      this._dataFim = value;
  }
  } get dataFim(): Date | undefined {
    return this._dataFim;
  }
  @Input() execucao: boolean = false;

  public get items(): SolucaoEntrega[] {
    if (!this.gridControl.value) this.gridControl.setValue([]);
    return this.gridControl.value;
  }

  private _cadeiaValorId?: string;
  private _planejamentoId?: string;
  private _unidadeId?: string;
  private _dataFim?: Date;

  public entityToControl = (value: any) => (value as Solucao).entregas || [];
  public options: ToolbarButton[] = [];
  public planoEntregaId: string = "";
  public dao: SolucaoEntregaDaoService;
  public planoEntregaService: SolucaoService;
  public formEdit: FormGroup;
  public etiquetas: LookupItem[] = [];
  public etiquetasAscendentes: LookupItem[] = [];
  public checklist?: Checklist[];
  public selectable: boolean = false;
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.title = this.lex.translate("Entregas");
    this.join = ["unidade", "entrega", "reacoes.usuario:id,nome,apelido"];
    this.code = "MOD_PENT";
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<SolucaoEntregaDaoService>(SolucaoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.planoEntregaService = injector.get<SolucaoService>(SolucaoService);
    this.form = this.fh.FormBuilder({
      descricao: { default: "" },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      meta: { default: "" },
      realizado: { default: null },
      entrega_id: { default: null },
      unidade_id: { default: null },
      progresso_esperado: { default: null },
      progresso_realizado: { default: null },
      destinatario: { default: null },
      etiquetas: { default: [] },
    }, this.cdRef, this.validate);
    this.formEdit = this.fh.FormBuilder({
      progresso_realizado: { default: 0 },
      etiquetas: { default: [] },
      etiqueta: { default: null }
    });
    // Testa se o usuário possui permissão para exibir dados da entrega do plano de entregas
    this.addOption(Object.assign({ onClick: this.consult.bind(this) }, this.OPTION_INFORMACOES), "MOD_PENT");
    this.addOption(Object.assign({ onClick: this.delete.bind(this) }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_EXCL");
    this.addOption(Object.assign({ onClick: this.showLogs.bind(this) }, this.OPTION_LOGS), "MOD_AUDIT_LOG");
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

  public get isDisabled(): boolean {
    return this.formDisabled || this.disabled;
  }

  public async add() {
    let entrega = new SolucaoEntrega({
      _status: "ADD",
      id: this.dao!.generateUuid(),
      plano_entrega_id: this.entity?.id
    });
    this.go.navigate({ route: ['gestao', 'solucao', 'entrega'] }, {
      metadata: {
        plano_entrega: this.entity!,
        planejamento_id: this.planejamentoId,
        cadeia_valor_id: this.cadeiaValorId,
        unidade_id: this.unidadeId,
        data_fim: this.dataFim,
        entrega: entrega,
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          try {
            this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.dao!.save(modalResult, this.join));
            this.cdRef.detectChanges();
          } catch (error: any) {
            this.error(error?.error || error?.message || error);
          }
        };
      }
    });
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    return !this.execucao && !this.isDisabled ? this.options : [];
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    const btns = [];
    if(this.isDisabled) btns.push(Object.assign({ onClick: this.consult.bind(this) }, this.OPTION_INFORMACOES));
    if(this.execucao) btns.push({ label: "Histórico de execução", icon: "bi bi-activity", color: 'btn-outline-info', onClick: this.showProgresso.bind(this) });   
    if(!row._status) btns.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });   
    return btns;
  }

  public async edit(entrega: SolucaoEntrega) {
    if(this.execucao) {
      this.grid!.edit(entrega);
    } else {
      entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
      let index = this.items.indexOf(entrega);
      this.go.navigate({ route: ['gestao', 'solucao', 'entrega'] }, {
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
  }

  public async load(form: FormGroup, row: any) {
    this.form!.patchValue(row);
    this.form!.controls.meta.setValue(this.planoEntregaService.getValor(row.meta));
    this.form!.controls.realizado.setValue(this.planoEntregaService.getValor(row.realizado));
    this.cdRef.detectChanges();
  }

  public async save(form: FormGroup, row: any) {    
    let result = undefined;
    this.form!.markAllAsTouched();
    if (form.valid) {
      this.submitting = true;
      try {
        result = await this.dao?.update(row.id, {
          realizado: this.planoEntregaService.getEntregaValor(row.entrega, form.controls.realizado.value),
          progresso_realizado: form.controls.progresso_realizado.value
        }, this.join);
      } finally {
        this.submitting = false;
      }
    }
    return result;
  }

  public async delete(entrega: SolucaoEntrega) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(entrega);
      if (this.isNoPersist) {
        entrega._status = "DELETE";
      } else {
        this.dao!.delete(entrega).then(() => {
          //this.grid!.query!.removeId(entrega.id);
          this.items.splice(index, 1);
          this.cdRef.detectChanges();
          this.dialog.topAlert("Registro excluído com sucesso!", 5000);
        }).catch((error) => {
          this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
        });;
      };
    }
    
  }

  public async consult(entrega: SolucaoEntrega) {
    this.go.navigate({route: ['gestao', 'solucao', 'entrega', entrega.id, "consult"]}, {
      metadata: {
        plano_entrega: this.entity!,
        planejamento_id: this.planejamentoId,
        cadeia_valor_id: this.cadeiaValorId,
        unidade_id: this.unidadeId,
        entrega: entrega
      }
    });
  }

  public async showLogs(entrega: SolucaoEntrega){
    this.go.navigate({ route: ['logs', 'change', entrega.id, 'consult'] })
  }

  public async showPlanejamento(objetivo_id: string){
    this.go.navigate({route: ['gestao', 'solucao', 'entrega', 'objetivos', objetivo_id]}, { modal: true });
  }

  public async showCadeiaValor(processo_id: string){
    this.go.navigate({route: ['gestao', 'solucao', 'entrega', 'processos', processo_id]}, {modal: true});  
  }

  public async showProgresso(entrega: SolucaoEntrega){
    this.go.navigate({route: ['gestao', 'solucao', 'entrega', 'progresso', entrega.id]}, {
      modal: true, 
      modalClose: (modalResult) => { 
        this.parent?.refresh(this.entity?.id);
      }
    });
  }

  public async showDetalhes(entrega: SolucaoEntrega){
    this.go.navigate({route: ['gestao', 'solucao', 'entrega', entrega.id, "detalhes"]}, {
      metadata: {
        plano_entrega: this.entity!,
        planejamento_id: this.planejamentoId,
        cadeia_valor_id: this.cadeiaValorId,
        unidade_id: this.unidadeId,
        entrega: entrega
      }
    });    
  }

  public refreshComentarios(modalResult: any) {
    /* Atualiza os comentários após ser salvo pela própria tela de comentarios (persistent) */
    let row: SolucaoEntrega | undefined = this.items.find(x => x.id == modalResult.id);
    if(row) row.comentarios = modalResult.comentarios || [];
  }

  public onRealizadaChange() {
    const meta = this.form?.controls.meta.value;
    const realizado = this.form?.controls.realizado.value;
    if (meta && realizado) {
      let totalRealizado = !isNaN(realizado) ? ((realizado / meta) * 100).toFixed(0) || 0 : 0;
      this.form?.controls.progresso_realizado.setValue(totalRealizado);
    }
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.formEdit.controls.etiqueta.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.formEdit.controls.etiqueta.setValue(null);
      }
    }
    return result;
  };

  public async onColumnEtiquetasEdit(row: any) {
    if (!this.etiquetasAscendentes.filter(e => e.data == row.unidade.id).length) {
      let ascendentes =  await this.carregaEtiquetasUnidadesAscendentes(row.unidade);
      this.etiquetasAscendentes.push(...ascendentes);
    }
    this.formEdit.controls.etiquetas.setValue(row.etiquetas);
    this.formEdit.controls.etiqueta.setValue(null);
    this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.etiquetasAscendentes.filter(x => x.data == row.unidade.id), (a, b) => a.key == b.key);
  }

  public async carregaEtiquetasUnidadesAscendentes(unidadeAtual: Unidade) {
    let etiquetasUnidades: LookupItem[] = [];
    let path = unidadeAtual.path.split("/");
    let unidades = await this.unidadeDao.query({ where: [["id", "in", path]] }).asPromise();
    unidades.forEach(un => {
      etiquetasUnidades = this.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
    });
    etiquetasUnidades.forEach(e => e.data = unidadeAtual.id);
    return etiquetasUnidades;
  }

  public async onColumnEtiquetasSave(row: any) {
    try {
      const saved = await this.dao!.update(row.id, {
        etiquetas: this.formEdit.controls.etiquetas.value
      });
      row.etiquetas = this.formEdit.controls.etiquetas.value;
      return !!saved;
    } catch (error) {
      return false;
    }
  }

  public onEtiquetaConfigClick() {
    this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario!.id], params: { etiquetas: true } }, {
      modal: true, modalClose: (modalResult) => {
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
        this.cdRef.detectChanges();
      }
    });
  }

  public async onColumnChecklistEdit(row: any) {
    this.formEdit.controls.progresso_realizado.setValue(row.progresso_realizado);
    this.checklist = this.util.clone(row.checklist);
  }

  public async onColumnChecklistSave(row: any) {
    let realizado = Math.round(parseInt(this.planoEntregaService.getValorMeta(row)) * this.formEdit.controls.progresso_realizado.value/100);
    try {
      const saved = await this.dao!.update(row.id, {
        progresso_realizado: this.formEdit.controls.progresso_realizado.value,
        realizado: this.planoEntregaService.getEntregaValor(row.entrega, realizado),
        checklist: this.checklist
      });
      row.progresso_realizado = this.formEdit.controls.progresso_realizado.value;
      row.checklist = this.checklist;
      if (typeof row.realizado.porcentagem != "undefined") {
        row.realizado.porcentagem = realizado;
      } else if (typeof row.realizado.quantitativo != "undefined") {
        row.realizado.quantitativo = realizado;
      } else if (typeof row.realizado.valor != "undefined") {
        row.realizado.valor = realizado;
      };
      return !!saved;
    } catch (error) {
      return false;
    }
  }
  
  public getObjetivos(row: any){
    return row.objetivos.filter((x: any) => x._status != 'DELETE');
  }
}
