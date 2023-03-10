(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-eixo-tematico-eixo-tematico-module"],{

/***/ "OaI/":
/*!*************************************************************************!*\
  !*** ./src/app/modules/cadastros/eixo-tematico/eixo-tematico.module.ts ***!
  \*************************************************************************/
/*! exports provided: EixoTematicoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematicoModule", function() { return EixoTematicoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _eixo_tematico_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eixo-tematico-routing.module */ "QixH");
/* harmony import */ var _eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eixo-tematico-form/eixo-tematico-form.component */ "vBYW");
/* harmony import */ var _eixo_tematico_list_eixo_tematico_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eixo-tematico-list/eixo-tematico-list.component */ "tLkT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class EixoTematicoModule {
}
EixoTematicoModule.ɵfac = function EixoTematicoModule_Factory(t) { return new (t || EixoTematicoModule)(); };
EixoTematicoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: EixoTematicoModule });
EixoTematicoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _eixo_tematico_routing_module__WEBPACK_IMPORTED_MODULE_3__["EixoTematicoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](EixoTematicoModule, { declarations: [_eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_4__["EixoTematicoFormComponent"],
        _eixo_tematico_list_eixo_tematico_list_component__WEBPACK_IMPORTED_MODULE_5__["EixoTematicoListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _eixo_tematico_routing_module__WEBPACK_IMPORTED_MODULE_3__["EixoTematicoRoutingModule"]] }); })();


/***/ }),

/***/ "QixH":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/cadastros/eixo-tematico/eixo-tematico-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: EixoTematicoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematicoRoutingModule", function() { return EixoTematicoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eixo-tematico-form/eixo-tematico-form.component */ "vBYW");
/* harmony import */ var _eixo_tematico_list_eixo_tematico_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eixo-tematico-list/eixo-tematico-list.component */ "tLkT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _eixo_tematico_list_eixo_tematico_list_component__WEBPACK_IMPORTED_MODULE_4__["EixoTematicoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Entrega" } },
    { path: 'new', component: _eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_3__["EixoTematicoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_3__["EixoTematicoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _eixo_tematico_form_eixo_tematico_form_component__WEBPACK_IMPORTED_MODULE_3__["EixoTematicoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class EixoTematicoRoutingModule {
}
EixoTematicoRoutingModule.ɵfac = function EixoTematicoRoutingModule_Factory(t) { return new (t || EixoTematicoRoutingModule)(); };
EixoTematicoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: EixoTematicoRoutingModule });
EixoTematicoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](EixoTematicoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "bNNh":
/*!***********************************************!*\
  !*** ./src/app/models/eixo-tematico.model.ts ***!
  \***********************************************/
/*! exports provided: EixoTematico */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematico", function() { return EixoTematico; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class EixoTematico extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nome = ""; //Nome do eixo temático;
        this.icone = ""; /* Classe do icone relacionado ao eixo temático */
        this.cor = ""; /* Código da cor em hex */
        this.descricao = ""; /* Descrição do eixo temático */
        this.initialization(data);
    }
}


/***/ }),

/***/ "tLkT":
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/eixo-tematico/eixo-tematico-list/eixo-tematico-list.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: EixoTematicoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematicoListComponent", function() { return EixoTematicoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ "M+Kp");
/* harmony import */ var src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/eixo-tematico.model */ "bNNh");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");













function EixoTematicoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "toolbar");
} }
function EixoTematicoListComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r3 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMap"](row_r3.icone);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", row_r3.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", row_r3.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", row_r3.nome, "");
} }
class EixoTematicoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_2__["EixoTematico"], src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_1__["EixoTematicoDaoService"]);
        this.injector = injector;
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
        this.title = 'Eixos temáticos';
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para consultar eixos temáticos
        if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir eixos temáticos
        if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) {
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
}
EixoTematicoListComponent.ɵfac = function EixoTematicoListComponent_Factory(t) { return new (t || EixoTematicoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
EixoTematicoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EixoTematicoListComponent, selectors: [["app-eixo-tematico-list"]], viewQuery: function EixoTematicoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 11, vars: 19, consts: [[3, "dao", "add", "title", "hasAdd", "hasEdit", "selectable", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Eixo tem\u00E1tico", "controlName", "nome", "placeholder", "Nome do eixo tem\u00E1tico...", 3, "size", "control"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]], template: function EixoTematicoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function EixoTematicoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, EixoTematicoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, EixoTematicoListComponent_ng_template_7_Template, 3, 7, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "pagination", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("hasAdd", ctx.auth.hasPermissionTo("MOD_PLAN_INST_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PLAN_INST_EDT"))("selectable", ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlaXhvLXRlbWF0aWNvLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "vBYW":
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/eixo-tematico/eixo-tematico-form/eixo-tematico-form.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: EixoTematicoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematicoFormComponent", function() { return EixoTematicoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ "M+Kp");
/* harmony import */ var src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/eixo-tematico.model */ "bNNh");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");











class EixoTematicoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_3__["EixoTematico"], src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__["EixoTematicoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'descricao', 'cor', 'icone'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            icone: { default: "" },
            cor: { default: "" },
            descricao: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_3__["EixoTematico"]());
    }
    saveData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const eixo = this.util.fill(new src_app_models_eixo_tematico_model__WEBPACK_IMPORTED_MODULE_3__["EixoTematico"](), this.entity);
                resolve(this.util.fillForm(eixo, this.form.value));
            });
        });
    }
}
EixoTematicoFormComponent.ɵfac = function EixoTematicoFormComponent_Factory(t) { return new (t || EixoTematicoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
EixoTematicoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: EixoTematicoFormComponent, selectors: [["app-eixo-tematico-form"]], viewQuery: function EixoTematicoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 13, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome do eixo tem\u00E1tico", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], [1, "col"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows", "control"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "icone", 3, "size", "control", "items"], ["label", "Cor", "icon", "bi bi-palette", "controlName", "cor", 3, "size", "control"]], template: function EixoTematicoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function EixoTematicoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function EixoTematicoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "input-textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "input-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "input-color", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 8)("rows", 4)("control", ctx.form.controls.descricao);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.icone)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.cor);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__["InputTextComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_7__["InputTextareaComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__["InputSelectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_9__["InputColorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlaXhvLXRlbWF0aWNvLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-eixo-tematico-eixo-tematico-module.js.map