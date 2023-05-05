import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';


@Component({
  selector: 'app-plano-entrega-form',
  templateUrl: './plano-entrega-form.component.html',
  styleUrls: ['./plano-entrega-form.component.scss']
})

export class PlanoEntregaFormComponent extends PageFormBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public planejamentoInstitucionalDao: PlanejamentoDaoService;
  public planoEntregasEntregasDao: PlanoEntregaEntregaDaoService;
  public form: FormGroup;
  public formEntregas: FormGroup;


  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.planejamentoInstitucionalDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.planoEntregasEntregasDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = [];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({ 
      nome: {default: ""},
      inicio: {default: new Date()},
      fim: {default: new Date()},
      planejamento_id: {default: ""},
      cadeia_valor_id: {default: ""},
      entregas: {default: []},
    }, this.cdRef, this.validate);

    this.formEntregas = this.fh.FormBuilder({ 
      descricao: {default: ""},
      cliente: {default: ""},
      dt_inicio: {default: new Date()},
      dt_fim: {default: new Date()},
      tipo_indicador: {default: ""},
      meta: {default: ""},
      vl_realizado: {default: ""},
      objetivos: {default: ""},
      homologado: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

/*     if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  */
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    return undefined;
  };

  public async loadData(entity: PlanoEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    this.loadData(this.entity!, this.form!);
  }

  public async saveData(form: IIndexable): Promise<PlanoEntrega | boolean> {

    return true;
  }

  public titleEdit = (entity: PlanoEntrega): string => {
    return "Editando " ;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

  public async addEntrega() {
    return new PlanoEntregaEntrega({
      id: this.dao!.generateUuid(),
      plano_entrega_id: this.entity?.id
    }) as IIndexable;
  }

  public async removeEntrega(row: any) {
    return true;
  }

  public async loadEntrega(form: FormGroup, row: any) {
    this.formEntregas.controls.descricao.setValue(row.descricao);
    this.formEntregas.controls.cliente.setValue(row.cliente);
    this.formEntregas.controls.dt_inicio.setValue(row.dt_inicio);
    this.formEntregas.controls.dt_fim.setValue(row.dt_fim);
    this.formEntregas.controls.tipo_indicador.setValue(row.tipo_indicador);
    this.formEntregas.controls.meta.setValue(row.meta);
    this.formEntregas.controls.vl_realizado.setValue(row.vl_realizado);
    this.formEntregas.controls.objetivos.setValue(row.objetivos);
    this.formEntregas.controls.homologado.setValue(row.homologado);
    this.cdRef.detectChanges();
  }

  public async saveEntrega(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.descricao = this.formEntregas.controls.descricao.value;
      row.dt_inicio = this.formEntregas.controls.dt_inicio.value;
      row.dt_fim = this.formEntregas.controls.dt_fim.value;
      row.tipo_indicador =this.formEntregas.controls.tipo_indicador.value;
      row.meta = this.formEntregas.controls.meta.value;
      row.vl_realizado = this.formEntregas.controls.vl_realizado.value;
      row.objetivos = this.formEntregas.controls.objetivos.value;
      row.homologado = this.formEntregas.controls.homologado.value;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}
