import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'cadeia-valor-list-processos-entregas',
  templateUrl: './cadeia-valor-list-processos-entregas.component.html',
  styleUrls: ['./cadeia-valor-list-processos-entregas.component.scss']
})
export class CadeiaValorListProcessosEntregasComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('cadeiaValor', { static: false }) public cadeiaValor?: InputSearchComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() cadeiaValorId?: string; 

  public get items(): CadeiaValorProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];
    return this.gridControl.value.processos;
  }

  public cadeiaValorDao: CadeiaValorDaoService;
  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.join = ['processos']
    this.form = this.fh.FormBuilder({
      data_inicio: { default: "" },
      data_fim: { default: "" },
      processo_id: { default: "" },
      plano_entrega_entrega_id: { default: "" },
      cadeia_valor_id: { default: "" }
    }, this.cdRef, this.validate);
   }

   ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.cadeiaValor?.loadSearch(this.cadeiaValorId);
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
    let processo: CadeiaValorProcesso = row as CadeiaValorProcesso;
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let processo: CadeiaValorProcesso = row as CadeiaValorProcesso;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (processo: CadeiaValorProcesso) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true }) });
    return result;
  }
}
