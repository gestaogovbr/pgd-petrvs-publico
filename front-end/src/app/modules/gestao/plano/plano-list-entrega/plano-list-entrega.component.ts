import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
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
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';

@Component({
  selector: 'plano-list-entrega',
  templateUrl: './plano-list-entrega.component.html',
  styleUrls: ['./plano-list-entrega.component.scss']
})
export class PlanoListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('origem', { static: false }) public origem?: InputSelectComponent;
  @ViewChild('entrega_mesma_unidade', { static: false }) public entrega_mesma_unidade?: InputSelectComponent;
  @ViewChild('entrega_outra_unidade', { static: false }) public entrega_outra_unidade?: InputSelectComponent;
  @ViewChild('entrega_catalogo', { static: false }) public entrega_catalogo?: InputSelectComponent;
  @Input() cdRef: ChangeDetectorRef;
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
  public planoTrabalhoDao?: PlanoDaoService;
  private _disabled: boolean = false;
  public totalForcaTrabalho: number = 0;
  public entregasMesmaUnidade: LookupItem[] = [];
  public entregasOutraUnidade: LookupItem[] = [];
  public entregasCatalogo: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.planoTrabalhoDao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.join = ["entrega", "entrega_plano_entrega.entrega"];
    this.form = this.fh.FormBuilder({
      origem: {default: null},
      entrega_mesma_unidade_id: {default: null},
      entrega_outra_unidade_id: {default: null},
      entrega_catalogo_id: {default: null},
      descricao: {default: ""},
      forca_trabalho: {default: 1},
      plano_id: {default: null},
      entrega_id: {default: null},
      plano_entrega_entrega_id: {default: null}
    }, this.cdRef, this.validate);
  }

  /*
  TESTES

                              PERSISTENTE               NÃO-PERSISTENTE
  Inclusão                        OK
  Alteração                       OK
  Cancelamento                    OK
  Exclusão                        OK
  Validação na inclusão           NÃO
  Validação na alteração          NÃO
  */

  /*
  PROBLEMAS:

  1. O evento de selecionar o conteúdo do input-text está desviando o fluxo para a homepage;
  2. Durante a edição de uma entrega, os campos não são validados à medida que são preenchidos;

  */

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório!";
    }
    if(['forca_trabalho'].indexOf(controlName) >= 0) {
      //let soma = this.entity?.entregas?.reduce((acc, e) => { return acc + parseFloat(e.forca_trabalho); }, 0) || 0;
      //if((soma + (this.grid?.adding ? parseFloat(this.form?.controls.forca_trabalho.value) : 0)) > 100) result = "Ultrapassa o total de 100%";
      if(control.value < 1) result = "Não pode ser inferior a 1";
    }
    if(['entrega_id'].indexOf(controlName) >= 0) {
      if(this.form?.controls.origem.value == 'CATALOGO' && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !!e.entrega_id && !e.plano_entrega_entrega_id).map(e => e.entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
      if(cont > (this.grid?.adding ? 0 : 1)) result = "Esta entrega está em duplicidade!";
    }
/*     if(['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
      //separar os casos de mesma unidade dos casos de outra unidade
      if(['MESMA_UNIDADE','OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !e.entrega_id && !!e.plano_entrega_entrega_id).map(e => e.plano_entrega_entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
      if(cont > (this.grid?.adding ? 0 : 1)) result = "Esta entrega está em duplicidade!";
    }  */
    return result;
  }

  async ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho(this.entity?.entregas) * 100)/100;
    this.entregasCatalogo = await this.carregarEntregasCatalogo();
    this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
  }

  /**
   * Método chamado na inicialização do componente
   * @param entity 
   * @param form 
   */
  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  /**
   * Método utilizado durante a inclusão/alteração de um item no grid persistente de entregas de plano de trabalho
   * @param form 
   * @param row 
   */
  public async loadEntrega(form: FormGroup, row: any) {
    form.controls.descricao.setValue(row.descricao);
    form.controls.forca_trabalho.setValue(row.forca_trabalho)
    if(!row.plano_entrega_entrega_id?.length && row.entrega_id?.length){
      // POR QUE OS 3 INPUTS ESTÃO UNDEFINED ? THIS.ENTREGA_CATALOGO, THIS.ENTREGA_MESMA_UNIDADE, THIS.ENTREGA_OUTRA_UNIDADE
      this.entrega_catalogo?.setValue(row.entrega_id);
      form.controls.entrega_id.setValue(row.entrega_id);
      this.entrega_mesma_unidade?.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
      this.origem?.setValue('CATALOGO');
    } else if(!row.entrega_id?.length && row.plano_entrega_entrega_id?.length && row.entrega_plano_entrega?.plano_entrega_id == this.entity?.plano_entrega_id) {
      // POR QUE OS 3 INPUTS ESTÃO UNDEFINED ? THIS.ENTREGA_CATALOGO, THIS.ENTREGA_MESMA_UNIDADE, THIS.ENTREGA_OUTRA_UNIDADE
      this.entrega_mesma_unidade?.setValue(row.plano_entrega_entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
      this.entrega_catalogo?.setValue(null);
      form.controls.entrega_id.setValue(null);      
      this.origem?.setValue('MESMA_UNIDADE');
    } else if(!row.entrega_id?.length && row.plano_entrega_entrega_id?.length && row.entrega_plano_entrega?.plano_entrega_id != this.entity?.plano_entrega_id) {
      // POR QUE OS 3 INPUTS ESTÃO UNDEFINED ? THIS.ENTREGA_CATALOGO, THIS.ENTREGA_MESMA_UNIDADE, THIS.ENTREGA_OUTRA_UNIDADE
      this.entregasOutraUnidade = this.carregarEntregasOutraUnidade();
      this.entrega_outra_unidade?.setValue(row.plano_entrega_entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
      this.entrega_catalogo?.setValue(null);
      form.controls.entrega_id.setValue(null);
      this.origem?.setValue('OUTRA_UNIDADE');
    } else {
      form.controls.entrega_id.setValue(null);
      this.entrega_catalogo?.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
      this.entrega_mesma_unidade?.setValue(null);
      this.entrega_outra_unidade?.setValue(null);
      this.origem?.setValue(null);
    }
    this.cdRef.detectChanges();
  }
  
  public somaForcaTrabalho(entregas: PlanoTrabalhoEntrega[] = []): number {
    return entregas.map(x => parseFloat(x.forca_trabalho)).reduce((a,b) => a + b, 0);
  }

  /**
   * Método chamado para inserir uma entrega de plano de trabalho no grid.
   * @returns 
   */
  public async addEntrega() {
    return Object.assign(new PlanoTrabalhoEntrega(), { 
      _status: "ADD", 
      plano_id: this.entity?.id
    }) as IIndexable;
  }

/*   public editEntrega(entrega: PlanoTrabalhoEntrega) {
    entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(entrega);
  } */

  public async removeEntrega(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      this.loading = true;
      try {
        await this.dao?.delete(row.id);
      } finally {
        this.loading = false;
      }
      this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho - parseFloat((row as PlanoTrabalhoEntrega).forca_trabalho)) * 100) / 100;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Método chamado no salvamento de uma entrega do plano de trabalho do grid.
   * @param form 
   * @param row 
   * @returns 
   */
  public async saveEntrega(form: FormGroup, row: any) {
    delete row['entrega'];
    delete row['entrega_plano_entrega'];
    let novaEntrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    novaEntrega.entrega_id = this.form?.controls.entrega_id.value ?? null;
    //novaEntrega.plano_entrega_entrega_id = this.form?.controls.origem.value == 'MESMA_UNIDADE' ? this.entrega_mesma_unidade?.value : this.form?.controls.origem.value == 'OUTRA_UNIDADE' ? this.entrega_outra_unidade?.value : null;
    novaEntrega.plano_entrega_entrega_id = this.form?.controls.plano_entrega_entrega_id.value;
    novaEntrega.descricao = this.form?.controls.descricao.value;
    novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.loading = true;
    try {
      if(!this.isNoPersist) novaEntrega = await (this.dao as PlanoTrabalhoEntregaDaoService).save(novaEntrega, this.join); 
      this.grid!.items[this.grid!.items.length-1].id = '';
    } finally {
      this.loading = false;
    }
    return novaEntrega;
  }

  public afterSaveEntrega(novaEntrega: PlanoTrabalhoEntrega){
    novaEntrega!.entrega = this.entrega_catalogo?.selectedItem?.data;
    novaEntrega!.entrega_plano_entrega = this.origem?.value == 'MESMA_UNIDADE' ? this.entrega_mesma_unidade?.selectedItem?.data : this.entrega_outra_unidade?.selectedItem;
    this.grid?.reloadFilter();
  }

  public carregarEntregasMesmaUnidade(): LookupItem[] {
    let entregasPlanoEntrega = this.entity?.id.length ? this.entity?.plano_entrega?.entregas || [] : [];//this.entregas || []; //REFATORAR  carregando as entregas do plano de entregas, se este já foi informado
    //return entregasPlanoEntrega.filter(epe => !this.entity?.entregas.map(ept => ept.plano_entrega_entrega_id).includes(epe.id)).map(epe => Object.assign({}, {key: epe.id, value: epe.descricao, data: epe})) || [];
    return entregasPlanoEntrega.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || '', data: epe}));
  }

  public carregarEntregasOutraUnidade(): LookupItem[]{
    let result: LookupItem[] = [];
    return result;
  }

  public async carregarEntregasCatalogo(): Promise<LookupItem[]>{
    let result: LookupItem[] = [];
    result = (await this.entregaDao?.query().getAll())?.map(ee => Object.assign({}, {key: ee.id, value: ee.nome, data: ee})) || [];
    return result;
  }

  public onOrigemChange(row: any){
    if(['MESMA_UNIDADE','OUTRA_UNIDADE'].includes(row["origem"])){
      this.form?.controls.entrega_id.setValue(null);
    } else if(row["origem"] == "CATALOGO"){
      this.form?.controls.plano_entrega_entrega_id.setValue(null);
    } else {
      this.form?.controls.entrega_id.setValue(null);
      this.form?.controls.plano_entrega_entrega_id.setValue(null);
    }
  }

  public onEntregaMesmaUnidadeChange(event: Event){
    this.form?.controls.descricao.setValue(this.entrega_mesma_unidade?.selectedItem?.value || '');
    this.form?.controls.plano_entrega_entrega_id.setValue(this.entrega_mesma_unidade?.selectedItem?.key);
    this.cdRef.detectChanges();
  }

  public onEntregaOutraUnidadeChange(event: Event){
    this.form?.controls.descricao.setValue('');
    //if(this.entrega_outra_unidade?.selectedItem?.key.length) this.form?.controls.descricao.setValue(this.entrega_outra_unidade?.selectedItem?.value);
  }

  public onEntregaCatalogoChange(event: Event){
    this.form?.controls.descricao.setValue(this.entrega_catalogo?.selectedItem?.value || '');
    this.form?.controls.entrega_id.setValue(this.entrega_catalogo?.selectedItem?.key);
    this.cdRef.detectChanges();
  }

  public onForcaTrabalhoChange(row: any){
    let index = this.items.findIndex(x => x["id"] == row["id"]);
    this.items[index].forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho(this.grid?.items as PlanoTrabalhoEntrega[]) * 100) / 100;
  }

}


