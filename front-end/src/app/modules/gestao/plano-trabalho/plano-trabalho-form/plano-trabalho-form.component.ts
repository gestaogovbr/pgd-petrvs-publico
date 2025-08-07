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
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('tipoModalidade', { static: false }) public tipoModalidade?: InputSearchComponent;
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


  constructor(public injector: Injector) {
    super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
    this.join = [
      "unidade.entidade", 
      "entregas.entrega", 
      "entregas.plano_entrega_entrega:id,plano_entrega_id", 
      "usuario.participacoes_programas",
      "usuario.lotacao",
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
      this.template = this.entity.programa?.template_tcr;
      this.editingId = ["ADD", "EDIT"].includes(documento?._status || "") ? documento!.id : undefined;
    }

    
    

    this.cdRef.detectChanges();
  }

  public get isTermos(): boolean {
    return this.action == "termos";
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['unidade_id', 'programa_id', 'usuario_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    } else if (['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
      result = "Inválido";
    } else if (controlName == 'data_fim' && this.util.isDataValid(this.form?.controls.data_inicio.value) && this.util.asTimestamp(control.value) <= this.util.asTimestamp(this.form!.controls.data_inicio.value)) {
      result = "Menor que o início";
    } else if (this.programa && controlName == 'data_inicio' && moment(control.value as Date).startOf('day') < moment(this.programa!.selectedEntity?.data_inicio).startOf('day')) {
      result = "Menor que programa";
    } else if (this.programa && controlName == 'data_fim' && moment(control.value as Date).startOf('day') > moment(this.programa!.selectedEntity?.data_fim).startOf('day')) {
      result = "Maior que programa";
    } /*else if (controlName == 'criterios_avaliacao' && control.value.length < 1) {
      result = "Insira ao menos um critério de avaliação";
    }*/
    return result;
  }

  public formValidation = async (form?: FormGroup) => {
    let result = "";
    return result;
    // TODO:
    // Validar se as entregas pertencem ao plano de entregas da unidade
  };

  public onUnidadeSelect(selected: SelectItem) {
    let unidade = this.unidade?.selectedEntity as Unidade;
    let usuario = this.usuario?.selectedEntity as Usuario;
    this.entity!.unidade = unidade;
    this.entity!.unidade_id = unidade.id;
    this.form!.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.form!.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
    this.form!.controls.usuario_texto_complementar.setValue(usuario?.texto_complementar_plano || "");

    this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id','gestores_substitutos:id,usuario_id','gestores_delegados:id,usuario_id']).then( unidade => {
      this.buscaGestoresUnidadeExecutora(unidade);
    });
  }

  public podeEditarTextoComplementar(unidade_id : string) : string|undefined {
    return (unidade_id == this.auth.unidadeGestor()?.id) ? 
    undefined:
    'true' ; 
  }

  public onProgramaSelect(selected: SelectItem) {
    let programa = selected.entity as Programa;
    this.entity!.programa_id = programa.id;
    this.entity!.programa = programa;
    this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
    this.form?.controls.data_inicio.updateValueAndValidity();
    this.form?.controls.data_fim.updateValueAndValidity();
    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public async onUsuarioSelect(selected: SelectItem) {    
    let programa_habilitado = selected.entity.participacoes_programas.find((x: { habilitado: number; }) => x.habilitado == 1);
    
    this.form!.controls.usuario_texto_complementar.setValue(selected.entity.texto_complementar_plano || "");
    if(!this.form?.controls.unidade_id.value) {
      selected.entity.unidades?.every(async (unidade: any) => {
        if (selected.entity.lotacao.unidade_id == unidade.id) {
          this.preencheUnidade(unidade);
          return false;
        } else return true;
      })
    }
    let programas = await this.programaDao.query({
      where: [['vigentesUnidadeExecutora', '==', selected.entity.lotacao.unidade_id]],
      join: this.joinPrograma,
      orderBy: [["unidade.path", "desc"]]
    }).asPromise();

    if(selected.entity.pedagio) {
      let modalidades = await this.tipoModalidadeDao.query({
        where: [['exige_pedagio', '==', 0]]
      }).asPromise();
      this.form?.controls.tipo_modalidade_id.setValue(modalidades[0]?.id);
    }
    
    if (programa_habilitado) {
      const programaEncontrado = programas.find((x: Programa) => x.id == programa_habilitado.programa_id);
      if (programaEncontrado) {
        this.preenchePrograma(programaEncontrado);
      } else {
        this.regramentoNaoEncontrado();
      }
    } else {
      this.regramentoNaoEncontrado();
    }

    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public preencheUnidade(unidade: Unidade) {
    this.form?.controls.unidade_id.setValue(unidade.id);
    this.entity!.unidade = unidade;
    this.entity!.unidade_id = unidade.id;
    this.form!.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.form!.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
    this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id','gestores_substitutos:id,usuario_id','gestores_delegados:id,usuario_id']).then( unidade => {
      this.buscaGestoresUnidadeExecutora(unidade);
    });
  }

  public preenchePrograma(programa: Programa) {
    if(programa){
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
    const unidade = this.unidade?.selectedEntity as Unidade;
    if (usuario && unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim) && this.util.asTimestamp(inicio) < this.util.asTimestamp(fim)) {
      this.calendar.loadFeriadosCadastrados(unidade.id).then((feriados) => {
        this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], usuario.afastamentos);
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
      this.usuario?.loadSearch(entity.usuario || entity.usuario_id),
      this.unidade?.loadSearch(entity.unidade || entity.unidade_id),
      this.programa?.loadSearch(entity.programa || entity.programa_id),
      this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
    ]);
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));

    if(action == 'clone') {
      this.form?.controls.usuario_texto_complementar.setValue(entity.usuario?.texto_complementar_plano || "");
    } else {
      this.atualizarTcr();
    }

    /*let documento = entity.documentos.find(x => x.id == entity.documento_id);
    if(documento) this._datasource = documento.datasource;*/
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
        this.entity.unidade_id = this.auth.unidade!.id;
     
        let programas = await this.programaDao.query({
          where: [['vigentesUnidadeExecutora', '==', this.auth.unidade!.id]],
          join: this.joinPrograma,
          orderBy: [["unidade.path", "desc"]]
        }).asPromise();      

        let programa_habilitado = this.auth.usuario?.participacoes_programas.find((x: { habilitado?: number; }) => x.habilitado === 1);      
        if (programa_habilitado) {
          const programaEncontrado = programas.find((x: Programa) => x.id == programa_habilitado.programa_id);
          if (programaEncontrado) {
            this.preenchePrograma(programaEncontrado);
          } else {
            this.regramentoNaoEncontrado();
          }
        } else {
          this.regramentoNaoEncontrado();        
        }
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
    plano.unidade = (this.unidade?.selectedEntity || this.entity?.unidade) as Unidade;
    plano.programa = (this.programa?.selectedEntity || this.entity?.programa) as Programa;
    plano.tipo_modalidade = (this.tipoModalidade!.selectedEntity || this.entity?.tipo_modalidade) as TipoModalidade;   
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
      if (this.form!.controls.editar_texto_complementar_unidade.value) requests.push(this.unidadeDao.update(this.entity!.unidade_id, { texto_complementar_plano: this.form!.controls.unidade_texto_complementar.value }));
      if (this.form!.controls.editar_texto_complementar_usuario.value) requests.push(this.usuarioDao.update(this.entity!.usuario_id, { texto_complementar_plano: this.form!.controls.usuario_texto_complementar.value }));
      let responses = await Promise.all(requests);
      this.entity = responses[0] as PlanoTrabalho;
    } finally {
      this.submitting = false;
      this.exibeAlertaTotalAssinaturas(this.entity);
    }
    return true;
  }

  public onTabSelect(tab: LookupItem) {
    if (tab.key == "TERMO") this.atualizarTcr();
  }

  public exibeAlertaTotalAssinaturas(plano: PlanoTrabalho | undefined) {
    if(plano){
       let assinaturasExigidas = plano._metadata?.quantidadeAssinaturasExigidas;
       let msg = ''
       if (assinaturasExigidas == 1) 
        msg = "O participante tem atribuição de chefia substituta da unidade superior à sua unidade de lotação. Por isso, este Plano de Trabalho exigirá somente uma assinatura.";
        else if (assinaturasExigidas == 3)
        msg = "Este Plano de Trabalho está sendo criado numa unidade diferente da unidade de lotação. Por isso, a chefia da unidade do plano também deverá assiná-lo";
      if (assinaturasExigidas != 2)  
        this.dialog.alert("Atenção", msg, "OK");
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

  //Não apagar
  /*public addItemHandleCriteriosAvaliacao(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.criterio_avaliacao.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.criterios_avaliacao.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.criterio_avaliacao.value
      };
      this.form!.controls.criterio_avaliacao.setValue("");
    }
    return result;
  };*/

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

