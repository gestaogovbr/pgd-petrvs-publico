"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[5177],{

/***/ 89048:
/*!********************************************************************!*\
  !*** ./src/app/dao/plano-entrega-entrega-progresso-dao.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaEntregaProgressoDaoService: () => (/* binding */ PlanoEntregaEntregaProgressoDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class PlanoEntregaEntregaProgressoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("PlanoEntregaEntregaProgresso", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["data_progresso"];
  }
}
_class = PlanoEntregaEntregaProgressoDaoService;
_class.ɵfac = function PlanoEntregaEntregaProgressoDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 54052:
/*!*****************************************************************!*\
  !*** ./src/app/models/plano-entrega-entrega-progresso.model.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaEntregaProgresso: () => (/* binding */ PlanoEntregaEntregaProgresso)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class PlanoEntregaEntregaProgresso extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.data_inicio = new Date();
    this.data_fim = null;
    this.data_progresso = null;
    this.homologado = false;
    this.meta = {};
    this.realizado = {};
    this.progresso_esperado = 100;
    this.progresso_realizado = 0;
    this.plano_entrega_entrega_id = '';
    this.usuario_id = '';
    this.initialization(data);
  }
}

/***/ }),

/***/ 74795:
/*!***********************************************!*\
  !*** ./src/app/models/plano-entrega.model.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntrega: () => (/* binding */ PlanoEntrega)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class PlanoEntrega extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.entregas = []; // Entregas que compõem o plano de entregas
    this.status_historico = []; // Mudanças de status sofridas pelo plano de entregas (histórico)
    this.data_inicio = new Date(); // Data inicial do plano de entrega
    this.data_fim = null; // Data final do plano de entrega
    this.nome = ""; // Nome do plano de entrega
    this.metadados = undefined; // Campo virtual contendo informações calculadas pelo servidor
    this.arquivar = false; // Campo virtual utilizado pelos métodos arquivar/desarquivar/avaliar
    this.status = "INCLUIDO"; // Status atual do plano de entregas
    this.avaliacoes = [];
    this.unidade_id = '';
    this.avaliacao_id = null;
    this.plano_entrega_id = null;
    this.planejamento_id = null;
    this.cadeia_valor_id = null;
    this.programa_id = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 6339:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-entrega-detalhes/plano-entrega-entrega-detalhes.component.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaEntregaDetalhesComponent: () => (/* binding */ PlanoEntregaEntregaDetalhesComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _plano_entrega_entregas_plano_trabalho_plano_entrega_entregas_plano_trabalho_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../plano-entrega-entregas-plano-trabalho/plano-entrega-entregas-plano-trabalho.component */ 13402);
/* harmony import */ var _plano_entrega_entregas_vinculadas_plano_entrega_entregas_vinculadas_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plano-entrega-entregas-vinculadas/plano-entrega-entregas-vinculadas.component */ 71032);

var _class;










function PlanoEntregaEntregaDetalhesComponent_div_5_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 19);
  }
  if (rf & 2) {
    const etiqueta_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("lookup", etiqueta_r10);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_badge_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 20);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("icon", ctx_r5.entityService.getIcon("Unidade"))("label", ctx_r5.entrega == null ? null : ctx_r5.entrega.unidade == null ? null : ctx_r5.entrega.unidade.sigla);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_badge_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 21);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx_r6.entrega == null ? null : ctx_r6.entrega.destinatario);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 22)(1, "div")(2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Planejada");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "br")(5, "badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div")(8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Executada");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "br")(11, "badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("textValue", ctx_r7.planoEntregaService.getValorMeta(ctx_r7.entrega));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("textValue", ctx_r7.planoEntregaService.getValorRealizado(ctx_r7.entrega));
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_24_li_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 33)(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PlanoEntregaEntregaDetalhesComponent_div_5_div_24_li_5_div_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const pObjetivo_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r14.showPlanejamento(pObjetivo_r12.objetivo.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pObjetivo_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](pObjetivo_r12.objetivo.nome);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_24_li_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PlanoEntregaEntregaDetalhesComponent_div_5_div_24_li_5_div_1_Template, 5, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pObjetivo_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", pObjetivo_r12.objetivo);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 26)(1, "h5", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 28)(4, "ul", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PlanoEntregaEntregaDetalhesComponent_div_5_div_24_li_5_Template, 2, 1, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r8.lex.translate("Objetivos"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r8.entrega == null ? null : ctx_r8.entrega.objetivos);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_25_li_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 33)(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PlanoEntregaEntregaDetalhesComponent_div_5_div_25_li_5_div_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r23);
      const pProcesso_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r21.showCadeiaValor(pProcesso_r19.processo.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pProcesso_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](pProcesso_r19.processo.nome);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_25_li_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "li", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PlanoEntregaEntregaDetalhesComponent_div_5_div_25_li_5_div_1_Template, 5, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pProcesso_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", pProcesso_r19.processo);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 26)(1, "h5", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 28)(4, "ul", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PlanoEntregaEntregaDetalhesComponent_div_5_div_25_li_5_Template, 2, 1, "li", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r9.lex.translate("Processos"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r9.entrega == null ? null : ctx_r9.entrega.processos);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, PlanoEntregaEntregaDetalhesComponent_div_5_badge_2_Template, 1, 1, "badge", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Per\u00EDodo: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "div", 11)(13, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "Demandante: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, PlanoEntregaEntregaDetalhesComponent_div_5_badge_15_Template, 1, 2, "badge", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](17, "Destinat\u00E1rio: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](18, PlanoEntregaEntregaDetalhesComponent_div_5_badge_18_Template, 1, 1, "badge", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "h5", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "small", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](23, PlanoEntregaEntregaDetalhesComponent_div_5_div_23_Template, 12, 2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](24, PlanoEntregaEntregaDetalhesComponent_div_5_div_24_Template, 6, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, PlanoEntregaEntregaDetalhesComponent_div_5_div_25_Template, 6, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r1.entrega == null ? null : ctx_r1.entrega.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.entrega == null ? null : ctx_r1.entrega.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.entrega == null ? null : ctx_r1.entrega.descricao_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", ctx_r1.planoEntregaEntregaDao.getDateFormatted(ctx_r1.entrega == null ? null : ctx_r1.entrega.data_inicio), " at\u00E9 ", ctx_r1.planoEntregaEntregaDao.getDateFormatted(ctx_r1.entrega == null ? null : ctx_r1.entrega.data_fim), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.entrega == null ? null : ctx_r1.entrega.unidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.entrega == null ? null : ctx_r1.entrega.destinatario == null ? null : ctx_r1.entrega.destinatario.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.lex.translate("Metas"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r1.entrega == null ? null : ctx_r1.entrega.descricao_meta);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.entrega == null ? null : ctx_r1.entrega.objetivos == null ? null : ctx_r1.entrega.objetivos.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.entrega == null ? null : ctx_r1.entrega.processos == null ? null : ctx_r1.entrega.processos.length);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "plano-entrega-entregas-vinculadas", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entregaId", ctx_r2.entrega.id);
  }
}
function PlanoEntregaEntregaDetalhesComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "plano-entrega-entregas-plano-trabalho", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entregaId", ctx_r3.entrega.id);
  }
}
class PlanoEntregaEntregaDetalhesComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.planoEntregaEntregaDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaEntregaDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.entrega = this.metadata?.entrega;
  }
  showPlanejamento(objetivo_id) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo_id]
      }, {
        modal: true
      });
    })();
  }
  showCadeiaValor(processo_id) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo_id]
      }, {
        modal: true
      });
    })();
  }
}
_class = PlanoEntregaEntregaDetalhesComponent;
_class.ɵfac = function PlanoEntregaEntregaDetalhesComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-entrega-detalhes"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 8,
  vars: 4,
  consts: [["right", "", 3, "title"], ["detalhesEntrega", ""], ["key", "INFOS", "icon", "bi bi-info-lg", "label", "Informa\u00E7\u00F5es"], ["key", "VINCULOS", "icon", "bi bi-arrow-down-up", "label", "V\u00EDnculos"], ["key", "PARTICIPANTES", "icon", "bi bi-people", "label", "Participantes"], ["class", "", "style", "min-height: 400px;", 4, "ngIf"], ["style", "min-height: 400px;", 4, "ngIf"], ["class", "row", "style", "min-height: 400px;", 4, "ngIf"], [1, "", 2, "min-height", "400px"], [1, "mb-2"], [3, "lookup", 4, "ngFor", "ngForOf"], [1, "d-flex"], [1, "me-2"], ["color", "light", 3, "icon", "label", 4, "ngIf"], ["color", "light", "icon", "bi bi-mailbox", 3, "label", 4, "ngIf"], [1, "text-center"], [1, "d-block", "text-center", "mb-2"], ["class", "d-flex justify-content-center", 4, "ngIf"], ["class", "mt-3", 4, "ngIf"], [3, "lookup"], ["color", "light", 3, "icon", "label"], ["color", "light", "icon", "bi bi-mailbox", 3, "label"], [1, "d-flex", "justify-content-center"], ["icon", "bi bi-graph-up-arrow", "color", "light", "hint", "Planejada", 3, "textValue"], [1, "vr", "mx-5"], ["icon", "bi bi-check-lg", "color", "light", "hint", "Realizada", 3, "textValue"], [1, "mt-3"], [1, "text-center", "mb-2"], [1, "card"], [1, "list-group", "list-group-flush"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], ["class", "d-flex justify-content-between align-items-center", 4, "ngIf"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "btn", "btn-sm", "btn-outline-info", "me-2", 3, "click"], [1, "bi", "bi-eye"], [2, "min-height", "400px"], [3, "entregaId"], [1, "row", 2, "min-height", "400px"]],
  template: function PlanoEntregaEntregaDetalhesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tabs", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "tab", 2)(3, "tab", 3)(4, "tab", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PlanoEntregaEntregaDetalhesComponent_div_5_Template, 26, 12, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, PlanoEntregaEntregaDetalhesComponent_div_6_Template, 2, 1, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, PlanoEntregaEntregaDetalhesComponent_div_7_Template, 2, 1, "div", 7);
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _r0.active == "INFOS");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _r0.active == "VINCULOS" && ctx.entrega);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _r0.active == "PARTICIPANTES" && ctx.entrega);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_4__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_5__.TabComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_6__.BadgeComponent, _plano_entrega_entregas_plano_trabalho_plano_entrega_entregas_plano_trabalho_component__WEBPACK_IMPORTED_MODULE_7__.PlanoEntregaEntregasPlanoTrabalhoComponent, _plano_entrega_entregas_vinculadas_plano_entrega_entregas_vinculadas_component__WEBPACK_IMPORTED_MODULE_8__.PlanoEntregaEntregasVinculadasComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 13402:
/*!***************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-entregas-plano-trabalho/plano-entrega-entregas-plano-trabalho.component.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaEntregasPlanoTrabalhoComponent: () => (/* binding */ PlanoEntregaEntregasPlanoTrabalhoComponent)
/* harmony export */ });
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-trabalho-entrega-dao.service */ 59173);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _plano_trabalho_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../plano-trabalho/plano-trabalho.service */ 80684);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _plano_trabalho_entrega_atividades_plano_trabalho_entrega_atividades_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plano-trabalho-entrega-atividades/plano-trabalho-entrega-atividades.component */ 59495);
var _class;











const _c0 = ["accordionUser"];
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_4_Template(rf, ctx) {}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "plano-trabalho-entrega-atividades", 29);
  }
  if (rf & 2) {
    const row_r37 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entregaId", row_r37.id);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Plano de trabalho");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const plano_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx_r22.PlanoTrabalhoDao.getDateFormatted(plano_r16.data_inicio), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](" at\u00E9 " + ctx_r22.PlanoTrabalhoDao.getDateFormatted(plano_r16.data_fim));
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Origem");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 37);
  }
  if (rf & 2) {
    const row_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().row;
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", (row_r42.plano_entrega_entrega == null ? null : row_r42.plano_entrega_entrega.plano_entrega == null ? null : row_r42.plano_entrega_entrega.plano_entrega.unidade == null ? null : row_r42.plano_entrega_entrega.plano_entrega.unidade.sigla) || "Desconhecido")("icon", ctx_r43.entityService.getIcon("Unidade"));
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 38);
  }
  if (rf & 2) {
    const row_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", row_r42.orgao);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "badge", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_badge_3_Template, 1, 2, "badge", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_badge_4_Template, 1, 1, "badge", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r42 = ctx.row;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx_r26.planoTrabalhoService.tipoEntrega(row_r42, ctx_r26.entity).titulo)("color", ctx_r26.planoTrabalhoService.tipoEntrega(row_r42, ctx_r26.entity).cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r42.plano_entrega_entrega_id == null ? null : row_r42.plano_entrega_entrega_id.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r42.orgao == null ? null : row_r42.orgao.length);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const plano_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("color", ctx_r28.totalForcaTrabalho(plano_r16.entregas) == 100 ? "success" : "warning")("label", ctx_r28.totalForcaTrabalho(plano_r16.entregas) + "%");
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r49 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r49.forca_trabalho + "%");
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 30)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Detalhamento/Descri\u00E7\u00E3o dos Trabalhos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "small", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r51.descricao);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "badge", 40);
  }
  if (rf & 2) {
    const plano_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("color", ctx_r36.lookup.getColor(ctx_r36.lookup.PLANO_TRABALHO_STATUS, plano_r16.status))("icon", ctx_r36.lookup.getIcon(ctx_r36.lookup.PLANO_TRABALHO_STATUS, plano_r16.status))("label", ctx_r36.lookup.getValue(ctx_r36.lookup.PLANO_TRABALHO_STATUS, plano_r16.status));
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 12)(1, "div", 13)(2, "grid", 14)(3, "columns")(4, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_5_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "column", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_8_Template, 4, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_10_Template, 4, 2, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "column", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_13_Template, 4, 0, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_15_Template, 5, 4, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "column", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](18, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_18_Template, 3, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](20, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_20_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "column", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](23, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_23_Template, 4, 0, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_25_Template, 2, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "column", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](28, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_ng_template_28_Template, 1, 3, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const plano_r16 = ctx.$implicit;
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](6);
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](9);
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](11);
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](14);
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](16);
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](19);
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](21);
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](24);
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](26);
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("items", plano_r16.entregas);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("vertical-align:middle");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("expandTemplate", _r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r21)("titleTemplate", _r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r23)("template", _r25)("verticalAlign", "middle")("width", 300)("align", "center");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r27)("title", "% CHD")("template", _r29)("width", 125)("align", "center")("titleHint", "% Carga Hor\u00E1ria Dispon\u00EDvel");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("maxWidth", 250)("titleTemplate", _r31)("template", _r33)("verticalAlign", "middle")("align", "center");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r35);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Entregas do plano:");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_div_3_Template, 30, 23, "div", 11);
  }
  if (rf & 2) {
    const item_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", item_r14.planos_trabalho);
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Participante");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r55 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r55.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r55.apelido || "");
  }
}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_14_Template(rf, ctx) {}
function PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r57 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("color", ctx_r12.totalForcaTrabalho(ctx_r12.planoAtivo(row_r57.planos_trabalho).entregas) == 100 ? "success" : "warning")("label", ctx_r12.totalForcaTrabalho(ctx_r12.planoAtivo(row_r57.planos_trabalho).entregas) + "%");
  }
}
class PlanoEntregaEntregasPlanoTrabalhoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  set entregaId(value) {
    if (this._entregaId != value) {
      this._entregaId = value;
    }
  }
  get entregaId() {
    return this._entregaId;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.items = [];
    this.loader = false;
    this.PlanoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_0__.PlanoTrabalhoDaoService);
    this.PlanoTrabalhoEntregaDao = injector.get(src_app_dao_plano_trabalho_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoTrabalhoEntregaDaoService);
    this.planoTrabalhoService = injector.get(_plano_trabalho_plano_trabalho_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoService);
    this.join = ["plano_trabalho.usuario", "plano_entrega_entrega.plano_entrega.unidade"];
    this.groupBy = [{
      field: "plano_trabalho.usuario",
      label: "Usuário"
    }];
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }
  loadData() {
    this.loader = true;
    this.cdRef.detectChanges();
    try {
      this.PlanoTrabalhoEntregaDao.query({
        where: [["plano_entrega_entrega_id", "==", this._entregaId]],
        join: this.join
      }).asPromise().then(response => {
        response.forEach(item => {
          const usuario = item.plano_trabalho.usuario;
          if (usuario) {
            const usuarioId = usuario.id;
            let usuarioExistente = this.items.find(u => u.id === usuarioId);
            if (!usuarioExistente) {
              usuarioExistente = {
                ...usuario,
                planos_trabalho: [],
                initialization(data) {}
              };
              this.items.push(usuarioExistente);
            }
            const planoTrabalhoId = item.plano_trabalho.id;
            let planoTrabalho = usuarioExistente.planos_trabalho.find(pt => pt.id === planoTrabalhoId);
            if (!planoTrabalho) {
              planoTrabalho = {
                ...item.plano_trabalho,
                entregas: [],
                initialization(data) {}
              };
              usuarioExistente.planos_trabalho.push(planoTrabalho);
            }
            const entrega = {
              ...item,
              initialization(data) {}
            };
            planoTrabalho.entregas.push(entrega);
          }
        });
      }).finally(() => {
        this.loader = false;
        this.cdRef.detectChanges();
      });
    } catch (e) {
      console.log("Erro");
    }
  }
  totalForcaTrabalho(entregas = []) {
    const forca = entregas.map(x => x.forca_trabalho * 1).reduce((a, b) => a + b, 0);
    return Math.round(forca * 100) / 100;
  }
  planoAtivo(planos) {
    const planoAtivo = planos.find(plano => plano.status === "ATIVO");
    return planoAtivo || {};
  }
}
_class = PlanoEntregaEntregasPlanoTrabalhoComponent;
_class.ɵfac = function PlanoEntregaEntregasPlanoTrabalhoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-entregas-plano-trabalho"]],
  viewQuery: function PlanoEntregaEntregasPlanoTrabalhoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.accordionUser = _t.first);
    }
  },
  inputs: {
    entregaId: "entregaId"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 18,
  vars: 11,
  consts: [[3, "items", "loading"], ["accordionUser", ""], ["type", "expand", 3, "expandTemplate", "template", "width"], ["usuarioSectionTitle", ""], ["columnExpandeEntregas", ""], [3, "titleTemplate", "template"], ["titleParticipante", ""], ["columnParticipante", ""], [3, "titleTemplate", "template", "title", "titleHint"], ["titleForcaTrabalho", ""], ["columnForcaTrabalho", ""], ["class", "card mb-2", 4, "ngFor", "ngForOf"], [1, "card", "mb-2"], [1, "card-body"], [3, "items"], ["type", "expand", 3, "expandTemplate"], ["columnExpandedAtividades", ""], [3, "template", "titleTemplate"], ["titlePlano", ""], ["columnPlano", ""], [3, "titleTemplate", "template", "verticalAlign", "width", "align"], ["titleOrigem", ""], ["columnOrigem", ""], [3, "titleTemplate", "title", "template", "width", "align", "titleHint"], [3, "maxWidth", "titleTemplate", "template", "verticalAlign", "align"], ["titleDescricao", ""], ["columnDescricao", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], [3, "entregaId"], [1, "text-center"], [1, "d-block", "text-center"], [1, "w-100", "d-flex", "justify-content-center"], [1, "one-per-line"], [3, "label", "color"], ["color", "primary", 3, "label", "icon", 4, "ngIf"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label", 4, "ngIf"], ["color", "primary", 3, "label", "icon"], ["icon", "bi bi-box-arrow-down-left", "color", "warning", 3, "label"], ["icon", "bi bi-calculator", 3, "color", "label"], [3, "color", "icon", "label"]],
  template: function PlanoEntregaEntregasPlanoTrabalhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "grid", 0, 1)(2, "columns")(3, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_4_Template, 0, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_6_Template, 4, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_9_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_11_Template, 5, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_14_Template, 0, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, PlanoEntregaEntregasPlanoTrabalhoComponent_ng_template_16_Template, 2, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](5);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](7);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](10);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](12);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](15);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("items", ctx.items)("loading", ctx.loader);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("expandTemplate", _r3)("template", _r1)("width", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r5)("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r9)("template", _r11)("title", "% CHD")("titleHint", "% Carga Hor\u00E1ria Dispon\u00EDvel");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_7__.BadgeComponent, _plano_trabalho_entrega_atividades_plano_trabalho_entrega_atividades_component__WEBPACK_IMPORTED_MODULE_8__.PlanoTrabalhoEntregaAtividadesComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 71032:
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-entregas-vinculadas/plano-entrega-entregas-vinculadas.component.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaEntregasVinculadasComponent: () => (/* binding */ PlanoEntregaEntregasVinculadasComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ 55397);

var _class;







function PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_ng_template_1_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "badge", 8);
  }
  if (rf & 2) {
    const node_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("icon", ctx_r4.entityService.getIcon("Unidade"))("label", node_r3.data == null ? null : node_r3.data.unidade == null ? null : node_r3.data.unidade.sigla);
  }
}
function PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_ng_template_1_badge_2_Template, 1, 2, "badge", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_ng_template_1_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const node_r3 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.showDetalhes(node_r3.data));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "i", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const node_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](node_r3.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", node_r3.data == null ? null : node_r3.data.unidade);
  }
}
function PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p-organizationChart", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_ng_template_1_Template, 6, 2, "ng-template", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx_r0.entregasVinculadas);
  }
}
function PlanoEntregaEntregasVinculadasComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 9)(1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
class PlanoEntregaEntregasVinculadasComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  set entregaId(value) {
    if (this._entregaId != value) {
      this._entregaId = value;
    }
  }
  get entregaId() {
    return this._entregaId;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.loader = false;
    this.entregasVinculadas = [];
    this.planoEntregaEntregaDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaEntregaDaoService);
    this.join = ["unidade"];
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }
  loadData() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loader = true;
      try {
        _this.entregasVinculadas = yield _this.planoEntregaEntregaDao.hierarquia(_this._entregaId);
        _this.cdRef.detectChanges();
        _this.loader = false;
      } catch (e) {
        console.log("Erro");
      }
    })();
  }
  showDetalhes(entrega) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "detalhes"]
      }, {
        metadata: {
          entrega: entrega
        }
      });
    })();
  }
}
_class = PlanoEntregaEntregasVinculadasComponent;
_class.ɵfac = function PlanoEntregaEntregasVinculadasComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-entregas-vinculadas"]],
  inputs: {
    entregaId: "entregaId"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 2,
  consts: [[3, "value", 4, "ngIf"], ["class", "d-flex justify-content-center my-2", 4, "ngIf"], [3, "value"], ["pTemplate", "default"], [1, "p-2"], ["color", "light", 3, "icon", "label", 4, "ngIf"], ["title", "Detalhes da entrega", 1, "btn", "btn-sm", 3, "click"], [1, "bi", "bi-eye"], ["color", "light", 3, "icon", "label"], [1, "d-flex", "justify-content-center", "my-2"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"]],
  template: function PlanoEntregaEntregasVinculadasComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, PlanoEntregaEntregasVinculadasComponent_p_organizationChart_0_Template, 2, 1, "p-organizationChart", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PlanoEntregaEntregasVinculadasComponent_div_1_Template, 3, 0, "div", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.entregasVinculadas.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loader);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_3__.BadgeComponent, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_6__.OrganizationChart, primeng_api__WEBPACK_IMPORTED_MODULE_7__.PrimeTemplate],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 49546:
/*!***************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-form-adesao/plano-entrega-form-adesao.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaFormAdesaoComponent: () => (/* binding */ PlanoEntregaFormAdesaoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/plano-entrega.model */ 74795);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);

var _class;
















const _c0 = function () {
  return ["gestao", "plano-entrega"];
};
const _c1 = function (a0) {
  return {
    unidade_id: a0,
    status: "ATIVO"
  };
};
const _c2 = function (a1) {
  return {
    showFilter: false,
    filter: a1
  };
};
const _c3 = function (a0, a1) {
  return {
    route: a0,
    params: a1
  };
};
const _c4 = function (a2) {
  return ["unidade_id", "=", a2];
};
const _c5 = function () {
  return ["status", "=", "ATIVO"];
};
const _c6 = function (a0, a1) {
  return [a0, a1];
};
class PlanoEntregaFormAdesaoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__.PlanoEntrega, src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'plano_entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Plano de Entregas") + ': ' + (entity?.nome || "");
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__.UnidadeDaoService);
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_7__.ProgramaDaoService);
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaDaoService);
    this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorDaoService);
    this.planejamentoInstitucionalDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_5__.PlanejamentoDaoService);
    this.join = [];
    this.modalWidth = 1000;
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      data_inicio: {
        default: ""
      },
      data_fim: {
        default: ""
      },
      planejamento_id: {
        default: null
      },
      cadeia_valor_id: {
        default: null
      },
      unidade_id: {
        default: this.auth.unidade?.id
      },
      plano_entrega_id: {
        default: null
      },
      programa_id: {
        default: null
      },
      status: {
        default: "HOMOLOGANDO"
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    let planoEntrega = this.metadata?.planoEntrega ? this.metadata?.planoEntrega : null;
    if (planoEntrega) {
      this.form.controls.plano_entrega_id.setValue(planoEntrega.id);
      this.form.controls.nome.setValue(planoEntrega.nome);
      this.form.controls.data_inicio.setValue(planoEntrega.data_inicio);
      this.form.controls.data_fim.setValue(planoEntrega.data_fim);
      this.form.controls.planejamento_id.setValue(planoEntrega.planejamento_id);
      this.form.controls.cadeia_valor_id.setValue(planoEntrega.cadeia_valor_id);
    }
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
      _this.cdRef.detectChanges();
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.loadData(_this2.entity, _this2.form);
    })();
  }
  saveData(form) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        let planoEntrega = _this3.util.fill(new src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_9__.PlanoEntrega(), _this3.entity);
        planoEntrega = _this3.util.fillForm(planoEntrega, _this3.form.value);
        resolve(planoEntrega);
      });
    })();
  }
  onPlanoEntregaChange(event) {
    if (this.form.controls.plano_entrega_id.value) {
      this.form.controls.nome.setValue(this.planoEntrega?.selectedEntity.nome);
      this.form.controls.data_inicio.setValue(this.planoEntrega?.selectedEntity.data_inicio);
      this.form.controls.data_fim.setValue(this.planoEntrega?.selectedEntity.data_fim);
      this.form.controls.planejamento_id.setValue(this.planoEntrega?.selectedEntity.planejamento_id);
      this.form.controls.cadeia_valor_id.setValue(this.planoEntrega?.selectedEntity.cadeia_valor_id);
      this.form.controls.programa_id.setValue(this.planoEntrega?.selectedEntity.programa_id);
    }
  }
}
_class = PlanoEntregaFormAdesaoComponent;
_class.ɵfac = function PlanoEntregaFormAdesaoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_14__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-adesao"]],
  viewQuery: function PlanoEntregaFormAdesaoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_3__.InputSearchComponent, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵInheritDefinitionFeature"]],
  decls: 21,
  vars: 39,
  consts: [["initialFocus", "plano_entrega_id", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mb-4"], ["controlName", "plano_entrega_id", "label", "Plano de Entregas da Unidade-pai", "required", "", 3, "size", "dao", "selectRoute", "where", "change"], ["planoEntrega", ""], [1, "row"], ["label", "Nome deste Plano de Entregas", "controlName", "nome", "required", "", 3, "size"], ["disabled", "", "controlName", "unidade_id", 3, "size", "label", "dao"], ["disabled", "", "label", "Status", "controlName", "status", 3, "size"], [1, "row", "mt-4"], ["title", "Dados herdados do Plano de Entregas da Unidade-pai", 3, "collapse"], ["disabled", "", "label", "Programa de Gest\u00E3o", "controlName", "programa_id", 3, "size", "dao"], ["disabled", "", "label", "Planejamento Institucional", "controlName", "planejamento_id", 3, "size", "dao"], ["disabled", "", "controlName", "data_inicio", "label", "In\u00EDcio", 3, "size", "labelInfo"], ["disabled", "", "label", "Cadeia de Valor", "controlName", "cadeia_valor_id", 3, "size", "dao"], ["disabled", "", "controlName", "data_fim", "label", "Fim", 3, "size", "labelInfo"]],
  template: function PlanoEntregaFormAdesaoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("submit", function PlanoEntregaFormAdesaoComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoEntregaFormAdesaoComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "div")(2, "div", 1)(3, "input-search", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function PlanoEntregaFormAdesaoComponent_Template_input_search_change_3_listener($event) {
        return ctx.onPlanoEntregaChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](5, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](7, "input-text", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](8, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](9, "input-search", 6)(10, "input-text", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "div", 8)(12, "separator", 9)(13, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](14, "input-search", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](15, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](16, "input-search", 11)(17, "input-datetime", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](18, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](19, "input-search", 13)(20, "input-datetime", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12)("dao", ctx.planoEntregaDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction2"](30, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction0"](25, _c0), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](28, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](26, _c1, ctx.auth.unidade.unidade_pai_id))))("where", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction2"](36, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](33, _c4, ctx.auth.unidade.unidade_pai_id), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction0"](35, _c5)));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 9)("label", ctx.lex.translate("Unidade"))("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("collapse", "collapse");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 12)("dao", ctx.programaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 9)("dao", ctx.planejamentoInstitucionalDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("labelInfo", "In\u00EDcio " + ctx.lex.translate("Plano de Entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 9)("dao", ctx.cadeiaValorDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("labelInfo", "Fim " + ctx.lex.translate("Plano de Entrega"));
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, src_app_components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_3__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__.InputDatetimeComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 62675:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-form-entrega/plano-entrega-form-entrega.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaFormEntregaComponent: () => (/* binding */ PlanoEntregaFormEntregaComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ 32398);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/entrega-dao.service */ 67465);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ 67501);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component */ 36637);

var _class;































const _c0 = ["gridProcessos"];
const _c1 = ["gridObjetivos"];
const _c2 = ["entregas"];
const _c3 = ["planejamento"];
const _c4 = ["cadeiaValor"];
const _c5 = ["inputObjetivo"];
const _c6 = ["inputProcesso"];
const _c7 = ["entrega"];
const _c8 = ["unidade"];
const _c9 = ["tabs"];
const _c10 = ["etiqueta"];
function PlanoEntregaFormEntregaComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "plano-entrega-valor-meta-input", 30)(2, "plano-entrega-valor-meta-input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("entrega", _r2 == null ? null : _r2.selectedEntity)("size", 6)("control", ctx_r3.form.controls.meta);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("entrega", _r2 == null ? null : _r2.selectedEntity)("size", 6)("control", ctx_r3.form.controls.realizado)("change", ctx_r3.onRealizadoChange.bind(ctx_r3));
  }
}
function PlanoEntregaFormEntregaComponent_tab_43_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "order", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1, "Objetivos");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r15 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("header", header_r15);
  }
}
function PlanoEntregaFormEntregaComponent_tab_43_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](row_r16.objetivo == null ? null : row_r16.objetivo.nome);
  }
}
const _c11 = function (a2) {
  return ["planejamento_id", "==", a2];
};
const _c12 = function (a0) {
  return [a0];
};
const _c13 = function () {
  return ["gestao", "planejamento", "objetivoList"];
};
const _c14 = function (a0) {
  return {
    planejamento_id: a0
  };
};
const _c15 = function (a0) {
  return {
    filter: a0
  };
};
const _c16 = function (a0, a1) {
  return {
    route: a0,
    params: a1
  };
};
function PlanoEntregaFormEntregaComponent_tab_43_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "input-search", 42, 43);
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("where", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](6, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](4, _c11, ctx_r14.planejamentoId)))("dao", ctx_r14.planejamentoObjetivoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction2"](13, _c16, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](8, _c13), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](11, _c15, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](9, _c14, ctx_r14.planejamentoId))));
  }
}
function PlanoEntregaFormEntregaComponent_tab_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "tab", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "input-search", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "grid", 35, 36)(5, "columns")(6, "column", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](7, PlanoEntregaFormEntregaComponent_tab_43_ng_template_7_Template, 2, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](9, PlanoEntregaFormEntregaComponent_tab_43_ng_template_9_Template, 2, 1, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](11, PlanoEntregaFormEntregaComponent_tab_43_ng_template_11_Template, 2, 16, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](13, "column", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](8);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](10);
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](12);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("dao", ctx_r5.planejamentoDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("control", ctx_r5.form.controls.objetivos)("form", ctx_r5.formObjetivos)("orderBy", ctx_r5.orderBy)("hasDelete", true)("hasEdit", true)("add", ctx_r5.addObjetivo.bind(ctx_r5))("remove", ctx_r5.removeObjetivo.bind(ctx_r5))("save", ctx_r5.saveObjetivo.bind(ctx_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("titleTemplate", _r9)("template", _r11)("editTemplate", _r13);
  }
}
function PlanoEntregaFormEntregaComponent_tab_44_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "order", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1, "Processos");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r27 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("header", header_r27);
  }
}
function PlanoEntregaFormEntregaComponent_tab_44_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtextInterpolate"](row_r28.processo == null ? null : row_r28.processo.nome);
  }
}
const _c17 = function (a2) {
  return ["cadeia_valor_id", "==", a2];
};
const _c18 = function () {
  return ["gestao", "cadeia-valor", "processoList"];
};
const _c19 = function (a0) {
  return {
    cadeia_valor_id: a0
  };
};
function PlanoEntregaFormEntregaComponent_tab_44_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "input-search", 53, 54);
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("where", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](6, _c12, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](4, _c17, ctx_r26.cadeiaValorId)))("dao", ctx_r26.cadeiaValorProcessoDao)("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction2"](13, _c16, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](8, _c18), _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](11, _c15, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](9, _c19, ctx_r26.cadeiaValorId))));
  }
}
function PlanoEntregaFormEntregaComponent_tab_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "tab", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](1, "input-search", 45, 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](3, "grid", 35, 47)(5, "columns")(6, "column", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](7, PlanoEntregaFormEntregaComponent_tab_44_ng_template_7_Template, 2, 1, "ng-template", null, 48, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](9, PlanoEntregaFormEntregaComponent_tab_44_ng_template_9_Template, 2, 1, "ng-template", null, 49, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](11, PlanoEntregaFormEntregaComponent_tab_44_ng_template_11_Template, 2, 16, "ng-template", null, 50, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](13, "column", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](8);
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](10);
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](12);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("dao", ctx_r6.cadeiaValorDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("control", ctx_r6.form.controls.processos)("form", ctx_r6.formProcessos)("orderBy", ctx_r6.orderBy)("hasDelete", true)("hasEdit", true)("add", ctx_r6.addProcesso.bind(ctx_r6))("remove", ctx_r6.removeProcesso.bind(ctx_r6))("save", ctx_r6.saveProcesso.bind(ctx_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("titleTemplate", _r21)("template", _r23)("editTemplate", _r25);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("dynamicButtons", ctx_r6.dynamicButtonsProcessos.bind(ctx_r6));
  }
}
const _c20 = function (a2) {
  return ["plano_entrega.unidade_id", "in", a2];
};
const _c21 = function () {
  return ["gestao", "plano-entrega", "entregaList"];
};
const _c22 = function (a0) {
  return {
    route: a0
  };
};
const _c23 = function (a0) {
  return {
    "idsUnidadesAscendentes": a0
  };
};
class PlanoEntregaFormEntregaComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaEntrega, src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaEntregaDaoService);
    this.injector = injector;
    this.itensQualitativo = [];
    this.idsUnidadesAscendentes = [];
    this.checklist = [];
    this.etiquetas = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['descricao', 'destinatario'].indexOf(controlName) >= 0) {
        if (!control.value?.length) {
          result = "Obrigatório";
        } else if (this.entrega.selectedEntity && this.entrega.selectedEntity.descricao == control.value) {
          result = "É necessário incrementar ou modificar a descrição da entrega";
        }
      } else if (['progresso_realizado', 'realizado'].indexOf(controlName) >= 0 && !(control.value >= 0 || control.value?.length > 0)) {
        result = "Obrigatório";
      } else if (['progresso_esperado', 'meta'].indexOf(controlName) >= 0 && !(control.value > 0 || control.value?.length > 0)) {
        result = "Obrigatório";
      } else if (['unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "A unidade demandante é obrigatória";
      } else if (['entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "A entrega é obrigatória";
      } else if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      } else if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      } else if (['planejamento_objetivo_id'].indexOf(controlName) >= 0) {
        if (!control.value?.length) result = "O objetivo do planejamento é obrigatório";
        if (control.value?.length && this.gridObjetivos?.items.filter(x => x._status == "ADD").map(x => x.planejamento_objetivo_id).includes(this.formObjetivos.controls.planejamento_objetivo_id.value)) result = "Este objetivo está em duplicidade!";
      } else if (['cadeia_processo_id'].indexOf(controlName) >= 0) {
        if (!control.value?.length) result = "O processo da cadeia de valor é obrigatório";
        if (control.value?.length && this.gridProcessos?.items.map(x => x.cadeia_processo_id).includes(this.formProcessos.controls.cadeia_processo_id.value)) result = "Este processo está em duplicidade!";
      }
      return result;
    };
    this.formValidation = form => {
      let inicio = this.form?.controls.data_inicio.value;
      let fim = this.form?.controls.data_fim.value;
      if (this.gridObjetivos?.editing) {
        this.tabs.active = "OBJETIVOS";
        return "Salve ou cancele o registro atual em edição";
      }
      if (this.gridProcessos?.editing) {
        this.tabs.active = "PROCESSOS";
        return "Salve ou cancele o registro atual em edição";
      }
      if (!this.dao?.validDateTime(inicio)) {
        return "Data de início inválida";
      } else if (!this.dao?.validDateTime(fim)) {
        return "Data de fim inválida";
      } else if (inicio > fim) {
        return "A data do fim não pode ser anterior à data do início!";
      } else if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && this.planoEntrega && inicio < this.planoEntrega.data_inicio) {
        return "Data de inicio menor que a data de inicio " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_inicio);
      } else if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && this.planoEntrega && this.planoEntrega.data_fim && fim > this.planoEntrega.data_fim) {
        return "Data de fim maior que a data de fim " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(this.planoEntrega.data_fim);
      }
      return undefined;
    };
    this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.entregaDao = injector.get(src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_8__.EntregaDaoService);
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_13__.PlanoEntregaDaoService);
    this.planejamentoInstitucionalDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    this.planoEntregaEntregaDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaEntregaDaoService);
    this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_10__.CadeiaValorProcessoDaoService);
    this.planejamentoObjetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_9__.PlanejamentoObjetivoDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_12__.PlanoEntregaService);
    this.modalWidth = 700;
    this.join = ["entrega", "objetivos.objetivo", "processos.processo"];
    this.form = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      descricao_entrega: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      meta: {
        default: 100
      },
      descricao_meta: {
        default: ""
      },
      realizado: {
        default: null
      },
      plano_entrega_id: {
        default: ""
      },
      entrega_pai_id: {
        default: null
      },
      entrega_id: {
        default: null
      },
      progresso_esperado: {
        default: 100
      },
      progresso_realizado: {
        default: null
      },
      unidade_id: {
        default: null
      },
      destinatario: {
        default: null
      },
      objetivos: {
        default: []
      },
      processos: {
        default: []
      },
      listaQualitativo: {
        default: []
      },
      planejamento_id: {
        default: null
      },
      cadeia_valor_id: {
        default: null
      },
      objetivo_id: {
        default: null
      },
      objetivo: {
        default: null
      },
      checklist: {
        default: []
      },
      etiquetas: {
        default: []
      },
      etiqueta: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formObjetivos = this.fh.FormBuilder({
      planejamento_objetivo_id: {
        default: null
      }
    }, this.cdRef, this.validate);
    this.formProcessos = this.fh.FormBuilder({
      cadeia_processo_id: {
        default: null
      }
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: {
        default: ""
      },
      texto: {
        default: ""
      },
      checked: {
        default: false
      }
    }, this.cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    let unidade = null;
    this.planoEntrega = this.metadata?.plano_entrega;
    this.planejamentoId = this.metadata?.planejamento_id;
    this.cadeiaValorId = this.metadata?.cadeia_valor_id;
    this.unidadeId = this.metadata?.unidade_id;
    if (this.metadata?.data_fim) this.dataFim = this.metadata?.data_fim;
    this.entity = this.metadata?.entrega;
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      _this.onEntregaChange(form.value);
      let {
        meta,
        realizado,
        ...entityWithout
      } = entity;
      yield _this.entrega?.loadSearch(entity.entrega || formValue.entrega_id, false);
      yield _this.unidade?.loadSearch(_this.unidadeId);
      yield _this.planejamento?.loadSearch(_this.planejamentoId);
      yield _this.cadeiaValor?.loadSearch(_this.cadeiaValorId);
      let unidade = _this.unidadeId?.length ? yield _this.unidadeDao.getById(_this.unidadeId) : null;
      _this.idsUnidadesAscendentes = unidade?.path?.split('/').slice(1) || [];
      form.patchValue(_this.util.fillForm(formValue, entityWithout));
      form.controls.meta.setValue(_this.planoEntregaService.getValor(entity.meta));
      form.controls.realizado.setValue(_this.planoEntregaService.getValor(entity.realizado));
      form.controls.objetivos.setValue(entity.objetivos);
      form.controls.processos.setValue(entity.processos);
      if (_this.dataFim) form.controls.data_fim.setValue(_this.dataFim);
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity.unidade_id = _this2.auth.unidade.id;
      _this2.entity.unidade = _this2.auth.unidade;
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  onSaveEntrega() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let error = undefined;
      let save = true;
      if (_this3.formValidation) {
        try {
          error = yield _this3.formValidation(_this3.form);
        } catch (e) {
          error = e;
        }
      }
      if (_this3.form.valid && !error) {
        if (_this3.action == "edit") {
          let entity = (yield _this3.saveData(_this3.form.value)).modalResult;
          let planosImpactados = [];
          entity._status = "EDIT";
          _this3.loading = true;
          try {
            planosImpactados = yield _this3.planoEntregaDao.planosImpactadosPorAlteracaoEntrega(entity);
          } finally {
            _this3.loading = false;
          }
          if (planosImpactados.length) {
            let planos = planosImpactados.map(x => _this3.util.getDateFormatted(x.data_inicio) + " - " + _this3.util.getDateFormatted(x.data_fim) + " - " + x.unidade?.sigla + ": " + x.usuario?.nome + "\n");
            save = yield _this3.dialog.confirm("Altera assim mesmo?", "Caso prossiga com essa modificação os seguintes planos de trabalho serão repactuados automaticamente:\n\n" + planos + "\n" + "Deseja prosseguir?");
          }
        }
        if (save) yield _this3.onSaveData();
      } else {
        _this3.form.markAllAsTouched();
        if (error) _this3.error(error);
      }
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let entrega = this.util.fill(new src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaEntrega(), this.entity);
      this.gridObjetivos?.confirm();
      this.gridProcessos?.confirm();
      let {
        meta,
        realizado,
        ...valueWithout
      } = this.form.value;
      entrega = this.util.fillForm(entrega, valueWithout);
      entrega.unidade = this.unidade?.selectedEntity;
      entrega.entrega = this.entrega?.selectedEntity;
      entrega.meta = this.planoEntregaService.getEntregaValor(entrega.entrega, meta);
      entrega.realizado = this.planoEntregaService.getEntregaValor(entrega.entrega, realizado);
      resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_11__.NavigateResult(entrega));
    });
  }
  onRealizadoChange(value, entrega) {
    this.calculaRealizado();
  }
  calculaRealizado() {
    const meta = this.form?.controls.meta.value;
    const realizado = this.form?.controls.realizado.value;
    if (meta && realizado) {
      let totalRealizado = !isNaN(realizado) ? (realizado / meta * 100).toFixed(0) || 0 : 0;
      this.form?.controls.progresso_realizado.setValue(totalRealizado);
    }
  }
  dynamicOptionsObjetivos(row) {
    let result = [];
    let objetivo = row;
    result.push({
      label: "Excluir",
      icon: "bi bi-trash",
      color: "btn-outline-danger",
      onClick: objetivo => {
        this.removeObjetivo(objetivo);
      }
    });
    return result;
  }
  dynamicButtonsObjetivos(row) {
    let result = [];
    let objetivo = row;
    return result;
  }
  dynamicButtonsProcessos(row) {
    let result = [];
    let processo = row;
    return result;
  }
  addObjetivo() {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: _this4.dao.generateUuid(),
        _status: "ADD"
      };
    })();
  }
  removeObjetivo(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) row._status = "DELETE";
      return false;
    })();
  }
  saveObjetivo(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let consolidado = row;
      if (form.controls.planejamento_objetivo_id.value.length && _this6.inputObjetivo.selectedItem) {
        consolidado.planejamento_objetivo_id = form.controls.planejamento_objetivo_id.value;
        consolidado.objetivo = _this6.inputObjetivo.selectedItem.entity;
        return consolidado;
      }
      return undefined;
    })();
  }
  addProcesso() {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: _this7.dao.generateUuid(),
        _status: "ADD"
      };
    })();
  }
  removeProcesso(row) {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this8.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) row._status = "DELETE";
      return false;
    })();
  }
  saveProcesso(form, row) {
    var _this9 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let consolidado = row;
      if (form.controls.cadeia_processo_id.value.length && _this9.inputProcesso.selectedItem) {
        consolidado.cadeia_processo_id = form.controls.cadeia_processo_id.value;
        consolidado.processo = _this9.inputProcesso.selectedItem.entity;
        return consolidado;
      }
      return undefined;
    })();
  }
  onEntregaChange(row) {
    var _this10 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this10.entrega && _this10.entrega.selectedItem) {
        const entregaItem = _this10.entrega?.selectedEntity;
        const tipoIndicador = entregaItem.tipo_indicador;
        /**if(!this.form!.controls.descricao.value.length) {
          this.form!.controls.descricao.setValue(entregaItem?.descricao || "");
        }*/
        switch (tipoIndicador) {
          case 'QUALITATIVO':
            _this10.itensQualitativo = entregaItem.lista_qualitativos || [];
            _this10.form?.controls.meta.setValue(_this10.itensQualitativo.length ? _this10.itensQualitativo[0].key : null);
            _this10.form?.controls.realizado.setValue(_this10.itensQualitativo.length ? _this10.itensQualitativo[0].key : null);
            break;
          case 'VALOR':
            _this10.form?.controls.meta.setValue('');
            _this10.form?.controls.realizado.setValue(0);
            break;
          case 'QUANTIDADE':
            _this10.form?.controls.meta.setValue('');
            _this10.form?.controls.realizado.setValue(0);
            break;
          case 'PORCENTAGEM':
            _this10.form?.controls.meta.setValue(100);
            _this10.form?.controls.realizado.setValue(0);
            break;
          default:
            break;
        }
        //if (entregaItem.etiquetas) this.loadEtiquetas();
        _this10.loadEtiquetas();
        if (entregaItem.checklist) _this10.loadChecklist();
        _this10.calculaRealizado();
      }
    })();
  }
  loadEtiquetas() {
    this.etiquetas = this.util.merge(this.entrega?.selectedEntity.etiquetas, this.unidade?.selectedEntity.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
  }
  loadChecklist() {
    const modeloEntrega = this.entrega?.selectedEntity;
    let checkAdd = modeloEntrega.checklist.map(a => {
      return {
        id: a.id,
        texto: a.texto,
        checked: false
      };
    });
    this.checklist = checkAdd || [];
    this.form.controls.checklist.setValue(checkAdd);
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
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
}
_class = PlanoEntregaFormEntregaComponent;
_class.ɵfac = function PlanoEntregaFormEntregaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_29__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-form-entrega"]],
  viewQuery: function PlanoEntregaFormEntregaComponent_Query(rf, ctx) {
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
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.gridProcessos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.gridObjetivos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.entregas = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.planejamento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.cadeiaValor = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.inputObjetivo = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.inputProcesso = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.entrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵInheritDefinitionFeature"]],
  decls: 45,
  vars: 59,
  consts: [["initialFocus", "descricao", 3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["tabs", ""], ["key", "ENTREGAS", "label", "Entregas"], [1, "row"], ["collapse", "", 3, "title", "collapsed"], ["label", "T\u00EDtulo", "controlName", "descricao", "required", "", 3, "size", "placeholder"], ["controlName", "descricao_entrega", 3, "size", "label", "placeholder"], ["controlName", "entrega_pai_id", 3, "size", "label", "dao", "where", "selectRoute", "metadata"], [1, "row", "mt-4"], ["editable", "", 3, "control", "form", "hasAdd", "hasDelete"], ["type", "text", "title", "Texto", "field", "texto"], ["type", "options"], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", "required", "", 3, "size", "labelInfo"], ["date", "", "label", "Fim", "controlName", "data_fim", "required", "", 3, "size", "labelInfo"], ["label", "Demandante", "controlName", "unidade_id", "required", "", 3, "size", "dao"], ["unidade", ""], ["label", "Destinat\u00E1rio", "controlName", "destinatario", "required", "", 3, "size"], ["title", "Planejamento"], ["controlName", "entrega_id", "placeholder", "Selecione ou cadastre uma meta do cat\u00E1logo usando a lupa", "required", "", 3, "size", "label", "dao", "change"], ["entrega", ""], ["label", "Descri\u00E7\u00E3o da meta", "controlName", "descricao_meta", "placeholder", "Descreva a meta", 3, "size"], ["class", "row", 4, "ngIf"], ["label", "Progresso Esperado", "controlName", "progresso_esperado", "sufix", "%", 3, "size"], ["label", "Progresso Realizado", "controlName", "progresso_realizado", "sufix", "%", "disabled", "", 3, "size", "stepValue"], ["label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", 3, "size", "control", "items"], ["etiqueta", ""], ["key", "OBJETIVOS", "label", "Objetivos", 4, "ngIf"], ["key", "PROCESSOS", "label", "Processos", 4, "ngIf"], ["icon", "bi bi-graph-up-arrow", "label", "Meta", 3, "entrega", "size", "control"], ["icon", "bi bi-check-lg", "label", "Valor Inicial", "labelInfo", "Valor da meta verificado no in\u00EDcio do plano de entrega", 3, "entrega", "size", "control", "change"], ["key", "OBJETIVOS", "label", "Objetivos"], ["controlName", "planejamento_id", "disabled", "", 3, "size", "dao"], ["planejamento", ""], ["editable", "", 3, "control", "form", "orderBy", "hasDelete", "hasEdit", "add", "remove", "save"], ["gridObjetivos", ""], [3, "titleTemplate", "template", "editTemplate"], ["titleObjetivo", ""], ["columnObjetivo", ""], ["editObjetivo", ""], ["by", "objetivo.nome", 3, "header"], ["controlName", "planejamento_objetivo_id", 3, "size", "where", "dao", "selectRoute"], ["inputObjetivo", ""], ["key", "PROCESSOS", "label", "Processos"], ["controlName", "cadeia_valor_id", "disabled", "", 3, "size", "dao"], ["cadeiaValor", ""], ["gridProcessos", ""], ["titleProcessos", ""], ["processo", ""], ["editProcesso", ""], ["type", "options", 3, "dynamicButtons"], ["by", "processo.nome", 3, "header"], ["label", "", "icon", "", "controlName", "cadeia_processo_id", "label", "", 3, "size", "where", "dao", "selectRoute"], ["inputProcesso", ""]],
  template: function PlanoEntregaFormEntregaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("submit", function PlanoEntregaFormEntregaComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveEntrega();
      })("cancel", function PlanoEntregaFormEntregaComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "tabs", 1, 2)(3, "tab", 3)(4, "div", 4)(5, "separator", 5)(6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](7, "input-text", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](8, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](9, "input-textarea", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](11, "input-search", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](12, "separator", 5)(13, "div", 9)(14, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](15, "Etapas");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "grid", 10)(17, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](18, "column", 11)(19, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](20, "separator", 5)(21, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](22, "input-datetime", 13)(23, "input-datetime", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](24, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](25, "input-search", 15, 16)(27, "input-text", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](28, "separator", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](29, "div", 4)(30, "input-search", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function PlanoEntregaFormEntregaComponent_Template_input_search_change_30_listener($event) {
        return ctx.onEntregaChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](32, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](33, "input-textarea", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](34, PlanoEntregaFormEntregaComponent_div_34_Template, 3, 7, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](35, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](36, "input-number", 23)(37, "input-number", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](38, "separator", 5)(39, "div", 4)(40, "input-multiselect", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](41, "input-select", 26, 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](43, PlanoEntregaFormEntregaComponent_tab_43_Template, 14, 13, "tab", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](44, PlanoEntregaFormEntregaComponent_tab_44_Template, 14, 14, "tab", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](31);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", !ctx.isModal ? ctx.title : "");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", "Informa\u00E7\u00F5es gerais da " + ctx.lex.translate("entrega"))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("placeholder", "T\u00EDtulo da " + ctx.lex.translate("entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("label", "Descri\u00E7\u00E3o da " + ctx.lex.translate("entrega"))("placeholder", "Descreva a " + ctx.lex.translate("entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("label", "V\u00EDnculo com " + ctx.lex.translate("entrega") + " de " + ctx.lex.translate("plano de entrega") + " superior")("dao", ctx.planoEntregaEntregaDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](52, _c20, ctx.idsUnidadesAscendentes))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](55, _c22, _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction0"](54, _c21)))("metadata", _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵpureFunction1"](57, _c23, ctx.idsUnidadesAscendentes));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", "Etapas da " + ctx.lex.translate("entrega"))("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("control", ctx.form.controls.checklist)("form", ctx.formChecklist)("hasAdd", true)("hasDelete", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", "Especifica\u00E7\u00F5es da " + ctx.lex.translate("entrega"))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("labelInfo", "In\u00EDcio " + ctx.lex.translate("Plano de Entregas"));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("labelInfo", "Fim " + ctx.lex.translate("Plano de Entregas") + "(Estimativa Inicial)");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("label", ctx.lex.translate("Tipo de Meta"))("dao", ctx.entregaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", _r2 == null ? null : _r2.selectedEntity);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("stepValue", 0.01);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("title", "Caracteriza\u00E7\u00E3o da " + ctx.lex.translate("entrega"))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.etiquetas)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.etiqueta)("items", ctx.etiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.planejamentoId == null ? null : ctx.planejamentoId.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.cadeiaValorId == null ? null : ctx.cadeiaValorId.length);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_14__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_19__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_23__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_24__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_25__.SeparatorComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_26__.OrderComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__.InputNumberComponent, _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_28__.PlanoEntregaValorMetaInputComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 39783:
/*!*********************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-form-progresso/plano-entrega-form-progresso.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaFormProgressoComponent: () => (/* binding */ PlanoEntregaFormProgressoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_plano_entrega_entrega_progresso_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-progresso-dao.service */ 89048);
/* harmony import */ var src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega-progresso.model */ 54052);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component */ 36637);

var _class;











class PlanoEntregaFormProgressoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaEntregaProgresso, src_app_dao_plano_entrega_entrega_progresso_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaEntregaProgressoDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['progresso_realizado', 'realizado'].indexOf(controlName) >= 0 && !(control.value >= 0 || control.value?.length > 0)) {
        result = "Obrigatório";
      } else if (['progresso_esperado', 'meta'].indexOf(controlName) >= 0 && !(control.value > 0 || control.value?.length > 0)) {
        result = "Obrigatório";
      } else if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      } else if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Progresso da entrega") + ': ' + (entity?.entrega?.descricao || "");
    };
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaService);
    this.planoEntregaEntregaDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaEntregaDaoService);
    this.join = ["plano_entrega_entrega.entrega"];
    this.form = this.fh.FormBuilder({
      data_progresso: {
        default: new Date()
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      meta: {
        default: 100
      },
      realizado: {
        default: null
      },
      progresso_esperado: {
        default: 100
      },
      progresso_realizado: {
        default: null
      },
      usuario_id: {
        default: null
      },
      plano_entrega_entrega_id: {
        default: null
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    this.planoEntregaEntregaId = this.urlParams.get("entrega_id");
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      let {
        meta,
        realizado,
        ...entityWithout
      } = entity;
      form.patchValue(_this.util.fillForm(formValue, entityWithout));
      form.controls.meta.setValue(_this.planoEntregaService.getValor(entity.meta));
      form.controls.realizado.setValue(_this.planoEntregaService.getValor(entity.realizado));
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = new src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaEntregaProgresso();
      _this2.planoEntregaEntrega = _this2.planoEntregaEntregaId ? yield _this2.planoEntregaEntregaDao.getById(_this2.planoEntregaEntregaId, ['entrega']) : undefined;
      _this2.entity.usuario_id = _this2.auth.usuario.id;
      _this2.entity.plano_entrega_entrega_id = _this2.planoEntregaEntrega?.id;
      _this2.entity.plano_entrega_entrega = _this2.planoEntregaEntrega;
      _this2.entity.meta = _this2.planoEntregaEntrega?.meta;
      _this2.entity.realizado = _this2.planoEntregaEntrega?.realizado;
      _this2.entity.progresso_esperado = _this2.planoEntregaEntrega?.progresso_esperado;
      _this2.entity.progresso_realizado = _this2.planoEntregaEntrega?.progresso_realizado;
      _this2.entity.data_inicio = _this2.planoEntregaEntrega?.data_inicio;
      _this2.entity.data_fim = _this2.planoEntregaEntrega?.data_fim;
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let progresso = this.util.fill(new src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaEntregaProgresso(), this.entity);
      let {
        meta,
        realizado,
        ...valueWithout
      } = this.form.value;
      progresso = this.util.fillForm(progresso, valueWithout);
      progresso.meta = this.planoEntregaService.getEntregaValor(this.entity.plano_entrega_entrega?.entrega, meta);
      progresso.realizado = this.planoEntregaService.getEntregaValor(this.entity.plano_entrega_entrega?.entrega, realizado);
      resolve(progresso);
    });
  }
}
_class = PlanoEntregaFormProgressoComponent;
_class.ɵfac = function PlanoEntregaFormProgressoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-form-progresso"]],
  viewQuery: function PlanoEntregaFormProgressoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 11,
  vars: 16,
  consts: [["initialFocus", "data_progresso", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["date", "", "label", "Data do progresso", "controlName", "data_progresso", "required", "", 3, "size"], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", "required", "", 3, "size", "labelInfo"], ["date", "", "label", "Fim", "controlName", "data_fim", "required", "", 3, "size", "labelInfo"], ["icon", "bi bi-graph-up-arrow", "label", "Meta", 3, "entrega", "size", "control"], ["icon", "bi bi-check-lg", "label", "Valor Inicial", "labelInfo", "Valor da meta verificado no in\u00EDcio do plano de entrega", 3, "entrega", "size", "control"], ["label", "Progresso Esperado", "controlName", "progresso_esperado", "sufix", "%", 3, "size"], ["label", "Progresso Realizado", "controlName", "progresso_realizado", "sufix", "%", 3, "size"]],
  template: function PlanoEntregaFormProgressoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function PlanoEntregaFormProgressoComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoEntregaFormProgressoComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "input-datetime", 2)(3, "input-datetime", 3)(4, "input-datetime", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "plano-entrega-valor-meta-input", 5)(7, "plano-entrega-valor-meta-input", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "input-number", 7)(10, "input-number", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("labelInfo", "In\u00EDcio " + ctx.lex.translate("Plano de Entregas"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("labelInfo", "Fim " + ctx.lex.translate("Plano de Entregas") + "(Estimativa Inicial)");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("entrega", ctx.entity == null ? null : ctx.entity.plano_entrega_entrega == null ? null : ctx.entity.plano_entrega_entrega.entrega)("size", 6)("control", ctx.form.controls.meta);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("entrega", ctx.entity == null ? null : ctx.entity.plano_entrega_entrega == null ? null : ctx.entity.plano_entrega_entrega.entrega)("size", 6)("control", ctx.form.controls.realizado);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_7__.InputDatetimeComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_8__.InputNumberComponent, _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_9__.PlanoEntregaValorMetaInputComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 46435:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-form/plano-entrega-form.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaFormComponent: () => (/* binding */ PlanoEntregaFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/plano-entrega.model */ 74795);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../plano-entrega-list-entrega/plano-entrega-list-entrega.component */ 39285);

var _class;
















const _c0 = ["programa"];
const _c1 = ["unidade"];
const _c2 = ["nome"];
const _c3 = ["data_fim"];
class PlanoEntregaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_8__.PlanoEntrega, src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'unidade_id', 'programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      return result;
    };
    this.formValidation = form => {
      const inicio = this.form?.controls.data_inicio.value;
      const fim = this.form?.controls.data_fim.value;
      const programa = this.programa?.selectedEntity;
      if (!programa) {
        return "Obrigatório selecionar o programa";
      } else if (!this.dao?.validDateTime(inicio)) {
        return "Data de início inválida";
      } else if (!this.dao?.validDateTime(fim)) {
        return "Data de fim inválida";
      } else if (inicio > fim) {
        return "A data do fim não pode ser menor que a data do início!";
      } else {
        const entregas = this.form.controls.entregas.value || [];
        for (let entrega of entregas) {
          if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_inicio < inicio) return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data inicial anterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(inicio);
          if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_fim > fim) return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data fim posterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(fim);
        }
      }
      return undefined;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Plano de Entregas") + ': ' + (entity?.nome || "");
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeDaoService);
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_6__.ProgramaDaoService);
    this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorDaoService);
    this.planejamentoInstitucionalDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoDaoService);
    this.join = ["entregas.entrega", "entregas.objetivos.objetivo", "entregas.processos.processo", "entregas.unidade", "unidade", 'entregas.reacoes.usuario:id,nome,apelido'];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      unidade_id: {
        default: ""
      },
      plano_entrega_id: {
        default: null
      },
      planejamento_id: {
        default: null
      },
      cadeia_valor_id: {
        default: null
      },
      programa_id: {
        default: null
      },
      entregas: {
        default: []
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
      _this.cdRef.detectChanges();
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = new src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_8__.PlanoEntrega();
      _this2.entity.unidade_id = _this2.auth.unidade?.id || "";
      _this2.entity.unidade = _this2.auth.unidade;
      const di = new Date(_this2.entity.data_inicio).toLocaleDateString();
      const df = _this2.entity.data_fim ? new Date(_this2.entity.data_fim).toLocaleDateString() : new Date().toLocaleDateString();
      _this2.entity.nome = _this2.auth.unidade.sigla + " - " + di + " - " + df;
      _this2.loadData(_this2.entity, _this2.form);
    })();
  }
  saveData(form) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        let planoEntrega = _this3.util.fill(new src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_8__.PlanoEntrega(), _this3.entity);
        planoEntrega = _this3.util.fillForm(planoEntrega, _this3.form.value);
        planoEntrega.entregas = planoEntrega.entregas?.filter(x => x._status) || [];
        resolve(planoEntrega);
      });
    })();
  }
  dynamicButtons(row) {
    let result = [];
    return result;
  }
  onDataChange() {
    this.sugereNome();
  }
  onUnidadeChange() {
    this.sugereNome();
  }
  sugereNome() {
    if (this.action == 'new') {
      const sigla = this.unidade?.selectedItem ? this.unidade?.selectedItem?.entity.sigla : this.auth.unidade?.sigla;
      const di = new Date(this.form.controls.data_inicio.value).toLocaleDateString();
      const df = this.form.controls.data_fim.value ? " - " + new Date(this.form.controls.data_fim.value).toLocaleDateString() : '';
      this.form.controls.nome.setValue(sigla + " - " + di + df);
    }
  }
  somaDia(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  onProgramaChange() {
    const dias = this.programa?.selectedEntity?.prazo_max_plano_entrega;
    const data = this.somaDia(this.entity.data_inicio, dias);
    if (!this.entity?.data_fim) {
      this.form.controls.data_fim.setValue(new Date(data));
      this.dataFim?.change.emit();
    }
  }
}
_class = PlanoEntregaFormComponent;
_class.ɵfac = function PlanoEntregaFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-entrega-form"]],
  viewQuery: function PlanoEntregaFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c1, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c2, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c3, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.nomePE = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.dataFim = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 20,
  vars: 27,
  consts: [["initialFocus", "entregas", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["controlName", "unidade_id", "required", "", 3, "size", "disabled", "dao", "change"], ["unidade", ""], ["controlName", "programa_id", "required", "", 3, "size", "disabled", "dao", "change"], ["programa", ""], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", "required", "", 3, "size", "labelInfo", "change"], ["date", "", "label", "Fim", "controlName", "data_fim", "required", "", 3, "size", "labelInfo", "change"], ["data_fim", ""], ["label", "Nome", "controlName", "nome", "required", "", 3, "size"], ["nome", ""], ["controlName", "planejamento_id", "label", "Planejamento Institucional", 3, "size", "emptyValue", "dao"], ["planejamento", ""], ["controlName", "cadeia_valor_id", "label", "Cadeia de Valor", 3, "size", "emptyValue", "dao"], ["cadeiaValor", ""], ["title", "Entregas"], ["noPersist", "", 3, "disabled", "control", "planejamentoId", "cadeiaValorId", "unidadeId", "dataFim"], ["entregas", ""]],
  template: function PlanoEntregaFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("submit", function PlanoEntregaFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanoEntregaFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div")(2, "div", 1)(3, "input-search", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PlanoEntregaFormComponent_Template_input_search_change_3_listener() {
        return ctx.onUnidadeChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "input-search", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PlanoEntregaFormComponent_Template_input_search_change_5_listener() {
        return ctx.onProgramaChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "input-datetime", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PlanoEntregaFormComponent_Template_input_datetime_change_7_listener() {
        return ctx.onDataChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "input-datetime", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PlanoEntregaFormComponent_Template_input_datetime_change_8_listener() {
        return ctx.onDataChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](11, "input-text", 9, 10)(13, "input-search", 11, 12)(15, "input-search", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](17, "separator", 15)(18, "plano-entrega-list-entrega", 16, 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("disabled", (ctx.entity == null ? null : ctx.entity.id) ? "disabled" : undefined)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("disabled", (ctx.entity == null ? null : ctx.entity.id) ? "disabled" : undefined)("dao", ctx.programaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2)("labelInfo", "In\u00EDcio " + ctx.lex.translate("Plano de Entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2)("labelInfo", "Fim " + ctx.lex.translate("Plano de Entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("emptyValue", null)("dao", ctx.planejamentoInstitucionalDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("emptyValue", null)("dao", ctx.cadeiaValorDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx.formDisabled)("control", ctx.form.controls.entregas)("planejamentoId", ctx.form.controls.planejamento_id.value)("cadeiaValorId", ctx.form.controls.cadeia_valor_id.value)("unidadeId", ctx.form.controls.unidade_id.value)("dataFim", ctx.form.controls.data_fim.value);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__.InputDatetimeComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__.SeparatorComponent, _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_14__.PlanoEntregaListEntregaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 65659:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list-entrega-list/plano-entrega-list-entrega-list.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaListEntregaListComponent: () => (/* binding */ PlanoEntregaListEntregaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ 32398);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
var _class;


















function PlanoEntregaListEntregaListComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h3", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function PlanoEntregaListEntregaListComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "toolbar", 19);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("buttons", ctx_r1.buttons);
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "badge", 20)(1, "br")(2, "badge", 21)(3, "br")(4, "badge", 22);
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", row_r12.descricao || "(n\u00E3o informado)");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("icon", ctx_r3.entityService.getIcon("Unidade"))("label", row_r12.unidade.sigla || "(n\u00E3o informado)");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", row_r12.destinatario || "(n\u00E3o informado)");
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r5.dao.getDateFormatted(row_r13.data_inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r5.dao.getDateFormatted(row_r13.data_fim));
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_16_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", row_r14.entrega.nome || row_r14.entrega_pai.descricao, " ");
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, PlanoEntregaListEntregaListComponent_ng_template_16_span_0_Template, 3, 1, "span", 23);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r14.entrega);
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "badge", 26)(1, "br")(2, "badge", 26);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", ctx_r9.planoEntregaService.getValorMeta(row_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", ctx_r9.planoEntregaService.getValorRealizado(row_r17));
  }
}
function PlanoEntregaListEntregaListComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "progress-bar", 27);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("value", row_r18.progresso_realizado);
  }
}
class PlanoEntregaListEntregaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaEntrega, src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaEntregaDaoService);
    this.injector = injector;
    this.buttons = [];
    this.idsUnidadesAscendentes = [];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      if (this.idsUnidadesAscendentes.length) result.push(["plano_entrega.unidade_id", "in", this.idsUnidadesAscendentes]);
      if (form.unidade_id?.length) {
        // unidade demandante
        result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.descricao?.length) {
        result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
      }
      if (form.descricao?.length) {
        result.push(["descricao_entrega", "like", "%" + form.descricao_entrega.trim().replace(" ", "%") + "%"]);
      }
      if (form.destinatario?.length) {
        result.push(["destinatario", "like", "%" + form.destinatario.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaEntregaDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaService);
    this.title = this.lex.translate("Entregas");
    this.filter = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      descricao_entrega: {
        default: ""
      },
      unidade_id: {
        default: ""
      },
      destinatario: {
        default: ""
      }
    });
    this.join = ["entrega:id,nome", "entrega_pai:id,descricao", "unidade:id,sigla"];
  }
  ngOnInit() {
    super.ngOnInit();
    this.idsUnidadesAscendentes = this.metadata?.idsUnidadesAscendentes || this.idsUnidadesAscendentes;
    this.filter?.controls.unidade_id.setValue(this.idsUnidadesAscendentes[0]);
  }
  dynamicOptions(row) {
    let result = [];
    result.push({
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: objetivo => this.go.navigate({
        route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult']
      }, {
        modal: true
      })
    });
    return result;
  }
  filterClear(filter) {
    super.filterClear(filter);
  }
}
_class = PlanoEntregaListEntregaListComponent;
_class.ɵfac = function PlanoEntregaListEntregaListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-entrega-list-entrega-list"]],
  viewQuery: function PlanoEntregaListEntregaListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 26,
  vars: 32,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "orderBy", "groupBy", "join", "selectable", "select"], [3, "buttons", 4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Unidade", "controlName", "unidade_id", 3, "size", "control", "dao"], ["label", "T\u00EDtulo da entrega", "controlName", "descricao", "placeholder", "T\u00EDtulo", 3, "size", "control"], ["label", "Descri\u00E7\u00E3o da entrega", "controlName", "descricao_entrega", "placeholder", "Descri\u00E7\u00E3o", 3, "size", "control"], [3, "title", "template"], ["columnEntregaCliente", ""], ["columnDatas", ""], ["title", "Entrega", 3, "template"], ["columnIndicador", ""], ["columnMetaRealizado", ""], ["title", "Progresso", 3, "template"], ["columnProgresso", ""], ["type", "options"], [3, "rows"], [1, "my-2"], [3, "buttons"], ["icon", "bi bi-textarea-t", "color", "light", 3, "label"], ["color", "success", 3, "icon", "label"], ["icon", "bi bi-mailbox", "color", "light", 3, "label"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-list-check"], ["color", "light", 3, "label"], ["color", "success", 3, "value"]],
  template: function PlanoEntregaListEntregaListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, PlanoEntregaListEntregaListComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function PlanoEntregaListEntregaListComponent_Template_grid_select_1_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, PlanoEntregaListEntregaListComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "input-search", 5)(6, "input-text", 6)(7, "input-text", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "columns")(9, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](10, PlanoEntregaListEntregaListComponent_ng_template_10_Template, 5, 4, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](13, PlanoEntregaListEntregaListComponent_ng_template_13_Template, 4, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, PlanoEntregaListEntregaListComponent_ng_template_16_Template, 1, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](18, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](19, PlanoEntregaListEntregaListComponent_ng_template_19_Template, 3, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](21, "column", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](22, PlanoEntregaListEntregaListComponent_ng_template_22_Template, 1, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](24, "column", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](25, "pagination", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](11);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](14);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](17);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](20);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dao", ctx.dao)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.descricao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.descricao_entrega);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", "Entrega\nDemandante\nDestinat\u00E1rio")("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", "Data In\u00EDcio\nData Fim")("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", "Meta\nRealizado")("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_14__.ProgressBarComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 39285:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list-entrega/plano-entrega-list-entrega.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaListEntregaComponent: () => (/* binding */ PlanoEntregaListEntregaComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ 32398);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/reaction/reaction.component */ 32877);
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ 81419);
/* harmony import */ var _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component */ 36637);

var _class;






















const _c0 = ["etiqueta"];
function PlanoEntregaListEntregaComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1, "Entregas: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const separator_r17 = ctx.separator;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", separator_r17 == null ? null : separator_r17.text);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_5_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 21);
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("icon", ctx_r19.entityService.getIcon("Unidade"))("label", row_r18.unidade.sigla);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_5_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 22);
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", row_r18.destinatario);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_5_reaction_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "reaction", 23);
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", row_r18);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, PlanoEntregaListEntregaComponent_ng_template_5_badge_3_Template, 1, 2, "badge", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, PlanoEntregaListEntregaComponent_ng_template_5_badge_4_Template, 1, 1, "badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, PlanoEntregaListEntregaComponent_ng_template_5_reaction_5_Template, 1, 1, "reaction", 20);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r18.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r18.unidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r18.destinatario == null ? null : row_r18.destinatario.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r3.execucao);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_8_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 25);
  }
  if (rf & 2) {
    const etiqueta_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("lookup", etiqueta_r27);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanoEntregaListEntregaComponent_ng_template_8_badge_0_Template, 1, 1, "badge", 24);
  }
  if (rf & 2) {
    const row_r25 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", row_r25.etiquetas);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "input-multiselect", 26)(1, "input-select", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("details", function PlanoEntregaListEntregaComponent_ng_template_10_Template_input_select_details_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r30.onEtiquetaConfigClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r7.formEdit.controls.etiquetas)("addItemHandle", ctx_r7.addItemHandleEtiquetas.bind(ctx_r7));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r7.formEdit.controls.etiqueta)("items", ctx_r7.etiquetas);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_13_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r33.dao.getDateFormatted(row_r32.data_inicio), "");
  }
}
function PlanoEntregaListEntregaComponent_ng_template_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r34.dao.getDateFormatted(row_r32.data_fim), "");
  }
}
function PlanoEntregaListEntregaComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanoEntregaListEntregaComponent_ng_template_13_span_0_Template, 2, 1, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, PlanoEntregaListEntregaComponent_ng_template_13_span_2_Template, 2, 1, "span", 29);
  }
  if (rf & 2) {
    const row_r32 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r32.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r32.data_fim);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 30)(1, "br")(2, "badge", 31);
  }
  if (rf & 2) {
    const row_r37 = ctx.row;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("textValue", ctx_r11.planoEntregaService.getValorMeta(row_r37));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("textValue", ctx_r11.planoEntregaService.getValorRealizado(row_r37));
  }
}
function PlanoEntregaListEntregaComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "plano-entrega-valor-meta-input", 32)(1, "plano-entrega-valor-meta-input", 33);
  }
  if (rf & 2) {
    const row_r38 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entrega", row_r38.entrega)("size", 6)("control", ctx_r13.form.controls.meta);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entrega", row_r38.entrega)("size", 6)("control", ctx_r13.form.controls.realizado)("change", ctx_r13.onRealizadaChange.bind(ctx_r13));
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_tr_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "i", 42);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_tr_1_i_2_Template, 1, 0, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "td", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", check_r47.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](check_r47.texto);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_tr_1_Template, 5, 2, "tr", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", row_r43.checklist);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "separator", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_table_1_Template, 2, 1, "table", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r43.checklist == null ? null : row_r43.checklist.length);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "progress-bar", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_1_separator_1_Template, 2, 2, "separator", 37);
  }
  if (rf & 2) {
    const row_r43 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("value", row_r43.progresso_realizado)("goal", row_r43.progresso_esperado);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r43.checklist == null ? null : row_r43.checklist.length);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_3_separator_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "separator", 45);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_3_table_2_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "input-switch", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "td", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r55 = ctx.$implicit;
    const i_r56 = ctx.index;
    const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("source", ctx_r54.checklist)("path", i_r56 + ".checked");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](check_r55.texto);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_3_table_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_3_table_2_tr_1_Template, 5, 4, "tr", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r53.checklist);
  }
}
function PlanoEntregaListEntregaComponent_column_20_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-number", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_3_separator_1_Template, 1, 0, "separator", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, PlanoEntregaListEntregaComponent_column_20_ng_template_3_table_2_Template, 2, 1, "table", 29);
  }
  if (rf & 2) {
    const row_r51 = ctx.row;
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r42.formEdit.controls.progresso_realizado);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r51.checklist == null ? null : row_r51.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r51.checklist == null ? null : row_r51.checklist.length);
  }
}
function PlanoEntregaListEntregaComponent_column_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "column", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_column_20_ng_template_1_Template, 2, 3, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, PlanoEntregaListEntregaComponent_column_20_ng_template_3_Template, 3, 4, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](2);
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](4);
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Progresso\nChecklist")("width", 200)("template", _r39)("editTemplate", _r39)("columnEditTemplate", ctx_r14.selectable ? undefined : _r41)("edit", ctx_r14.selectable ? undefined : ctx_r14.onColumnChecklistEdit.bind(ctx_r14))("save", ctx_r14.selectable ? undefined : ctx_r14.onColumnChecklistSave.bind(ctx_r14));
  }
}
function PlanoEntregaListEntregaComponent_ng_template_22_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 49);
  }
  if (rf & 2) {
    const row_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", row_r57.entrega == null ? null : row_r57.entrega.nome);
  }
}
function PlanoEntregaListEntregaComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanoEntregaListEntregaComponent_ng_template_22_badge_0_Template, 1, 1, "badge", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "comentarios-widget", 48);
  }
  if (rf & 2) {
    const row_r57 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r57.entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", row_r57)("selectable", !ctx_r16.execucao || !!(ctx_r16.grid == null ? null : ctx_r16.grid.editing))("grid", ctx_r16.grid)("save", ctx_r16.refreshComentarios.bind(ctx_r16));
  }
}
class PlanoEntregaListEntregaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__.PageFrameBase {
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
  }
  get entity() {
    return super.entity;
  }
  set planejamentoId(value) {
    if (this._planejamentoId != value) {
      this._planejamentoId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  }

  get planejamentoId() {
    return this._planejamentoId;
  }
  set cadeiaValorId(value) {
    if (this._cadeiaValorId != value) {
      this._cadeiaValorId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planejamento e remove-los
      // será removido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  }

  get cadeiaValorId() {
    return this._cadeiaValorId;
  }
  set unidadeId(value) {
    if (this._unidadeId != value) {
      this._unidadeId = value;
      // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
      // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
    }
  }

  get unidadeId() {
    return this._unidadeId;
  }
  set dataFim(value) {
    if (this._dataFim != value) {
      this._dataFim = value;
    }
  }
  get dataFim() {
    return this._dataFim;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue([]);
    return this.gridControl.value;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.disabled = false;
    this.execucao = false;
    this.entityToControl = value => value.entregas || [];
    this.options = [];
    this.planoEntregaId = "";
    this.etiquetas = [];
    this.selectable = false;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      result.push(["plano_entrega_id", "==", this.planoEntregaId]);
      return result;
    };
    this.title = this.lex.translate("Entregas");
    this.join = ["unidade", "entrega", "reacoes.usuario:id,nome,apelido"];
    this.code = "MOD_PENT";
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_19__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaEntregaDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaService);
    this.form = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      meta: {
        default: ""
      },
      realizado: {
        default: null
      },
      entrega_id: {
        default: null
      },
      unidade_id: {
        default: null
      },
      progresso_esperado: {
        default: null
      },
      progresso_realizado: {
        default: null
      },
      destinatario: {
        default: null
      },
      etiquetas: {
        default: []
      }
    }, this.cdRef, this.validate);
    this.formEdit = this.fh.FormBuilder({
      progresso_realizado: {
        default: 0
      },
      etiquetas: {
        default: []
      },
      etiqueta: {
        default: null
      }
    });
    // Testa se o usuário possui permissão para exibir dados da entrega do plano de entregas
    this.addOption(Object.assign({
      onClick: this.consult.bind(this)
    }, this.OPTION_INFORMACOES), "MOD_PENT");
    this.addOption(Object.assign({
      onClick: this.delete.bind(this)
    }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_EXCL");
    this.addOption(Object.assign({
      onClick: this.showLogs.bind(this)
    }, this.OPTION_LOGS), "MOD_AUDIT_LOG");
  }
  ngOnInit() {
    super.ngOnInit();
    this.planoEntregaId = this.urlParams.get("id") || "";
  }
  get isDisabled() {
    return this.formDisabled || this.disabled;
  }
  add() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let entrega = new src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaEntrega({
        _status: "ADD",
        id: _this.dao.generateUuid(),
        plano_entrega_id: _this.entity?.id
      });
      _this.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega']
      }, {
        metadata: {
          plano_entrega: _this.entity,
          planejamento_id: _this.planejamentoId,
          cadeia_valor_id: _this.cadeiaValorId,
          unidade_id: _this.unidadeId,
          data_fim: _this.dataFim,
          entrega: entrega
        },
        modalClose: function () {
          var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
            if (modalResult) {
              try {
                _this.isNoPersist ? _this.items.push(modalResult) : _this.items.push(yield _this.dao.save(modalResult, _this.join));
                _this.cdRef.detectChanges();
              } catch (error) {
                _this.error(error?.error || error?.message || error);
              }
            }
            ;
          });
          return function modalClose(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    })();
  }
  dynamicOptions(row) {
    return !this.execucao && !this.isDisabled ? this.options : [];
  }
  dynamicButtons(row) {
    const btns = [];
    if (this.isDisabled) btns.push(Object.assign({
      onClick: this.consult.bind(this)
    }, this.OPTION_INFORMACOES));
    if (this.execucao) btns.push({
      label: "Histórico de execução",
      icon: "bi bi-activity",
      color: 'btn-outline-info',
      onClick: this.showProgresso.bind(this)
    });
    btns.push({
      label: "Detalhes",
      icon: "bi bi-eye",
      color: 'btn-outline-success',
      onClick: this.showDetalhes.bind(this)
    });
    return btns;
  }
  edit(entrega) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.execucao) {
        _this2.grid.edit(entrega);
      } else {
        entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
        let index = _this2.items.indexOf(entrega);
        _this2.go.navigate({
          route: ['gestao', 'plano-entrega', 'entrega']
        }, {
          metadata: {
            plano_entrega: _this2.entity,
            planejamento_id: _this2.planejamentoId,
            cadeia_valor_id: _this2.cadeiaValorId,
            unidade_id: _this2.unidadeId,
            entrega: entrega
          },
          modalClose: function () {
            var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
              if (modalResult) {
                if (!_this2.isNoPersist) yield _this2.dao?.save(modalResult);
                _this2.items[index] = modalResult;
              }
              ;
            });
            return function modalClose(_x2) {
              return _ref2.apply(this, arguments);
            };
          }()
        });
      }
    })();
  }
  load(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.form.patchValue(row);
      _this3.form.controls.meta.setValue(_this3.planoEntregaService.getValor(row.meta));
      _this3.form.controls.realizado.setValue(_this3.planoEntregaService.getValor(row.realizado));
      _this3.cdRef.detectChanges();
    })();
  }
  save(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this4.form.markAllAsTouched();
      if (form.valid) {
        _this4.submitting = true;
        try {
          result = yield _this4.dao?.update(row.id, {
            realizado: _this4.planoEntregaService.getEntregaValor(row.entrega, form.controls.realizado.value),
            progresso_realizado: form.controls.progresso_realizado.value
          }, _this4.join);
        } finally {
          _this4.submitting = false;
        }
      }
      return result;
    })();
  }
  delete(entrega) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) {
        let index = _this5.items.indexOf(entrega);
        if (_this5.isNoPersist) {
          entrega._status = "DELETE";
        } else {
          _this5.dao.delete(entrega).then(() => {
            //this.grid!.query!.removeId(entrega.id);
            _this5.items.splice(index, 1);
            _this5.cdRef.detectChanges();
            _this5.dialog.topAlert("Registro excluído com sucesso!", 5000);
          }).catch(error => {
            _this5.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
          });
          ;
        }
        ;
      }
    })();
  }
  consult(entrega) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "consult"]
      }, {
        metadata: {
          plano_entrega: _this6.entity,
          planejamento_id: _this6.planejamentoId,
          cadeia_valor_id: _this6.cadeiaValorId,
          unidade_id: _this6.unidadeId,
          entrega: entrega
        }
      });
    })();
  }
  showLogs(entrega) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.go.navigate({
        route: ['logs', 'change', entrega.id, 'consult']
      });
    })();
  }
  showPlanejamento(objetivo_id) {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this8.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo_id]
      }, {
        modal: true
      });
    })();
  }
  showCadeiaValor(processo_id) {
    var _this9 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this9.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo_id]
      }, {
        modal: true
      });
    })();
  }
  showProgresso(entrega) {
    var _this10 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this10.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', 'progresso', entrega.id]
      }, {
        modal: true,
        modalClose: modalResult => {
          _this10.parent?.refresh(_this10.entity?.id);
        }
      });
    })();
  }
  showDetalhes(entrega) {
    var _this11 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this11.go.navigate({
        route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "detalhes"]
      }, {
        metadata: {
          plano_entrega: _this11.entity,
          planejamento_id: _this11.planejamentoId,
          cadeia_valor_id: _this11.cadeiaValorId,
          unidade_id: _this11.unidadeId,
          entrega: entrega
        }
      });
    })();
  }
  refreshComentarios(modalResult) {
    /* Atualiza os comentários após ser salvo pela própria tela de comentarios (persistent) */
    let row = this.items.find(x => x.id == modalResult.id);
    if (row) row.comentarios = modalResult.comentarios || [];
  }
  onRealizadaChange() {
    const meta = this.form?.controls.meta.value;
    const realizado = this.form?.controls.realizado.value;
    if (meta && realizado) {
      let totalRealizado = !isNaN(realizado) ? (realizado / meta * 100).toFixed(0) || 0 : 0;
      this.form?.controls.progresso_realizado.setValue(totalRealizado);
    }
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.formEdit.controls.etiqueta.value, key)) {
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
  onColumnEtiquetasEdit(row) {
    var _this12 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this12.formEdit.controls.etiquetas.setValue(row.etiquetas);
      _this12.formEdit.controls.etiqueta.setValue(null);
      _this12.etiquetas = _this12.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
      _this12.etiquetas = _this12.util.merge(_this12.etiquetas, _this12.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
    })();
  }
  onColumnEtiquetasSave(row) {
    var _this13 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const saved = yield _this13.dao.update(row.id, {
          etiquetas: _this13.formEdit.controls.etiquetas.value
        });
        row.etiquetas = _this13.formEdit.controls.etiquetas.value;
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
  onColumnChecklistEdit(row) {
    var _this14 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this14.formEdit.controls.progresso_realizado.setValue(row.progresso_realizado);
      _this14.checklist = _this14.util.clone(row.checklist);
    })();
  }
  onColumnChecklistSave(row) {
    var _this15 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let realizado = Math.round(parseInt(_this15.planoEntregaService.getValorMeta(row)) * _this15.formEdit.controls.progresso_realizado.value / 100);
      try {
        const saved = yield _this15.dao.update(row.id, {
          progresso_realizado: _this15.formEdit.controls.progresso_realizado.value,
          realizado: _this15.planoEntregaService.getEntregaValor(row.entrega, realizado),
          checklist: _this15.checklist
        });
        row.progresso_realizado = _this15.formEdit.controls.progresso_realizado.value;
        row.checklist = _this15.checklist;
        if (typeof row.realizado.porcentagem != "undefined") {
          row.realizado.porcentagem = realizado;
        } else if (typeof row.realizado.quantitativo != "undefined") {
          row.realizado.quantitativo = realizado;
        } else if (typeof row.realizado.valor != "undefined") {
          row.realizado.valor = realizado;
        }
        ;
        return !!saved;
      } catch (error) {
        return false;
      }
    })();
  }
  getObjetivos(row) {
    return row.objetivos.filter(x => x._status != 'DELETE');
  }
}
_class = PlanoEntregaListEntregaComponent;
_class.ɵfac = function PlanoEntregaListEntregaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-list-entrega"]],
  viewQuery: function PlanoEntregaListEntregaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
    }
  },
  inputs: {
    cdRef: "cdRef",
    disabled: "disabled",
    parent: "parent",
    noPersist: "noPersist",
    control: "control",
    entity: "entity",
    planejamentoId: "planejamentoId",
    cadeiaValorId: "cadeiaValorId",
    unidadeId: "unidadeId",
    dataFim: "dataFim",
    execucao: "execucao"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 25,
  vars: 35,
  consts: [[3, "items", "form", "groupTemplate", "minHeight", "editable", "hasAdd", "add", "hasEdit", "load", "save", "selectable"], ["groupEntregas", ""], [3, "title", "template", "editTemplate"], ["columnEntregaCliente", ""], [3, "title", "width", "template", "editTemplate", "columnEditTemplate", "edit", "save"], ["columnEtiquetas", ""], ["columnEtiquetasEdit", ""], ["columnDatas", ""], [3, "title", "width", "template", "editTemplate"], ["columnMetaRealizado", ""], ["editMetaRealizado", ""], [3, "title", "width", "template", "editTemplate", "columnEditTemplate", "edit", "save", 4, "ngIf"], ["columnEntregaCometario", ""], ["type", "options", 3, "onEdit", "dynamicButtons", "dynamicOptions"], [1, "grid-group-text"], [1, "text-wrap"], ["color", "primary", 3, "label"], [1, "d-block"], ["color", "light", 3, "icon", "label", 4, "ngIf"], ["color", "light", "icon", "bi bi-mailbox", 3, "label", 4, "ngIf"], ["origem", "PLANO_ENTREGA_ENTREGA", 3, "entity", 4, "ngIf"], ["color", "light", 3, "icon", "label"], ["color", "light", "icon", "bi bi-mailbox", 3, "label"], ["origem", "PLANO_ENTREGA_ENTREGA", 3, "entity"], [3, "lookup", 4, "ngFor", "ngForOf"], [3, "lookup"], ["controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", "nullable", "", "itemNull", "- Selecione -", "detailsButton", "", "detailsButtonIcon", "bi bi-tools", 3, "size", "control", "items", "details"], ["etiqueta", ""], [4, "ngIf"], ["icon", "bi bi-graph-up-arrow", "color", "light", "hint", "Planejada", 3, "textValue"], ["icon", "bi bi-check-lg", "color", "light", "hint", "Realizada", 3, "textValue"], ["icon", "bi bi-graph-up-arrow", "disabled", "", "label", "Meta", 3, "entrega", "size", "control"], ["icon", "bi bi-check-lg", "label", "Realizada", 3, "entrega", "size", "control", "change"], ["columnProgChecklist", ""], ["columnChecklistEdit", ""], ["color", "success", 3, "value", "goal"], ["small", "", "title", "Checklist", "collapse", "", 3, "collapsed", 4, "ngIf"], ["small", "", "title", "Checklist", "collapse", "", 3, "collapsed"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["label", "Realizado", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso_realizado", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "control"], ["small", "", "title", "Checklist", 4, "ngIf"], ["small", "", "title", "Checklist"], ["scale", "small", 3, "size", "source", "path"], ["color", "light", "icon", "bi bi-list-check", 3, "label", 4, "ngIf"], ["origem", "PLANO_ENTREGA_ENTREGA", 3, "entity", "selectable", "grid", "save"], ["color", "light", "icon", "bi bi-list-check", 3, "label"]],
  template: function PlanoEntregaListEntregaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaListEntregaComponent_ng_template_1_Template, 4, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "columns")(4, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, PlanoEntregaListEntregaComponent_ng_template_5_Template, 6, 4, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](7, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](8, PlanoEntregaListEntregaComponent_ng_template_8_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](10, PlanoEntregaListEntregaComponent_ng_template_10_Template, 3, 6, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](12, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](13, PlanoEntregaListEntregaComponent_ng_template_13_Template, 3, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](15, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](16, PlanoEntregaListEntregaComponent_ng_template_16_Template, 3, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](18, PlanoEntregaListEntregaComponent_ng_template_18_Template, 2, 7, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](20, PlanoEntregaListEntregaComponent_column_20_Template, 5, 7, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](21, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](22, PlanoEntregaListEntregaComponent_ng_template_22_Template, 2, 5, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](24, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](2);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](6);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](9);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](11);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](14);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](17);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](19);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("groupTemplate", _r0)("minHeight", 300)("editable", ctx.isDisabled ? undefined : "true")("hasAdd", !ctx.isDisabled && ctx.auth.hasPermissionTo("MOD_PENT_ENTR_INCL") && !ctx.execucao)("add", ctx.add.bind(ctx))("hasEdit", !ctx.isDisabled && ctx.auth.hasPermissionTo("MOD_PENT_ENTR_EDT"))("load", ctx.load.bind(ctx))("save", ctx.save.bind(ctx))("selectable", ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Entrega\nDemandante/Destinat\u00E1rio")("template", _r2)("editTemplate", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Etiquetas")("width", 100)("template", _r4)("editTemplate", _r4)("columnEditTemplate", ctx.selectable ? undefined : _r6)("edit", ctx.selectable ? undefined : ctx.onColumnEtiquetasEdit.bind(ctx))("save", ctx.selectable ? undefined : ctx.onColumnEtiquetasSave.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Data In\u00EDcio\nData Fim")("template", _r8)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Meta")("width", 100)("template", _r10)("editTemplate", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.execucao);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.lex.translate("Modelo de Entrega") + "\nComent\u00E1rios")("template", _r15)("editTemplate", _r15);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("onEdit", ctx.edit.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx))("dynamicOptions", ctx.dynamicOptions.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__.InputSwitchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_14__.ProgressBarComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__.InputNumberComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_16__.ReactionComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_17__.ComentariosWidgetComponent, _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_18__.PlanoEntregaValorMetaInputComponent],
  styles: [".objetivo[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #ddd;\n  padding: 2px 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vcGxhbm8tZW50cmVnYS9wbGFuby1lbnRyZWdhLWxpc3QtZW50cmVnYS9wbGFuby1lbnRyZWdhLWxpc3QtZW50cmVnYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDZCQUFBO0VBQ0EsY0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLm9iamV0aXZvIHtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcclxuICBwYWRkaW5nOiAycHggMDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 21373:
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list-logs/plano-entrega-list-logs.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaListLogsComponent: () => (/* binding */ PlanoEntregaListLogsComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_change_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/change-dao.service */ 38958);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_models_change_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/change.model */ 60039);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
var _class;

















const _c0 = ["selectResponsaveis"];
function PlanoEntregaListLogsComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Respons\u00E1vel");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function PlanoEntregaListLogsComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", row_r14.responsavel, " ");
  }
}
function PlanoEntregaListLogsComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Criado em");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function PlanoEntregaListLogsComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r8.util.getDateTimeFormatted(row_r16.date_time));
  }
}
function PlanoEntregaListLogsComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 2)(1, "div", 17)(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "Atributos");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "div", 18)(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6, "Valores");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8, "Atuais");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "div", 18)(10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](11, "Valores");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](13, "Anteriores");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
}
function PlanoEntregaListLogsComponent_ng_template_27_tr_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "tr")(1, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const dif_r20 = ctx.$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](dif_r20[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r19.action == "EDIT" || ctx_r19.action == "ADD" ? dif_r20[1] : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r19.action == "EDIT" ? dif_r20[2] : ctx_r19.action == "ADD" ? "" : dif_r20[1]);
  }
}
function PlanoEntregaListLogsComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "separator", 19)(1, "table")(2, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, PlanoEntregaListLogsComponent_ng_template_27_tr_3_Template, 7, 3, "tr", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("collapse", "collapse")("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r12.preparaDelta(row_r18));
  }
}
class PlanoEntregaListLogsComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__.PageListBase {
  constructor(injector, dao) {
    super(injector, src_app_models_change_model__WEBPACK_IMPORTED_MODULE_3__.Change, src_app_dao_change_dao_service__WEBPACK_IMPORTED_MODULE_1__.ChangeDaoService);
    this.injector = injector;
    this.responsaveis = [];
    this.planoId = "";
    this.action = "";
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      result.push(["table_name", "==", "planos_entregas"]);
      result.push(["row_id", "==", this.planoId]);
      if (form.responsavel_id?.length) {
        result.push(["user_id", "==", form.responsavel_id == "null" ? null : form.responsavel_id]);
      }
      ;
      if (form.data_inicio) {
        result.push(["date_time", ">=", form.data_inicio]);
      }
      ;
      if (form.data_fim) {
        result.push(["date_time", "<=", form.data_fim]);
      }
      ;
      if (form.tipo?.length) {
        result.push(["type", "==", form.tipo]);
      }
      ;
      return result;
    };
    /* Inicializações */
    this.planoEntregaDao = injector.get(src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaDaoService);
    this.title = "Logs de Planos de Entregas";
    this.filter = this.fh.FormBuilder({
      responsavel_id: {
        default: ""
      },
      data_inicio: {
        default: ""
      },
      data_fim: {
        default: ""
      },
      tipo: {
        default: ""
      }
    });
    this.orderBy = [['id', 'desc']];
  }
  ngOnInit() {
    super.ngOnInit();
    this.planoId = this.urlParams?.get("id") || "";
    this.planoEntregaDao.getById(this.planoId).then(plano => this.planoEntrega = plano);
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    // this.selectResponsaveis!.loading = true;
    // this.dao?.showResponsaveis().then(responsaveis => {
    //   this.responsaveis = responsaveis || [];
    //   this.selectResponsaveis!.loading = false;
    // });
  }

  filterClear(filter) {
    filter.controls.responsavel_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.tipo.setValue("");
    super.filterClear(filter);
  }
  preparaDelta(row) {
    this.action = row.type;
    let novoDelta = row.delta instanceof Array ? row.delta : Object.entries(row.delta);
    novoDelta.forEach(element => {
      if (element[1] instanceof Date) element[1] = new Date(element[1]).toUTCString();
      if (element.length > 2 && element[2] instanceof Date) element[2] = new Date(element[2]).toUTCString();
    });
    return novoDelta;
  }
}
_class = PlanoEntregaListLogsComponent;
_class.ɵfac = function PlanoEntregaListLogsComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_dao_change_dao_service__WEBPACK_IMPORTED_MODULE_1__.ChangeDaoService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-list-logs"]],
  viewQuery: function PlanoEntregaListLogsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.selectResponsaveis = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 31,
  vars: 30,
  consts: [[3, "dao", "hasEdit", "title", "orderBy", "groupBy", "join"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Respons\u00E1vel pelo registro", "controlName", "responsavel_id", 3, "control", "items"], ["selectResponsaveis", ""], ["datetime", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "In\u00EDcio dos registros", 3, "size", "control"], ["datetime", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Fim dos registros", 3, "size", "control"], ["label", "Tipo", "icon", "bi bi-arrow-up-right-circle", "controlName", "tipo", "itemTodos", "Todos", "valueTodos", "", 3, "size", "control", "items"], [3, "titleTemplate", "template"], ["titleResponsavel", ""], ["columnResponsavel", ""], ["titleDataCriacao", ""], ["columnDataCriacao", ""], ["titleDiferenca", ""], ["columnDiferenca", ""], ["title", "Tipo de Opera\u00E7\u00E3o", "field", "type"], [3, "rows"], ["width", "150", 1, "col", "align-bottom"], ["width", "250", 1, "col"], ["title", "(ver detalhes)", 3, "collapse", "collapsed"], [4, "ngFor", "ngForOf"], ["width", "150"], ["width", "250"]],
  template: function PlanoEntregaListLogsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "grid", 0)(1, "span")(2, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "filter", 1)(6, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "input-select", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](10, "input-datetime", 5)(11, "input-datetime", 6)(12, "input-select", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "columns")(14, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](15, PlanoEntregaListLogsComponent_ng_template_15_Template, 2, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, PlanoEntregaListLogsComponent_ng_template_17_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](20, PlanoEntregaListLogsComponent_ng_template_20_Template, 2, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](22, PlanoEntregaListLogsComponent_ng_template_22_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](25, PlanoEntregaListLogsComponent_ng_template_25_Template, 14, 0, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](27, PlanoEntregaListLogsComponent_ng_template_27_Template, 4, 3, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](29, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](30, "pagination", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](16);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](18);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](21);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](23);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](26);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("dao", ctx.dao)("hasEdit", false)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"]((ctx.planoEntrega == null ? null : ctx.planoEntrega.numero) + " - " + (ctx.planoEntrega == null ? null : ctx.planoEntrega.nome));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("control", ctx.filter.controls.responsavel_id)("items", ctx.responsaveis);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.tipo)("items", ctx.lookup.TIPO_LOG_CHANGE);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("titleTemplate", _r1)("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("titleTemplate", _r5)("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("titleTemplate", _r9)("template", _r11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 47775:
/*!*********************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list-progresso/plano-entrega-list-progresso.component.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaListProgressoComponent: () => (/* binding */ PlanoEntregaListProgressoComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_plano_entrega_entrega_progresso_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-progresso-dao.service */ 89048);
/* harmony import */ var src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega-progresso.model */ 54052);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
var _class;
















function PlanoEntregaListProgressoComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "toolbar");
  }
}
function PlanoEntregaListProgressoComponent_ng_template_8_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", ctx_r10.dao.getDateFormatted(row_r9.data_progresso), "");
  }
}
function PlanoEntregaListProgressoComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, PlanoEntregaListProgressoComponent_ng_template_8_span_0_Template, 2, 1, "span", 1);
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", row_r9.data_progresso);
  }
}
function PlanoEntregaListProgressoComponent_ng_template_11_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", ctx_r13.dao.getDateFormatted(row_r12.data_inicio), "");
  }
}
function PlanoEntregaListProgressoComponent_ng_template_11_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().row;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", ctx_r14.dao.getDateFormatted(row_r12.data_fim), "");
  }
}
function PlanoEntregaListProgressoComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, PlanoEntregaListProgressoComponent_ng_template_11_span_0_Template, 2, 1, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, PlanoEntregaListProgressoComponent_ng_template_11_span_2_Template, 2, 1, "span", 1);
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", row_r12.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", row_r12.data_fim);
  }
}
function PlanoEntregaListProgressoComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "badge", 15)(1, "br")(2, "badge", 16);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("textValue", ctx_r6.planoEntregaService.getValorMeta(row_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("textValue", ctx_r6.planoEntregaService.getValorRealizado(row_r17));
  }
}
function PlanoEntregaListProgressoComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "progress-bar", 17);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", row_r18.progresso_realizado)("goal", row_r18.progresso_esperado);
  }
}
class PlanoEntregaListProgressoComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_entrega_progresso_model__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaEntregaProgresso, src_app_dao_plano_entrega_entrega_progresso_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaEntregaProgressoDaoService);
    this.injector = injector;
    this.planoEntregaEntregaId = "";
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.data_inicial_progresso) result.push(["data_progresso", ">=", form.data_inicial_progresso]);
      if (form.data_final_progresso) result.push(["data_progresso", "<=", form.data_final_progresso]);
      result.push(["plano_entrega_entrega_id", "==", this.planoEntregaEntregaId]);
      return result;
    };
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaService);
    this.title = this.lex.translate("Histórico de execução");
    this.orderBy = [['data_progresso', 'desc']];
    this.join = ['plano_entrega_entrega.entrega'];
    this.filter = this.fh.FormBuilder({
      data_inicial_progresso: {
        default: null
      },
      data_final_progresso: {
        default: null
      }
    });
    this.addOption(Object.assign({
      onClick: this.delete.bind(this)
    }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_PRO_EXCL");
  }
  onGridLoad(rows) {
    rows?.forEach(x => x.entrega = x.plano_entrega_entrega?.entrega);
  }
  ngOnInit() {
    super.ngOnInit();
    this.planoEntregaEntregaId = this.urlParams.get("entrega_id") || "";
  }
}
_class = PlanoEntregaListProgressoComponent;
_class.ɵfac = function PlanoEntregaListProgressoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-plano-entrega-list-progresso"]],
  viewQuery: function PlanoEntregaListProgressoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 21,
  vars: 38,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "loadList", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["noIcon", "", "label", "Data inical do progresso", "controlName", "data_inicial_progresso", "labelInfo", "Data que foi registrado o progresso", 3, "size", "control"], ["noIcon", "", "label", "Data final do progresso", "controlName", "data_final_progresso", "labelInfo", "Data que foi registrado o progresso", 3, "size", "control"], [3, "title", "template", "editTemplate"], ["columnProgressoData", ""], ["columnDatas", ""], [3, "title", "width", "template"], ["columnMetaRealizado", ""], [3, "title", "width", "template", "editTemplate", "columnEditTemplate"], ["columnProgresso", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["icon", "bi bi-graph-up-arrow", "color", "light", "hint", "Planejada", 3, "textValue"], ["icon", "bi bi-check-lg", "color", "light", "hint", "Realizada", 3, "textValue"], ["color", "success", 3, "value", "goal"]],
  template: function PlanoEntregaListProgressoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function PlanoEntregaListProgressoComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, PlanoEntregaListProgressoComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "input-datetime", 4)(5, "input-datetime", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "columns")(7, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, PlanoEntregaListProgressoComponent_ng_template_8_Template, 1, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, PlanoEntregaListProgressoComponent_ng_template_11_Template, 3, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](14, PlanoEntregaListProgressoComponent_ng_template_14_Template, 3, 2, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, PlanoEntregaListProgressoComponent_ng_template_17_Template, 1, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](19, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](20, "pagination", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](9);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](12);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](15);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PENT_ENTR_PRO_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PENT_ENTR_PRO_EDT"))("loadList", ctx.onGridLoad.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_inicial_progresso);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_final_progresso);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", "Data progresso")("template", _r1)("editTemplate", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", "Data In\u00EDcio\nData Fim")("template", _r3)("editTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", "Meta")("width", 100)("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", "Progresso")("width", 200)("template", _r7)("editTemplate", _r7)("columnEditTemplate", ctx.selectable ? undefined : _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__.InputDatetimeComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_12__.ProgressBarComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 23183:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-list/plano-entrega-list.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaListComponent: () => (/* binding */ PlanoEntregaListComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-entrega-dao.service */ 39190);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/plano-entrega.model */ 74795);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/avaliacao-dao.service */ 41095);
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
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../uteis/avaliar/avaliar-nota-badge/avaliar-nota-badge.component */ 56486);
/* harmony import */ var _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../plano-entrega-list-entrega/plano-entrega-list-entrega.component */ 39285);

var _class;



























function PlanoEntregaListComponent_toolbar_1_input_switch_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "input-switch", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("change", function PlanoEntregaListComponent_toolbar_1_input_switch_2_Template_input_switch_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵresetView"](ctx_r24.onPrincipaisChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("control", ctx_r23.filter.controls.principais)("labelInfo", ctx_r23.lex.translate("Unidades") + " onde o " + ctx_r23.lex.translate("usuario") + " \u00E9 integrante, incluindo unidades superiores sob sua ger\u00EAncia.");
  }
}
function PlanoEntregaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "toolbar", 21)(1, "input-switch", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("change", function PlanoEntregaListComponent_toolbar_1_Template_input_switch_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵresetView"](ctx_r26.onAgruparChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoEntregaListComponent_toolbar_1_input_switch_2_Template, 1, 3, "input-switch", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("buttons", ctx_r0.toolbarButtons);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 3)("control", ctx_r0.filter.controls.agrupar);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx_r0.avaliacao);
  }
}
function PlanoEntregaListComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div")(1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "input-search", 26, 27)(4, "input-select", 28)(5, "input-datetime", 29)(6, "input-datetime", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 6)("control", ctx_r1.filter.controls.unidade_id)("dao", ctx_r1.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx_r1.filter.controls.data_filtro)("items", ctx_r1.DATAS_FILTRO);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("disabled", ctx_r1.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx_r1.filter.controls.data_filtro_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("disabled", ctx_r1.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx_r1.filter.controls.data_filtro_fim);
  }
}
const _c0 = function () {
  return ["CONCLUIDO", "AVALIADO"];
};
function PlanoEntregaListComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "input-switch", 31)(2, "input-text", 32)(3, "input-search", 26, 27)(5, "input-select", 33)(6, "input-switch", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](7, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](8, "input-search", 35, 36)(10, "input-search", 37, 38)(12, "input-select", 28)(13, "input-datetime", 29)(14, "input-datetime", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("control", ctx_r3.filter.controls.meus_planos);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 3)("control", ctx_r3.filter.controls.nome)("placeholder", "Nome do " + ctx_r3.lex.translate("plano de entrega"));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 4)("control", ctx_r3.filter.controls.unidade_id)("dao", ctx_r3.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 3)("control", ctx_r3.filter.controls.status)("items", ctx_r3.lookup.PLANO_ENTREGA_STATUS)("filter", ctx_r3.avaliacao ? _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵpureFunction0"](32, _c0) : undefined)("valueTodos", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 1)("control", ctx_r3.filter.controls.arquivadas);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 3)("control", ctx_r3.filter.controls.planejamento_id)("dao", ctx_r3.planejamentoDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 3)("control", ctx_r3.filter.controls.cadeia_valor_id)("dao", ctx_r3.cadeiaValorDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("valueTodos", null)("control", ctx_r3.filter.controls.data_filtro)("items", ctx_r3.DATAS_FILTRO);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("disabled", ctx_r3.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx_r3.filter.controls.data_filtro_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("size", 2)("disabled", ctx_r3.filter.controls.data_filtro.value == null ? "true" : undefined)("control", ctx_r3.filter.controls.data_filtro_fim);
  }
}
function PlanoEntregaListComponent_column_7_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", row_r36.entregas == null ? null : row_r36.entregas.length, "");
  }
}
function PlanoEntregaListComponent_column_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](0, PlanoEntregaListComponent_column_7_ng_template_1_span_0_Template, 3, 1, "span", 42);
  }
  if (rf & 2) {
    const row_r36 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r36.entregas == null ? null : row_r36.entregas.length);
  }
}
function PlanoEntregaListComponent_column_7_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "plano-entrega-list-entrega", 45);
  }
  if (rf & 2) {
    const row_r39 = ctx.row;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("parent", ctx_r35)("disabled", ctx_r35.avaliacao || !ctx_r35.botaoAtendeCondicoes(ctx_r35.BOTAO_ALTERAR, row_r39))("entity", row_r39)("execucao", ctx_r35.execucao)("cdRef", ctx_r35.cdRef)("planejamentoId", row_r39.planejamento_id)("cadeiaValorId", row_r39.cadeia_valor_id)("unidadeId", row_r39.unidade_id);
  }
}
function PlanoEntregaListComponent_column_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "column", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoEntregaListComponent_column_7_ng_template_1_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoEntregaListComponent_column_7_ng_template_3_Template, 1, 8, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](2);
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](4);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("align", "center")("hint", ctx_r4.lex.translate("Entrega"))("template", _r32)("expandTemplate", _r34);
  }
}
function PlanoEntregaListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "order", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "#ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r40 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("header", header_r40);
  }
}
function PlanoEntregaListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "small", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r41 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"]("#", row_r41.numero, "");
  }
}
function PlanoEntregaListComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "order", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1, "Nome");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](3);
  }
  if (rf & 2) {
    const header_r42 = ctx.header;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("header", header_r42);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" Programa", !ctx_r10.filter.controls.agrupar.value ? " - Unidade" : "", " ");
  }
}
function PlanoEntregaListComponent_ng_template_16_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 52);
  }
  if (rf & 2) {
    const row_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r44.entityService.getIcon("Programa"))("label", row_r43.programa.nome);
  }
}
function PlanoEntregaListComponent_ng_template_16_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 53);
  }
  if (rf & 2) {
    const row_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("icon", ctx_r45.entityService.getIcon(ctx_r45.lex.translate("unidade")))("label", row_r43.unidade.sigla);
  }
}
function PlanoEntregaListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoEntregaListComponent_ng_template_16_badge_3_Template, 1, 2, "badge", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](4, PlanoEntregaListComponent_ng_template_16_badge_4_Template, 1, 2, "badge", 51);
  }
  if (rf & 2) {
    const row_r43 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵstyleProp"]("max-width", 400, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate"](row_r43.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r43.programa);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx_r12.filter.controls.agrupar.value && row_r43.unidade);
  }
}
function PlanoEntregaListComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r48 = ctx.row;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r14.dao.getDateFormatted(row_r48.data_inicio), "");
  }
}
function PlanoEntregaListComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r49 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtextInterpolate1"](" ", ctx_r16.dao.getDateFormatted(row_r49.data_fim), "");
  }
}
function PlanoEntregaListComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](0, " Planejamento Institucional");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtext"](2, " Cadeia de Valor ");
  }
}
function PlanoEntregaListComponent_ng_template_27_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 55);
  }
  if (rf & 2) {
    const row_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("maxWidth", 300)("icon", ctx_r52.entityService.getIcon("Planejamento"))("label", row_r51.planejamento == null ? null : row_r51.planejamento.nome);
  }
}
function PlanoEntregaListComponent_ng_template_27_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 55);
  }
  if (rf & 2) {
    const row_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("maxWidth", 300)("icon", ctx_r53.entityService.getIcon("CadeiaValor"))("label", row_r51.cadeia_valor == null ? null : row_r51.cadeia_valor.nome);
  }
}
function PlanoEntregaListComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](0, PlanoEntregaListComponent_ng_template_27_badge_0_Template, 1, 3, "badge", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoEntregaListComponent_ng_template_27_badge_1_Template, 1, 3, "badge", 54);
  }
  if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r51.planejamento);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r51.cadeia_valor);
  }
}
function PlanoEntregaListComponent_ng_template_30_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 60);
  }
}
function PlanoEntregaListComponent_ng_template_30_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 61);
  }
}
function PlanoEntregaListComponent_ng_template_30_avaliar_nota_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "avaliar-nota-badge", 62);
  }
  if (rf & 2) {
    const row_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("align", "left")("tipoAvaliacao", row_r56.avaliacao.tipo_avaliacao)("nota", row_r56.avaliacao.nota);
  }
}
function PlanoEntregaListComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](0, "badge", 56)(1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](2, PlanoEntregaListComponent_ng_template_30_badge_2_Template, 1, 0, "badge", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoEntregaListComponent_ng_template_30_badge_3_Template, 1, 0, "badge", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](4, PlanoEntregaListComponent_ng_template_30_avaliar_nota_badge_4_Template, 1, 3, "avaliar-nota-badge", 59);
  }
  if (rf & 2) {
    const row_r56 = ctx.row;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("color", ctx_r22.lookup.getColor(ctx_r22.lookup.PLANO_ENTREGA_STATUS, row_r56.status))("icon", ctx_r22.lookup.getIcon(ctx_r22.lookup.PLANO_ENTREGA_STATUS, row_r56.status))("label", ctx_r22.lookup.getValue(ctx_r22.lookup.PLANO_ENTREGA_STATUS, row_r56.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r56.data_arquivamento);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r56.deleted_at);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", row_r56.avaliacao);
  }
}
class PlanoEntregaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_7__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_model__WEBPACK_IMPORTED_MODULE_6__.PlanoEntrega, src_app_dao_plano_entrega_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaDaoService);
    this.injector = injector;
    this.showFilter = true;
    this.avaliacao = false;
    this.execucao = false;
    this.habilitarAdesaoToolbar = false;
    this.toolbarButtons = [];
    this.botoes = [];
    this.routeStatus = {
      route: ["uteis", "status"]
    };
    this.DATAS_FILTRO = [{
      key: "VIGENTE",
      value: "Vigente"
    }, {
      key: "NAOVIGENTE",
      value: "Não vigente"
    }, {
      key: "INICIAM",
      value: "Iniciam"
    }, {
      key: "FINALIZAM",
      value: "Finalizam"
    }];
    this.storeFilter = filter => {
      const form = filter?.value;
      return {
        meus_planos: form.meus_planos,
        arquivadas: form.arquivadas,
        unidade_id: form.unidade_id
      };
    };
    this.filterValidate = (control, controlName) => {
      let result = null;
      if (controlName == "data_filtro_inicio" && control.value > this.filter?.controls.data_filtro_fim.value) {
        result = "Maior que fim";
      } else if (controlName == "data_filtro_fim" && control.value < this.filter?.controls.data_filtro_inicio.value) {
        result = "Menor que início";
      }
      return result;
    };
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      /*
          (RI_PENT_B) A consulta do grid retornará inicialmente os principais Planos de Entrega do usuário logado (a opção "principais" já vem marcada), que são:
          - os válidos das unidades onde ele possui algum vínculo (áreas de trabalho) (w1), e
          - se ele for gestor:
            - os ativos das unidades-pai de onde ele é gestor (w2), e
            - os ativos das unidades imediatamente subordinadas (w3);
      */
      if (this.filter?.controls.principais.value) {
        let w1 = ["unidade_id", "in", (this.auth.unidades || []).map(u => u.id)];
        if (this.auth.isGestorAlgumaAreaTrabalho()) {
          let unidadesUsuarioEhGestor = this.auth.unidades?.filter(x => this.unidadeService.isGestorUnidade(x));
          let w2 = unidadesUsuarioEhGestor?.map(u => u.unidade_pai?.id || "").filter(x => x.length);
          if (w2?.length) w1[2].push(...w2);
          let w3 = ["unidade.unidade_pai_id", "in", unidadesUsuarioEhGestor?.map(u => u.id)];
          result.push(["or", w1, w3]);
        } else {
          result.push(w1);
        }
      }
      if (this.filter?.controls.meus_planos.value) {
        let w1 = ["unidade_id", "in", (this.auth.unidades || []).map(u => u.id)];
        if (this.auth.isGestorAlgumaAreaTrabalho()) {
          let unidadesUsuarioEhGestor = this.auth.unidades?.filter(x => this.unidadeService.isGestorUnidade(x));
          let w2 = unidadesUsuarioEhGestor?.map(u => u.unidade_pai?.id || "").filter(x => x.length);
          if (w2?.length) w1[2].push(...w2);
          let w3 = ["unidade.unidade_pai_id", "in", unidadesUsuarioEhGestor?.map(u => u.id)];
          result.push(["or", w1, w3]);
        } else {
          result.push(w1);
        }
      }
      if (form.nome?.length) result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      if (form.data_filtro) {
        result.push(["data_filtro", "==", form.data_filtro]);
        result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
        result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
      }
      if (form.unidade_id) result.push(["unidade_id", "==", form.unidade_id]);
      if (form.planejamento_id) result.push(["planejamento_id", "==", form.planejamento_id]);
      if (form.cadeia_valor_id) result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
      if (this.isModal) {
        result.push(["status", "==", "ATIVO"]);
      } else if (form.status || this.avaliacao) {
        result.push(["status", "in", form.status ? [form.status] : ['CONCLUIDO', 'AVALIADO']]);
      }
      if (form.unidades_filhas) result.push(["unidades_filhas", "==", true]);
      //  (RI_PENT_C) Por padrão, os planos de entregas retornados na listagem do grid são os que não foram arquivados.
      result.push(["incluir_arquivados", "==", this.filter.controls.arquivadas.value]);
      return result;
    };
    this.avaliacaoDao = injector.get(src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_9__.AvaliacaoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_8__.PlanoEntregaService);
    this.unidadeService = injector.get(src_app_services_unidade_service__WEBPACK_IMPORTED_MODULE_10__.UnidadeService);
    this.unidadeSelecionada = this.auth.unidade;
    this.code = "MOD_PLANE";
    /* Inicializações */
    this.title = this.lex.translate('Planos de Entregas');
    this.filter = this.fh.FormBuilder({
      agrupar: {
        default: true
      },
      principais: {
        default: false
      },
      arquivadas: {
        default: false
      },
      nome: {
        default: ''
      },
      data_filtro: {
        default: null
      },
      data_filtro_inicio: {
        default: new Date()
      },
      data_filtro_fim: {
        default: new Date()
      },
      status: {
        default: ''
      },
      unidade_id: {
        default: null
      },
      unidades_filhas: {
        default: false
      },
      planejamento_id: {
        default: null
      },
      cadeia_valor_id: {
        default: null
      },
      meus_planos: {
        default: true
      }
    }, this.cdRef, this.filterValidate);
    this.join = ['planejamento:id,nome', 'programa:id,nome', 'cadeia_valor:id,nome', 'unidade:id,sigla,path', 'entregas.entrega', 'entregas.objetivos.objetivo', 'entregas.processos.processo', 'entregas.unidade', 'entregas.comentarios.usuario:id,nome,apelido', 'entregas.reacoes.usuario:id,nome,apelido', 'unidade.gestor:id', 'unidade.gestores_substitutos:id', 'unidade.unidade_pai', 'avaliacao'];
    this.groupBy = [{
      field: "unidade.sigla",
      label: "Unidade"
    }];
    this.BOTAO_ADERIR_OPTION = {
      label: "Aderir",
      icon: this.entityService.getIcon("Adesao"),
      onClick: (() => {
        this.go.navigate({
          route: ['gestao', 'plano-entrega', 'adesao']
        }, {
          metadata: {
            planoEntrega: this.linha
          },
          modalClose: modalResult => {
            this.refresh();
          }
        });
      }).bind(this)
    };
    this.BOTAO_ADERIR_TOOLBAR = {
      label: "Aderir",
      disabled: !this.habilitarAdesaoToolbar,
      icon: this.entityService.getIcon("Adesao"),
      onClick: (() => {
        this.go.navigate({
          route: ['gestao', 'plano-entrega', 'adesao']
        }, {
          modalClose: modalResult => {
            this.refresh();
          }
        });
      }).bind(this)
    };
    this.BOTAO_ALTERAR = {
      label: "Alterar",
      icon: "bi bi-pencil-square",
      color: "btn-outline-info",
      onClick: planoEntrega => this.go.navigate({
        route: ['gestao', 'plano-entrega', planoEntrega.id, 'edit']
      }, this.modalRefreshId(planoEntrega))
    };
    this.BOTAO_ARQUIVAR = {
      label: "Arquivar",
      icon: "bi bi-inboxes",
      onClick: this.arquivar.bind(this)
    };
    this.BOTAO_AVALIAR = {
      label: "Avaliar",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "AVALIADO"),
      onClick: this.avaliar.bind(this)
    };
    this.BOTAO_CANCELAR_PLANO = {
      label: "Cancelar plano",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CANCELADO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CANCELADO"),
      onClick: this.cancelarPlano.bind(this)
    };
    this.BOTAO_CANCELAR_AVALIACAO = {
      label: "Cancelar avaliação",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CANCELADO"),
      onClick: this.cancelarAvaliacao.bind(this)
    };
    this.BOTAO_CANCELAR_CONCLUSAO = {
      label: "Cancelar conclusão",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      onClick: this.cancelarConclusao.bind(this)
    };
    this.BOTAO_CANCELAR_HOMOLOGACAO = {
      label: "Cancelar homologação",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"),
      onClick: this.cancelarHomologacao.bind(this)
    };
    this.BOTAO_CONCLUIR = {
      label: "Concluir",
      id: "CONCLUIDO",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "CONCLUIDO"),
      onClick: this.concluir.bind(this)
    };
    this.BOTAO_CONSULTAR = {
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: planoEntrega => this.go.navigate({
        route: ['gestao', 'plano-entrega', planoEntrega.id, 'consult']
      }, {
        modal: true
      })
    };
    this.BOTAO_DESARQUIVAR = {
      label: "Desarquivar",
      icon: "bi bi-reply",
      onClick: this.desarquivar.bind(this)
    };
    this.BOTAO_EXCLUIR = {
      label: "Excluir",
      icon: "bi bi-trash",
      onClick: this.delete.bind(this)
    };
    this.BOTAO_HOMOLOGAR = {
      label: "Homologar",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      onClick: this.homologar.bind(this)
    };
    this.BOTAO_LIBERAR_HOMOLOGACAO = {
      label: "Liberar para homologação",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "HOMOLOGANDO"),
      onClick: this.liberarHomologacao.bind(this)
    };
    this.BOTAO_LOGS = {
      label: "Logs",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
      onClick: planoEntrega => this.go.navigate({
        route: ['logs', 'change', planoEntrega.id, 'consult']
      })
    };
    this.BOTAO_REATIVAR = {
      label: "Reativar",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "ATIVO"),
      onClick: this.reativar.bind(this)
    };
    this.BOTAO_RETIRAR_HOMOLOGACAO = {
      label: "Retirar de homologação",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "INCLUIDO"),
      onClick: this.retirarHomologacao.bind(this)
    };
    this.BOTAO_SUSPENDER = {
      label: "Suspender",
      id: "PAUSADO",
      icon: this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"),
      color: this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, "SUSPENSO"),
      onClick: this.suspender.bind(this)
    };
    this.botoes = [this.BOTAO_ALTERAR, this.BOTAO_ARQUIVAR, this.BOTAO_AVALIAR, this.BOTAO_CANCELAR_PLANO, this.BOTAO_CANCELAR_AVALIACAO, this.BOTAO_CANCELAR_CONCLUSAO, this.BOTAO_CANCELAR_HOMOLOGACAO, this.BOTAO_CONCLUIR, this.BOTAO_CONSULTAR, this.BOTAO_DESARQUIVAR, this.BOTAO_EXCLUIR, this.BOTAO_HOMOLOGAR, this.BOTAO_LIBERAR_HOMOLOGACAO, this.BOTAO_LOGS, this.BOTAO_REATIVAR, this.BOTAO_RETIRAR_HOMOLOGACAO, this.BOTAO_SUSPENDER];
    //this.BOTAO_ADERIR_OPTION, this.BOTAO_ADERIR_TOOLBAR,
  }

  ngOnInit() {
    super.ngOnInit();
    this.execucao = !!this.queryParams?.execucao;
    this.avaliacao = !!this.queryParams?.avaliacao;
    this.showFilter = typeof this.queryParams?.showFilter != "undefined" ? this.queryParams.showFilter == "true" : true;
    this.selectable = this.metadata?.selectable || this.selectable;
    if (this.execucao) {
      this.title = this.title + " (Execução)";
      this.filter.controls.unidade_id.setValue(this.auth.unidadeGestor()?.id || null);
      this.filter.controls.principais.setValue(false);
    }
    if (this.avaliacao) {
      this.title = this.title + " (Avaliação)";
      this.filter.controls.unidade_id.setValue(this.auth.unidadeGestor()?.id || null);
      this.filter.controls.unidades_filhas.setValue(true);
      this.filter.controls.principais.setValue(false);
    }
    this.checaBotaoAderirToolbar();
    //this.toolbarButtons.push(this.BOTAO_ADERIR_TOOLBAR);  // Adesão de plano suspensa, por enquanto
  }

  ngAfterContentChecked() {
    if (this.auth.unidade != this.unidadeSelecionada) {
      this.unidadeSelecionada = this.auth.unidade;
      this.checaBotaoAderirToolbar();
      this.cdRef.detectChanges();
    }
  }
  onGridLoad(rows) {
    const extra = (this.grid?.query || this.query).extra;
    if (rows && this.execucao) {
      rows.forEach(v => {
        if (["ATIVO", "SUSPENSO"].includes(v.status)) this.grid.expand(v.id);
      });
    }
    rows?.forEach(v => {
      let planoEntrega = v;
      if (planoEntrega.avaliacao) planoEntrega.avaliacao.tipo_avaliacao = extra?.tipos_avaliacoes?.find(x => x.id == planoEntrega.avaliacao.tipo_avaliacao_id);
    });
  }
  checaBotaoAderirToolbar() {
    /* let planos_ativos_unidade_pai = this.planosEntregasAtivosUnidadePai().length ? this.planosEntregasAtivosUnidadePai().map(x => x.id) : [];
    let planos_superiores_vinculados_pela_unidade_selecionada = this.planosEntregasAtivosUnidadeSelecionada().map(x => x.plano_entrega_id).filter(x => x != null);
    let condition1 = this.unidadeService.isGestorUnidade() || this.unidadeService.isGestorUnidade(this.auth.unidade?.unidade_pai_id) || (this.auth.isLotacaoUsuario(this.auth.unidade) && this.auth.hasPermissionTo("MOD_PENT_ADR"));
    let condition2 = !!planos_ativos_unidade_pai.filter(x => !planos_superiores_vinculados_pela_unidade_selecionada.includes(x)).length;
    this.habilitarAdesaoToolbar = condition1 && condition2;
    this.BOTAO_ADERIR_TOOLBAR.disabled = !this.habilitarAdesaoToolbar; */
    /*  (RI_PENT_1)
        O botão Aderir, na toolbar, deverá ser exibido sempre, mas para ficar habilitado:
        1. o usuário logado precisa ser gestor da unidade selecionada ou da sua unidade-pai, ou uma destas ser sua unidade de lotação principal e ele
        possuir a capacidade "MOD_PENT_ADR" (RN_PENT_2_4); e
        2. a unidade-pai da unidade selecionada precisa possuir plano de entrega com o status ATIVO, que já não tenha sido vinculado pela unidade selecionada;
    */
  }
  planosEntregasAtivosUnidadePai() {
    return this.auth.unidade?.unidade_pai?.planos_entrega?.filter(x => this.planoEntregaService.isAtivo(x)) || [];
  }
  planosEntregasAtivosUnidadeSelecionada() {
    return this.auth?.unidade?.planos_entrega?.filter(x => this.planoEntregaService.isAtivo(x)) || [];
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    filter.controls.data_filtro.setValue(null);
    filter.controls.data_filtro_inicio.setValue(new Date());
    filter.controls.data_filtro_fim.setValue(new Date());
    filter.controls.unidade_id.setValue(null);
    filter.controls.planejamento_id.setValue(null);
    filter.controls.cadeia_valor_id.setValue(null);
    filter.controls.status.setValue(null);
    filter.controls.meus_planos.setValue(false);
    super.filterClear(filter);
  }
  onAgruparChange(event) {
    const agrupar = this.filter.controls.agrupar.value;
    if (agrupar && !this.groupBy?.length || !agrupar && this.groupBy?.length) {
      this.groupBy = agrupar ? [{
        field: "unidade.sigla",
        label: "Unidade"
      }] : [];
      this.cdRef.detectChanges();
      this.grid.reloadFilter();
    }
  }
  onPrincipaisChange(event) {
    if (!this.filter.controls.principais.value) this.filter.controls.unidade_id.setValue(null); //invertido o default pelo !
    this.grid.reloadFilter();
  }
  dynamicButtons(row) {
    let result = [];
    let planoEntrega = row;
    switch (this.planoEntregaService.situacaoPlano(planoEntrega)) {
      case 'INCLUIDO':
        if (this.botaoAtendeCondicoes(this.BOTAO_LIBERAR_HOMOLOGACAO, row)) result.push(this.BOTAO_LIBERAR_HOMOLOGACAO);else result.push(this.BOTAO_CONSULTAR);
        break;
      case 'HOMOLOGANDO':
        if (this.botaoAtendeCondicoes(this.BOTAO_HOMOLOGAR, row)) result.push(this.BOTAO_HOMOLOGAR);
        break;
      case 'ATIVO':
        if (this.botaoAtendeCondicoes(this.BOTAO_CONCLUIR, row)) result.push(this.BOTAO_CONCLUIR);
        break;
      case 'CONCLUIDO':
        if (this.botaoAtendeCondicoes(this.BOTAO_AVALIAR, row)) result.push(this.BOTAO_AVALIAR);
        break;
      case 'SUSPENSO':
        if (this.botaoAtendeCondicoes(this.BOTAO_REATIVAR, row)) result.push(this.BOTAO_REATIVAR);
        break;
      case 'AVALIADO':
        if (this.botaoAtendeCondicoes(this.BOTAO_ARQUIVAR, row)) result.push(this.BOTAO_ARQUIVAR);
        break;
      case 'ARQUIVADO':
        if (this.botaoAtendeCondicoes(this.BOTAO_DESARQUIVAR, row)) result.push(this.BOTAO_DESARQUIVAR);
        break;
      case 'CANCELADO':
        break;
    }
    if (!result.length) result.push(this.BOTAO_CONSULTAR);
    return result;
  }
  dynamicOptions(row) {
    let result = [];
    this.linha = row;
    this.botoes.forEach(botao => {
      if (this.botaoAtendeCondicoes(botao, row)) result.push(botao);
    });
    return result;
  }
  botaoAtendeCondicoes(botao, planoEntrega) {
    switch (botao) {
      case this.BOTAO_ADERIR_OPTION:
        /*
          (RI_PENT_2) O botão Aderir, nas linhas do grid, deverá aparecer num plano somente se:
          - o plano estiver com o status Ativo; e
          - a unidade do plano for a unidade-pai da unidade selecionada pelo usuário; e
          - se o usuário for Gestor da unidade selecionada, ou ela for sua lotação principal e ele possuir a capacidade "MOD_PENT_ADR" ; e
          - se a unidade selecionada não possuir plano de entrega Ativo no mesmo período do plano em questão;
        */
        return !this.execucao && this.planoEntregaService.situacaoPlano(planoEntrega) == 'ATIVO' && planoEntrega.unidade_id == this.auth.unidade?.unidade_pai_id && (this.unidadeService.isGestorUnidade() || this.auth.isLotacaoUsuario(this.auth.unidade) && this.auth.hasPermissionTo("MOD_PENT_ADR")) && this.planosEntregasAtivosUnidadeSelecionada().filter(x => this.util.intersection([{
          start: x.data_inicio,
          end: x.data_fim
        }, {
          start: planoEntrega.data_inicio,
          end: planoEntrega.data_fim
        }])).length == 0;
      case this.BOTAO_ALTERAR:
        /*
          (RN_PENT_L) Para ALTERAR um plano de entregas:
          - o Plano de Entregas precisa estar com o status INCLUIDO, HOMOLOGANDO ou ATIVO, e
          - o usuário logado precisa possuir a capacidade "MOD_PENT_EDT", o plano de entregas precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
                - o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor da Unidade do plano, ou esta ser sua Unidade de lotação; ou
                - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH"; (RN_PENT_C) ou
                - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANO DE ENTREGA para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B); ou
                - o plano de entregas precisa estar com o status ATIVO, a Unidade do plano precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" ou "MOD_PENT_EDT_ATV_ATV".
                - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND";
          (RN_PENT_AE) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL", o plano de entregas voltará ao status "HOMOLOGANDO";
          (RN_PENT_AF) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_ATV", o plano de entregas permanecerá no status "ATIVO";
        */
        let condicao0 = ['INCLUIDO', 'HOMOLOGANDO', 'ATIVO'].includes(this.planoEntregaService.situacaoPlano(planoEntrega));
        let condicao1 = ['INCLUIDO', 'HOMOLOGANDO'].includes(this.planoEntregaService.situacaoPlano(planoEntrega)) && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade));
        let condicao2 = this.unidadeService.isGestorUnidade(planoEntrega.unidade?.unidade_pai_id) && this.auth.hasPermissionTo("MOD_PENT_EDT_FLH");
        let condicao3 = this.auth.isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', planoEntrega.unidade.unidade_pai_id);
        let condicao4 = this.planoEntregaService.situacaoPlano(planoEntrega) == 'ATIVO' && this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo(["MOD_PENT_EDT_ATV_HOMOL", "MOD_PENT_EDT_ATV_ATV"]);
        let condicao5 = this.auth.hasPermissionTo("MOD_PENT_QQR_UND");
        return !this.execucao && this.auth.hasPermissionTo("MOD_PENT_EDT") && condicao0 && this.planoEntregaService.isValido(planoEntrega) && (condicao1 || condicao2 || condicao3 || condicao4 || condicao5);
      case this.BOTAO_ARQUIVAR:
        /*
          (RN_PENT_N) Para ARQUIVAR um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO ou AVALIADO, não ter sido arquivado, e:
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";
        */
        return ['CONCLUIDO', 'AVALIADO'].includes(this.planoEntregaService.situacaoPlano(planoEntrega)) && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_ARQ"));
      case this.BOTAO_AVALIAR:
        /*
          (RN_PENT_O) Para AVALIAR um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO, e:
              - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
              - o usuário logado precisa possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B); ou
              - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_AVAL"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente da Unidade do plano (Unidade A e superiores), e possuir a capacidade "MOD_PENT_AVAL_SUBORD";
              - sugerir arquivamento automático (vide RI_PENT_A);
        */
        let condic1 = this.unidadeService.isGestorUnidade(planoEntrega.unidade?.unidade_pai_id);
        let condic2 = this.auth.isIntegrante('AVALIADOR_PLANO_ENTREGA', planoEntrega.unidade.id);
        let condic3 = this.auth.isLotacaoUsuario(planoEntrega.unidade?.unidade_pai) && this.auth.hasPermissionTo("MOD_PENT_AVAL");
        let condic4 = this.auth.isGestorLinhaAscendente(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD");
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'CONCLUIDO' && (condic1 || condic2 || condic3 || condic4);
      case this.BOTAO_CANCELAR_AVALIACAO:
        /*
          (RN_PENT_R) Para CANCELAR a AVALIAÇÃO de um plano de entregas:
          - o plano precisa estar com o status AVALIADO, e
          - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
          - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_AVAL"; ou
          - possuir a atribuição de AVALIADOR DE PLANOS DE ENTREGAS para a Unidade do plano (Unidade B);
        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'AVALIADO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade?.unidade_pai_id) || this.auth.isIntegrante('AVALIADOR_PLANO_ENTREGA', planoEntrega.unidade.id));
      case this.BOTAO_CANCELAR_CONCLUSAO:
        /*
          (RN_PENT_S) Para CANCELAR a CONCLUSÃO de um plano de entregas:
          - o plano precisa estar com o status CONCLUIDO e o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
          - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "**MOD_PENT_CANC_CONCL";        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'CONCLUIDO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_CANC_CONCL"));
      case this.BOTAO_CANCELAR_HOMOLOGACAO:
        /*
          (RN_PENT_T) Para CANCELAR a HOMOLOGAÇÃO de um plano de entregas:
          - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B), ou
            - a Unidade-pai (Unidade A) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_CANC_HOMOL"; ou
            - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A) da Unidade do plano (Unidade B);
        */
        return !this.execucao && this.planoEntregaService.situacaoPlano(planoEntrega) == 'ATIVO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade?.unidade_pai_id) || this.auth.isLotacaoUsuario(planoEntrega.unidade?.unidade_pai) && this.auth.hasPermissionTo("MOD_PENT_CANC_HOMOL") || this.auth.isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', planoEntrega.unidade.unidade_pai_id));
      case this.BOTAO_CANCELAR_PLANO:
        /*
          (RN_PENT_P) Para CANCELAR UM PLANO DE ENTREGAS:
          - o usuário logado precisa possuir a capacidade "MOD_PENT_CNC", o plano precisa estar em um dos seguintes status: INCLUIDO, HOMOLOGANDO, ATIVO ou CONCLUIDO; e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
        */
        return this.auth.hasPermissionTo("MOD_PENT_CNC") && ['INCLUIDO', 'HOMOLOGANDO', 'ATIVO', 'CONCLUIDO'].includes(this.planoEntregaService.situacaoPlano(planoEntrega)) && (this.unidadeService.isGestorUnidade(planoEntrega.unidade?.id) || this.auth.isLotacaoUsuario(planoEntrega.unidade));
      case this.BOTAO_CONCLUIR:
        /*
          (RN_PENT_U) Para CONCLUIR um plano de entregas:
          - o plano precisa estar com o status ATIVO, e
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
            - a Unidade do plano (Unidade B) precisa ser sua Unidade de lotação e o usuário logado precisa possuir a capacidade "MOD_PENT_CONC";
        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'ATIVO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_CONC"));
      case this.BOTAO_CONSULTAR:
        /*
          (RN_PENT_V) CONSULTAR
          - todos os participantes podem visualizar todos os planos de entrega, desde que possuam a capacidade "MOD_PENT" (RN_PENT_F, RN_PENT_I);
        */
        return this.auth.hasPermissionTo("MOD_PENT");
      case this.BOTAO_DESARQUIVAR:
        /*
          (RN_PENT_W) Para DESARQUIVAR um plano de entregas:
          - o plano precisa estar arquivado, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_ARQ";
        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'ARQUIVADO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_ARQ"));
      case this.BOTAO_EXCLUIR:
        /*
          (RN_PENT_X) Para EXCLUIR um plano de entregas:
          - o usuário logado precisa possuir a capacidade "MOD_PENT_EXCL", o plano precisa estar com o status INCLUIDO ou HOMOLOGANDO; e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado;
        */
        return !this.execucao && this.auth.hasPermissionTo("MOD_PENT_EXCL") && ['INCLUIDO', 'HOMOLOGANDO'].includes(this.planoEntregaService.situacaoPlano(planoEntrega)) && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade));
        ;
      case this.BOTAO_HOMOLOGAR:
        /*
          (RN_PENT_Y) Para HOMOLOGAR um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO, e:
              - o usuário logado precisa ser gestor da Unidade-pai (Unidade A) da Unidade do plano (Unidade B); (RN_PENT_C), ou
              - a Unidade-pai (Unidade A) for a Unidade de lotação do usuário logado e ele possuir a capacidade "MOD_PENT_HOMOL", ou
              - o usuário logado precisa possuir a atribuição de HOMOLOGADOR DE PLANOS DE ENTREGAS para a Unidade-pai (Unidade A); (RN_PENT_E)
          - A homologação do plano de entregas não se aplica à Unidade instituidora.
        */
        let condition1 = this.planoEntregaService.situacaoPlano(planoEntrega) == 'HOMOLOGANDO';
        let condition2 = this.unidadeService.isGestorUnidade(planoEntrega.unidade?.unidade_pai_id);
        let condition3 = this.auth.isLotacaoUsuario(planoEntrega.unidade.unidade_pai) && this.auth.hasPermissionTo("MOD_PENT_HOMOL");
        let condition4 = this.auth.isIntegrante('HOMOLOGADOR_PLANO_ENTREGA', planoEntrega.unidade.unidade_pai_id);
        return !this.execucao && condition1 && (condition2 || condition3 || condition4);
      case this.BOTAO_LIBERAR_HOMOLOGACAO:
        /*
          (RN_PENT_AA) Para LIBERAR PARA HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status INCLUIDO, conter ao menos uma entrega (RN_PENT_D), e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_LIB_HOMOL"
        */
        return !this.execucao && this.planoEntregaService.situacaoPlano(planoEntrega) == 'INCLUIDO' && planoEntrega.entregas.length > 0 && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_LIB_HOMOL"));
      case this.BOTAO_LOGS:
        /*
        
        */
        return this.unidadeService.isGestorUnidade(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_AVAL_SUBORD");
      case this.BOTAO_REATIVAR:
        /*
          (RN_PENT_AC) Para REATIVAR um plano de entregas:
          - o plano precisa estar com o status SUSPENSO, e
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_RTV"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'SUSPENSO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_RTV") || this.auth.isGestorLinhaAscendente(planoEntrega.unidade));
      case this.BOTAO_RETIRAR_HOMOLOGACAO:
        /*
          (RN_PENT_AB) Para RETIRAR DE HOMOLOGAÇÃO um plano de entregas:
          - o plano precisa estar com o status HOMOLOGANDO, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B); ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e este possuir a capacidade "MOD_PENT_RET_HOMOL"
        */
        return !this.execucao && this.planoEntregaService.situacaoPlano(planoEntrega) == 'HOMOLOGANDO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_RET_HOMOL"));
      case this.BOTAO_SUSPENDER:
        /*
          (RN_PENT_AD) Para SUSPENDER um plano de entregas:
          - o plano precisa estar com o status ATIVO, e:
              - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou
              - a Unidade do plano (Unidade B) precisa ser a Unidade de lotação do usuário logado, e ele possuir a capacidade "MOD_PENT_SUSP"; ou
              - o usuário logado precisa ser gestor de alguma Unidade da linha hierárquica ascendente (Unidade A e superiores) da Unidade do plano (Unidade B);
        */
        return this.planoEntregaService.situacaoPlano(planoEntrega) == 'ATIVO' && (this.unidadeService.isGestorUnidade(planoEntrega.unidade) || this.auth.isLotacaoUsuario(planoEntrega.unidade) && this.auth.hasPermissionTo("MOD_PENT_SUSP") || this.auth.isGestorLinhaAscendente(planoEntrega.unidade));
    }
    return false;
  }
  arquivar(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: Object.assign({}, planoEntrega, {
          arquivar: true
        }),
        novoStatus: planoEntrega.status,
        onClick: this.dao.arquivar.bind(this.dao)
      },
      title: "Arquivar Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  avaliar(planoEntrega) {
    this.go.navigate({
      route: ['gestao', 'plano-entrega', planoEntrega.id, 'avaliar']
    }, {
      modal: true,
      metadata: {
        planoEntrega: planoEntrega
      },
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id, ["avaliacao.tipo_avaliacao.notas"]).then(() => {
            this.checaBotaoAderirToolbar();
          });
          /*consolidacao.status = "AVALIADO";
          consolidacao.avaliacao_id = modalResult.id;
          consolidacao.avaliacao = modalResult;
          this.refreshConsolidacao(consolidacao);*/
        }
      }
    });
  }

  cancelarAvaliacao(planoEntrega) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /*this.go.navigate(this.routeStatus, {
        metadata: { tipo: "PlanoEntrega", entity: planoEntrega, novoStatus: "CONCLUIDO", onClick: this.dao!.cancelarAvaliacao.bind(this.dao) },
        title: "Cancelar Avaliação",
        modalClose: (modalResult) => {
          if (modalResult) {
            (this.grid?.query || this.query!).refreshId(planoEntrega.id).then(() => {
              this.checaBotaoAderirToolbar();
            });
          };
        }
      });*/
      _this.submitting = true;
      try {
        let response = yield _this.avaliacaoDao.cancelarAvaliacao(planoEntrega.avaliacao.id);
        if (response) {
          (_this.grid?.query || _this.query).refreshId(planoEntrega.id).then(() => {
            _this.checaBotaoAderirToolbar();
          });
          /*consolidacao.status = "CONCLUIDO";
          consolidacao.avaliacao_id = null;
          consolidacao.avaliacao = undefined;
          this.refreshConsolidacao(consolidacao);*/
        }
      } catch (error) {
        _this.error(error.message || error);
      } finally {
        _this.submitting = false;
      }
    })();
  }
  cancelarConclusao(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "ATIVO",
        onClick: this.dao.cancelarConclusao.bind(this.dao)
      },
      title: "Cancelar Conclusão",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  cancelarHomologacao(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "HOMOLOGANDO",
        onClick: this.dao.cancelarHomologacao.bind(this.dao)
      },
      title: "Cancelar Homologação",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  cancelarPlano(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: Object.assign({}, planoEntrega, {
          arquivar: true
        }),
        novoStatus: "CANCELADO",
        onClick: this.dao.cancelarPlano.bind(this.dao)
      },
      title: "Cancelar Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  concluir(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "CONCLUIDO",
        onClick: this.dao.concluir.bind(this.dao)
      },
      title: "Concluir Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  desarquivar(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: Object.assign({}, planoEntrega, {
          arquivar: false
        }),
        novoStatus: planoEntrega.status,
        onClick: this.dao.arquivar.bind(this.dao)
      },
      title: "Desarquivar Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  homologar(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "ATIVO",
        onClick: this.dao.homologar.bind(this.dao)
      },
      title: "Homologar Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  liberarHomologacao(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "HOMOLOGANDO",
        onClick: this.dao.liberarHomologacao.bind(this.dao)
      },
      title: "Liberar para Homologação",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  reativar(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "ATIVO",
        onClick: this.dao.reativar.bind(this.dao)
      },
      title: "Reativar Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  retirarHomologacao(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "INCLUIDO",
        onClick: this.dao.retirarHomologacao.bind(this.dao)
      },
      title: "Retirar de Homologação",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  suspender(planoEntrega) {
    this.go.navigate(this.routeStatus, {
      metadata: {
        tipo: "PlanoEntrega",
        entity: planoEntrega,
        novoStatus: "SUSPENSO",
        onClick: this.dao.suspender.bind(this.dao)
      },
      title: "Suspender Plano de Entregas",
      modalClose: modalResult => {
        if (modalResult) {
          (this.grid?.query || this.query).refreshId(planoEntrega.id).then(() => {
            this.checaBotaoAderirToolbar();
          });
        }
        ;
      }
    });
  }
  canAdd() {
    return this.auth.hasPermissionTo('MOD_PENT_INCL');
    /*
    - (RN_PENT_Z) ... O usuário logado precisa possuir a capacidade "MOD_PENT_INCL"
     */
  }
}
_class = PlanoEntregaListComponent;
_class.ɵfac = function PlanoEntregaListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_25__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-list"]],
  viewQuery: function PlanoEntregaListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵInheritDefinitionFeature"]],
  decls: 34,
  vars: 35,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "loadList", "select"], [3, "buttons", 4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed", "visible"], [4, "ngIf", "ngIfElse"], ["naoEModal", ""], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], [3, "titleTemplate", "template"], ["titleIdNumeroStatus", ""], ["columnNumero", ""], ["titleNomeProgramaUnidade", ""], ["columnNome", ""], ["title", "In\u00EDcio", "orderBy", "data_inicio", 3, "template"], ["columnInicio", ""], ["title", "Fim", "orderBy", "data_fim", 3, "template"], ["columnFim", ""], ["titlePlanoCadeia", ""], ["columnPlanoCadeia", ""], [3, "title", "template"], ["columnStatus", ""], ["type", "options", 3, "dynamicOptions", "dynamicButtons"], [3, "rows"], [3, "buttons"], ["labelPosition", "left", "label", "Agrupar por Un.", "controlName", "agrupar", 3, "size", "control", "change"], ["labelPosition", "left", "label", "Vinculados", "controlName", "principais", 3, "size", "control", "labelInfo", "change", 4, "ngIf"], ["labelPosition", "left", "label", "Vinculados", "controlName", "principais", 3, "size", "control", "labelInfo", "change"], [1, "row"], ["controlName", "unidade_id", 3, "size", "control", "dao"], ["unidade", ""], ["label", "Data", "itemTodos", "- Nenhum -", "controlName", "data_filtro", 3, "size", "valueTodos", "control", "items"], ["date", "", "label", "In\u00EDcio", "controlName", "data_filtro_inicio", "labelInfo", "Data in\u00EDcio do per\u00EDodo", 3, "size", "disabled", "control"], ["date", "", "label", "Fim", "controlName", "data_filtro_fim", "labelInfo", "Data fim do per\u00EDodo", 3, "size", "disabled", "control"], ["label", "Meus", "controlName", "meus_planos", "labelInfo", "Planos de entrega da unidade da qual fa\u00E7o parte da gest\u00E3o", 3, "size", "control"], ["label", "Nome", "controlName", "nome", 3, "size", "control", "placeholder"], ["label", "Status", "controlName", "status", "itemTodos", "- Todos -", 3, "size", "control", "items", "filter", "valueTodos"], ["label", "Arq.", "controlName", "arquivadas", "labelInfo", "Listar tamb\u00E9m os planos de entregas arquivados", 3, "size", "control"], ["controlName", "planejamento_id", 3, "size", "control", "dao"], ["planejamento", ""], ["controlName", "cadeia_valor_id", 3, "size", "control", "dao"], ["cadeiaValor", ""], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate"], ["columnEntregas", ""], ["columnExpandedEntregas", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-list-check"], [3, "parent", "disabled", "entity", "execucao", "cdRef", "planejamentoId", "cadeiaValorId", "unidadeId"], ["by", "numero", 3, "header"], [1, "micro-text", "fw-ligh"], ["by", "nome", 3, "header"], [1, "text-break", "text-wrap"], ["color", "light", 3, "icon", "label", 4, "ngIf"], ["color", "secondary", 3, "icon", "label", 4, "ngIf"], ["color", "light", 3, "icon", "label"], ["color", "secondary", 3, "icon", "label"], ["color", "light", 3, "maxWidth", "icon", "label", 4, "ngIf"], ["color", "light", 3, "maxWidth", "icon", "label"], [3, "color", "icon", "label"], ["color", "warning", "icon", "bi bi-inboxes", "label", "Arquivado", 4, "ngIf"], ["color", "danger", "icon", "bi bi-trash3", "label", "Exclu\u00EDdo", 4, "ngIf"], [3, "align", "tipoAvaliacao", "nota", 4, "ngIf"], ["color", "warning", "icon", "bi bi-inboxes", "label", "Arquivado"], ["color", "danger", "icon", "bi bi-trash3", "label", "Exclu\u00EDdo"], [3, "align", "tipoAvaliacao", "nota"]],
  template: function PlanoEntregaListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵlistener"]("select", function PlanoEntregaListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](1, PlanoEntregaListComponent_toolbar_1_Template, 3, 4, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](2, "filter", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](3, PlanoEntregaListComponent_div_3_Template, 7, 13, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](4, PlanoEntregaListComponent_ng_template_4_Template, 15, 33, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](6, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](7, PlanoEntregaListComponent_column_7_Template, 5, 4, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](8, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](9, PlanoEntregaListComponent_ng_template_9_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](11, PlanoEntregaListComponent_ng_template_11_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](13, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](14, PlanoEntregaListComponent_ng_template_14_Template, 4, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](16, PlanoEntregaListComponent_ng_template_16_Template, 5, 5, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](18, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](19, PlanoEntregaListComponent_ng_template_19_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](21, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](22, PlanoEntregaListComponent_ng_template_22_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](24, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](25, PlanoEntregaListComponent_ng_template_25_Template, 3, 0, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](27, PlanoEntregaListComponent_ng_template_27_Template, 2, 2, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementStart"](29, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplate"](30, PlanoEntregaListComponent_ng_template_30_Template, 5, 6, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](32, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelement"](33, "pagination", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](5);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](10);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](12);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](15);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](17);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](20);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](23);
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](26);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](28);
      const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵreference"](31);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.canAdd())("hasEdit", false)("loadList", ctx.onGridLoad.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed)("visible", ctx.showFilter);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", ctx.isModal)("ngIfElse", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("titleTemplate", _r5)("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("titleTemplate", _r9)("template", _r11);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("template", _r15);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("titleTemplate", _r17)("template", _r19);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("title", "Status\nAvalia\u00E7\u00E3o")("template", _r21);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("dynamicOptions", ctx.dynamicOptions.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_26__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_11__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_12__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_13__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_14__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_15__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_19__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_20__.InputSelectComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_21__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_22__.BadgeComponent, _uteis_avaliar_avaliar_nota_badge_avaliar_nota_badge_component__WEBPACK_IMPORTED_MODULE_23__.AvaliarNotaBadgeComponent, _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_24__.PlanoEntregaListEntregaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 13984:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaMapaEntregasComponent: () => (/* binding */ PlanoEntregaMapaEntregasComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/entrega-dao.service */ 67465);
/* harmony import */ var src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/plano-entrega-entrega-dao.service */ 31021);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/plano-entrega-entrega.model */ 32398);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../plano-entrega.service */ 77447);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ 67501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _uteis_planejamento_show_planejamento_show_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../uteis/planejamento-show/planejamento-show.component */ 57045);
var _class;






















const _c0 = ["unidade"];
function PlanoEntregaMapaEntregasComponent_ng_container_0_planejamento_show_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "planejamento-show", 18);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("planejamento", ctx_r10.objetivo.planejamento);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaMapaEntregasComponent_ng_container_0_planejamento_show_1_Template, 1, 1, "planejamento-show", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 17)(3, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4, "Objetivo:");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r0.objetivo.planejamento);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](ctx_r0.objetivo.nome);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 21)(1, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2, "Cadeia de valor:");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](ctx_r11.processo.cadeia_valor.nome);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaMapaEntregasComponent_ng_container_1_div_1_Template, 5, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "div", 20)(3, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4, "Processo:");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r1.processo.cadeia_valor);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](ctx_r1.processo.nome);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_14_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 25);
  }
  if (rf & 2) {
    const row_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("icon", ctx_r13.entityService.getIcon("Unidade"))("label", row_r12.plano_entrega.unidade.sigla);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_14_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 26);
  }
  if (rf & 2) {
    const row_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", row_r12.destinatario);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, PlanoEntregaMapaEntregasComponent_ng_template_14_badge_3_Template, 1, 2, "badge", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](4, PlanoEntregaMapaEntregasComponent_ng_template_14_badge_4_Template, 1, 1, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", row_r12.descricao, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r12.plano_entrega.unidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r12.destinatario == null ? null : row_r12.destinatario.length);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_17_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r18.dao.getDateFormatted(row_r17.data_inicio), "");
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_17_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r19.dao.getDateFormatted(row_r17.data_fim), "");
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanoEntregaMapaEntregasComponent_ng_template_17_span_0_Template, 2, 1, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, PlanoEntregaMapaEntregasComponent_ng_template_17_span_2_Template, 2, 1, "span", 0);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r17.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r17.data_fim);
  }
}
function PlanoEntregaMapaEntregasComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "progress-bar", 27);
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("value", row_r22.progresso_realizado)("goal", row_r22.progresso_esperado);
  }
}
class PlanoEntregaMapaEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_plano_entrega_entrega_model__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaEntrega, src_app_dao_plano_entrega_entrega_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaEntregaDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (this.objetivoId) result.push(["objetivos.objetivo_id", "==", this.objetivoId]);
      if (this.processoId) result.push(["processos.processo_id", "==", this.processoId]);
      if (form.unidade_id) result.push(["plano_entrega.unidade_id", "==", form.unidade_id]);
      if (form.entrega_id) result.push(["entrega_id", "==", form.entrega_id]);
      if (form.data_inicio) result.push(["data_inicio", ">=", form.data_inicio]);
      if (form.data_fim) result.push(["data_fim", "<=", form.data_fim]);
      return result;
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    this.entregaDao = injector.get(src_app_dao_entrega_dao_service__WEBPACK_IMPORTED_MODULE_1__.EntregaDaoService);
    this.entregaService = injector.get(_plano_entrega_service__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaService);
    this.objetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__.PlanejamentoObjetivoDaoService);
    this.processoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__.CadeiaValorProcessoDaoService);
    /* Inicializações */
    this.join = ["plano_entrega.unidade"];
    this.title = this.lex.translate("Entregas");
    this.filter = this.fh.FormBuilder({
      unidade_id: {
        default: null
      },
      entrega_id: {
        default: null
      },
      data_inicio: {
        default: null
      },
      data_fim: {
        default: null
      }
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.objetivoId = this.urlParams.get("objetivo_id") || undefined;
    this.processoId = this.urlParams.get("processo_id") || undefined;
    if (this.objetivoId) {
      this.objetivoDao?.getById(this.objetivoId, ["planejamento"]).then(obj => {
        this.objetivo = obj;
      });
    }
    if (this.processoId) {
      this.processoDao?.getById(this.processoId, ['cadeia_valor']).then(processo => {
        this.processo = processo;
      });
    }
  }
  filterClear(filter) {
    filter.controls.unidade_id.setValue(null);
    filter.controls.entrega_id.setValue(null);
    filter.controls.data_inicio.setValue(null);
    filter.controls.data_fim.setValue(null);
    super.filterClear(filter);
  }
}
_class = PlanoEntregaMapaEntregasComponent;
_class.ɵfac = function PlanoEntregaMapaEntregasComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-mapa-entregas"]],
  viewQuery: function PlanoEntregaMapaEntregasComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 23,
  vars: 31,
  consts: [[4, "ngIf"], [3, "dao", "title", "orderBy", "join"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "unidade_id", 3, "size", "control", "dao"], ["unidade", ""], ["controlName", "entrega_id", 3, "size", "control", "dao"], ["entrega", ""], ["date", "", "noIcon", "", "label", "In\u00EDcio", "controlName", "data_inicio", "labelInfo", "Data de in\u00EDcio do planejamento institucional", 3, "size", "control"], ["date", "", "noIcon", "", "label", "Fim", "controlName", "data_fim", "labelInfo", "Data do fim do planejamento institucional", 3, "size", "control"], [3, "title", "template"], ["columnEntregaCliente", ""], ["columnDatas", ""], [3, "title", "width", "template"], ["columnProgresso", ""], [3, "rows"], [3, "planejamento", 4, "ngIf"], [1, "objetivos", "arrow_box", "w-100"], [3, "planejamento"], ["class", "planejamento arrow_box first-box w-100", 4, "ngIf"], [1, "procesos", "arrow_box", "w-100"], [1, "planejamento", "arrow_box", "first-box", "w-100"], [1, "d-block"], ["color", "light", 3, "icon", "label", 4, "ngIf"], ["color", "light", "icon", "bi bi-mailbox", 3, "label", 4, "ngIf"], ["color", "light", 3, "icon", "label"], ["color", "light", "icon", "bi bi-mailbox", 3, "label"], ["color", "success", 3, "value", "goal"]],
  template: function PlanoEntregaMapaEntregasComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanoEntregaMapaEntregasComponent_ng_container_0_Template, 7, 2, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanoEntregaMapaEntregasComponent_ng_container_1_Template, 7, 2, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "filter", 2)(5, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](6, "input-search", 4, 5)(8, "input-search", 6, 7)(10, "input-datetime", 8)(11, "input-datetime", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](12, "columns")(13, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, PlanoEntregaMapaEntregasComponent_ng_template_14_Template, 5, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](16, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](17, PlanoEntregaMapaEntregasComponent_ng_template_17_Template, 3, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](19, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](20, PlanoEntregaMapaEntregasComponent_ng_template_20_Template, 1, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](22, "pagination", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](15);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](18);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.objetivo);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.processo);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("join", ctx.join);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.entrega_id)("dao", ctx.entregaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Entrega\nDemandante/Destinat\u00E1rio")("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Data In\u00EDcio\nData Fim")("template", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Progresso")("width", 200)("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__.InputDatetimeComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_17__.ProgressBarComponent, _uteis_planejamento_show_planejamento_show_component__WEBPACK_IMPORTED_MODULE_18__.PlanejamentoShowComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 70683:
/*!******************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaRoutingModule: () => (/* binding */ PlanoEntregaRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-entrega-list/plano-entrega-list.component */ 23183);
/* harmony import */ var _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-entrega-form/plano-entrega-form.component */ 46435);
/* harmony import */ var _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component */ 13984);
/* harmony import */ var _plano_entrega_form_adesao_plano_entrega_form_adesao_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-entrega-form-adesao/plano-entrega-form-adesao.component */ 49546);
/* harmony import */ var _plano_entrega_form_entrega_plano_entrega_form_entrega_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-entrega-form-entrega/plano-entrega-form-entrega.component */ 62675);
/* harmony import */ var _plano_entrega_list_logs_plano_entrega_list_logs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-entrega-list-logs/plano-entrega-list-logs.component */ 21373);
/* harmony import */ var _plano_entrega_list_entrega_list_plano_entrega_list_entrega_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plano-entrega-list-entrega-list/plano-entrega-list-entrega-list.component */ 65659);
/* harmony import */ var _uteis_avaliar_avaliar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../uteis/avaliar/avaliar.component */ 50182);
/* harmony import */ var _plano_entrega_list_progresso_plano_entrega_list_progresso_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plano-entrega-list-progresso/plano-entrega-list-progresso.component */ 47775);
/* harmony import */ var _plano_entrega_form_progresso_plano_entrega_form_progresso_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plano-entrega-form-progresso/plano-entrega-form-progresso.component */ 39783);
/* harmony import */ var _plano_entrega_entrega_detalhes_plano_entrega_entrega_detalhes_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./plano-entrega-entrega-detalhes/plano-entrega-entrega-detalhes.component */ 6339);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;
















const routes = [{
  path: '',
  component: _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Plano de Entregas"
  }
}, {
  path: 'new',
  component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Plano de Entregas",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Plano de Entregas",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Plano de Entregas",
    modal: true
  }
}, {
  path: ':id/logs',
  component: _plano_entrega_list_logs_plano_entrega_list_logs_component__WEBPACK_IMPORTED_MODULE_7__.PlanoEntregaListLogsComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Logs de Alterações em Planos de Entregas",
    modal: true
  }
}, {
  path: ':planoEntregaId/avaliar',
  component: _uteis_avaliar_avaliar_component__WEBPACK_IMPORTED_MODULE_9__.AvaliarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Avaliar Plano de Entrega"
  }
}, {
  path: 'entrega',
  component: _plano_entrega_form_entrega_plano_entrega_form_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaFormEntregaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Entregas do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/:id/consult',
  component: _plano_entrega_form_entrega_plano_entrega_form_entrega_component__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaFormEntregaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta entrega do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/:id/detalhes',
  component: _plano_entrega_entrega_detalhes_plano_entrega_entrega_detalhes_component__WEBPACK_IMPORTED_MODULE_12__.PlanoEntregaEntregaDetalhesComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Detalhes da entrega do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entregaList',
  component: _plano_entrega_list_entrega_list_plano_entrega_list_entrega_list_component__WEBPACK_IMPORTED_MODULE_8__.PlanoEntregaListEntregaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Entregas do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/objetivos/:objetivo_id',
  component: _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaMapaEntregasComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Entregas do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/processos/:processo_id',
  component: _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaMapaEntregasComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Entregas do Plano de Entregas",
    modal: true
  }
}, {
  path: 'adesao',
  component: _plano_entrega_form_adesao_plano_entrega_form_adesao_component__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaFormAdesaoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Adesão a Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/progresso/:entrega_id',
  component: _plano_entrega_list_progresso_plano_entrega_list_progresso_component__WEBPACK_IMPORTED_MODULE_10__.PlanoEntregaListProgressoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Progressos da entrega do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/progresso/:entrega_id/new',
  component: _plano_entrega_form_progresso_plano_entrega_form_progresso_component__WEBPACK_IMPORTED_MODULE_11__.PlanoEntregaFormProgressoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Progresso entrega do Plano de Entregas",
    modal: true
  }
}, {
  path: 'entrega/progresso/:entrega_id/:id/edit',
  component: _plano_entrega_form_progresso_plano_entrega_form_progresso_component__WEBPACK_IMPORTED_MODULE_11__.PlanoEntregaFormProgressoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Progresso entrega do Plano de Entregas",
    modal: true
  }
}];
class PlanoEntregaRoutingModule {}
_class = PlanoEntregaRoutingModule;
_class.ɵfac = function PlanoEntregaRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](PlanoEntregaRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
  });
})();

/***/ }),

/***/ 36637:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaValorMetaInputComponent: () => (/* binding */ PlanoEntregaValorMetaInputComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
var _class;




function PlanoEntregaValorMetaInputComponent_input_number_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input-number", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function PlanoEntregaValorMetaInputComponent_input_number_0_Template_input_number_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.onValueChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r0.disabled)("icon", ctx_r0.icon)("label", ctx_r0.label || "Porcentagem")("control", ctx_r0.control)("labelInfo", ctx_r0.labelInfo);
  }
}
function PlanoEntregaValorMetaInputComponent_input_number_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input-number", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function PlanoEntregaValorMetaInputComponent_input_number_1_Template_input_number_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r5.onValueChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r1.disabled)("icon", ctx_r1.icon)("label", ctx_r1.label || "Num\u00E9rico")("control", ctx_r1.control)("labelInfo", ctx_r1.labelInfo);
  }
}
const _c0 = function () {
  return [];
};
function PlanoEntregaValorMetaInputComponent_input_select_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input-select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function PlanoEntregaValorMetaInputComponent_input_select_2_Template_input_select_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.onValueChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r2.disabled)("icon", ctx_r2.icon)("label", ctx_r2.label || "Qualitativo")("control", ctx_r2.control)("items", (ctx_r2.entrega == null ? null : ctx_r2.entrega.lista_qualitativos) || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c0))("labelInfo", ctx_r2.labelInfo);
  }
}
const _c1 = function () {
  return ["PORCENTAGEM"];
};
const _c2 = function () {
  return ["QUANTIDADE", "VALOR"];
};
const _c3 = function () {
  return ["QUALITATIVO"];
};
class PlanoEntregaValorMetaInputComponent {
  constructor() {
    this.class = 'form-group';
    this.icon = "";
    this.labelInfo = "";
    this._size = 0;
  }
  set size(size) {
    if (size != this._size) {
      this._size = size;
      this.class = this.class.replace(/\scol\-md\-[0-9]+/g, "") + " col-md-" + size;
    }
  }
  get size() {
    return this._size || 12;
  }
  checkTipoIndicador(tipos) {
    return tipos.includes(this.entrega?.tipo_indicador || "");
  }
  onValueChange(event) {
    if (this.change) this.change(this.control?.value, this.entrega);
  }
}
_class = PlanoEntregaValorMetaInputComponent;
_class.ɵfac = function PlanoEntregaValorMetaInputComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-entrega-valor-meta-input"]],
  hostVars: 2,
  hostBindings: function PlanoEntregaValorMetaInputComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.class);
    }
  },
  inputs: {
    entrega: "entrega",
    icon: "icon",
    label: "label",
    labelInfo: "labelInfo",
    disabled: "disabled",
    control: "control",
    change: "change",
    size: "size"
  },
  decls: 3,
  vars: 6,
  consts: [["sufix", "%", "required", "", 3, "disabled", "icon", "label", "control", "labelInfo", "change", 4, "ngIf"], ["required", "", 3, "disabled", "icon", "label", "control", "labelInfo", "change", 4, "ngIf"], ["required", "", 3, "disabled", "icon", "label", "control", "items", "labelInfo", "change", 4, "ngIf"], ["sufix", "%", "required", "", 3, "disabled", "icon", "label", "control", "labelInfo", "change"], ["required", "", 3, "disabled", "icon", "label", "control", "labelInfo", "change"], ["required", "", 3, "disabled", "icon", "label", "control", "items", "labelInfo", "change"]],
  template: function PlanoEntregaValorMetaInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, PlanoEntregaValorMetaInputComponent_input_number_0_Template, 1, 5, "input-number", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PlanoEntregaValorMetaInputComponent_input_number_1_Template, 1, 5, "input-number", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, PlanoEntregaValorMetaInputComponent_input_select_2_Template, 1, 7, "input-select", 2);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.checkTipoIndicador(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](3, _c1)));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.checkTipoIndicador(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c2)));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.checkTipoIndicador(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c3)));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_0__.InputSelectComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_1__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 15177:
/*!**********************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaModule: () => (/* binding */ PlanoEntregaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plano-entrega-routing.module */ 70683);
/* harmony import */ var _plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plano-entrega-list/plano-entrega-list.component */ 23183);
/* harmony import */ var _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plano-entrega-form/plano-entrega-form.component */ 46435);
/* harmony import */ var _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plano-entrega-list-entrega/plano-entrega-list-entrega.component */ 39285);
/* harmony import */ var _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component */ 13984);
/* harmony import */ var _plano_entrega_form_adesao_plano_entrega_form_adesao_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plano-entrega-form-adesao/plano-entrega-form-adesao.component */ 49546);
/* harmony import */ var _plano_entrega_form_entrega_plano_entrega_form_entrega_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plano-entrega-form-entrega/plano-entrega-form-entrega.component */ 62675);
/* harmony import */ var _planejamento_institucional_planejamento_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../planejamento-institucional/planejamento.module */ 1685);
/* harmony import */ var _cadeia_valor_cadeia_valor_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../cadeia-valor/cadeia-valor.module */ 45288);
/* harmony import */ var _plano_entrega_list_entrega_list_plano_entrega_list_entrega_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plano-entrega-list-entrega-list/plano-entrega-list-entrega-list.component */ 65659);
/* harmony import */ var _plano_entrega_list_logs_plano_entrega_list_logs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plano-entrega-list-logs/plano-entrega-list-logs.component */ 21373);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component */ 36637);
/* harmony import */ var _plano_entrega_entregas_plano_trabalho_plano_entrega_entregas_plano_trabalho_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./plano-entrega-entregas-plano-trabalho/plano-entrega-entregas-plano-trabalho.component */ 13402);
/* harmony import */ var _plano_trabalho_entrega_atividades_plano_trabalho_entrega_atividades_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./plano-trabalho-entrega-atividades/plano-trabalho-entrega-atividades.component */ 59495);
/* harmony import */ var _plano_entrega_list_progresso_plano_entrega_list_progresso_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./plano-entrega-list-progresso/plano-entrega-list-progresso.component */ 47775);
/* harmony import */ var _plano_entrega_form_progresso_plano_entrega_form_progresso_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./plano-entrega-form-progresso/plano-entrega-form-progresso.component */ 39783);
/* harmony import */ var _plano_entrega_entregas_vinculadas_plano_entrega_entregas_vinculadas_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./plano-entrega-entregas-vinculadas/plano-entrega-entregas-vinculadas.component */ 71032);
/* harmony import */ var _plano_entrega_entrega_detalhes_plano_entrega_entrega_detalhes_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./plano-entrega-entrega-detalhes/plano-entrega-entrega-detalhes.component */ 6339);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;























class PlanoEntregaModule {}
_class = PlanoEntregaModule;
_class.ɵfac = function PlanoEntregaModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaRoutingModule, _planejamento_institucional_planejamento_module__WEBPACK_IMPORTED_MODULE_8__.PlanejamentoModule, _cadeia_valor_cadeia_valor_module__WEBPACK_IMPORTED_MODULE_9__.CadeiaValorModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_22__.OrganizationChartModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_12__.UteisModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](PlanoEntregaModule, {
    declarations: [_plano_entrega_list_plano_entrega_list_component__WEBPACK_IMPORTED_MODULE_2__.PlanoEntregaListComponent, _plano_entrega_form_plano_entrega_form_component__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaFormComponent, _plano_entrega_list_entrega_plano_entrega_list_entrega_component__WEBPACK_IMPORTED_MODULE_4__.PlanoEntregaListEntregaComponent, _plano_entrega_form_adesao_plano_entrega_form_adesao_component__WEBPACK_IMPORTED_MODULE_6__.PlanoEntregaFormAdesaoComponent, _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaMapaEntregasComponent, _plano_entrega_mapa_entregas_plano_entrega_mapa_entregas_component__WEBPACK_IMPORTED_MODULE_5__.PlanoEntregaMapaEntregasComponent, _plano_entrega_form_entrega_plano_entrega_form_entrega_component__WEBPACK_IMPORTED_MODULE_7__.PlanoEntregaFormEntregaComponent, _plano_entrega_list_entrega_list_plano_entrega_list_entrega_list_component__WEBPACK_IMPORTED_MODULE_10__.PlanoEntregaListEntregaListComponent, _plano_entrega_list_logs_plano_entrega_list_logs_component__WEBPACK_IMPORTED_MODULE_11__.PlanoEntregaListLogsComponent, _plano_entrega_valor_meta_input_plano_entrega_valor_meta_input_component__WEBPACK_IMPORTED_MODULE_13__.PlanoEntregaValorMetaInputComponent, _plano_entrega_entregas_plano_trabalho_plano_entrega_entregas_plano_trabalho_component__WEBPACK_IMPORTED_MODULE_14__.PlanoEntregaEntregasPlanoTrabalhoComponent, _plano_trabalho_entrega_atividades_plano_trabalho_entrega_atividades_component__WEBPACK_IMPORTED_MODULE_15__.PlanoTrabalhoEntregaAtividadesComponent, _plano_entrega_list_progresso_plano_entrega_list_progresso_component__WEBPACK_IMPORTED_MODULE_16__.PlanoEntregaListProgressoComponent, _plano_entrega_form_progresso_plano_entrega_form_progresso_component__WEBPACK_IMPORTED_MODULE_17__.PlanoEntregaFormProgressoComponent, _plano_entrega_entregas_vinculadas_plano_entrega_entregas_vinculadas_component__WEBPACK_IMPORTED_MODULE_18__.PlanoEntregaEntregasVinculadasComponent, _plano_entrega_entrega_detalhes_plano_entrega_entrega_detalhes_component__WEBPACK_IMPORTED_MODULE_19__.PlanoEntregaEntregaDetalhesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _plano_entrega_routing_module__WEBPACK_IMPORTED_MODULE_1__.PlanoEntregaRoutingModule, _planejamento_institucional_planejamento_module__WEBPACK_IMPORTED_MODULE_8__.PlanejamentoModule, _cadeia_valor_cadeia_valor_module__WEBPACK_IMPORTED_MODULE_9__.CadeiaValorModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_22__.OrganizationChartModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_12__.UteisModule]
  });
})();

/***/ }),

/***/ 59495:
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-trabalho-entrega-atividades/plano-trabalho-entrega-atividades.component.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoEntregaAtividadesComponent: () => (/* binding */ PlanoTrabalhoEntregaAtividadesComponent)
/* harmony export */ });
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/reaction/reaction.component */ 32877);
var _class;










const _c0 = ["listaAtividades"];
function PlanoTrabalhoEntregaAtividadesComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Descri\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function PlanoTrabalhoEntregaAtividadesComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "reaction", 9);
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](row_r11.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("entity", row_r11);
  }
}
function PlanoTrabalhoEntregaAtividadesComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](0, " Un./");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "order", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Respons\u00E1vel");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "order", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Demandante");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r12 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("header", header_r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("header", header_r12);
  }
}
function PlanoTrabalhoEntregaAtividadesComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "badge", 13)(2, "badge", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "badge", 15);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", row_r13.unidade.sigla);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("icon", "bi " + ((row_r13.usuario == null ? null : row_r13.usuario.nome == null ? null : row_r13.usuario.nome.length) ? "bi-person-check" : "bi-person-x"))("label", ctx_r7.util.apelidoOuNome(row_r13.usuario, true) || "(N\u00E3o atribu\u00EDdo)")("hint", "Respons\u00E1vel: " + ((row_r13.usuario == null ? null : row_r13.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("label", ctx_r7.util.apelidoOuNome(row_r13.demandante, true) || "Desconhecido")("hint", "Demandante: " + ((row_r13.demandante == null ? null : row_r13.demandante.nome) || "Desconhecido"));
  }
}
function PlanoTrabalhoEntregaAtividadesComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "progress-bar", 16);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", row_r14.progresso);
  }
}
class PlanoTrabalhoEntregaAtividadesComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__.PageFrameBase {
  set entregaId(value) {
    if (this._entregaId != value) {
      this._entregaId = value;
    }
  }
  get entregaId() {
    return this._entregaId;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.items = [];
    this.loader = false;
    this.AtividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_0__.AtividadeDaoService);
    this.join = ['unidade', 'usuario', 'demandante', 'reacoes.usuario:id,nome,apelido'];
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }
  loadData() {
    this.loader = true;
    this.AtividadeDao.query({
      where: [["plano_trabalho_entrega_id", "==", this._entregaId], ["unidades_subordinadas", "==", true]],
      join: this.join
    }).asPromise().then(response => {
      this.items = response;
    }).finally(() => {
      this.loader = false;
    });
  }
}
_class = PlanoTrabalhoEntregaAtividadesComponent;
_class.ɵfac = function PlanoTrabalhoEntregaAtividadesComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["plano-trabalho-entrega-atividades"]],
  viewQuery: function PlanoTrabalhoEntregaAtividadesComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.listaAtividades = _t.first);
    }
  },
  inputs: {
    entregaId: "entregaId"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 10,
  consts: [[3, "items", "loading"], [3, "titleTemplate", "template"], ["titleIdAtividadeDescricao", ""], ["columnAtividadeDescricao", ""], ["titleUnResponsavelDemandante", ""], ["columnPessoas", ""], [3, "title", "width", "template"], ["columnProgressoEtiquetasChecklist", ""], [1, "micro-text", "fw-ligh", "atividade-descricao"], ["origem", "ATIVIDADE", 3, "entity"], ["by", "usuario.nome", 3, "header"], ["by", "demandante.nome", 3, "header"], [1, "text-nowrap"], ["icon", "bi bi-briefcase", "color", "light", 3, "label"], ["color", "light", 3, "icon", "label", "hint"], ["icon", "bi bi-cursor", "color", "light", 3, "label", "hint"], ["color", "success", 3, "value"]],
  template: function PlanoTrabalhoEntregaAtividadesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "grid", 0)(3, "columns")(4, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PlanoTrabalhoEntregaAtividadesComponent_ng_template_5_Template, 2, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, PlanoTrabalhoEntregaAtividadesComponent_ng_template_7_Template, 3, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, PlanoTrabalhoEntregaAtividadesComponent_ng_template_10_Template, 6, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, PlanoTrabalhoEntregaAtividadesComponent_ng_template_12_Template, 4, 6, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, PlanoTrabalhoEntregaAtividadesComponent_ng_template_15_Template, 1, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](6);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](11);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](13);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("", ctx.lex.translate("Atividades"), ":");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("items", ctx.items)("loading", ctx.loader);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r0)("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("titleTemplate", _r4)("template", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", "Progresso")("width", 200)("template", _r8);
    }
  },
  dependencies: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__.ColumnComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_5__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_6__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__.ProgressBarComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_8__.ReactionComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=5177.js.map