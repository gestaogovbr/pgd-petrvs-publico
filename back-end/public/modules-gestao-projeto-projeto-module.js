(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-projeto-projeto-module"],{

/***/ "+qyV":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-tarefa-form-principal/projeto-tarefa-form-principal.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: ProjetoTarefaFormPrincipalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoTarefaFormPrincipalComponent", function() { return ProjetoTarefaFormPrincipalComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");










class ProjetoTarefaFormPrincipalComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
}
ProjetoTarefaFormPrincipalComponent.ɵfac = function ProjetoTarefaFormPrincipalComponent_Factory(t) { return new (t || ProjetoTarefaFormPrincipalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoTarefaFormPrincipalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoTarefaFormPrincipalComponent, selectors: [["app-projeto-tarefa-form-principal"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 34, vars: 26, consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["label", "N\u00FAmero", "controlName", "numero", 3, "size"], ["label", "Nome", "controlName", "nome", "labelInfo", "Nome do projeto", 3, "size"], ["label", "Status do projeto", "icon", "bi bi-arrow-up-right-circle", "controlName", "status", 3, "size", "items"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows"], ["label", "Finalidade", "controlName", "finalidade", 3, "size", "rows"], ["title", "Cronograma e progresso"], ["label", "Marco inicial", "icon", "bi bi-check2", "controlName", "marco_inicio", "labelInfo", "Marco in\u00EDcio", 3, "size"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio_projeto", 3, "size"], ["label", "Marco de t\u00E9rminio", "icon", "bi bi-check2", "controlName", "marco_termino", "labelInfo", "Marco in\u00EDcio", 3, "size"], ["date", "", "label", "T\u00E9rmino", "icon", "bi bi-calendar-date", "controlName", "termino_projeto", 3, "size"], ["number", "", "label", "Dura\u00E7\u00E3o", "sufix", "d/h", "controlName", "duracao", 3, "size"], ["number", "", "label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso do projeto (% Conclu\u00EDdo)", 3, "size"], ["title", "Cconfigura\u00E7\u00F5es"], ["label", "Tempo corrido:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "tempo_corrido", "labelInfo", "Tempo corrido", 3, "size"], ["label", "Usa horas:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "usa_horas", "labelInfo", "Usa horas", 3, "size"], ["label", "Intervalo autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "intervalo_automatico", "labelInfo", "Intervalo autom\u00E1tico", 3, "size"], ["label", "Progresso autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "progresso_automatico", "labelInfo", "Progresso autom\u00E1tico", 3, "size"], ["label", "Agrupador:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "agrupador", "labelInfo", "Agrupador", 3, "size"], ["label", "Usa custo:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "usa_custo", "labelInfo", "Usa custo", 3, "size"], ["label", "Aloca recursos no projeto:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "aloca_recursos_projeto", "labelInfo", "Aloca recursos no projeto", 3, "size"], ["label", "Soma aloca\u00E7\u00F5es autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "soma_alocacoes_automatico", "labelInfo", "Soma aloca\u00E7\u00F5es autom\u00E1tico", 3, "size"], ["label", "Possui custos no projeto:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "possui_custos_projeto", "labelInfo", "Possui custos no projeto", 3, "size"], ["label", "Soma custos autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "soma_custos_automatico", "labelInfo", "Soma custos autom\u00E1tico", 3, "size"]], template: function ProjetoTarefaFormPrincipalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "input-number", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "input-text", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input-textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input-textarea", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "separator", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "input-switch", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input-datetime", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "input-number", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "input-text", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "input-switch", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "input-switch", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input-switch", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input-switch", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "input-switch", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "input-switch", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](29, "input-switch", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "input-switch", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "input-switch", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "input-switch", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 4)("items", ctx.lookup.PROJETO_STATUS);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 12)("rows", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 12)("rows", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", 6);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_3__["InputNumberComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_5__["InputSelectComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_6__["InputTextareaComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__["SeparatorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__["InputSwitchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__["InputDatetimeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLXRhcmVmYS1mb3JtLXByaW5jaXBhbC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "/eKj":
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-planejamento/projeto-planejamento.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: ProjetoPlanejamentoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoPlanejamentoComponent", function() { return ProjetoPlanejamentoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/gantt/gantt-models */ "dWNe");
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ "B2HH");
/* harmony import */ var src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto-alocacao.model */ "0e40");
/* harmony import */ var src_app_models_projeto_envolvido_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/projeto-envolvido.model */ "oJZU");
/* harmony import */ var src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/projeto-recurso.model */ "t/HG");
/* harmony import */ var src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/projeto-regra.model */ "I/IY");
/* harmony import */ var src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/projeto-tarefa.model */ "k9Um");
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/projeto.model */ "LZl6");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_gantt_gantt_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/gantt/gantt.component */ "ovw9");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fullcalendar/angular */ "IvIE");
/* harmony import */ var _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/kanban/kanban.component */ "rD7j");























const _c0 = ["planejamentoKanban"];
function ProjetoPlanejamentoComponent_ng_template_0_div_0_profile_picture_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "profile-picture", 17);
} if (rf & 2) {
    const recurso_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("url", recurso_r15.url)("hint", recurso_r15.hint);
} }
function ProjetoPlanejamentoComponent_ng_template_0_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "separator", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_0_div_0_profile_picture_2_Template, 1, 2, "profile-picture", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const card_r10 = ctx_r16.card;
    const metadata_r11 = ctx_r16.metadata;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r12.getRecursos(card_r10.data, metadata_r11));
} }
function ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_badge_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 21);
} if (rf & 2) {
    const status_r18 = ctx.$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", ctx_r17.getStatusColor(status_r18))("icon", status_r18.icon)("label", status_r18.value);
} }
function ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_badge_2_Template, 1, 3, "badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "separator", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const card_r10 = ctx_r19.card;
    const metadata_r11 = ctx_r19.metadata;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r13.getStatus(card_r10.data, metadata_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("button", ctx_r13.addComentarioButton);
} }
function ProjetoPlanejamentoComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, ProjetoPlanejamentoComponent_ng_template_0_div_0_Template, 3, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_Template, 4, 2, "ng-container", 12);
} if (rf & 2) {
    const card_r10 = ctx.card;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", card_r10.data.alocacoes == null ? null : card_r10.data.alocacoes.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !(ctx_r1.filter == null ? null : ctx_r1.filter.controls == null ? null : ctx_r1.filter.controls.resumido == null ? null : ctx_r1.filter.controls.resumido.value));
} }
function ProjetoPlanejamentoComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-select", 22);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx_r3.formEdit.controls.etiqueta)("items", ctx_r3.etiquetasEdit);
} }
function ProjetoPlanejamentoComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "h5", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "h6", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](15, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function ProjetoPlanejamentoComponent_div_15_full_calendar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "full-calendar", 38);
} if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("options", ctx_r20.calendarOptions);
} }
function ProjetoPlanejamentoComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, ProjetoPlanejamentoComponent_div_15_full_calendar_1_Template, 1, 1, "full-calendar", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r7.afterLoadData);
} }
function ProjetoPlanejamentoComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " .... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function ProjetoPlanejamentoComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "kanban", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](1);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](5);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dockers", ctx_r9.labels)("template", _r0)("placeholderTemplate", _r4)("loading", ctx_r9.loading)("swimlaneDrop", ctx_r9.onSwimlaneDrop.bind(ctx_r9))("dockerDragged", ctx_r9.onDragged.bind(ctx_r9))("dockerDrop", ctx_r9.onDrop.bind(ctx_r9))("dockerEditTemplate", _r2)("dockerToggle", ctx_r9.onDockerCollapse.bind(ctx_r9))("dockerEdit", ctx_r9.editEtiquetas.bind(ctx_r9))("dockerSave", ctx_r9.saveEtiquetas.bind(ctx_r9))("dockerDelete", ctx_r9.deleteEtiquetas.bind(ctx_r9))("dockerCancel", ctx_r9.cancelEtiquetas.bind(ctx_r9))("dockerColorStyle", ctx_r9.getLabelStyle);
} }
class ProjetoPlanejamentoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_9__["Projeto"], src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__["ProjetoDaoService"]);
        this.injector = injector;
        this.TITLE_OUTRAS = "Outras";
        this.afterLoadData = false;
        this.cardsVersion = 0;
        this.dragDrop = {};
        this.labels = [];
        this.etiquetas = [];
        this.etiquetasEdit = [];
        this.outrasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.etiquetasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this.calendarOptions = {
            initialView: 'dayGridMonth',
            events: []
        };
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando: " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.modalWidth = screen.availWidth - Math.round(screen.availWidth * 0.1); /* Variar de acordo com a resolução do usuário */
        this.ganttHeight = screen.availHeight - 350 - Math.round(screen.availHeight * 0.1); /* Variar de acordo com a resolução do usuário */
        console.log(this.ganttHeight, screen.availWidth, screen.availHeight);
        this.project = new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttProject"]();
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
        this.filter = this.fh.FormBuilder({
            resumido: { default: false }
        }, this.cdRef, this.validate);
        this.formEdit = this.fh.FormBuilder({
            etiqueta: { default: null }
        });
        this.join = ["tarefas.alocacoes", "tipoProjeto", "usuario", "envolvidos", "regras", "recursos.usuario", "recursos.unidade", "recursos.materialServico", "alocacoes"];
    }
    ngOnInit() {
        super.ngOnInit();
        this.action = "edit";
    }
    isOutras(x) {
        return x.title == this.TITLE_OUTRAS && !x.labels.length;
    }
    incluirLista(docker) {
        var _a;
        this.labels.splice(docker.key + 1, 0, {
            labels: [],
            menu: this.etiquetasButtons,
            cards: [],
            editing: true,
            collapse: false
        });
        (_a = this.planejamentoKanban) === null || _a === void 0 ? void 0 : _a.refreshDoubleScrollbar();
        this.cdRef.detectChanges();
    }
    loadKanbanDockers(projeto) {
        const dockers = (projeto.kanban_dockers || []);
        if (!dockers.find(this.isOutras.bind(this)))
            dockers.splice(0, 0, { title: this.TITLE_OUTRAS, labels: [], collapse: false });
        this.labels = dockers.reduce((a, v) => {
            if (!a.find((x) => { var _a, _b, _c; return (((_a = x.title) === null || _a === void 0 ? void 0 : _a.length) && x.title == v.title) || (((_b = x.labels) === null || _b === void 0 ? void 0 : _b.length) && ((_c = v.labels) === null || _c === void 0 ? void 0 : _c.length) && x.labels[0].key == v.labels[0].key); })) {
                a.push({
                    labels: this.isOutras(v) ? [] : v.labels,
                    title: v.title,
                    menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
                    cards: [],
                    editing: false,
                    collapse: v.collapse
                });
            }
            return a;
        }, []);
    }
    loadKanbanCards(projeto) {
        var _a;
        const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
        this.cardsVersion++;
        (_a = projeto.tarefas) === null || _a === void 0 ? void 0 : _a.filter(row => !row.agrupador).forEach(row => {
            var _a;
            let tarefa = row;
            let docker = undefined;
            tarefa.etiquetas = tarefa.etiquetas || [];
            for (let i = 0; i < tarefa.etiquetas.length; i++) {
                for (let j = 1; j < this.labels.length && !docker; j++) {
                    if (this.labels[j].labels[0].key == tarefa.etiquetas[i].key)
                        docker = this.labels[j];
                }
                if (!this.etiquetas.some(x => x.key == tarefa.etiquetas[i].key))
                    this.etiquetas.push(tarefa.etiquetas[i]);
            }
            this.putCard((docker === null || docker === void 0 ? void 0 : docker.cards) || ((_a = this.labels[outrasIndex]) === null || _a === void 0 ? void 0 : _a.cards) || [], tarefa);
        });
        for (let cards of this.labels.map(x => x.cards || [])) {
            for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++)
                ;
        }
    }
    putCard(list, tarefa) {
        const index = list.findIndex(x => x.id == tarefa.id);
        const card = {
            id: tarefa.id,
            title: tarefa.nome || "DESCONHECIDO",
            subTitle: tarefa.descricao || "",
            data: tarefa,
            version: this.cardsVersion,
            menu: undefined,
            dynamicMenu: this.dynamicCardMenu.bind(this)
        };
        if (index >= 0) {
            list[index] = Object.assign(list[index], card);
        }
        else {
            list.push(card);
        }
    }
    dynamicCardMenu(card) {
        const menu = []; //this.dynamicButtons(card.data);
        menu.push({
            icon: "bi bi-three-dots",
            hint: "Opções",
            dynamicItems: this.cardDynamicOptions.bind(this)
        });
        if (!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join())
            card.menu = menu;
        return card.menu;
    }
    cardDynamicOptions(card) {
        /*const olders = card.menu?.find(x => x.hint == "Opções");
        if(olders) {
          const options = this.dynamicOptions.bind(this)(card.data);
          if(!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join()) olders.items = options;
        }
        return olders?.items;*/
        return [];
    }
    saveEtiquetasProjeto() {
        /* Implementar */
    }
    updateEtiquetasTarefa(dragDrop) {
        var _a, _b;
        const sourceLabel = (_a = this.labels.find(x => x.cards == dragDrop.source.list)) === null || _a === void 0 ? void 0 : _a.labels[0];
        const destinationLabel = (_b = this.labels.find(x => x.cards == dragDrop.destination.list)) === null || _b === void 0 ? void 0 : _b.labels[0];
        const tarefa = dragDrop.destination.tarefa;
        if (sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key)
            return;
        if (sourceLabel)
            tarefa.etiquetas.splice(tarefa.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
        if (destinationLabel)
            tarefa.etiquetas.unshift(destinationLabel);
        //this.loading = true;
        //this.dao!.update(demanda.id, {etiquetas: demanda.etiquetas}).then(demanda => this.modalRefreshId(demanda).modalClose!.bind(this)(demanda.id)).finally(() => this.loading = false);
    }
    onSwimlaneDrop(event, fromIndex) {
        const element = this.labels[fromIndex];
        const toIndex = fromIndex < event.index ? event.index - 1 : event.index;
        this.labels.splice(fromIndex, 1);
        this.labels.splice(toIndex, 0, element);
        this.saveEtiquetasProjeto();
    }
    onDragged(item, list, effect) {
        if (["copy", "move"].includes(effect)) {
            const index = list.indexOf(item);
            this.dragDrop.source = { list, index };
            this.updateEtiquetasTarefa(this.dragDrop);
        }
    }
    onDrop(event, list) {
        if (list && ["copy", "move"].includes(event.dropEffect)) {
            const demanda = event.data.data;
            const card = event.data;
            let index = typeof event.index === "undefined" ? list.length : event.index;
            this.dragDrop = { destination: { list, index, card, demanda } };
        }
    }
    onDockerCollapse(docker, collapse) {
        var _a;
        this.labels[docker.key].collapse = collapse;
        this.saveEtiquetasProjeto();
        (_a = this.planejamentoKanban) === null || _a === void 0 ? void 0 : _a.refreshDoubleScrollbar();
    }
    saveEtiquetas(docker) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const key = this.formEdit.controls.etiqueta.value;
            if (key === null || key === void 0 ? void 0 : key.length) {
                const label = this.labels[docker.key];
                const etiqueta = this.etiquetasEdit.find(x => x.key == key);
                if (etiqueta)
                    label.labels = [etiqueta];
                //if(this.query) this.onQueryLoad(this.query!.rows);
                this.loadKanbanCards(this.entity);
                this.saveEtiquetasProjeto();
                return true;
            }
            return false;
        });
    }
    deleteEtiquetas(docker) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.labels.splice(docker.key, 1);
            (_a = this.planejamentoKanban) === null || _a === void 0 ? void 0 : _a.refreshDoubleScrollbar();
            this.loadKanbanCards(this.entity);
            this.saveEtiquetasProjeto();
        });
    }
    cancelEtiquetas(docker) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const label = this.labels[docker.key];
            if (!((_a = label.labels) === null || _a === void 0 ? void 0 : _a.length)) {
                this.labels.splice(docker.key, 1);
                (_b = this.planejamentoKanban) === null || _b === void 0 ? void 0 : _b.refreshDoubleScrollbar();
            }
        });
    }
    getLabelStyle(label) {
        const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
        //const txtColor = this.util.contrastColor(bgColor);
        return `border-color: ${bgColor} !important;`;
    }
    editEtiquetas(docker) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const label = this.labels[docker.key];
            const allUsed = this.labels.reduce((a, v, i) => {
                if (v.labels.length && i != docker.key)
                    a.push(v.labels[0].key);
                return a;
            }, []);
            this.etiquetasEdit = this.etiquetas.filter(x => !allUsed.includes(x.key));
            this.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
        });
    }
    loadEtiquetas() {
        var _a;
        //this.etiquetas = this.util.merge(row.atividade?.etiquetas_predefinidas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
        this.etiquetas = this.util.merge(this.etiquetas, (_a = this.auth.usuario.config) === null || _a === void 0 ? void 0 : _a.etiquetas, (a, b) => a.key == b.key);
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
            this.project = this.toGantt(entity);
            this.afterLoadData = true;
            this.calendarOptions.events = this.toCalendar(entity);
            this.loadEtiquetas();
            this.loadKanbanDockers(entity);
            this.loadKanbanCards(entity);
            this.cdRef.detectChanges();
        });
    }
    getStatusColor(status) {
        return status.color;
    }
    getRecursos(tarefa, metadata) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let result = [];
        for (let alocacao of tarefa.alocacoes || []) {
            const regra = alocacao.regra ? "\n(" + alocacao.regra.nome + ")" : "";
            const nome = ((_b = (_a = alocacao.recurso) === null || _a === void 0 ? void 0 : _a.nome) === null || _b === void 0 ? void 0 : _b.length) ? alocacao.recurso.nome + "\n" : "";
            switch ((_c = alocacao.recurso) === null || _c === void 0 ? void 0 : _c.tipo) {
                case 'HUMANO':
                    result.push({ url: ((_d = alocacao.recurso.usuario) === null || _d === void 0 ? void 0 : _d.url_foto) || "./assets/images/projetos/usuario.png", hint: nome + "Usuario: " + (((_e = alocacao.recurso.usuario) === null || _e === void 0 ? void 0 : _e.nome) || "(DESCONHECIDO)") + regra });
                    break;
                case 'MATERIAL':
                    result.push({ url: "./assets/images/projetos/material.png", hint: nome + "Material: " + (((_f = alocacao.recurso.material_servico) === null || _f === void 0 ? void 0 : _f.descricao) || "(DESCONHECIDO)") + regra });
                    break;
                case 'SERVICO':
                    result.push({ url: "./assets/images/projetos/servico.png", hint: nome + "Servico: " + (((_g = alocacao.recurso.material_servico) === null || _g === void 0 ? void 0 : _g.descricao) || "(DESCONHECIDO)") + regra });
                    break;
                case 'CUSTO':
                    result.push({ url: "./assets/images/projetos/custo.png", hint: nome + "Valor: " + this.util.formatDecimal(alocacao.recurso.valor) + regra });
                    break;
                case 'DEPARTAMENTO':
                    result.push({ url: "./assets/images/projetos/unidade.png", hint: nome + "Unidade: " + (((_h = alocacao.recurso.unidade) === null || _h === void 0 ? void 0 : _h.nome) || "(DESCONHECIDO)") + regra });
                    break;
            }
        }
        if (metadata) {
            const igual = JSON.stringify(result) == JSON.stringify(metadata.alocacoes);
            metadata.alocacoes = igual ? metadata.alocacoes : result;
            result = metadata.alocacoes;
        }
        return result;
    }
    getStatus(tarefa, metadata) {
        let result = [];
        result.push(this.lookup.PROJETO_TAREFA_STATUS.find(x => x.key == tarefa.status) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-octagon", color: "danger" });
        return result;
    }
    initializeData(form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            /* Nunca acontecerá pois sempre vai para a tela de planejamento editando (Já existindo registro no banco). O formulário do projeto é que é responsável por inserir um novo projeto
            const usuario = this.auth.usuario!;
            let projeto = new Projeto();
            let recurso = new ProjetoRecurso({
              id: this.dao?.generateUuid(),
              usuario: usuario,
              usuario_id: usuario.id,
              nome: usuario.nome,
              tipo: "HUMANO",
              _status: "ADD"
            });
            let regra = new ProjetoRegra({
              id: this.dao?.generateUuid(),
              nome: "Criador"
            });
            let envolvido = new ProjetoEnvolvido({
              recurso_id: recurso.id,
              regra: regra
            });
            projeto.recursos = [recurso];
            projeto.regras = [regra];
            projeto.envolvidos = [envolvido];
            projeto.alocacoes = [];
            await this.loadData(projeto, this.form!);*/
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const projeto = this.util.fill(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_9__["Projeto"](), this.entity);
            resolve(this.util.fillForm(projeto, this.form.value));
        });
    }
    toCalendar(projeto) {
        let result = [];
        (projeto.tarefas || []).forEach(tarefa => {
            if (!tarefa.agrupador) {
                result.push({
                    start: tarefa.inicio,
                    end: tarefa.termino,
                    title: tarefa.nome
                    //color?
                });
            }
        });
        return result;
    }
    toGantt(projeto) {
        let index = 1; /* Indice utilizado globalmente para indexar as tarefas, a tarefa referente ao projeto já inicia com 0 */
        const tarefas = projeto.tarefas || [];
        const toGanttStatus = (status) => {
            const castStatus = {
                PLANEJADO: "STATUS_ACTIVE",
                INICIADO: "STATUS_ACTIVE",
                CONCLUIDO: "STATUS_DONE",
                FALHO: "STATUS_FAILED",
                SUSPENSO: "STATUS_SUSPENDED",
                CANCELADO: "STATUS_FAILED",
                AGUARDANDO: "STATUS_WAITING"
            };
            return castStatus.hasOwnProperty(status) ? castStatus[status] : "STATUS_ACTIVE";
        };
        const toGanttAssignments = (alocacoes) => {
            const toAssignmentDescription = (alocacao) => {
                var _a, _b;
                let result = alocacao.descricao || "";
                if (!result.length) {
                    const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
                    result = ((_a = recurso === null || recurso === void 0 ? void 0 : recurso.usuario) === null || _a === void 0 ? void 0 : _a.nome) || ((_b = recurso === null || recurso === void 0 ? void 0 : recurso.unidade) === null || _b === void 0 ? void 0 : _b.nome) || "";
                }
                return result;
            };
            return (alocacoes || []).map(alocacao => new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttAssignment"]({
                id: alocacao.id,
                resource_id: alocacao.recurso_id,
                role_id: alocacao.regra_id,
                description: toAssignmentDescription(alocacao),
                quantity: alocacao.quantidade || 1
            }));
        };
        const toGanttTask = (tarefa) => {
            return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttTask"]({
                id: tarefa.id,
                index: index++,
                name: tarefa.nome,
                description: tarefa.descricao,
                extra: tarefa,
                progress: tarefa.progresso,
                start: tarefa.inicio,
                end: tarefa.termino,
                duration: tarefa.duracao,
                startIsMilestone: tarefa.inicio_marco,
                endIsMilestone: tarefa.termino_marco,
                hasChild: tarefa.tem_filhos,
                tasks: toTreeGanttTasks(tarefas.filter(x => x.tarefa_pai_id == tarefa.id).sort((a, b) => a.indice > b.indice ? 1 : (a.indice < b.indice ? -1 : 0))),
                status: toGanttStatus(tarefa.status),
                dependencies_ids: [],
                assignments: toGanttAssignments(tarefa.alocacoes || []),
                collapsed: tarefa.contraido
            });
        };
        const toGanttResource = (recurso) => {
            const toGanttResourceType = (tipo) => {
                const castTypes = {
                    HUMANO: "HUMAN",
                    MATERIAL: "MATERIAL",
                    SERVICO: "SERVICE",
                    CUSTO: "COST",
                    DEPARTAMENTO: "DEPARTMENT"
                };
                return castTypes.hasOwnProperty(tipo) ? castTypes[tipo] : "MATERIAL";
            };
            const toGanttPicture = (recurso) => {
                var _a;
                return (recurso.tipo == "HUMANO" ? ((_a = recurso.usuario) === null || _a === void 0 ? void 0 : _a.url_foto) || "/assets/images/projetos/usuario.png" :
                    (recurso.tipo == "CUSTO" ? "/assets/images/projetos/custo.png" :
                        (recurso.tipo == "DEPARTAMENTO" ? "/assets/images/projetos/unidade.png" :
                            (recurso.tipo == "SERVICO" ? "/assets/images/projetos/servico.png" : "/assets/images/projetos/material.png"))));
            };
            const toGanttUnity = (unidade) => {
                const castUnity = {
                    UNIDADE: "UNITY",
                    CAIXA: "BOX",
                    METRO: "METER",
                    KILO: "KILO",
                    LITRO: "LITER",
                    DUZIA: "DOZEN",
                    MONETARIO: "CURRENCY",
                    HORAS: "HOUR",
                    DIAS: "DAY",
                    PACOTE: "PACKAGE"
                };
                return castUnity.hasOwnProperty(unidade) ? castUnity[unidade] : "UNITY";
            };
            return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttResource"]({
                id: recurso.id,
                name: recurso.nome,
                picture: toGanttPicture(recurso),
                type: toGanttResourceType(recurso.tipo),
                unityCost: recurso.valor,
                unity: toGanttUnity(recurso.unidade_medida),
                extra: recurso
            });
        };
        const toGanttRole = (regra) => {
            return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttRole"]({
                id: regra.id,
                name: regra.nome,
                extra: regra
            });
        };
        const toTreeGanttTasks = (children) => {
            return children.map(child => toGanttTask(child));
        };
        let gantt = new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttProject"]({
            tasks: [new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__["GanttTask"]({
                    id: projeto.id,
                    index: 0,
                    name: projeto.nome,
                    description: projeto.descricao,
                    extra: projeto,
                    progress: projeto.progresso,
                    start: projeto.inicio,
                    end: projeto.termino,
                    duration: projeto.duracao,
                    startIsMilestone: false,
                    endIsMilestone: false,
                    hasChild: true,
                    tasks: toTreeGanttTasks(tarefas.filter(x => !x.tarefa_pai_id).sort((a, b) => a.indice > b.indice ? 1 : (a.indice < b.indice ? -1 : 0))),
                    status: toGanttStatus(projeto.status),
                    dependencies_ids: [],
                    assignments: toGanttAssignments([...(projeto.envolvidos || []), ...(projeto.alocacoes || [])]),
                    collapsed: false
                })],
            resources: (projeto.recursos || []).map(x => toGanttResource(x)),
            roles: (projeto.regras || []).map(x => toGanttRole(x))
        });
        return gantt;
    }
    fromGantt(project) {
        let root = this.project.tasks[0];
        let origem = root.extra;
        let index = 1;
        const fromGanttRules = (roles) => {
            return roles.map(role => new src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_7__["ProjetoRegra"]({
                id: role.id,
                nome: role.name,
                projeto_id: projeto.id
            }));
        };
        const fromGanttResources = (resources) => {
            const fromGanttResourceType = (resourceType) => {
                const castTypes = {
                    HUMAN: "HUMANO",
                    MATERIAL: "MATERIAL",
                    SERVICE: "SERVICO",
                    COST: "CUSTO",
                    DEPARTMENT: "DEPARTAMENTO"
                };
                return castTypes.hasOwnProperty(resourceType) ? castTypes[resourceType] : "MATERIAL";
            };
            const fromGanttUnity = (unity) => {
                const castUnity = {
                    UNITY: "UNIDADE",
                    BOX: "CAIXA",
                    METER: "METRO",
                    KILO: "KILO",
                    LITER: "LITRO",
                    DOZEN: "DUZIA",
                    CURRENCY: "MONETARIO",
                    HOUR: "HORAS",
                    DAY: "DIAS",
                    PACKAGE: "PACOTE"
                };
                return castUnity.hasOwnProperty(unity) ? castUnity[unity] : "UNITY";
            };
            return resources.map(resource => new src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_6__["ProjetoRecurso"]({
                nome: resource.name,
                tipo: fromGanttResourceType(resource.type),
                unidade_medida: fromGanttUnity(resource.unity),
                valor: resource.unityCost,
                projeto_id: projeto.id,
                usuario_id: resource.extra.usuario_id,
                unidade_id: resource.extra.unidade_id,
                material_servico_id: resource.extra.material_servico_id
            }));
        };
        const fromGanttStakeholders = (assigns) => {
            let result = [];
            for (let assign of assigns || []) {
                const envolvido = (origem.envolvidos || []).find(x => x.id == assign.id);
                if (envolvido) {
                    result.push(new src_app_models_projeto_envolvido_model__WEBPACK_IMPORTED_MODULE_5__["ProjetoEnvolvido"]({
                        projeto_id: projeto.id,
                        recurso_id: assign.resource_id,
                        regra_id: assign.role_id
                    }));
                }
            }
            return result;
        };
        const fromGanttTasks = (projeto, pai, tasks, path) => {
            var _a;
            let result = {
                custo: 0,
                progresso: 0,
                duracao: 0,
                inicio: null,
                termino: null
            };
            const fromGanttAssignment = (tarefa, origem, assign) => {
                return new src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__["ProjetoAlocacao"]({
                    id: assign.id,
                    descricao: assign.description,
                    quantidade: assign.quantity,
                    recurso_id: assign.resource_id,
                    regra_id: assign.role_id,
                    projeto_id: origem.projeto_id,
                    tarefa_id: origem.tarefa_id
                });
            };
            for (let task of root.tasks || []) {
                let origem = task.extra;
                let tarefa = new src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_8__["ProjetoTarefa"]({
                    id: task.id,
                    indice: index++,
                    path: path,
                    nome: task.name,
                    descricao: task.description,
                    id_processo: origem.id_processo,
                    numero_processo: origem.numero_processo,
                    id_documento: origem.id_documento,
                    numero_documento: origem.numero_documento,
                    inicio: task.start,
                    termino: task.end,
                    duracao: task.duration,
                    progresso: task.progress,
                    inicio_marco: task.startIsMilestone,
                    termino_marco: task.endIsMilestone,
                    tem_filhos: task.hasChild,
                    agrupador: origem.agrupador,
                    soma_progresso_filhos: origem.soma_progresso_filhos,
                    status: origem.status,
                    contraido: task.collapsed,
                    custo: 0,
                    calcula_intervalo: task.hasChild && origem.calcula_intervalo,
                    aloca_proprios_recursos: !task.hasChild || origem.aloca_proprios_recursos,
                    soma_recusos_alocados_filhos: task.hasChild && origem.soma_recusos_alocados_filhos,
                    custos_proprios: !task.hasChild || origem.custos_proprios,
                    soma_custos_filhos: task.hasChild && origem.soma_custos_filhos
                });
                /* custos e alocacoes */
                if (tarefa.aloca_proprios_recursos || tarefa.custos_proprios) {
                    for (let assign of task.assignments || []) {
                        const alocacao = (origem.alocacoes || []).find(x => x.id == assign.id);
                        if (alocacao) {
                            if (tarefa.aloca_proprios_recursos)
                                fromGanttAssignment(tarefa, alocacao, assign);
                            if (tarefa.custos_proprios) {
                                const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
                                tarefa.custo += alocacao.quantidade * ((recurso === null || recurso === void 0 ? void 0 : recurso.valor) || 0);
                            }
                        }
                    }
                }
                /* Totais dos filhos (calculado recursivamente) e insere os filhos como tarefas (se tiver filhos) */
                if (task.hasChild) {
                    let totaisFilhos = fromGanttTasks(projeto, tarefa, task.tasks || [], path + "/" + task.id);
                    /* Atualiza valores pelo total dos filhos */
                    if (tarefa.soma_progresso_filhos)
                        tarefa.progresso = totaisFilhos.progresso;
                    if (tarefa.calcula_intervalo) {
                        tarefa.inicio = totaisFilhos.inicio || tarefa.inicio;
                        tarefa.termino = totaisFilhos.termino || tarefa.termino;
                        tarefa.duracao = totaisFilhos.duracao || tarefa.duracao;
                    }
                }
                /* Calculos feitos para serem retornados, que são utilizados logo aqui acima */
                if (pai.soma_progresso_filhos)
                    result.progresso += task.progress || 0;
                if (pai.calcula_intervalo) {
                    result.inicio = !result.inicio || task.start.getTime() < result.inicio.getTime() ? task.start : result.inicio;
                    result.termino = !result.termino || task.end.getTime() > result.termino.getTime() ? task.end : result.termino;
                }
                //if(pai.soma_recusos_alocados_filhos)  /* Não precisa fazer nada, vai ser concatenado somente para exibição no toGantt */
                if (pai.soma_custos_filhos)
                    result.custo += tarefa.custo;
                /* Adiciona a tarefa ao projeto */
                projeto.tarefas.push(tarefa);
            }
            /* progresso */
            if (pai.soma_progresso_filhos)
                result.progresso = result.progresso / (((_a = root.tasks) === null || _a === void 0 ? void 0 : _a.length) || 1);
            return result;
        };
        let projeto = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_9__["Projeto"]({
            numero: origem.numero,
            nome: root.name,
            descricao: root.description,
            finalidade: origem.finalidade,
            status: origem.status,
            inicio: root.start,
            termino: root.end,
            calcula_custos: origem.calcula_custos,
            tempo_corrido: origem.tempo_corrido,
            usar_horas: origem.usar_horas,
            calcula_intervalo: origem.calcula_intervalo,
            agrupador: origem.agrupador,
            soma_progresso_filhos: origem.soma_progresso_filhos,
            aloca_proprios_recursos: origem.aloca_proprios_recursos,
            soma_recusos_alocados_filhos: origem.soma_recusos_alocados_filhos,
            custos_proprios: origem.custos_proprios,
            soma_custos_filhos: origem.soma_custos_filhos,
            duracao: root.duration,
            progresso: root.progress,
            usuario_id: origem.usuario_id,
            tipo_projeto_id: origem.tipo_projeto_id,
            regras: fromGanttRules(project.roles),
            recursos: fromGanttResources(project.resources),
            envolvidos: fromGanttStakeholders(root.assignments || []),
            alocacoes: [],
            tarefas: []
        });
        /* Carrega as tarefas e alocações recursivamente */
        fromGanttTasks(projeto, projeto, project.tasks || [], "");
        return projeto;
    }
}
ProjetoPlanejamentoComponent.ɵfac = function ProjetoPlanejamentoComponent_Factory(t) { return new (t || ProjetoPlanejamentoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["Injector"])); };
ProjetoPlanejamentoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: ProjetoPlanejamentoComponent, selectors: [["app-projeto-planejamento"]], viewQuery: function ProjetoPlanejamentoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.planejamentoKanban = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 10, consts: [["ticket", ""], ["editDocker", ""], ["placeholder", ""], [3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["planejamentoTabs", ""], ["key", "GANTT", "label", "Principal"], ["key", "CALENDARIO", "label", "Calend\u00E1rio"], ["key", "BURNDOWN", "label", "Burndown"], ["key", "KANBAN", "label", "Quadro"], [3, "project", "height"], ["class", "d-block text-center", "style", "min-height: 400px; max-width: 1000px; margin: auto;", 4, "ngIf"], [4, "ngIf"], ["class", "d-block", 4, "ngIf"], [1, "d-block"], ["title", "Recursos alocados", "small", ""], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"], [1, "card-status-container"], [3, "color", "icon", "label", 4, "ngFor", "ngForOf"], ["title", "Coment\u00E1rios", "small", "", 3, "button"], [3, "color", "icon", "label"], ["controlName", "etiqueta", 3, "size", "control", "items"], [1, "card-body"], [1, "d-flex", "w-100"], [1, "flex-fill"], [1, "card-title", "placeholder-glow"], [1, "placeholder", "col-6"], ["role", "group", "aria-label", "Basic outlined example", 1, "btn-group"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "disabled", "placeholder"], [1, "bi", "bi-question"], [1, "card-subtitle", "mb-2", "text-muted", "placeholder-glow"], [1, "placeholder", "col-8"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-7"], [1, "placeholder", "col-4"], [1, "d-block", "text-center", 2, "min-height", "400px", "max-width", "1000px", "margin", "auto"], [3, "options", 4, "ngIf"], [3, "options"], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle"], ["planejamentoKanban", ""]], template: function ProjetoPlanejamentoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, ProjetoPlanejamentoComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_2_Template, 1, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, ProjetoPlanejamentoComponent_ng_template_4_Template, 16, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "editable-form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function ProjetoPlanejamentoComponent_Template_editable_form_submit_6_listener() { return ctx.onSaveData(); })("cancel", function ProjetoPlanejamentoComponent_Template_editable_form_cancel_6_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "tabs", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "tab", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "tab", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "gantt", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, ProjetoPlanejamentoComponent_div_15_Template, 2, 1, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, ProjetoPlanejamentoComponent_div_16_Template, 2, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, ProjetoPlanejamentoComponent_div_17_Template, 3, 14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("d-none", _r6.active != "GANTT");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("project", ctx.project)("height", ctx.ganttHeight);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _r6.active == "CALENDARIO");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _r6.active == "BURNDOWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _r6.active == "KANBAN");
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__["TabComponent"], _components_gantt_gantt_component__WEBPACK_IMPORTED_MODULE_14__["GanttComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__["SeparatorComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgForOf"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_17__["ProfilePictureComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__["BadgeComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__["InputSelectComponent"], _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_20__["FullCalendarComponent"], _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_21__["KanbanComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLXBsYW5lamFtZW50by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "0e40":
/*!**************************************************!*\
  !*** ./src/app/models/projeto-alocacao.model.ts ***!
  \**************************************************/
/*! exports provided: ProjetoAlocacao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoAlocacao", function() { return ProjetoAlocacao; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class ProjetoAlocacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.descricao = ""; /* Descrição */
        this.quantidade = 1; /* Quantidade */
        this.projeto_id = null;
        this.tarefa_id = null;
        this.recurso_id = "";
        this.regra_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "3yBa":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-alocacoes/projeto-form-alocacoes.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: ProjetoFormAlocacoesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormAlocacoesComponent", function() { return ProjetoFormAlocacoesComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoFormAlocacoesComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
    get items() {
        var _a, _b;
        return ((_a = this.projeto) === null || _a === void 0 ? void 0 : _a.alocacoes) || ((_b = this.tarefa) === null || _b === void 0 ? void 0 : _b.alocacoes) || [];
    }
}
ProjetoFormAlocacoesComponent.ɵfac = function ProjetoFormAlocacoesComponent_Factory(t) { return new (t || ProjetoFormAlocacoesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoFormAlocacoesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoFormAlocacoesComponent, selectors: [["projeto-form-alocacoes"]], inputs: { projeto: "projeto", tarefa: "tarefa" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 0, vars: 0, template: function ProjetoFormAlocacoesComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0tYWxvY2Fjb2VzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "8YSR":
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-tarefa-form/projeto-tarefa-form.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProjetoTarefaFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoTarefaFormComponent", function() { return ProjetoTarefaFormComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../projeto-form-principal/projeto-form-principal.component */ "OkXU");
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../projeto-form-alocacoes/projeto-form-alocacoes.component */ "3yBa");
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ "KuoT");








class ProjetoTarefaFormComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
}
ProjetoTarefaFormComponent.ɵfac = function ProjetoTarefaFormComponent_Factory(t) { return new (t || ProjetoTarefaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoTarefaFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoTarefaFormComponent, selectors: [["app-projeto-tarefa-form"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 8, vars: 3, consts: [[3, "form", "disabled", "title"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], ["key", "ALOCACOES", "label", "Aloca\u00E7\u00F5es"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"]], template: function ProjetoTarefaFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "projeto-form-principal");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "projeto-form-alocacoes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "comentarios");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
    } }, directives: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__["TabComponent"], _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoFormPrincipalComponent"], _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_6__["ProjetoFormAlocacoesComponent"], _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_7__["ComentariosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLXRhcmVmYS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "AQs0":
/*!******************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: ProjetoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoRoutingModule", function() { return ProjetoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ "Vzi9");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "Qhkk");
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ "/eKj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__["ProjetoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Projeto" } },
    { path: 'new', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: ':id/planejamento', component: _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoPlanejamentoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Planejamento", modal: true } },
    { path: ':id/comentar', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Comentar", modal: true } },
    { path: ':id/clonar', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Clonar", modal: true } },
    { path: ':id/recurso', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Recurso", modal: true } },
    { path: ':id/regra', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Regra", modal: true } },
    { path: ':id/alocacao', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Alocação", modal: true } },
    { path: ':id/envolvido', component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__["ProjetoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, data: { title: "Envolvido", modal: true } }
];
class ProjetoRoutingModule {
}
ProjetoRoutingModule.ɵfac = function ProjetoRoutingModule_Factory(t) { return new (t || ProjetoRoutingModule)(); };
ProjetoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: ProjetoRoutingModule });
ProjetoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ProjetoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "B2HH":
/*!********************************************!*\
  !*** ./src/app/dao/projeto-dao.service.ts ***!
  \********************************************/
/*! exports provided: ProjetoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoDaoService", function() { return ProjetoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Projeto", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
ProjetoDaoService.ɵfac = function ProjetoDaoService_Factory(t) { return new (t || ProjetoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ProjetoDaoService, factory: ProjetoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "I/IY":
/*!***********************************************!*\
  !*** ./src/app/models/projeto-regra.model.ts ***!
  \***********************************************/
/*! exports provided: ProjetoRegra */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoRegra", function() { return ProjetoRegra; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class ProjetoRegra extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nome = ""; /* Nome da regra */
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.projeto_id = "";
        this.initialization(data);
    }
}


/***/ }),

/***/ "LZl6":
/*!*****************************************!*\
  !*** ./src/app/models/projeto.model.ts ***!
  \*****************************************/
/*! exports provided: Projeto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projeto", function() { return Projeto; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Projeto extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.numero = 0; /* Número do projeto */
        this.nome = ""; /* Nome do projeto */
        this.descricao = ""; /* Descrição do projeto */
        this.finalidade = ""; /* Descrição do projeto */
        this.status = 'PLANEJADO'; /* Status do projeto */
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.inicio = new Date(); /* Inicio do projeto */
        this.termino = new Date(); /* Fim do projeto */
        this.custo = 0; /* Custo do projeto */
        this.calcula_custos = true; /* Se o projeto calcula custos */
        this.tempo_corrido = false; /* Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas) */
        this.usar_horas = true; /* Se usa horas nas datas */
        this.calcula_intervalo = true; /* Se o termino é calculado automaticamente pelas tarefas */
        this.agrupador = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
        this.soma_progresso_filhos = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
        this.aloca_proprios_recursos = true; /* Se possui recursos próprios */
        this.soma_recusos_alocados_filhos = true; /* Mostra o somatório dos recursos filhos */
        this.custos_proprios = true; /* Se possui custos próprios */
        this.soma_custos_filhos = true; /* Se possui custos filhos */
        this.duracao = 0.00; /* Duração do projeto */
        this.progresso = 0.00; /* Percentual de progresso do projeto */
        this.usuario_id = null;
        this.tipo_projeto_id = "";
        this.kanban_dockers = [];
        this.comentarios = []; /* Comentarios do projeto */
        this.initialization(data);
    }
}


/***/ }),

/***/ "OkXU":
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-principal/projeto-form-principal.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: ProjetoFormPrincipalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormPrincipalComponent", function() { return ProjetoFormPrincipalComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ "B2HH");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");












class ProjetoFormPrincipalComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.projetoDao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_2__["ProjetoDaoService"]);
        this.form = this.fh.FormBuilder({
            numero: { default: "" },
            nome: { default: "" },
            status: { default: "" },
            descricao: { default: "" },
            finalidade: { default: "" },
            marco_inicio: { default: "" },
            inicio_projeto: { default: new Date() },
            marco_termino: { default: "" },
            termino_projeto: { default: new Date() },
            duracao: { default: "" },
            progresso: { default: 0 },
            tempo_corrido: { default: true },
            usa_horas: { default: false },
            intervalo_automatico: { default: true },
            progresso_automatico: { default: true },
            agrupador: { default: false },
            usa_custo: { default: true },
            aloca_recursos_projeto: { default: true },
            soma_alocacoes_automatico: { default: true },
            possui_custos_projeto: { default: true },
            soma_custos_automatico: { default: true }
        }, this.cdRef, this.validate);
        this.join = ["projeto_recurso", "projeto_tarefa", "projeto_alocacao", "projeto_regra", "projeto_envolvido"];
    }
}
ProjetoFormPrincipalComponent.ɵfac = function ProjetoFormPrincipalComponent_Factory(t) { return new (t || ProjetoFormPrincipalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"])); };
ProjetoFormPrincipalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ProjetoFormPrincipalComponent, selectors: [["projeto-form-principal"]], viewQuery: function ProjetoFormPrincipalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 34, vars: 26, consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["label", "N\u00FAmero", "controlName", "numero", 3, "size"], ["label", "Nome", "controlName", "nome", "labelInfo", "Nome do projeto", 3, "size"], ["label", "Status do projeto", "icon", "bi bi-arrow-up-right-circle", "controlName", "status", 3, "size", "items"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows"], ["label", "Finalidade", "controlName", "finalidade", 3, "size", "rows"], ["title", "Cronograma e progresso"], ["label", "Marco inicial", "icon", "bi bi-check2", "controlName", "marco_inicio", "labelInfo", "Marco in\u00EDcio", 3, "size"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio_projeto", 3, "size"], ["label", "Marco de t\u00E9rminio", "icon", "bi bi-check2", "controlName", "marco_termino", "labelInfo", "Marco in\u00EDcio", 3, "size"], ["date", "", "label", "T\u00E9rmino", "icon", "bi bi-calendar-date", "controlName", "termino_projeto", 3, "size"], ["number", "", "label", "Dura\u00E7\u00E3o", "sufix", "d/h", "controlName", "duracao", 3, "size"], ["number", "", "label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso do projeto (% Conclu\u00EDdo)", 3, "size"], ["title", "Cconfigura\u00E7\u00F5es"], ["label", "Tempo corrido:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "tempo_corrido", "labelInfo", "Tempo corrido", 3, "size"], ["label", "Usa horas:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "usa_horas", "labelInfo", "Usa horas", 3, "size"], ["label", "Intervalo autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "intervalo_automatico", "labelInfo", "Intervalo autom\u00E1tico", 3, "size"], ["label", "Progresso autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "progresso_automatico", "labelInfo", "Progresso autom\u00E1tico", 3, "size"], ["label", "Agrupador:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "agrupador", "labelInfo", "Agrupador", 3, "size"], ["label", "Usa custo:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "usa_custo", "labelInfo", "Usa custo", 3, "size"], ["label", "Aloca recursos no projeto:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "aloca_recursos_projeto", "labelInfo", "Aloca recursos no projeto", 3, "size"], ["label", "Soma aloca\u00E7\u00F5es autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "soma_alocacoes_automatico", "labelInfo", "Soma aloca\u00E7\u00F5es autom\u00E1tico", 3, "size"], ["label", "Possui custos no projeto:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "possui_custos_projeto", "labelInfo", "Possui custos no projeto", 3, "size"], ["label", "Soma custos autom\u00E1tico:", "scale", "small", "labelPosition", "right", "icon", "bi bi-check2", "controlName", "soma_custos_automatico", "labelInfo", "Soma custos autom\u00E1tico", 3, "size"]], template: function ProjetoFormPrincipalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "input-number", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "input-text", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "input-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "input-textarea", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "input-textarea", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "separator", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "input-switch", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "input-datetime", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "input-number", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](17, "input-text", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "input-switch", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](21, "input-switch", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "input-switch", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](24, "input-switch", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "input-switch", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](27, "input-switch", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](29, "input-switch", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "input-switch", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "input-switch", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](33, "input-switch", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4)("items", ctx.lookup.PROJETO_STATUS);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("rows", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 12)("rows", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("size", 6);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_4__["InputNumberComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__["InputTextComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__["InputSelectComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_7__["InputTextareaComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__["SeparatorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__["InputSwitchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__["InputDatetimeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0tcHJpbmNpcGFsLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Qhkk":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-list/projeto-list.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjetoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoListComponent", function() { return ProjetoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ "B2HH");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto.model */ "LZl6");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ "uSqO");



















function ProjetoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "toolbar");
} }
function ProjetoListComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r16.numero);
} }
function ProjetoListComponent_ng_template_12_profile_picture_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "profile-picture", 25);
} if (rf & 2) {
    const envolvido_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("url", envolvido_r20.url)("hint", envolvido_r20.hint);
} }
function ProjetoListComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, ProjetoListComponent_ng_template_12_profile_picture_2_Template, 1, 2, "profile-picture", 24);
} if (rf & 2) {
    const row_r17 = ctx.row;
    const metadata_r18 = ctx.metadata;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r17.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r4.getEnvolvidos(row_r17, metadata_r18));
} }
function ProjetoListComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r21.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r21.finalidade);
} }
function ProjetoListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "badge", 27);
} if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r8.util.getDateTimeFormatted(row_r22.inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r8.util.getDateTimeFormatted(row_r22.termino));
} }
function ProjetoListComponent_ng_template_21_badge_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 30);
} }
function ProjetoListComponent_ng_template_21_badge_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 31);
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().row;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r25.util.formatDecimal(row_r23.custo));
} }
function ProjetoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, ProjetoListComponent_ng_template_21_badge_0_Template, 1, 0, "badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, ProjetoListComponent_ng_template_21_badge_2_Template, 1, 1, "badge", 29);
} if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !row_r23.calcula_custos);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", row_r23.calcula_custos);
} }
function ProjetoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "progress-bar", 32);
} if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", row_r27.progresso);
} }
function ProjetoListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 33);
} if (rf & 2) {
    const row_r28 = ctx.row;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMap"](ctx_r14.lookup.getColor(ctx_r14.lookup.PROJETO_STATUS, row_r28.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r14.lookup.getIcon(ctx_r14.lookup.PROJETO_STATUS, row_r28.status))("label", ctx_r14.lookup.getValue(ctx_r14.lookup.PROJETO_STATUS, row_r28.status));
} }
function ProjetoListComponent_column_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "column", 34);
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("onEdit", ctx_r15.edit)("onDelete", ctx_r15.delete)("dynamicOptions", ctx_r15.dynamicOptions.bind(ctx_r15))("dynamicButtons", ctx_r15.dynamicButtons.bind(ctx_r15));
} }
const _c0 = function () { return ["configuracoes", "usuario"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["configuracoes", "unidade"]; };
class ProjetoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__["Projeto"], src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__["ProjetoDaoService"]);
        this.injector = injector;
        this.filterWhere = (filter) => {
            var _a, _b, _c;
            let result = [];
            let form = filter.value;
            if ((_a = form.nome) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            else if (form.status) {
                result.push(["status", "==", form.status]);
            }
            else if ((_b = form.inicio) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["termino", ">=", form.inicio]);
            }
            else if ((_c = form.termino) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["inicio", "=<", form.termino]);
            }
            return result;
        };
        /* Inicializações */
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["UnidadeDaoService"]);
        this.title = this.lex.noun("Projeto", true);
        this.code = "MOD_PROJ";
        this.join = ["envolvidos.recurso.usuario", "envolvidos.recurso.unidade", "envolvidos.regra"];
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            status: { default: null },
            inicio: { default: null },
            termino: { default: null }
        });
    }
    filterClear(filter) {
        filter.controls.nome.setValue("");
        filter.controls.status.setValue(null);
        filter.controls.inicio.setValue(null);
        filter.controls.termino.setValue(null);
        super.filterClear(filter);
    }
    getEnvolvidos(projeto, metadata) {
        var _a, _b;
        let result = [];
        for (let envolvido of projeto.envolvidos || []) {
            if ((_a = envolvido.recurso) === null || _a === void 0 ? void 0 : _a.usuario) {
                result.push({
                    url: envolvido.recurso.usuario.url_foto || "./assets/images/projetos/usuario.png",
                    hint: "Usuario: " + envolvido.recurso.usuario.nome + (envolvido.regra ? "\n(" + envolvido.regra.nome + ")" : "")
                });
            }
            else if ((_b = envolvido.recurso) === null || _b === void 0 ? void 0 : _b.unidade) {
                result.push({
                    url: "./assets/images/projetos/unidade.png",
                    hint: "Usuario: " + envolvido.recurso.unidade.nome + (envolvido.regra ? "\n(" + envolvido.regra.nome + ")" : "")
                });
            }
        }
        if (metadata) {
            const igual = JSON.stringify(result) == JSON.stringify(metadata.envolvidos);
            metadata.envolvidos = igual ? metadata.envolvidos : result;
            result = metadata.envolvidos;
        }
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        let projeto = row;
        const isEnvolvido = !!(projeto.envolvidos || []).find(x => { var _a; return x.recurso.usuario.id == ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id); });
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
        const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'comentar'] }, this.modalRefreshId(projeto)) };
        const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'demanda', projeto.id, 'clonar'] }, this.modalRefresh()) };
        const BOTAO_ALTERAR = { label: "Alterar demanda", icon: "bi bi-pencil-square", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'edit'] }, this.modalRefreshId(projeto)) };
        const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };
        const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        const BOTAO_RECURSOS = { label: "Recursos", icon: "bi bi-tools", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'recurso'] }, this.modalRefreshId(projeto)) };
        const BOTAO_REGRAS = { label: "Regras", icon: "bi bi-diagram-3", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'regra'] }, this.modalRefreshId(projeto)) };
        const BOTAO_ALOCACOES = { label: "Alocações", icon: "bi bi-cart-check", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'alocacao'] }, this.modalRefreshId(projeto)) };
        const BOTAO_ENVOLVIDOS = { label: "Envolvidos", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'envolvido'] }, this.modalRefreshId(projeto)) };
        result.push(BOTAO_INFORMACOES);
        if (isEnvolvido) {
            result.push(BOTAO_PLANEJAR);
            result.push(BOTAO_COMENTARIOS);
            result.push(BOTAO_CLONAR);
            result.push(BOTAO_ALTERAR);
            result.push(BOTAO_EXCLUIR);
            result.push(BOTAO_RECURSOS);
            result.push(BOTAO_REGRAS);
            result.push(BOTAO_ALOCACOES);
            result.push(BOTAO_ENVOLVIDOS);
        }
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        let projeto = row;
        const isEnvolvido = !!(projeto.envolvidos || []).find(x => { var _a; return x.recurso.usuario.id == ((_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id); });
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
        const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };
        if (isEnvolvido) {
            result.push(BOTAO_PLANEJAR);
        }
        else {
            result.push(BOTAO_INFORMACOES);
        }
        return result;
    }
}
ProjetoListComponent.ɵfac = function ProjetoListComponent_Factory(t) { return new (t || ProjetoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["Injector"])); };
ProjetoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: ProjetoListComponent, selectors: [["app-projeto-list"]], viewQuery: function ProjetoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], decls: 31, vars: 44, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["controlName", "usuario_id", 3, "size", "label", "control", "dao", "selectRoute"], ["controlName", "unidade_id", 3, "size", "label", "control", "dao", "selectRoute"], ["title", "#ID", 3, "template"], ["columnNumero", ""], [3, "title", "template"], ["columnNomeEnvolvidos", ""], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["title", "Datas", 3, "template"], ["columnDatas", ""], ["title", "Custo", 3, "template"], ["columnCusto", ""], ["title", "Progresso", 3, "template"], ["columnProgresso", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons", 4, "ngIf"], [3, "rows"], [1, "d-block"], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"], ["color", "light", "icon", "bi bi-box-arrow-right", "hint", "Data de in\u00EDcio", 3, "label"], ["color", "light", "icon", "bi bi-box-arrow-in-right", "hint", "Data de t\u00E9rmino", 3, "label"], ["color", "warning", "icon", "bi bi-dash-square", "label", "N\u00E3o calcula", "hint", "Projeto configurado para n\u00E3o calcular custos", 4, "ngIf"], ["color", "light", "icon", "bi bi-cash-coin", "hint", "Data de t\u00E9rmino", 3, "label", 4, "ngIf"], ["color", "warning", "icon", "bi bi-dash-square", "label", "N\u00E3o calcula", "hint", "Projeto configurado para n\u00E3o calcular custos"], ["color", "light", "icon", "bi bi-cash-coin", "hint", "Data de t\u00E9rmino", 3, "label"], ["color", "success", 3, "value"], [3, "icon", "label"], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons"]], template: function ProjetoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("select", function ProjetoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProjetoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, ProjetoListComponent_ng_template_9_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, ProjetoListComponent_ng_template_12_Template, 3, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, ProjetoListComponent_ng_template_15_Template, 4, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, ProjetoListComponent_ng_template_18_Template, 3, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, ProjetoListComponent_ng_template_21_Template, 3, 2, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, ProjetoListComponent_ng_template_24_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](27, ProjetoListComponent_ng_template_27_Template, 1, 4, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](29, ProjetoListComponent_column_29_Template, 1, 4, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "pagination", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](10);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](13);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](16);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](19);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](22);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](25);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PROJ_INCL"))("hasEdit", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.noun("Usuario"))("control", ctx.filter.controls.usuario_id)("dao", ctx.usuarioDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](39, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](38, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 4)("label", ctx.lex.noun("Unidade"))("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](42, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](41, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", "Nome\nEnvolvido")("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("template", _r13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__["InputSearchComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__["ToolbarComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__["ProfilePictureComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__["BadgeComponent"], _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_17__["ProgressBarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "Vzi9":
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form/projeto-form.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProjetoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormComponent", function() { return ProjetoFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ "B2HH");
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/projeto.model */ "LZl6");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../projeto-form-principal/projeto-form-principal.component */ "OkXU");
/* harmony import */ var _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../projeto-form-recursos/projeto-form-recursos.component */ "sGS7");
/* harmony import */ var _projeto_form_envolvidos_projeto_form_envolvidos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../projeto-form-envolvidos/projeto-form-envolvidos.component */ "pkbW");
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../projeto-form-alocacoes/projeto-form-alocacoes.component */ "3yBa");
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ "KuoT");













class ProjetoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__["Projeto"], src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__["ProjetoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['nome', 'pergunta'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.join = [];
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__["Projeto"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let projeto = this.util.fill(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__["Projeto"](), this.entity);
            projeto = this.util.fillForm(projeto, this.form.value);
            resolve(projeto);
        });
    }
}
ProjetoFormComponent.ɵfac = function ProjetoFormComponent_Factory(t) { return new (t || ProjetoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
ProjetoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: ProjetoFormComponent, selectors: [["app-projeto-form"]], viewQuery: function ProjetoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 3, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], ["key", "RECURSOS", "label", "Recursos"], ["key", "ENVOLVIDOS", "label", "Envolvidos"], ["key", "ALOCACOES", "label", "Aloca\u00E7\u00F5es"], ["key", "REGRAS", "label", "Regras"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"]], template: function ProjetoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function ProjetoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function ProjetoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "projeto-form-principal");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "projeto-form-recursos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "projeto-form-envolvidos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "tab", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "projeto-form-alocacoes");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "tab", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "tab", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "comentarios");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__["TabComponent"], _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_7__["ProjetoFormPrincipalComponent"], _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_8__["ProjetoFormRecursosComponent"], _projeto_form_envolvidos_projeto_form_envolvidos_component__WEBPACK_IMPORTED_MODULE_9__["ProjetoFormEnvolvidosComponent"], _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_10__["ProjetoFormAlocacoesComponent"], _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_11__["ComentariosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "k9Um":
/*!************************************************!*\
  !*** ./src/app/models/projeto-tarefa.model.ts ***!
  \************************************************/
/*! exports provided: ProjetoTarefa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoTarefa", function() { return ProjetoTarefa; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class ProjetoTarefa extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.indice = 0; /* Indice da sequencia da tarefa */
        this.path = ""; /* Path dos nós pais */
        this.nome = ""; /* Nome da tarefa */
        this.descricao = ""; /* Descricao da tarefa */
        this.id_processo = null; /* ID do processo SEI */
        this.numero_processo = null; /* Número do processo SEI */
        this.id_documento = null; /* ID do documento SEI */
        this.numero_documento = null; /* Numero do documento SEI */
        this.inicio = new Date(); /* Inicio da tarefa */
        this.termino = new Date(); /* Fim da tarefa */
        this.duracao = 0.00; /* Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo */
        this.progresso = 0.00; /* Percentual de progresso da tarefa */
        this.inicio_marco = false; /* Se o inicio é um marco */
        this.termino_marco = false; /* Se o termino é um marco */
        this.tem_filhos = false; /* Se é um registro sintético (resumo) */
        this.agrupador = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
        this.soma_progresso_filhos = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
        this.status = "PLANEJADO"; /* Status */
        this.contraido = false; /* Se esta contraído */
        this.custo = 0.00; /* Custo: Será a soma dos recursos, sou a soma dos filhos caso temFilhos e sintetico */
        this.calcula_intervalo = true; /* Se calcula o inicio e termino automaticamente pelos filhos (somente se tem_filhos) */
        this.aloca_proprios_recursos = true; /* Se possui recursos próprios (somente se tem_filhos) */
        this.soma_recusos_alocados_filhos = true; /* Mostra o somatório dos recursos filhos (somente se tem_filhos) */
        this.custos_proprios = true; /* Se possui custos próprios (somente se tem_filhos) */
        this.soma_custos_filhos = true; /* Se possui custos filhos (somente se tem_filhos) */
        this.etiquetas = []; /* Etiquetas */
        this.comentarios = []; /* Comentarios do projeto */
        this.projeto_id = "";
        this.tarefa_pai_id = null;
        this.terefa_projeto_id = null; /* Projeto que será incorporado como uma tarefa */
        this.demanda_id = "";
        this.usuario_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "mH8K":
/*!**********************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto.module.ts ***!
  \**********************************************************/
/*! exports provided: ProjetoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoModule", function() { return ProjetoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projeto-routing.module */ "AQs0");
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ "Qhkk");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ "Vzi9");
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ "/eKj");
/* harmony import */ var _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projeto-form-principal/projeto-form-principal.component */ "OkXU");
/* harmony import */ var _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projeto-form-recursos/projeto-form-recursos.component */ "sGS7");
/* harmony import */ var _projeto_form_envolvidos_projeto_form_envolvidos_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./projeto-form-envolvidos/projeto-form-envolvidos.component */ "pkbW");
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projeto-form-alocacoes/projeto-form-alocacoes.component */ "3yBa");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fullcalendar/angular */ "IvIE");
/* harmony import */ var _projeto_tarefa_form_projeto_tarefa_form_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projeto-tarefa-form/projeto-tarefa-form.component */ "8YSR");
/* harmony import */ var _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./projeto-tarefa-form-principal/projeto-tarefa-form-principal.component */ "+qyV");
/* harmony import */ var _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projeto-form-regras/projeto-form-regras.component */ "mf6K");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
















class ProjetoModule {
}
ProjetoModule.ɵfac = function ProjetoModule_Factory(t) { return new (t || ProjetoModule)(); };
ProjetoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: ProjetoModule });
ProjetoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__["UteisModule"],
            _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_11__["FullCalendarModule"],
            _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__["ProjetoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](ProjetoModule, { declarations: [_projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_2__["ProjetoListComponent"],
        _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_4__["ProjetoFormComponent"],
        _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__["ProjetoPlanejamentoComponent"],
        _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_6__["ProjetoFormPrincipalComponent"],
        _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_7__["ProjetoFormRecursosComponent"],
        _projeto_form_envolvidos_projeto_form_envolvidos_component__WEBPACK_IMPORTED_MODULE_8__["ProjetoFormEnvolvidosComponent"],
        _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_9__["ProjetoFormAlocacoesComponent"],
        _projeto_tarefa_form_projeto_tarefa_form_component__WEBPACK_IMPORTED_MODULE_12__["ProjetoTarefaFormComponent"],
        _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_13__["ProjetoTarefaFormPrincipalComponent"],
        _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_14__["ProjetoFormRegrasComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__["ComponentsModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_10__["UteisModule"],
        _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_11__["FullCalendarModule"],
        _projeto_routing_module__WEBPACK_IMPORTED_MODULE_1__["ProjetoRoutingModule"]] }); })();


/***/ }),

/***/ "mf6K":
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-regras/projeto-form-regras.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ProjetoFormRegrasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormRegrasComponent", function() { return ProjetoFormRegrasComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoFormRegrasComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
    get items() {
        var _a;
        return ((_a = this.projeto) === null || _a === void 0 ? void 0 : _a.regras) || [];
    }
}
ProjetoFormRegrasComponent.ɵfac = function ProjetoFormRegrasComponent_Factory(t) { return new (t || ProjetoFormRegrasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoFormRegrasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoFormRegrasComponent, selectors: [["app-projeto-form-regras"]], inputs: { projeto: "projeto" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function ProjetoFormRegrasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "projeto-form-regras works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0tcmVncmFzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "oJZU":
/*!***************************************************!*\
  !*** ./src/app/models/projeto-envolvido.model.ts ***!
  \***************************************************/
/*! exports provided: ProjetoEnvolvido */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoEnvolvido", function() { return ProjetoEnvolvido; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class ProjetoEnvolvido extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.projeto_id = "";
        this.recurso_id = "";
        this.regra_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "pkbW":
/*!*****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-envolvidos/projeto-form-envolvidos.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: ProjetoFormEnvolvidosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormEnvolvidosComponent", function() { return ProjetoFormEnvolvidosComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoFormEnvolvidosComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
}
ProjetoFormEnvolvidosComponent.ɵfac = function ProjetoFormEnvolvidosComponent_Factory(t) { return new (t || ProjetoFormEnvolvidosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoFormEnvolvidosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoFormEnvolvidosComponent, selectors: [["projeto-form-envolvidos"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 0, template: function ProjetoFormEnvolvidosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "projeto-form-envolvidos works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " public projeto_id: string = \"\";\npublic recurso_id: string = \"\";\npublic regra_id: string | null = null;");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0tZW52b2x2aWRvcy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "sGS7":
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-recursos/projeto-form-recursos.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: ProjetoFormRecursosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoFormRecursosComponent", function() { return ProjetoFormRecursosComponent; });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ProjetoFormRecursosComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
}
ProjetoFormRecursosComponent.ɵfac = function ProjetoFormRecursosComponent_Factory(t) { return new (t || ProjetoFormRecursosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
ProjetoFormRecursosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProjetoFormRecursosComponent, selectors: [["projeto-form-recursos"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, template: function ProjetoFormRecursosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "projeto-form-recursos works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZXRvLWZvcm0tcmVjdXJzb3MuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "t/HG":
/*!*************************************************!*\
  !*** ./src/app/models/projeto-recurso.model.ts ***!
  \*************************************************/
/*! exports provided: ProjetoRecurso */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjetoRecurso", function() { return ProjetoRecurso; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class ProjetoRecurso extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nome = ""; /* Nome do recurso */
        this.tipo = "MATERIAL"; /* Tipo do recurso */
        this.unidade_medida = "UNIDADE"; /* Unidade do recurso */
        this.valor = 0; /* Valor de cursto do recurso */
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data fonal do registro */
        this.projeto_id = "";
        this.usuario_id = null;
        this.unidade_id = null;
        this.material_servico_id = null;
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=modules-gestao-projeto-projeto-module.js.map