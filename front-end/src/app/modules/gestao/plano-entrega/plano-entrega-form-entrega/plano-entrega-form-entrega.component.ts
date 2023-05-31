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
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { EntregaFormComponent } from 'src/app/modules/cadastros/entrega/entrega-form/entrega-form.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PlanejamentoListObjetivosEntregasComponent } from '../../planejamento-institucional/planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component';
import { PlanoEntregaObjetivo } from 'src/app/models/plano-entrega-objetivo.model';
import { PlanoEntregaProcesso } from 'src/app/models/plano-entrega-processo.model';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { Entrega } from 'src/app/models/entrega.model';

@Component({
  selector: 'plano-entrega-form-entrega',
  templateUrl: './plano-entrega-form-entrega.component.html',
  styleUrls: ['./plano-entrega-form-entrega.component.scss']
})
export class PlanoEntregaFormEntregaComponent extends PageFormBase<PlanoEntregaEntrega, PlanoEntregaEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  // @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('gridProcessos', { static: false }) public gridProcessos?: GridComponent;
  @ViewChild('gridObjetivos', { static: false }) public gridObjetivos?: GridComponent;
  @ViewChild('entregas', { static: false }) public entregas?: EntregaFormComponent;
  @ViewChild('planejamento', { static: false }) public planejamento?: InputSearchComponent;
  @ViewChild('cadeiaValor', { static: false }) public cadeiaValor?: InputSearchComponent;
  @ViewChild('inputObjetivo', { static: false }) public inputObjetivo?: InputSearchComponent;
  @ViewChild('inputProcesso', { static: false }) public inputProcesso?: InputSearchComponent;
  @ViewChild('entrega', { static: false }) public entrega?: InputSearchComponent;
  @ViewChild('demandante', { static: false }) public demandante?: InputSearchComponent;
  
  public planejamentoDao: PlanejamentoDaoService;
  public planejamentoId?: string;
  public cadeiaValorId?: string;
  public formObjetivos: FormGroup;
  public formProcessos: FormGroup;
  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;  
  public planejamentoInstitucionalDao: PlanejamentoDaoService;  
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;  
  public cadeiaValorDao: CadeiaValorDaoService;  
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;

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
    this.join = ['objetivos', 'processos', 'unidade'];
    this.form = this.fh.FormBuilder({
      descricao: {default: ""},
      inicio: { default: new Date() },
      fim: { default: new Date() },
      meta: {default: 100},
      realizado: {default: null},
      plano_entrega_id: {default: ""},
      entrega_pai_id: {default: null},
      entrega_id: {default: null},
      progresso_esperado: {default: 100},
      progresso_realizado: {default: null},
      unidade_id: {default: null},
      destinatario: {default: null},
      objetivos: {default: []},
      processos: {default: []},
      planejamento_id: {default: null},
      cadeia_valor_id: {default: null},
      objetivo_id: {default: null},
      objetivo: {default: null},
    }, this.cdRef, this.validate);
    this.formObjetivos = this.fh.FormBuilder({
      objetivo_id: {default: null},
    }, this.cdRef, this.validate);
    this.formProcessos = this.fh.FormBuilder({
      processo_id: {default: null},
    }, this.cdRef, this.validate);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planejamentoId = this.metadata?.planejamento_id;
    this.cadeiaValorId = this.metadata?.cadeia_valor_id;
    this.entity = this.metadata?.entrega as PlanoEntregaEntrega;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.planejamento?.loadSearch(this.planejamentoId);
      await this.cadeiaValor?.loadSearch(this.cadeiaValorId);
    })();    
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (['progresso_realizado', 'progresso_esperado'].indexOf(controlName) >= 0 && !(control.value >= 0)){
      result = "Obrigatório";
    } else if (['unidade_id'].indexOf(controlName) >= 0&& !control.value?.length){
      result = "O demandante é obrigatório";
    } else if (['entrega_id'].indexOf(controlName) >= 0&& !control.value?.length){
      result = "A entrega é obrigatória";
    }
    if(['inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if(controlName == 'fim' && control.value && !this.dao?.validDateTime(control.value)){
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if(this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) return "A data do início não pode ser maior que a data do fim!";
    return undefined;
  }

  public async loadData(entity: PlanoEntregaEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    //form.controls.planejamento_id.setValue(this.planejamentoId);
    //form.controls.cadeia_valor_id.setValue(this.cadeiaValorId);
  }

  public async initializeData(form: FormGroup){
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve, reject) => {
      let entrega: PlanoEntregaEntrega = this.util.fill(new PlanoEntregaEntrega(), this.entity!);
      this.gridObjetivos?.confirm();
      this.gridProcessos?.confirm();
      entrega = this.util.fillForm(entrega, this.form!.value);
      entrega.objetivos = entrega.objetivos.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      entrega.processos = entrega.processos.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      entrega.unidade = this.demandante?.selectedItem?.entity;
      entrega.entrega = this.entrega?.selectedItem?.entity;
      resolve(new NavigateResult(entrega));
    });
  }

  public checkTipoIndicador(tipos: string[]): boolean {
    return tipos.includes((this.entrega?.selectedItem?.entity as Entrega).tipo_indicador);
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
    if(confirm) row._status = "DELETE";
    return false;
  }

  public async saveObjetivo(form: FormGroup, row: any) {
    let consolidado = row as PlanoEntregaObjetivo;
    if(form!.controls.objetivo_id.value.length && this.inputObjetivo!.selectedItem) {
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
    if(confirm) row._status = "DELETE";
    return false;
  }

  public async saveProcesso(form: FormGroup, row: any) {
    let consolidado = row as PlanoEntregaProcesso;
    if(form!.controls.processo_id.value.length && this.inputProcesso!.selectedItem) {
      consolidado.processo_id = form!.controls.processo_id.value;
      consolidado.processo = this.inputProcesso!.selectedItem!.entity;
      return consolidado;
    }
    return undefined;
  }




}
