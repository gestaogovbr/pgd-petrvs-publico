import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';


@Component({
  selector: 'app-plano-entrega-form',
  templateUrl: './plano-entrega-form.component.html',
  styleUrls: ['./plano-entrega-form.component.scss']
})

export class PlanoEntregaFormComponent extends PageFormBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;

  public entregas:PlanoEntregaEntregaDaoService;
  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public planejamentoInstitucionalDao: PlanejamentoDaoService;
  public form: FormGroup;

  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.planejamentoInstitucionalDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.entregas = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = [];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      inicio: { default: new Date() },
      fim: { default: new Date() },
      status: { default: 'INCLUINDO' },
      unidade_id: { default: "" },
      plano_entrega_id: { default: null },
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
      programa_id: { default: null },
      entregas: { default: [] },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
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

  public async loadData(entity: PlanoEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    this.loadData(this.entity!, this.form!);
  }

  public async saveData(form: IIndexable): Promise<PlanoEntrega> {
    return new Promise<PlanoEntrega>((resolve, reject) => {
      this.grid!.confirm();
      let planoEntrega = this.util.fill(new PlanoEntrega(), this.entity!);
      planoEntrega = this.util.fillForm(planoEntrega, this.form!.value);
      planoEntrega.entregas = this.entregas!;
      resolve(planoEntrega);
    });
  }

  public titleEdit = (entity: PlanoEntrega): string => {
    return "Editando ";
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

 

}

