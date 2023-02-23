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

/***/ "Ke1B":
/*!************************************************!*\
  !*** ./src/app/models/adesao-unidade.model.ts ***!
  \************************************************/
/*! exports provided: AdesaoUnidade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoUnidade", function() { return AdesaoUnidade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class AdesaoUnidade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.unidade_id = "";
        this.programa_adesao_id = "";
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
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");

























function AdesaoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "toolbar");
} }
function AdesaoListComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r29 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r29);
} }
function AdesaoListComponent_ng_template_16_badge_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "badge", 42);
} if (rf & 2) {
    const row_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", row_r30.fase.cor)("label", row_r30.fase.nome);
} }
function AdesaoListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "badge", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, AdesaoListComponent_ng_template_16_badge_2_Template, 1, 2, "badge", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r30 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"](ctx_r4.lookup.getColor(ctx_r4.lookup.ADESAO_STATUS, row_r30.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("label", ctx_r4.lookup.getValue(ctx_r4.lookup.ADESAO_STATUS, row_r30.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r30.fase);
} }
function AdesaoListComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r33 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r33.tipo_modalidade == null ? null : row_r33.tipo_modalidade.nome) || "", "");
} }
function AdesaoListComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0, " Vig\u00EAncia de");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "order", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " a ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "order", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "Fim");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r34 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r34);
} }
function AdesaoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r35 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r10.dao.getDateFormatted(row_r35.data_inicio_vigencia) + " at\u00E9 " + ctx_r10.dao.getDateFormatted(row_r35.data_fim_vigencia), "");
} }
function AdesaoListComponent_ng_template_27_span_0_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Sei n\u00BA ", row_r36.documento == null ? null : row_r36.documento.numero_documento, "");
} }
function AdesaoListComponent_ng_template_27_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function AdesaoListComponent_ng_template_27_span_0_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r42); const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r40.onProcessoClick(row_r36); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, AdesaoListComponent_ng_template_27_span_0_small_3_Template, 3, 1, "small", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx_r37.allPages.getButtonTitle(row_r36.documento == null ? null : row_r36.documento.numero_processo, row_r36.documento == null ? null : row_r36.documento.numero_documento));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("role", (row_r36.documento == null ? null : row_r36.documento.numero_processo == null ? null : row_r36.documento.numero_processo.length) ? "button" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"]("bi " + ((row_r36.documento == null ? null : row_r36.documento.numero_processo == null ? null : row_r36.documento.numero_processo.length) ? "bi bi-folder-symlink" : "bi bi-x-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r36.documento == null ? null : row_r36.documento.numero_processo == null ? null : row_r36.documento.numero_processo.length) ? row_r36.documento == null ? null : row_r36.documento.numero_processo : "N\u00E3o atribu\u00EDdo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r36.documento == null ? null : row_r36.documento.numero_documento == null ? null : row_r36.documento.numero_documento.length);
} }
function AdesaoListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, AdesaoListComponent_ng_template_27_span_0_Template, 4, 6, "span", 45);
} if (rf & 2) {
    const row_r36 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r36.documento == null ? null : row_r36.documento.numero_processo == null ? null : row_r36.documento.numero_processo.length);
} }
function AdesaoListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r44 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r44.numero);
} }
function AdesaoListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r45 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r45.usuario == null ? null : row_r45.usuario.matricula) || "");
} }
function AdesaoListComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r46 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r46.programa == null ? null : row_r46.programa.nome) || "");
} }
function AdesaoListComponent_ng_template_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r47 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r47.unidade == null ? null : row_r47.unidade.nome) || "");
} }
function AdesaoListComponent_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r48 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r48.tipo_modalidade == null ? null : row_r48.tipo_modalidade.nome) || "");
} }
function AdesaoListComponent_ng_template_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r49 = ctx.row;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r24.util.getDateTimeFormatted(row_r49.data_inicio_vigencia));
} }
function AdesaoListComponent_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r50 = ctx.row;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r26.util.getDateTimeFormatted(row_r50.data_fim_vigencia));
} }
function AdesaoListComponent_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r51.documento == null ? null : row_r51.documento.numero_processo == null ? null : row_r51.documento.numero_processo.length) ? row_r51.documento == null ? null : row_r51.documento.numero_processo : "N\u00E3o atribu\u00EDdo");
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
        this.title = this.lex.noun("adesao", true);
        this.code = "MOD_ADES";
        this.filter = this.fh.FormBuilder({
            usuario: { default: "" },
            unidade_id: { default: null },
            tipo_modalidade_id: { default: null },
            data_filtro: { default: null },
            data_filtro_inicio: { default: new Date() },
            data_filtro_fim: { default: new Date() }
        }, this.cdRef, this.filterValidate);
        this.join = ["unidade.entidade", "usuarios.usuario:id,nome", "unidades.unidade:id,nome", "programa", "documento", "tipo_modalidade"];
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
                label: "Cancelar",
                onClick: this.cancel.bind(this)
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
            //const usuario = adesao.usuario!; // (this.usuario?.searchObj as Usuario);
            //onst unidade = adesao.unidade!; // (this.unidade?.searchObj as Unidade);
            const entidade = adesao.entidade;
            //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
            //if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
            //if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
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
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 56, vars: 62, consts: [["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "dynamicMultiselectMenu", "multiselectAllFields", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Usu\u00E1rio", "controlName", "usuario", "placeholder", "Usu\u00E1rio", 3, "size", "control"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Tipo de modalidade", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["date", "", "label", "In\u00EDcio", "controlName", "data_filtro_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["date", "", "label", "Fim", "controlName", "data_filtro_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["field", "numero", 3, "titleTemplate", "minWidth"], ["titleNumero", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["title", "Modalidade", 3, "template"], ["columnModalidade", ""], [3, "titleTemplate", "template"], ["titleVigencia", ""], ["columnInicioVigencia", ""], ["title", "TCR", 3, "template"], ["documento", ""], ["type", "options", 3, "onEdit", "options"], ["title", "Numero", 3, "template"], ["reportNumero", ""], ["title", "Matricula usu\u00E1rio", 3, "template"], ["reportMatricula", ""], ["title", "Programa", 3, "template"], ["reportPrograma", ""], ["title", "Unidade", 3, "template"], ["reportUnidade", ""], ["reportModalidade", ""], ["title", "In\u00EDcio vig\u00EAncia", 3, "template"], ["reportInicioVigencia", ""], ["title", "Fim vig\u00EAncia", 3, "template"], ["reportFimVigencia", ""], ["title", "Termo de Ades\u00E3o", 3, "template"], ["reportTermoAdesao", ""], [3, "rows"], ["by", "numero", 3, "header"], [1, "text-wrap"], [3, "label"], [3, "color", "label", 4, "ngIf"], [3, "color", "label"], ["by", "data_inicio_vigencia", 3, "header"], ["by", "data_fim_vigencia", 3, "header"], ["class", "badge bg-light text-dark", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngIf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title", "click"]], template: function AdesaoListComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, AdesaoListComponent_ng_template_16_Template, 3, 4, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, AdesaoListComponent_ng_template_19_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, AdesaoListComponent_ng_template_22_Template, 7, 2, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](24, AdesaoListComponent_ng_template_24_Template, 2, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](27, AdesaoListComponent_ng_template_27_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](29, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](32, AdesaoListComponent_ng_template_32_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "column", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, AdesaoListComponent_ng_template_35_Template, 1, 1, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "column", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](38, AdesaoListComponent_ng_template_38_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](41, AdesaoListComponent_ng_template_41_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](43, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](44, AdesaoListComponent_ng_template_44_Template, 1, 1, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](46, "column", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](47, AdesaoListComponent_ng_template_47_Template, 1, 1, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](49, "column", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](50, AdesaoListComponent_ng_template_50_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](52, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](53, AdesaoListComponent_ng_template_53_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](55, "pagination", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](17);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](20);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](23);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](25);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](28);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](33);
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](36);
        const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](39);
        const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](42);
        const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](45);
        const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](48);
        const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](51);
        const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](54);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("dynamicMultiselectMenu", ctx.dynamicMultiselectMenu.bind(ctx))("multiselectAllFields", ctx.multiselectAllFields)("hasAdd", ctx.auth.hasPermissionTo("MOD_ADES_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_ADES_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](57, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](56, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](60, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](59, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.SITUACAO_FILTRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r1)("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r7)("template", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r21);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_12__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_16__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_17__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_18__["ColumnComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_19__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_20__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__["ToolbarComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_22__["OrderComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_23__["BadgeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


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
/* harmony import */ var _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../uteis/documentos/documentos.component */ "jO9R");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _adesao_list_adesao_list_component__WEBPACK_IMPORTED_MODULE_3__["AdesaoListComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Adesão" } },
    { path: 'new', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'termo', component: _adesao_form_termo_adesao_form_termo_component__WEBPACK_IMPORTED_MODULE_5__["AdesaoFormTermoComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Termo de Ciência e Reponsabilidade", modal: true } },
    { path: ':id/edit', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _adesao_form_adesao_form_component__WEBPACK_IMPORTED_MODULE_4__["AdesaoFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: ':id/termos', component: _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_6__["DocumentosComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Termos de Ciência e Reponsabilidade", modal: true } }
];
class AdesaoRoutingModule {
}
AdesaoRoutingModule.ɵfac = function AdesaoRoutingModule_Factory(t) { return new (t || AdesaoRoutingModule)(); };
AdesaoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AdesaoRoutingModule });
AdesaoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AdesaoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "RpRR":
/*!************************************************!*\
  !*** ./src/app/models/adesao-usuario.model.ts ***!
  \************************************************/
/*! exports provided: AdesaoUsuario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdesaoUsuario", function() { return AdesaoUsuario; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class AdesaoUsuario extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.usuario_id = "";
        this.programa_adesao_id = "";
        this.initialization(data);
    }
}


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/adesao-dao.service */ "Xm6x");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_adesao_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/adesao.model */ "BYS4");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/navigate.service */ "RANn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ "7B2Z");





















const _c0 = ["usuario"];
const _c1 = ["unidade"];
const _c2 = ["programa"];
const _c3 = ["tipoDocumento"];
const _c4 = ["tipo_modalidade"];
const _c5 = ["termo"];
const _c6 = ["entidade"];
class AdesaoFormTermoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_adesao_model__WEBPACK_IMPORTED_MODULE_10__["Adesao"], src_app_dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_2__["AdesaoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a, _b, _c, _d, _e;
            let result = null;
            if (controlName == "tipo_documento_id" && !((_a = control === null || control === void 0 ? void 0 : control.value) === null || _a === void 0 ? void 0 : _a.length) && ((_e = (_d = (_c = (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls) === null || _c === void 0 ? void 0 : _c.numero_processo) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a, _b;
            if (!((_a = this.tipoDocumento) === null || _a === void 0 ? void 0 : _a.searchObj) && ((_b = form === null || form === void 0 ? void 0 : form.controls.tipo_documento_id.value) === null || _b === void 0 ? void 0 : _b.length)) {
                return "Aguarde o carregamento do tipo de documento";
            }
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando "; //+ (entity?.nome || "");
        };
        this.join = ["unidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos"];
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__["ProgramaDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__["UsuarioDaoService"]);
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__["TipoDocumentoDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["TipoModalidadeDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__["DocumentoDaoService"]);
        this.form = this.fh.FormBuilder({
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            programa_id: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            documento_id: { default: "" },
            documentos: { default: [] },
            tipo_documento_id: { default: "" },
            numero_processo: { default: "" },
            tipo_modalidade_id: { default: "" },
        }, this.cdRef, this.validate);
    }
    onVinculadasChange(event) {
        this.cdRef.detectChanges();
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            yield Promise.all([
                //this.unidade!.loadSearch(entity.unidade || entity.unidade_id),
                //this.usuario!.loadSearch(entity.usuario || entity.usuario_id),
                this.programa.loadSearch(entity.programa || entity.programa_id),
                this.tipoModalidade.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
            ]);
            if (this.processo) {
                formValue.id_processo = this.processo.id_processo;
                formValue.numero_processo = this.processo.numero_processo;
            }
            formValue.data_inicio = this.auth.hora;
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getById(this.metadata.adesao.id, this.join));
            this.processo = (_a = this.metadata) === null || _a === void 0 ? void 0 : _a.processo;
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            //if(this.processo) {
            resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__["NavigateResult"](Object.assign(this.form.value, {
            // termo: this.termo,
            // atividades_termo_adesao: this.termo!.atividades.map(x => this.util.removeAcentos(x.nome.toLowerCase())),
            // codigo_tipo_documento: (this.tipoDocumento?.searchObj as TipoDocumento)?.codigo
            })));
            /*} else {
              const documento = Object.assign(new Documento(), {
                especie: "TERMO_ADESAO",
                conteudo: this.termo!.conteudo,
                plano_id: this.entity!.id,
                status: "GERADO"
              });
              this.documentoDao.save(documento).then(doc => resolve(undefined)).catch(reject);
            }*/
        });
    }
    get formaContagemCargaHoraria() {
        var _a, _b;
        const forma = ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.forma_contagem_carga_horaria) === null || _b === void 0 ? void 0 : _b.value) || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
}
AdesaoFormTermoComponent.ɵfac = function AdesaoFormTermoComponent_Factory(t) { return new (t || AdesaoFormTermoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["Injector"])); };
AdesaoFormTermoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: AdesaoFormTermoComponent, selectors: [["app-adesao-form-termo"]], viewQuery: function AdesaoFormTermoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c6, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoDocumento = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.termo = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 13, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["disabled", "", "label", "Programa", "icon", "bi bi-layout-text-window-reverse", "controlName", "programa_id", 3, "size", "control", "dao"], ["programa", ""], ["disabled", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Programa", 3, "size", "control"], ["label", "Usu\u00E1rios", "controlName", "usuarios", 3, "size"], ["label", "Usu\u00E1rio", "icon", "far fa-edit", "controlName", "usuario_id"], ["label", "Unidades", "controlName", "unidades", 3, "size"], ["label", "Usu\u00E1rio", "icon", "far fa-edit", "controlName", "unidade_id"], ["title", "Pr\u00E9-visualiza\u00E7\u00E3o do termo de ci\u00EAcia e responsabilidade", "collapse", "", 3, "collapsed"]], template: function AdesaoFormTermoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function AdesaoFormTermoComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AdesaoFormTermoComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-search", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "input-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "input-multiselect", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "input-multiselect", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](10, "input-text", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "separator", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "input-editor");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.programa_id)("dao", ctx.programaDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_inicio_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_fim_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("collapsed", true);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__["InputDatetimeComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__["InputMultiselectComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__["InputTextComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__["SeparatorComponent"], _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_19__["InputEditorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tZm9ybS10ZXJtby5jb21wb25lbnQuc2NzcyJ9 */"] });


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
/* harmony import */ var _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../dao/adesao-dao.service */ "Xm6x");
/* harmony import */ var _models_adesao_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../models/adesao.model */ "BYS4");
/* harmony import */ var _dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_models_adesao_usuario_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/models/adesao-usuario.model */ "RpRR");
/* harmony import */ var src_app_models_adesao_unidade_model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/models/adesao-unidade.model */ "Ke1B");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
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
const _c9 = function () { return ["cadastros", "tipo-modalidade"]; };
const _c10 = function () { return ["afastamentos"]; };
const _c11 = function () { return ["configuracoes", "usuario"]; };
const _c12 = function () { return ["entidade"]; };
const _c13 = function () { return ["configuracoes", "unidade"]; };
function AdesaoFormComponent_tab_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "input-search", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r8.onProgramaSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](4, "input-search", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r10.onTipoModalidadeSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](6, "input-text", 11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "input-datetime", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function AdesaoFormComponent_tab_3_Template_input_datetime_change_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r11.onDataInicioChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](10, "input-datetime", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function AdesaoFormComponent_tab_3_Template_input_datetime_change_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r12.onDataFimChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](11, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](12, "input-multiselect", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "input-search", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r13.onUsuarioSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "input-multiselect", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](16, "input-search", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function AdesaoFormComponent_tab_3_Template_input_search_select_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r9); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"](); return ctx_r14.onUnidadeSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.programa_id)("dao", ctx_r1.programaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](26, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](25, _c7)));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.tipo_modalidade_id)("dao", ctx_r1.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](29, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](28, _c9)));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.data_inicio_vigencia);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.data_fim_vigencia);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("addItemHandle", ctx_r1.addUsuarioHandle.bind(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dao", ctx_r1.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](31, _c10))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](33, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](32, _c11)));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("addItemHandle", ctx_r1.addUnidadeHandle.bind(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dao", ctx_r1.unidadeDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](35, _c12))("dao", ctx_r1.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction1"](37, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpureFunction0"](36, _c13)));
} }
function AdesaoFormComponent_tab_4_top_alert_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "top-alert", 24);
} }
function AdesaoFormComponent_tab_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, AdesaoFormComponent_tab_4_top_alert_1_Template, 1, 0, "top-alert", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx_r2.isTermos);
} }
class AdesaoFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, _models_adesao_model__WEBPACK_IMPORTED_MODULE_12__["Adesao"], _dao_adesao_dao_service__WEBPACK_IMPORTED_MODULE_11__["AdesaoDaoService"]);
        this.injector = injector;
        this.listaUsuarios = [];
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
        this.join = ["unidade.entidade", "usuarios.usuario:id,nome", "unidades.unidade:id,nome", "programa", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "entidade"];
        this.unidadeDao = injector.get(_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.entidadeDao = injector.get(_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_13__["EntidadeDaoService"]);
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
            documentos: { default: [] },
            usuarios_list: { default: [] },
            unidades_list: { default: [] },
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
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            yield Promise.all([
                (_a = this.programa) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.programa || entity.programa_id),
                (_b = this.tipoModalidade) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
            ]);
            form.patchValue(this.util.fillForm(formValue, entity));
            form.controls.usuarios_list.setValue((entity.usuarios || []).map(x => {
                var _a;
                return Object.assign({}, {
                    key: x.id,
                    data: x.usuario,
                    value: ((_a = x.usuario) === null || _a === void 0 ? void 0 : _a.id) || "Desconhecido"
                });
            }));
            form.controls.unidades_list.setValue((entity.unidades || []).map(x => {
                var _a;
                return Object.assign({}, {
                    key: x.id,
                    data: x.unidade,
                    value: ((_a = x.unidade) === null || _a === void 0 ? void 0 : _a.id) || "Desconhecido"
                });
            }));
            this.cdRef.detectChanges();
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.isTermos) {
                this.entity = (yield this.dao.getById(this.urlParams.get("id"), this.join));
            }
            else {
                this.entity = new _models_adesao_model__WEBPACK_IMPORTED_MODULE_12__["Adesao"]();
                this.entity.entidade = this.auth.unidade.entidade;
                //this.entity.unidade = this.auth.unidade;
                //this.entity.unidade_id = this.auth.unidade!.id;
                this.entity.entidade_id = this.auth.unidade.entidade_id;
            }
            this.loadData(this.entity, this.form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            let adesao = this.util.fill(new _models_adesao_model__WEBPACK_IMPORTED_MODULE_12__["Adesao"](), this.entity);
            adesao = this.util.fillForm(adesao, this.form.value);
            adesao.usuarios = (((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.usuarios_list.value) || []).map((x) => new src_app_models_adesao_usuario_model__WEBPACK_IMPORTED_MODULE_14__["AdesaoUsuario"]({ id: x.key, usuario_id: x.data.usuario_id }));
            adesao.unidades = (((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.unidades_list.value) || []).map((x) => new src_app_models_adesao_unidade_model__WEBPACK_IMPORTED_MODULE_15__["AdesaoUnidade"]({ id: x.key, unidade_id: x.data.unidade_id }));
            resolve(adesao);
        });
    }
    /*public documentoDynamicButtons(row: any): ToolbarButton[] {
      let result: ToolbarButton[] = [];
      let documento: Documento = row as Documento;
  
      if (this.isTermos && this.needSign(documento)) {
        result.push({ hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
      }
      result.push({ hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({ title: "Termo de ciência e responsabilidade", modalWidth: 1000 }, documento.conteudo || ""); }).bind(this) });
  
      return result;
    }
  
    public needSign(documento: Documento): boolean {
      const tipoModalidade = this.entity!.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
  //    const usuario = this.entity!.usuario!; // (this.usuario?.searchObj as Usuario);
  //    const unidade = this.entity!.unidade!; // (this.unidade?.searchObj as Unidade);
      const entidade = unidade?.entidade;
      const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
      let ids: string[] = [];
      if (tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
      if (tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
      if (tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
      return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario!.id);
    }
  
    public signDocumento(documento: Documento) {
      this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
        if (response) {
          this.loading = true;
          this.documentoDao.assinar([documento.id]).then(response => {
            if (response?.length) {
              let documentos = (this.form!.controls.documentos.value || []) as Documento[];
              let found = documentos.find(x => x.id == documento?.id);
              if (found) found.assinaturas = response[0].assinaturas;
              this.form!.controls.documentos.setValue(documentos);
              this.gridDocumentos?.reset();
            }
          }).finally(() => this.loading = false);
        }
      });
    }
  
  
    public async addDocumento() {
      const documento = new Documento();
      documento.id = this.dao!.generateUuid();
      documento.plano_id = this.entity!.id;
      documento._status = "ADD";
      this.go.navigate({ route: ['gestao', 'adesao', 'termo'] }, {
        metadata: { documento: documento, adesao: this.entity }, modalClose: (modalResult) => {
          if (modalResult) {
            (async () => {
              let documentos = (this.form!.controls.documentos.value || []) as Documento[];
              if (this.isTermos) {
                this.clearErros();
                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                try {
                  modalResult = await this.documentoDao.save(Object.assign(new Documento(), {
                    especie: "TCR",
                    conteudo: modalResult?.termo,
                    metadados: { atividades_termo_adesao: modalResult.atividades_termo_adesao },
                    programa_adesao_id: this.entity!.id,
                    status: "GERADO"
                  }), ["assinaturas.usuario:id,nome,apelido"]);
                } catch (error: any) {
                  this.error(error.message ? error.message : error);
                  modalResult = undefined;
                } finally {
                  this.dialog.closeSppinerOverlay();
                }
              }
              if (modalResult) {
                documentos.push(modalResult);
                this.form!.controls.documentos.setValue(documentos);
                this.dialog.showSppinerOverlay("Recarregando dados do plano");
                await this.initializeData(this.form!);
                this.dialog.closeSppinerOverlay();
              }
              this.cdRef.detectChanges();
            })();
          }
        }
      });
      return undefined;
    }
  
    public isVigente(documento: Documento): boolean {
      return this.form!.controls.documento_id.value == documento.id;
    }
  
    public onProcessoClick(row: any) {
      this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
    }*/
    addUsuarioHandle() {
        var _a, _b, _c, _d, _e;
        let result = undefined;
        const key = this.dao.generateUuid();
        if (((_a = this.form.controls.usuario_id.value) === null || _a === void 0 ? void 0 : _a.length) && this.util.validateLookupItem(this.form.controls.usuarios_list.value, key)) {
            result = {
                key: key,
                data: (_c = (_b = this.usuario) === null || _b === void 0 ? void 0 : _b.selectedItem) === null || _c === void 0 ? void 0 : _c.entity,
                value: ((_e = (_d = this.usuario) === null || _d === void 0 ? void 0 : _d.selectedItem) === null || _e === void 0 ? void 0 : _e.entity).nome
            };
            this.form.controls.usuarios_list.setValue("");
        }
        return result;
    }
    ;
    addUnidadeHandle() {
        var _a, _b, _c, _d, _e;
        let result = undefined;
        const key = this.dao.generateUuid();
        if (((_a = this.form.controls.unidade_id.value) === null || _a === void 0 ? void 0 : _a.length) && this.util.validateLookupItem(this.form.controls.unidades_list.value, key)) {
            result = {
                key: key,
                data: (_c = (_b = this.unidade) === null || _b === void 0 ? void 0 : _b.selectedItem) === null || _c === void 0 ? void 0 : _c.entity,
                value: ((_e = (_d = this.unidade) === null || _d === void 0 ? void 0 : _d.selectedItem) === null || _e === void 0 ? void 0 : _e.entity).nome
            };
            this.form.controls.unidades_list.setValue("");
        }
        return result;
    }
}
AdesaoFormComponent.ɵfac = function AdesaoFormComponent_Factory(t) { return new (t || AdesaoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__["Injector"])); };
AdesaoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({ type: AdesaoFormComponent, selectors: [["app-adesao-form"]], viewQuery: function AdesaoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c6, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 7, consts: [[3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title"], ["tabs", ""], ["key", "DADOS", "label", "Dados", 4, "ngIf"], ["key", "TERMO", "label", "Termo de Ci\u00EAncia e Responsabilidade", 4, "ngIf"], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Programa", "icon", "bi bi-layout-text-window-reverse", "controlName", "programa_id", 3, "size", "control", "dao", "selectRoute", "select"], ["programa", ""], ["label", "Modalidade", "icon", "bi bi-cast", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute", "select"], ["tipo_modalidade", ""], ["label", "Status", "controlName", "status", "disabled", "", 3, "size", "control"], ["status", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Usu\u00E1rios", "controlName", "usuarios_list", 3, "size", "addItemHandle"], ["label", "Usu\u00E1rio", "icon", "far fa-edit", "controlName", "usuario_id", 3, "dao", "join", "selectRoute", "select"], ["usuario", ""], ["label", "Unidades", "controlName", "unidades_list", 3, "size", "addItemHandle"], ["label", "Unidade", "icon", "far fa-edit", "controlName", "unidade_id", 3, "dao", "join", "selectRoute", "select"], ["unidade", ""], ["key", "TERMO", "label", "Termo de Ci\u00EAncia e Responsabilidade"], ["type", "warning", "message", "Para [INSERIR] ou [ASSINAR] termos escolha op\u00E7\u00E3o TCR o na tela de listagem", 4, "ngIf"], ["clss", "row"], ["type", "warning", "message", "Para [INSERIR] ou [ASSINAR] termos escolha op\u00E7\u00E3o TCR o na tela de listagem"]], template: function AdesaoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("submit", function AdesaoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function AdesaoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "tabs", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](3, AdesaoFormComponent_tab_3_Template, 18, 39, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](4, AdesaoFormComponent_tab_4_Template, 3, 1, "tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.isTermos);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.isTermos || !ctx.isNew);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__["TabsComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_18__["NgIf"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_19__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_20__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_21__["InputTextComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_22__["InputDatetimeComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__["InputMultiselectComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_24__["TopAlertComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGVzYW8tZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-adesao-adesao-module.js.map