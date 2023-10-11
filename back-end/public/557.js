"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[557],{

/***/ 88543:
/*!**************************************************!*\
  !*** ./src/app/models/atividade-tarefa.model.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeTarefa: () => (/* binding */ AtividadeTarefa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class AtividadeTarefa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.documento = null; /* Documento de entrga */
    this.comentarios = []; /* Comentarios da tarefa */
    this.descricao = null; /* Descrição da tarefa */
    this.data_lancamento = new Date(); /* Data hora do lançamento da tarefa */
    this.tempo_estimado = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
    this.data_conclusao = null; /* Data de conclusao */
    this.documento_id = null; /* Documento de entrga */
    this.atividade_id = ""; /* Atividade */
    this.usuario_id = ""; /* Usuário */
    this.tipo_tarefa_id = null; /* Tarefa */
    this.initialization(data);
  }
}

/***/ }),

/***/ 94180:
/*!*****************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-base.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeListBase: () => (/* binding */ AtividadeListBase)
/* harmony export */ });
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ 70361);
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/comentario.service */ 2124);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var _atividade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./atividade.service */ 57338);











class AtividadeListBase extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__.AtividadeDaoService);
    this.injector = injector;
    this.etiquetas = [];
    this.addComentarioButton = {
      icon: "bi bi-plus-circle",
      hint: "Incluir comentário"
    };
    this.DATAS_FILTRO = [{
      key: "DISTRIBUICAO",
      value: "Distribuição",
      icon: "bi bi-file-earmark-plus",
      color: "badge rounded-pill bg-warning text-dark"
    }, {
      key: "PRAZO",
      value: "Prazo",
      icon: "bi bi-calendar-check",
      color: "badge rounded-pill bg-info text-dark"
    }, {
      key: "CONCLUSAO",
      value: "Conclusão",
      icon: "bi bi-check-circle",
      color: "badge rounded-pill bg-info text-dark"
    }];
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_1__.UsuarioDaoService);
    this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_9__.TipoAtividadeDaoService);
    this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__.TipoProcessoDaoService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__.ListenerAllPagesService);
    this.atividadeService = injector.get(_atividade_service__WEBPACK_IMPORTED_MODULE_10__.AtividadeService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__.CalendarService);
    this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_8__.ComentarioService);
    this.join = ["tipo_atividade", "plano_trabalho_entrega:id,descricao", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario:id,nome,apelido", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario:id,nome,apelido"];
    /* Inicializações */
    this.extra = {
      planos_trabalho: {},
      afastamentos: {}
    };
    this.optionsMetadata = {
      refreshId: (id => (this.grid?.query || this.query).refreshId(id)).bind(this),
      removeId: (id => (this.grid?.query || this.query).removeId(id)).bind(this),
      refresh: this.refresh.bind(this)
    };
  }
  onGridLoad(rows) {
    /* Ordena os comentários */
    rows?.forEach(atividade => {
      atividade.comentarios = this.comentario.orderComentarios(atividade.comentarios);
    });
    /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
    const extra = (this.grid?.query || this.query).extra;
    if (extra) {
      //this.extra.avaliadores = Object.assign(this.extra.avaliadores, extra.avaliadores || {});
      this.extra.planos_trabalho = Object.assign(this.extra.planos_trabalho, extra.planos || {});
      for (let [key, value] of Object.entries(extra.afastamentos || {})) {
        this.extra.afastamentos[key] = value.reduce((a, v) => {
          if (!a.find(x => x.id == v.id)) a.push(v);
          return a;
        }, this.extra.afastamentos[key] || []);
      }
      Object.entries(extra.feriados || {}).forEach(([key, value]) => {
        if (!this.calendar.feriadosCadastrados[key]) this.calendar.feriadosCadastrados[key] = value;
      });
      this.cdRef.detectChanges();
    }
  }
  onAtribuidasParaMimChange(event) {
    if (this.filter.controls.atribuidas_para_mim.value) {
      this.filter.controls.usuario_id.setValue(this.auth.usuario.id);
    } else {
      this.filter.controls.usuario_id.setValue(undefined);
    }
  }
  onSomenteUnidadeAtualChange(event) {
    if (this.filter.controls.somente_unidade_atual.value) {
      this.filter.controls.unidade_id.setValue(this.auth.unidade.id);
    } else {
      this.filter.controls.unidade_id.setValue(undefined);
    }
  }
  onDespendidoClick(row) {
    if (row.metadados && !row.metadados.concluido) {
      const cargaHoraria = this.extra?.planos_trabalho[row.plano_trabalho_id]?.carga_horaria || 0;
      const afastamentos = this.extra?.afastamentos[row.usuario_id] || [];
      this.efemerides = this.calendar.calculaDataTempoUnidade(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
      this.dialog.template({
        title: "Cálculos do tempo despendido"
      }, this.calendarEfemerides, []);
    }
  }
  /*   public temposAtividade(row: Atividade): BadgeButton[] {
      // Atualiza somente a cada mudança de minuto da unidade atual
      if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
        let planoTrabalho = this.extra?.planos_trabalho[row.plano_trabalho_id!];
        let tempos: BadgeButton[] = [
          { color: "light", hint: this.lex.translate("Data de distribuição"), icon: "bi bi-file-earmark-plus", label: this.dao!.getDateTimeFormatted(row.data_distribuicao) },
          { color: "light", hint: this.lex.translate("Prazo de entrega"), icon: "bi bi-calendar-check", label: this.dao!.getDateTimeFormatted(row.data_estipulada_entrega) }
        ];
        if (planoTrabalho?.tipo_modalidade?.atividade_esforco) tempos.push({ color: "light", hint: this.lex.translate("Esforço"), icon: "bi bi-stopwatch", label: (row.esforco ? this.util.decimalToTimerFormated(row.esforco, true) + " " + this.lex.translate("esforço") : "Sem " + this.lex.translate("esforço"))});
        if (row.metadados.concluido) tempos.push({ color: "light", hint: "Data de entrega realizada", icon: "bi bi-check-circle", label: this.dao!.getDateTimeFormatted(row.data_entrega) });
        if (row.metadados.iniciado && !!planoTrabalho?.tipo_modalidade?.atividade_tempo_despendido) {
          const cargaHoraria = planoTrabalho?.carga_horaria || 0;
          const afastamentos = this.extra?.afastamentos[row.usuario_id!] || [];
          const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio!, this.auth.hora, cargaHoraria, row.unidade!, "ENTREGA", row.pausas, afastamentos);
          tempos.push({ color: (despendido > row.esforco ? "warning" : "light"), hint: "Tempo despendido", icon: "bi bi-hourglass-split", label: this.util.decimalToTimerFormated(despendido, true) + " despendido", click: !row.metadados.concluido ? this.onDespendidoClick.bind(this) : undefined, data: row });
        }
        if (!row.metadados.concluido && row.data_estipulada_entrega.getTime() < this.auth.hora.getTime()) {
          const atrasado = this.calendar.horasAtraso(row.data_estipulada_entrega, row.unidade!);
          tempos.push({ color: "danger", hint: "Tempo de atraso", icon: "bi bi-alarm", label: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
        }
        row.metadados.extra = row.metadados.extra || {};
        row.metadados.extra.lastUpdate = this.auth.unidadeHora;
        row.metadados.extra.tempos = tempos;
      }
      return row.metadados?.extra?.tempos || [];
    }
  
    public desarquivar(atividade: Atividade) {
      this.dao!.arquivar(atividade.id, false).then(() => {
        this.grid!.query!.refreshId(atividade.id);
      }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
    }
  
    public arquivar(atividade: Atividade) {
      this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a atividade?").then(confirm => {
        if (confirm) {
          this.dao!.arquivar(atividade.id, true).then(() => {
            if (this.filter?.controls.arquivadas?.value) {
              this.grid!.query!.refreshId(atividade.id);
            } else {
              (this.grid?.query || this.query!).removeId(atividade.id);
            }
          }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error));
        }
      });
    }*/
  /*public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isDemandante = this.auth.usuario?.id == atividade.demandante_id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (atividade: Atividade) => this.go.navigate({ route: ['uteis', 'comentarios', 'ATIVIDADE', atividade.id, 'new'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'clonar'] }, this.modalRefresh()) };
    const BOTAO_ALTERAR = { label: "Alterar atividade", icon: "bi bi-pencil-square", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'edit'] }, this.modalRefreshId(atividade)) };
    const BOTAO_EXCLUIR = { label: "Excluir atividade", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_PRORROGAR_PRAZO = { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'prorrogar'] }, this.modalRefreshId(atividade))};
    const BOTAO_INICIAR = { label: "Iniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CANCELAR_INICIO = { label: "Cancelar inicio", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this) };
    const BOTAO_ALTERAR_INICIO = { label: "Alterar inicio", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_PAUSAR = { label: "Pausar", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_REINICIAR = { label: "Reiniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
    const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_ALTERAR_CONCLUSAO = { label: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", id: "INICIADO", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
    const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
       result.push(BOTAO_INFORMACOES);
    if (isResponsavel || isGestor || isDemandante) result.push(BOTAO_COMENTARIOS);
    result.push(BOTAO_CLONAR);
    if (atividade.metadados?.arquivado) { /* Arquivado * /
      if (isGestor || isResponsavel) result.push(BOTAO_DESARQUIVAR);
    } else if (!atividade.metadados?.iniciado) {
      if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Não iniciado * /
        result.push(BOTAO_INICIAR);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT')) {
        result.push(BOTAO_ALTERAR);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_EXCL') || this.auth.hasPermissionTo('MOD_DMD_NI_EXCL')) {
        if (result.length) result.push({ divider: true });
        result.push(BOTAO_EXCLUIR);
      }
    } else if (atividade.metadados?.concluido) { /* Concluído -> Gestor ou substituto pode avaliar * /
      if (isGestor || isResponsavel) result.push(BOTAO_ARQUIVAR);
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
      if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL') ) {
        if (result.length) result.push({ divider: true });
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
    } else if (atividade.metadados?.iniciado) { /* Iniciado * /
      if (atividade.metadados?.pausado) {
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Iniciada e Pausada * /
          result.push(BOTAO_REINICIAR);
        }
      } else { /* Iniciada e não Suspensa * /
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) result.push(BOTAO_CONCLUIR);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA')) result.push(BOTAO_PAUSAR);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR')) result.push(BOTAO_CANCELAR_INICIO);
        if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) result.push(BOTAO_ALTERAR_INICIO);
      }
      if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
        result.push(BOTAO_PRORROGAR_PRAZO);
      }
    }
    return result;
  }*/
  /*public cancelarInicio(atividade: Atividade) {
    const self = this;
    this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarInicio(atividade.id).then(function () {
          (self.grid?.query || self.query!).refreshId(atividade.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : error);
        });
      }
    });
  }
     public cancelarConclusao(atividade: Atividade) {
    const self = this;
    this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
      if (confirm) {
        this.dao!.cancelarConclusao(atividade.id).then(function () {
          (self.grid?.query || self.query!).refreshId(atividade.id);
          self.dialog.alert("Sucesso", "Cancelado com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : error);
        });
      }
    });
  }*/
  /*public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
    const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
    const BOTAO_ALTERAR_AVALIACAO = { hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
    const BOTAO_INICIAR = { hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
    const BOTAO_REINICIAR = { hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
    const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
    const BOTAO_ARQUIVAR = { hint: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
    const BOTAO_DESARQUIVAR = { hint: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
    const BOTAO_ALTERAR_CONCLUSAO = { hint: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
       if (!atividade.metadados?.iniciado) { /* Não iniciado * /
      if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Usuário da atividade é o mesmo logado * /
        result.push(BOTAO_INICIAR);
      }
    } else if (atividade.metadados?.concluido) { /* Concluído * /
      if (isGestor || isResponsavel) {
        result.push(atividade.metadados?.arquivado ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
        result.push(BOTAO_ALTERAR_CONCLUSAO);
      }
    } else if (atividade.metadados?.avaliado) { /* Avaliado * /
      if (isGestor) { /* Usuário logado é gestor da Unidade ou substituto * /
        result.push(BOTAO_ALTERAR_AVALIACAO);
      }
    } else if (atividade.metadados?.iniciado) { /* Iniciado * /
      if (atividade.metadados?.pausado && isResponsavel) { /* Iniciada e Pausada * /
        result.push(BOTAO_REINICIAR);
      } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) { /* Iniciada e não Suspensa * /
        result.push(BOTAO_CONCLUIR);
      }
    }
    if(!result.length) result.push(BOTAO_INFORMACOES);
    return result;
  }*/
  onEtiquetaConfigClick() {
    this.go.navigate({
      route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id],
      params: {
        etiquetas: true
      }
    }, {
      modal: true,
      modalClose: modalResult => {
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
        this.cdRef.detectChanges();
      }
    });
  }
  comentarioClick(element) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }
  addComentarioClick(row) {
    this.go.navigate({
      route: ['gestao', 'atividade', row.id, 'comentar']
    }, {
      modal: true,
      modalClose: modalResult => {
        if (modalResult) (this.grid?.query || this.query).refreshId(row.id);
      }
    });
  }
}

/***/ }),

/***/ 48644:
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-grid/atividade-list-grid.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeListGridComponent: () => (/* binding */ AtividadeListGridComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atividade-list-base */ 94180);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;



const _c0 = ["calendarEfemerides"];
const _c1 = ["unidade"];
const _c2 = ["usuario"];
const _c3 = ["etiqueta"];
function AtividadeListGridComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "calendar-efemerides", 37);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("efemerides", ctx_r1.efemerides);
  }
}
function AtividadeListGridComponent_toolbar_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "toolbar")(1, "input-switch", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_toolbar_3_Template_input_switch_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r25.onAgruparChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("control", ctx_r2.filter.controls.agrupar);
  }
}
function AtividadeListGridComponent_column_26_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", row_r31.tarefas == null ? null : row_r31.tarefas.length, "");
  }
}
function AtividadeListGridComponent_column_26_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AtividadeListGridComponent_column_26_ng_template_1_span_0_Template, 3, 1, "span", 42);
  }
  if (rf & 2) {
    const row_r31 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r31.tarefas == null ? null : row_r31.tarefas.length);
  }
}
function AtividadeListGridComponent_column_26_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "atividade-list-tarefa", 45);
  }
  if (rf & 2) {
    const row_r34 = ctx.row;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("selectable", ctx_r30.selectable)("editable", !row_r34.metadados.concluido)("atividade", row_r34);
  }
}
function AtividadeListGridComponent_column_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "column", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_column_26_ng_template_1_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_column_26_ng_template_3_Template, 1, 3, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("align", "center")("hint", ctx_r5.lex.translate("Tarefas da atividade"))("template", _r27)("expandTemplate", _r29);
  }
}
function AtividadeListGridComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "order", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "order", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " Descri\u00E7\u00E3o ");
  }
  if (rf & 2) {
    const header_r35 = ctx.header;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("/", ctx_r7.lex.translate("Tipo de Atividade"), "/ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r7.lex.translate("Entrega"));
  }
}
function AtividadeListGridComponent_ng_template_30_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 52);
  }
  if (rf & 2) {
    const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r37.entityService.getIcon("TipoAtividade"))("label", row_r36.tipo_atividade.nome);
  }
}
function AtividadeListGridComponent_ng_template_30_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 52);
  }
  if (rf & 2) {
    const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r38.entityService.getIcon("Entrega"))("label", row_r36.plano_trabalho_entrega.descricao);
  }
}
function AtividadeListGridComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "badge", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_30_badge_2_Template, 1, 2, "badge", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_ng_template_30_badge_3_Template, 1, 2, "badge", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r36 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("label", row_r36.numero)("data", row_r36.numero)("click", ctx_r9.atividadeService.onIdClick.bind(ctx_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r36.tipo_atividade);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r36.plano_trabalho_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r36.descricao);
  }
}
function AtividadeListGridComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " Un./");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "order", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Respons\u00E1vel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "order", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Demandante");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r41 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r41);
  }
}
function AtividadeListGridComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "badge", 56)(2, "badge", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "badge", 58);
  }
  if (rf & 2) {
    const row_r42 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("label", row_r42.unidade.sigla);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", "bi " + ((row_r42.usuario == null ? null : row_r42.usuario.nome == null ? null : row_r42.usuario.nome.length) ? "bi-person-check" : "bi-person-x"))("label", ctx_r13.util.apelidoOuNome(row_r42.usuario, true) || "(N\u00E3o atribu\u00EDdo)")("hint", "Respons\u00E1vel: " + ((row_r42.usuario == null ? null : row_r42.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("label", ctx_r13.util.apelidoOuNome(row_r42.demandante, true) || "Desconhecido")("hint", "Demandante: " + ((row_r42.demandante == null ? null : row_r42.demandante.nome) || "Desconhecido"));
  }
}
function AtividadeListGridComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " Tempos ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "order", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Distribui\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "order", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Prazo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "order", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Entrega");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r43 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r43);
  }
}
function AtividadeListGridComponent_ng_template_40_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 64);
  }
  if (rf & 2) {
    const tempo_r46 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("badge", tempo_r46);
  }
}
function AtividadeListGridComponent_ng_template_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_40_badge_1_Template, 1, 1, "badge", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r44 = ctx.row;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r17.atividadeService.temposAtividade(row_r44, ctx_r17.extra, ctx_r17.onDespendidoClick.bind(ctx_r17)));
  }
}
function AtividadeListGridComponent_ng_template_43_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 68);
  }
  if (rf & 2) {
    const etiqueta_r51 = ctx.$implicit;
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("lookup", etiqueta_r51)("click", ctx_r48.onEtiquetaClick.bind(ctx_r48));
  }
}
function AtividadeListGridComponent_ng_template_43_separator_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "separator", 69);
  }
}
function AtividadeListGridComponent_ng_template_43_table_3_tr_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "i", 73);
  }
}
function AtividadeListGridComponent_ng_template_43_table_3_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_43_table_3_tr_1_i_2_Template, 1, 0, "i", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", check_r53.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](check_r53.texto);
  }
}
function AtividadeListGridComponent_ng_template_43_table_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_43_table_3_tr_1_Template, 5, 2, "tr", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r47.checklist);
  }
}
function AtividadeListGridComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "progress-bar", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_43_badge_1_Template, 1, 2, "badge", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_43_separator_2_Template, 1, 0, "separator", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_ng_template_43_table_3_Template, 2, 1, "table", 2);
  }
  if (rf & 2) {
    const row_r47 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", row_r47.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r47.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r47.checklist == null ? null : row_r47.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r47.checklist == null ? null : row_r47.checklist.length);
  }
}
function AtividadeListGridComponent_ng_template_45_separator_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "separator", 69);
  }
}
function AtividadeListGridComponent_ng_template_45_table_5_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "input-switch", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r61 = ctx.$implicit;
    const i_r62 = ctx.index;
    const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("source", ctx_r60.checklist)("path", i_r62 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](check_r61.texto);
  }
}
function AtividadeListGridComponent_ng_template_45_table_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_45_table_5_tr_1_Template, 5, 4, "tr", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r59.checklist);
  }
}
function AtividadeListGridComponent_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "input-number", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input-multiselect", 75)(2, "input-select", 76, 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("details", function AtividadeListGridComponent_ng_template_45_Template_input_select_details_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r64);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r63.onEtiquetaConfigClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AtividadeListGridComponent_ng_template_45_separator_4_Template, 1, 0, "separator", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AtividadeListGridComponent_ng_template_45_table_5_Template, 2, 1, "table", 2);
  }
  if (rf & 2) {
    const row_r56 = ctx.row;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("decimals", 2)("control", ctx_r21.formEdit.controls.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("control", ctx_r21.formEdit.controls.etiquetas)("addItemHandle", ctx_r21.addItemHandleEtiquetas.bind(ctx_r21));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("control", ctx_r21.formEdit.controls.etiqueta)("items", ctx_r21.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r56.checklist == null ? null : row_r56.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r56.checklist == null ? null : row_r56.checklist.length);
  }
}
function AtividadeListGridComponent_ng_template_48_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 83);
  }
  if (rf & 2) {
    const status_r67 = ctx.$implicit;
    const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("data", status_r67)("color", status_r67.color)("icon", status_r67.icon)("label", status_r67.label)("click", (status_r67.data == null ? null : status_r67.data.filter) ? ctx_r66.onStatusClick.bind(ctx_r66) : undefined);
  }
}
function AtividadeListGridComponent_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "documentos-badge", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_48_badge_2_Template, 1, 5, "badge", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "comentarios-widget", 82);
  }
  if (rf & 2) {
    const row_r65 = ctx.row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("documento", row_r65.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r23.atividadeService.getStatus(row_r65));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("entity", row_r65)("selectable", ctx_r23.selectable)("grid", ctx_r23.grid);
  }
}
function AtividadeListGridComponent_column_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "column", 84);
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("metadata", ctx_r24.optionsMetadata)("dynamicOptions", ctx_r24.atividadeService.dynamicOptions.bind(ctx_r24))("dynamicButtons", ctx_r24.atividadeService.dynamicButtons.bind(ctx_r24));
  }
}
class AtividadeListGridComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__.AtividadeListBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.minhas = false;
    this.storeFilter = filter => {
      const form = filter?.value;
      return {
        atribuidas_para_mim: form.atribuidas_para_mim,
        usuario_id: form.usuario_id,
        somente_unidade_atual: form.somente_unidade_atual,
        unidades_subordinadas: form.unidades_subordinadas,
        unidade_id: form.somente_unidade_atual ? null : form.unidade_id
      };
    };
    this.filterWhere = filter => {
      let result = this.fixedFilter || [];
      let form = filter.value;
      /* Verifica se estiver marcado Atual e a Unidade for diferente da Lotacao da barra superior */
      if (form.somente_unidade_atual && form.unidade_id != this.auth.unidade?.id) {
        filter.controls.unidade_id.setValue(this.auth.unidade?.id);
        form.unidade_id = this.auth.unidade?.id;
      }
      /* Verifica se Minhas está selecionado e o usuário está diferente do logado (vazio) */
      if (form.atribuidas_para_mim && form.usuario_id != this.auth.usuario?.id) {
        filter.controls.usuario_id.setValue(this.auth.usuario?.id);
        form.usuario_id = this.auth.usuario?.id;
      }
      /* Filtros */
      if (form.usuario_id?.length) {
        result.push(["usuario_id", "==", form.usuario_id]);
      }
      if (form.unidade_id?.length) {
        result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.unidades_subordinadas) {
        result.push(["unidades_subordinadas", "==", true]);
      }
      if (form.etiquetas?.length) {
        result.push(["etiquetas", "in", form.etiquetas.map(x => x.value)]);
      }
      if (form.numero_processo?.length) {
        result.push(["numero_processo", "==", form.numero_processo]);
      }
      if (form.numero?.length) {
        result.push(["numero", "==", form.numero]);
      }
      if (form.status?.length && !result.find(x => x[0] == "status")) {
        result.push(["status", "==", form.status]);
        if (form.status == "ARQUIVADO") this.filter.controls.arquivadas.setValue(true);
      }
      if (!this.filter.controls.arquivadas.value) {
        result.push(["data_arquivamento", "==", null]);
      }
      if (form.tipo_atividade_id?.length) {
        result.push(["tipo_atividade_id", "==", form.tipo_atividade_id]);
      }
      if (form.tipo_processo_id?.length) {
        result.push(["tipo_processo_id", "==", form.tipo_processo_id]);
      }
      if (form.data_filtro?.length) {
        const field = form.data_filtro == "DISTRIBUICAO" ? "data_distribuicao" : form.data_filtro == "PRAZO" ? "data_estipulada_entrega" : "data_entrega";
        if (form.data_inicio) {
          result.push([field, ">=", form.data_inicio]);
        }
        if (form.data_fim) {
          result.push([field, "<=", form.data_fim]);
        }
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
    this.modalWidth = 1100;
    this.filter = this.fh.FormBuilder({
      agrupar: {
        default: true
      },
      atribuidas_para_mim: {
        default: false
      },
      usuario_id: {
        default: null
      },
      numero: {
        default: ""
      },
      somente_unidade_atual: {
        default: false
      },
      unidades_subordinadas: {
        default: false
      },
      unidade_id: {
        default: null
      },
      numero_processo: {
        default: ""
      },
      status: {
        default: null
      },
      etiquetas: {
        default: []
      },
      arquivadas: {
        default: false
      },
      tipo_atividade_id: {
        default: null
      },
      tipo_processo_id: {
        default: null
      },
      data_filtro: {
        default: null
      },
      data_inicio: {
        default: null
      },
      data_fim: {
        default: null
      }
    });
    this.formEdit = this.fh.FormBuilder({
      progresso: {
        default: 0
      },
      etiquetas: {
        default: []
      },
      etiqueta: {
        default: null
      }
    });
    this.groupBy = [{
      field: "unidade.sigla",
      label: "Unidade"
    }];
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.metadata?.atribuidas_para_mim) {
      this.filter?.controls.atribuidas_para_mim.setValue(true);
      this.filter?.controls.usuario_id.setValue(this.auth.usuario?.id);
    }
    if (this.fixedFilter) {
      const status = this.fixedFilter.find(x => x[0] == "status");
      if (status) this.filter?.controls.status.setValue(status[2]);
    }
  }
  onAgruparChange(event) {
    const agrupar = this.filter.controls.agrupar.value;
    if (agrupar && !this.groupBy?.length || !agrupar && this.groupBy?.length) {
      this.groupBy = agrupar ? [{
        field: "unidade.sigla",
        label: "Unidade"
      }] : [];
      this.grid.reloadFilter();
    }
  }
  onStatusClick(status) {
    this.filter?.controls.status.setValue(status.data?.status);
    this.grid.showFilter();
    this.grid.reloadFilter();
  }
  onEtiquetaClick(etiqueta) {
    let etiquetas = this.filter.controls.etiquetas.value;
    etiquetas.push(etiqueta);
    this.filter?.controls.etiquetas.setValue(etiquetas);
    this.grid.showFilter();
    this.grid.reloadFilter();
  }
  onColumnProgressoEtiquetasChecklistEdit(row) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.formEdit.controls.progresso.setValue(row.progresso);
      _this.formEdit.controls.etiquetas.setValue(row.etiquetas);
      _this.formEdit.controls.etiqueta.setValue(null);
      _this.etiquetas = _this.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
      _this.etiquetas = _this.util.merge(_this.etiquetas, _this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
      _this.checklist = _this.util.clone(row.checklist);
    })();
  }
  onColumnProgressoEtiquetasChecklistSave(row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const saved = yield _this2.dao.update(row.id, {
          progresso: _this2.formEdit.controls.progresso.value,
          etiquetas: _this2.formEdit.controls.etiquetas.value,
          checklist: _this2.checklist
        });
        row.progresso = _this2.formEdit.controls.progresso.value;
        row.checklist = _this2.checklist;
        return !!saved;
      } catch (error) {
        return false;
      }
    })();
  }
  filterClear(filter) {
    this.filter.controls.atribuidas_para_mim.setValue(false);
    this.filter.controls.usuario_id.setValue(null);
    this.filter.controls.somente_unidade_atual.setValue(false);
    this.filter.controls.unidades_subordinadas.setValue(false);
    this.filter.controls.unidade_id.setValue(null);
    this.filter.controls.numero_processo.setValue("");
    this.filter.controls.atividade_id.setValue(null);
    this.filter.controls.tipo_processo_id.setValue(null);
    this.filter.controls.data_filtro.setValue(null);
    this.filter.controls.data_inicio.setValue(null);
    this.filter.controls.data_fim.setValue(null);
    if (!this.fixedFilter?.length || !this.fixedFilter.find(x => x[0] == "status")) this.filter.controls.status.setValue(null);
    this.filter.controls.etiquetas.setValue([]);
    super.filterClear(filter);
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.formEdit.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.formEdit.controls.etiqueta.setValue(null);
      }
    }
    return result;
  }
}
_class = AtividadeListGridComponent;
_class.selectRoute = {
  route: ["gestao", "atividade", "grid"]
};
_class.ɵfac = function AtividadeListGridComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["atividade-list-grid"]],
  viewQuery: function AtividadeListGridComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c3, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.calendarEfemerides = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
    }
  },
  inputs: {
    snapshot: "snapshot",
    fixedFilter: "fixedFilter",
    minhas: "minhas"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
  decls: 52,
  vars: 85,
  consts: [["calendarEfemerides", ""], [3, "dao", "add", "form", "hasEdit", "hasDelete", "orderBy", "groupBy", "join", "loadList", "selectable", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Minhas", "controlName", "atribuidas_para_mim", 3, "size", "control", "change"], ["label", "Usu\u00E1rio", "controlName", "usuario_id", 3, "size", "control", "disabled", "dao"], ["usuario", ""], ["label", "Atual", "controlName", "somente_unidade_atual", "labelInfo", "Somente as atividades da unidade selecionada", 3, "size", "control", "change"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "disabled", "dao"], ["unidade", ""], ["label", "Sub.", "controlName", "unidades_subordinadas", "labelInfo", "Incluir as unidades subordinadas", 3, "size", "control"], ["label", "#ID", "controlName", "numero", "maskFormat", "999999", 3, "size", "control", "labelInfo"], ["maskFormat", "00000.000000/0000-00", "controlName", "numero_processo", "labelInfo", "Pesquisa no documento de requisi\u00E7\u00E3o, conclus\u00E3o e nos documentos das tarefas", 3, "size", "label", "control"], ["label", "Status", "itemTodos", "- Todos -", "controlName", "status", 3, "size", "valueTodos", "disabled", "control", "items"], ["noForm", "", "noBox", "", "label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control"], ["label", "Arq.", "controlName", "arquivadas", "labelInfo", "Listar tamb\u00E9m atividades arquivadas", 3, "size", "control"], ["controlName", "tipo_atividade_id", 3, "size", "label", "control", "dao"], ["controlName", "tipo_processo_id", 3, "size", "label", "control", "dao"], ["label", "Data", "itemTodos", "- Todos -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["noIcon", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["noIcon", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], [3, "titleTemplate", "template"], ["titleIdAtividadeDescricao", ""], ["columnAtividadeDescricao", ""], ["titleUnResponsavelDemandante", ""], ["columnPessoas", ""], ["titleTempos", ""], ["columnTempos", ""], [3, "title", "width", "columnEditTemplate", "template", "edit", "save"], ["columnProgressoEtiquetasChecklist", ""], ["columnProgressoEtiquetasChecklistEdit", ""], [3, "title", "width", "template"], ["columnNumero", ""], ["type", "options", 3, "metadata", "dynamicOptions", "dynamicButtons", 4, "ngIf"], [3, "rows"], [3, "efemerides"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate"], ["columnTarefas", ""], ["columnExpandedTarefas", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-boxes"], ["persist", "", 3, "selectable", "editable", "atividade"], ["by", "numero", 3, "header"], ["by", "plano_trabalho_entrega.descricao", 3, "header"], [1, "text-nowrap", "d-block"], ["icon", "bi bi-hash", "color", "light", 3, "label", "data", "click"], ["color", "light", 3, "icon", "label", 4, "ngIf"], [1, "micro-text", "fw-ligh", "atividade-descricao"], ["color", "light", 3, "icon", "label"], ["by", "usuario.nome", 3, "header"], ["by", "demandante.nome", 3, "header"], [1, "text-nowrap"], ["icon", "bi bi-briefcase", "color", "light", 3, "label"], ["color", "light", 3, "icon", "label", "hint"], ["icon", "bi bi-cursor", "color", "light", 3, "label", "hint"], ["by", "data_distribuicao", 3, "header"], ["by", "data_estipulada_entrega", 3, "header"], ["by", "data_entrega", 3, "header"], [1, "one-per-line"], [3, "badge", 4, "ngFor", "ngForOf"], [3, "badge"], ["color", "success", 3, "value"], [3, "lookup", "click", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], [3, "lookup", "click"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals", "control"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", "nullable", "", "itemNull", "- Selecione -", "detailsButton", "", "detailsButtonIcon", "bi bi-tools", 3, "size", "control", "items", "details"], ["etiqueta", ""], ["scale", "small", 3, "size", "source", "path"], [3, "documento"], [1, "d-block"], [3, "data", "color", "icon", "label", "click", 4, "ngFor", "ngForOf"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid"], [3, "data", "color", "icon", "label", "click"], ["type", "options", 3, "metadata", "dynamicOptions", "dynamicButtons"]],
  template: function AtividadeListGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AtividadeListGridComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("select", function AtividadeListGridComponent_Template_grid_select_2_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_toolbar_3_Template, 2, 2, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "filter", 3)(5, "div", 4)(6, "input-switch", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_Template_input_switch_change_6_listener($event) {
        return ctx.onAtribuidasParaMimChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "input-search", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "input-switch", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_Template_input_switch_change_9_listener($event) {
        return ctx.onSomenteUnidadeAtualChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "input-search", 9, 10)(12, "input-switch", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "input-text", 12)(15, "input-text", 13)(16, "input-select", 14)(17, "input-multiselect", 15)(18, "input-switch", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "input-search", 17)(21, "input-search", 18)(22, "input-select", 19)(23, "input-datetime", 20)(24, "input-datetime", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, AtividadeListGridComponent_column_26_Template, 5, 4, "column", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, AtividadeListGridComponent_ng_template_28_Template, 7, 4, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, AtividadeListGridComponent_ng_template_30_Template, 6, 6, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](33, AtividadeListGridComponent_ng_template_33_Template, 6, 2, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](35, AtividadeListGridComponent_ng_template_35_Template, 4, 6, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](38, AtividadeListGridComponent_ng_template_38_Template, 8, 3, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, AtividadeListGridComponent_ng_template_40_Template, 2, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "column", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](43, AtividadeListGridComponent_ng_template_43_Template, 4, 4, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, AtividadeListGridComponent_ng_template_45_Template, 6, 11, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "column", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](48, AtividadeListGridComponent_ng_template_48_Template, 4, 5, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](50, AtividadeListGridComponent_column_50_Template, 1, 3, "column", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](51, "pagination", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](29);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](31);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](34);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](36);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](39);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](41);
      const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](44);
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](46);
      const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](49);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("form", ctx.formEdit)("hasEdit", false)("hasDelete", false)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("loadList", ctx.onGridLoad.bind(ctx))("selectable", ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.fixedFilter && !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && !(ctx.queryParams == null ? null : ctx.queryParams.filter) && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.atribuidas_para_mim);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 5)("control", ctx.filter.controls.usuario_id)("disabled", ctx.filter.controls.atribuidas_para_mim.value ? "true" : undefined)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.somente_unidade_atual);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.unidade_id)("disabled", ctx.filter.controls.somente_unidade_atual.value ? "true" : undefined)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.unidades_subordinadas);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.numero)("labelInfo", "N\u00FAmero " + ctx.lex.translate("atividade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", "N\u00BA " + ctx.lex.translate("Processo") + " (Sei)")("control", ctx.filter.controls.numero_processo);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("valueTodos", null)("disabled", (ctx.fixedFilter == null ? null : ctx.fixedFilter.length) && ctx.fixedFilter[0][0] == "status" ? "true" : undefined)("control", ctx.filter.controls.status)("items", ctx.lookup.ATIVIDADE_STATUS_COM_ARQUIVADAS);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.etiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.arquivadas);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Tipo de Atividade"))("control", ctx.filter.controls.tipo_atividade_id)("dao", ctx.tipoAtividadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Tipo de Processo"))("control", ctx.filter.controls.tipo_processo_id)("dao", ctx.tipoProcessoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.DATAS_FILTRO);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("titleTemplate", _r6)("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("titleTemplate", _r10)("template", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("titleTemplate", _r14)("template", _r16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", "Progresso\nEtiquetas/Checklist")("width", 200)("columnEditTemplate", ctx.selectable ? undefined : _r20)("template", _r18)("edit", ctx.selectable ? undefined : ctx.onColumnProgressoEtiquetasChecklistEdit.bind(ctx))("save", ctx.selectable ? undefined : ctx.onColumnProgressoEtiquetasChecklistSave.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", "n\u00BA Processo/Status\nComent\u00E1rios")("width", 350)("template", _r22);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  styles: [".atividade-atividade[_ngcontent-%COMP%], .atividade-descricao[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 200px;\n  white-space: initial;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vYXRpdmlkYWRlL2F0aXZpZGFkZS1saXN0LWdyaWQvYXRpdmlkYWRlLWxpc3QtZ3JpZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmF0aXZpZGFkZS1hdGl2aWRhZGUsIC5hdGl2aWRhZGUtZGVzY3JpY2FvIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICB3aGl0ZS1zcGFjZTogaW5pdGlhbDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=557.js.map