import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade, AtividadeChecklist } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { Unidade } from 'src/app/models/unidade.model';
import { Comentario } from 'src/app/models/comentario';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentariosComponent } from 'src/app/modules/uteis/comentarios/comentarios.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { Documento } from 'src/app/models/documento.model';
import { AtividadePausa } from 'src/app/models/atividade-pausa.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { SeiKeys } from 'src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';

export type Checklist = {id: string, texto: string, checked: boolean};

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.scss']
})
export class AtividadeFormComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;
  @ViewChild('tipoAtividade', { static: false }) public tipoAtividade?: InputSearchComponent;
  @ViewChild('planoTrabalho', { static: false }) public planoTrabalho?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: ComentariosComponent;

  public sei?: SeiKeys;
  public form: FormGroup;
  public formChecklist: FormGroup;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public tipoAtividadeDao: TipoAtividadeDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public calendar: CalendarService;
  public comentario: ComentarioService;
  public etiquetas: LookupItem[] = [];
  public checklist: LookupItem[] = [];
  public planosTrabalhos: LookupItem[] = [];
  public planoTrabalhoJoin: string[] = ["entregas.entrega:id,nome", "tipo_modalidade:id,nome"];
  public planoTrabalhoSelecionado?: PlanoTrabalho | null = null;
  public usuarioJoin: string[] = ['planos_trabalho.entregas.entrega:id,nome', 'planos_trabalho.tipo_modalidade:id,nome'];
  public entregas: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    const horaInicial = this.auth.hora;
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.form = this.fh.FormBuilder({
      numero: {default: 0},
      descricao: {default: ""},
      data_distribuicao: {default: horaInicial},
      carga_horaria: {default: 0},
      tempo_planejado: {default: 0},
      prazo_entrega: {default: horaInicial},
      data_inicio: {default: null},
      data_entrega: {default: null},
      esforco: {default: 0},
      tempo_despendido: {default: 0},
      data_arquivamento: {default: null},
      etiquetas: {default: []},
      checklist: {default: []},
      prioridade: {default: 0},
      progresso: {default: 0},
      plano_trabalho_id: {default: null},
      plano_trabalho_entrega_id: {default: null},
      tipo_atividade_id: {default: null},
      demandante_id: {default: ""},
      usuario_id: {default: null},
      unidade_id: {default: ""},
      documento_requisicao_id: {default: null},
      documento_entrega_id: {default: null},
      comentarios: {default: []},
      pausas: {default: []},
      etiqueta: {default: ""},
      tarefas: {default: []},
      documento_requisicao: {default: new Documento()},
      documento_entrega: {default: new Documento()}
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: {default: ""},
      texto: {default: ""},
      checked: {default: false}
    }, this.cdRef, this.validateChecklist);
    this.join = ["usuario.planos_entregas.entregas.entrega:id,nome", "usuario.planos_entregas.tipo_modalidade:id,nome", "pausas", "tipo_atividade", "unidade", "comentarios.usuario", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario", "documento_requisicao", "documento_entrega"];
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["comentar", "clonar"].includes(segment) ? segment : this.action;
  }

  public get isClonar(): boolean {
    return this.action == "clonar";
  }

  public get titleAtividade(): string {
    return this.form?.controls.numero?.value ? "#" + this.form?.controls.numero?.value : "";
  }

  /*public get prazoEmDias(): string | undefined {
    const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
    return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? "true" : undefined;
  }

  public get prazoEmHoras(): string | undefined {
    const unidade = this.unidade?.searchObj as Unidade || this.auth.unidade!;
    return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade?.distribuicao_forma_contagem_prazos) ? undefined : "true";
  }*/

  public validateChecklist = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["unidade_id", "descricao"].includes(controlName) && !control?.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "tipo_atividade_id" && !control?.value?.length && !this.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO")) {
      result = "Obrigatório";
    } else if(["data_distribuicao", "prazo_entrega"].includes(controlName)) {
      let prazoEntrega = this.form?.controls.prazo_entrega?.value;
      let dataDistribuicao = this.form?.controls.data_distribuicao?.value;
      if (!this.util.isDataValid(control.value)) {
        result = "Data inválida";
      } else if(controlName == "data_distribuicao" && control.value && this.util.isDataValid(prazoEntrega) && control.value.getTime() > prazoEntrega.getTime()) {
        result = "Maior que entrega";
      } else if(controlName == "prazo_entrega" && control.value && this.util.isDataValid(dataDistribuicao) && control.value.getTime() < dataDistribuicao.getTime()) {
        result = "Menor que distribuição";
      }
    } else if(controlName == "plano_trabalho_id" && !control.value?.length && this.form?.controls?.usuario_id.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "plano_trabalho_entrega_id") {
      if(this.form?.controls?.plano_trabalho_id.value?.length && !control.value?.length) {
        result = "Obrigatório";
      } else if(control.value?.length && !this.entregas.find(x => x.key == control.value)) {
        result = "Selecione";
      }
    }

    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let result = undefined;
    //if(!this.isComentarios) {
    this.loadEtiquetas();
    this.loadChecklist();
    const etiquetasKeys = this.etiquetas.map(x => x.key);
    const checklistKeys = this.checklist.map(x => x.key);
    const etiqueta = (this.form.controls.etiquetas.value || []).find((x: LookupItem) => !etiquetasKeys.includes(x.key)) as LookupItem;
    const checklst = (this.form.controls.checklist.value || []).find((x: AtividadeChecklist) => !etiquetasKeys.includes(x.id) && x.checked) as AtividadeChecklist;
    if(etiqueta) result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
    if(checklst) result = "Checklist " + checklst.texto + "não pode ser utilizado!";
    /* Validações pelo plano *
    if(this.form.controls.plano_id.value?.length) {
      /* Verifica se a atividade seleciona está na lista de atividades permitidas no plano de trabalho *
      if(this.form.controls.atividade_id.value?.length && !this.auth.hasPermissionTo('MOD_DMD_TIPO_ATV_FORA_PL_TRB')) {
        const atividades_termo_adesao = this.planoSelecionado?.documento?.metadados?.atividades_termo_adesao;
        const atividade = this.atividade!.searchObj as Atividade;
        if(!this.planoSelecionado || this.planoSelecionado?.id != this.form.controls.plano_id.value) {
          result = "Erro ao ler " + this.lex.noun("plano de trabalho") + ". Selecione-o novamente!";
        } else if(atividades_termo_adesao && atividade && atividades_termo_adesao.indexOf(this.util.removeAcentos(atividade.nome.toLowerCase())) < 0){
          result = this.lex.noun("Atividade") + " não consta na lista permitida pelo " + this.lex.noun("plano de trabalho") + " selecionado.";
        }
      }
    }*/
    //}
    return result;
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

  /*private calcularPrazo(source: "PACTUADO" | "COMPLEXIDADE" | "PLANO" | "PLANEJADO" | "ENTREGA") {
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
        const cargaHoraria = plano?.carga_horaria || this.calendar.expedienteMedio(unidade);
        this.assignDelta(null);
        if(source == "COMPLEXIDADE") {
          if(atividade) this.setControlPreventChange("tempo_planejado", atividade.dias_planejado * cargaHoraria * fator || 0);
          const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
          this.setControlPreventChange("prazo_entrega", entrega);
        } else if(source == "PLANO") {
          if(this.planejado) this.planejado.hoursPerDay = cargaHoraria;
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
  }*/

  public onUnidadeChange(event: Event) {
    this.loadEtiquetas();
  }

  public onDataDistribuicaoChange(event: Event) {
    this.loadUsuario(this.usuario?.selectedItem?.entity); /* Atualiza a lista de planos de trabalho válidos no período */
    this.form?.controls.prazo_entrega.updateValueAndValidity();
  }

  public onPrazoEntregaChange(event: Event) {
    this.form?.controls.data_distribuicao.updateValueAndValidity();
  }

  public onPlanoChange(event: Event) {
    (async () => {
      if(this.entity) {
        const planoTrabalho = (this.usuario?.searchObj as Usuario)?.planos_trabalho?.find(x => x.id == this.form!.controls.plano_trabalho_id.value);
        const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
        if(planoTrabalho) {
          if(this.planoTrabalhoSelecionado?.id != planoTrabalho.id) {
            this.planoTrabalhoSelecionado = await this.planoTrabalhoDao.getById(planoTrabalho.id, this.planoTrabalhoJoin);
          }
          if(this.form!.controls.unidade_id.value != planoTrabalho.unidade_id) {
            const unidade = await this.unidadeDao.getById(planoTrabalho.unidade_id);
            if(unidade) {
              await this.unidade?.loadSearch(unidade);
              await this.auth.selecionaUnidade(unidade.id);
            }
          }
          this.entregas = planoTrabalho.entregas?.map(x => Object.assign({}, {
            key: x.id,
            value: x.entrega?.nome || "DESCONHECIDO",
            data: x
          })) || [];
          this.cdRef.detectChanges();
          this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && this.entregas.length > 0 ? this.entregas[0].key : planoTrabalhoEntregaId);
        } else {
          this.entregas = [];
          this.form.controls.plano_trabalho_entrega_id.setValue(null);
        }
      }
    })();
  }

  public loadEtiquetas() {
    const unidade = (this.unidade?.searchObj as Unidade);
    const tipoAtividade = (this.tipoAtividade?.searchObj as TipoAtividade);
    this.etiquetas = this.util.merge(tipoAtividade?.etiquetas, unidade?.etiquetas, (a, b) => a.key == b.key);
  }

  public loadChecklist() {
    const tipoAtividade = (this.tipoAtividade?.searchObj as TipoAtividade);
    this.checklist = tipoAtividade?.checklist || [];
    let checks: AtividadeChecklist[] = this.util.merge(this.checklist.map(a => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      } as AtividadeChecklist;
    }), (this.form.controls.checklist.value || []).filter((b: AtividadeChecklist) => b.checked), (a: AtividadeChecklist, b: AtividadeChecklist) => {
      if(a.id == b.id) {
        a.checked = b.checked;
        return true;
      } else {
        return false;
      }
    });
    this.form.controls.checklist.setValue(checks);
  }

  public loadTipoAtividade(tipoAtividade: TipoAtividade | undefined) {
    if(tipoAtividade) {
      this.loadEtiquetas();
      this.loadChecklist();
    } else {
      this.etiquetas = [];
      this.form.controls.esforco.setValue(0);
      this.form.controls.tempo_planejado.setValue(0);
    }
    this.cdRef.detectChanges();
  }

  public getPlanosTrabalhos(usuario: Usuario, data_distribuicao: Date, plano_trabalho_id: string | null): LookupItem[] {
    return usuario.planos_trabalho?.filter(x => x.id == plano_trabalho_id || (this.util.between(data_distribuicao, {start: x.data_inicio_vigencia, end: x.data_fim_vigencia}))).map(x => Object.assign({
      key: x.id, 
      value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x
    })) || [];
  }

  public loadUsuario(usuario: Usuario | undefined) {
    if(usuario) {
      const planoTrabalhoId = this.form.controls.plano_trabalho_id.value;
      const dataDistribuicao = this.form.controls.data_distribuicao.value || new Date();
      this.planosTrabalhos = this.getPlanosTrabalhos(usuario, dataDistribuicao, planoTrabalhoId); //usuario?.planos?.map(x => Object.assign({key: x.id, value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x})) || [];
      this.cdRef.detectChanges();
      this.form.controls.plano_trabalho_id.setValue(!planoTrabalhoId?.length && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoId);
    } else {
      this.planosTrabalhos = [];
      this.form.controls.plano_trabalho_id.setValue(null);
    }
    this.cdRef.detectChanges();
  }

  public onTipoAtividadeSelect(item: SelectItem) {
    const tipoAtividade: TipoAtividade | undefined = item.entity as TipoAtividade;
    this.loadTipoAtividade(tipoAtividade);
    this.comentarioAtividade(tipoAtividade);
  }

  public comentarioAtividade(tipoAtividade?: TipoAtividade) {
    const comentarios: Comentario[] = this.form.controls.comentarios.value || [];
    const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
    if(index >= 0) {
      if(comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if(tipoAtividade?.comentario?.length) {
      const comentario = new Comentario();
      comentario.id = this.dao!.generateUuid();
      comentario.path = "";
      comentario.texto = tipoAtividade.comentario;
      comentario.data_hora = this.auth.hora;
      comentario.usuario_id = this.auth.usuario!.id;
      comentario.comentario_id = null;
      comentario.tipo = "TIPO_ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      this.form.controls.comentarios.setValue(this.comentario.orderComentarios(comentarios));
      this.cdRef.detectChanges();
    }
  }

  public onTipoAtividadeChange(event: Event) {
    if(!this.form?.controls.tipo_atividade_id.value?.length) this.loadTipoAtividade(undefined);
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    this.loadUsuario(usuario);
  }

  public onUsuarioChange(event: Event) {
    if(!this.form?.controls.usuario_id.value?.length) this.loadUsuario(undefined);
  }

  /*public addComentario = async () => {
    this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!);
    return undefined;
  }*/

  public orderPausas(pausas: AtividadePausa[]) {
    return pausas.sort((a: AtividadePausa, b: AtividadePausa) => {
      return a.data_inicio < b.data_inicio ? -1 : 1;
    });
  }

  /*public comentarioDynamicOptions(row: any): ToolbarButton[] {
    return [{
      label: "Comentar",
      icon: "bi bi-chat-left-quote",
      onClick: (comentario: Comentario) => {
        this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!, comentario);
      }
    }];
  }*/

  /*public async saveComentario(form: FormGroup, item: any) {
    const entity = form.value;
    Object.assign(this.comentarios!.editing!, entity);
    return undefined;
  }*/

  /*public async loadComentario(form: FormGroup, row: any) {
    this.formComentarios.controls.texto.setValue(row.texto);
    this.formComentarios.controls.tipo.setValue(row.tipo);
    this.formComentarios.controls.privacidade.setValue(row.privacidade);
  }*/

  public async loadData(entity: Atividade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    this.planoTrabalhoSelecionado = entity.plano_trabalho;
    await Promise.all([
      this.unidade?.loadSearch(entity.unidade || formValue.unidade_id, false),
      this.usuario?.loadSearch(entity.usuario || formValue.usuario_id, false),
      this.tipoAtividade?.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id, false)
    ]);
    form.patchValue(formValue, {emitEvent: false}); /* Carrega valores iniciais no form e previne que o plano_id seja sobrescrito */
    if(entity.usuario) this.loadUsuario(entity.usuario);
    if(entity.tipo_atividade) this.loadTipoAtividade(entity.tipo_atividade);
    if(entity.unidade_id != this.auth.unidade!.id) await this.auth.selecionaUnidade(entity.unidade_id);
    entity.comentarios = this.comentario.orderComentarios(entity.comentarios || []);
    entity.pausas = this.orderPausas(entity.pausas || []);
    form.patchValue(formValue); /* Carrega os valores e dispara os eventos */
    this.loadEtiquetas();
    /*if(this.action == "new" && this.entity?.numero_requisicao?.length || this.entity?.numero_processo?.length) {
      if() {
        this.onNumeroRequisicaoClick(new Event(""));
      } else if() {
        this.onProcessoRequisicaoClick(new Event(""));
      }
    }*/
  }

  public async initializeData(form: FormGroup) {
    if (this.isClonar) {
      const source = (await this.dao!.getAtividade(this.urlParams!.get("id")!))!;
      this.entity = new Atividade();
      Object.assign(this.entity, {
        tipo_atividade: source.tipo_atividade,
        unidade: source.unidade,
        usuario: source.usuario,
        plano_trabalho: source.plano_trabalho,
        descricao: source.descricao,
        data_distribuicao: source.data_distribuicao,
        tempo_planejado: source.tempo_planejado,
        carga_horaria: source.carga_horaria,
        prazo_entrega: source.prazo_entrega,
        esforco: source.esforco,
        tipo_atividade_id: source.tipo_atividade_id,
        demandante_id: this.auth.usuario?.id,
        usuario_id: source.usuario_id,
        unidade_id: source.unidade_id,
        plano_trabalho_id: source.plano_trabalho_id,
        etiquetas: source.etiquetas,
        checklist: source.checklist,
        plano_trabalho_entrega_id: source.plano_trabalho_entrega_id,
        progresso: source.progresso,
        tarefas: (source.tarefas || []).map((tarefa: AtividadeTarefa) => new AtividadeTarefa(Object.assign({}, tarefa, {
          id: this.dao!.generateUuid(),
          comentarios: [],
          _status: "ADD"
        }))),
        documento_requisicao: !source.documento_requisicao ? undefined : Object.assign({}, new Documento(Object.assign({}, source.documento_requisicao, {
          id: this.dao!.generateUuid(),
          _status: "ADD"
        }))),
        documento_entrega: !source.documento_entrega ? undefined : Object.assign({}, new Documento(Object.assign({}, source.documento_entrega, {
          id: this.dao!.generateUuid(),
          _status: "ADD"
        })))
      });
    } else {
      this.sei = this.metadata.sei;
      this.entity = new Atividade();
      this.entity.data_distribuicao = this.auth.hora;
      this.entity.prazo_entrega = this.entity.data_distribuicao;
      this.entity.demandante_id = this.auth.usuario?.id || "";
      this.entity.unidade_id = this.auth.unidade?.id || "";
      this.entity.unidade = this.auth.unidade;
      /* Verificar isso (TODO)
      if(this.queryParams?.numero_requisicao?.length) {
        this.entity.numero_requisicao = this.queryParams?.numero_requisicao;
      } else if(this.queryParams?.numero_processo?.length) {
        this.entity.numero_processo = this.queryParams?.numero_processo;
      }*/
    }
    await this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<Atividade | boolean> {
    return new Promise<Atividade | boolean>((resolve, reject) => {
      let atividade = this.util.fill(new Atividade(), this.entity!);
      this.comentarios?.confirm();
      atividade = this.util.fillForm(atividade, this.form!.value);
      atividade.comentarios = atividade.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
      atividade.tarefas = atividade.tarefas.filter((tarefa: AtividadeTarefa) => {
        tarefa.comentarios = tarefa.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
        return ["ADD", "EDIT", "DELETE"].includes(tarefa._status || "");
      });
      resolve(atividade);
    });
  }
}

