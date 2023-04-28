import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlanoEntregaPontoControleEntrega } from 'src/app/models/plano-entrega-ponto-controle-entrega.model';
import { PlanoEntregaPontoControle } from 'src/app/models/plano-entrega-ponto-controle.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'plano-entrega-ponto-controle-form-entrega',
  templateUrl: './plano-entrega-ponto-controle-form-entrega.component.html',
  styleUrls: ['./plano-entrega-ponto-controle-form-entrega.component.scss']
})
export class PlanoEntregaPontoControleFormEntregaComponent extends PageFrameBase {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
    @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
    @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    @Input() set entity(value: PlanoEntregaPontoControle | undefined) { super.entity = value; } get entity(): PlanoEntregaPontoControle | undefined { return super.entity; }
    @Input() cdRef: ChangeDetectorRef;

    public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
    public form: FormGroup;

    public get items(): PlanoEntregaPontoControleEntrega[] {
      if (!this.gridControl.value) this.gridControl.setValue(new PlanoEntregaPontoControle());
      if (!this.gridControl.value.entregas) this.gridControl.value.entregas = [];
      return this.gridControl.value.entregas;
    }
    
    constructor(public injector: Injector) {
      super(injector);
      this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
      this.dao = injector.get<PlanoEntregaPontoControleDaoService>(PlanoEntregaPontoControleDaoService);
      this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
      this.join = ['entregas','plano_entrega_entrega'];
      this.form = this.fh.FormBuilder({
        meta: {default: {}},
        realizado: {default: {}},
        plano_entrega_entrega_id: {default: null},
        plano_entrega_ponto_controle_id: {default: null},
      }, this.cdRef, this.validate);
    }
  
    public validate = (control: AbstractControl, controlName: string) => {
      let result = null;
/*       if(['nome','fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } */
      return result;
    }
  
    public formValidation = (form?: FormGroup) =>{
      let result = null;
/*       if(this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) {
        return "A data do início não pode ser maior que a data do fim!";
      } */
      return result;
    }
  
    public async addEntrega() {
      return new PlanoEntregaPontoControleEntrega({
        id: this.dao!.generateUuid(),
        plano_entrega_ponto_controle_id: this.entity?.id
      }) as IIndexable;
    }

    public async removeEntrega(row: any) {


      return true;
    }

    public async loadEntrega(form: FormGroup, row: any) {
      form.controls.meta.setValue({});
      form.controls.realizado.setValue({});
      form.controls.plano_entrega_ponto_controle_id.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
      this.cdRef.detectChanges();
    }

    public async saveEntrega(form: FormGroup, row: any) {
      let result = undefined;
      this.form!.markAllAsTouched();
      if (this.form!.valid) {
        row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
        row.nome = form.controls.nome.value;
        row.fundamentacao = form.controls.fundamentacao.value;
        row.planejamento_id = form.controls.planejamento_id.value;
        row.eixo_tematico_id = form.controls.eixo_tematico_id.value;
        row.objetivo_superior_id = form.controls.objetivo_superior_id.value;
        result = row;
        this.cdRef.detectChanges();
      }
      return result;
    }

    public async saveData(form?: IIndexable) {
      await this.grid?.confirm();
      return this.entity!;
    }
 

}
  
  
