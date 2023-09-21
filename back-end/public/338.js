"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[338],{

/***/ 57338:
/*!***************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeService: () => (/* binding */ AtividadeService)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_models_comentario__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/comentario */ 11597);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
/* harmony import */ var src_app_services_lexical_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/lexical.service */ 15908);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/comentario.service */ 2124);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/auth.service */ 32333);
/* harmony import */ var src_app_services_util_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/util.service */ 49193);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var src_app_services_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/dialog.service */ 19899);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);

var _class;











class AtividadeService {
  constructor(lookup, lex, calendar, comentario, auth, util, go, dialog, dao) {
    this.lookup = lookup;
    this.lex = lex;
    this.calendar = calendar;
    this.comentario = comentario;
    this.auth = auth;
    this.util = util;
    this.go = go;
    this.dialog = dialog;
    this.dao = dao;
    this.delete = (metadata, atividade) => {
      this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
        if (confirm) {
          this.dao.delete(atividade).then(() => {
            metadata.removeId(atividade.id);
            this.dialog.topAlert("Registro excluído com sucesso!", 5000);
          }).catch(error => this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error)));
        }
      });
    };
    this.cancelarInicio = (metadata, atividade) => {
      this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
        if (confirm) {
          this.dao.cancelarInicio(atividade.id).then(() => {
            metadata.refreshId(atividade.id);
            this.dialog.topAlert("Cancelado a inicialização com sucesso!", 5000);
          }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : 0));
        }
      });
    };
    this.cancelarConclusao = (metadata, atividade) => {
      this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
        if (confirm) {
          this.dao.cancelarConclusao(atividade.id).then(() => {
            metadata.refreshId(atividade.id);
            this.dialog.topAlert("Cancelado a conclusão com sucesso!", 5000);
          }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar conclusão: " + error?.message ? error?.message : 0));
        }
      });
    };
    this.desarquivar = (metadata, atividade) => {
      this.dao.arquivar(atividade.id, false).then(() => {
        metadata.refreshId(atividade.id);
      }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : 0));
    };
    this.arquivar = (metadata, atividade) => {
      this.dialog.confirm("Arquivar?", "Deseja realmente arquivar a atividade?").then(confirm => {
        if (confirm) {
          this.dao.arquivar(atividade.id, true).then(() => {
            metadata.refreshId(atividade.id);
          }).catch(error => this.dialog.alert("Erro", "Erro ao cancelar inicio: " + error?.message ? error?.message : 0));
        }
      });
    };
    this.dynamicOptions = (row, metadata) => {
      let result = [];
      let atividade = row;
      const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
      const isDemandante = this.auth.usuario?.id == atividade.demandante_id;
      const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
      const lastConsolidacao = this.lastConsolidacao(row.metadados?.consolidacoes);
      const BOTAO_INFORMACOES = {
        label: "Informações",
        icon: "bi bi-info-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'consult']
        }, {
          modal: true
        })
      };
      const BOTAO_COMENTARIOS = {
        label: "Comentários",
        icon: "bi bi-chat-left-quote",
        onClick: atividade => this.go.navigate({
          route: ['uteis', 'comentarios', 'ATIVIDADE', atividade.id, 'new']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_CLONAR = {
        label: "Clonar",
        icon: "bi bi-stickies",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'clonar']
        }, this.modalRefresh(metadata))
      };
      const BOTAO_ALTERAR = {
        label: "Alterar atividade",
        icon: "bi bi-pencil-square",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'edit']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_EXCLUIR = {
        label: "Excluir atividade",
        icon: "bi bi-trash",
        onClick: this.delete.bind(this, metadata)
      };
      const BOTAO_PRORROGAR_PRAZO = {
        label: "Prorrogar prazo",
        icon: "bi bi-skip-end-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'prorrogar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_INICIAR = {
        label: "Iniciar",
        id: "INICIADO",
        icon: "bi bi-play-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'iniciar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_CANCELAR_INICIO = {
        label: "Cancelar inicio",
        id: "NAOINICIADO",
        icon: "bi bi-backspace",
        onClick: this.cancelarInicio.bind(this, metadata)
      };
      const BOTAO_ALTERAR_INICIO = {
        label: "Alterar inicio",
        icon: "bi bi-play-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'iniciar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_PAUSAR = {
        label: "Pausar",
        id: "PAUSADO",
        icon: "bi bi-pause-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'pausar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_REINICIAR = {
        label: "Reiniciar",
        id: "INICIADO",
        icon: "bi bi-play-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'pausar'],
          params: {
            reiniciar: true
          }
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_CONCLUIR = {
        label: "Concluir",
        id: "CONCLUIDO",
        icon: "bi bi-check-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'concluir']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_ALTERAR_CONCLUSAO = {
        label: "Alterar conclusão",
        icon: "bi bi-check-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'concluir']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_CANCELAR_CONCLUSAO = {
        label: "Cancelar conclusão",
        id: "INICIADO",
        icon: "bi bi-backspace",
        onClick: this.cancelarConclusao.bind(this, metadata)
      };
      const BOTAO_ARQUIVAR = {
        label: "Arquivar",
        icon: "bi bi-inboxes",
        onClick: this.arquivar.bind(this, metadata)
      };
      const BOTAO_DESARQUIVAR = {
        label: "Desarquivar",
        icon: "bi bi-reply",
        onClick: this.desarquivar.bind(this, metadata)
      };
      if (!metadata?.disabled) {
        result.push(BOTAO_INFORMACOES);
        if (isResponsavel || isGestor || isDemandante) result.push(BOTAO_COMENTARIOS);
        result.push(BOTAO_CLONAR);
        if (atividade.metadados?.arquivado) {
          /* Arquivado */
          if (isGestor || isResponsavel) result.push(BOTAO_DESARQUIVAR);
        } else if (!atividade.metadados?.iniciado) {
          if (isResponsavel || atividade.usuario_id == null || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) {
            /* Não iniciado */
            result.push(BOTAO_INICIAR);
          }
          if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT')) {
            result.push(BOTAO_ALTERAR);
          }
          if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_EXCL') || this.auth.hasPermissionTo('MOD_DMD_NI_EXCL')) {
            if (result.length) result.push({
              divider: true
            });
            result.push(BOTAO_EXCLUIR);
          }
        } else if (atividade.metadados?.concluido) {
          /* Concluído -> Gestor ou substituto pode avaliar */
          if (isGestor || isResponsavel) result.push(BOTAO_ARQUIVAR);
          if (lastConsolidacao?.status != "CONCLUIDO") {
            /* (RN_CSLD_9) */
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL')) {
              result.push(BOTAO_ALTERAR_CONCLUSAO);
            }
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_CONCL')) {
              if (result.length) result.push({
                divider: true
              });
              result.push(BOTAO_CANCELAR_CONCLUSAO);
            }
          }
        } else if (atividade.metadados?.iniciado) {
          /* Iniciado */
          if (atividade.metadados?.pausado) {
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) {
              /* Iniciada e Pausada */
              result.push(BOTAO_REINICIAR);
            }
          } else {
            /* Iniciada e não Suspensa */
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) result.push(BOTAO_CONCLUIR);
            if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_PAUSA')) result.push(BOTAO_PAUSAR);
            if (!lastConsolidacao || lastConsolidacao?.status == "INCLUIDO") {
              /* (RN_CSLD_9) */
              if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CANC_INICIAR')) result.push(BOTAO_CANCELAR_INICIO);
              if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) result.push(BOTAO_ALTERAR_INICIO);
            }
          }
          if (isGestor || isDemandante || this.auth.hasPermissionTo('MOD_DMD_USERS_PPRZO')) {
            result.push(BOTAO_PRORROGAR_PRAZO);
          }
        }
      }
      return result;
    };
    this.dynamicButtons = (row, metadata) => {
      let result = [];
      let atividade = row;
      const isGestor = this.auth.usuario?.id == atividade.unidade?.gestor?.id || this.auth.usuario?.id == atividade.unidade?.gestor_substituto?.id;
      const isResponsavel = this.auth.usuario?.id == atividade.usuario_id;
      const lastConsolidacao = this.lastConsolidacao(row.metadados?.consolidacoes);
      const BOTAO_ALTERAR_AVALIACAO = {
        hint: "Alterar avaliação",
        icon: "bi bi-check-all",
        color: "btn-outline-danger",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'avaliar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_INFORMACOES = {
        label: "Informações",
        icon: "bi bi-info-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'consult']
        }, {
          modal: true
        })
      };
      const BOTAO_INICIAR = {
        hint: "Iniciar",
        icon: "bi bi-play-circle",
        color: "btn-outline-secondary",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'iniciar']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_REINICIAR = {
        hint: "Reiniciar",
        icon: "bi bi-play-circle",
        color: "btn-outline-secondary",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'pausar'],
          params: {
            reiniciar: true
          }
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_CONCLUIR = {
        hint: "Concluir",
        icon: "bi bi-check",
        color: "btn-outline-success",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'concluir']
        }, this.modalRefreshId(metadata, atividade))
      };
      const BOTAO_ARQUIVAR = {
        hint: "Arquivar",
        icon: "bi bi-inboxes",
        onClick: this.arquivar.bind(this)
      };
      const BOTAO_DESARQUIVAR = {
        hint: "Desarquivar",
        icon: "bi bi-reply",
        onClick: this.desarquivar.bind(this, metadata)
      };
      const BOTAO_ALTERAR_CONCLUSAO = {
        hint: "Alterar conclusão",
        icon: "bi bi-check-circle",
        onClick: atividade => this.go.navigate({
          route: ['gestao', 'atividade', atividade.id, 'concluir']
        }, this.modalRefreshId(metadata, atividade))
      };
      if (!metadata?.disabled) {
        if (!atividade.metadados?.iniciado) {
          /* Não iniciado */
          if (isResponsavel || atividade.usuario_id == null || this.auth.hasPermissionTo('MOD_DMD_USERS_INICIAR')) {
            /* Usuário da atividade é o mesmo logado */
            result.push(BOTAO_INICIAR);
          }
        } else if (atividade.metadados?.concluido) {
          /* Concluído */
          if (isGestor || isResponsavel) {
            result.push(atividade.metadados?.arquivado ? BOTAO_DESARQUIVAR : BOTAO_ARQUIVAR);
          } else if (lastConsolidacao?.status != "CONCLUIDO" && (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_ALT_CONCL'))) {
            /* (RN_CSLD_9) */
            result.push(BOTAO_ALTERAR_CONCLUSAO);
          }
        } else if (atividade.metadados?.iniciado) {
          /* Iniciado */
          if (atividade.metadados?.pausado && isResponsavel) {
            /* Iniciada e Pausada */
            result.push(BOTAO_REINICIAR);
          } else if (isResponsavel || this.auth.hasPermissionTo('MOD_DMD_USERS_CONCL')) {
            /* Iniciada e não Suspensa */
            result.push(BOTAO_CONCLUIR);
          }
        }
      }
      if (!result.length) result.push(BOTAO_INFORMACOES);
      return result;
    };
  }
  getStatus(row, consolidacao) {
    const atividade = row;
    const status = this.lookup.ATIVIDADE_STATUS.find(x => x.key == atividade.status) || {
      key: "DESCONHECIDO",
      value: "Desconhecido",
      icon: "bi bi-question-circle",
      color: "light"
    };
    let result = [{
      data: {
        status: status.key,
        filter: true
      },
      label: status.value,
      icon: status.icon,
      color: status.color
    }];
    if (atividade.metadados?.atrasado) result.push({
      data: {
        status: "ATRASADO",
        filter: false
      },
      label: "Atrasado",
      icon: "bi bi-alarm",
      color: "danger"
    });
    if (consolidacao && (atividade.data_inicio && this.util.asDate(atividade.data_inicio).getTime() < this.util.asDate(consolidacao.data_inicio).getTime() || atividade.data_entrega && this.util.asDate(atividade.data_entrega).getTime() > this.util.asDate(consolidacao.data_fim).getTime())) {
      result.push({
        data: {
          status: "EXTRAPOLADO",
          filter: false
        },
        label: "Extrapolado",
        icon: "bi bi-arrow-left-right",
        color: "danger",
        hint: "Data de início ou conclusão " + this.lex.translate("da Atividade") + " extrapola os da consolidação"
      });
    }
    if (atividade.metadados?.arquivado) result.push({
      data: {
        status: "ARQUIVADO",
        filter: false
      },
      label: "Arquivado",
      icon: "bi bi-inboxes",
      color: "danger"
    });
    if (atividade.metadados && JSON.stringify(atividade.metadados._status) != JSON.stringify(result)) atividade.metadados._status = result;
    return atividade.metadados?._status || result;
  }
  temposAtividade(row, extra, despendidoClick) {
    /* Atualiza somente a cada mudança de minuto da unidade atual */
    if (row.metadados && row.metadados.extra?.lastUpdate != this.auth.unidadeHora) {
      let planoTrabalho = extra?.planos_trabalho[row.plano_trabalho_id] || row.plano_trabalho;
      let tempos = [{
        color: "light",
        hint: this.lex.translate("Data de distribuição"),
        icon: "bi bi-file-earmark-plus",
        label: this.dao.getDateTimeFormatted(row.data_distribuicao)
      }, {
        color: "light",
        hint: this.lex.translate("Prazo de entrega"),
        icon: "bi bi-calendar-check",
        label: this.dao.getDateTimeFormatted(row.data_estipulada_entrega)
      }];
      if (planoTrabalho?.tipo_modalidade?.atividade_esforco) tempos.push({
        color: "light",
        hint: this.lex.translate("Esforço"),
        icon: "bi bi-stopwatch",
        label: row.esforco ? this.util.decimalToTimerFormated(row.esforco, true) + " " + this.lex.translate("esforço") : "Sem " + this.lex.translate("esforço")
      });
      if (row.metadados.concluido) tempos.push({
        color: "light",
        hint: "Data de entrega realizada",
        icon: "bi bi-check-circle",
        label: this.dao.getDateTimeFormatted(row.data_entrega)
      });
      if (row.metadados.iniciado && !!planoTrabalho?.tipo_modalidade?.atividade_tempo_despendido) {
        const cargaHoraria = planoTrabalho?.carga_horaria || 0;
        const afastamentos = extra?.afastamentos[row.usuario_id] || [];
        const despendido = row.metadados.concluido ? row.tempo_despendido || 0 : this.calendar.horasUteis(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
        tempos.push({
          color: despendido > row.esforco ? "warning" : "light",
          hint: "Tempo despendido",
          icon: "bi bi-hourglass-split",
          label: this.util.decimalToTimerFormated(despendido, true) + " despendido",
          click: !row.metadados.concluido ? despendidoClick : undefined,
          data: row
        });
      }
      if (!row.metadados.concluido && this.util.asDate(row.data_estipulada_entrega).getTime() < this.auth.hora.getTime()) {
        const atrasado = this.calendar.horasAtraso(row.data_estipulada_entrega, row.unidade);
        tempos.push({
          color: "danger",
          hint: "Tempo de atraso",
          icon: "bi bi-alarm",
          label: this.util.decimalToTimerFormated(atrasado, true) + " atrasado"
        });
      }
      row.metadados.extra = row.metadados.extra || {};
      row.metadados.extra.lastUpdate = this.auth.unidadeHora;
      row.metadados.extra.tempos = tempos;
    }
    return row.metadados?.extra?.tempos || [];
  }
  onIdClick(numero) {
    this.util.copyToClipboard(numero.toString());
  }
  buildEtiquetas(unidade, tipoAtividade) {
    return this.util.merge(tipoAtividade?.etiquetas, unidade?.etiquetas, (a, b) => a.key == b.key);
  }
  buildChecklist(tipoAtividade, checklistControl) {
    let checks = this.util.merge((tipoAtividade?.checklist || []).map(a => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      };
    }), (checklistControl?.value || []).filter(b => b.checked), (a, b) => {
      if (a.id == b.id) {
        a.checked = b.checked;
        return true;
      } else {
        return false;
      }
    });
    if (checklistControl) checklistControl.setValue(checks);
    return checks;
  }
  comentarioAtividade(tipoAtividade, comentariosControl) {
    let comentarios = comentariosControl?.value || [];
    const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
    if (index >= 0) {
      if (comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if (tipoAtividade?.comentario?.length) {
      const comentario = new src_app_models_comentario__WEBPACK_IMPORTED_MODULE_1__.Comentario();
      comentario.id = this.dao.generateUuid();
      comentario.path = "";
      comentario.texto = tipoAtividade.comentario;
      comentario.data_comentario = this.auth.hora;
      comentario.usuario_id = this.auth.usuario.id;
      comentario.comentario_id = null;
      comentario.tipo = "TIPO_ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      comentarios = this.comentario.orderComentarios(comentarios);
      if (comentariosControl) comentariosControl.setValue(comentarios);
    }
  }
  modalRefreshId(metadata, entity) {
    return {
      modal: true,
      modalClose: function () {
        var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
          return metadata.refreshId(entity.id);
        });
        return function modalClose(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    };
  }
  modalRefresh(metadata) {
    return {
      modal: true,
      modalClose: metadata.refresh
    };
  }
  lastConsolidacao(consolidacoes) {
    return consolidacoes?.reduce((a, v) => a = !a || this.util.asDate(v.data_conclusao).getTime() > this.util.asDate(a.data_conclusao).getTime() ? v : a, undefined);
  }
}
_class = AtividadeService;
_class.ɵfac = function AtividadeService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_2__.LookupService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_lexical_service__WEBPACK_IMPORTED_MODULE_3__.LexicalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_4__.CalendarService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_5__.ComentarioService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_util_service__WEBPACK_IMPORTED_MODULE_7__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_8__.NavigateService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_services_dialog_service__WEBPACK_IMPORTED_MODULE_9__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__.AtividadeDaoService));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);
//# sourceMappingURL=338.js.map