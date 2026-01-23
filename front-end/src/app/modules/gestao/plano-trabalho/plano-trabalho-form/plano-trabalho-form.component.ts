import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { ProgramaDaoService, ProgramaMetadata } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento } from 'src/app/models/documento.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Programa } from 'src/app/models/programa.model';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { DocumentoService } from 'src/app/modules/uteis/documentos/documento.service';
import { DocumentosComponent } from 'src/app/modules/uteis/documentos/documentos.component';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { TemplateDataset, TemplateService } from 'src/app/modules/uteis/templates/template.service';
import { Template } from 'src/app/models/template.model';
import { UtilService } from 'src/app/services/util.service';
import moment from 'moment';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';
import { UnidadeIntegranteAtribuicao } from 'src/app/models/unidade-integrante-atribuicao.model';
import { ProgramaService } from 'src/app/services/programa.service';

@Component({
  selector: 'plano-trabalho-form',
  templateUrl: './plano-trabalho-form.component.html',
  styleUrls: ['./plano-trabalho-form.component.scss']
})

export class PlanoTrabalhoFormComponent extends PageFormBase<PlanoTrabalho, PlanoTrabalhoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('gridAtividades', { static: false }) public gridAtividades?: GridComponent;
  @ViewChild('gridDocumentos', { static: false }) public gridDocumentos?: GridComponent;
  @ViewChild('tabs', { static: false }) public tabs?: TabsComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('programa', { static: false }) public programa?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSelectComponent;
  @ViewChild('tipoModalidade', { static: false }) public tipoModalidade?: InputSelectComponent;
  @ViewChild('planoEntrega', { static: false }) public planoEntrega?: InputSearchComponent;
  @ViewChild('atividade', { static: false }) public atividade?: InputSearchComponent;
  @ViewChild('entrega', { static: false }) public entrega?: InputSelectComponent;
  @ViewChild('documentos', { static: false }) public documentos?: DocumentosComponent;

  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public documentoDao: DocumentoDaoService;
  public documentoService: DocumentoService;
  public templateService: TemplateService;
  public utilService: UtilService;
  public allPages: ListenerAllPagesService;
  public calendar: CalendarService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public horasTotais?: Efemerides;
  public horasParciais?: Efemerides;
  public planoDataset: TemplateDataset[];
  public joinPrograma: string[];
  public entregas: LookupItem[] = [];
  public planoTrabalho?: PlanoTrabalho;
  public datasource: any;
  public template?: Template;
  public editingId?: string;
  public gestoresUnidadeExecutora: string[] = [];
  public programaMetadata: ProgramaMetadata;
  public usuarioUnidades: LookupItem[] = [];
  public selectedPrograma?: Programa;
  public selectedUnidade?: Unidade;
  public selectedModalidade?: TipoModalidade;
  public tipoModalidadeItems: LookupItem[] = [];
  public planosUsuarioComPendencias: boolean = false;
  public programaService: ProgramaService;


  constructor(public injector: Injector) {
    super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
    this.join = [
      "unidade.entidade", 
      "entregas.entrega", 
      "entregas.plano_entrega_entrega:id,plano_entrega_id", 
      "usuario.participacoes_programas",
      "usuario.lotacao",
      "usuario.areas_trabalho.atribuicoes",
      "usuario.unidades",
      "programa.template_tcr", 
      "tipo_modalidade", 
      "documento", 
      "documentos.assinaturas.usuario:id,nome,apelido", 
      "entregas.plano_entrega_entrega.entrega",
      "entregas.plano_entrega_entrega.plano_entrega.unidade:id,nome,sigla",
      'entregas.reacoes.usuario:id,nome,apelido'
    ];
    this.joinPrograma = ["template_tcr"];
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.documentoService = injector.get<DocumentoService>(DocumentoService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this.utilService = injector.get<UtilService>(UtilService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.programaService = injector.get<ProgramaService>(ProgramaService);

    this.modalWidth = 1300;
    this.planoDataset = this.dao!.dataset();
    this.form = this.fh.FormBuilder({
      carga_horaria: { default: "" },
      tempo_total: { default: "" },
      tempo_proporcional: { default: "" },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      usuario_id: { default: "" },
      unidade_id: { default: "" },
      programa_id: { default: "" },
      documento_id: { default: null },
      documentos: { default: [] },
      atividades: { default: [] },
      entregas: { default: [] },
      tipo_modalidade_id: { default: "" },
      forma_contagem_carga_horaria: { default: "DIA" },
      editar_texto_complementar_unidade: { default: false },
      editar_texto_complementar_usuario: { default: false },
      unidade_texto_complementar: { default: "" },
      usuario_texto_complementar: { default: "" },
      criterios_avaliacao: { default: [] },
      criterio_avaliacao: { default: "" }
    }, this.cdRef, this.validate);
    this.programaMetadata = {
      todosUnidadeExecutora: false,
      vigentesUnidadeExecutora: true
    }
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
    this.buscaGestoresUnidadeExecutora(this.entity?.unidade ?? null);
  }

  public atualizarTcr() {
    this.entity = this.loadEntity();
 
    if (!this.formDisabled) {
      let textoUsuario = this.form!.controls.usuario_texto_complementar.value;
      let textoUnidade = this.form!.controls.unidade_texto_complementar.value;
      let documento = this.planoTrabalhoService.atualizarTcr(this.planoTrabalho!, this.entity!, textoUsuario, textoUnidade);
      this.form?.controls.documento_id.setValue(documento?.id);
      this.form?.controls.documentos.setValue(this.entity!.documentos);
      this.datasource = documento?.datasource || {};
      this.template = this.selectedPrograma?.template_tcr;
      this.editingId = ["ADD", "EDIT"].includes(documento?._status || "") ? documento!.id : undefined;
    }
    this.cdRef.detectChanges();
  }

  public get isTermos(): boolean {
    return this.action == "termos";
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    
    if (this.isRequiredFieldEmpty(control, controlName)) {
      result = "Obrigatório";
    } else if (this.isCargaHorariaInvalid(control, controlName)) {
      result = "Valor não pode ser zero.";
    } else if (this.isDateInvalid(control, controlName)) {
      result = "Inválido";
    } else if (this.isEndDateBeforeStartDate(control, controlName)) {
      result = "Menor que o início";
    } else if (this.isStartDateBeforeProgramStart(control, controlName)) {
      result = "Menor que programa";
    } else if (this.isEndDateAfterProgramEnd(control, controlName)) {
      result = "Maior que programa";
    } else if (this.limit365days(control, controlName)) {
      result = "Limite de 365 dias";
    }
    
    return result;
  }

  private isRequiredFieldEmpty(control: AbstractControl, controlName: string): boolean {
    const requiredFields = ['unidade_id', 'programa_id', 'usuario_id', 'tipo_modalidade_id'];
    return requiredFields.includes(controlName) && !control.value?.length;
  }

  private isCargaHorariaInvalid(control: AbstractControl, controlName: string): boolean {
    return controlName === 'carga_horaria' && !control.value;
  }

  private isDateInvalid(control: AbstractControl, controlName: string): boolean {
    const dateFields = ['data_inicio', 'data_fim'];
    return dateFields.includes(controlName) && !this.util.isDataValid(control.value);
  }

  private isEndDateBeforeStartDate(control: AbstractControl, controlName: string): boolean {
    if (controlName !== 'data_fim') return false;
    
    const startDate = this.form?.controls.data_inicio.value;
    return this.util.isDataValid(startDate) && 
           this.util.asTimestamp(control.value) <= this.util.asTimestamp(startDate);
  }

  private isStartDateBeforeProgramStart(control: AbstractControl, controlName: string): boolean {
    if (controlName !== 'data_inicio' || !this.selectedPrograma) return false;

    return moment(control.value as Date).startOf('day') < 
           moment(this.selectedPrograma.data_inicio).startOf('day');
  }

  private isEndDateAfterProgramEnd(control: AbstractControl, controlName: string): boolean {
    if (controlName !== 'data_fim' || !this.selectedPrograma) return false;
    
    return moment(control.value as Date).startOf('day') > 
           moment(this.selectedPrograma.data_fim).startOf('day');
  }

  private limit365days = (control: AbstractControl, controlName: string) => {
    if (controlName !== 'data_fim') return false;

    const startDate = this.form?.controls.data_inicio.value;
    if (!this.util.isDataValid(startDate) || !this.util.isDataValid(control.value)) return false;

    const start = moment(startDate).startOf('day');
    const end = moment(control.value).startOf('day');
    const limit = start.clone().add(365, 'days');
    // Retorna true quando ultrapassa 365 dias
    return end.isAfter(limit);
  }

  public formValidation = async (form?: FormGroup) => {
    let result = "";
    return result;
    // TODO:
    // Validar se as entregas pertencem ao plano de entregas da unidade
  };

  public onUnidadeSelect() {
    if(this.unidade!.selectedItem){
      this.carregaProgramas(this.unidade?.selectedItem?.key);
      let unidade = this.usuario?.selectedEntity?.unidades.find((u: Unidade) => u.id == this.unidade?.selectedItem?.key);
      this.selectedUnidade = unidade;

      let usuario = this.usuario?.selectedEntity as Usuario;
      this.entity!.unidade = unidade;
      this.entity!.unidade_id = unidade.id;
      this.form!.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
      this.form!.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
      this.form!.controls.usuario_texto_complementar.setValue(usuario?.texto_complementar_plano || "");

      this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id','gestores_substitutos:id,usuario_id','gestores_delegados:id,usuario_id']).then( unidade => {
        this.buscaGestoresUnidadeExecutora(unidade);
      });
    } else {
      if (this.programa) this.programa.items = [];
    }
  }

  /**
   * Carrega os programas disponíveis para uma unidade específica
   * @param unidadeId - ID da unidade para carregar os programas
   */
  async carregaProgramas(unidadeId: string) {
    try {
      if (!unidadeId) {
        console.warn('ID da unidade não fornecido para carregar programas');
        return;
      }

      const programas = await this.programaDao.query({
        where: [['todosUnidadeExecutora', '==', unidadeId]],
        join: this.joinPrograma,
        orderBy: [["unidade.path", "desc"]]
      }).asPromise();

      if (programas.length > 0) {
        if (this.programa) this.programa.items = programas.map(prog => ({
          key: prog.id,
          value: prog.nome,
          data: prog
        }));
        const programaVigente = this.programaService.selecionaProgramaVigente(programas);
        this.preenchePrograma(programaVigente || programas[0]);
      } else {
        this.regramentoNaoEncontrado();
      }
    } catch (error) {
      console.error('Erro ao carregar programas:', error);
      this.dialog.alert('Erro', 'Não foi possível carregar os programas disponíveis.');
      this.regramentoNaoEncontrado();
    }
  }

  async carregaModalidades(pedagio: boolean) {
    try {
      const where: [string, string, any][] = pedagio ? [['exige_pedagio', '==', 0]] : [];
      const modalidades = await this.tipoModalidadeDao.query({
        where: where,
        join: ['modalidadeSiape'],
      }).asPromise();

      if (modalidades.length > 0) {
        this.tipoModalidadeItems = modalidades.map(mod => ({
          key: mod.id,
          value: mod.nome,
          data: mod
        }));
        this.selecionaModalidade();
      } else {
        this.dialog.alert('Erro', 'Não foi possível carregar as modalidades disponíveis.');
      }
    } catch (error) {
      console.error('Erro ao carregar modalidades:', error);
      this.dialog.alert('Erro', 'Ocorreu um erro ao carregar as modalidades.');
    }
  }

  public selecionaModalidade() {
    //buscar por igualdade direta de tipo_modalidade_id
    let modalidade = this.tipoModalidadeItems.find((mod: LookupItem) => (mod.data as TipoModalidade).id == this.entity?.usuario?.tipo_modalidade_id);
    if (modalidade) {
      this.form?.controls.tipo_modalidade_id.setValue(modalidade.key);
      this.selectedModalidade = modalidade.data;
    } else {
      this.form?.controls.tipo_modalidade_id.setValue(this.tipoModalidadeItems[0].key);
    }
  }

  public changeModalidade() {
    if (this.entity!.usuario?.tipo_modalidade_id != this.form?.controls.tipo_modalidade_id.value) {
      this.dialog.confirm('Atenção', 'Você está propondo plano de trabalho com modalidade distinta daquela registrada pela sua chefia imadiata no SouGov Líder. Deseja continuar?').then((result) => {
        if (!result) {
          this.selecionaModalidade();
        }
      });
    }
  }

  public podeEditarTextoComplementar(unidade_id : string) : string|undefined {
    return (unidade_id == this.auth.unidadeGestor()?.id) ? 
    undefined:
    'true' ; 
  }

  public onProgramaSelect() {
    if (!this.programa?.selectedItem) return;
    let programa = this.programa.selectedItem.data as Programa;
    this.selectedPrograma = programa;
    this.entity!.programa_id = programa.id;
    this.entity!.programa = programa;
    this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
    this.form?.controls.data_inicio.updateValueAndValidity();
    this.form?.controls.data_fim.updateValueAndValidity();
  }

  public async onUsuarioSelect(selected: SelectItem) {    
    try {
      if (['new', 'clone'].includes(this.action))
        this.planosUsuarioComPendencias = await this.dao!.planosUsuarioComPendencias(selected.entity.id);
      if(this.planosUsuarioComPendencias) {
        if (this.editableForm) {
          this.editableForm.noButtons = 'true';
          this.editableForm.error = 'Não é possível criar um novo plano enquanto houver pendências de registro de execução e/ou avaliação de planos anteriores.';
        }
      } else {
        this.editableForm!.noButtons = undefined;
        this.editableForm!.error = undefined;
        this.processarUnidadesUsuario(selected.entity);
        this.resetProgramaItems();
        this.carregaProgramas(selected.entity.lotacao.unidade_id);

        if (selected.entity.pedagio) {
          await this.carregaModalidades(true);
        } else {
          await this.carregaModalidades(false);
        }
      }
      const participa = this.utilService.slugify(selected.entity.participa_pgd ?? '');
      if (participa === 'nao') {
        this.dialog.alert('Atenção', 'Antes de elaborar plano de trabalho, solicite à sua chefia imadiata que selecione-o como participante do PGD no SouGov Líder e aguarde a atualização do sistema');
        this.editableForm!.noButtons = 'true';
      }
      
      this.form!.controls.usuario_texto_complementar.setValue(selected.entity.texto_complementar_plano || "");
      if(!this.form?.controls.unidade_id.value) {
        selected.entity.unidades?.every(async (unidade: any) => {
          if (selected.entity.lotacao.unidade_id == unidade.id) {
            //this.preencheUnidade(unidade);
            return false;
          } else return true;
        })
      }

      if(selected.entity.pedagio) {
        let modalidades = await this.tipoModalidadeDao.query({
          where: [['exige_pedagio', '==', 0]]
        }).asPromise();
        this.form?.controls.tipo_modalidade_id.setValue(modalidades[0]?.id);
      }
      
     
    } catch (error) {
      console.error('Erro ao selecionar usuário:', error);
      this.dialog.alert('Erro', 'Ocorreu um erro ao processar a seleção do usuário.');
    }
  }

  /**
   * Reseta os itens do programa para o estado inicial
   */
  private resetProgramaItems(): void {
    if (this.programa) {
      this.programa.items = [];
    }
  }

  /**
   * Processa as unidades do usuário selecionado
   * @param usuario - Entidade do usuário selecionado
   */
  private processarUnidadesUsuario(usuario: Usuario): void {
    const unidadeIds = usuario.areas_trabalho?.map((at: UnidadeIntegrante) => {
      let usuarioAtribuicoes = at.atribuicoes.map((a: UnidadeIntegranteAtribuicao) => a.atribuicao);
      if (usuarioAtribuicoes.length == 1 && usuarioAtribuicoes.includes('GESTOR_DELEGADO')) {
        return [];
      }
      return at.unidade_id;
    }) || [];
    
    this.usuarioUnidades = usuario.unidades?.filter((unidade: Unidade) => 
      unidadeIds.flat().includes(unidade.id)
    ).map((unidade: Unidade) => ({
      key: unidade.id,
      value: `${unidade.sigla} - ${unidade.nome}`
    })) || [];
  }


  public preenchePrograma(programa: Programa) {
    if(programa){
      this.selectedPrograma = programa;
      this.form?.controls.programa_id.setValue(programa.id);
      this.entity!.programa_id = programa.id;
      this.entity!.programa = programa;
      this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
      this.form?.controls.data_inicio.updateValueAndValidity();
      this.form?.controls.data_fim.updateValueAndValidity();
    } else {
      this.form?.setErrors({programa: "Não há programa vigente para a unidade executora."});
    }
  }

  public onDataInicioChange(event: Event) {
    this.calculaTempos();
  }

  public onDataFimChange(event: Event) {
    this.calculaTempos();
  }

  public onCargaHorariaChenge(event: Event) {
    this.calculaTempos();
  }

  public calculaTempos() {
    const inicio = this.form?.controls.data_inicio.value;
    const fim = this.form?.controls.data_fim.value;
    const carga = this.form?.controls.carga_horaria.value || 8;
    const usuario = this.usuario?.selectedEntity as Usuario;
    if (usuario && this.selectedUnidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim) && this.util.asTimestamp(inicio) < this.util.asTimestamp(fim)) {
      this.calendar.loadFeriadosCadastrados(this.selectedUnidade.id).then((feriados) => {
        this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.selectedUnidade!, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.selectedUnidade!, "ENTREGA", [], usuario.afastamentos);
        this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
        this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
      });
    }
  }

  public async loadData(entity: PlanoTrabalho, form: FormGroup, action?: string) {     
    if(action == 'clone') {
 
      entity.id = "";
      entity.data_inicio = new Date();
      entity.data_fim = moment().add(1, 'day').toDate();
      entity.documento_id = null;
      entity.entregas = this.entregasClonadas(entity.entregas)
    }

    this.planoTrabalho = new PlanoTrabalho(entity);
    await Promise.all([
      this.calendar.loadFeriadosCadastrados(entity.unidade_id),
      this.usuario?.loadSearch(entity.usuario || entity.usuario_id)       
    ]);
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    //this.form!.controls.unidade_id.setValue(null);

    if(action == 'clone') {
      this.form?.controls.usuario_texto_complementar.setValue(entity.usuario?.texto_complementar_plano || "");
    } else {
      this.atualizarTcr();
    }
    this.calculaTempos();    
  }

  public entregasClonadas(entregas: PlanoTrabalhoEntrega[]) {

    // Se a entrega for vinculada a um plano de entrega, o plano de entrega precisa estar vigente
    // Se a entrega tiver sido excluida do plano de entrega, o plano de entrega precisa estar vigente

    const entregasVigentes = entregas.filter((entrega: PlanoTrabalhoEntrega) => {
      return entrega.plano_entrega_entrega !== null && entrega.plano_entrega_entrega_id !== null;
    });

    return entregasVigentes.map((entrega: PlanoTrabalhoEntrega) => {
      entrega.id = this.documentoDao.generateUuid();
      entrega._status = "ADD";
      entrega.forca_trabalho = 0;
      return entrega as PlanoTrabalhoEntrega;
    }); 
    
  }

  public async initializeData(form: FormGroup) {
    if (this.isTermos) {
      this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    } else {
      this.entity = new PlanoTrabalho();
      this.entity.carga_horaria = this.auth.entidade?.carga_horaria_padrao || 8;
      this.entity.forma_contagem_carga_horaria = this.auth.entidade?.forma_contagem_carga_horaria || "DIA";
      if (this.auth.unidade) {
        //this.entity.unidade_id = this.auth.unidade!.id;     
        this.buscaGestoresUnidadeExecutora(this.auth.unidade!);
        if(!this.gestoresUnidadeExecutora.includes(this.auth.unidade!.id)) {
          this.entity.usuario_id = this.auth.usuario!.id;
        }
      }
    }
    await this.loadData(this.entity, this.form!);

    let nowDate = new Date(); 
    nowDate.setHours(0,0,0,0)
    this.form?.controls.data_inicio.setValue(nowDate);
    this.form?.controls.data_fim.setValue("");
  }

  /* Cria um objeto Plano baseado nos dados do formulário */
  public loadEntity(): PlanoTrabalho {    
    let plano: PlanoTrabalho = this.util.fill(new PlanoTrabalho(), this.entity!);
    plano = this.util.fillForm(plano, this.form!.value);
    plano.usuario = (this.usuario!.selectedEntity || this.entity?.usuario) as Usuario;
    plano.unidade = (this.selectedUnidade || this.entity?.unidade) as Unidade;
    plano.programa = (this.selectedPrograma || this.entity?.programa) as Programa;
    plano.tipo_modalidade = (this.selectedModalidade || this.entity?.tipo_modalidade) as TipoModalidade;   
    plano.documento = this.entity?.documento;
    plano.documento_id = this.form?.controls.documento_id.value;
    
    return plano;
  }

  public async saveData(form: IIndexable): Promise<PlanoTrabalho | boolean> {
    this.submitting = true;
    try {
      /* Atualiza o documento */
      this.atualizarTcr();
      /* Confirma dados do documento */
      this.documentos?.saveData();
      this.submitting = true;
      this.entity!.documentos = this.entity!.documentos.filter((documento: Documento) => {
        return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
      });
      
      /* Salva separadamente as informações do plano */
      let requests: Promise<any>[] = [this.dao!.save(this.entity!, this.join)];
      if (this.form!.controls.editar_texto_complementar_unidade.value) {
        requests.push(this.unidadeDao.update(this.entity!.unidade_id, { 
          texto_complementar_plano: this.form!.controls.unidade_texto_complementar.value 
        }));
      }
      if (this.form!.controls.editar_texto_complementar_usuario.value) {
        requests.push(this.usuarioDao.update(this.entity!.usuario_id, { 
          texto_complementar_plano: this.form!.controls.usuario_texto_complementar.value 
        }));
      }
      
      let responses = await Promise.all(requests);
      this.entity = responses[0] as PlanoTrabalho;
      
      this.exibeAlertaTotalAssinaturas(this.entity);
      return true;
    } finally {
      this.submitting = false;
    }
  }

  public onTabSelect(tab: LookupItem) {
    if (tab.key == "TERMO") this.atualizarTcr();
  }

  public exibeAlertaTotalAssinaturas(plano: PlanoTrabalho | undefined) {
    if(plano && plano._metadata){      
      let assinaturasExigidas = plano._metadata?.quantidadeAssinaturasExigidas;
    
      if (assinaturasExigidas == 1) 
        this.dialog.alert("Atenção", "O participante tem atribuição de chefia substituta da unidade superior à sua unidade de lotação. Por isso, este Plano de Trabalho exigirá somente uma assinatura.", "OK");
    }
  }

  public titleEdit = (entity: PlanoTrabalho): string => {
    return "Editando " + this.lex.translate("Plano de Trabalho") + ': ' + (entity?.usuario?.apelido || "");
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if (this.isTermos && this.planoTrabalhoService.needSign(this.entity, documento)) {
      result.push({ hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({ hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({ title: "Termo de adesão", modalWidth: 1000 }, documento.conteudo || ""); }).bind(this) });

    return result;
  }

  public async signDocumento(documento: Documento) {
    await this.documentoService.sign([documento]);
    this.cdRef.detectChanges();
  }

  public get formaContagemCargaHoraria(): UnitWorkload {
    const forma = this.form?.controls.forma_contagem_carga_horaria.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }

  public onFormaContagemCargaHorariaChange(unit: UnitWorkload) {
    this.form!.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
  }

  public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }

  public buscaGestoresUnidadeExecutora(unidade: Unidade | null){
    if (unidade) [unidade.gestor?.usuario_id, ...unidade.gestores_substitutos?.map(x => x.usuario_id), ...unidade!.gestores_delegados?.map(x => x.usuario_id)].forEach(gestor => {
      if (gestor) this.gestoresUnidadeExecutora.push(gestor);
    });
    return this.gestoresUnidadeExecutora;
  }

  private regramentoNaoEncontrado() {
    this.form?.controls.programa_id.setValue("");
    this.dialog.alert("Regramento não encontrado.", "Não será possível criar o Plano de Trabalho");
  } 
}

