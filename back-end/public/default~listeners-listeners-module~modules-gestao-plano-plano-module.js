(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~listeners-listeners-module~modules-gestao-plano-plano-module"],{

/***/ "710e":
/*!***************************************!*\
  !*** ./src/app/models/plano.model.ts ***!
  \***************************************/
/*! exports provided: Plano */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plano", function() { return Plano; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Plano extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.carga_horaria = 0; //Carga horária diária do usuário
        this.tempo_total = 0; //Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        this.tempo_proporcional = 0; //tempo_total menos os afastamentos
        this.data_inicio_vigencia = new Date(); //Inicio do plano
        this.data_fim_vigencia = new Date(); //Fim do plano
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.ganho_produtividade = 0; /* Ganho de produtividade */
        this.programa_id = "";
        this.usuario_id = "";
        this.unidade_id = "";
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.tipo_modalidade_id = "";
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.documento_id = null;
        this.atividades = []; /* Entregas da demanda */
        this.documentos = []; /* Termos de adesão */
        this.demandas = []; /* Demandas vinculadas ao Plano */
    }
}


/***/ }),

/***/ "8B/q":
/*!****************************************************!*\
  !*** ./src/app/dao/tipo-modalidade-dao.service.ts ***!
  \****************************************************/
/*! exports provided: TipoModalidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidadeDaoService", function() { return TipoModalidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TipoModalidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("TipoModalidade", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
TipoModalidadeDaoService.ɵfac = function TipoModalidadeDaoService_Factory(t) { return new (t || TipoModalidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
TipoModalidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TipoModalidadeDaoService, factory: TipoModalidadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "nUpE":
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-list/plano-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: PlanoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoListComponent", function() { return PlanoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-dao.service */ "eHo6");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/plano.model */ "710e");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/grid/report/report.component */ "4Ttn");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ "zUlN");

























function PlanoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "input-switch", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function PlanoListComponent_toolbar_1_Template_input_switch_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r32.onAgruparChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx_r0.filter.controls.agrupar);
} }
function PlanoListComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r34 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r34.usuario == null ? null : row_r34.usuario.nome) || "", "");
} }
function PlanoListComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r35 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r35.programa == null ? null : row_r35.programa.nome) || "", "");
} }
function PlanoListComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r36 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r36.unidade == null ? null : row_r36.unidade.nome) || "", "");
} }
function PlanoListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r37 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r37.tipo_modalidade == null ? null : row_r37.tipo_modalidade.nome) || "", "");
} }
function PlanoListComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0, " Vig\u00EAncia de");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "order", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "order", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "Fim");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r38 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r38);
} }
function PlanoListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r39 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r12.dao.getDateFormatted(row_r39.data_inicio_vigencia) + " at\u00E9 " + ctx_r12.dao.getDateFormatted(row_r39.data_fim_vigencia), "");
} }
function PlanoListComponent_ng_template_31_span_0_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Sei n\u00BA ", row_r40.documento == null ? null : row_r40.documento.numero_documento, "");
} }
function PlanoListComponent_ng_template_31_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PlanoListComponent_ng_template_31_span_0_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r46); const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r44.onProcessoClick(row_r40); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, PlanoListComponent_ng_template_31_span_0_small_3_Template, 3, 1, "small", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx_r41.allPages.getButtonTitle(row_r40.documento == null ? null : row_r40.documento.numero_processo, row_r40.documento == null ? null : row_r40.documento.numero_documento));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("role", (row_r40.documento == null ? null : row_r40.documento.numero_processo == null ? null : row_r40.documento.numero_processo.length) ? "button" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"]("bi " + ((row_r40.documento == null ? null : row_r40.documento.numero_processo == null ? null : row_r40.documento.numero_processo.length) ? "bi bi-folder-symlink" : "bi bi-x-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r40.documento == null ? null : row_r40.documento.numero_processo == null ? null : row_r40.documento.numero_processo.length) ? row_r40.documento == null ? null : row_r40.documento.numero_processo : "N\u00E3o atribu\u00EDdo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r40.documento == null ? null : row_r40.documento.numero_documento == null ? null : row_r40.documento.numero_documento.length);
} }
function PlanoListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PlanoListComponent_ng_template_31_span_0_Template, 4, 6, "span", 42);
} if (rf & 2) {
    const row_r40 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r40.documento == null ? null : row_r40.documento.numero_processo == null ? null : row_r40.documento.numero_processo.length);
} }
function PlanoListComponent_column_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "column", 44);
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx_r15.edit)("options", ctx_r15.options);
} }
function PlanoListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r48 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r48.numero);
} }
function PlanoListComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r49 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r49.usuario == null ? null : row_r49.usuario.matricula) || "");
} }
function PlanoListComponent_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r50 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r50.programa == null ? null : row_r50.programa.nome) || "");
} }
function PlanoListComponent_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r51.unidade == null ? null : row_r51.unidade.nome) || "");
} }
function PlanoListComponent_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r52.tipo_modalidade == null ? null : row_r52.tipo_modalidade.nome) || "");
} }
function PlanoListComponent_ng_template_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r53 = ctx.row;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r27.util.getDateTimeFormatted(row_r53.data_inicio_vigencia));
} }
function PlanoListComponent_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r54 = ctx.row;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r29.util.getDateTimeFormatted(row_r54.data_fim_vigencia));
} }
function PlanoListComponent_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r55 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r55.documento == null ? null : row_r55.documento.numero_processo == null ? null : row_r55.documento.numero_processo.length) ? row_r55.documento == null ? null : row_r55.documento.numero_processo : "N\u00E3o atribu\u00EDdo");
} }
const _c0 = function () { return ["configuracoes", "unidade"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["cadastros", "tipo-modalidade"]; };
class PlanoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_9__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_8__["Plano"], src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanoDaoService"]);
        this.injector = injector;
        this.multiselectAllFields = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
        this.DATAS_FILTRO = [
            { key: "VIGENTE", value: "Vigente" },
            { key: "NAOVIGENTE", value: "Não vigente" },
            { key: "INICIAM", value: "Iniciam" },
            { key: "FINALIZAM", value: "Finalizam" }
        ];
        this.filterValidate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (controlName == "data_inicio" && control.value > ((_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.data_fim.value)) {
                result = "Maior que fim";
            }
            else if (controlName == "data_fim" && control.value < ((_b = this.filter) === null || _b === void 0 ? void 0 : _b.controls.data_inicio.value)) {
                result = "Menor que início";
            }
            return result;
        };
        this.filterWhere = (filter) => {
            var _a, _b, _c;
            let result = [];
            let form = filter.value;
            if ((_a = form.tipo_modalidade_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
            }
            if (form.data_filtro) {
                result.push(["data_filtro", "==", form.data_filtro]);
                result.push(["data_inicio", "==", form.data_inicio]);
                result.push(["data_fim", "==", form.data_fim]);
            }
            if ((_b = form.usuario) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["usuario.nome", "like", "%" + form.usuario + "%"]);
            }
            if ((_c = form.unidade_id) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            return result;
        };
        this.dynamicMultiselectMenu = (multiselected) => {
            let assinar = !!Object.keys(multiselected).length;
            let menu = [];
            Object.entries(multiselected).forEach(([key, value]) => {
                if (!this.needSign(value))
                    assinar = false;
            });
            if (assinar)
                menu.push({ label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
            return menu;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__["ProgramaDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["DocumentoDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoModalidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Plano de trabalho", true);
        this.code = "MOD_PTR";
        this.filter = this.fh.FormBuilder({
            agrupar: { default: true },
            usuario: { default: "" },
            unidade_id: { default: null },
            tipo_modalidade_id: { default: null },
            data_filtro: { default: null },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() }
        }, this.cdRef, this.filterValidate);
        this.join = ["unidade.entidade", "usuario", "programa", "documento", "tipo_modalidade"];
        // Testa se o usuário possui permissão para exibir dados do plano de trabalho
        if (this.auth.hasPermissionTo("MOD_PTR_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o plano de trabalho
        if (this.auth.hasPermissionTo("MOD_PTR_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.options.push({
            label: "Termos de adesão",
            icon: "bi bi-file-earmark-check",
            onClick: ((row) => this.go.navigate({ route: ['gestao', 'plano', row.id, 'termos'] }, { modalClose: (modalResult) => console.log(modalResult === null || modalResult === void 0 ? void 0 : modalResult.conteudo) })).bind(this)
        });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.unidade_id.setValue(null);
        filter.controls.tipo_modalidade_id.setValue(null);
        filter.controls.data_filtro.setValue(null);
        filter.controls.data_inicio.setValue(new Date());
        filter.controls.data_fim.setValue(new Date());
        super.filterClear(filter);
    }
    onAgruparChange(event) {
        var _a, _b;
        const agrupar = this.filter.controls.agrupar.value;
        if ((agrupar && !((_a = this.groupBy) === null || _a === void 0 ? void 0 : _a.length)) || (!agrupar && ((_b = this.groupBy) === null || _b === void 0 ? void 0 : _b.length))) {
            this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
            this.grid.reloadFilter();
        }
    }
    onProcessoClick(row) {
        this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
    }
    needSign(plano) {
        var _a, _b;
        let ids = [];
        if ((_a = plano.documento_id) === null || _a === void 0 ? void 0 : _a.length) {
            const tipoModalidade = plano.tipo_modalidade; //(this.tipoModalidade?.searchObj as TipoModalidade);
            const usuario = plano.usuario; // (this.usuario?.searchObj as Usuario);
            const unidade = plano.unidade; // (this.unidade?.searchObj as Unidade);
            const entidade = unidade.entidade;
            //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura) && usuario)
                ids.push(usuario.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_unidade) && unidade)
                ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_entidade) && entidade)
                ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
        }
        return !!((_b = plano.documento_id) === null || _b === void 0 ? void 0 : _b.length) && ids.includes(this.auth.usuario.id);
    }
    assinar() {
        if (!this.grid.multiselectedCount) {
            this.dialog.alert("Selecione", "Nenhum plano seleciono");
        }
        else {
            this.dialog.confirm("Assinar", "Deseja realmente assinar " + this.grid.multiselectedCount + " documento" + (this.grid.multiselectedCount > 1 ? "s" : "") + "?").then(response => {
                if (response) {
                    this.loading = true;
                    this.documentoDao.assinar(Object.keys(this.grid.multiselected)).then(response => {
                        if (response === null || response === void 0 ? void 0 : response.length) {
                            this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
                            this.refresh();
                        }
                    }).finally(() => this.loading = false);
                }
            });
        }
    }
}
PlanoListComponent.selectRoute = { route: ["gestao", "plano"] };
PlanoListComponent.ɵfac = function PlanoListComponent_Factory(t) { return new (t || PlanoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["Injector"])); };
PlanoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: PlanoListComponent, selectors: [["app-plano-list"]], viewQuery: function PlanoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 60, vars: 62, consts: [["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "dynamicMultiselectMenu", "multiselectAllFields", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Usu\u00E1rio", "controlName", "usuario", "placeholder", "Usu\u00E1rio", 3, "size", "control"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Tipo de modalidade", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["noIcon", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["noIcon", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["title", "#ID", "field", "numero", "orderBy", "numero", "orderBy", "numero", 3, "minWidth"], ["title", "Usu\u00E1rio", "orderBy", "usuario.nome", 3, "template"], ["columnUsuario", ""], ["title", "Programa", 3, "template"], ["columnPrograma", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["title", "Modalidade", 3, "template"], ["columnModalidade", ""], ["orderBy", "data_inicio_vigencia", 3, "titleTemplate", "template"], ["titleVigencia", ""], ["columnInicioVigencia", ""], ["title", "Termo de ades\u00E3o", 3, "template"], ["documento", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], ["title", "Numero", 3, "template"], ["reportNumero", ""], ["title", "Matricula usu\u00E1rio", 3, "template"], ["reportMatricula", ""], ["reportPrograma", ""], ["reportUnidade", ""], ["reportModalidade", ""], ["title", "In\u00EDcio vig\u00EAncia", 3, "template"], ["reportInicioVigencia", ""], ["title", "Fim vig\u00EAncia", 3, "template"], ["reportFimVigencia", ""], ["title", "Termo de Ades\u00E3o", 3, "template"], ["reportTermoAdesao", ""], [3, "rows"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["by", "data_inicio_vigencia", 3, "header"], ["by", "data_fim_vigencia", 3, "header"], ["class", "badge bg-light text-dark", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngIf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title", "click"], ["type", "options", 3, "onEdit", "options"]], template: function PlanoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function PlanoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PlanoListComponent_toolbar_1_Template, 2, 2, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](14, PlanoListComponent_ng_template_14_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, PlanoListComponent_ng_template_17_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](20, PlanoListComponent_ng_template_20_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](23, PlanoListComponent_ng_template_23_Template, 2, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](26, PlanoListComponent_ng_template_26_Template, 7, 2, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](28, PlanoListComponent_ng_template_28_Template, 2, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](31, PlanoListComponent_ng_template_31_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](33, PlanoListComponent_column_33_Template, 1, 2, "column", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](36, PlanoListComponent_ng_template_36_Template, 1, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "column", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](39, PlanoListComponent_ng_template_39_Template, 1, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](42, PlanoListComponent_ng_template_42_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](45, PlanoListComponent_ng_template_45_Template, 1, 1, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](47, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](48, PlanoListComponent_ng_template_48_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](50, "column", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](51, PlanoListComponent_ng_template_51_Template, 1, 1, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "column", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](54, PlanoListComponent_ng_template_54_Template, 1, 1, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](56, "column", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](57, PlanoListComponent_ng_template_57_Template, 1, 1, "ng-template", null, 37, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](59, "pagination", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](15);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](18);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](21);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](24);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](27);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](29);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](32);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](37);
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](40);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](43);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](46);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](49);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](52);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](55);
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](58);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PTR_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PTR_EDT"))("dynamicMultiselectMenu", ctx.dynamicMultiselectMenu.bind(ctx))("multiselectAllFields", ctx.multiselectAllFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](57, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](56, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](60, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](59, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.DATAS_FILTRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r9)("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r30);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_12__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_16__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_17__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_18__["ColumnComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_19__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_20__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_22__["InputSwitchComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_23__["OrderComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "xIT/":
/*!**********************************************!*\
  !*** ./src/app/dao/documento-dao-service.ts ***!
  \**********************************************/
/*! exports provided: DocumentoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentoDaoService", function() { return DocumentoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DocumentoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Documento", injector);
        this.injector = injector;
    }
    documentoPendenteSei(id_documento) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pendente-sei', { id_documento }).subscribe(response => {
                if (response.error)
                    throw new Error(response.error);
                resolve((response === null || response === void 0 ? void 0 : response.data) ? this.getRow(response === null || response === void 0 ? void 0 : response.data) : undefined);
            }, error => reject(error));
        });
    }
    assinar(documentosIds) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/assinar', { documentos_ids: documentosIds }).subscribe(response => {
                if (response.error)
                    throw new Error(response.error);
                resolve((response === null || response === void 0 ? void 0 : response.rows) ? this.getRows(response) : undefined);
            }, error => reject(error));
        });
    }
}
DocumentoDaoService.ɵfac = function DocumentoDaoService_Factory(t) { return new (t || DocumentoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
DocumentoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DocumentoDaoService, factory: DocumentoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "xrhv":
/*!*******************************************!*\
  !*** ./src/app/models/documento.model.ts ***!
  \*******************************************/
/*! exports provided: Documento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Documento", function() { return Documento; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Documento extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.numero = 0; /* Numero do documento (gerado pelo sistema) */
        this.especie = "TERMO_ADESAO"; /* Especificação da espécie do documento (interno do sistema) */
        this.conteudo = null; /* "Conteúdo do arquivo */
        this.assinatura = null; /* Dados da assinatura, se nulo não está assinado */
        this.metadados = null; /* Metadados */
        this.id_processo = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
        this.numero_processo = null; /* Número do processo de entrega, com a formatação de origem */
        this.id_documento = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
        this.numero_documento = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
        this.titulo_documento = null; /* Numeração do tipo de documento no sistema integrado */
        this.entidade_id = null; /* Entidade */
        this.plano_id = null; /* Plano */
        this.tipo_documento_id = null; /* Tipo documento */
        this.tipo_processo_id = null; /* Tipo processo */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.status = "GERADO";
        this.assinaturas = [];
    }
}
Documento.STATUS_GERADO = "GERADO";
Documento.STATUS_AGUARDANDO_SEI = "GERADO";


/***/ })

}]);
//# sourceMappingURL=default~listeners-listeners-module~modules-gestao-plano-plano-module.js.map