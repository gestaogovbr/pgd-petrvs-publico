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
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';

@Component({
  selector: 'plano-list-entrega',
  templateUrl: './plano-list-entrega.component.html',
  styleUrls: ['./plano-list-entrega.component.scss']
})
export class PlanoListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('origem', { static: false }) public origem?: InputSelectComponent;
  @ViewChild('entregaMesmaUnidade', { static: false }) public entregaMesmaUnidade?: InputSelectComponent;
  @ViewChild('entregaOutraUnidade', { static: false }) public entregaOutraUnidade?: InputSelectComponent;
  @ViewChild('entregaCatalogo', { static: false }) public entregaCatalogo?: InputSelectComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Plano | undefined) { super.entity = value; } get entity(): Plano | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }

  public get items(): PlanoTrabalhoEntrega[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Plano());
    if (!this.gridControl.value.entregas) this.gridControl.value.entregas = [];
    return this.gridControl.value.entregas;
  }
  public options: ToolbarButton[] = [];
  public entregaDao?: EntregaDaoService;
  public planoTrabalhoDao?: PlanoDaoService;
  public planoEntregaDao?: PlanoEntregaDaoService;
  public peeDao?: PlanoEntregaEntregaDaoService;
  private _disabled: boolean = false;
  public totalForcaTrabalho: number = 0;
  public entregasMesmaUnidade: LookupItem[] = [];
  public entregasOutraUnidade: LookupItem[] = [];
  public entregasCatalogo: LookupItem[] = [];
  public planoEntregaOutraUnidade?: PlanoEntrega | null;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.planoTrabalhoDao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.peeDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = ["entrega", "entrega_plano_entrega.entrega"];
    this.form = this.fh.FormBuilder({
      origem: {default: null},
      entregaMesmaUnidade: {default: null},
      entregaOutraUnidade: {default: null},
      entregaCatalogo: {default: null},
      descricao: {default: ""},
      forca_trabalho: {default: 1},
      plano_id: {default: null},
      entrega_id: {default: null},
      plano_entrega_entrega_id: {default: null}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['descricao','forca_trabalho'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório!";
    if(['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1 || control.value > 100)) result = "Deve estar entre 1 e 100";
    if(['entrega_id'].indexOf(controlName) >= 0) {
      if(this.form?.controls.origem.value == 'CATALOGO' && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !!e.entrega_id && !e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
      if(cont > 0) result = "Esta entrega está em duplicidade!";
    }
    if(['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
      if(['MESMA_UNIDADE','OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !e.entrega_id && !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.plano_entrega_entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
      if(cont > 0) result = "Esta entrega está em duplicidade!";
    }
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
   * Método utilizado durante a inclusão/alteração de uma entrega de plano de trabalho no grid persistente
   * @param form 
   * @param row 
   */
  public async loadEntrega(form: FormGroup, row: any) {
    form.controls.descricao.setValue(row.descricao);
    form.controls.forca_trabalho.setValue(row.forca_trabalho);
    form.controls.plano_id.setValue(row.plano_id);
    if(!row.plano_entrega_entrega_id?.length && row.entrega_id?.length){
      form.controls.origem.setValue('CATALOGO');
      form.controls.entrega_id.setValue(row.entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(null);
    } else if(!row.entrega_id?.length && row.plano_entrega_entrega_id?.length && row.entrega_plano_entrega?.plano_entrega_id == this.entity?.plano_entrega_id) {
      form.controls.origem.setValue('MESMA_UNIDADE');
      form.controls.entrega_id.setValue(null);      
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
    } else if(!row.entrega_id?.length && row.plano_entrega_entrega_id?.length && row.entrega_plano_entrega?.plano_entrega_id != this.entity?.plano_entrega_id) {
      form.controls.origem.setValue('OUTRA_UNIDADE');
      form.controls.entrega_id.setValue(null);
      await this.carregarEntregasOutraUnidade(row.entrega_plano_entrega?.plano_entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
    } else {  // inclusão de uma nova entrega
      form.controls.origem.setValue('MESMA_UNIDADE');
      form.controls.entrega_id.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
    }
  }
  
  /**
   * Método chamado para somar os percentuais das forças de trabalho do array de entregas passado como parâmetro.
   * @param entregas Array de entregas do plano de trabalho
   * @returns 
   */
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

  /**
   * Método chamado para a exclusão de uma entrega de plano de trabalho.
   * @param row 
   * @returns 
   */
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
    //*********************** */
    delete row['entrega'];
    delete row['entrega_plano_entrega'];
    let novaEntrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    novaEntrega.entrega_id = this.form?.controls.entrega_id.value ?? null;
    novaEntrega.plano_entrega_entrega_id = this.form?.controls.plano_entrega_entrega_id.value;
    novaEntrega.descricao = this.form?.controls.descricao.value;
    novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.loading = true;
    try {
      if(!this.isNoPersist) novaEntrega = await (this.dao as PlanoTrabalhoEntregaDaoService).save(novaEntrega, this.join); 
      this.grid!.items[this.grid!.items.length-1].id = '';
    } catch (e: any) {
      this.error(e.message ? e.message : e.toString() || e);
    } finally {
      this.loading = false;
    }
    return novaEntrega;
  }

  /**
   * Método chamado após o salvamento de uma entrega do plano de trabalho.
   * @param novaEntrega Entrega do plano de trabalho recentemente salva.
   */
  public afterSaveEntrega(novaEntrega: PlanoTrabalhoEntrega){
    novaEntrega!.entrega = this.entregaCatalogo?.selectedItem?.data;
    novaEntrega!.entrega_plano_entrega = this.origem?.value == 'MESMA_UNIDADE' ? this.entregaMesmaUnidade?.selectedItem?.data : this.entregaOutraUnidade?.selectedItem;
    this.grid?.reloadFilter();
  }

  public carregarEntregasMesmaUnidade(): LookupItem[] {
    let entregasPlanoEntrega = this.entity?.plano_entrega?.entregas || [];
    return entregasPlanoEntrega.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || '', data: epe}));
  }

  public async carregarEntregasOutraUnidade(idPlanoOuPlano: string | PlanoEntrega){
    this.planoEntregaOutraUnidade = typeof idPlanoOuPlano == 'string' ? await this.planoEntregaDao!.getById(idPlanoOuPlano, ["entregas", "unidade"]) : idPlanoOuPlano;
    this.entregasOutraUnidade = this.planoEntregaOutraUnidade?.entregas.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || '', data: epe})) || [];
    this.cdRef.detectChanges();
  }

  public async carregarEntregasCatalogo(): Promise<LookupItem[]>{
    let result: LookupItem[] = [];
    result = (await this.entregaDao?.query().getAll())?.map(ee => Object.assign({}, {key: ee.id, value: ee.nome, data: ee})) || [];
    return result;
  }

  /* ---------  TRATAMENTO DOS EVENTOS ----------- */

  public onOrigemChange(row: any){
    let value = this.form!.controls.origem.value;
    if(['MESMA_UNIDADE','OUTRA_UNIDADE'].includes(value)){
      this.form?.controls.entrega_id.setValue(null);
      this.cdRef.detectChanges();
      if(value == "OUTRA_UNIDADE") this.entregaOutraUnidade?.onSearchClick(this.entregaOutraUnidade?.searchRoute);
    } else if(value == 'CATALOGO'){
      this.form?.controls.plano_entrega_entrega_id.setValue(null);
    }
  }

  public onEntregaMesmaUnidadeChange(event: Event){
    if(this.entregaMesmaUnidade?.selectedItem) {
      this.form?.controls.descricao.setValue(this.entregaMesmaUnidade?.selectedItem?.value || '');
      this.form?.controls.plano_entrega_entrega_id.setValue(this.entregaMesmaUnidade?.selectedItem?.key);
      this.cdRef.detectChanges();    
    }
  }

  public onEntregaOutraUnidadeChange(event: Event){
    if(this.entregaOutraUnidade?.selectedItem) {
      this.form?.controls.descricao.setValue(this.entregaOutraUnidade?.selectedItem?.value || '');
      this.form?.controls.plano_entrega_entrega_id.setValue(this.entregaOutraUnidade?.selectedItem?.key);
      this.cdRef.detectChanges();    
    }
  }
  
  public onEntregaCatalogoChange(event: Event){
    if(this.entregaCatalogo?.selectedItem) {
      this.form?.controls.descricao.setValue(this.entregaCatalogo?.selectedItem?.value || '');
      this.form?.controls.entrega_id.setValue(this.entregaCatalogo?.selectedItem?.key);
      this.cdRef.detectChanges();
    }
  }

  public onForcaTrabalhoChange(row: any){
    let index = this.items.findIndex(x => x["id"] == row["id"]);
    this.totalForcaTrabalho = (Math.round(this.somaForcaTrabalho(this.grid?.items as PlanoTrabalhoEntrega[]) * 100) - parseFloat(this.items[index].forca_trabalho) + parseFloat(this.form?.controls.forca_trabalho.value)) / 100;
  }
}


  /*
  TESTES

                                                    GRID PERSISTENTE                      GRID NÃO-PERSISTENTE
                                                Fluxo Feliz    Validações                Fluxo Feliz    Validações
  Inclusão Entrega Catálogo                         OK            OK
  
  Inclusão Entrega Mesma Unidade                    OK            OK
  
  Inclusão Entrega Outra Unidade                    OK            
  
  Alteração Entrega Catálogo                        OK            OK
  
  Alteração Entrega Mesma Unidade                   OK            OK
  
  Alteração Entrega Outra Unidade                   
  
  Cancelamento Entrega Catálogo                     OK            OK
  
  Cancelamento Entrega Mesma Unidade                OK            OK
  
  Cancelamento Entrega Outra Unidade                
  
  Exclusão Entrega Catálogo                         OK            OK
  
  Exclusão Entrega Mesma Unidade                    OK            OK        
  
  Exclusão Entrega Outra Unidade                                     

  */

  /*
  PROBLEMAS:

  - O evento de selecionar o conteúdo do input-text está desviando o fluxo para a homepage;
  - Ao incluir um item no grid, o select origem não inicia setado
  - Ao alterar um item do grid, os selects de entrega ficam undefined
  - O maxWidth da coluna "Entrega" funciona para a exibição mas não para a edição

  */