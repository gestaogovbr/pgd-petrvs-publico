(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["listeners-listeners-module"],{

/***/ "5ywm":
/*!**************************************************************************************!*\
  !*** ./src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ProcedimentoTrabalharComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcedimentoTrabalharComponent", function() { return ProcedimentoTrabalharComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_dao_demanda_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/demanda-entrega-dao.service */ "O1bs");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_models_demanda_entrega_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/demanda-entrega.model */ "q8oy");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var src_app_modules_gestao_plano_plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/gestao/plano/plano-list/plano-list.component */ "nUpE");
/* harmony import */ var src_app_modules_gestao_demanda_demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/gestao/demanda/demanda-list-grid/demanda-list-grid.component */ "EX7z");
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../listener-base */ "Cd0/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











class ProcedimentoTrabalharComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_9__["ListenerBase"] {
    constructor(injector) {
        super(injector, "procedimento_trabalhar");
        this.injector = injector;
        this.dao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["EntidadeDaoService"]);
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoDocumentoDaoService"]);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    loadToolbarButtons(buttons) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let toolbarButtons = [];
            if (buttons.includes("plano")) {
                toolbarButtons.push({
                    icon: "bi bi-list-check",
                    color: "btn-outline-primary",
                    hint: "Gerar termo de adesão",
                    onClick: this.gerarTermoAdesao.bind(this)
                });
            }
            if (buttons.includes("entrega")) {
                let menu = [];
                if (buttons.includes("concluir_entrega")) {
                    menu.push({
                        icon: "bi bi-check-circle",
                        color: "btn-outline-primary",
                        label: "Concluir " + this.lex.noun("entrega"),
                        onClick: this.concluirEntrega.bind(this)
                    });
                }
                toolbarButtons.push({
                    icon: "bi bi-boxes",
                    color: "btn-outline-secondary",
                    hint: "Incluir " + this.lex.noun("entrega"),
                    onClick: this.incluirEntrega.bind(this),
                    items: menu.length ? menu : undefined
                });
            }
            if (buttons.includes("atualizar")) {
                toolbarButtons.push({
                    icon: "bi bi-file-check",
                    color: "btn-outline-warning",
                    hint: "Atualizar tipos de documentos",
                    onClick: this.atualizarTiposDocumentos.bind(this)
                });
            }
            if (buttons.find(x => ["incluir", "concluir", "demandas"].includes(x))) {
                let menu = [];
                if (buttons.includes("incluir")) {
                    menu.push({
                        icon: "bi bi-plus-circle",
                        color: "btn-outline-primary",
                        label: "Incluir " + this.lex.noun("demanda"),
                        onClick: this.incluirDemanda.bind(this)
                    });
                }
                if (buttons.includes("concluir")) {
                    menu.push({
                        icon: "bi bi-check-circle",
                        color: "btn-outline-primary",
                        label: "Concluir " + this.lex.noun("demanda"),
                        onClick: this.concluirDemanda.bind(this)
                    });
                }
                toolbarButtons.push({
                    icon: "bi bi-activity",
                    color: "btn-outline-success",
                    hint: this.lex.noun("demanda"),
                    onClick: this.demandas.bind(this),
                    items: menu.length ? menu : undefined
                });
            }
            this.gb.toolbarButtons = toolbarButtons;
        });
    }
    incluirDemanda() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let keys = yield this.execute("getSeiKeys", []);
            if (keys)
                this.incluirDemandaProcessual(keys.id_processo, keys.numero_processo, keys.id_documento, keys.numero_documento);
        });
    }
    demandas() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let keys = yield this.execute("getProcessoKeys", []);
            if (keys) {
                this.go.navigate({ route: ["gestao", "demanda"], params: { filter: { numero_processo: keys.numero_processo } } }, { modal: true, modalWidth: 1200 });
            }
        });
    }
    concluirDemanda() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let keys = yield this.execute("getDocumentKeys", []);
            if (keys) {
                //const demanda = new DemandaListGridComponent(this.injector, new DemandaDaoService(this.injector));
                const selected = yield src_app_modules_gestao_demanda_demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_8__["DemandaListGridComponent"].modalSelect({ fixedFilter: [["status", "==", "INICIADO"]] });
                if (selected) {
                    if ((_a = selected.metadados) === null || _a === void 0 ? void 0 : _a.suspenso) {
                        if (yield this.dialog.confirm("Demanda suspensa", "Para concluir é necessário primeiro reiniciar a demanda. Deseja reiniciar?")) {
                            this.go.navigate({ route: ['gestao', 'demanda', selected.id, 'pausar'], params: { reiniciar: true } }, {
                                modal: true,
                                modalClose: (modalResult) => {
                                    if (modalResult === null || modalResult === void 0 ? void 0 : modalResult.length)
                                        this.go.navigate({ route: ['gestao', 'demanda', selected.id, 'concluir'] }, { modal: true });
                                }
                            });
                        }
                    }
                    else {
                        this.go.navigate({ route: ['gestao', 'demanda', selected.id, 'concluir'] }, { modal: true });
                    }
                }
            }
        });
    }
    concluirEntrega() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let keys = yield this.execute("getProcessoKeys", []);
            if (keys) {
                this.go.navigate({ route: ['gestao', 'demanda', 'entrega', 'concluir'], params: { id_processo: keys.id_processo } }, { modal: true });
            }
        });
    }
    incluirEntrega() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let keys = yield this.execute("getSeiKeys", []);
            if (keys) {
                //const demanda = new DemandaListGridComponent(this.injector, new DemandaDaoService(this.injector));
                const selected = yield src_app_modules_gestao_demanda_demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_8__["DemandaListGridComponent"].modalSelect({ fixedFilter: [["status", "==", "NAOCONCLUIDO"]] });
                if (selected) {
                    const entrega = new src_app_models_demanda_entrega_model__WEBPACK_IMPORTED_MODULE_5__["DemandaEntrega"]();
                    entrega.id = this.dao.generateUuid();
                    entrega.usuario = this.auth.usuario;
                    entrega.usuario_id = this.auth.usuario.id;
                    entrega.demanda_id = selected.id || "";
                    entrega.comentarios = [];
                    entrega._status = "ADD";
                    this.go.navigate({ route: ['gestao', 'demanda', 'entrega'] }, { metadata: { entrega: entrega, demanda: selected, sei: keys }, modalClose: (modalResult) => {
                            if (modalResult) {
                                (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                                    try {
                                        const dao = this.injector.get(src_app_dao_demanda_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__["DemandaEntregaDaoService"]);
                                        this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                        yield dao.save(modalResult);
                                    }
                                    catch (error) {
                                        this.dialog.alert("Error", error.message ? error.message : error);
                                    }
                                    finally {
                                        this.dialog.closeSppinerOverlay();
                                    }
                                }))();
                            }
                        } });
                }
            }
        });
    }
    incluirDemandaProcessual(idProcesso, numeroProcesso, idDocumento, numeroDocumento) {
        this.go.navigate({ route: ["gestao", "demanda", "new"], params: {
                id_processo: idProcesso,
                numero_processo: numeroProcesso,
                id_requisicao: idDocumento,
                numero_requisicao: numeroDocumento
            } }, { modal: true });
    }
    gerarTermoAdesao() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //const plano = new PlanoListComponent(this.injector, new PlanoDaoService(this.injector));
            const selected = yield src_app_modules_gestao_plano_plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_7__["PlanoListComponent"].modalSelect();
            if (selected) {
                let processo = yield this.execute("getProcessoKeys", []);
                this.go.navigate({ route: ['gestao', 'plano', 'termo'] }, { metadata: { plano: selected, processo: processo }, modalClose: (modalResult) => {
                        var _a;
                        if ((_a = modalResult === null || modalResult === void 0 ? void 0 : modalResult.termo) === null || _a === void 0 ? void 0 : _a.length) {
                            (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                                this.dialog.showSppinerOverlay("Gerando documento no sei...");
                                try {
                                    const documentoSei = yield this.execute("incluirDocumento", [processo.id_processo, modalResult.codigo_tipo_documento]);
                                    if (documentoSei) {
                                        const dao = this.injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__["DocumentoDaoService"]);
                                        const documento = Object.assign(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_6__["Documento"](), {
                                            especie: "TERMO_ADESAO",
                                            conteudo: modalResult === null || modalResult === void 0 ? void 0 : modalResult.termo,
                                            id_processo: processo.id_processo,
                                            id_documento: documentoSei.id_documento,
                                            numero_processo: documentoSei.numero_processo,
                                            plano_id: selected.id,
                                            metadados: { atividades_termo_adesao: modalResult.atividades_termo_adesao },
                                            tipo_documento_id: modalResult.tipo_documento_id,
                                            status: "AGUARDANDO_SEI"
                                        });
                                        yield dao.save(documento);
                                        yield this.execute("recarregarArvore", [documentoSei.urlReload]);
                                        yield this.execute("abrirEditor", [documentoSei.urlEditor, documentoSei.idUser]);
                                    }
                                }
                                catch (error) {
                                    this.dialog.alert("Error", error.message ? error.message : error);
                                }
                                finally {
                                    this.dialog.closeSppinerOverlay();
                                }
                            }))();
                        }
                    } });
            }
        });
    }
    atualizarTiposDocumentos() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let tiposDocumentos = yield this.execute("getTiposDocumentos", []);
            if (yield this.tipoDocumentoDao.atualizar(tiposDocumentos)) {
                this.dialog.alert("Atualização", "Atualização realizada com sucesso!");
            }
            else {
                this.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
            }
        });
    }
}
ProcedimentoTrabalharComponent.ɵfac = function ProcedimentoTrabalharComponent_Factory(t) { return new (t || ProcedimentoTrabalharComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["Injector"])); };
ProcedimentoTrabalharComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: ProcedimentoTrabalharComponent, selectors: [["app-procedimento-trabalhar"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function ProcedimentoTrabalharComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "procedimento-trabalhar works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9jZWRpbWVudG8tdHJhYmFsaGFyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "YNw/":
/*!***********************************************!*\
  !*** ./src/app/listeners/listeners.module.ts ***!
  \***********************************************/
/*! exports provided: ListenersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListenersModule", function() { return ListenersModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _listeners_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listeners-routing.module */ "qeDe");
/* harmony import */ var _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./procedimento-trabalhar/procedimento-trabalhar.component */ "5ywm");
/* harmony import */ var _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedimento-escolher-tipo/procedimento-escolher-tipo.component */ "cLcK");
/* harmony import */ var _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor-montar/editor-montar.component */ "pvXA");
/* harmony import */ var _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./petrvs-listener/petrvs-listener.component */ "oVHM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class ListenersModule {
}
ListenersModule.ɵfac = function ListenersModule_Factory(t) { return new (t || ListenersModule)(); };
ListenersModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: ListenersModule });
ListenersModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _listeners_routing_module__WEBPACK_IMPORTED_MODULE_1__["ListenersRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ListenersModule, { declarations: [_procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_2__["ProcedimentoTrabalharComponent"],
        _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_3__["ProcedimentoEscolherTipoComponent"],
        _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_4__["EditorMontarComponent"],
        _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_5__["PetrvsListenerComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _listeners_routing_module__WEBPACK_IMPORTED_MODULE_1__["ListenersRoutingModule"]] }); })();


/***/ }),

/***/ "cLcK":
/*!**********************************************************************************************!*\
  !*** ./src/app/listeners/procedimento-escolher-tipo/procedimento-escolher-tipo.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: ProcedimentoEscolherTipoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcedimentoEscolherTipoComponent", function() { return ProcedimentoEscolherTipoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ "VW5Q");
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../listener-base */ "Cd0/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class ProcedimentoEscolherTipoComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_2__["ListenerBase"] {
    constructor(injector) {
        super(injector, "procedimento_escolher_tipo");
        this.injector = injector;
        this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoProcessoDaoService"]);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    loadToolbarButtons() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.gb.toolbarButtons = [{
                    icon: "bi bi-folder-check",
                    color: "btn-outline-primary",
                    hint: "Atualizar tipos de processos",
                    onClick: this.atualizarTiposProcessos.bind(this)
                }];
        });
    }
    atualizarTiposProcessos() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let tiposProcessos = yield this.execute("getTiposProcessos", []);
            if (yield this.tipoProcessoDao.atualizar(tiposProcessos)) {
                this.dialog.alert("Atualização", "Atualização realizada com sucesso!");
            }
            else {
                this.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
            }
        });
    }
}
ProcedimentoEscolherTipoComponent.ɵfac = function ProcedimentoEscolherTipoComponent_Factory(t) { return new (t || ProcedimentoEscolherTipoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"])); };
ProcedimentoEscolherTipoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ProcedimentoEscolherTipoComponent, selectors: [["app-procedimento-escolher-tipo"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function ProcedimentoEscolherTipoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "procedimento-escolher-tipo works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9jZWRpbWVudG8tZXNjb2xoZXItdGlwby5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "oVHM":
/*!************************************************************************!*\
  !*** ./src/app/listeners/petrvs-listener/petrvs-listener.component.ts ***!
  \************************************************************************/
/*! exports provided: PetrvsListenerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PetrvsListenerComponent", function() { return PetrvsListenerComponent; });
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../listener-base */ "Cd0/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PetrvsListenerComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_0__["ListenerBase"] {
    constructor(injector) {
        super(injector, "petrvs-listener");
        this.injector = injector;
    }
    ngOnInit() {
    }
}
PetrvsListenerComponent.ɵfac = function PetrvsListenerComponent_Factory(t) { return new (t || PetrvsListenerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PetrvsListenerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PetrvsListenerComponent, selectors: [["app-petrvs-listener"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function PetrvsListenerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "petrvs-listener works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwZXRydnMtbGlzdGVuZXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "pvXA":
/*!********************************************************************!*\
  !*** ./src/app/listeners/editor-montar/editor-montar.component.ts ***!
  \********************************************************************/
/*! exports provided: EditorMontarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorMontarComponent", function() { return EditorMontarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var _listener_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../listener-base */ "Cd0/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class EditorMontarComponent extends _listener_base__WEBPACK_IMPORTED_MODULE_3__["ListenerBase"] {
    constructor(injector) {
        super(injector, "editor-montar");
        this.injector = injector;
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["DocumentoDaoService"]);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    documentoPendenteSei(id_documento) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const documento = yield this.documentoDao.documentoPendenteSei(id_documento);
            if (documento) {
                const numero_documento = yield this.execute("setConteudoDocumento", [0, documento.conteudo]);
                if (numero_documento === null || numero_documento === void 0 ? void 0 : numero_documento.length) {
                    yield this.documentoDao.update(documento.id, {
                        status: src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_2__["Documento"].STATUS_GERADO,
                        numero_documento: numero_documento
                    });
                }
            }
        });
    }
    loadToolbarButtons(buttons) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.gb.toolbarButtons = [];
            /*if(buttons.includes("incluir")) {
              this.gb.toolbarButtons.push({
                icon: "bi bi-activity",
                color: "btn-outline-success",
                hint: "Incluir " + this.lex.noun("demanda"),
                onClick: this.incluirDemanda.bind(this)
              });
            } */
        });
    }
}
EditorMontarComponent.ɵfac = function EditorMontarComponent_Factory(t) { return new (t || EditorMontarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
EditorMontarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EditorMontarComponent, selectors: [["app-editor-montar"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function EditorMontarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "editor-montar works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0b3ItbW9udGFyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "qeDe":
/*!*******************************************************!*\
  !*** ./src/app/listeners/listeners-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: ListenersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListenersRoutingModule", function() { return ListenersRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor-montar/editor-montar.component */ "pvXA");
/* harmony import */ var _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./petrvs-listener/petrvs-listener.component */ "oVHM");
/* harmony import */ var _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./procedimento-escolher-tipo/procedimento-escolher-tipo.component */ "cLcK");
/* harmony import */ var _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./procedimento-trabalhar/procedimento-trabalhar.component */ "5ywm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: 'editor-montar', component: _editor_montar_editor_montar_component__WEBPACK_IMPORTED_MODULE_1__["EditorMontarComponent"] },
    { path: 'procedimento-trabalhar', component: _procedimento_trabalhar_procedimento_trabalhar_component__WEBPACK_IMPORTED_MODULE_4__["ProcedimentoTrabalharComponent"] },
    { path: 'procedimento-escolher-tipo', component: _procedimento_escolher_tipo_procedimento_escolher_tipo_component__WEBPACK_IMPORTED_MODULE_3__["ProcedimentoEscolherTipoComponent"] },
    { path: 'petrvs', component: _petrvs_listener_petrvs_listener_component__WEBPACK_IMPORTED_MODULE_2__["PetrvsListenerComponent"] }
];
class ListenersRoutingModule {
}
ListenersRoutingModule.ɵfac = function ListenersRoutingModule_Factory(t) { return new (t || ListenersRoutingModule)(); };
ListenersRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: ListenersRoutingModule });
ListenersRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ListenersRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=listeners-listeners-module.js.map