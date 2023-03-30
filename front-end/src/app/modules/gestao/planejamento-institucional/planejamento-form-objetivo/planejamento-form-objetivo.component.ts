import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

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

    public get items(): PlanejamentoObjetivo[] {
      if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
      if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
      return this.gridControl.value.objetivos;
    }
    public minHeight: number = 100;
    
    constructor(public injector: Injector) {
      super(injector);
      this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
      this.groupBy = [{field: "eixo_tematico.nome", label: "Eixo Temático"}];
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        fundamentacao: {default: ""},
        planejamento_id: {default: null},
        eixo_tematico_id: {default: null},
        objetivo_superior_id: {default: null}
      }, this.cdRef);
    }
  
    public async addObjetivo() {
      return new PlanejamentoObjetivo({
        id: this.dao!.generateUuid(),
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

    public dynamicOptions(row: any): ToolbarButton[] {
      let result: ToolbarButton[] = [];
      // Testa se o usuário possui permissão para excluir um plano institucional
      if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) result.push({icon: "bi bi-trash", label: "Excluir", onClick: this.removeObjetivo.bind(this)});
      return result;
    }
 

}
  
  
