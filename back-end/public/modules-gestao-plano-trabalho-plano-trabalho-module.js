(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-plano-trabalho-plano-trabalho-module"],{

/***/ "5QEa":
/*!********************************************************!*\
  !*** ./src/app/models/plano-trabalho-entrega.model.ts ***!
  \********************************************************/
/*! exports provided: PlanoTrabalhoEntrega */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoEntrega", function() { return PlanoTrabalhoEntrega; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoTrabalhoEntrega extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.descricao = "";
        this.forca_trabalho = "1";
        this.plano_trabalho_id = "";
        this.entrega_id = null;
        this.plano_entrega_entrega_id = null;
        this.initialization(data);
    }
}


/***/ }),

/***/ "AMF9":
/*!************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho.module.ts ***!
  \************************************************************************/
/*! exports provided: PlanoTrabalhoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoModule", function() { return PlanoTrabalhoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plano-trabalho-routing.module */ "wbO2");
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ "PLav");
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ "fLNm");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ "OCEv");
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ "rmC2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ "np0s");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ "kHdc");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ "zUlN");
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../uteis/documentos/documentos-badge/documentos-badge.component */ "xctW");
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/grid/report/report.component */ "4Ttn");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ "f3Td");

























class PlanoTrabalhoModule {
}
PlanoTrabalhoModule.ɵfac = function PlanoTrabalhoModule_Factory(t) { return new (t || PlanoTrabalhoModule)(); };
PlanoTrabalhoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: PlanoTrabalhoModule });
PlanoTrabalhoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_1__["PlanoTrabalhoRoutingModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](PlanoTrabalhoModule, { declarations: [_plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_2__["PlanoTrabalhoFormComponent"],
        _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoTrabalhoListComponent"],
        _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_8__["PlanoTrabalhoListEntregaComponent"],
        _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_7__["PlanoTrabalhoFormTermoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_1__["PlanoTrabalhoRoutingModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"]] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetComponentScope"](_plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoTrabalhoListComponent"], [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_10__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_16__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__["ColumnComponent"], _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_8__["PlanoTrabalhoListEntregaComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_20__["OrderComponent"], _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_21__["DocumentosBadgeComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_22__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_23__["PaginationComponent"]], []);


/***/ }),

/***/ "OCEv":
/*!****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-form-termo/plano-trabalho-form-termo.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: PlanoTrabalhoFormTermoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoFormTermoComponent", function() { return PlanoTrabalhoFormTermoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ "hgR2");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/navigate.service */ "RANn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-display/input-display.component */ "3pJ9");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ "sRLT");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");






















const _c0 = ["usuario"];
const _c1 = ["unidade"];
const _c2 = ["programa"];
const _c3 = ["tipoDocumento"];
const _c4 = ["tipoModalidade"];
class PlanoTrabalhoFormTermoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_10__["PlanoTrabalho"], src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanoTrabalhoDaoService"]);
        this.injector = injector;
        this.validate = (control, controlName) => {
            var _a, _b, _c, _d, _e;
            let result = null;
            if (controlName == "tipo_documento_id" && !((_a = control === null || control === void 0 ? void 0 : control.value) === null || _a === void 0 ? void 0 : _a.length) && ((_e = (_d = (_c = (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls) === null || _c === void 0 ? void 0 : _c.numero_processo) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a, _b;
            if (!((_a = this.tipoDocumento) === null || _a === void 0 ? void 0 : _a.searchObj) && ((_b = form === null || form === void 0 ? void 0 : form.controls.tipo_documento_id.value) === null || _b === void 0 ? void 0 : _b.length)) {
                return "Aguarde o carregamento do tipo de documento";
            }
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando "; //+ (entity?.nome || "");
        };
        this.join = ["unidade", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos", "atividades.atividade"];
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__["ProgramaDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__["UsuarioDaoService"]);
        this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__["TipoDocumentoDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["TipoModalidadeDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__["DocumentoDaoService"]);
        this.form = this.fh.FormBuilder({
            carga_horaria: { default: "" },
            tempo_total: { default: "" },
            tempo_proporcional: { default: "" },
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() },
            programa_id: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            documento_id: { default: "" },
            documentos: { default: [] },
            tipo_documento_id: { default: "" },
            numero_processo: { default: "" },
            vinculadas: { default: true },
            tipo_modalidade_id: { default: "" },
            forma_contagem_carga_horaria: { default: "DIA" }
        }, this.cdRef, this.validate);
    }
    onVinculadasChange(event) {
        this.cdRef.detectChanges();
    }
    loadData(entity, form) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            formValue = this.util.fillForm(formValue, entity);
            yield Promise.all([
                this.unidade.loadSearch(entity.unidade || entity.unidade_id),
                this.usuario.loadSearch(entity.usuario || entity.usuario_id),
                this.programa.loadSearch(entity.programa || entity.programa_id),
                this.tipoModalidade.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
            ]);
            if (this.processo) {
                formValue.id_processo = this.processo.id_processo;
                formValue.numero_processo = this.processo.numero_processo;
            }
            formValue.data_inicio = this.auth.hora;
            form.patchValue(formValue);
        });
    }
    initializeData(form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.entity = (yield this.dao.getById(this.metadata.plano_trabalho.id, this.join));
            this.processo = (_a = this.metadata) === null || _a === void 0 ? void 0 : _a.processo;
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            //if(this.processo) {
            resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__["NavigateResult"](Object.assign(this.form.value, {
                /* TODO Gerar documento do TCR
                termo: this.termo!.conteudo,
                atividades_termo_adesao: this.termo!.atividades.map((x: { nome: string; }) => this.util.removeAcentos(x.nome.toLowerCase())),*/
                codigo_tipo_documento: (_b = (_a = this.tipoDocumento) === null || _a === void 0 ? void 0 : _a.searchObj) === null || _b === void 0 ? void 0 : _b.codigo
            })));
            /*} else {
              const documento = Object.assign(new Documento(), {
                especie: "TERMO_ADESAO",
                conteudo: this.termo!.conteudo,
                plano_id: this.entity!.id,
                status: "GERADO"
              });
              this.documentoDao.save(documento).then(doc => resolve(undefined)).catch(reject);
            }*/
        });
    }
    get formaContagemCargaHoraria() {
        var _a, _b;
        const forma = ((_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.forma_contagem_carga_horaria) === null || _b === void 0 ? void 0 : _b.value) || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
}
PlanoTrabalhoFormTermoComponent.ɵfac = function PlanoTrabalhoFormTermoComponent_Factory(t) { return new (t || PlanoTrabalhoFormTermoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["Injector"])); };
PlanoTrabalhoFormTermoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: PlanoTrabalhoFormTermoComponent, selectors: [["plano-trabalho-form-termo"]], viewQuery: function PlanoTrabalhoFormTermoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c4, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoDocumento = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]], decls: 25, vars: 38, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["collapse", "", 3, "title", "collapsed"], [1, "row"], ["disabled", "", "controlName", "programa_id", 3, "size", "dao"], ["programa", ""], ["disabled", "", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["disabled", "", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["disabled", "", "controlName", "tipo_modalidade_id", 3, "size", "dao"], ["tipoModalidade", ""], ["numbers", "", "disabled", "", "label", "% prod.", "icon", "bi bi-hourglass-split", "controlName", "ganho_produtividade", 3, "size", "control", "labelInfo"], ["label", "H. Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["disabled", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "C. Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio", 3, "size", "unit", "control"], ["label", "H. Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["disabled", "", "label", "Data e hora", "controlName", "data_inicio", "labelInfo", "Data de cadastro do termo", 3, "size", "control"], ["controlName", "numero_processo", "disabled", "", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "label", "size", "control"], ["controlName", "tipo_documento_id", 3, "size", "disabled", "dao"], ["tipoDocumento", ""], ["label", "Vinculadas", "controlName", "vinculadas", "labelInfo", "Se inclui as atividades das unidades vinculadas a unidade do plano", 3, "disabled", "size", "control", "change"]], template: function PlanoTrabalhoFormTermoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function PlanoTrabalhoFormTermoComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanoTrabalhoFormTermoComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "separator", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "input-text", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "input-display", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](15, "input-datetime", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](16, "input-datetime", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](17, "input-workload", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](18, "input-display", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](20, "input-datetime", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](21, "input-text", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](22, "input-search", 19, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "input-switch", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function PlanoTrabalhoFormTermoComponent_Template_input_switch_change_24_listener($event) { return ctx.onVinculadasChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.noun("Plano de trabalho"))("collapsed", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("dao", ctx.programaDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 5)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("dao", ctx.tipoModalidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.ganho_produtividade)("labelInfo", "Percentual de ganho de produtividade (Ser\u00E1 descontado do " + ctx.lex.noun("tempo pactuado") + ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.tempo_proporcional);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("unit", ctx.formaContagemCargaHoraria)("control", ctx.form.controls.carga_horaria);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_total);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", "N\u00FAmero " + ctx.lex.noun("Processo"))("size", 3)("control", ctx.form.controls.numero_processo);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("disabled", !(ctx.form.controls.numero_processo.value == null ? null : ctx.form.controls.numero_processo.value.length) ? "true" : undefined)("dao", ctx.tipoDocumentoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", (ctx.entity == null ? null : ctx.entity.atividades == null ? null : ctx.entity.atividades.length) ? "true" : undefined)("size", 2)("control", ctx.form.controls.vinculadas);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__["SeparatorComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__["InputTextComponent"], _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_17__["InputDisplayComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__["InputDatetimeComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_19__["InputWorkloadComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_20__["InputSwitchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby10cmFiYWxoby1mb3JtLXRlcm1vLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "PLav":
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-form/plano-trabalho-form.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: PlanoTrabalhoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoFormComponent", function() { return PlanoTrabalhoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ "lKXT");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var src_app_models_plano_trabalho_atividade_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/plano-trabalho-atividade.model */ "h1e6");
/* harmony import */ var src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/models/plano-trabalho-entrega.model */ "5QEa");
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ "hgR2");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/modules/uteis/documentos/documento.service */ "B+/1");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../plano-trabalho.service */ "g7eN");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/modules/uteis/templates/template.service */ "G6YU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ "sRLT");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ "A5xB");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ "rmC2");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ "7B2Z");
/* harmony import */ var _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../uteis/documentos/documentos.component */ "jO9R");




































const _c0 = ["gridAtividades"];
const _c1 = ["gridDocumentos"];
const _c2 = ["tabs"];
const _c3 = ["usuario"];
const _c4 = ["tipoModalidade"];
const _c5 = ["planoEntrega"];
const _c6 = ["atividade"];
const _c7 = ["entrega"];
const _c8 = ["documentos"];
function PlanoTrabalhoFormComponent_ng_container_14_separator_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "separator", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "calendar-efemerides", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("efemerides", ctx_r9.horasTotais)("partial", false);
} }
function PlanoTrabalhoFormComponent_ng_container_14_separator_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "separator", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "calendar-efemerides", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("efemerides", ctx_r10.horasParciais);
} }
function PlanoTrabalhoFormComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "input-workload", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_ng_container_14_Template_input_workload_change_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](); return ctx_r11.onCargaHorariaChenge($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input-timer", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "input-timer", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](5, PlanoTrabalhoFormComponent_ng_container_14_separator_5_Template, 2, 2, "separator", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, PlanoTrabalhoFormComponent_ng_container_14_separator_6_Template, 2, 1, "separator", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("unit", ctx_r4.formaContagemCargaHoraria)("control", ctx_r4.form.controls.carga_horaria)("unitChange", ctx_r4.onFormaContagemCargaHorariaChange.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r4.form.controls.tempo_total);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r4.form.controls.tempo_proporcional);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r4.horasTotais);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r4.horasParciais);
} }
function PlanoTrabalhoFormComponent_top_alert_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "top-alert", 27);
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("message", "Antes de incluir " + ctx_r5.lex.noun("entrega", true) + " neste " + ctx_r5.lex.noun("Plano de Trabalho") + ", \u00E9 necess\u00E1rio selecionar um " + ctx_r5.lex.noun("Plano de Entregas") + "!");
} }
function PlanoTrabalhoFormComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "editable-form", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "plano-trabalho-list-entrega", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx_r6.formEntregas)("noButtons", "true");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("entity", ctx_r6.entity)("entregasDoPlanoEntrega", ctx_r6.entregas);
} }
function PlanoTrabalhoFormComponent_tab_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "tab", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "separator", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "input-switch", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input-editor", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "separator", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](5, "input-switch", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](6, "input-editor", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", "Texto complementar da " + ctx_r7.lex.noun("unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar na " + ctx_r7.lex.noun("unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", ctx_r7.form.controls.editar_texto_complementar_unidade.value ? undefined : "true")("dataset", ctx_r7.planoDataset);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar do " + ctx_r7.lex.noun("usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", ctx_r7.form.controls.editar_texto_complementar_usuario.value ? undefined : "true")("dataset", ctx_r7.planoDataset);
} }
function PlanoTrabalhoFormComponent_tab_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "tab", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "documentos", 38, 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("entity", ctx_r8.entityDocumentos)("cdRef", ctx_r8.cdRef)("needSign", ctx_r8.planoTrabalhoService.needSign)("extraTags", ctx_r8.planoTrabalhoService.extraTags)("editingId", ctx_r8.documentoId)("datasource", ctx_r8.datasource)("template", ctx_r8.template);
} }
const _c9 = function () { return ["entregas.entrega", "unidade.entidade", "programa.template_tcr"]; };
const _c10 = function () { return ["afastamentos"]; };
const _c11 = function () { return ["usuario_id"]; };
const _c12 = function () { return ["usuario_id", "tipo_modalidade_id"]; };
class PlanoTrabalhoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_14__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalho"], src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_4__["PlanoTrabalhoDaoService"]);
        this.injector = injector;
        this.entregas = [];
        this._entityDocumentos = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalho"]();
        this.validateAtividades = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == 'atividade_id' && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validateEntregas = (control, controlName) => {
            var _a;
            let result = null;
            if (controlName == 'entrega_id' && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            return result;
        };
        this.validate = (control, controlName) => {
            var _a;
            let result = null;
            if (['usuario_id', 'plano_entrega_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            if (['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            if (['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
                if (!this.util.isDataValid(control.value)) {
                    result = "Inválido";
                }
            }
            else if (this.programa && controlName == 'data_inicio_vigencia' && control.value.getTime() < this.programa.data_inicio_vigencia.getTime()) {
                result = "Menor que programa";
            }
            else if (this.programa && controlName == 'data_fim_vigencia' && control.value.getTime() > this.programa.data_fim_vigencia.getTime()) {
                result = "Maior que programa";
            }
            return result;
        };
        this.formValidation = (form) => {
            var _a;
            if ((_a = this.gridAtividades) === null || _a === void 0 ? void 0 : _a.editing) {
                this.tabs.active = "ATIVIDADES";
                return "Salve ou cancele o registro atual em edição";
            }
            // Validar se o unidade & programa & plano de entrega são interlidados
            // Validar se as entregas pertencem ao plano de entregas da unidade
            // Validar o período está dentro do plano de entregas
            // Validar se o usuários está habilitado no programa
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando "; //+ (entity?.nome || "");
        };
        this.join = ["unidade.entidade", "entregas.entrega", "entregas.plano_entrega_entrega:id,plano_entrega_id", "plano_entrega.entregas.entrega", "plano_entrega.unidade.entidade", "plano_entrega.programa",
            "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "atividades.atividade", "entregas.plano_entrega_entrega.entrega"];
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__["ProgramaDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__["UsuarioDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_18__["UnidadeDaoService"]);
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__["PlanoEntregaDaoService"]);
        this.documentoService = injector.get(src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_15__["DocumentoService"]);
        this.templateService = injector.get(src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_19__["TemplateService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_16__["CalendarService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoModalidadeDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__["DocumentoDaoService"]);
        this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_17__["PlanoTrabalhoService"]);
        this.modalWidth = 1200;
        this.planoDataset = this.dao.dataset();
        this.form = this.fh.FormBuilder({
            carga_horaria: { default: "" },
            tempo_total: { default: "" },
            tempo_proporcional: { default: "" },
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() },
            usuario_id: { default: "" },
            plano_entrega_id: { default: "" },
            documento_id: { default: null },
            documentos: { default: [] },
            atividades: { default: [] },
            entregas: { default: [] },
            tipo_modalidade_id: { default: "" },
            forma_contagem_carga_horaria: { default: "DIA" },
            editar_texto_complementar_unidade: { default: false },
            editar_texto_complementar_usuario: { default: false },
            unidade_texto_complementar: { default: "" },
            usuario_texto_complementar: { default: "" }
        }, this.cdRef, this.validate);
        this.formAtividades = this.fh.FormBuilder({
            atividade_id: { default: "" }
        }, this.cdRef, this.validateAtividades);
        this.formEntregas = this.fh.FormBuilder({
            nome: { default: "" },
            entrega_id: { default: "" }
        }, this.cdRef, this.validateEntregas);
    }
    ngOnInit() {
        var _a;
        super.ngOnInit();
        const segment = (this.url ? (_a = this.url[this.url.length - 1]) === null || _a === void 0 ? void 0 : _a.path : "") || "";
        this.action = ["termos"].includes(segment) ? segment : this.action;
    }
    get datasource() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        /* _entityDocumentos é atualizado pelo angular na chamada do get entityDocumentos() */
        let data = this.dao.datasource(this._entityDocumentos);
        /* Atualiza os campos de texto complementar do usuário e da unidade */
        data.usuario.texto_complementar_plano = this.form.controls.usuario_texto_complementar.value || "";
        data.unidade.texto_complementar_plano = this.form.controls.unidade_texto_complementar.value || "";
        if (JSON.stringify(data) != this.JSON.stringify(this._datasource)) {
            this._datasource = data;
            /* Se o termo for um documento obrigatório, então será gerado um termo automaticamente */
            this.documentoId = undefined;
            if ((_a = this.programa) === null || _a === void 0 ? void 0 : _a.termo_obrigatorio) {
                this.documentoId = this.form.controls.documento_id.value;
                let documentos = this.form.controls.documentos.value || [];
                let documento = documentos === null || documentos === void 0 ? void 0 : documentos.find((x) => x.id == this.documentoId);
                if (!((_b = this.documentoId) === null || _b === void 0 ? void 0 : _b.length) || !documento || ((_c = documento.assinaturas) === null || _c === void 0 ? void 0 : _c.length) || documento.tipo == "LINK") {
                    this.documentoId = (_d = this.dao) === null || _d === void 0 ? void 0 : _d.generateUuid(),
                        documentos.push(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_10__["Documento"]({
                            id: this.documentoId,
                            tipo: "HTML",
                            especie: "TCR",
                            titulo: "Termo de Ciência e Responsabilidade",
                            conteudo: this.templateService.renderTemplate(((_e = this.programa.template_tcr) === null || _e === void 0 ? void 0 : _e.conteudo) || "", this._datasource),
                            status: "GERADO",
                            _status: "ADD",
                            template: (_f = this.programa.template_tcr) === null || _f === void 0 ? void 0 : _f.conteudo,
                            dataset: this.dao.dataset(),
                            datasource: this._datasource,
                            entidade_id: (_g = this.auth.entidade) === null || _g === void 0 ? void 0 : _g.id,
                            plano_trabalho_id: (_h = this.entity) === null || _h === void 0 ? void 0 : _h.id,
                            template_id: this.programa.template_tcr_id
                        }));
                    this.form.controls.documento_id.setValue(this.documentoId);
                    this.form.controls.documentos.setValue(documentos);
                }
            }
        }
        return this._datasource;
    }
    get template() {
        /* _entityDocumentos é atualizado pelo angular na chamada do get entityDocumentos() */
        return this.planoTrabalhoService.template(this._entityDocumentos);
    }
    get isTermos() {
        return this.action == "termos";
    }
    updateEntregas(planoEntrega) {
        var _a;
        this.entregas = ((_a = planoEntrega === null || planoEntrega === void 0 ? void 0 : planoEntrega.entregas) === null || _a === void 0 ? void 0 : _a.map(x => { var _a; return Object.assign({}, { key: x.id, value: ((_a = x.entrega) === null || _a === void 0 ? void 0 : _a.nome) || x.descricao, data: x }); })) || [];
    }
    onPlanoEntregaSelect(selected) {
        var _a, _b, _c, _d, _e;
        let planoEntrega = selected.entity;
        this.updateEntregas(planoEntrega);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_inicio_vigencia.updateValueAndValidity();
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.data_fim_vigencia.updateValueAndValidity();
        this.programa = planoEntrega === null || planoEntrega === void 0 ? void 0 : planoEntrega.programa;
        this.unidade = planoEntrega === null || planoEntrega === void 0 ? void 0 : planoEntrega.unidade;
        this.form.controls.forma_contagem_carga_horaria.setValue(((_d = (_c = this.unidade) === null || _c === void 0 ? void 0 : _c.entidade) === null || _d === void 0 ? void 0 : _d.forma_contagem_carga_horaria) || "DIA");
        this.form.controls.unidade_texto_complementar.setValue(((_e = this.unidade) === null || _e === void 0 ? void 0 : _e.texto_complementar_plano) || "");
        this.calculaTempos();
        this.cdRef.detectChanges();
    }
    onUsuarioSelect(selected) {
        var _a;
        this.form.controls.usuario_texto_complementar.setValue(((_a = selected.entity) === null || _a === void 0 ? void 0 : _a.texto_complementar_plano) || "");
        this.calculaTempos();
        this.cdRef.detectChanges();
    }
    onDataInicioChange(event) {
        this.calculaTempos();
    }
    onDataFimChange(event) {
        this.calculaTempos();
    }
    onCargaHorariaChenge(event) {
        this.calculaTempos();
    }
    calculaTempos() {
        var _a, _b, _c, _d;
        const inicio = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_inicio_vigencia.value;
        const fim = (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.data_fim_vigencia.value;
        const carga = ((_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.carga_horaria.value) || 8;
        const usuario = (_d = this.usuario) === null || _d === void 0 ? void 0 : _d.searchObj;
        if (usuario && this.unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim)) {
            this.calendar.loadFeriadosCadastrados(this.unidade.id).then((feriados) => {
                var _a, _b;
                this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.unidade, "ENTREGA", [], []);
                this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, this.unidade, "ENTREGA", [], usuario.afastamentos);
                (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
                (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
            });
        }
    }
    loadData(entity, form) {
        var _a, _b, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.updateEntregas(entity.plano_entrega);
            yield Promise.all([
                this.calendar.loadFeriadosCadastrados(entity.unidade_id),
                (_a = this.usuario) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.usuario || entity.usuario_id),
                (_b = this.tipoModalidade) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id),
                (_c = this.planoEntrega) === null || _c === void 0 ? void 0 : _c.loadSearch(entity.plano_entrega || entity.plano_entrega_id)
            ]);
            let formValue = Object.assign({}, form.value);
            form.patchValue(this.util.fillForm(formValue, entity));
            let documento = entity.documentos.find(x => x.id == entity.documento_id);
            if (documento)
                this._datasource = documento.datasource;
            this.calculaTempos();
            this.cdRef.detectChanges();
        });
    }
    initializeData(form) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.isTermos) {
                this.entity = (yield this.dao.getById(this.urlParams.get("id"), this.join));
            }
            else {
                this.entity = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalho"]();
                this.entity.carga_horaria = ((_a = this.auth.entidade) === null || _a === void 0 ? void 0 : _a.carga_horaria_padrao) || 8;
                this.entity.forma_contagem_carga_horaria = ((_b = this.auth.entidade) === null || _b === void 0 ? void 0 : _b.forma_contagem_carga_horaria) || "DIA";
            }
            yield this.loadData(this.entity, this.form);
        });
    }
    /* Atividades */
    addAtividades() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new src_app_models_plano_trabalho_atividade_model__WEBPACK_IMPORTED_MODULE_11__["PlanoTrabalhoAtividade"]({ plano_trabalho_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id, _status: "ADD" });
        });
    }
    loadAtividades(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.atividade_id.setValue(row.atividade_id);
        });
    }
    removeAtividades(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            row._status = "DELETE";
            return false;
        });
    }
    saveAtividades(form, row) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            row.atividade_id = form.controls.atividade_id.value;
            row.atividade = (_a = this.atividade) === null || _a === void 0 ? void 0 : _a.searchObj;
            row._status = row._status == "ADD" ? row._status : "EDIT";
            /*this.dialog.showSppinerOverlay("Carregando dados da atividade...");
            try {
              row.atividade = await this.atividadeDao?.getById(row.atividade_id)!;
            } finally {
              this.dialog.closeSppinerOverlay();
            }*/
            return row;
        });
    }
    /* Entregas */
    addEntregas() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_12__["PlanoTrabalhoEntrega"]({ plano_trabalho_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id, _status: "ADD" });
        });
    }
    loadEntregas(form, row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.entrega_id.setValue(row.entrega_id);
            form.controls.nome.setValue(row.nome);
        });
    }
    removeEntregas(row) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            row._status = "DELETE";
            return false;
        });
    }
    saveEntregas(form, row) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            row.entrega_id = form.controls.entrega_id.value;
            row.entrega = (_b = (_a = this.entrega) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.data;
            row.nome = form.controls.nome.value;
            row._status = row._status == "ADD" ? row._status : "EDIT";
            return row;
        });
    }
    /* Gera o objeto entity baseado nas informações atuais do formulário para ser utilizado por Documentos */
    get entityDocumentos() {
        let plano = this.loadEntity();
        /* Remove campo de documentos para comparar */
        plano.documentos = [];
        this._entityDocumentos.documentos = [];
        if (JSON.stringify(plano) != JSON.stringify(this._entityDocumentos)) {
            this._entityDocumentos = plano;
        }
        /* Atribui novamente o campo de documentos */
        this._entityDocumentos.documentos = this.form.controls.documentos.value;
        return this._entityDocumentos;
    }
    /* Cria um objeto Plano baseado nos dados do formulário */
    loadEntity() {
        var _a, _b;
        let plano = this.util.fill(new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalho"](), this.entity);
        plano = this.util.fillForm(plano, this.form.value);
        plano.usuario = this.usuario.searchObj;
        plano.unidade = (((_a = this.entity) === null || _a === void 0 ? void 0 : _a.unidade) || this.unidade);
        plano.programa = (((_b = this.entity) === null || _b === void 0 ? void 0 : _b.programa) || this.programa);
        plano.tipo_modalidade = this.tipoModalidade.searchObj;
        return plano;
    }
    saveData(form) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let plano = this.loadEntity();
            /* Confirma dados do documento */
            (_a = this.documentos) === null || _a === void 0 ? void 0 : _a.saveData();
            /* Remove os ids gerados para os novos unidades_origem_atividades, será gerado pelo servidor como UUID */
            /*     plano.atividades = plano.atividades.filter((atividade: PlanoAtividade) => {
                  atividade.id = atividade.id.includes("-") ? atividade.id : "";
                  return ["ADD", "EDIT", "DELETE"].includes(atividade._status || "")
                }); */
            plano.documentos = plano.documentos.filter((documento) => {
                return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
            });
            /* Salva separadamente as informações do plano */
            this.submitting = true;
            try {
                this.entity = yield this.dao.save(plano);
                if (this.form.controls.editar_texto_complementar_unidade.value) {
                    yield this.unidadeDao.update(plano.unidade_id, { texto_complementar_plano: this.form.controls.unidade_texto_complementar.value });
                }
                if (this.form.controls.editar_texto_complementar_usuario.value) {
                    yield this.usuarioDao.update(plano.unidade_id, { texto_complementar_plano: this.form.controls.usuario_texto_complementar.value });
                }
            }
            finally {
                this.submitting = false;
            }
            return true;
        });
    }
    documentoDynamicButtons(row) {
        let result = [];
        let documento = row;
        if (this.isTermos && this.planoTrabalhoService.needSign(this.entity, documento)) {
            result.push({ hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
        }
        result.push({ hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento) => { this.dialog.html({ title: "Termo de adesão", modalWidth: 1000 }, documento.conteudo || ""); }).bind(this) });
        return result;
    }
    /*public needSign(documento: Documento): boolean {
      const tipoModalidade = this.entity!.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
      const usuario = this.entity!.usuario!; // (this.usuario?.searchObj as Usuario);
      const unidade = this.entity!.unidade!; // (this.unidade?.searchObj as Unidade);
      const entidade = unidade?.entidade;
      const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
      let ids: string[] = [];
      if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
      if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
      if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
      return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario!.id);
    }*/
    signDocumento(documento) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.documentoService.sign([documento]);
            this.cdRef.detectChanges();
            /*this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
              if(response) {
                this.loading = true;
                this.documentoDao.assinar([documento.id]).then(response => {
                  if(response?.length) {
                    let documentos = (this.form!.controls.documentos.value || []) as Documento[];
                    let found = documentos.find(x => x.id == documento?.id);
                    if(found) found.assinaturas = response[0].assinaturas;
                    this.form!.controls.documentos.setValue(documentos);
                    this.gridDocumentos?.reset();
                  }
                }).finally(() => this.loading = false);
              }
            });*/
        });
    }
    get formaContagemCargaHoraria() {
        var _a;
        //const forma = (this.unidade?.searchObj as Unidade)?.entidade?.forma_contagem_carga_horaria || this.auth.unidade?.entidade?.forma_contagem_carga_horaria || "DIA";
        //console.log("FORMA: ", (this.unidade?.searchObj as Unidade)?.entidade?.forma_contagem_carga_horaria, this.auth.unidade?.entidade?.forma_contagem_carga_horaria);
        const forma = ((_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.forma_contagem_carga_horaria.value) || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
    onFormaContagemCargaHorariaChange(unit) {
        this.form.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
    }
    addDocumento() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const documento = new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_10__["Documento"]();
            documento.id = this.dao.generateUuid();
            documento.plano_trabalho_id = this.entity.id;
            documento.especie = "TCR";
            documento._status = "ADD";
            this.go.navigate({ route: ['gestao', 'plano', 'termo'] }, { metadata: { documento: documento, plano_trabalho: this.entity }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            let documentos = (this.form.controls.documentos.value || []);
                            if (this.isTermos) {
                                this.clearErros();
                                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                try {
                                    modalResult = yield this.documentoDao.save(Object.assign(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_10__["Documento"](), {
                                        especie: "TCR",
                                        conteudo: modalResult === null || modalResult === void 0 ? void 0 : modalResult.termo,
                                        plano_trabalho_id: this.entity.id,
                                        status: "GERADO"
                                    }), ["assinaturas.usuario:id,nome,apelido"]);
                                }
                                catch (error) {
                                    this.error(error.message ? error.message : error);
                                    modalResult = undefined;
                                }
                                finally {
                                    this.dialog.closeSppinerOverlay();
                                }
                            }
                            if (modalResult) {
                                documentos.push(modalResult);
                                this.form.controls.documentos.setValue(documentos);
                                this.dialog.showSppinerOverlay("Recarregando dados do plano");
                                yield this.initializeData(this.form);
                                this.dialog.closeSppinerOverlay();
                            }
                            this.cdRef.detectChanges();
                        }))();
                    }
                } });
            return undefined;
        });
    }
    isVigente(documento) {
        return this.form.controls.documento_id.value == documento.id;
    }
    onProcessoClick(row) {
        this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
    }
}
PlanoTrabalhoFormComponent.ɵfac = function PlanoTrabalhoFormComponent_Factory(t) { return new (t || PlanoTrabalhoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["Injector"])); };
PlanoTrabalhoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({ type: PlanoTrabalhoFormComponent, selectors: [["plano-trabalho-form"]], viewQuery: function PlanoTrabalhoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c7, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c8, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.documentos = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 28, consts: [[3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title"], ["tabs", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["controlName", "plano_entrega_id", 3, "size", "disabled", "dao", "join", "select"], ["planoEntrega", ""], ["controlName", "usuario_id", 3, "size", "dao", "join", "select"], ["usuario", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "'In\u00EDcio da Vig\u00EAncia do '+ lex.noun('Plano de trabalho')", 3, "size", "control", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "'Final da Vig\u00EAncia do ' +lex.noun('Plano de trabalho')", 3, "size", "control", "change"], ["controlName", "tipo_modalidade_id", 3, "size", "dao"], ["tipoModalidade", ""], [4, "ngIf"], [3, "title"], ["type", "warning", 3, "message", 4, "ngIf"], ["key", "MENSAGENS", "label", "Texto Complementar", 4, "ngIf"], ["key", "TERMO", "label", "Termo", 4, "ngIf"], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio (M\u00E1x.: di\u00E1ria 24 horas; semana 24*5=240 horas; mensal 24*20=480 horas)", 3, "size", "unit", "control", "unitChange", "change"], ["onlyHours", "", "disabled", "", "label", "Horas Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["onlyHours", "", "disabled", "", "label", "Horas Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["title", "C\u00E1lculos das horas totais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas parciais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas totais", "collapse", ""], [3, "efemerides", "partial"], ["title", "C\u00E1lculos das horas parciais", "collapse", ""], [3, "efemerides"], ["type", "warning", 3, "message"], [3, "form", "noButtons"], ["noPersist", "", 3, "entity", "entregasDoPlanoEntrega"], ["key", "MENSAGENS", "label", "Texto Complementar"], ["controlName", "editar_texto_complementar_unidade", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "unidade_texto_complementar", 3, "disabled", "dataset"], ["title", "Texto complementar do usuario"], ["controlName", "editar_texto_complementar_usuario", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "usuario_texto_complementar", 3, "disabled", "dataset"], ["key", "TERMO", "label", "Termo"], ["clss", "row"], ["noPersist", "", "especie", "TCR", 3, "entity", "cdRef", "needSign", "extraTags", "editingId", "datasource", "template"], ["documentos", ""]], template: function PlanoTrabalhoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function PlanoTrabalhoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanoTrabalhoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "tabs", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_5_listener($event) { return ctx.onPlanoEntregaSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_7_listener($event) { return ctx.onUsuarioSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_10_listener($event) { return ctx.onDataInicioChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](11, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_11_listener($event) { return ctx.onDataFimChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](12, "input-search", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](14, PlanoTrabalhoFormComponent_ng_container_14_Template, 7, 10, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](15, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](16, PlanoTrabalhoFormComponent_top_alert_16_Template, 1, 1, "top-alert", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](17, PlanoTrabalhoFormComponent_div_17_Template, 3, 4, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](18, PlanoTrabalhoFormComponent_tab_18_Template, 7, 9, "tab", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](19, PlanoTrabalhoFormComponent_tab_19_Template, 4, 7, "tab", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("disabled", ctx.action == "new" ? undefined : "true")("dao", ctx.planoEntregaDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](24, _c9));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](25, _c10));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("dao", ctx.tipoModalidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _r3.selectedItem == null ? null : _r3.selectedItem.entity == null ? null : _r3.selectedItem.entity.plano_trabalho_calcula_horas);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", ctx.lex.noun("Entrega", true) + ctx.lex.noun("plano de trabalho", false, true));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx.form.controls.plano_entrega_id.value == null ? null : ctx.form.controls.plano_entrega_id.value.length));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.form.controls.plano_entrega_id.value == null ? null : ctx.form.controls.plano_entrega_id.value.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](26, _c11)));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](27, _c12)));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_21__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_22__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_23__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_24__["InputDatetimeComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_25__["NgIf"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_26__["SeparatorComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_27__["InputWorkloadComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_28__["InputTimerComponent"], _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_29__["CalendarEfemeridesComponent"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_30__["TopAlertComponent"], _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_31__["PlanoTrabalhoListEntregaComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_32__["InputSwitchComponent"], _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_33__["InputEditorComponent"], _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_34__["DocumentosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby10cmFiYWxoby1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "h1e6":
/*!**********************************************************!*\
  !*** ./src/app/models/plano-trabalho-atividade.model.ts ***!
  \**********************************************************/
/*! exports provided: PlanoTrabalhoAtividade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoAtividade", function() { return PlanoTrabalhoAtividade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoTrabalhoAtividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.plano_trabalho_id = "";
        this.atividade_id = "";
        this.initialization(data);
    }
}


/***/ }),

/***/ "qedA":
/*!***********************************************************!*\
  !*** ./src/app/dao/plano-trabalho-entrega-dao.service.ts ***!
  \***********************************************************/
/*! exports provided: PlanoTrabalhoEntregaDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoEntregaDaoService", function() { return PlanoTrabalhoEntregaDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PlanoTrabalhoEntregaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("PlanoTrabalhoEntrega", injector);
        this.injector = injector;
    }
}
PlanoTrabalhoEntregaDaoService.ɵfac = function PlanoTrabalhoEntregaDaoService_Factory(t) { return new (t || PlanoTrabalhoEntregaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PlanoTrabalhoEntregaDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PlanoTrabalhoEntregaDaoService, factory: PlanoTrabalhoEntregaDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "rmC2":
/*!********************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-list-entrega/plano-trabalho-list-entrega.component.ts ***!
  \********************************************************************************************************************/
/*! exports provided: PlanoTrabalhoListEntregaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoListEntregaComponent", function() { return PlanoTrabalhoListEntregaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ "rvJe");
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ "hgR2");
/* harmony import */ var src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/plano-trabalho-entrega.model */ "5QEa");
/* harmony import */ var src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/plano-trabalho-entrega-dao.service */ "qedA");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/entrega-dao.service */ "724m");
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ "lKXT");
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ "DqQh");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");





















const _c0 = ["origem"];
const _c1 = ["entregaMesmaUnidade"];
const _c2 = ["entregaOutraUnidade"];
const _c3 = ["entregaCatalogo"];
function PlanoTrabalhoListEntregaComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Origem");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PlanoTrabalhoListEntregaComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "badge", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r26 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("label", ctx_r4.tipoEntrega(row_r26).label)("color", ctx_r4.tipoEntrega(row_r26).cor);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "input-select", 22, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_10_Template_input_select_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30); const row_r27 = ctx.row; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r29.onOrigemChange(row_r27); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r6.form.controls.origem)("items", ctx_r6.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Entrega");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PlanoTrabalhoListEntregaComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r32 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r10.tipoEntrega(row_r32).nome);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "input-select", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template_input_select_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r39); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r38.onEntregaMesmaUnidadeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r34.form.controls.plano_entrega_entrega_id)("items", ctx_r34.entregasMesmaUnidade);
} }
const _c4 = function () { return ["gestao", "plano-entrega"]; };
const _c5 = function (a0) { return { route: a0 }; };
function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_1_Template(rf, ctx) { if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "input-select", 29, 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_1_Template_input_select_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r42); const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r41.onEntregaOutraUnidadeChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r35.form.controls.plano_entrega_entrega_id)("items", ctx_r35.entregasOutraUnidade)("sufix", ctx_r35.planoEntregaOutraUnidade == null ? null : ctx_r35.planoEntregaOutraUnidade.unidade == null ? null : ctx_r35.planoEntregaOutraUnidade.unidade.sigla)("searchRoute", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c4)))("afterSearch", ctx_r35.carregarEntregasOutraUnidade.bind(ctx_r35));
} }
function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_2_Template(rf, ctx) { if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "input-select", 31, 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_2_Template_input_select_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r45); const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r44.onEntregaCatalogoChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r36.form.controls.entrega_id)("items", ctx_r36.entregasCatalogo);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template, 2, 2, "input-select", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_1_Template, 2, 8, "input-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_2_Template, 2, 2, "input-select", 26);
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r12.origem == null ? null : ctx_r12.origem.value) == "MESMA_UNIDADE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r12.origem == null ? null : ctx_r12.origem.value) == "OUTRA_UNIDADE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r12.origem == null ? null : ctx_r12.origem.value) == "CATALOGO");
} }
function PlanoTrabalhoListEntregaComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "% For\u00E7a Trab.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "badge", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx_r14.totalForcaTrabalho == 100 ? "success" : "warning")("label", ctx_r14.totalForcaTrabalho + "%");
} }
function PlanoTrabalhoListEntregaComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r47 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r47.forca_trabalho + "%");
} }
function PlanoTrabalhoListEntregaComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "input-text", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_24_Template_input_text_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r50); const row_r48 = ctx.row; const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r49.onForcaTrabalhoChange(row_r48); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r18.form.controls.forca_trabalho);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Detalhamento");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PlanoTrabalhoListEntregaComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r52.descricao);
} }
function PlanoTrabalhoListEntregaComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input-text", 35);
} if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("control", ctx_r24.form.controls.descricao);
} }
class PlanoTrabalhoListEntregaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__["PageFrameBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.options = [];
        this.totalForcaTrabalho = 0;
        this.entregasMesmaUnidade = [];
        this.entregasOutraUnidade = [];
        this.entregasCatalogo = [];
        this._disabled = false;
        this._entregasDoPlanoEntrega = [];
        /**
         * Método chamado para a validação dos campos do formulário, por ocasião da edição ou inserção de itens.
         * @param control
         * @param controlName
         * @returns
         */
        this.validate = (control, controlName) => {
            var _a, _b, _c, _d, _e, _f, _g;
            let result = null;
            if (['descricao', 'forca_trabalho'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length))
                result = "Obrigatório!";
            if (['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1 || control.value > 100))
                result = "Deve estar entre 1 e 100";
            if (['entrega_id'].indexOf(controlName) >= 0) {
                if (((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.origem.value) == 'CATALOGO' && !control.value)
                    result = "Este campo não pode ser nulo!";
                let cont = ((_d = (_c = this.entity) === null || _c === void 0 ? void 0 : _c.entregas) === null || _d === void 0 ? void 0 : _d.filter(e => { var _a, _b; return !!e.entrega_id && !e.plano_entrega_entrega_id && e.id != ((_b = (_a = this.grid) === null || _a === void 0 ? void 0 : _a.editing) === null || _b === void 0 ? void 0 : _b.id); }).map(e => e.entrega_id).reduce((acc, id) => { if (id === control.value)
                    return acc + 1;
                else
                    return acc; }, 0)) || 0; // (*1)
                if (cont > 0)
                    result = "Esta entrega está em duplicidade!";
            }
            if (['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
                if (['MESMA_UNIDADE', 'OUTRA_UNIDADE'].includes((_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.origem.value) && !control.value)
                    result = "Este campo não pode ser nulo!";
                let cont = ((_g = (_f = this.entity) === null || _f === void 0 ? void 0 : _f.entregas) === null || _g === void 0 ? void 0 : _g.filter(e => { var _a, _b; return !e.entrega_id && !!e.plano_entrega_entrega_id && e.id != ((_b = (_a = this.grid) === null || _a === void 0 ? void 0 : _a.editing) === null || _b === void 0 ? void 0 : _b.id); }).map(e => e.plano_entrega_entrega_id).reduce((acc, id) => { if (id === control.value)
                    return acc + 1;
                else
                    return acc; }, 0)) || 0; // (*2)
                if (cont > 0)
                    result = "Esta entrega está em duplicidade!";
            }
            return result;
        };
        this.dao = injector.get(src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_7__["PlanoTrabalhoEntregaDaoService"]);
        this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]);
        this.entregaDao = injector.get(src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__["EntregaDaoService"]);
        this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_8__["PlanoTrabalhoDaoService"]);
        this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_10__["PlanoEntregaDaoService"]);
        this.peeDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_11__["PlanoEntregaEntregaDaoService"]);
        this.join = ["entrega", "plano_entrega_entrega.entrega"];
        this.form = this.fh.FormBuilder({
            origem: { default: null },
            entregaMesmaUnidade: { default: null },
            entregaOutraUnidade: { default: null },
            entregaCatalogo: { default: null },
            descricao: { default: "" },
            forca_trabalho: { default: 1 },
            plano_trabalho_id: { default: null },
            entrega_id: { default: null },
            plano_entrega_entrega_id: { default: null }
        }, this.cdRef, this.validate);
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
    set entregasDoPlanoEntrega(value) {
        if (JSON.stringify(value) != JSON.stringify(this._entregasDoPlanoEntrega)) {
            this._entregasDoPlanoEntrega = value;
            this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
            this.cdRef.detectChanges();
        }
    }
    get entregasDoPlanoEntrega() { return this._entregasDoPlanoEntrega; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_5__["PlanoTrabalho"]());
        if (!this.gridControl.value.entregas)
            this.gridControl.value.entregas = [];
        return this.gridControl.value.entregas;
    }
    /**
     * Método chamado na inicialização do componente. Neste momento são carregadas as entregas do catálogo e as entregas da mesma unidade do plano de trabalho,
     * visto que esses itens não se alteram durante a vida do componente e poderão ser utilizados durante sua utilização.
     */
    ngOnInit() {
        const _super = Object.create(null, {
            ngOnInit: { get: () => super.ngOnInit }
        });
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _super.ngOnInit.call(this);
            this.entity = ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.entity) || this.entity;
            this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho((_b = this.entity) === null || _b === void 0 ? void 0 : _b.entregas) * 100) / 100;
            this.entregasCatalogo = yield this.carregarEntregasCatalogo();
            this.entregasMesmaUnidade = this.carregarEntregasMesmaUnidade();
        });
    }
    /**
     * Método chamado para inserir uma entrega de plano de trabalho no grid, seja este persistente ou não.
     * @returns
     */
    addEntrega() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return Object.assign(new src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_6__["PlanoTrabalhoEntrega"](), {
                _status: this.isNoPersist ? "ADD" : "",
                id: this.dao.generateUuid(),
                plano_trabalho_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id
            });
        });
    }
    /**
     * Método utilizado durante a inclusão/alteração de uma entrega de plano de trabalho no grid, seja ele persistente ou não
     * @param form
     * @param row
     */
    loadEntrega(form, row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            form.controls.descricao.setValue(row.descricao);
            form.controls.forca_trabalho.setValue(row.forca_trabalho);
            form.controls.plano_trabalho_id.setValue(row.plano_trabalho_id);
            if (!((_a = row.entrega_id) === null || _a === void 0 ? void 0 : _a.length) && !((_b = row.plano_entrega_entrega_id) === null || _b === void 0 ? void 0 : _b.length)) { // É uma nova entrega
                form.controls.origem.setValue('MESMA_UNIDADE');
                form.controls.entrega_id.setValue(null);
                form.controls.plano_entrega_entrega_id.setValue(null);
            }
            else if (!((_c = row.plano_entrega_entrega_id) === null || _c === void 0 ? void 0 : _c.length) && !!((_d = row.entrega_id) === null || _d === void 0 ? void 0 : _d.length)) { // É uma entrega do tipo catálogo
                form.controls.origem.setValue('CATALOGO');
                form.controls.entrega_id.setValue(row.entrega_id);
                form.controls.plano_entrega_entrega_id.setValue(null);
            }
            else if (!((_e = row.entrega_id) === null || _e === void 0 ? void 0 : _e.length) && !!((_f = row.plano_entrega_entrega_id) === null || _f === void 0 ? void 0 : _f.length) && (((_g = row.objeto) === null || _g === void 0 ? void 0 : _g.plano_entrega_id) || ((_h = row.plano_entrega_entrega) === null || _h === void 0 ? void 0 : _h.plano_entrega_id)) == ((_j = this.entity) === null || _j === void 0 ? void 0 : _j.plano_entrega_id)) {
                form.controls.origem.setValue('MESMA_UNIDADE');
                form.controls.entrega_id.setValue(null);
                form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
            }
            else if (!((_k = row.entrega_id) === null || _k === void 0 ? void 0 : _k.length) && !!((_l = row.plano_entrega_entrega_id) === null || _l === void 0 ? void 0 : _l.length) && (((_m = row.objeto) === null || _m === void 0 ? void 0 : _m.plano_entrega_id) || ((_o = row.plano_entrega_entrega) === null || _o === void 0 ? void 0 : _o.plano_entrega_id)) != ((_p = this.entity) === null || _p === void 0 ? void 0 : _p.plano_entrega_id)) {
                form.controls.origem.setValue('OUTRA_UNIDADE');
                form.controls.entrega_id.setValue(null);
                yield this.carregarEntregasOutraUnidade((_q = row.plano_entrega_entrega) === null || _q === void 0 ? void 0 : _q.plano_entrega_id);
                form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
            }
        });
    }
    /**
     * Método chamado para somar os percentuais das forças de trabalho do array de entregas passado como parâmetro.
     * @param entregas Array de entregas do plano de trabalho
     * @returns
     */
    somaForcaTrabalho(entregas = []) {
        return entregas.map(x => parseFloat(x.forca_trabalho)).reduce((a, b) => a + b, 0);
    }
    /**
     * Método chamado para a exclusão de uma entrega de plano de trabalho do grid, seja este persistente ou não.
     * @param row
     * @returns
     */
    removeEntrega(row) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let confirm = yield this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
            if (confirm) {
                this.loading = true;
                try {
                    this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : yield ((_a = this.dao) === null || _a === void 0 ? void 0 : _a.delete(row.id));
                }
                finally {
                    this.loading = false;
                }
                this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho - parseFloat(row.forca_trabalho)) * 100) / 100;
                return this.isNoPersist ? false : true; // (*3)
            }
            else {
                return false;
            }
        });
    }
    /**
     * Método chamado no salvamento de uma entrega do plano de trabalho do grid, seja este persistente ou não.
     * @param form
     * @param row
     * @returns
     */
    saveEntrega(form, row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.novaEntrega = row;
            this.novaEntrega.entrega_id = (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.entrega_id.value) !== null && _b !== void 0 ? _b : null;
            this.novaEntrega.plano_entrega_entrega_id = (_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.plano_entrega_entrega_id.value;
            this.novaEntrega.descricao = (_d = this.form) === null || _d === void 0 ? void 0 : _d.controls.descricao.value;
            this.novaEntrega.forca_trabalho = (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.forca_trabalho.value;
            this.loading = true;
            try {
                if (!this.isNoPersist) {
                    this.novaEntrega = yield this.dao.save(this.novaEntrega, this.join);
                    if ((_f = this.grid) === null || _f === void 0 ? void 0 : _f.adding)
                        this.grid.items[this.grid.items.length - 1].id = ''; // (*4)
                }
            }
            catch (e) {
                this.error(e.message ? e.message : e.toString() || e);
            }
            finally {
                this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho + parseFloat(row.forca_trabalho)) * 100) / 100;
                row.objeto = ((_h = (_g = this.entregaCatalogo) === null || _g === void 0 ? void 0 : _g.selectedItem) === null || _h === void 0 ? void 0 : _h.data) || ((_k = (_j = this.entregaMesmaUnidade) === null || _j === void 0 ? void 0 : _j.selectedItem) === null || _k === void 0 ? void 0 : _k.data) || ((_m = (_l = this.entregaOutraUnidade) === null || _l === void 0 ? void 0 : _l.selectedItem) === null || _m === void 0 ? void 0 : _m.data); // (*)
                this.loading = false;
            }
            return this.novaEntrega;
        });
    }
    /**
     * Método chamado na inicialização do componente para armazenar as entregas da mesma unidade do plano de trabalho.
     * @returns
     */
    carregarEntregasMesmaUnidade() {
        var _a, _b, _c, _d;
        if (!((_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.length))
            return this.entregasDoPlanoEntrega; // (*5)
        let entregasPlanoEntrega = ((_d = (_c = this.entity) === null || _c === void 0 ? void 0 : _c.plano_entrega) === null || _d === void 0 ? void 0 : _d.entregas) || [];
        let result = entregasPlanoEntrega.map(epe => { var _a; return Object.assign({}, { key: epe.id, value: ((_a = epe.entrega) === null || _a === void 0 ? void 0 : _a.nome) || epe.descricao, data: epe }); });
        return result;
    }
    /**
     * Método chamado para carregar as entregas de uma outra unidade, com base no seu plano de entregas passado como parâmetro.
     * @param idPlanoOuPlano ID do plano de entregas ou o seu objeto completo.
     */
    carregarEntregasOutraUnidade(idPlanoOuPlano) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.cdRef.detectChanges();
            this.planoEntregaOutraUnidade = typeof idPlanoOuPlano == 'string' ? yield this.planoEntregaDao.getById(idPlanoOuPlano, ["entregas.entrega", "unidade"]) : idPlanoOuPlano;
            this.entregasOutraUnidade = ((_a = this.planoEntregaOutraUnidade) === null || _a === void 0 ? void 0 : _a.entregas.map(epe => { var _a; return Object.assign({}, { key: epe.id, value: ((_a = epe.entrega) === null || _a === void 0 ? void 0 : _a.nome) || epe.descricao, data: epe }); })) || [];
        });
    }
    /**
     * Método chamado para carregar as entregas existentes no Catálogo de Entregas.
     * @returns
     */
    carregarEntregasCatalogo() {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let result = [];
            result = ((_b = (yield ((_a = this.entregaDao) === null || _a === void 0 ? void 0 : _a.query().getAll()))) === null || _b === void 0 ? void 0 : _b.map(ee => Object.assign({}, { key: ee.id, value: ee.nome, data: ee }))) || [];
            return result;
        });
    }
    tipoEntrega(row) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!!((_a = row.entrega_id) === null || _a === void 0 ? void 0 : _a.length))
            return { label: 'Catálogo', cor: 'secondary', nome: !!((_c = (_b = row.objeto) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.length) ? ((_d = row.objeto) === null || _d === void 0 ? void 0 : _d.nome) || "Desconhecido" : ((_e = row.entrega) === null || _e === void 0 ? void 0 : _e.nome) || "Desconhecido1" };
        let IdDoPlanoEntregaDoPlanoTrabalho, IdDoPlanoEntregaDaEntrega, badge, nome, cor;
        IdDoPlanoEntregaDoPlanoTrabalho = ((_f = this.entity) === null || _f === void 0 ? void 0 : _f.plano_entrega_id) || ((_g = this.entregasDoPlanoEntrega[0]) === null || _g === void 0 ? void 0 : _g.data.plano_entrega_id) || 'Desconhecido2';
        IdDoPlanoEntregaDaEntrega = !!((_h = row.objeto) === null || _h === void 0 ? void 0 : _h.id.length) ? ((_j = row.objeto) === null || _j === void 0 ? void 0 : _j.plano_entrega_id) || "Desconhecido3" : row.plano_entrega_entrega.plano_entrega_id || "Desconhecido4";
        [badge, cor] = IdDoPlanoEntregaDoPlanoTrabalho == IdDoPlanoEntregaDaEntrega ? ['Mesma unidade', 'success'] : ['Outra unidade', 'primary'];
        nome = !!((_k = row.objeto) === null || _k === void 0 ? void 0 : _k.id.length) ? ((_l = row.objeto) === null || _l === void 0 ? void 0 : _l.entrega.nome) || "Desconhecido5" : ((_m = row.plano_entrega_entrega) === null || _m === void 0 ? void 0 : _m.entrega.nome) || "Desconhecido6";
        return { label: badge, cor: cor, nome: nome };
    }
    /* ---------  TRATAMENTO DOS EVENTOS ----------- */
    onOrigemChange(row) {
        var _a, _b, _c, _d;
        let value = this.form.controls.origem.value;
        if (['MESMA_UNIDADE', 'OUTRA_UNIDADE'].includes(value)) {
            (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.entrega_id.setValue(null);
            this.cdRef.detectChanges();
            if (value == "OUTRA_UNIDADE")
                (_b = this.entregaOutraUnidade) === null || _b === void 0 ? void 0 : _b.onSearchClick((_c = this.entregaOutraUnidade) === null || _c === void 0 ? void 0 : _c.searchRoute);
        }
        else if (value == 'CATALOGO') {
            (_d = this.form) === null || _d === void 0 ? void 0 : _d.controls.plano_entrega_entrega_id.setValue(null);
        }
    }
    onEntregaMesmaUnidadeChange(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = this.entregaMesmaUnidade) === null || _a === void 0 ? void 0 : _a.selectedItem) {
            (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.descricao.setValue(((_d = (_c = this.entregaMesmaUnidade) === null || _c === void 0 ? void 0 : _c.selectedItem) === null || _d === void 0 ? void 0 : _d.value) || '');
            (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.plano_entrega_entrega_id.setValue((_g = (_f = this.entregaMesmaUnidade) === null || _f === void 0 ? void 0 : _f.selectedItem) === null || _g === void 0 ? void 0 : _g.key);
            this.cdRef.detectChanges();
        }
    }
    onEntregaOutraUnidadeChange(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = this.entregaOutraUnidade) === null || _a === void 0 ? void 0 : _a.selectedItem) {
            (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.descricao.setValue(((_d = (_c = this.entregaOutraUnidade) === null || _c === void 0 ? void 0 : _c.selectedItem) === null || _d === void 0 ? void 0 : _d.value) || '');
            (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.plano_entrega_entrega_id.setValue((_g = (_f = this.entregaOutraUnidade) === null || _f === void 0 ? void 0 : _f.selectedItem) === null || _g === void 0 ? void 0 : _g.key);
            this.cdRef.detectChanges();
        }
    }
    onEntregaCatalogoChange(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = this.entregaCatalogo) === null || _a === void 0 ? void 0 : _a.selectedItem) {
            (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.descricao.setValue(((_d = (_c = this.entregaCatalogo) === null || _c === void 0 ? void 0 : _c.selectedItem) === null || _d === void 0 ? void 0 : _d.value) || '');
            (_e = this.form) === null || _e === void 0 ? void 0 : _e.controls.entrega_id.setValue((_g = (_f = this.entregaCatalogo) === null || _f === void 0 ? void 0 : _f.selectedItem) === null || _g === void 0 ? void 0 : _g.key);
            this.cdRef.detectChanges();
        }
    }
    onForcaTrabalhoChange(row) {
        var _a, _b;
        let index = this.items.findIndex(x => x["id"] == row["id"]);
        this.totalForcaTrabalho = Math.round((this.somaForcaTrabalho((_a = this.grid) === null || _a === void 0 ? void 0 : _a.items) - parseFloat(this.items[index].forca_trabalho) + parseFloat((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.forca_trabalho.value)) * 100) / 100;
    }
}
PlanoTrabalhoListEntregaComponent.ɵfac = function PlanoTrabalhoListEntregaComponent_Factory(t) { return new (t || PlanoTrabalhoListEntregaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PlanoTrabalhoListEntregaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PlanoTrabalhoListEntregaComponent, selectors: [["plano-trabalho-list-entrega"]], viewQuery: function PlanoTrabalhoListEntregaComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.origem = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.entregaMesmaUnidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.entregaOutraUnidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.entregaCatalogo = _t.first);
    } }, inputs: { control: "control", entity: "entity", disabled: "disabled", noPersist: "noPersist", cdRef: "cdRef", entregasDoPlanoEntrega: "entregasDoPlanoEntrega" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 34, vars: 36, consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["editable", "", 3, "items", "form", "selectable", "minHeight", "join", "groupBy", "add", "remove", "save", "load", "hasDelete", "hasEdit", "hasAdd"], ["gridEntregas", ""], [3, "titleTemplate", "template", "editTemplate", "verticalAlign", "width", "align"], ["titleOrigem", ""], ["columnOrigem", ""], ["editOrigem", ""], [3, "maxWidth", "titleTemplate", "template", "editTemplate", "verticalAlign"], ["titleEntrega", ""], ["columnEntrega", ""], ["editEntrega", ""], [3, "titleTemplate", "template", "editTemplate", "width", "align"], ["titleForcaTrabalho", ""], ["columnForcaTrabalho", ""], ["editForcaTrabalho", ""], ["titleDescricao", ""], ["columnDescricao", ""], ["editDescricao", ""], ["type", "options"], [1, "text-center"], [3, "label", "color"], ["controlName", "origem", "controlName", "origem", 3, "control", "items", "change"], ["origem", ""], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change", 4, "ngIf"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", "searchButton", "", 3, "control", "items", "sufix", "searchRoute", "afterSearch", "change", 4, "ngIf"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "entrega_id", 3, "control", "items", "change", 4, "ngIf"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change"], ["entregaMesmaUnidade", ""], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", "searchButton", "", 3, "control", "items", "sufix", "searchRoute", "afterSearch", "change"], ["entregaOutraUnidade", ""], ["nullable", "", "itemNull", "- Selecione -", "controlName", "entrega_id", 3, "control", "items", "change"], ["entregaCatalogo", ""], ["icon", "bi bi-calculator", 3, "color", "label"], ["number", "", "sufix", "%", "controlName", "forca_trabalho", 3, "control", "change"], ["controlName", "descricao", 3, "control"]], template: function PlanoTrabalhoListEntregaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "grid", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "column", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, PlanoTrabalhoListEntregaComponent_ng_template_6_Template, 4, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, PlanoTrabalhoListEntregaComponent_ng_template_8_Template, 3, 2, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, PlanoTrabalhoListEntregaComponent_ng_template_10_Template, 2, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, PlanoTrabalhoListEntregaComponent_ng_template_13_Template, 3, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, PlanoTrabalhoListEntregaComponent_ng_template_15_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, PlanoTrabalhoListEntregaComponent_ng_template_17_Template, 3, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, PlanoTrabalhoListEntregaComponent_ng_template_20_Template, 7, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, PlanoTrabalhoListEntregaComponent_ng_template_22_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, PlanoTrabalhoListEntregaComponent_ng_template_24_Template, 1, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, PlanoTrabalhoListEntregaComponent_ng_template_27_Template, 4, 0, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, PlanoTrabalhoListEntregaComponent_ng_template_29_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, PlanoTrabalhoListEntregaComponent_ng_template_31_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](9);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](14);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](16);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](18);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](21);
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](23);
        const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](25);
        const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](28);
        const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](30);
        const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.items.length > 2 ? 0 : 220)("join", ctx.join)("groupBy", ctx.groupBy)("add", ctx.addEntrega.bind(ctx))("remove", ctx.removeEntrega.bind(ctx))("save", ctx.saveEntrega.bind(ctx))("load", ctx.loadEntrega.bind(ctx))("hasDelete", true)("hasEdit", true)("hasAdd", !ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("titleTemplate", _r1)("template", _r3)("editTemplate", _r5)("verticalAlign", "middle")("width", 125)("align", "center");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("maxWidth", 350)("titleTemplate", _r7)("template", _r9)("editTemplate", _r11)("verticalAlign", "middle");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("titleTemplate", _r13)("template", _r15)("editTemplate", _r17)("width", 125)("align", "center");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("maxWidth", 250)("titleTemplate", _r19)("template", _r21)("editTemplate", _r23)("verticalAlign", "middle");
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__["EditableFormComponent"], src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_3__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__["ColumnComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__["BadgeComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__["InputSelectComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__["InputTextComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby10cmFiYWxoby1saXN0LWVudHJlZ2EuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "wbO2":
/*!********************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-routing.module.ts ***!
  \********************************************************************************/
/*! exports provided: PlanoTrabalhoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoRoutingModule", function() { return PlanoTrabalhoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ "OCEv");
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ "PLav");
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ "fLNm");
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ "rmC2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_5__["PlanoTrabalhoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Plano de Trabalho" } },
    { path: 'new', component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoTrabalhoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'termo', component: _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_3__["PlanoTrabalhoFormTermoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Termo de adesão", modal: true } },
    { path: ':id/edit', component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoTrabalhoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoTrabalhoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } },
    { path: 'entregaList', component: _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__["PlanoTrabalhoListEntregaComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Lista de Entregas", modal: true } },
];
class PlanoTrabalhoRoutingModule {
}
PlanoTrabalhoRoutingModule.ɵfac = function PlanoTrabalhoRoutingModule_Factory(t) { return new (t || PlanoTrabalhoRoutingModule)(); };
PlanoTrabalhoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: PlanoTrabalhoRoutingModule });
PlanoTrabalhoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PlanoTrabalhoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=modules-gestao-plano-trabalho-plano-trabalho-module.js.map