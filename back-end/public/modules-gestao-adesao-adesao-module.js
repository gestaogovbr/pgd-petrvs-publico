(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-adesao-adesao-module"],{

/***/ "BYS4":
/*!****************************************!*\
  !*** ./src/app/models/adesao.model.ts ***!
  \****************************************/
/*! exports provided: Adesao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adesao", function() { return Adesao; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Adesao extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.status = "SOLICITADO"; //tempo_total menos os afastamentos
        this.data_inicio_vigencia = new Date(); //Inicio do plano
        this.data_fim_vigencia = new Date(); //Fim do plano
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.programa_id = "";
        this.usuario_id = "";
        this.unidade_id = "";
        this.entidade_id = "";
        this.tipo_modalidade_id = "";
        this.documento_id = null;
        this.documentos = []; /*TCR*/
        this.initialization(data);
    }
}


/***/ }),

/***/ "LQdZ":
/*!****************************************************************************!*\
  !*** ./src/app/modules/gestao/adesao/adesao-list/adesao-list.component.ts ***!
  \****************************************************************************/
/*! exports provided: AdesaoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoListComponent", function() { return AdesaoListComponent; });
/* harmony import */ var _base_page_list_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../base/page-list-base */ "+vn/");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var _dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../dao/documento-dao-service */ "xIT/");
/* harmony import */ var _dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../dao/programa-dao.service */ "bsmI");
/* harmony import */ var _dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var _listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var _dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var _models_adesao_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../models/adesao.model */ "BYS4");
/* harmony import */ var _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../dao/adesao-dao.service */ "Xm6x");
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
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ "zUlN");
























function AdesaoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "toolbar");
} }
function AdesaoListComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r36 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r36);
} }
function AdesaoListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Usu\u00E1rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r37 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r37);
} }
function AdesaoListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r38 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r38.usuario == null ? null : row_r38.usuario.nome) || "", "");
} }
function AdesaoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r39 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r39);
} }
function AdesaoListComponent_ng_template_24_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r40.programa == null ? null : row_r40.programa.nome, " ");
} }
function AdesaoListComponent_ng_template_24_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r40.unidade.sigla, " ");
} }
function AdesaoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, AdesaoListComponent_ng_template_24_span_0_Template, 3, 1, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, AdesaoListComponent_ng_template_24_span_1_Template, 3, 1, "span", 45);
} if (rf & 2) {
    const row_r40 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r40.programa);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r40.unidade);
} }
function AdesaoListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r45 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r45.tipo_modalidade == null ? null : row_r45.tipo_modalidade.nome) || "", "");
} }
function AdesaoListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0, " Vig\u00EAncia de");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "order", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " a ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "order", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "Fim");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r46 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r46);
} }
function AdesaoListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r47 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r16.dao.getDateFormatted(row_r47.data_inicio_vigencia) + " at\u00E9 " + ctx_r16.dao.getDateFormatted(row_r47.data_fim_vigencia), "");
} }
function AdesaoListComponent_ng_template_35_span_0_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Sei n\u00BA ", row_r48.documento == null ? null : row_r48.documento.numero_documento, "");
} }
function AdesaoListComponent_ng_template_35_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function AdesaoListComponent_ng_template_35_span_0_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r54); const row_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row; const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r52.onProcessoClick(row_r48); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, AdesaoListComponent_ng_template_35_span_0_small_3_Template, 3, 1, "small", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx_r49.allPages.getButtonTitle(row_r48.documento == null ? null : row_r48.documento.numero_processo, row_r48.documento == null ? null : row_r48.documento.numero_documento));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("role", (row_r48.documento == null ? null : row_r48.documento.numero_processo == null ? null : row_r48.documento.numero_processo.length) ? "button" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"]("bi " + ((row_r48.documento == null ? null : row_r48.documento.numero_processo == null ? null : row_r48.documento.numero_processo.length) ? "bi bi-folder-symlink" : "bi bi-x-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r48.documento == null ? null : row_r48.documento.numero_processo == null ? null : row_r48.documento.numero_processo.length) ? row_r48.documento == null ? null : row_r48.documento.numero_processo : "N\u00E3o atribu\u00EDdo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r48.documento == null ? null : row_r48.documento.numero_documento == null ? null : row_r48.documento.numero_documento.length);
} }
function AdesaoListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, AdesaoListComponent_ng_template_35_span_0_Template, 4, 6, "span", 51);
} if (rf & 2) {
    const row_r48 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r48.documento == null ? null : row_r48.documento.numero_processo == null ? null : row_r48.documento.numero_processo.length);
} }
function AdesaoListComponent_column_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "column", 53);
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx_r19.edit)("options", ctx_r19.options);
} }
function AdesaoListComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r56 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r56.numero);
} }
function AdesaoListComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r57.usuario == null ? null : row_r57.usuario.matricula) || "");
} }
function AdesaoListComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r58 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r58.programa == null ? null : row_r58.programa.nome) || "");
} }
function AdesaoListComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r59 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r59.unidade == null ? null : row_r59.unidade.nome) || "");
} }
function AdesaoListComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r60 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r60.tipo_modalidade == null ? null : row_r60.tipo_modalidade.nome) || "");
} }
function AdesaoListComponent_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r61 = ctx.row;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r31.util.getDateTimeFormatted(row_r61.data_inicio_vigencia));
} }
function AdesaoListComponent_ng_template_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r62 = ctx.row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r33.util.getDateTimeFormatted(row_r62.data_fim_vigencia));
} }
function AdesaoListComponent_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r63 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r63.documento == null ? null : row_r63.documento.numero_processo == null ? null : row_r63.documento.numero_processo.length) ? row_r63.documento == null ? null : row_r63.documento.numero_processo : "N\u00E3o atribu\u00EDdo");
} }
const _c0 = function () { return ["configuracoes", "unidade"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["cadastros", "tipo-modalidade"]; };
class AdesaoListComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_0__["PageListBase"] {
    constructor(injector) {
        super(injector, _models_adesao_model__WEBPACK_IMPORTED_MODULE_8__["Adesao"], _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_9__["AdesaoDaoService"]);
        this.injector = injector;
        this.multiselectAllFields = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
        this.SITUACAO_FILTRO = [
            { key: "SOLICITADO", value: "Solicitado" },
            { key: "HOMOLOGADO", value: "Homologado" },
            { key: "CANCELADO", value: "Cancelado" }
        ];
        this.filterValidate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (controlName == "data_filtro_inicio" && control.value > ((_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.data_filtro_fim.value)) {
                result = "Maior que fim";
            }
            else if (controlName == "data_filtro_fim" && control.value < ((_b = this.filter) === null || _b === void 0 ? void 0 : _b.controls.data_filtro_inicio.value)) {
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
                result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
                result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
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
        this.unidadeDao = injector.get(_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.programaDao = injector.get(_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__["ProgramaDaoService"]);
        this.documentoDao = injector.get(_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__["DocumentoDaoService"]);
        this.usuarioDao = injector.get(_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.allPages = injector.get(_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_6__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoModalidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Adesão", true);
        this.code = "MOD_ADES";
        this.filter = this.fh.FormBuilder({
            usuario: { default: "" },
            unidade_id: { default: null },
            tipo_modalidade_id: { default: null },
            data_filtro: { default: null },
            data_filtro_inicio: { default: new Date() },
            data_filtro_fim: { default: new Date() }
        }, this.cdRef, this.filterValidate);
        this.join = ["unidade.entidade", "usuario", "programa", "documento", "tipo_modalidade"];
        // Testa se o usuário possui permissão para exibir dados do plano de trabalho
        if (this.auth.hasPermissionTo("MOD_ADES_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o plano de trabalho
        if (this.auth.hasPermissionTo("MOD_ADES_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.options.push({
            label: "TCR",
            icon: "bi bi-file-earmark-check",
            onClick: ((row) => this.go.navigate({ route: ['gestao', 'adesao', row.id, 'termos'] }, { modalClose: (modalResult) => console.log(modalResult === null || modalResult === void 0 ? void 0 : modalResult.conteudo) })).bind(this)
        });
    }
    filterClear(filter) {
        filter.controls.usuario.setValue("");
        filter.controls.unidade_id.setValue(null);
        filter.controls.tipo_modalidade_id.setValue(null);
        filter.controls.data_filtro.setValue(null);
        filter.controls.data_filtro_inicio.setValue(new Date());
        filter.controls.data_filtro_fim.setValue(new Date());
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
    needSign(adesao) {
        var _a, _b;
        let ids = [];
        if ((_a = adesao.documento_id) === null || _a === void 0 ? void 0 : _a.length) {
            const tipoModalidade = adesao.tipo_modalidade; //(this.tipoModalidade?.searchObj as TipoModalidade);
            const usuario = adesao.usuario; // (this.usuario?.searchObj as Usuario);
            const unidade = adesao.unidade; // (this.unidade?.searchObj as Unidade);
            const entidade = adesao.entidade;
            //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura) && usuario)
                ids.push(usuario.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_unidade) && unidade)
                ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_entidade) && entidade)
                ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
        }
        return !!((_b = adesao.documento_id) === null || _b === void 0 ? void 0 : _b.length) && ids.includes(this.auth.usuario.id);
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
AdesaoListComponent.selectRoute = { route: ["gestao", "adesao"] };
AdesaoListComponent.ɵfac = function AdesaoListComponent_Factory(t) { return new (t || AdesaoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["Injector"])); };
AdesaoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: AdesaoListComponent, selectors: [["app-adesao-list"]], viewQuery: function AdesaoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 64, vars: 65, consts: [["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "dynamicMultiselectMenu", "multiselectAllFields", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Usu\u00E1rio", "controlName", "usuario", "placeholder", "Usu\u00E1rio", 3, "size", "control"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Tipo de modalidade", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["date", "", "label", "In\u00EDcio", "controlName", "data_filtro_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["date", "", "label", "Fim", "controlName", "data_filtro_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["field", "numero", 3, "titleTemplate", "minWidth"], ["titleNumero", ""], [3, "titleTemplate", "template"], ["titleUsuario", ""], ["columnUsuario", ""], ["field", "status", 3, "titleTemplate", "minWidth"], ["titleStatus", ""], ["title", "Programa/Unidade", 3, "template"], ["columnProgramaUnidade", ""], ["title", "Modalidade", 3, "template"], ["columnModalidade", ""], ["titleVigencia", ""], ["columnInicioVigencia", ""], ["title", "TCR", 3, "template"], ["documento", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], ["title", "Numero", 3, "template"], ["reportNumero", ""], ["title", "Matricula usu\u00E1rio", 3, "template"], ["reportMatricula", ""], ["title", "Programa", 3, "template"], ["reportPrograma", ""], ["title", "Unidade", 3, "template"], ["reportUnidade", ""], ["reportModalidade", ""], ["title", "In\u00EDcio vig\u00EAncia", 3, "template"], ["reportInicioVigencia", ""], ["title", "Fim vig\u00EAncia", 3, "template"], ["reportFimVigencia", ""], ["title", "Termo de Ades\u00E3o", 3, "template"], ["reportTermoAdesao", ""], [3, "rows"], ["by", "numero", 3, "header"], ["by", "usuario.nome", 3, "header"], ["by", "status", 3, "header"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "fas", "fa-university"], [1, "bi", "bi-briefcase"], ["by", "data_inicio_vigencia", 3, "header"], ["by", "data_fim_vigencia", 3, "header"], ["class", "badge bg-light text-dark", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngIf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title", "click"], ["type", "options", 3, "onEdit", "options"]], template: function AdesaoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function AdesaoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, AdesaoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, AdesaoListComponent_ng_template_13_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, AdesaoListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, AdesaoListComponent_ng_template_18_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, AdesaoListComponent_ng_template_21_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](24, AdesaoListComponent_ng_template_24_Template, 2, 2, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](27, AdesaoListComponent_ng_template_27_Template, 2, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](30, AdesaoListComponent_ng_template_30_Template, 7, 2, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](32, AdesaoListComponent_ng_template_32_Template, 2, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "column", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, AdesaoListComponent_ng_template_35_Template, 1, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](37, AdesaoListComponent_column_37_Template, 1, 2, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "column", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](40, AdesaoListComponent_ng_template_40_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, AdesaoListComponent_ng_template_43_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "column", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](46, AdesaoListComponent_ng_template_46_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](48, "column", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](49, AdesaoListComponent_ng_template_49_Template, 1, 1, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](52, AdesaoListComponent_ng_template_52_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](54, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](55, AdesaoListComponent_ng_template_55_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](57, "column", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](58, AdesaoListComponent_ng_template_58_Template, 1, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](60, "column", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](61, AdesaoListComponent_ng_template_61_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](63, "pagination", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](17);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](19);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](22);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](25);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](28);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](31);
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](33);
        const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](36);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](41);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](44);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](47);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](50);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](53);
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](56);
        const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](59);
        const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](62);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_ADES_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_ADES_EDT"))("dynamicMultiselectMenu", ctx.dynamicMultiselectMenu.bind(ctx))("multiselectAllFields", ctx.multiselectAllFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](60, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](59, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](63, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](62, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.SITUACAO_FILTRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r1)("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r3)("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r7)("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r13)("template", _r15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r34);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_12__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_16__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_17__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_18__["ColumnComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_19__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_20__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__["ToolbarComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_22__["OrderComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "RkwS":
/*!****************************************************************!*\
  !*** ./src/app/modules/gestao/adesao/adesao-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: AdesaoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoRoutingModule", function() { return AdesaoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../guards/auth.guard */ "UTcu");
/* harmony import */ var _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resolvies/config.resolver */ "toza");
/* harmony import */ var _adesao_list_adesao_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adesao-list/adesao-list.component */ "LQdZ");
/* harmony import */ var _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./adesao-form/adesao-form.component */ "dmfS");
/* harmony import */ var _adesao_form_termo_adesao_form_termo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adesao-form-termo/adesao-form-termo.component */ "VyDs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _adesao_list_adesao_list_component__WEBPACK_IMPORTED_MODULE_3__["AdesaoListComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Adesão" } },
    { path: 'new', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'termo', component: _adesao_form_termo_adesao_form_termo_component__WEBPACK_IMPORTED_MODULE_5__["AdesaoFormTermoComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Termo de Ciência e Reponsabilidade", modal: true } },
    { path: ':id/edit', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: ':id/termos', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Termos de Ciência e Reponsabilidade", modal: true } }
];
class AdesaoRoutingModule {
}
AdesaoRoutingModule.ɵfac = function AdesaoRoutingModule_Factory(t) { return new (t || AdesaoRoutingModule)(); };
AdesaoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AdesaoRoutingModule });
AdesaoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AdesaoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "U+ZE":
/*!********************************************************!*\
  !*** ./src/app/modules/gestao/adesao/adesao.module.ts ***!
  \********************************************************/
/*! exports provided: AdesaoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoModule", function() { return AdesaoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _adesao_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adesao-routing.module */ "RkwS");
/* harmony import */ var _adesao_list_adesao_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adesao-list/adesao-list.component */ "LQdZ");
/* harmony import */ var _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adesao-form/adesao-form.component */ "dmfS");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _adesao_form_termo_adesao_form_termo_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./adesao-form-termo/adesao-form-termo.component */ "VyDs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class AdesaoModule {
}
AdesaoModule.ɵfac = function AdesaoModule_Factory(t) { return new (t || AdesaoModule)(); };
AdesaoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AdesaoModule });
AdesaoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"],
            _adesao_routing_module__WEBPACK_IMPORTED_MODULE_1__["AdesaoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AdesaoModule, { declarations: [_adesao_list_adesao_list_component__WEBPACK_IMPORTED_MODULE_2__["AdesaoListComponent"],
        _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_3__["AdesaoFormComponent"],
        _adesao_form_termo_adesao_form_termo_component__WEBPACK_IMPORTED_MODULE_7__["AdesaoFormTermoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"],
        _adesao_routing_module__WEBPACK_IMPORTED_MODULE_1__["AdesaoRoutingModule"]] }); })();


/***/ }),

/***/ "VyDs":
/*!****************************************************************************************!*\
  !*** ./src/app/modules/gestao/adesao/adesao-form-termo/adesao-form-termo.component.ts ***!
  \****************************************************************************************/
/*! exports provided: AdesaoFormTermoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoFormTermoComponent", function() { return AdesaoFormTermoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class AdesaoFormTermoComponent {
    constructor() { }
    ngOnInit() {
    }
}
AdesaoFormTermoComponent.ɵfac = function AdesaoFormTermoComponent_Factory(t) { return new (t || AdesaoFormTermoComponent)(); };
AdesaoFormTermoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AdesaoFormTermoComponent, selectors: [["app-adesao-form-termo"]], decls: 2, vars: 0, template: function AdesaoFormTermoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "adesao-form-termo works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tZm9ybS10ZXJtby5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "Xm6x":
/*!*******************************************!*\
  !*** ./src/app/dao/adesao-dao.service.ts ***!
  \*******************************************/
/*! exports provided: AdesaoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoDaoService", function() { return AdesaoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AdesaoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Adesao", injector);
        this.injector = injector;
    }
    metadados(plano, inicioPeriodo, fimPeriodo) {
        return new Promise((resolve, reject) => {
            this.server.post('api/Relatorio/metadados', {
                plano: plano, inicioPeriodo: inicioPeriodo, fimPeriodo: fimPeriodo
            }).subscribe(response => {
                resolve((response === null || response === void 0 ? void 0 : response.metadados) || []);
            }, error => reject(error));
        });
    }
    metadadosPlano(plano_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/metadadosPlano', { plano_id }).subscribe(response => {
                resolve((response === null || response === void 0 ? void 0 : response.metadadosPlano) || []);
            }, error => reject(error));
        });
    }
}
AdesaoDaoService.ɵfac = function AdesaoDaoService_Factory(t) { return new (t || AdesaoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
AdesaoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AdesaoDaoService, factory: AdesaoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dmfS":
/*!****************************************************************************!*\
  !*** ./src/app/modules/gestao/adesao/adesao-form/adesao-form.component.ts ***!
  \****************************************************************************/
/*! exports provided: AdesaoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoFormComponent", function() { return AdesaoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ "793T");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var _dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../dao/programa-dao.service */ "bsmI");
/* harmony import */ var _dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var _dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../dao/atividade-dao.service */ "hmA2");
/* harmony import */ var _dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../dao/documento-dao-service */ "xIT/");
/* harmony import */ var _listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../services/calendar.service */ "3WFG");
/* harmony import */ var _dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var _models_documento_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../models/documento.model */ "xrhv");
/* harmony import */ var _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../dao/adesao-dao.service */ "Xm6x");
/* harmony import */ var _models_adesao_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../models/adesao.model */ "BYS4");
/* harmony import */ var _dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../dao/entidade-dao.service */ "aPFm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");


























const _c0 = ["gridDocumentos"];
const _c1 = ["tabs"];
const _c2 = ["usuario"];
const _c3 = ["unidade"];
const _c4 = ["entidade"];
const _c5 = ["programa"];
const _c6 = ["tipo_modalidade"];
const _c7 = function () { return ["cadastros", "programa"]; };
const _c8 = function (a0) { return { route: a0 }; };
const _c9 = function () { return ["afastamentos"]; };
const _c10 = function () { return ["configuracoes", "usuario"]; };
const _c11 = function () { return ["configuracoes", "entidade"]; };
const _c12 = function () { return ["entidade"]; };
const _c13 = function () { return ["configuracoes", "unidade"]; };
const _c14 = function () { return ["cadastros", "tipo-modalidade"]; };
function AdesaoFormComponent_tab_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "input-search", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r8.onProgramaSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "input-search", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r10.onUsuarioSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "input-datetime", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function AdesaoFormComponent_tab_3_Template_input_datetime_change_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r11.onDataInicioChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "input-datetime", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function AdesaoFormComponent_tab_3_Template_input_datetime_change_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r12.onDataFimChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "input-search", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r13.onEntidadeSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "input-search", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r14.onUnidadeSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "input-search", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r15.onTipoModalidadeSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.programa_id)("dao", ctx_r1.programaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](26, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](25, _c7)));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.usuario_id)("dao", ctx_r1.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](28, _c9))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](30, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](29, _c10)));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.data_inicio_vigencia);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.data_fim_vigencia);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("dao", ctx_r1.entidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](33, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](32, _c11)));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.unidade_id)("join", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](35, _c12))("dao", ctx_r1.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](37, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](36, _c13)));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.tipo_modalidade_id)("dao", ctx_r1.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](40, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](39, _c14)));
} }
function AdesaoFormComponent_tab_4_top_alert_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "top-alert", 29);
} }
function AdesaoFormComponent_tab_4_ng_template_8_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r24.util.getDateTimeFormatted(row_r23.data_fim), " ");
} }
function AdesaoFormComponent_tab_4_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdesaoFormComponent_tab_4_ng_template_8_span_3_Template, 3, 1, "span", 32);
} if (rf & 2) {
    const row_r23 = ctx.row;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r20.util.getDateTimeFormatted(row_r23.data_inicio), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r23.data_fim);
} }
function AdesaoFormComponent_tab_4_ng_template_11_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, " Vigente ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} }
function AdesaoFormComponent_tab_4_ng_template_11_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const assinatura_r29 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r28.util.apelidoOuNome(assinatura_r29.usuario), " ");
} }
function AdesaoFormComponent_tab_4_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdesaoFormComponent_tab_4_ng_template_11_span_3_Template, 3, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](5, AdesaoFormComponent_tab_4_ng_template_11_span_5_Template, 3, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r26 = ctx.row;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassMap"](ctx_r22.lookup.getColor(ctx_r22.lookup.DOCUMENTO_STATUS, row_r26.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassMap"](ctx_r22.lookup.getIcon(ctx_r22.lookup.DOCUMENTO_STATUS, row_r26.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r22.lookup.getValue(ctx_r22.lookup.DOCUMENTO_STATUS, row_r26.status), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r22.isVigente(row_r26));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", row_r26.assinaturas);
} }
function AdesaoFormComponent_tab_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "tab", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, AdesaoFormComponent_tab_4_top_alert_1_Template, 1, 0, "top-alert", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "grid", 22, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "columns");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "column", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](8, AdesaoFormComponent_tab_4_ng_template_8_Template, 4, 2, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "column", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](11, AdesaoFormComponent_tab_4_ng_template_11_Template, 6, 7, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "column", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](9);
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](12);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx_r2.isTermos);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("control", ctx_r2.form.controls.documentos)("disabled", undefined)("hasEdit", false)("hasDelete", false)("hasAdd", ctx_r2.isTermos)("add", ctx_r2.isTermos ? ctx_r2.addDocumento.bind(ctx_r2) : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dynamicButtons", ctx_r2.documentoDynamicButtons.bind(ctx_r2));
} }
class AdesaoFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, _models_adesao_model__WEBPACK_IMPORTED_MODULE_13__["Adesao"], _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_12__["AdesaoDaoService"]);
        this.injector = injector;
        this.validateAtividades = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == 'atividade_id' && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validate = (control, controlName) => {
            let result = null;
            // if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
            //   result = "Obrigatório";
            // } else if(['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
            //   result = "Valor não pode ser zero.";
            // } else if(['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
            //   if(!this.util.isDataValid(control.value)) {
            //     result = "Inválido";
            //   } else if(!this.programa?.searchObj) {
            //     result = "Selecionar programa";
            //   } else if(controlName == 'data_inicio_vigencia' && (control.value as Date).getTime() < (this.programa!.searchObj! as Programa).data_inicio_vigencia.getTime()) {
            //     result = "Menor que programa";
            //   } else if(controlName == 'data_fim_vigencia' && (control.value as Date).getTime() > (this.programa!.searchObj! as Programa).data_fim_vigencia.getTime()) {
            //     result = "Maior que programa";
            //   }
            // }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando "; //+ (entity?.nome || "");
        };
        this.join = ["unidade.entidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "entidade"];
        this.unidadeDao = injector.get(_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.entidadeDao = injector.get(_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_14__["EntidadeDaoService"]);
        this.programaDao = injector.get(_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__["ProgramaDaoService"]);
        this.usuarioDao = injector.get(_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.atividadeDao = injector.get(_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__["AtividadeDaoService"]);
        this.calendar = injector.get(_services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["CalendarService"]);
        this.allPages = injector.get(_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_8__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_10__["TipoModalidadeDaoService"]);
        this.documentoDao = injector.get(_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_7__["DocumentoDaoService"]);
        this.form = this.fh.FormBuilder({
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            status: { default: "SOLICITADO" },
            programa_id: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            entidade_id: { default: "" },
            tipo_modalidade_id: { default: "" },
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        const segment = (this.url ? (_a = this.url[this.url.length - 1]) === null || _a === void 0 ? void 0 : _a.path : "") || "";
        this.action = ["termos"].includes(segment) ? segment : this.action;
    }
    get isTermos() {
        return this.action == "termos";
    }
    // public formValidation = (form?: FormGroup) => {
    //     return undefined;
    // };
    onProgramaSelect(selected) {
        var _a, _b;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_inicio_vigencia.updateValueAndValidity();
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.data_fim_vigencia.updateValueAndValidity();
    }
    onTipoModalidadeSelect(selected) {
        var _a, _b;
        const tipoModalidade = (_a = this.tipoModalidade) === null || _a === void 0 ? void 0 : _a.searchObj;
        if (tipoModalidade)
            (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.ganho_produtividade.setValue(tipoModalidade.ganho_produtividade);
    }
    onUsuarioSelect(selected) {
        this.cdRef.detectChanges();
    }
    onDataInicioChange(event) {
        this.cdRef.detectChanges();
    }
    onDataFimChange(event) {
        this.cdRef.detectChanges();
    }
    onUnidadeSelect(selected) {
        this.cdRef.detectChanges();
    }
    onEntidadeSelect(selected) {
        this.cdRef.detectChanges();
    }
    loadData(entity, form) {
        var _a, _b, _c, _d, _e;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            yield Promise.all([
                this.calendar.loadFeriadosCadastrados(entity.unidade_id),
                (_a = this.entidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.entidade || entity.entidade_id),
                (_b = this.unidade) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.unidade || entity.unidade_id),
                (_c = this.usuario) === null || _c === void 0 ? void 0 : _c.loadSearch(entity.usuario || entity.usuario_id),
                (_d = this.programa) === null || _d === void 0 ? void 0 : _d.loadSearch(entity.programa || entity.programa_id),
                (_e = this.tipoModalidade) === null || _e === void 0 ? void 0 : _e.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
            ]);
            form.patchValue(this.util.fillForm(formValue, entity));
            this.cdRef.detectChanges();
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.isTermos) {
                this.entity = (yield this.dao.getById(this.urlParams.get("id"), this.join));
            }
            else {
                this.entity = new _models_adesao_model__WEBPACK_IMPORTED_MODULE_13__["Adesao"]();
                this.entity.entidade = this.auth.unidade.entidade;
                this.entity.unidade = this.auth.unidade;
                this.entity.unidade_id = this.auth.unidade.id;
                this.entity.entidade_id = this.auth.unidade.entidade_id;
            }
            this.loadData(this.entity, this.form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let adesao = this.util.fill(new _models_adesao_model__WEBPACK_IMPORTED_MODULE_13__["Adesao"](), this.entity);
            adesao = this.util.fillForm(adesao, this.form.value);
            resolve(adesao);
        });
    }
    documentoDynamicButtons(row) {
        let result = [];
        let documento = row;
        if (this.isTermos && this.needSign(documento)) {
            result.push({ hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
        }
        result.push({ hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento) => { this.dialog.html({ title: "Termo de adesão", modalWidth: 1000 }, documento.conteudo || ""); }).bind(this) });
        return result;
    }
    needSign(documento) {
        const tipoModalidade = this.entity.tipo_modalidade; //(this.tipoModalidade?.searchObj as TipoModalidade);
        const usuario = this.entity.usuario; // (this.usuario?.searchObj as Usuario);
        const unidade = this.entity.unidade; // (this.unidade?.searchObj as Unidade);
        const entidade = unidade === null || unidade === void 0 ? void 0 : unidade.entidade;
        const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario.id);
        let ids = [];
        if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura) && usuario)
            ids.push(usuario.id);
        if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_unidade) && unidade)
            ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
        if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_entidade) && entidade)
            ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
        return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario.id);
    }
    signDocumento(documento) {
        this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
            if (response) {
                this.loading = true;
                this.documentoDao.assinar([documento.id]).then(response => {
                    var _a;
                    if (response === null || response === void 0 ? void 0 : response.length) {
                        let documentos = (this.form.controls.documentos.value || []);
                        let found = documentos.find(x => x.id == (documento === null || documento === void 0 ? void 0 : documento.id));
                        if (found)
                            found.assinaturas = response[0].assinaturas;
                        this.form.controls.documentos.setValue(documentos);
                        (_a = this.gridDocumentos) === null || _a === void 0 ? void 0 : _a.reset();
                    }
                }).finally(() => this.loading = false);
            }
        });
    }
    addDocumento() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const documento = new _models_documento_model__WEBPACK_IMPORTED_MODULE_11__["Documento"]();
            documento.id = this.dao.generateUuid();
            documento.plano_id = this.entity.id;
            documento._status = "ADD";
            this.go.navigate({ route: ['gestao', 'adesao', 'termo'] }, { metadata: { documento: documento, plano: this.entity }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            let documentos = (this.form.controls.documentos.value || []);
                            if (this.isTermos) {
                                this.clearErros();
                                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                try {
                                    modalResult = yield this.documentoDao.save(Object.assign(new _models_documento_model__WEBPACK_IMPORTED_MODULE_11__["Documento"](), {
                                        especie: "TCR",
                                        conteudo: modalResult === null || modalResult === void 0 ? void 0 : modalResult.termo,
                                        metadados: { atividades_termo_adesao: modalResult.atividades_termo_adesao },
                                        plano_id: this.entity.id,
                                        status: "GERADO"
                                    }), ["assinaturas.usuario:id,nome,apelido"]);
                                }
                                catch (error) {
                                    this.error(error.message ? error.message : error);
                                    modalResult = undefined;
                                }
                                finally {
                                    this.dialog.closeSppinerOverlay();
                                }
                            }
                            if (modalResult) {
                                documentos.push(modalResult);
                                this.form.controls.documentos.setValue(documentos);
                                this.dialog.showSppinerOverlay("Recarregando dados do plano");
                                yield this.initializeData(this.form);
                                this.dialog.closeSppinerOverlay();
                            }
                            this.cdRef.detectChanges();
                        }))();
                    }
                } });
            return undefined;
        });
    }
    isVigente(documento) {
        return this.form.controls.documento_id.value == documento.id;
    }
    onProcessoClick(row) {
        this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
    }
}
AdesaoFormComponent.ɵfac = function AdesaoFormComponent_Factory(t) { return new (t || AdesaoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["Injector"])); };
AdesaoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({ type: AdesaoFormComponent, selectors: [["app-adesao-form"]], viewQuery: function AdesaoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c6, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 7, consts: [[3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title"], ["tabs", ""], ["key", "DADOS", "label", "Dados", 4, "ngIf"], ["key", "TERMO", "label", "Termo de Ci\u00EAncia e Responsabilidade", 4, "ngIf"], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Programa", "icon", "bi bi-layout-text-window-reverse", "controlName", "programa_id", 3, "size", "control", "dao", "selectRoute", "select"], ["programa", ""], ["label", "Usu\u00E1rio", "icon", "bi bi-person", "controlName", "usuario_id", 3, "size", "control", "dao", "join", "selectRoute", "select"], ["usuario", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Entidade", "icon", "bi bi-bookmark-heart", "controlName", "entidade_id", 3, "size", "dao", "selectRoute", "select"], ["entidade", ""], ["label", "Unidade", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "control", "join", "dao", "selectRoute", "select"], ["unidade", ""], ["label", "Modalidade", "icon", "bi bi-cast", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute", "select"], ["tipo_modalidade", ""], ["key", "TERMO", "label", "Termo de Ci\u00EAncia e Responsabilidade"], ["type", "warning", "message", "Para [INSERIR] ou [ASSINAR] termos escolha op\u00E7\u00E3o TCR o na tela de listagem", 4, "ngIf"], ["clss", "row"], ["editable", "", 3, "control", "disabled", "hasEdit", "hasDelete", "hasAdd", "add"], ["gridDocumentos", "", "documentos", ""], ["title", "Data", 3, "template"], ["dataInicio", ""], ["title", "Status", 3, "template"], ["vigente", ""], ["type", "options", 3, "dynamicButtons"], ["type", "warning", "message", "Para [INSERIR] ou [ASSINAR] termos escolha op\u00E7\u00E3o TCR o na tela de listagem"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Data da inclus\u00E3o", 1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-calendar-plus"], ["class", "badge bg-light text-dark", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Data substitui\u00E7\u00E3o", 4, "ngIf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Data substitui\u00E7\u00E3o", 1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-calendar-x"], ["class", "badge rounded-pill bg-info text-dark", 4, "ngIf"], [1, "d-block"], ["class", "badge rounded-pill bg-primary", 4, "ngFor", "ngForOf"], [1, "badge", "rounded-pill", "bg-info", "text-dark"], [1, "bi", "bi-clipboard-check"], [1, "badge", "rounded-pill", "bg-primary"], [1, "bi", "bi-pen"]], template: function AdesaoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("submit", function AdesaoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AdesaoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "tabs", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, AdesaoFormComponent_tab_3_Template, 16, 42, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, AdesaoFormComponent_tab_4_Template, 14, 10, "tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.isTermos);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.isTermos || !ctx.isNew);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__["TabsComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgIf"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__["InputDatetimeComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_21__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_22__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_23__["ColumnComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_24__["TopAlertComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


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
    constructor(data) {
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
        this.initialization(data);
    }
}
Documento.STATUS_GERADO = "GERADO";
Documento.STATUS_AGUARDANDO_SEI = "GERADO";


/***/ })

}]);
//# sourceMappingURL=modules-gestao-adesao-adesao-module.js.map