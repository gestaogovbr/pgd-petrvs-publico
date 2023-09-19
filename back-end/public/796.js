"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[796],{

/***/ 48709:
/*!***************************************************************************!*\
  !*** ./src/app/dao/plano-trabalho-consolidacao-ocorrencia-dao.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoConsolidacaoOcorrenciaDaoService: () => (/* binding */ PlanoTrabalhoConsolidacaoOcorrenciaDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class PlanoTrabalhoConsolidacaoOcorrenciaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("PlanoTrabalhoConsolidacaoOcorrencia", injector);
    this.injector = injector;
  }
  dataset(deeps) {
    return this.deepsFilter([], deeps);
  }
}
_class = PlanoTrabalhoConsolidacaoOcorrenciaDaoService;
_class.ɵfac = function PlanoTrabalhoConsolidacaoOcorrenciaDaoService_Factory(t) {
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
    this.status = null; // Status atual da consolidação
    this.avaliacoes = [];
    this.status_historico = [];
    this.plano_trabalho_id = "";
    this.avaliacao_id = null;
    this.initialization(data);
  }
}

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-trabalho-consolidacao-dao.service */ 17046);
/* harmony import */ var src_app_dao_plano_trabalho_consolidacao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-consolidacao-ocorrencia-dao.service */ 48709);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_models_plano_trabalho_consolidacao_ocorrencia_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/plano-trabalho-consolidacao-ocorrencia.model */ 75047);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var _plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../plano-entrega/plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var _atividade_atividade_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../atividade/atividade.service */ 57338);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ 81419);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);

var _class;






























const _c0 = ["gridEntregas"];
const _c1 = ["gridAtividades"];
const _c2 = ["etiqueta"];
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_5_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 39);
  }
  if (rf & 2) {
    const row_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]().row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("icon", ctx_r33.entityService.getIcon("TipoAtividade"))("label", row_r32.tipo_atividade.nome);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "badge", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_badge_2_Template, 1, 2, "badge", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r32 = ctx.row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", row_r32.numero)("data", row_r32.numero)("click", ctx_r19.atividadeService.onIdClick.bind(ctx_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", row_r32.tipo_atividade);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtextInterpolate"](row_r32.descricao);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "input-search", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("select", function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_6_Template_input_search_select_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵresetView"](ctx_r36.onTipoAtividadeSelect($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "input-textarea", 41);
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", ctx_r21.lex.translate("Tipo de atividade"))("size", 12)("emptyValue", null)("control", ctx_r21.formAtividade.controls.tipo_atividade_id)("dao", ctx_r21.tipoAtividadeDao)("labelInfo", ctx_r21.lex.translate("Tipo de atividade") + " utilizado para classificar a atividade")("required", !ctx_r21.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO") ? "true" : undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx_r21.formAtividade.controls.descricao);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 44);
  }
  if (rf & 2) {
    const tempo_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("badge", tempo_r40);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_badge_1_Template, 1, 1, "badge", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r38 = ctx.row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngForOf", ctx_r23.atividadeService.temposAtividade(row_r38));
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "input-datetime", 45)(1, "input-datetime", 46)(2, "input-datetime", 47);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", ctx_r25.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx_r25.formAtividade.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", ctx_r25.lex.translate("Prazo de entrega"))("control", ctx_r25.formAtividade.controls.data_estipulada_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("control", ctx_r25.formAtividade.controls.data_entrega);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 52);
  }
  if (rf & 2) {
    const etiqueta_r46 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("lookup", etiqueta_r46);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_separator_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "separator", 53);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "i", 57);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_i_2_Template, 1, 0, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](3, "td", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", check_r48.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtextInterpolate"](check_r48.texto);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_tr_1_Template, 5, 2, "tr", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngForOf", row_r42.checklist);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "progress-bar", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_badge_1_Template, 1, 1, "badge", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_separator_2_Template, 1, 0, "separator", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_table_3_Template, 2, 1, "table", 51);
  }
  if (rf & 2) {
    const row_r42 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("value", row_r42.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngForOf", row_r42.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", row_r42.checklist == null ? null : row_r42.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", row_r42.checklist == null ? null : row_r42.checklist.length);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_separator_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "separator", 53);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](2, "input-switch", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](3, "td", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r56 = ctx.$implicit;
    const i_r57 = ctx.index;
    const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("source", ctx_r55.checklist)("path", i_r57 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtextInterpolate"](check_r56.texto);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_tr_1_Template, 5, 4, "tr", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngForOf", ctx_r54.checklist);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "input-number", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](1, "input-multiselect", 59)(2, "input-select", 60, 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("details", function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template_input_select_details_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵrestoreView"](_r59);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵresetView"](ctx_r58.onEtiquetaConfigClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_separator_4_Template, 1, 0, "separator", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_table_5_Template, 2, 1, "table", 51);
  }
  if (rf & 2) {
    const row_r51 = ctx.row;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("decimals", 2)("control", ctx_r29.formEdit.controls.progresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("control", ctx_r29.formEdit.controls.etiquetas)("addItemHandle", ctx_r29.addItemHandleEtiquetas.bind(ctx_r29));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("control", ctx_r29.formEdit.controls.etiqueta)("items", ctx_r29.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", row_r51.checklist == null ? null : row_r51.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", row_r51.checklist == null ? null : row_r51.checklist.length);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 67);
  }
  if (rf & 2) {
    const status_r63 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("data", status_r63)("color", status_r63.color)("icon", status_r63.icon)("label", status_r63.label);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_comentarios_widget_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "comentarios-widget", 68);
  }
  if (rf & 2) {
    const row_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("entity", row_r60)("selectable", false)("grid", _r17);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "documentos-badge", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](1, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_badge_2_Template, 1, 4, "badge", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_comentarios_widget_3_Template, 1, 3, "comentarios-widget", 66);
  }
  if (rf & 2) {
    const row_r60 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](1);
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("documento", row_r60.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngForOf", ctx_r31.atividadeService.getStatus(row_r60, ctx_r31.entity));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", !_r17.editing);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "grid", 22, 23)(2, "columns")(3, "column", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_4_Template, 5, 5, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](6, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_6_Template, 2, 10, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](8, "column", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](9, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_9_Template, 2, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](11, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_11_Template, 3, 5, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](13, "column", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](14, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_14_Template, 4, 4, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_16_Template, 6, 11, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](18, "column", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](19, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_ng_template_19_Template, 4, 3, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](21, "column", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](5);
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](7);
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](10);
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](12);
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](15);
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](17);
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](20);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("items", row_r16.atividades)("minHeight", 0)("form", ctx_r4.formAtividade)("hasAdd", !ctx_r4.disabled)("hasDelete", false)("hasEdit", false)("add", ctx_r4.addAtividade.bind(ctx_r4, row_r16.entrega))("load", ctx_r4.loadAtividade.bind(ctx_r4))("remove", ctx_r4.removeAtividade.bind(ctx_r4, row_r16.atividades))("save", ctx_r4.saveAtividade.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", "#ID/" + ctx_r4.lex.translate("Tipo de Atividade") + "\nDescri\u00E7\u00E3o")("template", _r18)("editTemplate", _r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", "Tempos")("width", 300)("template", _r22)("editTemplate", _r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", "Progresso\nEtiquetas/Checklist")("width", 200)("template", _r26)("editTemplate", _r26)("columnEditTemplate", _r28)("edit", ctx_r4.onColumnProgressoEtiquetasChecklistEdit.bind(ctx_r4))("save", ctx_r4.onColumnProgressoEtiquetasChecklistSave.bind(ctx_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", "n\u00BA Processo/Status\nComent\u00E1rios")("width", 400)("template", _r30)("editTemplate", _r30);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("metadata", ctx_r4.atividadeOptionsMetadata)("dynamicOptions", ctx_r4.atividadeService.dynamicOptions.bind(ctx_r4))("dynamicButtons", ctx_r4.atividadeService.dynamicButtons.bind(ctx_r4));
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 69);
  }
  if (rf & 2) {
    const row_r65 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", row_r65.badge.titulo)("color", row_r65.badge.cor);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 70);
  }
  if (rf & 2) {
    const row_r66 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("icon", ctx_r8.entityService.getIcon("Entrega"))("label", row_r66.badge.nome)("textValue", row_r66.badge.descricao);
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 71);
  }
  if (rf & 2) {
    const row_r67 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", row_r67.entrega.forca_trabalho + "%");
  }
}
function PlanoTrabalhoConsolidacaoFormComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "badge", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const row_r68 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("color", row_r68.tipo_motivo_afastamento.cor)("icon", row_r68.tipo_motivo_afastamento.icone)("label", row_r68.tipo_motivo_afastamento.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtextInterpolate1"](" ", row_r68.observacao, " ");
  }
}
class PlanoTrabalhoConsolidacaoFormComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
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
    this.joinAtividade = ['demandante', 'usuario', 'tipo_atividade', 'comentarios.usuario:id,nome,apelido'];
    this.itemsEntregas = [];
    this.etiquetas = [];
    this.itemsOcorrencias = [];
    this.itemsAfastamentos = [];
    this._disabled = true;
    this.validateAtividade = (control, controlName) => {
      let result = null;
      if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['data_distribuicao', 'data_estipulada_entrega', 'data_entrega'].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if (controlName == 'data_estipulada_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
        result = "Menor que distribuição";
      } else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
        result = "Menor que distribuição";
      }
      return result;
    };
    this.validateOcorrencia = (control, controlName) => {
      let result = null;
      if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if (controlName == 'data_fim' && control.value.getTime() < this.formOcorrencia?.controls.data_inicio.value.getTime()) {
        result = "Menor que início";
      }
      return result;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_28__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_plano_trabalho_consolidacao_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoConsolidacaoDaoService);
    this.consolidacaoOcorrenciaDao = injector.get(src_app_dao_plano_trabalho_consolidacao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__.AtividadeDaoService);
    this.atividadeService = injector.get(_atividade_atividade_service__WEBPACK_IMPORTED_MODULE_11__.AtividadeService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_12__.CalendarService);
    this.ocorrenciaDao = injector.get(src_app_dao_plano_trabalho_consolidacao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_8__.TipoAtividadeDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoService);
    this.planoEntregaService = injector.get(_plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_9__.PlanoEntregaService);
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
      data_entrega: {
        default: new Date()
      },
      tipo_atividade_id: {
        default: null
      }
    }, this.cdRef, this.validateAtividade);
    this.formOcorrencia = this.fh.FormBuilder({
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      descricao: {
        default: ""
      }
    }, this.cdRef, this.validateOcorrencia);
    this.formEdit = this.fh.FormBuilder({
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
      x.plano_entrega_entrega.plano_entrega = dados.planosEntregas.find(pe => pe.id == x.plano_entrega_entrega.plano_entrega_id);
      let result = {
        id: x.id,
        entrega: x,
        atividades: dados.atividades.filter(y => y.plano_trabalho_entrega_id == x.id),
        badge: this.planoTrabalhoService.tipoEntrega(x, dados.planoTrabalho)
      };
      return result;
    });
    this.programa = dados.programa;
    this.planoTrabalho = dados.planoTrabalho;
    this.itemsOcorrencias = dados.ocorrencias;
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
      const dataInicio = _this3.util.setTime(_this3.entity.data_inicio, 0, 0, 0);
      const dataFim = _this3.util.setTime(_this3.entity.data_fim, 23, 59, 59);
      return new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_5__.Atividade({
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
      _this6.formAtividade.markAllAsTouched();
      if (_this6.formAtividade.valid) {
        row.id = row.id == "NEW" ? _this6.dao.generateUuid() : row.id;
        _this6.util.fillForm(row, _this6.formAtividade.value);
        result = yield _this6.atividadeDao?.save(row, _this6.joinAtividade, ['etiquetas', 'checklist', 'comentarios', 'pausas', 'tarefas']);
        _this6.atividadeRefreshId(row.id, result);
      }
      return result;
    })();
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
      _this7.checklist = _this7.util.clone(row.checklist);
    })();
  }
  onColumnProgressoEtiquetasChecklistSave(row) {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const saved = yield _this8.atividadeDao.update(row.id, {
          progresso: _this8.formEdit.controls.progresso.value,
          etiquetas: _this8.formEdit.controls.etiquetas.value,
          checklist: _this8.checklist
        });
        row.progresso = _this8.formEdit.controls.progresso.value;
        row.checklist = _this8.checklist;
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
  /***************************************************************************************
  * Ocorrências
  ****************************************************************************************/
  addOcorrencia() {
    var _this9 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_plano_trabalho_consolidacao_ocorrencia_model__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoConsolidacaoOcorrencia({
        plano_trabalho_consolidacao_id: _this9.entity.id
      });
    })();
  }
  loadOcorrencia(form, row) {
    var _this10 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this10.formAtividade.patchValue({
        data_inicio: row.data_inicio,
        data_fim: row.data_fim,
        descricao: row.descricao
      });
      _this10.cdRef.detectChanges();
    })();
  }
  removeOcorrencia(row) {
    var _this11 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this11.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        try {
          let ocorrencia = row;
          yield _this11.consolidacaoOcorrenciaDao?.delete(ocorrencia);
          _this11.itemsOcorrencias.splice(_this11.itemsOcorrencias.findIndex(x => x.id == ocorrencia.id), 1);
          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    })();
  }
  saveOcorrencia(form, row) {
    var _this12 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this12.formOcorrencia.markAllAsTouched();
      if (_this12.formOcorrencia.valid) {
        row.id = row.id == "NEW" ? _this12.dao.generateUuid() : row.id;
        row.data_inicio = form.controls.data_inicio.value;
        row.data_fim = form.controls.data_fim.value;
        row.descricao = form.controls.descricao.value;
        result = yield _this12.consolidacaoOcorrenciaDao?.save(row);
      }
      return result;
    })();
  }
  ocorrenciaDynamicButtons(row) {
    let result = [];
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }
  /***************************************************************************************
  * Afastamentos
  ****************************************************************************************/
  addAfastamento() {
    var _this13 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this13.go.navigate({
        route: ['cadastros', 'afastamento', 'new']
      }, {
        metadata: {
          consolidacao: _this13.entity
        },
        filterSnapshot: undefined,
        querySnapshot: undefined,
        modalClose: modalResult => {
          if (modalResult) _this13.refresh();
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
}
_class = PlanoTrabalhoConsolidacaoFormComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_28__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-consolidacao-form"]],
  viewQuery: function PlanoTrabalhoConsolidacaoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gridEntregas = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
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
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵInheritDefinitionFeature"]],
  decls: 36,
  vars: 40,
  consts: [[3, "title", "icon"], ["expanded", "", 3, "items", "minHeight"], ["gridEntregas", ""], ["type", "expand", 3, "icon", "align", "hint", "template", "expandTemplate"], ["columnConsolidacao", ""], ["columnExpandedConsolidacao", ""], ["title", "Origem", 3, "template", "width"], ["columnOrigem", ""], ["title", "Entrega", 3, "template"], ["columnEntrega", ""], ["title", "% For\u00E7a Trab. Planejado", 3, "template"], ["columnForcaTrabalho", ""], ["editable", "", 3, "items", "minHeight", "form", "hasDelete", "hasAdd", "hasEdit", "add", "load", "remove", "save"], ["gridOcorrencia", ""], ["title", "In\u00EDcio", "type", "datetime", "field", "data_inicio", 3, "width"], ["title", "Fim", "type", "datetime", "field", "data_fim", 3, "width"], ["title", "Descri\u00E7\u00E3o", "type", "textarea", "field", "descricao"], ["type", "options", 3, "dynamicButtons"], ["editable", "", 3, "items", "minHeight", "add", "hasEdit", "hasDelete", "hasAdd"], ["gridAfastamento", ""], ["title", "Motivo/Observa\u00E7\u00E3o", 3, "template"], ["columnMotivoObservacao", ""], ["editable", "", 3, "items", "minHeight", "form", "hasAdd", "hasDelete", "hasEdit", "add", "load", "remove", "save"], ["gridAtividade", ""], [3, "title", "template", "editTemplate"], ["columnAtividadeDescricao", ""], ["editAtividadeDescricao", ""], [3, "title", "width", "template", "editTemplate"], ["columnTempos", ""], ["editTempos", ""], [3, "title", "width", "template", "editTemplate", "columnEditTemplate", "edit", "save"], ["columnProgressoEtiquetasChecklist", ""], ["columnProgressoEtiquetasChecklistEdit", ""], ["columnNumero", ""], ["type", "options", 3, "metadata", "dynamicOptions", "dynamicButtons"], [1, "text-nowrap", "d-block"], ["icon", "bi bi-hash", "color", "light", 3, "label", "data", "click"], ["color", "light", 3, "icon", "label", 4, "ngIf"], [1, "micro-text", "fw-ligh", "atividade-descricao"], ["color", "light", 3, "icon", "label"], ["controlName", "tipo_atividade_id", 3, "label", "size", "emptyValue", "control", "dao", "labelInfo", "required", "select"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size", "rows", "control"], [1, "one-per-line"], [3, "badge", 4, "ngFor", "ngForOf"], [3, "badge"], ["icon", "bi bi-file-earmark-plus", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "label", "control"], ["icon", "bi bi-calendar-check", "controlName", "data_estipulada_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "label", "control"], ["icon", "bi bi-check-circle", "label", "Conclus\u00E3o", "controlName", "data_entrega", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "control"], ["color", "success", 3, "value"], [3, "lookup", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], [4, "ngIf"], [3, "lookup"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals", "control"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["label", "Etiqueta", "controlName", "etiqueta", "nullable", "", "itemNull", "- Selecione -", "detailsButton", "", "detailsButtonIcon", "bi bi-tools", 3, "size", "control", "items", "details"], ["etiqueta", ""], ["scale", "small", 3, "size", "source", "path"], [3, "documento"], [1, "d-block"], [3, "data", "color", "icon", "label", 4, "ngFor", "ngForOf"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid", 4, "ngIf"], [3, "data", "color", "icon", "label"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "grid"], [3, "label", "color"], [3, "icon", "label", "textValue"], ["color", "light", 3, "label"], [3, "color", "icon", "label"]],
  template: function PlanoTrabalhoConsolidacaoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "separator", 0)(1, "grid", 1, 2)(3, "columns")(4, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](5, PlanoTrabalhoConsolidacaoFormComponent_ng_template_5_Template, 0, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](7, PlanoTrabalhoConsolidacaoFormComponent_ng_template_7_Template, 22, 31, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](9, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](10, PlanoTrabalhoConsolidacaoFormComponent_ng_template_10_Template, 1, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](12, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](13, PlanoTrabalhoConsolidacaoFormComponent_ng_template_13_Template, 1, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](15, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](16, PlanoTrabalhoConsolidacaoFormComponent_ng_template_16_Template, 1, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](18, "separator", 0)(19, "grid", 12, 13)(21, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](22, "column", 14)(23, "column", 15)(24, "column", 16)(25, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](26, "separator", 0)(27, "grid", 18, 19)(29, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](30, "column", 14)(31, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](32, "column", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](33, PlanoTrabalhoConsolidacaoFormComponent_ng_template_33_Template, 2, 4, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](35, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](6);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](8);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](11);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](14);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](17);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](34);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", ctx.lex.translate("Atividades"))("icon", ctx.entityService.getIcon("Atividade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("items", ctx.itemsEntregas)("minHeight", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("hint", ctx.lex.translate("Consolida\u00E7\u00E3o"))("template", _r1)("expandTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("template", _r5)("width", 200);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("template", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", ctx.lex.translate("Ocorr\u00EAncias"))("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("items", ctx.itemsOcorrencias)("minHeight", 0)("form", ctx.formOcorrencia)("hasDelete", !ctx.disabled)("hasAdd", !ctx.disabled)("hasEdit", !ctx.disabled)("add", ctx.addOcorrencia.bind(ctx))("load", ctx.loadOcorrencia.bind(ctx))("remove", ctx.removeOcorrencia.bind(ctx))("save", ctx.saveOcorrencia.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("dynamicButtons", ctx.ocorrenciaDynamicButtons.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", ctx.lex.translate("Afastamentos"))("icon", ctx.entityService.getIcon("Afastamento"));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("items", ctx.itemsAfastamentos)("minHeight", 0)("add", ctx.addAfastamento.bind(ctx))("hasEdit", false)("hasDelete", false)("hasAdd", !ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("width", 300);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("template", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("dynamicButtons", ctx.afastamentoDynamicButtons.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_29__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_13__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_14__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_15__.ColumnComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_18__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_21__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_23__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_24__.ProgressBarComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_25__.InputNumberComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_26__.ComentariosWidgetComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_27__.DocumentosBadgeComponent],
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component */ 89775);

var _class;











function PlanoTrabalhoConsolidacaoListComponent_ng_template_4_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "plano-trabalho-consolidacao-form", 14, 15);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r4.isDisabled(row_r14))("entity", row_r14)("planoTrabalho", ctx_r4.entity)("cdRef", ctx_r4.cdRef);
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r6.util.getDateFormatted(row_r16.data_inicio), " ");
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r8.util.getDateFormatted(row_r17.data_fim));
  }
}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_15_Template(rf, ctx) {}
function PlanoTrabalhoConsolidacaoListComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "badge", 16);
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", ctx_r12.lookup.getColor(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r19.status))("icon", ctx_r12.lookup.getIcon(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r19.status))("label", ctx_r12.lookup.getValue(ctx_r12.lookup.CONSOLIDACAO_STATUS, row_r19.status));
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
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoService);
    this.title = this.lex.translate("Consolidações");
    this.code = "MOD_PTR_CSLD";
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
    super.ngAfterViewInit();
    let agora = new Date().getTime();
    this.items.forEach(v => {
      if (!v.plano_trabalho) v.plano_trabalho = this.entity;
      if (this.util.asDate(v.data_inicio).getTime() <= agora && agora <= this.util.asDate(v.data_fim).getTime()) this.grid.expand(v.id);
    });
  }
  addConsolidacao() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_plano_trabalho_consolidacao_model__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoConsolidacao({
        id: _this.dao.generateUuid(),
        plano_trabalho_id: _this.entity.id
      });
    })();
  }
  loadConsolidacao(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.form.patchValue({
        data_inicio: row.data_inicio,
        data_fim: row.data_fim
      });
      _this2.cdRef.detectChanges();
    })();
  }
  removeConsolidacao(row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this3.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        try {
          let consolidacao = row;
          yield _this3.dao?.delete(consolidacao);
          _this3.items.splice(_this3.items.findIndex(x => x.id == consolidacao.id), 1);
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
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this4.form.markAllAsTouched();
      if (_this4.form.valid) {
        row.id = row.id == "NEW" ? _this4.dao.generateUuid() : row.id;
        row.data_inicio = form.controls.data_inicio.value;
        row.data_fim = form.controls.data_fim.value;
        result = yield _this4.dao?.save(row);
      }
      return result;
    })();
  }
  concluir(consolidacao) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.submitting = true;
      try {
        let response = yield _this5.dao.concluir(consolidacao.id);
        consolidacao.status = response.status;
        if (consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent) {
          let consolidacaoForm = consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent;
          consolidacaoForm.loadConsolidacao(response);
        } else {
          _this5.grid.refreshExpanded(consolidacao.id);
        }
      } catch (error) {
        _this5.error(error.message || error);
      } finally {
        _this5.submitting = false;
      }
    })();
  }
  cancelarConclusao(consolidacao) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.submitting = true;
      try {
        let response = yield _this6.dao.cancelarConclusao(consolidacao.id);
        consolidacao.status = response.status;
        if (consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent) {
          let consolidacaoForm = consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent;
          consolidacaoForm.loadConsolidacao(response);
        } else {
          _this6.grid.refreshExpanded(consolidacao.id);
        }
      } catch (error) {
        _this6.error(error.message || error);
      } finally {
        _this6.submitting = false;
      }
    })();
  }
  isDisabled(row) {
    return row && row.status != "INCLUIDO" || this.entity?.status != "ATIVO";
  }
  avaliar(consolidacao) {
    //
  }
  editarAvaliacao(consolidacao) {
    //
  }
  fazerRecurso(consolidacao) {
    //
  }
  cancelarAvaliacao(consolidacao) {
    //
  }
  dynamicButtons(row) {
    let result = [];
    let consolidacao = row;
    const isUsuarioConsolidacao = this.auth.usuario.id == this.entity.usuario_id;
    const isGestor = [this.entity.unidade.gestor?.usuario_id, this.entity.unidade.gestor_substituto?.usuario_id].includes(this.auth.usuario?.id);
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
      onClick: this.avaliar.bind(this)
    };
    const BOTAO_EDITAR_AVALIACAO = {
      hint: "Editar avaliação",
      icon: "bi bi-star-half",
      color: "btn-outline-warning",
      onClick: this.editarAvaliacao.bind(this)
    };
    const BOTAO_FAZER_RECURSO = {
      hint: "Fazer recurso",
      id: "RECORRIDO",
      icon: "bi bi-journal-medical",
      color: "btn-outline-warning",
      onClick: this.fazerRecurso.bind(this)
    };
    const BOTAO_CANCELAR_AVALIACAO = {
      hint: "Cancelar avaliação",
      id: "INCLUIDO",
      icon: "bi bi-backspace",
      color: "btn-outline-warning",
      onClick: this.cancelarAvaliacao.bind(this)
    };
    if (!this.isDisabled()) {
      if (consolidacao.status == "INCLUIDO" && (isUsuarioConsolidacao || this.auth.hasPermissionTo("MOD_PTR_CSLD_CONCL"))) {
        result.push(BOTAO_CONCLUIR);
      }
      if (consolidacao.status == "CONCLUIDO" && this.planoTrabalhoService.diasParaConcluirConsolidacao(row, this.entity.programa) >= 0 && (isUsuarioConsolidacao || this.auth.hasPermissionTo("MOD_PTR_CSLD_DES_CONCL"))) {
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
      if (consolidacao.status == "CONCLUIDO" && (isGestor || this.auth.hasPermissionTo("MOD_PTR_CSLD_AVALIAR"))) {
        result.push(BOTAO_AVALIAR);
      }
      if (consolidacao.status == "AVALIADO") {
        /* TODO: Fazer as condições para avaliado */
      }
    }
    return result;
  }
}
_class = PlanoTrabalhoConsolidacaoListComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-consolidacao-list"]],
  viewQuery: function PlanoTrabalhoConsolidacaoListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 21,
  vars: 18,
  consts: [["editable", "", 3, "items", "form", "hasDelete", "minHeight", "add", "hasAdd", "hasEdit"], ["grid", ""], ["type", "expand", 3, "icon", "align", "hint", "template", "expandTemplate"], ["columnConsolidacao", ""], ["columnExpandedConsolidacao", ""], ["title", "Data in\u00EDcio", 3, "template"], ["columnDataInicio", ""], ["title", "Data fim", 3, "template"], ["columnDataFim", ""], ["title", "Estat\u00EDsticas", 3, "template"], ["columnEstatisticas", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "dynamicButtons"], [3, "disabled", "entity", "planoTrabalho", "cdRef"], ["consolidacao", ""], [3, "color", "icon", "label"]],
  template: function PlanoTrabalhoConsolidacaoListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0, 1)(2, "columns")(3, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoListComponent_ng_template_4_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, PlanoTrabalhoConsolidacaoListComponent_ng_template_6_Template, 2, 4, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, PlanoTrabalhoConsolidacaoListComponent_ng_template_9_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](12, PlanoTrabalhoConsolidacaoListComponent_ng_template_12_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](15, PlanoTrabalhoConsolidacaoListComponent_ng_template_15_Template, 0, 0, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, PlanoTrabalhoConsolidacaoListComponent_ng_template_18_Template, 1, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](20, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](5);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](7);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](10);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](13);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](16);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("minHeight", 0)("add", ctx.addConsolidacao.bind(ctx))("hasAdd", !ctx.isDisabled())("hasEdit", false)("hasDelete", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("icon", ctx.entityService.getIcon("PlanoTrabalhoConsolidacao"))("align", "center")("hint", ctx.lex.translate("Consolida\u00E7\u00E3o"))("template", _r1)("expandTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
    }
  },
  dependencies: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_8__.BadgeComponent, _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_9__.PlanoTrabalhoConsolidacaoFormComponent],
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
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_collapse_card_collapse_card_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/collapse-card/collapse-card.component */ 45847);
/* harmony import */ var _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component */ 52483);

var _class;











function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 9)(1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "profile-picture", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 18)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const data_r13 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("url", data_r13.url_foto)("size", 40)("hint", data_r13.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](data_r13.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](data_r13.apelido || "");
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "plano-trabalho-list-accordeon", 19);
  }
  if (rf & 2) {
    const data_r14 = ctx.data;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("usuarioId", data_r14.id);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "collapse-card", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_ng_template_1_Template, 9, 5, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_ng_template_3_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const usuario_r8 = ctx.$implicit;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", usuario_r8)("titleTemplate", _r9)("template", _r11);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_div_2_Template, 3, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_collapse_card_3_Template, 5, 3, "collapse-card", 8);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", ctx_r5.unidade.sigla, " - ", ctx_r5.unidade.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r5.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r5.usuarios);
  }
}
function PlanoTrabalhoConsolidacaoComponent_tab_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PlanoTrabalhoConsolidacaoComponent_tab_2_ng_template_1_Template, 4, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("icon", ctx_r1.entityService.getIcon("Unidade"))("label", ctx_r1.lex.translate("Unidade"))("template", _r4);
  }
}
function PlanoTrabalhoConsolidacaoComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "separator", 20)(1, "plano-trabalho-list-accordeon", 21);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("control", ctx_r3.form.controls.arquivados)("title", "Mostrar " + ctx_r3.lex.translate("Planos de trabalho") + " arquivados?");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("usuarioId", ctx_r3.auth.usuario.id)("arquivados", ctx_r3.form.controls.arquivados.value);
  }
}
class PlanoTrabalhoConsolidacaoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.usuarios = [];
    this.loadingUnidade = false;
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      arquivados: {
        default: false
      }
    });
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    this.tabs.active = this.queryParams?.tab || "USUARIO";
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData(_this.entity, _this.form);
    })();
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.unidade = _this2.auth.unidadeGestor();
      if (_this2.unidade) {
        _this2.usuarios = [];
        _this2.loadingUnidade = true;
        _this2.cdRef.detectChanges();
        try {
          _this2.usuarios = yield _this2.unidadeDao.lotados(_this2.unidade.id);
        } finally {
          _this2.loadingUnidade = false;
          _this2.cdRef.detectChanges();
        }
      }
    })();
  }
}
_class = PlanoTrabalhoConsolidacaoComponent;
_class.ɵfac = function PlanoTrabalhoConsolidacaoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-trabalho-consolidacao"]],
  viewQuery: function PlanoTrabalhoConsolidacaoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 6,
  vars: 5,
  consts: [["right", "", 3, "title"], ["tabs", ""], ["key", "UNIDADE", 3, "icon", "label", "template", 4, "ngIf"], ["key", "USUARIO", 3, "icon", "label", "template"], ["tabUsuario", ""], ["key", "UNIDADE", 3, "icon", "label", "template"], ["tabUnidade", ""], ["class", "d-flex justify-content-center my-2", 4, "ngIf"], [3, "data", "titleTemplate", "template", 4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-center", "my-2"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [3, "data", "titleTemplate", "template"], ["usuarioCardTitle", ""], ["usuarioCard", ""], [1, "row"], [1, "col-2"], [3, "url", "size", "hint"], [1, "col-10"], [3, "usuarioId"], [3, "control", "title"], [3, "usuarioId", "arquivados"]],
  template: function PlanoTrabalhoConsolidacaoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tabs", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, PlanoTrabalhoConsolidacaoComponent_tab_2_Template, 3, 3, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, PlanoTrabalhoConsolidacaoComponent_ng_template_4_Template, 2, 4, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.unidade);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("icon", ctx.entityService.getIcon("Usuario"))("label", ctx.lex.translate("Usu\u00E1rio"))("template", _r2);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_4__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_5__.SeparatorComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_6__.ProfilePictureComponent, _components_collapse_card_collapse_card_component__WEBPACK_IMPORTED_MODULE_7__.CollapseCardComponent, _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalhoListAccordeonComponent],
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
  vars: 40,
  consts: [["initialFocus", "programa_id", 3, "form", "disabled", "title", "submit", "cancel"], ["collapse", "", 3, "title", "collapsed"], [1, "row"], ["disabled", "", "controlName", "programa_id", 3, "size", "dao"], ["programa", ""], ["disabled", "", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["disabled", "", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["disabled", "", "controlName", "tipo_modalidade_id", 3, "size", "dao"], ["tipoModalidade", ""], ["numbers", "", "disabled", "", "label", "% prod.", "icon", "bi bi-hourglass-split", "controlName", "ganho_produtividade", 3, "size", "control", "labelInfo"], ["label", "H. Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["disabled", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "In\u00EDcio da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "Final da Vig\u00EAncia do Programa", 3, "size", "control"], ["disabled", "", "label", "C. Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio", 3, "size", "unit", "control"], ["label", "H. Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["disabled", "", "label", "Data e hora", "controlName", "data_inicio", "labelInfo", "Data de cadastro do termo", 3, "size", "control"], ["controlName", "numero_processo", "disabled", "", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "label", "size", "control"], ["controlName", "tipo_documento_id", "required", "", 3, "size", "disabled", "dao"], ["tipoDocumento", ""], ["label", "Vinculadas", "controlName", "vinculadas", "labelInfo", "Se inclui as atividades das unidades vinculadas a unidade do plano", 3, "disabled", "size", "control", "change"]],
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
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("unit", ctx.formaContagemCargaHoraria)("control", ctx.form.controls.carga_horaria);
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ 43417);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ 60785);
/* harmony import */ var _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../uteis/documentos/documentos.component */ 6601);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);

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
function PlanoTrabalhoFormComponent_ng_container_16_separator_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "separator", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "calendar-efemerides", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("efemerides", ctx_r10.horasTotais)("partial", false);
  }
}
function PlanoTrabalhoFormComponent_ng_container_16_separator_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "separator", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "calendar-efemerides", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("efemerides", ctx_r11.horasParciais);
  }
}
function PlanoTrabalhoFormComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](1, "div", 4)(2, "input-workload", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_ng_container_16_Template_input_workload_change_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵresetView"](ctx_r12.onCargaHorariaChenge($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](3, "input-timer", 21)(4, "input-timer", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](5, PlanoTrabalhoFormComponent_ng_container_16_separator_5_Template, 2, 2, "separator", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](6, PlanoTrabalhoFormComponent_ng_container_16_separator_6_Template, 2, 1, "separator", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("unit", ctx_r5.formaContagemCargaHoraria)("control", ctx_r5.form.controls.carga_horaria)("unitChange", ctx_r5.onFormaContagemCargaHorariaChange.bind(ctx_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.tempo_total);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.tempo_proporcional);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", ctx_r5.horasTotais);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", ctx_r5.horasParciais);
  }
}
function PlanoTrabalhoFormComponent_top_alert_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](0, "top-alert", 29);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("message", "Antes de incluir " + ctx_r6.lex.translate("entrega") + " neste " + ctx_r6.lex.translate("Plano de Trabalho") + ", \u00E9 necess\u00E1rio selecionar " + ctx_r6.lex.translate("a Unidade") + " e " + ctx_r6.lex.translate("o Programa") + "!");
  }
}
function PlanoTrabalhoFormComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "plano-trabalho-list-entrega", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("entity", ctx_r7.entity);
  }
}
function PlanoTrabalhoFormComponent_tab_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "tab", 31)(1, "separator", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](2, "input-switch", 32)(3, "input-editor", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](4, "separator", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](5, "input-switch", 35)(6, "input-editor", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", "Texto complementar da " + ctx_r8.lex.translate("unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar na " + ctx_r8.lex.translate("unidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx_r8.form.controls.editar_texto_complementar_unidade.value ? undefined : "true")("dataset", ctx_r8.planoDataset);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 12)("label", "Editar texto complementar do " + ctx_r8.lex.translate("usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx_r8.form.controls.editar_texto_complementar_usuario.value ? undefined : "true")("dataset", ctx_r8.planoDataset);
  }
}
function PlanoTrabalhoFormComponent_tab_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "tab", 37)(1, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](2, "documentos", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("entity", ctx_r9.entity)("cdRef", ctx_r9.cdRef)("needSign", ctx_r9.planoTrabalhoService.needSign)("extraTags", ctx_r9.planoTrabalhoService.extraTags)("editingId", ctx_r9.editingId)("datasource", ctx_r9.datasource)("template", _r2 == null ? null : _r2.selectedEntity == null ? null : _r2.selectedEntity.template_tcr);
  }
}
const _c11 = function () {
  return ["afastamentos"];
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
    this.validate = (control, controlName) => {
      let result = null;
      if (['unidade_id', 'programa_id', 'usuario_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      } else if (['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Inválido";
      } else if (this.programa && controlName == 'data_inicio' && control.value.getTime() < this.programa.selectedEntity?.data_inicio.getTime()) {
        result = "Menor que programa";
      } else if (this.programa && controlName == 'data_fim' && control.value.getTime() > this.programa.selectedEntity?.data_fim.getTime()) {
        result = "Maior que programa";
      }
      return result;
    };
    this.formValidation = form => {
      /*
      (RN_PTR_V) INCLUIR/INSERIR
      O usuário logado precisa possuir a capacidade "MOD_PTR_INCL", e:
          - o usuário logado precisa ser um participante do PGD, habilitado, ou ser gestor da Unidade Executora do plano; (RN_PTR_B); e
          - o participante do plano precisa estar lotado em uma das áreas de trabalho do usuário logado, ou este deve possuir a capacidade MOD_PTR_USERS_INCL; e
          - o participante do plano precisa estar lotado na Unidade Executora, ou o usuário logado possuir a capacidade MOD_PTR_INCL_SEM_LOT; e
          - o novo Plano de Trabalho não pode apresentar período conflitante com outro plano já existente para a mesma Unidade Executora e mesmo participante, ou o usuário logado possuir a capacidade MOD_PTR_INTSC_DATA
      */
      let result = null;
      let usuarioPossuiCapacidade = this.auth.hasPermissionTo("MOD_PTR_INCL");
      let usuarioEhParticipantePgdHabilitado = this.auth.usuario.participacoes_programas.map(pp => pp.programa_id).includes(this.entity.programa_id);
      let usuarioEhGestorUnidadeExecutora = this.auth.usuario?.id == this.entity.unidade?.gestor?.usuario?.id; //************************** */
      return result;
      // TODO:
      // Validar se as entregas pertencem ao plano de entregas da unidade
      // Validar se o usuários está habilitado no programa
    };

    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Plano de Trabalho") + ': ' + (entity?.usuario?.apelido || "");
    };
    this.join = ["unidade.entidade", "entregas.entrega", "entregas.plano_entrega_entrega:id,plano_entrega_id", "usuario", "programa.template_tcr", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "entregas.plano_entrega_entrega.entrega"];
    this.joinPrograma = ["template_tcr"];
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProgramaDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_13__.UnidadeDaoService);
    this.documentoService = injector.get(src_app_modules_uteis_documentos_documento_service__WEBPACK_IMPORTED_MODULE_10__.DocumentoService);
    this.templateService = injector.get(src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_14__.TemplateService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_11__.CalendarService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_7__.ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get(src_app_dao_tipo_modalidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoModalidadeDaoService);
    this.documentoDao = injector.get(src_app_dao_documento_dao_service__WEBPACK_IMPORTED_MODULE_2__.DocumentoDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_12__.PlanoTrabalhoService);
    this.modalWidth = 1200;
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
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
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
  }
  onProgramaSelect(selected) {
    let programa = selected.entity;
    this.entity.programa_id = programa.id;
    this.entity.programa = programa;
    this.form?.controls.data_inicio.updateValueAndValidity();
    this.form?.controls.data_fim.updateValueAndValidity();
    this.calculaTempos();
    this.cdRef.detectChanges();
  }
  onUsuarioSelect(selected) {
    this.form.controls.usuario_texto_complementar.setValue(selected.entity?.texto_complementar_plano || "");
    this.calculaTempos();
    this.cdRef.detectChanges();
  }
  onDataInicioChange(event) {
    const di = new Date(this.form.controls.data_inicio.value).getTime();
    const df = new Date(this.form.controls.data_fim.value).getTime();
    if (df < di) {
      let diaI = new Date(di);
      diaI.setDate(diaI.getDate() + 1);
      this.form.controls.data_fim.setValue(diaI);
    }
    this.calculaTempos();
  }
  onDataFimChange(event) {
    const di = new Date(this.form.controls.data_inicio.value).getTime();
    const df = new Date(this.form.controls.data_fim.value).getTime();
    if (df < di) {
      let diaI = new Date(di);
      diaI.setDate(diaI.getDate() + 1);
      this.form.controls.data_fim.setValue(diaI);
    }
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
    if (usuario && unidade && this.util.isDataValid(inicio) && this.util.isDataValid(fim)) {
      this.calendar.loadFeriadosCadastrados(unidade.id).then(feriados => {
        this.horasTotais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], []);
        this.horasParciais = this.calendar.calculaDataTempoUnidade(inicio, fim, carga, unidade, "ENTREGA", [], usuario.afastamentos);
        this.form?.controls.tempo_total.setValue(this.horasTotais.tempoUtil);
        this.form?.controls.tempo_proporcional.setValue(this.horasParciais.tempoUtil);
      });
    }
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.planoTrabalho = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho(entity);
      yield Promise.all([_this.calendar.loadFeriadosCadastrados(entity.unidade_id), _this.usuario?.loadSearch(entity.usuario || entity.usuario_id), _this.unidade?.loadSearch(entity.unidade || entity.unidade_id), _this.programa?.loadSearch(entity.programa || entity.programa_id), _this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)]);
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
      /*let documento = entity.documentos.find(x => x.id == entity.documento_id);
      if(documento) this._datasource = documento.datasource;*/
      _this.calculaTempos();
      _this.atualizarTcr();
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.isTermos) {
        _this2.entity = yield _this2.dao.getById(_this2.urlParams.get("id"), _this2.join);
      } else {
        _this2.entity = new src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalho();
        _this2.entity.carga_horaria = _this2.auth.entidade?.carga_horaria_padrao || 8;
        _this2.entity.forma_contagem_carga_horaria = _this2.auth.entidade?.forma_contagem_carga_horaria || "DIA";
      }
      yield _this2.loadData(_this2.entity, _this2.form);
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
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //let plano = this.loadEntity();
      /* Atualiza o documento */
      _this3.atualizarTcr();
      /* Confirma dados do documento */
      _this3.documentos?.saveData();
      _this3.entity.documentos = _this3.entity.documentos.filter(documento => {
        return ["ADD", "EDIT", "DELETE"].includes(documento._status || "");
      });
      /* Salva separadamente as informações do plano */
      _this3.submitting = true;
      try {
        let requests = [_this3.dao.save(_this3.entity, _this3.join)];
        if (_this3.form.controls.editar_texto_complementar_unidade.value) requests.push(_this3.unidadeDao.update(_this3.entity.unidade_id, {
          texto_complementar_plano: _this3.form.controls.unidade_texto_complementar.value
        }));
        if (_this3.form.controls.editar_texto_complementar_usuario.value) requests.push(_this3.usuarioDao.update(_this3.entity.usuario_id, {
          texto_complementar_plano: _this3.form.controls.usuario_texto_complementar.value
        }));
        let responses = yield Promise.all(requests);
        _this3.entity = responses[0];
      } finally {
        _this3.submitting = false;
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
  signDocumento(documento) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.documentoService.sign([documento]);
      _this4.cdRef.detectChanges();
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
}
_class = PlanoTrabalhoFormComponent;
_class.ɵfac = function PlanoTrabalhoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_28__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-form"]],
  viewQuery: function PlanoTrabalhoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c7, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c9, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c10, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gridAtividades = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gridDocumentos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.tipoModalidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.atividade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.documentos = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵInheritDefinitionFeature"]],
  decls: 22,
  vars: 31,
  consts: [["initialFocus", "plano_entrega_id", 3, "form", "disabled", "noButtons", "submit", "cancel"], ["display", "", "right", "", 3, "hidden", "title", "select"], ["tabs", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["required", "", "controlName", "unidade_id", 3, "size", "disabled", "dao", "select"], ["unidade", ""], ["required", "", "controlName", "programa_id", 3, "size", "disabled", "join", "dao", "select"], ["programa", ""], ["required", "", "controlName", "usuario_id", 3, "size", "dao", "join", "select"], ["usuario", ""], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "'In\u00EDcio da Vig\u00EAncia do '+ lex.translate('Plano de trabalho')", "required", "", 3, "size", "control", "change"], ["label", "Final", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "'Final da Vig\u00EAncia do ' +lex.translate('Plano de trabalho')", "required", "", 3, "size", "control", "change"], ["controlName", "tipo_modalidade_id", "required", "", 3, "size", "dao"], ["tipoModalidade", ""], [4, "ngIf"], [3, "title"], ["type", "warning", 3, "message", 4, "ngIf"], ["key", "MENSAGENS", "label", "Texto Complementar", 4, "ngIf"], ["key", "TERMO", "label", "Termo", 4, "ngIf"], ["label", "Carga Hor\u00E1ria", "icon", "bi bi-hourglass-split", "controlName", "carga_horaria", "labelInfo", "Carga hor\u00E1ria do usu\u00E1rio (M\u00E1x.: di\u00E1ria 24 horas; semana 24*5=240 horas; mensal 24*20=480 horas)", "required", "", 3, "size", "unit", "control", "unitChange", "change"], ["onlyHours", "", "disabled", "", "label", "Horas Totais", "icon", "bi bi-clock", "controlName", "tempo_total", "labelInfo", "Horas \u00FAteis de trabalho no per\u00EDodo de vig\u00EAncia considerando a carga hor\u00E1ria, feriados e fins de semana", 3, "size", "control"], ["onlyHours", "", "disabled", "", "label", "Horas Parciais", "icon", "bi bi-clock", "controlName", "tempo_proporcional", "labelInfo", "Total de horas menos os afastamentos.", 3, "size", "control"], ["title", "C\u00E1lculos das horas totais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas parciais", "collapse", "", 4, "ngIf"], ["title", "C\u00E1lculos das horas totais", "collapse", ""], [3, "efemerides", "partial"], ["title", "C\u00E1lculos das horas parciais", "collapse", ""], [3, "efemerides"], ["type", "warning", 3, "message"], ["noPersist", "", 3, "entity"], ["key", "MENSAGENS", "label", "Texto Complementar"], ["controlName", "editar_texto_complementar_unidade", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "unidade_texto_complementar", 3, "disabled", "dataset"], ["title", "Texto complementar do usuario"], ["controlName", "editar_texto_complementar_usuario", "scale", "small", "labelPosition", "right", 3, "size", "label"], ["controlName", "usuario_texto_complementar", 3, "disabled", "dataset"], ["key", "TERMO", "label", "Termo"], ["clss", "row"], ["noPersist", "", "especie", "TCR", 3, "entity", "cdRef", "needSign", "extraTags", "editingId", "datasource", "template"], ["documentos", ""]],
  template: function PlanoTrabalhoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("submit", function PlanoTrabalhoFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoTrabalhoFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](1, "tabs", 1, 2)(3, "tab", 3)(4, "div", 4)(5, "input-search", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_5_listener($event) {
        return ctx.onUnidadeSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](7, "input-search", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_7_listener($event) {
        return ctx.onProgramaSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](9, "input-search", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("select", function PlanoTrabalhoFormComponent_Template_input_search_select_9_listener($event) {
        return ctx.onUsuarioSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](11, "div", 4)(12, "input-datetime", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_12_listener($event) {
        return ctx.onDataInicioChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](13, "input-datetime", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("change", function PlanoTrabalhoFormComponent_Template_input_datetime_change_13_listener($event) {
        return ctx.onDataFimChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](14, "input-search", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](16, PlanoTrabalhoFormComponent_ng_container_16_Template, 7, 10, "ng-container", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](17, "separator", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](18, PlanoTrabalhoFormComponent_top_alert_18_Template, 1, 1, "top-alert", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](19, PlanoTrabalhoFormComponent_div_19_Template, 2, 1, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](20, PlanoTrabalhoFormComponent_tab_20_Template, 7, 9, "tab", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](21, PlanoTrabalhoFormComponent_tab_21_Template, 4, 7, "tab", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵreference"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("noButtons", ctx.isTermos ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("hidden", ctx.isTermos ? "true" : undefined)("title", !ctx.isModal ? ctx.title : "")("select", ctx.onTabSelect.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("disabled", ctx.action == "new" ? undefined : "true")("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("disabled", ctx.action == "new" ? undefined : "true")("join", ctx.joinPrograma)("dao", ctx.programaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpureFunction0"](28, _c11));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 6)("dao", ctx.tipoModalidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", _r4.selectedEntity == null ? null : _r4.selectedEntity.plano_trabalho_calcula_horas);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", ctx.lex.translate("Entregas") + ctx.lex.translate(" do plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", !(ctx.form.controls.programa_id.value == null ? null : ctx.form.controls.programa_id.value.length) || !(ctx.form.controls.unidade_id.value == null ? null : ctx.form.controls.unidade_id.value.length));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", (ctx.form.controls.programa_id.value == null ? null : ctx.form.controls.programa_id.value.length) && (ctx.form.controls.unidade_id.value == null ? null : ctx.form.controls.unidade_id.value.length));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpureFunction0"](29, _c12)));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", ctx.checkFilled(_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpureFunction0"](30, _c13)));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_17__.InputDatetimeComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_18__.InputTimerComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_19__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_20__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_21__.SeparatorComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_22__.TopAlertComponent, _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_23__.InputWorkloadComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_24__.InputEditorComponent, _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_25__.CalendarEfemeridesComponent, _uteis_documentos_documentos_component__WEBPACK_IMPORTED_MODULE_26__.DocumentosComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_27__.PlanoTrabalhoListEntregaComponent],
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
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_accordion_accordion_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/accordion/accordion.component */ 90058);
/* harmony import */ var _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component */ 72132);

var _class;






const _c0 = ["accordion"];
function PlanoTrabalhoListAccordeonComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "badge", 7)(5, "badge", 7)(6, "badge", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "badge", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r5 = ctx.item;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]("#" + item_r5.numero);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("Unidade"))("label", item_r5.unidade == null ? null : item_r5.unidade.sigla)("hint", ctx_r2.lex.translate("Unidade") + ": " + (item_r5.unidade == null ? null : item_r5.unidade.nome));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("Programa"))("label", item_r5.programa == null ? null : item_r5.programa.nome)("hint", ctx_r2.lex.translate("Programa"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("icon", ctx_r2.entityService.getIcon("TipoModalidade"))("label", item_r5.tipo_modalidade == null ? null : item_r5.tipo_modalidade.nome)("hint", ctx_r2.lex.translate("Tipo de modalidade"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r2.dao.getDateFormatted(item_r5.data_inicio) + " at\u00E9 " + ctx_r2.dao.getDateFormatted(item_r5.data_fim), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", ctx_r2.lookup.getValue(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status))("icon", ctx_r2.lookup.getIcon(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status))("color", ctx_r2.lookup.getColor(ctx_r2.lookup.PLANO_TRABALHO_STATUS, item_r5.status));
  }
}
function PlanoTrabalhoListAccordeonComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "plano-trabalho-consolidacao-list", 11);
  }
  if (rf & 2) {
    const item_r6 = ctx.item;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("entity", item_r6);
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
        _this2.planos = dados.planos;
        for (var i = 0; i < _this2.planos.length; i++) {
          if (_this2.util.asDate(_this2.planos[i].data_inicio).getTime() <= agora && agora <= _this2.util.asDate(_this2.planos[i].data_fim).getTime() && ["ATIVO", "CONCLUIDO"].includes(_this2.planos[i].status)) {
            _this2.selectedIndex = i;
          }
        }
      } finally {
        _this2.accordion.loading = false;
        _this2.cdRef.detectChanges();
      }
    })();
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
  decls: 6,
  vars: 4,
  consts: [[3, "items", "selectedIndex", "titleTemplate", "template"], ["accordion", ""], ["planoTrabalhoSectionTitle", ""], ["planoTrabalhoSection", ""], [1, "row", "w-100"], [1, "col-md-1"], [1, "col-md-5"], ["color", "light", 3, "icon", "label", "hint"], [1, "col-md-4"], [1, "col-md-2"], [3, "label", "icon", "color"], [3, "entity"]],
  template: function PlanoTrabalhoListAccordeonComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "accordion", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PlanoTrabalhoListAccordeonComponent_ng_template_2_Template, 11, 14, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PlanoTrabalhoListAccordeonComponent_ng_template_4_Template, 1, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("items", ctx.planos)("selectedIndex", ctx.selectedIndex)("titleTemplate", _r1)("template", _r3);
    }
  },
  dependencies: [_components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__.BadgeComponent, _components_accordion_accordion_component__WEBPACK_IMPORTED_MODULE_4__.AccordionComponent, _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoConsolidacaoListComponent],
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_plano_trabalho_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-trabalho.model */ 20762);
/* harmony import */ var src_app_models_plano_trabalho_entrega_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/plano-trabalho-entrega.model */ 75754);
/* harmony import */ var src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-trabalho-entrega-dao.service */ 59173);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var _plano_trabalho_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../plano-trabalho.service */ 80684);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;





















const _c0 = ["origem"];
const _c1 = ["planoEntrega"];
const _c2 = ["entrega"];
function PlanoTrabalhoListEntregaComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 20)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, "Origem");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_8_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "badge", 26);
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().row;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", (row_r26.plano_entrega_entrega == null ? null : row_r26.plano_entrega_entrega.plano_entrega == null ? null : row_r26.plano_entrega_entrega.plano_entrega.unidade == null ? null : row_r26.plano_entrega_entrega.plano_entrega.unidade.sigla) || "Desconhecido")("icon", ctx_r27.entityService.getIcon("Unidade"));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_8_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "badge", 27);
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", row_r26.orgao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 21)(1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](3, PlanoTrabalhoListEntregaComponent_ng_template_8_badge_3_Template, 1, 2, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](4, PlanoTrabalhoListEntregaComponent_ng_template_8_badge_4_Template, 1, 1, "badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r26 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", ctx_r4.planoTrabalhoService.tipoEntrega(row_r26, ctx_r4.entity).titulo)("color", ctx_r4.planoTrabalhoService.tipoEntrega(row_r26, ctx_r4.entity).cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", row_r26.plano_entrega_entrega_id == null ? null : row_r26.plano_entrega_entrega_id.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", row_r26.orgao == null ? null : row_r26.orgao.length);
  }
}
const _c3 = function () {
  return ["entregas.entrega:id,nome", "unidade"];
};
const _c4 = function (a2) {
  return ["unidade_id", "==", a2];
};
const _c5 = function (a0) {
  return [a0];
};
const _c6 = function (a0) {
  return {
    unidade_id: a0
  };
};
const _c7 = function (a0) {
  return {
    filter: a0
  };
};
function PlanoTrabalhoListEntregaComponent_ng_template_10_input_search_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "input-search", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_10_input_search_2_Template_input_search_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r36.onPlanoEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](1);
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("placeholder", "Selecione o " + ctx_r33.lex.translate("Plano de entrega"))("join", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](5, _c3))("where", (_r32 == null ? null : _r32.value) == "PROPRIA_UNIDADE" ? _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction1"](8, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction1"](6, _c4, ctx_r33.entity == null ? null : ctx_r33.entity.unidade_id)) : undefined)("selectParams", (_r32 == null ? null : _r32.value) == "PROPRIA_UNIDADE" ? _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction1"](12, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction1"](10, _c6, ctx_r33.entity == null ? null : ctx_r33.entity.unidade_id)) : undefined)("dao", ctx_r33.planoEntregaDao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_10_input_text_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "input-text", 34, 35);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
  }
}
const _c8 = function () {
  return ["PROPRIA_UNIDADE", "OUTRA_UNIDADE"];
};
function PlanoTrabalhoListEntregaComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "input-select", 28, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_10_Template_input_select_change_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r40);
      const row_r31 = restoredCtx.row;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r39.onOrigemChange(row_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_10_input_search_2_Template, 2, 14, "input-search", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](3, PlanoTrabalhoListEntregaComponent_ng_template_10_input_text_3_Template, 2, 1, "input-text", 31);
  }
  if (rf & 2) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](1);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx_r6.form.controls.origem)("items", ctx_r6.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](4, _c8).includes(_r32 == null ? null : _r32.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", (_r32 == null ? null : _r32.value) == "OUTRO_ORGAO");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "Entrega");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_15_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "badge", 38)(2, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().row;
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", ctx_r43.util.getDateFormatted(row_r42.plano_entrega_entrega == null ? null : row_r42.plano_entrega_entrega.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", ctx_r43.util.getDateFormatted(row_r42.plano_entrega_entrega == null ? null : row_r42.plano_entrega_entrega.data_fim));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](2, PlanoTrabalhoListEntregaComponent_ng_template_15_div_2_Template, 3, 2, "div", 36);
  }
  if (rf & 2) {
    const row_r42 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r10.planoTrabalhoService.tipoEntrega(row_r42, ctx_r10.entity).nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](2, _c8).includes(ctx_r10.planoTrabalhoService.tipoEntrega(row_r42, ctx_r10.entity).tipo));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "input-select", 41, 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template_input_select_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r50);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r49.onEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx_r46.form.controls.plano_entrega_entrega_id)("items", ctx_r46.entregas);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_17_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "badge", 38)(2, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", ctx_r47.util.getDateFormatted(ctx_r47.entrega.selectedItem.data.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("label", ctx_r47.util.getDateFormatted(ctx_r47.entrega.selectedItem.data.data_fim));
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](0, PlanoTrabalhoListEntregaComponent_ng_template_17_input_select_0_Template, 2, 2, "input-select", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](1, PlanoTrabalhoListEntregaComponent_ng_template_17_div_1_Template, 3, 2, "div", 36);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](2, _c8).includes(ctx_r12.origem == null ? null : ctx_r12.origem.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r12.entrega == null ? null : ctx_r12.entrega.selectedItem);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 20)(1, "small")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, "% For\u00E7a Trab.");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](6, "badge", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", ctx_r14.totalForcaTrabalho == 100 ? "success" : "warning")("label", ctx_r14.totalForcaTrabalho + "%");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](row_r52.forca_trabalho + "%");
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "input-text", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function PlanoTrabalhoListEntregaComponent_ng_template_24_Template_input_text_change_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r55);
      const row_r53 = restoredCtx.row;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r54.onForcaTrabalhoChange(row_r53));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx_r18.form.controls.forca_trabalho);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 20)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, "Detalhamento/Descri\u00E7\u00E3o dos Trabalhos");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](row_r57.descricao);
  }
}
function PlanoTrabalhoListEntregaComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "input-text", 45);
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx_r24.form.controls.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
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
  constructor(injector) {
    super(injector);
    this.injector = injector;
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
      if (['descricao', 'forca_trabalho'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório!";
      if (['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1 || control.value > 100)) result = "Deve estar entre 1 e 100";
      if (['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
        if (['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value) result = "Obrigatório!";
        if (!!this.entity?.entregas?.filter(e => !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).find(x => x.plano_entrega_entrega_id == control.value)) result = "Esta entrega está em duplicidade!"; /* (*2) */
      }

      return result;
    };
    this.dao = injector.get(src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoEntregaDaoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_17__.ChangeDetectorRef);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoDaoService);
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__.PlanoEntregaDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalhoService);
    this.peeDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_9__.PlanoEntregaEntregaDaoService);
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
      form.controls.plano_entrega_entrega_id.setValue(null);
      form.controls.orgao.setValue(null);
      if (entrega._status == "ADD") {
        // É uma nova entrega
        form.controls.origem.setValue('PROPRIA_UNIDADE');
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
        if (!_this5.isNoPersist) {
          _this5.entity._metadata.novaEntrega = yield _this5.dao.save(_this5.entity._metadata.novaEntrega, _this5.join);
          // TODO: Verificar isso (Foi feito uma modificação no grid para isso não ser mais necessário)
          // if (this.grid?.adding) this.grid!.items[this.grid!.items.length - 1].id = '';  // (*4)
        }
      } catch (e) {
        _this5.error(e.message ? e.message : e.toString() || e);
      } finally {
        _this5.entity._metadata.novaEntrega.plano_entrega_entrega = _this5.entrega?.selectedItem?.data || null;
        row.forca_trabalho = _this5.form?.controls.forca_trabalho.value * 1;
        _this5.totalForcaTrabalho = Math.round(_this5.somaForcaTrabalho(_this5.entity?.entregas) * 100) / 100;
        _this5.loading = false;
      }
      return _this5.entity._metadata.novaEntrega;
    })();
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
        value: epe.entrega?.nome || epe.descricao,
        data: Object.assign(epe, {
          plano_entrega: planoEntregaComUnidade
        })
      })) || [];
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
      }
      if (value == 'PROPRIA_UNIDADE') {
        _this7.form?.controls.orgao.setValue(null);
        _this7.loading = true;
        try {
          let planosEntregas = yield _this7.planoEntregaDao.query({
            where: [["unidade_id", "==", _this7.entity.unidade_id], ["status", "==", "ATIVO"], ["data_inicio", "<=", _this7.entity.data_fim], ["data_fim", ">=", _this7.entity.data_inicio]]
          }).asPromise();
          if (planosEntregas.length == 1) {
            _this7.form?.controls.plano_entrega_id.setValue(planosEntregas[0].id);
          } else if (_this7.planoEntrega?.selectedEntity?.unidade_id != _this7.entity.unidade_id) {
            _this7.planoEntrega?.onSelectClick(new Event("SELECT"));
          }
        } finally {
          _this7.loading = false;
        }
      }
      if (value == 'OUTRA_UNIDADE') {
        _this7.form?.controls.orgao.setValue(null);
        _this7.planoEntrega?.onSelectClick(new Event("SELECT"));
      }
    })();
  }
  onPlanoEntregaChange(event) {
    let planoEntrega = this.planoEntrega?.selectedEntity;
    this.carregarEntregas(planoEntrega);
  }
  onEntregaChange(event) {
    let entrega = this.entrega.selectedItem?.data;
    if (!this.form.controls.descricao.value?.length) {
      this.form.controls.descricao.setValue(entrega?.descricao || "");
    }
  }
  onForcaTrabalhoChange(row) {
    let index = this.items.findIndex(x => x["id"] == row["id"]);
    this.totalForcaTrabalho = Math.round((this.somaForcaTrabalho(this.grid?.items) - this.items[index].forca_trabalho * 1 + this.form?.controls.forca_trabalho.value * 1) * 100) / 100;
  }
}
_class = PlanoTrabalhoListEntregaComponent;
_class.ɵfac = function PlanoTrabalhoListEntregaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_17__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-list-entrega"]],
  viewQuery: function PlanoTrabalhoListEntregaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.origem = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    disabled: "disabled",
    noPersist: "noPersist",
    cdRef: "cdRef"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]],
  decls: 34,
  vars: 36,
  consts: [["noButtons", "", "noMargin", "", 3, "form", "disabled"], [1, "row", "m-0", "p-0"], ["noMargin", "", "editable", "", 3, "items", "form", "selectable", "minHeight", "join", "groupBy", "add", "remove", "save", "load", "hasDelete", "hasEdit", "hasAdd"], ["gridEntregas", ""], [3, "titleTemplate", "template", "editTemplate", "verticalAlign", "width", "align"], ["titleOrigem", ""], ["columnOrigem", ""], ["editOrigem", ""], [3, "maxWidth", "titleTemplate", "template", "editTemplate", "verticalAlign"], ["titleEntrega", ""], ["columnEntrega", ""], ["editEntrega", ""], [3, "titleTemplate", "template", "editTemplate", "width", "align"], ["titleForcaTrabalho", ""], ["columnForcaTrabalho", ""], ["editForcaTrabalho", ""], ["titleDescricao", ""], ["columnDescricao", ""], ["editDescricao", ""], ["type", "options"], [1, "text-center"], [1, "w-100", "d-flex", "justify-content-center"], [1, "one-per-line"], [3, "label", "color"], ["color", "primary", 3, "label", "icon", 4, "ngIf"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label", 4, "ngIf"], ["color", "primary", 3, "label", "icon"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label"], ["controlName", "origem", "controlName", "origem", 3, "control", "items", "change"], ["origem", ""], ["label", "", "controlName", "plano_entrega_id", 3, "placeholder", "join", "where", "selectParams", "dao", "change", 4, "ngIf"], ["controlName", "orgao", "placeholder", "\u00D3rg\u00E3o", 4, "ngIf"], ["label", "", "controlName", "plano_entrega_id", 3, "placeholder", "join", "where", "selectParams", "dao", "change"], ["planoEntrega", ""], ["controlName", "orgao", "placeholder", "\u00D3rg\u00E3o"], ["orgao", ""], ["class", "w-100", 4, "ngIf"], [1, "w-100"], ["color", "light", "icon", "bi bi-box-arrow-in-right", "hint", "Data de in\u00EDcio", 3, "label"], ["color", "light", "icon", "bi bi-box-arrow-right", "hint", "Data de t\u00E9rmino", 3, "label"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change", 4, "ngIf"], ["nullable", "", "itemNull", "- Selecione -", "controlName", "plano_entrega_entrega_id", 3, "control", "items", "change"], ["entrega", ""], ["icon", "bi bi-calculator", 3, "color", "label"], ["number", "", "sufix", "%", "controlName", "forca_trabalho", 3, "control", "change"], ["controlName", "descricao", 3, "control"]],
  template: function PlanoTrabalhoListEntregaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2, 3)(4, "columns")(5, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](6, PlanoTrabalhoListEntregaComponent_ng_template_6_Template, 4, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, PlanoTrabalhoListEntregaComponent_ng_template_8_Template, 5, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](10, PlanoTrabalhoListEntregaComponent_ng_template_10_Template, 4, 5, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](13, PlanoTrabalhoListEntregaComponent_ng_template_13_Template, 3, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](15, PlanoTrabalhoListEntregaComponent_ng_template_15_Template, 3, 3, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](17, PlanoTrabalhoListEntregaComponent_ng_template_17_Template, 2, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](19, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](20, PlanoTrabalhoListEntregaComponent_ng_template_20_Template, 7, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](22, PlanoTrabalhoListEntregaComponent_ng_template_22_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](24, PlanoTrabalhoListEntregaComponent_ng_template_24_Template, 1, 2, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](26, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](27, PlanoTrabalhoListEntregaComponent_ng_template_27_Template, 4, 0, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](29, PlanoTrabalhoListEntregaComponent_ng_template_29_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](31, PlanoTrabalhoListEntregaComponent_ng_template_31_Template, 1, 2, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](33, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](7);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](9);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](11);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](14);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](16);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](18);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](21);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](23);
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](25);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](28);
      const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](30);
      const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.items.length > 2 ? 0 : 220)("join", ctx.join)("groupBy", ctx.groupBy)("add", ctx.addEntrega.bind(ctx))("remove", ctx.removeEntrega.bind(ctx))("save", ctx.saveEntrega.bind(ctx))("load", ctx.loadEntrega.bind(ctx))("hasDelete", true)("hasEdit", true)("hasAdd", !ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("titleTemplate", _r1)("template", _r3)("editTemplate", _r5)("verticalAlign", "middle")("width", 300)("align", "center");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("maxWidth", 350)("titleTemplate", _r7)("template", _r9)("editTemplate", _r11)("verticalAlign", "middle");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("titleTemplate", _r13)("template", _r15)("editTemplate", _r17)("width", 125)("align", "center");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("maxWidth", 250)("titleTemplate", _r19)("template", _r21)("editTemplate", _r23)("verticalAlign", "middle");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__.BadgeComponent],
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ 51292);
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ 31377);
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ 89997);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);
/* harmony import */ var _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-trabalho-consolidacao/plano-trabalho-consolidacao.component */ 56845);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
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
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PlanoTrabalhoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plano-trabalho-routing.module */ 64506);
/* harmony import */ var _plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plano-trabalho-form/plano-trabalho-form.component */ 31377);
/* harmony import */ var _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-trabalho-list/plano-trabalho-list.component */ 89997);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-trabalho-form-termo/plano-trabalho-form-termo.component */ 51292);
/* harmony import */ var _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-trabalho-list-entrega/plano-trabalho-list-entrega.component */ 59510);
/* harmony import */ var _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-trabalho-consolidacao/plano-trabalho-consolidacao.component */ 56845);
/* harmony import */ var _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component */ 72132);
/* harmony import */ var _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component */ 52483);
/* harmony import */ var _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component */ 89775);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/grid/report/report.component */ 58252);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);
var _class;






























class PlanoTrabalhoModule {}
_class = PlanoTrabalhoModule;
_class.ɵfac = function PlanoTrabalhoModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_27__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule, _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlanoTrabalhoRoutingModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetNgModuleScope"](PlanoTrabalhoModule, {
    declarations: [_plano_trabalho_form_plano_trabalho_form_component__WEBPACK_IMPORTED_MODULE_1__.PlanoTrabalhoFormComponent, _plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoListComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoListEntregaComponent, _plano_trabalho_form_termo_plano_trabalho_form_termo_component__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoFormTermoComponent, _plano_trabalho_consolidacao_plano_trabalho_consolidacao_component__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoConsolidacaoComponent, _plano_trabalho_consolidacao_list_plano_trabalho_consolidacao_list_component__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalhoConsolidacaoListComponent, _plano_trabalho_consolidacao_form_plano_trabalho_consolidacao_form_component__WEBPACK_IMPORTED_MODULE_10__.PlanoTrabalhoConsolidacaoFormComponent, _plano_trabalho_list_accordeon_plano_trabalho_list_accordeon_component__WEBPACK_IMPORTED_MODULE_9__.PlanoTrabalhoListAccordeonComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_27__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule, _plano_trabalho_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlanoTrabalhoRoutingModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetComponentScope"](_plano_trabalho_list_plano_trabalho_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoTrabalhoListComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_27__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_11__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_14__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_16__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_19__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__.InputSelectComponent, _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_22__.ReportComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_23__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_24__.BadgeComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_25__.DocumentosBadgeComponent, _plano_trabalho_list_entrega_plano_trabalho_list_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoListEntregaComponent], []);

/***/ })

}]);
//# sourceMappingURL=796.js.map