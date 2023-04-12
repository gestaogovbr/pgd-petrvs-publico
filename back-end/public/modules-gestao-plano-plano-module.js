(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-gestao-plano-plano-module"],{

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
        this.nome = "";
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.plano_id = "";
        this.entrega_id = "";
        this.initialization(data);
    }
}


/***/ }),

/***/ "ALD5":
/*!******************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano.module.ts ***!
  \******************************************************/
/*! exports provided: PlanoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoModule", function() { return PlanoModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _plano_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plano-routing.module */ "QLcQ");
/* harmony import */ var _plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-form/plano-form.component */ "sGQK");
/* harmony import */ var _plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-list/plano-list.component */ "nUpE");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../uteis/uteis.module */ "hA/d");
/* harmony import */ var _plano_termo_adesao_plano_termo_adesao_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-termo-adesao/plano-termo-adesao.component */ "YQQp");
/* harmony import */ var _plano_form_termo_plano_form_termo_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-form-termo/plano-form-termo.component */ "AQJf");
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
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/badge/badge.component */ "jKVP");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/profile-picture/profile-picture.component */ "xp1S");
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/grid/report/report.component */ "4Ttn");
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ "f3Td");



























class PlanoModule {
}
PlanoModule.ɵfac = function PlanoModule_Factory(t) { return new (t || PlanoModule)(); };
PlanoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: PlanoModule });
PlanoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _plano_routing_module__WEBPACK_IMPORTED_MODULE_1__["PlanoRoutingModule"],
            _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](PlanoModule, { declarations: [_plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_2__["PlanoFormComponent"],
        _plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoListComponent"],
        _plano_termo_adesao_plano_termo_adesao_component__WEBPACK_IMPORTED_MODULE_7__["PlanoTermoAdesaoComponent"],
        _plano_form_termo_plano_form_termo_component__WEBPACK_IMPORTED_MODULE_8__["PlanoFormTermoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _plano_routing_module__WEBPACK_IMPORTED_MODULE_1__["PlanoRoutingModule"],
        _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_6__["UteisModule"]] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetComponentScope"](_plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_3__["PlanoListComponent"], [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_10__["GridComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_11__["ToolbarComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__["InputSwitchComponent"], _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__["FilterComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__["InputTextComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_16__["InputSelectComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__["InputDatetimeComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__["ColumnComponent"], _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_20__["OrderComponent"], _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_21__["BadgeComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__["SeparatorComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_23__["ProfilePictureComponent"], _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_24__["ReportComponent"], _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_25__["PaginationComponent"]], []);


/***/ }),

/***/ "AQJf":
/*!*************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-form-termo/plano-form-termo.component.ts ***!
  \*************************************************************************************/
/*! exports provided: PlanoFormTermoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoFormTermoComponent", function() { return PlanoFormTermoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-dao.service */ "eHo6");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ "EwcK");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/plano.model */ "710e");
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
/* harmony import */ var _plano_termo_adesao_plano_termo_adesao_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../plano-termo-adesao/plano-termo-adesao.component */ "YQQp");























const _c0 = ["usuario"];
const _c1 = ["unidade"];
const _c2 = ["programa"];
const _c3 = ["tipoDocumento"];
const _c4 = ["tipo_modalidade"];
const _c5 = ["termo"];
const _c6 = function () { return ["cadastros", "tipo-documento"]; };
const _c7 = function (a0) { return { route: a0 }; };
class PlanoFormTermoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_10__["Plano"], src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_3__["PlanoDaoService"]);
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
        this.join = ["unidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos", "atividades.atividade"];
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
            data_inicio: { default: "" },
            data_fim: { default: "" },
            ganho_produtividade: { default: 0 },
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
            this.entity = (yield this.dao.getById(this.metadata.plano.id, this.join));
            this.processo = (_a = this.metadata) === null || _a === void 0 ? void 0 : _a.processo;
            yield this.loadData(this.entity, form);
        });
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            //if(this.processo) {
            resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__["NavigateResult"](Object.assign(this.form.value, {
                termo: this.termo.conteudo,
                atividades_termo_adesao: this.termo.atividades.map(x => this.util.removeAcentos(x.nome.toLowerCase())),
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
PlanoFormTermoComponent.ɵfac = function PlanoFormTermoComponent_Factory(t) { return new (t || PlanoFormTermoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["Injector"])); };
PlanoFormTermoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: PlanoFormTermoComponent, selectors: [["app-plano-form-termo"]], viewQuery: function PlanoFormTermoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c5, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoDocumento = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.termo = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]], decls: 28, vars: 48, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["collapse", "", 3, "title", "collapsed"], [1, "row"], ["disabled", "", "label", "Programa", "icon", "bi bi-layout-text-window-reverse", "controlName", "programa_id", 3, "size", "control", "dao"], ["programa", ""], ["disabled", "", "label", "Usu\u00E1rio", "icon", "bi bi-person", "controlName", "usuario_id", 3, "size", "control", "dao"], ["usuario", ""], ["disabled", "", "label", "Unidade", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "control", "dao"], ["unidade", ""], ["disabled", "", "label", "Modalidade", "icon", "bi bi-cast", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao"], ["tipo_modalidade", ""], ["numbers", "", "disabled", "", "label", "% prod.", "icon", "bi bi-hourglass-split", "controlName", "ganho_produtividade", "labelInfo", "Percentual de ganho de produtividade (Ser\u00E1 descontado do tempo pactuado)", 3, "size", "control"], ["label", "H. Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["disabled", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "C. Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio", 3, "size", "unit", "control"], ["label", "H. Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["disabled", "", "label", "Data e hora", "controlName", "data_inicio", "labelInfo", "Data de cadastro do termo", 3, "size", "control"], ["label", "N\u00FAmero Processo", "controlName", "numero_processo", "disabled", "", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "size", "control"], ["label", "Tipo de documento", "icon", "bi bi-files", "controlName", "tipo_documento_id", 3, "size", "disabled", "control", "dao", "selectRoute"], ["tipoDocumento", ""], ["label", "Vinculadas", "controlName", "vinculadas", "labelInfo", "Se inclui as atividades das unidades vinculadas a unidade do plano", 3, "disabled", "size", "control", "change"], ["title", "Pr\u00E9-visualiza\u00E7\u00E3o do termo de ades\u00E3o", "collapse", "", 3, "collapsed"], [3, "plano", "vinculadas"], ["termo", ""]], template: function PlanoFormTermoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function PlanoFormTermoComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanoFormTermoComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function PlanoFormTermoComponent_Template_input_switch_change_24_listener($event) { return ctx.onVinculadasChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](25, "separator", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](26, "plano-termo-adesao", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.noun("Plano de trabalho"))("collapsed", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.programa_id)("dao", ctx.programaDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.usuario_id)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.ganho_produtividade);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.numero_processo);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("disabled", !(ctx.form.controls.numero_processo.value == null ? null : ctx.form.controls.numero_processo.value.length) ? "true" : undefined)("control", ctx.form.controls.tipo_documento_id)("dao", ctx.tipoDocumentoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](46, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](45, _c6)));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", (ctx.entity == null ? null : ctx.entity.atividades == null ? null : ctx.entity.atividades.length) ? "true" : undefined)("size", 2)("control", ctx.form.controls.vinculadas);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("collapsed", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("plano", ctx.entity)("vinculadas", !!(ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.vinculadas == null ? null : ctx.form.controls.vinculadas.value));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__["SeparatorComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__["InputTextComponent"], _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_17__["InputDisplayComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__["InputDatetimeComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_19__["InputWorkloadComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_20__["InputSwitchComponent"], _plano_termo_adesao_plano_termo_adesao_component__WEBPACK_IMPORTED_MODULE_21__["PlanoTermoAdesaoComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1mb3JtLXRlcm1vLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "QLcQ":
/*!**************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: PlanoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoRoutingModule", function() { return PlanoRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var _plano_form_termo_plano_form_termo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-form-termo/plano-form-termo.component */ "AQJf");
/* harmony import */ var _plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-form/plano-form.component */ "sGQK");
/* harmony import */ var _plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-list/plano-list.component */ "nUpE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [
    { path: '', component: _plano_list_plano_list_component__WEBPACK_IMPORTED_MODULE_5__["PlanoListComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Plano" } },
    { path: 'new', component: _plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Inclusão", modal: true } },
    { path: 'termo', component: _plano_form_termo_plano_form_termo_component__WEBPACK_IMPORTED_MODULE_3__["PlanoFormTermoComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Termo de adesão", modal: true } },
    { path: ':id/edit', component: _plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Edição", modal: true } },
    { path: ':id/consult', component: _plano_form_plano_form_component__WEBPACK_IMPORTED_MODULE_4__["PlanoFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Consultar", modal: true } }
    //{ path: ':id/termos', component: PlanoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, data: { title: "Termos de adesão", modal: true } }
];
class PlanoRoutingModule {
}
PlanoRoutingModule.ɵfac = function PlanoRoutingModule_Factory(t) { return new (t || PlanoRoutingModule)(); };
PlanoRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: PlanoRoutingModule });
PlanoRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](PlanoRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Ug/M":
/*!*************************************************!*\
  !*** ./src/app/models/plano-atividade.model.ts ***!
  \*************************************************/
/*! exports provided: PlanoAtividade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoAtividade", function() { return PlanoAtividade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoAtividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.plano_id = "";
        this.atividade_id = "";
        this.initialization(data);
    }
}


/***/ }),

/***/ "YQQp":
/*!*****************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-termo-adesao/plano-termo-adesao.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: PlanoTermoAdesaoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTermoAdesaoComponent", function() { return PlanoTermoAdesaoComponent; });
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-base */ "Z2oO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




const _c0 = ["termo"];
function PlanoTermoAdesaoComponent_tr_123_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const atividade_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](atividade_r2.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.util.decimalToTimerFormated(atividade_r2.tempo_pactuado, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getTempoTeletrabalho(atividade_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.ganhoProdutividade);
} }
class PlanoTermoAdesaoComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__["PageBase"] {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.atividades = [];
        this.mensagemCarregando = "Carregando atividades...";
        this._vinculadas = true;
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_0__["AtividadeDaoService"]);
    }
    //@ContentChild("content") content?: HTMLElement;
    set vinculadas(value) {
        var _a, _b;
        if (this._vinculadas != value) {
            this._vinculadas = value;
            if (!((_b = (_a = this.plano) === null || _a === void 0 ? void 0 : _a.atividades) === null || _b === void 0 ? void 0 : _b.length)) {
                this.loadAtividades();
            }
            this.cdRef.detectChanges();
        }
    }
    get vinculadas() {
        return this._vinculadas;
    }
    set plano(value) {
        var _a, _b, _c;
        if (this._plano != value) {
            this._plano = value;
            if ((_b = (_a = this._plano) === null || _a === void 0 ? void 0 : _a.atividades) === null || _b === void 0 ? void 0 : _b.length) {
                this.atividades = ((_c = this._plano) === null || _c === void 0 ? void 0 : _c.atividades.map(x => x.atividade)) || [];
            }
            else {
                this.loadAtividades();
            }
            this.cdRef.detectChanges();
        }
    }
    get plano() {
        return this._plano;
    }
    loadAtividades() {
        var _a;
        const query = this.atividadeDao.query({ where: [['unidade_id', '=', (_a = this.plano) === null || _a === void 0 ? void 0 : _a.unidade_id], ['vinculadas', '=', this.vinculadas]] });
        this.loading = true;
        query.asPromise().then(atividades => {
            this.atividades = atividades;
            this.cdRef.detectChanges();
        }).catch((error) => {
            this.dialog.alert("Error ao carregar atividades", (error === null || error === void 0 ? void 0 : error.message) ? error.message : error);
        }).finally(() => {
            this.loading = false;
        });
    }
    getEntregas(entregas) {
        return entregas.map(x => x.value).join("\n");
    }
    getParametros(parametros) {
        return parametros.map(x => x.value).join("\n");
    }
    getFaixaComplexidade(atividade) {
        var _a;
        return ((_a = atividade.complexidade.find(x => x.padrao)) === null || _a === void 0 ? void 0 : _a.grau) || "Normal";
    }
    get conteudo() {
        var _a;
        return ((_a = this.termo) === null || _a === void 0 ? void 0 : _a.nativeElement.innerHTML) || "";
    }
    getTempoTeletrabalho(atividade) {
        var _a;
        const fator_ganho_produtivade = 1 - ((((_a = this.plano) === null || _a === void 0 ? void 0 : _a.ganho_produtividade) || 0) / 100);
        return this.util.decimalToTimerFormated(atividade.tempo_pactuado * fator_ganho_produtivade, true);
    }
    get ganhoProdutividade() {
        var _a;
        return this.util.formatDecimal(((_a = this.plano) === null || _a === void 0 ? void 0 : _a.ganho_produtividade) || 0) + "%";
    }
    get cargaHorariaTitulo() {
        var _a, _b;
        return ((_a = this.plano) === null || _a === void 0 ? void 0 : _a.forma_contagem_carga_horaria) == "MES" ? "Carga horária mensal:" : ((_b = this.plano) === null || _b === void 0 ? void 0 : _b.forma_contagem_carga_horaria) == "SEMANA" ? "Carga horária semanal:" : "Carga horária diária:";
    }
    get cargaHoraria() {
        var _a, _b, _c;
        const factor = ((_a = this.plano) === null || _a === void 0 ? void 0 : _a.forma_contagem_carga_horaria) == "MES" ? 20 : ((_b = this.plano) === null || _b === void 0 ? void 0 : _b.forma_contagem_carga_horaria) == "SEMANA" ? 5 : 1;
        return (((_c = this.plano) === null || _c === void 0 ? void 0 : _c.carga_horaria) || 0) * factor;
    }
    ngOnInit() {
    }
}
PlanoTermoAdesaoComponent.ɵfac = function PlanoTermoAdesaoComponent_Factory(t) { return new (t || PlanoTermoAdesaoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"])); };
PlanoTermoAdesaoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PlanoTermoAdesaoComponent, selectors: [["plano-termo-adesao"]], viewQuery: function PlanoTermoAdesaoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.termo = _t.first);
    } }, inputs: { vinculadas: "vinculadas", plano: "plano" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], decls: 124, vars: 13, consts: [["termo", ""], ["colspan", "2", 2, "padding", "15px"], [2, "text-align", "center"], [2, "padding", "8px"], ["rowspan", "2"], ["colspan", "2", 2, "padding", "8px"], [2, "text-align", "justify"], [4, "ngFor", "ngForOf"]], template: function PlanoTermoAdesaoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "PLANO DE TRABALHO");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Nome do participante:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Nome da unidade respons\u00E1vel:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Matr\u00EDcula Siape:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Vincula\u00E7\u00E3o do participante:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Per\u00EDodo de ades\u00E3o:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Regime de execu\u00E7\u00E3o:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51, "Ganho percentual de produtividade:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](58);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](61, "td", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "Tempo pactuado do plano:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](68, "td", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](70, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](71, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](72, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](73, "TERMO DE CI\u00CANCIA E RESPONSABILIDADE ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](75, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](76, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](77, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](79);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](81, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](82, "DECLARO estar ciente que a aferi\u00E7\u00E3o das entregas ser\u00E1 realizadas mediante an\u00E1lise fundamentada da chefia respons\u00E1vel pelo plano de trabalho, em at\u00E9 quarenta dias, quanto ao atingimento ou n\u00E3o das metas estipuladas.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](83, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](84, "DECLARO estar ciente que a chefia respons\u00E1vel pelo plano de trabalho poder\u00E1 redefinir as metas do participante por necessidade do servi\u00E7o, na hip\u00F3tese de surgimento de demanda priorit\u00E1ria cujas atividades n\u00E3o tenham sido previamente acordadas.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](85, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](86, "DECLARO que atendo \u00E0s condi\u00E7\u00F5es para participa\u00E7\u00E3o no PGPRF;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](87, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](88, "DECLARO que estou ciente do dever como participante de manter, \u00E0s suas expensas, a infraestrutura necess\u00E1ria para o exerc\u00EDcio de suas atribui\u00E7\u00F5es, inclusive aquelas relacionadas \u00E0 seguran\u00E7a da informa\u00E7\u00E3o, quando executar o programa de gest\u00E3o na modalidade teletrabalho;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](89, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](90, "DECLARO que estou ciente que minha participa\u00E7\u00E3o no programa de gest\u00E3o n\u00E3o constitui direito adquirido, podendo ser desligado nas condi\u00E7\u00F5es estabelecidas nesta Instru\u00E7\u00E3o Normativa;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](91, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](92, "DECLARO que estou ciente quanto \u00E0 veda\u00E7\u00E3o de pagamento das vantagens descritas nesta normativa;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](93, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](94, "DECLARO que estou ciente quanto \u00E0 veda\u00E7\u00E3o de utiliza\u00E7\u00E3o de terceiros para a execu\u00E7\u00E3o dos trabalhos acordados como parte das metas;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](95, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](96, "DECLARO que estou ciente quanto ao dever de observar as disposi\u00E7\u00F5es constantes da Lei n\u00BA 13.709, de 14 e agosto de 2018;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](97, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](98, "DECLARO que estou ciente quanto ao dever de observar as disposi\u00E7\u00F5es constantes da Lei Geral de Prote\u00E7\u00E3o de Dados Pessoas (LGPD), no que couber;");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](99, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](100, "DECLARO que estou ciente quanto ao dever de observar as disposi\u00E7\u00F5es constantes da Portaria n\u00BA 15.543/SEDGG/ME, de 2 de julho de 2020 (Manual de Conduta do Agente P\u00FAblico Civil do Poder Executivo Federal); e");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](101, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](102, "DECLARO que estou ciente quanto ao dever de manter os dados pessoais, inclusive de contato para acionamento,\u00A0atualizados em sistema indicado pela Diretoria de Gest\u00E3o de Pessoas.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](103, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](104, "DECLARO estar ciente quanto ao dever de manter meus dados pessoais, inclusive de contato para acionamento, atualizados na base de dados indicada pela DGP.");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](105, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](106, "DECLARO estar ciente que o prazo de anteced\u00EAncia m\u00EDnima para o comparecimento presencial \u00E0 unidade, sempre que a presen\u00E7a f\u00EDsica do participante for necess\u00E1ria e houver interesse da Administra\u00E7\u00E3o P\u00FAblica, dever\u00E1 seguir o disposto na INSTRU\u00C7\u00C3O NORMATIVA PRF N\u00BA 88, DE 15 DE JUNHO DE 2022 (SEI n\u00BA 41976568).");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](107, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](108, "td", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](109, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](110, "ATIVIDADES");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](111, "table");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](112, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](113, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](114, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](115, "Descri\u00E7\u00E3o da atividade");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](116, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](117, "Tempo de execu\u00E7\u00E3o da atividade em regime presencial");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](118, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](119, "Tempo de execu\u00E7\u00E3o da atividade em teletrabalho");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](120, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](121, "Ganho percentual de produtividade estabelecido, quando aplic\u00E1vel");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](122, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](123, PlanoTermoAdesaoComponent_tr_123_Template, 9, 4, "tr", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.plano == null ? null : ctx.plano.usuario == null ? null : ctx.plano.usuario.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.plano == null ? null : ctx.plano.unidade == null ? null : ctx.plano.unidade.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.plano == null ? null : ctx.plano.usuario == null ? null : ctx.plano.usuario.matricula);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.lookup.getValue(ctx.lookup.USUARIO_VINCULACAO, ctx.plano == null ? null : ctx.plano.usuario == null ? null : ctx.plano.usuario.vinculacao));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", ctx.util.getDateFormatted(ctx.plano == null ? null : ctx.plano.data_inicio_vigencia), " \u00E0 ", ctx.util.getDateFormatted(ctx.plano == null ? null : ctx.plano.data_fim_vigencia), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.plano == null ? null : ctx.plano.tipo_modalidade == null ? null : ctx.plano.tipo_modalidade.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.ganhoProdutividade, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.cargaHorariaTitulo);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.cargaHoraria, " horas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.plano == null ? null : ctx.plano.tempo_total, " horas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Pelo presente termo de ci\u00EAncia e responsabilidade, em raz\u00E3o da solicita\u00E7\u00E3o de ades\u00E3o ao Programa de Gest\u00E3o por Resultados da ", ctx.auth.entidade == null ? null : ctx.auth.entidade.nome, ",");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.atividades);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby10ZXJtby1hZGVzYW8uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "sGQK":
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-form/plano-form.component.ts ***!
  \*************************************************************************/
/*! exports provided: PlanoFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoFormComponent", function() { return PlanoFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ "hmA2");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-dao.service */ "eHo6");
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ "lKXT");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/documento.model */ "xrhv");
/* harmony import */ var src_app_models_plano_atividade_model__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/models/plano-atividade.model */ "Ug/M");
/* harmony import */ var src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/models/plano-trabalho-entrega.model */ "5QEa");
/* harmony import */ var src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/models/plano.model */ "710e");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/modules/uteis/documentos/documento.service */ "B+/1");
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/services/calendar.service */ "3WFG");
/* harmony import */ var _plano_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../plano.service */ "ZJ8V");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ "NRF3");
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ "sRLT");
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ "qz5Q");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ "UJzD");
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ "m4bG");
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ "d7UH");
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ "pFmK");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ "A5xB");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ "7B2Z");
/* harmony import */ var _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../../uteis/documentos/documentos.component */ "jO9R");







































const _c0 = ["gridAtividades"];
const _c1 = ["gridDocumentos"];
const _c2 = ["tabs"];
const _c3 = ["usuario"];
const _c4 = ["unidade"];
const _c5 = ["programa"];
const _c6 = ["tipoModalidade"];
const _c7 = ["planoEntrega"];
const _c8 = ["atividade"];
const _c9 = ["entrega"];
const _c10 = ["documentos"];
function PlanoFormComponent_separator_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "separator", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "calendar-efemerides", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("efemerides", ctx_r6.horasTotais)("partial", false);
} }
function PlanoFormComponent_separator_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "separator", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "calendar-efemerides", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("efemerides", ctx_r7.horasParciais);
} }
function PlanoFormComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r24 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", (row_r24.atividade == null ? null : row_r24.atividade.nome) || "", "");
} }
const _c11 = function () { return ["cadastros", "atividade"]; };
const _c12 = function (a0) { return { route: a0 }; };
function PlanoFormComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-search", 47, 48);
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r12.formAtividades.controls.atividade_id)("dao", ctx_r12.atividadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](5, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](4, _c11)));
} }
function PlanoFormComponent_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"]((row_r27.entrega == null ? null : row_r27.entrega.entrega == null ? null : row_r27.entrega.entrega.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r27.entrega == null ? null : row_r27.entrega.descricao);
} }
function PlanoFormComponent_ng_template_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-select", 49, 50);
} if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r17.formEntregas.controls.entrega_id)("items", ctx_r17.entregas);
} }
function PlanoFormComponent_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r30 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", row_r30.nome || "", "");
} }
function PlanoFormComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-text", 51);
} if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r21.formEntregas.controls.nome);
} }
function PlanoFormComponent_tab_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tab", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "separator", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "input-switch", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "input-editor", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "separator", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](5, "input-switch", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](6, "input-editor", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("disabled", ctx_r22.form.controls.editar_texto_complementar_unidade.value ? undefined : "true")("dataset", ctx_r22.planoDataset);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("disabled", ctx_r22.form.controls.editar_texto_complementar_usuario.value ? undefined : "true")("dataset", ctx_r22.planoDataset);
} }
function PlanoFormComponent_tab_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tab", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "documentos", 60, 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx_r23.entityDocumentos)("cdRef", ctx_r23.cdRef)("needSign", ctx_r23.planoService.needSign)("extraTags", ctx_r23.planoService.extraTags)("editingId", ctx_r23.documentoId)("datasource", ctx_r23.datasource)("template", ctx_r23.template);
} }
const _c13 = function () { return ["entidade"]; };
const _c14 = function () { return ["configuracoes", "unidade"]; };
const _c15 = function () { return ["afastamentos"]; };
const _c16 = function () { return ["configuracoes", "usuario"]; };
const _c17 = function () { return ["template_tcr"]; };
const _c18 = function () { return ["gestao", "programa"]; };
const _c19 = function () { return ["entregas.entrega"]; };
const _c20 = function () { return ["gestao", "plano-entrega"]; };
const _c21 = function () { return ["cadastros", "tipo-modalidade"]; };
const _c22 = function () { return ["usuario_id", "unidade_id"]; };
const _c23 = function () { return ["programa_id", "usuario_id", "unidade_id", "tipo_modalidade_id"]; };
class PlanoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_15__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_14__["Plano"], src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_4__["PlanoDaoService"]);
        this.injector = injector;
        this.entregas = [];
        this._entityDocumentos = new src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_14__["Plano"]();
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
            var _a, _b;
            let result = null;
            if (['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !((_a = control.value) === null || _a === void 0 ? void 0 : _a.length)) {
                result = "Obrigatório";
            }
            else if (['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            else if (['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
                if (!this.util.isDataValid(control.value)) {
                    result = "Inválido";
                }
                else if (!((_b = this.programa) === null || _b === void 0 ? void 0 : _b.searchObj)) {
                    result = "Selecionar programa";
                }
                else if (controlName == 'data_inicio_vigencia' && control.value.getTime() < this.programa.searchObj.data_inicio_vigencia.getTime()) {
                    result = "Menor que programa";
                }
                else if (controlName == 'data_fim_vigencia' && control.value.getTime() > this.programa.searchObj.data_fim_vigencia.getTime()) {
                    result = "Maior que programa";
                }
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
        this.join = ["unidade.entidade", "entregas.entrega.entrega", "plano_entrega.entregas.entrega", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "atividades.atividade"];
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__["ProgramaDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__["UsuarioDaoService"]);
        this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__["AtividadeDaoService"]);
        this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__["PlanoEntregaDaoService"]);
        this.documentoService = injector.get(src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_16__["DocumentoService"]);
        this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_17__["CalendarService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_10__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_7__["TipoModalidadeDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_3__["DocumentoDaoService"]);
        this.planoService = injector.get(_plano_service__WEBPACK_IMPORTED_MODULE_18__["PlanoService"]);
        this.planoDataset = this.dao.dataset();
        this.form = this.fh.FormBuilder({
            carga_horaria: { default: "" },
            tempo_total: { default: "" },
            tempo_proporcional: { default: "" },
            data_inicio_vigencia: { default: new Date() },
            data_fim_vigencia: { default: new Date() },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            ganho_produtividade: { default: 0 },
            programa_id: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
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
        var _a, _b, _c, _d, _e, _f;
        /* _entityDocumentos é atualizado pelo angular na chamada do get entityDocumentos() */
        let data = this.dao.datasource(this._entityDocumentos);
        /* Atualiza os campos de texto complementar do usuário e da unidade */
        data.usuario.texto_complementar_plano = this.form.controls.usuario_texto_complementar.value || "";
        data.unidade.texto_complementar_plano = this.form.controls.unidade_texto_complementar.value || "";
        if (JSON.stringify(data) != this.JSON.stringify(this._datasource)) {
            this._datasource = data;
            /* Se o termo for um documento obrigatório, então será gerado um termo automaticamente */
            let programa = (_a = this.programa) === null || _a === void 0 ? void 0 : _a.searchObj;
            this.documentoId = undefined;
            if (programa === null || programa === void 0 ? void 0 : programa.termo_obrigatorio) {
                this.documentoId = this.form.controls.documento_id.value;
                let documentos = this.form.controls.documentos.value || [];
                let documento = documentos === null || documentos === void 0 ? void 0 : documentos.find((x) => x.id == this.documentoId);
                if (!((_b = this.documentoId) === null || _b === void 0 ? void 0 : _b.length) || !documento || documento.assinaturas.length || documento.id_documento) {
                    this.documentoId = (_c = this.dao) === null || _c === void 0 ? void 0 : _c.generateUuid(),
                        documentos.push(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__["Documento"]({
                            id: this.documentoId,
                            especie: "TCR",
                            titulo_documento: "Termo de Ciência e Responsabilidade",
                            conteudo: "",
                            status: "GERADO",
                            _status: "ADD",
                            template: (_d = programa.template_tcr) === null || _d === void 0 ? void 0 : _d.conteudo,
                            dataset: this.dao.dataset(),
                            datasource: this.datasource,
                            entidade_id: (_e = this.auth.entidade) === null || _e === void 0 ? void 0 : _e.id,
                            plano_id: (_f = this.entity) === null || _f === void 0 ? void 0 : _f.id,
                            template_id: programa.template_tcr_id
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
        return this.planoService.template(this._entityDocumentos);
    }
    get isTermos() {
        return this.action == "termos";
    }
    onProgramaSelect(selected) {
        var _a, _b;
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_inicio_vigencia.updateValueAndValidity();
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.data_fim_vigencia.updateValueAndValidity();
        let programa = selected.entity;
        this.cdRef.detectChanges();
    }
    updateEntregas(planoEntrega) {
        var _a;
        this.entregas = ((_a = planoEntrega === null || planoEntrega === void 0 ? void 0 : planoEntrega.entregas) === null || _a === void 0 ? void 0 : _a.map(x => { var _a; return Object.assign({}, { key: x.id, value: ((_a = x.entrega) === null || _a === void 0 ? void 0 : _a.nome) || x.descricao, data: x }); })) || [];
    }
    onPlanoEntregaSelect(selected) {
        this.updateEntregas(selected.entity);
        this.cdRef.detectChanges();
    }
    onTipoModalidadeSelect(selected) {
        var _a, _b;
        const tipoModalidade = (_a = this.tipoModalidade) === null || _a === void 0 ? void 0 : _a.searchObj;
        if (tipoModalidade)
            (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.ganho_produtividade.setValue(tipoModalidade.ganho_produtividade);
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
    onUnidadeSelect(selected) {
        var _a, _b, _c;
        this.form.controls.unidade_texto_complementar.setValue(((_a = selected.entity) === null || _a === void 0 ? void 0 : _a.texto_complementar_plano) || "");
        this.form.controls.forma_contagem_carga_horaria.setValue(((_c = (_b = selected.entity) === null || _b === void 0 ? void 0 : _b.entidade) === null || _c === void 0 ? void 0 : _c.forma_contagem_carga_horaria) || "DIA");
        this.calculaTempos();
        this.cdRef.detectChanges();
    }
    calculaTempos() {
        var _a, _b, _c, _d, _e;
        const inicio = (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.data_inicio_vigencia.value;
        const fim = (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.data_fim_vigencia.value;
        const carga = ((_c = this.form) === null || _c === void 0 ? void 0 : _c.controls.carga_horaria.value) || 8;
        const unidade = (_d = this.unidade) === null || _d === void 0 ? void 0 : _d.searchObj;
        const usuario = (_e = this.usuario) === null || _e === void 0 ? void 0 : _e.searchObj;
        if (usuario && unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim)) {
            this.calendar.loadFeriadosCadastrados(unidade.id).then((feriados) => {
                var _a, _b;
                this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], []);
                this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], usuario.afastamentos);
                (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
                (_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
            });
        }
    }
    loadData(entity, form) {
        var _a, _b, _c, _d, _e;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let formValue = Object.assign({}, form.value);
            this.updateEntregas(entity.plano_entrega);
            yield Promise.all([
                this.calendar.loadFeriadosCadastrados(entity.unidade_id),
                (_a = this.unidade) === null || _a === void 0 ? void 0 : _a.loadSearch(entity.unidade || entity.unidade_id),
                (_b = this.usuario) === null || _b === void 0 ? void 0 : _b.loadSearch(entity.usuario || entity.usuario_id),
                (_c = this.programa) === null || _c === void 0 ? void 0 : _c.loadSearch(entity.programa || entity.programa_id),
                (_d = this.tipoModalidade) === null || _d === void 0 ? void 0 : _d.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id),
                (_e = this.planoEntrega) === null || _e === void 0 ? void 0 : _e.loadSearch(entity.plano_entrega || entity.plano_entrega_id)
            ]);
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
                this.entity = new src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_14__["Plano"]();
                this.entity.unidade_id = this.auth.unidade.id;
                this.entity.carga_horaria = ((_a = this.auth.entidade) === null || _a === void 0 ? void 0 : _a.carga_horaria_padrao) || 8;
                this.entity.forma_contagem_carga_horaria = ((_b = this.auth.entidade) === null || _b === void 0 ? void 0 : _b.forma_contagem_carga_horaria) || "DIA";
            }
            this.loadData(this.entity, this.form);
        });
    }
    /* Atividades */
    addAtividades() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new src_app_models_plano_atividade_model__WEBPACK_IMPORTED_MODULE_12__["PlanoAtividade"]({ plano_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id, _status: "ADD" });
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
            return new src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_13__["PlanoTrabalhoEntrega"]({ plano_id: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id, _status: "ADD" });
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
        let plano = this.util.fill(new src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_14__["Plano"](), this.entity);
        plano = this.util.fillForm(plano, this.form.value);
        plano.usuario = this.usuario.searchObj;
        plano.unidade = this.unidade.searchObj;
        plano.programa = this.programa.searchObj;
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
            plano.atividades = plano.atividades.filter((atividade) => {
                atividade.id = atividade.id.includes("-") ? atividade.id : "";
                return ["ADD", "EDIT", "DELETE"].includes(atividade._status || "");
            });
            plano.documentos = plano.documentos.filter((documento) => {
                return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
            });
            /* Salva separadamente as informações do plano */
            this.entity = yield this.dao.save(plano);
            if (this.form.controls.editar_texto_complementar_unidade.value) {
                yield this.unidadeDao.update(plano.unidade_id, { texto_complementar_plano: this.form.controls.unidade_texto_complementar.value });
            }
            if (this.form.controls.editar_texto_complementar_usuario.value) {
                yield this.usuarioDao.update(plano.unidade_id, { texto_complementar_plano: this.form.controls.usuario_texto_complementar.value });
            }
            return true;
        });
    }
    documentoDynamicButtons(row) {
        let result = [];
        let documento = row;
        if (this.isTermos && this.planoService.needSign(this.entity, documento)) {
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
            const documento = new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__["Documento"]();
            documento.id = this.dao.generateUuid();
            documento.plano_id = this.entity.id;
            documento._status = "ADD";
            this.go.navigate({ route: ['gestao', 'plano', 'termo'] }, { metadata: { documento: documento, plano: this.entity }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (() => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            let documentos = (this.form.controls.documentos.value || []);
                            if (this.isTermos) {
                                this.clearErros();
                                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                try {
                                    modalResult = yield this.documentoDao.save(Object.assign(new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__["Documento"](), {
                                        especie: "TERMO_ADESAO",
                                        conteudo: modalResult === null || modalResult === void 0 ? void 0 : modalResult.termo,
                                        metadados: { atividades_termo_adesao: modalResult.atividades_termo_adesao },
                                        plano_id: this.entity.id,
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
PlanoFormComponent.ɵfac = function PlanoFormComponent_Factory(t) { return new (t || PlanoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__["Injector"])); };
PlanoFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({ type: PlanoFormComponent, selectors: [["app-plano-form"]], viewQuery: function PlanoFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c7, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c8, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c9, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c10, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.documentos = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]], decls: 57, vars: 88, consts: [[3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title"], ["tabs", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Unidade", "icon", "fab fa-unity", "controlName", "unidade_id", 3, "size", "control", "join", "dao", "selectRoute", "select"], ["unidade", ""], ["label", "Usu\u00E1rio", "icon", "bi bi-person", "controlName", "usuario_id", 3, "size", "control", "dao", "join", "selectRoute", "select"], ["usuario", ""], ["label", "Programa", "icon", "bi bi-layout-text-window-reverse", "controlName", "programa_id", 3, "size", "control", "join", "dao", "selectRoute", "select"], ["programa", ""], ["label", "Plano de Entrega", "icon", "bi bi-list-check", "controlName", "plano_entrega_id", 3, "size", "control", "join", "dao", "selectRoute", "select"], ["planoEntrega", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio_vigencia", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim_vigencia", "labelInfo", "Final da Vig\u00EAncia do Plano de Trabalho", 3, "size", "control", "change"], ["label", "Modalidade", "icon", "bi bi-cast", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute", "select"], ["tipoModalidade", ""], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio (M\u00E1x.: di\u00E1ria 24 horas; semana 24*5=240 horas; mensal 24*20=480 horas)", 3, "size", "unit", "control", "unitChange", "change"], ["onlyHours", "", "disabled", "", "label", "Horas Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["onlyHours", "", "disabled", "", "label", "Horas Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["numbers", "", "label", "% Ganho produtividade", "icon", "bi bi-hourglass-split", "controlName", "ganho_produtividade", "labelInfo", "Percentual de ganho de produtividade (Ser\u00E1 descontado do tempo pactuado)", 3, "size", "control"], ["title", "C\u00E1lculos das horas totais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas parciais", "collapse", "", 4, "ngIf"], ["key", "ATIVIDADES", "label", "Atividades"], ["type", "warning", "message", "Caso a lista fique vazia, ser\u00E1 considerado as atividades da unidade (e subordinadas)"], ["clss", "row"], ["editable", "", 3, "control", "form", "add", "load", "hasDelete", "remove", "save"], ["gridAtividades", ""], ["title", "Atividade", "titleHint", "Atividade autorizada para o plano de trabalho", 3, "template", "editTemplate"], ["columnAtividade", ""], ["editAtividade", ""], ["type", "options"], ["key", "ENTREGAS", "label", "Entregas"], ["type", "warning", "message", "Entregas do plano de entregas da unidade"], ["gridEntregas", ""], ["title", "Entrega", "titleHint", "Entrega do plano de entregas da unidade", 3, "template", "editTemplate"], ["columnEntrega", ""], ["editEntrega", ""], ["title", "Detalhamento", "titleHint", "Detalhamento da entrega", 3, "template", "editTemplate"], ["columnDetalhamento", ""], ["editDetalhamento", ""], ["key", "MENSAGENS", "label", "Texto Complementar", 4, "ngIf"], ["key", "TERMO", "label", "Termo", 4, "ngIf"], ["title", "C\u00E1lculos das horas totais", "collapse", ""], [3, "efemerides", "partial"], ["title", "C\u00E1lculos das horas parciais", "collapse", ""], [3, "efemerides"], ["controlName", "atividade_id", 3, "size", "control", "dao", "selectRoute"], ["atividade", ""], ["controlName", "entrega_id", 3, "size", "control", "items"], ["entrega", ""], ["controlName", "nome", 3, "size", "control"], ["key", "MENSAGENS", "label", "Texto Complementar"], ["title", "Texto complementar da unidade"], ["controlName", "editar_texto_complementar_unidade", "scale", "small", "labelPosition", "right", "label", "Editar texto complementar na unidade", 3, "size"], ["controlName", "unidade_texto_complementar", 3, "disabled", "dataset"], ["title", "Texto complementar do usuario"], ["controlName", "editar_texto_complementar_usuario", "scale", "small", "labelPosition", "right", "label", "Editar texto complementar do usu\u00E1rio", 3, "size"], ["controlName", "usuario_texto_complementar", 3, "disabled", "dataset"], ["key", "TERMO", "label", "Termo"], ["noPersist", "", "especie", "TCR", 3, "entity", "cdRef", "needSign", "extraTags", "editingId", "datasource", "template"], ["documentos", ""]], template: function PlanoFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("submit", function PlanoFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function PlanoFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "tabs", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanoFormComponent_Template_input_search_select_5_listener($event) { return ctx.onUnidadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](7, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanoFormComponent_Template_input_search_select_7_listener($event) { return ctx.onUsuarioSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](10, "input-search", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanoFormComponent_Template_input_search_select_10_listener($event) { return ctx.onProgramaSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](12, "input-search", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanoFormComponent_Template_input_search_select_12_listener($event) { return ctx.onPlanoEntregaSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](15, "input-datetime", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function PlanoFormComponent_Template_input_datetime_change_15_listener($event) { return ctx.onDataInicioChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](16, "input-datetime", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function PlanoFormComponent_Template_input_datetime_change_16_listener($event) { return ctx.onDataFimChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](17, "input-search", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanoFormComponent_Template_input_search_select_17_listener($event) { return ctx.onTipoModalidadeSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](19, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](20, "input-workload", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function PlanoFormComponent_Template_input_workload_change_20_listener($event) { return ctx.onCargaHorariaChenge($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](21, "input-timer", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](22, "input-timer", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](23, "input-text", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](24, PlanoFormComponent_separator_24_Template, 2, 2, "separator", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](25, PlanoFormComponent_separator_25_Template, 2, 1, "separator", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](26, "tab", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](27, "top-alert", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](28, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](29, "grid", 26, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](31, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](32, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](33, PlanoFormComponent_ng_template_33_Template, 2, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](35, PlanoFormComponent_ng_template_35_Template, 2, 7, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](37, "column", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](38, "tab", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](39, "top-alert", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](40, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](41, "grid", 26, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](43, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](44, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](45, PlanoFormComponent_ng_template_45_Template, 5, 2, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](47, PlanoFormComponent_ng_template_47_Template, 2, 3, "ng-template", null, 37, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](49, "column", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](50, PlanoFormComponent_ng_template_50_Template, 2, 1, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](52, PlanoFormComponent_ng_template_52_Template, 1, 2, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](54, "column", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](55, PlanoFormComponent_tab_55_Template, 7, 6, "tab", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](56, PlanoFormComponent_tab_56_Template, 4, 7, "tab", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](34);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](36);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](46);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](48);
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](51);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](53);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.unidade_id)("join", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](67, _c13))("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](69, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](68, _c14)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.usuario_id)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](71, _c15))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](73, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](72, _c16)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.programa_id)("join", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](75, _c17))("dao", ctx.programaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](77, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](76, _c18)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.plano_entrega_id)("join", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](79, _c19))("dao", ctx.planoEntregaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](81, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](80, _c20)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim_vigencia);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](84, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](83, _c21)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("unit", ctx.formaContagemCargaHoraria)("control", ctx.form.controls.carga_horaria)("unitChange", ctx.onFormaContagemCargaHorariaChange.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_total);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_proporcional);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.ganho_produtividade);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.horasTotais);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.horasParciais);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("control", ctx.form.controls.atividades)("form", ctx.formAtividades)("add", ctx.addAtividades.bind(ctx))("load", ctx.loadAtividades.bind(ctx))("hasDelete", true)("remove", ctx.removeAtividades.bind(ctx))("save", ctx.saveAtividades.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r9)("editTemplate", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("control", ctx.form.controls.entregas)("form", ctx.formEntregas)("add", ctx.addEntregas.bind(ctx))("load", ctx.loadEntregas.bind(ctx))("hasDelete", true)("remove", ctx.removeEntregas.bind(ctx))("save", ctx.saveEntregas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r14)("editTemplate", _r16);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r18)("editTemplate", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](86, _c22)));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](87, _c23)));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__["TabComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_22__["InputSearchComponent"], _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_23__["InputDatetimeComponent"], _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_24__["InputWorkloadComponent"], _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_25__["InputTimerComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_26__["InputTextComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_27__["NgIf"], _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_28__["TopAlertComponent"], _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_29__["GridComponent"], _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_30__["ColumnsComponent"], _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_31__["ColumnComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_32__["SeparatorComponent"], _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_33__["CalendarEfemeridesComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_34__["InputSelectComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_35__["InputSwitchComponent"], _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_36__["InputEditorComponent"], _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_37__["DocumentosComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=modules-gestao-plano-plano-module.js.map