(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-demanda-demanda-module"],{

/***/ "17YW":
/*!**********************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda.module.ts ***!
  \**********************************************************/
/*! exports provided: DemandaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaModule", function() { return DemandaModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _demanda_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demanda-routing.module */ "RpBF");
/* harmony import */ var _demanda_list_demanda_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demanda-list/demanda-list.component */ "BIZs");
/* harmony import */ var _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demanda-form/demanda-form.component */ "OKxM");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demanda-list-grid/demanda-list-grid.component */ "EX7z");
/* harmony import */ var _demanda_form_iniciar_demanda_form_iniciar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./demanda-form-iniciar/demanda-form-iniciar.component */ "lXLP");
/* harmony import */ var _demanda_form_concluir_demanda_form_concluir_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./demanda-form-concluir/demanda-form-concluir.component */ "ki7H");
/* harmony import */ var _demanda_form_avaliar_demanda_form_avaliar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./demanda-form-avaliar/demanda-form-avaliar.component */ "kOpC");
/* harmony import */ var _demanda_form_pausar_demanda_form_pausar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./demanda-form-pausar/demanda-form-pausar.component */ "9wD7");
/* harmony import */ var _demanda_form_prorrogar_demanda_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./demanda-form-prorrogar/demanda-form-prorrogar.component */ "kyTh");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");













class DemandaModule {
}
DemandaModule.ɵfac = function DemandaModule_Factory(t) { return new (t || DemandaModule)(); };
DemandaModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: DemandaModule });
DemandaModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _demanda_routing_module__WEBPACK_IMPORTED_MODULE_1__["DemandaRoutingModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_11__["UteisModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](DemandaModule, { declarations: [_demanda_list_demanda_list_component__WEBPACK_IMPORTED_MODULE_2__["DemandaListComponent"],
        _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_3__["DemandaFormComponent"],
        _demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_5__["DemandaListGridComponent"],
        _demanda_form_iniciar_demanda_form_iniciar_component__WEBPACK_IMPORTED_MODULE_6__["DemandaFormIniciarComponent"],
        _demanda_form_concluir_demanda_form_concluir_component__WEBPACK_IMPORTED_MODULE_7__["DemandaFormConcluirComponent"],
        _demanda_form_avaliar_demanda_form_avaliar_component__WEBPACK_IMPORTED_MODULE_8__["DemandaFormAvaliarComponent"],
        _demanda_form_pausar_demanda_form_pausar_component__WEBPACK_IMPORTED_MODULE_9__["DemandaFormPausarComponent"],
        _demanda_form_prorrogar_demanda_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_10__["DemandaFormProrrogarComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _demanda_routing_module__WEBPACK_IMPORTED_MODULE_1__["DemandaRoutingModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_11__["UteisModule"]] }); })();


/***/ }),

/***/ "9wD7":
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form-pausar/demanda-form-pausar.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: DemandaFormPausarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormPausarComponent", function() { return DemandaFormPausarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");










function DemandaFormPausarComponent_top_alert_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "top-alert", 5);
} }
function DemandaFormPausarComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "input-datetime", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx_r1.form.controls.inicio);
} }
class DemandaFormPausarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.reiniciar = false;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            var _a, _b;
            let result = null;
            let pausado = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.pausas) === null || _b === void 0 ? void 0 : _b.find(x => !x.data_fim);
            if (controlName == "data") {
                if (this.reiniciar && !pausado) {
                    result = "Não á pausa!";
                }
                else if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (pausado && this.entity && control.value.getTime() < this.entity.data_inicio.getTime()) {
                    result = "Menor que inicio!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            inicio: { default: undefined },
            data: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        var _a, _b, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.reiniciar = !!((_a = this.queryParams) === null || _a === void 0 ? void 0 : _a.reiniciar);
            let pausado = (_c = (_b = this.entity) === null || _b === void 0 ? void 0 : _b.pausas) === null || _c === void 0 ? void 0 : _c.find(x => !x.data_fim);
            if (this.reiniciar && !pausado) {
                this.error("Não há pausa ativa para ser reiniciada.");
            }
            let formValue = {
                inicio: this.reiniciar ? pausado === null || pausado === void 0 ? void 0 : pausado.data_inicio : undefined,
                data: this.util.setStrTime(new Date(), this.auth.unidadeHora)
            };
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getDemanda(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let pausa = {
                demanda_id: this.entity.id,
                data: this.form.controls.data.value
            };
            if (this.reiniciar) {
                this.dao.reiniciar(pausa).then(saved => resolve(saved)).catch(reject);
            }
            else {
                this.dao.pausar(pausa).then(saved => resolve(saved)).catch(reject);
            }
        });
    }
    titleEdit(entity) {
        return "Iniciando"; // + (entity?.unidade_id || "");
    }
}
DemandaFormPausarComponent.ɵfac = function DemandaFormPausarComponent_Factory(t) { return new (t || DemandaFormPausarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
DemandaFormPausarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: DemandaFormPausarComponent, selectors: [["app-demanda-form-pausar"]], viewQuery: function DemandaFormPausarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 8, consts: [["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!", 4, "ngIf"], [3, "form", "disabled", "submit", "cancel"], ["class", "row", 4, "ngIf"], [1, "row"], ["controlName", "data", 3, "size", "label", "control", "labelInfo"], ["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!"], ["label", "In\u00EDcio da pausa", "controlName", "inicio", "disabled", "", "labelInfo", "Data de inicio da \u00FAltima pausa", 3, "size", "control"]], template: function DemandaFormPausarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, DemandaFormPausarComponent_top_alert_0_Template, 1, 0, "top-alert", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function DemandaFormPausarComponent_Template_editable_form_submit_1_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormPausarComponent_Template_editable_form_cancel_1_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, DemandaFormPausarComponent_div_2_Template, 2, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-datetime", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.reiniciar);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.reiniciar);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("label", ctx.reiniciar ? "Data de rein\u00EDcio" : "Data da pausa")("control", ctx.form.controls.data)("labelInfo", ctx.reiniciar ? "Data e hora do rein\u00EDcio da demanda" : "Data e hora do in\u00EDcio da pausa/suspens\u00E3o");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__["InputDatetimeComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__["TopAlertComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWZvcm0tcGF1c2FyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "BIZs":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-list/demanda-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: DemandaListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaListComponent", function() { return DemandaListComponent; });
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-base */ "Z2oO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demanda-list-grid/demanda-list-grid.component */ "EX7z");





class DemandaListComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_0__["PageBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        /* Inicializações */
        this.title = "Demandas";
    }
    ngOnInit() {
    }
}
DemandaListComponent.ɵfac = function DemandaListComponent_Factory(t) { return new (t || DemandaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
DemandaListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DemandaListComponent, selectors: [["app-demanda-list"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 7, vars: 2, consts: [["display", "", "right", "", 3, "title"], ["key", "TABELA", "label", "Lista"], [3, "snapshot"], ["key", "KANBAN", "label", "Tickets"], ["key", "DASHBOARD", "label", "Dashboard"]], template: function DemandaListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "demanda-list-grid", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " Tikets ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Dashboard ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("snapshot", ctx.snapshot);
    } }, directives: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__["TabComponent"], _demanda_list_grid_demanda_list_grid_component__WEBPACK_IMPORTED_MODULE_4__["DemandaListGridComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "EX7z":
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-list-grid/demanda-list-grid.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: DemandaListGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaListGridComponent", function() { return DemandaListGridComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");






















const _c0 = ["unidade"];
const _c1 = ["usuario"];
const _c2 = ["etiqueta"];
function DemandaListGridComponent_ng_template_13_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const status_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](status_r20.class);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](status_r20.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", status_r20.text, " ");
} }
function DemandaListGridComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "small", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DemandaListGridComponent_ng_template_13_Template_span_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r22); const row_r18 = ctx.row; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r21.onProcessoClick(row_r18); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, DemandaListGridComponent_ng_template_13_span_7_Template, 3, 5, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("#", row_r18.numero, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", (row_r18.numero_processo == null ? null : row_r18.numero_processo.length) ? "Sei n\u00BA " + row_r18.numero_requisicao : "Sem processo vinculado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("role", (row_r18.numero_processo == null ? null : row_r18.numero_processo.length) ? "button" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"]("bi " + ((row_r18.numero_processo == null ? null : row_r18.numero_processo.length) ? "bi bi-folder-symlink" : "bi bi-x-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", (row_r18.numero_processo == null ? null : row_r18.numero_processo.length) ? row_r18.numero_processo : "N\u00E3o processual", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r3.getStatus(row_r18));
} }
function DemandaListGridComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", row_r23.unidade.sigla, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate1"]("title", "Respons\u00E1vel: ", (row_r23.usuario == null ? null : row_r23.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"]("bi " + ((row_r23.usuario == null ? null : row_r23.usuario.nome == null ? null : row_r23.usuario.nome.length) ? "bi-person-check" : "bi-person-x"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r5.util.apelidoOuNome(row_r23.usuario, true) || "(N\u00E3o atribu\u00EDdo)", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate1"]("title", "Demandante: ", (row_r23.demandante == null ? null : row_r23.demandante.nome) || "Desconhecido", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r5.util.apelidoOuNome(row_r23.demandante, true) || "Desconhecido", " ");
} }
function DemandaListGridComponent_ng_template_19_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tempo_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](tempo_r26.class);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("title", tempo_r26.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](tempo_r26.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", tempo_r26.text, " ");
} }
function DemandaListGridComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, DemandaListGridComponent_ng_template_19_span_1_Template, 3, 6, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r7.temposDemanda(row_r24));
} }
function DemandaListGridComponent_ng_template_22_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const etiqueta_r29 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"](ctx_r28.getEtiquetaStyle(etiqueta_r29));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](etiqueta_r29.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", etiqueta_r29.value, " ");
} }
function DemandaListGridComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, DemandaListGridComponent_ng_template_22_span_0_Template, 3, 5, "span", 36);
} if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", row_r27.etiquetas);
} }
function DemandaListGridComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "input-multiselect", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-select", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r11.formEdit.controls.etiquetas)("addItemHandle", ctx_r11.addItemHandleEtiquetas.bind(ctx_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r11.formEdit.controls.etiqueta)("items", ctx_r11.etiquetas);
} }
function DemandaListGridComponent_ng_template_27_tr_1_i_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "i", 43);
} }
function DemandaListGridComponent_ng_template_27_tr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, DemandaListGridComponent_ng_template_27_tr_1_i_2_Template, 1, 0, "i", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const check_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", check_r34.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](check_r34.texto);
} }
function DemandaListGridComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, DemandaListGridComponent_ng_template_27_tr_1_Template, 5, 2, "tr", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r32 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", row_r32.checklist);
} }
function DemandaListGridComponent_ng_template_29_tr_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-switch", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const check_r38 = ctx.$implicit;
    const i_r39 = ctx.index;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("source", ctx_r37.checklist)("path", i_r39 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](check_r38.texto);
} }
function DemandaListGridComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, DemandaListGridComponent_ng_template_29_tr_1_Template, 5, 4, "tr", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r15.checklist);
} }
function DemandaListGridComponent_ng_template_32_small_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "small", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r40.atividade.nome || "");
} }
function DemandaListGridComponent_ng_template_32_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 49, 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DemandaListGridComponent_ng_template_32_span_3_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r47); const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](1); const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r46.comentarioClick(_r45); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const comentario_r44 = ctx.$implicit;
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx_r42.lookup.getValue(ctx_r42.lookup.COMENTARIO_TIPO, comentario_r44.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", "\u2022 ".repeat((comentario_r44.path == null ? null : comentario_r44.path.includes("/")) ? comentario_r44.path.split("/").length - 1 : 0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"]("me-1 " + ctx_r42.lookup.getIcon(ctx_r42.lookup.COMENTARIO_TIPO, comentario_r44.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r42.util.apelidoOuNome(comentario_r44.usuario));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" \u2022 ", ctx_r42.util.getDateTimeFormatted(comentario_r44.data_hora), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", comentario_r44.texto, " ");
} }
function DemandaListGridComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, DemandaListGridComponent_ng_template_32_small_0_Template, 4, 1, "small", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, DemandaListGridComponent_ng_template_32_span_3_Template, 11, 7, "span", 47);
} if (rf & 2) {
    const row_r40 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r40.atividade);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r40.assunto);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", row_r40.comentarios);
} }
const _c3 = function () { return ["configuracoes", "usuario"]; };
const _c4 = function (a0) { return { route: a0 }; };
const _c5 = function () { return ["configuracoes", "unidade"]; };
class DemandaListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_7__["PageListBase"] {
    constructor(injector, dao) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_6__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.etiquetas = [];
        this.filterWhere = (filter) => {
            var _a, _b;
            let result = [];
            let form = filter.value;
            if ((_a = form.usuario_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
            }
            if ((_b = form.unidade_id) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.unidades_subordinadas) {
                result.push(["unidades_subordinadas", "==", true]);
            }
            return result;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_5__["ListenerAllPagesService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_8__["CalendarService"]);
        this.dao = dao;
        this.join = ["atividade", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario:id,nome,apelido"];
        /* Inicializações */
        this.title = "Demandas";
        this.extra = { planos: {}, afastamentos: {} };
        this.filter = this.fh.FormBuilder({
            atribuidas_para_mim: { default: false },
            usuario_id: { default: "" },
            somente_unidade_atual: { default: false },
            unidades_subordinadas: { default: false },
            unidade_id: { default: "" }
        });
        this.formEdit = this.fh.FormBuilder({
            etiquetas: { default: [] },
            etiqueta: { default: "" }
        });
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    }
    orderComentarios(comentarios) {
        return (comentarios === null || comentarios === void 0 ? void 0 : comentarios.sort((a, b) => {
            return (a.path + "/" + a.id) < (b.path + "/" + b.id) || (a.path == b.path && a.data_hora.getTime() < b.data_hora.getTime()) ? -1 : 1;
        })) || [];
    }
    onGridLoad(rows) {
        var _a;
        /* Ordena os comentários */
        rows === null || rows === void 0 ? void 0 : rows.forEach((demanda) => {
            demanda.comentarios = this.orderComentarios(demanda.comentarios);
        });
        /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
        const extra = (_a = this.grid.query) === null || _a === void 0 ? void 0 : _a.extra;
        if (extra) {
            this.extra.planos = Object.assign(this.extra.planos, extra.planos || {});
            for (let [key, value] of Object.entries(extra.afastamentos || {})) {
                this.extra.afastamentos[key] = value.reduce((a, v) => {
                    if (!a.find(x => x.id == v.id))
                        a.push(v);
                    return a;
                }, this.extra.afastamentos[key] || []);
            }
            Object.entries(extra.feriados || {}).forEach(([key, value]) => {
                if (!this.calendar.feriadosCadastrados[key])
                    this.calendar.feriadosCadastrados[key] = value;
            });
            this.cdRef.detectChanges();
        }
    }
    modalRefreshId(demanda) {
        return { modal: true, modalClose: (modalResult) => this.grid.query.refreshId(demanda.id) };
    }
    comentarioClick(element) {
        const value = element.getAttribute("data-expanded");
        element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }
    temposDemanda(row) {
        var _a, _b, _c, _d, _e, _f;
        /* Atualiza somente a cada mudança de minuto da unidade atual */
        if (row.metadados && ((_a = row.metadados.extra) === null || _a === void 0 ? void 0 : _a.lastUpdate) != this.auth.unidadeHora) {
            let tempos = [
                { class: "badge bg-light text-dark", title: "Prazo de entrega", icon: "bi bi-calendar-check", text: this.dao.getDateTimeFormatted(row.prazo_entrega) },
                { class: "badge bg-light text-dark", title: "Tempo pactuado", icon: "fas fa-handshake", text: (row.tempo_pactuado ? this.util.decimalToTimerFormated(row.tempo_pactuado, true) : "Não") + " pactuado" }
            ];
            if (row.metadados.concluido)
                tempos.push({ class: "badge bg-light text-dark", title: "Data de entrega realizada", icon: "bi bi-check-circle", text: this.dao.getDateTimeFormatted(row.data_entrega) });
            if (row.metadados.iniciado) {
                const cargaHoraria = ((_c = (_b = this.extra) === null || _b === void 0 ? void 0 : _b.planos[row.plano_id]) === null || _c === void 0 ? void 0 : _c.carga_horaria) || 0;
                const afastamentos = ((_d = this.extra) === null || _d === void 0 ? void 0 : _d.afastamentos[row.usuario_id]) || [];
                const despendido = row.metadados.concluido ? (row.tempo_despendido || 0) : this.calendar.horasUteis(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
                tempos.push({ class: "badge " + (despendido > row.tempo_pactuado ? "bg-warning" : "bg-light") + " text-dark", title: "Tempo despendido", icon: "bi bi-hourglass-split", text: this.util.decimalToTimerFormated(despendido, true) + " despendido" });
            }
            if (!row.metadados.concluido && row.prazo_entrega.getTime() < this.auth.hora.getTime()) {
                const atrasado = this.calendar.horasAtraso(row.prazo_entrega, row.unidade);
                tempos.push({ class: "badge bg-danger", title: "Tempo de atraso", icon: "bi bi-alarm", text: this.util.decimalToTimerFormated(atrasado, true) + " atrasado" });
            }
            row.metadados.extra = row.metadados.extra || {};
            row.metadados.extra.lastUpdate = this.auth.unidadeHora;
            row.metadados.extra.tempos = tempos;
        }
        return ((_f = (_e = row.metadados) === null || _e === void 0 ? void 0 : _e.extra) === null || _f === void 0 ? void 0 : _f.tempos) || [];
    }
    dynamicOptions(row) {
        var _a, _b, _c, _d, _e;
        let result = [];
        let demanda = row;
        result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'consult'] }, { modal: true }) });
        if (!((_a = demanda.metadados) === null || _a === void 0 ? void 0 : _a.iniciado)) { /* Não iniciado */
            result.push({ label: "Iniciar", icon: "bi bi-play-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) }, { label: "Alterar demanda", icon: "bi bi-pencil-square", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'edit'] }, this.modalRefreshId(demanda)) }, { divider: true }, { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) });
        }
        else if ((_b = demanda.metadados) === null || _b === void 0 ? void 0 : _b.avaliado) { /* Avaliado */
            result.push({ label: "Alterar avaliação", icon: "bi bi-star-half", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) }, { divider: true }, { label: "Cancelar avaliação", icon: "bi bi-backspace", onClick: this.cancelarAvaliacao.bind(this) });
        }
        else if ((_c = demanda.metadados) === null || _c === void 0 ? void 0 : _c.concluido) { /* Concluído */
            result.push({ label: "Editar conclusão", icon: "bi bi-check-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) }, { label: "Avaliar", icon: "bi bi-star-half", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) }, { divider: true }, { label: "Cancelar conclusão", icon: "bi bi-backspace", onClick: this.cancelarConclusao.bind(this) });
        }
        else if ((_d = demanda.metadados) === null || _d === void 0 ? void 0 : _d.iniciado) { /* Iniciado */
            if ((_e = demanda.metadados) === null || _e === void 0 ? void 0 : _e.suspenso) { /* Iniciada e Suspensa */
                result.push({ label: "Reiniciar", icon: "bi bi-play-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(demanda)) });
            }
            else { /* Iniciada e não Suspensa */
                result.push({ label: "Concluir", icon: "bi bi-check-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) }, { label: "Prorrogar prazo", icon: "bi bi-skip-end-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'prorrogar'] }, this.modalRefreshId(demanda)) }, { label: "Editar inicio", icon: "bi bi-play-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) }, { label: "Suspender", icon: "bi bi-pause-circle", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'] }, this.modalRefreshId(demanda)) }, { divider: true }, { label: "Cancelar inicio", icon: "bi bi-backspace", onClick: this.cancelarInicio.bind(this) });
            }
        }
        return result;
    }
    cancelarInicio(demanda) {
        const self = this;
        this.dialog.confirm("Cancelar inicio ?", "Deseja realmente cancelar a inicialização?").then(confirm => {
            if (confirm) {
                this.dao.cancelarInicio(demanda.id).then(function () {
                    self.grid.query.refreshId(demanda.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    cancelarConclusao(demanda) {
        const self = this;
        this.dialog.confirm("Cancelar conclusão ?", "Deseja realmente cancelar a conclusão?").then(confirm => {
            if (confirm) {
                this.dao.cancelarConclusao(demanda.id).then(function () {
                    self.grid.query.refreshId(demanda.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    cancelarAvaliacao(demanda) {
        const self = this;
        this.dialog.confirm("Cancelar avaliacao ?", "Deseja realmente cancelar a avaliacao?").then(confirm => {
            if (confirm) {
                this.dao.cancelarAvaliacao(demanda.id).then(function () {
                    self.grid.query.refreshId(demanda.id);
                    self.dialog.alert("Sucesso", "Cancelado com sucesso!");
                }).catch(function (error) {
                    self.dialog.alert("Erro",  true ? error === null || error === void 0 ? void 0 : error.message : undefined);
                });
            }
        });
    }
    dynamicButtons(row) {
        var _a, _b, _c, _d, _e;
        let result = [];
        let demanda = row;
        if (!((_a = demanda.metadados) === null || _a === void 0 ? void 0 : _a.iniciado)) { /* Não iniciado */
            result.push({ hint: "Iniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'iniciar'] }, this.modalRefreshId(demanda)) });
        }
        else if ((_b = demanda.metadados) === null || _b === void 0 ? void 0 : _b.avaliado) { /* Avaliado */
            result.push({ hint: "Alterar avaliação", icon: "bi bi-check-all", color: "btn-outline-danger", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar', 'edit'] }, this.modalRefreshId(demanda)) });
        }
        else if ((_c = demanda.metadados) === null || _c === void 0 ? void 0 : _c.concluido) { /* Concluído */
            result.push({ hint: "Avaliar", icon: "bi bi-star-half", color: "btn-outline-success", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'avaliar'] }, this.modalRefreshId(demanda)) });
        }
        else if ((_d = demanda.metadados) === null || _d === void 0 ? void 0 : _d.iniciado) { /* Iniciado */
            if ((_e = demanda.metadados) === null || _e === void 0 ? void 0 : _e.suspenso) { /* Iniciada e Suspensa */
                result.push({ hint: "Reiniciar", icon: "bi bi-play-circle", color: "btn-outline-secondary", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'pausar'], params: { reiniciar: true } }, this.modalRefreshId(demanda)) });
            }
            else { /* Iniciada e não Suspensa */
                result.push({ hint: "Concluir", icon: "bi bi-check", color: "btn-outline-success", onClick: (demanda) => this.go.navigate({ route: ['gestao', 'demanda', demanda.id, 'concluir'] }, this.modalRefreshId(demanda)) });
            }
        }
        return result;
    }
    getStatus(row) {
        var _a, _b, _c;
        let demanda = row;
        let result = [];
        switch ((_a = demanda.metadados) === null || _a === void 0 ? void 0 : _a.status) {
            case "AVALIADO":
                result.push({ text: "Avaliado", icon: "bi bi-star-half", class: "badge rounded-pill bg-success" });
                break;
            case "CONCLUIDO":
                result.push({ text: "Concluído", icon: "bi bi bi-check-circle", class: "badge rounded-pill bg-primary" });
                break;
            case "INICIADO":
                result.push({ text: "Iniciado", icon: "bi bi-play-circle", class: "badge rounded-pill bg-info text-dark" });
                break;
            case "LANCADO":
                result.push({ text: "Não iniciado", icon: "bi bi-stop-circle", class: "badge rounded-pill bg-warning text-dark" });
                break;
            default: result.push({ text: "Desconhecido", icon: "bi bi-question-circle", class: "badge rounded-pill bg-light text-dark" });
        }
        if ((_b = demanda.metadados) === null || _b === void 0 ? void 0 : _b.atrasado)
            result.push({ text: "Atrasado", icon: "bi bi-alarm", class: "badge rounded-pill bg-danger" });
        if ((_c = demanda.metadados) === null || _c === void 0 ? void 0 : _c.suspenso)
            result.push({ text: "Suspenso", icon: "bi bi-pause-circle", class: "badge rounded-pill bg-warning text-dark" });
        return result;
    }
    getEtiquetaStyle(etiqueta) {
        const bgColor = etiqueta.color || "#000000";
        const txtColor = this.util.contrastColor(bgColor);
        return `background-color: ${bgColor}; color: ${txtColor};`;
    }
    onAtribuidasParaMimChange(event) {
        if (this.filter.controls.atribuidas_para_mim.value) {
            this.filter.controls.usuario_id.setValue(this.auth.usuario.id);
        }
        else {
            this.filter.controls.usuario_id.setValue(undefined);
        }
    }
    onSomenteUnidadeAtualChange(event) {
        if (this.filter.controls.somente_unidade_atual.value) {
            this.filter.controls.unidade_id.setValue(this.auth.unidade.id);
        }
        else {
            this.filter.controls.unidade_id.setValue(undefined);
        }
    }
    onProcessoClick(row) {
        this.allPages.openDocumentoSei(row.id_processo, row.id_requisicao);
    }
    onColumnEtiquetasSave(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const saved = yield this.dao.update(row.id, {
                    etiquetas: this.formEdit.controls.etiquetas.value
                });
                return !!saved;
            }
            catch (error) {
                return false;
            }
        });
    }
    onColumnEtiquetasEdit(row) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.formEdit.controls.etiquetas.setValue(row.etiquetas);
            this.formEdit.controls.etiqueta.setValue("");
            this.etiquetas = this.util.merge((_a = row.atividade) === null || _a === void 0 ? void 0 : _a.etiquetas_predefinidas, (_b = row.unidade) === null || _b === void 0 ? void 0 : _b.etiquetas, (a, b) => a.key == b.key);
        });
    }
    onColumnChecklistSave(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const saved = yield this.dao.update(row.id, {
                    checklist: this.checklist
                });
                row.checklist = this.checklist;
                return !!saved;
            }
            catch (error) {
                return false;
            }
        });
    }
    onColumnChecklistEdit(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.checklist = this.util.clone(row.checklist);
        });
    }
    addItemHandleEtiquetas() {
        var _a;
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = ((_a = item.key) === null || _a === void 0 ? void 0 : _a.length) ? item.key : this.util.md5(item.value);
            if (this.util.validateLookupItem(this.formEdit.controls.etiquetas.value, key)) {
                result = {
                    key: key,
                    value: item.value,
                    color: item.color,
                    icon: item.icon
                };
                this.formEdit.controls.etiqueta.setValue("");
            }
        }
        return result;
    }
    ;
}
DemandaListGridComponent.ɵfac = function DemandaListGridComponent_Factory(t) { return new (t || DemandaListGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"])); };
DemandaListGridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: DemandaListGridComponent, selectors: [["demanda-list-grid"]], viewQuery: function DemandaListGridComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c2, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
    } }, inputs: { snapshot: "snapshot" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 36, vars: 52, consts: [[3, "dao", "add", "form", "hasEdit", "hasDelete", "orderBy", "groupBy", "join", "loadList"], [3, "form", "where"], [1, "row"], ["label", "Minhas", "controlName", "atribuidas_para_mim", 3, "size", "control", "change"], ["label", "Usu\u00E1rio", "controlName", "usuario_id", 3, "size", "control", "disabled", "dao", "selectRoute"], ["usuario", ""], ["label", "Atual", "controlName", "somente_unidade_atual", "labelInfo", "Somente as demandas da unidade selecionada", 3, "size", "control", "change"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "disabled", "dao", "selectRoute"], ["unidade", ""], ["label", "Subordinadas", "controlName", "unidades_subordinadas", 3, "size", "control"], [3, "title", "template"], ["columnNumero", ""], ["columnPessoas", ""], ["title", "Tempos", 3, "template"], ["columnTempos", ""], ["title", "Etiquetas", 3, "editTemplate", "template", "edit", "save"], ["columnEtiquetas", ""], ["columnEtiquetasEdit", ""], ["title", "Checklist", 3, "editTemplate", "template", "edit", "save"], ["columnChecklist", ""], ["columnChecklistEdit", ""], ["columnTitulo", ""], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons"], [3, "rows"], [1, "text-nowrap"], [1, "micro-text", "fw-ligh"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title", "click"], [1, "one-per-line"], [3, "class", 4, "ngFor", "ngForOf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-briefcase"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", "fw-light", 3, "title"], [1, "bi", "bi-cursor"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "class", 4, "ngFor", "ngForOf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top"], ["class", "badge me-1", 3, "style", 4, "ngFor", "ngForOf"], [1, "badge", "me-1"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", 3, "size", "control", "items"], ["etiqueta", ""], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "bi", "bi-check-circle"], ["scale", "small", 3, "size", "source", "path"], ["class", "demanda-atividade", 4, "ngIf"], [1, "micro-text", "fw-ligh", "demanda-assunto"], ["class", "badge bg-light text-dark comentario-badge", "role", "button", "data-expanded", "false", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngFor", "ngForOf"], [1, "demanda-atividade"], ["role", "button", "data-expanded", "false", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", "comentario-badge", 3, "title", "click"], ["badge", ""], [1, "comentario-title"], [1, "comentario-text"]], template: function DemandaListGridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("loadList", function DemandaListGridComponent_Template_grid_loadList_0_listener($event) { return ctx.onGridLoad($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "input-switch", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function DemandaListGridComponent_Template_input_switch_change_4_listener($event) { return ctx.onAtribuidasParaMimChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "input-switch", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function DemandaListGridComponent_Template_input_switch_change_7_listener($event) { return ctx.onSomenteUnidadeAtualChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "input-switch", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, DemandaListGridComponent_ng_template_13_Template, 8, 7, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, DemandaListGridComponent_ng_template_16_Template, 10, 7, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](19, DemandaListGridComponent_ng_template_19_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, DemandaListGridComponent_ng_template_22_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, DemandaListGridComponent_ng_template_24_Template, 3, 6, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](27, DemandaListGridComponent_ng_template_27_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](29, DemandaListGridComponent_ng_template_29_Template, 2, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](32, DemandaListGridComponent_ng_template_32_Template, 4, 3, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](34, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](35, "pagination", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](14);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](20);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](23);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](25);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](28);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](30);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("form", ctx.formEdit)("hasEdit", false)("hasDelete", false)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.atribuidas_para_mim);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 5)("control", ctx.filter.controls.usuario_id)("disabled", ctx.filter.controls.atribuidas_para_mim.value ? "true" : undefined)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](47, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](46, _c3)));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.somente_unidade_atual);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.unidade_id)("disabled", ctx.filter.controls.somente_unidade_atual.value ? "true" : undefined)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](50, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](49, _c5)));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.unidades_subordinadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", "#ID/n\u00BA Processo\nStatus")("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", "Un./Respons\u00E1vel\nDemandante")("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("editTemplate", _r10)("template", _r8)("edit", ctx.onColumnEtiquetasEdit.bind(ctx))("save", ctx.onColumnEtiquetasSave.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("editTemplate", _r14)("template", _r12)("edit", ctx.onColumnChecklistEdit.bind(ctx))("save", ctx.onColumnChecklistSave.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", "Atividade\nAssunto")("template", _r16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("onEdit", ctx.edit)("onDelete", ctx.delete)("dynamicOptions", ctx.dynamicOptions.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__["ToolbarComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__["FilterComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__["InputSearchComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_16__["PaginationComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgForOf"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_18__["InputMultiselectComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_17__["NgIf"]], styles: [".comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: initial;\n  white-space: normal;\n}\n.comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 180px;\n  white-space: initial;\n}\n.demanda-atividade[_ngcontent-%COMP%], .demanda-assunto[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 200px;\n  white-space: initial;\n}\n.comentario-badge[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  display: block;\n  width: 200px;\n  background-color: #ffe69c !important;\n  margin-bottom: 1px;\n  text-align: left;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: none;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  display: inline-block;\n  max-width: 160px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGRlbWFuZGEtbGlzdC1ncmlkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQUFSO0FBRUk7RUFDSSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUFBUjtBQUlBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FBREo7QUFJQTtFQUNJLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFESjtBQUVJO0VBQ0ksYUFBQTtBQUFSO0FBRUk7RUFDSSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FBQVIiLCJmaWxlIjoiZGVtYW5kYS1saXN0LWdyaWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tZW50YXJpby1iYWRnZVtkYXRhLWV4cGFuZGVkPXRydWVdIHtcclxuICAgIC5jb21lbnRhcmlvLXRpdGxlIHtcclxuICAgICAgICBkaXNwbGF5OiBpbml0aWFsO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcbiAgICB9XHJcbiAgICAuY29tZW50YXJpby10ZXh0IHtcclxuICAgICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxODBweDtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogaW5pdGlhbDtcclxuICAgIH1cclxufVxyXG5cclxuLmRlbWFuZGEtYXRpdmlkYWRlLCAuZGVtYW5kYS1hc3N1bnRvIHtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xyXG59XHJcblxyXG4uY29tZW50YXJpby1iYWRnZSB7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMjAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlNjljICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgLmNvbWVudGFyaW8tdGl0bGUge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuY29tZW50YXJpby10ZXh0IHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAxNjBweDtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB9XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "OKxM":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form/demanda-form.component.ts ***!
  \*******************************************************************************/
/*! exports provided: DemandaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormComponent", function() { return DemandaFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_comentario__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/comentario */ "nRIp");
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ "VW5Q");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ "L+jc");































const _c0 = ["etiqueta"];
const _c1 = ["atividade"];
const _c2 = ["plano"];
const _c3 = ["unidade"];
const _c4 = ["usuario"];
const _c5 = ["planejado"];
const _c6 = ["docRequisicao"];
const _c7 = ["comentarios"];
const _c8 = ["tipoProcesso"];
const _c9 = ["tipoDocumento"];
const _c10 = function () { return ["cadastros", "tipo-processo"]; };
const _c11 = function (a0) { return { route: a0 }; };
const _c12 = function () { return ["cadastros", "tipo-documento"]; };
function DemandaFormComponent_separator_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "separator", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-text", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "input-search", 48, 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "input-button", 50, 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("buttonClick", function DemandaFormComponent_separator_3_Template_input_button_buttonClick_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r16.onNumeroRequisicaoClick($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "input-search", 52, 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r0.form.controls.numero_processo);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("control", ctx_r0.form.controls.tipo_processo_id)("dao", ctx_r0.tipoProcessoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](14, _c11, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](13, _c10)));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r0.form.controls.numero_requisicao)("disabled", !ctx_r0.gb.isExtension ? "true" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("control", ctx_r0.form.controls.tipo_documento_requisicao_id)("dao", ctx_r0.tipoDocumentoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](17, _c11, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](16, _c12)));
} }
function DemandaFormComponent_ng_template_40_td_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleProp"]("width", ctx_r19.comentarioLevel(row_r18).length * 20, "px");
} }
function DemandaFormComponent_ng_template_40_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2, "\u2022");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
} }
function DemandaFormComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "table", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, DemandaFormComponent_ng_template_40_td_2_Template, 2, 2, "td", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "td", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "img", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](6, DemandaFormComponent_ng_template_40_ng_container_6_Template, 4, 0, "ng-container", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "td", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "h6", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "p", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r8.comentarioLevel(row_r18).length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", (row_r18.usuario == null ? null : row_r18.usuario.url_foto) || "./assets/images/profile.png", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r8.comentarioLevel(row_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", (row_r18.usuario == null ? null : row_r18.usuario.nome) || "Desconhecido", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r8.lookup.getValue(ctx_r8.lookup.COMENTARIO_TIPO, row_r18.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r8.lookup.getValue(ctx_r8.lookup.COMENTARIO_PRIVACIDADE, row_r18.privacidade));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r8.util.getDateTimeFormatted(row_r18.data_hora));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](row_r18.texto);
} }
function DemandaFormComponent_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-textarea", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "input-select", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "input-select", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx_r10.formComentarios.controls.texto);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("control", ctx_r10.formComentarios.controls.tipo)("items", ctx_r10.comentarioTipos);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("control", ctx_r10.formComentarios.controls.privacidade)("items", ctx_r10.lookup.COMENTARIO_PRIVACIDADE);
} }
function DemandaFormComponent_tab_56_separator_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "separator", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, " dados da avalia\u00E7\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} }
function DemandaFormComponent_tab_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "tab", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-datetime", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "input-datetime", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "input-timer", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "input-select", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "input-button", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "input-text", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "input-timer", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "input-text", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "input-datetime", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](14, DemandaFormComponent_tab_56_separator_14_Template, 2, 0, "separator", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx_r12.form.controls.tipo_documento_entrega_id)("dao", ctx_r12.tipoDocumentoDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx_r12.form.controls.numero_documento_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx_r12.form.controls.titulo_documento_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.tempo_homologado);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.produtividade);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx_r12.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r12.form.controls.tempo_homologado.value !== null);
} }
const _c13 = function () { return { field: "unidade.sigla", label: "Unidade" }; };
const _c14 = function (a0) { return [a0]; };
const _c15 = function (a2) { return ["unidade_id", "=", a2]; };
const _c16 = function () { return ["vinculadas", "=", true]; };
const _c17 = function (a0, a1) { return [a0, a1]; };
const _c18 = function () { return ["cadastros", "atividade"]; };
const _c19 = function (a0) { return { unidade_id: a0 }; };
const _c20 = function (a0) { return { filter: a0 }; };
const _c21 = function (a0, a1) { return { route: a0, params: a1 }; };
const _c22 = function () { return ["planos.tipo_modalidade:id,nome"]; };
const _c23 = function () { return ["configuracoes", "usuario"]; };
class DemandaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.etiquetas = [];
        this.checklist = [];
        this.complexidades = [];
        this.planos = [];
        /* Variável utilizada para detectar as alterações feitas pelo usuário e recalcular os prazos */
        this.delta = {
            plano_id: "",
            atividade_id: "",
            fator_complexidade: 1,
            tempo_planejado: 0,
            prazo_entrega: new Date(0)
        };
        this.validateChecklist = (control, controlName) => {
            let result = null;
            return result;
        };
        this.validateComentario = (control, controlName) => {
            let result = null;
            return result;
        };
        this.validate = (control, controlName) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            let result = null;
            if (["unidade_id", "assunto"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (["data_distribuicao", "prazo_entrega"].includes(controlName)) {
                if (!this.util.isDataValid(control.value)) {
                    result = "Data inválida";
                }
                else if (controlName == "data_distribuicao" && control.value.getTime() > ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.prazo_entrega.value.getTime())) {
                    result = "Maior que entrega";
                }
                else if (controlName == "prazo_entrega" && control.value.getTime() < ((_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.data_distribuicao.value.getTime())) {
                    result = "Menor que distribuição";
                }
            }
            else if (controlName == "plano_id" && !((_d = control.value) === null || _d === void 0 ? void 0 : _d.length) && ((_g = (_f = (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls) === null || _f === void 0 ? void 0 : _f.usuario_id.value) === null || _g === void 0 ? void 0 : _g.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "fator_complexidade" && !control.value && ((_k = (_j = (_h = this.form) === null || _h === void 0 ? void 0 : _h.controls) === null || _j === void 0 ? void 0 : _j.atividade_id.value) === null || _k === void 0 ? void 0 : _k.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            this.loadEtiquetas();
            this.loadChecklist();
            let result = undefined;
            const etiquetasKeys = this.etiquetas.map(x => x.key);
            const checklistKeys = this.checklist.map(x => x.key);
            const etiqueta = this.form.controls.etiquetas.value.find((x) => !etiquetasKeys.includes(x.key));
            const checklst = this.form.controls.checklist.value.find((x) => !etiquetasKeys.includes(x.id) && x.checked);
            if (etiqueta)
                result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
            if (checklst)
                result = "Checklist " + checklst.texto + "não pode ser utilizado!";
            return result;
        };
        this.addComentario = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.newComentario();
            return undefined;
        });
        const horaInicial = this.auth.hora;
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__["TipoDocumentoDaoService"]);
        this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_12__["TipoProcessoDaoService"]);
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__["AtividadeDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__["UsuarioDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_9__["CalendarService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_10__["ListenerAllPagesService"]);
        this.delta.prazo_entrega = horaInicial;
        this.comentarioTipos = this.lookup.COMENTARIO_TIPO.filter(x => !["GERENCIAL", "AVALIACAO"].includes(x.key));
        this.form = this.fh.FormBuilder({
            numero: { default: 0 },
            id_processo: { default: 0 },
            numero_processo: { default: "" },
            tipo_documento_requisicao_id: { default: "" },
            id_requisicao: { default: 0, },
            numero_requisicao: { default: "" },
            assunto: { default: "" },
            atividade_id: { default: null },
            fator_complexidade: { default: 1 },
            unidade_id: { default: "" },
            tempo_pactuado: { default: 0 },
            recalcula_prazo: { default: false },
            demandante_id: { default: "" },
            usuario_id: { default: null },
            prazo_entrega: { default: horaInicial },
            data_distribuicao: { default: horaInicial },
            carga_horaria: { default: 0 },
            tempo_planejado: { default: 0 },
            data_inicio: { default: null },
            data_entrega: { default: null },
            tempo_despendido: { default: 0 },
            etiquetas: { default: [] },
            checklist: { default: [] },
            comentarios: { default: [] },
            tipo_documento_entrega_id: { default: "" },
            id_processo_entrega: { default: 0 },
            numero_processo_entrega: { default: "" },
            id_documento_entrega: { default: 0 },
            numero_documento_entrega: { default: "" },
            titulo_documento_entrega: { default: "" },
            tempo_homologado: { default: null },
            produtividade: { default: 0 },
            data_arquivamento: { default: null },
            etiqueta: { default: "" },
            plano_id: { default: null },
            tipo_processo_id: { default: null }
        }, this.cdRef, this.validate);
        this.formChecklist = this.fh.FormBuilder({
            id: { default: "" },
            texto: { default: "" },
            checked: { default: false }
        }, this.cdRef, this.validateChecklist);
        this.formComentarios = this.fh.FormBuilder({
            texto: { default: "" },
            tipo: { default: "COMENTARIO" },
            privacidade: { default: "PUBLICO" }
        }, this.cdRef, this.validateComentario);
        this.join = ["usuario", "atividade", "unidade", "comentarios.usuario"];
    }
    get tituloDemanda() {
        var _a, _b, _c, _d;
        return ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.numero) === null || _b === void 0 ? void 0 : _b.value) ? "#" + ((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.numero) === null || _d === void 0 ? void 0 : _d.value) : "";
    }
    get isDemandaProcessual() {
        var _a, _b, _c, _d;
        return ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.id_processo) === null || _b === void 0 ? void 0 : _b.value) && ((_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.id_requisicao) === null || _d === void 0 ? void 0 : _d.value);
    }
    get prazoEmDias() {
        var _a;
        const unidade = ((_a = this.unidade) === null || _a === void 0 ? void 0 : _a.searchObj) || this.auth.unidade;
        return ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(unidade.distribuicao_forma_contagem_prazos) ? "" : undefined;
    }
    assignDelta(delta) {
        delta = delta || {
            plano_id: this.form.controls.plano_id.value,
            atividade_id: this.form.controls.atividade_id.value,
            fator_complexidade: this.form.controls.fator_complexidade.value,
            tempo_planejado: this.form.controls.tempo_planejado.value,
            prazo_entrega: this.form.controls.prazo_entrega.value
        };
        console.log("ASSIGN", this.delta, delta);
        this.util.fill(this.delta, delta);
    }
    deltaChanged(field) {
        var _a, _b, _c, _d, _e, _f, _g;
        return ((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.plano_id) && ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.atividade_id) && ((_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.fator_complexidade) && ((_d = this.form) === null || _d === void 0 ? void 0 : _d.controls.tempo_planejado) && ((_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.prazo_entrega) &&
            (((!field || field == "plano_id") && this.delta.plano_id != this.form.controls.plano_id.value) ||
                ((!field || field == "atividade_id") && this.delta.atividade_id != this.form.controls.atividade_id.value) ||
                ((!field || field == "fator_complexidade") && this.delta.fator_complexidade != this.form.controls.fator_complexidade.value) ||
                ((!field || field == "tempo_planejado") && this.delta.tempo_planejado != this.form.controls.tempo_planejado.value) ||
                ((!field || field == "prazo_entrega") && ((_f = this.delta.prazo_entrega) === null || _f === void 0 ? void 0 : _f.getTime()) != ((_g = this.form.controls.prazo_entrega.value) === null || _g === void 0 ? void 0 : _g.getTime())));
    }
    addItemHandleEtiquetas() {
        var _a;
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = ((_a = item.key) === null || _a === void 0 ? void 0 : _a.length) ? item.key : this.util.md5(item.value);
            if (this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
                result = {
                    key: key,
                    value: item.value,
                    color: item.color,
                    icon: item.icon
                };
                this.form.controls.etiqueta.setValue("");
            }
        }
        return result;
    }
    ;
    setControlPreventChange(controlName, value) {
        this.delta[controlName] = value;
        console.log("PREVENT-DEFAULT", controlName, value);
        this.form.controls[controlName].setValue(value);
    }
    calcularPrazo(source) {
        var _a, _b, _c, _d, _e;
        const atividade = (_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj;
        const unidade = (_b = this.unidade) === null || _b === void 0 ? void 0 : _b.searchObj;
        const plano = (((_d = (_c = this.plano) === null || _c === void 0 ? void 0 : _c.selectedItem) === null || _d === void 0 ? void 0 : _d.data) || ((_e = this.planos.find(x => { var _a, _b; return x.key == ((_b = (_a = this.plano) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.key); })) === null || _e === void 0 ? void 0 : _e.data));
        const fator = this.form.controls.fator_complexidade.value || 1;
        const cargaHoraria = (plano === null || plano === void 0 ? void 0 : plano.carga_horaria) || this.calendar.expediente(unidade);
        if (this.deltaChanged()) {
            this.assignDelta(null);
            console.log("ATUALIZOU", this.delta);
            if (source == "COMPLEXIDADE") {
                if (atividade)
                    this.setControlPreventChange("tempo_planejado", atividade.dias_planejado * cargaHoraria * fator || 0);
                const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
                this.setControlPreventChange("prazo_entrega", entrega);
            }
            else if (source == "PLANO") {
                this.planejado.hoursPerDay = cargaHoraria;
                this.form.controls.carga_horaria.setValue(cargaHoraria);
                const tempo = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO");
                this.setControlPreventChange("tempo_planejado", tempo);
            }
            else if (source == "PLANEJADO") {
                const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, unidade, "DISTRIBUICAO");
                this.setControlPreventChange("prazo_entrega", entrega);
            }
            else if (source == "ENTREGA") {
                const tempo = this.form.controls.prazo_entrega.value ? this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, unidade, "DISTRIBUICAO") : 0;
                this.setControlPreventChange("tempo_planejado", tempo);
            }
            this.cdRef.detectChanges();
        }
    }
    onTempoPlanejadoChange(event) {
        console.log("onTempoPlanejadoChange");
        if (this.entity)
            this.calcularPrazo("PLANEJADO");
    }
    onDataDistribuicaoChange(event) {
        console.log("distribuicao", this.form.controls.data_distribuicao.value);
        if (this.entity)
            this.calcularPrazo("ENTREGA");
    }
    onPrazoEntregaChange(event) {
        console.log("entrega", this.form.controls.prazo_entrega.value);
        if (this.entity)
            this.calcularPrazo("ENTREGA");
    }
    onPlanoChange(event) {
        console.log("onPlanoChange");
        if (this.entity)
            this.calcularPrazo("PLANO");
    }
    onComplexidadeChange(event) {
        var _a, _b;
        console.log("onComplexidadeChange");
        if ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj) {
            const atividade = (_b = this.atividade) === null || _b === void 0 ? void 0 : _b.searchObj;
            /* Carrega tempo pactuado */
            const fator = this.form.controls.fator_complexidade.value || 1;
            this.form.controls.tempo_pactuado.setValue(atividade.tempo_pactuado * fator || 0);
            this.calcularPrazo("COMPLEXIDADE");
        }
    }
    onNumeroRequisicaoClick(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const numeroRequisicao = (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.numero_requisicao) === null || _b === void 0 ? void 0 : _b.value;
            if (numeroRequisicao === null || numeroRequisicao === void 0 ? void 0 : numeroRequisicao.length) {
                this.docRequisicao.loading = true;
                try {
                    let dados = yield this.allPages.getDadosDocumento(numeroRequisicao);
                    if (dados) {
                        let tipo_processo_id = null;
                        let tipo_documento_id = null;
                        if ((_c = dados.processo) === null || _c === void 0 ? void 0 : _c.tipo_processo) {
                            const tipo_processo = yield this.tipoProcessoDao.query({ where: [["codigo", "=", (_d = dados.processo) === null || _d === void 0 ? void 0 : _d.tipo_processo]] }).asPromise();
                            if (tipo_processo[0]) {
                                (_e = this.tipoProcesso) === null || _e === void 0 ? void 0 : _e.loadSearch(tipo_processo[0]);
                                tipo_processo_id = tipo_processo[0].id;
                            }
                        }
                        if ((_f = dados.documento) === null || _f === void 0 ? void 0 : _f.tipo_documento) {
                            const tipo_documento = yield this.tipoDocumentoDao.query({ where: [["nome", "=", (_g = dados.documento) === null || _g === void 0 ? void 0 : _g.tipo_documento]] }).asPromise();
                            if (tipo_documento[0]) {
                                (_h = this.tipoDocumento) === null || _h === void 0 ? void 0 : _h.loadSearch(tipo_documento[0]);
                                tipo_documento_id = tipo_documento[0].id;
                            }
                        }
                        this.form.controls.id_processo.setValue((_j = dados.processo) === null || _j === void 0 ? void 0 : _j.id_processo);
                        this.form.controls.numero_processo.setValue((_k = dados.processo) === null || _k === void 0 ? void 0 : _k.numero_processo);
                        this.form.controls.id_requisicao.setValue((_l = dados.documento) === null || _l === void 0 ? void 0 : _l.id_documento);
                        this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
                        this.form.controls.tipo_documento_requisicao_id.setValue(tipo_documento_id);
                        this.form.controls.numero_requisicao.setValue((_m = dados.documento) === null || _m === void 0 ? void 0 : _m.numero_documento);
                        //this.form.controls.titulo_requisicao.setValue(dados.titulo_documento);
                    }
                    else {
                        throw new Error("Documento não encontrado");
                    }
                }
                catch (error) {
                    this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente incluir diretamente pelo botão 'Incluir demanda' acessando o documento no Sei!");
                }
                finally {
                    this.docRequisicao.loading = false;
                }
            }
        });
    }
    loadEtiquetas() {
        var _a, _b;
        const unidade = (_a = this.unidade) === null || _a === void 0 ? void 0 : _a.searchObj;
        const atividade = (_b = this.atividade) === null || _b === void 0 ? void 0 : _b.searchObj;
        this.etiquetas = this.util.merge(atividade === null || atividade === void 0 ? void 0 : atividade.etiquetas_predefinidas, unidade === null || unidade === void 0 ? void 0 : unidade.etiquetas, (a, b) => a.key == b.key);
    }
    loadChecklist() {
        var _a;
        const atividade = (_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj;
        this.checklist = (atividade === null || atividade === void 0 ? void 0 : atividade.checklist_predefinidos) || [];
        let checks = this.util.merge(this.checklist.map(a => {
            return {
                id: a.key,
                texto: a.value,
                checked: false
            };
        }), this.form.controls.checklist.value.filter((b) => b.checked), (a, b) => {
            if (a.id == b.id) {
                a.checked = b.checked;
                return true;
            }
            else {
                return false;
            }
        });
        this.form.controls.checklist.setValue(checks);
    }
    loadAtividade(atividade) {
        var _a, _b;
        if (atividade) {
            /* Carrega etiquetas */
            this.loadEtiquetas();
            /* Carrega complexidades */
            this.complexidades = ((_a = atividade.complexidade) === null || _a === void 0 ? void 0 : _a.map(x => Object.assign({ key: x.fator, value: x.grau + ' (Fator: ' + x.fator + '; Tempo: ' + x.tempo + 'h)' }))) || [];
            /* Atualiza fator de complexidade */
            if (!((_b = atividade.complexidade) === null || _b === void 0 ? void 0 : _b.find(x => x.fator == this.form.controls.fator_complexidade.value)))
                this.form.controls.fator_complexidade.setValue(1);
            this.onComplexidadeChange(new Event("change"));
            /* Carrega checklist */
            this.loadChecklist();
            /* Carrega configurações */
            this.form.controls.recalcula_prazo.setValue(atividade.recalcula_prazo);
        }
        else {
            this.form.controls.tempo_pactuado.setValue(0);
            this.form.controls.tempo_planejado.setValue(0);
            this.etiquetas = [];
            this.complexidades = [];
        }
        this.cdRef.detectChanges();
    }
    loadUsuario(usuario) {
        var _a, _b;
        this.planos = ((_a = usuario === null || usuario === void 0 ? void 0 : usuario.planos) === null || _a === void 0 ? void 0 : _a.map(x => { var _a; return Object.assign({ key: x.id, value: (((_a = x.tipo_modalidade) === null || _a === void 0 ? void 0 : _a.nome) || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio_vigencia) + " à " + this.usuarioDao.getDateFormatted(x.data_fim_vigencia), data: x }); })) || [];
        if (!((_b = this.form.controls.plano_id.value) === null || _b === void 0 ? void 0 : _b.length) && this.planos.length == 1) {
            this.form.controls.plano_id.setValue(this.planos[0].key);
        }
        this.cdRef.detectChanges();
    }
    onAtividadeSelect(item) {
        console.log("onAtividadeSelect");
        const atividade = item.entity;
        this.loadAtividade(atividade);
        this.calcularPrazo("COMPLEXIDADE");
    }
    onUsuarioSelect(item) {
        console.log("onUsuarioSelect");
        const usuario = item.entity;
        this.loadUsuario(usuario);
        this.calcularPrazo("PLANO");
    }
    comentarioLevel(comentario) {
        return (comentario.path || "").split("").filter(x => x == "/");
    }
    orderComentarios(comentarios) {
        return comentarios.sort((a, b) => {
            return (a.path + "/" + a.id) < (b.path + "/" + b.id) || (a.path == b.path && a.data_hora.getTime() < b.data_hora.getTime()) ? -1 : 1;
        });
    }
    newComentario(pai) {
        const comentario = new src_app_models_comentario__WEBPACK_IMPORTED_MODULE_11__["Comentario"]();
        const comentarios = this.form.controls.comentarios.value || [];
        comentario.id = this.dao.generateUuid();
        comentario.path = pai ? pai.path + "/" + pai.id : "";
        comentario.data_hora = this.auth.hora;
        comentario.usuario_id = this.auth.usuario.id;
        comentario.comentario_id = (pai === null || pai === void 0 ? void 0 : pai.id) || null;
        comentario.usuario = this.auth.usuario;
        comentario._status = "ADD";
        comentarios.push(comentario);
        this.form.controls.comentarios.setValue(this.orderComentarios(comentarios));
        this.comentarios.adding = true;
        this.comentarios.edit(comentario);
        return comentario;
    }
    saveComentario(form, item) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const entity = form.value;
            Object.assign((_a = this.comentarios) === null || _a === void 0 ? void 0 : _a.editing, entity);
            return undefined;
        });
    }
    loadComentario(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.formComentarios.controls.texto.setValue(row.texto);
            this.formComentarios.controls.tipo.setValue(row.tipo);
            this.formComentarios.controls.privacidade.setValue(row.privacidade);
        });
    }
    comentarioDynamicOptions(row) {
        return [{
                label: "Comentar",
                icon: "bi bi-chat-left-quote",
                onClick: (comentario) => {
                    this.newComentario(comentario);
                }
            }];
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            this.assignDelta(formValue);
            yield Promise.all([
                this.unidade.loadSearch(entity.unidade || formValue.unidade_id),
                this.usuario.loadSearch(entity.usuario || formValue.usuario_id),
                this.atividade.loadSearch(entity.atividade || formValue.atividade_id)
            ]);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            entity.comentarios = this.orderComentarios(entity.comentarios);
            form.patchValue(formValue);
            if (((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.numero_requisicao) === null || _b === void 0 ? void 0 : _b.length) && this.action == "new") {
                this.onNumeroRequisicaoClick(new Event(""));
            }
        });
    }
    initializeData(form) {
        var _a, _b, _c, _d, _e;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = new src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"]();
            this.entity.data_distribuicao = this.auth.hora;
            this.entity.prazo_entrega = this.entity.data_distribuicao;
            this.entity.demandante_id = ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id) || "";
            this.entity.unidade_id = ((_b = this.auth.unidade) === null || _b === void 0 ? void 0 : _b.id) || "";
            this.entity.unidade = this.auth.unidade;
            if ((_d = (_c = this.queryParams) === null || _c === void 0 ? void 0 : _c.numero_requisicao) === null || _d === void 0 ? void 0 : _d.length) {
                //this.entity.id_processo = parseInt(this.queryParams?.id_processo);
                //this.entity.numero_processo = this.queryParams?.numero_processo;
                //this.entity.id_requisicao = parseInt(this.queryParams?.id_requisicao);
                this.entity.numero_requisicao = (_e = this.queryParams) === null || _e === void 0 ? void 0 : _e.numero_requisicao;
            }
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a;
            let demanda = this.util.fill(new src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"](), this.entity);
            (_a = this.comentarios) === null || _a === void 0 ? void 0 : _a.confirm();
            demanda = this.util.fillForm(demanda, this.form.value);
            demanda.comentarios = demanda.comentarios.filter((x) => ["ADD", "DELETE"].includes(x._status || ""));
            resolve(demanda);
        });
    }
    titleEdit(entity) {
        return "Editando "; // + (entity?.unidade_id || "");
    }
}
DemandaFormComponent.ɵfac = function DemandaFormComponent_Factory(t) { return new (t || DemandaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["Injector"])); };
DemandaFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: DemandaFormComponent, selectors: [["app-demanda-form"]], viewQuery: function DemandaFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c7, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c8, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c9, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.plano = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.planejado = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.docRequisicao = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoProcesso = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoDocumento = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]], decls: 57, vars: 93, consts: [[3, "form", "disabled", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["key", "ATIVIDADE", "label", "Atividade"], ["transparent", "", "bottom", "", 4, "ngIf"], [1, "row"], ["label", "Assunto/Resumo", "controlName", "assunto", 3, "size", "rows", "control"], ["label", "Atividade", "controlName", "atividade_id", "labelInfo", "Atividade que ser\u00E1 executado pela demanda, n\u00E3o \u00E9 obrigat\u00F3rio nesse momento.", 3, "size", "control", "dao", "groupBy", "where", "selectRoute", "select"], ["atividade", ""], ["label", "Complexidade", "controlName", "fator_complexidade", "labelInfo", "Multiplicador do tempo da atividade", 3, "size", "control", "items", "change"], ["label", "Respons\u00E1vel", "controlName", "usuario_id", "labelInfo", "Respons\u00E1vel por executar a demanda", 3, "size", "control", "dao", "join", "selectRoute", "select"], ["usuario", ""], ["label", "Plano de trabalho", "controlName", "plano_id", "labelInfo", "Plano de trabalho", 3, "size", "control", "items", "select"], ["plano", ""], ["noIcon", "", "label", "Data de distribui\u00E7\u00E3o", "controlName", "data_distribuicao", "labelInfo", "Data de cadastro da demanda", 3, "size", "control", "change"], ["label", "Tempo pactuado", "controlName", "tempo_pactuado", "disabled", "", "labelInfo", "Tempo calculado a partir da atividade e utilizando o fator_complexidade", 3, "size", "control"], ["label", "Tempo planejado", "controlName", "tempo_planejado", "labelInfo", "Diferen\u00E7a entre data_distribuicao e prazo_entrega em horas (\u00FAteis ou corridas, configurada na unidade)", 3, "onlyDays", "size", "control", "change"], ["planejado", ""], ["noIcon", "", "label", "Prazo de entrega", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da demanda", 3, "date", "size", "control", "change"], ["key", "VINCULOS", "label", "Vinculos"], ["key", "CARACTERIZACAO", "label", "Caracteriza\u00E7\u00E3o"], ["label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", 3, "size", "control", "items"], ["etiqueta", ""], [1, "col-md-4"], ["editable", "", 3, "control", "form", "hasAdd", "hasDelete"], ["type", "switch", "title", "Check", "field", "checked"], ["type", "display", "title", "Texto", "field", "texto", 3, "editable"], ["type", "options"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"], ["clss", "row"], ["editable", "", 3, "control", "hasEdit", "hasDelete", "add", "form", "load", "save"], ["comentarios", ""], ["title", "Coment\u00E1rios", 3, "template", "editTemplate"], ["mensagem", ""], ["mensagemEdit", ""], ["type", "options", 3, "dynamicOptions"], ["key", "COMPLEMENTARES", "label", "Complementares"], ["numbers", "", "label", "ID processo", "controlName", "id_processo", "disabled", "", "labelInfo", "ID do processo, caso seja Sei ser\u00E1 o ID do procedimento", 3, "size", "control"], ["numbers", "", "label", "ID requisi\u00E7\u00E3o", "controlName", "id_requisicao", "disabled", "", "labelInfo", "ID da requisi\u00E7\u00E3o do sistema integrado, caso seja o Sei ser\u00E1 o ID_Documento", 3, "size", "control"], ["numbers", "", "label", "ID proc. entrega", "controlName", "id_processo_entrega", "disabled", "", "labelInfo", "ID do processo de entrega, caso seja Sei ser\u00E1 o ID do procedimento", 3, "size", "control"], ["numbers", "", "label", "ID doc. entrega", "controlName", "id_documento_entrega", "disabled", "", "labelInfo", "ID da entrega, caso seja o Sei ser\u00E1 o ID_Documento", 3, "size", "control"], ["label", "Demandante", "controlName", "demandante_id", "disabled", "", 3, "size", "control", "dao"], ["label", "Unidade", "controlName", "unidade_id", "disabled", "", 3, "size", "control", "dao"], ["unidade", ""], ["label", "Recalcul\u00E1vel", "controlName", "recalcula_prazo", "labelInfo", "Recalcula data de entrega baseado nos dias planejado", 3, "size", "control"], ["key", "CONCLUSAO", "label", "Conclus\u00E3o", 4, "ngIf"], ["transparent", "", "bottom", ""], ["label", "N\u00FAmero Processo", "controlName", "numero_processo", "disabled", "", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "size", "control"], ["label", "Tipo Processo", "controlName", "tipo_processo_id", "disabled", "", 3, "size", "control", "dao", "selectRoute"], ["tipoProcesso", ""], ["label", "N\u00FAmero doc. requisi\u00E7\u00E3o", "controlName", "numero_requisicao", "labelInfo", "Numero do documento de requisi\u00E7\u00E3o, caso seja o Sei \u00E9 o numero Sei", 3, "size", "control", "disabled", "buttonClick"], ["docRequisicao", ""], ["label", "Tipo doc. requisi\u00E7\u00E3o", "controlName", "tipo_documento_requisicao_id", "disabled", "", 3, "size", "control", "dao", "selectRoute"], ["tipoDocumento", ""], [1, "comentario-table"], ["class", "d-none d-md-table-cell", 3, "width", 4, "ngIf"], [1, "comentario-user", "text-center"], ["onerror", "this.src='./assets/images/profile.png'", "width", "25", "height", "25", 1, "rounded-circle", "profile-photo", 3, "src"], [4, "ngFor", "ngForOf"], [1, "comentario-container"], [1, "comentario-user-indicator"], [1, "comentario-message-title"], [1, "fw-light"], [1, "d-none", "d-md-table-cell"], [1, "comentario-level"], [1, "col-md-8"], ["label", "Mensagem", "icon", "bi bi-textarea-t", "controlName", "texto", 3, "size", "rows", "control"], ["label", "Tipo", "icon", "bi bi-braces", "controlName", "tipo", 3, "size", "control", "items"], ["label", "privacidade", "icon", "bi bi-incognito", "controlName", "privacidade", 3, "size", "control", "items"], ["key", "CONCLUSAO", "label", "Conclus\u00E3o"], ["noIcon", "", "label", "Inicio", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["noIcon", "", "label", "Entrega", "controlName", "data_entrega", "disabled", "", "labelInfo", "Data estipulada para entrega da demanda", 3, "size", "control"], ["label", "Tempo despendido", "controlName", "tempo_despendido", "disabled", "", "labelInfo", "Calculado no fim da demanda, sendo o tempo l\u00EDquido (considerando pausas)", 3, "size", "control"], ["label", "Tipo entrega", "controlName", "tipo_documento_entrega_id", "disabled", "", 3, "size", "control", "dao"], ["numbers", "", "label", "N\u00FAmero", "controlName", "numero_documento_entrega", "disabled", "", "iconButton", "bi-cloud-download", "labelInfo", "Numero do documento de entrega, caso seja o Sei \u00E9 o numero Sei", 3, "size", "control"], ["label", "T\u00EDtulo", "controlName", "titulo_documento_entrega", "disabled", "", "labelInfo", "T\u00EDtulo do documento de entrega", 3, "size", "control"], ["label", "Tempo homologado", "controlName", "tempo_homologado", "disabled", "", "labelInfo", "Caso a avalia\u00E7\u00E3o seja positiva ser\u00E1 igual ao tempo pactuado", 3, "size", "control"], ["label", "Produtividade", "sufix", "%", "controlName", "produtividade", "disabled", "", "labelInfo", "Diferen\u00E7a entre o tempo pactuado e o despendido", 3, "size", "control"], ["label", "Data de arquivamento", "controlName", "data_arquivamento", "disabled", "", "labelInfo", "Data de arquivamento da demanda", 3, "size", "control"], ["title", "Avalia\u00E7\u00E3o", 4, "ngIf"], ["title", "Avalia\u00E7\u00E3o"]], template: function DemandaFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function DemandaFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, DemandaFormComponent_separator_3_Template, 10, 19, "separator", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "input-textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function DemandaFormComponent_Template_input_search_select_7_listener($event) { return ctx.onAtividadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "input-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function DemandaFormComponent_Template_input_select_change_9_listener($event) { return ctx.onComplexidadeChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function DemandaFormComponent_Template_input_search_select_11_listener($event) { return ctx.onUsuarioSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "input-select", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function DemandaFormComponent_Template_input_select_select_13_listener($event) { return ctx.onPlanoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "input-datetime", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function DemandaFormComponent_Template_input_datetime_change_16_listener($event) { return ctx.onDataDistribuicaoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](17, "input-timer", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "input-timer", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function DemandaFormComponent_Template_input_timer_change_18_listener($event) { return ctx.onTempoPlanejadoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "input-datetime", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function DemandaFormComponent_Template_input_datetime_change_20_listener($event) { return ctx.onPrazoEntregaChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "tab", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](22, " Vinculos (Fazer a magia acontecer) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](23, "tab", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](25, "input-multiselect", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](26, "input-select", 21, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](28, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](29, "grid", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](30, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](31, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](32, "column", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](33, "column", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](34, "tab", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](35, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](36, "grid", 30, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](38, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](39, "column", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](40, DemandaFormComponent_ng_template_40_Template, 19, 8, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](42, DemandaFormComponent_ng_template_42_Template, 8, 9, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](44, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](45, "tab", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](46, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](47, "input-text", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](48, "input-text", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](49, "input-text", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](50, "input-text", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](51, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](52, "input-search", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](53, "input-search", 42, 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](55, "input-switch", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](56, DemandaFormComponent_tab_56_Template, 15, 20, "tab", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](41);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](43);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.tituloDemanda);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isDemandaProcessual || ctx.gb.isExtension);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.assunto);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.atividade_id)("dao", ctx.atividadeDao)("groupBy", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](73, _c14, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](72, _c13)))("where", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction2"](78, _c17, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](75, _c15, ctx.form.controls.unidade_id.value), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](77, _c16)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction2"](86, _c21, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](81, _c18), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](84, _c20, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](82, _c19, ctx.form.controls.unidade_id.value))));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.fator_complexidade)("items", ctx.complexidades);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.usuario_id)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](89, _c22))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](91, _c11, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](90, _c23)));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.plano_id)("items", ctx.planos);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_pactuado);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("onlyDays", ctx.prazoEmDias)("size", 3)("control", ctx.form.controls.tempo_planejado);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("date", ctx.prazoEmDias)("size", 3)("control", ctx.form.controls.prazo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.etiquetas)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.etiqueta)("items", ctx.etiquetas);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("control", ctx.form.controls.checklist)("form", ctx.formChecklist)("hasAdd", false)("hasDelete", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("editable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("control", ctx.form.controls.comentarios)("hasEdit", false)("hasDelete", false)("add", ctx.addComentario.bind(ctx))("form", ctx.formComentarios)("load", ctx.loadComentario.bind(ctx))("save", ctx.saveComentario.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("template", _r7)("editTemplate", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("dynamicOptions", ctx.comentarioDynamicOptions.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.id_processo);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.id_requisicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.id_processo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.id_documento_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.demandante_id)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.recalcula_prazo);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !!ctx.form.controls.data_entrega.value);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__["TabComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_17__["InputTextareaComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__["InputDatetimeComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_21__["InputTimerComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__["InputMultiselectComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_23__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_24__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_25__["ColumnComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_26__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_27__["InputSwitchComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_28__["SeparatorComponent"], _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_29__["InputButtonComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgForOf"]], styles: ["@charset \"UTF-8\";\n.comentario-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.comentario-user[_ngcontent-%COMP%] {\n  width: 50px;\n  vertical-align: top;\n  padding: 8px;\n}\n.comentario-container[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  width: auto;\n  border-left: var(--bs-gray-400) 2px solid;\n  position: relative;\n}\n.comentario-user-indicator[_ngcontent-%COMP%] {\n  content: \"\";\n  position: absolute;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  left: -12px;\n  border-top: 0.75rem solid var(--bs-gray-400);\n  border-left: 0.75rem solid transparent;\n}\n.comentario-level[_ngcontent-%COMP%] {\n  color: var(--bs-gray);\n}\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7em;\n  color: var(--bs-gray);\n}\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {\n  content: \" \u2022 \";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGRlbWFuZGEtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDSSxXQUFBO0FBRUo7QUFBQTtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFHSjtBQURBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUNBQUE7RUFDQSxrQkFBQTtBQUlKO0FBRkE7RUFDSSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsNENBQUE7RUFDQSxzQ0FBQTtBQUtKO0FBSEE7RUFDSSxxQkFBQTtBQU1KO0FBSEk7RUFDSSxnQkFBQTtFQUNBLHFCQUFBO0FBTVI7QUFKSTtFQUNJLGNBQUE7QUFNUiIsImZpbGUiOiJkZW1hbmRhLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4uY29tZW50YXJpby10YWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY29tZW50YXJpby11c2VyIHtcbiAgd2lkdGg6IDUwcHg7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIHBhZGRpbmc6IDhweDtcbn1cblxuLmNvbWVudGFyaW8tY29udGFpbmVyIHtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICB3aWR0aDogYXV0bztcbiAgYm9yZGVyLWxlZnQ6IHZhcigtLWJzLWdyYXktNDAwKSAycHggc29saWQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNvbWVudGFyaW8tdXNlci1pbmRpY2F0b3Ige1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAwcHg7XG4gIGhlaWdodDogMHB4O1xuICB0b3A6IDBweDtcbiAgbGVmdDogLTEycHg7XG4gIGJvcmRlci10b3A6IDAuNzVyZW0gc29saWQgdmFyKC0tYnMtZ3JheS00MDApO1xuICBib3JkZXItbGVmdDogMC43NXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuLmNvbWVudGFyaW8tbGV2ZWwge1xuICBjb2xvcjogdmFyKC0tYnMtZ3JheSk7XG59XG5cbi5jb21lbnRhcmlvLW1lc3NhZ2UtdGl0bGUgc3BhbiB7XG4gIGZvbnQtc2l6ZTogMC43ZW07XG4gIGNvbG9yOiB2YXIoLS1icy1ncmF5KTtcbn1cbi5jb21lbnRhcmlvLW1lc3NhZ2UtdGl0bGUgc3Bhbjo6YmVmb3JlIHtcbiAgY29udGVudDogXCIg4oCiIFwiO1xufSJdfQ== */"] });


/***/ }),

/***/ "QFFC":
/*!*****************************************!*\
  !*** ./src/app/models/demanda.model.ts ***!
  \*****************************************/
/*! exports provided: Demanda */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Demanda", function() { return Demanda; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Demanda extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.numero = 0; /* Numero da demanda */
        this.id_requisicao = null; /* ID da requisição do sistema integrado, caso seja o Sei será o ID_Documento */
        this.numero_requisicao = null; /* Numero do documento de requisição, caso seja o Sei é o numero Sei */
        this.id_processo = null; /* ID do processo, caso seja Sei será o ID do procedimento */
        this.numero_processo = null; /* Número do processo, com a formatação de origem */
        this.assunto = null; /* Assunto da demanda */
        this.data_distribuicao = new Date(); /* Data de cadastro da demanda */
        this.tempo_planejado = 0.0; /* Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade) */
        this.carga_horaria = 0.0; /* Carga horária diária (vinda do plano de trabalho) */
        //public dias_planejado: number = 0.0;  /* Diferença entre data_distribuicao e prazo_entrega em dias (úteis ou corridas, configurada na unidade) */
        this.prazo_entrega = new Date(); /* Data estipulada para entrega da demanda */
        this.data_inicio = null; /* Data em que o usuário iniciou a atividade */
        this.data_entrega = null; /* Data da entrega */
        this.tempo_pactuado = 0.0; /* Tempo calculado a partir da atividade e utilizando o fator_complexidade */
        this.fator_complexidade = 1; /* Multiplicador do tempo da atividade */
        this.tempo_despendido = null; /* Calculado no fim da demanda, sendo o tempo líquido (considerando pausas) */
        //public dias_despendido: number | null = null; /* Calculado no fim da demanda, sendo o tempo líquido (considerando pausas) */
        this.id_processo_entrega = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
        this.numero_processo_entrega = null; /* Número do processo de entrega, com a formatação de origem */
        this.id_documento_entrega = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
        this.numero_documento_entrega = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
        this.titulo_documento_entrega = null; /* Numeração do tipo de documento no sistema integrado */
        this.data_arquivamento = null; /* Data de arquivamento da demanda */
        this.tempo_homologado = null; /* Caso a avaliação seja positiva será igual ao tempo pactuado */
        this.produtividade = null; /* Diferença entre o tempo pactuado e o despendido */
        this.etiquetas = []; /* Etiquetas */
        this.checklist = []; /* Checklist */
        this.prioridade = null; /* Nível de prioridade */
        this.recalcula_prazo = false; /* Recalcula data de entrega baseado nos dias planejado */
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.comentarios = []; /* Comentarios da demanda */
        this.pausas = []; /* Pausas da demanda */
        this.atividade_id = null;
        this.demandante_id = "";
        this.usuario_id = null;
        this.unidade_id = "";
        this.plano_id = null;
        this.avaliacao_id = null;
        this.tipo_documento_requisicao_id = null;
        this.tipo_documento_entrega_id = null;
        this.tipo_processo_id = null;
    }
}


/***/ }),

/***/ "RpBF":
/*!******************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: DemandaRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaRoutingModule", function() { return DemandaRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _demanda_form_avaliar_demanda_form_avaliar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demanda-form-avaliar/demanda-form-avaliar.component */ "kOpC");
/* harmony import */ var _demanda_form_concluir_demanda_form_concluir_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demanda-form-concluir/demanda-form-concluir.component */ "ki7H");
/* harmony import */ var _demanda_form_iniciar_demanda_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demanda-form-iniciar/demanda-form-iniciar.component */ "lXLP");
/* harmony import */ var _demanda_form_pausar_demanda_form_pausar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./demanda-form-pausar/demanda-form-pausar.component */ "9wD7");
/* harmony import */ var _demanda_form_prorrogar_demanda_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./demanda-form-prorrogar/demanda-form-prorrogar.component */ "kyTh");
/* harmony import */ var _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./demanda-form/demanda-form.component */ "OKxM");
/* harmony import */ var _demanda_list_demanda_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./demanda-list/demanda-list.component */ "BIZs");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");












const routes = [
    { path: '', component: _demanda_list_demanda_list_component__WEBPACK_IMPORTED_MODULE_9__["DemandaListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Demandas" } },
    { path: 'new', component: _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_8__["DemandaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_8__["DemandaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _demanda_form_demanda_form_component__WEBPACK_IMPORTED_MODULE_8__["DemandaFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Consultar", modal: true } },
    { path: ':id/iniciar', component: _demanda_form_iniciar_demanda_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__["DemandaFormIniciarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Iniciar", modal: true } },
    { path: ':id/concluir', component: _demanda_form_concluir_demanda_form_concluir_component__WEBPACK_IMPORTED_MODULE_4__["DemandaFormConcluirComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Conlcuir", modal: true } },
    { path: ':id/avaliar', component: _demanda_form_avaliar_demanda_form_avaliar_component__WEBPACK_IMPORTED_MODULE_3__["DemandaFormAvaliarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Avaliar", modal: true } },
    { path: ':id/pausar', component: _demanda_form_pausar_demanda_form_pausar_component__WEBPACK_IMPORTED_MODULE_6__["DemandaFormPausarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Avaliar", modal: true } },
    { path: ':id/prorrogar', component: _demanda_form_prorrogar_demanda_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_7__["DemandaFormProrrogarComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Avaliar", modal: true } }
];
class DemandaRoutingModule {
}
DemandaRoutingModule.ɵfac = function DemandaRoutingModule_Factory(t) { return new (t || DemandaRoutingModule)(); };
DemandaRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: DemandaRoutingModule });
DemandaRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](DemandaRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "kOpC":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form-avaliar/demanda-form-avaliar.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: DemandaFormAvaliarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormAvaliarComponent", function() { return DemandaFormAvaliarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ "6eNO");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-rate/input-rate.component */ "J3H8");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ "L+jc");
/* harmony import */ var _components_input_input_multitoggle_input_multitoggle_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-multitoggle/input-multitoggle.component */ "naek");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");























const _c0 = ["atividade"];
const _c1 = ["docEntregue"];
const _c2 = ["justificativas"];
function DemandaFormAvaliarComponent_top_alert_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "top-alert", 21);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("message", "Tempo despendido abaixo do m\u00EDnimo esperado (" + ctx_r0.util.decimalToTimerFormated(ctx_r0.despendidoMinimo, true) + ")");
} }
function DemandaFormAvaliarComponent_separator_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "separator", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-button", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-text", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("collapsed", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx_r1.form.controls.numero_documento_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8)("control", ctx_r1.form.controls.titulo_documento_entrega);
} }
function DemandaFormAvaliarComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "strong", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"](ctx_r4.styleButtonTipoAvaliacao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassMap"](ctx_r4.tipoAvaliacao.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("color", ctx_r4.tipoAvaliacao.color || "black");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r4.tipoAvaliacao.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" (Nota: ", ctx_r4.tipoAvaliacao.data.nota, ") ");
} }
function DemandaFormAvaliarComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-multitoggle", 29, 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx_r5.tipoAvaliacao.data.pergunta)("items", ctx_r5.tiposJustificativas);
} }
function DemandaFormAvaliarComponent_separator_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "separator", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "input-textarea", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx_r6.form.controls.comentario_avaliacao);
} }
function DemandaFormAvaliarComponent_separator_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "separator", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " Lista de atividades ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("collapsed", false);
} }
const _c3 = function () { return { field: "unidade.sigla", label: "Unidade" }; };
const _c4 = function (a0) { return [a0]; };
const _c5 = function (a2) { return ["unidade_id", "=", a2]; };
const _c6 = function () { return ["vinculadas", "=", true]; };
const _c7 = function (a0, a1) { return [a0, a1]; };
const _c8 = function () { return ["cadastros", "atividade"]; };
const _c9 = function (a0) { return { unidade_id: a0 }; };
const _c10 = function (a0) { return { filter: a0 }; };
const _c11 = function (a0, a1) { return { route: a0, params: a1 }; };
class DemandaFormAvaliarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.tiposAvaliacoes = [];
        this.tiposJustificativas = [];
        this.modalWidth = 900;
        this.complexidades = [];
        this.atrasado = false;
        this.despendidoMinimo = 0;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if ((controlName == "atividade_id" && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) ||
                (controlName == "fator_complexidade" && !(control.value > 0))) {
                result = "Obrigatório";
            }
            else if (controlName == "nota_atribuida" && !(control.value >= 0)) {
                result = "Obrigatório selecionar. Caso queira selecionar ZERO, clique 2x em qualquer estrela!";
            }
            return result;
        };
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__["AtividadeDaoService"]);
        this.tipoAvaliacaoDao = injector.get(src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_6__["TipoAvaliacaoDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__["CalendarService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_8__["ListenerAllPagesService"]);
        this.form = this.fh.FormBuilder({
            tipo_documento_entrega_id: { default: null },
            numero_documento_entrega: { default: null },
            titulo_documento_entrega: { default: null },
            atividade_id: { default: null },
            fator_complexidade: { default: 1 },
            data_distribuicao: { default: null },
            tempo_pactuado: { default: 0 },
            prazo_entrega: { default: null },
            diferenca_prazo_entrega: { default: 0 },
            data_inicio: { default: null },
            tempo_despendido: { default: 0 },
            data_entrega: { default: null },
            produtividade: { default: 0 },
            nota_atribuida: { default: null },
            comentario_avaliacao: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            this.atrasado = !!((_a = entity.metadados) === null || _a === void 0 ? void 0 : _a.atrasado);
            formValue.diferenca_prazo_entrega = this.atrasado ?
                this.calendar.horasAtraso(formValue.prazo_entrega, entity.unidade) :
                this.calendar.horasAdiantado(formValue.data_entrega, formValue.prazo_entrega, entity.plano.carga_horaria, entity.unidade);
            yield this.atividade.loadSearch(entity.atividade || formValue.atividade_id);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const results = yield Promise.all([
                this.dao.getDemanda(this.urlParams.get("id")),
                this.tipoAvaliacaoDao.query({ join: ["tipos_avaliacoes_justificativas.tipo_justificativa"] }).asPromise()
            ]);
            this.entity = results[0];
            this.tiposAvaliacoes = results[1];
            yield this.loadData(this.entity, form);
        });
    }
    get styleButtonTipoAvaliacao() {
        var _a;
        const rgb = this.util.colorHexToRGB(((_a = this.tipoAvaliacao) === null || _a === void 0 ? void 0 : _a.color) || "#000000");
        return "background-color: rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.2);";
    }
    onNotaChange(event) {
        const nota = this.form.controls.nota_atribuida.value;
        const tipoAvaliacao = this.tiposAvaliacoes.find(x => x.nota_atribuida == nota);
        if (tipoAvaliacao) {
            this.tipoAvaliacao = {
                key: tipoAvaliacao.id,
                value: tipoAvaliacao.nome,
                icon: tipoAvaliacao.icone,
                color: tipoAvaliacao.cor,
                data: {
                    nota: nota,
                    pergunta: tipoAvaliacao.pergunta
                }
            };
            this.tiposJustificativas = tipoAvaliacao.tipos_avaliacoes_justificativas.map(x => {
                return {
                    key: x.tipo_justificativa_id,
                    value: x.tipo_justificativa.nome || ""
                };
            });
        }
        this.cdRef.detectChanges();
    }
    onComplexidadeChange(event) {
        var _a, _b;
        console.log("onComplexidadeChange");
        if ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj) {
            const form = this.form.value;
            const atividade = (_b = this.atividade) === null || _b === void 0 ? void 0 : _b.searchObj;
            /* Carrega tempo pactuado */
            const fator = form.fator_complexidade || 1;
            this.form.controls.tempo_pactuado.setValue(atividade.tempo_pactuado * fator || 0);
            this.form.controls.produtividade.setValue(this.calendar.produtividade(form.tempo_pactuado, form.tempo_despendido));
        }
    }
    onAtividadeSelect(item) {
        var _a, _b, _c;
        console.log("onAtividadeSelect");
        const atividade = item.entity;
        if (atividade) {
            /* Carrega complexidades */
            this.complexidades = ((_a = atividade.complexidade) === null || _a === void 0 ? void 0 : _a.map(x => {
                return {
                    key: x.fator,
                    value: x.grau + ' (Fator: ' + x.fator + ')'
                };
            })) || [];
            /* Atualiza fator de complexidade */
            if (!((_b = atividade.complexidade) === null || _b === void 0 ? void 0 : _b.find(x => x.fator == this.form.controls.fator_complexidade.value)))
                this.form.controls.fator_complexidade.setValue(1);
            this.onComplexidadeChange(new Event("change"));
            /* Calcula o tempo despendido mínimo */
            this.despendidoMinimo = (atividade.tempo_minimo / 100) * (((_c = this.entity) === null || _c === void 0 ? void 0 : _c.tempo_despendido) || 0);
        }
        else {
            this.form.controls.tempo_pactuado.setValue(0);
            this.complexidades = [];
        }
        this.cdRef.detectChanges();
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            const form = this.form.value;
            const avaliacao = {
                demanda_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id,
                atividade_id: form.atividade_id,
                tipo_avaliacao_id: this.tipoAvaliacao.key,
                fator_complexidade: form.fator_complexidade,
                tempo_pactuado: form.tempo_pactuado,
                produtividade: form.produtividade,
                nota_atribuida: form.nota_atribuida,
                comentario_avaliacao: form.comentario_avaliacao,
                tipos_afaliacoes: ((_c = (_b = this.justificativas) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c.map(x => x.key)) || []
            };
            this.dao.avaliar(avaliacao).then(saved => resolve(saved)).catch(reject);
        });
    }
    titleEdit(entity) {
        return "Concluindo"; // + (entity?.unidade_id || "");
    }
}
DemandaFormAvaliarComponent.ɵfac = function DemandaFormAvaliarComponent_Factory(t) { return new (t || DemandaFormAvaliarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["Injector"])); };
DemandaFormAvaliarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: DemandaFormAvaliarComponent, selectors: [["app-demanda-form-avaliar"]], viewQuery: function DemandaFormAvaliarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.docEntregue = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.justificativas = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 25, vars: 56, consts: [["type", "warning", 3, "message", 4, "ngIf"], [3, "form", "disabled", "submit", "cancel"], ["transparent", "", "bottom", "", 3, "collapsed", 4, "ngIf"], [1, "row"], ["label", "Atividade", "controlName", "atividade_id", 3, "size", "control", "dao", "groupBy", "where", "selectRoute", "select"], ["atividade", ""], ["label", "Complexidade", "controlName", "fator_complexidade", "labelInfo", "Multiplicador do tempo da atividade", 3, "size", "control", "items"], ["noIcon", "", "label", "Data de distribui\u00E7\u00E3o", "disabled", "", "controlName", "data_distribuicao", "labelInfo", "Data de cadastro da demanda", 3, "size", "control"], ["label", "Tempo pactuado", "disabled", "", "controlName", "tempo_pactuado", "labelInfo", "Tempo calculado a partir da atividade e utilizando o fator_complexidade", 3, "size", "control"], ["noIcon", "", "label", "Prazo de entrega", "disabled", "", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da demanda", 3, "size", "control"], ["disabled", "", "controlName", "diferenca_prazo_entrega", 3, "label", "size", "control", "labelInfo"], ["noIcon", "", "label", "Data de inicio", "disabled", "", "controlName", "data_inicio", "labelInfo", "Data de inicio", 3, "size", "control"], ["label", "Tempo despendido", "disabled", "", "controlName", "tempo_despendido", "labelInfo", "Tempo despendido na atividade (considerando fins de semana, feriados e afastamentos)", 3, "size", "control"], ["noIcon", "", "label", "Data de entrega", "disabled", "", "controlName", "data_entrega", "labelInfo", "Data e hora da entrega", 3, "size", "control"], ["entrega", ""], ["numbers", "", "label", "Produtividade", "sufix", "%", "disabled", "", "controlName", "produtividade", "labelInfo", "Diferen\u00E7a entre o tempo pactuado e o despendido (proporcional, em porcentagem)", 3, "stepValue", "size", "control"], ["controlName", "nota_atribuida", "controlName", "rate", 3, "size", "label", "control", "change"], ["class", "d-flex justify-content-center", 4, "ngIf"], [4, "ngIf"], ["title", "Coment\u00E1rios adicionais?", "icon", "bi bi-chat-left-quote", "collapse", "", 4, "ngIf"], ["title", "Avaliar outras demandas vinculadas", "collapse", "", 3, "collapsed", 4, "ngIf"], ["type", "warning", 3, "message"], ["transparent", "", "bottom", "", 3, "collapsed"], ["label", "N\u00BA doc. entregue", "controlName", "numero_documento_entrega", "disabled", "", "labelInfo", "Numero do documento entregue, caso seja o Sei \u00E9 o numero Sei", 3, "size", "control"], ["docEntregue", ""], ["label", "T\u00EDtulo do documento", "controlName", "titulo_documento_entrega", "disabled", "", "labelInfo", "T\u00EDtulo do documento entregue", 3, "size", "control"], [1, "d-flex", "justify-content-center"], ["type", "button", 1, "pe-none", "btn"], [1, "ms-1"], [3, "label", "items"], ["justificativas", ""], ["title", "Coment\u00E1rios adicionais?", "icon", "bi bi-chat-left-quote", "collapse", ""], ["label", "Coment\u00E1rio", "controlName", "comentario_avaliacao", 3, "size", "rows", "control"], ["title", "Avaliar outras demandas vinculadas", "collapse", "", 3, "collapsed"]], template: function DemandaFormAvaliarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, DemandaFormAvaliarComponent_top_alert_0_Template, 1, 1, "top-alert", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function DemandaFormAvaliarComponent_Template_editable_form_submit_1_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormAvaliarComponent_Template_editable_form_cancel_1_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, DemandaFormAvaliarComponent_separator_2_Template, 4, 5, "separator", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("select", function DemandaFormAvaliarComponent_Template_input_search_select_4_listener($event) { return ctx.onAtividadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "input-timer", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "input-timer", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "input-datetime", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](14, "input-timer", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](15, "input-datetime", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](17, "input-text", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](18, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "input-rate", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function DemandaFormAvaliarComponent_Template_input_rate_change_20_listener($event) { return ctx.onNotaChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, DemandaFormAvaliarComponent_div_21_Template, 6, 8, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, DemandaFormAvaliarComponent_div_22_Template, 3, 2, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](23, DemandaFormAvaliarComponent_separator_23_Template, 2, 3, "separator", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, DemandaFormAvaliarComponent_separator_24_Template, 2, 1, "separator", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.despendidoMinimo);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.gb.isExtension);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.atividade_id)("dao", ctx.atividadeDao)("groupBy", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](40, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](39, _c3)))("where", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](45, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](42, _c5, ctx.entity == null ? null : ctx.entity.unidade_id), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](44, _c6)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](53, _c11, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](48, _c8), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](51, _c10, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](49, _c9, ctx.entity == null ? null : ctx.entity.unidade_id))));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.fator_complexidade)("items", ctx.complexidades);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_pactuado);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.prazo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx.atrasado ? "Atraso" : "Adiantado")("size", 3)("control", ctx.form.controls.diferenca_prazo_entrega)("labelInfo", (ctx.atrasado ? "Tempo de atraso" : "Tempo adiantado") + " na realiza\u00E7\u00E3o da demanda");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_despendido);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("stepValue", 0.01)("size", 3)("control", ctx.form.controls.produtividade);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("label", "Como foi a entrega de " + ctx.util.apelidoOuNome(ctx.entity == null ? null : ctx.entity.usuario) + "?")("control", ctx.form.controls.nota_atribuida);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.tipoAvaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.tipoAvaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.tipoAvaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", false);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__["InputDatetimeComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_14__["InputTimerComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__["InputTextComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__["SeparatorComponent"], _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_17__["InputRateComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_18__["TopAlertComponent"], _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_19__["InputButtonComponent"], _components_input_input_multitoggle_input_multitoggle_component__WEBPACK_IMPORTED_MODULE_20__["InputMultitoggleComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_21__["InputTextareaComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWZvcm0tYXZhbGlhci5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "ki7H":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form-concluir/demanda-form-concluir.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: DemandaFormConcluirComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormConcluirComponent", function() { return DemandaFormConcluirComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ "L+jc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ "A5xB");




















const _c0 = ["atividade"];
const _c1 = ["docEntregue"];
function DemandaFormConcluirComponent_separator_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "separator", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "input-button", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("buttonClick", function DemandaFormConcluirComponent_separator_1_Template_input_button_buttonClick_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r5.onNumeroDocumentoEntregaClick($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "input-text", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("collapsed", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx_r0.form.controls.numero_documento_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("control", ctx_r0.form.controls.titulo_documento_entrega);
} }
function DemandaFormConcluirComponent_separator_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "separator", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "calendar-efemerides", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("efemerides", ctx_r3.efemerides);
} }
const _c2 = function () { return { field: "unidade.sigla", label: "Unidade" }; };
const _c3 = function (a0) { return [a0]; };
const _c4 = function (a2) { return ["unidade_id", "=", a2]; };
const _c5 = function () { return ["vinculadas", "=", true]; };
const _c6 = function (a0, a1) { return [a0, a1]; };
const _c7 = function () { return ["cadastros", "atividade"]; };
const _c8 = function (a0) { return { unidade_id: a0 }; };
const _c9 = function (a0) { return { filter: a0 }; };
const _c10 = function (a0, a1) { return { route: a0, params: a1 }; };
class DemandaFormConcluirComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.modalWidth = 700;
        this.complexidades = [];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if ((controlName == "atividade_id" && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) ||
                (controlName == "fator_complexidade" && !(control.value > 0)) ||
                (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
                result = "Obrigatório";
            }
            return result;
        };
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_5__["AtividadeDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__["CalendarService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__["ListenerAllPagesService"]);
        this.form = this.fh.FormBuilder({
            id_processo_entrega: { default: null },
            numero_processo_entrega: { default: null },
            id_documento_entrega: { default: null },
            tipo_documento_entrega_id: { default: null },
            numero_documento_entrega: { default: null },
            titulo_documento_entrega: { default: null },
            atividade_id: { default: null },
            fator_complexidade: { default: 1 },
            data_distribuicao: { default: null },
            tempo_pactuado: { default: 0 },
            prazo_entrega: { default: null },
            data_inicio: { default: null },
            tempo_despendido: { default: 0 },
            data_entrega: { default: null },
            descricao_tecnica: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            formValue.data_entrega = this.auth.hora;
            yield this.atividade.loadSearch(entity.atividade || formValue.atividade_id);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
            this.onDataEntregaChange();
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getDemanda(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    onDataEntregaChange(event) {
        var _a;
        const entrega = this.form.controls.data_entrega.value;
        const inicio = this.entity.data_inicio;
        const cargaHoraria = this.entity.carga_horaria;
        const unidade = this.entity.unidade;
        const pausas = this.entity.pausas || [];
        const afastamentos = ((_a = this.entity.usuario) === null || _a === void 0 ? void 0 : _a.afastamentos) || [];
        this.efemerides = this.util.isDataValid(entrega) ? this.calendar.calculaDataTempo(inicio, entrega, cargaHoraria, unidade, "ENTREGA", pausas, afastamentos) : undefined;
        this.form.controls.tempo_despendido.setValue(this.efemerides.tempoUtil);
        this.cdRef.detectChanges();
    }
    onNumeroDocumentoEntregaClick(event) {
        var _a, _b;
        const numeroDocumentoEntregue = (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.numero_documento_entrega) === null || _b === void 0 ? void 0 : _b.value;
        if (numeroDocumentoEntregue === null || numeroDocumentoEntregue === void 0 ? void 0 : numeroDocumentoEntregue.length) {
            this.docEntregue.loading = true;
            this.allPages.getDadosDocumento(numeroDocumentoEntregue).then(dados => {
                var _a, _b, _c, _d, _e;
                if (dados) {
                    this.form.controls.id_processo_entrega.setValue((_a = dados === null || dados === void 0 ? void 0 : dados.processo) === null || _a === void 0 ? void 0 : _a.id_processo);
                    this.form.controls.numero_processo_entrega.setValue((_b = dados === null || dados === void 0 ? void 0 : dados.processo) === null || _b === void 0 ? void 0 : _b.numero_processo);
                    this.form.controls.id_documento_entrega.setValue((_c = dados === null || dados === void 0 ? void 0 : dados.documento) === null || _c === void 0 ? void 0 : _c.id_documento);
                    //this.form.controls.tipo_documento_entrega_id.setValue(dados.tipo_documento);
                    this.form.controls.numero_documento_entrega.setValue((_d = dados === null || dados === void 0 ? void 0 : dados.documento) === null || _d === void 0 ? void 0 : _d.numero_documento);
                    this.form.controls.titulo_documento_entrega.setValue((_e = dados === null || dados === void 0 ? void 0 : dados.documento) === null || _e === void 0 ? void 0 : _e.titulo_documento);
                }
                else {
                    throw new Error("Documento não encontrado");
                }
            }).catch(error => {
                this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente concluir diretamente pelo botão 'Concluir' acessando o documento no Sei!");
            }).finally(() => {
                this.docEntregue.loading = false;
            });
        }
    }
    onComplexidadeChange(event) {
        var _a, _b;
        console.log("onComplexidadeChange");
        if ((_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj) {
            const atividade = (_b = this.atividade) === null || _b === void 0 ? void 0 : _b.searchObj;
            const fator = this.form.controls.fator_complexidade.value || 1;
            this.form.controls.tempo_pactuado.setValue(atividade.tempo_pactuado * fator || 0);
        }
    }
    onAtividadeSelect(item) {
        var _a;
        console.log("onAtividadeSelect");
        const atividade = item.entity;
        if (atividade) {
            /* Carrega tempo pactuado */
            const fator = this.form.controls.fator_complexidade.value || 1;
            this.form.controls.tempo_pactuado.setValue(atividade.tempo_pactuado * fator || 0);
            /* Carrega complexidades */
            this.complexidades = ((_a = atividade.complexidade) === null || _a === void 0 ? void 0 : _a.map(x => {
                return {
                    key: x.fator,
                    value: x.grau + ' (Fator: ' + x.fator + ')'
                };
            })) || [];
        }
        else {
            this.form.controls.tempo_pactuado.setValue(0);
            this.complexidades = [];
        }
        this.cdRef.detectChanges();
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let demanda = this.util.fill(new src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"](), this.entity);
            demanda = this.util.fillForm(demanda, this.form.value);
            demanda.id = this.entity.id;
            demanda.descricao_tecnica = this.form.controls.descricao_tecnica.value;
            demanda.produtividade = this.calendar.produtividade(demanda.tempo_pactuado, demanda.tempo_despendido);
            this.dao.concluir(demanda).then(saved => resolve(saved)).catch(reject);
        });
    }
    titleEdit(entity) {
        return "Concluindo"; // + (entity?.unidade_id || "");
    }
}
DemandaFormConcluirComponent.ɵfac = function DemandaFormConcluirComponent_Factory(t) { return new (t || DemandaFormConcluirComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
DemandaFormConcluirComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: DemandaFormConcluirComponent, selectors: [["app-demanda-form-concluir"]], viewQuery: function DemandaFormConcluirComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.docEntregue = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 19, vars: 45, consts: [[3, "form", "disabled", "submit", "cancel"], ["transparent", "", "bottom", "", 3, "collapsed", 4, "ngIf"], [1, "row"], ["label", "Atividade", "controlName", "atividade_id", 3, "size", "control", "dao", "groupBy", "where", "selectRoute", "select"], ["atividade", ""], ["label", "Complexidade", "controlName", "fator_complexidade", "labelInfo", "Multiplicador do tempo da atividade", 3, "size", "control", "items"], ["label", "Descri\u00E7\u00E3o t\u00E9cnica", "controlName", "descricao_tecnica", 3, "size", "rows", "control"], ["noIcon", "", "label", "Data de distribui\u00E7\u00E3o", "disabled", "", "controlName", "data_distribuicao", "labelInfo", "Data de cadastro da demanda", 3, "size", "control"], ["label", "Tempo pactuado", "disabled", "", "controlName", "tempo_pactuado", "labelInfo", "Tempo calculado a partir da atividade e utilizando o fator_complexidade", 3, "size", "control"], ["noIcon", "", "label", "Prazo de entrega", "disabled", "", "controlName", "prazo_entrega", "labelInfo", "Data estipulada para entrega da demanda", 3, "size", "control"], ["noIcon", "", "label", "Data de inicio", "disabled", "", "controlName", "data_inicio", "labelInfo", "Data de inicio", 3, "size", "control"], ["label", "Tempo despendido", "disabled", "", "controlName", "tempo_despendido", "labelInfo", "Tempo despendido na atividade (considerando fins de semana, feriados e afastamentos)", 3, "size", "control"], ["noIcon", "", "label", "Data de entrega", "controlName", "data_entrega", "labelInfo", "Data e hora da entrega", 3, "size", "control", "change"], ["entrega", ""], ["title", "C\u00E1lculos das horas", "collapse", "", 4, "ngIf"], ["transparent", "", "bottom", "", 3, "collapsed"], ["label", "N\u00BA doc. entregue", "controlName", "numero_documento_entrega", "labelInfo", "Numero do documento entregue, caso seja o Sei \u00E9 o numero Sei", 3, "size", "control", "buttonClick"], ["docEntregue", ""], ["label", "T\u00EDtulo do documento", "controlName", "titulo_documento_entrega", "disabled", "", "labelInfo", "T\u00EDtulo do documento entregue", 3, "size", "control"], ["title", "C\u00E1lculos das horas", "collapse", ""], [3, "efemerides"]], template: function DemandaFormConcluirComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function DemandaFormConcluirComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormConcluirComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, DemandaFormConcluirComponent_separator_1_Template, 4, 5, "separator", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("select", function DemandaFormConcluirComponent_Template_input_search_select_3_listener($event) { return ctx.onAtividadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "input-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](7, "input-textarea", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "separator");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "input-timer", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "input-timer", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "input-datetime", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function DemandaFormConcluirComponent_Template_input_datetime_change_16_listener($event) { return ctx.onDataEntregaChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, DemandaFormConcluirComponent_separator_18_Template, 2, 1, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.gb.isExtension);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.atividade_id)("dao", ctx.atividadeDao)("groupBy", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](29, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](28, _c2)))("where", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](34, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](31, _c4, ctx.entity == null ? null : ctx.entity.unidade_id), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](33, _c5)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](42, _c10, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](37, _c7), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](40, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](38, _c8, ctx.entity == null ? null : ctx.entity.unidade_id))));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.fator_complexidade)("items", ctx.complexidades);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao_tecnica);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tempo_pactuado);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.prazo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tempo_despendido);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.efemerides);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__["InputSelectComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_12__["InputTextareaComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__["SeparatorComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__["InputDatetimeComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_15__["InputTimerComponent"], _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_16__["InputButtonComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__["InputTextComponent"], _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_18__["CalendarEfemeridesComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWZvcm0tY29uY2x1aXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "kyTh":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form-prorrogar/demanda-form-prorrogar.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: DemandaFormProrrogarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormProrrogarComponent", function() { return DemandaFormProrrogarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");








class DemandaFormProrrogarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "prazo_entrega") {
                if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (control.value.getTime() < this.entity.data_distribuicao.getTime()) {
                    result = "Menor que distribuição!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            data_distribuicao: { default: new Date() },
            prazo_entrega: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = {
                data_distribuicao: entity.data_distribuicao,
                prazo_entrega: entity.prazo_entrega
            };
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getDemanda(this.urlParams.get("id")));
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let prorrogar = {
                demanda_id: this.entity.id,
                prazo_entrega: this.form.controls.prazo_entrega.value
            };
            this.dao.prorrogar(prorrogar).then(saved => resolve(saved)).catch(reject);
        });
    }
    titleEdit(entity) {
        return "Iniciando"; // + (entity?.unidade_id || "");
    }
}
DemandaFormProrrogarComponent.ɵfac = function DemandaFormProrrogarComponent_Factory(t) { return new (t || DemandaFormProrrogarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Injector"])); };
DemandaFormProrrogarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: DemandaFormProrrogarComponent, selectors: [["app-demanda-form-prorrogar"]], viewQuery: function DemandaFormProrrogarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 6, consts: [[3, "form", "disabled", "submit", "cancel"], [1, "row"], ["label", "In\u00EDcio da pausa", "controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de distribui\u00E7\u00E3o da demanda", 3, "size", "control"], ["label", "Prazo de entrega", "controlName", "prazo_entrega", "labelInfo", "Prazo para entrega da atividade", 3, "size", "control"]], template: function DemandaFormProrrogarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function DemandaFormProrrogarComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormProrrogarComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "input-datetime", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "input-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.prazo_entrega);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__["InputDatetimeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWZvcm0tcHJvcnJvZ2FyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "lXLP":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/demanda/demanda-form-iniciar/demanda-form-iniciar.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: DemandaFormIniciarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaFormIniciarComponent", function() { return DemandaFormIniciarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/demanda-dao.service */ "pFvM");
/* harmony import */ var src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/demanda.model */ "QFFC");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");














const _c0 = ["usuario"];
const _c1 = ["plano"];
const _c2 = ["planejado"];
const _c3 = function () { return ["planos.tipo_modalidade:id,nome"]; };
const _c4 = function () { return ["configuracoes", "usuario"]; };
const _c5 = function (a0) { return { route: a0 }; };
class DemandaFormIniciarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"], src_app_dao_demanda_dao_service__WEBPACK_IMPORTED_MODULE_2__["DemandaDaoService"]);
        this.injector = injector;
        this.modalWidth = 600;
        this.iniciadas = [];
        this.planos = [];
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (["usuario_id", "plano_id"].includes(controlName) && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (controlName == "data_inicio" && !control.value) {
                result = "Obrigatório";
            }
            return result;
        };
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioDaoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__["CalendarService"]);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: undefined },
            plano_id: { default: undefined },
            data_distribuicao: { default: new Date() },
            prazo_entrega: { default: new Date() },
            carga_horaria: { default: 0 },
            tempo_planejado: { default: 0 },
            data_inicio: { default: null },
            suspender: { default: false }
        }, this.cdRef, this.validate);
    }
    get labelInfoSuspender() {
        const s = this.iniciadas.length == 1 ? "" : "s";
        const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
        return this.iniciadas.length ? `Suspender a${s}${q} tarefa${s} já iniciada${s}?` : "Não há outras demandas iniciadas pelo usuário!";
    }
    get prazoEmDias() {
        var _a;
        return ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.unidade) && ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(this.entity.unidade.distribuicao_forma_contagem_prazos) ? "" : undefined;
    }
    loadIniciadas(usuario_id) {
        this.iniciadas = [];
        if (usuario_id === null || usuario_id === void 0 ? void 0 : usuario_id.length) {
            this.dao.iniciadas(usuario_id).then(idsIniciadas => {
                this.iniciadas = idsIniciadas;
                this.cdRef.detectChanges();
            });
        }
    }
    onUsuarioSelect(item) {
        var _a;
        const usuario = item.entity;
        const planos = (usuario === null || usuario === void 0 ? void 0 : usuario.planos) || [];
        this.planos = [];
        planos.map(x => {
            var _a;
            this.planos.push({
                key: x.id,
                value: (((_a = x.tipo_modalidade) === null || _a === void 0 ? void 0 : _a.nome) || "") + " - " + this.dao.getDateFormatted(x.data_inicio_vigencia) + " à " + this.dao.getDateFormatted(x.data_fim_vigencia),
                data: x
            });
        });
        if (!((_a = this.form.controls.plano_id.value) === null || _a === void 0 ? void 0 : _a.length) && this.planos.length == 1) {
            this.form.controls.plano_id.setValue(this.planos[0].key);
        }
        this.cdRef.detectChanges();
    }
    onPlanoChange(event) {
        var _a, _b;
        const plano = (_b = (_a = this.plano) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.data;
        const cargaHoraria = (plano === null || plano === void 0 ? void 0 : plano.carga_horaria) || this.calendar.expediente(this.entity.unidade);
        const tempo_planejado = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, this.entity.unidade, "DISTRIBUICAO");
        this.planejado.hoursPerDay = cargaHoraria;
        this.form.controls.carga_horaria.setValue(cargaHoraria);
        this.form.controls.tempo_planejado.setValue(tempo_planejado);
    }
    loadData(entity, form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            if (!((_a = formValue.usuario_id) === null || _a === void 0 ? void 0 : _a.length)) {
                formValue.usuario_id = (_b = this.auth.usuario) === null || _b === void 0 ? void 0 : _b.id;
            }
            formValue.data_inicio = formValue.data_inicio || this.util.setStrTime(new Date(), this.auth.unidadeHora);
            yield this.usuario.loadSearch(entity.usuario || formValue.usuario_id);
            this.loadIniciadas(formValue.usuario_id);
            if (entity.unidade_id != this.auth.unidade.id) {
                yield this.auth.selecionaUnidade(entity.unidade_id);
            }
            form.patchValue(formValue);
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
            let demanda = this.util.fill(new src_app_models_demanda_model__WEBPACK_IMPORTED_MODULE_3__["Demanda"](), this.entity);
            demanda = this.util.fillForm(demanda, this.form.value);
            demanda.id = this.entity.id;
            demanda.suspender = this.form.controls.suspender.value;
            this.dao.iniciar(demanda).then(saved => resolve(saved)).catch(reject);
        });
    }
    titleEdit(entity) {
        return "Iniciando"; // + (entity?.unidade_id || "");
    }
}
DemandaFormIniciarComponent.ɵfac = function DemandaFormIniciarComponent_Factory(t) { return new (t || DemandaFormIniciarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
DemandaFormIniciarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: DemandaFormIniciarComponent, selectors: [["app-demanda-form-iniciar"]], viewQuery: function DemandaFormIniciarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c2, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.plano = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.planejado = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 27, consts: [[3, "form", "disabled", "submit", "cancel"], [1, "row"], ["label", "Data de distribui\u00E7\u00E3o", "controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de cadastro da demanda", 3, "size", "control"], ["label", "Prazo de entrega", "controlName", "prazo_entrega", "disabled", "", "labelInfo", "Data estipulada para entrega da demanda", 3, "size", "control"], ["label", "Respons\u00E1vel", "controlName", "usuario_id", "labelInfo", "Respons\u00E1vel por executar a demanda", 3, "size", "control", "dao", "join", "selectRoute", "select"], ["usuario", ""], ["label", "Plano de trabalho", "controlName", "plano_id", "labelInfo", "Plano de trabalho", 3, "size", "control", "items", "select"], ["plano", ""], ["label", "Planejado", "disabled", "", "controlName", "tempo_planejado", "labelInfo", "Diferen\u00E7a entre data_distribuicao e prazo_entrega em horas (\u00FAteis ou corridas, configurada na unidade)", 3, "onlyDays", "size", "control"], ["planejado", ""], ["label", "Inicio", "controlName", "data_inicio", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["label", "Suspender as demais", "controlName", "suspender", 3, "size", "control", "disabled", "labelInfo"]], template: function DemandaFormIniciarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function DemandaFormIniciarComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function DemandaFormIniciarComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "input-datetime", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "input-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function DemandaFormIniciarComponent_Template_input_search_select_6_listener($event) { return ctx.onUsuarioSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "input-select", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("select", function DemandaFormIniciarComponent_Template_input_select_select_9_listener($event) { return ctx.onPlanoChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "input-timer", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "input-switch", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.data_distribuicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.prazo_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.usuario_id)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](23, _c3))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](25, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](24, _c4)));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.plano_id)("items", ctx.planos);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("onlyDays", ctx.prazoEmDias)("size", 4)("control", ctx.form.controls.tempo_planejado);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.suspender)("disabled", !ctx.iniciadas.length ? "" : undefined)("labelInfo", ctx.labelInfoSuspender);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__["InputDatetimeComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__["InputSelectComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_11__["InputTimerComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZW1hbmRhLWZvcm0taW5pY2lhci5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "nRIp":
/*!**************************************!*\
  !*** ./src/app/models/comentario.ts ***!
  \**************************************/
/*! exports provided: Comentario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comentario", function() { return Comentario; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Comentario extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.texto = ""; /* Texto do comentário */
        this.path = ""; /* Path dos ids dos comentários; */
        this.data_hora = new Date(); /* Data e horário que foi feito o comentário */
        this.tipo = "COMENTARIO"; /* Tipo comentario */
        this.privacidade = "PUBLICO"; /* Tipo comentario */
        this.usuario_id = ""; /* ID do usuário que fez o comentário */
        this.comentario_id = null; /* ID do comentário pai, quando existir */
        this.demanda_id = null; /* ID da demanda que gerou o comentário */
    }
}


/***/ }),

/***/ "pFvM":
/*!********************************************!*\
  !*** ./src/app/dao/demanda-dao.service.ts ***!
  \********************************************/
/*! exports provided: DemandaDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemandaDaoService", function() { return DemandaDaoService; });
/* harmony import */ var _services_util_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/util.service */ "2Rin");
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class DemandaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_1__["DaoBaseService"] {
    constructor(injector) {
        super("Demanda", injector);
        this.injector = injector;
        this.searchFields = ["numero", "assunto"];
    }
    prazo(inicio_data, horas, carga_horaria, unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/prazo', {
                inicio_data: _services_util_service__WEBPACK_IMPORTED_MODULE_0__["UtilService"].dateToIso8601(inicio_data),
                horas: horas,
                carga_horaria: carga_horaria,
                unidade_id: unidade_id
            }).subscribe(response => {
                resolve(_services_util_service__WEBPACK_IMPORTED_MODULE_0__["UtilService"].iso8601ToDate(response === null || response === void 0 ? void 0 : response.date));
            }, error => reject(error));
        });
    }
    getDemanda(id) {
        return this.getById(id, ["pausas", "unidade", "atividade", "plano", "avaliacoes", "usuario", "usuario.afastamentos"]);
    }
    iniciadas(usuario_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/iniciadas', {
                usuario_id: usuario_id
            }).subscribe(response => {
                resolve((response === null || response === void 0 ? void 0 : response.iniciadas) || []);
            }, error => reject(error));
        });
    }
    iniciar(demanda) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/iniciar', this.prepareToSave(demanda)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    concluir(demanda) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/concluir', this.prepareToSave(demanda)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    avaliar(avaliacao) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/avaliar', this.prepareToSave(avaliacao)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    pausar(pausa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pausar', this.prepareToSave(pausa)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    reiniciar(pausa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/reiniciar', this.prepareToSave(pausa)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    cancelarInicio(demanda_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-inicio', { id: demanda_id }).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    cancelarConclusao(demanda_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-conclusao', { id: demanda_id }).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    cancelarAvaliacao(demanda_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-avaliacao', { id: demanda_id }).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
    prorrogar(prorrogar) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/prorrogar', this.prepareToSave(prorrogar)).subscribe(response => {
                resolve(!!(response === null || response === void 0 ? void 0 : response.success));
            }, error => reject(error));
        });
    }
}
DemandaDaoService.ɵfac = function DemandaDaoService_Factory(t) { return new (t || DemandaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"])); };
DemandaDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DemandaDaoService, factory: DemandaDaoService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-demanda-demanda-module.js.map