(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-configuracoes-entidade-entidade-module"],{

/***/ "2xTd":
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/entidade/entidade-list/entidade-list.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: EntidadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeListComponent", function() { return EntidadeListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/entidade.model */ "4IcU");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");













function EntidadeListComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function EntidadeListComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "toolbar");
} }
function EntidadeListComponent_column_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "column", 12);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx_r2.edit)("options", ctx_r2.options);
} }
class EntidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_2__["Entidade"], src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_1__["EntidadeDaoService"]);
        this.injector = injector;
        this.options = [];
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
        this.title = this.lex.noun("Entidade", true);
        this.code = "MOD_CFG_ENTD";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados da entidade
        if (this.auth.hasPermissionTo("MOD_ENTD_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir a entidade
        if (this.auth.hasPermissionTo("MOD_ENTD_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        // Testa se o usuário possui permissão para configurar a entidade
        if (this.auth.hasPermissionTo("MOD_ENTD_CFG")) {
            this.options.push({
                icon: "bi bi-tools",
                label: "Configurações",
                onClick: (entidade) => {
                    this.go.navigate({ route: ['configuracoes', 'entidade', entidade.id, 'conf'] }, { modal: true });
                }
            });
        }
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        super.filterClear(filter);
    }
}
EntidadeListComponent.ɵfac = function EntidadeListComponent_Factory(t) { return new (t || EntidadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
EntidadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EntidadeListComponent, selectors: [["app-entidade-list"]], viewQuery: function EntidadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 20, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome da entidade", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "field", "nome"], ["title", "Abrang\u00EAncia", "field", "abrangencia"], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], [1, "my-2"], ["type", "options", 3, "onEdit", "options"]], template: function EntidadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, EntidadeListComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function EntidadeListComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, EntidadeListComponent_toolbar_2_Template, 1, 0, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, EntidadeListComponent_column_10_Template, 1, 2, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "pagination", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_ENTD_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_ENTD_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbnRpZGFkZS1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "3i+0":
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/entidade/entidade-form/entidade-form.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: EntidadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeFormComponent", function() { return EntidadeFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/entidade.model */ "4IcU");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-display/input-display.component */ "3pJ9");

















const _c0 = ["cidade"];
const _c1 = ["gestor"];
const _c2 = ["gestorSubstituto"];
const _c3 = ["tipo_modalidade"];
const _c4 = function () { return ["cadastros", "cidade"]; };
const _c5 = function (a0) { return { route: a0 }; };
function EntidadeFormComponent_input_search_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-search", 14, 15);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("control", ctx_r2.form.controls.cidade_id)("dao", ctx_r2.cidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](4, _c4)));
} }
function EntidadeFormComponent_input_select_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-select", 16);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("control", ctx_r3.form.controls.uf)("items", ctx_r3.lookup.UF);
} }
function EntidadeFormComponent_input_display_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-display", 17);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8);
} }
const _c6 = function () { return ["configuracoes", "usuario"]; };
class EntidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_6__["Entidade"], src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["EntidadeDaoService"]);
        this.injector = injector;
        this.campos = [];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'sigla'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.sigla) || "");
        };
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoModalidadeDaoService"]);
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["CidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.form = this.fh.FormBuilder({
            sigla: { default: "" },
            nome: { default: "" },
            abrangencia: { default: "" },
            codigo_ibge: { default: "" },
            gravar_historico_processo: { default: "" },
            layout_formulario_demanda: { default: "" },
            campos_ocultos_demanda: { default: "" },
            tipo_modalidade_id: { default: null },
            cidade_id: { default: null },
            gestor_id: { default: null },
            gestor_substituto_id: { default: null },
            uf: { default: null }
        }, this.cdRef, this.validate);
        this.join = ["cidade", "tipoModalidade", "gestor", "gestor_substituto"];
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            this.campos = entity.campos_ocultos_demanda || [];
            yield Promise.all([
                (_a = this.cidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.cidade || entity.cidade_id),
                this.gestor.loadSearch(entity.gestor || entity.gestor_id),
                this.gestorSubstituto.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id),
                (_b = this.tipoModalidade) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.tipoModalidade || entity.tipo_modalidade_id)
            ]);
            form.patchValue(this.util.fillForm(formValue, entity));
        });
    }
    initializeData(form) {
        form.patchValue(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_6__["Entidade"]());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            let entidade = this.util.fill(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_6__["Entidade"](), this.entity);
            entidade = this.util.fillForm(entidade, this.form.value);
            if (entidade.abrangencia == "MUNICIPAL" && ((_a = this.cidade) === null || _a === void 0 ? void 0 : _a.searchObj)) {
                entidade.codigo_ibge = ((_b = this.cidade) === null || _b === void 0 ? void 0 : _b.searchObj).codigo_ibge;
            }
            else if (entidade.abrangencia == "ESTADUAL") {
                entidade.codigo_ibge = (_c = this.lookup.UF.find(x => x.key == entidade.uf)) === null || _c === void 0 ? void 0 : _c.code;
            }
            else {
                entidade.codigo_ibge = null;
            }
            entidade.campos_ocultos_demanda = this.campos;
            resolve(entidade);
        });
    }
}
EntidadeFormComponent.ɵfac = function EntidadeFormComponent_Factory(t) { return new (t || EntidadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
EntidadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: EntidadeFormComponent, selectors: [["app-entidade-form"]], viewQuery: function EntidadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.gestor = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.gestorSubstituto = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 16, vars: 29, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "Sigla", "controlName", "sigla", 3, "size", "control"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "size", "emptyValue", "control", "dao", "selectRoute"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "size", "emptyValue", "control", "dao", "selectRoute"], ["gestorSubstituto", ""], ["label", "Abrang\u00EAncia", "controlName", "abrangencia", 3, "size", "control", "items"], ["label", "Cidade", "controlName", "cidade_id", 3, "size", "control", "dao", "selectRoute", 4, "ngIf"], ["label", "UF", "controlName", "uf", 3, "size", "control", "items", 4, "ngIf"], ["label", "\u00C2mbito", "value", "Nacional", 3, "size", 4, "ngIf"], ["label", "Cidade", "controlName", "cidade_id", 3, "size", "control", "dao", "selectRoute"], ["cidade", ""], ["label", "UF", "controlName", "uf", 3, "size", "control", "items"], ["label", "\u00C2mbito", "value", "Nacional", 3, "size"]], template: function EntidadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function EntidadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function EntidadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](7, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input-search", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "input-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, EntidadeFormComponent_input_search_13_Template, 2, 7, "input-search", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, EntidadeFormComponent_input_select_14_Template, 1, 3, "input-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, EntidadeFormComponent_input_display_15_Template, 1, 1, "input-display", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.sigla);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.form.controls.gestor_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](24, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](23, _c6)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.form.controls.gestor_substituto_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](27, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](26, _c6)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.abrangencia)("items", ctx.lookup.ABRANGENCIA);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "MUNICIPAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "ESTADUAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "NACIONAL");
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_9__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_10__["TabComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_15__["InputDisplayComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbnRpZGFkZS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "BSHP":
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/entidade/entidade-conf/entidade-conf.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: EntidadeConfComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeConfComponent", function() { return EntidadeConfComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/entidade.model */ "4IcU");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/notificacao.service */ "QUyP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ "sRLT");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ "L+jc");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");





















const _c0 = ["cargaHoraria"];
const _c1 = function () { return ["cadastros", "tipo-modalidade"]; };
const _c2 = function (a0) { return { route: a0 }; };
class EntidadeConfComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_4__["Entidade"], src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["EntidadeDaoService"]);
        this.injector = injector;
        this.validateNomenclatura = (control, controlName) => {
            var _a;
            let result = null;
            if (["singular", "plural"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validate = (control, controlName) => {
            let result = null;
            if (['carga_horaria_padrao'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Configurando";
        };
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["TipoModalidadeDaoService"]);
        this.notificacao = injector.get(src_app_services_notificacao_service__WEBPACK_IMPORTED_MODULE_6__["NotificacaoService"]);
        this.form = this.fh.FormBuilder({
            url_sei: { default: "" },
            tipo_modalidade_id: { default: null },
            notifica_demanda_distribuicao: { default: true },
            notifica_demanda_conclusao: { default: true },
            notifica_demanda_avaliacao: { default: true },
            notifica_demanda_modificacao: { default: true },
            notifica_demanda_comentario: { default: true },
            template_demanda_distribuicao: { default: "" },
            template_demanda_conclusao: { default: "" },
            template_demanda_avaliacao: { default: "" },
            template_demanda_modificacao: { default: "" },
            template_demanda_comentario: { default: "" },
            enviar_email: { default: true },
            enviar_whatsapp: { default: true },
            nomenclatura: { default: [] },
            carga_horaria_padrao: { default: 8 },
            forma_contagem_carga_horaria: { default: "DIA" },
            api_public_key: { default: "" }
        }, this.cdRef, this.validate);
        this.formNomenclatura = this.fh.FormBuilder({
            id: { default: "" },
            nome: { default: "" },
            singular: { default: "" },
            plural: { default: "" },
            feminino: { default: false }
        }, this.cdRef, this.validateNomenclatura);
        this.title = "Configurando entidade";
    }
    onApiKeyClick(event) {
        var _a;
        (_a = this.dao) === null || _a === void 0 ? void 0 : _a.generateApiKey(this.entity.id).then(api_public_key => {
            this.form.controls.api_public_key.setValue(api_public_key);
        }).catch(error => {
            this.error(error.message ? error.message : error);
        });
    }
    onSingularChange(row, form) {
        form.controls.singular.setValue(form.controls.singular.value.toLowerCase());
        this.cdRef.detectChanges();
    }
    onPluralChange(row, form) {
        form.controls.plural.setValue(form.controls.plural.value.toLowerCase());
        this.cdRef.detectChanges();
    }
    onFormaContagemCargaHorariaChange(unit) {
        this.form.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
    }
    get formaContagemCargaHoraria() {
        var _a, _b;
        const forma = ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.forma_contagem_carga_horaria) === null || _b === void 0 ? void 0 : _b.value) || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
    loadData(entity, form) {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            let nomenclatura = entity.nomenclatura || [];
            Object.entries(this.lex.defaults).forEach(([key, value]) => {
                if (!nomenclatura.find(x => x.nome == key)) {
                    nomenclatura.push({
                        id: key,
                        nome: key,
                        singular: value.single,
                        plural: value.plural,
                        feminino: value.female
                    });
                }
            });
            entity.nomenclatura = nomenclatura;
            //form.patchValue(this.util.fillForm(formValue, entity));
            let notificacoes = this.util.fill(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_4__["EntidadeNotificacoes"](), entity.notificacoes);
            form.patchValue(this.util.fillForm(formValue, Object.assign(Object.assign({}, entity), {
                notifica_demanda_distribuicao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_distribuicao) == undefined || (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_distribuicao),
                notifica_demanda_conclusao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_conclusao) == undefined || (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_conclusao),
                notifica_demanda_avaliacao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_avaliacao) == undefined || (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_avaliacao),
                notifica_demanda_modificacao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_modificacao) == undefined || (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_modificacao),
                notifica_demanda_comentario: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_comentario) == undefined || (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.notifica_demanda_comentario),
                template_demanda_distribuicao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.template_demanda_distribuicao) || "",
                template_demanda_conclusao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.template_demanda_conclusao) || "",
                template_demanda_avaliacao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.template_demanda_avaliacao) || "",
                template_demanda_modificacao: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.template_demanda_modificacao) || "",
                template_demanda_comentario: (notificacoes === null || notificacoes === void 0 ? void 0 : notificacoes.template_demanda_comentario) || "",
                enviar_email: ((_a = entity.notificacoes) === null || _a === void 0 ? void 0 : _a.enviar_email) == undefined || ((_b = entity.notificacoes) === null || _b === void 0 ? void 0 : _b.enviar_email),
                enviar_whatsapp: ((_c = entity.notificacoes) === null || _c === void 0 ? void 0 : _c.enviar_whatsapp) == undefined || ((_d = entity.notificacoes) === null || _d === void 0 ? void 0 : _d.enviar_whatsapp)
            })));
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getById(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let notificacoes = this.util.fillForm(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_4__["EntidadeNotificacoes"](), this.form.value);
            let entidade = this.util.fill(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_4__["Entidade"](), this.entity);
            entidade = this.util.fillForm(entidade, this.form.value);
            this.dao.update(entidade.id, {
                url_sei: entidade.url_sei,
                tipo_modalidade_id: entidade.tipo_modalidade_id,
                nomenclatura: entidade.nomenclatura,
                notificacoes: notificacoes,
                carga_horaria_padrao: entidade.carga_horaria_padrao,
                forma_contagem_carga_horaria: entidade.forma_contagem_carga_horaria
            }).then(saved => resolve(true)).catch(reject);
        });
    }
}
EntidadeConfComponent.ɵfac = function EntidadeConfComponent_Factory(t) { return new (t || EntidadeConfComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
EntidadeConfComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: EntidadeConfComponent, selectors: [["app-entidade-conf"]], viewQuery: function EntidadeConfComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.cargaHoraria = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 43, vars: 55, consts: [[3, "form", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "GERAL", "label", "Geral"], [1, "row"], ["label", "Modalidade", "controlName", "tipo_modalidade_id", "labelInfo", "Tipo de modalidade padr\u00E3o utilizada ao criar plano de trabalho.", 3, "size", "control", "dao", "selectRoute"], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria_padrao", "labelInfo", "Carga hor\u00E1ria e forma de contagem (horas por dia, semana ou m\u00EAs) padr\u00E3o utilizada ao criar plano de trabalho.", 3, "size", "unit", "control", "unitChange"], ["cargaHoraria", ""], ["label", "Url do Sei/SUPER", "icon", "bi bi-lin", "controlName", "url_sei", "labelInfo", "Url base do Sei/SUPER, deve ser semelhante a: https://sei.minha-entidade.gov.br/", 3, "size", "control"], ["label", "Chave de API", "icon", "bi bi-lin", "placeholder", "Vis\u00EDvel somente no momento em que foi gerado", "iconButton", "bi bi-arrow-clockwise", "controlName", "api_public_key", "labelInfo", "Chave publica para comunica\u00E7\u00E3o por API, o valor \u00E9 vis\u00EDvel somente no momento em que for gerado.", 3, "size", "control", "buttonClick"], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [1, "col-md-6"], ["transparent", "", "title", "Meios de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar por e-mail", "controlName", "enviar_email", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar por Whatsapp", "controlName", "enviar_whatsapp", 3, "size"], ["transparent", "", "title", "Tipos de notifica\u00E7\u00E3o"], ["scale", "small", "labelPosition", "right", "label", "Notificar distribui\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_distribuicao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar conclus\u00E3o da demanda", "controlName", "notifica_demanda_conclusao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar avalia\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_avaliacao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar modifica\u00E7\u00E3o da demanda", "controlName", "notifica_demanda_modificacao", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Notificar coment\u00E1rio da demanda", "controlName", "notifica_demanda_comentario", 3, "size"], ["transparent", "", "title", "Templates das mensagens"], ["controlName", "template_demanda_distribuicao", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_conclusao", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_avaliacao", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_modificacao", 3, "size", "rows", "label", "labelInfo", "control"], ["controlName", "template_demanda_comentario", 3, "size", "rows", "label", "labelInfo", "control"], ["key", "NOMENCLATURA", "label", "Nomenclatura"], ["clss", "row"], ["editable", "", 3, "control", "form", "hasAdd"], ["type", "text", "title", "Nome", "field", "nome", 3, "editable"], ["type", "text", "title", "Singular", "field", "singular", 3, "onChange"], ["type", "text", "title", "Plural", "field", "plural", 3, "onChange"], ["type", "switch", "title", "Feminino", "field", "feminino"], ["type", "options"]], template: function EntidadeConfComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function EntidadeConfComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function EntidadeConfComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-search", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input-workload", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "input-button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("buttonClick", function EntidadeConfComponent_Template_input_button_buttonClick_9_listener($event) { return ctx.onApiKeyClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "separator", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "input-switch", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "input-switch", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](17, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "input-switch", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](19, "input-switch", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "input-switch", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](21, "input-switch", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](22, "input-switch", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](23, "separator", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "input-textarea", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](27, "input-textarea", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "input-textarea", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](31, "input-textarea", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](33, "input-textarea", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "tab", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "grid", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](38, "column", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](39, "column", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](40, "column", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](41, "column", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](42, "column", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](53, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](52, _c1)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("unit", ctx.formaContagemCargaHoraria)("control", ctx.form.controls.carga_horaria_padrao)("unitChange", ctx.onFormaContagemCargaHorariaChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.url_sei);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.api_public_key);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na cria\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaDistribuicao)("control", ctx.form.controls.template_demanda_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na conclus\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaConclusao)("control", ctx.form.controls.template_demanda_conclusao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na avalia\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaAvaliacao)("control", ctx.form.controls.template_demanda_avaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na modifica\u00E7\u00E3o " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaModificacao)("control", ctx.form.controls.template_demanda_modificacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("label", "Texto na inclus\u00E3o de coment\u00E1rio " + ctx.lex.noun("demanda", false, true))("labelInfo", ctx.notificacao.hintDemandaComentario)("control", ctx.form.controls.template_demanda_comentario);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", ctx.form.controls.nomenclatura)("form", ctx.formNomenclatura)("hasAdd", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("editable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onChange", ctx.onSingularChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onChange", ctx.onPluralChange.bind(ctx));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_8__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_11__["InputWorkloadComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"], _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_13__["InputButtonComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__["SeparatorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__["InputSwitchComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_16__["InputTextareaComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_17__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__["ColumnComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbnRpZGFkZS1jb25mLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "FWXs":
/*!***************************************************************************!*\
  !*** ./src/app/modules/configuracoes/entidade/entidade-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: EntidadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeRoutingModule", function() { return EntidadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entidade-conf/entidade-conf.component */ "BSHP");
/* harmony import */ var _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entidade-form/entidade-form.component */ "3i+0");
/* harmony import */ var _entidade_list_entidade_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entidade-list/entidade-list.component */ "2xTd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _entidade_list_entidade_list_component__WEBPACK_IMPORTED_MODULE_5__["EntidadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Entidades" } },
    { path: 'new', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/conf', component: _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_3__["EntidadeConfComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Configurações", modal: true } },
    { path: ':id/consult', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class EntidadeRoutingModule {
}
EntidadeRoutingModule.ɵfac = function EntidadeRoutingModule_Factory(t) { return new (t || EntidadeRoutingModule)(); };
EntidadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: EntidadeRoutingModule });
EntidadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](EntidadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "sPLe":
/*!*******************************************************************!*\
  !*** ./src/app/modules/configuracoes/entidade/entidade.module.ts ***!
  \*******************************************************************/
/*! exports provided: EntidadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeModule", function() { return EntidadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _entidade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entidade-routing.module */ "FWXs");
/* harmony import */ var _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entidade-form/entidade-form.component */ "3i+0");
/* harmony import */ var _entidade_list_entidade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entidade-list/entidade-list.component */ "2xTd");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entidade-conf/entidade-conf.component */ "BSHP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class EntidadeModule {
}
EntidadeModule.ɵfac = function EntidadeModule_Factory(t) { return new (t || EntidadeModule)(); };
EntidadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: EntidadeModule });
EntidadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _entidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["EntidadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](EntidadeModule, { declarations: [_entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_2__["EntidadeFormComponent"],
        _entidade_list_entidade_list_component__WEBPACK_IMPORTED_MODULE_3__["EntidadeListComponent"],
        _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_6__["EntidadeConfComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _entidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["EntidadeRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-configuracoes-entidade-entidade-module.js.map