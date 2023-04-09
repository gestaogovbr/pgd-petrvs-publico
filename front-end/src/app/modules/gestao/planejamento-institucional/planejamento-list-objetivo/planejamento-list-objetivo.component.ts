import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';

@Component({
  selector: 'planejamento-list-objetivo',
  templateUrl: './planejamento-list-objetivo.component.html',
  styleUrls: ['./planejamento-list-objetivo.component.scss']
})
export class PlanejamentoListObjetivoComponent extends PageFrameBase {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
    @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
    @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    @Input() set entity(value: Planejamento | undefined) { super.entity = value; } get entity(): Planejamento | undefined { return super.entity; }
    @Input() eixos?: EixoTematico[];
    @Input() public entity_id?: string | undefined;

    public get items(): PlanejamentoObjetivo[] {
      if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
      if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
      return this.gridControl.value.objetivos;
    }
    public minHeight: number = 350;
    public options: ToolbarButton[] = [];
    public objetivoDao?: PlanejamentoObjetivoDaoService;
    public eixoDao?: EixoTematicoDaoService;
    
    constructor(public injector: Injector) {
      super(injector);
      this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
      this.objetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
      this.eixoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
      this.groupBy = [{field: "eixo_tematico_id", label: "Eixo Temático"}];
      //this.join = ['planejamento:id','planejamento.planejamento_superior:id,nome'];
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        fundamentacao: {default: ""},
        planejamento_id: {default: null},
        eixo_tematico_id: {default: null},
        objetivo_superior_id: {default: null}
      }, this.cdRef);
    }
    
    ngOnInit(): void {
      super.ngOnInit();
      if(!this.eixos) this.eixoDao?.query().getAll().then(eixos => {
        this.eixos = eixos;
      });  
    }

    public dynamicButtons(row: any): ToolbarButton[] {
      let result: ToolbarButton[] = [];
      let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
  
      if(this.auth.hasPermissionTo('MOD_PLAN_INST_EDT')) {
        result.push({hint: "Editar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (objetivo: PlanejamentoObjetivo) => { this.editObjetivo(objetivo); }});
      }

      return result;
    }

    public dynamicOptions(row: any): ToolbarButton[] {
      let result: ToolbarButton[] = [];
      let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;

      result.push({label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult']}, {modal: true})});  
      if(this.auth.hasPermissionTo('MOD_PLAN_INST_EXCL')) {
        result.push({label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (objetivo: PlanejamentoObjetivo) => { this.removeObjetivo(objetivo); }});
      }

      return result;
    }

    public async addObjetivo() {
      // ************ 
      // se for adicionar um objetivo num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois se
      // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
      let objetivo = new PlanejamentoObjetivo({_status: "ADD", planejamento_id: this.entity?.id});
      this.go.navigate({route: ['gestao', 'planejamento', 'objetivo']}, {metadata: {planejamento: this.entity!, objetivo: objetivo}, modalClose: async (modalResult) => {
        if(modalResult) {this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.objetivoDao!.save(modalResult));};
      }});
      //se o campo planejamento_superior_id for incluido na tabela planejamentos não será necessário passar o segundo argumento.
      

    }

    public async editObjetivo(objetivo: PlanejamentoObjetivo) {
      objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
      let index = this.items.indexOf(objetivo);
      this.go.navigate({route: ['gestao', 'planejamento', 'objetivo']}, {metadata: {planejamento: this.entity!, objetivo: objetivo}, modalClose: async (modalResult) => {
        if(modalResult) { 
          if(!this.isNoPersist) await this.objetivoDao?.save(modalResult);
          this.items[index] = modalResult;
        };
      }});
      //se o campo planejamento_superior_id for incluido na tabela planejamentos não será necessário passar o segundo argumento.
    }

    public async removeObjetivo(objetivo: PlanejamentoObjetivo) {
      let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if(confirm) {
        let index = this.items.indexOf(objetivo);
        if(this.isNoPersist) {
          objetivo._status = "DELETE";
        } else {
          await this.objetivoDao!.delete(objetivo);
          this.grid?.items.splice(index,1);
        };
        return true;
      } else {
        return false;
      }
    }

    public getEixo(id: string): EixoTematico | undefined {
      return this.eixos?.find(x => x.id == id);
    }
    

/*     public async saveObjetivo(form: FormGroup, row: any) {
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
    } */

/*     public async saveData(form?: IIndexable) {
      await this.grid?.confirm();
      return this.entity!;
    } */

/*     public get isNoPersist(): boolean {
      return this.entity_id == "NOPERSIST";
    } */

}
  
  
