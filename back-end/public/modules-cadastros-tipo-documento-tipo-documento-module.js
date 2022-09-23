(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-tipo-documento-tipo-documento-module"],{

/***/ "7vlm":
/*!***************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-documento/tipo-documento.module.ts ***!
  \***************************************************************************/
/*! exports provided: TipoDocumentoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoDocumentoModule", function() { return TipoDocumentoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tipo_documento_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-documento-routing.module */ "h7xb");
/* harmony import */ var _tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-documento-form/tipo-documento-form.component */ "Y6oc");
/* harmony import */ var _tipo_documento_list_tipo_documento_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-documento-list/tipo-documento-list.component */ "qyhI");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class TipoDocumentoModule {
}
TipoDocumentoModule.ɵfac = function TipoDocumentoModule_Factory(t) { return new (t || TipoDocumentoModule)(); };
TipoDocumentoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: TipoDocumentoModule });
TipoDocumentoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _tipo_documento_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoDocumentoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](TipoDocumentoModule, { declarations: [_tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_2__["TipoDocumentoFormComponent"],
        _tipo_documento_list_tipo_documento_list_component__WEBPACK_IMPORTED_MODULE_3__["TipoDocumentoListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _tipo_documento_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoDocumentoRoutingModule"]] }); })();


/***/ }),

/***/ "VqsY":
/*!************************************************!*\
  !*** ./src/app/models/tipo-documento.model.ts ***!
  \************************************************/
/*! exports provided: TipoDocumento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoDocumento", function() { return TipoDocumento; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoDocumento extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo de documento */
        this.codigo = null; /* Codigo do tipo de documento */
        this.entregavel = 0; /* Se o documento é entregável ou não */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.initialization(data);
    }
}


/***/ }),

/***/ "Y6oc":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-documento/tipo-documento-form/tipo-documento-form.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoDocumentoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoDocumentoFormComponent", function() { return TipoDocumentoFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-documento.model */ "VqsY");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");








class TipoDocumentoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__["TipoDocumento"], src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoDocumentoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || ""); //A analisar se fica melhor visivelmente com [] ou sem. Ex: Editando [Requerimento] ao invés de Editando Requerimento
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            entregavel: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__["TipoDocumento"]());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoDocumento = this.util.fill(new src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__["TipoDocumento"](), this.entity);
            resolve(this.util.fillForm(tipoDocumento, this.form.value));
        });
    }
}
TipoDocumentoFormComponent.ɵfac = function TipoDocumentoFormComponent_Factory(t) { return new (t || TipoDocumentoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoDocumentoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoDocumentoFormComponent, selectors: [["app-tipo-documento-form"]], viewQuery: function TipoDocumentoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 8, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "controlName", "nome", 3, "size", "control"], ["label", "Entreg\u00E1vel", "controlName", "entregavel", "labelInfo", "Se esse documento vai precisar ser entregue. ", 3, "size", "control", "items"]], template: function TipoDocumentoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function TipoDocumentoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function TipoDocumentoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "input-radio", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 9)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.entregavel)("items", ctx.lookup.SIMNAO);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__["InputTextComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_6__["InputRadioComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWRvY3VtZW50by1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "h7xb":
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-documento/tipo-documento-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: TipoDocumentoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoDocumentoRoutingModule", function() { return TipoDocumentoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-documento-form/tipo-documento-form.component */ "Y6oc");
/* harmony import */ var _tipo_documento_list_tipo_documento_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tipo-documento-list/tipo-documento-list.component */ "qyhI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _tipo_documento_list_tipo_documento_list_component__WEBPACK_IMPORTED_MODULE_4__["TipoDocumentoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Documento" } },
    { path: 'new', component: _tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoDocumentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoDocumentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _tipo_documento_form_tipo_documento_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoDocumentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class TipoDocumentoRoutingModule {
}
TipoDocumentoRoutingModule.ɵfac = function TipoDocumentoRoutingModule_Factory(t) { return new (t || TipoDocumentoRoutingModule)(); };
TipoDocumentoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: TipoDocumentoRoutingModule });
TipoDocumentoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TipoDocumentoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "qyhI":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-documento/tipo-documento-list/tipo-documento-list.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoDocumentoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoDocumentoListComponent", function() { return TipoDocumentoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-documento.model */ "VqsY");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");













function TipoDocumentoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "toolbar");
} }
function TipoDocumentoListComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r4 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r4.entregavel ? "Sim" : "N\u00E3o");
} }
function TipoDocumentoListComponent_column_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "column", 10);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx_r3.edit)("options", ctx_r3.options);
} }
class TipoDocumentoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_documento_model__WEBPACK_IMPORTED_MODULE_2__["TipoDocumento"], src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoDocumentoDaoService"]);
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
        this.title = "Tipos de " + this.lex.noun("Documento", true);
        this.code = "MOD_TIPO_DOC";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de documento
        if (this.auth.hasPermissionTo("MOD_TIPO_DOC_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de documento
        if (this.auth.hasPermissionTo("MOD_TIPO_DOC_EXCL")) {
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
TipoDocumentoListComponent.ɵfac = function TipoDocumentoListComponent_Factory(t) { return new (t || TipoDocumentoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoDocumentoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoDocumentoListComponent, selectors: [["app-tipo-documento-list"]], viewQuery: function TipoDocumentoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 21, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome do tipo do documento", "controlName", "nome", "placeholder", "Nome do tipo do Documento", 3, "size", "control"], ["title", "Descri\u00E7\u00E3o", "field", "nome"], ["title", "Entreg\u00E1vel", 3, "template"], ["columnEntregavel", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], ["type", "options", 3, "onEdit", "options"]], template: function TipoDocumentoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function TipoDocumentoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TipoDocumentoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, TipoDocumentoListComponent_ng_template_8_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, TipoDocumentoListComponent_column_10_Template, 1, 2, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "pagination", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_DOC_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_DOC_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWRvY3VtZW50by1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-tipo-documento-tipo-documento-module.js.map