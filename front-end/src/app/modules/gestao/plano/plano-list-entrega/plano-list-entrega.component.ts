import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Plano } from 'src/app/models/plano.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { Entrega } from 'src/app/models/entrega.model';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';

@Component({
  selector: 'plano-list-entrega',
  templateUrl: './plano-list-entrega.component.html',
  styleUrls: ['./plano-list-entrega.component.scss']
})
export class PlanoListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('entrega_mesma_unidade', { static: false }) public entrega_mesma_unidade?: InputSelectComponent;
  @ViewChild('entrega_outra_unidade', { static: false }) public entrega_outra_unidade?: InputSearchComponent;
  @ViewChild('entrega_externa', { static: false }) public entrega_externa?: InputSelectComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Plano | undefined) { super.entity = value; } get entity(): Plano | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }

  public get items(): PlanoTrabalhoEntrega[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Plano());
    if (!this.gridControl.value.entregas) this.gridControl.value.entregas = [];
    return this.gridControl.value.entregas;
  }
  public minHeight: number = 350;
  public options: ToolbarButton[] = [];
  public entregaDao?: EntregaDaoService;
  private _disabled: boolean = false;
  public totalForcaTrabalho: number = 0;
  public entregasMesmaUnidade: LookupItem[] = [];
  public entregasOutraUnidade: LookupItem[] = [];
  public entregasExternas: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.form = this.fh.FormBuilder({
      origem: {default: ""},
      entrega_mesma_unidade_id: {default: ""},
      entrega_outra_unidade_id: {default: ""},
      entrega_externa_id: {default: ""},
      descricao: {default: ""},
      forca_trabalho: {default: 0},
      plano_id: {default: null},
      entrega_id: {default: null},
      plano_entrega_entrega_id: {default: null}
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.totalForcaTrabalho = this.somaForcaTrabalho(this.entity?.entregas);
    /* Se entity for passada como parâmetro na chamada do componente <plano-list-entrega> ela será recebida por this.entity, e se
       ela for passada através de uma url, será recebida por this.metadata.entity */
  }
  
  public somaForcaTrabalho(entregas: PlanoTrabalhoEntrega[] = []): number {
    return entregas.map(x => parseFloat(x.forca_trabalho)).reduce((a,b) => a + b);
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let entrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    if (this.auth.hasPermissionTo('MOD_PTR_EDT') && !this.disabled) {
      result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (entrega: PlanoTrabalhoEntrega) => { this.editEntrega(entrega); } });
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let entrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (entrega: PlanoTrabalhoEntrega) => this.go.navigate({ route: ['gestao', 'plano', 'entrega', entrega.id, 'consult'] }, { modal: true }) });
    if (this.auth.hasPermissionTo('MOD_PTR_EXCL') && !this.disabled) {
      result.push({ label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (entrega: PlanoTrabalhoEntrega) => { this.removeEntrega(entrega); } });
    }
    return result;
  }

  public async addEntrega() {
    // ************ 
    // se for adicionar um entrega num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois se
    // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
    return Object.assign(new PlanoTrabalhoEntrega(), { 
      _status: "ADD", 
      id: this.dao!.generateUuid(),
      plano_id: this.entity?.id
    }) as IIndexable;
  }

  public async editEntrega(entrega: PlanoTrabalhoEntrega) {
    entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(entrega);
    this.go.navigate({ route: ['gestao', 'plano', 'entrega'] }, {
      metadata: { 
        plano: this.entity!, 
        entrega: entrega,
        //objetivos: this.objetivosPai(objetivo.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          if (!this.isNoPersist) await this.entregaDao?.save(modalResult);
          this.items[index] = modalResult;
          //this.sortObjetivos();
        };
      }
    });
  }

  public async removeEntrega(entrega: PlanoTrabalhoEntrega) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(entrega);
      if (this.isNoPersist) {
        entrega._status = "DELETE";
      } else {
        //await this.entregaDao!.delete(entrega);
        this.grid?.items.splice(index, 1);
      };
      return true;
    } else {
      return false;
    }
  }

  public async saveEntrega(form: FormGroup, row: any) {
    let novaEntrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    novaEntrega.entrega_id = this.entrega_externa?.value ?? null;
    novaEntrega.plano_entrega_entrega_id = this.form?.controls.origem.value == 'MESMA_UNIDADE' ? this.entrega_mesma_unidade?.value : this.form?.controls.origem.value == 'OUTRA_UNIDADE' ? this.entrega_outra_unidade?.value : null;
    novaEntrega.descricao = this.form?.controls.descricao.value;
    novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.loading = true;
    try {
      await this.dao?.save(novaEntrega);
      await this.loadData({}, this.form);
    } finally {
      this.loading = false;
    } 
    return undefined;
  }

  public onOrigemChange(event: Event){
    switch (this.form?.controls.origem.value) {
      case 'MESMA_UNIDADE':
        this.entregasMesmaUnidade = this.entity?.plano_entrega?.entregas.filter(epe => !this.entity?.entregas.map(ept => ept.plano_entrega_entrega_id).includes(epe.id)).map(epe => Object.assign({}, {key: epe.id, value: epe.descricao})) || [];
        break;
      case 'OUTRA_UNIDADE':
        
        break;
      case 'EXTERNA':
        this.entregaDao?.query().getAll().then(response=> {
          this.entregasExternas = response.filter(ee => !this.entity?.entregas.map(ept => ept.entrega_id).includes(ee.id)).map(ee => Object.assign({}, {key: ee.id, value: ee.nome})) || [];
        });
        break;
    }
  }

  public onEntregaMesmaUnidadeChange(event: Event){
    this.form?.controls.descricao.setValue('');
    if(this.entrega_mesma_unidade?.selectedItem?.key.length) this.form?.controls.descricao.setValue(this.entrega_mesma_unidade?.selectedItem?.value);
  }

  public onEntregaOutraUnidadeChange(event: Event){
    this.form?.controls.descricao.setValue('');
    //if(this.entrega_outra_unidade?.selectedItem?.key.length) this.form?.controls.descricao.setValue(this.entrega_outra_unidade?.selectedItem?.value);
  }

  public onEntregaExternaChange(event: Event){
    this.form?.controls.descricao.setValue('');
    if(this.entrega_externa?.selectedItem?.key.length) this.form?.controls.descricao.setValue(this.entrega_externa?.selectedItem?.value);
  }

  public onForcaTrabalhoChange(event: Event){
    this.grid!.items.find(i => i._status == 'ADD')!.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.totalForcaTrabalho = this.somaForcaTrabalho(this.grid?.items as PlanoTrabalhoEntrega[]);
  }

}


