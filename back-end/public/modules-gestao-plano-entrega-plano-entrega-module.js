(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-plano-entrega-plano-entrega-module"],{

/***/ "2RcF":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-entrega-form/plano-entrega-entrega-form.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: PlanoEntregaEntregaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaEntregaFormComponent", function() { return PlanoEntregaEntregaFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PlanoEntregaEntregaFormComponent {
    constructor() { }
    ngOnInit() {
    }
}
PlanoEntregaEntregaFormComponent.ɵfac = function PlanoEntregaEntregaFormComponent_Factory(t) { return new (t || PlanoEntregaEntregaFormComponent)(); };
PlanoEntregaEntregaFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlanoEntregaEntregaFormComponent, selectors: [["app-plano-entrega-entrega-form"]], decls: 2, vars: 0, template: function PlanoEntregaEntregaFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "plano-entrega-entrega-form works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLWVudHJlZ2EtZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "GyWW":
/*!******************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-routing.module.ts ***!
  \******************************************************************************/
/*! exports provided: PlanoEntregaRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaRoutingModule", function() { return PlanoEntregaRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-entrega-list/plano-entrega-list.component */ "yeqo");
/* harmony import */ var _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-entrega-form/plano-entrega-form.component */ "T0qe");
/* harmony import */ var _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-entrega-list-entrega/plano-entrega-list-entrega.component */ "kPQ9");
/* harmony import */ var _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component */ "X9hI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoEntregaListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Plano de Entrega" } },
    { path: 'new', component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoEntregaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoEntregaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoEntregaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'entrega', component: _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__["PlanoEntregaListEntregaComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Entregas do Plano de Entrega" } },
    { path: 'entrega/objetivos/:objetivo_id', component: _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaMapaEntregasComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Entregas", modal: true } },
    { path: 'entrega/processos/:processo_id', component: _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaMapaEntregasComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Entregas", modal: true } },
];
class PlanoEntregaRoutingModule {
}
PlanoEntregaRoutingModule.ɵfac = function PlanoEntregaRoutingModule_Factory(t) { return new (t || PlanoEntregaRoutingModule)(); };
PlanoEntregaRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: PlanoEntregaRoutingModule });
PlanoEntregaRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PlanoEntregaRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "MoEX":
/*!***********************************************!*\
  !*** ./src/app/models/plano-entrega.model.ts ***!
  \***********************************************/
/*! exports provided: PlanoEntrega */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntrega", function() { return PlanoEntrega; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoEntrega extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.inicio = new Date(); // Data inicio do plano de entrega
        this.fim = null; // Data fim do plano de entrega
        this.nome = ""; // Nome do plano de entrega
        this.status = 'INCLUINDO'; // Status do plano de entrega
        this.metadados = undefined; // Campo virtual contendo informações calculadas pelo servidor
        this.unidade_id = '';
        this.plano_entrega_id = null;
        this.planejamento_id = null;
        this.cadeia_valor_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "PtyJ":
/*!**********************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega.module.ts ***!
  \**********************************************************************/
/*! exports provided: PlanoEntregaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaModule", function() { return PlanoEntregaModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-entrega-routing.module */ "GyWW");
/* harmony import */ var _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-entrega-list/plano-entrega-list.component */ "yeqo");
/* harmony import */ var _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-entrega-form/plano-entrega-form.component */ "T0qe");
/* harmony import */ var _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-entrega-list-entrega/plano-entrega-list-entrega.component */ "kPQ9");
/* harmony import */ var _plano_entrega_entrega_form_plano_entrega_entrega_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-entrega-entrega-form/plano-entrega-entrega-form.component */ "2RcF");
/* harmony import */ var _plano_entrega_entrega_list_plano_entrega_entrega_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-entrega-entrega-list/plano-entrega-entrega-list.component */ "oadE");
/* harmony import */ var _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component */ "X9hI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");










class PlanoEntregaModule {
}
PlanoEntregaModule.ɵfac = function PlanoEntregaModule_Factory(t) { return new (t || PlanoEntregaModule)(); };
PlanoEntregaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: PlanoEntregaModule });
PlanoEntregaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
            _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_2__["PlanoEntregaRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](PlanoEntregaModule, { declarations: [_plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoEntregaListComponent"],
        _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoEntregaFormComponent"],
        _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__["PlanoEntregaListEntregaComponent"],
        _plano_entrega_entrega_form_plano_entrega_entrega_form_component__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaEntregaFormComponent"],
        _plano_entrega_entrega_list_plano_entrega_entrega_list_component__WEBPACK_IMPORTED_MODULE_7__["PlanoEntregaEntregaListComponent"],
        _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_8__["PlanoEntregaMapaEntregasComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
        _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_2__["PlanoEntregaRoutingModule"]] }); })();


/***/ }),

/***/ "T0qe":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-form/plano-entrega-form.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: PlanoEntregaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaFormComponent", function() { return PlanoEntregaFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ "lKXT");
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ "DqQh");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ "YrS0");
/* harmony import */ var src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/plano-entrega.model */ "MoEX");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
























function PlanoEntregaFormComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "strong", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Entregas: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "badge", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const separator_r30 = ctx.separator;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("label", separator_r30 == null ? null : separator_r30.text);
} }
function PlanoEntregaFormComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r31 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r31.descricao + " / " + row_r31.cliente);
} }
function PlanoEntregaFormComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-text", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "input-text", 35);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
} }
function PlanoEntregaFormComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r33 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r7.dao.getDateFormatted(row_r33.dt_inicio) + " at\u00E9 " + ctx_r7.dao.getDateFormatted(row_r33.dt_fim), "");
} }
function PlanoEntregaFormComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-datetime", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "input-datetime", 37);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
} }
function PlanoEntregaFormComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r35 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r35.tipo_indicador);
} }
function PlanoEntregaFormComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-select", 38);
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("items", ctx_r13.lookup.TIPO_INDICADOR)("size", 6);
} }
function PlanoEntregaFormComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r37 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r37.meta);
} }
function PlanoEntregaFormComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-text", 39);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12);
} }
function PlanoEntregaFormComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r39 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r39.vl_realizado);
} }
function PlanoEntregaFormComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-text", 40);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
} }
function PlanoEntregaFormComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r41 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r41.objetivos);
} }
function PlanoEntregaFormComponent_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-search", 41);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
} }
function PlanoEntregaFormComponent_ng_template_48_i_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "i", 44);
} }
function PlanoEntregaFormComponent_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PlanoEntregaFormComponent_ng_template_48_i_1_Template, 1, 0, "i", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r43 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r43.concluido);
} }
function PlanoEntregaFormComponent_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-switch", 45);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12);
} }
class PlanoEntregaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__["PlanoEntrega"], src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__["PlanoEntregaDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            /*     if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                  result = "Obrigatório";
                }  */
            return result;
        };
        this.formValidation = (form) => {
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando ";
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["UnidadeDaoService"]);
        this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorDaoService"]);
        this.planejamentoInstitucionalDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoDaoService"]);
        this.planoEntregasEntregasDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaEntregaDaoService"]);
        this.join = [];
        this.modalWidth = 1200;
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            inicio: { default: new Date() },
            fim: { default: new Date() },
            status: { default: 'INCLUINDO' },
            unidade_id: { default: "" },
            plano_entrega_id: { default: null },
            planejamento_id: { default: null },
            cadeia_valor_id: { default: null },
            entregas: { default: [] },
        }, this.cdRef, this.validate);
        this.formEntregas = this.fh.FormBuilder({
            descricao: { default: "" },
            cliente: { default: "" },
            dt_inicio: { default: new Date() },
            dt_fim: { default: new Date() },
            tipo_indicador: { default: "" },
            meta: { default: "" },
            vl_realizado: { default: "" },
            objetivos: { default: "" },
            homologado: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
            this.cdRef.detectChanges();
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loadData(this.entity, this.form);
        });
    }
    saveData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.grid.confirm();
                let planoEntrega = this.util.fill(new src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__["PlanoEntrega"](), this.entity);
                planoEntrega = this.util.fillForm(planoEntrega, this.form.value);
                planoEntrega.entregas = this.grid.items;
                resolve(planoEntrega);
            });
        });
    }
    dynamicButtons(row) {
        let result = [];
        return result;
    }
    addEntrega() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_8__["PlanoEntregaEntrega"]({
                id: this.dao.generateUuid(),
                plano_entrega_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id
            });
        });
    }
    removeEntrega(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return true;
        });
    }
    loadEntrega(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.formEntregas.controls.descricao.setValue(row.descricao);
            this.formEntregas.controls.cliente.setValue(row.cliente);
            this.formEntregas.controls.dt_inicio.setValue(row.dt_inicio);
            this.formEntregas.controls.dt_fim.setValue(row.dt_fim);
            this.formEntregas.controls.tipo_indicador.setValue(row.tipo_indicador);
            this.formEntregas.controls.meta.setValue(row.meta);
            this.formEntregas.controls.vl_realizado.setValue(row.vl_realizado);
            this.formEntregas.controls.objetivos.setValue(row.objetivos);
            this.formEntregas.controls.homologado.setValue(row.homologado);
            this.cdRef.detectChanges();
        });
    }
    saveEntrega(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = undefined;
            this.form.markAllAsTouched();
            if (this.form.valid) {
                row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
                row.descricao = this.formEntregas.controls.descricao.value;
                row.dt_inicio = this.formEntregas.controls.dt_inicio.value;
                row.dt_fim = this.formEntregas.controls.dt_fim.value;
                row.tipo_indicador = this.formEntregas.controls.tipo_indicador.value;
                row.meta = this.formEntregas.controls.meta.value;
                row.vl_realizado = this.formEntregas.controls.vl_realizado.value;
                row.objetivos = this.formEntregas.controls.objetivos.value;
                row.homologado = this.formEntregas.controls.homologado.value;
                result = row;
                this.cdRef.detectChanges();
            }
            return result;
        });
    }
}
PlanoEntregaFormComponent.ɵfac = function PlanoEntregaFormComponent_Factory(t) { return new (t || PlanoEntregaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["Injector"])); };
PlanoEntregaFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: PlanoEntregaFormComponent, selectors: [["app-plano-entrega-form"]], viewQuery: function PlanoEntregaFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]], decls: 53, vars: 40, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size"], ["controlName", "unidade_id", 3, "size", "label", "dao"], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", 3, "size", "labelInfo"], ["date", "", "label", "Fim", "controlName", "fim", 3, "size", "labelInfo"], ["controlName", "planejamento_id", "label", "Selecione o Planejamento da Unidade Instituidora vinculado", 3, "size", "dao"], ["controlName", "cadeia_valor_id", "label", "Selecione a Cadeia de Valor vinculada", 3, "size", "dao"], ["editable", "", 3, "control", "form", "hasEdit", "hasDelete", "add", "load", "remove", "save", "groupTemplate"], ["groupEntregas", ""], [3, "title", "template", "editTemplate"], ["columnEntregaCliente", ""], ["editEntregaCliente", ""], ["columnDatas", ""], ["editDatas", ""], ["title", "Indicador", 3, "template", "editTemplate"], ["columnIndicador", ""], ["editIndicador", ""], ["title", "Meta Geral", 3, "template", "editTemplate"], ["columnMetaGeral", ""], ["editMetaGeral", ""], ["title", "Realizado", 3, "template", "editTemplate"], ["columnRealizado", ""], ["editRealizado", ""], ["title", "Objetivos/Processos/Atividades", 3, "template", "editTemplate"], ["columnObjetivod", ""], ["editObjetivos", ""], ["icon", "bi bi-check-lg", "titleHint", "Se a entrega foi homologada", 3, "template", "editTemplate"], ["columnHomologado", ""], ["editHomologado", ""], ["type", "options"], [1, "grid-group-text"], [1, "text-wrap"], ["color", "primary", 3, "label"], ["controlName", "descricao", 3, "size"], ["controlName", "cliente", 3, "size"], ["noIcon", "", "date", "", "controlName", "dt_inicio", 3, "size"], ["noIcon", "", "date", "", "controlName", "dt_fim", 3, "size"], ["controlName", "tipo_indicador", 3, "items", "size"], ["controlName", "meta", 3, "size"], ["controlName", "vl_realizado", 3, "size"], ["controlName", "objetivos", 3, "size"], [1, "text-center"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "bi", "bi-check-circle"], ["controlName", "homologado", 3, "size"]], template: function PlanoEntregaFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function PlanoEntregaFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanoEntregaFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-search", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "input-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "input-search", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "grid", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, PlanoEntregaFormComponent_ng_template_14_Template, 4, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, PlanoEntregaFormComponent_ng_template_18_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](20, PlanoEntregaFormComponent_ng_template_20_Template, 2, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](22, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](23, PlanoEntregaFormComponent_ng_template_23_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](25, PlanoEntregaFormComponent_ng_template_25_Template, 2, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](27, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, PlanoEntregaFormComponent_ng_template_28_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](30, PlanoEntregaFormComponent_ng_template_30_Template, 1, 2, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](33, PlanoEntregaFormComponent_ng_template_33_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](35, PlanoEntregaFormComponent_ng_template_35_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](37, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](38, PlanoEntregaFormComponent_ng_template_38_Template, 2, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](40, PlanoEntregaFormComponent_ng_template_40_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "column", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](43, PlanoEntregaFormComponent_ng_template_43_Template, 2, 1, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](45, PlanoEntregaFormComponent_ng_template_45_Template, 1, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](47, "column", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](48, PlanoEntregaFormComponent_ng_template_48_Template, 2, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](50, PlanoEntregaFormComponent_ng_template_50_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](52, "column", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](15);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](19);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](21);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](24);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](26);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](29);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](31);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](34);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](36);
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](39);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](41);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](44);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](46);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](49);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("label", ctx.lex.noun("Unidade"))("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("labelInfo", "In\u00EDcio " + ctx.lex.noun("Planejamento Institucional", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("labelInfo", "Fim " + ctx.lex.noun("Planejamento Institucional", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("dao", ctx.planejamentoInstitucionalDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("dao", ctx.cadeiaValorDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("control", ctx.form.controls.entregas)("form", ctx.formEntregas)("hasEdit", true)("hasDelete", true)("add", ctx.addEntrega.bind(ctx))("load", ctx.loadEntrega.bind(ctx))("remove", ctx.removeEntrega.bind(ctx))("save", ctx.saveEntrega.bind(ctx))("groupTemplate", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", "Entrega/\nCliente")("template", _r2)("editTemplate", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", "Data In\u00EDcio/\nData Fim")("template", _r6)("editTemplate", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r10)("editTemplate", _r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r14)("editTemplate", _r16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r18)("editTemplate", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r22)("editTemplate", _r24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r26)("editTemplate", _r28);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__["InputDatetimeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__["SeparatorComponent"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__["ColumnComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__["BadgeComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgIf"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_21__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "X9hI":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: PlanoEntregaMapaEntregasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaMapaEntregasComponent", function() { return PlanoEntregaMapaEntregasComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/entrega-dao.service */ "724m");
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ "DqQh");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ "YrS0");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../plano-entrega.service */ "zX2r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ "1JHj");
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ "uSqO");




















const _c0 = ["unidade"];
function PlanoEntregaMapaEntregasComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Data:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Cliente:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "badge", 16);
} if (rf & 2) {
    const row_r8 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r3.util.getDateFormatted(row_r8.inicio), " - ", ctx_r3.util.getDateFormatted(row_r8.fim), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r8.cliente, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r8.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", row_r8.plano_entrega.unidade.sigla)("hint", ctx_r3.lex.noun("plano de entrega"));
} }
function PlanoEntregaMapaEntregasComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h5", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Meta");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "h2", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r5.entregaService.getValorMeta(row_r9));
} }
function PlanoEntregaMapaEntregasComponent_ng_template_18_h2_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h2", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Regular");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PlanoEntregaMapaEntregasComponent_ng_template_18_progress_bar_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "progress-bar", 28);
} if (rf & 2) {
    const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", row_r10.realizado.porcentagem);
} }
function PlanoEntregaMapaEntregasComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h5", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Realizado");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, PlanoEntregaMapaEntregasComponent_ng_template_18_h2_5_Template, 2, 0, "h2", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, PlanoEntregaMapaEntregasComponent_ng_template_18_progress_bar_6_Template, 1, 1, "progress-bar", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "action-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r10 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r7.entregaService.isPorcentagem(row_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.entregaService.isPorcentagem(row_r10));
} }
class PlanoEntregaMapaEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__["PlanoEntregaEntrega"], src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanoEntregaEntregaDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (this.objetivoId)
                result.push(["objetivos.objetivo_id", "==", this.objetivoId]);
            if (this.processoId)
                result.push(["processos.processo_id", "==", this.processoId]);
            if (form.unidade_id)
                result.push(["plano_entrega.unidade_id", "==", form.unidade_id]);
            if (form.entrega_id)
                result.push(["entrega_id", "==", form.entrega_id]);
            if (form.inicio)
                result.push(["data_inicio", ">=", form.inicio]);
            if (form.fim)
                result.push(["data_fim", "<=", form.fim]);
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.entregaDao = injector.get(src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__["EntregaDaoService"]);
        this.entregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaService"]);
        /* Inicializações */
        this.title = this.lex.noun("Entrega", true);
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: null },
            entrega_id: { default: null },
            inicio: { default: null },
            fim: { default: null }
        });
        this.join = [];
    }
    ngOnInit() {
        super.ngOnInit();
        this.objetivoId = this.urlParams.get("objetivo_id") || undefined;
        this.processoId = this.urlParams.get("processo_id") || undefined;
    }
    filterClear(filter) {
        filter.controls.unidade_id.setValue(null);
        filter.controls.entrega_id.setValue(null);
        filter.controls.inicio.setValue(null);
        filter.controls.fim.setValue(null);
        super.filterClear(filter);
    }
}
PlanoEntregaMapaEntregasComponent.ɵfac = function PlanoEntregaMapaEntregasComponent_Factory(t) { return new (t || PlanoEntregaMapaEntregasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanoEntregaMapaEntregasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanoEntregaMapaEntregasComponent, selectors: [["plano-entrega-mapa-entregas"]], viewQuery: function PlanoEntregaMapaEntregasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 21, vars: 22, consts: [["noHeader", "", 3, "dao", "title", "orderBy", "join"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["controlName", "entrega_id", 3, "size", "dao"], ["entrega", ""], ["date", "", "noIcon", "", "label", "In\u00EDcio", "controlName", "inicio", "labelInfo", "Data de in\u00EDcio do planejamento institucional", 3, "size", "control"], ["date", "", "noIcon", "", "label", "Fim", "controlName", "fim", "labelInfo", "Data do fim do planejamento institucional", 3, "size", "control"], ["title", "Entrega", 3, "template"], ["columnEntrega", ""], ["title", "Meta", 3, "template"], ["columnMeta", ""], ["title", "Realizado", 3, "template"], ["columnRealizado", ""], [3, "rows"], ["icon", "bi bi-list-columns-reverse", "color", "light", 3, "label", "hint"], [1, "meta", "h-100"], [1, "card", "h-100"], [1, "card-body"], [1, "card-title"], [1, "text-primary"], [1, "realizado", "h-100"], ["class", "text-secondary", 4, "ngIf"], ["color", "success", 3, "value", 4, "ngIf"], [1, "card-footer", "p-0"], ["icon", "bi bi-card-checklist"], [1, "text-secondary"], ["color", "success", 3, "value"]], template: function PlanoEntregaMapaEntregasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, PlanoEntregaMapaEntregasComponent_ng_template_12_Template, 11, 6, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, PlanoEntregaMapaEntregasComponent_ng_template_15_Template, 7, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, PlanoEntregaMapaEntregasComponent_ng_template_18_Template, 9, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "pagination", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](13);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](16);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("join", ctx.join);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("dao", ctx.entregaDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__["ToolbarComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__["PaginationComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__["BadgeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_17__["ActionButtonComponent"], _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__["ProgressBarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLW1hcGEtZW50cmVnYXMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "YrS0":
/*!*******************************************************!*\
  !*** ./src/app/models/plano-entrega-entrega.model.ts ***!
  \*******************************************************/
/*! exports provided: PlanoEntregaEntrega */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaEntrega", function() { return PlanoEntregaEntrega; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoEntregaEntrega extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.inicio = new Date();
        this.fim = null;
        this.descricao = "";
        this.cliente = "";
        this.homologado = false;
        this.meta = {};
        this.realizado = {};
        this.plano_entrega_id = null;
        this.entrega_id = '';
        this.entrega_pai_id = '';
        this.initialization(data);
    }
}


/***/ }),

/***/ "kPQ9":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list-entrega/plano-entrega-list-entrega.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: PlanoEntregaListEntregaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaListEntregaComponent", function() { return PlanoEntregaListEntregaComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ "DqQh");
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ "YrS0");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");









function PlanoEntregaListEntregaComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r8 = ctx.row;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.dao.getDateFormatted(row_r8.inicio), "");
} }
function PlanoEntregaListEntregaComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r3.dao.getDateFormatted(row_r9.fim), "");
} }
function PlanoEntregaListEntregaComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", row_r10.descricao || "", "");
} }
function PlanoEntregaListEntregaComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", row_r11.cliente || "", "");
} }
class PlanoEntregaListEntregaComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_2__["PlanoEntregaEntrega"], src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__["PlanoEntregaEntregaDaoService"]);
        this.injector = injector;
        this.planoEntregaId = "";
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["plano_entrega_id", "==", this.planoEntregaId]);
            return result;
        };
        this.title = this.lex.noun("Entrega");
        this.code = "MOD_PENT_CONS";
        this.filter = this.fh.FormBuilder({
            plano_entrega_id: { default: null },
        });
        // Testa se o usuário possui permissão para exibir planos de entrega
        if (this.auth.hasPermissionTo("MOD_PENT_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir planos de entrega
        if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.planoEntregaId = this.urlParams.get("id") || "";
    }
}
PlanoEntregaListEntregaComponent.ɵfac = function PlanoEntregaListEntregaComponent_Factory(t) { return new (t || PlanoEntregaListEntregaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
PlanoEntregaListEntregaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: PlanoEntregaListEntregaComponent, selectors: [["app-plano-entrega-list-entrega"]], viewQuery: function PlanoEntregaListEntregaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 8, consts: [[3, "dao", "title", "selectable", "select"], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["title", "Cliente", 3, "template"], ["columnCliente", ""], [3, "rows"]], template: function PlanoEntregaListEntregaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function PlanoEntregaListEntregaComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "column", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, PlanoEntregaListEntregaComponent_ng_template_3_Template, 2, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, PlanoEntregaListEntregaComponent_ng_template_6_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, PlanoEntregaListEntregaComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, PlanoEntregaListEntregaComponent_ng_template_12_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "pagination", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](4);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](7);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](10);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title)("selectable", ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_7__["PaginationComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLWxpc3QtZW50cmVnYS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "oadE":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-entrega-list/plano-entrega-entrega-list.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: PlanoEntregaEntregaListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaEntregaListComponent", function() { return PlanoEntregaEntregaListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PlanoEntregaEntregaListComponent {
    constructor() { }
    ngOnInit() {
    }
}
PlanoEntregaEntregaListComponent.ɵfac = function PlanoEntregaEntregaListComponent_Factory(t) { return new (t || PlanoEntregaEntregaListComponent)(); };
PlanoEntregaEntregaListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlanoEntregaEntregaListComponent, selectors: [["plano-entrega-entrega-list"]], decls: 2, vars: 0, template: function PlanoEntregaEntregaListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "plano-entrega-entrega-list works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLWVudHJlZ2EtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "yeqo":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list/plano-entrega-list.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: PlanoEntregaListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaListComponent", function() { return PlanoEntregaListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ "lKXT");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/plano-entrega.model */ "MoEX");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");



















function PlanoEntregaListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "input-switch", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function PlanoEntregaListComponent_toolbar_1_Template_input_switch_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r16.onAgruparChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx_r0.filter.controls.agrupar);
} }
function PlanoEntregaListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("#", row_r18.numero, "");
} }
function PlanoEntregaListComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r19 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r7.dao.getDateFormatted(row_r19.inicio), "");
} }
function PlanoEntregaListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r9.dao.getDateFormatted(row_r20.fim), "");
} }
function PlanoEntregaListComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Planejamento Institucional");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " Cadeia de Valor ");
} }
function PlanoEntregaListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r22 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r22.planejamento == null ? null : row_r22.planejamento.nome) || "-", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r22.cadeiaValor == null ? null : row_r22.cadeiaValor.nome) || "-", "");
} }
function PlanoEntregaListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r23.status || "", "");
} }
class PlanoEntregaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_5__["PlanoEntrega"], src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanoEntregaDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a;
            let result = [];
            let form = filter.value;
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            if (form.inicio) {
                result.push(["inicio", ">=", form.inicio]);
            }
            if (form.fim) {
                result.push(["fim", "<=", form.fim]);
            }
            if (form.unidade_id) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.planejamento_id) {
                result.push(["planejamento_id", "==", form.planejamento_id]);
            }
            if (form.cadeia_valor_id) {
                result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
            }
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
        this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun('Plano de Entrega', true);
        this.filter = this.fh.FormBuilder({
            agrupar: { default: true },
            nome: { default: '' },
            inicio: { default: '' },
            fim: { default: '' },
            //status: {default: ''},
            unidade_id: { default: null },
            planejamento_id: { default: null },
            cadeia_valor_id: { default: null },
        });
        this.join = ['planejamento:id,nome', 'cadeiaValor:id,nome', 'unidade:id,sigla'];
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
        // Testa se o usuário possui permissão para exibir planos de entrega
        /*     if (this.auth.hasPermissionTo("MOD_PENT_CONS")) {
              this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
              });
            } */
        // Testa se o usuário possui permissão para excluir planos de entrega
        /*     if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) {
              this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
              });
            } */
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.inicio.setValue(null);
        filter.controls.fim.setValue(null);
        //filter.controls.status.setValue("");
        filter.controls.unidade_id.setValue(null);
        filter.controls.planejamento_id.setValue(null);
        filter.controls.cadeia_valor_id.setValue(null);
        super.filterClear(filter);
    }
    /*   public dynamicOptions(row: any): ToolbarButton[] {
        //let result: ToolbarButton[] = [];
        //let planoEntrega: PlanoEntrega = row as PlanoEntrega;
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
        const BOTAO_ALTERAR = { label: "Editar", icon: "bi bi-pencil-square", onClick: this.edit.bind(this) };
        const BOTAO_EXCLUIR = { label: "Excluir Plano", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        //const BOTAO_ENTREGAS = { hint: "Entregas", icon: "bi bi-pen", onClick: this.editarEntregas.bind(this) };
        const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-file-earmark-check", onClick: this.homologar.bind(this) };
        if (this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push(BOTAO_INFORMACOES);
        if (this.auth.hasPermissionTo('MOD_PENT_EDT')) result.push(BOTAO_ALTERAR);
        if (this.auth.hasPermissionTo("MOD_PENT_EXCL")) result.push(BOTAO_EXCLUIR);
        if (this.dao?.needHomologate(planoEntrega)) result.push(BOTAO_HOMOLOGAR);
        return result;
      } */
    onAgruparChange(event) {
        var _a, _b;
        const agrupar = this.filter.controls.agrupar.value;
        if ((agrupar && !((_a = this.groupBy) === null || _a === void 0 ? void 0 : _a.length)) || (!agrupar && ((_b = this.groupBy) === null || _b === void 0 ? void 0 : _b.length))) {
            this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
            this.grid.reloadFilter();
        }
    }
    dynamicButtons(row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let result = [];
        let planoEntrega = row;
        const isGestor = ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id) == ((_b = planoEntrega.unidade) === null || _b === void 0 ? void 0 : _b.gestor_id) || ((_c = this.auth.usuario) === null || _c === void 0 ? void 0 : _c.id) == ((_d = planoEntrega.unidade) === null || _d === void 0 ? void 0 : _d.gestor_substituto_id);
        const BOTAO_LIBERAR_HOMOLOGACAO = { label: "Liberar para homologação", icon: "bi bi-skip-end-circle", onClick: this.liberarHomologacao.bind(this) };
        const BOTAO_HOMOLOGAR = { label: "Homologar", icon: "bi bi-check-circle", onClick: this.homologar.bind(this) };
        const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
        const BOTAO_CONCLUIR = { label: "Concluir", id: "CONCLUIDO", icon: "bi bi-check-circle", onClick: this.concluir.bind(this) };
        const BOTAO_CANCELAR_CONCLUSAO = { label: "Cancelar conclusão", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) };
        const BOTAO_AVALIAR = { label: "Avaliar", icon: "bi bi-star-half", onClick: this.avaliar.bind(this) };
        const BOTAO_REATIVAR = { label: "Reativar", icon: "bi bi-stickies", onClick: this.reativar.bind(this) };
        const BOTAO_CANCELAR_AVALIACAO = { label: "Cancelar avaliação", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) };
        const BOTAO_CONSULTAR = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
        if (((_e = planoEntrega.metadados) === null || _e === void 0 ? void 0 : _e.incluindo) && this.auth.hasPermissionTo("MOD_PENT_LIB_HOMOL")) {
            result.push(BOTAO_LIBERAR_HOMOLOGACAO);
        }
        else if ((_f = planoEntrega.metadados) === null || _f === void 0 ? void 0 : _f.homologando) {
            if (isGestor)
                result.push(BOTAO_HOMOLOGAR);
            else {
                this.auth.hasPermissionTo("MOD_PENT_EDT") ? result.push(BOTAO_ALTERAR) : result.push(BOTAO_CONSULTAR);
            }
            ;
        }
        else if (((_g = planoEntrega.metadados) === null || _g === void 0 ? void 0 : _g.ativo) && this.auth.hasPermissionTo("MOD_PENT_CONCLUIR")) {
            result.push(BOTAO_CONCLUIR);
        }
        else if ((_h = planoEntrega.metadados) === null || _h === void 0 ? void 0 : _h.concluido) {
            if (isGestor)
                result.push(BOTAO_AVALIAR);
            else {
                this.auth.hasPermissionTo("MOD_PENT_CANC_CONCL") ? result.push(BOTAO_CANCELAR_CONCLUSAO) : result.push(BOTAO_CONSULTAR);
            }
            ;
        }
        else if ((_j = planoEntrega.metadados) === null || _j === void 0 ? void 0 : _j.suspenso) {
            this.auth.hasPermissionTo("MOD_PENT_REATIVAR") ? result.push(BOTAO_REATIVAR) : result.push(BOTAO_CONSULTAR);
        }
        else if ((_k = planoEntrega.metadados) === null || _k === void 0 ? void 0 : _k.avaliado) {
            if (isGestor)
                result.push(BOTAO_CANCELAR_AVALIACAO);
            else
                result.push(BOTAO_CONSULTAR);
        }
        return result;
    }
    dynamicOptions(row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let result = [];
        let planoEntrega = row;
        const isGestor = ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id) == ((_b = planoEntrega.unidade) === null || _b === void 0 ? void 0 : _b.gestor_id) || ((_c = this.auth.usuario) === null || _c === void 0 ? void 0 : _c.id) == ((_d = planoEntrega.unidade) === null || _d === void 0 ? void 0 : _d.gestor_substituto_id);
        const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", onClick: (planoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit'] }, this.modalRefreshId(planoEntrega)) };
        const BOTAO_EXCLUIR = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        const BOTAO_SUSPENDER = { label: "Suspender", id: "PAUSADO", icon: "bi bi-pause-circle", onClick: (planoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'suspender'] }, this.modalRefreshId(planoEntrega)) };
        const BOTAO_RETIRAR_HOMOLOGACAO = { label: "Retirar de homologação", icon: "bi bi-backspace", onClick: this.retirarHomologacao.bind(this) };
        const BOTAO_CANCELAR_HOMOLOGACAO = { label: "Cancelar homologação", icon: "bi bi-check-all", onClick: this.cancelarHomologacao.bind(this) };
        const BOTAO_ARQUIVAR = { label: "Arquivar", icon: "bi bi-inboxes", onClick: this.arquivar.bind(this) };
        const BOTAO_DESARQUIVAR = { label: "Desarquivar", icon: "bi bi-reply", onClick: this.desarquivar.bind(this) };
        const BOTAO_CONSULTAR = { label: "Informações", icon: "bi bi-info-circle", onClick: (planoEntrega) => this.go.navigate({ route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult'] }, { modal: true }) };
        result.push(BOTAO_CONSULTAR);
        if (this.auth.hasPermissionTo("MOD_PENT_EXCL"))
            result.push(BOTAO_EXCLUIR);
        if ((_e = planoEntrega.metadados) === null || _e === void 0 ? void 0 : _e.arquivado) {
            if (this.auth.hasPermissionTo("MOD_PENT_DESARQ"))
                result.push(BOTAO_DESARQUIVAR);
        }
        else if ((_f = planoEntrega.metadados) === null || _f === void 0 ? void 0 : _f.incluindo) {
            if (this.auth.hasPermissionTo("MOD_PENT_EDT"))
                result.push(BOTAO_ALTERAR);
        }
        else if ((_g = planoEntrega.metadados) === null || _g === void 0 ? void 0 : _g.homologando) {
            if (this.auth.hasPermissionTo("MOD_PENT_RET_HOMOL"))
                result.push(BOTAO_RETIRAR_HOMOLOGACAO);
        }
        else if ((_h = planoEntrega.metadados) === null || _h === void 0 ? void 0 : _h.ativo) {
            if (this.auth.hasPermissionTo("MOD_PENT_SUSP"))
                result.push(BOTAO_SUSPENDER);
            if (isGestor)
                result.push(BOTAO_CANCELAR_HOMOLOGACAO);
        }
        else if ((_j = planoEntrega.metadados) === null || _j === void 0 ? void 0 : _j.avaliado) {
            if (!((_k = planoEntrega.metadados) === null || _k === void 0 ? void 0 : _k.arquivado) && this.auth.hasPermissionTo("MOD_PENT_ARQ"))
                result.push(BOTAO_ARQUIVAR);
        }
        return result;
    }
    homologar(planoEntrega) {
        const self = this;
        this.dao.homologar(planoEntrega.id).then(function () {
            var _a;
            (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
            self.dialog.alert("Sucesso", "Homologado com sucesso!");
        }).catch(function (error) {
            self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
        });
    }
    concluir(planoEntrega) {
        const self = this;
        this.dao.concluir(planoEntrega.id).then(function () {
            var _a;
            (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
            self.dialog.alert("Sucesso", "Concluído com sucesso!");
        }).catch(function (error) {
            self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
        });
    }
    avaliar(planoEntrega) {
        const self = this;
        this.dao.avaliar(planoEntrega.id).then(function () {
            var _a;
            (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
            self.dialog.alert("Sucesso", "Avaliado com sucesso!");
        }).catch(function (error) {
            self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
        });
    }
    reativar(planoEntrega) {
        const self = this;
        this.dao.reativar(planoEntrega.id).then(function () {
            var _a;
            (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
            self.dialog.alert("Sucesso", "Reativado com sucesso!");
        }).catch(function (error) {
            self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
        });
    }
    liberarHomologacao(planoEntrega) {
        const self = this;
        this.dialog.confirm("Liberar para homologação ?", "Deseja realmente liberar para a homologação?").then(confirm => {
            if (confirm) {
                this.dao.liberarHomologacao(planoEntrega.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
                    self.dialog.alert("Sucesso", "Liberado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    retirarHomologacao(planoEntrega) {
        const self = this;
        this.dialog.confirm("Retirar da homologação ?", "Deseja realmente retirar da homologação?").then(confirm => {
            if (confirm) {
                this.dao.retirarHomologacao(planoEntrega.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
                    self.dialog.alert("Sucesso", "Retirado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    cancelarHomologacao(planoEntrega) {
        const self = this;
        this.dialog.confirm("Cancelar homologacao ?", "Deseja realmente cancelar a homologacao?").then(confirm => {
            if (confirm) {
                this.dao.cancelarHomologacao(planoEntrega.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    arquivar(planoEntrega) {
        this.dialog.confirm("Arquivar?", "Deseja realmente arquivar o Plano de Entregas?").then(confirm => {
            if (confirm) {
                this.dao.arquivar(planoEntrega.id, true).then(() => {
                    var _a, _b, _c;
                    if ((_b = (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.arquivadas) === null || _b === void 0 ? void 0 : _b.value) {
                        this.grid.query.refreshId(planoEntrega.id);
                    }
                    else {
                        (((_c = this.grid) === null || _c === void 0 ? void 0 : _c.query) || this.query).removeId(planoEntrega.id);
                    }
                }).catch(error => this.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined));
            }
        });
    }
    desarquivar(planoEntrega) {
        this.dao.arquivar(planoEntrega.id, false).then(() => {
            this.grid.query.refreshId(planoEntrega.id);
        }).catch(error => this.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined));
    }
    cancelarConclusao(planoEntrega) {
        const self = this;
        this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
            if (confirm) {
                this.dao.cancelarConclusao(planoEntrega.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    cancelarAvaliacao(planoEntrega) {
        const self = this;
        this.dialog.confirm("Cancelar avaliacao ?", "Deseja realmente cancelar a avaliação?").then(confirm => {
            if (confirm) {
                this.dao.cancelarAvaliacao(planoEntrega.id).then(function () {
                    var _a;
                    (((_a = self.grid) === null || _a === void 0 ? void 0 : _a.query) || self.query).refreshId(planoEntrega.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
}
PlanoEntregaListComponent.ɵfac = function PlanoEntregaListComponent_Factory(t) { return new (t || PlanoEntregaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanoEntregaListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanoEntregaListComponent, selectors: [["app-plano-entrega-list"]], viewQuery: function PlanoEntregaListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 35, vars: 40, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control", "placeholder"], ["controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["controlName", "planejamento_id", 3, "size", "dao"], ["planejamento", ""], ["controlName", "cadeia_valor_id", 3, "size", "dao"], ["cadeiaValor", ""], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "controlName", "fim", 3, "size", "control", "labelInfo"], ["title", "Nr.", "orderBy", "numero", "align", "center", 3, "template"], ["columnNumero", ""], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "In\u00EDcio", "orderBy", "inicio", 3, "template"], ["columnInicio", ""], ["title", "Fim", "orderBy", "fim", 3, "template"], ["columnFim", ""], [3, "titleTemplate", "template"], ["titlePlanoCadeia", ""], ["columnPlanoCadeia", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "dynamicOptions", "dynamicButtons"], [3, "rows"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"]], template: function PlanoEntregaListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function PlanoEntregaListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, PlanoEntregaListComponent_toolbar_1_Template, 2, 2, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "input-datetime", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "input-datetime", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, PlanoEntregaListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, PlanoEntregaListComponent_ng_template_20_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](23, PlanoEntregaListComponent_ng_template_23_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](26, PlanoEntregaListComponent_ng_template_26_Template, 3, 0, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](28, PlanoEntregaListComponent_ng_template_28_Template, 5, 2, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "column", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](31, PlanoEntregaListComponent_ng_template_31_Template, 2, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](33, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](34, "pagination", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](17);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](21);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](24);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](29);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PENT_INCL"))("hasEdit", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.nome)("placeholder", "Nome do " + ctx.lex.noun("plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("dao", ctx.planejamentoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("dao", ctx.cadeiaValorDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.inicio)("labelInfo", "Data de in\u00EDcio do " + ctx.lex.noun("plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.fim)("labelInfo", "Data do fim do " + ctx.lex.noun("plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("titleTemplate", _r10)("template", _r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dynamicOptions", ctx.dynamicOptions.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1lbnRyZWdhLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "zX2r":
/*!***********************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega.service.ts ***!
  \***********************************************************************/
/*! exports provided: PlanoEntregaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaService", function() { return PlanoEntregaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/lookup.service */ "/MTl");


class PlanoEntregaService {
    constructor(lookup) {
        this.lookup = lookup;
    }
    getValorMeta(entrega) {
        var _a;
        let result = "";
        switch ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) {
            case "PORCENTAGEM":
                entrega.meta.porcentagem + " %";
                break;
            case "QUALITATIVO":
                entrega.meta.quantitativo;
                break;
            case "VALOR":
                entrega.meta.valor;
                break;
            case "QUALITATIVO":
                this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.meta.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    getValorRealizado(entrega) {
        var _a;
        let result = "";
        switch ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) {
            case "PORCENTAGEM":
                entrega.realizado.porcentagem + " %";
                break;
            case "QUALITATIVO":
                entrega.realizado.quantitativo;
                break;
            case "VALOR":
                entrega.realizado.valor;
                break;
            case "QUALITATIVO":
                this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.realizado.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    isPorcentagem(entrega) {
        var _a;
        return ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) == "PORCENTAGEM";
    }
}
PlanoEntregaService.ɵfac = function PlanoEntregaService_Factory(t) { return new (t || PlanoEntregaService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_1__["LookupService"])); };
PlanoEntregaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PlanoEntregaService, factory: PlanoEntregaService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-plano-entrega-plano-entrega-module.js.map