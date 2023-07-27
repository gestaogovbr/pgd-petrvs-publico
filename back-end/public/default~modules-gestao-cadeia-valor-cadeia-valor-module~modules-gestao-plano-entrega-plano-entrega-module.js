(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-gestao-cadeia-valor-cadeia-valor-module~modules-gestao-plano-entrega-plano-entrega-module"],{

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
        this.processos = [];
        this.inicio = new Date(); /* Data de início do planejamento */
        this.fim = null; /* Data do fim do planejamento */
        this.data_arquivamento = null; /* Data de arquivamento */
        this.nome = ""; /* Nome do plano de gestão/entregas */
        this.unidade_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.entidade_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.initialization(data);
    }
}


/***/ }),

/***/ "4s72":
/*!************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: CadeiaValorListProcessosEntregasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListProcessosEntregasComponent", function() { return CadeiaValorListProcessosEntregasComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ "Yp0k");
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ "XwKr");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");














function CadeiaValorListProcessosEntregasComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function CadeiaValorListProcessosEntregasComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "toolbar", 11);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("buttons", ctx_r1.buttons);
} }
function CadeiaValorListProcessosEntregasComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r4 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r4.nome);
} }
class CadeiaValorListProcessosEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorProcesso"], src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__["CadeiaValorProcessoDaoService"]);
        this.injector = injector;
        this.buttons = [];
        this.filterWhere = (filter) => {
            var _a, _b;
            let form = filter.value;
            let result = [];
            if ((_a = form.planejamento_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
            }
            if ((_b = form.nome) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["or", ["nome", "like", "%" + form.nome.replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.replace(" ", "%") + "%"]]);
            }
            return result;
        };
        this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorDaoService"]);
        this.cadeiaValorProcessoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__["CadeiaValorProcessoDaoService"]);
        this.title = this.lex.noun("Processos", true);
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            cadeia_valor_id: { default: null },
        });
    }
    dynamicOptions(row) {
        let result = [];
        let processo = row;
        result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (processo) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true }) });
        return result;
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
}
CadeiaValorListProcessosEntregasComponent.ɵfac = function CadeiaValorListProcessosEntregasComponent_Factory(t) { return new (t || CadeiaValorListProcessosEntregasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
CadeiaValorListProcessosEntregasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CadeiaValorListProcessosEntregasComponent, selectors: [["cadeia-valor-list-processos-entregas"]], viewQuery: function CadeiaValorListProcessosEntregasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 20, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "select"], [3, "buttons", 4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["type", "options", 3, "onEdit", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"]], template: function CadeiaValorListProcessosEntregasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, CadeiaValorListProcessosEntregasComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("select", function CadeiaValorListProcessosEntregasComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, CadeiaValorListProcessosEntregasComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, CadeiaValorListProcessosEntregasComponent_ng_template_8_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "pagination", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 7)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC1wcm9jZXNzb3MtZW50cmVnYXMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "HjYh":
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list/cadeia-valor-list.component.ts ***!
  \**********************************************************************************************/
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
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "QZmg");
/* harmony import */ var _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../cadeia-valor-mapa/cadeia-valor-mapa.component */ "Qi2S");












function CadeiaValorListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "cadeia-valor-list-grid", 4);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("selectable", ctx_r1.selectable)("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
} }
function CadeiaValorListComponent_tab_4_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "cadeia-valor-mapa");
} }
function CadeiaValorListComponent_tab_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, CadeiaValorListComponent_tab_4_ng_template_1_Template, 1, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r3);
} }
class CadeiaValorListComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_1__["PageListBase"] {
    constructor(injector) {
        super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__["CadeiaValor"], _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            return result;
        };
        /* Inicializações */
        this.code = "MOD_CADV";
        this.title = this.lex.noun('Cadeia de Valor', true);
        this.filter = this.fh.FormBuilder({});
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
    }
    onSelectTab(tab) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.saveUsuarioConfig({ active_tab: tab });
        });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
}
CadeiaValorListComponent.ɵfac = function CadeiaValorListComponent_Factory(t) { return new (t || CadeiaValorListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
CadeiaValorListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: CadeiaValorListComponent, selectors: [["app-cadeia-valor-list"]], viewQuery: function CadeiaValorListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__["TabsComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 4, consts: [["right", "", 3, "title", "select"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template", 4, "ngIf"], [3, "selectable", "snapshot"], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template"], ["mapa", ""]], template: function CadeiaValorListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, CadeiaValorListComponent_ng_template_2_Template, 1, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, CadeiaValorListComponent_tab_4_Template, 3, 1, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
    } }, directives: [src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_7__["TabComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_9__["CadeiaValorListGridComponent"], _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_10__["CadeiaValorMapaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "IKf6":
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-form/cadeia-valor-form.component.ts ***!
  \**********************************************************************************************/
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../cadeia-valor-list-processos/cadeia-valor-list-processos.component */ "b/Os");











const _c0 = ["processos"];
class CadeiaValorFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"], _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a, _b, _c;
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
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
        this.join = ['processos'];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            inicio: { default: new Date() },
            fim: { default: null },
            moveFilhos: { default: false }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a, _b;
                this.processos.grid.confirm();
                let cadeiaValor = this.util.fill(new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__["CadeiaValor"](), this.entity);
                this.form.value.entidade_id = (_a = this.auth.entidade) === null || _a === void 0 ? void 0 : _a.id;
                this.form.value.unidade_id = (_b = this.auth.unidade) === null || _b === void 0 ? void 0 : _b.id;
                cadeiaValor = this.util.fillForm(cadeiaValor, this.form.value);
                cadeiaValor.processos = this.processos.items;
                resolve(cadeiaValor);
            });
        });
    }
}
CadeiaValorFormComponent.ɵfac = function CadeiaValorFormComponent_Factory(t) { return new (t || CadeiaValorFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
CadeiaValorFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CadeiaValorFormComponent, selectors: [["app-cadeia-valor-form"]], viewQuery: function CadeiaValorFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.processos = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 14, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "label", "control"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "fim", 3, "size", "control", "labelInfo"], ["noPersist", "", 3, "entity", "cdRef"], ["processos", ""]], template: function CadeiaValorFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function CadeiaValorFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function CadeiaValorFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "input-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "cadeia-valor-list-processos", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", "Nome da " + ctx.lex.noun("cadeia de valor"))("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.inicio)("labelInfo", "In\u00EDcio da " + ctx.lex.noun("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.fim)("labelInfo", "Fim da " + ctx.lex.noun("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__["InputTextComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__["InputDatetimeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__["SeparatorComponent"], _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_9__["CadeiaValorListProcessosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "QZmg":
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-grid/cadeia-valor-list-grid.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: CadeiaValorListGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListGridComponent", function() { return CadeiaValorListGridComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/cadeia-valor.model */ "06fl");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../cadeia-valor-list-processos/cadeia-valor-list-processos.component */ "b/Os");
















function CadeiaValorListGridComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "toolbar");
} }
function CadeiaValorListGridComponent_column_8_ng_template_1_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", row_r13 == null ? null : row_r13.length, "");
} }
function CadeiaValorListGridComponent_column_8_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, CadeiaValorListGridComponent_column_8_ng_template_1_span_0_Template, 3, 1, "span", 19);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", row_r13 == null ? null : row_r13.length);
} }
function CadeiaValorListGridComponent_column_8_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "cadeia-valor-list-processos", 22, 23);
} if (rf & 2) {
    const row_r16 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("entity", row_r16)("cdRef", ctx_r12.cdRef);
} }
function CadeiaValorListGridComponent_column_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "column", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CadeiaValorListGridComponent_column_8_ng_template_1_Template, 1, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, CadeiaValorListGridComponent_column_8_ng_template_3_Template, 2, 2, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("align", "center")("hint", ctx_r1.lex.noun("Processos", true))("template", _r9)("expandTemplate", _r11);
} }
function CadeiaValorListGridComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r18.nome);
} }
function CadeiaValorListGridComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r19 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r5.dao.getDateFormatted(row_r19.inicio));
} }
function CadeiaValorListGridComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r7.dao.getDateFormatted(row_r20.fim));
} }
function CadeiaValorListGridComponent_column_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "column", 25);
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onEdit", ctx_r8.edit)("options", ctx_r8.options);
} }
class CadeiaValorListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__["CadeiaValor"], src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__["CadeiaValorDaoService"]);
        this.injector = injector;
        this.selectable = false;
        this.filterWhere = (filter) => {
            var _a;
            let result = [];
            let form = filter.value;
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome.replace(" ", "%") + "%"]);
            }
            if (form.inicio) {
                result.push(["fim", ">=", form.inicio]);
            }
            if (form.fim) {
                result.push(["inicio", "<=", form.fim]);
            }
            return result;
        };
        this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["EntidadeDaoService"]);
        /* Inicializações */
        this.filter = this.fh.FormBuilder({
            inicio: { default: null },
            fim: { default: null },
            nome: { default: "" },
            entidade_id: { default: null }
        });
        this.join = ['processos'];
        // Testa se o usuário possui permissão para exibir planos de gestão/entregas
        if (this.auth.hasPermissionTo("MOD_CADV_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir planos de gestão/entregas
        if (this.auth.hasPermissionTo("MOD_CADV_EXCL")) {
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
        filter.controls.entidade_id.setValue(null);
        super.filterClear(filter);
    }
}
CadeiaValorListGridComponent.ɵfac = function CadeiaValorListGridComponent_Factory(t) { return new (t || CadeiaValorListGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
CadeiaValorListGridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CadeiaValorListGridComponent, selectors: [["cadeia-valor-list-grid"]], viewQuery: function CadeiaValorListGridComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, inputs: { snapshot: "snapshot", fixedFilter: "fixedFilter", selectable: "selectable" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 31, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control", "labelInfo"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "fim", 3, "size", "control", "labelInfo"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate"], ["columnProcessos", ""], ["columnExpandedProcessos", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-boxes"], [3, "entity", "cdRef"], ["processos", ""], [1, "text-break", "w-100"], ["type", "options", 3, "onEdit", "options"]], template: function CadeiaValorListGridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("select", function CadeiaValorListGridComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, CadeiaValorListGridComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "input-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "input-datetime", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, CadeiaValorListGridComponent_column_8_Template, 5, 4, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, CadeiaValorListGridComponent_ng_template_10_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, CadeiaValorListGridComponent_ng_template_13_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, CadeiaValorListGridComponent_ng_template_16_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, CadeiaValorListGridComponent_column_18_Template, 1, 2, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "pagination", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](11);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](14);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_CADV_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_CADV_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.nome)("labelInfo", "Nome " + ctx.lex.noun("cadeia de valor", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.inicio)("labelInfo", "In\u00EDcio " + ctx.lex.noun("cadeia de valor", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.fim)("labelInfo", "Fim " + ctx.lex.noun("cadeia de valor", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_12__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_13__["ToolbarComponent"], _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_14__["CadeiaValorListProcessosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC1ncmlkLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Qi2S":
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-mapa/cadeia-valor-mapa.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: NeastedProcesso, CadeiaValorMapaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeastedProcesso", function() { return NeastedProcesso; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorMapaComponent", function() { return CadeiaValorMapaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ "XwKr");
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ "Yp0k");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-drag-drop */ "+C6U");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ "1JHj");













const _c0 = ["cadeiaValorInstitucional"];
const _c1 = ["editProcessoForm"];
function CadeiaValorMapaComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "input-text", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx_r1.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("label", "Nome do " + ctx_r1.lex.noun("processo"))("control", ctx_r1.form.controls.nome);
} }
const _c2 = function (a0) { return { processo: a0 }; };
function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndEnd_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4); return ctx_r12.onDragEnd($event); })("dndMoved", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndMoved_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13); const subprocesso_r11 = ctx.$implicit; const processo_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().processo; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r14.onDragged(subprocesso_r11, processo_r9.children, "move"); })("dndStart", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndStart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4); return ctx_r16.onDragStart($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h5", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](6, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subprocesso_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](8);
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--bg:" + subprocesso_r11.cor + ";--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDisableIf", !ctx_r10.canEdit)("dndDraggable", subprocesso_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", subprocesso_r11.level, ". ", subprocesso_r11.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", subprocesso_r11)("items", ctx_r10.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c2, subprocesso_r11));
} }
const _c3 = function () { return ["processo"]; };
function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template_div_dndDrop_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18); const processo_r9 = ctx.processo; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r17.onDrop($event, processo_r9.children); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template, 7, 12, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const processo_r9 = ctx.processo;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](4, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--bg:gray;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", processo_r9.children);
} }
function CadeiaValorMapaComponent_div_14_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndEnd_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r19.onDragEnd($event); })("dndMoved", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndMoved_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const processo_r6 = ctx.$implicit; const macro_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r21.onDragged(processo_r6, macro_r4.children, "move"); })("dndStart", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndStart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r23.onDragStart($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h4", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](6, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template, 6, 5, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const processo_r6 = ctx.$implicit;
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](8);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--bg:" + processo_r6.cor + ";--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDisableIf", !ctx_r5.canEdit)("dndDraggable", processo_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", processo_r6.level, ". ", processo_r6.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", processo_r6)("items", ctx_r5.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c2, processo_r6));
} }
function CadeiaValorMapaComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_Template_div_dndEnd_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r24.onDragEnd($event); })("dndMoved", function CadeiaValorMapaComponent_div_14_Template_div_dndMoved_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25); const macro_r4 = ctx.$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r26.onDragged(macro_r4, ctx_r26.processos, "move"); })("dndStart", function CadeiaValorMapaComponent_div_14_Template_div_dndStart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r27.onDragStart($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_div_14_Template_div_dndDrop_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25); const macro_r4 = ctx.$implicit; const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r28.onDrop($event, macro_r4.children); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, CadeiaValorMapaComponent_div_14_div_13_Template, 9, 12, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const macro_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDisableIf", !ctx_r3.canEdit)("dndDraggable", macro_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--border-color:" + macro_r4.cor + ";--bg:white;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", macro_r4.level, ". ", macro_r4.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", macro_r4)("items", ctx_r3.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](12, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--bg:gray;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", macro_r4.children);
} }
class NeastedProcesso extends src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorProcesso"] {
    constructor(data) {
        super();
        this.children = [];
        this.cor = "#010101";
        this.level = "";
        this.initialization(data);
    }
}
class CadeiaValorMapaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.cadeiasValor = [];
        this.processos = [];
        this.canEdit = true;
        this.options = [
            {
                icon: "bi bi-file-earmark-bar-graph",
                label: "Entregas",
                onClick: this.consultProcesso.bind(this)
            },
            { divider: true },
            {
                icon: "bi bi-plus-circle",
                label: "Incluir subprocesso",
                onClick: this.addProcesso.bind(this)
            },
            {
                icon: "bi bi-pencil-square",
                label: "Alterar",
                onClick: this.editProcesso.bind(this)
            },
            { divider: true },
            {
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.deleteProcesso.bind(this)
            }
        ];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == "nome" && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length))
                result = "Obrigatório";
            return result;
        };
        this.dao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__["CadeiaValorDaoService"]);
        this.cadeiaValorProcessoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorProcessoDaoService"]);
        this.join = ['processos'];
        this.title = this.lex.noun('Cadeia de valor', true);
        this.form = this.fh.FormBuilder({
            cadeia_valor_id: { default: null },
            nome: { default: "" }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    consultProcesso(processo) {
        //let processo = data as ;
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo.id] });
    }
    addProcesso(processo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let child = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorProcesso"]({
                path: processo.path + "/" + processo.id,
                cadeia_valor_id: processo.cadeia_valor_id,
                processo_pai_id: processo.id,
                nome: "",
                sequencia: 1
            });
            yield this.editProcesso(child);
        });
    }
    editProcesso(processo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = processo;
            this.form.controls.nome.setValue(processo.nome);
            this.form.controls.nome.setErrors(null);
            let result = yield this.dialog.template({ title: "Processo", modalWidth: 500 }, this.editProcessoForm, [
                {
                    label: "Gravar",
                    icon: "bi bi-check-circle",
                    color: "btn-outline-success",
                    value: "GRAVAR"
                }, {
                    label: "Cancelar",
                    icon: "bi bi-dash-circle",
                    color: "btn btn-outline-danger",
                    value: "CANCELAR"
                }
            ]).asPromise();
            if (result.button.value == "GRAVAR") {
                if (this.form.valid) {
                    this.entity.nome = this.form.controls.nome.value;
                    this.submitting = true;
                    try {
                        let entity = yield this.cadeiaValorProcessoDao.save(this.entity);
                        if (entity)
                            result.dialog.close();
                        yield this.refreshCadeiaValor();
                    }
                    catch (error) {
                        this.dialog.alert("Error", error.message ? error.message : error || "Erro deconhecido");
                    }
                    finally {
                        this.submitting = false;
                    }
                }
                else {
                    this.form.markAllAsTouched();
                }
            }
            else {
                result.dialog.close();
            }
        });
    }
    deleteProcesso(processo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            if (confirm) {
                try {
                    yield this.cadeiaValorProcessoDao.delete(processo.id);
                    yield this.refreshCadeiaValor();
                }
                catch (error) {
                    this.dialog.alert("Erro", "Erro ao excluir: " + ((error === null || error === void 0 ? void 0 : error.message) ? error === null || error === void 0 ? void 0 : error.message : error || "Erro deconhecido"));
                }
            }
        });
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.query = this.dao.query({ where: [["data_arquivamento", "==", null]], orderBy: [["inicio", "desc"]], join: this.join });
            this.query.asPromise().then(cadeiasValor => {
                let cadeiaValorId = this.form.controls.cadeia_valor_id.value;
                this.form.controls.cadeia_valor_id.setValue(null);
                this.cadeiasValor = cadeiasValor.map(x => Object.assign({}, {
                    key: x.id,
                    value: x.nome,
                    data: x
                }));
                this.cdRef.detectChanges();
                this.form.controls.cadeia_valor_id.setValue(cadeiaValorId || (this.cadeiasValor.length ? this.cadeiasValor[0].key : null));
            });
        });
    }
    onCadeiaValorChange() {
        var _a, _b;
        const recursiveProcesso = (level, processos) => processos.sort((a, b) => a.sequencia - b.sequencia).map(x => Object.assign(new NeastedProcesso({
            children: recursiveProcesso(level + x.sequencia + '.', this.cadeiaValor.processos.filter(y => y.processo_pai_id == x.id)),
            level: level + x.sequencia,
            cor: this.lookup.CORES_BACKGROUND[Math.floor(Math.random() * this.lookup.CORES_BACKGROUND.length)].color
        }), x));
        this.cadeiaValor = (_b = (_a = this.cadeiaValorInstitucional) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.data;
        if (this.cadeiaValor)
            this.processos = recursiveProcesso("", this.cadeiaValor.processos.filter(x => !x.processo_pai_id));
    }
    refreshCadeiaValor() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.loadData(this.entity, this.form);
        });
    }
    onProcessoClick(data) {
        var _a;
        let objetivo = data;
        this.go.navigate({ route: ['gestao', 'cadeiaValor', (_a = this.cadeiaValor) === null || _a === void 0 ? void 0 : _a.id, 'objetivos', objetivo.id] });
    }
    onObjetivoDeleteClick(data) {
        let objetivo = data;
    }
    onObjetivoEditClick(data) {
        let objetivo = data;
    }
    /* Drag & Drop */
    onDrop(event, list) {
        console.log("Drop", event);
        list === null || list === void 0 ? void 0 : list.splice(typeof event.index === 'undefined' ? list.length : event.index, 0, event.data);
    }
    onDragEnd(event) {
        console.log("DragEnd", event);
    }
    onDragged(item, list, effect) {
        console.log("Dragged", item, list);
        list.splice(list.indexOf(item), 1);
    }
    onDragStart(event) {
        console.log("DragStart", event);
    }
}
CadeiaValorMapaComponent.ɵfac = function CadeiaValorMapaComponent_Factory(t) { return new (t || CadeiaValorMapaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
CadeiaValorMapaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: CadeiaValorMapaComponent, selectors: [["cadeia-valor-mapa"]], viewQuery: function CadeiaValorMapaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.cadeiaValorInstitucional = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editProcessoForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 9, consts: [["editProcessoForm", ""], ["noButtons", "", 3, "form"], [1, "row", "my-2"], ["controlName", "cadeia_valor_id", 3, "size", "control", "items", "change"], ["cadeiaValorInstitucional", ""], [1, "row", "my-2", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "row", "cadeia-valor"], [1, "nivel-1"], [1, "d-flex", "justify-content-between"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-2"], [1, "placeholder", "col-4"], [1, "placeholder", "col-6"], ["class", "row cadeia-valor", "dndType", "processo", "dndEffectAllowed", "move", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], [1, "row"], ["icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "label", "control"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "row", "cadeia-valor", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "texto", "text-break"], [1, "btn-group", "dropstart", "dropdown-menu-button", "ms-2"], ["noArrow", "", "icon", "bi bi-wrench-adjustable-circle", "color", "transparent-black p-1 py-0", 3, "data", "items"], [1, "d-flex", "align-content-stretch", "flex-wrap", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "nivel-2"], [1, "d-flex", "justify-content-between", "mb-2"], [1, "placeholder", "col-5"], [1, "placeholder", "col-7"], ["class", "nivel-2", "dndType", "processo", "dndEffectAllowed", "move", 3, "style", "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "nivel-2", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["innerProcessos", ""], [3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "nivel-3"], ["class", "nivel-3", "dndType", "processo", "dndEffectAllowed", "move", 3, "style", "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "nivel-3", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "btn-group", "dropstart", "dropdown-menu-button", "ms-2", "align-button"]], template: function CadeiaValorMapaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, CadeiaValorMapaComponent_ng_template_0_Template, 3, 4, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input-select", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function CadeiaValorMapaComponent_Template_input_select_change_4_listener() { return ctx.onCadeiaValorChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_Template_div_dndDrop_6_listener($event) { return ctx.onDrop($event, ctx.processos); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, CadeiaValorMapaComponent_div_14_Template, 14, 13, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.cadeia_valor_id)("items", ctx.cadeiasValor);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](8, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"]("--border-color:gray;--bg:white;--color:black;");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.processos);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__["InputSelectComponent"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DndDropzoneDirective"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DndPlaceholderRefDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__["InputTextComponent"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DndDraggableDirective"], _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_11__["ActionButtonComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgTemplateOutlet"]], styles: [".cadeia-valor[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  background: none;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .dropdown-menu-button[_ngcontent-%COMP%] {\n  margin-top: -5px;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .align-button[_ngcontent-%COMP%] {\n  margin-top: -10px;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n  max-width: 200px;\n}\n\n.nivel-1[_ngcontent-%COMP%] {\n  border: 2px solid var(--border-color);\n  padding: 5px;\n  background: var(--bg);\n  position: relative;\n  margin-bottom: 15px;\n  color: var(--color);\n}\n\n.nivel-1[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 18px;\n}\n\n.nivel-1[_ngcontent-%COMP%]::after, .nivel-1[_ngcontent-%COMP%]::before {\n  top: 100%;\n  left: 95%;\n  border: solid #fff;\n  content: \"\";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n\n.nivel-1[_ngcontent-%COMP%]::after {\n  border-width: 20px;\n  margin-left: -20px;\n  border-color: rgba(136, 183, 213, 0);\n  border-top-color: var(--bg);\n}\n\n.nivel-1[_ngcontent-%COMP%]::before {\n  border-width: 23px;\n  margin-left: -23px;\n  border-color: rgba(194, 225, 245, 0);\n  border-top-color: var(--border-color);\n}\n\n.nivel-2[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 10px;\n  color: var(--color);\n  background-color: var(--bg);\n  margin-bottom: 10px;\n  margin-right: 40px;\n}\n\n.nivel-2[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  text-align: center;\n}\n\n.nivel-2[_ngcontent-%COMP%]:before, .nivel-2[_ngcontent-%COMP%]:after {\n  width: 20px;\n  height: 50%;\n  position: absolute;\n  left: 100%;\n  content: \"\";\n}\n\n.nivel-2[_ngcontent-%COMP%]:before {\n  top: 0px;\n  background: linear-gradient(to right top, var(--bg) 50%, transparent 50%);\n}\n\n.nivel-2[_ngcontent-%COMP%]:after {\n  top: 50%;\n  background: linear-gradient(to right bottom, var(--bg) 50%, transparent 50%);\n}\n\n.nivel-3[_ngcontent-%COMP%] {\n  background-color: var(--bg);\n  color: var(--color);\n  padding: 5px;\n  margin-bottom: 10px;\n}\n\n.nivel-3[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 400;\n  margin: 0;\n}\n\n.nivel-3[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-top: 5px;\n  padding: 5px;\n  font-size: 13px;\n  background-color: var(--bg);\n  color: var(--color);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NhZGVpYS12YWxvci1tYXBhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtBQUNKOztBQUVBO0VBQ0kscUNBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVBOztFQUVJLFNBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSwyQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0VBQ0EscUNBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTs7RUFFSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUFDSjs7QUFFQTtFQUNJLFFBQUE7RUFDQSx5RUFBQTtBQUNKOztBQUVBO0VBQ0ksUUFBQTtFQUNBLDRFQUFBO0FBQ0o7O0FBRUE7RUFDSSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFDSiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbWFwYS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYWRlaWEtdmFsb3IgLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuXHJcbi5jYWRlaWEtdmFsb3IgLmRyb3Bkb3duLW1lbnUtYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IC01cHg7XHJcbn1cclxuXHJcbi5jYWRlaWEtdmFsb3IgLmFsaWduLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweDtcclxufVxyXG5cclxuLmNhZGVpYS12YWxvciAudGV4dG8ge1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLm5pdmVsLTEge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnKTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0tY29sb3IpO1xyXG59XHJcblxyXG4ubml2ZWwtMSBoMyB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuXHJcbi5uaXZlbC0xOjphZnRlcixcclxuLm5pdmVsLTE6OmJlZm9yZSB7XHJcbiAgICB0b3A6IDEwMCU7XHJcbiAgICBsZWZ0OiA5NSU7XHJcbiAgICBib3JkZXI6IHNvbGlkICNmZmY7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgaGVpZ2h0OiAwO1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG5cclxuLm5pdmVsLTE6OmFmdGVyIHtcclxuICAgIGJvcmRlci13aWR0aDogMjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjBweDtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgxMzYsIDE4MywgMjEzLCAwKTtcclxuICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWJnKTtcclxufVxyXG5cclxuLm5pdmVsLTE6OmJlZm9yZSB7XHJcbiAgICBib3JkZXItd2lkdGg6IDIzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTIzcHg7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMTk0LCAyMjUsIDI0NSwgMCk7XHJcbiAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1ib3JkZXItY29sb3IpO1xyXG59XHJcblxyXG4ubml2ZWwtMiB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnKTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbi5uaXZlbC0yIGg0IHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLm5pdmVsLTI6YmVmb3JlLFxyXG4ubml2ZWwtMjphZnRlciB7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogNTAlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogMTAwJTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbn1cclxuXHJcbi5uaXZlbC0yOmJlZm9yZSB7XHJcbiAgICB0b3A6IDBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCB0b3AsIHZhcigtLWJnKSA1MCUsIHRyYW5zcGFyZW50IDUwJSk7XHJcbn1cclxuXHJcbi5uaXZlbC0yOmFmdGVyIHtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0IGJvdHRvbSwgdmFyKC0tYmcpIDUwJSwgdHJhbnNwYXJlbnQgNTAlKTtcclxufVxyXG5cclxuLm5pdmVsLTMge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmcpO1xyXG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5uaXZlbC0zIGg1IHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5uaXZlbC0zIGRpdiB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnKTtcclxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcik7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "XwKr":
/*!*******************************************************!*\
  !*** ./src/app/models/cadeia-valor-processo.model.ts ***!
  \*******************************************************/
/*! exports provided: CadeiaValorProcesso */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorProcesso", function() { return CadeiaValorProcesso; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class CadeiaValorProcesso extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.path = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.nome = ""; /* Nome do plano de gestão/entregas */
        this.sequencia = 0; /* Nome do plano de gestão/entregas */
        this.cadeia_valor_id = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.processo_pai_id = null; /* Unidade à qual está vinculado o plano de gestão/entregas */
        this.initialization(data);
    }
}


/***/ }),

/***/ "b/Os":
/*!******************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-processos/cadeia-valor-list-processos.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: CadeiaValorListProcessosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorListProcessosComponent", function() { return CadeiaValorListProcessosComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ "nLly");
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ "Yp0k");
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ "XwKr");
/* harmony import */ var src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/cadeia-valor.model */ "06fl");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_level_input_level_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-level/input-level.component */ "y/2Q");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
















function CadeiaValorListProcessosComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r8 = ctx.row;
    const metadata_r9 = ctx.metadata;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getSequencia(metadata_r9, row_r8));
} }
function CadeiaValorListProcessosComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input-level", 11);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6)("validate", ctx_r3.validateLevel);
} }
function CadeiaValorListProcessosComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "strong", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    const metadata_r12 = ctx.metadata;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("margin-left", ctx_r5.getNivelSequencia(metadata_r12), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r11.nome || "");
} }
function CadeiaValorListProcessosComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input-text", 13);
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6)("control", ctx_r7.form.controls.nome);
} }
class CadeiaValorListProcessosComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_8__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validateLevel = (parents, item, children) => {
            if (children.length) {
                let path = [...parents.map(x => x.value), item.value];
                //this.hasIndexChanged(path, (item.value as number));
                return this.processos(path).length == path.length;
            }
            else {
                let items = this.processos(parents.map(x => x.value));
                let sibilings = items.length == parents.length && items.length ? this.items.filter(x => x.processo_pai_id == items[items.length - 1].id) : [];
                return sibilings.length + 1 >= item.value;
            }
        };
        this.processos = (path) => {
            let items = [];
            path.reduce((a, v) => {
                let item = a.find(x => x.sequencia == v);
                if (item) {
                    items.push(item);
                    return this.items.filter(x => x.processo_pai_id == (item === null || item === void 0 ? void 0 : item.id));
                }
                else {
                    return [];
                }
            }, this.items.filter(x => !x.processo_pai_id));
            return items;
        };
        this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]);
        this.dao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorDaoService"]);
        this.processosDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorProcessoDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            sequencia: { default: 1 },
            nivel: { default: "" }
        }, this.cdRef, this.validate);
    }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_7__["CadeiaValor"]());
        if (!this.gridControl.value.processos)
            this.gridControl.value.processos = [];
        return this.gridControl.value.processos;
    }
    loadData(entity, form) {
        this.cdRef.detectChanges();
        this.sortProcessos();
    }
    addProcesso() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let processo = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_6__["CadeiaValorProcesso"]({
                id: this.dao.generateUuid(),
                sequencia: this.items.filter(x => !x.processo_pai_id).length + 1,
                nome: ""
            });
            return processo;
        });
    }
    addChildProcesso(row, metadata, index) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let processo = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_6__["CadeiaValorProcesso"]({
                id: this.dao.generateUuid(),
                processo_pai_id: row.id,
                sequencia: this.items.filter(x => x.processo_pai_id == row.id).length + 1,
                nome: ""
            });
            this.items.push(processo);
            this.grid.setMetadata(processo, { nivel: this.getSequencia({}, processo) });
            this.sortProcessos();
            this.grid.adding = true;
            yield this.grid.edit(processo);
            return undefined;
        });
    }
    getSequencia(metadata, row) {
        if (!metadata.nivel) {
            let paiId = row.processo_pai_id;
            let niveis = "";
            let path = [];
            while (paiId) {
                path.push(paiId);
                let atual = this.items.find(x => x.id == paiId);
                niveis = ((atual === null || atual === void 0 ? void 0 : atual.sequencia) || "") + "." + niveis;
                paiId = (atual === null || atual === void 0 ? void 0 : atual.processo_pai_id) || null;
            }
            niveis += row.sequencia;
            if (metadata.nivel != niveis) {
                metadata.nivel = niveis;
                metadata.path = path;
            }
        }
        return metadata.nivel;
    }
    getNivelSequencia(metadata) {
        return 10 * (metadata.nivel.match(/\./g) || []).length;
    }
    loadProcesso(form, row) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.nivel.setValue(this.getSequencia((_a = this.grid) === null || _a === void 0 ? void 0 : _a.getMetadata(row), row));
            form.controls.sequencia.setValue(row.sequencia);
            form.controls.nome.setValue(row.nome);
            this.cdRef.detectChanges();
        });
    }
    sortProcessos() {
        this.items.sort((a, b) => {
            var _a, _b;
            const sa = (((_a = this.grid.getMetadata(a)) === null || _a === void 0 ? void 0 : _a.nivel) || "").split(".").map((x) => ("000" + x).substr(-3)).join(".");
            const sb = (((_b = this.grid.getMetadata(b)) === null || _b === void 0 ? void 0 : _b.nivel) || "").split(".").map((x) => ("000" + x).substr(-3)).join(".");
            return sa < sb ? -1 : sa > sb ? 1 : 0;
        });
    }
    removeProcesso(row) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
            if (confirm) {
                let processo = row;
                let filhos = this.items.filter(x => x.processo_pai_id == processo.id) || [];
                filhos.forEach(x => this.removeProcesso(x));
                this.items.splice(this.items.findIndex(x => x.id == processo.id), 1);
                if (!this.isNoPersist)
                    yield ((_a = this.processosDao) === null || _a === void 0 ? void 0 : _a.delete(row));
                return true;
            }
            else {
                return false;
            }
        });
    }
    saveProcesso(form, row) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = undefined;
            this.form.markAllAsTouched();
            if (this.form.valid) {
                let niveis = form.controls.nivel.value.split(".");
                let parents = this.processos(niveis.slice(0, niveis.length - 1));
                let parentId = (parents === null || parents === void 0 ? void 0 : parents.length) ? parents[parents.length - 1].id : null;
                let sequencia = niveis[niveis.length - 1] * 1;
                /* Atualiza o indice a partir sa sequencia atual para os irmão que tem sequencia maior */
                this.items.filter(x => x.processo_pai_id == parentId && x.sequencia >= sequencia).forEach(x => x.sequencia++);
                row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
                row.sequencia = sequencia;
                row.cadeia_valor_id = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id;
                row.sequencia = sequencia;
                row.processo_pai_id = parentId;
                row.nome = form.controls.nome.value;
                result = row;
                if (!this.isNoPersist)
                    result = yield ((_b = this.processosDao) === null || _b === void 0 ? void 0 : _b.save(row));
                //this.cdRef.detectChanges();
            }
            return result;
        });
    }
    editEndProcesso(id) {
        var _a;
        (_a = this.grid) === null || _a === void 0 ? void 0 : _a.clearMetadata();
        this.cdRef.detectChanges();
        this.sortProcessos();
        this.cdRef.detectChanges();
    }
    dynamicButtons(row) {
        let result = [];
        let cadeiaValorProcesso = row;
        result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
        return result;
    }
}
CadeiaValorListProcessosComponent.ɵfac = function CadeiaValorListProcessosComponent_Factory(t) { return new (t || CadeiaValorListProcessosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CadeiaValorListProcessosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CadeiaValorListProcessosComponent, selectors: [["cadeia-valor-list-processos"]], viewQuery: function CadeiaValorListProcessosComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, inputs: { cdRef: "cdRef", noPersist: "noPersist", control: "control", entity: "entity" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 15, consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["editable", "", 3, "items", "form", "hasDelete", "add", "load", "remove", "save", "editEnd"], ["title", "N\u00EDvel", 3, "template", "editTemplate"], ["nivel", ""], ["editNivel", ""], ["title", "Processos", 3, "template", "editTemplate"], ["processo", ""], ["editProcesso", ""], ["type", "options", 3, "dynamicButtons"], [1, "d-block"], ["controlName", "nivel", 3, "size", "validate"], [1, "d-block", "text-break", "w-100"], ["controlName", "nome", 3, "size", "control"]], template: function CadeiaValorListProcessosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "grid", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CadeiaValorListProcessosComponent_ng_template_5_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, CadeiaValorListProcessosComponent_ng_template_7_Template, 1, 2, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, CadeiaValorListProcessosComponent_ng_template_10_Template, 2, 3, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, CadeiaValorListProcessosComponent_ng_template_12_Template, 1, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](8);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("add", ctx.addProcesso.bind(ctx))("load", ctx.loadProcesso.bind(ctx))("remove", ctx.removeProcesso.bind(ctx))("save", ctx.saveProcesso.bind(ctx))("editEnd", ctx.editEndProcesso.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("template", _r0)("editTemplate", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("template", _r4)("editTemplate", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__["ColumnComponent"], _components_input_input_level_input_level_component__WEBPACK_IMPORTED_MODULE_11__["InputLevelComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRlaWEtdmFsb3ItbGlzdC1wcm9jZXNzb3MuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "nhZz":
/*!****************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-routing.module.ts ***!
  \****************************************************************************/
/*! exports provided: CadeiaValorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorRoutingModule", function() { return CadeiaValorRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../guards/auth.guard */ "UTcu");
/* harmony import */ var _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resolvies/config.resolver */ "toza");
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ "HjYh");
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ "IKf6");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "QZmg");
/* harmony import */ var _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component */ "4s72");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_3__["CadeiaValorListComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Cadeia de Valor" } },
    { path: 'grid', component: _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorListGridComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Cadeia de Valor" } },
    { path: 'new', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorFormComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'processoList', component: _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_6__["CadeiaValorListProcessosEntregasComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Lista de Processos", modal: true } }
];
class CadeiaValorRoutingModule {
}
CadeiaValorRoutingModule.ɵfac = function CadeiaValorRoutingModule_Factory(t) { return new (t || CadeiaValorRoutingModule)(); };
CadeiaValorRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: CadeiaValorRoutingModule });
CadeiaValorRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](CadeiaValorRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "pRTT":
/*!********************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor.module.ts ***!
  \********************************************************************/
/*! exports provided: CadeiaValorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadeiaValorModule", function() { return CadeiaValorModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-drag-drop */ "+C6U");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/components.module */ "j1ZV");
/* harmony import */ var _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-routing.module */ "nhZz");
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ "HjYh");
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ "IKf6");
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ "QZmg");
/* harmony import */ var _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cadeia-valor-mapa/cadeia-valor-mapa.component */ "Qi2S");
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cadeia-valor-list-processos/cadeia-valor-list-processos.component */ "b/Os");
/* harmony import */ var _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component */ "4s72");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");












class CadeiaValorModule {
}
CadeiaValorModule.ɵfac = function CadeiaValorModule_Factory(t) { return new (t || CadeiaValorModule)(); };
CadeiaValorModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: CadeiaValorModule });
CadeiaValorModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            ngx_drag_drop__WEBPACK_IMPORTED_MODULE_2__["DndModule"],
            _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](CadeiaValorModule, { declarations: [_cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_5__["CadeiaValorListComponent"],
        _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_6__["CadeiaValorFormComponent"],
        _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_7__["CadeiaValorListGridComponent"],
        _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_9__["CadeiaValorListProcessosComponent"],
        _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_8__["CadeiaValorMapaComponent"],
        _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_10__["CadeiaValorListProcessosEntregasComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        ngx_drag_drop__WEBPACK_IMPORTED_MODULE_2__["DndModule"],
        _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_4__["CadeiaValorRoutingModule"]], exports: [_cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_10__["CadeiaValorListProcessosEntregasComponent"]] }); })();


/***/ })

}]);
//# sourceMappingURL=default~modules-gestao-cadeia-valor-cadeia-valor-module~modules-gestao-plano-entrega-plano-entrega-module.js.map