import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanoEntregaObjetivoDaoService } from 'src/app/dao/plano-entrega-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlanoEntregaObjetivo } from 'src/app/models/plano-entrega-objetivo.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'planejamento-list-objetivos-entregas',
  templateUrl: './planejamento-list-objetivos-entregas.component.html',
  styleUrls: ['./planejamento-list-objetivos-entregas.component.scss']
})
export class PlanejamentoListObjetivosEntregasComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('planejamento', { static: false }) public planejamento?: InputSearchComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() planejamentoId?: string; 

  public get items(): PlanejamentoObjetivo[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
    if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
    return this.gridControl.value.objetivos;
  }

  public planejamentoDao: PlanejamentoDaoService;
  public planejamentoObjetivoDao: PlanejamentoObjetivoDaoService;
  
  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<PlanoEntregaObjetivoDaoService>(PlanoEntregaObjetivoDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.join = ['objetivos']
    this.form = this.fh.FormBuilder({
      data_inicio: { default: "" },
      data_fim: { default: "" },
      objetivo_id: { default: 1 },
      plano_entrega_entrega_id: { default: "" },
      planejamento_id: {default: ""}
    }, this.cdRef, this.validate);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.planejamento?.loadSearch(this.planejamentoId);
    })();    
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    // if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
    //   result = "Obrigatório";
    // }

    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    if (this.auth.hasPermissionTo('MOD_PLAN_INST_EDT') ) {
      result.push({ hint: "Editar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (objetivo: PlanejamentoObjetivo) => { this.editObjetivo(objetivo); } });
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
    if (this.auth.hasPermissionTo('MOD_PLAN_INST_EXCL')) {
      result.push({ label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (objetivo: PlanejamentoObjetivo) => { this.removeObjetivo(objetivo); } });
    }
    return result;
  }

  public async addObjetivo() {
    let objetivo = new PlanoEntregaObjetivo({
      id: this.dao!.generateUuid(),
      planejamento_id: this.planejamentoId,
      objetivo_id: '',
    });
    return objetivo;
  } 


  public async removeObjetivo(objetivo: PlanejamentoObjetivo) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(objetivo);
      // if (this.isNoPersist) {
      //   objetivo._status = "DELETE";
      // } else {
      //   await this.objetivoDao!.delete(objetivo);
      //   this.grid?.items.splice(index, 1);
      // };
      return true;
    } else {
      return false;
    }
  }

  public async editObjetivo(objetivo: PlanejamentoObjetivo) {
    objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(objetivo);
    // this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
    //   metadata: { 
    //     planejamento: this.entity!, 
    //     objetivo: objetivo,
    //     objetivos: this.objetivosPai(objetivo.id) 
    //   },
    //   modalClose: async (modalResult) => {
    //     if (modalResult) {
    //       if (!this.isNoPersist) await this.objetivoDao?.save(modalResult);
    //       this.items[index] = modalResult;
    //       this.sortObjetivos();
    //     };
    //   }
    // });
  }
}
