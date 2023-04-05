(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-planejamento-institucional-planejamento-module"],{

/***/ "2u95":
/*!**********************************************************!*\
  !*** ./src/app/dao/planejamento-objetivo-dao.service.ts ***!
  \**********************************************************/
/*! exports provided: PlanejamentoObjetivoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoObjetivoDaoService", function() { return PlanejamentoObjetivoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PlanejamentoObjetivoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("PlanejamentoObjetivo", injector);
        this.injector = injector;
        this.searchFields = ["nome", "planejamento_id", "eixo_tematico_id"];
    }
}
PlanejamentoObjetivoDaoService.ɵfac = function PlanejamentoObjetivoDaoService_Factory(t) { return new (t || PlanejamentoObjetivoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PlanejamentoObjetivoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PlanejamentoObjetivoDaoService, factory: PlanejamentoObjetivoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "6sNW":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-form-objetivo/planejamento-form-objetivo.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: PlanejamentoFormObjetivoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoFormObjetivoComponent", function() { return PlanejamentoFormObjetivoComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ "M+Kp");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ "2u95");
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ "ncVk");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");












const _c0 = ["planejamento_nome"];
const _c1 = function () { return ["cadastros", "eixo-tematico"]; };
const _c2 = function (a0) { return { route: a0 }; };
function PlanejamentoFormObjetivoComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "input-search", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx_r0.form.controls.eixo_tematico_id)("dao", ctx_r0.eixoTematicoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](4, _c1)));
} }
const _c3 = function () { return ["cadastros", "planejamento-objetivo"]; };
function PlanejamentoFormObjetivoComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "input-search", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.objetivo_superior_id)("dao", ctx_r2.planejamentoObjetivoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](4, _c3)));
} }
class PlanejamentoFormObjetivoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivo"], src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoObjetivoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'fundamentacao'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
        this.eixoTematicoDao = injector.get(src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_1__["EixoTematicoDaoService"]);
        this.planejamentoObjetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoObjetivoDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            fundamentacao: { default: "" },
            planejamento_id: { default: null },
            planejamento_nome: { default: "" },
            eixo_tematico_id: { default: null },
            objetivo_superior_id: { default: null },
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        /*    this.planejamento = this.queryParams.planejamento as Planejamento;
            this.form!.controls.planejamento_id.setValue(this.planejamento.id);
            this.form!.controls.planejamento_nome.setValue(this.planejamento.nome);
            this.cdRef.detectChanges(); */
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.planejamento = this.queryParams.planejamento;
        form.patchValue(new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivo"]());
        form.controls.planejamento_id.setValue(this.planejamento.id);
        form.controls.planejamento_nome.setValue(this.planejamento.nome);
        //cdRef.detectChanges();
    }
    saveData(form) {
        //this.util.fillForm(this.entity!, this.form!.value);
        return new Promise((resolve, reject) => {
            const objetivo = this.util.fill(new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivo"](), this.entity);
            resolve(this.util.fillForm(objetivo, this.form.value));
        });
    }
}
PlanejamentoFormObjetivoComponent.ɵfac = function PlanejamentoFormObjetivoComponent_Factory(t) { return new (t || PlanejamentoFormObjetivoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
PlanejamentoFormObjetivoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PlanejamentoFormObjetivoComponent, selectors: [["app-planejamento-form-objetivo"]], viewQuery: function PlanejamentoFormObjetivoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.planejamento_nome = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 11, vars: 12, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["label", "Fundamenta\u00E7\u00E3o", "controlName", "fundamentacao", 3, "size", "rows", "control"], ["class", "row", 4, "ngIf"], ["label", "Planejamento Institucional", "icon", "fab fa-unity", "controlName", "planejamento_nome", 3, "size", "disabled"], ["planejamento_nome", ""], ["label", "Eixo Tem\u00E1tico", "icon", "fab fa-unity", "controlName", "eixo_tematico_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Objetivo Superior", "icon", "fab fa-unity", "controlName", "objetivo_superior_id", 3, "size", "control", "dao", "selectRoute"]], template: function PlanejamentoFormObjetivoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("submit", function PlanejamentoFormObjetivoComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanejamentoFormObjetivoComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input-textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, PlanejamentoFormObjetivoComponent_div_6_Template, 2, 7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "input-text", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, PlanejamentoFormObjetivoComponent_div_10_Template, 2, 7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("rows", 4)("control", ctx.form.controls.fundamentacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.planejamento.unidade_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("disabled", "true");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.planejamento.unidade_id);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__["InputTextareaComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tZm9ybS1vYmpldGl2by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "AQSx":
/*!******************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-routing.module.ts ***!
  \******************************************************************************************/
/*! exports provided: PlanejamentoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoRoutingModule", function() { return PlanejamentoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./planejamento-form/planejamento-form.component */ "w8BU");
/* harmony import */ var _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./planejamento-list/planejamento-list.component */ "f/Uq");
/* harmony import */ var _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./planejamento-form-objetivo/planejamento-form-objetivo.component */ "6sNW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Planejamentos Institucionais" } },
    { path: 'new', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'objetivo/new', component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoFormObjetivoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Objetivo", modal: true } },
    { path: 'objetivo/:id/edit', component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoFormObjetivoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição de Objetivo", modal: true } },
    { path: 'objetivo/:id/consult', component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoFormObjetivoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar Objetivo", modal: true } },
];
class PlanejamentoRoutingModule {
}
PlanejamentoRoutingModule.ɵfac = function PlanejamentoRoutingModule_Factory(t) { return new (t || PlanejamentoRoutingModule)(); };
PlanejamentoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: PlanejamentoRoutingModule });
PlanejamentoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](PlanejamentoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "E1yr":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-mapa-entregas/planejamento-mapa-entregas.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: PlanejamentoMapaEntregasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoMapaEntregasComponent", function() { return PlanejamentoMapaEntregasComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/entrega-dao.service */ "724m");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../plano-entrega/plano-entrega.service */ "zX2r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ "1JHj");
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ "uSqO");




















const _c0 = ["unidade"];
function PlanejamentoMapaEntregasComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Data:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Cliente:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "badge", 16);
} if (rf & 2) {
    const row_r8 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r3.util.getDateFormatted(row_r8.inicio), " - ", ctx_r3.util.getDateFormatted(row_r8.fim), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r8.cliente, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r8.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", row_r8.plano_entrega.unidade.sigla);
} }
function PlanejamentoMapaEntregasComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h5", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Meta");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "h2", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r5.entregaService.getValorMeta(row_r9));
} }
function PlanejamentoMapaEntregasComponent_ng_template_18_h2_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h2", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Regular");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function PlanejamentoMapaEntregasComponent_ng_template_18_progress_bar_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "progress-bar", 28);
} if (rf & 2) {
    const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", row_r10.realizado.porcentagem);
} }
function PlanejamentoMapaEntregasComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h5", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Realizado");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, PlanejamentoMapaEntregasComponent_ng_template_18_h2_5_Template, 2, 0, "h2", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, PlanejamentoMapaEntregasComponent_ng_template_18_progress_bar_6_Template, 1, 1, "progress-bar", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "action-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r10 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r7.entregaService.isPorcentagem(row_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.entregaService.isPorcentagem(row_r10));
} }
const _c1 = function () { return ["configuracoes", "unidade"]; };
const _c2 = function (a0) { return { route: a0 }; };
const _c3 = function () { return ["cadastros", "entrega"]; };
class PlanejamentoMapaEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__["Planejamento"], src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["objetivos.objetivo_id", "==", this.objetivoId]);
            if (form.unidade_id)
                result.push(["plano_entrega.unidade_id", "==", form.unidade_id]);
            if (form.entrega_id)
                result.push(["entrega_id", "==", form.entrega_id]);
            if (form.inicio)
                result.push(["data_inicio", ">=", form.inicio]);
            if (form.fim)
                result.push(["data_fim", "<=", form.fim]);
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.entregaDao = injector.get(src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__["EntregaDaoService"]);
        this.entregaService = injector.get(_plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__["PlanoEntregaService"]);
        /* Inicializações */
        this.title = this.lex.noun('Planejamento Institucional', true);
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: null },
            entrega_id: { default: null },
            inicio: { default: null },
            fim: { default: null }
        });
        this.join = ['plano_entrega.unidade:id,nome,sigla', 'plano_entrega.entrega:id,nome,tipo_indicador,lista_qualitativos'];
    }
    filterClear(filter) {
        filter.controls.unidade_id.setValue(null);
        filter.controls.entrega_id.setValue(null);
        filter.controls.inicio.setValue(null);
        filter.controls.fim.setValue(null);
        super.filterClear(filter);
    }
}
PlanejamentoMapaEntregasComponent.ɵfac = function PlanejamentoMapaEntregasComponent_Factory(t) { return new (t || PlanejamentoMapaEntregasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanejamentoMapaEntregasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanejamentoMapaEntregasComponent, selectors: [["app-planejamento-mapa-entregas"]], viewQuery: function PlanejamentoMapaEntregasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 21, vars: 32, consts: [["noHeader", "", 3, "dao", "title", "orderBy", "join"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["unidade", ""], ["label", "Entrega", "controlName", "entrega_id", 3, "size", "control", "dao", "selectRoute"], ["entrega", ""], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", "labelInfo", "Data de in\u00EDcio do planejamento institucional", 3, "size", "control"], ["date", "", "label", "Fim", "controlName", "fim", "labelInfo", "Data do fim do planejamento institucional", 3, "size", "control"], ["title", "Entrega", 3, "template"], ["columnEntrega", ""], ["title", "Meta", 3, "template"], ["columnMeta", ""], ["title", "Realizado", 3, "template"], ["columnRealizado", ""], [3, "rows"], ["icon", "bi bi-list-columns-reverse", "color", "light", "hint", "Plano de entrega", 3, "label"], [1, "meta", "h-100"], [1, "card", "h-100"], [1, "card-body"], [1, "card-title"], [1, "text-primary"], [1, "realizado", "h-100"], ["class", "text-secondary", 4, "ngIf"], ["color", "success", 3, "value", 4, "ngIf"], [1, "card-footer", "p-0"], ["icon", "bi bi-card-checklist"], [1, "text-secondary"], ["color", "success", 3, "value"]], template: function PlanejamentoMapaEntregasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, PlanejamentoMapaEntregasComponent_ng_template_12_Template, 11, 5, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, PlanejamentoMapaEntregasComponent_ng_template_15_Template, 7, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, PlanejamentoMapaEntregasComponent_ng_template_18_Template, 9, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "pagination", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](13);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](16);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("join", ctx.join);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](27, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](26, _c1)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.entrega_id)("dao", ctx.entregaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](30, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](29, _c3)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__["ToolbarComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__["FilterComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__["PaginationComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__["BadgeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_17__["ActionButtonComponent"], _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__["ProgressBarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbWFwYS1lbnRyZWdhcy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "LT4w":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list-objetivo/planejamento-list-objetivo.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: PlanejamentoListObjetivoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoListObjetivoComponent", function() { return PlanejamentoListObjetivoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");













function PlanejamentoListObjetivoComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Eixo Tem\u00E1tico: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "badge", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const separator_r10 = ctx.separator;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", separator_r10 == null ? null : separator_r10.text);
} }
function PlanejamentoListObjetivoComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r11.nome);
} }
function PlanejamentoListObjetivoComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r12.fundamentacao);
} }
function PlanejamentoListObjetivoComponent_column_12_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((row_r15.objetivo_superior == null ? null : row_r15.objetivo_superior.nome) || "");
} }
function PlanejamentoListObjetivoComponent_column_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "column", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PlanejamentoListObjetivoComponent_column_12_ng_template_1_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r13);
} }
function PlanejamentoListObjetivoComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r16.eixo_tematico_id);
} }
class PlanejamentoListObjetivoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.minHeight = 100;
        this.options = [];
        this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoDaoService"]);
        this.groupBy = [{ field: "eixo_tematico.nome", label: "Eixo Temático" }];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            fundamentacao: { default: "" },
            planejamento_id: { default: null },
            eixo_tematico_id: { default: null },
            objetivo_superior_id: { default: null }
        }, this.cdRef);
    }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__["Planejamento"]());
        if (!this.gridControl.value.objetivos)
            this.gridControl.value.objetivos = [];
        return this.gridControl.value.objetivos;
    }
    addObjetivo() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', 'new'], params: { planejamento: this.entity } });
        });
    }
    removeObjetivo(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return true;
        });
    }
    consult(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.go.navigate({ route: [...this.go.currentOrDefault.route, row.id, "consult"] });
        });
    }
    loadObjetivo(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.nome.setValue(row.nome);
            form.controls.fundamentacao.setValue(row.fundamentacao);
            form.controls.planejamento_id.setValue(row.planejamento_id);
            form.controls.eixo_tematico_id.setValue(row.eixo_tematico_id);
            form.controls.objetivo_superior_id.setValue(row.objetivo_superior_id);
            this.cdRef.detectChanges();
        });
    }
    saveObjetivo(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = undefined;
            this.form.markAllAsTouched();
            if (this.form.valid) {
                row.id = row.id == "NEW" ? this.dao.generateUuid() : row.id;
                row.nome = form.controls.nome.value;
                row.fundamentacao = form.controls.fundamentacao.value;
                row.planejamento_id = form.controls.planejamento_id.value;
                row.eixo_tematico_id = form.controls.eixo_tematico_id.value;
                row.objetivo_superior_id = form.controls.objetivo_superior_id.value;
                result = row;
                this.cdRef.detectChanges();
            }
            return result;
        });
    }
    saveData(form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield ((_a = this.grid) === null || _a === void 0 ? void 0 : _a.confirm());
            return this.entity;
        });
    }
}
PlanejamentoListObjetivoComponent.ɵfac = function PlanejamentoListObjetivoComponent_Factory(t) { return new (t || PlanejamentoListObjetivoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
PlanejamentoListObjetivoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PlanejamentoListObjetivoComponent, selectors: [["planejamento-list-objetivo"]], viewQuery: function PlanejamentoListObjetivoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, inputs: { control: "control", entity: "entity" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 18, consts: [["editable", "", 3, "items", "form", "selectable", "minHeight", "add", "load", "remove", "save", "hasDelete", "hasEdit", "join", "groupBy", "groupTemplate"], ["gridObjetivos", ""], ["groupEixoTematico", ""], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Fundamenta\u00E7\u00E3o", 3, "template"], ["columnFundamentacao", ""], ["title", "Objetivo Superior", 3, "template", 4, "ngIf"], ["title", "Eixo Tem\u00E1tico", 3, "template"], ["columnEixoTematico", ""], ["type", "options", 3, "options"], [1, "grid-group-text"], [1, "text-wrap"], ["color", "primary", 3, "label"], ["title", "Objetivo Superior", 3, "template"], ["columnObjetivoSuperior", ""]], template: function PlanejamentoListObjetivoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "grid", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, PlanejamentoListObjetivoComponent_ng_template_3_Template, 4, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, PlanejamentoListObjetivoComponent_ng_template_7_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, PlanejamentoListObjetivoComponent_ng_template_10_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, PlanejamentoListObjetivoComponent_column_12_Template, 3, 1, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, PlanejamentoListObjetivoComponent_ng_template_14_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](4);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](8);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](11);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.minHeight)("add", ctx.addObjetivo.bind(ctx))("load", ctx.loadObjetivo.bind(ctx))("remove", ctx.removeObjetivo.bind(ctx))("save", ctx.saveObjetivo.bind(ctx))("hasDelete", true)("hasEdit", true)("join", ctx.join)("groupBy", ctx.groupBy)("groupTemplate", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.entity == null ? null : ctx.entity.unidade_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("options", ctx.options);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__["ToolbarComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__["BadgeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbGlzdC1vYmpldGl2by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "f/Uq":
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list/planejamento-list.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: PlanejamentoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoListComponent", function() { return PlanejamentoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../planejamento-list-objetivo/planejamento-list-objetivo.component */ "LT4w");


















const _c0 = ["unidade"];
function PlanejamentoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "toolbar");
} }
function PlanejamentoListComponent_column_12_ng_template_1_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", row_r13.objetivos == null ? null : row_r13.objetivos.length, "");
} }
function PlanejamentoListComponent_column_12_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, PlanejamentoListComponent_column_12_ng_template_1_span_0_Template, 3, 1, "span", 23);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", row_r13.objetivos == null ? null : row_r13.objetivos.length);
} }
function PlanejamentoListComponent_column_12_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "planejamento-list-objetivo", 26);
} if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("entity", row_r16);
} }
function PlanejamentoListComponent_column_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "column", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, PlanejamentoListComponent_column_12_ng_template_1_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, PlanejamentoListComponent_column_12_ng_template_3_Template, 1, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("align", "center")("hint", ctx_r2.lex.noun("Objetivo", true))("template", _r9)("expandTemplate", _r11);
} }
function PlanejamentoListComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r4.dao.getDateFormatted(row_r17.inicio), "");
} }
function PlanejamentoListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r6.dao.getDateFormatted(row_r18.fim), "");
} }
function PlanejamentoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", (row_r19.unidade == null ? null : row_r19.unidade.nome) || "", "");
} }
const _c1 = function () { return ["configuracoes", "unidade"]; };
const _c2 = function (a0) { return { route: a0 }; };
class PlanejamentoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_3__["Planejamento"], src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__["PlanejamentoDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a;
            let result = [];
            let form = filter.value;
            if (form.so_entidade) {
                filter.controls.unidade_id.setValue(null);
                result.push(["unidade_id", "==", null]);
            }
            else {
                if (form.unidade_id)
                    result.push(["unidade_id", "==", form.unidade_id]);
            }
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            if (form.inicio) {
                result.push(["inicio", ">=", form.inicio]);
            }
            if (form.fim) {
                result.push(["fim", "<=", form.fim]);
            }
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun('Planejamento Institucional', true);
        this.filter = this.fh.FormBuilder({
            inicio: { default: null },
            fim: { default: null },
            nome: { default: "" },
            unidade_id: { default: null },
            so_entidade: { default: false },
            agrupar: { default: true },
        });
        this.join = ['unidade:id,nome,sigla', 'objetivos', 'objetivos.eixo_tematico:id,nome', 'objetivos.objetivo_superior:id,nome'];
        // Testa se o usuário possui permissão para exibir planejamentos institucionais
        if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir planejamentos institucionais
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
        filter.controls.inicio.setValue(null);
        filter.controls.fim.setValue(null);
        filter.controls.unidade_id.setValue(null);
        filter.controls.so_entidade.setValue(false);
        super.filterClear(filter);
    }
    onSoEntidadeChange(event) {
        if (this.filter.controls.so_entidade.value) {
            this.filter.controls.unidade_id.setValue(null);
            this.unidade_disabled = 'disabled';
        }
        else {
            this.filter.controls.unidade_id.setValue(undefined);
            this.unidade_disabled = undefined;
        }
    }
}
PlanejamentoListComponent.ɵfac = function PlanejamentoListComponent_Factory(t) { return new (t || PlanejamentoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
PlanejamentoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PlanejamentoListComponent, selectors: [["app-planejamento-list"]], viewQuery: function PlanejamentoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 25, vars: 38, consts: [[3, "dao", "add", "title", "orderBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Planejamento Institucional", "controlName", "nome", "placeholder", "Nome do planejamento institucional...", 3, "size", "control"], ["label", "S\u00F3 da Entidade", "controlName", "so_entidade", 3, "size", "control", "change"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "disabled", "control", "dao", "selectRoute"], ["unidade", ""], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", "labelInfo", "Data de in\u00EDcio do planejamento institucional", 3, "size", "control"], ["date", "", "label", "Fim", "controlName", "fim", "labelInfo", "Data do fim do planejamento institucional", 3, "size", "control"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate"], ["columnObjetivos", ""], ["columnExpandedObjetivos", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-bullseye"], ["persist", "", 3, "entity"]], template: function PlanejamentoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("select", function PlanejamentoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, PlanejamentoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input-switch", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function PlanejamentoListComponent_Template_input_switch_change_6_listener($event) { return ctx.onSoEntidadeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, PlanejamentoListComponent_column_12_Template, 5, 4, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, PlanejamentoListComponent_ng_template_15_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, PlanejamentoListComponent_ng_template_18_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](21, PlanejamentoListComponent_ng_template_21_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "pagination", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](16);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](19);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PLAN_INST_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PLAN_INST_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.so_entidade);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 4)("disabled", ctx.unidade_disabled)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](36, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](35, _c1)));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__["InputSwitchComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_14__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__["ToolbarComponent"], _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_16__["PlanejamentoListObjetivoComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "f1z4":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento.module.ts ***!
  \**********************************************************************************/
/*! exports provided: PlanejamentoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoModule", function() { return PlanejamentoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./planejamento-list/planejamento-list.component */ "f/Uq");
/* harmony import */ var _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./planejamento-form/planejamento-form.component */ "w8BU");
/* harmony import */ var _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./planejamento-routing.module */ "AQSx");
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./planejamento-list-objetivo/planejamento-list-objetivo.component */ "LT4w");
/* harmony import */ var _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planejamento-form-objetivo/planejamento-form-objetivo.component */ "6sNW");
/* harmony import */ var _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./planejamento-mapa/planejamento-mapa.component */ "yp9j");
/* harmony import */ var _planejamento_mapa_entregas_planejamento_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./planejamento-mapa-entregas/planejamento-mapa-entregas.component */ "E1yr");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");










class PlanejamentoModule {
}
PlanejamentoModule.ɵfac = function PlanejamentoModule_Factory(t) { return new (t || PlanejamentoModule)(); };
PlanejamentoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: PlanejamentoModule });
PlanejamentoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
            _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](PlanejamentoModule, { declarations: [_planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoListComponent"],
        _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"],
        _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoListObjetivoComponent"],
        _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_6__["PlanejamentoFormObjetivoComponent"],
        _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_7__["PlanejamentoMapaComponent"],
        _planejamento_mapa_entregas_planejamento_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_8__["PlanejamentoMapaEntregasComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
        _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoRoutingModule"]] }); })();


/***/ }),

/***/ "ncVk":
/*!*******************************************************!*\
  !*** ./src/app/models/planejamento-objetivo.model.ts ***!
  \*******************************************************/
/*! exports provided: PlanejamentoObjetivo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoObjetivo", function() { return PlanejamentoObjetivo; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanejamentoObjetivo extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.nome = ""; /* Nome do objetivo */
        this.fundamentacao = ""; /* Fundamentação para a definição do objetivo */
        this.planejamento_id = null;
        this.eixo_tematico_id = null;
        this.objetivo_superior_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "w8BU":
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-form/planejamento-form.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: PlanejamentoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoFormComponent", function() { return PlanejamentoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../planejamento-list-objetivo/planejamento-list-objetivo.component */ "LT4w");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");



















const _c0 = ["objetivos"];
function PlanejamentoFormComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "input-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function PlanejamentoFormComponent_div_10_Template_input_select_select_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r2.onPlanejamentoSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx_r0.planejamentosSuperiores)("control", ctx_r0.form.controls.planejamento_superior_id);
} }
const _c1 = function () { return ["configuracoes", "unidade"]; };
const _c2 = function () { return { unidades_planejamento: true }; };
const _c3 = function (a0) { return { filter: a0 }; };
const _c4 = function (a0, a1) { return { route: a0, params: a1 }; };
const _c5 = function () { return ["unidades_planejamento", "==", true]; };
const _c6 = function (a0) { return [a0]; };
class PlanejamentoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__["Planejamento"], src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoDaoService"]);
        this.injector = injector;
        this.planejamentosSuperiores = [];
        this.hasPermissionToUNEX = false;
        this.validate = (control, controlName) => {
            var _a, _b, _c;
            let result = null;
            if (['nome', 'missao', 'visao'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
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
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
        this.join = ['objetivos', 'objetivos.objetivo_superior:id,nome', 'objetivos.eixo_tematico:id,nome'];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            unidade_id: { default: null },
            entidade_id: { default: null },
            planejamento_superior_id: { default: null },
            inicio: { default: new Date() },
            fim: { default: null },
            missao: { default: "" },
            visao: { default: "" },
            valores: { default: [] },
            valor_texto: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__["Planejamento"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.objetivos.grid.confirm();
                let planejamento = this.util.fill(new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__["Planejamento"](), this.entity);
                planejamento = this.util.fillForm(planejamento, this.form.value);
                planejamento.objetivos = this.objetivos.items;
                resolve(planejamento);
            });
        });
    }
    addValorHandle() {
        let result = undefined;
        const value = this.form.controls.valor_texto.value;
        const key = this.util.textHash(value);
        if ((value === null || value === void 0 ? void 0 : value.length) && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
            result = {
                key: key,
                value: this.form.controls.valor_texto.value
            };
            this.form.controls.valor_texto.setValue("");
        }
        return result;
    }
    ;
    onUnidadeChange(event) {
        var _a;
        this.entity.unidade_id = this.form.controls.unidade_id.value;
        (_a = this.dao) === null || _a === void 0 ? void 0 : _a.query({ where: [['unidade_executora_id', '==', this.form.controls.unidade_id.value], ['manut_planej_unidades_executoras', '==', true]] }).getAll().then((pls) => {
            this.planejamentosSuperiores = pls.map(x => Object.assign({}, { key: x.id, value: x.nome }));
            this.objetivos.loadData(this.entity, this.form);
            this.cdRef.detectChanges();
        });
    }
    onPlanejamentoSelect(event) {
    }
}
PlanejamentoFormComponent.ɵfac = function PlanejamentoFormComponent_Factory(t) { return new (t || PlanejamentoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanejamentoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanejamentoFormComponent, selectors: [["app-planejamento-form"]], viewQuery: function PlanejamentoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.objetivos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 36, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Nome do Planejamento Institucional", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["label", "Unidade Executora", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "disabled", "control", "dao", "selectRoute", "where", "change"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", "labelInfo", "In\u00EDcio do Planejamento Institucional", 3, "size", "control"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "fim", "labelInfo", "Fim do Planejamento Institucional", 3, "size", "control"], ["class", "row", 4, "ngIf"], ["label", "Miss\u00E3o", "controlName", "missao", 3, "size", "rows", "control"], ["label", "Vis\u00E3o", "controlName", "visao", 3, "size", "rows", "control"], ["label", "Valores", "controlName", "valores", 3, "size", "addItemHandle"], ["label", "Valor Institucional", "icon", "far fa-edit", "controlName", "valor_texto", 3, "control"], ["key", "OBJETIVOS", "label", "Objetivos"], ["noPersist", "", 3, "entity"], ["objetivos", ""], ["icon", "far fa-edit", "label", "Selecione o Planejamento Superior vinculado", "controlName", "planejamento_superior_id", 3, "items", "control", "select"]], template: function PlanejamentoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function PlanejamentoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanejamentoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function PlanejamentoFormComponent_Template_input_search_change_7_listener($event) { return ctx.onUnidadeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-datetime", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, PlanejamentoFormComponent_div_10_Template, 2, 2, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "input-textarea", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "input-textarea", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "input-multiselect", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "input-text", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "tab", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "planejamento-list-objetivo", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("disabled", ctx.hasPermissionToUNEX ? undefined : "true")("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction2"](30, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](26, _c1), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](28, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](27, _c2))))("where", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](34, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](33, _c5)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.form.controls.unidade_id.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("rows", 3)("control", ctx.form.controls.missao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("rows", 3)("control", ctx.form.controls.visao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("addItemHandle", ctx.addValorHandle.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", ctx.form.controls.valor_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("entity", ctx.entity);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_8__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_9__["TabComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__["InputDatetimeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgIf"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_14__["InputTextareaComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_15__["InputMultiselectComponent"], _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_16__["PlanejamentoListObjetivoComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__["InputSelectComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "yp9j":
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-mapa/planejamento-mapa.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: PlanejamentoMapaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoMapaComponent", function() { return PlanejamentoMapaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ "1JHj");









const _c0 = ["planejamentoInstitucional"];
function PlanejamentoMapaComponent_div_4_p_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const valor_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](valor_r4.value);
} }
function PlanejamentoMapaComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Valores ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "blockquote", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, PlanejamentoMapaComponent_div_4_p_7_Template, 2, 1, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Miss\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "blockquote", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, " Vis\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "blockquote", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r1.planejamento.valores);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.planejamento.missao);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r1.planejamento.visao);
} }
function PlanejamentoMapaComponent_div_5_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "action-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const objetivo_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](objetivo_r7.nome);
} }
function PlanejamentoMapaComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "action-button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, PlanejamentoMapaComponent_div_5_div_7_Template, 6, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const eixo_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background-color", eixo_r5.eixo.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](eixo_r5.eixo.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", eixo_r5.objetivos);
} }
class PlanejamentoMapaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.planejamentos = [];
        this.eixos = [];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
        this.join = ['objetivos'];
        this.title = "Objetivos do " + this.lex.noun('planejamento Institucional', true);
        this.form = this.fh.FormBuilder({
            planejamento_id: { default: null }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.query = this.dao.query({ where: [["data_arquivamento", "==", null]], orderBy: [["inicio", "desc"]], join: this.join });
            this.query.asPromise().then(planejamentos => {
                this.planejamentos = planejamentos.map(x => Object.assign({}, {
                    key: x.id,
                    value: x.nome,
                    data: x
                }));
                this.form.controls.planejamento_id.setValue(this.planejamentos.length ? this.planejamentos[0].key : null);
            });
        });
    }
    onPlanejamentoSelect() {
        var _a, _b, _c;
        this.planejamento = (_a = this.planejamentoInstitucional.selectedItem) === null || _a === void 0 ? void 0 : _a.data;
        this.eixos = ((_c = (_b = this.query.extra) === null || _b === void 0 ? void 0 : _b.eixos) === null || _c === void 0 ? void 0 : _c.map((x) => {
            var _a, _b;
            return Object.assign({}, {
                eixo: x,
                objetivos: ((_b = (_a = this.planejamento) === null || _a === void 0 ? void 0 : _a.objetivos) === null || _b === void 0 ? void 0 : _b.filter(y => y.eixo_tematico_id == x.id)) || []
            });
        })) || [];
    }
}
PlanejamentoMapaComponent.ɵfac = function PlanejamentoMapaComponent_Factory(t) { return new (t || PlanejamentoMapaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
PlanejamentoMapaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: PlanejamentoMapaComponent, selectors: [["planejamento-mapa"]], viewQuery: function PlanejamentoMapaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.planejamentoInstitucional = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 6, vars: 6, consts: [["noButtons", "", 3, "form"], [1, "row"], ["controlName", "planejamento_id", 3, "size", "control", "items", "select"], ["planejamentoInstitucional", ""], ["class", "row mb-5", 4, "ngIf"], ["class", "eixo", 3, "background-color", 4, "ngFor", "ngForOf"], [1, "row", "mb-5"], [1, "col-4"], [1, "card", "h-100"], [1, "card-header"], [1, "card-body"], [1, "blockquote", "mb-0"], [4, "ngFor", "ngForOf"], [1, "fst-italic"], [1, "eixo"], ["icon", "bi bi-info-circle"], [1, "d-flex", "align-items-center", "align-content-stretch", "p-3"], [1, "descricao"], [1, "objetivos", "row", "d-flex", "flex-wrap", "align-content-stretch"], ["class", "col-md-4", 4, "ngFor", "ngForOf"], [1, "col-md-4"], [1, "objetivo", "shadow-sm", "d-flex", "flex-column", "align-content-between"], [1, "buttons", "d-flex", "justify-content-end"], ["icon", "bi bi-file-earmark-bar-graph"]], template: function PlanejamentoMapaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "input-select", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function PlanejamentoMapaComponent_Template_input_select_select_2_listener() { return ctx.onPlanejamentoSelect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, PlanejamentoMapaComponent_div_4_Template, 24, 3, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, PlanejamentoMapaComponent_div_5_Template, 8, 4, "div", 5);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.planejamento_id)("items", ctx.planejamentos);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.planejamento);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.eixos);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_5__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_7__["ActionButtonComponent"]], styles: [".blockquote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  transform: rotate(-90deg);\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.eixo[_ngcontent-%COMP%]   .w-25[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%] {\n  background: #fff;\n  margin: 0 10px;\n  height: 100%;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: #5e5b5b;\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  border-top: 1px solid #ddd;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 5px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: #ddd;\n}\n\n.detalhe_entrega[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n/*# sourceMappingURL=style.css.map */\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BsYW5lamFtZW50by1tYXBhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsU0FBQTtBQUNKOztBQUVBO0VBQ0ksMEJBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSxzQkFBQTtBQUNKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFFQSxvQ0FBQSIsImZpbGUiOiJwbGFuZWphbWVudG8tbWFwYS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ibG9ja3F1b3RlIHAge1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5laXhvIC5kZXNjcmljYW8gaDQge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcclxufVxyXG5cclxuLmVpeG8gLmRlc2NyaWNhbyBidXR0b24ge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG59XHJcblxyXG4uZWl4byAudy0yNSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8ge1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIG1hcmdpbjogMCAxMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8gcCB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgY29sb3I6ICM1ZTViNWI7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvIC5idXR0b25zIHtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8gLmJ1dHRvbnMgYSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byAuYnV0dG9ucyBhOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbn1cclxuXHJcbi5kZXRhbGhlX2VudHJlZ2EgcCB7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxufVxyXG5cclxuLyojIHNvdXJjZU1hcHBpbmdVUkw9c3R5bGUuY3NzLm1hcCAqLyJdfQ== */"] });


/***/ }),

/***/ "yttb":
/*!**********************************************!*\
  !*** ./src/app/models/planejamento.model.ts ***!
  \**********************************************/
/*! exports provided: Planejamento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Planejamento", function() { return Planejamento; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Planejamento extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.data_arquivamento = null; /* Data de arquivamento */
        this.inicio = new Date(); /* Data de início do planejamento */
        this.fim = null; /* Data do fim do planejamento */
        this.nome = ""; /* Nome do planejamento institucional */
        this.missao = ""; /* Missão da Instituição/Unidade */
        this.visao = ""; /* Visão da Instituição/Unidade */
        this.valores = []; /* Valores da Instituição/Unidade */
        this.unidade_id = null; /* Unidade à qual está vinculado o planejamento institucional */
        this.entidade_id = null; /* Entidade à qual está vinculado o planejamento institucional */
        this.initialization(data);
    }
}


/***/ }),

/***/ "zX2r":
/*!***********************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega.service.ts ***!
  \***********************************************************************/
/*! exports provided: PlanoEntregaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaService", function() { return PlanoEntregaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/lookup.service */ "/MTl");


class PlanoEntregaService {
    constructor(lookup) {
        this.lookup = lookup;
    }
    getValorMeta(entrega) {
        var _a;
        let result = "";
        switch ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) {
            case "PORCENTAGEM":
                entrega.meta.porcentagem + " %";
                break;
            case "QUALITATIVO":
                entrega.meta.quantitativo;
                break;
            case "VALOR":
                entrega.meta.valor;
                break;
            case "QUALITATIVO":
                this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.meta.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    getValorRealizado(entrega) {
        var _a;
        let result = "";
        switch ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) {
            case "PORCENTAGEM":
                entrega.realizado.porcentagem + " %";
                break;
            case "QUALITATIVO":
                entrega.realizado.quantitativo;
                break;
            case "VALOR":
                entrega.realizado.valor;
                break;
            case "QUALITATIVO":
                this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.realizado.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    isPorcentagem(entrega) {
        var _a;
        return ((_a = entrega.entrega) === null || _a === void 0 ? void 0 : _a.tipo_indicador) == "PORCENTAGEM";
    }
}
PlanoEntregaService.ɵfac = function PlanoEntregaService_Factory(t) { return new (t || PlanoEntregaService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_1__["LookupService"])); };
PlanoEntregaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PlanoEntregaService, factory: PlanoEntregaService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-planejamento-institucional-planejamento-module.js.map