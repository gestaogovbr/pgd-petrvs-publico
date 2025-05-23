(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~listeners-listeners-module~modules-gestao-atividade-atividade-module"],{

/***/ "+jod":
/*!*******************************************!*\
  !*** ./src/app/models/atividade.model.ts ***!
  \*******************************************/
/*! exports provided: Atividade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Atividade", function() { return Atividade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Atividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.numero = 0; /* Numero da atividade */
        this.descricao = null; /* Assunto da atividade */
        this.data_distribuicao = new Date(); /* Data de cadastro da atividade */
        this.tempo_planejado = 0.0; /* Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade) */
        this.carga_horaria = 0.0; /* Carga horária diária (vinda do plano de trabalho) */
        this.prazo_entrega = new Date(); /* Data estipulada para entrega da atividade */
        this.data_inicio = null; /* Data em que o usuário iniciou a atividade */
        this.data_entrega = null; /* Data da entrega */
        this.esforco = 0.0; /* Tempo calculado a partir da atividade e utilizando o fator_complexidade */
        this.tempo_despendido = null; /* Calculado no fim da atividade, sendo o tempo líquido (considerando pausas) */
        this.data_arquivamento = null; /* Data de arquivamento da atividade */
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.prioridade = null; /* Nível de prioridade */
        this.progresso = 0; /* Progresso a execução da atividade */
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.comentarios = []; /* Comentarios da atividade */
        this.pausas = []; /* Pausas da atividade */
        this.tarefas = []; /* Tarefas da atividade */
        this.plano_trabalho_id = null;
        this.plano_trabalho_entrega_id = null;
        this.tipo_atividade_id = null;
        this.demandante_id = "";
        this.usuario_id = null;
        this.unidade_id = "";
        this.documento_requisicao_id = null;
        this.documento_entrega_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "BD6R":
/*!*****************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-base.ts ***!
  \*****************************************************************/
/*! exports provided: AtividadeListBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListBase", function() { return AtividadeListBase; });
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ "VW5Q");
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/comentario.service */ "GCzM");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");










class AtividadeListBase extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__["AtividadeDaoService"]);
        this.injector = injector;
        this.etiquetas = [];
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this.DATAS_FILTRO = [
            { key: "DISTRIBUICAO", value: "Distribuição", icon: "bi bi-file-earmark-plus", color: "badge rounded-pill bg-warning text-dark" },
            { key: "PRAZO", value: "Prazo", icon: "bi bi-calendar-check", color: "badge rounded-pill bg-info text-dark" },
            { key: "CONCLUSAO", value: "Conclusão", icon: "bi bi-check-circle", color: "badge rounded-pill bg-info text-dark" }
            //{ key: "AVALIACAO", value: "Avaliação", icon: "bi bi-star-half", color: "badge rounded-pill bg-success" }
        ];
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioDaoService"]);
        this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_9__["TipoAtividadeDaoService"]);
        this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoProcessoDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_4__["ListenerAllPagesService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__["CalendarService"]);
        this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_8__["ComentarioService"]);
        this.join = ["tipo_atividade", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario", "tarefas.tarefa", "tarefas.comentarios.usuario"];
        /* Inicializações */
        this.extra = { planos_trabalho: {}, afastamentos: {} };
    }
    /*public orderComentarios(comentarios?: Comentario[]) {
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
    }*/
    onGridLoad(rows) {
        var _a;
        /* Ordena os comentários */
        rows === null || rows === void 0 ? void 0 : rows.forEach((atividade) => {
            atividade.comentarios = this.comentario.orderComentarios(atividade.comentarios);
        });
        /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
        const extra = (((_a = this.grid) === null || _a === void 0 ? void 0 : _a.query) || this.query).extra;
        if (extra) {
            //this.extra.avaliadores = Object.assign(this.extra.avaliadores, extra.avaliadores || {});
            this.extra.planos_trabalho = Object.assign(this.extra.planos_trabalho, extra.planos || {});
            for (let [key, value] of Object.entries(extra.afastamentos || {})) {
                this.extra.afastamentos[key] = value.reduce((a, v) => {
                    if (!a.find(x => x.id == v.id))
                        a.push(v);
                    return a;
                }, this.extra.afastamentos[key] || []);
            }
            Object.entries(extra.feriados || {}).forEach(([key, value]) => {
                if (!this.calendar.feriadosCadastrados[key])
                    this.calendar.feriadosCadastrados[key] = value;
            });
            this.cdRef.detectChanges();
        }
    }
    onAtribuidasParaMimChange(event) {
        if (this.filter.controls.atribuidas_para_mim.value) {
            this.filter.controls.usuario_id.setValue(this.auth.usuario.id);
        }
        else {
            this.filter.controls.usuario_id.setValue(undefined);
        }
    }
    onSomenteUnidadeAtualChange(event) {
        if (this.filter.controls.somente_unidade_atual.value) {
            this.filter.controls.unidade_id.setValue(this.auth.unidade.id);
        }
        else {
            this.filter.controls.unidade_id.setValue(undefined);
        }
    }
    onDespendidoClick(row) {
        var _a, _b, _c;
        if (row.metadados && !row.metadados.concluido) {
            const cargaHoraria = ((_b = (_a = this.extra) === null || _a === void 0 ? void 0 : _a.planos_trabalho[row.plano_trabalho_id]) === null || _b === void 0 ? void 0 : _b.carga_horaria) || 0;
            const afastamentos = ((_c = this.extra) === null || _c === void 0 ? void 0 : _c.afastamentos[row.usuario_id]) || [];
            this.efemerides = this.calendar.calculaDataTempoUnidade(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
            this.dialog.template({ title: "Cálculos do tempo despendido" }, this.calendarEfemerides, []);
        }
    }
    temposAtividade(row) {
        var _a, _b, _c, _d, _e, _f, _g;
        /* Atualiza somente a cada mudança de minuto da unidade atual */
        if (row.metadados && ((_a = row.metadados.extra) === null || _a === void 0 ? void 0 : _a.lastUpdate) != this.auth.unidadeHora) {
            let planoTrabalho = (_b = this.extra) === null || _b === void 0 ? void 0 : _b.planos_trabalho[row.plano_trabalho_id];
            let tempos = [
                { color: "light", hint: this.lex.translate("Data de distribuição"), icon: "bi bi-file-earmark-plus", label: this.dao.getDateTimeFormatted(row.data_distribuicao) },
                { color: "light", hint: this.lex.translate("Prazo de entrega"), icon: "bi bi-calendar-check", label: this.dao.getDateTimeFormatted(row.prazo_entrega) }
            ];
            if ((_c = planoTrabalho === null || planoTrabalho === void 0 ? void 0 : planoTrabalho.tipo_modalidade) === null || _c === void 0 ? void 0 : _c.atividade_esforco)
                tempos.push({ color: "light", hint: this.lex.translate("Esforço"), icon: "bi bi-stopwatch", label: (row.esforco ? this.util.decimalToTimerFormated(row.esforco, true) + " " + this.lex.translate("esforço") : "Sem " + this.lex.translate("esforço")) });
            if (row.metadados.concluido)
                tempos.push({ color: "light", hint: "Data de entrega realizada", icon: "bi bi-check-circle", label: this.dao.getDateTimeFormatted(row.data_entrega) });
            if (row.metadados.iniciado && !!((_d = planoTrabalho === null || planoTrabalho === void 0 ? void 0 : planoTrabalho.tipo_modalidade) === null || _d === void 0 ? void 0 : _d.atividade_tempo_despendido)) {
                const cargaHoraria = (planoTrabalho === null || planoTrabalho === void 0 ? void 0 : planoTrabalho.carga_horaria) || 0;
                const afastamentos = ((_e = this.extra) === null || _e === void 0 ? void 0 : _e.afastamentos[row.usuario_id]) || [];
                const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
                tempos.push({ color: (despendido > row.esforco ? "warning" : "light"), hint: "Tempo despendido", icon: "bi bi-hourglass-split", label: this.util.decimalToTimerFormated(despendido, true) + " despendido", click: !row.metadados.concluido ? this.onDespendidoClick.bind(this) : undefined, data: row });
            }
            if (!row.metadados.concluido && row.prazo_entrega.getTime() < this.auth.hora.getTime()) {
                const atrasado = this.calendar.horasAtraso(row.prazo_entrega, row.unidade);
                tempos.push({ color: "danger", hint: "Tempo de atraso", icon: "bi bi-alarm", label: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
            }
            row.metadados.extra = row.metadados.extra || {};
            row.metadados.extra.lastUpdate = this.auth.unidadeHora;
            row.metadados.extra.tempos = tempos;
        }
        return ((_g = (_f = row.metadados) === null || _f === void 0 ? void 0 : _f.extra) === null || _g === void 0 ? void 0 : _g.tempos) || [];
    }
    desarquivar(atividade) {
        this.dao.arquivar(atividade.id, false).then(() => {
            this.grid.query.refreshId(atividade.id);
        }).catch(error => this.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined));
    }
    arquivar(atividade) {
        this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a atividade?").then(confirm => {
            if (confirm) {
                this.dao.arquivar(atividade.id, true).then(() => {
                    var _a, _b, _c;
                    if ((_b = (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.arquivadas) === null || _b === void 0 ? void 0 : _b.value) {
                        this.grid.query.refreshId(atividade.id);
                    }
                    else {
                        (((_c = this.grid) === null || _c === void 0 ? void 0 : _c.query) || this.query).removeId(atividade.id);
                    }
                }).catch(error => this.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined));
            }
        });
    }
    dynamicOptions(row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let result = [];
        let atividade = row;
        //const isAvaliador = isGestor || (this.extra.avaliadores[atividade.unidade_id] || []).includes(this.auth.usuario?.id || ""); //|| atividade.unidade
        const isGestor = ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id) == ((_c = (_b = atividade.unidade) === null || _b === void 0 ? void 0 : _b.gestor) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.auth.usuario) === null || _d === void 0 ? void 0 : _d.id) == ((_f = (_e = atividade.unidade) === null || _e === void 0 ? void 0 : _e.gestor_substituto) === null || _f === void 0 ? void 0 : _f.id);
        const isDemandante = ((_g = this.auth.usuario) === null || _g === void 0 ? void 0 : _g.id) == atividade.demandante_id;
        const isResponsavel = ((_h = this.auth.usuario) === null || _h === void 0 ? void 0 : _h.id) == atividade.usuario_id;
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
        const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (atividade) => this.go.navigate({ route: ['uteis', 'comentarios', 'ATIVIDADE', atividade.id, 'new'] }, this.modalRefreshId(atividade)) };
        const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'clonar'] }, this.modalRefresh()) };
        const BOTAO_ALTERAR = { label: "Alterar atividade", icon: "bi bi-pencil-square", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'edit'] }, this.modalRefreshId(atividade)) };
        const BOTAO_EXCLUIR = { label: "Excluir atividade", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        const BOTAO_PRORROGAR_PRAZO = { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'prorrogar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_INICIAR = { label: "Iniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_CANCELAR_INICIO = { label: "Cancelar inicio", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this) };
        const BOTAO_ALTERAR_INICIO = { label: "Alterar inicio", icon: "bi bi-play-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_REINICIAR = { label: "Reiniciar", id: "INICIADO", icon: "bi bi-play-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
        const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
        const BOTAO_ALTERAR_CONCLUSAO = { label: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
        const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", id: "INICIADO", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
        //const BOTAO_AVALIAR = { label: "Avaliar", id: "AVALIADO", icon: "bi bi-star-half", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
        //const BOTAO_ALTERAR_AVALIACAO = { label: "Alterar avaliação", hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
        //const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", id: "CONCLUIDO", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) };
        const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
        const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
        result.push(BOTAO_INFORMACOES);
        if (isResponsavel || isGestor || isDemandante)
            result.push(BOTAO_COMENTARIOS);
        result.push(BOTAO_CLONAR);
        if ((_j = atividade.metadados) === null || _j === void 0 ? void 0 : _j.arquivado) { /* Arquivado*/
            if (isGestor || isResponsavel)
                result.push(BOTAO_DESARQUIVAR);
        }
        else if (!((_k = atividade.metadados) === null || _k === void 0 ? void 0 : _k.iniciado)) {
            if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Não iniciado */
                result.push(BOTAO_INICIAR);
            }
            if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT')) {
                result.push(BOTAO_ALTERAR);
            }
            if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_EXCL') || this.auth.hasPermissionTo('MOD_DMD_NI_EXCL')) {
                if (result.length)
                    result.push({ divider: true });
                result.push(BOTAO_EXCLUIR);
            }
        }
        else if ((_l = atividade.metadados) === null || _l === void 0 ? void 0 : _l.concluido) { /* Concluído -> Gestor ou substituto pode avaliar */
            if (isGestor || isResponsavel)
                result.push(BOTAO_ARQUIVAR);
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
                result.push(BOTAO_ALTERAR_CONCLUSAO);
            }
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL')) {
                if (result.length)
                    result.push({ divider: true });
                result.push(BOTAO_CANCELAR_CONCLUSAO);
            }
        }
        else if ((_m = atividade.metadados) === null || _m === void 0 ? void 0 : _m.iniciado) { /* Iniciado */
            if ((_o = atividade.metadados) === null || _o === void 0 ? void 0 : _o.suspenso) {
                if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Iniciada e Suspensa */
                    result.push(BOTAO_REINICIAR);
                }
            }
            else { /* Iniciada e não Suspensa */
                if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL'))
                    result.push(BOTAO_CONCLUIR);
                if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA'))
                    result.push(BOTAO_SUSPENDER);
                if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR'))
                    result.push(BOTAO_CANCELAR_INICIO);
                if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR'))
                    result.push(BOTAO_ALTERAR_INICIO);
            }
            if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
                result.push(BOTAO_PRORROGAR_PRAZO);
            }
        }
        return result;
    }
    cancelarInicio(atividade) {
        const self = this;
        this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
            if (confirm) {
                this.dao.cancelarInicio(atividade.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(atividade.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    cancelarConclusao(atividade) {
        const self = this;
        this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
            if (confirm) {
                this.dao.cancelarConclusao(atividade.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(atividade.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    /*public cancelarAvaliacao(atividade: Atividade) {
      const self = this;
      this.dialog.confirm("Cancelar avaliacao ?", "Deseja realmente cancelar a avaliacao?").then(confirm => {
        if (confirm) {
          this.dao!.cancelarAvaliacao(atividade.id).then(function () {
            (self.grid?.query || self.query!).refreshId(atividade.id);
            self.dialog.alert("Sucesso", "Cancelado com sucesso!");
          }).catch(function (error) {
            self.dialog.alert("Erro", "Erro ao cancelar avaliacao: " + error?.message ? error?.message : error);
          });
        }
      });
    }*/
    dynamicButtons(row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let result = [];
        let atividade = row;
        const isGestor = ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id) == ((_c = (_b = atividade.unidade) === null || _b === void 0 ? void 0 : _b.gestor) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.auth.usuario) === null || _d === void 0 ? void 0 : _d.id) == ((_f = (_e = atividade.unidade) === null || _e === void 0 ? void 0 : _e.gestor_substituto) === null || _f === void 0 ? void 0 : _f.id);
        //const isAvaliador = isGestor || (this.extra.avaliadores[atividade.unidade_id] || []).includes(this.auth.usuario?.id || ""); //|| atividade.unidade
        //const isDemandante = this.auth.usuario?.id == atividade.demandante_id;
        const isResponsavel = ((_g = this.auth.usuario) === null || _g === void 0 ? void 0 : _g.id) == atividade.usuario_id;
        const BOTAO_ALTERAR_AVALIACAO = { hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'consult'] }, { modal: true }) };
        const BOTAO_INICIAR = { hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'iniciar'] }, this.modalRefreshId(atividade)) };
        //const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star-half", color: "btn-outline-success", onClick: (atividade: Atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'avaliar'] }, this.modalRefreshId(atividade)) };
        const BOTAO_REINICIAR = { hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(atividade)) };
        const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
        const BOTAO_ARQUIVAR = { hint: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
        const BOTAO_DESARQUIVAR = { hint: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
        const BOTAO_ALTERAR_CONCLUSAO = { hint: "Alterar conclusão", icon: "bi bi-check-circle", onClick: (atividade) => this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'concluir'] }, this.modalRefreshId(atividade)) };
        /*if (atividade.metadados?.avaliado) { /* Arquivado *
          if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_AVAL')) { /* Usuário logado é gestor da Unidade ou substituto*
            result.push(BOTAO_ALTERAR_AVALIACAO);
          } else if (atividade.metadados?.arquivado && (isGestor || isResponsavel)) { //Somente se gestor ou com capacidade para essa operação
            result.push(BOTAO_DESARQUIVAR);
          }
        } else*/
        if (!((_h = atividade.metadados) === null || _h === void 0 ? void 0 : _h.iniciado)) { /* Não iniciado */
            if (isResponsavel || (atividade.usuario_id == null) || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) { /* Usuário da atividade é o mesmo logado */
                result.push(BOTAO_INICIAR);
            }
        }
        else if ((_j = atividade.metadados) === null || _j === void 0 ? void 0 : _j.concluido) { /* Concluído */
            /*if (isAvaliador || this.auth.hasPermissionTo('MOD_DMD_USERS_AVAL')) { /* Usuário logado é gestor da Unidade ou substituto * /
                result.push(BOTAO_AVALIAR);
            }*/
            if (isGestor || isResponsavel) {
                result.push(((_k = atividade.metadados) === null || _k === void 0 ? void 0 : _k.arquivado) ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
            }
            else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
                result.push(BOTAO_ALTERAR_CONCLUSAO);
            }
        }
        else if ((_l = atividade.metadados) === null || _l === void 0 ? void 0 : _l.avaliado) { /* Avaliado */
            if (isGestor) { /* Usuário logado é gestor da Unidade ou substituto */
                result.push(BOTAO_ALTERAR_AVALIACAO);
            }
        }
        else if ((_m = atividade.metadados) === null || _m === void 0 ? void 0 : _m.iniciado) { /* Iniciado */
            if (((_o = atividade.metadados) === null || _o === void 0 ? void 0 : _o.suspenso) && isResponsavel) { /* Iniciada e Suspensa */
                result.push(BOTAO_REINICIAR);
            }
            else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) { /* Iniciada e não Suspensa */
                result.push(BOTAO_CONCLUIR);
            }
        }
        if (!result.length)
            result.push(BOTAO_INFORMACOES);
        return result;
    }
    getStatus(row) {
        var _a, _b, _c, _d;
        const atividade = row;
        const status = this.lookup.ATIVIDADE_STATUS.find(x => { var _a; return x.key == ((_a = atividade.metadados) === null || _a === void 0 ? void 0 : _a.status); }) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-circle", color: "light" };
        let result = [{ data: { status: status.key, filter: true }, label: status.value, icon: status.icon, color: status.color }];
        if ((_a = atividade.metadados) === null || _a === void 0 ? void 0 : _a.atrasado)
            result.push({ data: { status: "ATRASADO", filter: false }, label: "Atrasado", icon: "bi bi-alarm", color: "danger" });
        if ((_b = atividade.metadados) === null || _b === void 0 ? void 0 : _b.suspenso)
            result.push({ data: { status: "SUSPENSO", filter: false }, label: "Suspenso", icon: "bi bi-pause-circle", color: "danger" });
        if ((_c = atividade.metadados) === null || _c === void 0 ? void 0 : _c.arquivado)
            result.push({ data: { status: "ARQUIVADO", filter: false }, label: "Arquivado", icon: "bi bi-inboxes", color: "danger" });
        if (atividade.metadados && JSON.stringify(atividade.metadados._status) != JSON.stringify(result))
            atividade.metadados._status = result;
        return ((_d = atividade.metadados) === null || _d === void 0 ? void 0 : _d._status) || result;
    }
    /*public getEtiquetaStyle(etiqueta: any) {
      const bgColor = etiqueta.color || "#000000";
      const txtColor = this.util.contrastColor(bgColor);
      return `background-color: ${bgColor}; color: ${txtColor};`;
    }*/
    onEtiquetaConfigClick() {
        this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id], params: { etiquetas: true } }, {
            modal: true,
            modalClose: (modalResult) => {
                var _a;
                this.etiquetas = this.util.merge(this.etiquetas, (_a = this.auth.usuario.config) === null || _a === void 0 ? void 0 : _a.etiquetas, (a, b) => a.key == b.key);
                this.cdRef.detectChanges();
            }
        });
    }
    comentarioClick(element) {
        const value = element.getAttribute("data-expanded");
        element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }
    addComentarioClick(row) {
        this.go.navigate({ route: ['gestao', 'atividade', row.id, 'comentar'] }, { modal: true, modalClose: modalResult => { var _a; if (modalResult)
                (((_a = this.grid) === null || _a === void 0 ? void 0 : _a.query) || this.query).refreshId(row.id); } });
    }
}


/***/ }),

/***/ "GLIe":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-grid/atividade-list-grid.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: AtividadeListGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListGridComponent", function() { return AtividadeListGridComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atividade-list-base */ "BD6R");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




const _c0 = ["calendarEfemerides"];
const _c1 = ["unidade"];
const _c2 = ["usuario"];
const _c3 = ["etiqueta"];
function AtividadeListGridComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "calendar-efemerides", 37);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("efemerides", ctx_r1.efemerides);
} }
function AtividadeListGridComponent_toolbar_3_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input-switch", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_toolbar_3_Template_input_switch_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r26); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r25.onAgruparChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("control", ctx_r2.filter.controls.agrupar);
} }
function AtividadeListGridComponent_column_26_ng_template_1_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", row_r31.tarefas == null ? null : row_r31.tarefas.length, "");
} }
function AtividadeListGridComponent_column_26_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AtividadeListGridComponent_column_26_ng_template_1_span_0_Template, 3, 1, "span", 42);
} if (rf & 2) {
    const row_r31 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r31.tarefas == null ? null : row_r31.tarefas.length);
} }
function AtividadeListGridComponent_column_26_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "atividade-list-tarefa", 45);
} if (rf & 2) {
    const row_r34 = ctx.row;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("selectable", ctx_r30.selectable)("editable", !row_r34.metadados.concluido)("atividade", row_r34);
} }
function AtividadeListGridComponent_column_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "column", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_column_26_ng_template_1_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_column_26_ng_template_3_Template, 1, 3, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("align", "center")("hint", ctx_r5.lex.translate("Tarefas da atividade"))("template", _r27)("expandTemplate", _r29);
} }
function AtividadeListGridComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "order", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "/n\u00BA Processo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " Status ");
} if (rf & 2) {
    const header_r35 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r35);
} }
function AtividadeListGridComponent_ng_template_30_badge_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 52);
} if (rf & 2) {
    const status_r38 = ctx.$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("data", status_r38)("color", status_r38.color)("icon", status_r38.icon)("label", status_r38.label)("click", (status_r38.data == null ? null : status_r38.data.filter) ? ctx_r37.onStatusClick.bind(ctx_r37) : undefined);
} }
function AtividadeListGridComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "small", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "documentos-badge", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AtividadeListGridComponent_ng_template_30_badge_5_Template, 1, 5, "badge", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r36 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("#", row_r36.numero, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("documento", row_r36.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r9.getStatus(row_r36));
} }
function AtividadeListGridComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " Un./");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "order", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Respons\u00E1vel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "order", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Demandante");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r39 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r39);
} }
function AtividadeListGridComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "badge", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "badge", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "badge", 57);
} if (rf & 2) {
    const row_r40 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("label", row_r40.unidade.sigla);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", "bi " + ((row_r40.usuario == null ? null : row_r40.usuario.nome == null ? null : row_r40.usuario.nome.length) ? "bi-person-check" : "bi-person-x"))("label", ctx_r13.util.apelidoOuNome(row_r40.usuario, true) || "(N\u00E3o atribu\u00EDdo)")("hint", "Respons\u00E1vel: " + ((row_r40.usuario == null ? null : row_r40.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("label", ctx_r13.util.apelidoOuNome(row_r40.demandante, true) || "Desconhecido")("hint", "Demandante: " + ((row_r40.demandante == null ? null : row_r40.demandante.nome) || "Desconhecido"));
} }
function AtividadeListGridComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " Tempos ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "order", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Distribui\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "order", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Prazo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "order", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Entrega");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r41 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("header", header_r41);
} }
function AtividadeListGridComponent_ng_template_40_badge_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 62);
} if (rf & 2) {
    const tempo_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("badge", tempo_r44);
} }
function AtividadeListGridComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_40_badge_1_Template, 1, 1, "badge", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r42 = ctx.row;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r17.temposAtividade(row_r42));
} }
function AtividadeListGridComponent_ng_template_43_badge_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "badge", 66);
} if (rf & 2) {
    const etiqueta_r49 = ctx.$implicit;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("lookup", etiqueta_r49)("click", ctx_r46.onEtiquetaClick.bind(ctx_r46));
} }
function AtividadeListGridComponent_ng_template_43_separator_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "separator", 67);
} }
function AtividadeListGridComponent_ng_template_43_table_3_tr_1_i_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "i", 70);
} }
function AtividadeListGridComponent_ng_template_43_table_3_tr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_43_table_3_tr_1_i_2_Template, 1, 0, "i", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const check_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", check_r51.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](check_r51.texto);
} }
function AtividadeListGridComponent_ng_template_43_table_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_43_table_3_tr_1_Template, 5, 2, "tr", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r45.checklist);
} }
function AtividadeListGridComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "progress-bar", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_43_badge_1_Template, 1, 2, "badge", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AtividadeListGridComponent_ng_template_43_separator_2_Template, 1, 0, "separator", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_ng_template_43_table_3_Template, 2, 1, "table", 2);
} if (rf & 2) {
    const row_r45 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", row_r45.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r45.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r45.checklist == null ? null : row_r45.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r45.checklist == null ? null : row_r45.checklist.length);
} }
function AtividadeListGridComponent_ng_template_45_separator_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "separator", 67);
} }
function AtividadeListGridComponent_ng_template_45_table_5_tr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "input-switch", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const check_r59 = ctx.$implicit;
    const i_r60 = ctx.index;
    const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("source", ctx_r58.checklist)("path", i_r60 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](check_r59.texto);
} }
function AtividadeListGridComponent_ng_template_45_table_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, AtividadeListGridComponent_ng_template_45_table_5_tr_1_Template, 5, 4, "tr", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r57.checklist);
} }
function AtividadeListGridComponent_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "input-number", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "input-multiselect", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "input-select", 73, 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("details", function AtividadeListGridComponent_ng_template_45_Template_input_select_details_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r62); const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r61.onEtiquetaConfigClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, AtividadeListGridComponent_ng_template_45_separator_4_Template, 1, 0, "separator", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AtividadeListGridComponent_ng_template_45_table_5_Template, 2, 1, "table", 2);
} if (rf & 2) {
    const row_r54 = ctx.row;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("decimals", 2)("control", ctx_r21.formEdit.controls.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("control", ctx_r21.formEdit.controls.etiquetas)("addItemHandle", ctx_r21.addItemHandleEtiquetas.bind(ctx_r21));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("control", ctx_r21.formEdit.controls.etiqueta)("items", ctx_r21.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r54.checklist == null ? null : row_r54.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r54.checklist == null ? null : row_r54.checklist.length);
} }
function AtividadeListGridComponent_ng_template_48_small_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "small", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r63.tipo_atividade.nome || "");
} }
function AtividadeListGridComponent_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AtividadeListGridComponent_ng_template_48_small_0_Template, 4, 1, "small", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "comentarios-widget", 78);
} if (rf & 2) {
    const row_r63 = ctx.row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", row_r63.atividade);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](row_r63.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("entity", row_r63)("selectable", ctx_r23.selectable)("grid", ctx_r23.grid);
} }
function AtividadeListGridComponent_column_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "column", 80);
} if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("onEdit", ctx_r24.edit)("onDelete", ctx_r24.delete)("dynamicOptions", ctx_r24.dynamicOptions.bind(ctx_r24))("dynamicButtons", ctx_r24.dynamicButtons.bind(ctx_r24));
} }
class AtividadeListGridComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_2__["AtividadeListBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.storeFilter = (filter) => {
            const form = filter === null || filter === void 0 ? void 0 : filter.value;
            return {
                atribuidas_para_mim: form.atribuidas_para_mim,
                usuario_id: form.usuario_id,
                somente_unidade_atual: form.somente_unidade_atual,
                unidades_subordinadas: form.unidades_subordinadas,
                unidade_id: form.somente_unidade_atual ? null : form.unidade_id
            };
        };
        this.filterWhere = (filter) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            let result = this.fixedFilter || [];
            let form = filter.value;
            /* Verifica se estiver marcado Atual e a Unidade for diferente da Lotacao da barra superior */
            if (form.somente_unidade_atual && form.unidade_id != ((_a = this.auth.unidade) === null || _a === void 0 ? void 0 : _a.id)) {
                filter.controls.unidade_id.setValue((_b = this.auth.unidade) === null || _b === void 0 ? void 0 : _b.id);
                form.unidade_id = (_c = this.auth.unidade) === null || _c === void 0 ? void 0 : _c.id;
            }
            /* Verifica se Minhas está selecionado e o usuário está diferente do logado (vazio) */
            if (form.atribuidas_para_mim && form.usuario_id != ((_d = this.auth.usuario) === null || _d === void 0 ? void 0 : _d.id)) {
                filter.controls.usuario_id.setValue((_e = this.auth.usuario) === null || _e === void 0 ? void 0 : _e.id);
                form.usuario_id = (_f = this.auth.usuario) === null || _f === void 0 ? void 0 : _f.id;
            }
            /* Filtros */
            if ((_g = form.usuario_id) === null || _g === void 0 ? void 0 : _g.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
            }
            if ((_h = form.unidade_id) === null || _h === void 0 ? void 0 : _h.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.unidades_subordinadas) {
                result.push(["unidades_subordinadas", "==", true]);
            }
            if ((_j = form.etiquetas) === null || _j === void 0 ? void 0 : _j.length) {
                result.push(["etiquetas", "in", form.etiquetas.map((x) => x.value)]);
            }
            if ((_k = form.numero_processo) === null || _k === void 0 ? void 0 : _k.length) {
                result.push(["numero_processo", "==", form.numero_processo]);
            }
            if ((_l = form.numero) === null || _l === void 0 ? void 0 : _l.length) {
                result.push(["numero", "==", form.numero]);
            }
            if (((_m = form.status) === null || _m === void 0 ? void 0 : _m.length) && !result.find(x => x[0] == "status")) {
                result.push(["status", "==", form.status]);
                if (form.status == "ARQUIVADO")
                    this.filter.controls.arquivadas.setValue(true);
            }
            if (!this.filter.controls.arquivadas.value) {
                result.push(["data_arquivamento", "==", null]);
            }
            if ((_o = form.tipo_atividade_id) === null || _o === void 0 ? void 0 : _o.length) {
                result.push(["tipo_atividade_id", "==", form.tipo_atividade_id]);
            }
            if ((_p = form.tipo_processo_id) === null || _p === void 0 ? void 0 : _p.length) {
                result.push(["tipo_processo_id", "==", form.tipo_processo_id]);
            }
            if ((_q = form.data_filtro) === null || _q === void 0 ? void 0 : _q.length) {
                const field = form.data_filtro == "DISTRIBUICAO" ? "data_distribuicao" : form.data_filtro == "PRAZO" ? "prazo_entrega" : "data_entrega";
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
            agrupar: { default: true },
            atribuidas_para_mim: { default: false },
            usuario_id: { default: null },
            numero: { default: "" },
            somente_unidade_atual: { default: false },
            unidades_subordinadas: { default: false },
            unidade_id: { default: null },
            numero_processo: { default: "" },
            status: { default: null },
            etiquetas: { default: [] },
            arquivadas: { default: false },
            tipo_atividade_id: { default: null },
            tipo_processo_id: { default: null },
            data_filtro: { default: null },
            data_inicio: { default: null },
            data_fim: { default: null }
        });
        this.formEdit = this.fh.FormBuilder({
            progresso: { default: 0 },
            etiquetas: { default: [] },
            etiqueta: { default: null }
        });
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    }
    ngAfterViewInit() {
        var _a;
        super.ngAfterViewInit();
        if (this.fixedFilter) {
            const status = this.fixedFilter.find(x => x[0] == "status");
            if (status)
                (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.status.setValue(status[2]);
        }
    }
    onAgruparChange(event) {
        var _a, _b;
        const agrupar = this.filter.controls.agrupar.value;
        if ((agrupar && !((_a = this.groupBy) === null || _a === void 0 ? void 0 : _a.length)) || (!agrupar && ((_b = this.groupBy) === null || _b === void 0 ? void 0 : _b.length))) {
            this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
            this.grid.reloadFilter();
        }
    }
    onStatusClick(status) {
        var _a, _b;
        (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.status.setValue((_b = status.data) === null || _b === void 0 ? void 0 : _b.status);
        this.grid.showFilter();
        this.grid.reloadFilter();
    }
    onEtiquetaClick(etiqueta) {
        var _a;
        let etiquetas = this.filter.controls.etiquetas.value;
        etiquetas.push(etiqueta);
        (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.etiquetas.setValue(etiquetas);
        this.grid.showFilter();
        this.grid.reloadFilter();
    }
    onColumnProgressoEtiquetasChecklistEdit(row) {
        var _a, _b, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.formEdit.controls.progresso.setValue(row.progresso);
            this.formEdit.controls.etiquetas.setValue(row.etiquetas);
            this.formEdit.controls.etiqueta.setValue(null);
            this.etiquetas = this.util.merge((_a = row.atividade) === null || _a === void 0 ? void 0 : _a.etiquetas, (_b = row.unidade) === null || _b === void 0 ? void 0 : _b.etiquetas, (a, b) => a.key == b.key);
            this.etiquetas = this.util.merge(this.etiquetas, (_c = this.auth.usuario.config) === null || _c === void 0 ? void 0 : _c.etiquetas, (a, b) => a.key == b.key);
            this.checklist = this.util.clone(row.checklist);
        });
    }
    onColumnProgressoEtiquetasChecklistSave(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const saved = yield this.dao.update(row.id, {
                    progresso: this.formEdit.controls.progresso.value,
                    etiquetas: this.formEdit.controls.etiquetas.value,
                    checklist: this.checklist
                });
                row.progresso = this.formEdit.controls.progresso.value;
                row.checklist = this.checklist;
                return !!saved;
            }
            catch (error) {
                return false;
            }
        });
    }
    filterClear(filter) {
        var _a;
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
        if (!((_a = this.fixedFilter) === null || _a === void 0 ? void 0 : _a.length) || !this.fixedFilter.find(x => x[0] == "status"))
            this.filter.controls.status.setValue(null);
        this.filter.controls.etiquetas.setValue([]);
        super.filterClear(filter);
    }
    addItemHandleEtiquetas() {
        var _a;
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = ((_a = item.key) === null || _a === void 0 ? void 0 : _a.length) ? item.key : this.util.textHash(item.value);
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
    ;
}
AtividadeListGridComponent.selectRoute = { route: ["gestao", "atividade", "grid"] };
AtividadeListGridComponent.ɵfac = function AtividadeListGridComponent_Factory(t) { return new (t || AtividadeListGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"])); };
AtividadeListGridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AtividadeListGridComponent, selectors: [["atividade-list-grid"]], viewQuery: function AtividadeListGridComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.calendarEfemerides = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
    } }, inputs: { snapshot: "snapshot", fixedFilter: "fixedFilter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 52, vars: 76, consts: [["calendarEfemerides", ""], [3, "dao", "add", "form", "hasEdit", "hasDelete", "orderBy", "groupBy", "join", "loadList", "selectable", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Minhas", "controlName", "atribuidas_para_mim", 3, "size", "control", "change"], ["label", "Usu\u00E1rio", "controlName", "usuario_id", 3, "size", "disabled", "dao"], ["usuario", ""], ["label", "Atual", "controlName", "somente_unidade_atual", "labelInfo", "Somente as atividades da unidade selecionada", 3, "size", "control", "change"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "disabled", "dao"], ["unidade", ""], ["label", "Sub.", "controlName", "unidades_subordinadas", "labelInfo", "Incluir as unidades subordinadas", 3, "size", "control"], ["label", "#ID", "controlName", "numero", "maskFormat", "999999", 3, "size", "control", "labelInfo"], ["maskFormat", "00000.000000/0000-00", "controlName", "numero_processo", "labelInfo", "Pesquisa no documento de requisi\u00E7\u00E3o, conclus\u00E3o e nos documentos das tarefas", 3, "size", "label", "control"], ["label", "Status", "itemTodos", "- Todos -", "controlName", "status", 3, "size", "valueTodos", "disabled", "control", "items"], ["noForm", "", "noBox", "", "label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control"], ["label", "Arq.", "controlName", "arquivadas", "labelInfo", "Listar tamb\u00E9m atividades arquivadas", 3, "size", "control"], ["controlName", "tipo_atividade_id", 3, "size", "label", "dao"], ["controlName", "tipo_processo_id", 3, "size", "label", "dao"], ["label", "Data", "itemTodos", "- Todos -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["noIcon", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["noIcon", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], [3, "titleTemplate", "template"], ["titleIdNumeroStatus", ""], ["columnNumero", ""], ["titleUnResponsavelDemandante", ""], ["columnPessoas", ""], ["titleTempos", ""], ["columnTempos", ""], [3, "title", "editTemplate", "template", "edit", "save"], ["columnProgressoEtiquetasChecklist", ""], ["columnProgressoEtiquetasChecklistEdit", ""], [3, "title", "template"], ["columnTitulo", ""], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons", 4, "ngIf"], [3, "rows"], [3, "efemerides"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate"], ["columnTarefas", ""], ["columnExpandedTarefas", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-boxes"], ["persist", "", 3, "selectable", "editable", "atividade"], ["by", "numero", 3, "header"], [1, "text-nowrap"], [1, "micro-text", "fw-ligh"], [3, "documento"], [1, "one-per-line"], [3, "data", "color", "icon", "label", "click", 4, "ngFor", "ngForOf"], [3, "data", "color", "icon", "label", "click"], ["by", "usuario.nome", 3, "header"], ["by", "demandante.nome", 3, "header"], ["icon", "bi bi-briefcase", "color", "light", 3, "label"], ["color", "light", 3, "icon", "label", "hint"], ["icon", "bi bi-cursor", "color", "light", 3, "label", "hint"], ["by", "data_distribuicao", 3, "header"], ["by", "prazo_entrega", 3, "header"], ["by", "data_entrega", 3, "header"], [3, "badge", 4, "ngFor", "ngForOf"], [3, "badge"], ["color", "success", 3, "value"], [3, "lookup", "click", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], [3, "lookup", "click"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "bi", "bi-check-circle"], ["label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals", "control"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", "nullable", "", "itemNull", "- Selecione -", "detailsButton", "", "detailsButtonIcon", "bi bi-tools", 3, "size", "control", "items", "details"], ["etiqueta", ""], ["scale", "small", 3, "size", "source", "path"], ["class", "atividade-atividade", 4, "ngIf"], [1, "micro-text", "fw-ligh", "atividade-descricao"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid"], [1, "atividade-atividade"], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons"]], template: function AtividadeListGridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AtividadeListGridComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("select", function AtividadeListGridComponent_Template_grid_select_2_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, AtividadeListGridComponent_toolbar_3_Template, 2, 2, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input-switch", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_Template_input_switch_change_6_listener($event) { return ctx.onAtribuidasParaMimChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function AtividadeListGridComponent_Template_input_switch_change_9_listener($event) { return ctx.onSomenteUnidadeAtualChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "input-switch", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "input-text", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "input-text", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "input-select", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "input-multiselect", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "input-switch", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "input-search", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "input-search", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](22, "input-select", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "input-datetime", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](24, "input-datetime", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, AtividadeListGridComponent_column_26_Template, 5, 4, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "column", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, AtividadeListGridComponent_ng_template_28_Template, 5, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, AtividadeListGridComponent_ng_template_30_Template, 6, 3, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](50, AtividadeListGridComponent_column_50_Template, 1, 4, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](51, "pagination", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && !(ctx.queryParams == null ? null : ctx.queryParams.filter) && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.atribuidas_para_mim);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 5)("disabled", ctx.filter.controls.atribuidas_para_mim.value ? "true" : undefined)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.somente_unidade_atual);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("disabled", ctx.filter.controls.somente_unidade_atual.value ? "true" : undefined)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.unidades_subordinadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.numero)("labelInfo", "N\u00FAmero " + ctx.lex.translate("atividade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", "N\u00BA " + ctx.lex.translate("Processo") + " (Sei)")("control", ctx.filter.controls.numero_processo);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("valueTodos", null)("disabled", (ctx.fixedFilter == null ? null : ctx.fixedFilter.length) && ctx.fixedFilter[0][0] == "status" ? "true" : undefined)("control", ctx.filter.controls.status)("items", ctx.lookup.ATIVIDADE_STATUS_COM_ARQUIVADAS);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.etiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.arquivadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Tipo de Atividade"))("dao", ctx.tipoAtividadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Tipo de Processo"))("dao", ctx.tipoProcessoDao);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", "Progresso\nEtiquetas/Checklist")("editTemplate", ctx.selectable ? undefined : _r20)("template", _r18)("edit", ctx.selectable ? undefined : ctx.onColumnProgressoEtiquetasChecklistEdit.bind(ctx))("save", ctx.selectable ? undefined : ctx.onColumnProgressoEtiquetasChecklistSave.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", "Tipo de Atividade\nDescri\u00E7\u00E3o")("template", _r22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, styles: [".atividade-atividade[_ngcontent-%COMP%], .atividade-descricao[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 200px;\n  white-space: initial;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2F0aXZpZGFkZS1saXN0LWdyaWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUFDSiIsImZpbGUiOiJhdGl2aWRhZGUtbGlzdC1ncmlkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmF0aXZpZGFkZS1hdGl2aWRhZGUsIC5hdGl2aWRhZGUtZGVzY3JpY2FvIHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICB3aGl0ZS1zcGFjZTogaW5pdGlhbDtcbn0iXX0= */"] });


/***/ }),

/***/ "KY1u":
/*!**************************************************!*\
  !*** ./src/app/models/atividade-tarefa.model.ts ***!
  \**************************************************/
/*! exports provided: AtividadeTarefa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeTarefa", function() { return AtividadeTarefa; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class AtividadeTarefa extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.documento = null; /* Documento de entrga */
        this.comentarios = []; /* Comentarios da tarefa */
        this.descricao = null; /* Descrição da tarefa */
        this.data_hora = new Date(); /* Data hora do lançamento da tarefa */
        this.tempo_estimado = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
        this.concluido = false; /* Se a tarefa foi concluída */
        this.documento_id = null; /* Documento de entrga */
        this.atividade_id = ""; /* Atividade */
        this.usuario_id = ""; /* Usuário */
        this.tipo_tarefa_id = null; /* Tarefa */
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=default~listeners-listeners-module~modules-gestao-atividade-atividade-module.js.map