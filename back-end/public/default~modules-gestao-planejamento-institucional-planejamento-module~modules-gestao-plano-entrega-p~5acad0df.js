(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~modules-gestao-planejamento-institucional-planejamento-module~modules-gestao-plano-entrega-p~5acad0df"],{

/***/ "6sNW":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-form-objetivo/planejamento-form-objetivo.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: PlanejamentoFormObjetivoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoFormObjetivoComponent", function() { return PlanejamentoFormObjetivoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ "M+Kp");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ "2u95");
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ "ncVk");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/navigate.service */ "RANn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");















const _c0 = ["planejamentoSuperiorNome"];
const _c1 = ["eixoTematico"];
function PlanejamentoFormObjetivoComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input-text", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("icon", ctx_r2.entityService.getIcon("Planejamento"));
} }
function PlanejamentoFormObjetivoComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input-select", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx_r3.objetivos_superiores)("size", 12)("control", ctx_r3.form.controls.objetivo_superior_id);
} }
class PlanejamentoFormObjetivoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoObjetivo"], src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivoDaoService"]);
        this.injector = injector;
        this.objetivos = [];
        this.objetivos_superiores = [];
        // NA TABELA HÁ APENAS O OBJETIVO_PAI_ID. PORTANTO, EXCLUIR DAQUI O OBJETIVO_PAI_ID E RENOMEAR OBJETIVO_SUPERIOR_ID PARA OBJETIVO_PAI_ID
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'fundamentacao', 'eixo_tematico_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a;
            let result = null;
            if (this.isPlanejamentoUNEX() && !((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.objetivo_superior_id.value)) {
                result = "Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!";
            }
            return result;
        };
        this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoDaoService"]);
        this.eixoTematicoDao = injector.get(src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__["EixoTematicoDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            fundamentacao: { default: "" },
            planejamento_id: { default: null },
            planejamento_superior_nome: { default: "" },
            eixo_tematico_id: { default: null },
            objetivo_superior_id: { default: null },
            objetivo_pai_id: { default: null },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
            yield ((_a = this.eixoTematico) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.eixo_tematico || entity.eixo_tematico_id));
            this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
            this.planejamento = (_b = this.metadata) === null || _b === void 0 ? void 0 : _b.planejamento;
            /*  if(this.planejamento) this.planejamento.planejamento_superior = this.metadata.planejamento_superior as Planejamento || null;
                if(this.planejamento.planejamento_superior) this.planejamento.planejamento_superior.objetivos = this.metadata?.objetivos_superiores || null;  */
            (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.planejamento_superior_nome.setValue(((_e = (_d = this.planejamento) === null || _d === void 0 ? void 0 : _d.planejamento_superior) === null || _e === void 0 ? void 0 : _e.nome) || '');
            this.objetivos_superiores = ((_h = (_g = (_f = this.planejamento) === null || _f === void 0 ? void 0 : _f.planejamento_superior) === null || _g === void 0 ? void 0 : _g.objetivos) === null || _h === void 0 ? void 0 : _h.map(x => Object.assign({}, { key: x.id, value: x.nome, data: x }))) || [];
        });
    }
    initializeData(form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (_a = this.metadata) === null || _a === void 0 ? void 0 : _a.objetivo;
            this.objetivos = ((_b = this.metadata) === null || _b === void 0 ? void 0 : _b.objetivos).map(x => Object.assign({}, {
                key: x.id,
                value: x.nome,
                data: x
            }));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const objetivo = this.util.fill(new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoObjetivo"](), this.entity);
            resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__["NavigateResult"](this.util.fillForm(objetivo, this.form.value)));
        });
    }
    isPlanejamentoUNEX() {
        var _a;
        return ((_a = this.planejamento) === null || _a === void 0 ? void 0 : _a.unidade_id) != null;
    }
    onObjetivoPaiChange(objetivoPai) {
        var _a, _b, _c, _d;
        if ((_c = (_b = (_a = objetivoPai.selectedItem) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.eixo_tematico_id) === null || _c === void 0 ? void 0 : _c.length)
            this.form.controls.eixo_tematico_id.setValue((_d = objetivoPai.selectedItem) === null || _d === void 0 ? void 0 : _d.data.eixo_tematico_id);
    }
}
PlanejamentoFormObjetivoComponent.ɵfac = function PlanejamentoFormObjetivoComponent_Factory(t) { return new (t || PlanejamentoFormObjetivoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
PlanejamentoFormObjetivoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: PlanejamentoFormObjetivoComponent, selectors: [["app-planejamento-form-objetivo"]], viewQuery: function PlanejamentoFormObjetivoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.planejamentoSuperiorNome = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.eixoTematico = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 15, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["controlName", "eixo_tematico_id", 3, "size", "disabled", "dao"], ["eixoTematico", ""], ["nullable", "", "label", "Objetivo", "icon", "fab fa-unity", "controlName", "objetivo_pai_id", 3, "size", "items", "change"], ["objetivoPai", ""], ["class", "row", 4, "ngIf"], ["icon", "bi bi-textarea-t", "label", "Nome", "controlName", "nome", 3, "size", "control"], ["icon", "bi bi-textarea-t", "label", "Fundamenta\u00E7\u00E3o", "controlName", "fundamentacao", 3, "size", "rows", "control"], ["disabled", "true", "label", "Planejamento superior vinculado", "controlName", "planejamento_superior_nome", 1, "disabled", 3, "size", "icon"], ["planejamento_superior_nome", ""], ["label", "Objetivo de planejamento superior (Vinculado)", "icon", "fab fa-unity", "controlName", "objetivo_superior_id", 3, "items", "size", "control"]], template: function PlanejamentoFormObjetivoComponent_Template(rf, ctx) { if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function PlanejamentoFormObjetivoComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanejamentoFormObjetivoComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "input-search", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "input-select", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function PlanejamentoFormObjetivoComponent_Template_input_select_change_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](6); return ctx.onObjetivoPaiChange(_r1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, PlanejamentoFormObjetivoComponent_div_7_Template, 3, 2, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "input-textarea", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, PlanejamentoFormObjetivoComponent_div_12_Template, 2, 3, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("disabled", (ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.objetivo_pai_id == null ? null : ctx.form.controls.objetivo_pai_id.value) ? "true" : undefined)("dao", ctx.eixoTematicoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 6)("items", ctx.objetivos);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.planejamento == null ? null : ctx.planejamento.unidade_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("rows", 4)("control", ctx.form.controls.fundamentacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.planejamento == null ? null : ctx.planejamento.unidade_id);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_13__["InputTextareaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tZm9ybS1vYmpldGl2by5jb21wb25lbnQuc2NzcyJ9 */"] });


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
/* harmony import */ var _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component */ "SkMz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Planejamentos Institucionais" } },
    { path: 'new', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'objetivo', component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoFormObjetivoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Objetivo", modal: true } },
    { path: 'objetivoList', component: _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_6__["PlanejamentoListObjetivosEntregasComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Lista de Objetivos", modal: true } },
    { path: 'objetivo/:id/consult', component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoFormObjetivoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar Objetivo", modal: true } },
];
class PlanejamentoRoutingModule {
}
PlanejamentoRoutingModule.ɵfac = function PlanejamentoRoutingModule_Factory(t) { return new (t || PlanejamentoRoutingModule)(); };
PlanejamentoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: PlanejamentoRoutingModule });
PlanejamentoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PlanejamentoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


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
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ "ncVk");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ "2u95");
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ "M+Kp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");















function PlanejamentoListObjetivoComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "badge", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const separator_r8 = ctx.separator;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    let tmp_0_0 = null;
    let tmp_1_0 = null;
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("icon", ((tmp_0_0 = ctx_r2.getEixo(separator_r8 == null ? null : separator_r8.text)) == null ? null : tmp_0_0.icone) || "bi bi-gear")("color", ((tmp_1_0 = ctx_r2.getEixo(separator_r8 == null ? null : separator_r8.text)) == null ? null : tmp_1_0.cor) || "primary")("label", ((tmp_2_0 = ctx_r2.getEixo(separator_r8 == null ? null : separator_r8.text)) == null ? null : tmp_2_0.nome) || "Desconhecido");
} }
function PlanejamentoListObjetivoComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("margin-left", ((row_r9._metadata == null ? null : row_r9._metadata.level) || 0) * 20, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r4.marcador(row_r9) + row_r9.nome);
} }
function PlanejamentoListObjetivoComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r10.fundamentacao);
} }
function PlanejamentoListObjetivoComponent_column_11_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"]((row_r13.objetivo_superior == null ? null : row_r13.objetivo_superior.nome) || "");
} }
function PlanejamentoListObjetivoComponent_column_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "column", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PlanejamentoListObjetivoComponent_column_11_ng_template_1_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r11);
} }
class PlanejamentoListObjetivoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_6__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.minHeight = 350;
        this.options = [];
        this._disabled = false;
        this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoDaoService"]);
        this.objetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__["PlanejamentoObjetivoDaoService"]);
        this.eixoDao = injector.get(src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_8__["EixoTematicoDaoService"]);
        this.groupBy = [{ field: "eixo_tematico_id", label: "Eixo Temático" }];
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
    set disabled(value) { if (this._disabled != value)
        this._disabled = value; }
    get disabled() { return this._disabled; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__["Planejamento"]());
        if (!this.gridControl.value.objetivos)
            this.gridControl.value.objetivos = [];
        return this.gridControl.value.objetivos;
    }
    ngOnInit() {
        var _a, _b, _c;
        super.ngOnInit();
        this.entity = ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.entity) || this.entity;
        this.eixos = ((_b = this.metadata) === null || _b === void 0 ? void 0 : _b.eixos) || this.eixos;
        this.sortObjetivos();
        if (!this.eixos)
            (_c = this.eixoDao) === null || _c === void 0 ? void 0 : _c.query().getAll().then(eixos => {
                this.eixos = eixos;
            });
    }
    dynamicButtons(row) {
        let result = [];
        let objetivo = row;
        if (this.auth.hasPermissionTo('MOD_PLAN_INST_EDT') && !this.disabled) {
            result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (objetivo) => { this.editObjetivo(objetivo); } });
        }
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        let objetivo = row;
        result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
        if (this.auth.hasPermissionTo('MOD_PLAN_INST_EXCL') && !this.disabled) {
            result.push({ label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (objetivo) => { this.removeObjetivo(objetivo); } });
        }
        return result;
    }
    marcador(row) {
        var _a;
        let level = ((_a = row._metadata) === null || _a === void 0 ? void 0 : _a.level) || 0;
        return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
    }
    addObjetivo() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // ************ 
            // se for adicionar um objetivo num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois se
            // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
            let objetivo = new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivo"]({
                _status: "ADD",
                id: this.dao.generateUuid(),
                planejamento_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id
            });
            this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
                metadata: {
                    planejamento: this.entity,
                    objetivo: objetivo,
                    objetivos: this.objetivosPai(objetivo.id)
                },
                modalClose: (modalResult) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    if (modalResult) {
                        try {
                            this.isNoPersist ? this.items.push(modalResult) : this.items.push(yield this.objetivoDao.save(modalResult));
                            this.sortObjetivos();
                        }
                        catch (error) {
                            this.error((error === null || error === void 0 ? void 0 : error.error) || (error === null || error === void 0 ? void 0 : error.message) || error);
                        }
                    }
                    ;
                })
            });
        });
    }
    objetivosPai(filhoId) {
        let items = [];
        let addItens = (list) => {
            for (let item of list) {
                if (item.id != filhoId) {
                    items.push(item);
                    addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia));
                }
            }
        };
        addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia));
        return items;
    }
    sortObjetivos() {
        let items = [];
        let addItens = (list, level) => {
            for (let item of list) {
                item._metadata = Object.assign(item._metadata || {}, { level });
                items.push(item);
                if (item._status != "DELETE")
                    addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia), level + 1);
            }
        };
        addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia), 0);
        this.items.length = 0;
        this.items.push(...items);
        this.cdRef.detectChanges();
    }
    editObjetivo(objetivo) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
            let index = this.items.indexOf(objetivo);
            this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
                metadata: {
                    planejamento: this.entity,
                    objetivo: objetivo,
                    objetivos: this.objetivosPai(objetivo.id)
                },
                modalClose: (modalResult) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    var _a;
                    if (modalResult) {
                        if (!this.isNoPersist)
                            yield ((_a = this.objetivoDao) === null || _a === void 0 ? void 0 : _a.save(modalResult));
                        this.items[index] = modalResult;
                        this.sortObjetivos();
                    }
                    ;
                })
            });
        });
    }
    removeObjetivo(objetivo) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            if (confirm) {
                let index = this.items.indexOf(objetivo);
                if (this.isNoPersist) {
                    objetivo._status = "DELETE";
                }
                else {
                    yield this.objetivoDao.delete(objetivo);
                    (_a = this.grid) === null || _a === void 0 ? void 0 : _a.items.splice(index, 1);
                }
                ;
                this.sortObjetivos();
                return true;
            }
            else {
                return false;
            }
        });
    }
    getEixo(id) {
        var _a;
        return (_a = this.eixos) === null || _a === void 0 ? void 0 : _a.find(x => x.id == id);
    }
}
PlanejamentoListObjetivoComponent.ɵfac = function PlanejamentoListObjetivoComponent_Factory(t) { return new (t || PlanejamentoListObjetivoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"])); };
PlanejamentoListObjetivoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: PlanejamentoListObjetivoComponent, selectors: [["planejamento-list-objetivo"]], viewQuery: function PlanejamentoListObjetivoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, inputs: { control: "control", entity: "entity", disabled: "disabled", noPersist: "noPersist", eixos: "eixos" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 17, consts: [["editable", "", 3, "items", "form", "selectable", "minHeight", "add", "remove", "hasDelete", "hasEdit", "hasAdd", "join", "groupBy", "groupTemplate"], ["gridObjetivos", ""], ["groupEixoTematico", ""], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Fundamenta\u00E7\u00E3o", 3, "template"], ["columnFundamentacao", ""], ["title", "Objetivo Superior", 3, "template", 4, "ngIf"], ["type", "options", 3, "dynamicButtons", "dynamicOptions"], [1, "text-wrap"], [3, "icon", "color", "label"], [1, "text-break", "w-100"], ["title", "Objetivo Superior", 3, "template"], ["columnObjetivoSuperior", ""]], template: function PlanejamentoListObjetivoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "grid", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, PlanejamentoListObjetivoComponent_ng_template_2_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, PlanejamentoListObjetivoComponent_ng_template_6_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, PlanejamentoListObjetivoComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, PlanejamentoListObjetivoComponent_column_11_Template, 3, 1, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](7);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.minHeight)("add", ctx.addObjetivo.bind(ctx))("remove", ctx.removeObjetivo.bind(ctx))("hasDelete", false)("hasEdit", false)("hasAdd", !ctx.disabled)("join", ctx.join)("groupBy", ctx.groupBy)("groupTemplate", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.entity == null ? null : ctx.entity.unidade_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx))("dynamicOptions", ctx.dynamicOptions.bind(ctx));
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__["ColumnComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__["BadgeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbGlzdC1vYmpldGl2by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "SkMz":
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component.ts ***!
  \**************************************************************************************************************************************************/
/*! exports provided: PlanejamentoListObjetivosEntregasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoListObjetivosEntregasComponent", function() { return PlanejamentoListObjetivosEntregasComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ "2u95");
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ "ncVk");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");














function PlanejamentoListObjetivosEntregasComponent_h3_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.title);
} }
function PlanejamentoListObjetivosEntregasComponent_toolbar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "toolbar", 12);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("buttons", ctx_r1.buttons);
} }
function PlanejamentoListObjetivosEntregasComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r4 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r4.nome);
} }
class PlanejamentoListObjetivosEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoObjetivo"], src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoObjetivoDaoService"]);
        this.injector = injector;
        this.buttons = [];
        this.filterWhere = (filter) => {
            var _a, _b;
            let form = filter.value;
            let result = [];
            if ((_a = form.planejamento_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["planejamento_id", "==", form.planejamento_id]);
            }
            if ((_b = form.nome) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["or", ["nome", "like", "%" + form.nome.replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.replace(" ", "%") + "%"]]);
            }
            return result;
        };
        this.join = ['objetivos'];
        this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__["PlanejamentoDaoService"]);
        this.planejamentoObjetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoObjetivoDaoService"]);
        this.title = this.lex.noun("Objetivos", true);
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            planejamento_id: { default: null }
        });
    }
    dynamicOptions(row) {
        let result = [];
        let objetivo = row;
        result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
        return result;
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
}
PlanejamentoListObjetivosEntregasComponent.ɵfac = function PlanejamentoListObjetivosEntregasComponent_Factory(t) { return new (t || PlanejamentoListObjetivosEntregasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
PlanejamentoListObjetivosEntregasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PlanejamentoListObjetivosEntregasComponent, selectors: [["planejamento-list-objetivos-entregas"]], viewQuery: function PlanejamentoListObjetivosEntregasComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 20, consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "select"], [3, "buttons", 4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "Fundamenta\u00E7\u00E3o", "field", "fundamentacao"], ["type", "options", 3, "onEdit", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"]], template: function PlanejamentoListObjetivosEntregasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, PlanejamentoListObjetivosEntregasComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("select", function PlanejamentoListObjetivosEntregasComponent_Template_grid_select_1_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, PlanejamentoListObjetivosEntregasComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "filter", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, PlanejamentoListObjetivosEntregasComponent_ng_template_8_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "pagination", 10);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__["ToolbarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbGlzdC1vYmpldGl2b3MtZW50cmVnYXMuY29tcG9uZW50LnNjc3MifQ== */"] });


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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ "NJJz");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento.model */ "yttb");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../planejamento-list-objetivo/planejamento-list-objetivo.component */ "LT4w");
/* harmony import */ var _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../planejamento-mapa/planejamento-mapa.component */ "yp9j");























const _c0 = ["unidade"];
function PlanejamentoListComponent_ng_template_2_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "toolbar");
} }
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r19.objetivos == null ? null : row_r19.objetivos.length, "");
} }
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_span_0_Template, 3, 1, "span", 29);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r19.objetivos == null ? null : row_r19.objetivos.length);
} }
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "planejamento-list-objetivo", 32);
} if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("entity", row_r22)("eixos", ctx_r18.eixos);
} }
function PlanejamentoListComponent_ng_template_2_column_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "column", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, PlanejamentoListComponent_ng_template_2_column_12_ng_template_3_Template, 1, 2, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](2);
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("align", "center")("hint", ctx_r6.lex.noun("Objetivo", true))("template", _r15)("expandTemplate", _r17);
} }
function PlanejamentoListComponent_ng_template_2_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r23.nome);
} }
function PlanejamentoListComponent_ng_template_2_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r10.dao.getDateFormatted(row_r24.inicio), "");
} }
function PlanejamentoListComponent_ng_template_2_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r25 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r12.dao.getDateFormatted(row_r25.fim), "");
} }
function PlanejamentoListComponent_ng_template_2_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r26 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r26.unidade == null ? null : row_r26.unidade.nome) || "", "");
} }
function PlanejamentoListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function PlanejamentoListComponent_ng_template_2_Template_grid_select_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r27.onSelect($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, PlanejamentoListComponent_ng_template_2_toolbar_1_Template, 1, 0, "toolbar", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "filter", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-text", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "input-switch", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function PlanejamentoListComponent_ng_template_2_Template_input_switch_change_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r29.onSoEntidadeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "input-search", 11, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input-datetime", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "input-datetime", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "columns");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, PlanejamentoListComponent_ng_template_2_column_12_Template, 5, 4, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "column", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, PlanejamentoListComponent_ng_template_2_ng_template_14_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, PlanejamentoListComponent_ng_template_2_ng_template_17_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "column", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, PlanejamentoListComponent_ng_template_2_ng_template_20_Template, 2, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "column", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](23, PlanejamentoListComponent_ng_template_2_ng_template_23_Template, 2, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "column", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](26, "pagination", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](15);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](18);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](21);
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](24);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dao", ctx_r1.dao)("add", ctx_r1.add)("orderBy", ctx_r1.orderBy)("join", ctx_r1.join)("init", ctx_r1.initGrid.bind(ctx_r1))("selectable", ctx_r1.selectable)("hasAdd", ctx_r1.auth.hasPermissionTo("MOD_PLAN_INST_INCL"))("hasEdit", ctx_r1.auth.hasPermissionTo("MOD_PLAN_INST_EDT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r1.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx_r1.filter)("where", ctx_r1.filterWhere)("submit", ctx_r1.filterSubmit.bind(ctx_r1))("clear", ctx_r1.filterClear.bind(ctx_r1))("collapseChange", ctx_r1.filterCollapseChange.bind(ctx_r1))("collapsed", !ctx_r1.selectable && ctx_r1.filterCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("label", ctx_r1.lex.noun("Planejamento Institucional"))("control", ctx_r1.filter.controls.nome)("placeholder", "Nome " + ctx_r1.lex.noun("Planejamento Institucional", false, true) + "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("label", "S\u00F3 da " + ctx_r1.lex.noun("Entidade"))("control", ctx_r1.filter.controls.so_entidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("label", ctx_r1.lex.noun("Unidade"))("disabled", ctx_r1.unidade_disabled)("dao", ctx_r1.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx_r1.filter.controls.inicio)("labelInfo", "Data de in\u00EDcio do" + ctx_r1.lex.noun("Planejamento Institucional"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx_r1.filter.controls.fim)("labelInfo", "Data do fim do " + ctx_r1.lex.noun("Planejamento Institucional"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r1.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onEdit", ctx_r1.edit)("options", ctx_r1.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("rows", ctx_r1.rowsLimit);
} }
function PlanejamentoListComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "planejamento-mapa");
} }
class PlanejamentoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__["Planejamento"], src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
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
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        /* Inicializações */
        this.code = "MOD_PLAN_INST";
        this.title = this.lex.noun('Planejamento Institucional', true);
        this.filter = this.fh.FormBuilder({
            inicio: { default: null },
            fim: { default: null },
            nome: { default: "" },
            unidade_id: { default: null },
            so_entidade: { default: false },
            agrupar: { default: true },
        });
        this.join = [
            'unidade:id,nome,sigla',
            'objetivos',
            'objetivos.eixo_tematico:id,nome',
            'objetivos.objetivo_superior:id,nome',
            'planejamento_superior:id,nome',
            'planejamento_superior.objetivos'
        ];
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
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
    }
    /* override */
    onLoad() { }
    initGrid(grid) {
        grid.queryInit();
    }
    onSelectTab(tab) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //if(tab.key == "TABELA") this.onLoad();
            this.saveUsuarioConfig({ active_tab: tab });
        });
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
    get eixos() {
        var _a, _b;
        return ((_b = (_a = this.grid.query) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b.eixos) || [];
    }
}
PlanejamentoListComponent.ɵfac = function PlanejamentoListComponent_Factory(t) { return new (t || PlanejamentoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanejamentoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanejamentoListComponent, selectors: [["app-planejamento-list"]], viewQuery: function PlanejamentoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 7, vars: 4, consts: [["right", "", 3, "title", "select"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["lista", ""], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template"], ["mapa", ""], [3, "dao", "add", "orderBy", "join", "init", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", 3, "size", "label", "control", "placeholder"], ["controlName", "so_entidade", 3, "size", "label", "control", "change"], ["controlName", "unidade_id", 3, "size", "label", "disabled", "dao"], ["unidade", ""], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "controlName", "fim", 3, "size", "control", "labelInfo"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate"], ["columnObjetivos", ""], ["columnExpandedObjetivos", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-bullseye"], [3, "entity", "eixos"], [1, "text-break", "w-100"]], template: function PlanejamentoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, PlanejamentoListComponent_ng_template_2_Template, 27, 40, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, PlanejamentoListComponent_ng_template_5_Template, 1, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r2);
    } }, directives: [src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_8__["TabComponent"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_10__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_18__["ToolbarComponent"], _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_19__["PlanejamentoListObjetivoComponent"], _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_20__["PlanejamentoMapaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuZWphbWVudG8tbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


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
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-drag-drop */ "+C6U");
/* harmony import */ var _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component */ "SkMz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











class PlanejamentoModule {
}
PlanejamentoModule.ɵfac = function PlanejamentoModule_Factory(t) { return new (t || PlanejamentoModule)(); };
PlanejamentoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: PlanejamentoModule });
PlanejamentoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
            ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DndModule"],
            _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](PlanejamentoModule, { declarations: [_planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoListComponent"],
        _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoFormComponent"],
        _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_5__["PlanejamentoListObjetivoComponent"],
        _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_6__["PlanejamentoFormObjetivoComponent"],
        _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_7__["PlanejamentoMapaComponent"],
        _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_9__["PlanejamentoListObjetivosEntregasComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
        ngx_drag_drop__WEBPACK_IMPORTED_MODULE_8__["DndModule"],
        _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoRoutingModule"]], exports: [_planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_9__["PlanejamentoListObjetivosEntregasComponent"]] }); })();


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
        this.sequencia = 0;
        this.path = null;
        this.planejamento_id = null;
        this.eixo_tematico_id = null;
        this.objetivo_superior_id = null;
        this.objetivo_pai_id = null;
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
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "input-select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function PlanejamentoFormComponent_div_10_Template_input_select_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r2.onPlanejamentoChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx_r0.planejamentosSuperiores)("control", ctx_r0.form.controls.planejamento_superior_id)("icon", ctx_r0.entityService.getIcon("Planejamento"));
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
            var _a;
            if (this.form.controls.fim.value && this.form.controls.inicio.value > this.form.controls.fim.value)
                return "A data do início não pode ser maior que a data do fim!";
            if (this.form.controls.valores.value.length == 0)
                return "É obrigatória a inclusão de ao menos um valor institucional!";
            if (this.isPlanejamentoUNEXEC() && !((_a = this.form.controls.planejamento_superior_id.value) === null || _a === void 0 ? void 0 : _a.length))
                return "Quando o Planejamento é de uma Unidade Executora, é obrigatória a definição do Planejamento superior ao qual ele será vinculado!";
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["UnidadeDaoService"]);
        this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
        this.join = [
            'objetivos',
            'objetivos.objetivo_superior:id,nome',
            'objetivos.eixo_tematico:id,nome',
            'planejamento_superior:id,nome',
            'planejamento_superior.objetivos'
        ];
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
        if (this.entity.unidade_id != this.form.controls.unidade_id.value) {
            (_a = this.dao) === null || _a === void 0 ? void 0 : _a.query({ where: [['unidade_executora_id', '==', this.form.controls.unidade_id.value], ['manut_planej_unidades_executoras', '==', true]] }).getAll().then((pls) => {
                this.planejamentosSuperiores = pls.map(x => Object.assign({}, { key: x.id, value: x.nome }));
                this.planejamentosSuperiores.unshift({ key: null, value: 'Escolha um Planejamento superior...' });
                this.objetivos.loadData(this.entity, this.form);
                this.cdRef.detectChanges();
            });
        }
        ;
    }
    /**
     * @param event
     * Se o planejamento superior for alterado, e já houver objetivos na lista, avisar que eles serão desvinculados dos objetivos do planejamento anterior,
     * para que novos objetivos superiores sejam selecionados.
     */
    onPlanejamentoChange(event) {
        var _a, _b, _c, _d, _e, _f;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.form.controls.planejamento_superior_id.value != ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.planejamento_superior_id) && ((_c = (_b = this.entity) === null || _b === void 0 ? void 0 : _b.objetivos) === null || _c === void 0 ? void 0 : _c.length)) {
                let confirm = yield this.dialog.confirm("Alteração de Planejamento superior", "Como já existem objetivos neste Planejamento, eles serão desvinculados dos objetivos do Planejamento anterior, para que novos objetivos sejam selecionados! Deseja continuar?");
                if (confirm) {
                    (_e = (_d = this.entity) === null || _d === void 0 ? void 0 : _d.objetivos) === null || _e === void 0 ? void 0 : _e.forEach(obj => obj.objetivo_superior_id = null);
                    //atualizar a lista de objetivos superiores
                }
                else {
                    this.form.controls.planejamento_superior_id.setValue((_f = this.entity) === null || _f === void 0 ? void 0 : _f.planejamento_superior_id);
                }
                ;
            }
            ;
        });
    }
    /**
     *
     * @returns boolean Informa se o planejamento é da Unidade Instituidora ou não.
     */
    isPlanejamentoUNINST() {
        var _a;
        return !((_a = this.form.controls.unidade_id.value) === null || _a === void 0 ? void 0 : _a.length);
    }
    /**
     *
     * @returns boolean Informa se o planejamento é da Unidade Executora ou não.
     */
    isPlanejamentoUNEXEC() {
        return !this.isPlanejamentoUNINST();
    }
}
PlanejamentoFormComponent.ɵfac = function PlanejamentoFormComponent_Factory(t) { return new (t || PlanejamentoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
PlanejamentoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: PlanejamentoFormComponent, selectors: [["app-planejamento-form"]], viewQuery: function PlanejamentoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.objetivos = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 22, vars: 38, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Nome do Planejamento Institucional", "controlName", "nome", 3, "size", "icon", "control"], ["label", "Unidade Executora", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "disabled", "control", "dao", "selectRoute", "where", "change"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", "labelInfo", "In\u00EDcio do Planejamento Institucional", 3, "size", "control"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "fim", "labelInfo", "Fim do Planejamento Institucional", 3, "size", "control"], ["class", "row", 4, "ngIf"], [1, "col-md-6"], ["label", "Miss\u00E3o", "controlName", "missao", 3, "size", "rows", "control"], ["label", "Vis\u00E3o", "controlName", "visao", 3, "size", "rows", "control"], ["label", "Valores", "controlName", "valores", 3, "size", "addItemHandle"], ["label", "Valor Institucional", "icon", "far fa-edit", "controlName", "valor_texto", 3, "control"], ["key", "OBJETIVOS", "label", "Objetivos"], ["noPersist", "", 3, "entity", "disabled"], ["objetivos", ""], ["label", "Selecione o Planejamento Superior vinculado", "controlName", "planejamento_superior_id", 3, "items", "control", "icon", "change"]], template: function PlanejamentoFormComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, PlanejamentoFormComponent_div_10_Template, 2, 3, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "input-textarea", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "input-textarea", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "input-multiselect", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "input-text", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "tab", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "planejamento-list-objetivo", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("icon", ctx.entityService.getIcon("Planejamento"))("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("disabled", ctx.hasPermissionToUNEX ? undefined : "true")("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction2"](32, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](28, _c1), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](30, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](29, _c2))))("where", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](36, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](35, _c5)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.form.controls.unidade_id.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx.form.controls.missao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx.form.controls.visao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("addItemHandle", ctx.addValorHandle.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("control", ctx.form.controls.valor_texto);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("entity", ctx.entity)("disabled", ctx.action == "consult");
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
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ "2u95");
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ "ncVk");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ "1JHj");
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-drag-drop */ "+C6U");














const _c0 = ["planejamentoInstitucional"];
function PlanejamentoMapaComponent_div_5_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "blockquote", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const valor_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](valor_r4.value);
} }
function PlanejamentoMapaComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Valores ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ul", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, PlanejamentoMapaComponent_div_5_li_7_Template, 4, 1, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, " Miss\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "blockquote", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, " Vis\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "blockquote", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.planejamento.valores);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.planejamento.missao);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.planejamento.visao);
} }
const _c1 = function (a0, a1) { return { objetivo: a0, pai: a1 }; };
function PlanejamentoMapaComponent_div_8_div_18_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0, 45);
} if (rf & 2) {
    const subobjetivo_r11 = ctx.$implicit;
    const objetivo_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](2, _c1, subobjetivo_r11, objetivo_r7));
} }
function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainer"](0, 45);
} if (rf & 2) {
    const subobjetivo_r16 = ctx.$implicit;
    const objetivo_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().objetivo;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](2, _c1, subobjetivo_r16, objetivo_r13));
} }
const _c2 = function () { return ["objetivo"]; };
function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndEnd", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndEnd_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r18.onObjetivoDragEnd($event); })("dndMoved", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndMoved_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const objetivo_r13 = ctx.objetivo; const pai_r14 = ctx.pai; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r20.onObjetivoDragged(objetivo_r13, pai_r14, "move"); })("dndStart", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndStart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r21.onObjetivoDragStart($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "action-button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndDrop_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const objetivo_r13 = ctx.objetivo; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r22.onObjetivoDrop($event, objetivo_r13); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_div_18_ng_template_9_ng_container_8_Template, 1, 5, "ng-container", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const objetivo_r13 = ctx.objetivo;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDisableIf", !ctx_r10.canEdit)("dndDraggable", objetivo_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](objetivo_r13.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("button", ctx_r10.subObjetivosMenu)("data", objetivo_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](7, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", objetivo_r13.objetivos);
} }
function PlanejamentoMapaComponent_div_8_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndEnd", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndEnd_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r23.onObjetivoDragEnd($event); })("dndMoved", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndMoved_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24); const objetivo_r7 = ctx.$implicit; const eixo_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r25.onObjetivoDragged(objetivo_r7, eixo_r5, "move"); })("dndStart", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndStart_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r27.onObjetivoDragStart($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndDrop_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24); const objetivo_r7 = ctx.$implicit; const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r28.onObjetivoDrop($event, objetivo_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_div_18_ng_container_8_Template, 1, 5, "ng-container", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template, 9, 8, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "action-button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "action-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "action-button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const objetivo_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDisableIf", !ctx_r6.canEdit)("dndDraggable", objetivo_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](objetivo_r7.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](11, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", objetivo_r7.objetivos);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoClick.bind(ctx_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoEditClick.bind(ctx_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoDeleteClick.bind(ctx_r6));
} }
function PlanejamentoMapaComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "action-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_Template_div_dndDrop_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30); const eixo_r5 = ctx.$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r29.onObjetivoDrop($event, eixo_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "action-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "action-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](17, "action-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, PlanejamentoMapaComponent_div_8_div_18_Template, 15, 12, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const eixo_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("background-color", eixo_r5.eixo.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("data", eixo_r5)("onClick", ctx_r2.onObjetivoAddClick.bind(ctx_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](eixo_r5.eixo.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](7, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", eixo_r5.objetivos);
} }
class PlanejamentoMapaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.canEdit = true;
        this.planejamentos = [];
        this.eixos = [];
        this.objetivos = [];
        this.subObjetivosMenu = {
            icon: "bi bi-three-dots-vertical",
            color: "transparent-black p-1 py-0",
            items: [
                {
                    icon: "bi bi-file-earmark-bar-graph",
                    label: "Entregas",
                    onClick: this.onObjetivoClick.bind(this)
                },
                {
                    icon: "bi bi-pencil-square",
                    label: "Alterar",
                    onClick: this.onObjetivoEditClick.bind(this)
                },
                {
                    icon: "bi bi-trash",
                    label: "Excluir",
                    onClick: this.onObjetivoDeleteClick.bind(this)
                }
            ]
        };
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanejamentoDaoService"]);
        this.objetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanejamentoObjetivoDaoService"]);
        this.join = ['objetivos'];
        this.title = "Objetivos do " + this.lex.noun('planejamento Institucional', true);
        this.form = this.fh.FormBuilder({
            planejamento_id: { default: null },
            todos: { default: false }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.query = this.dao.query({ where: [["data_arquivamento", "==", null]], orderBy: [["inicio", "desc"]] });
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
    objetivosPai(filhoId) {
        let items = [];
        let addItens = (list) => {
            for (let item of list) {
                if (item.id != filhoId) {
                    items.push(item);
                    addItens(this.objetivos.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia));
                }
            }
        };
        addItens(this.objetivos.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia));
        return items;
    }
    marcador(row) {
        var _a;
        let level = ((_a = row._metadata) === null || _a === void 0 ? void 0 : _a.level) || 0;
        return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
    }
    objetivosEixo(eixoId) {
        var _a, _b;
        let objetivos = ((_b = (_a = this.planejamento) === null || _a === void 0 ? void 0 : _a.objetivos) === null || _b === void 0 ? void 0 : _b.filter(y => y.eixo_tematico_id == eixoId && !y.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia)) || [];
        let recursivo = (list, level) => {
            var _a, _b;
            for (let item of list) {
                item.objetivos = ((_b = (_a = this.planejamento) === null || _a === void 0 ? void 0 : _a.objetivos) === null || _b === void 0 ? void 0 : _b.filter(y => y.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia)) || [];
                item._metadata = Object.assign(item._metadata || {}, { level });
                recursivo(item.objetivos, level + 1);
            }
        };
        recursivo(objetivos, 0);
        return objetivos;
    }
    onPlanejamentoChange() {
        var _a;
        this.dao.getById((_a = this.planejamentoInstitucional.selectedItem) === null || _a === void 0 ? void 0 : _a.key, this.join).then(planejamento => {
            var _a, _b;
            this.planejamento = planejamento;
            this.objetivos = this.planejamento.objetivos || [];
            this.eixos = ((_b = (_a = this.query.extra) === null || _a === void 0 ? void 0 : _a.eixos) === null || _b === void 0 ? void 0 : _b.filter((x) => { var _a, _b, _c; return ((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.todos.value) || ((_c = (_b = this.planejamento) === null || _b === void 0 ? void 0 : _b.objetivos) === null || _c === void 0 ? void 0 : _c.find(y => y.eixo_tematico_id == x.id)); }).map((x) => Object.assign({}, {
                eixo: x,
                eixo_tematico_id: x.id,
                objetivos: this.objetivosEixo(x.id)
            }))) || [];
            this.cdRef.detectChanges();
        });
    }
    onTodosChange() {
        this.onPlanejamentoChange();
    }
    onObjetivoClick(data) {
        let objetivo = data;
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id] });
    }
    onObjetivoAddClick(data) {
        var _a;
        let eixo = this.eixos.find(x => x.eixo.id == data.id);
        let objetivo = new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__["PlanejamentoObjetivo"]({
            _status: "ADD",
            id: this.dao.generateUuid(),
            planejamento_id: (_a = this.planejamento) === null || _a === void 0 ? void 0 : _a.id,
            eixo_tematico_id: data.eixo.id,
            eixo_tematico: data.eixo,
            sequencia: (eixo === null || eixo === void 0 ? void 0 : eixo.objetivos.length) ? eixo === null || eixo === void 0 ? void 0 : eixo.objetivos[0].sequencia : 0
        });
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: {
                planejamento: this.planejamento,
                objetivo: objetivo,
                objetivos: this.objetivosPai(objetivo.id)
            },
            modalClose: (modalResult) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                if (modalResult)
                    this.objetivoDao.save(modalResult).then(objetivo => this.onPlanejamentoChange());
            })
        });
    }
    onObjetivoDeleteClick(data) {
        let objetivo = data;
        this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
            if (confirm)
                this.objetivoDao.delete(objetivo).then(result => this.onPlanejamentoChange());
        });
    }
    onObjetivoEditClick(data) {
        let objetivo = data;
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: { planejamento: this.planejamento, objetivo: objetivo }, modalClose: (modalResult) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                var _a;
                if (modalResult)
                    (_a = this.objetivoDao) === null || _a === void 0 ? void 0 : _a.save(modalResult).then(planejamento => this.onPlanejamentoChange());
            })
        });
    }
    /* Drag & Drop */
    onObjetivoDrop(event, dropped) {
        var _a;
        console.log("Drop", event);
        dropped.objetivos = dropped.objetivos || [];
        let objetivo = event.data;
        let index = typeof event.index === 'undefined' ? dropped.objetivos.length : event.index;
        let neighborhood = index ? (dropped.objetivos[index] || dropped.objetivos[index - 1] || undefined) : undefined;
        dropped.objetivos.splice(index, 0, objetivo);
        this.loading = true;
        (_a = this.objetivoDao) === null || _a === void 0 ? void 0 : _a.update(objetivo.id, {
            eixo_tematico_id: dropped.eixo_tematico_id,
            objetivo_pai_id: dropped.id || null,
            sequencia: (neighborhood === null || neighborhood === void 0 ? void 0 : neighborhood.sequencia) || 0
        }).then(result => this.onPlanejamentoChange()).finally(() => this.loading = false);
    }
    onObjetivoDragEnd(event) {
        console.log("DragEnd", event);
    }
    onObjetivoDragged(item, dragged, effect) {
        console.log("Dragged", item, dragged.objetivos);
        dragged.objetivos = dragged.objetivos || [];
        dragged.objetivos.splice(dragged.objetivos.indexOf(item), 1);
    }
    onObjetivoDragStart(event) {
        console.log("DragStart", event);
    }
}
PlanejamentoMapaComponent.ɵfac = function PlanejamentoMapaComponent_Factory(t) { return new (t || PlanejamentoMapaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
PlanejamentoMapaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PlanejamentoMapaComponent, selectors: [["planejamento-mapa"]], viewQuery: function PlanejamentoMapaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.planejamentoInstitucional = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 8, consts: [["noButtons", "", 3, "form"], [1, "row", "mt-2"], ["controlName", "planejamento_id", 3, "size", "control", "items", "change"], ["planejamentoInstitucional", ""], ["transparent", "", "collapse", "", "title", "Valores, miss\u00E3o e vis\u00E3o"], ["class", "row", 4, "ngIf"], [1, "row", "my-2"], ["labelPosition", "left", "label", "Todos os eixos", "controlName", "todos", 3, "size", "control", "change"], ["class", "eixo", 3, "background-color", 4, "ngFor", "ngForOf"], [1, "row"], [1, "col-4"], [1, "card", "h-100"], [1, "card-header"], [1, "card-body"], [1, "list-group", "list-group-flush"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "blockquote", "mb-0"], [1, "fst-italic"], [1, "list-group-item"], [1, "eixo"], ["icon", "bi bi-plus-circle", "color", "transparent-black", 3, "data", "onClick"], [1, "d-flex", "align-items-center", "align-content-stretch", "p-3"], [1, "descricao"], [1, "objetivos", "w-100", "row", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "col-md-4"], [1, "objetivo", "shadow-sm", "d-flex", "flex-column", "align-content-between"], [1, "placeholder-glow"], [1, "placeholder", "col-2"], [1, "placeholder", "col-3"], [1, "placeholder", "col-1"], [1, "placeholder", "col-6"], [1, "buttons", "w-100", "d-flex", "justify-content-end", "px-1"], ["placeholder", "", "icon", "bi bi-question", "color", "transparent-black p-0"], ["class", "col-md-4", "dndType", "objetivo", "dndEffectAllowed", "move", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "objetivo", "dndEffectAllowed", "move", 1, "col-md-4", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "m-2"], ["dndHandle", "", 1, "card-text", "text-break", "w-100"], [1, "subobjetivo", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "border", "mt-3", "p-2"], [1, "placeholder", "w-75"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngFor", "ngForOf"], ["subobjetivos", ""], ["icon", "bi bi-file-earmark-bar-graph", "color", "transparent-black px-1", 3, "data", "onClick"], ["icon", "bi bi-pencil-square", "color", "transparent-black px-1", 3, "data", "onClick"], ["icon", "bi bi-trash", "color", "transparent-black px-1", 3, "data", "onClick"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["dndType", "objetivo", "dndEffectAllowed", "move", 1, "border", "mt-3", "p-2", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "d-flex", "justify-content-between"], [1, "me-2", "card-text", "text-break", "w-100"], ["noArrow", "", 3, "button", "data"]], template: function PlanejamentoMapaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "input-select", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function PlanejamentoMapaComponent_Template_input_select_change_2_listener() { return ctx.onPlanejamentoChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "separator", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, PlanejamentoMapaComponent_div_5_Template, 24, 3, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "input-switch", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function PlanejamentoMapaComponent_Template_input_switch_change_7_listener() { return ctx.onTodosChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_Template, 19, 8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 6);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.planejamento_id)("items", ctx.planejamentos);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.planejamento);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.todos);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.eixos);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__["InputSelectComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__["SeparatorComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_10__["InputSwitchComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_11__["ActionButtonComponent"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DndDropzoneDirective"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DndPlaceholderRefDirective"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DndDraggableDirective"], ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__["DndHandleDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgTemplateOutlet"]], styles: [".blockquote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n  transform: scaleX(-1) scaleY(-1);\n  white-space: normal;\n  height: min-content;\n  text-align: center;\n  \n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.eixo[_ngcontent-%COMP%]   .w-25[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivos[_ngcontent-%COMP%] {\n  min-height: 100px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%] {\n  background: #fff;\n  margin: 0 10px;\n}\n\n.eixo[_ngcontent-%COMP%]   .subobjetivo[_ngcontent-%COMP%] {\n  min-height: 50px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  cursor: grab;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: #5e5b5b;\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  border-top: 1px solid #ddd;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 5px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: #ddd;\n}\n\n.detalhe_entrega[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n\n.dndDraggingSource[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.acao-planos[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]::after {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BsYW5lamFtZW50by1tYXBhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtFQUNBLHVCQUFBO0VBRUEsZ0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQTs7OztzQkFBQTtBQUtKOztBQUVBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBR0E7RUFDSSxnQkFBQTtBQUFKOztBQUdBO0VBQ0ksaUJBQUE7RUFDQSxZQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsU0FBQTtBQUFKOztBQUdBO0VBQ0ksMEJBQUE7QUFBSjs7QUFHQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FBQUo7O0FBR0E7RUFDSSxzQkFBQTtBQUFKOztBQUdBO0VBQ0ksaUJBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7QUFBSjs7QUFJSTtFQUNJLGFBQUE7QUFEUiIsImZpbGUiOiJwbGFuZWphbWVudG8tbWFwYS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ibG9ja3F1b3RlIHAge1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5laXhvIC5kZXNjcmljYW8ge1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG59XHJcblxyXG4uZWl4byAuZGVzY3JpY2FvIGg0IHtcclxuICAgIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XHJcbiAgICB0ZXh0LW9yaWVudGF0aW9uOiBtaXhlZDtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoLTEpIHNjYWxlWSgtMSk7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSkgc2NhbGVZKC0xKTtcclxuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcbiAgICBoZWlnaHQ6IG1pbi1jb250ZW50O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgLyp0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsqL1xyXG59XHJcblxyXG4uZWl4byAuZGVzY3JpY2FvIGJ1dHRvbiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuXHJcbi5laXhvIC53LTI1IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2b3Mge1xyXG4gICAgbWluLWhlaWdodDogMTAwcHg7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgbWFyZ2luOiAwIDEwcHg7XHJcbiAgICAvL2hlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmVpeG8gLnN1Ym9iamV0aXZvIHtcclxuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byAuY2FyZC10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgY3Vyc29yOiBncmFiO1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8gcCB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgY29sb3I6ICM1ZTViNWI7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvIC5idXR0b25zIHtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8gLmJ1dHRvbnMgYSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byAuYnV0dG9ucyBhOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbn1cclxuXHJcbi5kZXRhbGhlX2VudHJlZ2EgcCB7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxufVxyXG5cclxuLmRuZERyYWdnaW5nU291cmNlIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5hY2FvLXBsYW5vcyB7XHJcbiAgICAuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxufSJdfQ== */"] });


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
        this.planejamento_superior_id = null; /* Planejamento hierarquicamente superior ao qual o atual planejamento está vinculado */
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=default~modules-gestao-planejamento-institucional-planejamento-module~modules-gestao-plano-entrega-p~5acad0df.js.map