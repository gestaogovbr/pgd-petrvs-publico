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
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Plano | undefined) { super.entity = value; } get entity(): Plano | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() cdRef: ChangeDetectorRef;
  @Input() set entregasPlanoEntrega(value: LookupItem[]) { 
    if(JSON.stringify(value) != JSON.stringify(this._entregasPlanoEntrega)) {
      this._entregasPlanoEntrega = value;
      this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
      this.cdRef.detectChanges();
    }
  }
  get entregasPlanoEntrega(): LookupItem[] { return this._entregasPlanoEntrega; }

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
  public totalForcaTrabalho: number = 0;
  public entregasMesmaUnidade: LookupItem[] = [];
  public entregasOutraUnidade: LookupItem[] = [];
  public entregasCatalogo: LookupItem[] = [];
  public planoEntregaOutraUnidade?: PlanoEntrega | null;

  private _disabled: boolean = false;
  private _entregasPlanoEntrega: LookupItem[] = [];


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

  /**
   * Método chamado para a validação dos campos do formulário, por ocasião da edição ou inserção de itens.
   * @param control 
   * @param controlName 
   * @returns 
   */
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['descricao','forca_trabalho'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório!";
    if(['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1 || control.value > 100)) result = "Deve estar entre 1 e 100";
    if(['entrega_id'].indexOf(controlName) >= 0) {
      if(this.form?.controls.origem.value == 'CATALOGO' && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !!e.entrega_id && !e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0; // (*1)
      if(cont > 0) result = "Esta entrega está em duplicidade!";
    }
    if(['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
      if(['MESMA_UNIDADE','OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value) result = "Este campo não pode ser nulo!";
      let cont = this.entity?.entregas?.filter(e => !e.entrega_id && !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.plano_entrega_entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0; // (*2)
      if(cont > 0) result = "Esta entrega está em duplicidade!";
    }
    return result;
  }

  /**
   * Método chamado na inicialização do componente. Neste momento são carregadas as entregas do catálogo e as entregas da mesma unidade do plano de trabalho,
   * visto que esses itens não se alteram durante a vida do componente e poderão ser utilizados durante sua utilização.
   */
  async ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho(this.entity?.entregas) * 100)/100;
    this.entregasCatalogo = await this.carregarEntregasCatalogo();
    this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
  }

  /**
   * Método utilizado durante a inclusão/alteração de uma entrega de plano de trabalho no grid, seja ele persistente ou não
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
   * Método chamado para inserir uma entrega de plano de trabalho no grid, seja este persistente ou não.
   * @returns 
   */
  public async addEntrega() {
    return Object.assign(new PlanoTrabalhoEntrega(), { 
      _status: "ADD",
      id: this.dao!.generateUuid(),
      plano_id: this.entity?.id
    }) as IIndexable;
  }

  /**
   * Método chamado para a exclusão de uma entrega de plano de trabalho do grid, seja este persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removeEntrega(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      this.loading = true;
      try {
        this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
      } finally {
        this.loading = false;
      }
      this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho - parseFloat((row as PlanoTrabalhoEntrega).forca_trabalho)) * 100) / 100;
      return this.isNoPersist ? false : true; // (*3)
    } else {
      return false;
    }
  }

  /**
   * Método chamado no salvamento de uma entrega do plano de trabalho do grid, seja este persistente ou não.
   * @param form 
   * @param row 
   * @returns 
   */
  public async saveEntrega(form: FormGroup, row: any) {
    let novaEntrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    novaEntrega.id = row.id;
    novaEntrega.entrega_id = this.form?.controls.entrega_id.value ?? null;
    novaEntrega.plano_entrega_entrega_id = this.form?.controls.plano_entrega_entrega_id.value;
    novaEntrega.descricao = this.form?.controls.descricao.value;
    novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.loading = true;
    try {
      if(!this.isNoPersist) novaEntrega = await (this.dao as PlanoTrabalhoEntregaDaoService).save(novaEntrega, this.join); 
      if(this.grid?.editing && !this.grid?.adding) Object.assign(novaEntrega, { _status: novaEntrega._status == "ADD" ? "ADD" : "EDIT" });
    } catch (e: any) {
      this.error(e.message ? e.message : e.toString() || e);
    } finally {
      this.loading = false;
    }
    return novaEntrega;
  }

  /**
   * Método chamado na inicialização do componente para armazenar as entregas da mesma unidade do plano de trabalho.
   * @returns 
   */
  public carregarEntregasMesmaUnidade(): LookupItem[] {
    if(!this.entity?.id?.length) return this.entregasPlanoEntrega; // (*4)
    let entregasPlanoEntrega = this.entity?.plano_entrega?.entregas || [];
    return entregasPlanoEntrega.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || epe.descricao, data: epe}));
  }

  /**
   * Método chamado para carregar as entregas de uma outra unidade, com base no seu plano de entregas passado como parâmetro.
   * @param idPlanoOuPlano ID do plano de entregas ou o seu objeto completo.
   */
  public async carregarEntregasOutraUnidade(idPlanoOuPlano: string | PlanoEntrega){
    this.cdRef.detectChanges();
    this.planoEntregaOutraUnidade = typeof idPlanoOuPlano == 'string' ? await this.planoEntregaDao!.getById(idPlanoOuPlano, ["entregas.entrega", "unidade"]) : idPlanoOuPlano;
    this.entregasOutraUnidade = this.planoEntregaOutraUnidade?.entregas.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || epe.descricao, data: epe})) || [];
  }

  /**
   * Método chamado para carregar as entregas existentes no Catálogo de Entregas.
   * @returns 
   */
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
    this.totalForcaTrabalho = Math.round((this.somaForcaTrabalho(this.grid?.items as PlanoTrabalhoEntrega[]) - parseFloat(this.items[index].forca_trabalho) + parseFloat(this.form?.controls.forca_trabalho.value)) * 100) / 100;
  }
}

  /*
  PROBLEMAS:

  - O evento de selecionar o conteúdo do input-text ou pressionar TAB está desviando o fluxo para a homepage;

  - O maxWidth da coluna "Entrega" funciona para a exibição mas não para a edição, seja o grid persistente ou não
  - Durante a inclusão de uma entrega, ao mudar a origem para OUTRA UNIDADE, o evento onOrigemChange define o inputSelect 'entregaOutraUnidade', e abre
    a janela modal para a seleção do plano de entregas. Ao retornar com o plano escolhido, o inputSelect já está undefined.
  - Após as alterações, o grid não atualiza automaticamente.
  - Ao salvar uma nova entrega do tipo Catálogo, o campo entrega_id é preenchido com 'Desconhecido'.
  - Ao salvar uma nova entrega do tipo Mesma Unidade, o batch e a entrega ficam preenchidos de forma errada, embora com a recarga da página passem a apresentar dados corretos.
  */

  /*
  TESTES

                                                    GRID PERSISTENTE                      GRID NÃO-PERSISTENTE
                                                Fluxo Feliz    Validações                Fluxo Feliz    Validações
  Inclusão Entrega Catálogo                          
  Inclusão Entrega Mesma Unidade                     
  Inclusão Entrega Outra Unidade                     
  Alteração Entrega Catálogo                         
  Alteração Entrega Mesma Unidade                    
  Alteração Entrega Outra Unidade                    
  Cancelamento Entrega Catálogo                      
  Cancelamento Entrega Mesma Unidade                 
  Cancelamento Entrega Outra Unidade                 
  Exclusão Entrega Catálogo                          
  Exclusão Entrega Mesma Unidade                     
  Exclusão Entrega Outra Unidade                     

  */

/*
OBSERVAÇÕES:

(*1)  let cont = this.entity?.entregas?.filter(e => !!e.entrega_id && !e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
Filtra as entregas da mesma unidade do plano de trabalho excluindo a entrega que está sendo editada. Em seguida conta aquelas que possuem o mesmo ID da que está sendo editada e dessa forma o resultado deve ser igual a 0, caso contrário a entrega editada
já existe no grid.

(*2)  let cont = this.entity?.entregas?.filter(e => !e.entrega_id && !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).map(e => e.plano_entrega_entrega_id).reduce((acc, id) => { if(id === control.value) return acc + 1; else return acc; }, 0) || 0;
Idem à obs 1, em relação às entregas de outras unidades.

(*3)  return this.isNoPersist ? false : true;
Após confirmada a remoção pelo usuário, a entrega é setada com _status = "DELETE" e é excluída da tela e sua confirmação é retornada para o método onDeleteItem() do gridComponent, que a excluirá também dos items do grid.
Entretanto, quando se trata de um grid não persistente, ela não deve ser excluída dos items do grid, pois sua exclusão só se efetivará quando entity for salva, levando
todas as suas entregas para o back-end, que finalmente excluirá as que possuírem _status = "DELETE".

(*4)  if(!this.entity?.id?.length) return this.entregasPlanoEntrega;
Quando o componente for chamado por um plano de trabalho (entity) que já existe, não poderá haver alteração no seu plano de entregas, portanto as entregas da mesma unidade do plano de trabalho serão lidas
na própria entity. No entanto, quando o plano de trabalho (entity) ainda não existir (!this.entity?.id?.length), essas entregas vão variar de acordo com o plano de entregas
selecionado no inputSelectComponent, e portanto elas serão lidas na variável que reflete essa escolha (this.entregasPlanoEntrega), e essa reflexão ocorre por causa do bind @Input() set/get entregasPlanoEntrega.

*/