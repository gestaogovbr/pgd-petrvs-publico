import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { EntregaFormComponent } from 'src/app/modules/cadastros/entrega/entrega-form/entrega-form.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PlanoEntregaEntregaObjetivo } from 'src/app/models/plano-entrega-entrega-objetivo.model';
import { PlanoEntregaEntregaProcesso } from 'src/app/models/plano-entrega-entrega-processo.model';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { Entrega } from 'src/app/models/entrega.model';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanoEntregaService } from '../plano-entrega.service';

@Component({
  selector: 'plano-entrega-form-entrega',
  templateUrl: './plano-entrega-form-entrega.component.html',
  styleUrls: ['./plano-entrega-form-entrega.component.scss']
})
export class PlanoEntregaFormEntregaComponent extends PageFormBase<PlanoEntregaEntrega, PlanoEntregaEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('gridProcessos', { static: false }) public gridProcessos?: GridComponent;
  @ViewChild('gridObjetivos', { static: false }) public gridObjetivos?: GridComponent;
  @ViewChild('entregas', { static: false }) public entregas?: EntregaFormComponent;
  @ViewChild('planejamento', { static: false }) public planejamento?: InputSearchComponent;
  @ViewChild('cadeiaValor', { static: false }) public cadeiaValor?: InputSearchComponent;
  @ViewChild('inputObjetivo', { static: false }) public inputObjetivo?: InputSearchComponent;
  @ViewChild('inputProcesso', { static: false }) public inputProcesso?: InputSearchComponent;
  @ViewChild('entrega', { static: false }) public entrega?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('tabs', { static: false }) public tabs?: TabsComponent;

  public planoEntrega?: PlanoEntrega;
  public planejamentoDao: PlanejamentoDaoService;
  public planejamentoId?: string;
  public cadeiaValorId?: string;
  public unidadeId?: string;
  public formObjetivos: FormGroup;
  public formProcessos: FormGroup;
  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;
  public itensQualitativo: LookupItem[] = [];
  public planejamentoInstitucionalDao: PlanejamentoDaoService;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
  public planoEntregaService: PlanoEntregaService;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.planejamentoInstitucionalDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.join = ['objetivos', 'processos', 'unidade'];
    this.modalWidth = 600;
    this.form = this.fh.FormBuilder({
      descricao: { default: "" },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      meta: { default: 100 },
      realizado: { default: null },
      plano_entrega_id: { default: "" },
      entrega_pai_id: { default: null },
      entrega_id: { default: null },
      progresso_esperado: { default: 100 },
      progresso_realizado: { default: null },
      unidade_id: { default: null },
      destinatario: { default: null },
      objetivos: { default: [] },
      processos: { default: [] },
      listaQualitativo: { default: [] },
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
      objetivo_id: { default: null },
      objetivo: { default: null },
    }, this.cdRef, this.validate);
    this.formObjetivos = this.fh.FormBuilder({
      objetivo_id: { default: null },
    }, this.cdRef, this.validate);
    this.formProcessos = this.fh.FormBuilder({
      processo_id: { default: null },
    }, this.cdRef, this.validate);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntrega = this.metadata?.plano_entrega;
    this.planejamentoId = this.metadata?.planejamento_id;
    this.cadeiaValorId = this.metadata?.cadeia_valor_id;
    this.unidadeId = this.metadata?.unidade_id;
    this.entity = this.metadata?.entrega as PlanoEntregaEntrega;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.unidade?.loadSearch(this.unidadeId);
      await this.planejamento?.loadSearch(this.planejamentoId);
      await this.cadeiaValor?.loadSearch(this.cadeiaValorId);
    })();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (['progresso_realizado', 'progresso_esperado', 'meta', 'realizado'].indexOf(controlName) >= 0 && !(control.value >= 0 || control.value?.length > 0)) {
      result = "Obrigatório";
    } else if (['unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "O demandante é obrigatório";
    } else if (['entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "A entrega é obrigatória";
    } else if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let inicio = this.form?.controls.data_inicio.value;
    let fim = this.form?.controls.data_fim.value;
    if(this.gridObjetivos?.editing) {
      this.tabs!.active = "OBJETIVOS" ;
      return "Salve ou cancele o registro atual em edição";
    }
    if (this.gridProcessos?.editing) {
      this.tabs!.active = "PROCESSOS";
      return "Salve ou cancele o registro atual em edição";
    }
    if(!this.dao?.validDateTime(inicio)) {
      return "Data de início inválida";
    } else if(!this.dao?.validDateTime(fim)) {
      return "Data de fim inválida";
    } else if(inicio > fim) {
      return "A data do fim não pode ser anterior à data do início!";
    } else if(this.planoEntrega && inicio < this.planoEntrega.data_inicio) {
      return "Data de inicio menor que a data de inicio" + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_inicio);
    } else if(this.planoEntrega && this.planoEntrega.data_fim && fim > this.planoEntrega.data_fim) {
      return "Data de fim maior que a data de fim" + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_fim);
    }
    return undefined;
  }

  public async loadData(entity: PlanoEntregaEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    this.onEntregaChange(form.value);
    let {meta, realizado, ...entityWithout} = entity;
    form.patchValue(this.util.fillForm(formValue, entityWithout));
    form.controls.meta.setValue(this.planoEntregaService.getValor(entity.meta));
    form.controls.realizado.setValue(this.planoEntregaService.getValor(entity.realizado));
  }

  public async initializeData(form: FormGroup) {
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve, reject) => {
      let entrega: PlanoEntregaEntrega = this.util.fill(new PlanoEntregaEntrega(), this.entity!);
      this.gridObjetivos?.confirm();
      this.gridProcessos?.confirm();
      let {meta, realizado, ...valueWithout} = this.form!.value;
      entrega = this.util.fillForm(entrega, valueWithout);
      entrega.objetivos = entrega.objetivos.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      entrega.processos = entrega.processos.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      entrega.unidade = this.unidade?.selectedEntity;
      entrega.entrega = this.entrega?.selectedEntity;
      entrega.meta = this.planoEntregaService.getEntregaValor(entrega.entrega!, meta);
      entrega.realizado = this.planoEntregaService.getEntregaValor(entrega.entrega!, realizado);
      resolve(new NavigateResult(entrega));
    });
  }

  public onRealizadoChange(event: Event) {
    this.calculaRealizado();
  }

  public calculaRealizado() {
    const meta = this.form?.controls.meta.value;
    const realizado = this.form?.controls.realizado.value;
    if (meta && realizado) {
      let totalRealizado = !isNaN(realizado) ? ((realizado / meta) * 100).toFixed(2) || 0 : 0;
      this.form?.controls.progresso_realizado.setValue(totalRealizado);
    }
  }

  public checkTipoIndicador(tipos: string[]): boolean {
    return tipos.includes((this.entrega?.selectedEntity as Entrega).tipo_indicador);
  }

  public dynamicOptionsObjetivos(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    result.push({ label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (objetivo: PlanejamentoObjetivo) => { this.removeObjetivo(objetivo); } });
    return result;
  }

  public dynamicButtonsObjetivos(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    return result;
  }

  public dynamicButtonsProcessos(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let processo: CadeiaValorProcesso = row as CadeiaValorProcesso;
    return result;
  }

  public async addObjetivo() {
    return {
      id: this.dao!.generateUuid(),
      _status: "ADD"
    } as IIndexable;
  }

  public async removeObjetivo(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) row._status = "DELETE";
    return false;
  }

  public async saveObjetivo(form: FormGroup, row: any) {
    let consolidado = row as PlanoEntregaEntregaObjetivo;
    if (form!.controls.objetivo_id.value.length && this.inputObjetivo!.selectedItem) {
      consolidado.objetivo_id = form!.controls.objetivo_id.value;
      consolidado.objetivo = this.inputObjetivo!.selectedItem!.entity;
      return consolidado;
    }
    return undefined;
  }


  public async addProcesso() {
    return {
      id: this.dao!.generateUuid(),
      _status: "ADD"
    } as IIndexable;
  }

  public async removeProcesso(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) row._status = "DELETE";
    return false;
  }

  public async saveProcesso(form: FormGroup, row: any) {
    let consolidado = row as PlanoEntregaEntregaProcesso;
    if (form!.controls.processo_id.value.length && this.inputProcesso!.selectedItem) {
      consolidado.processo_id = form!.controls.processo_id.value;
      consolidado.processo = this.inputProcesso!.selectedItem!.entity;
      return consolidado;
    }
    return undefined;
  }

  public async onEntregaChange(row: any) {
    if (this.entrega && this.entrega.selectedItem) {
      const entregaItem = this.entrega?.selectedEntity as Entrega;
      const tipoIndicador = entregaItem.tipo_indicador;
      if(!this.form!.controls.descricao.value.length) {
        this.form!.controls.descricao.setValue(entregaItem?.descricao || "");
      }
      switch (tipoIndicador) {
        case 'QUALITATIVO':
          this.itensQualitativo = entregaItem.lista_qualitativos || [];
          this.form?.controls.meta.setValue(this.itensQualitativo.length ? this.itensQualitativo[0].key : null);
          this.form?.controls.realizado.setValue(this.itensQualitativo.length ? this.itensQualitativo[0].key : null);
          break;
        case 'VALOR':
          this.form?.controls.meta.setValue(100);
          this.form?.controls.realizado.setValue(0);
          break;
        case 'QUANTIDADE':
          this.form?.controls.meta.setValue(100);
          this.form?.controls.realizado.setValue(0);
          break;
        case 'PORCENTAGEM':
          this.form?.controls.meta.setValue(100);
          this.form?.controls.realizado.setValue(100);
          break;
        default:
          break;
      }
      this.calculaRealizado();
    }
  }
 
}
