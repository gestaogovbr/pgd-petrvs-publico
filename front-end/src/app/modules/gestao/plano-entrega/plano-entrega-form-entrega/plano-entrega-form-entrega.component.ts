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
import { Unidade } from 'src/app/models/unidade.model';
import { QueryOrderBy } from 'src/app/dao/dao-base.service';
import { Checklist } from 'src/app/models/atividade.model';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';

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
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;

  public planoEntrega?: PlanoEntrega;
  public planejamentoDao: PlanejamentoDaoService;
  public planejamentoId?: string;
  public cadeiaValorId?: string;
  public unidadeId?: string;
  public orderBy?: QueryOrderBy[];
  public formObjetivos: FormGroup;
  public formProcessos: FormGroup;
  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;

  public itensQualitativo: LookupItem[] = [];
  public planejamentoInstitucionalDao: PlanejamentoDaoService;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
  public planoEntregaService: PlanoEntregaService;
  public idsUnidadesAscendentes: string[] = [];
  public checklist: Checklist[] = [];
  public formChecklist: FormGroup;
  public etiquetas: LookupItem[] = [];
  public etiquetasAscendentes: LookupItem[] = [];
  public dataFim?: Date;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.planejamentoInstitucionalDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.modalWidth = 700;
    this.join = [
      "entrega", 
      "objetivos.objetivo", 
      "processos.processo", 
      "produtos.produto"
    ];
    this.form = this.fh.FormBuilder({
      descricao: { default: "" },
      descricao_entrega: { default: "" },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      meta: { default: 100 },
      descricao_meta: { default: "" },
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
      produtos: { default: [] },
      listaQualitativo: { default: [] },
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
      objetivo_id: { default: null },
      objetivo: { default: null },
      checklist: { default: [] },
      etiquetas: { default: [] },
      etiqueta: { default: "" },
    }, this.cdRef, this.validate);
    this.formObjetivos = this.fh.FormBuilder({
      planejamento_objetivo_id: { default: null },
    }, this.cdRef, this.validate);
    this.formProcessos = this.fh.FormBuilder({
      cadeia_processo_id: { default: null },
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: { default: "" },
      texto: { default: "" },
      checked: { default: false }
    }, this.cdRef);
  }

  public ngOnInit() {
    super.ngOnInit();
    let unidade: Unidade | null = null;
    this.planoEntrega = this.metadata?.plano_entrega;
    this.planejamentoId = this.metadata?.planejamento_id;
    this.cadeiaValorId = this.metadata?.cadeia_valor_id;
    this.unidadeId = this.metadata?.unidade_id;
    if (this.metadata?.data_fim) this.dataFim = this.metadata?.data_fim;
    this.entity = this.metadata?.entrega as PlanoEntregaEntrega;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao', 'destinatario'].indexOf(controlName) >= 0) {
      if (!control.value?.length) {
        result = "Obrigatório";
      } else if (this.entrega!.selectedEntity && (this.entrega!.selectedEntity as Entrega).descricao == control.value) {
        result = "É necessário incrementar ou modificar a descrição da entrega";
      }
    } else if (['progresso_realizado', 'realizado'].indexOf(controlName) >= 0 && !(control.value >= 0 || control.value?.length > 0)) {
      result = "Obrigatório";
    } else if (['progresso_esperado', 'meta'].indexOf(controlName) >= 0 && !(control.value > 0 || control.value?.length > 0)) {
      result = "Obrigatório";
    } else if (['unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "A unidade demandante é obrigatória";
    } else if (['entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "A entrega é obrigatória";
    } else if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if (['planejamento_objetivo_id'].indexOf(controlName) >= 0) {
      if (!control.value?.length) result = "O objetivo do planejamento é obrigatório";
      if (control.value?.length && this.gridObjetivos?.items.filter(x => x._status == "ADD").map(x => x.planejamento_objetivo_id).includes(this.formObjetivos.controls.planejamento_objetivo_id.value)) result = "Este objetivo está em duplicidade!";
    } else if (['cadeia_processo_id'].indexOf(controlName) >= 0) {
      if (!control.value?.length) result = "O processo da cadeia de valor é obrigatório";
      if (control.value?.length && this.gridProcessos?.items.map(x => x.cadeia_processo_id).includes(this.formProcessos.controls.cadeia_processo_id.value)) result = "Este processo está em duplicidade!";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let inicio = this.form?.controls.data_inicio.value;
    let fim = this.form?.controls.data_fim.value;
    if (this.gridObjetivos?.editing) {
      this.tabs!.active = "OBJETIVOS";
      return "Salve ou cancele o registro atual em edição";
    }
    if (this.gridProcessos?.editing) {
      this.tabs!.active = "PROCESSOS";
      return "Salve ou cancele o registro atual em edição";
    }
    if (!this.dao?.validDateTime(inicio)) {
      return "Data de início inválida";
    } else if (!this.dao?.validDateTime(fim)) {
      return "Data de fim inválida";
    } else if (inicio > fim) {
      return "A data do fim não pode ser anterior à data do início!";
    } else if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && this.planoEntrega && inicio < this.planoEntrega.data_inicio) {
      return "Data de inicio menor que a data de inicio " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_inicio);
    } else if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && this.planoEntrega && this.planoEntrega.data_fim && fim > this.planoEntrega.data_fim) {
      return "Data de fim maior que a data de fim " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_fim);
    }
    return undefined;
  }

  public async loadData(entity: PlanoEntregaEntrega, form: FormGroup) {
    if(entity.unidade_id == "") entity.unidade_id = this.unidadeId ?? "";    
    let formValue = Object.assign({}, form.value);
    this.onEntregaChange(form.value);
    let { meta, realizado, ...entityWithout } = entity;
    await this.entrega?.loadSearch(entity.entrega || formValue.entrega_id, false);
    await this.unidade?.loadSearch(this.unidadeId);
    await this.planejamento?.loadSearch(this.planejamentoId);
    await this.cadeiaValor?.loadSearch(this.cadeiaValorId);
    let unidade = this.unidadeId?.length ? (await this.unidadeDao.getById(this.unidadeId!) as Unidade) : null;
    this.idsUnidadesAscendentes = unidade?.path?.split('/').slice(1) || [];
    if(unidade) this.idsUnidadesAscendentes.push(unidade.id);
    form.patchValue(this.util.fillForm(formValue, entityWithout));
    form.controls.meta.setValue(this.planoEntregaService.getValor(entity.meta));
    form.controls.realizado.setValue(this.planoEntregaService.getValor(entity.realizado));    
    form.controls.objetivos.setValue(entity.objetivos);
    form.controls.processos.setValue(entity.processos);
    form.controls.produtos.setValue(entity.produtos);
    if (this.dataFim) form.controls.data_fim.setValue(this.dataFim);
    
    await this.loadEtiquetas();
  }

  public async initializeData(form: FormGroup) {
    await this.loadData(this.entity!, form);
  }

  public async onSaveEntrega() {
    let error: any = undefined;
    let save: boolean = true;
    if(this.formValidation) {
      try {
        error = await this.formValidation(this.form!);
      } catch (e: any) {
        error = e; 
      }
    }
    if(this.form!.valid && !error){
      if(this.action == "edit") {
        let entity = (await this.saveData(this.form!.value)).modalResult as PlanoEntregaEntrega;
        let planosImpactados: PlanoTrabalho[] = [];
        entity._status = "EDIT";
        this.loading = true;
        try {
          planosImpactados = await this.planoEntregaDao.planosImpactadosPorAlteracaoEntrega(entity);
        } finally {
          this.loading = false;
        }
        if(planosImpactados.length) {
          let planos = planosImpactados.map(x => this.util.getDateFormatted(x.data_inicio) + " - " + this.util.getDateFormatted(x.data_fim) + " - " + x.unidade?.sigla + ": " + x.usuario?.nome + "\n");
          save = await this.dialog.confirm("Altera assim mesmo?", "Caso prossiga com essa modificação os seguintes planos de trabalho serão repactuados automaticamente:\n\n" + planos + "\n" + "Deseja prosseguir?");
        }
    }
      if(save) await this.onSaveData();
    } else {
      this.form!.markAllAsTouched();
      if(error) this.error(error);
    }
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve, reject) => {
      let entrega: PlanoEntregaEntrega = this.util.fill(new PlanoEntregaEntrega(), this.entity!);
      this.gridObjetivos?.confirm();
      this.gridProcessos?.confirm();
      let { meta, realizado, ...valueWithout } = this.form!.value;
      entrega = this.util.fillForm(entrega, valueWithout);
      entrega.unidade = this.unidade?.selectedEntity;
      entrega.entrega = this.entrega?.selectedEntity;
      entrega.meta = this.planoEntregaService.getEntregaValor(entrega.entrega!, meta);
      entrega.realizado = this.planoEntregaService.getEntregaValor(entrega.entrega!, realizado);
      resolve(new NavigateResult(entrega));
    });
  }

  public onRealizadoChange(value: any, entrega?: Entrega) {
    this.calculaRealizado();
  }

  public calculaRealizado() {
    const meta = this.form?.controls.meta.value;
    const realizado = this.form?.controls.realizado.value;
    if (meta && realizado) {
      let totalRealizado = !isNaN(realizado) ? ((realizado / meta) * 100).toFixed(0) || 0 : 0;
      this.form?.controls.progresso_realizado.setValue(totalRealizado);
    }
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
    if (form!.controls.planejamento_objetivo_id.value.length && this.inputObjetivo!.selectedItem) {
      consolidado.planejamento_objetivo_id = form!.controls.planejamento_objetivo_id.value;
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
    if (form!.controls.cadeia_processo_id.value.length && this.inputProcesso!.selectedItem) {
      consolidado.cadeia_processo_id = form!.controls.cadeia_processo_id.value;
      consolidado.processo = this.inputProcesso!.selectedItem!.entity;
      return consolidado;
    }
    return undefined;
  }

  public async onEntregaChange(row: any) {
    if (this.entrega && this.entrega.selectedItem) {
      const entregaItem = this.entrega?.selectedEntity as Entrega;
      const tipoIndicador = entregaItem.tipo_indicador;
      /**if(!this.form!.controls.descricao.value.length) {
        this.form!.controls.descricao.setValue(entregaItem?.descricao || "");
      }*/
      switch (tipoIndicador) {
        case 'QUALITATIVO':
          this.itensQualitativo = entregaItem.lista_qualitativos || [];
          this.form?.controls.meta.setValue(this.itensQualitativo.length ? this.itensQualitativo[0].key : null);
          this.form?.controls.realizado.setValue(this.itensQualitativo.length ? this.itensQualitativo[0].key : null);
          break;
        case 'VALOR':
          this.form?.controls.meta.setValue('');
          this.form?.controls.realizado.setValue(0);
          break;
        case 'QUANTIDADE':
          this.form?.controls.meta.setValue('');
          this.form?.controls.realizado.setValue(0);
          break;
        case 'PORCENTAGEM':
          this.form?.controls.meta.setValue(100);
          this.form?.controls.realizado.setValue(0);
          break;
        default:
          break;
      }
      //if (entregaItem.etiquetas) this.loadEtiquetas();
      await this.loadEtiquetas();
      if (entregaItem.checklist) this.loadChecklist();
      this.calculaRealizado();
    }
  }

  public async loadEtiquetas() {
    if (!this.etiquetasAscendentes.filter(e => e.data == this.unidade?.selectedEntity?.id).length) {
      let ascendentes =  await this.carregaEtiquetasUnidadesAscendentes(this.unidade?.selectedEntity);
      this.etiquetasAscendentes.push(...ascendentes);
    }
    this.etiquetas = this.util.merge(this.entrega?.selectedEntity?.etiquetas, this.unidade?.selectedEntity?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.etiquetasAscendentes.filter(x => x.data == this.unidade?.selectedEntity?.id), (a, b) => a.key == b.key);
  }

  public async carregaEtiquetasUnidadesAscendentes(unidadeAtual: Unidade) {
    let etiquetasUnidades: LookupItem[] = [];
    unidadeAtual = unidadeAtual ? unidadeAtual : this.auth.unidade!;
    let path = unidadeAtual.path.split("/");
    let unidades = await this.unidadeDao.query({ where: [["id", "in", path]] }).asPromise();
    unidades.forEach(un => {
      etiquetasUnidades = this.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
    });
    etiquetasUnidades.forEach(e => e.data = unidadeAtual.id);
    return etiquetasUnidades;
  }

  public loadChecklist() {
    const modeloEntrega = this.entrega?.selectedEntity as Entrega;
    let checkAdd: Checklist[] = modeloEntrega.checklist.map(a => {
      return {
        id: a.id,
        texto: a.texto,
        checked: false
      } as Checklist;
    });
    this.checklist = checkAdd || [];
    this.form!.controls.checklist.setValue(checkAdd);
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.form!.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.form!.controls.etiqueta.setValue("");
      }
    }
    return result;
  }
}
