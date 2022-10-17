(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~listeners-listeners-module~modules-gestao-plano-plano-module"],{

/***/ "710e":
/*!***************************************!*\
  !*** ./src/app/models/plano.model.ts ***!
  \***************************************/
/*! exports provided: Plano */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plano", function() { return Plano; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Plano extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.carga_horaria = 0; //Carga horária diária do usuário
        this.tempo_total = 0; //Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        this.tempo_proporcional = 0; //tempo_total menos os afastamentos
        this.data_inicio_vigencia = new Date(); //Inicio do plano
        this.data_fim_vigencia = new Date(); //Fim do plano
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.ganho_produtividade = 0; /* Ganho de produtividade */
        this.programa_id = "";
        this.usuario_id = "";
        this.unidade_id = "";
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.tipo_modalidade_id = "";
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.documento_id = null;
        this.atividades = []; /* Entregas da demanda */
        this.documentos = []; /* Termos de adesão */
        this.demandas = []; /* Demandas vinculadas ao Plano */
        this.initialization(data);
    }
}


/***/ }),

/***/ "nUpE":
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/plano/plano-list/plano-list.component.ts ***!
  \*************************************************************************/
/*! exports provided: PlanoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoListComponent", function() { return PlanoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-dao.service */ "eHo6");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ "haq/");
/* harmony import */ var src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/plano.model */ "710e");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











function PlanoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "input-switch", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function PlanoListComponent_toolbar_1_Template_input_switch_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r36.onAgruparChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("control", ctx_r0.filter.controls.agrupar);
} }
function PlanoListComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r38 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r38);
} }
function PlanoListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "order", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Usu\u00E1rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r39 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r39);
} }
function PlanoListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r40 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r40.usuario == null ? null : row_r40.usuario.nome) || "", "");
} }
function PlanoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r41 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r41.programa == null ? null : row_r41.programa.nome) || "", "");
} }
function PlanoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r42 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r42.unidade == null ? null : row_r42.unidade.nome) || "", "");
} }
function PlanoListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r43 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r43.tipo_modalidade == null ? null : row_r43.tipo_modalidade.nome) || "", "");
} }
function PlanoListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0, " Vig\u00EAncia de");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "order", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "order", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, "Fim");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r44 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("header", header_r44);
} }
function PlanoListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r45 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r16.dao.getDateFormatted(row_r45.data_inicio_vigencia) + " at\u00E9 " + ctx_r16.dao.getDateFormatted(row_r45.data_fim_vigencia), "");
} }
function PlanoListComponent_ng_template_35_span_0_small_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Sei n\u00BA ", row_r46.documento == null ? null : row_r46.documento.numero_documento, "");
} }
function PlanoListComponent_ng_template_35_span_0_Template(rf, ctx) { if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PlanoListComponent_ng_template_35_span_0_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r52); const row_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r50.onProcessoClick(row_r46); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, PlanoListComponent_ng_template_35_span_0_small_3_Template, 3, 1, "small", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().row;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx_r47.allPages.getButtonTitle(row_r46.documento == null ? null : row_r46.documento.numero_processo, row_r46.documento == null ? null : row_r46.documento.numero_documento));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("role", (row_r46.documento == null ? null : row_r46.documento.numero_processo == null ? null : row_r46.documento.numero_processo.length) ? "button" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"]("bi " + ((row_r46.documento == null ? null : row_r46.documento.numero_processo == null ? null : row_r46.documento.numero_processo.length) ? "bi bi-folder-symlink" : "bi bi-x-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", (row_r46.documento == null ? null : row_r46.documento.numero_processo == null ? null : row_r46.documento.numero_processo.length) ? row_r46.documento == null ? null : row_r46.documento.numero_processo : "N\u00E3o atribu\u00EDdo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r46.documento == null ? null : row_r46.documento.numero_documento == null ? null : row_r46.documento.numero_documento.length);
} }
function PlanoListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PlanoListComponent_ng_template_35_span_0_Template, 4, 6, "span", 45);
} if (rf & 2) {
    const row_r46 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r46.documento == null ? null : row_r46.documento.numero_processo == null ? null : row_r46.documento.numero_processo.length);
} }
function PlanoListComponent_column_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "column", 47);
} if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx_r19.edit)("options", ctx_r19.options);
} }
function PlanoListComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r54 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r54.numero);
} }
function PlanoListComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r55 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r55.usuario == null ? null : row_r55.usuario.matricula) || "");
} }
function PlanoListComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r56 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r56.programa == null ? null : row_r56.programa.nome) || "");
} }
function PlanoListComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r57.unidade == null ? null : row_r57.unidade.nome) || "");
} }
function PlanoListComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r58 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r58.tipo_modalidade == null ? null : row_r58.tipo_modalidade.nome) || "");
} }
function PlanoListComponent_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r59 = ctx.row;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r31.util.getDateTimeFormatted(row_r59.data_inicio_vigencia));
} }
function PlanoListComponent_ng_template_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r60 = ctx.row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r33.util.getDateTimeFormatted(row_r60.data_fim_vigencia));
} }
function PlanoListComponent_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r61 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((row_r61.documento == null ? null : row_r61.documento.numero_processo == null ? null : row_r61.documento.numero_processo.length) ? row_r61.documento == null ? null : row_r61.documento.numero_processo : "N\u00E3o atribu\u00EDdo");
} }
const _c0 = function () { return ["configuracoes", "unidade"]; };
const _c1 = function (a0) { return { route: a0 }; };
const _c2 = function () { return ["cadastros", "tipo-modalidade"]; };
class PlanoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_9__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_model__WEBPACK_IMPORTED_MODULE_8__["Plano"], src_app_dao_plano_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanoDaoService"]);
        this.injector = injector;
        this.multiselectAllFields = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
        this.DATAS_FILTRO = [
            { key: "VIGENTE", value: "Vigente" },
            { key: "NAOVIGENTE", value: "Não vigente" },
            { key: "INICIAM", value: "Iniciam" },
            { key: "FINALIZAM", value: "Finalizam" }
        ];
        this.filterValidate = (control, controlName) => {
            var _a, _b;
            let result = null;
            if (controlName == "data_inicio" && control.value > ((_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.data_fim.value)) {
                result = "Maior que fim";
            }
            else if (controlName == "data_fim" && control.value < ((_b = this.filter) === null || _b === void 0 ? void 0 : _b.controls.data_inicio.value)) {
                result = "Menor que início";
            }
            return result;
        };
        this.filterWhere = (filter) => {
            var _a, _b, _c;
            let result = [];
            let form = filter.value;
            if ((_a = form.tipo_modalidade_id) === null || _a === void 0 ? void 0 : _a.length) {
                result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
            }
            if (form.data_filtro) {
                result.push(["data_filtro", "==", form.data_filtro]);
                result.push(["data_inicio", "==", form.data_inicio]);
                result.push(["data_fim", "==", form.data_fim]);
            }
            if ((_b = form.usuario) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["usuario.nome", "like", "%" + form.usuario + "%"]);
            }
            if ((_c = form.unidade_id) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            return result;
        };
        this.dynamicMultiselectMenu = (multiselected) => {
            let assinar = !!Object.keys(multiselected).length;
            let menu = [];
            Object.entries(multiselected).forEach(([key, value]) => {
                if (!this.needSign(value))
                    assinar = false;
            });
            if (assinar)
                menu.push({ label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
            return menu;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__["ProgramaDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["DocumentoDaoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioDaoService"]);
        this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__["ListenerAllPagesService"]);
        this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__["TipoModalidadeDaoService"]);
        /* Inicializações */
        this.title = this.lex.noun("Plano de trabalho", true);
        this.code = "MOD_PTR";
        this.filter = this.fh.FormBuilder({
            agrupar: { default: true },
            usuario: { default: "" },
            unidade_id: { default: null },
            tipo_modalidade_id: { default: null },
            data_filtro: { default: null },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() }
        }, this.cdRef, this.filterValidate);
        this.join = ["unidade.entidade", "usuario", "programa", "documento", "tipo_modalidade"];
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
        // Testa se o usuário possui permissão para exibir dados do plano de trabalho
        if (this.auth.hasPermissionTo("MOD_PTR_CONS")) {
            this.options.push({
                icon: "bi bi-info-circle",
                label: "Informações",
                onClick: this.consult.bind(this)
            });
        }
        // Testa se o usuário possui permissão para excluir o plano de trabalho
        if (this.auth.hasPermissionTo("MOD_PTR_EXCL")) {
            this.options.push({
                icon: "bi bi-trash",
                label: "Excluir",
                onClick: this.delete.bind(this)
            });
        }
        this.options.push({
            label: "Termos de adesão",
            icon: "bi bi-file-earmark-check",
            onClick: ((row) => this.go.navigate({ route: ['gestao', 'plano', row.id, 'termos'] }, { modalClose: (modalResult) => console.log(modalResult === null || modalResult === void 0 ? void 0 : modalResult.conteudo) })).bind(this)
        });
    }
    filterClear(filter) {
        filter.controls.usuario.setValue("");
        filter.controls.unidade_id.setValue(null);
        filter.controls.tipo_modalidade_id.setValue(null);
        filter.controls.data_filtro.setValue(null);
        filter.controls.data_inicio.setValue(new Date());
        filter.controls.data_fim.setValue(new Date());
        super.filterClear(filter);
    }
    onAgruparChange(event) {
        var _a, _b;
        const agrupar = this.filter.controls.agrupar.value;
        if ((agrupar && !((_a = this.groupBy) === null || _a === void 0 ? void 0 : _a.length)) || (!agrupar && ((_b = this.groupBy) === null || _b === void 0 ? void 0 : _b.length))) {
            this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
            this.grid.reloadFilter();
        }
    }
    onProcessoClick(row) {
        this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
    }
    needSign(plano) {
        var _a, _b;
        let ids = [];
        if ((_a = plano.documento_id) === null || _a === void 0 ? void 0 : _a.length) {
            const tipoModalidade = plano.tipo_modalidade; //(this.tipoModalidade?.searchObj as TipoModalidade);
            const usuario = plano.usuario; // (this.usuario?.searchObj as Usuario);
            const unidade = plano.unidade; // (this.unidade?.searchObj as Unidade);
            const entidade = unidade.entidade;
            //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura) && usuario)
                ids.push(usuario.id);
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_unidade) && unidade)
                ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
            if ((tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.exige_assinatura_gestor_entidade) && entidade)
                ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
        }
        return !!((_b = plano.documento_id) === null || _b === void 0 ? void 0 : _b.length) && ids.includes(this.auth.usuario.id);
    }
    assinar() {
        if (!this.grid.multiselectedCount) {
            this.dialog.alert("Selecione", "Nenhum plano seleciono");
        }
        else {
            this.dialog.confirm("Assinar", "Deseja realmente assinar " + this.grid.multiselectedCount + " documento" + (this.grid.multiselectedCount > 1 ? "s" : "") + "?").then(response => {
                if (response) {
                    this.loading = true;
                    this.documentoDao.assinar(Object.keys(this.grid.multiselected)).then(response => {
                        if (response === null || response === void 0 ? void 0 : response.length) {
                            this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
                            this.refresh();
                        }
                    }).finally(() => this.loading = false);
                }
            });
        }
    }
}
PlanoListComponent.selectRoute = { route: ["gestao", "plano"] };
PlanoListComponent.ɵfac = function PlanoListComponent_Factory(t) { return new (t || PlanoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["Injector"])); };
PlanoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: PlanoListComponent, selectors: [["app-plano-list"]], viewQuery: function PlanoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 64, vars: 64, consts: [["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "dynamicMultiselectMenu", "multiselectAllFields", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Usu\u00E1rio", "controlName", "usuario", "placeholder", "Usu\u00E1rio", 3, "size", "control"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Tipo de modalidade", "controlName", "tipo_modalidade_id", 3, "size", "control", "dao", "selectRoute"], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["date", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["field", "numero", 3, "titleTemplate", "minWidth"], ["titleNumero", ""], [3, "titleTemplate", "template"], ["titleUsuario", ""], ["columnUsuario", ""], ["title", "Programa", 3, "template"], ["columnPrograma", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["title", "Modalidade", 3, "template"], ["columnModalidade", ""], ["titleVigencia", ""], ["columnInicioVigencia", ""], ["title", "Termo de ades\u00E3o", 3, "template"], ["documento", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], ["title", "Numero", 3, "template"], ["reportNumero", ""], ["title", "Matricula usu\u00E1rio", 3, "template"], ["reportMatricula", ""], ["reportPrograma", ""], ["reportUnidade", ""], ["reportModalidade", ""], ["title", "In\u00EDcio vig\u00EAncia", 3, "template"], ["reportInicioVigencia", ""], ["title", "Fim vig\u00EAncia", 3, "template"], ["reportFimVigencia", ""], ["title", "Termo de Ades\u00E3o", 3, "template"], ["reportTermoAdesao", ""], [3, "rows"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["by", "numero", 3, "header"], ["by", "usuario.nome", 3, "header"], ["by", "data_inicio_vigencia", 3, "header"], ["by", "data_fim_vigencia", 3, "header"], ["class", "badge bg-light text-dark", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngIf"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title", "click"], ["type", "options", 3, "onEdit", "options"]], template: function PlanoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function PlanoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PlanoListComponent_toolbar_1_Template, 2, 2, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, PlanoListComponent_ng_template_13_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, PlanoListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, PlanoListComponent_ng_template_18_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, PlanoListComponent_ng_template_21_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](24, PlanoListComponent_ng_template_24_Template, 2, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](27, PlanoListComponent_ng_template_27_Template, 2, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](30, PlanoListComponent_ng_template_30_Template, 7, 2, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](32, PlanoListComponent_ng_template_32_Template, 2, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "column", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, PlanoListComponent_ng_template_35_Template, 1, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](37, PlanoListComponent_column_37_Template, 1, 2, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "column", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](40, PlanoListComponent_ng_template_40_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, PlanoListComponent_ng_template_43_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](46, PlanoListComponent_ng_template_46_Template, 1, 1, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](48, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](49, PlanoListComponent_ng_template_49_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](52, PlanoListComponent_ng_template_52_Template, 1, 1, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](54, "column", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](55, PlanoListComponent_ng_template_55_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](57, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](58, PlanoListComponent_ng_template_58_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](60, "column", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](61, PlanoListComponent_ng_template_61_Template, 1, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](63, "pagination", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](17);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](19);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](22);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](25);
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](28);
        const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](31);
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](33);
        const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](36);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](41);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](44);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](47);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](50);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](53);
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](56);
        const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](59);
        const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](62);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PTR_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PTR_EDT"))("dynamicMultiselectMenu", ctx.dynamicMultiselectMenu.bind(ctx))("multiselectAllFields", ctx.multiselectAllFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](59, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](58, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.tipo_modalidade_id)("dao", ctx.tipoModalidadeDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](62, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](61, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.DATAS_FILTRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r1)("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r3)("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("titleTemplate", _r13)("template", _r15);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r22);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r24);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r26);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r28);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r30);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r32);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r34);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "xIT/":
/*!**********************************************!*\
  !*** ./src/app/dao/documento-dao-service.ts ***!
  \**********************************************/
/*! exports provided: DocumentoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentoDaoService", function() { return DocumentoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DocumentoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Documento", injector);
        this.injector = injector;
    }
    documentoPendenteSei(id_documento) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pendente-sei', { id_documento }).subscribe(response => {
                if (response.error)
                    throw new Error(response.error);
                resolve((response === null || response === void 0 ? void 0 : response.data) ? this.getRow(response === null || response === void 0 ? void 0 : response.data) : undefined);
            }, error => reject(error));
        });
    }
    assinar(documentosIds) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/assinar', { documentos_ids: documentosIds }).subscribe(response => {
                if (response.error)
                    throw new Error(response.error);
                resolve((response === null || response === void 0 ? void 0 : response.rows) ? this.getRows(response) : undefined);
            }, error => reject(error));
        });
    }
}
DocumentoDaoService.ɵfac = function DocumentoDaoService_Factory(t) { return new (t || DocumentoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
DocumentoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DocumentoDaoService, factory: DocumentoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "xrhv":
/*!*******************************************!*\
  !*** ./src/app/models/documento.model.ts ***!
  \*******************************************/
/*! exports provided: Documento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Documento", function() { return Documento; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Documento extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.numero = 0; /* Numero do documento (gerado pelo sistema) */
        this.especie = "TERMO_ADESAO"; /* Especificação da espécie do documento (interno do sistema) */
        this.conteudo = null; /* "Conteúdo do arquivo */
        this.assinatura = null; /* Dados da assinatura, se nulo não está assinado */
        this.metadados = null; /* Metadados */
        this.id_processo = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
        this.numero_processo = null; /* Número do processo de entrega, com a formatação de origem */
        this.id_documento = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
        this.numero_documento = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
        this.titulo_documento = null; /* Numeração do tipo de documento no sistema integrado */
        this.entidade_id = null; /* Entidade */
        this.plano_id = null; /* Plano */
        this.tipo_documento_id = null; /* Tipo documento */
        this.tipo_processo_id = null; /* Tipo processo */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.status = "GERADO";
        this.assinaturas = [];
        this.initialization(data);
    }
}
Documento.STATUS_GERADO = "GERADO";
Documento.STATUS_AGUARDANDO_SEI = "GERADO";


/***/ })

}]);
//# sourceMappingURL=default~listeners-listeners-module~modules-gestao-plano-plano-module.js.map