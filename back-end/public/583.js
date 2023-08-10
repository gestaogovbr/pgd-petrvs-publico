"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[583],{

/***/ 99089:
/*!********************************************************************!*\
  !*** ./src/app/listeners/editor-montar/editor-montar.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorMontarComponent: () => (/* binding */ EditorMontarComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ 25026);
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/documento.model */ 43972);
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../listener-base */ 40922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;




class EditorMontarComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_3__.ListenerBase {
  constructor(injector) {
    super(injector, "editor-montar");
    this.injector = injector;
    this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__.DocumentoDaoService);
  }
  ngOnInit() {
    super.ngOnInit();
  }
  documentoPendenteSei(id_documento) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const documento = yield _this.documentoDao.documentoPendenteSei(id_documento);
      if (documento) {
        const numero_documento = yield _this.execute("setConteudoDocumento", [0, documento.conteudo]);
        if (numero_documento?.length) {
          yield _this.documentoDao.update(documento.id, {
            status: src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_2__.Documento.STATUS_GERADO,
            numero_documento: numero_documento
          });
        }
      }
    })();
  }
  loadToolbarButtons(buttons) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.gb.toolbarButtons = [];
    })();
  }
}
_class = EditorMontarComponent;
_class.ɵfac = function EditorMontarComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-editor-montar"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 0,
  template: function EditorMontarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "editor-montar works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 47807:
/*!*******************************************************!*\
  !*** ./src/app/listeners/listeners-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListenersRoutingModule: () => (/* binding */ ListenersRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-montar/editor-montar.component */ 99089);
/* harmony import */ var _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./petrvs-listener/petrvs-listener.component */ 70912);
/* harmony import */ var _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./procedimento-escolher-tipo/procedimento-escolher-tipo.component */ 79100);
/* harmony import */ var _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedimento-trabalhar/procedimento-trabalhar.component */ 40510);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: 'editor-montar',
  component: _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_0__.EditorMontarComponent
}, {
  path: 'procedimento-trabalhar',
  component: _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_3__.ProcedimentoTrabalharComponent
}, {
  path: 'procedimento-escolher-tipo',
  component: _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_2__.ProcedimentoEscolherTipoComponent
}, {
  path: 'petrvs',
  component: _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_1__.PetrvsListenerComponent
}];
class ListenersRoutingModule {}
_class = ListenersRoutingModule;
_class.ɵfac = function ListenersRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ListenersRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 50583:
/*!***********************************************!*\
  !*** ./src/app/listeners/listeners.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListenersModule: () => (/* binding */ ListenersModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _listeners_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listeners-routing.module */ 47807);
/* harmony import */ var _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./procedimento-trabalhar/procedimento-trabalhar.component */ 40510);
/* harmony import */ var _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./procedimento-escolher-tipo/procedimento-escolher-tipo.component */ 79100);
/* harmony import */ var _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor-montar/editor-montar.component */ 99089);
/* harmony import */ var _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./petrvs-listener/petrvs-listener.component */ 70912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class ListenersModule {}
_class = ListenersModule;
_class.ɵfac = function ListenersModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _listeners_routing_module__WEBPACK_IMPORTED_MODULE_0__.ListenersRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ListenersModule, {
    declarations: [_procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_1__.ProcedimentoTrabalharComponent, _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_2__.ProcedimentoEscolherTipoComponent, _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_3__.EditorMontarComponent, _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_4__.PetrvsListenerComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _listeners_routing_module__WEBPACK_IMPORTED_MODULE_0__.ListenersRoutingModule]
  });
})();

/***/ }),

/***/ 70912:
/*!************************************************************************!*\
  !*** ./src/app/listeners/petrvs-listener/petrvs-listener.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PetrvsListenerComponent: () => (/* binding */ PetrvsListenerComponent)
/* harmony export */ });
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../listener-base */ 40922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class PetrvsListenerComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_0__.ListenerBase {
  constructor(injector) {
    super(injector, "petrvs-listener");
    this.injector = injector;
  }
  ngOnInit() {}
}
_class = PetrvsListenerComponent;
_class.ɵfac = function PetrvsListenerComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-petrvs-listener"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 0,
  template: function PetrvsListenerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "petrvs-listener works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 79100:
/*!**********************************************************************************************!*\
  !*** ./src/app/listeners/procedimento-escolher-tipo/procedimento-escolher-tipo.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProcedimentoEscolherTipoComponent: () => (/* binding */ ProcedimentoEscolherTipoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ 70361);
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../listener-base */ 40922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;



class ProcedimentoEscolherTipoComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_2__.ListenerBase {
  constructor(injector) {
    super(injector, "procedimento_escolher_tipo");
    this.injector = injector;
    this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_1__.TipoProcessoDaoService);
  }
  ngOnInit() {
    super.ngOnInit();
  }
  loadToolbarButtons() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gb.toolbarButtons = [{
        icon: "bi bi-folder-check",
        color: "btn-outline-primary",
        hint: "Atualizar tipos de processos",
        onClick: _this.atualizarTiposProcessos.bind(_this)
      }];
    })();
  }
  atualizarTiposProcessos() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let tiposProcessos = yield _this2.execute("getTiposProcessos", []);
      if (yield _this2.tipoProcessoDao.atualizar(tiposProcessos)) {
        _this2.dialog.alert("Atualização", "Atualização realizada com sucesso!");
      } else {
        _this2.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
      }
    })();
  }
}
_class = ProcedimentoEscolherTipoComponent;
_class.ɵfac = function ProcedimentoEscolherTipoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-procedimento-escolher-tipo"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 0,
  template: function ProcedimentoEscolherTipoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "procedimento-escolher-tipo works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 40510:
/*!**************************************************************************************!*\
  !*** ./src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProcedimentoTrabalharComponent: () => (/* binding */ ProcedimentoTrabalharComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/atividade-tarefa-dao.service */ 949);
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ 25026);
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ 15316);
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ 88340);
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ 88543);
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/documento.model */ 43972);
/* harmony import */ var src_app_modules_gestao_plano_trabalho_plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/gestao/plano-trabalho/plano-trabalho-list/plano-trabalho-list.component */ 89997);
/* harmony import */ var src_app_modules_gestao_atividade_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/gestao/atividade/atividade-list-grid/atividade-list-grid.component */ 48644);
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../listener-base */ 40922);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;










class ProcedimentoTrabalharComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_9__.ListenerBase {
  constructor(injector) {
    super(injector, "procedimento_trabalhar");
    this.injector = injector;
    this.dao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.EntidadeDaoService);
    this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__.TipoDocumentoDaoService);
  }
  ngOnInit() {
    super.ngOnInit();
  }
  loadToolbarButtons(buttons) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let toolbarButtons = [];
      if (buttons.includes("plano")) {
        toolbarButtons.push({
          icon: "bi bi-list-check",
          color: "btn-outline-primary",
          hint: "Gerar termo de adesão",
          onClick: _this.gerarTermoAdesao.bind(_this)
        });
      }
      if (buttons.includes("entrega")) {
        let menu = [];
        if (buttons.includes("concluir_entrega")) {
          menu.push({
            icon: "bi bi-check-circle",
            color: "btn-outline-primary",
            label: "Concluir " + _this.lex.translate("entrega"),
            onClick: _this.concluirEntrega.bind(_this)
          });
        }
        toolbarButtons.push({
          icon: "bi bi-boxes",
          color: "btn-outline-secondary",
          hint: "Incluir " + _this.lex.translate("entrega"),
          onClick: _this.incluirEntrega.bind(_this),
          items: menu.length ? menu : undefined
        });
      }
      if (buttons.includes("atualizar")) {
        toolbarButtons.push({
          icon: "bi bi-file-check",
          color: "btn-outline-warning",
          hint: "Atualizar tipos de documentos",
          onClick: _this.atualizarTiposDocumentos.bind(_this)
        });
      }
      if (buttons.find(x => ["incluir", "concluir", "atividades"].includes(x))) {
        let menu = [];
        if (buttons.includes("incluir")) {
          menu.push({
            icon: "bi bi-plus-circle",
            color: "btn-outline-primary",
            label: "Incluir " + _this.lex.translate("atividade"),
            onClick: _this.incluirAtividade.bind(_this)
          });
        }
        if (buttons.includes("concluir")) {
          menu.push({
            icon: "bi bi-check-circle",
            color: "btn-outline-primary",
            label: "Concluir " + _this.lex.translate("atividade"),
            onClick: _this.concluirAtividade.bind(_this)
          });
        }
        toolbarButtons.push({
          icon: "bi bi-activity",
          color: "btn-outline-success",
          hint: _this.lex.translate("atividade"),
          onClick: _this.atividades.bind(_this),
          items: menu.length ? menu : undefined
        });
      }
      _this.gb.toolbarButtons = toolbarButtons;
    })();
  }
  incluirAtividade() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let keys = yield _this2.execute("getSeiKeys", []);
      if (keys) _this2.go.navigate({
        route: ["gestao", "atividade", "new"]
      }, {
        metadata: {
          sei: keys
        },
        modal: true
      });
    })();
  }
  atividades() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let keys = yield _this3.execute("getProcessoKeys", []);
      if (keys) {
        _this3.go.navigate({
          route: ["gestao", "atividade"],
          params: {
            filter: {
              numero_processo: keys.numero_processo
            }
          }
        }, {
          modal: true,
          modalWidth: 1200
        });
      }
    })();
  }
  concluirAtividade() {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let keys = yield _this4.execute("getDocumentKeys", []);
      if (keys) {
        const selected = yield src_app_modules_gestao_atividade_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_8__.AtividadeListGridComponent.modalSelect({
          fixedFilter: [["status", "==", "INICIADO"]]
        });
        if (selected) {
          if (selected.metadados?.suspenso) {
            if (yield _this4.dialog.confirm("Atividade suspensa", "Para concluir é necessário primeiro reiniciar a atividade. Deseja reiniciar?")) {
              _this4.go.navigate({
                route: ['gestao', 'atividade', selected.id, 'pausar'],
                params: {
                  reiniciar: true
                }
              }, {
                modal: true,
                modalClose: modalResult => {
                  if (modalResult?.length) _this4.go.navigate({
                    route: ['gestao', 'atividade', selected.id, 'concluir']
                  }, {
                    modal: true
                  });
                }
              });
            }
          } else {
            _this4.go.navigate({
              route: ['gestao', 'atividade', selected.id, 'concluir']
            }, {
              modal: true
            });
          }
        }
      }
    })();
  }
  concluirEntrega() {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let keys = yield _this5.execute("getProcessoKeys", []);
      if (keys) {
        _this5.go.navigate({
          route: ['gestao', 'atividade', 'entrega', 'concluir'],
          params: {
            id_processo: keys.id_processo
          }
        }, {
          modal: true
        });
      }
    })();
  }
  incluirEntrega() {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let keys = yield _this6.execute("getSeiKeys", []);
      if (keys) {
        const selected = yield src_app_modules_gestao_atividade_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_8__.AtividadeListGridComponent.modalSelect({
          fixedFilter: [["status", "==", "NAOCONCLUIDO"]]
        });
        if (selected) {
          const entrega = new src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_5__.AtividadeTarefa();
          entrega.id = _this6.dao.generateUuid();
          entrega.usuario = _this6.auth.usuario;
          entrega.usuario_id = _this6.auth.usuario.id;
          entrega.atividade_id = selected.id || "";
          entrega.comentarios = [];
          entrega._status = "ADD";
          _this6.go.navigate({
            route: ['gestao', 'atividade', 'tarefa']
          }, {
            metadata: {
              entrega: entrega,
              atividade: selected,
              sei: keys
            },
            modalClose: modalResult => {
              if (modalResult) {
                (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
                  try {
                    const dao = _this6.injector.get(src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_1__.AtividadeTarefaDaoService);
                    _this6.dialog.showSppinerOverlay("Salvando dados do formulário");
                    yield dao.save(modalResult);
                  } catch (error) {
                    _this6.dialog.alert("Error", error.message ? error.message : error);
                  } finally {
                    _this6.dialog.closeSppinerOverlay();
                  }
                })();
              }
            }
          });
        }
      }
    })();
  }
  gerarTermoAdesao() {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //const plano = new PlanoListComponent(this.injector, new PlanoDaoService(this.injector));
      const selected = yield src_app_modules_gestao_plano_trabalho_plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoListComponent.modalSelect();
      if (selected) {
        let processo = yield _this7.execute("getProcessoKeys", []);
        _this7.go.navigate({
          route: ['gestao', 'plano', 'termo']
        }, {
          metadata: {
            plano: selected,
            processo: processo
          },
          modalClose: modalResult => {
            if (modalResult?.termo?.length) {
              (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
                _this7.dialog.showSppinerOverlay("Gerando documento no sei...");
                try {
                  const documentoSei = yield _this7.execute("incluirDocumento", [processo.id_processo, modalResult.codigo_tipo_documento]);
                  if (documentoSei) {
                    const dao = _this7.injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__.DocumentoDaoService);
                    const documento = Object.assign(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_6__.Documento(), {
                      especie: "TCR",
                      conteudo: modalResult?.termo,
                      id_processo: processo.id_processo,
                      id_documento: documentoSei.id_documento,
                      numero_processo: documentoSei.numero_processo,
                      plano_trabalho_id: selected.id,
                      tipo_documento_id: modalResult.tipo_documento_id,
                      status: "AGUARDANDO_SEI"
                    });
                    yield dao.save(documento);
                    yield _this7.execute("recarregarArvore", [documentoSei.urlReload]);
                    yield _this7.execute("abrirEditor", [documentoSei.urlEditor, documentoSei.idUser]);
                  }
                } catch (error) {
                  _this7.dialog.alert("Error", error.message ? error.message : error);
                } finally {
                  _this7.dialog.closeSppinerOverlay();
                }
              })();
            }
          }
        });
      }
    })();
  }
  atualizarTiposDocumentos() {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let tiposDocumentos = yield _this8.execute("getTiposDocumentos", []);
      if (yield _this8.tipoDocumentoDao.atualizar(tiposDocumentos)) {
        _this8.dialog.alert("Atualização", "Atualização realizada com sucesso!");
      } else {
        _this8.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
      }
    })();
  }
}
_class = ProcedimentoTrabalharComponent;
_class.ɵfac = function ProcedimentoTrabalharComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-procedimento-trabalhar"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 0,
  template: function ProcedimentoTrabalharComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "procedimento-trabalhar works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=583.js.map