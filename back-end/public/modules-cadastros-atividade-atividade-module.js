(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-atividade-atividade-module"],{

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
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-md5/dist/md5 */ "kScs");
/* harmony import */ var ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__);


class Atividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.observacoes = null; /* Observação sobre o afastamento */
        this.inicio_afastamento = new Date(); /* Inicio do afastamento  */
        this.nome = ""; //Nome da classe de atividade
        this.tempo_pactuado = 48; //Tempo previsto para a execução da atividade
        this.dias_planejado = 0; //Tempo em dias previsto para a atividade
        this.tempo_minimo = 20; //Tempo despendido mínimo aceitável para a atividade (% do tempo pactuado)
        this.recalcula_prazo = 0; //Recalcular o prazo de entrega depois de iniciada a demanda
        this.desativa_produtividade = 0; //Desativar o cálculo de produtividade e controle de tempo de execução (para atividades do tipo monitoramento)
        this.complexidade = [
            { id: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__["Md5"].hashStr(Math.random().toString()), grau: "Muito baixo", fator: 0.25, tempo: 2, padrao: false },
            { id: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__["Md5"].hashStr(Math.random().toString()), grau: "Baixo", fator: 0.5, tempo: 4, padrao: false },
            { id: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__["Md5"].hashStr(Math.random().toString()), grau: "Médio", fator: 1, tempo: 8, padrao: true },
            { id: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__["Md5"].hashStr(Math.random().toString()), grau: "Alto", fator: 2, tempo: 16, padrao: false },
            { id: ts_md5_dist_md5__WEBPACK_IMPORTED_MODULE_1__["Md5"].hashStr(Math.random().toString()), grau: "Muito alto", fator: 4, tempo: 32, padrao: false }
        ]; //Graus de complexidade da atividade (complexidade, fator, tempo_pactuado, default)
        //public tipo_processo_id: string = ""; //Configuração predefinidos de tipos associados de processos do Sei
        this.tipos_processo = []; //Configuração predefinidos de tipos associados de processos do Sei
        this.etiquetas_predefinidas = []; //Nome das etiquetas predefinidas para a demanda
        this.checklist_predefinidos = []; //Nome dos checklist predefinidas para a demanda
        this.comentario_predefinido = ""; //Comentário predefinido para a demanda
        this.parametros_adotados = []; //Parametros adotados para definir a entrega da atividade (textual, para cumprir a IN65/2020-ME)
        this.entregas_esperadas = []; //Quais as entregas esperadas (textual, para cumprir a IN65/2020-ME)
        this.homologado = 0; //Se a atividade foi homologada pela unidade gestora do teletrabalho
        this.data_homologacao = new Date(); //Data em que houve a homologação
        this.data_inicio = new Date(); //Data inicio da vigência
        this.data_fim = null; //Data final da vigência
        this.unidade_id = "";
        this.tipo_atividade_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "16YT":
/*!*************************************************************************!*\
  !*** ./src/app/modules/cadastros/atividade/atividade-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: AtividadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeRoutingModule", function() { return AtividadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ "t/Fq");
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ "FyQ1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_4__["AtividadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Atividade" } },
    { path: 'new', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Consultar", modal: true } }
];
class AtividadeRoutingModule {
}
AtividadeRoutingModule.ɵfac = function AtividadeRoutingModule_Factory(t) { return new (t || AtividadeRoutingModule)(); };
AtividadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AtividadeRoutingModule });
AtividadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AtividadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "FyQ1":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/cadastros/atividade/atividade-list/atividade-list.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AtividadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeListComponent", function() { return AtividadeListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/report/report.component */ "4Ttn");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");























const _c0 = ["homologacaoAtividades"];
function AtividadeListComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "top-alert", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "input-datetime", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx_r1.formHomologacao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("message", ctx_r1.grid.multiselectedCount + " " + ctx_r1.lex.noun("atividade", true) + " ser\u00E3o homologadas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx_r1.formHomologacao.controls.data_homologacao);
} }
function AtividadeListComponent_toolbar_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "toolbar");
} }
function AtividadeListComponent_ng_template_14_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r40.tipo_atividade.nome, " ");
} }
function AtividadeListComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, AtividadeListComponent_ng_template_14_span_2_Template, 3, 1, "span", 49);
} if (rf & 2) {
    const row_r40 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r40.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r40.tipo_atividade);
} }
function AtividadeListComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r43 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r43.homologado == 1 ? "Sim" + " (" + ctx_r6.dao.getDateFormatted(row_r43.data_homologacao) + ")" : "N\u00E3o", "");
} }
function AtividadeListComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r44 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r44.unidade.nome, "");
} }
const _c1 = function () { return []; };
function AtividadeListComponent_column_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "column", 52);
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("options", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](3, _c1))("dynamicOptions", ctx_r9.dynamicOptions.bind(ctx_r9))("dynamicButtons", ctx_r9.dynamicButtons.bind(ctx_r9));
} }
function AtividadeListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r45 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r45.nome);
} }
function AtividadeListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r46 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r46.tempo_pactuado);
} }
function AtividadeListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r47 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r47.dias_planejado);
} }
function AtividadeListComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r48 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r48.tempo_minimo);
} }
function AtividadeListComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r49 = ctx.row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r19.lookup.getValue(ctx_r19.lookup.SIMNAO, row_r49.desativa_produtividade));
} }
function AtividadeListComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r50 = ctx.row;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r21.getReportComplexidade(row_r50));
} }
function AtividadeListComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r51 = ctx.row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r23.getReportEtiquetas(row_r51));
} }
function AtividadeListComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r52 = ctx.row;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r25.getReportChecklist(row_r52));
} }
function AtividadeListComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r53 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r53.comentario_predefinido);
} }
function AtividadeListComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r54 = ctx.row;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r29.lookup.getValue(ctx_r29.lookup.SIMNAO, row_r54.homologado));
} }
function AtividadeListComponent_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r55 = ctx.row;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r31.util.getDateTimeFormatted(row_r55.data_homologacao));
} }
function AtividadeListComponent_ng_template_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r56 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r56.tipo_atividade == null ? null : row_r56.tipo_atividade.nome);
} }
function AtividadeListComponent_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r57.unidade ? row_r57.unidade.sigla + " - " + row_r57.unidade.nome : "");
} }
function AtividadeListComponent_ng_template_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r58 = ctx.row;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r37.getReportParametrosAdotados(row_r58));
} }
function AtividadeListComponent_ng_template_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r59 = ctx.row;
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r39.getReportEntregasEsperadas(row_r59));
} }
const _c2 = function () { return ["configuracoes", "unidade"]; };
const _c3 = function (a0) { return { route: a0 }; };
const _c4 = function () { return ["cadastros", "tipo-atividade"]; };
class AtividadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.disableUnidade = false;
        this.validateHomologacao = (control, controlName) => {
            var _a;
            let result = null;
            if (['data_homologacao'].indexOf(controlName) >= 0 && !((_a = this.dao) === null || _a === void 0 ? void 0 : _a.validDateTime(control.value))) {
                result = "Inválido";
            }
            return result;
        };
        this.filterWhere = (filter) => {
            var _a, _b, _c, _d;
            let form = filter.value;
            let result = [];
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome.replace(" ", "%") + "%"]);
            }
            if ((_b = form.unidade_id) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if ((_c = form.tipo_atividade_id) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["tipo_atividade_id", "==", form.tipo_atividade_id]);
            }
            if (form.vinculadas) {
                result.push(["vinculadas", "==", true]);
            }
            if ((_d = form.homologado) === null || _d === void 0 ? void 0 : _d.length) {
                result.push(["homologado", "==", form.homologado == "S"]);
            }
            return result;
        };
        this.join = ["tipo_atividade:id,nome", "unidade:id,sigla,nome"];
        this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__["TipoAtividadeDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["UnidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Atividade", true);
        this.code = "MOD_ATV";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            unidade_id: { default: "" },
            vinculadas: { default: true },
            homologado: { default: "" },
            tipo_atividade_id: { default: null }
        });
        this.formHomologacao = this.fh.FormBuilder({
            data_homologacao: { default: new Date() }
        }, this.cdRef, this.validateHomologacao);
        this.multiselectMenu = !this.auth.hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM') ? [] : [
            {
                icon: "bi bi-check",
                label: "Homologar",
                onClick: this.homologarAtividades.bind(this)
            }
        ];
        //this.orderBy = [['unidade.sigla', 'asc']];
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    }
    dynamicOptions(row) {
        var _a;
        let result = [];
        let atividade = row;
        result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (atividade) => this.go.navigate({ route: ['cadastros', 'atividade', atividade.id, 'consult'] }, { modal: true }) });
        // Testa se o usuário possui permissão para homologar a atividade
        if (this.auth.hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM'))
            result.push(Object.assign({}, (_a = this.grid) === null || _a === void 0 ? void 0 : _a.BUTTON_EDIT, { onClick: this.edit.bind(this) }));
        // Testa se o usuário possui permissão para exibir dados de atividade
        if (this.auth.hasPermissionTo("MOD_ATV_CONS"))
            result.push({ icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this) });
        // Testa se o usuário possui permissão para excluir a atividade
        if (this.auth.hasPermissionTo("MOD_ATV_EXCL"))
            result.push({ icon: "bi bi-trash", label: "Excluir", onClick: this.delete.bind(this) });
        return result;
    }
    dynamicButtons(row) {
        var _a;
        let result = [];
        let atividade = row;
        if (atividade.homologado || !this.auth.hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM')) {
            result.push(Object.assign({}, (_a = this.grid) === null || _a === void 0 ? void 0 : _a.BUTTON_EDIT, { onClick: this.edit.bind(this) }));
        }
        else {
            result.push({ hint: "Homologar", icon: "bi bi-hand-thumbs-up", onClick: this.homologar.bind(this) });
        }
        return result;
    }
    homologar(doc) {
        this.dialog.confirm("Homologar", "Deseja realmente homologar essa atividade?").then(response => {
            if (response) {
                this.loading = true;
                this.dao.homologar([doc.id], this.auth.hora).then(response => {
                    this.grid.query.refreshId(doc.id);
                }).finally(() => this.loading = false);
            }
        });
    }
    homologarAtividades() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.grid.multiselectedCount) {
                this.dialog.alert("Selecione", "Nenhuma atividade seleciona para homologação");
            }
            else {
                const HOMOLOGAR = "HOMOLOGAR";
                const CANCELAR = "CANCELAR";
                let result = yield this.dialog.template({ title: "Homologar atividades", modalWidth: 300 }, this.homologacaoAtividades, [
                    {
                        label: "Homologar",
                        color: "btn btn-outline-success",
                        value: HOMOLOGAR
                    }, {
                        label: "Cancelar",
                        color: "btn btn-outline-danger",
                        value: CANCELAR
                    }
                ]).asPromise();
                if (result.button.value == HOMOLOGAR) {
                    if (this.formHomologacao.valid) {
                        this.submitting = true;
                        try {
                            let result = yield ((_a = this.dao) === null || _a === void 0 ? void 0 : _a.homologar(Object.keys(this.grid.multiselected), this.formHomologacao.controls.data_homologacao.value));
                            if (result.error)
                                throw new Error(result.error);
                            this.dialog.alert("Sucesso", "Foram homologados " + result.data + " " + this.lex.noun("atividade", true));
                            this.grid.enableMultiselect(false);
                            this.refresh();
                        }
                        catch (error) {
                            this.error(error.message ? error.message : error);
                        }
                        finally {
                            this.submitting = false;
                            result.dialog.close();
                        }
                    }
                    else {
                        this.formHomologacao.markAllAsTouched();
                    }
                }
                else {
                    result.dialog.close();
                }
            }
        });
    }
    ngOnInit() {
        var _a, _b, _c, _d;
        super.ngOnInit();
        this.disableUnidade = this.selectable && ((_c = (_b = (_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.unidade_id) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.lenght);
        (_d = this.filter) === null || _d === void 0 ? void 0 : _d.controls.vinculadas.setValue(this.selectable);
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.unidade_id.setValue("");
        filter.controls.homologado.setValue("");
        super.filterClear(filter);
    }
    getReportComplexidade(row) {
        let result = "";
        row.complexidade.forEach(element => {
            result += element.grau + ": " + element.fator + ";\n";
        });
        return result;
    }
    getReportEtiquetas(row) {
        let result = "";
        row.etiquetas_predefinidas.forEach(element => {
            result += element.value + ";\n";
        });
        return result;
    }
    getReportChecklist(row) {
        let result = "";
        row.checklist_predefinidos.forEach(element => {
            result += element.value + ";\n";
        });
        return result;
    }
    getReportParametrosAdotados(row) {
        let result = "";
        row.parametros_adotados.forEach(element => {
            result += element.value + ";\n";
        });
        return result;
    }
    getReportEntregasEsperadas(row) {
        let result = "";
        row.entregas_esperadas.forEach(element => {
            result += element.value + ";\n";
        });
        return result;
    }
}
AtividadeListComponent.ɵfac = function AtividadeListComponent_Factory(t) { return new (t || AtividadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
AtividadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: AtividadeListComponent, selectors: [["app-atividade-list"]], viewQuery: function AtividadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.homologacaoAtividades = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 70, vars: 59, consts: [["homologacaoAtividades", ""], ["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "multiselectMenu", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "disabled", "control", "dao", "selectRoute"], ["label", "Vinculadas", "controlName", "vinculadas", 3, "size", "control"], ["label", "Tipo de atividade", "controlName", "tipo_atividade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["label", "Homologado?", "controlName", "homologado", 3, "size", "control", "items"], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Homologado", 3, "template"], ["columnHomologado", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["type", "options", 3, "options", "dynamicOptions", "dynamicButtons", 4, "ngIf"], ["reportNome", ""], ["title", "Tempo pactuado", 3, "template"], ["reportTempoPactuado", ""], ["title", "Dias planejamento", 3, "template"], ["reportDiasPlanejado", ""], ["title", "Tempo m\u00EDnimo", 3, "template"], ["reportTempoMinimo", ""], ["title", "Desativa produtividade", 3, "template"], ["reportDesativaProdutividade", ""], ["title", "Complexidade", 3, "template"], ["reportComplexidade", ""], ["title", "Etiquetas", 3, "template"], ["reportEtiquetas", ""], ["title", "Check-list", 3, "template"], ["reportChecklist", ""], ["title", "Coment\u00E1rio", 3, "template"], ["reportComentario", ""], ["reportHomologado", ""], ["title", "Data Homologa\u00E7\u00E3o", 3, "template"], ["reportDataHomologacao", ""], ["title", "Tipo Atividade", 3, "template"], ["reportTipoAtividade", ""], ["reportUnidade", ""], ["title", "Par\u00EAmetros adotados", 3, "template"], ["reportParametrosAdotados", ""], ["title", "Entregas esperadas", 3, "template"], ["reportEntregasEsperadas", ""], [3, "rows"], ["noButtons", "", 3, "form"], ["type", "warning", 3, "message"], ["label", "Data e hora", "controlName", "data_homologacao", "labelInfo", "Data e hora para registro da homologa\u00E7\u00E3o", 3, "size", "control"], [1, "d-block"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-check-all"], ["type", "options", 3, "options", "dynamicOptions", "dynamicButtons"]], template: function AtividadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, AtividadeListComponent_ng_template_0_Template, 4, 4, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function AtividadeListComponent_Template_grid_select_2_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeListComponent_toolbar_3_Template, 1, 0, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "input-switch", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-search", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "input-text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "input-radio", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, AtividadeListComponent_ng_template_14_Template, 3, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, AtividadeListComponent_ng_template_17_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, AtividadeListComponent_ng_template_20_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](22, AtividadeListComponent_column_22_Template, 1, 4, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](25, AtividadeListComponent_ng_template_25_Template, 1, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](28, AtividadeListComponent_ng_template_28_Template, 1, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](31, AtividadeListComponent_ng_template_31_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](34, AtividadeListComponent_ng_template_34_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "column", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](37, AtividadeListComponent_ng_template_37_Template, 1, 1, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "column", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](40, AtividadeListComponent_ng_template_40_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](43, AtividadeListComponent_ng_template_43_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "column", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](46, AtividadeListComponent_ng_template_46_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "column", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](49, AtividadeListComponent_ng_template_49_Template, 1, 1, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](52, AtividadeListComponent_ng_template_52_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](54, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](55, AtividadeListComponent_ng_template_55_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](57, "column", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](58, AtividadeListComponent_ng_template_58_Template, 1, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](60, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](61, AtividadeListComponent_ng_template_61_Template, 1, 1, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](63, "column", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](64, AtividadeListComponent_ng_template_64_Template, 1, 1, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](66, "column", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](67, AtividadeListComponent_ng_template_67_Template, 1, 1, "ng-template", null, 43, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](69, "pagination", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](15);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](18);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](21);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](26);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](29);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](32);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](35);
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](38);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](41);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](44);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](47);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](50);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](53);
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](56);
        const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](59);
        const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](62);
        const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](65);
        const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](68);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_ATV_INCL"))("hasEdit", false)("multiselectMenu", ctx.multiselectMenu);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("disabled", ctx.disableUnidade ? "true" : undefined)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](54, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](53, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.vinculadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 5)("control", ctx.filter.controls.tipo_atividade_id)("dao", ctx.tipoAtividadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](57, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](56, _c4)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 8)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.homologado)("items", ctx.lookup.TODOSSIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r32);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r34);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r36);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r38);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__["InputSwitchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_13__["InputRadioComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__["ColumnComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_16__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__["PaginationComponent"], _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_18__["EditableFormComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_19__["TopAlertComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__["InputDatetimeComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "LxS3":
/*!*****************************************************************!*\
  !*** ./src/app/modules/cadastros/atividade/atividade.module.ts ***!
  \*****************************************************************/
/*! exports provided: AtividadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeModule", function() { return AtividadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atividade-routing.module */ "16YT");
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ "t/Fq");
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ "FyQ1");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AtividadeModule {
}
AtividadeModule.ɵfac = function AtividadeModule_Factory(t) { return new (t || AtividadeModule)(); };
AtividadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AtividadeModule });
AtividadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["AtividadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AtividadeModule, { declarations: [_atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__["AtividadeFormComponent"],
        _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__["AtividadeListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["AtividadeRoutingModule"]] }); })();


/***/ }),

/***/ "t/Fq":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/cadastros/atividade/atividade-form/atividade-form.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AtividadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtividadeFormComponent", function() { return AtividadeFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ "+jod");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ "VW5Q");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");

























const _c0 = ["tipoAtividade"];
const _c1 = ["unidade"];
const _c2 = function () { return ["cadastros", "tipo-atividade"]; };
const _c3 = function (a0) { return { route: a0 }; };
const _c4 = function () { return ["configuracoes", "unidade"]; };
class AtividadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"], src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.injector = injector;
        this.validateComplexidade = (control, controlName) => {
            let result = null;
            return result;
        };
        this.validate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (['nome', 'unidade_id', 'tipo_atividade_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (['tempo_pactuado', 'tempo_minimo'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            else if (['data_homologacao'].indexOf(controlName) >= 0 && !((_b = this.dao) === null || _b === void 0 ? void 0 : _b.validDateTime(control.value))) {
                result = "Inválido";
            }
            else if (controlName == 'complexidade' && !(control.value || []).find((x) => x.padrao)) {
                result = "Obrigatório ao menos um como padrão";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando "; // + (entity?.unidade_id || "");
        };
        this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__["TipoAtividadeDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["UnidadeDaoService"]);
        this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoProcessoDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            tempo_pactuado: { default: 48 },
            dias_planejado: { default: "" },
            tempo_minimo: { default: "" },
            recalcula_prazo: { default: "" },
            desativa_produtividade: { default: "" },
            complexidade: { default: [] },
            tipo_processo_id: { default: "" },
            etiquetas_predefinidas: { default: [] },
            checklist_predefinidos: { default: [] },
            comentario_predefinido: { default: "" },
            parametros_adotados: { default: [] },
            entregas_esperadas: { default: [] },
            homologado: { default: "" },
            data_homologacao: { default: new Date() },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            unidade_id: { default: "" },
            tipo_atividade_id: { default: "" },
            parametro_texto: { default: "" },
            entrega_texto: { default: "" },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            checklist_texto: { default: "" },
            tipos_processo: { default: [] },
            tipos_processo_texto: { default: "" }
        }, this.cdRef, this.validate);
        this.formComplexidade = this.fh.FormBuilder({
            id: { default: "" },
            grau: { default: "" },
            fator: { default: 0 },
            tempo: { default: 24 },
            padrao: { default: true }
        }, this.cdRef, this.validateComplexidade);
        this.join = ["tipo_atividade", "unidade"];
    }
    addItemHandleChecklist() {
        let result = undefined;
        const value = this.form.controls.checklist_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.checklist_predefinidos.value, key)) {
            result = {
                key: key,
                value: this.form.controls.checklist_texto.value
            };
            this.form.controls.checklist_texto.setValue("");
        }
        return result;
    }
    ;
    addItemHandleTiposProcesso() {
        let result = undefined;
        const value = this.form.controls.tipos_processo_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.tipos_processo.value, key)) {
            result = {
                key: key,
                value: this.form.controls.tipos_processo_texto.value
            };
            this.form.controls.tipos_processo_texto.setValue("");
        }
        return result;
    }
    ;
    addItemHandleEtiquetas() {
        let result = undefined;
        const value = this.form.controls.etiqueta_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.etiquetas_predefinidas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.etiqueta_texto.value,
                color: this.form.controls.etiqueta_cor.value,
                icon: this.form.controls.etiqueta_icone.value
            };
            this.form.controls.etiqueta_texto.setValue("");
            this.form.controls.etiqueta_icone.setValue(null);
            this.form.controls.etiqueta_cor.setValue(null);
        }
        return result;
    }
    ;
    addItemHandleParametros() {
        let result = undefined;
        const value = this.form.controls.parametro_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.parametros_adotados.value, key)) {
            result = {
                key: key,
                value: this.form.controls.parametro_texto.value
            };
            this.form.controls.parametro_texto.setValue("");
        }
        return result;
    }
    ;
    addItemHandleEntregas() {
        let result = undefined;
        const value = this.form.controls.entrega_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.entregas_esperadas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.entrega_texto.value
            };
            this.form.controls.entrega_texto.setValue("");
        }
        return result;
    }
    ;
    saveComplexidade(form, item) {
        const entity = form.value;
        if (entity.padrao)
            this.form.controls.complexidade.value.map((x) => x.padrao = 0);
        return entity;
    }
    onPactuadoChange(event) {
        var _a, _b, _c, _d, _e;
        let complexidades = ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.complexidade) === null || _b === void 0 ? void 0 : _b.value) || [];
        for (let complexidade of complexidades) {
            complexidade.tempo = ((_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.tempo_pactuado.value) * complexidade.fator;
        }
        (_e = (_d = this.form) === null || _d === void 0 ? void 0 : _d.controls.complexidade) === null || _e === void 0 ? void 0 : _e.setValue(complexidades);
        this.cdRef.detectChanges();
    }
    onFatorChange(row, form) {
        const tempo = Math.round(this.form.controls.tempo_pactuado.value * form.controls.fator.value * 100) / 100;
        form.controls.tempo.setValue(tempo);
        this.cdRef.detectChanges();
    }
    onTempoChange(row, form) {
        const pactuado = this.form.controls.tempo_pactuado.value;
        const fator = Math.round(pactuado > 0 ? form.controls.tempo.value / pactuado * 100 : 0) / 100;
        form.controls.fator.setValue(fator, { emitEvent: false });
        this.cdRef.detectChanges();
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            yield Promise.all([
                this.tipoAtividade.loadSearch(entity.tipoAtividade || entity.tipo_atividade_id),
                this.unidade.loadSearch(entity.unidade || entity.unidade_id)
            ]);
            form.patchValue(this.util.fillForm(formValue, entity));
        });
    }
    initializeData(form) {
        this.entity = new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__["Atividade"](), this.entity);
            resolve(this.util.fillForm(atividade, this.form.value));
        });
    }
}
AtividadeFormComponent.ɵfac = function AtividadeFormComponent_Factory(t) { return new (t || AtividadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
AtividadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: AtividadeFormComponent, selectors: [["tividade-form"]], viewQuery: function AtividadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 52, vars: 79, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "Nome", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["title", "Tempos"], ["onlyHours", "", "icon", "bi bi-clock", "controlName", "tempo_pactuado", "labelInfo", "Tempo em horas correntes previsto para a execu\u00E7\u00E3o da atividade", 3, "label", "size", "control", "change"], ["numbers", "", "sufix", "dias", "icon", "bi bi-calendar-date", "controlName", "dias_planejado", "labelInfo", "Tempo em dias previsto para realizar a atividade", 3, "label", "size", "control"], ["numbers", "", "label", "Tempo M\u00EDnimo", "sufix", "%", "icon", "bi bi-clock", "controlName", "tempo_minimo", "labelInfo", "Tempo m\u00EDnimo aceit\u00E1vel para a atividade (% do tempo pactuado)", 3, "size", "control"], ["title", "Classifica\u00E7\u00E3o"], ["label", "Tipo da Atividade", "icon", "bi bi-arrow-up-right-circle", "controlName", "tipo_atividade_id", 3, "size", "control", "dao", "selectRoute"], ["tipoAtividade", ""], ["label", "Unidade", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["unidade", ""], ["key", "VARIACOES", "label", "Varia\u00E7\u00E3o e Produtividade"], ["clss", "row"], ["editable", "", 3, "control", "form", "save"], ["type", "text", "title", "Grau", "field", "grau"], ["type", "number", "title", "Fator", "field", "fator", "stepValue", "0.1", 3, "onChange"], ["type", "timer", "title", "Tempo", "onlyHours", "", "field", "tempo", 3, "onChange"], ["type", "switch", "title", "Padr\u00E3o", "field", "padrao"], ["type", "options", "upDownButtons", ""], ["key", "PREDEFINIDAS", "label", "Configura\u00E7\u00F5es Pr\u00E9-definidas"], ["label", "Tipos de Processo (SEI)", "controlName", "tipos_processo", 3, "size", "control", "addItemHandle"], ["label", "Descri\u00E7\u00E3o", "icon", "far fa-edit", "controlName", "tipos_processo_texto", 3, "size", "control"], ["label", "Etiquetas", "controlName", "etiquetas_predefinidas", 3, "size", "control", "addItemHandle"], ["label", "Texto", "icon", "bi bi-textarea-t", "controlName", "etiqueta_texto", 3, "size", "control"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "etiqueta_icone", "liveSearch", "", 3, "size", "control", "items"], ["label", "Cor", "icon", "bi bi-palette", "controlName", "etiqueta_cor", 3, "size", "control"], ["label", "Checklists", "controlName", "checklist_predefinidos", 3, "size", "control", "addItemHandle"], ["controlName", "checklist_texto", 3, "size", "control"], ["label", "Coment\u00E1rios", "controlName", "comentario_predefinido", 3, "size", "rows", "control"], ["key", "PARAMETROS", "label", "Par\u00E2metros e Entregas"], ["label", "Par\u00E2metros", "controlName", "parametros_adotados", 3, "size", "control", "addItemHandle"], ["label", "Descri\u00E7\u00E3o", "icon", "far fa-edit", "controlName", "parametro_texto", 3, "size", "control"], ["label", "Entregas", "controlName", "entregas_esperadas", 3, "size", "control", "addItemHandle"], ["label", "Descri\u00E7\u00E3o", "icon", "far fa-edit", "controlName", "entrega_texto", 3, "size", "control"], ["key", "OUTRAS", "label", "Outras Op\u00E7\u00F5es"], ["label", "Homologado pela Unidade Gestora", "icon", "bi bi-check2", "controlName", "homologado", "labelInfo", "Se a atividade foi homologada pela unidade gestora do teletrabalho", 3, "disabled", "size", "control", "items"], ["date", "", "label", "Data da Homologa\u00E7\u00E3o", "icon", "bi bi-calendar-date", "controlName", "data_homologacao", 3, "disabled", "size", "control"], ["label", "Prazo Recalculado (se ao menos iniciada)", "icon", "fas fa-hourglass-start", "controlName", "recalcula_prazo", "labelInfo", "Caso acabe o prazo, mas j\u00E1 estiver iniciado, o prazo recalcula-se automaticamente.", 3, "size", "control", "items"], ["label", "Produtividade Desativada", "icon", "fas fa-chart-line", "controlName", "desativa_produtividade", "labelInfo", "Desativar o c\u00E1lculo de produtividade e controle de tempo de execu\u00E7\u00E3o (para atividades do tipo monitoramento)", 3, "disabled", "size", "control", "items"]], template: function AtividadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function AtividadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AtividadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "separator", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "input-timer", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function AtividadeFormComponent_Template_input_timer_change_7_listener($event) { return ctx.onPactuadoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input-text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "separator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "input-search", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "input-search", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "tab", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "grid", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](20, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](23, "column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](24, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "tab", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "input-multiselect", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](28, "input-text", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "input-multiselect", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](31, "input-text", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](32, "input-select", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](33, "input-color", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "input-multiselect", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](35, "input-text", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](36, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](37, "input-textarea", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](38, "tab", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](39, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "input-multiselect", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](41, "input-text", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](42, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "input-multiselect", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](44, "input-text", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "tab", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](47, "input-radio", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](48, "input-datetime", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](50, "input-radio", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](51, "input-radio", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("label", ctx.lex.noun("Tempo Pactuado"))("size", 4)("control", ctx.form.controls.tempo_pactuado);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("label", ctx.lex.noun("Tempo planejado"))("size", 4)("control", ctx.form.controls.dias_planejado);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tempo_minimo);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.tipo_atividade_id)("dao", ctx.tipoAtividadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](74, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](73, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](77, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](76, _c4)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("control", ctx.form.controls.complexidade)("form", ctx.formComplexidade)("save", ctx.saveComplexidade.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("onChange", ctx.onFatorChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("onChange", ctx.onTempoChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.tipos_processo)("addItemHandle", ctx.addItemHandleTiposProcesso.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.tipos_processo_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.etiquetas_predefinidas)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.etiqueta_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.etiqueta_icone)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.etiqueta_cor);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.checklist_predefinidos)("addItemHandle", ctx.addItemHandleChecklist.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.checklist_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx.form.controls.comentario_predefinido);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.parametros_adotados)("addItemHandle", ctx.addItemHandleParametros.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.parametro_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.entregas_esperadas)("addItemHandle", ctx.addItemHandleEntregas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.entrega_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_ATV_EDT_OTR_OP_HOM") ? "true" : undefined)("size", 6)("control", ctx.form.controls.homologado)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_ATV_EDT_OTR_OP_HOM") ? "true" : undefined)("size", 6)("control", ctx.form.controls.data_homologacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.recalcula_prazo)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_ATV_EDT_OTR_OP_PROD") ? "true" : undefined)("size", 6)("control", ctx.form.controls.desativa_produtividade)("items", ctx.lookup.SIMNAO);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_9__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_10__["TabComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__["InputTextComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__["SeparatorComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_13__["InputTimerComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_15__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__["ColumnComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_18__["InputMultiselectComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_20__["InputColorComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_21__["InputTextareaComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_22__["InputRadioComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_23__["InputDatetimeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdGl2aWRhZGUtZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-atividade-atividade-module.js.map