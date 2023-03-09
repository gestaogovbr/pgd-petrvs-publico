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
    @Input() set entity(value: Planejamento | undefined) { super.entity = value; } get entity(): Planejamento | undefined { return super.entity; }
    @Input() cdRef: ChangeDetectorRef;

    public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
    public form: FormGroup;
    
    constructor(public injector: Injector) {
      super(injector);
      this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
      this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
      this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        fundamentacao: {default: ""},
        planejamento_id: {default: null},
        eixo_tematico_id: {default: null},
        objetivo_superior_id: {default: null}
/*        valores: { default: []},
        valor_texto: {default: ""} */
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
  
    public loadData(entity: IIndexable, form?: FormGroup) {
      super.loadData(entity, form);
    }
  
    public initializeData(form?: FormGroup) {
      this.entity = new Planejamento();
      this.loadData(this.entity, this.form);
    }
  
    public async saveData(form?: IIndexable) {
      await this.grid?.confirm();
      return this.entity!;
    }

    public get items(): PlanejamentoObjetivo[] {
/*       if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
      if (!this.gridControl.value.fases) this.gridControl.value.fases = [];*/
      
      return [];
    }
   
/*     public addValorHandle(): LookupItem | undefined {
      let result = undefined;
      const value = this.form.controls.valor_texto.value;
      const key = this.util.textHash(value);
      if(value?.length && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
        result = {
          key: key,
          value: this.form.controls.valor_texto.value
        };
        this.form.controls.valor_texto.setValue("");
      }
      return result;
    }; */

    public async addObjetivo() {
      return new PlanejamentoObjetivo({
        id: this.dao!.generateUuid(),
        eixo_tematico_id: "1825f98b-744e-44db-8847-198f247ca7e1"
      }) as IIndexable;
    }
  
/*     public async addChildProcesso(row: CadeiaValorProcesso, metadata: any, index: number) {
      let processo = new CadeiaValorProcesso({
        id: this.dao!.generateUuid(),
        processo_pai_id: row.id,
        sequencia: this.items.filter(x => x.processo_pai_id == row.id).length + 1,
        nome: ""
      });
  
      this.items.push(processo);
      this.grid!.setMetadata(processo, { nivel: this.getSequencia({}, processo) });
      this.items.sort((a, b) => {
        const sa = (this.grid!.getMetadata(a)?.nivel || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
        const sb = (this.grid!.getMetadata(b)?.nivel || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
        return sa < sb ? -1 : sa > sb ? 1 : 0;
      });
      this.grid!.adding = true;
      await this.grid!.edit(processo);
      return undefined;
    } */
  
    public async loadObjetivo(form: FormGroup, row: any) {
/*       this.loadRecursos(row);
      this.tipoRecurso = row.recurso?.tipo; */
      form.controls.nome.setValue(row.nome);
      form.controls.fundamentacao.setValue(row.fundamentacao);
      form.controls.planejamento_id.setValue(row.planejamento_id);
      form.controls.eixo_tematico_id.setValue(row.eixo_tematico_id);
      form.controls.objetivo_superior_id.setValue(row.objetivo_superior_id);
      this.cdRef.detectChanges();
    }
  
    public async removeObjetivo(row: any) {

    }
  
    public async saveObjetivo(form: FormGroup, row: any) {
/*       let result = undefined;
      this.form!.markAllAsTouched();
      if (this.form!.valid) {
        row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
        row.sequencia = form.controls.sequencia.value;
        row.nome = form.controls.nome.value;
        result = row;
        this.cdRef.detectChanges();
      }
      return result; */
    }
    
    public dynamicButtons(row: any): ToolbarButton[] {
      let result: ToolbarButton[] = [];
     /* let cadeiaValorProcesso: CadeiaValorProcesso = row as CadeiaValorProcesso;
      result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });*/
      return result;
    }
}
  
  
