"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[5796],{

/***/ 41005:
/*!***************************************************!*\
  !*** ./src/app/dao/comparecimento-dao.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComparecimentoDaoService: () => (/* binding */ ComparecimentoDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class ComparecimentoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Comparecimento", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["data_comparecimento"];
  }
}
_class = ComparecimentoDaoService;
_class.ɵfac = function ComparecimentoDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 61210:
/*!*************************************************************!*\
  !*** ./src/app/models/plano-trabalho-consolidacao.model.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacao: () => (/* binding */ PlanoTrabalhoConsolidacao)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class PlanoTrabalhoConsolidacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.data_inicio = new Date();
    this.data_fim = new Date();
    this.status = "INCLUIDO"; // Status atual da consolidação
    this.avaliacoes = [];
    this.status_historico = [];
    this.plano_trabalho_id = "";
    this.avaliacao_id = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 65862:
/*!****************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-consolidacao-avaliacao/plano-trabalho-consolidacao-avaliacao.component.ts ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacaoAvaliacaoComponent: () => (/* binding */ PlanoTrabalhoConsolidacaoAvaliacaoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_plano_trabalho_consolidacao_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-trabalho-consolidacao.model */ 61210);
/* harmony import */ var src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-trabalho-consolidacao-dao.service */ 17046);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_avaliacao_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/avaliacao.model */ 31313);
/* harmony import */ var src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/avaliacao-dao.service */ 41095);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/unidade.service */ 20609);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../uteis/avaliar/avaliar-nota-badge/avaliar-nota-badge.component */ 56486);
/* harmony import */ var _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component */ 89775);

var _class;



























function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 33)(1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "profile-picture", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](3, "div", 36)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "br")(7, "badge", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const separator_r25 = ctx.separator;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_5_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("url", (tmp_0_0 = ctx_r5.usuarioSeparator(separator_r25)) == null ? null : tmp_0_0.url_foto)("size", 40)("hint", (tmp_2_0 = ctx_r5.usuarioSeparator(separator_r25)) == null ? null : tmp_2_0.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](((tmp_3_0 = ctx_r5.usuarioSeparator(separator_r25)) == null ? null : tmp_3_0.nome) || "Desconhecido");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r5.entityService.getIcon("Unidade"))("label", ((tmp_5_0 = ctx_r5.unidadeSeparator(separator_r25)) == null ? null : tmp_5_0.sigla) || "Desconhecido");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_toolbar_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "toolbar");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_16_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "plano-trabalho-consolidacao-form", 38, 39);
  }
  if (rf & 2) {
    const row_r27 = ctx.row;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("disabled", true)("entity", row_r27)("planoTrabalho", row_r27.plano_trabalho)("cdRef", ctx_r14.cdRef);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "badge", 40)(2, "badge", 41)(3, "br")(4, "badge", 42)(5, "badge", 42)(6, "badge", 42);
  }
  if (rf & 2) {
    const row_r29 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", row_r29.plano_trabalho.usuario.nome, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("textValue", ctx_r16.util.getDateFormatted(row_r29.plano_trabalho.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("textValue", ctx_r16.util.getDateFormatted(row_r29.plano_trabalho.data_fim));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r16.entityService.getIcon("Unidade"))("label", row_r29.plano_trabalho.unidade == null ? null : row_r29.plano_trabalho.unidade.sigla)("hint", ctx_r16.lex.translate("Unidade") + ": " + (row_r29.plano_trabalho.unidade == null ? null : row_r29.plano_trabalho.unidade.nome));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r16.entityService.getIcon("Programa"))("label", row_r29.plano_trabalho.programa == null ? null : row_r29.plano_trabalho.programa.nome)("hint", ctx_r16.lex.translate("Programa"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r16.entityService.getIcon("TipoModalidade"))("label", row_r29.plano_trabalho.tipo_modalidade == null ? null : row_r29.plano_trabalho.tipo_modalidade.nome)("hint", ctx_r16.lex.translate("Tipo de modalidade"));
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r30 = ctx.row;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r18.util.getDateFormatted(row_r30.data_inicio), " ");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r31 = ctx.row;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r20.util.getDateFormatted(row_r31.data_fim));
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_avaliar_nota_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "avaliar-nota-badge", 45);
  }
  if (rf & 2) {
    const row_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("align", "left")("tipoAvaliacao", row_r32.avaliacao.tipo_avaliacao)("nota", row_r32.avaliacao.nota);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_separator_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "separator", 46)(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("collapsed", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](row_r32.avaliacao.recurso);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](0, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_avaliar_nota_badge_0_Template, 1, 3, "avaliar-nota-badge", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_separator_1_Template, 3, 2, "separator", 44);
  }
  if (rf & 2) {
    const row_r32 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r32.avaliacao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r32.avaliacao == null ? null : row_r32.avaliacao.recurso == null ? null : row_r32.avaliacao.recurso.length);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_33_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 50);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "badge", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_33_badge_2_Template, 1, 0, "badge", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r37 = ctx.row;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("color", ctx_r24.lookup.getColor(ctx_r24.lookup.CONSOLIDACAO_STATUS, row_r37.status))("icon", ctx_r24.lookup.getIcon(ctx_r24.lookup.CONSOLIDACAO_STATUS, row_r37.status))("label", ctx_r24.lookup.getValue(ctx_r24.lookup.CONSOLIDACAO_STATUS, row_r37.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r37.avaliacao == null ? null : row_r37.avaliacao.recurso == null ? null : row_r37.avaliacao.recurso.length);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "grid", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_1_Template, 8, 6, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_toolbar_3_Template, 1, 0, "toolbar", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "filter", 8)(5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "input-search", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](8, "input-search", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("change", function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_Template_input_search_change_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrestoreView"](_r40);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵresetView"](ctx_r39.onUnidadeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](10, "input-switch", 14, 15)(12, "input-switch", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](14, "columns")(15, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_16_Template, 0, 0, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](18, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_18_Template, 2, 4, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](20, "column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](21, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_21_Template, 7, 12, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](23, "column", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](24, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_24_Template, 1, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](26, "column", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](27, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_27_Template, 2, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](29, "column", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](30, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_30_Template, 2, 2, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](32, "column", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](33, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_ng_template_33_Template, 3, 4, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](35, "column", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](36, "pagination", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](2);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](17);
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](19);
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](22);
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](25);
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](28);
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](31);
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](34);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("dao", ctx_r1.dao)("orderBy", ctx_r1.orderBy)("groupBy", ctx_r1.groupBy)("join", ctx_r1.join)("init", ctx_r1.initGrid.bind(ctx_r1))("hasAdd", false)("hasEdit", false)("loadList", ctx_r1.onGridLoad.bind(ctx_r1))("groupTemplate", _r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx_r1.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("form", ctx_r1.filter)("where", ctx_r1.filterWhere)("submit", ctx_r1.filterSubmit.bind(ctx_r1))("collapseChange", ctx_r1.filterCollapseChange.bind(ctx_r1))("collapsed", ctx_r1.filterCollapsed)("deleted", ctx_r1.auth.hasPermissionTo("MOD_AUDIT_DEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 5)("control", ctx_r1.filter.controls.usuario_id)("dao", ctx_r1.usuarioDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 5)("control", ctx_r1.filter.controls.unidade_id)("dao", ctx_r1.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("disabled", ctx_r1.canFilterSubordinadas)("control", ctx_r1.filter.controls.unidades_subordinadas);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("control", ctx_r1.filter.controls.incluir_arquivados);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r1.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("hint", ctx_r1.lex.translate("Consolida\u00E7\u00E3o"))("template", _r11)("expandTemplate", _r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Plano de trabalho/Vig\u00EAncia\nUnidade/Programa/Modalidade")("template", _r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Estat\u00EDsticas\nAvalia\u00E7\u00F5es")("template", _r21)("width", 300);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r23);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("dynamicButtons", ctx_r1.dynamicButtons.bind(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("rows", ctx_r1.rowsLimit);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 33)(1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "profile-picture", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](3, "div", 36)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "br")(7, "badge", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const separator_r58 = ctx.separator;
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_5_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("url", (tmp_0_0 = ctx_r42.usuarioSeparator(separator_r58)) == null ? null : tmp_0_0.url_foto)("size", 40)("hint", (tmp_2_0 = ctx_r42.usuarioSeparator(separator_r58)) == null ? null : tmp_2_0.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](((tmp_3_0 = ctx_r42.usuarioSeparator(separator_r58)) == null ? null : tmp_3_0.nome) || "Desconhecido");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r42.entityService.getIcon("Unidade"))("label", ((tmp_5_0 = ctx_r42.unidadeSeparator(separator_r58)) == null ? null : tmp_5_0.sigla) || "Desconhecido");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_toolbar_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "toolbar");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_16_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 64)(1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "profile-picture", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](3, "div", 66)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r72 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("url", row_r72.avaliador.url_foto || "")("size", 40)("hint", row_r72.avaliador.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](row_r72.avaliador.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](row_r72.avaliador.apelido || "");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 67)(1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r73 = ctx.row;
    const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("label", ctx_r65.getNota(row_r73).nota)("icon", ctx_r65.getNota(row_r73).icone)("color", ctx_r65.getNota(row_r73).cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](ctx_r65.getNota(row_r73).descricao);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_11_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 69);
  }
  if (rf & 2) {
    const justificativa_r76 = ctx.$implicit;
    const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r75.entityService.getIcon("TipoJustificativa"))("label", justificativa_r76.value);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](1, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_11_badge_2_Template, 1, 2, "badge", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r74 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", row_r74.justificativa || "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngForOf", row_r74.justificativas);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r77 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](row_r77.recurso || "");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 50);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 71);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_badge_1_Template, 1, 0, "badge", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_badge_2_Template, 1, 0, "badge", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r78 = ctx.row;
    const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r78.recurso == null ? null : row_r78.recurso.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r78.id == (ctx_r71.avaliacao == null ? null : ctx_r71.avaliacao.id));
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "grid", 55, 56)(2, "columns");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](3, "column", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "column", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_5_Template, 9, 5, "ng-template", null, 59, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](7, "column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](8, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_8_Template, 4, 4, "ng-template", null, 60, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](10, "column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](11, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_11_Template, 3, 2, "ng-template", null, 61, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](13, "column", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](14, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_14_Template, 2, 1, "ng-template", null, 63, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](16, "column", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](17, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_ng_template_17_Template, 3, 2, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r60 = ctx.row;
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](6);
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](9);
    const _r66 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](12);
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](15);
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](18);
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("items", ctx_r51.getAvaliacoes(row_r60))("minHeight", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r62);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Nota")("template", _r64);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Justificativas")("template", _r66);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r68);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r70);
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "badge", 40)(2, "badge", 41)(3, "br")(4, "badge", 42)(5, "badge", 42);
  }
  if (rf & 2) {
    const row_r81 = ctx.row;
    const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", row_r81.plano_trabalho.usuario.nome, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("textValue", ctx_r53.util.getDateFormatted(row_r81.plano_trabalho.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("textValue", ctx_r53.util.getDateFormatted(row_r81.plano_trabalho.data_fim));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r53.entityService.getIcon("Programa"))("label", row_r81.plano_trabalho.programa == null ? null : row_r81.plano_trabalho.programa.nome)("hint", ctx_r53.lex.translate("Programa"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r53.entityService.getIcon("TipoModalidade"))("label", row_r81.plano_trabalho.tipo_modalidade == null ? null : row_r81.plano_trabalho.tipo_modalidade.nome)("hint", ctx_r53.lex.translate("Tipo de modalidade"));
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r82 = ctx.row;
    const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r55.util.getDateFormatted(row_r82.data_inicio), " ");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r83 = ctx.row;
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r57.util.getDateFormatted(row_r83.data_fim), " ");
  }
}
function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r85 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "grid", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_1_Template, 8, 6, "ng-template", null, 51, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_toolbar_3_Template, 1, 0, "toolbar", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "filter", 8)(5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](6, "input-search", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](8, "input-search", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("change", function PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_Template_input_search_change_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrestoreView"](_r85);
      const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵresetView"](ctx_r84.onUnidadeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](10, "input-switch", 14, 15)(12, "input-switch", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](14, "columns")(15, "column", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_16_Template, 0, 0, "ng-template", null, 53, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](18, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_18_Template, 19, 9, "ng-template", null, 54, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](20, "column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](21, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_21_Template, 6, 9, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](23, "column", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](24, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_24_Template, 1, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](26, "column", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](27, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_ng_template_27_Template, 1, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](29, "pagination", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](2);
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](17);
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](19);
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](22);
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](25);
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](28);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("dao", ctx_r3.dao)("orderBy", ctx_r3.orderBy)("groupBy", ctx_r3.groupBy)("join", ctx_r3.join)("init", ctx_r3.initGrid.bind(ctx_r3))("hasAdd", false)("hasEdit", false)("loadList", ctx_r3.onGridLoadHistorico.bind(ctx_r3))("groupTemplate", _r41);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx_r3.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("form", ctx_r3.filter)("where", ctx_r3.filterWhereHistorico)("submit", ctx_r3.filterSubmit.bind(ctx_r3))("collapseChange", ctx_r3.filterCollapseChange.bind(ctx_r3))("collapsed", ctx_r3.filterCollapsed)("deleted", ctx_r3.auth.hasPermissionTo("MOD_AUDIT_DEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 5)("control", ctx_r3.filter.controls.usuario_id)("dao", ctx_r3.usuarioDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 5)("control", ctx_r3.filter.controls.unidade_id)("dao", ctx_r3.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("disabled", ctx_r3.canFilterSubordinadas)("control", ctx_r3.filter.controls.unidades_subordinadas);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("control", ctx_r3.filter.controls.incluir_arquivados);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r3.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("template", _r48)("expandTemplate", _r50);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Plano de trabalho/Vig\u00EAncia\nPrograma/Modalidade")("template", _r52);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r54);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r56);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("rows", ctx_r3.rowsLimit);
  }
}
class PlanoTrabalhoConsolidacaoAvaliacaoComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_2__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_plano_trabalho_consolidacao_model__WEBPACK_IMPORTED_MODULE_4__.PlanoTrabalhoConsolidacao, src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoConsolidacaoDaoService);
    this.injector = injector;
    this.avaliacoes = [];
    this.avaliacao = new src_app_models_avaliacao_model__WEBPACK_IMPORTED_MODULE_7__.Avaliacao();
    this.consolidacaoId = []; //public consolidacaoId?: PlanoTrabalhoConsolidacao[] = [];
    this.joinAvaliacao = ["avaliador", "entregas_checklist", "tipo_avaliacao.notas"];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      result.push(["status", "in", ["CONCLUIDO", "AVALIADO"]]);
      //    if(form.usuario_id?.length) result.push(["usuario_id", "==", form.usuario_id]);
      if (form.usuario_id?.length) result.push(["plano_trabalho.usuario.id", "==", form.usuario_id]);
      if (form.unidade_id?.length) result.push(["plano_trabalho.unidade.id", "==", form.unidade_id]);
      if (form.unidades_subordinadas) result.push(["unidades_subordinadas", "==", true]);
      if (form.incluir_arquivados) result.push(["incluir_arquivados", "==", true]);
      return result;
    };
    this.filterWhereHistorico = filter => {
      let result = [];
      let form = filter.value;
      result.push(["status", "in", ["AVALIADO"]]);
      if (form.usuario_id?.length) result.push(["plano_trabalho.usuario.id", "==", form.usuario_id]);
      if (form.unidade_id?.length) result.push(["plano_trabalho.unidade.id", "==", form.unidade_id]);
      if (form.unidades_subordinadas) result.push(["unidades_subordinadas", "==", true]);
      if (form.incluir_arquivados) result.push(["incluir_arquivados", "==", true]);
      return result;
    };
    this.unidadeService = injector.get(src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_10__.UnidadeService);
    /* Inicializações */
    this.join = ["avaliacao", "plano_trabalho:id" // "planoTrabalho.unidade:id,sigla,nome", "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", "planoTrabalho.unidade.gestorSubstituto:id,unidade_id,usuario_id", "planoTrabalho.tipoModalidade:id,nome", "planoTrabalho.usuario:id,nome,apelido,url_foto"
    ];

    this.extraJoin = ["avaliacao.tipoAvaliacao.notas", "planoTrabalho.unidade:id,sigla,nome", "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", "planoTrabalho.unidade.gestoresSubstitutos:id,unidade_id,usuario_id", "planoTrabalho.tipoModalidade:id,nome", "planoTrabalho.usuario:id,nome,apelido,foto_perfil,url_foto" //id,nome,apelido,url_foto,foto_perfil
    ];

    this.groupBy = [{
      field: "plano_trabalho.unidade.sigla",
      label: this.lex.translate("Unidade")
    }, {
      field: "plano_trabalho.unidade.id",
      label: "Unidade Id"
    }, {
      field: "plano_trabalho.usuario.nome",
      label: this.lex.translate("Participante")
    }, {
      field: "plano_trabalho.usuario.id",
      label: "Usuário Id"
    }];
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__.UnidadeDaoService);
    this.avaliacaoDao = injector.get(src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_8__.AvaliacaoDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_9__.PlanoTrabalhoService);
    this.title = "Avaliações " + this.lex.translate("das Consolidações");
    this.code = "MOD_PTR_CSLD_AVAL";
    this.filter = this.fh.FormBuilder({
      usuario_id: {
        default: ""
      },
      unidade_id: {
        default: ""
      },
      unidades_subordinadas: {
        default: false
      },
      incluir_arquivados: {
        default: false
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  ngOnInit() {
    super.ngOnInit();
    this.filter.controls.unidade_id.setValue(this.auth.unidadeGestor()?.id || this.auth.lotacao || null);
  }
  get canFilterSubordinadas() {
    return this.unidadeService.isGestorUnidade(this.filter.controls.unidade_id.value) ? undefined : 'true';
  }
  usuarioSeparator(separator) {
    let usuarioId = separator.group[3].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.usuario = separator.metadata.usuario || this.extra?.planos_trabalhos?.find(x => x.usuario_id == usuarioId)?.usuario;
    return separator.metadata.usuario;
  }
  unidadeSeparator(separator) {
    let unidadeId = separator.group[1].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.unidade = separator.metadata.unidade || this.extra?.planos_trabalhos?.find(x => x.unidade_id == unidadeId)?.unidade;
    return separator.metadata.unidade;
  }
  onUnidadeChange(event) {
    if (!this.unidadeService.isGestorUnidade(this.filter.controls.unidade_id.value)) this.filter.controls.unidades_subordinadas.setValue(false);
  }
  onGridLoad(rows) {
    this.extra = (this.grid?.query || this.query).extra;
    let planosTrabalhos = this.extra?.planos_trabalhos || [];
    planosTrabalhos.forEach(p => {
      let plano = p;
      plano.programa = this.extra?.programas?.find(x => x.id == plano.programa_id);
    });
    rows?.forEach(v => {
      let consolidacao = v;
      consolidacao.plano_trabalho = this.extra?.planos_trabalhos?.find(x => x.id == consolidacao.plano_trabalho_id);
      if (consolidacao.avaliacao) consolidacao.avaliacao.tipo_avaliacao = this.extra?.tipos_avaliacoes?.find(x => x.id == consolidacao.avaliacao.tipo_avaliacao_id);
    });
  }
  refreshConsolidacao(consolidacao) {
    var _this = this;
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.grid.query.refreshId(consolidacao.id, _this.extraJoin);
      _this.grid.refreshRows();
    })();
  }
  anterior(consolidacao) {
    return this.grid.items.reduce((a, v) => this.util.asTimestamp(v.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio) && (!a || this.util.asTimestamp(a.data_inicio) < this.util.asTimestamp(v.data_inicio)) ? v : a, undefined);
  }
  proximo(consolidacao) {
    return this.grid.items.reduce((a, v) => this.util.asTimestamp(v.data_fim) > this.util.asTimestamp(consolidacao.data_fim) && (!a || this.util.asTimestamp(a.data_fim) > this.util.asTimestamp(v.data_fim)) ? v : a, undefined);
  }
  dynamicButtons(row) {
    let result = [];
    let consolidacao = row;
    let programa = consolidacao.plano_trabalho.programa;
    const usuarioId = consolidacao.plano_trabalho.usuario_id;
    const unidadeId = consolidacao.plano_trabalho.unidade_id;
    const anterior = this.anterior(row);
    const proximo = this.proximo(row);
    const isAvaliador = this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL") && (this.unidadeService.isGestorUnidade(unidadeId) || this.auth.isIntegrante('AVALIADOR_PLANO_TRABALHO', unidadeId));
    const isUsuarioDoPlano = this.auth.usuario.id == usuarioId;
    const BOTAO_AVALIAR = {
      hint: "Avaliar",
      icon: "bi bi-star",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_REAVALIAR = {
      hint: "Reavaliar",
      icon: "bi bi-star-half",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_FAZER_RECURSO = {
      hint: "Fazer recurso",
      id: "RECORRIDO",
      icon: "bi bi-journal-medical",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.fazerRecurso(row, programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_CANCELAR_AVALIACAO = {
      hint: "Cancelar avaliação",
      id: "INCLUIDO",
      icon: "bi bi-backspace",
      color: "btn-outline-danger",
      onClick: row => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this))
    };
    /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
    const canAvaliar = !anterior || ["AVALIADO"].includes(anterior.status);
    const canCancelarAvaliacao = !proximo || ["INCLUIDO", "CONCLUIDO"].includes(proximo.status);
    if (consolidacao.status == "CONCLUIDO" && canAvaliar && isAvaliador) {
      result.push(BOTAO_AVALIAR);
    }
    if (consolidacao.status == "AVALIADO" && consolidacao.avaliacao) {
      /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
      if (isUsuarioDoPlano && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao.avaliacao?.data_avaliacao && (!programa.dias_tolerancia_recurso_avaliacao || this.util.daystamp(consolidacao.avaliacao.data_avaliacao) + programa.dias_tolerancia_recurso_avaliacao > this.util.daystamp(this.auth.hora))) {
        result.push(BOTAO_FAZER_RECURSO);
      }
      /* (RN_AVL_3) [PT] Após o recurso será realizado nova avaliação, podendo essa ser novamente recorrida dentro do mesmo prazo estabelecido no programa; */
      /* (RN_AVL_6) [PT] Qualquer usuário capaz de avaliar tambem terá a capacidade de cancelar a avaliação; */
      if (canAvaliar && isAvaliador) {
        result.push(BOTAO_REAVALIAR);
        if (canCancelarAvaliacao) result.push(BOTAO_CANCELAR_AVALIACAO);
      }
    }
    return result;
  }
  onSelectTab(tab) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.viewInit) _this2.saveUsuarioConfig({
        active_tab: tab.key
      });
    })();
  }
  initGrid(grid) {
    grid.queryInit();
  }
  getAvaliacoes(row) {
    return this.avaliacoes.filter(x => x.plano_trabalho_consolidacao_id == row.id);
  }
  loadData() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.loading = true;
      try {
        _this3.avaliacoes = yield _this3.avaliacaoDao.query({
          where: [["plano_trabalho_consolidacao_id", "in", _this3.consolidacaoId]],
          join: _this3.joinAvaliacao,
          orderBy: [["data_avaliacao", "desc"]]
        }).asPromise();
        _this3.avaliacao = _this3.avaliacoes[0] || _this3.avaliacao;
      } finally {
        _this3.loading = false;
      }
    })();
  }
  onGridLoadHistorico(rows) {
    this.extra = (this.grid?.query || this.query).extra;
    let planosTrabalhos = this.extra?.planos_trabalhos || [];
    planosTrabalhos.forEach(p => {
      let plano = p;
      plano.programa = this.extra?.programas?.find(x => x.id == plano.programa_id);
    });
    rows?.forEach(v => {
      this.consolidacaoId?.push(v.id);
      let consolidacao = v;
      consolidacao.plano_trabalho = this.extra?.planos_trabalhos?.find(x => x.id == consolidacao.plano_trabalho_id);
      if (consolidacao.avaliacao) consolidacao.avaliacao.tipo_avaliacao = this.extra?.tipos_avaliacoes?.find(x => x.id == consolidacao.avaliacao.tipo_avaliacao_id);
    });
    this.loadData();
  }
  getNota(row) {
    return row.tipo_avaliacao.notas.find(x => x.codigo == row.nota);
  }
}
_class = PlanoTrabalhoConsolidacaoAvaliacaoComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoAvaliacaoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_25__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-trabalho-consolidacao-avaliacao"]],
  viewQuery: function PlanoTrabalhoConsolidacaoAvaliacaoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵInheritDefinitionFeature"]],
  decls: 7,
  vars: 5,
  consts: [["right", "", 3, "title", "select"], ["key", "CONSOLIDACOES", "icon", "bi bi-clipboard-check", 3, "label", "template"], ["consolidacoes", ""], ["key", "HISTORICO", "icon", "bi bi-clipboard-pulse", "label", "Hist\u00F3rico de Avalia\u00E7\u00F5es", 3, "template"], ["historico", ""], [3, "dao", "orderBy", "groupBy", "join", "init", "hasAdd", "hasEdit", "loadList", "groupTemplate"], ["groupUnidadeUsuario", ""], [4, "ngIf"], [3, "form", "where", "submit", "collapseChange", "collapsed", "deleted"], [1, "row"], ["controlName", "usuario_id", 3, "size", "control", "dao"], ["usuario", ""], ["controlName", "unidade_id", 3, "size", "control", "dao", "change"], ["unidade", ""], ["label", "Sub.", "controlName", "unidades_subordinadas", "labelInfo", "Incluir as unidades subordinadas", 3, "size", "disabled", "control"], ["subordinadas", ""], ["label", "Arq.", "controlName", "incluir_arquivados", "labelInfo", "Incluir os planos de trabalhos arquivados", 3, "size", "control"], ["arquivadas", ""], ["type", "expand", 3, "icon", "align", "hint", "template", "expandTemplate"], ["columnConsolidacao", ""], ["columnExpandedConsolidacao", ""], [3, "title", "template"], ["columnPlanoTrabalho", ""], ["title", "Data in\u00EDcio", 3, "template"], ["columnDataInicio", ""], ["title", "Data fim", 3, "template"], ["columnDataFim", ""], [3, "title", "template", "width"], ["columnEstatisticas", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "dynamicButtons"], [3, "rows"], [1, "d-flex"], [1, "ms-3"], [3, "url", "size", "hint"], [1, "flex-fill", "ms-3"], ["color", "primary", 3, "icon", "label"], [3, "disabled", "entity", "planoTrabalho", "cdRef"], ["consolidacao", ""], ["label", "In\u00EDcio", "color", "light", "icon", "bi bi-calendar2", 3, "textValue"], ["label", "T\u00E9rmino", "color", "light", "icon", "bi bi-calendar2-check", 3, "textValue"], ["color", "light", 3, "icon", "label", "hint"], [3, "align", "tipoAvaliacao", "nota", 4, "ngIf"], ["title", "Recurso da avalia\u00E7\u00E3o", "collapse", "", 3, "collapsed", 4, "ngIf"], [3, "align", "tipoAvaliacao", "nota"], ["title", "Recurso da avalia\u00E7\u00E3o", "collapse", "", 3, "collapsed"], [1, "one-per-line"], [3, "color", "icon", "label"], ["icon", "bi bi-journal-medical", "color", "warning", "label", "Recorrido", 4, "ngIf"], ["icon", "bi bi-journal-medical", "color", "warning", "label", "Recorrido"], ["groupHistorico", ""], ["type", "expand", 3, "icon", "align", "template", "expandTemplate"], ["columnHistorico", ""], ["columnExpandedHistorico", ""], [3, "items", "minHeight"], ["gridEntregas", ""], ["title", "Data", "type", "datetime", "field", "data_avaliacao"], ["title", "Avaliador", 3, "template"], ["columnAvaliador", ""], ["columnNota", ""], ["columnJustificativa", ""], ["title", "Recurso", 3, "template"], ["columnRecurso", ""], [1, "avaliador"], [1, "avaliador-profile"], [1, "avaliador-nome"], [3, "label", "icon", "color"], [3, "icon", "label", 4, "ngFor", "ngForOf"], [3, "icon", "label"], ["icon", "bi bi-check-circle", "color", "success", "label", "Vigente", 4, "ngIf"], ["icon", "bi bi-check-circle", "color", "success", "label", "Vigente"]],
  template: function PlanoTrabalhoConsolidacaoAvaliacaoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_2_Template, 37, 42, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](4, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoAvaliacaoComponent_ng_template_5_Template, 30, 36, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](3);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("label", ctx.lex.translate("Consolida\u00E7\u00F5es"))("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r2);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_26__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__.InputSearchComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_18__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_19__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_20__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_21__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_22__.ProfilePictureComponent, _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_23__.AvaliarNotaBadgeComponent, _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_24__.PlanoTrabalhoConsolidacaoFormComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 89775:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacaoFormComponent: () => (/* binding */ PlanoTrabalhoConsolidacaoFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-trabalho-consolidacao-dao.service */ 17046);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var _plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../plano-entrega/plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var _atividade_atividade_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../atividade/atividade.service */ 57338);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_models_comparecimento_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/comparecimento.model */ 39373);
/* harmony import */ var src_app_dao_comparecimento_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/dao/comparecimento-dao.service */ 41005);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/dao/ocorrencia-dao.service */ 25034);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../components/reaction/reaction.component */ 32877);
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ 81419);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);

var _class;

































const _c0 = ["gridEntregas"];
const _c1 = ["gridAtividades"];
const _c2 = ["etiqueta"];
const _c3 = ["tipoAtividade"];
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_5_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](1, "badge", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](2, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](4, "reaction", 50);
  }
  if (rf & 2) {
    const row_r43 = ctx.row;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", row_r43.numero)("data", row_r43.numero)("click", ctx_r30.atividadeService.onIdClick.bind(ctx_r30));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](row_r43.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("entity", row_r43);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "input-textarea", 51);
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx_r32.formAtividade.controls.descricao);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 54);
  }
  if (rf & 2) {
    const tempo_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("badge", tempo_r47);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_badge_1_Template, 1, 1, "badge", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r45 = ctx.row;
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", ctx_r34.atividadeService.temposAtividade(row_r45));
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "separator", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](1, "input-datetime", 56)(2, "input-datetime", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx_r36.formAtividade.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx_r36.formAtividade.controls.data_entrega);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 62);
  }
  if (rf & 2) {
    const etiqueta_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("lookup", etiqueta_r53);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_separator_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "separator", 63);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "i", 67);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_i_2_Template, 1, 0, "i", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](3, "td", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r55 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", check_r55.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](check_r55.texto);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_Template, 5, 2, "tr", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", row_r49.checklist);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "progress-bar", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_badge_1_Template, 1, 1, "badge", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_separator_2_Template, 1, 0, "separator", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_Template, 2, 1, "table", 61);
  }
  if (rf & 2) {
    const row_r49 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("value", row_r49.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", row_r49.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r49.checklist == null ? null : row_r49.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r49.checklist == null ? null : row_r49.checklist.length);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_separator_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "separator", 63);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](2, "input-switch", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](3, "td", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r63 = ctx.$implicit;
    const i_r64 = ctx.index;
    const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("source", ctx_r62.checklist)("path", i_r64 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](check_r63.texto);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_tr_1_Template, 5, 4, "tr", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", ctx_r61.checklist);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r66 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "input-number", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](1, "input-multiselect", 69)(2, "input-select", 70, 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("details", function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template_input_select_details_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r66);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r65.onEtiquetaConfigClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_separator_4_Template, 1, 0, "separator", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_Template, 2, 1, "table", 61);
  }
  if (rf & 2) {
    const row_r58 = ctx.row;
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("decimals", 2)("control", ctx_r40.formEdit.controls.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("control", ctx_r40.formEdit.controls.etiquetas)("addItemHandle", ctx_r40.addItemHandleEtiquetas.bind(ctx_r40));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("control", ctx_r40.formEdit.controls.etiqueta)("items", ctx_r40.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r58.checklist == null ? null : row_r58.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r58.checklist == null ? null : row_r58.checklist.length);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 77);
  }
  if (rf & 2) {
    const status_r70 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("data", status_r70)("color", status_r70.color)("icon", status_r70.icon)("label", status_r70.label);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_comentarios_widget_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "comentarios-widget", 78);
  }
  if (rf & 2) {
    const row_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("entity", row_r67)("selectable", false)("grid", _r28);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "documentos-badge", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](1, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_badge_2_Template, 1, 4, "badge", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_comentarios_widget_3_Template, 1, 3, "comentarios-widget", 76);
  }
  if (rf & 2) {
    const row_r67 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](1);
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("documento", row_r67.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", ctx_r42.atividadeService.getStatus(row_r67, ctx_r42.entity));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", !_r28.editing);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "grid", 35, 36)(2, "columns")(3, "column", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_Template, 5, 5, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](6, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_6_Template, 1, 3, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](8, "column", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](9, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_Template, 2, 1, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](11, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_11_Template, 3, 3, "ng-template", null, 42, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](13, "column", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](14, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_Template, 4, 4, "ng-template", null, 43, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template, 6, 11, "ng-template", null, 44, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](18, "column", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](19, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_Template, 4, 3, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](21, "column", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r27 = ctx.row;
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](5);
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](7);
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](10);
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](12);
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](15);
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](17);
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](20);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("items", row_r27.atividades)("minHeight", 0)("form", ctx_r4.formAtividade)("hasAdd", !ctx_r4.disabled)("hasDelete", false)("hasEdit", false)("add", ctx_r4.addAtividade.bind(ctx_r4, row_r27.entrega))("load", ctx_r4.loadAtividade.bind(ctx_r4))("remove", ctx_r4.removeAtividade.bind(ctx_r4, row_r27.atividades))("save", ctx_r4.saveAtividade.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "#ID/Descri\u00E7\u00E3o")("width", 400)("template", _r29)("editTemplate", _r31)("columnEditTemplate", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : _r31)("edit", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : ctx_r4.onColumnAtividadeDescricaoEdit.bind(ctx_r4))("save", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : ctx_r4.onColumnAtividadeDescricaoSave.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "In\u00EDcio e Conclus\u00E3o")("width", 250)("template", _r33)("editTemplate", _r35);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "Progresso\nEtiquetas/Checklist")("width", 200)("template", _r37)("editTemplate", _r37)("columnEditTemplate", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : _r39)("edit", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : ctx_r4.onColumnProgressoEtiquetasChecklistEdit.bind(ctx_r4))("save", ctx_r4.atividadeOptionsMetadata.disabled ? undefined : ctx_r4.onColumnProgressoEtiquetasChecklistSave.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "n\u00BA Processo/Status\nComent\u00E1rios")("width", 300)("template", _r41)("editTemplate", _r41);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("metadata", ctx_r4.atividadeOptionsMetadata)("dynamicOptions", ctx_r4.atividadeService.dynamicOptions.bind(ctx_r4))("dynamicButtons", ctx_r4.atividadeService.dynamicButtons.bind(ctx_r4));
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 79);
  }
  if (rf & 2) {
    const row_r72 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", row_r72.badge.titulo)("color", row_r72.badge.cor);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](4, "reaction", 80);
  }
  if (rf & 2) {
    const row_r73 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate1"](" ", row_r73.badge.descricao || row_r73.entrega.descricao, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](row_r73.entrega.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("entity", row_r73.entrega);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 81);
  }
  if (rf & 2) {
    const row_r74 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", row_r74.entrega.forca_trabalho + "%");
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 82)(1, "br")(2, "badge", 83);
  }
  if (rf & 2) {
    const row_r75 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("textValue", row_r75.meta);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("textValue", row_r75.metaRealizado);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "progress-bar", 58);
  }
  if (rf & 2) {
    const row_r76 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("value", row_r76.progresso_realizado);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 87)(1, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("click", function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_0_div_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r83);
      const pObjetivo_r81 = restoredCtx.$implicit;
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r82.showPlanejamento(pObjetivo_r81.objetivo.planejamento_id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](2, "i", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pObjetivo_r81 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](pObjetivo_r81.objetivo.nome);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "separator", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_0_div_1_Template, 5, 1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]().row;
    const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", ctx_r78.lex.translate("Objetivos"))("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", row_r77.objetivos);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r88 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 87)(1, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("click", function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_1_div_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r88);
      const pProcesso_r86 = restoredCtx.$implicit;
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r87.showCadeiaValor(pProcesso_r86.processo.cadeia_valor_id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](2, "i", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pProcesso_r86 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate"](pProcesso_r86.processo.nome);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "separator", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_1_div_1_Template, 5, 1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]().row;
    const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", ctx_r79.lex.translate("Processos"))("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngForOf", row_r77.processos);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](0, PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_0_Template, 2, 3, "separator", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_separator_1_Template, 2, 3, "separator", 84);
  }
  if (rf & 2) {
    const row_r77 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r77.objetivos == null ? null : row_r77.objetivos.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", row_r77.processos == null ? null : row_r77.processos.length);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const row_r90 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("color", row_r90.tipo_motivo_afastamento.cor)("icon", row_r90.tipo_motivo_afastamento.icone)("label", row_r90.tipo_motivo_afastamento.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtextInterpolate1"](" ", row_r90.observacao, " ");
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "badge", 91);
  }
  if (rf & 2) {
    const row_r91 = ctx.row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("icon", ctx_r23.entityService.getIcon("Unidade"))("label", row_r91.unidade.sigla)("textValue", row_r91.unidade.nome);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "input-search", 92, 93);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 6)("dao", ctx_r25.unidadeDao);
  }
}
class PlanoTrabalhoConsolidacaoFormComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  set noPersist(value) {
    super.noPersist = value;
  }
  get noPersist() {
    return super.noPersist;
  }
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
    this.bindEntity();
  }
  get entity() {
    return super.entity;
  }
  set disabled(value) {
    if (this._disabled != value || this.atividadeOptionsMetadata.disabled !== value) {
      this._disabled = value;
      this.atividadeOptionsMetadata.disabled = value;
      this.cdRef.detectChanges();
    }
  }
  get disabled() {
    return this._disabled;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.joinAtividade = ['demandante', 'usuario', 'tipo_atividade', 'comentarios.usuario:id,nome,apelido', 'reacoes.usuario:id,nome,apelido'];
    this.itemsEntregas = [];
    this.etiquetas = [];
    this.itemsOcorrencias = [];
    this.itemsComparecimentos = [];
    this.itemsAfastamentos = [];
    this._disabled = true;
    this.validateAtividade = (control, controlName) => {
      let result = null;
      if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['data_inicio', 'data_entrega'].includes(controlName) && !this.util.isDataValid(control.value)) {
        //'data_distribuicao', 'data_estipulada_entrega',
        result = "Inválido";
      } /*else if (controlName == 'data_estipulada_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
        result = "Menor que distribuição";
        }*/else if (controlName == 'data_inicio' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
        result = "Menor que distribuição";
      } else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
        result = "Menor que distribuição";
      } else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_inicio.value.getTime()) {
        result = "Menor que início";
      }
      return result;
    };
    //Não apagar
    /*public validateOcorrencia = (control: AbstractControl, controlName: string) => {
      let result = null;
      if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if(['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if(controlName == 'data_fim' && control.value.getTime() < this.formOcorrencia?.controls.data_inicio.value.getTime()) {
        result = "Menor que início";
      }
      return result;
    }*/
    this.validateComparecimento = (control, controlName) => {
      let result = null;
      if (['detalhamento', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == 'data_comparecimento' && this.entity && !this.util.between(control.value, {
        start: this.entity.data_inicio,
        end: this.entity.data_fim
      })) {
        result = "Inválido";
      }
      return result;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_31__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoConsolidacaoDaoService);
    //this.consolidacaoOcorrenciaDao = injector.get<PlanoTrabalhoConsolidacaoOcorrenciaDaoService>(PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_13__.UnidadeDaoService);
    this.comparecimentoDao = injector.get(src_app_dao_comparecimento_dao_service__WEBPACK_IMPORTED_MODULE_12__.ComparecimentoDaoService);
    this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_8__.AtividadeDaoService);
    this.atividadeService = injector.get(_atividade_atividade_service__WEBPACK_IMPORTED_MODULE_9__.AtividadeService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_10__.CalendarService);
    this.ocorrenciaDao = injector.get(src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_14__.OcorrenciaDaoService);
    this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_6__.TipoAtividadeDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoService);
    this.planoEntregaService = injector.get(_plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_7__.PlanoEntregaService);
    this.formAtividade = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      etiquetas: {
        default: []
      },
      checklist: {
        default: []
      },
      comentarios: {
        default: []
      },
      esforco: {
        default: 0
      },
      tempo_planejado: {
        default: 0
      },
      data_distribuicao: {
        default: new Date()
      },
      data_estipulada_entrega: {
        default: new Date()
      },
      data_inicio: {
        default: new Date()
      },
      data_entrega: {
        default: new Date()
      }
      //tipo_atividade_id: { default: null }
    }, this.cdRef, this.validateAtividade);
    /*this.formOcorrencia = this.fh.FormBuilder({
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      descricao: { default: "" }
    }, this.cdRef, this.validateOcorrencia);*/
    this.formComparecimento = this.fh.FormBuilder({
      data_comparecimento: {
        default: new Date()
      },
      unidade_id: {
        default: ""
      },
      detalhamento: {
        default: ""
      }
    }, this.cdRef, this.validateComparecimento);
    this.formEdit = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      //tipo_atividade_id: { default: null },
      comentarios: {
        default: []
      },
      progresso: {
        default: 0
      },
      etiquetas: {
        default: []
      },
      etiqueta: {
        default: null
      }
    });
    this.atividadeOptionsMetadata = {
      refreshId: this.atividadeRefreshId.bind(this),
      removeId: this.atividadeRemoveId.bind(this),
      refresh: this.refresh.bind(this)
    };
  }
  refresh() {
    this.loadData(this.entity, this.form);
  }
  bindEntity() {
    if (this.entity) {
      this.entity._metadata = this.entity._metadata || {};
      this.entity._metadata.planoTrabalhoConsolidacaoFormComponent = this;
    }
  }
  atividadeRefreshId(id, atividade) {
    this.itemsEntregas.forEach(entrega => {
      let foundIndex = entrega.atividades.findIndex(x => x.id == id);
      if (foundIndex >= 0) {
        if (atividade) {
          entrega.atividades[foundIndex] = atividade;
        } else {
          this.atividadeDao.getById(id, this.joinAtividade).then(atividade => {
            if (atividade) entrega.atividades[foundIndex] = atividade;
          });
        }
      }
    });
    this.cdRef.detectChanges();
  }
  atividadeRemoveId(id) {
    this.itemsEntregas.forEach(entrega => {
      let foundIndex = entrega.atividades.findIndex(x => x.id == id);
      if (foundIndex >= 0) entrega.atividades.splice(foundIndex, 1);
    });
    this.cdRef.detectChanges();
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData(_this.entity, _this.form);
    })();
  }
  loadConsolidacao(dados) {
    this.itemsEntregas = dados.entregas.map(x => {
      if (x.plano_entrega_entrega) x.plano_entrega_entrega.plano_entrega = dados.planosEntregas.find(pe => pe.id == x.plano_entrega_entrega?.plano_entrega_id);
      let result = {
        id: x.id,
        entrega: x,
        atividades: dados.atividades.filter(y => y.plano_trabalho_entrega_id == x.id),
        badge: this.planoTrabalhoService.tipoEntrega(x, dados.planoTrabalho),
        meta: x.plano_entrega_entrega ? this.planoEntregaService.getValorMeta(x.plano_entrega_entrega) : '',
        metaRealizado: x.plano_entrega_entrega ? this.planoEntregaService.getValorRealizado(x.plano_entrega_entrega) : '',
        progresso_realizado: x.plano_entrega_entrega ? x.plano_entrega_entrega.progresso_realizado : 0,
        objetivos: x.plano_entrega_entrega ? x.plano_entrega_entrega.objetivos : [],
        processos: x.plano_entrega_entrega ? x.plano_entrega_entrega.processos : []
      };
      return result;
    });
    this.programa = dados.programa;
    this.planoTrabalho = dados.planoTrabalho;
    this.itemsOcorrencias = dados.ocorrencias;
    this.itemsComparecimentos = dados.comparecimentos;
    this.itemsAfastamentos = dados.afastamentos;
    this.unidade = dados.planoTrabalho.unidade || this.entity.plano_trabalho?.unidade;
    this.cdRef.detectChanges();
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.gridEntregas.loading = true;
      _this2.cdRef.detectChanges();
      try {
        let dados = yield _this2.dao.dadosConsolidacao(entity.id);
        _this2.loadConsolidacao(dados);
      } finally {
        _this2.gridEntregas.loading = false;
        _this2.cdRef.detectChanges();
      }
    })();
  }
  /***************************************************************************************
  * Atividades
  ****************************************************************************************/
  addAtividade(entrega) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let planoTrabalho = entrega.plano_trabalho || _this3.entity.plano_trabalho;
      let efemerides = _this3.calendar.calculaDataTempoUnidade(_this3.entity.data_inicio, _this3.entity.data_fim, planoTrabalho.carga_horaria, _this3.unidade, "ENTREGA");
      const tempoPlanejado = _this3.calendar.horasUteis(_this3.entity.data_inicio, _this3.entity.data_fim, planoTrabalho.carga_horaria, _this3.unidade, "DISTRIBUICAO");
      const dataInicio = _this3.util.maxDate(_this3.util.setTime(_this3.entity.data_inicio, 0, 0, 0), planoTrabalho.data_inicio);
      const dataFim = _this3.util.minDate(_this3.util.setTime(_this3.entity.data_fim, 23, 59, 59), planoTrabalho.data_fim);
      return new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__.Atividade({
        id: _this3.dao.generateUuid(),
        plano_trabalho: planoTrabalho,
        plano_trabalho_entrega: entrega,
        plano_trabalho_consolidacao: _this3.entity,
        demandante: _this3.auth.usuario,
        usuario: _this3.auth.usuario,
        unidade: _this3.unidade,
        data_distribuicao: dataInicio,
        carga_horaria: planoTrabalho.carga_horaria,
        data_estipulada_entrega: dataFim,
        data_inicio: dataInicio,
        data_entrega: dataFim,
        tempo_planejado: tempoPlanejado,
        tempo_despendido: efemerides?.tempoUtil || 0,
        status: 'CONCLUIDO',
        progresso: 100,
        plano_trabalho_id: _this3.entity.plano_trabalho_id,
        plano_trabalho_entrega_id: entrega.id,
        plano_trabalho_consolidacao_id: _this3.entity.id,
        demandante_id: _this3.auth.usuario.id,
        usuario_id: _this3.auth.usuario.id,
        unidade_id: _this3.unidade.id,
        metadados: {
          atrasado: false,
          tempo_despendido: 0,
          tempo_atraso: 0,
          pausado: false,
          iniciado: true,
          concluido: true,
          avaliado: false,
          arquivado: false,
          produtividade: 0,
          extra: undefined,
          _status: []
        }
      });
    })();
  }
  loadAtividade(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.formAtividade.patchValue(row);
      _this4.cdRef.detectChanges();
    })();
  }
  removeAtividade(atividades, row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        try {
          let atividade = row;
          yield _this5.atividadeDao?.delete(atividade);
          atividades.splice(atividades.findIndex(x => x.id == atividade.id), 1);
          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    })();
  }
  saveAtividade(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      console.log("AQIO");
      _this6.gridAtividades.error = "";
      _this6.formAtividade.markAllAsTouched();
      if (_this6.formAtividade.valid) {
        row.id = row.id == "NEW" ? _this6.dao.generateUuid() : row.id;
        _this6.util.fillForm(row, _this6.formAtividade.value);
        _this6.submitting = true;
        try {
          result = yield _this6.atividadeDao?.save(row, _this6.joinAtividade, ['etiquetas', 'checklist', 'comentarios', 'pausas', 'tarefas']);
          _this6.atividadeRefreshId(row.id, result);
        } catch (error) {
          result = false;
          _this6.gridAtividades.error = error.message || error;
        } finally {
          _this6.submitting = false;
        }
      }
      return result;
    })();
  }
  onDataDistribuicaoChange(event) {
    this.formAtividade.controls.data_inicio.setValue(this.formAtividade.controls.data_distribuicao.value);
  }
  onDataEstipuladaEntregaChange(event) {
    this.formAtividade.controls.data_entrega.setValue(this.formAtividade.controls.data_estipulada_entrega.value);
  }
  atividadeDynamicButtons(row) {
    let result = [];
    result.push(Object.assign({}, this.gridEntregas.BUTTON_EDIT, {}));
    result.push(Object.assign({}, this.gridEntregas.BUTTON_DELETE, {}));
    return result;
  }
  onColumnProgressoEtiquetasChecklistEdit(row) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.formEdit.controls.progresso.setValue(row.progresso);
      _this7.formEdit.controls.etiquetas.setValue(row.etiquetas);
      _this7.formEdit.controls.etiqueta.setValue(null);
      _this7.etiquetas = _this7.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
      _this7.etiquetas = _this7.util.merge(_this7.etiquetas, _this7.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
      _this7.etiquetas = _this7.util.merge(_this7.etiquetas, yield _this7.carregaEtiquetasUnidadesAscendentes(row.unidade), (a, b) => a.key == b.key);
      _this7.checklist = _this7.util.clone(row.checklist);
    })();
  }
  carregaEtiquetasUnidadesAscendentes(unidadeAtual) {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let etiquetasUnidades = [];
      let path = unidadeAtual.path.split("/");
      let unidades = yield _this8.unidadeDao.query({
        where: ["id", "in", path]
      }).asPromise();
      unidades.forEach(un => {
        etiquetasUnidades = _this8.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
      });
      return etiquetasUnidades;
    })();
  }
  onColumnProgressoEtiquetasChecklistSave(row) {
    var _this9 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const saved = yield _this9.atividadeDao.update(row.id, {
          progresso: _this9.formEdit.controls.progresso.value,
          etiquetas: _this9.formEdit.controls.etiquetas.value,
          checklist: _this9.checklist
        });
        row.progresso = _this9.formEdit.controls.progresso.value;
        row.checklist = _this9.checklist;
        return !!saved;
      } catch (error) {
        return false;
      }
    })();
  }
  onEtiquetaConfigClick() {
    this.go.navigate({
      route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id],
      params: {
        etiquetas: true
      }
    }, {
      modal: true,
      modalClose: modalResult => {
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
        this.cdRef.detectChanges();
      }
    });
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.formEdit.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.formEdit.controls.etiqueta.setValue(null);
      }
    }
    return result;
  }
  loadTipoAtividade(tipoAtividade) {
    if (tipoAtividade) {
      this.etiquetas = this.atividadeService.buildEtiquetas(this.unidade, tipoAtividade);
      this.atividadeService.buildChecklist(tipoAtividade, this.formAtividade.controls.checklist);
      this.formAtividade.controls.esforco.setValue(tipoAtividade?.esforco || 0);
    } else {
      this.etiquetas = [];
      this.formAtividade.controls.esforco.setValue(0);
    }
    this.cdRef.detectChanges();
  }
  onTipoAtividadeSelect(item) {
    const tipoAtividade = item.entity;
    this.loadTipoAtividade(tipoAtividade);
    this.atividadeService.comentarioAtividade(tipoAtividade, this.formAtividade.controls.comentarios);
    this.cdRef.detectChanges();
  }
  onColumnAtividadeDescricaoEdit(row) {
    var _this10 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this10.formAtividade.controls.descricao.setValue(row.descricao);
      //this.formEdit.controls.tipo_atividade_id.setValue(row.tipo_atividade_id);
      _this10.formAtividade.controls.comentarios.setValue(row.comentarios);
    })();
  }
  onColumnAtividadeDescricaoSave(row) {
    var _this11 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        _this11.atividadeService.comentarioAtividade(_this11.tipoAtividade?.selectedEntity, _this11.formAtividade.controls.comentarios);
        const saved = yield _this11.atividadeDao.update(row.id, {
          descricao: _this11.formAtividade.controls.descricao.value,
          //tipo_atividade_id: this.formEdit.controls.tipo_atividade_id.value,
          comentarios: (_this11.formAtividade.controls.comentarios.value || []).filter(x => ["ADD", "EDIT", "DELETE"].includes(x._status || ""))
        });
        row.descricao = _this11.formAtividade.controls.descricao.value;
        //row.tipo_atividade_id = this.formEdit.controls.tipo_atividade_id.value;
        row.tipo_atividade = _this11.tipoAtividade?.selectedEntity || null;
        row.comentarios = _this11.formAtividade.controls.comentarios.value;
        return !!saved;
      } catch (error) {
        return false;
      }
    })();
  }
  /***************************************************************************************
  * Ocorrências
  ****************************************************************************************/
  addOcorrencia() {
    var _this12 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /*return new PlanoTrabalhoConsolidacaoOcorrencia({
        plano_trabalho_consolidacao_id: this.entity!.id
      });*/
      _this12.go.navigate({
        route: ['gestao', 'ocorrencia', 'new']
      }, {
        metadata: {
          consolidacao: _this12.entity,
          planoTrabalho: _this12.planoTrabalho
        },
        modalClose: modalResult => {
          if (modalResult) _this12.refresh();
        }
      });
    })();
  }
  /*public async loadOcorrencia(form: FormGroup, row: any) {
    this.formAtividade.patchValue({
      data_inicio: row.data_inicio,
      data_fim: row.data_fim,
      descricao: row.descricao
    });
    this.cdRef.detectChanges();
  }
     public async saveOcorrencia(form: FormGroup, row: any) {
    let result = undefined;
    this.formOcorrencia.markAllAsTouched();
    if (this.formOcorrencia!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.data_inicio = form.controls.data_inicio.value;
      row.data_fim = form.controls.data_fim.value;
      row.descricao = form.controls.descricao.value;
      this.submitting = true;
      try {
        result = await this.consolidacaoOcorrenciaDao?.save(row);
      } finally {
        this.submitting = false;
      }
    }
    return result;
  }*/
  editOcorrencia(row) {
    var _this13 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this13.go.navigate({
        route: ["gestao", "ocorrencia", row.id, "edit"]
      }, {
        modalClose: modalResult => {
          if (modalResult) _this13.refresh();
        }
      });
    })();
  }
  removeOcorrencia(row) {
    var _this14 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this14.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?")) {
        _this14.submitting = true;
        try {
          let ocorrencia = row;
          yield _this14.ocorrenciaDao?.delete(ocorrencia);
          _this14.itemsOcorrencias.splice(_this14.itemsOcorrencias.findIndex(x => x.id == ocorrencia.id), 1);
        } finally {
          _this14.submitting = false;
        }
      }
    })();
  }
  ocorrenciaDynamicButtons(row) {
    let result = [];
    //result.push(Object.assign({}, this.OPTION_INFORMACOES, { onClick: (doc: Ocorrencia) => this.go.navigate({route: ["gestao", "ocorrencia", doc.id, "consult"]}) }));
    if (!this.disabled && this.auth.hasPermissionTo("MOD_OCOR_EDT")) result.push(Object.assign({}, this.OPTION_ALTERAR, {
      onClick: this.editOcorrencia.bind(this)
    }));
    if (!this.disabled && this.auth.hasPermissionTo("MOD_OCOR_EXCL")) result.push(Object.assign({}, this.OPTION_EXCLUIR, {
      onClick: this.removeOcorrencia.bind(this)
    }));
    return result;
  }
  /***************************************************************************************
  * Comparecimento
  ****************************************************************************************/
  addComparecimento() {
    var _this15 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_comparecimento_model__WEBPACK_IMPORTED_MODULE_11__.Comparecimento({
        unidade_id: _this15.unidade?.id,
        unidade: _this15.unidade,
        plano_trabalho_consolidacao_id: _this15.entity.id
      });
    })();
  }
  loadComparecimento(form, row) {
    var _this16 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this16.formComparecimento.patchValue({
        data_comparecimento: row.data_comparecimento,
        unidade_id: row.unidade_id,
        detalhamento: row.detalhamento
      });
      _this16.cdRef.detectChanges();
    })();
  }
  removeComparecimento(row) {
    var _this17 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this17.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        try {
          let comparecimento = row;
          yield _this17.comparecimentoDao?.delete(comparecimento);
          _this17.itemsComparecimentos.splice(_this17.itemsComparecimentos.findIndex(x => x.id == comparecimento.id), 1);
          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    })();
  }
  saveComparecimento(form, row) {
    var _this18 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this18.formComparecimento.markAllAsTouched();
      if (_this18.formComparecimento.valid) {
        row.id = row.id == "NEW" ? _this18.dao.generateUuid() : row.id;
        row.data_comparecimento = form.controls.data_comparecimento.value;
        row.detalhamento = form.controls.detalhamento.value;
        row.plano_trabalho_consolidacao_id = _this18.entity.id;
        row.unidade_id = form.controls.unidade_id.value;
        _this18.submitting = true;
        try {
          result = yield _this18.comparecimentoDao?.save(row);
        } finally {
          _this18.submitting = false;
        }
      }
      return result;
    })();
  }
  comparecimentoDynamicButtons(row) {
    let result = [];
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }
  /***************************************************************************************
  * Afastamentos
  ****************************************************************************************/
  addAfastamento() {
    var _this19 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this19.go.navigate({
        route: ['gestao', 'afastamento', 'new']
      }, {
        metadata: {
          consolidacao: _this19.entity
        },
        filterSnapshot: undefined,
        querySnapshot: undefined,
        modalClose: modalResult => {
          if (modalResult) _this19.refresh();
        }
      });
    })();
  }
  afastamentoDynamicButtons(row) {
    let result = [];
    result.push(Object.assign({}, this.OPTION_INFORMACOES, {
      onClick: doc => this.go.navigate({
        route: ["cadastros", "afastamento", doc.id, "consult"]
      })
    }));
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }
  showPlanejamento(planejamento_id) {
    var _this20 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this20.go.navigate({
        route: ['gestao', 'planejamento', planejamento_id, 'consult']
      }, {
        modal: true
      });
    })();
  }
  showCadeiaValor(cadeia_valor_id_id) {
    var _this21 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this21.go.navigate({
        route: ['gestao', 'cadeia-valor', cadeia_valor_id_id, 'consult']
      }, {
        modal: true
      });
    })();
  }
}
_class = PlanoTrabalhoConsolidacaoFormComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_31__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-consolidacao-form"]],
  viewQuery: function PlanoTrabalhoConsolidacaoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c3, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.gridEntregas = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
    }
  },
  inputs: {
    cdRef: "cdRef",
    planoTrabalho: "planoTrabalho",
    noPersist: "noPersist",
    control: "control",
    entity: "entity",
    disabled: "disabled"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵInheritDefinitionFeature"]],
  decls: 57,
  vars: 67,
  consts: [["collapse", "", 3, "collapsed", "title", "icon"], [3, "items", "minHeight"], ["gridEntregas", ""], ["type", "expand", 3, "icon", "align", "hint", "template", "expandTemplate"], ["columnConsolidacao", ""], ["columnExpandedConsolidacao", ""], ["title", "Origem", 3, "template", "width"], ["columnOrigem", ""], ["title", "Entrega", 3, "template"], ["columnEntrega", ""], ["title", "% CHD Planejado", 3, "template", "width", "titleHint"], ["columnForcaTrabalho", ""], [3, "title", "template", "width"], ["columnMetaRealizado", ""], ["title", "Progresso", 3, "template", "width"], ["columnProgresso", ""], [3, "title", "template", "editTemplate", "width"], ["columnObjProc", ""], ["editable", "", 3, "items", "minHeight", "hasDelete", "hasEdit", "hasAdd", "add"], ["gridOcorrencia", ""], ["title", "In\u00EDcio", "type", "datetime", "field", "data_inicio", 3, "width"], ["title", "Fim", "type", "datetime", "field", "data_fim", 3, "width"], ["title", "Descri\u00E7\u00E3o", "type", "textarea", "field", "descricao"], ["type", "options", 3, "dynamicButtons"], ["editable", "", 3, "items", "minHeight", "hasEdit", "hasDelete", "hasAdd", "add"], ["gridAfastamento", ""], ["title", "Motivo/Observa\u00E7\u00E3o", 3, "template"], ["columnMotivoObservacao", ""], ["editable", "", 3, "items", "minHeight", "form", "hasDelete", "hasAdd", "hasEdit", "add", "load", "remove", "save"], ["gridComparecimento", ""], ["title", "Data", "type", "date", "field", "data_comparecimento", 3, "width"], ["title", "Unidade", 3, "template", "editTemplate"], ["columnUnidade", ""], ["editUnidade", ""], ["title", "Detalhamento", "type", "text", "field", "detalhamento"], ["editable", "", 3, "items", "minHeight", "form", "hasAdd", "hasDelete", "hasEdit", "add", "load", "remove", "save"], ["gridAtividades", ""], [3, "title", "width", "template", "editTemplate", "columnEditTemplate", "edit", "save"], ["columnAtividadeDescricao", ""], ["editAtividadeDescricao", ""], [3, "title", "width", "template", "editTemplate"], ["columnTempos", ""], ["editTempos", ""], ["columnProgressoEtiquetasChecklist", ""], ["columnProgressoEtiquetasChecklistEdit", ""], ["columnNumero", ""], ["type", "options", 3, "metadata", "dynamicOptions", "dynamicButtons"], [1, "text-nowrap", "d-block"], ["icon", "bi bi-hash", "color", "light", 3, "label", "data", "click"], [1, "micro-text", "fw-ligh", "atividade-descricao"], ["origem", "ATIVIDADE", 3, "entity"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size", "rows", "control"], [1, "one-per-line"], [3, "badge", 4, "ngFor", "ngForOf"], [3, "badge"], ["title", "In\u00EDcio e Conclus\u00E3o", "collapse", "", 3, "collapsed"], ["icon", "bi bi-play-circle", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data de inicializa\u00E7\u00E3o da atividade", 3, "control"], ["icon", "bi bi-check-circle", "label", "Conclus\u00E3o", "controlName", "data_entrega", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "control"], ["color", "success", 3, "value"], [3, "lookup", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], [4, "ngIf"], [3, "lookup"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals", "control"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["label", "Etiqueta", "controlName", "etiqueta", "nullable", "", "itemNull", "- Selecione -", "detailsButton", "", "detailsButtonIcon", "bi bi-tools", 3, "size", "control", "items", "details"], ["etiqueta", ""], ["scale", "small", 3, "size", "source", "path"], [3, "documento"], [1, "d-block"], [3, "data", "color", "icon", "label", 4, "ngFor", "ngForOf"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid", 4, "ngIf"], [3, "data", "color", "icon", "label"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid"], [3, "label", "color"], ["origem", "PLANO_TRABALHO_ENTREGA", 3, "entity"], ["color", "light", 3, "label"], ["icon", "bi bi-graph-up-arrow", "color", "light", "hint", "Meta", 3, "textValue"], ["icon", "bi bi-check-lg", "color", "light", "hint", "Realizado", 3, "textValue"], ["collapse", "", 3, "title", "collapsed", 4, "ngIf"], ["collapse", "", 3, "title", "collapsed"], ["class", "objetivo d-flex align-items-center", 4, "ngFor", "ngForOf"], [1, "objetivo", "d-flex", "align-items-center"], [1, "btn", "btn-sm", "btn-outline-info", "me-2", 3, "click"], [1, "bi", "bi-eye"], [3, "color", "icon", "label"], ["color", "success", 3, "icon", "label", "textValue"], ["label", "", "icon", "", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""]],
  template: function PlanoTrabalhoConsolidacaoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "separator", 0)(1, "grid", 1, 2)(3, "columns")(4, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoFormComponent_ng_template_5_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](7, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_Template, 22, 35, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](9, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](10, PlanoTrabalhoConsolidacaoFormComponent_ng_template_10_Template, 1, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](12, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](13, PlanoTrabalhoConsolidacaoFormComponent_ng_template_13_Template, 5, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](15, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoFormComponent_ng_template_16_Template, 1, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](18, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](19, PlanoTrabalhoConsolidacaoFormComponent_ng_template_19_Template, 3, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](21, "column", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](22, PlanoTrabalhoConsolidacaoFormComponent_ng_template_22_Template, 1, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](24, "column", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](25, PlanoTrabalhoConsolidacaoFormComponent_ng_template_25_Template, 2, 2, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](27, "separator", 0)(28, "grid", 18, 19)(30, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](31, "column", 20)(32, "column", 21)(33, "column", 22)(34, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](35, "separator", 0)(36, "grid", 24, 25)(38, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](39, "column", 20)(40, "column", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](41, "column", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](42, PlanoTrabalhoConsolidacaoFormComponent_ng_template_42_Template, 2, 4, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](44, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](45, "separator", 0)(46, "grid", 28, 29)(48, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](49, "column", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](50, "column", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](51, PlanoTrabalhoConsolidacaoFormComponent_ng_template_51_Template, 1, 3, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](53, PlanoTrabalhoConsolidacaoFormComponent_ng_template_53_Template, 2, 2, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](55, "column", 34)(56, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](6);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](8);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](11);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](14);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](17);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](20);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](23);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](26);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](43);
      const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](52);
      const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](54);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("collapsed", false)("title", ctx.lex.translate("Atividades"))("icon", ctx.entityService.getIcon("Atividade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("items", ctx.itemsEntregas)("minHeight", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("hint", ctx.lex.translate("Consolida\u00E7\u00E3o"))("template", _r1)("expandTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r5)("width", 200);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r9)("width", 100)("titleHint", "% Carga Hor\u00E1ria Dispon\u00EDvel Planejada");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "Meta")("template", _r11)("width", 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r13)("width", 150);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", "Objetivos/Processos")("template", _r15)("editTemplate", _r15)("width", 200);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("collapsed", false)("title", ctx.lex.translate("Ocorr\u00EAncias"))("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("items", ctx.itemsOcorrencias)("minHeight", 0)("hasDelete", false)("hasEdit", false)("hasAdd", !ctx.disabled)("add", ctx.addOcorrencia.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("dynamicButtons", ctx.ocorrenciaDynamicButtons.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("collapsed", false)("title", ctx.lex.translate("Afastamentos"))("icon", ctx.entityService.getIcon("Afastamento"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("items", ctx.itemsAfastamentos)("minHeight", 0)("hasEdit", false)("hasDelete", false)("hasAdd", !ctx.disabled)("add", ctx.addAfastamento.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r19);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("dynamicButtons", ctx.afastamentoDynamicButtons.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("collapsed", false)("title", ctx.lex.translate("Comparecimentos"))("icon", ctx.entityService.getIcon("Comparecimento"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("items", ctx.itemsComparecimentos)("minHeight", 0)("form", ctx.formComparecimento)("hasDelete", !ctx.disabled)("hasAdd", !ctx.disabled)("hasEdit", !ctx.disabled)("add", ctx.addComparecimento.bind(ctx))("load", ctx.loadComparecimento.bind(ctx))("remove", ctx.removeComparecimento.bind(ctx))("save", ctx.saveComparecimento.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("template", _r22)("editTemplate", _r24);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("dynamicButtons", ctx.comparecimentoDynamicButtons.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_32__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_32__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_15__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_16__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_17__.ColumnComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_20__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_21__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_22__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_23__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_24__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_25__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_26__.ProgressBarComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__.InputNumberComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_28__.ReactionComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_29__.ComentariosWidgetComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_30__.DocumentosBadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 72132:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacaoListComponent: () => (/* binding */ PlanoTrabalhoConsolidacaoListComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-trabalho-consolidacao-dao.service */ 17046);
/* harmony import */ var src_app_models_plano_trabalho_consolidacao_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/plano-trabalho-consolidacao.model */ 61210);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/avaliacao-dao.service */ 41095);
/* harmony import */ var src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/unidade.service */ 20609);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../uteis/avaliar/avaliar-nota-badge/avaliar-nota-badge.component */ 56486);
/* harmony import */ var _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component */ 89775);

var _class;

















function PlanoTrabalhoConsolidacaoListComponent_ng_template_7_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "plano-trabalho-consolidacao-form", 16, 17);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r4.isDisabled(row_r14))("entity", row_r14)("planoTrabalho", ctx_r4.entity)("cdRef", ctx_r4.cdRef);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r6.util.getDateFormatted(row_r16.data_inicio), " ");
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx_r8.util.getDateFormatted(row_r17.data_fim), " ");
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_18_avaliar_nota_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "avaliar-nota-badge", 20);
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("align", "left")("tipoAvaliacao", row_r18.avaliacao.tipo_avaliacao || ctx_r19.entity.programa.tipo_avaliacao_plano_trabalho)("nota", row_r18.avaliacao.nota);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_18_separator_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "separator", 21)(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("collapsed", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](row_r18.avaliacao.recurso);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, PlanoTrabalhoConsolidacaoListComponent_ng_template_18_avaliar_nota_badge_0_Template, 1, 3, "avaliar-nota-badge", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoListComponent_ng_template_18_separator_1_Template, 3, 2, "separator", 19);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r18.avaliacao);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r18.avaliacao == null ? null : row_r18.avaliacao.recurso == null ? null : row_r18.avaliacao.recurso.length);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_21_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "badge", 25);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoListComponent_ng_template_21_badge_2_Template, 1, 0, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("color", ctx_r12.lookup.getColor(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r23.status))("icon", ctx_r12.lookup.getIcon(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r23.status))("label", ctx_r12.lookup.getValue(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r23.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r23.avaliacao == null ? null : row_r23.avaliacao.recurso == null ? null : row_r23.avaliacao.recurso.length);
  }
}
class PlanoTrabalhoConsolidacaoListComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  get items() {
    return this.entity?.consolidacoes || [];
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      // TODO: Validar data
      return result;
    };
    /* Inicializações */
    this.dao = injector.get(src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoConsolidacaoDaoService);
    this.avaliacaoDao = injector.get(src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_7__.AvaliacaoDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoService);
    this.unidadeService = injector.get(src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_8__.UnidadeService);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoDaoService);
    this.title = this.lex.translate("Consolidações");
    this.code = "MOD_PTR_CSLD";
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      'data_inicio': {
        default: new Date()
      },
      'data_fim': {
        default: new Date()
      }
    }, this.cdRef, this.validate);
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.urlParams?.has("usuarioId") && _this.urlParams?.has("planoTrabalhoId")) {
        let dados = yield _this.planoTrabalhoDao.getByUsuario(_this.urlParams.get("usuarioId"), true, _this.urlParams.get("planoTrabalhoId"));
        if (dados.planos.length == 1) _this.entity = dados.planos[0];
      }
      let agora = new Date().getTime();
      _this.items.forEach(v => {
        if (!v.plano_trabalho) v.plano_trabalho = _this.entity;
        if (_this.util.asTimestamp(v.data_inicio) <= agora && agora <= _this.util.asTimestamp(v.data_fim)) _this.grid.expand(v.id);
      });
    })();
  }
  addConsolidacao() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_plano_trabalho_consolidacao_model__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoConsolidacao({
        id: _this2.dao.generateUuid(),
        plano_trabalho_id: _this2.entity.id
      });
    })();
  }
  loadConsolidacao(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.form.patchValue({
        data_inicio: row.data_inicio,
        data_fim: row.data_fim
      });
      _this3.cdRef.detectChanges();
    })();
  }
  removeConsolidacao(row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this4.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        try {
          let consolidacao = row;
          yield _this4.dao?.delete(consolidacao);
          _this4.items.splice(_this4.items.findIndex(x => x.id == consolidacao.id), 1);
          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    })();
  }
  saveConsolidacao(form, row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this5.form.markAllAsTouched();
      if (_this5.form.valid) {
        row.id = row.id == "NEW" ? _this5.dao.generateUuid() : row.id;
        row.data_inicio = form.controls.data_inicio.value;
        row.data_fim = form.controls.data_fim.value;
        result = yield _this5.dao?.save(row);
      }
      return result;
    })();
  }
  refreshConsolidacao(consolidacao, dados) {
    if (dados && consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent) {
      let consolidacaoForm = consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent;
      consolidacaoForm.loadConsolidacao(dados);
    } else {
      this.grid.refreshExpanded(consolidacao.id);
    }
    this.grid.refreshRows();
  }
  concluir(consolidacao) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.submitting = true;
      try {
        let response = yield _this6.dao.concluir(consolidacao.id);
        consolidacao.status = response.status;
        _this6.refreshConsolidacao(consolidacao, response);
      } catch (error) {
        _this6.error(error.message || error);
      } finally {
        _this6.submitting = false;
      }
    })();
  }
  cancelarConclusao(consolidacao) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.submitting = true;
      try {
        let response = yield _this7.dao.cancelarConclusao(consolidacao.id);
        consolidacao.status = response.status;
        _this7.refreshConsolidacao(consolidacao, response);
      } catch (error) {
        _this7.error(error.message || error);
      } finally {
        _this7.submitting = false;
      }
    })();
  }
  anterior(consolidacao) {
    return this.entity.consolidacoes.reduce((a, v) => this.util.asTimestamp(v.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio) && (!a || this.util.asTimestamp(a.data_inicio) < this.util.asTimestamp(v.data_inicio)) ? v : a, undefined);
  }
  proximo(consolidacao) {
    return this.entity.consolidacoes.reduce((a, v) => this.util.asTimestamp(v.data_fim) > this.util.asTimestamp(consolidacao.data_fim) && (!a || this.util.asTimestamp(a.data_fim) > this.util.asTimestamp(v.data_fim)) ? v : a, undefined);
  }
  isDisabled(row) {
    return row && row.status != "INCLUIDO" || this.entity?.status != "ATIVO";
  }
  dynamicButtons(row) {
    let result = [];
    let consolidacao = row;
    const usuarioId = consolidacao.plano_trabalho?.usuario_id;
    const unidadeId = this.entity.unidade_id;
    const anterior = this.anterior(row);
    const proximo = this.proximo(row);
    const isAvaliador = this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL") && (this.unidadeService.isGestorUnidade(unidadeId) || this.auth.isIntegrante('AVALIADOR_PLANO_TRABALHO', unidadeId));
    const isUsuarioDoPlano = this.auth.usuario.id == usuarioId;
    const BOTAO_CONCLUIR = {
      hint: "Concluir",
      icon: "bi bi-check-circle",
      color: "btn-outline-success",
      onClick: this.concluir.bind(this)
    };
    const BOTAO_CANCELAR_CONCLUSAO = {
      hint: "Cancelar conclusão",
      icon: "bi bi-backspace",
      color: "btn-outline-danger",
      onClick: this.cancelarConclusao.bind(this)
    };
    const BOTAO_AVALIAR = {
      hint: "Avaliar",
      icon: "bi bi-star",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.avaliar(row, this.entity.programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_REAVALIAR = {
      hint: "Reavaliar",
      icon: "bi bi-star-half",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.avaliar(row, this.entity.programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_FAZER_RECURSO = {
      hint: "Fazer recurso",
      id: "RECORRIDO",
      icon: "bi bi-journal-medical",
      color: "btn-outline-warning",
      onClick: row => this.planoTrabalhoService.fazerRecurso(row, this.entity.programa, this.refreshConsolidacao.bind(this))
    };
    const BOTAO_CANCELAR_AVALIACAO = {
      hint: "Cancelar avaliação",
      id: "INCLUIDO",
      icon: "bi bi-backspace",
      color: "btn-outline-danger",
      onClick: row => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this))
    };
    /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
    const canConcluir = !anterior || ["CONCLUIDO", "AVALIADO"].includes(anterior.status);
    const canCancelarConclusao = !proximo || ["INCLUIDO"].includes(proximo.status);
    const canAvaliar = !anterior || ["AVALIADO"].includes(anterior.status);
    const canCancelarAvaliacao = !proximo || ["INCLUIDO", "CONCLUIDO"].includes(proximo.status);
    if (!this.isDisabled()) {
      if (consolidacao.status == "INCLUIDO" && canConcluir && (isUsuarioDoPlano || this.auth.hasPermissionTo("MOD_PTR_CSLD_CONCL"))) {
        result.push(BOTAO_CONCLUIR);
      }
      if (consolidacao.status == "CONCLUIDO" && canCancelarConclusao && this.planoTrabalhoService.diasParaConcluirConsolidacao(row, this.entity.programa) >= 0 && (isUsuarioDoPlano || this.auth.hasPermissionTo("MOD_PTR_CSLD_DES_CONCL"))) {
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
      if (consolidacao.status == "CONCLUIDO" && canAvaliar && isAvaliador) {
        result.push(BOTAO_AVALIAR);
      }
      if (consolidacao.status == "AVALIADO" && consolidacao.avaliacao) {
        /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
        if (isUsuarioDoPlano && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao.avaliacao?.data_avaliacao && (!this.entity.programa.dias_tolerancia_recurso_avaliacao || this.util.daystamp(consolidacao.avaliacao.data_avaliacao) + this.entity.programa.dias_tolerancia_recurso_avaliacao > this.util.daystamp(this.auth.hora))) {
          result.push(BOTAO_FAZER_RECURSO);
        }
        /* (RN_AVL_3) [PT] Após o recurso será realizado nova avaliação, podendo essa ser novamente recorrida dentro do mesmo prazo estabelecido no programa; */
        /* (RN_AVL_6) [PT] Qualquer usuário capaz de avaliar tambem terá a capacidade de cancelar a avaliação; */
        if (canAvaliar && isAvaliador) {
          result.push(BOTAO_REAVALIAR);
          if (canCancelarAvaliacao) result.push(BOTAO_CANCELAR_AVALIACAO);
        }
      }
    }
    return result;
  }
}
_class = PlanoTrabalhoConsolidacaoListComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-consolidacao-list"]],
  viewQuery: function PlanoTrabalhoConsolidacaoListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 24,
  vars: 20,
  consts: [["editable", "", 3, "items", "form", "hasDelete", "minHeight", "add", "hasAdd", "hasEdit"], ["grid", ""], [1, "my-2"], [1, "bi", "bi-arrow-down"], ["type", "expand", 3, "icon", "align", "hint", "template", "expandTemplate"], ["columnConsolidacao", ""], ["columnExpandedConsolidacao", ""], ["title", "Data in\u00EDcio", 3, "template"], ["columnDataInicio", ""], ["title", "Data fim", 3, "template"], ["columnDataFim", ""], ["title", "Estat\u00EDsticas/Avalia\u00E7\u00F5es", 3, "template", "width"], ["columnEstatisticas", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "dynamicButtons"], [3, "disabled", "entity", "planoTrabalho", "cdRef"], ["consolidacao", ""], [3, "align", "tipoAvaliacao", "nota", 4, "ngIf"], ["title", "Recurso da avalia\u00E7\u00E3o", "collapse", "", 3, "collapsed", 4, "ngIf"], [3, "align", "tipoAvaliacao", "nota"], ["title", "Recurso da avalia\u00E7\u00E3o", "collapse", "", 3, "collapsed"], [1, "one-per-line"], [3, "color", "icon", "label"], ["icon", "bi bi-journal-medical", "color", "warning", "label", "Recorrido", 4, "ngIf"], ["icon", "bi bi-journal-medical", "color", "warning", "label", "Recorrido"]],
  template: function PlanoTrabalhoConsolidacaoListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "grid", 0, 1)(2, "h5", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "i", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "columns")(6, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](7, PlanoTrabalhoConsolidacaoListComponent_ng_template_7_Template, 0, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](9, PlanoTrabalhoConsolidacaoListComponent_ng_template_9_Template, 2, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](12, PlanoTrabalhoConsolidacaoListComponent_ng_template_12_Template, 1, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](15, PlanoTrabalhoConsolidacaoListComponent_ng_template_15_Template, 1, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](17, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](18, PlanoTrabalhoConsolidacaoListComponent_ng_template_18_Template, 2, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](20, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](21, PlanoTrabalhoConsolidacaoListComponent_ng_template_21_Template, 3, 4, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](23, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](8);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](10);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](13);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](16);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](19);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("minHeight", 0)("add", ctx.addConsolidacao.bind(ctx))("hasAdd", !ctx.isDisabled())("hasEdit", false)("hasDelete", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"]("", ctx.lex.translate("Consolida\u00E7\u00F5es"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("hint", ctx.lex.translate("Consolida\u00E7\u00E3o"))("template", _r1)("expandTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r9)("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r11);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__.BadgeComponent, _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_13__.AvaliarNotaBadgeComponent, _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_14__.PlanoTrabalhoConsolidacaoFormComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 56845:
/*!********************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-consolidacao/plano-trabalho-consolidacao.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacaoComponent: () => (/* binding */ PlanoTrabalhoConsolidacaoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_collapse_card_collapse_card_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/collapse-card/collapse-card.component */ 45847);
/* harmony import */ var _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component */ 52483);

var _class;














function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 21)(1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "profile-picture", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 24)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const data_r14 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("url", data_r14.url_foto)("size", 40)("hint", data_r14.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](data_r14.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](data_r14.apelido || "");
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "plano-trabalho-list-accordeon", 25);
  }
  if (rf & 2) {
    const data_r15 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("usuarioId", data_r15.id);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "collapse-card", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_ng_template_1_Template, 9, 5, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_ng_template_3_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const usuario_r9 = ctx.$implicit;
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](2);
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("data", usuario_r9)("titleTemplate", _r10)("template", _r12);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "filter", 7)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "input-search", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 11)(5, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_div_10_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_11_Template, 5, 3, "collapse-card", 14);
  }
  if (rf & 2) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](3);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx_r5.filter)("filter", ctx_r5.filterWhere)("collapsed", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx_r5.filter.controls.unidade_id)("dao", ctx_r5.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate3"]("", ctx_r5.lex.translate("Unidade"), " selecionada: ", _r6 == null ? null : _r6.selectedItem == null ? null : _r6.selectedItem.entity.sigla, " - ", _r6 == null ? null : _r6.selectedItem == null ? null : _r6.selectedItem.entity.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r5.lex.translate("Participantes"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r5.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r5.usuarios);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_Template, 12, 12, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](2);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r1.entityService.getIcon("Unidade"))("label", ctx_r1.lex.translate("Unidade"))("template", _r4);
  }
}
function PlanoTrabalhoConsolidacaoComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 26)(1, "h5", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "separator", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "plano-trabalho-list-accordeon", 29);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r3.lex.translate("Planos de Trabalho"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("control", ctx_r3.form.controls.arquivados)("title", "Mostrar " + ctx_r3.lex.translate("Planos de trabalho") + " arquivados?");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("usuarioId", ctx_r3.auth.usuario.id)("arquivados", ctx_r3.form.controls.arquivados.value);
  }
}
class PlanoTrabalhoConsolidacaoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.usuarios = [];
    this.loadingUnidade = false;
    this.filterWhere = filter => {
      let form = filter.value;
      this.loadUsuarios(form.unidade_id);
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      arquivados: {
        default: false
      }
    });
    this.filter = this.fh.FormBuilder({
      unidade_id: {
        default: false
      }
    });
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    this.tabs.active = this.queryParams?.tab || "USUARIO";
    this.tabs.title = this.lex.translate('Consolidações');
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData(_this.entity, _this.form);
    })();
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.unidade = _this2.auth.unidadeGestor();
      _this2.filter.controls.unidade_id.setValue(_this2.unidade?.id || _this2.auth.lotacao || null);
      if (_this2.unidade) {
        yield _this2.loadUsuarios(_this2.unidade.id);
      }
    })();
  }
  loadUsuarios(unidade) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.usuarios = [];
      _this3.loadingUnidade = true;
      _this3.loading = true;
      _this3.cdRef.detectChanges();
      try {
        _this3.usuarios = yield _this3.unidadeDao.lotados(unidade);
      } finally {
        _this3.loading = false;
        _this3.loadingUnidade = false;
        _this3.cdRef.detectChanges();
      }
    })();
  }
}
_class = PlanoTrabalhoConsolidacaoComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-trabalho-consolidacao"]],
  viewQuery: function PlanoTrabalhoConsolidacaoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_2__.InputSearchComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.unidadeSelecionada = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
  decls: 6,
  vars: 5,
  consts: [["right", "", 3, "title"], ["tabs", ""], ["key", "UNIDADE", 3, "icon", "label", "template", 4, "ngIf"], ["key", "USUARIO", 3, "icon", "label", "template"], ["tabUsuario", ""], ["key", "UNIDADE", 3, "icon", "label", "template"], ["tabUnidade", ""], [3, "form", "filter", "collapsed"], [1, "row"], ["label", "Selecione a unidade", "controlName", "unidade_id", 3, "size", "control", "dao"], ["unidadeSelecionada", ""], [1, "p-3", "mb-3", "bg-body-secondary"], [1, "bi", "bi-arrow-down"], ["class", "d-flex justify-content-center my-2", 4, "ngIf"], [3, "data", "titleTemplate", "template", 4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-center", "my-2"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [3, "data", "titleTemplate", "template"], ["usuarioCardTitle", ""], ["usuarioCard", ""], [1, "d-flex"], [1, "ms-3"], [3, "url", "size", "hint"], [1, "flex-fill", "ms-3"], [3, "usuarioId"], [1, "d-flex", "justify-content-between"], [1, "mt-2"], [3, "control", "title"], [3, "usuarioId", "arquivados"]],
  template: function PlanoTrabalhoConsolidacaoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "tabs", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoComponent_tab_2_Template, 3, 3, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoComponent_ng_template_4_Template, 6, 5, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.unidade);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx.entityService.getIcon("Usuario"))("label", ctx.lex.translate("Usu\u00E1rio"))("template", _r2);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_5__.FilterComponent, src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_2__.InputSearchComponent, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__.SeparatorComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_8__.ProfilePictureComponent, _components_collapse_card_collapse_card_component__WEBPACK_IMPORTED_MODULE_9__.CollapseCardComponent, _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalhoListAccordeonComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 51292:
/*!****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-form-termo/plano-trabalho-form-termo.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoFormTermoComponent: () => (/* binding */ PlanoTrabalhoFormTermoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ 25026);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ 88340);
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ 66075);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ 20762);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-display/input-display.component */ 51823);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ 43417);

var _class;





















const _c0 = ["usuario"];
const _c1 = ["unidade"];
const _c2 = ["programa"];
const _c3 = ["tipoDocumento"];
const _c4 = ["tipoModalidade"];
class PlanoTrabalhoFormTermoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalho, src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == "tipo_documento_id" && !control?.value?.length && this.form?.controls?.numero_processo?.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      if (!this.tipoDocumento?.selectedEntity && form?.controls.tipo_documento_id.value?.length) {
        return "Aguarde o carregamento do tipo de documento";
      }
      return undefined;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("TCR") + ' ' + this.lex.translate("do Plano de Trabalho") + ': ' + (entity?.usuario?.nome || "");
    };
    this.join = ["unidade", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos", "atividades.atividade"];
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeDaoService);
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProgramaDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__.UsuarioDaoService);
    this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoDocumentoDaoService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_9__.ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_6__.TipoModalidadeDaoService);
    this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__.DocumentoDaoService);
    this.form = this.fh.FormBuilder({
      carga_horaria: {
        default: ""
      },
      tempo_total: {
        default: ""
      },
      tempo_proporcional: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      programa_id: {
        default: ""
      },
      usuario_id: {
        default: ""
      },
      unidade_id: {
        default: ""
      },
      documento_id: {
        default: ""
      },
      documentos: {
        default: []
      },
      tipo_documento_id: {
        default: ""
      },
      numero_processo: {
        default: ""
      },
      vinculadas: {
        default: true
      },
      tipo_modalidade_id: {
        default: ""
      },
      forma_contagem_carga_horaria: {
        default: "DIA"
      }
    }, this.cdRef, this.validate);
  }
  onVinculadasChange(event) {
    this.cdRef.detectChanges();
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      formValue = _this.util.fillForm(formValue, entity);
      yield Promise.all([_this.unidade.loadSearch(entity.unidade || entity.unidade_id), _this.usuario.loadSearch(entity.usuario || entity.usuario_id), _this.programa.loadSearch(entity.programa || entity.programa_id), _this.tipoModalidade.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)]);
      if (_this.processo) {
        formValue.id_processo = _this.processo.id_processo;
        formValue.numero_processo = _this.processo.numero_processo;
      }
      formValue.data_inicio = _this.auth.hora;
      form.patchValue(formValue);
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = yield _this2.dao.getById(_this2.metadata.plano_trabalho.id, _this2.join);
      _this2.processo = _this2.metadata?.processo;
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      //if(this.processo) {
      resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_12__.NavigateResult(Object.assign(this.form.value, {
        /* TODO Gerar documento do TCR
        termo: this.termo!.conteudo,
        atividades_termo_adesao: this.termo!.atividades.map((x: { nome: string; }) => this.util.removeAcentos(x.nome.toLowerCase())),*/
        codigo_tipo_documento: this.tipoDocumento?.selectedEntity?.codigo
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
    const forma = this.form?.controls.forma_contagem_carga_horaria?.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }
}
_class = PlanoTrabalhoFormTermoComponent;
_class.ɵfac = function PlanoTrabalhoFormTermoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-form-termo"]],
  viewQuery: function PlanoTrabalhoFormTermoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c4, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.tipoDocumento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 25,
  vars: 41,
  consts: [["initialFocus", "programa_id", 3, "form", "disabled", "title", "submit", "cancel"], ["collapse", "", 3, "title", "collapsed"], [1, "row"], ["disabled", "", "controlName", "programa_id", 3, "size", "dao"], ["programa", ""], ["disabled", "", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["disabled", "", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["disabled", "", "controlName", "tipo_modalidade_id", 3, "size", "dao"], ["tipoModalidade", ""], ["numbers", "", "disabled", "", "label", "% prod.", "icon", "bi bi-hourglass-split", "controlName", "ganho_produtividade", 3, "size", "control", "labelInfo"], ["label", "H. Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["disabled", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "Final da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "C. Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", 3, "size", "unit", "control", "labelInfo"], ["label", "H. Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["disabled", "", "label", "Data e hora", "controlName", "data_inicio", "labelInfo", "Data de cadastro do termo", 3, "size", "control"], ["controlName", "numero_processo", "disabled", "", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "label", "size", "control"], ["controlName", "tipo_documento_id", "required", "", 3, "size", "disabled", "dao"], ["tipoDocumento", ""], ["label", "Vinculadas", "controlName", "vinculadas", "labelInfo", "Se inclui as atividades das unidades vinculadas a unidade do plano", 3, "disabled", "size", "control", "change"]],
  template: function PlanoTrabalhoFormTermoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function PlanoTrabalhoFormTermoComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoTrabalhoFormTermoComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "separator", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input-search", 3, 4)(5, "input-search", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](8, "input-search", 7, 8)(10, "input-search", 9, 10)(12, "input-text", 11)(13, "input-display", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](14, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](15, "input-datetime", 13)(16, "input-datetime", 14)(17, "input-workload", 15)(18, "input-display", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](19, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](20, "input-datetime", 17)(21, "input-text", 18)(22, "input-search", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](24, "input-switch", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoFormTermoComponent_Template_input_switch_change_24_listener($event) {
        return ctx.onVinculadasChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", ctx.lex.translate("Plano de trabalho"))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("dao", ctx.programaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 5)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("dao", ctx.tipoModalidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.ganho_produtividade)("labelInfo", "Percentual de ganho de produtividade (Ser\u00E1 descontado do " + ctx.lex.translate("tempo pactuado") + ")");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.tempo_proporcional);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("unit", ctx.formaContagemCargaHoraria)("control", ctx.form.controls.carga_horaria)("labelInfo", "Carga hor\u00E1ria" + ctx.lex.translate("do usu\u00E1rio"));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tempo_total);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", "N\u00FAmero " + ctx.lex.translate("Processo"))("size", 3)("control", ctx.form.controls.numero_processo);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("disabled", !(ctx.form.controls.numero_processo.value == null ? null : ctx.form.controls.numero_processo.value.length) ? "true" : undefined)("dao", ctx.tipoDocumentoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", (ctx.entity == null ? null : ctx.entity.atividades == null ? null : ctx.entity.atividades.length) ? "true" : undefined)("size", 2)("control", ctx.form.controls.vinculadas);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__.InputSwitchComponent, _components_input_input_display_input_display_component__WEBPACK_IMPORTED_MODULE_14__.InputDisplayComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__.InputDatetimeComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__.SeparatorComponent, _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_19__.InputWorkloadComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 31377:
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-form/plano-trabalho-form.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoFormComponent: () => (/* binding */ PlanoTrabalhoFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/documento-dao-service */ 25026);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-modalidade-dao.service */ 66075);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ 20762);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/uteis/documentos/documento.service */ 22702);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/modules/uteis/templates/template.service */ 49367);
/* harmony import */ var src_app_services_util_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/services/util.service */ 49193);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ 43417);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ 60785);
/* harmony import */ var _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../uteis/documentos/documentos.component */ 6601);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);

var _class;































const _c0 = ["gridAtividades"];
const _c1 = ["gridDocumentos"];
const _c2 = ["tabs"];
const _c3 = ["usuario"];
const _c4 = ["programa"];
const _c5 = ["unidade"];
const _c6 = ["tipoModalidade"];
const _c7 = ["planoEntrega"];
const _c8 = ["atividade"];
const _c9 = ["entrega"];
const _c10 = ["documentos"];
function PlanoTrabalhoFormComponent_ng_container_18_separator_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "separator", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "calendar-efemerides", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("efemerides", ctx_r10.horasTotais)("partial", false);
  }
}
function PlanoTrabalhoFormComponent_ng_container_18_separator_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "separator", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "calendar-efemerides", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("efemerides", ctx_r11.horasParciais);
  }
}
function PlanoTrabalhoFormComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "div", 4)(2, "input-workload", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_ng_container_18_Template_input_workload_change_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵresetView"](ctx_r12.onCargaHorariaChenge($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](3, "input-timer", 22)(4, "input-timer", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](5, PlanoTrabalhoFormComponent_ng_container_18_separator_5_Template, 2, 2, "separator", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](6, PlanoTrabalhoFormComponent_ng_container_18_separator_6_Template, 2, 1, "separator", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("unit", ctx_r5.formaContagemCargaHoraria)("control", ctx_r5.form.controls.carga_horaria)("unitChange", ctx_r5.onFormaContagemCargaHorariaChange.bind(ctx_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.tempo_total);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.tempo_proporcional);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r5.horasTotais);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx_r5.horasParciais);
  }
}
function PlanoTrabalhoFormComponent_top_alert_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "top-alert", 30);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("message", "Antes de incluir " + ctx_r6.lex.translate("entrega") + " neste " + ctx_r6.lex.translate("Plano de Trabalho") + ", \u00E9 necess\u00E1rio selecionar " + ctx_r6.lex.translate("a Unidade") + " e " + " o " + ctx_r6.lex.translate("Programa") + "!");
  }
}
function PlanoTrabalhoFormComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "plano-trabalho-list-entrega", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("disabled", ctx_r7.formDisabled)("entity", ctx_r7.entity);
  }
}
function PlanoTrabalhoFormComponent_tab_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "tab", 32)(1, "separator", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](2, "input-switch", 33)(3, "input-editor", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](4, "separator", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](5, "input-switch", 36)(6, "input-editor", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("label", ctx_r8.lex.translate("Texto Complementar"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", "Texto complementar da " + ctx_r8.lex.translate("unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar " + ctx_r8.lex.translate("na unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("disabled", ctx_r8.form.controls.editar_texto_complementar_unidade.value ? undefined : "true")("dataset", ctx_r8.planoDataset);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar " + ctx_r8.lex.translate("do usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("disabled", ctx_r8.form.controls.editar_texto_complementar_usuario.value ? undefined : "true")("dataset", ctx_r8.planoDataset);
  }
}
function PlanoTrabalhoFormComponent_tab_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "tab", 38)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](2, "documentos", 40, 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("label", ctx_r9.lex.translate("Termo"));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("entity", ctx_r9.entity)("disabled", ctx_r9.formDisabled)("cdRef", ctx_r9.cdRef)("needSign", ctx_r9.planoTrabalhoService.needSign)("extraTags", ctx_r9.planoTrabalhoService.extraTags)("editingId", ctx_r9.formDisabled ? undefined : ctx_r9.editingId)("datasource", ctx_r9.datasource)("template", _r3 == null ? null : _r3.selectedEntity == null ? null : _r3.selectedEntity.template_tcr);
  }
}
const _c11 = function () {
  return ["afastamentos", "lotacao", "unidades", "participacoes_programas"];
};
const _c12 = function () {
  return ["usuario_id"];
};
const _c13 = function () {
  return ["usuario_id", "programa_id", "tipo_modalidade_id"];
};
class PlanoTrabalhoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho, src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoDaoService);
    this.injector = injector;
    this.entregas = [];
    this.gestoresUnidadeExecutora = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['unidade_id', 'programa_id', 'usuario_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      } else if (['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if (controlName == 'data_fim' && this.util.isDataValid(this.form?.controls.data_inicio.value) && this.util.asTimestamp(control.value) <= this.util.asTimestamp(this.form.controls.data_inicio.value)) {
        result = "Menor que o início";
      } else if (this.programa && controlName == 'data_inicio' && control.value.getTime() < this.programa.selectedEntity?.data_inicio.getTime()) {
        result = "Menor que programa";
      } else if (this.programa && controlName == 'data_fim' && control.value.getTime() > this.programa.selectedEntity?.data_fim.getTime()) {
        result = "Maior que programa";
      } /*else if (controlName == 'criterios_avaliacao' && control.value.length < 1) {
        result = "Insira ao menos um critério de avaliação";
        }*/
      return result;
    };
    this.formValidation = /*#__PURE__*/function () {
      var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (form) {
        let result = "";
        return result;
        // TODO:
        // Validar se as entregas pertencem ao plano de entregas da unidade
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Plano de Trabalho") + ': ' + (entity?.usuario?.apelido || "");
    };
    this.join = ["unidade.entidade", "entregas.entrega", "entregas.plano_entrega_entrega:id,plano_entrega_id", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "entregas.plano_entrega_entrega.entrega", "entregas.plano_entrega_entrega.plano_entrega.unidade:id,nome,sigla", 'entregas.reacoes.usuario:id,nome,apelido'];
    this.joinPrograma = ["template_tcr"];
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProgramaDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_13__.UnidadeDaoService);
    this.documentoService = injector.get(src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_10__.DocumentoService);
    this.templateService = injector.get(src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_14__.TemplateService);
    this.utilService = injector.get(src_app_services_util_service__WEBPACK_IMPORTED_MODULE_15__.UtilService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_11__.CalendarService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__.ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoModalidadeDaoService);
    this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__.DocumentoDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_12__.PlanoTrabalhoService);
    this.modalWidth = 1300;
    this.planoDataset = this.dao.dataset();
    this.form = this.fh.FormBuilder({
      carga_horaria: {
        default: ""
      },
      tempo_total: {
        default: ""
      },
      tempo_proporcional: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      usuario_id: {
        default: ""
      },
      unidade_id: {
        default: ""
      },
      programa_id: {
        default: ""
      },
      documento_id: {
        default: null
      },
      documentos: {
        default: []
      },
      atividades: {
        default: []
      },
      entregas: {
        default: []
      },
      tipo_modalidade_id: {
        default: ""
      },
      forma_contagem_carga_horaria: {
        default: "DIA"
      },
      editar_texto_complementar_unidade: {
        default: false
      },
      editar_texto_complementar_usuario: {
        default: false
      },
      unidade_texto_complementar: {
        default: ""
      },
      usuario_texto_complementar: {
        default: ""
      },
      criterios_avaliacao: {
        default: []
      },
      criterio_avaliacao: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
    this.buscaGestoresUnidadeExecutora(this.entity?.unidade ?? null);
  }
  atualizarTcr() {
    this.entity = this.loadEntity();
    let textoUsuario = this.form.controls.usuario_texto_complementar.value;
    let textoUnidade = this.form.controls.unidade_texto_complementar.value;
    let documento = this.planoTrabalhoService.atualizarTcr(this.planoTrabalho, this.entity, textoUsuario, textoUnidade);
    this.form?.controls.documento_id.setValue(documento?.id);
    this.form?.controls.documentos.setValue(this.entity.documentos);
    this.datasource = documento?.datasource || {};
    this.template = this.entity.programa?.template_tcr;
    this.editingId = ["ADD", "EDIT"].includes(documento?._status || "") ? documento.id : undefined;
    this.cdRef.detectChanges();
  }
  get isTermos() {
    return this.action == "termos";
  }
  onUnidadeSelect(selected) {
    let unidade = this.unidade?.selectedEntity;
    this.entity.unidade = unidade;
    this.entity.unidade_id = unidade.id;
    this.form.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.form.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
    this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id', 'gestores_substitutos:id,usuario_id', 'gestores_delegados:id,usuario_id']).then(unidade => {
      this.buscaGestoresUnidadeExecutora(unidade);
    });
  }
  onProgramaSelect(selected) {
    let programa = selected.entity;
    this.entity.programa_id = programa.id;
    this.entity.programa = programa;
    this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
    this.form?.controls.data_inicio.updateValueAndValidity();
    this.form?.controls.data_fim.updateValueAndValidity();
    this.calculaTempos();
    this.cdRef.detectChanges();
  }
  onUsuarioSelect(selected) {
    var _this = this;
    this.form.controls.usuario_texto_complementar.setValue(selected.entity?.texto_complementar_plano || "");
    if (!this.form?.controls.unidade_id.value) {
      selected.entity.unidades.every( /*#__PURE__*/function () {
        var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unidade) {
          if (selected.entity.lotacao.unidade_id == unidade.id) {
            if (!_this.form?.controls.programa_id.value) {
              let niveis = unidade.path.split("/").reverse();
              let hoje = new Date();
              let preenchido = 0;
              let indice = 0;
              while (preenchido == 0) {
                yield _this.programaDao.query({
                  where: [["unidade_id", "==", niveis[indice]], ["data_inicio", "<", hoje], ["data_fim", ">", hoje]]
                }).asPromise().then(programa => {
                  if (programa.length > 0 && preenchido == 0) {
                    preenchido = 1;
                    _this.preencheUnidade(unidade);
                    _this.preenchePrograma(programa[0]);
                  }
                });
                indice += 1;
              }
            }
            return false;
          } else return true;
        });
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    this.calculaTempos();
    this.cdRef.detectChanges();
  }
  preencheUnidade(unidade) {
    this.form?.controls.unidade_id.setValue(unidade.id);
    this.entity.unidade = unidade;
    this.entity.unidade_id = unidade.id;
    this.form.controls.forma_contagem_carga_horaria.setValue(unidade?.entidade?.forma_contagem_carga_horaria || "DIA");
    this.form.controls.unidade_texto_complementar.setValue(unidade?.texto_complementar_plano || "");
    this.unidadeDao.getById(unidade.id, ['gestor:id,usuario_id', 'gestores_substitutos:id,usuario_id', 'gestores_delegados:id,usuario_id']).then(unidade => {
      this.buscaGestoresUnidadeExecutora(unidade);
    });
  }
  preenchePrograma(programa) {
    this.form?.controls.programa_id.setValue(programa.id);
    this.entity.programa_id = programa.id;
    this.entity.programa = programa;
    this.form?.controls.criterios_avaliacao.setValue(programa.plano_trabalho_criterios_avaliacao || []);
    this.form?.controls.data_inicio.updateValueAndValidity();
    this.form?.controls.data_fim.updateValueAndValidity();
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
    const inicio = this.form?.controls.data_inicio.value;
    const fim = this.form?.controls.data_fim.value;
    const carga = this.form?.controls.carga_horaria.value || 8;
    const usuario = this.usuario?.selectedEntity;
    const unidade = this.unidade?.selectedEntity;
    if (usuario && unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim) && this.util.asTimestamp(inicio) < this.util.asTimestamp(fim)) {
      this.calendar.loadFeriadosCadastrados(unidade.id).then(feriados => {
        this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], usuario.afastamentos);
        this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
        this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
      });
    }
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.planoTrabalho = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho(entity);
      yield Promise.all([_this2.calendar.loadFeriadosCadastrados(entity.unidade_id), _this2.usuario?.loadSearch(entity.usuario || entity.usuario_id), _this2.unidade?.loadSearch(entity.unidade || entity.unidade_id), _this2.programa?.loadSearch(entity.programa || entity.programa_id), _this2.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)]);
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this2.util.fillForm(formValue, entity));
      /*let documento = entity.documentos.find(x => x.id == entity.documento_id);
      if(documento) this._datasource = documento.datasource;*/
      _this2.calculaTempos();
      _this2.atualizarTcr();
    })();
  }
  initializeData(form) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.isTermos) {
        _this3.entity = yield _this3.dao.getById(_this3.urlParams.get("id"), _this3.join);
      } else {
        _this3.entity = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho();
        _this3.entity.carga_horaria = _this3.auth.entidade?.carga_horaria_padrao || 8;
        _this3.entity.forma_contagem_carga_horaria = _this3.auth.entidade?.forma_contagem_carga_horaria || "DIA";
        _this3.entity.unidade_id = _this3.auth.unidade.id;
        _this3.buscaGestoresUnidadeExecutora(_this3.auth.unidade);
        if (!_this3.gestoresUnidadeExecutora.includes(_this3.auth.unidade.id)) {
          _this3.entity.usuario_id = _this3.auth.usuario.id;
        }
      }
      yield _this3.loadData(_this3.entity, _this3.form);
      let nowDate = new Date();
      nowDate.setHours(0, 0, 0, 0);
      _this3.form?.controls.data_inicio.setValue(nowDate);
      _this3.form?.controls.data_fim.setValue("");
    })();
  }
  /* Cria um objeto Plano baseado nos dados do formulário */
  loadEntity() {
    let plano = this.util.fill(new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho(), this.entity);
    plano = this.util.fillForm(plano, this.form.value);
    plano.usuario = this.usuario.selectedEntity || this.entity?.usuario;
    plano.unidade = this.unidade?.selectedEntity || this.entity?.unidade;
    plano.programa = this.programa?.selectedEntity || this.entity?.programa;
    plano.tipo_modalidade = this.tipoModalidade.selectedEntity || this.entity?.tipo_modalidade;
    return plano;
  }
  saveData(form) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //let plano = this.loadEntity();
      /* Atualiza o documento */
      _this4.atualizarTcr();
      /* Confirma dados do documento */
      _this4.documentos?.saveData();
      _this4.entity.documentos = _this4.entity.documentos.filter(documento => {
        return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
      });
      /* Salva separadamente as informações do plano */
      _this4.submitting = true;
      try {
        let requests = [_this4.dao.save(_this4.entity, _this4.join)];
        if (_this4.form.controls.editar_texto_complementar_unidade.value) requests.push(_this4.unidadeDao.update(_this4.entity.unidade_id, {
          texto_complementar_plano: _this4.form.controls.unidade_texto_complementar.value
        }));
        if (_this4.form.controls.editar_texto_complementar_usuario.value) requests.push(_this4.usuarioDao.update(_this4.entity.usuario_id, {
          texto_complementar_plano: _this4.form.controls.usuario_texto_complementar.value
        }));
        let responses = yield Promise.all(requests);
        _this4.entity = responses[0];
      } finally {
        _this4.submitting = false;
      }
      return true;
    })();
  }
  onTabSelect(tab) {
    if (tab.key == "TERMO") this.atualizarTcr();
  }
  documentoDynamicButtons(row) {
    let result = [];
    let documento = row;
    if (this.isTermos && this.planoTrabalhoService.needSign(this.entity, documento)) {
      result.push({
        hint: "Assinar",
        icon: "bi bi-pen",
        onClick: this.signDocumento.bind(this)
      });
    }
    result.push({
      hint: "Preview",
      icon: "bi bi-zoom-in",
      onClick: (documento => {
        this.dialog.html({
          title: "Termo de adesão",
          modalWidth: 1000
        }, documento.conteudo || "");
      }).bind(this)
    });
    return result;
  }
  //Não apagar
  /*public addItemHandleCriteriosAvaliacao(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.criterio_avaliacao.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.criterios_avaliacao.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.criterio_avaliacao.value
      };
      this.form!.controls.criterio_avaliacao.setValue("");
    }
    return result;
  };*/
  signDocumento(documento) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.documentoService.sign([documento]);
      _this5.cdRef.detectChanges();
    })();
  }
  get formaContagemCargaHoraria() {
    const forma = this.form?.controls.forma_contagem_carga_horaria.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }
  onFormaContagemCargaHorariaChange(unit) {
    this.form.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
  }
  isVigente(documento) {
    return this.form.controls.documento_id.value == documento.id;
  }
  buscaGestoresUnidadeExecutora(unidade) {
    if (unidade) [unidade.gestor?.usuario_id, ...unidade.gestores_substitutos?.map(x => x.usuario_id), ...unidade.gestores_delegados?.map(x => x.usuario_id)].forEach(gestor => {
      if (gestor) this.gestoresUnidadeExecutora.push(gestor);
    });
    return this.gestoresUnidadeExecutora;
  }
}
_class = PlanoTrabalhoFormComponent;
_class.ɵfac = function PlanoTrabalhoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_29__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-form"]],
  viewQuery: function PlanoTrabalhoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c7, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c9, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c10, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.documentos = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵInheritDefinitionFeature"]],
  decls: 24,
  vars: 35,
  consts: [["initialFocus", "plano_entrega_id", 3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title", "select"], ["tabs", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], [1, "col-md-12"], ["required", "", "controlName", "usuario_id", 3, "size", "disabled", "dao", "join", "select"], ["usuario", ""], ["required", "", "controlName", "unidade_id", 3, "size", "disabled", "dao", "select"], ["unidade", ""], ["icon", "bi bi-file-bar-graph", "required", "", "controlName", "programa_id", 3, "size", "label", "disabled", "join", "dao", "select"], ["programa", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "required", "", 3, "size", "control", "labelInfo", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim", "required", "", 3, "size", "control", "labelInfo", "change"], ["controlName", "tipo_modalidade_id", "required", "", 3, "size", "dao"], ["tipoModalidade", ""], [4, "ngIf"], [3, "title"], ["type", "warning", 3, "message", 4, "ngIf"], ["key", "MENSAGENS", 3, "label", 4, "ngIf"], ["key", "TERMO", 3, "label", 4, "ngIf"], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio (M\u00E1x.: di\u00E1ria 24 horas; semana 24*5=240 horas; mensal 24*20=480 horas)", "required", "", 3, "size", "unit", "control", "unitChange", "change"], ["onlyHours", "", "disabled", "", "label", "Horas Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["onlyHours", "", "disabled", "", "label", "Horas Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["title", "C\u00E1lculos das horas totais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas parciais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas totais", "collapse", ""], [3, "efemerides", "partial"], ["title", "C\u00E1lculos das horas parciais", "collapse", ""], [3, "efemerides"], ["type", "warning", 3, "message"], ["noPersist", "", 3, "disabled", "entity"], ["key", "MENSAGENS", 3, "label"], ["controlName", "editar_texto_complementar_unidade", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "unidade_texto_complementar", 3, "disabled", "dataset"], ["title", "Texto complementar do usuario"], ["controlName", "editar_texto_complementar_usuario", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "usuario_texto_complementar", 3, "disabled", "dataset"], ["key", "TERMO", 3, "label"], ["clss", "row"], ["noPersist", "", "especie", "TCR", 3, "entity", "disabled", "cdRef", "needSign", "extraTags", "editingId", "datasource", "template"], ["documentos", ""]],
  template: function PlanoTrabalhoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("submit", function PlanoTrabalhoFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoTrabalhoFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "tabs", 1, 2)(3, "tab", 3)(4, "div", 4)(5, "div", 5)(6, "div", 4)(7, "input-search", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_7_listener($event) {
        return ctx.onUsuarioSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "input-search", 8, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_9_listener($event) {
        return ctx.onUnidadeSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "input-search", 10, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_11_listener($event) {
        return ctx.onProgramaSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](13, "div", 4)(14, "input-datetime", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_14_listener($event) {
        return ctx.onDataInicioChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](15, "input-datetime", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_15_listener($event) {
        return ctx.onDataFimChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](16, "input-search", 14, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](18, PlanoTrabalhoFormComponent_ng_container_18_Template, 7, 10, "ng-container", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](19, "separator", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](20, PlanoTrabalhoFormComponent_top_alert_20_Template, 1, 1, "top-alert", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](21, PlanoTrabalhoFormComponent_div_21_Template, 2, 2, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](22, PlanoTrabalhoFormComponent_tab_22_Template, 7, 10, "tab", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](23, PlanoTrabalhoFormComponent_tab_23_Template, 4, 9, "tab", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "")("select", ctx.onTabSelect.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("disabled", ctx.action == "new" ? undefined : "true")("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](32, _c11));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("disabled", ctx.action == "new" ? undefined : "true")("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Programa de gest\u00E3o"))("disabled", ctx.action == "new" ? undefined : "true")("join", ctx.joinPrograma)("dao", ctx.programaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio)("labelInfo", "In\u00EDcio da Vig\u00EAncia do " + ctx.lex.translate("Plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim)("labelInfo", "Final da Vig\u00EAncia do " + ctx.lex.translate("Plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("dao", ctx.tipoModalidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", _r4.selectedEntity == null ? null : _r4.selectedEntity.plano_trabalho_calcula_horas);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", ctx.lex.translate("Entregas") + ctx.lex.translate(" do plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", !(ctx.form.controls.programa_id.value == null ? null : ctx.form.controls.programa_id.value.length) || !(ctx.form.controls.unidade_id.value == null ? null : ctx.form.controls.unidade_id.value.length));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", (ctx.form.controls.programa_id.value == null ? null : ctx.form.controls.programa_id.value.length) && (ctx.form.controls.unidade_id.value == null ? null : ctx.form.controls.unidade_id.value.length));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](33, _c12)));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](34, _c13)));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_18__.InputDatetimeComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_19__.InputTimerComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__.SeparatorComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_23__.TopAlertComponent, _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_24__.InputWorkloadComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_25__.InputEditorComponent, _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_26__.CalendarEfemeridesComponent, _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_27__.DocumentosComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_28__.PlanoTrabalhoListEntregaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 52483:
/*!************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoListAccordeonComponent: () => (/* binding */ PlanoTrabalhoListAccordeonComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_accordion_accordion_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/accordion/accordion.component */ 90058);
/* harmony import */ var _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component */ 72132);

var _class;







const _c0 = ["accordion"];
function PlanoTrabalhoListAccordeonComponent_ng_template_13_badge_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "badge", 13);
  }
  if (rf & 2) {
    const badge_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("badge", badge_r7);
  }
}
function PlanoTrabalhoListAccordeonComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "badge", 10)(5, "badge", 10)(6, "badge", 10)(7, "badge", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, PlanoTrabalhoListAccordeonComponent_ng_template_13_badge_11_Template, 1, 1, "badge", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "badge", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r5 = ctx.item;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]("#" + item_r5.numero);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("Usuario"))("label", item_r5.usuario == null ? null : item_r5.usuario.nome)("hint", ctx_r2.lex.translate("Participante") + ": " + (item_r5.usuario == null ? null : item_r5.usuario.nome));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("Unidade"))("label", item_r5.unidade == null ? null : item_r5.unidade.sigla)("hint", ctx_r2.lex.translate("Unidade") + ": " + (item_r5.unidade == null ? null : item_r5.unidade.nome));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("Programa"))("label", item_r5.programa == null ? null : item_r5.programa.nome)("hint", ctx_r2.lex.translate("Programa"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("TipoModalidade"))("label", item_r5.tipo_modalidade == null ? null : item_r5.tipo_modalidade.nome)("hint", ctx_r2.lex.translate("Tipo de modalidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r2.dao.getDateFormatted(item_r5.data_inicio) + " at\u00E9 " + ctx_r2.dao.getDateFormatted(item_r5.data_fim), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.getPlanoBadges(item_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r2.lookup.getValue(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status))("icon", ctx_r2.lookup.getIcon(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status))("color", ctx_r2.lookup.getColor(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status));
  }
}
function PlanoTrabalhoListAccordeonComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "plano-trabalho-consolidacao-list", 14);
  }
  if (rf & 2) {
    const item_r8 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("entity", item_r8);
  }
}
class PlanoTrabalhoListAccordeonComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  set arquivados(value) {
    if (this._arquivados != value) {
      this._arquivados = value;
      if (this.viewInit) this.loadData(this.entity, this.form);
    }
  }
  get arquivados() {
    return this._arquivados;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.selectedIndex = -1;
    this.planos = [];
    this._arquivados = false;
    this.dao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoTrabalhoDaoService);
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData(_this.entity, _this.form);
    })();
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.accordion.loading = true;
      try {
        let dados = yield _this2.dao.getByUsuario(_this2.usuarioId, _this2.arquivados);
        let agora = new Date().getTime();
        let self = _this2;
        _this2.planos = dados.planos;
        for (var i = 0; i < _this2.planos.length; i++) {
          if (_this2.util.asTimestamp(_this2.planos[i].data_inicio) <= agora && agora <= _this2.util.asTimestamp(_this2.planos[i].data_fim) && ["ATIVO", "CONCLUIDO"].includes(_this2.planos[i].status)) {
            _this2.selectedIndex = i;
          }
        }
      } finally {
        _this2.accordion.loading = false;
        _this2.cdRef.detectChanges();
      }
    })();
  }
  getPlanoBadges(plano) {
    let result = [];
    let concluidos = plano.consolidacoes.filter(x => x.status == "CONCLUIDO");
    let avaliados = plano.consolidacoes.filter(x => x.status == "AVALIADO");
    if (concluidos.length) {
      const concluido = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "CONCLUIDO");
      result.push({
        icon: concluido?.icon,
        label: concluido?.value,
        color: concluido?.color,
        textValue: concluidos.length.toString()
      });
    }
    if (avaliados.length) {
      const avaliado = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "AVALIADO");
      result.push({
        icon: avaliado?.icon,
        label: avaliado?.value,
        color: avaliado?.color,
        textValue: avaliados.length.toString()
      });
    }
    if (JSON.stringify(plano._metadata?.badges) != this.JSON.stringify(result)) {
      plano._metadata = Object.assign(plano._metadata || {}, {
        badges: result
      });
    }
    return plano._metadata.badges;
  }
}
_class = PlanoTrabalhoListAccordeonComponent;
_class.ɵfac = function PlanoTrabalhoListAccordeonComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-list-accordeon"]],
  viewQuery: function PlanoTrabalhoListAccordeonComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.accordion = _t.first);
    }
  },
  inputs: {
    usuarioId: "usuarioId",
    arquivados: "arquivados"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 8,
  consts: [[1, "p-3", "bg-body-secondary", "mb-3"], [1, "row", "w-100"], [1, "col-md-1"], [1, "col-md-4"], [1, "col-md-3"], [1, "col-md-2"], [3, "items", "selectedIndex", "titleTemplate", "template"], ["accordion", ""], ["planoTrabalhoSectionTitle", ""], ["planoTrabalhoSection", ""], ["color", "light", 3, "icon", "label", "hint"], [3, "badge", 4, "ngFor", "ngForOf"], [3, "label", "icon", "color"], [3, "badge"], [3, "entity"]],
  template: function PlanoTrabalhoListAccordeonComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "#ID");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Vig\u00EAncia");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Status");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "accordion", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, PlanoTrabalhoListAccordeonComponent_ng_template_13_Template, 14, 18, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, PlanoTrabalhoListAccordeonComponent_ng_template_15_Template, 1, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](14);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate4"]("", ctx.lex.translate("Participante"), "/", ctx.lex.translate("Unidade"), "/", ctx.lex.translate("Programa"), "/", ctx.lex.translate("Tipo de modalidade"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.planos)("selectedIndex", ctx.selectedIndex)("titleTemplate", _r1)("template", _r3);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__.BadgeComponent, _components_accordion_accordion_component__WEBPACK_IMPORTED_MODULE_4__.AccordionComponent, _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoConsolidacaoListComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 59510:
/*!********************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-list-entrega/plano-trabalho-list-entrega.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoListEntregaComponent: () => (/* binding */ PlanoTrabalhoListEntregaComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ 20762);
/* harmony import */ var src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/plano-trabalho-entrega.model */ 75754);
/* harmony import */ var src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-trabalho-entrega-dao.service */ 59173);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/unidade.service */ 20609);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/reaction/reaction.component */ 32877);

var _class;























const _c0 = ["origem"];
const _c1 = ["planoEntrega"];
const _c2 = ["entrega"];
function PlanoTrabalhoListEntregaComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 20)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](3, "Origem");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_6_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 26);
  }
  if (rf & 2) {
    const row_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]().row;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", (row_r28.plano_entrega_entrega == null ? null : row_r28.plano_entrega_entrega.plano_entrega == null ? null : row_r28.plano_entrega_entrega.plano_entrega.unidade == null ? null : row_r28.plano_entrega_entrega.plano_entrega.unidade.sigla) || "DESCONHECIDO")("icon", ctx_r29.entityService.getIcon("Unidade"));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_6_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 27);
  }
  if (rf & 2) {
    const row_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", row_r28.orgao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 21)(1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, PlanoTrabalhoListEntregaComponent_ng_template_6_badge_3_Template, 1, 2, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, PlanoTrabalhoListEntregaComponent_ng_template_6_badge_4_Template, 1, 1, "badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx_r4.planoTrabalhoService.tipoEntrega(row_r28, ctx_r4.entity).titulo)("color", ctx_r4.planoTrabalhoService.tipoEntrega(row_r28, ctx_r4.entity).cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", row_r28.plano_entrega_entrega_id == null ? null : row_r28.plano_entrega_entrega_id.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", row_r28.orgao == null ? null : row_r28.orgao.length);
  }
}
const _c3 = function () {
  return ["entregas.entrega:id,nome", "unidade"];
};
const _c4 = function (a2) {
  return ["unidade_id", "==", a2];
};
const _c5 = function () {
  return ["status", "==", "ATIVO"];
};
const _c6 = function (a0, a1) {
  return [a0, a1];
};
const _c7 = function (a0) {
  return [a0];
};
const _c8 = function (a0) {
  return {
    unidade_id: a0,
    status: "ATIVO"
  };
};
const _c9 = function (a0) {
  return {
    filter: a0
  };
};
const _c10 = function () {
  return {
    status: "ATIVO"
  };
};
function PlanoTrabalhoListEntregaComponent_ng_template_8_input_search_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "input-search", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_8_input_search_2_Template_input_search_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r38.onPlanoEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](1);
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("placeholder", "Selecione o " + ctx_r35.lex.translate("Plano de entrega"))("join", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](5, _c3))("where", (_r34 == null ? null : _r34.value) == "PROPRIA_UNIDADE" ? _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction2"](9, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](6, _c4, ctx_r35.entity == null ? null : ctx_r35.entity.unidade_id), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](8, _c5)) : _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](13, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](12, _c5)))("selectParams", (_r34 == null ? null : _r34.value) == "PROPRIA_UNIDADE" ? _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](17, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](15, _c8, ctx_r35.entity == null ? null : ctx_r35.entity.unidade_id)) : _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](20, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](19, _c10)))("dao", ctx_r35.planoEntregaDao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_8_input_text_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-text", 34, 35);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
  }
}
const _c11 = function () {
  return ["PROPRIA_UNIDADE", "OUTRA_UNIDADE"];
};
function PlanoTrabalhoListEntregaComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "input-select", 28, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_8_Template_input_select_change_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r42);
      const row_r33 = restoredCtx.row;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r41.onOrigemChange(row_r33));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_8_input_search_2_Template, 2, 22, "input-search", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, PlanoTrabalhoListEntregaComponent_ng_template_8_input_text_3_Template, 2, 1, "input-text", 31);
  }
  if (rf & 2) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](1);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r6.form.controls.origem)("items", ctx_r6.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](4, _c11).includes(_r34 == null ? null : _r34.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", (_r34 == null ? null : _r34.value) == "OUTRO_ORGAO");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2, "Entrega");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_13_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "badge", 39)(2, "badge", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]().row;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx_r45.util.getDateFormatted(row_r44.plano_entrega_entrega == null ? null : row_r44.plano_entrega_entrega.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx_r45.util.getDateFormatted(row_r44.plano_entrega_entrega == null ? null : row_r44.plano_entrega_entrega.data_fim));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_13_div_2_Template, 3, 2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "reaction", 37);
  }
  if (rf & 2) {
    const row_r44 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](ctx_r10.planoTrabalhoService.tipoEntrega(row_r44, ctx_r10.entity).descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](3, _c11).includes(ctx_r10.planoTrabalhoService.tipoEntrega(row_r44, ctx_r10.entity).tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("entity", row_r44);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_15_input_select_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "input-select", 42, 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_15_input_select_0_Template_input_select_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r51.onEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r48.form.controls.plano_entrega_entrega_id)("items", ctx_r48.entregas);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "badge", 39)(2, "badge", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx_r49.util.getDateFormatted(ctx_r49.entrega.selectedItem.data.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx_r49.util.getDateFormatted(ctx_r49.entrega.selectedItem.data.data_fim));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, PlanoTrabalhoListEntregaComponent_ng_template_15_input_select_0_Template, 2, 2, "input-select", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PlanoTrabalhoListEntregaComponent_ng_template_15_div_1_Template, 3, 2, "div", 36);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](2, _c11).includes(ctx_r12.origem == null ? null : ctx_r12.origem.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r12.entrega == null ? null : ctx_r12.entrega.selectedItem);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_18_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div")(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "badge", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "badge", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("color", "warning")("label", ctx_r54.totalForcaTrabalho + "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("color", "secondary")("label", ctx_r54.totalForcaTrabalho - 100 + "%");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_18_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "badge", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("color", ctx_r56.totalForcaTrabalho == 100 ? "success" : "warning")("label", ctx_r56.totalForcaTrabalho + "%");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PlanoTrabalhoListEntregaComponent_ng_template_18_div_1_Template, 5, 4, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_18_ng_template_2_Template, 2, 2, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](3);
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r14.totalForcaTrabalho > 100)("ngIfElse", _r55);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](row_r57.forca_trabalho + "%");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "input-text", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_22_Template_input_text_change_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r60);
      const row_r58 = restoredCtx.row;
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r59.onForcaTrabalhoChange(row_r58));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r18.form.controls.forca_trabalho);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 20)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](3, "Descri\u00E7\u00E3o dos Trabalhos");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_27_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div")(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](row_r62.descricao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, PlanoTrabalhoListEntregaComponent_ng_template_27_div_0_Template, 3, 1, "div", 44);
  }
  if (rf & 2) {
    const row_r62 = ctx.row;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", row_r62.descricao != ctx_r22.planoTrabalhoService.tipoEntrega(row_r62, ctx_r22.entity).descricao)("ngIfElse", _r23);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "Detalhe/Descreva os trabalhos");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-textarea", 49);
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("rows", 2)("control", ctx_r26.form.controls.descricao);
  }
}
class PlanoTrabalhoListEntregaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  set disabled(value) {
    if (this._disabled != value) this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }
  set noPersist(value) {
    super.noPersist = value;
  }
  get noPersist() {
    return super.noPersist;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_4__.PlanoTrabalho());
    if (!this.gridControl.value.entregas) this.gridControl.value.entregas = [];
    return this.gridControl.value.entregas;
  }
  //quando adiciona um novo e edita o mesmo, salva 2x no banco
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.planoTrabalhoEditavel = true;
    this.options = [];
    this.totalForcaTrabalho = 0;
    this.entregas = [];
    this._disabled = false;
    /**
     * Método chamado para a validação dos campos do formulário, por ocasião da edição ou inserção de itens.
     * @param control
     * @param controlName
     * @returns
     */
    this.validate = (control, controlName) => {
      let result = null;
      if (['forca_trabalho'].indexOf(controlName) >= 0 && control.value == 1) return result;
      if (['forca_trabalho'].indexOf(controlName) >= 0 && !control.value) result = "Obrigatório!";
      if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório!";
      if (['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1 || control.value > 100)) result = "Deve estar entre 1 e 100";
      if (['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
        if (['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value) result = "Obrigatório!";
        if (!!this.entity?.entregas?.filter(e => !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).find(x => x.plano_entrega_entrega_id == control.value)) result = "Esta entrega está em duplicidade!"; /* (*2) */
      }

      return result;
    };
    this.dao = injector.get(src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoEntregaDaoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_20__.ChangeDetectorRef);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoDaoService);
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__.PlanoEntregaDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalhoService);
    this.peeDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__.PlanoEntregaEntregaDaoService);
    this.unidadeService = injector.get(src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_11__.UnidadeService);
    this.join = ["entrega", "plano_entrega_entrega.entrega", "plano_entrega_entrega.plano_entrega:id,unidade_id", "plano_entrega_entrega.plano_entrega.unidade:id,sigla"];
    this.form = this.fh.FormBuilder({
      origem: {
        default: null
      },
      orgao: {
        default: null
      },
      descricao: {
        default: ""
      },
      forca_trabalho: {
        default: 1
      },
      plano_trabalho_id: {
        default: null
      },
      plano_entrega_id: {
        default: null
      },
      plano_entrega_entrega_id: {
        default: null
      }
    }, this.cdRef, this.validate);
  }
  validateEntregas() {
    let planoInterval = {
      start: this.entity.data_inicio,
      end: this.entity.data_fim
    };
    for (let entrega of this.items) {
      let entregaPlano = entrega.plano_entrega_entrega;
      // valida as datas das entregas quando vinculado a uma entrega do plano de entrega
      if (entregaPlano) {
        let entregaDataFim = entregaPlano.data_fim ? entregaPlano.data_fim : entregaPlano.data_inicio.getTime() <= this.entity.data_fim.getTime() ? this.entity.data_fim : undefined;
        let entregaInterval = {
          start: entregaPlano.data_inicio,
          end: entregaPlano.data_fim || entregaPlano.data_inicio
        };
        if (!entregaDataFim || !this.util.intersection([entregaInterval, planoInterval])) {
          return this.lex.translate("Entrega") + " " + entregaPlano.descricao + " possui datas incompatíveis (início " + this.util.getDateFormatted(entregaPlano.data_inicio) + (entregaPlano.data_fim ? "e fim " + this.util.getDateFormatted(entregaPlano.data_fim) : "") + ")";
        }
      }
    }
    return undefined;
  }
  /**
   * Método chamado na inicialização do componente. Neste momento são carregadas as entregas do catálogo e as entregas da mesma unidade do plano de trabalho,
   * visto que esses itens não se alteram durante a vida do componente e poderão ser utilizados durante sua utilização.
   */
  ngOnInit() {
    var _superprop_getNgOnInit = () => super.ngOnInit,
      _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _superprop_getNgOnInit().call(_this);
      _this.entity = _this.metadata?.entity || _this.entity;
      _this.totalForcaTrabalho = Math.round(_this.somaForcaTrabalho(_this.entity?.entregas) * 100) / 100;
      _this.entity._metadata = _this.entity._metadata || {};
      _this.entity._metadata.novaEntrega = undefined;
    })();
  }
  /**
   * Método chamado para inserir uma entrega de plano de trabalho no grid, seja este componente persistente ou não.
   * @returns
   */
  addEntrega() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return Object.assign(new src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoEntrega(), {
        _status: "ADD",
        id: _this2.dao.generateUuid(),
        plano_trabalho_id: _this2.entity?.id
      });
    })();
  }
  /**
   * Método utilizado durante a inclusão/alteração de uma entrega de plano de trabalho no grid, seja este componente persistente ou não
   * @param form
   * @param row
   */
  loadEntrega(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let entrega = row;
      form.controls.descricao.setValue(row.descricao);
      form.controls.forca_trabalho.setValue(row.forca_trabalho);
      form.controls.plano_trabalho_id.setValue(row.plano_trabalho_id);
      form.controls.orgao.setValue(null);
      form.controls.plano_entrega_entrega_id.setValue(null);
      if (row.plano_entrega_entrega) {
        form.controls.plano_entrega_id.setValue(row.plano_entrega_entrega.plano_entrega.id);
        form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
      }
      if (entrega._status == "ADD" && !form.controls.plano_entrega_id.value) {
        // É uma nova entrega
        form.controls.origem.setValue('PROPRIA_UNIDADE');
        let planosEntregas = yield _this3.planoEntregaDao.query({
          where: [["unidade_id", "==", _this3.entity.unidade_id], ["status", "==", "ATIVO"]]
        }).asPromise(); //["data_inicio", "<=", this.entity!.data_fim], ["data_fim", ">=", this.entity!.data_inicio]
        form.controls.plano_entrega_id.setValue(planosEntregas[0].id);
      } else if (entrega.plano_entrega_entrega?.plano_entrega?.unidade_id == _this3.entity.unidade_id) {
        form.controls.origem.setValue('PROPRIA_UNIDADE');
        yield _this3.carregarEntregas(entrega.plano_entrega_entrega.plano_entrega_id);
        form.controls.plano_entrega_entrega_id.setValue(entrega.plano_entrega_entrega_id);
      } else if (entrega.plano_entrega_entrega) {
        form.controls.origem.setValue('OUTRA_UNIDADE');
        yield _this3.carregarEntregas(entrega.plano_entrega_entrega.plano_entrega_id);
        form.controls.plano_entrega_entrega_id.setValue(entrega.plano_entrega_entrega_id);
      } else if (!!entrega.orgao?.length) {
        form.controls.origem.setValue('OUTRO_ORGAO');
        form.controls.orgao.setValue(entrega.orgao);
      } else {
        form.controls.origem.setValue('SEM_ENTREGA');
      }
    })();
  }
  /**
   * Método chamado para a exclusão de uma entrega de plano de trabalho do grid, seja este componente persistente ou não.
   * @param row
   * @returns
   */
  removeEntrega(row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this4.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) {
        _this4.loading = true;
        try {
          _this4.isNoPersist ? Object.assign(row, {
            _status: "DELETE"
          }) : yield _this4.dao?.delete(row.id);
        } finally {
          _this4.loading = false;
        }
        _this4.totalForcaTrabalho = Math.round((_this4.totalForcaTrabalho - row.forca_trabalho * 1) * 100) / 100;
        return _this4.isNoPersist ? false : true; // (*3)
      } else {
        return false;
      }
    })();
  }
  /**
   * Método chamado no salvamento de uma entrega do plano de trabalho do grid, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
  saveEntrega(form, row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.entity._metadata = _this5.entity._metadata || {};
      _this5.entity._metadata.novaEntrega = row;
      _this5.entity._metadata.novaEntrega.plano_entrega_entrega_id = _this5.form?.controls.plano_entrega_entrega_id.value;
      _this5.entity._metadata.novaEntrega.orgao = _this5.form?.controls.orgao.value;
      _this5.entity._metadata.novaEntrega.descricao = _this5.form?.controls.descricao.value;
      _this5.entity._metadata.novaEntrega.forca_trabalho = _this5.form?.controls.forca_trabalho.value;
      _this5.loading = true;
      try {
        if (!_this5.isNoPersist) /* persistente */{
            _this5.dao.save(_this5.entity._metadata.novaEntrega, _this5.join);
          }
      } catch (e) {
        _this5.error(e.message ? e.message : e.toString() || e);
      } finally {
        row.forca_trabalho = _this5.form?.controls.forca_trabalho.value * 1;
        row.plano_entrega_entrega = _this5.entrega?.selectedItem?.data || null;
        _this5.totalForcaTrabalho = Math.round(_this5.somaForcaTrabalho(_this5.entity?.entregas) * 100) / 100;
        _this5.loading = false;
      }
      return _this5.entity._metadata.novaEntrega;
    })();
  }
  /**
   *  Quando uma nova entrega de plano de trabalho é incluída no grid, o objeto '_metadata' é anexado em 'this.entity' para permitir a atualização do grid antes da atualização da página.
   *  Após a atualização do grid, este método é chamado para excluir o objeto '_metadata' e garantir que, no caso da inserção de várias entregas no grid, apenas a última seja lida a partir deste objeto.
   * @param row
   */
  saveEndEntrega(row) {
    this.entity._metadata = null;
  }
  /**
   * Método chamado para somar os percentuais das forças de trabalho do array de entregas passado como parâmetro.
   * @param entregas Array de entregas do plano de trabalho
   * @returns
   */
  somaForcaTrabalho(entregas = []) {
    return entregas.map(x => x.forca_trabalho * 1).reduce((a, b) => a + b, 0);
  }
  /**
   * Método chamado para carregar as entregas da unidade
   * @param idPlanoOuPlano ID do plano de entregas ou o seu objeto completo.
   */
  carregarEntregas(idPlanoOuPlano) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let planoEntrega = typeof idPlanoOuPlano == 'string' ? yield _this6.planoEntregaDao.getById(idPlanoOuPlano, ["entregas.entrega:id,nome", "unidade"]) : idPlanoOuPlano;
      let planoEntregaComUnidade = {
        id: planoEntrega?.id,
        unidade_id: planoEntrega?.unidade_id,
        unidade: planoEntrega?.unidade
      };
      _this6.entregas = planoEntrega?.entregas.map(epe => Object.assign({}, {
        key: epe.id,
        value: epe.descricao || epe.entrega?.nome || "Desconhecido",
        data: Object.assign(epe, {
          plano_entrega: planoEntregaComUnidade
        })
      })) || [];
      _this6.entregas.sort((a, b) => a.value > b.value ? 1 : -1);
      if (!_this6.entregas.find(x => x.key == _this6.form.controls.plano_entrega_entrega_id.value)) _this6.form.controls.plano_entrega_entrega_id.setValue(null);
    })();
  }
  /* ---------  TRATAMENTO DOS EVENTOS ----------- */
  onOrigemChange(row) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let value = _this7.form.controls.origem.value;
      _this7.cdRef.detectChanges();
      if (value == 'OUTRO_ORGAO') {
        _this7.form?.controls.plano_entrega_entrega_id.setValue(null);
      } else if (value == 'SEM_ENTREGA') {
        _this7.form?.controls.orgao.setValue(null);
        _this7.form?.controls.plano_entrega_entrega_id.setValue(null);
      } else if (value == 'OUTRA_UNIDADE') {
        //if (value == 'PROPRIA_UNIDADE' || value == 'OUTRA_UNIDADE')
        _this7.form?.controls.orgao.setValue(null);
        if (!_this7.form?.controls.plano_entrega_id.value) {
          _this7.loading = true;
          _this7.planoEntrega?.onSelectClick(new Event("SELECT"));
          _this7.loading = false;
        }
      }
      /*      try {
         let planosEntregas = await this.planoEntregaDao!.query({where: [["unidade_id", "==", this.entity!.unidade_id], ["status", "==", "ATIVO"], ["data_inicio", "<=", this.entity!.data_fim], ["data_fim", ">=", this.entity!.data_inicio]]}).asPromise();
        if(planosEntregas.length == 1) {
          this.form?.controls.plano_entrega_id.setValue(planosEntregas[0].id);
        } else if(this.planoEntrega?.selectedEntity?.unidade_id != this.entity!.unidade_id) {
          this.planoEntrega?.onSelectClick(new Event("SELECT"));
        }
        this.planoEntrega?.onSelectClick(new Event("SELECT"));
      } finally {
        this.loading = false;
      }
      } if (value == 'OUTRA_UNIDADE') {
      this.form?.controls.orgao.setValue(null);
      this.planoEntrega?.onSelectClick(new Event("SELECT"));
      }*/
    })();
  }

  onPlanoEntregaChange(event) {
    let planoEntrega = this.planoEntrega?.selectedEntity;
    this.carregarEntregas(planoEntrega);
  }
  onEntregaChange(event) {
    /*let entrega = this.entrega!.selectedItem?.data as PlanoEntregaEntrega;
    if(!this.form!.controls.descricao.value?.length) {
      this.form!.controls.descricao.setValue(entrega?.descricao || "");
    }*/
  }
  onForcaTrabalhoChange(row) {
    let index = this.items.findIndex(x => x["id"] == row["id"]);
    this.totalForcaTrabalho = Math.round((this.somaForcaTrabalho(this.grid?.items) - this.items[index].forca_trabalho * 1 + this.form?.controls.forca_trabalho.value * 1) * 100) / 100;
  }
}
_class = PlanoTrabalhoListEntregaComponent;
_class.ɵfac = function PlanoTrabalhoListEntregaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-list-entrega"]],
  viewQuery: function PlanoTrabalhoListEntregaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.origem = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    disabled: "disabled",
    noPersist: "noPersist",
    cdRef: "cdRef",
    planoTrabalhoEditavel: "planoTrabalhoEditavel"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 34,
  vars: 38,
  consts: [["noMargin", "", "editable", "", 3, "items", "form", "selectable", "minHeight", "join", "groupBy", "add", "remove", "save", "load", "saveEnd", "hasDelete", "hasEdit", "hasAdd"], ["gridEntregas", ""], [3, "titleTemplate", "template", "editTemplate", "verticalAlign", "width", "align"], ["titleOrigem", ""], ["columnOrigem", ""], ["editOrigem", ""], [3, "maxWidth", "titleTemplate", "template", "editTemplate", "verticalAlign"], ["titleEntrega", ""], ["columnEntrega", ""], ["editEntrega", ""], [3, "titleTemplate", "title", "template", "editTemplate", "width", "align", "titleHint"], ["titleForcaTrabalho", ""], ["columnForcaTrabalho", ""], ["editForcaTrabalho", ""], [3, "maxWidth", "titleTemplate", "template", "editTemplate", "verticalAlign", "align"], ["titleDescricao", ""], ["columnDescricao", ""], ["solicitarDescricao", ""], ["editDescricao", ""], ["type", "options"], [1, "text-center"], [1, "w-100", "d-flex", "justify-content-center"], [1, "one-per-line"], [3, "label", "color"], ["color", "primary", 3, "label", "icon", 4, "ngIf"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label", 4, "ngIf"], ["color", "primary", 3, "label", "icon"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label"], ["controlName", "origem", "controlName", "origem", 3, "control", "items", "change"], ["origem", ""], ["label", "", "controlName", "plano_entrega_id", 3, "placeholder", "join", "where", "selectParams", "dao", "change", 4, "ngIf"], ["controlName", "orgao", "placeholder", "\u00D3rg\u00E3o", 4, "ngIf"], ["label", "", "controlName", "plano_entrega_id", 3, "placeholder", "join", "where", "selectParams", "dao", "change"], ["planoEntrega", ""], ["controlName", "orgao", "placeholder", "\u00D3rg\u00E3o"], ["orgao", ""], ["class", "w-100", 4, "ngIf"], ["origem", "PLANO_TRABALHO_ENTREGA", 3, "entity"], [1, "w-100"], ["color", "light", "icon", "bi bi-box-arrow-in-right", "hint", "Data de in\u00EDcio", 3, "label"], ["color", "light", "icon", "bi bi-box-arrow-right", "hint", "Data de t\u00E9rmino", 3, "label"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change", 4, "ngIf"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change"], ["entrega", ""], [4, "ngIf", "ngIfElse"], ["umCHD", ""], ["icon", "bi bi-calculator", 3, "color", "label"], ["icon", "bi bi-intersect", 3, "color", "label"], ["number", "", "sufix", "%", "controlName", "forca_trabalho", 3, "control", "change"], ["controlName", "descricao", 3, "rows", "control"]],
  template: function PlanoTrabalhoListEntregaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "grid", 0, 1)(2, "columns")(3, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, PlanoTrabalhoListEntregaComponent_ng_template_4_Template, 4, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, PlanoTrabalhoListEntregaComponent_ng_template_6_Template, 5, 4, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](8, PlanoTrabalhoListEntregaComponent_ng_template_8_Template, 4, 5, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](10, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](11, PlanoTrabalhoListEntregaComponent_ng_template_11_Template, 3, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](13, PlanoTrabalhoListEntregaComponent_ng_template_13_Template, 4, 4, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](15, PlanoTrabalhoListEntregaComponent_ng_template_15_Template, 2, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](17, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](18, PlanoTrabalhoListEntregaComponent_ng_template_18_Template, 4, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](20, PlanoTrabalhoListEntregaComponent_ng_template_20_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](22, PlanoTrabalhoListEntregaComponent_ng_template_22_Template, 1, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](24, "column", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](25, PlanoTrabalhoListEntregaComponent_ng_template_25_Template, 4, 0, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](27, PlanoTrabalhoListEntregaComponent_ng_template_27_Template, 1, 2, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](29, PlanoTrabalhoListEntregaComponent_ng_template_29_Template, 2, 0, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](31, PlanoTrabalhoListEntregaComponent_ng_template_31_Template, 1, 2, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](33, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](5);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](7);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](9);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](12);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](14);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](16);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](19);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](21);
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](23);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](26);
      const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](28);
      const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.items.length > 2 ? 0 : 300)("join", ctx.join)("groupBy", ctx.groupBy)("add", ctx.addEntrega.bind(ctx))("remove", ctx.removeEntrega.bind(ctx))("save", ctx.saveEntrega.bind(ctx))("load", ctx.loadEntrega.bind(ctx))("saveEnd", ctx.saveEndEntrega.bind(ctx))("hasDelete", !ctx.disabled && ctx.planoTrabalhoEditavel)("hasEdit", !ctx.disabled && ctx.planoTrabalhoEditavel)("hasAdd", !ctx.disabled && ctx.planoTrabalhoEditavel);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("titleTemplate", _r1)("template", _r3)("editTemplate", _r5)("verticalAlign", "middle")("width", 300)("align", "center");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("maxWidth", 350)("titleTemplate", _r7)("template", _r9)("editTemplate", _r11)("verticalAlign", "middle");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("titleTemplate", _r13)("title", "% CHD")("template", _r15)("editTemplate", _r17)("width", 125)("align", "center")("titleHint", "% Carga Hor\u00E1ria Dispon\u00EDvel");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("maxWidth", 250)("titleTemplate", _r19)("template", _r21)("editTemplate", _r25)("verticalAlign", "middle")("align", "center");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__.ColumnComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_16__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__.BadgeComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_19__.ReactionComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 64506:
/*!********************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho-routing.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoRoutingModule: () => (/* binding */ PlanoTrabalhoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ 51292);
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ 31377);
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ 89997);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);
/* harmony import */ var _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-trabalho-consolidacao/plano-trabalho-consolidacao.component */ 56845);
/* harmony import */ var _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component */ 72132);
/* harmony import */ var _uteis_avaliar_avaliar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../uteis/avaliar/avaliar.component */ 50182);
/* harmony import */ var _plano_trabalho_consolidacao_avaliacao_plano_trabalho_consolidacao_avaliacao_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-avaliacao/plano-trabalho-consolidacao-avaliacao.component */ 65862);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;













const routes = [{
  path: '',
  component: _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_4__.PlanoTrabalhoListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Planos de Trabalho"
  }
}, {
  path: 'new',
  component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Plano de Trabalho",
    modal: true
  }
}, {
  path: 'termo',
  component: _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoFormTermoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Termo de adesão",
    modal: true
  }
}, {
  path: 'consolidacao/avaliacao',
  component: _plano_trabalho_consolidacao_avaliacao_plano_trabalho_consolidacao_avaliacao_component__WEBPACK_IMPORTED_MODULE_9__.PlanoTrabalhoConsolidacaoAvaliacaoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Avaliação das Consolidações do Plano de Trabalho"
  }
}, {
  path: 'consolidacao/:consolidacaoId/avaliar',
  component: _uteis_avaliar_avaliar_component__WEBPACK_IMPORTED_MODULE_8__.AvaliarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Avaliar Consolidação do Plano de Trabalho"
  }
}, {
  path: 'consolidacao/:consolidacaoId/recurso',
  component: _uteis_avaliar_avaliar_component__WEBPACK_IMPORTED_MODULE_8__.AvaliarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Recurso da Avaliação da Consolidação do Plano de Trabalho"
  }
}, {
  path: 'consolidacao/:usuarioId/:planoTrabalhoId',
  component: _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoConsolidacaoListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consolidações do Plano de Trabalho"
  }
}, {
  path: 'consolidacao',
  component: _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoConsolidacaoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consolidações"
  }
}, {
  path: ':id/edit',
  component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Plano de Trabalho",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Plano de Trabalho",
    modal: true
  }
}, {
  path: 'entregaList',
  component: _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoListEntregaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Lista de Entregas do Plano de Trabalho",
    modal: true
  }
}];
class PlanoTrabalhoRoutingModule {}
_class = PlanoTrabalhoRoutingModule;
_class.ɵfac = function PlanoTrabalhoRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](PlanoTrabalhoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
  });
})();

/***/ }),

/***/ 55796:
/*!************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoModule: () => (/* binding */ PlanoTrabalhoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plano-trabalho-routing.module */ 64506);
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ 31377);
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ 89997);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ 51292);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);
/* harmony import */ var _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-trabalho-consolidacao/plano-trabalho-consolidacao.component */ 56845);
/* harmony import */ var _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component */ 72132);
/* harmony import */ var _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component */ 52483);
/* harmony import */ var _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component */ 89775);
/* harmony import */ var _plano_trabalho_consolidacao_avaliacao_plano_trabalho_consolidacao_avaliacao_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-avaliacao/plano-trabalho-consolidacao-avaliacao.component */ 65862);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/grid/report/report.component */ 58252);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);
var _class;































class PlanoTrabalhoModule {}
_class = PlanoTrabalhoModule;
_class.ɵfac = function PlanoTrabalhoModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_28__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_29__.ReactiveFormsModule, _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlanoTrabalhoRoutingModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵsetNgModuleScope"](PlanoTrabalhoModule, {
    declarations: [_plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_1__.PlanoTrabalhoFormComponent, _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoListComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoListEntregaComponent, _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoFormTermoComponent, _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoConsolidacaoComponent, _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalhoConsolidacaoListComponent, _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalhoConsolidacaoFormComponent, _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_9__.PlanoTrabalhoListAccordeonComponent, _plano_trabalho_consolidacao_avaliacao_plano_trabalho_consolidacao_avaliacao_component__WEBPACK_IMPORTED_MODULE_11__.PlanoTrabalhoConsolidacaoAvaliacaoComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_28__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_29__.ReactiveFormsModule, _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlanoTrabalhoRoutingModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵsetComponentScope"](_plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoListComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_28__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_12__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_13__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_14__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_15__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_16__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_17__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_18__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_19__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_20__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_21__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_22__.InputSelectComponent, _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_23__.ReportComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_24__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_25__.BadgeComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_26__.DocumentosBadgeComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoListEntregaComponent], []);

/***/ })

}]);
//# sourceMappingURL=5796.js.map