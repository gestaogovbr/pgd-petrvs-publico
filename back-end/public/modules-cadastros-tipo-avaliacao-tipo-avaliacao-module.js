(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-cadastros-tipo-avaliacao-tipo-avaliacao-module"],{

/***/ "39+1":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-form/tipo-avaliacao-form.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoAvaliacaoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacaoFormComponent", function() { return TipoAvaliacaoFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ "6eNO");
/* harmony import */ var src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-avaliacao.model */ "br4G");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-justificativa-dao.service */ "qnvs");
/* harmony import */ var src_app_models_tipo_avaliacao_justificativas_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/tipo-avaliacao-justificativas.model */ "eiZ5");
/* harmony import */ var src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/tipo-justificativa.model */ "Lsi6");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-rate/input-rate.component */ "J3H8");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ "q/rX");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ "/VYb");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ "oldG");















class TipoAvaliacaoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__["TipoAvaliacao"], src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoAvaliacaoDaoService"]);
        this.injector = injector;
        this.justificativasLista = [];
        this.tipoJustificativa = new src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_6__["TipoJustificativa"]();
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
        this.tipoJustificativaDao = injector.get(src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoJustificativaDaoService"]);
        this.join = ["tipos_avaliacoes_justificativas", "tipos_avaliacoes_justificativas.tipo_justificativa"];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            nota_atribuida: { default: 0 },
            aceita_entrega: { default: "" },
            pergunta: { default: "" },
            icone: { default: "" },
            cor: { default: "" },
            justificativa_id: { default: "" },
            justificativas: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: null },
        }, this.cdRef, this.validate);
    }
    addItemHandle() {
        let result = undefined;
        if (this.util.validateLookupItem(this.justificativasLista, this.form.controls.justificativa_id.value)) {
            this.tipoJustificativaDao.getById(this.form.controls.justificativa_id.value).then(j => {
                result = {
                    key: j === null || j === void 0 ? void 0 : j.id,
                    value: j === null || j === void 0 ? void 0 : j.nome
                };
                return result;
            });
        }
        return result;
    }
    ;
    loadData(entity, form) {
        var _a;
        let formValue = Object.assign({}, form.value);
        if ((_a = entity.tipos_avaliacoes_justificativas) === null || _a === void 0 ? void 0 : _a.length) {
            entity.tipos_avaliacoes_justificativas.forEach(t => {
                var _a;
                this.justificativasLista.push({
                    key: t.tipo_justificativa_id,
                    value: ((_a = t.tipo_justificativa) === null || _a === void 0 ? void 0 : _a.nome) || "Desconhecido",
                    data: t
                });
            });
        }
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__["TipoAvaliacao"]();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let tipoAvaliacao = this.util.fill(new src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__["TipoAvaliacao"](), this.entity);
            tipoAvaliacao = this.util.fillForm(tipoAvaliacao, this.form.value);
            tipoAvaliacao.tipos_avaliacoes_justificativas = this.justificativasLista.map(j => {
                return j.data ? j.data : Object.assign(new src_app_models_tipo_avaliacao_justificativas_model__WEBPACK_IMPORTED_MODULE_5__["TipoAvaliacaoJustificativa"](), {
                    tipo_justificativa_id: j.key
                });
            });
            resolve(tipoAvaliacao);
        });
    }
}
TipoAvaliacaoFormComponent.ɵfac = function TipoAvaliacaoFormComponent_Factory(t) { return new (t || TipoAvaliacaoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injector"])); };
TipoAvaliacaoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: TipoAvaliacaoFormComponent, selectors: [["app-tipo-avaliacao-form"]], viewQuery: function TipoAvaliacaoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 13, vars: 23, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "controlName", "nome", 3, "size", "control"], ["label", "Nota", "controlName", "nota_atribuida", 3, "size", "control"], ["label", "Aceita Entrega?", "controlName", "aceita_entrega", 3, "size", "control", "items"], ["label", "Pergunta Motivacional", "controlName", "pergunta", 3, "size", "control"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "icone", 3, "size", "control", "items"], ["label", "Cor", "icon", "bi bi-palette", "controlName", "cor", 3, "size", "control"], ["controlName", "justificativas", "label", "Justificativa", 3, "size", "addItemControl", "items"], ["controlName", "justificativa_id", 3, "size", "control", "dao"], ["justificativa", ""]], template: function TipoAvaliacaoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function TipoAvaliacaoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function TipoAvaliacaoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "input-rate", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-radio", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "input-color", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "input-multiselect", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "input-select", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.nota_atribuida);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.aceita_entrega)("items", ctx.lookup.SIMNAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.pergunta);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.icone)("items", ctx.lookup.ICONES);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.cor);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("addItemControl", _r0)("items", ctx.justificativasLista);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.justificativa_id)("dao", ctx.tipoJustificativaDao);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__["InputTextComponent"], _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_9__["InputRateComponent"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__["InputRadioComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__["InputSelectComponent"], _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_12__["InputColorComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_13__["InputMultiselectComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWF2YWxpYWNhby1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "3xHR":
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-list/tipo-avaliacao-list.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: TipoAvaliacaoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacaoListComponent", function() { return TipoAvaliacaoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ "6eNO");
/* harmony import */ var src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-avaliacao.model */ "br4G");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ "f3Td");












function TipoAvaliacaoListComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
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
function TipoAvaliacaoListComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r5 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](row_r5.aceita_entrega ? "Sim" : "N\u00E3o");
} }
class TipoAvaliacaoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__["TipoAvaliacao"], src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__["TipoAvaliacaoDaoService"]);
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
        this.title = "Tipos de " + this.lex.noun("Avaliação", true);
        this.code = "MOD_TIPO_AVAL";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
            nota_atribuida: { default: "" },
            aceita_entrega: { default: "" },
            pergunta: { default: "" },
            icone: { default: "" },
            cor: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
        });
        // Testa se o usuário possui permissão para exibir dados do tipo de avaliação
        if (this.auth.hasPermissionTo("MOD_TIPO_AVAL_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o tipo de avaliação
        if (this.auth.hasPermissionTo("MOD_TIPO_AVAL_EXCL")) {
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
TipoAvaliacaoListComponent.ɵfac = function TipoAvaliacaoListComponent_Factory(t) { return new (t || TipoAvaliacaoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"])); };
TipoAvaliacaoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TipoAvaliacaoListComponent, selectors: [["app-tipo-avaliacao-list"]], viewQuery: function TipoAvaliacaoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 16, vars: 21, consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome do tipo da avalia\u00E7\u00E3o", "controlName", "nome", "placeholder", "Nome do tipo da avalia\u00E7\u00E3o", 3, "size", "control"], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["title", "Nota", "field", "nota_atribuida"], ["title", "Aceita entrega", 3, "template"], ["columnAceita_entrega", ""], ["title", "Pergunta Motivacional", "field", "pergunta"], ["type", "options", 3, "onEdit", "options"], [3, "rows"]], template: function TipoAvaliacaoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "filter", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "input-text", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "column", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, TipoAvaliacaoListComponent_ng_template_7_Template, 3, 7, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, TipoAvaliacaoListComponent_ng_template_11_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "pagination", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](8);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_AVAL_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_AVAL_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, directives: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__["ToolbarComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__["InputTextComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__["ColumnComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__["PaginationComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aXBvLWF2YWxpYWNhby1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "QTRA":
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-routing.module.ts ***!
  \***********************************************************************************/
/*! exports provided: TipoAvaliacaoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacaoRoutingModule", function() { return TipoAvaliacaoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-avaliacao-form/tipo-avaliacao-form.component */ "39+1");
/* harmony import */ var _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tipo-avaliacao-list/tipo-avaliacao-list.component */ "3xHR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_4__["TipoAvaliacaoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Tipos de Avaliação" } },
    { path: 'new', component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAvaliacaoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: ':id/edit', component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAvaliacaoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_3__["TipoAvaliacaoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
];
class TipoAvaliacaoRoutingModule {
}
TipoAvaliacaoRoutingModule.ɵfac = function TipoAvaliacaoRoutingModule_Factory(t) { return new (t || TipoAvaliacaoRoutingModule)(); };
TipoAvaliacaoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: TipoAvaliacaoRoutingModule });
TipoAvaliacaoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TipoAvaliacaoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Wv9z":
/*!***************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao.module.ts ***!
  \***************************************************************************/
/*! exports provided: TipoAvaliacaoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacaoModule", function() { return TipoAvaliacaoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-avaliacao-routing.module */ "QTRA");
/* harmony import */ var _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-avaliacao-form/tipo-avaliacao-form.component */ "39+1");
/* harmony import */ var _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-avaliacao-list/tipo-avaliacao-list.component */ "3xHR");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class TipoAvaliacaoModule {
}
TipoAvaliacaoModule.ɵfac = function TipoAvaliacaoModule_Factory(t) { return new (t || TipoAvaliacaoModule)(); };
TipoAvaliacaoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: TipoAvaliacaoModule });
TipoAvaliacaoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoAvaliacaoRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](TipoAvaliacaoModule, { declarations: [_tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__["TipoAvaliacaoFormComponent"],
        _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_3__["TipoAvaliacaoListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_1__["TipoAvaliacaoRoutingModule"]] }); })();


/***/ }),

/***/ "br4G":
/*!************************************************!*\
  !*** ./src/app/models/tipo-avaliacao.model.ts ***!
  \************************************************/
/*! exports provided: TipoAvaliacao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacao", function() { return TipoAvaliacao; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoAvaliacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.nota_atribuida = 0; /* Nota atribuida de 0 a 10 */
        this.nome = ""; /* Descrição da nota atribuida */
        this.aceita_entrega = 1; /* Se a entrega vai ser aceita e as horas pactuadas serão homologadas */
        this.pergunta = ""; /* Pergunta motivacional, o porque você selecionou essa nota */
        this.icone = ""; /* Classe do icone relacionado a avaliação */
        this.cor = ""; /* Código da cor em hex */
        this.tipos_avaliacoes_justificativas = [];
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.initialization(data);
    }
}


/***/ }),

/***/ "eiZ5":
/*!***************************************************************!*\
  !*** ./src/app/models/tipo-avaliacao-justificativas.model.ts ***!
  \***************************************************************/
/*! exports provided: TipoAvaliacaoJustificativa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAvaliacaoJustificativa", function() { return TipoAvaliacaoJustificativa; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoAvaliacaoJustificativa extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.tipo_avaliacao_id = "";
        this.tipo_justificativa_id = "";
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=modules-cadastros-tipo-avaliacao-tipo-avaliacao-module.js.map