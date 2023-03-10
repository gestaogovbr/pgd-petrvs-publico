import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'planejamento-form-objetivo',
  templateUrl: './planejamento-form-objetivo.component.html',
  styleUrls: ['./planejamento-form-objetivo.component.scss']
})
export class PlanejamentoFormObjetivoComponent extends PageFrameBase {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
    @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
    @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    @Input() set entity(value: Planejamento | undefined) { super.entity = value; } get entity(): Planejamento | undefined { return super.entity; }
    @Input() cdRef: ChangeDetectorRef;

    public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
    public form: FormGroup;

    public get items(): PlanejamentoObjetivo[] {
      if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
      if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
      return this.gridControl.value.objetivos;
    }
    
    constructor(public injector: Injector) {
      super(injector);
      this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
      this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
      this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
      this.groupBy = [{field: "eixoTematico.nome", label: "Eixo Temático"}];
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        fundamentacao: {default: ""},
        planejamento_id: {default: null},
        eixo_tematico_id: {default: null},
        objetivo_superior_id: {default: null}
      }, this.cdRef, this.validate);
    }
  
    public validate = (control: AbstractControl, controlName: string) => {
      let result = null;
      if(['nome','fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    }
  
    public formValidation = (form?: FormGroup) =>{
      let result = null;
/*       if(this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) {
        return "A data do início não pode ser maior que a data do fim!";
      } */
      return result;
    }
  
    public async addObjetivo() {
      return new PlanejamentoObjetivo({
        id: this.dao!.generateUuid(),
        eixo_tematico_id: "1825f98b-744e-44db-8847-198f247ca7e1",
        planejamento_id: this.entity?.id
      }) as IIndexable;
    }

    public async removeObjetivo(row: any) {
      return true;
    }

    public async loadObjetivo(form: FormGroup, row: any) {
      form.controls.nome.setValue(row.nome);
      form.controls.fundamentacao.setValue(row.fundamentacao);
      form.controls.planejamento_id.setValue(row.planejamento_id);
      form.controls.eixo_tematico_id.setValue(row.eixo_tematico_id);
      form.controls.objetivo_superior_id.setValue(row.objetivo_superior_id);
      this.cdRef.detectChanges();
    }

    public async saveObjetivo(form: FormGroup, row: any) {
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
  
  
