import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Demanda, DemandaChecklist } from 'src/app/models/demanda.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { Afastamento } from 'src/app/models/afastamento.model';
import { Atividade } from 'src/app/models/atividade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { Plano } from 'src/app/models/plano.model';
import { InputTimerComponent } from 'src/app/components/input/input-timer/input-timer.component';
import { Unidade } from 'src/app/models/unidade.model';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { Comentario } from 'src/app/models/comentario';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { DemandaEntrega } from 'src/app/models/demanda-entrega.model';
import { DemandaPausa } from 'src/app/models/demanda-pausa.model';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ComentarioService } from 'src/app/services/comentario.service';

export type Checklist = {id: string, texto: string, checked: boolean};

@Component({
  selector: 'app-demanda-form',
  templateUrl: './demanda-form.component.html',
  styleUrls: ['./demanda-form.component.scss']
})
export class DemandaFormComponent extends PageFormBase<Demanda, DemandaDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;
  @ViewChild('atividade', { static: false }) public atividade?: InputSearchComponent;
  @ViewChild('plano', { static: false }) public plano?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('planejado', { static: false }) public planejado?: InputTimerComponent;
  @ViewChild('procRequisicao', { static: false }) public procRequisicao?: InputButtonComponent;
  @ViewChild('docRequisicao', { static: false }) public docRequisicao?: InputButtonComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: GridComponent;
  @ViewChild('tipoProcesso', { static: false }) public tipoProcesso?: InputSearchComponent;
  @ViewChild('tipoDocumento', { static: false }) public tipoDocumento?: InputSearchComponent;

  public form: FormGroup;
  public formChecklist: FormGroup;
  public formComentarios: FormGroup;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;
  public planoDao: PlanoDaoService;
  public atividadeDao: AtividadeDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public calendar: CalendarService;
  public comentario: ComentarioService;
  public allPages: ListenerAllPagesService;
  public etiquetas: LookupItem[] = [];
  public checklist: LookupItem[] = [];
  public complexidades: LookupItem[] = [];
  public planos: LookupItem[] = [];
  public planoJoin: string[] = ["documento:id,metadados"];
  public planoSelecionado?: Plano | null = null;
  public comentarioTipos: LookupItem[];

  /* Variável utilizada para detectar as alterações feitas pelo usuário e recalcular os prazos */
  public delta: IIndexable = {
    plano_id: "",
    atividade_id: "",
    fator_complexidade: 1,
    tempo_planejado: 0,
    prazo_entrega: new Date(0)
  };

  constructor(public injector: Injector) {
    super(injector, Demanda, DemandaDaoService);
    const horaInicial = this.auth.hora;
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoDao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.delta.prazo_entrega = horaInicial;
    this.comentarioTipos = this.lookup.COMENTARIO_TIPO.filter(x => ["COMENTARIO", "TECNICO"].includes(x.key));
    this.form = this.fh.FormBuilder({
      numero: {default: 0},
      id_processo: {default: 0},
      numero_processo: {default: ""},
      tipo_documento_requisicao_id: {default: null},
      id_requisicao: {default: 0,},
      numero_requisicao: {default: ""},
      assunto: {default: ""},
      atividade_id: {default: null},
      fator_complexidade: {default: 1},
      unidade_id: {default: ""},
      tempo_pactuado: {default: 0},
      recalcula_prazo: {default: false},
      demandante_id: {default: ""},
      usuario_id: {default: null},
      prazo_entrega: {default: horaInicial},
      data_distribuicao: {default: horaInicial},
      carga_horaria: {default: 0},
      tempo_planejado: {default: 0},
      data_inicio: {default: null},
      data_entrega: {default: null},
      tempo_despendido: {default: 0},
      etiquetas: {default: []},
      checklist: {default: []},
      comentarios: {default: []},
      pausas: {default: []},
      tipo_documento_entrega_id: {default: null},
      id_processo_entrega: {default: 0},
      numero_processo_entrega: {default: ""},
      id_documento_entrega: {default: 0},
      numero_documento_entrega: {default: ""},
      titulo_documento_entrega: {default: ""},
      tempo_homologado: {default: null},
      produtividade: {default: 0},
      data_arquivamento: {default: null},
      etiqueta: {default: ""},
      plano_id: {default: null},
      avaliacao_id: {default: null},
      entregas: {default: []},
      tipo_processo_id: {default: null}
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: {default: ""},
      texto: {default: ""},
      checked: {default: false}
    }, this.cdRef, this.validateChecklist);
    this.formComentarios = this.fh.FormBuilder({
      texto: {default: ""},
      tipo: {default: "COMENTARIO"},
      privacidade: {default: "PUBLICO"}
    }, this.cdRef, this.validateComentario);
    this.join = ["usuario.planos.tipo_modalidade:id,nome", "pausas", "atividade", "unidade", "comentarios.usuario", "entregas.tarefa", "entregas.comentarios.usuario", "plano.documento:id,metadados"];
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["comentar", "clonar"].includes(segment) ? segment : this.action;
  }

  public get isComentarios(): boolean {
    return this.action == "comentar";
  }

  public get isClonar(): boolean {
    return this.action == "clonar";
  }

  public get tituloDemanda(): string {
    return this.form?.controls.numero?.value ? "#" + this.form?.controls.numero?.value : "";
  }

  public get isDemandaProcessual(): boolean {
    return this.form?.controls.id_processo?.value && this.form?.controls.id_requisicao?.value;
  }

  public get prazoEmDias(): string | undefined {
    const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
    return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? "true" : undefined;
  }

  public get prazoEmHoras(): string | undefined {
    const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
    return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? undefined : "true";
  }

  public validateChecklist = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validateComentario = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "texto" && !control.value?.length) {
      result = "Não pode ser em branco";
    }
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(!this.isComentarios) {
      if(["unidade_id", "assunto"].includes(controlName) && !control?.value?.length) {
        result = "Obrigatório";
      /*} else if(controlName == "tempo_planejado") {
        this.form?.controls.data_distribuicao.updateValueAndValidity();*/
      } else if(controlName == "atividade_id" && !control?.value?.length && !this.auth.hasPermissionTo("MOD_DMD_ATV_VAZIO")) {
        result = "Obrigatório";
      } else if(["data_distribuicao", "prazo_entrega"].includes(controlName)) {
        if (!this.util.isDataValid(control.value)) {
          result = "Data inválida";
        } else if(controlName == "data_distribuicao" && control.value.getTime() > this.form?.controls.prazo_entrega.value.getTime()) {
          result = "Maior que entrega";
        } else if(controlName == "prazo_entrega" && control.value.getTime() < this.form?.controls.data_distribuicao.value.getTime()) {
          //this.form?.controls.data_distribuicao.updateValueAndValidity();
          result = "Menor que distribuição";
        }
      } else if(controlName == "plano_id" && !control.value?.length && this.form?.controls?.usuario_id.value?.length) {
        result = "Obrigatório";
      } else if(controlName == "fator_complexidade" && !control.value && this.form?.controls?.atividade_id.value?.length) {
        result = "Obrigatório";
      }
    }

    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let result = undefined;
    if(!this.isComentarios) {
      this.loadEtiquetas();
      this.loadChecklist();
      const etiquetasKeys = this.etiquetas.map(x => x.key);
      const checklistKeys = this.checklist.map(x => x.key);
      const etiqueta = this.form.controls.etiquetas.value.find((x: LookupItem) => !etiquetasKeys.includes(x.key)) as LookupItem;
      const checklst = this.form.controls.checklist.value.find((x: DemandaChecklist) => !etiquetasKeys.includes(x.id) && x.checked) as DemandaChecklist;
      if(etiqueta) result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
      if(checklst) result = "Checklist " + checklst.texto + "não pode ser utilizado!";
      /* Validações pelo plano */
      if(this.form.controls.plano_id.value?.length) {
        /* Verifica se a atividade seleciona está na lista de atividades permitidas no plano de trabalho */
        if(this.form.controls.atividade_id.value?.length && !this.auth.hasPermissionTo('MOD_DMD_ATV_FORA_PL_TRB')) {
          const atividades_termo_adesao = this.planoSelecionado?.documento?.metadados?.atividades_termo_adesao;
          const atividade = this.atividade!.searchObj as Atividade;
          if(!this.planoSelecionado || this.planoSelecionado?.id != this.form.controls.plano_id.value) {
            result = "Erro ao ler " + this.lex.noun("plano de trabalho") + ". Selecione-o novamente!";
          } else if(atividades_termo_adesao && atividade && atividades_termo_adesao.indexOf(this.util.removeAcentos(atividade.nome.toLowerCase())) < 0){
            result = this.lex.noun("Atividade") + " não consta na lista permitida pelo " + this.lex.noun("plano de trabalho") + " selecionado.";
          }
        }
      }
    }
    return result;
  }

  protected assignDelta(delta: any) {
    delta = delta || {
      plano_id: this.form.controls.plano_id.value,
      atividade_id: this.form.controls.atividade_id.value,
      fator_complexidade: this.form.controls.fator_complexidade.value,
      tempo_planejado: this.form.controls.tempo_planejado.value,
      prazo_entrega: this.form.controls.prazo_entrega.value
    }
    this.util.fill(this.delta, delta);
  }

  protected deltaChanged(field?: string) {
    return this.form?.controls.plano_id &&
      this.form?.controls.atividade_id &&
      this.form?.controls.fator_complexidade &&
      this.form?.controls.tempo_planejado &&
      this.form?.controls.prazo_entrega &&
      (
        ((!field || field == "plano_id") && this.delta.plano_id != this.form.controls.plano_id.value) ||
        ((!field || field == "atividade_id") && this.delta.atividade_id != this.form.controls.atividade_id.value) ||
        ((!field || field == "fator_complexidade") && this.delta.fator_complexidade != this.form.controls.fator_complexidade.value) ||
        ((!field || field == "tempo_planejado") && this.delta.tempo_planejado != this.form.controls.tempo_planejado.value) ||
        ((!field || field == "prazo_entrega") && this.delta.prazo_entrega?.getTime() != this.form.controls.prazo_entrega.value?.getTime())
      );
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    if(this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if(this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.form.controls.etiqueta.setValue("");
      }
    }
    return result;
  };

  private setControlPreventChange(controlName: "plano_id" | "atividade_id" | "fator_complexidade" | "tempo_planejado" | "prazo_entrega", value: any) {
    this.delta[controlName] = value;
    this.form.controls[controlName].setValue(value);
  }

  private calcularPrazo(source: "PACTUADO" | "COMPLEXIDADE" | "PLANO" | "PLANEJADO" | "ENTREGA") {
    if(this.action != "consult"){
      const atividade = this.atividade?.searchObj as Atividade;
      const plano = (this.plano?.selectedItem?.data || this.planos.find(x => x.key == this.plano?.selectedItem?.key)?.data) as Plano;
      if(source == "PACTUADO") {
        const fator = this.form.controls.fator_complexidade.value || 1;
        const fator_ganho_produtivade = 1 - ((plano?.ganho_produtividade || 0) / 100);
        this.form.controls.tempo_pactuado.setValue((atividade?.tempo_pactuado || 0) * fator * fator_ganho_produtivade || 0);
        this.cdRef.detectChanges();
      } else if(this.deltaChanged()) {
        const unidade = this.unidade?.searchObj as Unidade;
        const fator = this.form.controls.fator_complexidade.value || 1;
        const cargaHoraria = plano?.carga_horaria || this.calendar.expediente(unidade);
        this.assignDelta(null);
        if(source == "COMPLEXIDADE") {
          if(atividade) this.setControlPreventChange("tempo_planejado", atividade.dias_planejado * cargaHoraria * fator || 0);
          const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
          this.setControlPreventChange("prazo_entrega", entrega);
        } else if(source == "PLANO") {
          this.planejado!.hoursPerDay = cargaHoraria;
          this.form.controls.carga_horaria.setValue(cargaHoraria);
          const tempo = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO");
          this.setControlPreventChange("tempo_planejado", tempo);
        } else if(source == "PLANEJADO") {
          const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
          this.setControlPreventChange("prazo_entrega", entrega);
        } else if(source == "ENTREGA") {
          const tempo = this.form.controls.prazo_entrega.value ? this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO") : 0;
          this.setControlPreventChange("tempo_planejado", tempo);
        }
        this.cdRef.detectChanges();
      }
    }
  }

  public onTempoPlanejadoChange(event: Event) {
    if(this.entity) this.calcularPrazo("PLANEJADO");
    this.form?.controls.data_distribuicao.updateValueAndValidity();
  }

  public onUnidadeChange(event: Event) {
    this.loadEtiquetas();
  }

  public onDataDistribuicaoChange(event: Event) {
    if(this.entity) this.calcularPrazo("ENTREGA");
    this.form?.controls.prazo_entrega.updateValueAndValidity();
  }

  public onPrazoEntregaChange(event: Event) {
    if(this.entity) this.calcularPrazo("ENTREGA");
    this.form?.controls.data_distribuicao.updateValueAndValidity();
  }

  public onPlanoChange(event: Event) {
    (async () => {
      if(this.entity) {
        const plano = (this.usuario?.searchObj as Usuario)?.planos?.find(x => x.id == this.form!.controls.plano_id.value);
        if(plano) {
          if(this.planoSelecionado?.id != plano.id) {
            this.planoSelecionado = await this.planoDao.getById(plano.id, this.planoJoin);
          }
          if(this.form!.controls.unidade_id.value != plano.unidade_id) {
            const unidade = await this.unidadeDao.getById(plano.unidade_id);
            if(unidade) {
              await this.unidade?.loadSearch(unidade);
              await this.auth.selecionaUnidade(unidade.id);
            }
          }
        }
        this.calcularPrazo("PACTUADO");
        this.calcularPrazo("PLANO");
      }
    })();
  }

  public onComplexidadeChange(event: Event) {
    if(this.atividade?.searchObj) {
      this.calcularPrazo("PACTUADO");
      this.calcularPrazo("COMPLEXIDADE");
    }
  }

  public async onNumeroRequisicaoClick(event: Event) {
    const numeroRequisicao = this.form?.controls.numero_requisicao?.value;
    if(numeroRequisicao?.length) {
      this.docRequisicao!.loading = true;
      try {
        let dados = await this.allPages.getDadosDocumento(numeroRequisicao);
        if(dados) {
          let tipo_processo_id = null;
          let tipo_documento_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          if(dados.documento?.tipo_documento) {
            const tipo_documento = await this.tipoDocumentoDao.query({where: [["nome", "=", dados.documento?.tipo_documento]]}).asPromise();
            if(tipo_documento[0]) {
              this.tipoDocumento?.loadSearch(tipo_documento[0]);
              tipo_documento_id = tipo_documento[0].id;
            }
          }
          this.form.controls.id_processo.setValue(dados.processo?.id_processo);
          this.form.controls.numero_processo.setValue(dados.processo?.numero_processo);
          this.form.controls.id_requisicao.setValue(dados.documento?.id_documento);
          this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
          this.form.controls.tipo_documento_requisicao_id.setValue(tipo_documento_id);
          this.form.controls.numero_requisicao.setValue(dados.documento?.numero_documento);
          //this.form.controls.titulo_requisicao.setValue(dados.titulo_documento);
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente incluir diretamente pelo botão 'Incluir demanda' acessando o documento no Sei!")
      } finally {
        this.docRequisicao!.loading = false;
      }
    }
  }

  public async onProcessoRequisicaoClick(event: Event) {
    const processoRequisicao = this.form?.controls.numero_processo?.value;
    if(processoRequisicao?.length) {
      this.procRequisicao!.loading = true;
      try {
        let dados = await this.allPages.getDadosProcesso(processoRequisicao);
        if(dados) {
          let tipo_processo_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          this.form.controls.id_processo.setValue(dados.processo?.id_processo);
          this.form.controls.numero_processo.setValue(dados.processo?.numero_processo);
          this.form.controls.id_requisicao.setValue(0);
          this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
          this.form.controls.tipo_documento_requisicao_id.setValue(null);
          this.form.controls.numero_requisicao.setValue("");
          //this.form.controls.titulo_requisicao.setValue(dados.titulo_documento);
        } else {
          throw new Error("Processo não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o processo informado. Tente incluir diretamente pelo botão 'Incluir demanda' acessando o processo no Sei!")
      } finally {
        this.procRequisicao!.loading = false;
      }
    }
  }

  public loadEtiquetas() {
    const unidade = (this.unidade?.searchObj as Unidade);
    const atividade = (this.atividade?.searchObj as Atividade);
    this.etiquetas = this.util.merge(atividade?.etiquetas_predefinidas, unidade?.etiquetas, (a, b) => a.key == b.key);
  }

  public loadChecklist() {
    const atividade = (this.atividade?.searchObj as Atividade);
    this.checklist = atividade?.checklist_predefinidos || [];
    let checks: DemandaChecklist[] = this.util.merge(this.checklist.map(a => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      } as DemandaChecklist;
    }), this.form.controls.checklist.value.filter((b: DemandaChecklist) => b.checked), (a: DemandaChecklist, b: DemandaChecklist) => {
      if(a.id == b.id) {
        a.checked = b.checked;
        return true;
      } else {
        return false;
      }
    });
    this.form.controls.checklist.setValue(checks);
  }

  public loadAtividade(atividade: Atividade | undefined) {
    if(atividade) {
      /* Carrega etiquetas */
      this.loadEtiquetas();
      /* Carrega complexidades */
      this.complexidades = atividade.complexidade?.map(x => Object.assign({key: x.fator, value: x.grau + ' (Fator: ' + x.fator + '; Tempo: ' + x.tempo + 'h)'})) || [];
      /* Atualiza fator de complexidade */
      if(!atividade.complexidade?.find(x => x.fator == this.form.controls.fator_complexidade.value)) this.form.controls.fator_complexidade.setValue(1);
      this.onComplexidadeChange(new Event("change"));
      /* Carrega checklist */
      this.loadChecklist();
      /* Carrega configurações */
      this.form.controls.recalcula_prazo.setValue(atividade.recalcula_prazo);
    } else {
      this.etiquetas = [];
      this.complexidades = [];
      this.form.controls.tempo_pactuado.setValue(0);
      this.form.controls.tempo_planejado.setValue(0);
      this.form.controls.fator_complexidade.setValue(1);
    }
    this.cdRef.detectChanges();
  }

  public getPlanos(usuario: Usuario, data_distribuicao: Date, plano_id: string | null): LookupItem[] {
    return usuario.planos?.filter(x => x.id == plano_id || (!x.data_fim && this.util.between(data_distribuicao, {start: x.data_inicio_vigencia, end: x.data_fim_vigencia}))).map(x => Object.assign({
      key: x.id, 
      value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x
    })) || [];
  }

  public loadUsuario(usuario: Usuario | undefined) {
    if(usuario) {
      const plano_id = this.form.controls.plano_id.value;
      const data_distribuicao = this.form.controls.data_distribuicao.value || new Date();
      this.planos = this.getPlanos(usuario, data_distribuicao, plano_id); //usuario?.planos?.map(x => Object.assign({key: x.id, value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x})) || [];
      this.cdRef.detectChanges();
      this.form.controls.plano_id.setValue(!plano_id?.length && this.planos.length > 0 ? this.planos[0].key : plano_id);
    } else {
      this.planos = [];
      this.form.controls.plano_id.setValue(null);
    }
    this.cdRef.detectChanges();
  }

  public onAtividadeSelect(item: SelectItem) {
    const atividade: Atividade | undefined = item.entity as Atividade;
    this.loadAtividade(atividade);
    this.calcularPrazo("COMPLEXIDADE");
    this.comentarioAtividade(atividade);
  }

  public comentarioAtividade(atividade?: Atividade) {
    const comentarios: Comentario[] = this.form.controls.comentarios.value || [];
    const index = comentarios.findIndex(x => x.tipo == "ATIVIDADE");
    if(index >= 0) {
      if(comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if(atividade?.comentario_predefinido?.length) {
      const comentario = new Comentario();
      comentario.id = this.dao!.generateUuid();
      comentario.path = "";
      comentario.texto = atividade.comentario_predefinido;
      comentario.data_hora = this.auth.hora;
      comentario.usuario_id = this.auth.usuario!.id;
      comentario.comentario_id = null;
      comentario.tipo = "ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      this.form.controls.comentarios.setValue(this.comentario.orderComentarios(comentarios));
      this.cdRef.detectChanges();
    }
  }

  public onAtividadeChange(event: Event) {
    if(!this.form?.controls.atividade_id.value?.length) this.loadAtividade(undefined);
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    this.loadUsuario(usuario);
    this.calcularPrazo("PLANO");
  }

  public onUsuarioChange(event: Event) {
    if(!this.form?.controls.usuario_id.value?.length) this.loadUsuario(undefined);
  }

  /*public comentarioLevel(comentario: Comentario): string[] {
    return (comentario.path || "").split("").filter(x => x == "/");
  }

  public orderComentarios(comentarios?: Comentario[]) {
    let ordered = comentarios?.sort((a: Comentario, b: Comentario) => {
      if(a.path == b.path) { /* Situação 1: Paths iguais 
        return a.data_hora.getTime() < b.data_hora.getTime() ? -1 : 1;
      } else { /* Situação 2: Paths diferentes, deverá ser encontrado o menor nível comum entre eles para poder comparar 
        let pathA = a.path.split("/");
        let pathB = b.path.split("/");
        let common = this.util.commonBegin(pathA, pathB);
        let dataHoraA = (comentarios.find(x => x.id == (pathA[common.length] || a.id)) || a).data_hora.getTime();
        let dataHoraB = (comentarios.find(x => x.id == (pathB[common.length] || b.id)) || b).data_hora.getTime();
        return dataHoraA == dataHoraB ? 0 : (dataHoraA < dataHoraB ? -1 : 1);
      }
    }) || [];
    return ordered;
  }

  public newComentario(pai?: Comentario) {
    const comentario = new Comentario();
    const comentarios = this.form.controls.comentarios.value || [];
    comentario.id = this.dao!.generateUuid();
    comentario.path = pai ? pai.path + "/" + pai.id : "";
    comentario.data_hora = this.auth.hora;
    comentario.usuario_id = this.auth.usuario!.id;
    comentario.comentario_id = pai?.id || null;
    comentario.usuario = this.auth.usuario;
    comentario._status = "ADD";
    comentarios.push(comentario);
    this.form.controls.comentarios.setValue(this.orderComentarios(comentarios));
    this.comentarios!.adding = true;
    this.comentarios!.edit(comentario);
    return comentario;
  }*/

  public addComentario = async () => {
    this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!);
    return undefined;
  }

  public orderPausas(pausas: DemandaPausa[]) {
    return pausas.sort((a: DemandaPausa, b: DemandaPausa) => {
      return a.data_inicio < b.data_inicio ? -1 : 1;
    });
  }

  public comentarioDynamicOptions(row: any): ToolbarButton[] {
    return [{
      label: "Comentar",
      icon: "bi bi-chat-left-quote",
      onClick: (comentario: Comentario) => {
        this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!, comentario);
      }
    }];
  }

  public async saveComentario(form: FormGroup, item: any) {
    const entity = form.value;
    Object.assign(this.comentarios!.editing!, entity);
    return undefined;
  }

  public async loadComentario(form: FormGroup, row: any) {
    this.formComentarios.controls.texto.setValue(row.texto);
    this.formComentarios.controls.tipo.setValue(row.tipo);
    this.formComentarios.controls.privacidade.setValue(row.privacidade);
  }

  public async loadData(entity: Demanda, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    this.planoSelecionado = entity.plano;
    this.assignDelta(formValue);
    await Promise.all([
      this.unidade?.loadSearch(entity.unidade || formValue.unidade_id, false),
      this.usuario?.loadSearch(entity.usuario || formValue.usuario_id, false),
      this.atividade?.loadSearch(entity.atividade || formValue.atividade_id, false)
    ]);
    form.patchValue(formValue, {emitEvent: false}); /* Carrega valores iniciais no form e previne que o plano_id seja sobrescrito */
    if(entity.usuario) this.loadUsuario(entity.usuario);
    if(entity.atividade) this.loadAtividade(entity.atividade);
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    entity.comentarios = this.comentario.orderComentarios(entity.comentarios || []);
    entity.pausas = this.orderPausas(entity.pausas || []);
    form.patchValue(formValue); /* Carrega os valores e dispara os eventos */
    this.loadEtiquetas();
    if(this.action == "new") {
      if(this.entity?.numero_requisicao?.length) {
        this.onNumeroRequisicaoClick(new Event(""));
      } else if(this.entity?.numero_processo?.length) {
        this.onProcessoRequisicaoClick(new Event(""));
      }
    }
  }

  public async initializeData(form: FormGroup) {
    if(this.isComentarios) {
      this.entity = (await this.dao!.getDemanda(this.urlParams!.get("id")!))!;
    } else if (this.isClonar) {
      const source = (await this.dao!.getDemanda(this.urlParams!.get("id")!))!;
      this.entity = new Demanda();
      Object.assign(this.entity, {
        atividade: source.atividade,
        unidade: source.unidade,
        usuario: source.usuario,
        plano: source.plano,
        tipo_processo: source.tipo_processo,
        id_requisicao: source.id_requisicao,
        numero_requisicao: source.numero_requisicao,
        id_processo: source.id_processo,
        numero_processo: source.numero_processo,
        assunto: source.assunto,
        data_distribuicao: source.data_distribuicao,
        tempo_planejado: source.tempo_planejado,
        carga_horaria: source.carga_horaria,
        prazo_entrega: source.prazo_entrega,
        tempo_pactuado: source.tempo_pactuado,
        fator_complexidade: source.fator_complexidade,
        atividade_id: source.atividade_id,
        demandante_id: this.auth.usuario?.id,
        usuario_id: source.usuario_id,
        unidade_id: source.unidade_id,
        plano_id: source.plano_id,
        etiquetas: source.etiquetas,
        checklist: source.checklist,
        tipo_documento_requisicao_id: source.tipo_documento_requisicao_id,
        tipo_processo_id: source.tipo_processo_id,
        entregas: (source.entregas || []).map((entrega: DemandaEntrega) => {
          const novo = new DemandaEntrega();
          novo.descricao = entrega.descricao;
          novo.tempo_estimado = entrega.tempo_estimado;
          novo.usuario_id = entrega.usuario_id;
          novo.tarefa_id = entrega.tarefa_id;
          novo.comentarios = [];
          novo._status = "ADD";
          return novo;
        })
      });
    } else {
      this.entity = new Demanda();
      this.entity.data_distribuicao = this.auth.hora;
      this.entity.prazo_entrega = this.entity.data_distribuicao;
      this.entity.demandante_id = this.auth.usuario?.id || "";
      this.entity.unidade_id = this.auth.unidade?.id || "";
      this.entity.unidade = this.auth.unidade;
      if(this.queryParams?.numero_requisicao?.length) {
        this.entity.numero_requisicao = this.queryParams?.numero_requisicao;
      } else if(this.queryParams?.numero_processo?.length) {
        this.entity.numero_processo = this.queryParams?.numero_processo;
      }
    }
    await this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<Demanda | boolean> {
    return new Promise<Demanda | boolean>((resolve, reject) => {
      let demanda = this.util.fill(new Demanda(), this.entity!);
      this.comentarios?.confirm();
      demanda = this.util.fillForm(demanda, this.form!.value);
      demanda.comentarios = demanda.comentarios.filter((x: Comentario) => ["ADD", "DELETE"].includes(x._status || "") && x.texto?.length);
      demanda.entregas = demanda.entregas.filter((x: DemandaEntrega) => ["ADD", "EDIT", "DELETE"].includes(x._status || ""));
      if(this.isComentarios) {
        this.dao?.update(this.entity!.id, { comentarios: demanda.comentarios }).then(row => resolve(true)).catch(error => resolve(false));
      } else {
        resolve(demanda);
      }
    });
  }
}

