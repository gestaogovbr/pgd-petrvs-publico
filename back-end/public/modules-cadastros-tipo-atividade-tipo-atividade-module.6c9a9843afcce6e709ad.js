(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-tipo-atividade-tipo-atividade-module"],{

/***/ "FfqU":
/*!***************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade.module.ts ***!
  \***************************************************************************/
/*! exports provided: TipoAtividadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividadeModule", function() { return TipoAtividadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-atividade-routing.module */ "lW5c");
/* harmony import */ var _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-atividade-form/tipo-atividade-form.component */ "g2nK");
/* harmony import */ var _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-atividade-list/tipo-atividade-list.component */ "U+Nt");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class TipoAtividadeModule {
}
TipoAtividadeModule.ɵfac = function TipoAtividadeModule_Factory(t) { return new (t || TipoAtividadeModule)(); };
TipoAtividadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: TipoAtividadeModule });
TipoAtividadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoAtividadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](TipoAtividadeModule, { declarations: [_tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__["TipoAtividadeFormComponent"],
        _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__["TipoAtividadeListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoAtividadeRoutingModule"]] }); })();


/***/ }),

/***/ "U+Nt":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-list/tipo-atividade-list.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoAtividadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividadeListComponent", function() { return TipoAtividadeListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-atividade.model */ "ViL9");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");













function TipoAtividadeListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "toolbar");
} }
function TipoAtividadeListComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r4 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMap"](row_r4.icone);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", row_r4.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("color", row_r4.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", row_r4.nome, "");
} }
function TipoAtividadeListComponent_column_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "column", 9);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx_r3.edit)("options", ctx_r3.options);
} }
class TipoAtividadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__["TipoAtividade"], src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoAtividadeDaoService"]);
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
        this.title = "Tipos de " + this.lex.noun("Atividade", true);
        this.code = "MOD_TIPO_ATV";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            icone: { default: "" },
            cor: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de atividade
        if (this.auth.hasPermissionTo("MOD_TIPO_ATV_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de atividade
        if (this.auth.hasPermissionTo("MOD_TIPO_ATV_EXCL")) {
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
TipoAtividadeListComponent.ɵfac = function TipoAtividadeListComponent_Factory(t) { return new (t || TipoAtividadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoAtividadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoAtividadeListComponent, selectors: [["app-tipo-atividade-list"]], viewQuery: function TipoAtividadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 11, vars: 21, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome do tipo da atividade", "controlName", "nome", "placeholder", "Nome do tipo da atividade", 3, "size", "control"], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], ["type", "options", 3, "onEdit", "options"]], template: function TipoAtividadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function TipoAtividadeListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TipoAtividadeListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, TipoAtividadeListComponent_ng_template_7_Template, 3, 7, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, TipoAtividadeListComponent_column_9_Template, 1, 2, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "pagination", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_ATV_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_ATV_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWF0aXZpZGFkZS1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "ViL9":
/*!************************************************!*\
  !*** ./src/app/models/tipo-atividade.model.ts ***!
  \************************************************/
/*! exports provided: TipoAtividade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividade", function() { return TipoAtividade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoAtividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.nome = ""; //Descrição do tipo/categoria da atividade
        this.icone = ""; //Classe do icone
        this.cor = ""; //Código da cor em hex
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
    }
}


/***/ }),

/***/ "g2nK":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-form/tipo-atividade-form.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoAtividadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividadeFormComponent", function() { return TipoAtividadeFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ "LYCz");
/* harmony import */ var src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-atividade.model */ "ViL9");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");









class TipoAtividadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__["TipoAtividade"], src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoAtividadeDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'icone'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
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
            cor: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__["TipoAtividade"]());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoAtividade = this.util.fill(new src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__["TipoAtividade"](), this.entity);
            resolve(this.util.fillForm(tipoAtividade, this.form.value));
        });
    }
}
TipoAtividadeFormComponent.ɵfac = function TipoAtividadeFormComponent_Factory(t) { return new (t || TipoAtividadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoAtividadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoAtividadeFormComponent, selectors: [["app-tipo-atividade-form"]], viewQuery: function TipoAtividadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 6, vars: 10, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "icone", 3, "size", "control", "items"], ["label", "Cor", "icon", "bi bi-palette", "controlName", "cor", 3, "size", "control"]], template: function TipoAtividadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function TipoAtividadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function TipoAtividadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "input-color", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.icone)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.cor);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__["InputSelectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_7__["InputColorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWF0aXZpZGFkZS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "lW5c":
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: TipoAtividadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividadeRoutingModule", function() { return TipoAtividadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-atividade-form/tipo-atividade-form.component */ "g2nK");
/* harmony import */ var _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tipo-atividade-list/tipo-atividade-list.component */ "U+Nt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_4__["TipoAtividadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Atividade" } },
    { path: 'new', component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAtividadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class TipoAtividadeRoutingModule {
}
TipoAtividadeRoutingModule.ɵfac = function TipoAtividadeRoutingModule_Factory(t) { return new (t || TipoAtividadeRoutingModule)(); };
TipoAtividadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: TipoAtividadeRoutingModule });
TipoAtividadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TipoAtividadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-tipo-atividade-tipo-atividade-module.6c9a9843afcce6e709ad.js.map