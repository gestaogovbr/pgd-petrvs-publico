(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-feriado-feriado-module"],{

/***/ "7ZfM":
/*!*********************************************************************!*\
  !*** ./src/app/modules/cadastros/feriado/feriado-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: FeriadoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeriadoRoutingModule", function() { return FeriadoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feriado-form/feriado-form.component */ "KSYb");
/* harmony import */ var _feriado_list_feriado_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./feriado-list/feriado-list.component */ "TfzY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _feriado_list_feriado_list_component__WEBPACK_IMPORTED_MODULE_4__["FeriadoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Feriado" } },
    { path: 'new', component: _feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_3__["FeriadoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_3__["FeriadoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_3__["FeriadoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class FeriadoRoutingModule {
}
FeriadoRoutingModule.ɵfac = function FeriadoRoutingModule_Factory(t) { return new (t || FeriadoRoutingModule)(); };
FeriadoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: FeriadoRoutingModule });
FeriadoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](FeriadoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "E3RK":
/*!*****************************************!*\
  !*** ./src/app/models/feriado.model.ts ***!
  \*****************************************/
/*! exports provided: Feriado */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Feriado", function() { return Feriado; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Feriado extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.nome = ""; //Descrição do feriado;
        this.dia = 1; //Dia do mês (1~31) ou dia da semana (1-7)");
        this.mes = 1; //Mês
        this.ano = null; // Ano do feriado caso seja data não recorrente");
        this.recorrente = 1; // Se é uma data única ou repete todos os anos");
        this.abrangencia = "NACIONAL"; // "NACIONAL", "ESTADUAL", "MUNICIPAL" Abrangência do feriado");
        this.codigo_ibge = null; // Código da UF ou do município (IBGE)")
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.entidade_id = null;
        this.cidade_id = null;
        this.uf = null; /* UF para abrangencia estadual */
    }
}


/***/ }),

/***/ "KSYb":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/cadastros/feriado/feriado-form/feriado-form.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FeriadoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeriadoFormComponent", function() { return FeriadoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_feriado_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/feriado-dao.service */ "dpTK");
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ "aPFm");
/* harmony import */ var src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/feriado.model */ "E3RK");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-display/input-display.component */ "3pJ9");















const _c0 = ["cidade"];
const _c1 = ["entidade"];
function FeriadoFormComponent_input_search_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "input-search", 13, 14);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx_r0.form.controls.cidade_id)("dao", ctx_r0.cidadeDao);
} }
function FeriadoFormComponent_input_select_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "input-select", 15);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx_r1.form.controls.uf)("items", ctx_r1.lookup.UF);
} }
function FeriadoFormComponent_input_display_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "input-display", 16);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6);
} }
const _c2 = function () { return ["configuracoes", "entidade"]; };
const _c3 = function (a0) { return { route: a0 }; };
class FeriadoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_5__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_4__["Feriado"], src_app_dao_feriado_dao_service__WEBPACK_IMPORTED_MODULE_2__["FeriadoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "ano" && ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.recorrente.value) == 0 && !this.util.between(parseInt(control.value || 0), { start: 2000, end: 2100 })) {
                result = "Inválido";
            }
            /*if(controlName == "ano") {
              console.log(this.form?.controls.recorrente.value, !this.util.between(parseInt(control.value || 0), {start: 2000, end: 2100}));
            }*/
            /*else if(['dia','mes'].indexOf(controlName) >= 0 && this.form?.controls.dia.value==31 && (['4','6','9','11'].indexOf(this.form?.controls.mes.value) >=0)) {
              result = "Mês de 30 dias";
            }*/
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["EntidadeDaoService"]);
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["CidadeDaoService"]);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            dia: { default: "" },
            mes: { default: "" },
            ano: { default: null },
            recorrente: { default: 1 },
            abrangencia: { default: "NACIONAL" },
            codigo_ibge: { default: null },
            cidade_id: { default: null },
            uf: { default: null },
            entidade_id: { default: null },
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() }
        }, this.cdRef, this.validate);
        this.join = ["cidade", "entidade"];
    }
    checkAnoDisabled() {
        var _a, _b, _c;
        const enable = !((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.recorrente.value);
        if (!enable && ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.ano.value) != null) {
            (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.ano.setValue(null);
            this.cdRef.markForCheck();
        }
        return !enable ? 'true' : undefined;
    }
    loadData(entity, form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            let feriado = (this.util.fillForm(formValue, entity));
            yield Promise.all([
                (_a = this.cidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.cidade || entity.cidade_id),
                this.entidade.loadSearch(entity.entidade || entity.entidade_id)
            ]);
            form.patchValue(feriado);
        });
    }
    initializeData(form) {
        this.loadData(new src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_4__["Feriado"](), form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            let feriado = this.util.fill(new src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_4__["Feriado"](), this.entity);
            feriado = this.util.fillForm(feriado, this.form.value);
            if (feriado.abrangencia == "MUNICIPAL" && ((_a = this.cidade) === null || _a === void 0 ? void 0 : _a.searchObj)) {
                feriado.codigo_ibge = ((_b = this.cidade) === null || _b === void 0 ? void 0 : _b.searchObj).codigo_ibge;
            }
            else if (feriado.abrangencia == "ESTADUAL") {
                feriado.codigo_ibge = (_c = this.lookup.UF.find(x => x.key == feriado.uf)) === null || _c === void 0 ? void 0 : _c.code;
            }
            else {
                feriado.codigo_ibge = null;
            }
            resolve(feriado);
        });
    }
}
FeriadoFormComponent.ɵfac = function FeriadoFormComponent_Factory(t) { return new (t || FeriadoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
FeriadoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: FeriadoFormComponent, selectors: [["app-feriado-form"]], viewQuery: function FeriadoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 30, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Descri\u00E7\u00E3o", "icon", "far fa-edit", "controlName", "nome", 3, "size", "control"], ["label", "Abrang\u00EAncia", "controlName", "abrangencia", 3, "size", "control", "items"], ["label", "Recorrente", "icon", "fas fa-redo", "controlName", "recorrente", "labelInfo", "Se o feriado \u00E9 recorrente todos os anos... se n\u00E3o, informar o ano.", 3, "size", "control", "items"], ["label", "Dia", "icon", "bi bi-calendar-date", "controlName", "dia", 3, "size", "control", "items"], ["label", "M\u00EAs", "icon", "bi bi-calendar-date", "controlName", "mes", 3, "size", "control", "items"], ["numbers", "", "label", "Ano", "icon", "bi bi-calendar-date", "controlName", "ano", 3, "size", "control", "disabled"], ["label", "Cidade", "controlName", "cidade_id", 3, "size", "control", "dao", 4, "ngIf"], ["label", "UF", "controlName", "uf", 3, "size", "control", "items", 4, "ngIf"], ["label", "\u00C2mbito", "value", "Nacional", 3, "size", 4, "ngIf"], ["label", "Entidade", "icone", "fas fa-university", "controlName", "entidade_id", 3, "size", "control", "dao", "selectRoute"], ["entidade", ""], ["label", "Cidade", "controlName", "cidade_id", 3, "size", "control", "dao"], ["cidade", ""], ["label", "UF", "controlName", "uf", 3, "size", "control", "items"], ["label", "\u00C2mbito", "value", "Nacional", 3, "size"]], template: function FeriadoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function FeriadoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function FeriadoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "input-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "input-radio", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "input-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, FeriadoFormComponent_input_search_10_Template, 2, 3, "input-search", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, FeriadoFormComponent_input_select_11_Template, 1, 3, "input-select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, FeriadoFormComponent_input_display_12_Template, 1, 1, "input-display", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "input-search", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.abrangencia)("items", ctx.lookup.ABRANGENCIA);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.recorrente)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.dia)("items", ctx.lookup.DIA_MES);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.mes)("items", ctx.lookup.MESES);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.ano)("disabled", ctx.checkAnoDisabled());
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "MUNICIPAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "ESTADUAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.form.controls.abrangencia.value == "NACIONAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.entidade_id)("dao", ctx.entidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](28, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](27, _c2)));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_9__["InputSelectComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__["InputRadioComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__["InputSearchComponent"], _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_13__["InputDisplayComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZXJpYWRvLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "TfzY":
/*!**********************************************************************************!*\
  !*** ./src/app/modules/cadastros/feriado/feriado-list/feriado-list.component.ts ***!
  \**********************************************************************************/
/*! exports provided: FeriadoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeriadoListComponent", function() { return FeriadoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_feriado_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/feriado-dao.service */ "dpTK");
/* harmony import */ var src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/feriado.model */ "E3RK");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");













class FeriadoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector, dao) {
        super(injector, src_app_models_feriado_model__WEBPACK_IMPORTED_MODULE_2__["Feriado"], src_app_dao_feriado_dao_service__WEBPACK_IMPORTED_MODULE_1__["FeriadoDaoService"]);
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
        this.dao = dao;
        /* Inicializações */
        //this.title = "Feriados";
        this.title = this.lex.noun("Feriado", true);
        this.code = "MOD_FER";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
        });
        // Testa se o usuário possui permissão para exibir dados do feriado
        if (this.auth.hasPermissionTo("MOD_FER_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o feriado
        if (this.auth.hasPermissionTo("MOD_FER_EXCL")) {
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
FeriadoListComponent.ɵfac = function FeriadoListComponent_Factory(t) { return new (t || FeriadoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_dao_feriado_dao_service__WEBPACK_IMPORTED_MODULE_1__["FeriadoDaoService"])); };
FeriadoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FeriadoListComponent, selectors: [["app-feriado-list"]], viewQuery: function FeriadoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 19, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome do Feriado", "controlName", "nome", "placeholder", "Nome do feriado", 3, "size", "control"], ["title", "Descri\u00E7\u00E3o", "field", "nome"], ["title", "Dia", "field", "dia"], ["title", "M\u00EAs", "field", "mes"], ["title", "Ano", "field", "ano"], ["type", "options", 3, "onEdit", "options"], [3, "rows"]], template: function FeriadoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "column", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "pagination", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", ctx.auth.hasPermissionTo("MOD_FER_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_FER_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__["ToolbarComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZXJpYWRvLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "dpTK":
/*!********************************************!*\
  !*** ./src/app/dao/feriado-dao.service.ts ***!
  \********************************************/
/*! exports provided: FeriadoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeriadoDaoService", function() { return FeriadoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FeriadoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Feriado", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
FeriadoDaoService.ɵfac = function FeriadoDaoService_Factory(t) { return new (t || FeriadoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
FeriadoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: FeriadoDaoService, factory: FeriadoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "mLmR":
/*!*************************************************************!*\
  !*** ./src/app/modules/cadastros/feriado/feriado.module.ts ***!
  \*************************************************************/
/*! exports provided: FeriadoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeriadoModule", function() { return FeriadoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _feriado_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feriado-routing.module */ "7ZfM");
/* harmony import */ var _feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feriado-form/feriado-form.component */ "KSYb");
/* harmony import */ var _feriado_list_feriado_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feriado-list/feriado-list.component */ "TfzY");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class FeriadoModule {
}
FeriadoModule.ɵfac = function FeriadoModule_Factory(t) { return new (t || FeriadoModule)(); };
FeriadoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: FeriadoModule });
FeriadoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _feriado_routing_module__WEBPACK_IMPORTED_MODULE_1__["FeriadoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](FeriadoModule, { declarations: [_feriado_form_feriado_form_component__WEBPACK_IMPORTED_MODULE_2__["FeriadoFormComponent"],
        _feriado_list_feriado_list_component__WEBPACK_IMPORTED_MODULE_3__["FeriadoListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _feriado_routing_module__WEBPACK_IMPORTED_MODULE_1__["FeriadoRoutingModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-feriado-feriado-module.fad9d4a06b65b6d5456e.js.map