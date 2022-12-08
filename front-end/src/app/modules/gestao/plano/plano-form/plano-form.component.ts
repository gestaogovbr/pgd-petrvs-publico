import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento } from 'src/app/models/documento.model';
import { PlanoAtividade } from 'src/app/models/plano-atividade.model';
import { Plano } from 'src/app/models/plano.model';
import { Programa } from 'src/app/models/programa.model';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
// import { AuthService } from 'src/app/services/auth.service';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';

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
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('tipo_modalidade', { static: false }) public tipoModalidade?: InputSearchComponent;

  public formAtividades: FormGroup;
  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public atividadeDao: AtividadeDaoService;
  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public calendar: CalendarService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public horasTotais?: Efemerides;
  public horasParciais?: Efemerides;

  constructor(public injector: Injector) {
    super(injector, Plano, PlanoDaoService);
    this.join = ["unidade.entidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "atividades.atividade"];
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);

    this.form = this.fh.FormBuilder({
      carga_horaria: {default: ""},
      tempo_total: {default: ""},
      tempo_proporcional: {default: ""},
      data_inicio_vigencia: {default: new Date()},
      data_fim_vigencia: {default: new Date()},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      ganho_produtividade: {default: 0},
      programa_id: {default: ""},
      usuario_id: {default: ""},
      unidade_id: {default: ""},
      documento_id: {default: null},
      documentos: {default: []},
      atividades: {default: []},
      tipo_modalidade_id: {default: ""},
      forma_contagem_carga_horaria: {default: "DIA"}
    }, this.cdRef, this.validate);
    this.formAtividades = this.fh.FormBuilder({
      atividade_id: {default: ""}
    }, this.cdRef, this.validateAtividades);
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
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

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    } else if(['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
      if(!this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if(!this.programa?.searchObj) {
        result = "Selecionar programa";
      } else if(controlName == 'data_inicio_vigencia' && (control.value as Date).getTime() < (this.programa!.searchObj! as Programa).data_inicio_vigencia.getTime()) {
        result = "Menor que programa";
      } else if(controlName == 'data_fim_vigencia' && (control.value as Date).getTime() > (this.programa!.searchObj! as Programa).data_fim_vigencia.getTime()) {
        result = "Maior que programa";
      }
    }

    return result;
  }
  
  public formValidation = (form?: FormGroup) => {
    if(this.gridAtividades?.editing) {
      this.tabs!.active = "ATIVIDADES";
      return "Salve ou cancele o registro atual em edição";
    }
    return undefined;
  };

  public onProgramaSelect(selected: SelectItem) {
    this.form?.controls.data_inicio_vigencia.updateValueAndValidity();
    this.form?.controls.data_fim_vigencia.updateValueAndValidity();
  }

  public onTipoModalidadeSelect(selected: SelectItem) {
    const tipoModalidade = this.tipoModalidade?.searchObj as TipoModalidade;
    if(tipoModalidade) this.form?.controls.ganho_produtividade.setValue(tipoModalidade.ganho_produtividade);
  }

  public onUsuarioSelect(selected: SelectItem) {
    this.calculaTempos();
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

  public onUnidadeSelect(selected: SelectItem) {
    this.form!.controls.forma_contagem_carga_horaria.setValue((selected.entity as Unidade)?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public calculaTempos() {
    const inicio = this.form?.controls.data_inicio_vigencia.value;
    const fim = this.form?.controls.data_fim_vigencia.value;
    const carga = this.form?.controls.carga_horaria.value || 8;
    const unidade = this.unidade?.searchObj as Unidade;
    const usuario = this.usuario?.searchObj as Usuario;
    if(usuario && unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim)) {
      this.calendar.loadFeriadosCadastrados(unidade.id).then((feriados) => {
        this.horasTotais = this.calendar.calculaDataTempo(inicio, fim, carga, unidade, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempo(inicio, fim, carga, unidade, "ENTREGA", [], usuario.afastamentos);
        this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
        this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
      });
    }
  }

  public async loadData(entity: Plano, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.calendar.loadFeriadosCadastrados(entity.unidade_id),
      this.unidade?.loadSearch(entity.unidade || entity.unidade_id),
      this.usuario?.loadSearch(entity.usuario || entity.usuario_id),
      this.programa?.loadSearch(entity.programa || entity.programa_id),
      this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.calculaTempos();
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    if(this.isTermos) {
      this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    } else {
      this.entity = new Plano();
      this.entity.unidade_id = this.auth.unidade!.id;
      this.entity.carga_horaria = this.auth.unidade?.entidade?.carga_horaria_padrao || 8;
      this.entity.forma_contagem_carga_horaria = this.auth.unidade?.entidade?.forma_contagem_carga_horaria || "DIA";
    }
    this.loadData(this.entity, this.form!);
  }

  public async addAtividades() {
    return Object.assign(new PlanoAtividade(), {plano_id: this.entity?.id, _status: "ADD"}) as IIndexable;
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
    row._status = row._status == "ADD" ? row._status : "EDIT";
    this.dialog.showSppinerOverlay("Carregando dados da atividade...");
    try {
      row.atividade = await this.atividadeDao?.getById(row.atividade_id)!;
    } finally {
      this.dialog.closeSppinerOverlay();
    }
    return row;
  }

  public saveData(form: IIndexable): Promise<Plano> {
    return new Promise<Plano>((resolve, reject) => {
      let plano = this.util.fill(new Plano(), this.entity!);
      plano = this.util.fillForm(plano, this.form!.value);
      /* Remove os ids gerados para os novos unidades_origem_atividades, será gerado pelo servidor como UUID */
      plano.atividades = plano.atividades.filter((x: PlanoAtividade) => ["ADD", "EDIT", "DELETE"].includes(x._status || ""));
      plano.atividades.forEach((atividade: PlanoAtividade) => {
        atividade.id = atividade.id.includes("-") ? atividade.id : "";
      });
      resolve(plano);
    });
  }

  public titleEdit = (entity: Plano): string => {
    return "Editando " ;//+ (entity?.nome || "");
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(this.isTermos && this.needSign(documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({title: "Termo de adesão", modalWidth: 1000}, documento.conteudo || ""); }).bind(this) });

    return result;
  }

  public needSign(documento: Documento): boolean {
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
  }

  public signDocumento(documento: Documento) {
    this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
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
    });
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

