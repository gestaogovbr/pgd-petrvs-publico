(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-tipo-modalidade-tipo-modalidade-module"],{

/***/ "YK8h":
/*!*************************************************!*\
  !*** ./src/app/models/tipo-modalidade.model.ts ***!
  \*************************************************/
/*! exports provided: TipoModalidade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidade", function() { return TipoModalidade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoModalidade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nome = ""; /* Nome da modalidade */
        this.plano_trabalho_assinatura_participante = 1; /* Exigir assinatura do usuário no plano de trabalho */
        this.plano_trabalho_assinatura_gestor_unidade = 0; /* Exigir assinatura do gestor da unidade */
        this.plano_trabalho_assinatura_gestor_entidade = 0; /* Exigir assinatura do gestor da entidade */
        this.plano_trabalho_calcula_horas = 0; /* Se o plano de trabalho calcula horas (considerando a carga horaria e os dias) */
        this.atividade_tempo_despendido = 0; /* Se calcula tempo despendido na atividade */
        this.atividade_esforco = 0; /* Se utiliza esforço (tempo para execução) na atividade */
        this.initialization(data);
    }
}


/***/ }),

/***/ "kYq8":
/*!*****************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-modalidade/tipo-modalidade.module.ts ***!
  \*****************************************************************************/
/*! exports provided: TipoModalidadeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidadeModule", function() { return TipoModalidadeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tipo_modalidade_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-modalidade-routing.module */ "zap8");
/* harmony import */ var _tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-modalidade-form/tipo-modalidade-form.component */ "o68b");
/* harmony import */ var _tipo_modalidade_list_tipo_modalidade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-modalidade-list/tipo-modalidade-list.component */ "p4qa");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class TipoModalidadeModule {
}
TipoModalidadeModule.ɵfac = function TipoModalidadeModule_Factory(t) { return new (t || TipoModalidadeModule)(); };
TipoModalidadeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: TipoModalidadeModule });
TipoModalidadeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _tipo_modalidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoModalidadeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](TipoModalidadeModule, { declarations: [_tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_2__["TipoModalidadeFormComponent"],
        _tipo_modalidade_list_tipo_modalidade_list_component__WEBPACK_IMPORTED_MODULE_3__["TipoModalidadeListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _tipo_modalidade_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoModalidadeRoutingModule"]] }); })();


/***/ }),

/***/ "o68b":
/*!**********************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-modalidade/tipo-modalidade-form/tipo-modalidade-form.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: TipoModalidadeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidadeFormComponent", function() { return TipoModalidadeFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-modalidade.model */ "YK8h");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");









class TipoModalidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__["TipoModalidade"], src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoModalidadeDaoService"]);
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
            return "Editando " + this.lex.translate("Tipo de Modalidade") + ': ' + ((entity === null || entity === void 0 ? void 0 : entity.nome) || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            plano_trabalho_assinatura_participante: { default: true },
            plano_trabalho_assinatura_gestor_unidade: { default: false },
            plano_trabalho_assinatura_gestor_entidade: { default: false },
            plano_trabalho_calcula_horas: { default: false },
            atividade_tempo_despendido: { default: false },
            atividade_esforco: { default: false },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__["TipoModalidade"]());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoModalidade = this.util.fill(new src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__["TipoModalidade"](), this.entity);
            resolve(this.util.fillForm(tipoModalidade, this.form.value));
        });
    }
}
TipoModalidadeFormComponent.ɵfac = function TipoModalidadeFormComponent_Factory(t) { return new (t || TipoModalidadeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoModalidadeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoModalidadeFormComponent, selectors: [["app-modalidade-form"]], viewQuery: function TipoModalidadeFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 11, vars: 18, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "controlName", "nome", 3, "size"], ["transparent", "", 3, "title"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_participante", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_unidade", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_entidade", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_calcula_horas", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "atividade_tempo_despendido", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "atividade_esforco", 3, "size", "label"]], template: function TipoModalidadeFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function TipoModalidadeFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function TipoModalidadeFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "separator", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-switch", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "input-switch", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "input-switch", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "input-switch", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "separator", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "input-switch", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "input-switch", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", "Configura\u00E7\u00F5es " + ctx.lex.translate("plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Exige assinatura " + ctx.lex.translate("usu\u00E1rio") + ctx.lex.translate("plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("unidade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("entidade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Se o " + ctx.lex.translate("plano de trabalho") + " calcula horas (considerando a carga hor\u00E1ria e os dias)");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", "Configura\u00E7\u00F5es " + ctx.lex.translate("atividade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Calcula " + ctx.lex.translate("tempo despendido") + ctx.lex.translate("atividade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Usa " + ctx.lex.translate("esfor\u00E7o") + " (tempo para execu\u00E7\u00E3o)" + ctx.lex.translate("atividade"));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__["InputTextComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_6__["SeparatorComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLW1vZGFsaWRhZGUtZm9ybS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "p4qa":
/*!**********************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-modalidade/tipo-modalidade-list/tipo-modalidade-list.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: TipoModalidadeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidadeListComponent", function() { return TipoModalidadeListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-modalidade.model */ "YK8h");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");














function TipoModalidadeListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "toolbar");
} }
function TipoModalidadeListComponent_ng_template_8_badge_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 16);
} }
function TipoModalidadeListComponent_ng_template_8_badge_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 17);
} }
function TipoModalidadeListComponent_ng_template_8_badge_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 18);
} }
function TipoModalidadeListComponent_ng_template_8_badge_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 19);
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("label", "Usa horas no " + ctx_r9.lex.translate("plano de trabalho"));
} }
function TipoModalidadeListComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TipoModalidadeListComponent_ng_template_8_badge_1_Template, 1, 0, "badge", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TipoModalidadeListComponent_ng_template_8_badge_2_Template, 1, 0, "badge", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TipoModalidadeListComponent_ng_template_8_badge_3_Template, 1, 0, "badge", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, TipoModalidadeListComponent_ng_template_8_badge_4_Template, 1, 1, "badge", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r5 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r5.plano_trabalho_assinatura_participante);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r5.plano_trabalho_assinatura_gestor_unidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r5.plano_trabalho_assinatura_gestor_entidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r5.plano_trabalho_calcula_horas);
} }
function TipoModalidadeListComponent_ng_template_11_badge_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 22);
} }
function TipoModalidadeListComponent_ng_template_11_badge_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 23);
} }
function TipoModalidadeListComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TipoModalidadeListComponent_ng_template_11_badge_1_Template, 1, 0, "badge", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TipoModalidadeListComponent_ng_template_11_badge_2_Template, 1, 0, "badge", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r10.atividade_tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", row_r10.atividade_esforco);
} }
class TipoModalidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_modalidade_model__WEBPACK_IMPORTED_MODULE_2__["TipoModalidade"], src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoModalidadeDaoService"]);
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
        this.title = this.lex.translate("Tipos de Modalidade");
        this.code = "MOD_TIPO_MDL";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            atividades_homologadas: { default: "" },
            dispensa_avaliacao: { default: "" },
            exige_assinatura: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" }
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de modalidade
        if (this.auth.hasPermissionTo("MOD_TIPO_MDL_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de modalidade
        if (this.auth.hasPermissionTo("MOD_TIPO_MDL_EXCL")) {
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
TipoModalidadeListComponent.ɵfac = function TipoModalidadeListComponent_Factory(t) { return new (t || TipoModalidadeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoModalidadeListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoModalidadeListComponent, selectors: [["app-tipo-modalidade-list"]], viewQuery: function TipoModalidadeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 15, vars: 26, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", "placeholder", "Nome...", 3, "size", "label", "control"], ["title", "Descri\u00E7\u00E3o", "field", "nome"], [3, "title", "template"], ["columnPlanoTrabalho", ""], ["columnAtividade", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "one-per-line"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do participante", 4, "ngIf"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do gestor da unidade", 4, "ngIf"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do gestor da entidade", 4, "ngIf"], ["color", "light", "icon", "bi bi-clock", 3, "label", 4, "ngIf"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do participante"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do gestor da unidade"], ["color", "light", "icon", "bi bi-pen", "label", "Assinatura do gestor da entidade"], ["color", "light", "icon", "bi bi-clock", 3, "label"], ["color", "light", "icon", "bi bi-hourglass-bottom", "label", "Assinatura do participante", 4, "ngIf"], ["color", "light", "icon", "bi bi-stopwatch", "label", "Assinatura do gestor da unidade", 4, "ngIf"], ["color", "light", "icon", "bi bi-hourglass-bottom", "label", "Assinatura do participante"], ["color", "light", "icon", "bi bi-stopwatch", "label", "Assinatura do gestor da unidade"]], template: function TipoModalidadeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("select", function TipoModalidadeListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TipoModalidadeListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, TipoModalidadeListComponent_ng_template_8_Template, 5, 4, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, TipoModalidadeListComponent_ng_template_11_Template, 3, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "pagination", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](9);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_MDL_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_MDL_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("label", "Nome " + ctx.lex.translate("tipo de Modalidade"))("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx.lex.translate("Plano de trabalho"))("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx.lex.translate("Atividade"))("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__["BadgeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLW1vZGFsaWRhZGUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "zap8":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-modalidade/tipo-modalidade-routing.module.ts ***!
  \*************************************************************************************/
/*! exports provided: TipoModalidadeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoModalidadeRoutingModule", function() { return TipoModalidadeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-modalidade-form/tipo-modalidade-form.component */ "o68b");
/* harmony import */ var _tipo_modalidade_list_tipo_modalidade_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tipo-modalidade-list/tipo-modalidade-list.component */ "p4qa");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _tipo_modalidade_list_tipo_modalidade_list_component__WEBPACK_IMPORTED_MODULE_4__["TipoModalidadeListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Modalidade" } },
    { path: 'new', component: _tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoModalidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão de Tipo de Modalidade", modal: true } },
    { path: ':id/edit', component: _tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoModalidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição de Tipo de Modalidade", modal: true } },
    { path: ':id/consult', component: _tipo_modalidade_form_tipo_modalidade_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoModalidadeFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consulta a Tipo de Modalidade", modal: true } }
];
class TipoModalidadeRoutingModule {
}
TipoModalidadeRoutingModule.ɵfac = function TipoModalidadeRoutingModule_Factory(t) { return new (t || TipoModalidadeRoutingModule)(); };
TipoModalidadeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: TipoModalidadeRoutingModule });
TipoModalidadeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TipoModalidadeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-tipo-modalidade-tipo-modalidade-module.js.map