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
        this.title = this.lex.translate("Entidades");
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
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 22, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", "placeholder", "Nome...", 3, "size", "label", "control"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "field", "nome"], ["title", "Abrang\u00EAncia", "field", "abrangencia"], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "my-2"]], template: function EntidadeListComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "column", 9);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Nome " + ctx.lex.translate("entidade"))("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
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
function EntidadeFormComponent_input_search_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-search", 14, 15);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("dao", ctx_r2.cidadeDao);
} }
function EntidadeFormComponent_input_select_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-select", 16);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("items", ctx_r3.lookup.UF);
} }
function EntidadeFormComponent_input_display_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "input-display", 17);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8);
} }
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
            return "Editando " + this.lex.translate("Entidade") + ': ' + ((entity === null || entity === void 0 ? void 0 : entity.sigla) || "");
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
            expediente: { default: null },
            uf: { default: null }
        }, this.cdRef, this.validate);
        this.join = ["cidade", "tipoModalidade", "gestor", "gestor_substituto"];
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            this.campos = entity.campos_ocultos_atividade || [];
            yield Promise.all([
                (_a = this.cidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.cidade || entity.cidade_id),
                this.gestor.loadSearch(entity.gestor || entity.gestor_id),
                this.gestorSubstituto.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id),
                (_b = this.tipoModalidade) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
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
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 16, vars: 16, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "Sigla", "controlName", "sigla", 3, "size"], ["label", "Nome", "controlName", "nome", 3, "size"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "size", "emptyValue", "dao"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "size", "emptyValue", "dao"], ["gestorSubstituto", ""], ["label", "Abrang\u00EAncia", "controlName", "abrangencia", 3, "size", "items"], ["controlName", "cidade_id", 3, "size", "dao", 4, "ngIf"], ["label", "UF", "icon", "bi bi-flag", "controlName", "uf", 3, "size", "items", 4, "ngIf"], ["label", "\u00C2mbito", "icon", "bi bi-shield-fill-check", "value", "Nacional", 3, "size", 4, "ngIf"], ["controlName", "cidade_id", 3, "size", "dao"], ["cidade", ""], ["label", "UF", "icon", "bi bi-flag", "controlName", "uf", 3, "size", "items"], ["label", "\u00C2mbito", "icon", "bi bi-shield-fill-check", "value", "Nacional", 3, "size"]], template: function EntidadeFormComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, EntidadeFormComponent_input_search_13_Template, 2, 2, "input-search", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, EntidadeFormComponent_input_select_14_Template, 1, 2, "input-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, EntidadeFormComponent_input_display_15_Template, 1, 1, "input-display", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("emptyValue", null)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("emptyValue", null)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("items", ctx.lookup.ABRANGENCIA);
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
/* harmony import */ var src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/template-dao.service */ "1DpL");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/entidade.model */ "4IcU");
/* harmony import */ var src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/expediente.model */ "e8A4");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_modules_uteis_notificacoes_notificacao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/uteis/notificacoes/notificacao.service */ "edjK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ "sRLT");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ "L+jc");
/* harmony import */ var _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../uteis/calendar-expediente/calendar-expediente.component */ "ODvL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../uteis/notificacoes/notificacoes-config/notificacoes-config.component */ "MFW/");























const _c0 = ["cargaHoraria"];
const _c1 = ["notificacoes"];
function EntidadeConfComponent_tab_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "notificacoes-config", 22, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entity", ctx_r2.entity)("entidadeId", ctx_r2.entity.id)("disabled", ctx_r2.formDisabled);
} }
class EntidadeConfComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_5__["Entidade"], src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["EntidadeDaoService"]);
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
            return "Configurando " + this.lex.translate("Entidade") + ': ' + ((entity === null || entity === void 0 ? void 0 : entity.sigla) || "");
        };
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoModalidadeDaoService"]);
        this.templateDao = injector.get(src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_3__["TemplateDaoService"]);
        this.notificacao = injector.get(src_app_modules_uteis_notificacoes_notificacao_service__WEBPACK_IMPORTED_MODULE_8__["NotificacaoService"]);
        this.modalWidth = 1200;
        this.join = ["notificacoes_templates"];
        this.form = this.fh.FormBuilder({
            url_sei: { default: "" },
            tipo_modalidade_id: { default: null },
            notificacoes: { default: [] },
            nomenclatura: { default: [] },
            expediente: { default: new src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_6__["Expediente"]() },
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
        this.title = "Configurando " + this.lex.translate("Entidade");
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
            form.patchValue(this.util.fillForm(formValue, entity));
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getById(this.urlParams.get("id"), this.join));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = this.notificacoes) === null || _a === void 0 ? void 0 : _a.saveData();
            let entidade = this.util.fill(new src_app_models_entidade_model__WEBPACK_IMPORTED_MODULE_5__["Entidade"](), this.entity);
            entidade = this.util.fillForm(entidade, this.form.value);
            this.dao.update(entidade.id, {
                url_sei: entidade.url_sei,
                tipo_modalidade_id: entidade.tipo_modalidade_id,
                nomenclatura: entidade.nomenclatura,
                notificacoes: entidade.notificacoes,
                expediente: entidade.expediente,
                carga_horaria_padrao: entidade.carga_horaria_padrao,
                forma_contagem_carga_horaria: entidade.forma_contagem_carga_horaria
            }).then(saved => resolve(true)).catch(reject);
        });
    }
}
EntidadeConfComponent.ɵfac = function EntidadeConfComponent_Factory(t) { return new (t || EntidadeConfComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"])); };
EntidadeConfComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: EntidadeConfComponent, selectors: [["app-entidade-conf"]], viewQuery: function EntidadeConfComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.cargaHoraria = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.notificacoes = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 23, vars: 18, consts: [[3, "form", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "GERAL", "label", "Geral"], [1, "row"], ["controlName", "tipo_modalidade_id", "labelInfo", "Tipo de modalidade padr\u00E3o utilizada ao criar plano de trabalho.", 3, "size", "dao"], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria_padrao", "labelInfo", "Carga hor\u00E1ria e forma de contagem (horas por dia, semana ou m\u00EAs) padr\u00E3o utilizada ao criar plano de trabalho.", 3, "size", "unit", "unitChange"], ["cargaHoraria", ""], ["label", "Url do Sei/SUPER", "icon", "bi bi-lin", "controlName", "url_sei", "labelInfo", "Url base do Sei/SUPER, deve ser semelhante a: https://sei.minha-entidade.gov.br/", 3, "size", "control"], ["label", "Chave de API", "icon", "bi bi-lin", "placeholder", "Vis\u00EDvel somente no momento em que foi gerado", "iconButton", "bi bi-arrow-clockwise", "controlName", "api_public_key", "labelInfo", "Chave publica para comunica\u00E7\u00E3o por API, o valor \u00E9 vis\u00EDvel somente no momento em que for gerado.", 3, "size", "buttonClick"], ["key", "EXPEDIENTE", "label", "Expediente"], [3, "control"], ["expediente", ""], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es", 4, "ngIf"], ["key", "NOMENCLATURA", "label", "Nomenclatura"], ["clss", "row"], ["editable", "", 3, "control", "form", "hasAdd"], ["type", "text", "title", "Nome", "field", "nome", 3, "editable"], ["type", "text", "title", "Singular", "field", "singular", 3, "onChange"], ["type", "text", "title", "Plural", "field", "plural", 3, "onChange"], ["type", "switch", "title", "Feminino", "field", "feminino"], ["type", "options"], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [3, "entity", "entidadeId", "disabled"], ["notificacoes", ""]], template: function EntidadeConfComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function EntidadeConfComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function EntidadeConfComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "input-search", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "input-workload", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "input-button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("buttonClick", function EntidadeConfComponent_Template_input_button_buttonClick_9_listener($event) { return ctx.onApiKeyClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "calendar-expediente", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, EntidadeConfComponent_tab_13_Template, 3, 3, "tab", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "tab", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "grid", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](18, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](21, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](22, "column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8)("dao", ctx.tipoModalidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("unit", ctx.formaContagemCargaHoraria)("unitChange", ctx.onFormaContagemCargaHorariaChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.url_sei);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("control", ctx.form.controls.expediente);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.entity);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("control", ctx.form.controls.nomenclatura)("form", ctx.formNomenclatura)("hasAdd", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("editable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("onChange", ctx.onSingularChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("onChange", ctx.onPluralChange.bind(ctx));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_10__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_11__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__["InputSearchComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_13__["InputWorkloadComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__["InputTextComponent"], _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_15__["InputButtonComponent"], _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_16__["CalendarExpedienteComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgIf"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_18__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_19__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_20__["ColumnComponent"], _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_21__["NotificacoesConfigComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbnRpZGFkZS1jb25mLmNvbXBvbmVudC5zY3NzIn0= */"] });


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
    { path: 'new', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Entidade", modal: true } },
    { path: ':id/edit', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição de Entidade", modal: true } },
    { path: ':id/conf', component: _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_3__["EntidadeConfComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Configurações de Entidade", modal: true } },
    { path: ':id/consult', component: _entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_4__["EntidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Entidade", modal: true } }
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
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class EntidadeModule {
}
EntidadeModule.ɵfac = function EntidadeModule_Factory(t) { return new (t || EntidadeModule)(); };
EntidadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: EntidadeModule });
EntidadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__["UteisModule"],
            _entidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["EntidadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](EntidadeModule, { declarations: [_entidade_form_entidade_form_component__WEBPACK_IMPORTED_MODULE_2__["EntidadeFormComponent"],
        _entidade_list_entidade_list_component__WEBPACK_IMPORTED_MODULE_3__["EntidadeListComponent"],
        _entidade_conf_entidade_conf_component__WEBPACK_IMPORTED_MODULE_6__["EntidadeConfComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_7__["UteisModule"],
        _entidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["EntidadeRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-configuracoes-entidade-entidade-module.js.map