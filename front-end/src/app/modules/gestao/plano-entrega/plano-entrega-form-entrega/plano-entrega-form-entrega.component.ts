import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CadeiaValorListProcessosComponent } from '../../cadeia-valor/cadeia-valor-list-processos/cadeia-valor-list-processos.component';
import { Entrega } from 'src/app/models/entrega.model';
import { EntregaFormComponent } from 'src/app/modules/cadastros/entrega/entrega-form/entrega-form.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';

@Component({
  selector: 'plano-entrega-form-entrega',
  templateUrl: './plano-entrega-form-entrega.component.html',
  styleUrls: ['./plano-entrega-form-entrega.component.scss']
})
export class PlanoEntregaFormEntregaComponent extends PageFormBase<PlanoEntregaEntrega, PlanoEntregaEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('entregas', { static: false }) public entregas?: EntregaFormComponent;
  gridControl: any;

  public get itemsObjetivos(): PlanejamentoObjetivo[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
    if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
    return this.gridControl.value.objetivos;
  }
  public get itemsProcessos(): CadeiaValorProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];
    return this.gridControl.value.processos;
  }

  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;  
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;

  constructor(public injector: Injector) { 
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      descricao: {default: ""},
      tipo_indicador: {default: ""},
      lista_qualitativos: {default: ""},
      itemQualitativo: {default: ""},
      inicio: { default: new Date() },
      fim: { default: new Date() },
      dt_inicio_processos: { default: new Date() },
      dt_fim_processos: { default: new Date() },
      dt_inicio_objetivos: { default: new Date() },
      dt_fim_objetivos: { default: new Date() },
      meta: {default: ""},
      realizado: {default: null},
      plano_entrega_id: {default: ""},
      entrega_id: {default: null},
      progresso_esperado: {default: null},
      progresso_realizado: {default: null},
      descricao_meta: {default: null},
      unidade_id: {default: null},
      destinatario: {default: null},
      objetivos: {default: null},
      processos: {default: null},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    // if(['nome','fundamentacao','eixo_tematico_id'].indexOf(controlName) >= 0 && !control.value?.length) {
    //   result = "Obrigatório";
    // }
    return result;
  }

  public async loadData(entity: PlanoEntregaEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    
  }
  public async initializeData(form: FormGroup){
    this.entity = this.metadata?.entrega as PlanoEntregaEntrega;
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve, reject) => {
      const entregas = this.util.fill(new PlanoEntregaEntrega(), this.entity!);
      resolve(new NavigateResult(this.util.fillForm(entregas, this.form!.value)));
    });
  }

  public checkTipoIndicador(tipos: string[]): boolean {
    return tipos.includes(this.form?.controls!.tipo_indicador.value);
  }

}
