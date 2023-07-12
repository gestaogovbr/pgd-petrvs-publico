import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Plano } from 'src/app/models/plano-trabalho.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';

export type badgeEntrega = {
  label: string,
  cor: string,
  nome: string
}

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
  @Input() set entregasDoPlanoEntrega(value: LookupItem[]) { 
    if(JSON.stringify(value) != JSON.stringify(this._entregasDoPlanoEntrega)) {
      this._entregasDoPlanoEntrega = value;
      this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
      this.cdRef.detectChanges();
    }
  }
  get entregasDoPlanoEntrega(): LookupItem[] { return this._entregasDoPlanoEntrega; }

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
  public novaEntrega?: PlanoTrabalhoEntrega;

  private _disabled: boolean = false;
  private _entregasDoPlanoEntrega: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.planoTrabalhoDao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.peeDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = ["entrega", "plano_entrega_entrega.entrega"];
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
   * Método chamado para inserir uma entrega de plano de trabalho no grid, seja este persistente ou não.
   * @returns 
   */
  public async addEntrega() {
    return Object.assign(new PlanoTrabalhoEntrega(), { 
      _status: this.isNoPersist ? "ADD" : "",
      id: this.dao!.generateUuid(),
      plano_id: this.entity?.id
    }) as IIndexable;
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
    if(!row.entrega_id?.length && !row.plano_entrega_entrega_id?.length){ // É uma nova entrega
      form.controls.origem.setValue('MESMA_UNIDADE');
      form.controls.entrega_id.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
    } else if(!row.plano_entrega_entrega_id?.length && !!row.entrega_id?.length){ // É uma entrega do tipo catálogo
      form.controls.origem.setValue('CATALOGO');
      form.controls.entrega_id.setValue(row.entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(null);
    } else if(!row.entrega_id?.length && !!row.plano_entrega_entrega_id?.length && (row.objeto?.plano_entrega_id || row.plano_entrega_entrega?.plano_entrega_id) == this.entity?.plano_entrega_id) {
      form.controls.origem.setValue('MESMA_UNIDADE');
      form.controls.entrega_id.setValue(null);      
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
    } else if(!row.entrega_id?.length && !!row.plano_entrega_entrega_id?.length && (row.objeto?.plano_entrega_id || row.plano_entrega_entrega?.plano_entrega_id) != this.entity?.plano_entrega_id) {
      form.controls.origem.setValue('OUTRA_UNIDADE');
      form.controls.entrega_id.setValue(null);
      await this.carregarEntregasOutraUnidade(row.plano_entrega_entrega?.plano_entrega_id);
      form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
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
    this.novaEntrega = row as PlanoTrabalhoEntrega;
    this.novaEntrega.entrega_id = this.form?.controls.entrega_id.value ?? null;
    this.novaEntrega.plano_entrega_entrega_id = this.form?.controls.plano_entrega_entrega_id.value;
    this.novaEntrega.descricao = this.form?.controls.descricao.value;
    this.novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
    this.loading = true;
    try {
      if(!this.isNoPersist) {
        this.novaEntrega = await (this.dao as PlanoTrabalhoEntregaDaoService).save(this.novaEntrega, this.join); 
        if(this.grid?.adding) this.grid!.items[this.grid!.items.length-1].id = '';  // (*4)
      }
    } catch (e: any) {
      this.error(e.message ? e.message : e.toString() || e);
    } finally {
      this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho + parseFloat((row as PlanoTrabalhoEntrega).forca_trabalho)) * 100) / 100;
      row.objeto = this.entregaCatalogo?.selectedItem?.data || this.entregaMesmaUnidade?.selectedItem?.data || this.entregaOutraUnidade?.selectedItem?.data; // (*)
      this.loading = false;
    }
    return this.novaEntrega;
  }

  /**
   * Método chamado na inicialização do componente para armazenar as entregas da mesma unidade do plano de trabalho.
   * @returns 
   */
  public carregarEntregasMesmaUnidade(): LookupItem[] {
    if(!this.entity?.id?.length) return this.entregasDoPlanoEntrega; // (*5)
    let entregasPlanoEntrega = this.entity?.plano_entrega?.entregas || [];
    let result = entregasPlanoEntrega.map(epe => Object.assign({}, {key: epe.id, value: epe.entrega?.nome || epe.descricao, data: epe}));
    return result;
  }

  /**
   * Método chamado para carregar as entregas de uma outra unidade, com base no seu plano de entregas passado como parâmetro.
   * @param idPlanoOuPlano ID do plano de entregas ou o seu objeto completo.
   */
  public async carregarEntregasOutraUnidade(idPlanoOuPlano: string | PlanoEntrega): Promise<void> {
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

  public tipoEntrega(row: any): badgeEntrega {
    if(!!row.entrega_id?.length) return {label: 'Catálogo', cor: 'secondary', nome: !!row.objeto?.id?.length ? row.objeto?.nome || "Desconhecido" : row.entrega?.nome || "Desconhecido1"};
    let IdDoPlanoEntregaDoPlanoTrabalho:string, IdDoPlanoEntregaDaEntrega:string, badge:string, nome:string, cor:string;
    IdDoPlanoEntregaDoPlanoTrabalho = this.entity?.plano_entrega_id || this.entregasDoPlanoEntrega[0]?.data.plano_entrega_id || 'Desconhecido2';
    IdDoPlanoEntregaDaEntrega = !!row.objeto?.id.length ? row.objeto?.plano_entrega_id || "Desconhecido3" : row.plano_entrega_entrega.plano_entrega_id || "Desconhecido4";   
    [badge,cor] = IdDoPlanoEntregaDoPlanoTrabalho == IdDoPlanoEntregaDaEntrega ? ['Mesma unidade', 'success'] : ['Outra unidade','primary'];
    nome = !!row.objeto?.id.length ? row.objeto?.entrega.nome || "Desconhecido5" : row.plano_entrega_entrega?.entrega.nome || "Desconhecido6";   
    return {label: badge, cor: cor, nome: nome};
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
  - Na chamada do input-search de planos de entreda de outra unidade não pode vir o plano de entrega da própria unidade
  - Ao editar uma entrega de outra unidade, que acabou de ser salva, no grid persistente, o inputSelect de nome da entrega não se atualiza


  plano_trabalho.id: 3ddb0d3d-7e51-4091-ac01-9f312b8c70b3
  entregas_plano_trabalho.id                plano_entrega_entrega_id                  entrega_id
  7f396cc7-b09f-4b92-bd46-909cc2a8b8fb      54a584f7-0b89-11ee-975a-0242ac120002      NULL
  ba43a0e6-6255-4f99-b09a-e06ccf6c997c      NULL                                      6f76cc53-7088-463f-b854-0c2c826f0317
  dcce5d96-bd78-477c-bc81-a1252ac2de76      9281a3f6-5c61-4ca5-9a84-194eba161c99      NULL
  de955a65-7d01-4a3d-8c29-33a062648db6      5d3546cf-0b89-11ee-975a-0242ac120002      NULL
  fb9cc220-5198-48c4-a7ff-2566cf3f191d      NULL                                      9675f1c5-c4fa-44cc-b8d8-5dda4a550382
  
  Soluções:
  $pt = Plano::find("3ddb0d3d-7e51-4091-ac01-9f312b8c70b3")->with('entregas.entrega:id','entregas.planoEntregaEntrega:id')->get(): o obj planoEntregaEntrega associado à entrega 
  $x = PlanoTrabalhoEntrega::where("id","=","e738e620-0177-445c-a26b-a05a787b3cc1")->with('entrega','planoEntregaEntrega')->get()
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

(*4)  if(this.grid?.adding) this.grid!.items[this.grid!.items.length-1].id = '';


(*5)  if(!this.entity?.id?.length) return this.entregasPlanoEntrega;
Quando o componente for chamado por um plano de trabalho (entity) que já existe, não poderá haver alteração no seu plano de entregas, portanto as entregas da mesma unidade do plano de trabalho serão lidas
na própria entity. No entanto, quando o plano de trabalho (entity) ainda não existir (!this.entity?.id?.length), essas entregas vão variar de acordo com o plano de entregas
selecionado no inputSelectComponent, e portanto elas serão lidas na variável que reflete essa escolha (this.entregasPlanoEntrega), e essa reflexão ocorre por causa do bind @Input() set/get entregasPlanoEntrega.


----------------------+--------------------------------------+----------------------------+--------+--------+------------------------------------
ID do Plano           |       Pode ser que a 'row'           |  Características           | Possui | inputs | entrega_id 
de Trabalho           |                                      |                            | objeto | search | plano_entrega_entrega_id
----------------------+--------------------------------------+----------------------------+--------+--------+-------------------------------------
                      | - Já tenha vindo do banco (TIPO I)   |                            |   NÃO  | nenhum | um dos dois
                      |   (foi carregada junto com o Plano)  |                            |        |        |
                      |--------------------------------------+----------------------------+--------+--------+--------------------------------------
  EXISTE              | - Tenho sido salva agora no banco    |                            |   SIM  | um dos | um dos dois
  - Então o Grid é    |   (TIPO II)                          |                            |        | três   |
    Persistente       |--------------------------------------+----------------------------+--------+--------+------------------------------------
                      | - Esteja sendo criada agora          | addEntrega loadEntrega     |   NÃO  | um dos | nenhum
                      |                                      |                            |        | três   |
                      |--------------------------------------+----------------------------+--------+--------+-----------------------------------     
                      | - Seja do TIPO I e esteja sendo      | loadEntrega                |   NÃO  | um dos | um dos dois
                      |   editada agora                      |                            |        | três   |
                      +--------------------------------------+----------------------------+--------+--------+------------------------------------
                      | - Seja do TIPO II e esteja sendo     | loadEntrega                |   SIM  | um dos | um dos dois
                      |   editada agora                      |                            |        | três   |
----------------------+--------------------------------------+----------------------------+--------+--------+-----------------------------------------
  NÃO                 | - Já exista nos itens do grid        |                            |   SIM  | nenhum | um dos dois
  EXISTE              |   (foi salva agora, não no banco)    | Possui _status == "ADD"    |        |        |
  - Então o Grid é    |--------------------------------------+----------------------------+--------+--------+---------------------------------------
    Não-persistente   | - Esteja sendo criada agora          | Possui _status == "ADD"    |   NÃO  | um dos | nenhum
                      |                                      | addEntrega loadEntrega     |        | três   |
                      |--------------------------------------+----------------------------+--------+--------+---------------------------------------
                      | - Tenha acabado de ser criada e      | Possui _status == "ADD"    |   SIM  | um dos | um dos dois
                      |   já está sendo editada              | loadEntrega                |        | três   |
------------------------------------------------------------------------------------------+--------+--------+--------------------------------------
(*) O ADD é inserido pelo método addEntrega e só sai quando persiste no banco e volta
(*) O objeto é inserido pelo método saveEntrega e permanece mesmo depois de persistida no banco







*/