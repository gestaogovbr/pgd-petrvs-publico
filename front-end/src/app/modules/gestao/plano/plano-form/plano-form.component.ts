import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Atividade } from 'src/app/models/atividade.model';
import { IIndexable } from 'src/app/models/base.model';
import { Documento } from 'src/app/models/documento.model';
import { PlanoAtividade } from 'src/app/models/plano-atividade.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { Plano } from 'src/app/models/plano.model';
import { Programa } from 'src/app/models/programa.model';
import { Template } from 'src/app/models/template.model';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { DocumentoService } from 'src/app/modules/uteis/documentos/documento.service';
import { DocumentosComponent } from 'src/app/modules/uteis/documentos/documentos.component';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanoService } from '../plano.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'app-plano-form',
  templateUrl: './plano-form.component.html',
  styleUrls: ['./plano-form.component.scss']
})

export class PlanoFormComponent extends PageFormBase<Plano, PlanoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('gridAtividades', { static: false }) public gridAtividades?: GridComponent;
  @ViewChild('gridDocumentos', { static: false }) public gridDocumentos?: GridComponent;
  @ViewChild('tabs', { static: false }) public tabs?: TabsComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('tipoModalidade', { static: false }) public tipoModalidade?: InputSearchComponent;
  @ViewChild('planoEntrega', { static: false }) public planoEntrega?: InputSearchComponent;
  @ViewChild('atividade', { static: false }) public atividade?: InputSearchComponent;
  @ViewChild('entrega', { static: false }) public entrega?: InputSelectComponent;
  @ViewChild('documentos', { static: false }) public documentos?: DocumentosComponent;

  public formAtividades: FormGroup;
  public formEntregas: FormGroup;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public atividadeDao: AtividadeDaoService;
  public documentoDao: DocumentoDaoService;
  public documentoService: DocumentoService;
  public allPages: ListenerAllPagesService;
  public calendar: CalendarService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public planoService: PlanoService;
  public horasTotais?: Efemerides;
  public horasParciais?: Efemerides;
  public planoDataset: TemplateDataset[];
  public documentoId?: string;
  public entregas: LookupItem[] = [];
  public programa?: Programa;
  public unidade?: Unidade;

  private _datasource: any;
  private _entityDocumentos: Plano = new Plano();

  constructor(public injector: Injector) {
    super(injector, Plano, PlanoDaoService);
    this.join = ["unidade.entidade", "entregas.entrega.entrega", "plano_entrega.entregas.entrega", "plano_entrega.unidade.entidade", "plano_entrega.programa", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "atividades.atividade"];
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.documentoService = injector.get<DocumentoService>(DocumentoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.planoService = injector.get<PlanoService>(PlanoService);
    this.planoDataset = this.dao!.dataset();
    this.form = this.fh.FormBuilder({
      carga_horaria: {default: ""},
      tempo_total: {default: ""},
      tempo_proporcional: {default: ""},
      data_inicio_vigencia: {default: new Date()},
      data_fim_vigencia: {default: new Date()},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      ganho_produtividade: {default: 0},
      usuario_id: {default: ""},
      documento_id: {default: null},
      plano_entrega_id: {default: null},
      documentos: {default: []},
      atividades: {default: []},
      entregas: {default: []},
      tipo_modalidade_id: {default: ""},
      forma_contagem_carga_horaria: {default: "DIA"},
      editar_texto_complementar_unidade: {default: false},
      editar_texto_complementar_usuario: {default: false},
      unidade_texto_complementar: {default: ""},
      usuario_texto_complementar: {default: ""}
    }, this.cdRef, this.validate);
    this.formAtividades = this.fh.FormBuilder({
      atividade_id: {default: ""}
    }, this.cdRef, this.validateAtividades);
    this.formEntregas = this.fh.FormBuilder({
      nome: {default: ""},
      entrega_id: {default: ""}
    }, this.cdRef, this.validateEntregas);
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
  }

  public get datasource(): any {
    /* _entityDocumentos é atualizado pelo angular na chamada do get entityDocumentos() */
    let data = this.dao!.datasource(this._entityDocumentos);
    /* Atualiza os campos de texto complementar do usuário e da unidade */
    data.usuario.texto_complementar_plano = this.form!.controls.usuario_texto_complementar.value || "";
    data.unidade.texto_complementar_plano = this.form!.controls.unidade_texto_complementar.value || "";
    if(JSON.stringify(data) != this.JSON.stringify(this._datasource)) {
      this._datasource = data;
      /* Se o termo for um documento obrigatório, então será gerado um termo automaticamente */
      this.documentoId = undefined;
      if(this.programa?.termo_obrigatorio) {
        this.documentoId = this.form!.controls.documento_id.value;
        let documentos: Documento[] = this.form!.controls.documentos.value || [];
        let documento = documentos?.find((x: Documento) => x.id == this.documentoId);
        if(!this.documentoId?.length || !documento || documento.assinaturas.length || documento.id_documento) {
          this.documentoId = this.dao?.generateUuid(),
          documentos.push(new Documento({
            id: this.documentoId, 
            especie: "TCR",
            titulo_documento: "Termo de Ciência e Responsabilidade",
            conteudo: "",
            status: "GERADO",
            _status: "ADD",
            template: this.programa.template_tcr?.conteudo,
            dataset: this.dao!.dataset(),
            datasource: this.datasource,
            entidade_id: this.auth.entidade?.id,
            plano_id: this.entity?.id,
            template_id: this.programa.template_tcr_id
          }));
          this.form!.controls.documento_id.setValue(this.documentoId);
          this.form!.controls.documentos.setValue(documentos);
        }
      }
    }
    return this._datasource;
  }

  public get template(): Template | undefined {
    /* _entityDocumentos é atualizado pelo angular na chamada do get entityDocumentos() */
    return this.planoService.template(this._entityDocumentos);
  }

  public get isTermos(): boolean {
    return this.action == "termos";
  }

  public validateAtividades = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == 'atividade_id' && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateEntregas = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == 'entrega_id' && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['usuario_id', 'plano_entrega_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if(['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    } 
    if(['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
      if(!this.util.isDataValid(control.value)) {
        result = "Inválido";
      }
    } else if(this.programa && controlName == 'data_inicio_vigencia' && (control.value as Date).getTime() < this.programa!.data_inicio_vigencia.getTime()) {
        result = "Menor que programa";
    } else if(this.programa && controlName == 'data_fim_vigencia' && (control.value as Date).getTime() > this.programa!.data_fim_vigencia.getTime()) {
        result = "Maior que programa";
    } 

    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if(this.gridAtividades?.editing) {
      this.tabs!.active = "ATIVIDADES";
      return "Salve ou cancele o registro atual em edição";
    }
    // Validar se o unidade & programa & plano de entrega são interlidados
    // Validar se as entregas pertencem ao plano de entregas da unidade
    // Validar o período está dentro do plano de entregas
    // Validar se o usuários está habilitado no programa
    return undefined;
  };

  public updateEntregas(planoEntrega: PlanoEntrega | undefined) {
    this.entregas = planoEntrega?.entregas?.map(x => Object.assign({}, { key: x.id, value: x.entrega?.nome || x.descricao, data: x })) || [];
  }

  public onPlanoEntregaSelect(selected: SelectItem) {
    let planoEntrega = selected.entity as PlanoEntrega;
    this.updateEntregas(planoEntrega);
    //ATUALIZAR O GRID DE ENTREGAS this.planoListEntrega
    this.form?.controls.data_inicio_vigencia.updateValueAndValidity();
    this.form?.controls.data_fim_vigencia.updateValueAndValidity();
    this.programa = planoEntrega?.programa as Programa;
    this.unidade = planoEntrega?.unidade as Unidade;
    this.form!.controls.forma_contagem_carga_horaria.setValue(this.unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.form!.controls.unidade_texto_complementar.setValue(this.unidade?.texto_complementar_plano || "");
    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public onTipoModalidadeSelect(selected: SelectItem) {
    const tipoModalidade = this.tipoModalidade?.searchObj as TipoModalidade;
    if(tipoModalidade) this.form?.controls.ganho_produtividade.setValue(tipoModalidade.ganho_produtividade);
    this.cdRef.detectChanges();
  }

  public onUsuarioSelect(selected: SelectItem) {
    this.form!.controls.usuario_texto_complementar.setValue((selected.entity as Usuario)?.texto_complementar_plano || "");
    this.calculaTempos();
    this.cdRef.detectChanges();
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
    const inicio = this.form?.controls.data_inicio_vigencia.value;
    const fim = this.form?.controls.data_fim_vigencia.value;
    const carga = this.form?.controls.carga_horaria.value || 8;
    const usuario = this.usuario?.searchObj as Usuario;
    if(usuario && this.unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim)) {
      this.calendar.loadFeriadosCadastrados(this.unidade.id).then((feriados) => {
        this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.unidade!, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.unidade!, "ENTREGA", [], usuario.afastamentos);
        this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
        this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
      });
    }
  }

  public async loadData(entity: Plano, form: FormGroup) {
    this.updateEntregas(entity.plano_entrega);
    await Promise.all([
      this.calendar.loadFeriadosCadastrados(entity.unidade_id),
      this.usuario?.loadSearch(entity.usuario || entity.usuario_id),
      this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id),
      this.planoEntrega?.loadSearch(entity.plano_entrega || entity.plano_entrega_id)
    ]);
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    let documento = entity.documentos.find(x => x.id == entity.documento_id);
    if(documento) this._datasource = documento.datasource;
    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    if(this.isTermos) {
      this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    } else {
      this.entity = new Plano();
      this.entity.carga_horaria = this.auth.entidade?.carga_horaria_padrao || 8;
      this.entity.forma_contagem_carga_horaria = this.auth.entidade?.forma_contagem_carga_horaria || "DIA";
    }
    await this.loadData(this.entity, this.form!);
  }

  /* Atividades */  
  public async addAtividades() {
    return new PlanoAtividade({ plano_id: this.entity?.id, _status: "ADD" }) as IIndexable;
  }

  public async loadAtividades(form: FormGroup, row: any) {
    form.controls.atividade_id.setValue(row.atividade_id);
  }

  public async removeAtividades(row: any) {
    row._status = "DELETE";
    return false;
  }
 
  public async saveAtividades(form: FormGroup, row: any) {
    row.atividade_id = form.controls.atividade_id.value;
    row.atividade = this.atividade?.searchObj as Atividade;
    row._status = row._status == "ADD" ? row._status : "EDIT";
    /*this.dialog.showSppinerOverlay("Carregando dados da atividade...");
    try {
      row.atividade = await this.atividadeDao?.getById(row.atividade_id)!;
    } finally {
      this.dialog.closeSppinerOverlay();
    }*/
    return row;
  }

  /* Entregas */
  public async addEntregas() {
    return new PlanoTrabalhoEntrega({ plano_id: this.entity?.id, _status: "ADD" }) as IIndexable;
  }

  public async loadEntregas(form: FormGroup, row: any) {
    form.controls.entrega_id.setValue(row.entrega_id);
    form.controls.nome.setValue(row.nome);
  }

  public async removeEntregas(row: any) {
    row._status = "DELETE";
    return false;
  }
 
  public async saveEntregas(form: FormGroup, row: any) {
    row.entrega_id = form.controls.entrega_id.value;
    row.entrega = this.entrega?.selectedItem?.data as PlanoTrabalhoEntrega;
    row.nome = form.controls.nome.value;
    row._status = row._status == "ADD" ? row._status : "EDIT";
    return row;
  }

  /* Gera o objeto entity baseado nas informações atuais do formulário para ser utilizado por Documentos */
  public get entityDocumentos(): Plano {
    let plano = this.loadEntity();
    /* Remove campo de documentos para comparar */
    plano.documentos = [];
    this._entityDocumentos.documentos = [];
    if(JSON.stringify(plano) != JSON.stringify(this._entityDocumentos)) {
      this._entityDocumentos = plano;  
    }
    /* Atribui novamente o campo de documentos */
    this._entityDocumentos.documentos = this.form!.controls.documentos.value;
    return this._entityDocumentos;
  }

  /* Cria um objeto Plano baseado nos dados do formulário */
  public loadEntity(): Plano {
    let plano: Plano = this.util.fill(new Plano(), this.entity!);
    plano = this.util.fillForm(plano, this.form!.value);
    plano.usuario = this.usuario!.searchObj as Usuario;
    plano.unidade = (this.entity?.unidade || this.unidade) as Unidade;
    plano.programa = (this.entity?.programa || this.programa) as Programa;
    plano.tipo_modalidade = this.tipoModalidade!.searchObj as TipoModalidade;
    return plano;
  }

  public async saveData(form: IIndexable): Promise<Plano | boolean> {
    let plano = this.loadEntity();
    /* Confirma dados do documento */
    this.documentos?.saveData();
    /* Remove os ids gerados para os novos unidades_origem_atividades, será gerado pelo servidor como UUID */
    plano.atividades = plano.atividades.filter((atividade: PlanoAtividade) => {
      atividade.id = atividade.id.includes("-") ? atividade.id : "";
      return ["ADD", "EDIT", "DELETE"].includes(atividade._status || "")
    });
    plano.documentos = plano.documentos.filter((documento: Documento) => {
      return ["ADD", "EDIT", "DELETE"].includes(documento._status || "")
    });
    /* Salva separadamente as informações do plano */
    this.entity = await this.dao!.save(plano);
    if(this.form!.controls.editar_texto_complementar_unidade.value) {
      await this.unidadeDao.update(plano.unidade_id, {texto_complementar_plano: this.form!.controls.unidade_texto_complementar.value});
    }
    if(this.form!.controls.editar_texto_complementar_usuario.value) {
      await this.usuarioDao.update(plano.unidade_id, {texto_complementar_plano: this.form!.controls.usuario_texto_complementar.value});
    }
    return true;
  }

  public titleEdit = (entity: Plano): string => {
    return "Editando " ;//+ (entity?.nome || "");
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(this.isTermos && this.planoService.needSign(this.entity, documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({title: "Termo de adesão", modalWidth: 1000}, documento.conteudo || ""); }).bind(this) });

    return result;
  }

  /*public needSign(documento: Documento): boolean {
    const tipoModalidade = this.entity!.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
    const usuario = this.entity!.usuario!; // (this.usuario?.searchObj as Usuario);
    const unidade = this.entity!.unidade!; // (this.unidade?.searchObj as Unidade);
    const entidade = unidade?.entidade;
    const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
    let ids: string[] = [];
    if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
    if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
    if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario!.id);
  }*/

  public async signDocumento(documento: Documento) {
    await this.documentoService.sign([documento]);
    this.cdRef.detectChanges();
    /*this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
      if(response) {
        this.loading = true;
        this.documentoDao.assinar([documento.id]).then(response => {
          if(response?.length) {
            let documentos = (this.form!.controls.documentos.value || []) as Documento[];
            let found = documentos.find(x => x.id == documento?.id);
            if(found) found.assinaturas = response[0].assinaturas;
            this.form!.controls.documentos.setValue(documentos);
            this.gridDocumentos?.reset();
          }
        }).finally(() => this.loading = false);
      }
    });*/
  }

  public get formaContagemCargaHoraria(): UnitWorkload {
    //const forma = (this.unidade?.searchObj as Unidade)?.entidade?.forma_contagem_carga_horaria || this.auth.unidade?.entidade?.forma_contagem_carga_horaria || "DIA";
    //console.log("FORMA: ", (this.unidade?.searchObj as Unidade)?.entidade?.forma_contagem_carga_horaria, this.auth.unidade?.entidade?.forma_contagem_carga_horaria);
    const forma = this.form?.controls.forma_contagem_carga_horaria.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }

  public onFormaContagemCargaHorariaChange(unit: UnitWorkload) {
    this.form!.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
  }

  public async addDocumento() {
    const documento = new Documento();
    documento.id = this.dao!.generateUuid();
    documento.plano_id = this.entity!.id;
    documento._status = "ADD";
    this.go.navigate({route: ['gestao', 'plano', 'termo']}, {metadata: {documento: documento, plano: this.entity}, modalClose: (modalResult) => {
      if(modalResult) {
        (async () => {
          let documentos = (this.form!.controls.documentos.value || []) as Documento[];
          if(this.isTermos) {
            this.clearErros();
            this.dialog.showSppinerOverlay("Salvando dados do formulário");
            try {
              modalResult = await this.documentoDao.save(Object.assign(new Documento(), {
                especie: "TERMO_ADESAO",
                conteudo: modalResult?.termo,
                metadados: {atividades_termo_adesao: modalResult.atividades_termo_adesao},
                plano_id: this.entity!.id,
                status: "GERADO"
              }), ["assinaturas.usuario:id,nome,apelido"]);
            } catch (error: any) {
              this.error(error.message ? error.message : error);
              modalResult = undefined;
            } finally {
              this.dialog.closeSppinerOverlay();
            }
          }
          if(modalResult) {
            documentos.push(modalResult);
            this.form!.controls.documentos.setValue(documentos);
            this.dialog.showSppinerOverlay("Recarregando dados do plano");
            await this.initializeData(this.form!);
            this.dialog.closeSppinerOverlay();
          }
          this.cdRef.detectChanges();
        })();
      }
    }});
    return undefined;
  }

  public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
  }

}

