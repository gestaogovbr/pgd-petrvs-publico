(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~listeners-listeners-module~modules-gestao-plano-trabalho-plano-trabalho-module"],{

/***/ "fLNm":
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-list/plano-trabalho-list.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: PlanoTrabalhoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoListComponent", function() { return PlanoTrabalhoListComponent; });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/grid/grid.component */ "m4bG");
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ "xIT/");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ "bsmI");
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ "8B/q");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ "hgR2");
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ "+vn/");
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plano-trabalho.service */ "g7eN");
/* harmony import */ var src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/uteis/documentos/documento.service */ "B+/1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");












function PlanoTrabalhoListComponent_toolbar_1_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "input-switch", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function PlanoTrabalhoListComponent_toolbar_1_Template_input_switch_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r39); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r38.onAgruparChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx_r0.filter.controls.agrupar);
} }
function PlanoTrabalhoListComponent_column_12_ng_template_1_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", row_r44.entregas == null ? null : row_r44.entregas.length, "");
} }
function PlanoTrabalhoListComponent_column_12_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, PlanoTrabalhoListComponent_column_12_ng_template_1_span_0_Template, 3, 1, "span", 46);
} if (rf & 2) {
    const row_r44 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r44.entregas == null ? null : row_r44.entregas.length);
} }
function PlanoTrabalhoListComponent_column_12_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "plano-trabalho-list-entrega", 49);
} if (rf & 2) {
    const row_r47 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("entity", row_r47);
} }
function PlanoTrabalhoListComponent_column_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "column", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PlanoTrabalhoListComponent_column_12_ng_template_1_Template, 1, 1, "ng-template", null, 44, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, PlanoTrabalhoListComponent_column_12_ng_template_3_Template, 1, 1, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](2);
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](4);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("align", "center")("hint", ctx_r1.lex.noun("Entrega", true))("template", _r40)("expandTemplate", _r42);
} }
function PlanoTrabalhoListComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "order", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r48 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("header", header_r48);
} }
function PlanoTrabalhoListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r49 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", "#" + row_r49.numero, "");
} }
function PlanoTrabalhoListComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "order", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Usu\u00E1rio");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r50 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("header", header_r50);
} }
function PlanoTrabalhoListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (row_r51.usuario == null ? null : row_r51.usuario.nome) || "", "");
} }
function PlanoTrabalhoListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (row_r52.programa == null ? null : row_r52.programa.nome) || "", "");
} }
function PlanoTrabalhoListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r53 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (row_r53.unidade == null ? null : row_r53.unidade.nome) || "", "");
} }
function PlanoTrabalhoListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r54 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (row_r54.tipo_modalidade == null ? null : row_r54.tipo_modalidade.nome) || "", "");
} }
function PlanoTrabalhoListComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0, " Vig\u00EAncia de");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "order", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "order", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, "Fim");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const header_r55 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("header", header_r55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("header", header_r55);
} }
function PlanoTrabalhoListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r56 = ctx.row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r19.dao.getDateFormatted(row_r56.data_inicio_vigencia) + " at\u00E9 " + ctx_r19.dao.getDateFormatted(row_r56.data_fim_vigencia), "");
} }
function PlanoTrabalhoListComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "documentos-badge", 54);
} if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("documento", row_r57.documento)("maxWidth", 200);
} }
function PlanoTrabalhoListComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r58 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r58.numero);
} }
function PlanoTrabalhoListComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r59 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r59.usuario == null ? null : row_r59.usuario.matricula) || "");
} }
function PlanoTrabalhoListComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r60 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r60.programa == null ? null : row_r60.programa.nome) || "");
} }
function PlanoTrabalhoListComponent_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r61 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r61.unidade == null ? null : row_r61.unidade.nome) || "");
} }
function PlanoTrabalhoListComponent_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r62 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r62.tipo_modalidade == null ? null : row_r62.tipo_modalidade.nome) || "");
} }
function PlanoTrabalhoListComponent_ng_template_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r63 = ctx.row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r33.util.getDateTimeFormatted(row_r63.data_inicio_vigencia));
} }
function PlanoTrabalhoListComponent_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r64 = ctx.row;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r35.util.getDateTimeFormatted(row_r64.data_fim_vigencia));
} }
function PlanoTrabalhoListComponent_ng_template_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r65 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r65.documento == null ? null : row_r65.documento.numero_processo == null ? null : row_r65.documento.numero_processo.length) ? row_r65.documento == null ? null : row_r65.documento.numero_processo : "N\u00E3o atribu\u00EDdo");
} }
class PlanoTrabalhoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_8__["PageListBase"] {
    constructor(injector) {
        super(injector, src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_7__["PlanoTrabalho"], src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanoTrabalhoDaoService"]);
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
            if (controlName == "data_filtro_inicio" && control.value > ((_a = this.filter) === null || _a === void 0 ? void 0 : _a.controls.data_filtro_fim.value)) {
                result = "Maior que fim";
            }
            else if (controlName == "data_filtro_fim" && control.value < ((_b = this.filter) === null || _b === void 0 ? void 0 : _b.controls.data_filtro_inicio.value)) {
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
                result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
                result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
            }
            if ((_b = form.usuario) === null || _b === void 0 ? void 0 : _b.length) {
                result.push(["usuario.nome", "like", "%" + form.usuario + "%"]);
            }
            if ((_c = form.unidade_id) === null || _c === void 0 ? void 0 : _c.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            return result;
        };
        /*public needSign(plano: Plano): boolean {
          let ids: string[] = [];
          const documento = (plano.documentos || []).find(x => plano.documento_id?.length && x.id == plano.documento_id);
          if(documento && !documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id)) {
            const tipoModalidade = plano.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
            const usuario = plano.usuario!; // (this.usuario?.searchObj as Usuario);
            const unidade = plano.unidade!; // (this.unidade?.searchObj as Unidade);
            const entidade = unidade.entidade!;
            if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
            if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
            if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
          }
          return !!documento && ids.includes(this.auth.usuario!.id);
        }*/
        this.dynamicMultiselectMenu = (multiselected) => {
            let assinar = !!Object.keys(multiselected).length;
            let menu = [];
            Object.entries(multiselected).forEach(([key, value]) => {
                if (!this.planoService.needSign(value))
                    assinar = false;
            });
            if (assinar)
                menu.push({ label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
            return menu;
        };
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__["UnidadeDaoService"]);
        this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__["ProgramaDaoService"]);
        this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_1__["DocumentoDaoService"]);
        this.documentoService = injector.get(src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_10__["DocumentoService"]);
        this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioDaoService"]);
        this.planoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_9__["PlanoTrabalhoService"]);
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
            data_filtro_inicio: { default: new Date() },
            data_filtro_fim: { default: new Date() }
        }, this.cdRef, this.filterValidate);
        this.join = ["unidade.entidade", "usuario", "programa", "documento.assinaturas.usuario:id,nome,url_foto", "tipo_modalidade",
            "entregas.plano_entrega_entrega.entrega", "entregas.entrega", "plano_entrega.entregas.entrega"];
        this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
    }
    dynamicOptions(row) {
        let result = [];
        let plano = row;
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
        const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.edit.bind(this) };
        const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
        const BOTAO_ASSINAR = { label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) };
        const BOTAO_TERMOS = { label: "Termos", icon: "bi bi-file-earmark-check", onClick: ((row) => this.go.navigate({ route: ['uteis', 'documentos', 'TCR', row.id] }, { modalClose: (modalResult) => console.log(modalResult === null || modalResult === void 0 ? void 0 : modalResult.conteudo), metadata: this.planoService.metadados(row) })).bind(this) };
        if (this.auth.hasPermissionTo("MOD_PTR_CONS"))
            result.push(BOTAO_INFORMACOES);
        if (this.auth.hasPermissionTo('MOD_PTR_EDT'))
            result.push(BOTAO_ALTERAR);
        if (this.auth.hasPermissionTo("MOD_PTR_EXCL"))
            result.push(BOTAO_EXCLUIR);
        if (this.planoService.needSign(plano))
            result.push(BOTAO_ASSINAR);
        result.push(BOTAO_TERMOS);
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        let plano = row;
        const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
        const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.edit.bind(this) };
        const BOTAO_ASSINAR = { hint: "Assinar", icon: "bi bi-pen", color: "btn-outline-dark", onClick: this.assinar.bind(this) };
        if (this.planoService.needSign(plano))
            result.push(BOTAO_ASSINAR);
        else if (this.auth.hasPermissionTo('MOD_PTR_EDT'))
            result.push(BOTAO_ALTERAR);
        else if (this.auth.hasPermissionTo("MOD_PTR_CONS"))
            result.push(BOTAO_INFORMACOES);
        return result;
    }
    filterClear(filter) {
        filter.controls.usuario.setValue("");
        filter.controls.unidade_id.setValue(null);
        filter.controls.tipo_modalidade_id.setValue(null);
        filter.controls.data_filtro.setValue(null);
        filter.controls.data_filtro_inicio.setValue(new Date());
        filter.controls.data_filtro_fim.setValue(new Date());
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
    assinar(row) {
        const planosIds = row ? [row.id] : Object.keys(this.grid.multiselected || {});
        const documentos = this.grid.items.filter(x => { var _a; return planosIds.includes(x.id) && ((_a = x.documento_id) === null || _a === void 0 ? void 0 : _a.length); }).map(x => x.documento);
        if (!documentos.length) {
            this.dialog.alert("Selecione", "Nenhum plano seleciono");
        }
        else {
            this.documentoService.sign(documentos).then(() => this.grid.reset());
            /*this.dialog.confirm("Assinar", "Deseja realmente assinar " + documentosIds.length + " documento" + (documentosIds.length > 1 ? "s" : "") + "?").then(response => {
              if(response) {
                this.loading = true;
                this.documentoDao.assinar(documentosIds).then(response => {
                  if(response?.length) {
                    this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
                    this.refresh();
                  }
                }).catch((error) => this.error("Erro ao tentar assinar: " + error.toString())).finally(() => this.loading = false);
              }
            });*/
        }
    }
}
PlanoTrabalhoListComponent.selectRoute = { route: ["gestao", "plano"] };
PlanoTrabalhoListComponent.ɵfac = function PlanoTrabalhoListComponent_Factory(t) { return new (t || PlanoTrabalhoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["Injector"])); };
PlanoTrabalhoListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: PlanoTrabalhoListComponent, selectors: [["plano-trabalho-list"]], viewQuery: function PlanoTrabalhoListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__["GridComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]], decls: 67, vars: 59, consts: [["multiselect", "", 3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "dynamicMultiselectMenu", "multiselectAllFields", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "usuario", "placeholder", "Usu\u00E1rio", 3, "size", "label", "control"], ["controlName", "unidade_id", 3, "size", "dao"], ["controlName", "tipo_modalidade_id", 3, "size", "dao"], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["date", "", "label", "In\u00EDcio", "controlName", "data_filtro_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["date", "", "label", "Fim", "controlName", "data_filtro_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], [3, "titleTemplate", "template", "minWidth"], ["titleNumero", ""], ["columnNumero", ""], [3, "titleTemplate", "template"], ["titleUsuario", ""], ["columnUsuario", ""], ["title", "Programa", 3, "template"], ["columnPrograma", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["title", "Modalidade", 3, "template"], ["columnModalidade", ""], ["titleVigencia", ""], ["columnInicioVigencia", ""], [3, "title", "template"], ["documento", ""], ["type", "options", 3, "dynamicOptions", "dynamicButtons"], ["title", "Numero", 3, "template"], ["reportNumero", ""], ["title", "Matricula usu\u00E1rio", 3, "template"], ["reportMatricula", ""], ["reportPrograma", ""], ["reportUnidade", ""], ["reportModalidade", ""], ["title", "In\u00EDcio vig\u00EAncia", 3, "template"], ["reportInicioVigencia", ""], ["title", "Fim vig\u00EAncia", 3, "template"], ["reportFimVigencia", ""], ["title", "Termo de Ades\u00E3o", 3, "template"], ["reportTermoAdesao", ""], [3, "rows"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate"], ["columnEntregas", ""], ["columnExpandedEntregas", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-list-check"], [3, "entity"], ["by", "numero", 3, "header"], ["by", "usuario.nome", 3, "header"], ["by", "data_inicio_vigencia", 3, "header"], ["by", "data_fim_vigencia", 3, "header"], ["signatures", "", "noRounded", "", "withLink", "", 3, "documento", "maxWidth"]], template: function PlanoTrabalhoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function PlanoTrabalhoListComponent_Template_grid_select_0_listener($event) { return ctx.onSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PlanoTrabalhoListComponent_toolbar_1_Template, 2, 2, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "filter", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-search", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "input-search", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, PlanoTrabalhoListComponent_column_12_Template, 5, 4, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, PlanoTrabalhoListComponent_ng_template_14_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, PlanoTrabalhoListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](18, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](19, PlanoTrabalhoListComponent_ng_template_19_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, PlanoTrabalhoListComponent_ng_template_21_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](24, PlanoTrabalhoListComponent_ng_template_24_Template, 2, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, PlanoTrabalhoListComponent_ng_template_27_Template, 2, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](30, PlanoTrabalhoListComponent_ng_template_30_Template, 2, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](33, PlanoTrabalhoListComponent_ng_template_33_Template, 7, 2, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](35, PlanoTrabalhoListComponent_ng_template_35_Template, 2, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](37, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](38, PlanoTrabalhoListComponent_ng_template_38_Template, 1, 2, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](40, "column", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](41, "report");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](43, PlanoTrabalhoListComponent_ng_template_43_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "column", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](46, PlanoTrabalhoListComponent_ng_template_46_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](48, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](49, PlanoTrabalhoListComponent_ng_template_49_Template, 1, 1, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](51, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](52, PlanoTrabalhoListComponent_ng_template_52_Template, 1, 1, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](54, "column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](55, PlanoTrabalhoListComponent_ng_template_55_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](57, "column", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](58, PlanoTrabalhoListComponent_ng_template_58_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](60, "column", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](61, PlanoTrabalhoListComponent_ng_template_61_Template, 1, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](63, "column", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](64, PlanoTrabalhoListComponent_ng_template_64_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](66, "pagination", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](15);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](17);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](20);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](22);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](25);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](28);
        const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](31);
        const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](34);
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](36);
        const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](39);
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](44);
        const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](47);
        const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](50);
        const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](53);
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](56);
        const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](59);
        const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](62);
        const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](65);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PTR_INCL"))("hasEdit", false)("dynamicMultiselectMenu", ctx.dynamicMultiselectMenu.bind(ctx))("multiselectAllFields", ctx.multiselectAllFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("label", ctx.lex.noun("Usu\u00E1rio"))("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("dao", ctx.tipoModalidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx.filter.controls.data_filtro)("items", ctx.DATAS_FILTRO);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("disabled", ctx.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx.filter.controls.data_filtro_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("titleTemplate", _r2)("template", _r4)("minWidth", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("titleTemplate", _r6)("template", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("titleTemplate", _r16)("template", _r18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", "Termo\nAssinaturas")("template", _r20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dynamicOptions", ctx.dynamicOptions.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r22);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r26);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r28);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r30);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r32);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r34);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r36);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFuby10cmFiYWxoby1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "g7eN":
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho.service.ts ***!
  \*************************************************************************/
/*! exports provided: PlanoTrabalhoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalhoService", function() { return PlanoTrabalhoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ "RHdA");



class PlanoTrabalhoService {
    constructor(auth, planoTrabalhoDao) {
        this.auth = auth;
        this.planoTrabalhoDao = planoTrabalhoDao;
    }
    template(plano) {
        var _a;
        return (_a = plano.programa) === null || _a === void 0 ? void 0 : _a.template_tcr;
    }
    metadados(plano) {
        var _a, _b;
        return {
            needSign: this.needSign.bind(this),
            extraTags: this.extraTags.bind(this),
            especie: "TCR",
            titulo_documento: "Termo de Ciência e Responsabilidade",
            dataset: this.planoTrabalhoDao.dataset(),
            datasource: this.planoTrabalhoDao.datasource(plano),
            template: (_a = plano.programa) === null || _a === void 0 ? void 0 : _a.template_tcr,
            template_id: (_b = plano.programa) === null || _b === void 0 ? void 0 : _b.template_tcr_id
        };
    }
    needSign(parent, item) {
        var _a, _b, _c, _d, _e;
        const plano = parent;
        const documento = item || ((plano === null || plano === void 0 ? void 0 : plano.documentos) || []).find(x => { var _a; return ((_a = plano === null || plano === void 0 ? void 0 : plano.documento_id) === null || _a === void 0 ? void 0 : _a.length) && x.id == (plano === null || plano === void 0 ? void 0 : plano.documento_id); }) || (plano === null || plano === void 0 ? void 0 : plano.documento);
        if (parent && documento && !((_a = documento.assinaturas) === null || _a === void 0 ? void 0 : _a.find(x => x.usuario_id == this.auth.usuario.id))) {
            const tipoModalidade = plano.tipo_modalidade;
            const entidade = this.auth.entidade;
            let ids = [];
            if (tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.plano_trabalho_assinatura_participante)
                ids.push(plano.usuario_id);
            if (tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.plano_trabalho_assinatura_gestor_unidade)
                ids.push(((_c = (_b = plano.unidade) === null || _b === void 0 ? void 0 : _b.gestor) === null || _c === void 0 ? void 0 : _c.id) || "", ((_e = (_d = plano.unidade) === null || _d === void 0 ? void 0 : _d.gestor_substituto) === null || _e === void 0 ? void 0 : _e.id) || "");
            if (tipoModalidade === null || tipoModalidade === void 0 ? void 0 : tipoModalidade.plano_trabalho_assinatura_gestor_entidade)
                ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
            return !!tipoModalidade && ids.includes(this.auth.usuario.id);
        }
        return false;
    }
    extraTags(parent, documento, metadado) {
        const plano = parent;
        let tags = [];
        if ((plano === null || plano === void 0 ? void 0 : plano.documento_id) == documento.id)
            tags.push({ key: documento.id, value: "Vigente", icon: "bi bi-check-all", color: "primary" });
        if (JSON.stringify(metadado.tags) != JSON.stringify(tags))
            metadado.tags = tags;
        return metadado.tags;
    }
}
PlanoTrabalhoService.ɵfac = function PlanoTrabalhoService_Factory(t) { return new (t || PlanoTrabalhoService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_2__["PlanoTrabalhoDaoService"])); };
PlanoTrabalhoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PlanoTrabalhoService, factory: PlanoTrabalhoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "hgR2":
/*!************************************************!*\
  !*** ./src/app/models/plano-trabalho.model.ts ***!
  \************************************************/
/*! exports provided: PlanoTrabalho */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoTrabalho", function() { return PlanoTrabalho; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanoTrabalho extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.carga_horaria = 0; //Carga horária diária do usuário
        this.tempo_total = 0; //Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana
        this.tempo_proporcional = 0; //tempo_total menos os afastamentos
        this.data_inicio_vigencia = new Date(); //Inicio do plano
        this.data_fim_vigencia = new Date(); //Fim do plano
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.entregas = []; /* Entregas vinculadas ao Plano de Trabalho*/
        this.documentos = [];
        this.atividades = [];
        this.programa_id = "";
        this.usuario_id = "";
        this.unidade_id = "";
        this.tipo_modalidade_id = "";
        this.plano_entrega_id = "";
        this.documento_id = "";
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=default~listeners-listeners-module~modules-gestao-plano-trabalho-plano-trabalho-module.js.map