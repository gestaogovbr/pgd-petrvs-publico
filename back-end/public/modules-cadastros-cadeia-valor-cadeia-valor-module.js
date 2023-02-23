(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-cadeia-valor-cadeia-valor-module"],{

/***/ "06fl":
/*!**********************************************!*\
  !*** ./src/app/models/cadeia-valor.model.ts ***!
  \**********************************************/
/*! exports provided: CadeiaValor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValor", function() { return CadeiaValor; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class CadeiaValor extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.inicio = new Date(); /* Data de início do planejamento */
        this.fim = null; /* Data do fim do planejamento */
        this.unidade_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.nome = ""; /* Nome do plano de gestão/entregas */
        this.initialization(data);
    }
}


/***/ }),

/***/ "4knE":
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor-list-grid/cadeia-valor-list-grid.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: CadeiaValorListGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListGridComponent", function() { return CadeiaValorListGridComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/cadeia-valor.model */ "06fl");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");















const _c0 = ["unidade"];
function CadeiaValorListGridComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "toolbar");
} }
function CadeiaValorListGridComponent_ng_template_11_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", row_r9.entidade == null ? null : row_r9.entidade.nome, " ");
} }
function CadeiaValorListGridComponent_ng_template_11_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", row_r9.unidade.sigla, " ");
} }
function CadeiaValorListGridComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, CadeiaValorListGridComponent_ng_template_11_span_0_Template, 3, 1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CadeiaValorListGridComponent_ng_template_11_span_1_Template, 3, 1, "span", 17);
} if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", row_r9.programa);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", row_r9.unidade);
} }
function CadeiaValorListGridComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r14 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r5.dao.getDateFormatted(row_r14.inicio), "");
} }
function CadeiaValorListGridComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r15 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r7.dao.getDateFormatted(row_r15.fim), "");
} }
function CadeiaValorListGridComponent_column_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "column", 21);
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onEdit", ctx_r8.edit)("options", ctx_r8.options);
} }
const _c1 = function () { return ["configuracoes", "unidade"]; };
const _c2 = function (a0) { return { route: a0 }; };
class CadeiaValorListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__["CadeiaValor"], src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a, _b;
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
            if ((_b = form.unidade_id) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        /* Inicializações */
        this.filter = this.fh.FormBuilder({
            inicio: { default: null },
            fim: { default: null },
            nome: { default: "" },
            unidade_id: { default: null }
        });
        this.join = ['unidade'];
        // Testa se o usuário possui permissão para exibir planos de gestão/entregas
        if (this.auth.hasPermissionTo("MOD_PGENTR_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir planos de gestão/entregas
        if (this.auth.hasPermissionTo("MOD_PGENTR_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.inicio.setValue(null);
        filter.controls.fim.setValue(null);
        filter.controls.unidade_id.setValue(null);
        super.filterClear(filter);
    }
}
CadeiaValorListGridComponent.ɵfac = function CadeiaValorListGridComponent_Factory(t) { return new (t || CadeiaValorListGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
CadeiaValorListGridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CadeiaValorListGridComponent, selectors: [["cadeia-valor-list-grid"]], viewQuery: function CadeiaValorListGridComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, inputs: { snapshot: "snapshot", fixedFilter: "fixedFilter" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 21, vars: 30, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", "labelInfo", "Data de in\u00EDcio do plano de gest\u00E3o/entregas", 3, "size", "control"], ["date", "", "label", "Fim", "controlName", "fim", "labelInfo", "Data do fim do plano de gest\u00E3o/entregas", 3, "size", "control"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["unidade", ""], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "Entidade/Unidade", 3, "template"], ["columnEntidadeUnidade", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "fas", "fa-university"], [1, "bi", "bi-briefcase"], ["type", "options", 3, "onEdit", "options"]], template: function CadeiaValorListGridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("select", function CadeiaValorListGridComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CadeiaValorListGridComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "input-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, CadeiaValorListGridComponent_ng_template_11_Template, 2, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, CadeiaValorListGridComponent_ng_template_14_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, CadeiaValorListGridComponent_ng_template_17_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](19, CadeiaValorListGridComponent_column_19_Template, 1, 2, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "pagination", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](12);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](15);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](28, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](27, _c1)));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__["FilterComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__["InputDatetimeComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__["InputSearchComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_12__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_13__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC1ncmlkLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "GPKi":
/*!*********************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor-list-map/cadeia-valor-list-map.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: CadeiaValorListMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListMapComponent", function() { return CadeiaValorListMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CadeiaValorListMapComponent {
    constructor() { }
    ngOnInit() {
    }
}
CadeiaValorListMapComponent.ɵfac = function CadeiaValorListMapComponent_Factory(t) { return new (t || CadeiaValorListMapComponent)(); };
CadeiaValorListMapComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CadeiaValorListMapComponent, selectors: [["cadeia-valor-list-map"]], decls: 2, vars: 0, template: function CadeiaValorListMapComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "cadeia-valor-list-map works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC1tYXAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "J6p1":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor-form/cadeia-valor-form.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: CadeiaValorFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorFormComponent", function() { return CadeiaValorFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ "793T");
/* harmony import */ var _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/cadeia-valor.model */ "06fl");
/* harmony import */ var _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var _dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ "zUlN");


















function CadeiaValorFormComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "order", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "N\u00EDvel");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r2 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("header", header_r2);
} }
function CadeiaValorFormComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "order", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Processo");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r3 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("header", header_r3);
} }
const _c0 = function () { return ["configuracoes", "entidade"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["configuracoes", "unidade"]; };
class CadeiaValorFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"], _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a, _b, _c;
            let result = null;
            if (['nome', 'unidade_id', "entidade_id"].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            if (['inicio'].indexOf(controlName) >= 0 && !((_b = this.dao) === null || _b === void 0 ? void 0 : _b.validDateTime(control.value))) {
                result = "Inválido";
            }
            if (controlName == 'fim' && control.value && !((_c = this.dao) === null || _c === void 0 ? void 0 : _c.validDateTime(control.value))) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = (form) => {
            let result = null;
            if (this.form.controls.fim.value && this.form.controls.inicio.value > this.form.controls.fim.value) {
                return "A data do início não pode ser maior que a data do fim!";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.unidadeDao = injector.get(_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.entidadeDao = injector.get(_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["EntidadeDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            unidade_id: { default: "" },
            entidade_id: { default: "" },
            inicio: { default: new Date() },
            fim: { default: null }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"]());
    }
    saveData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const cadeiaValor = this.util.fill(new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"](), this.entity);
                resolve(this.util.fillForm(cadeiaValor, this.form.value));
            });
        });
    }
}
CadeiaValorFormComponent.ɵfac = function CadeiaValorFormComponent_Factory(t) { return new (t || CadeiaValorFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
CadeiaValorFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: CadeiaValorFormComponent, selectors: [["app-cadeia-valor-form"]], viewQuery: function CadeiaValorFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 26, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome da Cadeia de Valor", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["label", "Entidade", "icon", "bi bi-bookmark-heart", "controlName", "entidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Unidade", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", "labelInfo", "In\u00EDcio da Cadeia de Valor", 3, "size", "control"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "fim", "labelInfo", "Fim da Cadeia de Valor", 3, "size", "control"], [3, "dao", "title"], ["field", "nivel", 3, "minWidth"], [3, "header"]], template: function CadeiaValorFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function CadeiaValorFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function CadeiaValorFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "input-search", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "input-search", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "input-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input-datetime", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "grid", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, CadeiaValorFormComponent_ng_template_15_Template, 2, 1, "ng-template");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "column");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, CadeiaValorFormComponent_ng_template_17_Template, 2, 1, "ng-template");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.entidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](21, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](20, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](24, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](23, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("minWidth", 50);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__["InputDatetimeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__["SeparatorComponent"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__["ColumnComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_15__["OrderComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "g87x":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: CadeiaValorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorRoutingModule", function() { return CadeiaValorRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../guards/auth.guard */ "UTcu");
/* harmony import */ var _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resolvies/config.resolver */ "toza");
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ "rEPb");
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ "J6p1");
/* harmony import */ var _cadeia_valor_list_map_cadeia_valor_list_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-list-map/cadeia-valor-list-map.component */ "GPKi");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "4knE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorListComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Cadeia de Valor" } },
    { path: 'grid', component: _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_6__["CadeiaValorListGridComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Cadeia de Valor" } },
    { path: 'map', component: _cadeia_valor_list_map_cadeia_valor_list_map_component__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorListMapComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Cadeia de Valor" } },
    { path: 'new', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class CadeiaValorRoutingModule {
}
CadeiaValorRoutingModule.ɵfac = function CadeiaValorRoutingModule_Factory(t) { return new (t || CadeiaValorRoutingModule)(); };
CadeiaValorRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: CadeiaValorRoutingModule });
CadeiaValorRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](CadeiaValorRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "nLly":
/*!*************************************************!*\
  !*** ./src/app/dao/cadeia-valor-dao.service.ts ***!
  \*************************************************/
/*! exports provided: CadeiaValorDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorDaoService", function() { return CadeiaValorDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CadeiaValorDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("CadeiaValor", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
CadeiaValorDaoService.ɵfac = function CadeiaValorDaoService_Factory(t) { return new (t || CadeiaValorDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CadeiaValorDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CadeiaValorDaoService, factory: CadeiaValorDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "rEPb":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor-list/cadeia-valor-list.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: CadeiaValorListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListComponent", function() { return CadeiaValorListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _base_page_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-list-base */ "+vn/");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/cadeia-valor.model */ "06fl");
/* harmony import */ var _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "4knE");









function CadeiaValorListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "cadeia-valor-list-grid", 5);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
} }
function CadeiaValorListComponent_ng_template_5_Template(rf, ctx) { }
class CadeiaValorListComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_1__["PageListBase"] {
    constructor(injector) {
        super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__["CadeiaValor"], _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.activeTab = "TABELA";
        this.filterWhere = (filter) => {
            var _a;
            let result = [];
            let form = filter.value;
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = 'Cadeias de Valor';
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        if (this.auth.hasPermissionTo("MOD_EXTM_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        if (this.auth.hasPermissionTo("MOD_EXTM_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
    onSelectTab(tab) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.activeTab = tab.key;
            this.saveUsuarioConfig({ active_tab: this.activeTab });
            // if (tab.key == "DASHBOARD") {
            //   this.programaDao.query({where: [
            //     ["normativa", "!=", null],
            //     ["unidade_id", "==",this.auth.unidade!.id],
            //     ["data_fim", "==", null],
            //     //["data_fim_vigencia", ">=", Date.now()]
            //   ]}).asPromise().then((programas) => {
            //     this.programaSelecionado = programas.sort((a, b) => b.data_inicio_vigencia.getMilliseconds() - a.data_inicio_vigencia.getMilliseconds())[0];
            //     this.programa?.loadSearch(this.programaSelecionado);
            //   });
            // }
        });
    }
}
CadeiaValorListComponent.ɵfac = function CadeiaValorListComponent_Factory(t) { return new (t || CadeiaValorListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
CadeiaValorListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CadeiaValorListComponent, selectors: [["app-cadeia-valor-list"]], viewQuery: function CadeiaValorListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 7, vars: 5, consts: [["right", "", 3, "title", "select", "active"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "KANBAN", "icon", "bi bi-card-heading", "label", "Map", 3, "template"], ["kanban", ""], [3, "snapshot"]], template: function CadeiaValorListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, CadeiaValorListComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, CadeiaValorListComponent_ng_template_5_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](3);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx))("active", ctx.activeTab);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r2);
    } }, directives: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__["TabComponent"], _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_8__["CadeiaValorListGridComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "rGja":
/*!***********************************************************************!*\
  !*** ./src/app/modules/cadastros/cadeia-valor/cadeia-valor.module.ts ***!
  \***********************************************************************/
/*! exports provided: CadeiaValorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorModule", function() { return CadeiaValorModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cadeia-valor-routing.module */ "g87x");
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ "rEPb");
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ "J6p1");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "4knE");
/* harmony import */ var _cadeia_valor_list_map_cadeia_valor_list_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-list-map/cadeia-valor-list-map.component */ "GPKi");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class CadeiaValorModule {
}
CadeiaValorModule.ɵfac = function CadeiaValorModule_Factory(t) { return new (t || CadeiaValorModule)(); };
CadeiaValorModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: CadeiaValorModule });
CadeiaValorModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
            _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](CadeiaValorModule, { declarations: [_cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__["CadeiaValorListComponent"],
        _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorFormComponent"],
        _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorListGridComponent"],
        _cadeia_valor_list_map_cadeia_valor_list_map_component__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorListMapComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
        _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-cadeia-valor-cadeia-valor-module.js.map