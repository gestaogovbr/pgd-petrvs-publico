"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8934],{

/***/ 5430:
/*!*******************************************************************!*\
  !*** ./src/app/dao/questionario-resposta-pergunta-dao.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaPerguntaDaoService: () => (/* binding */ QuestionarioRespostaPerguntaDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);


class QuestionarioRespostaPerguntaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("QuestionarioRespostaPergunta", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["resposta"];
  }
  static #_ = this.ɵfac = function QuestionarioRespostaPerguntaDaoService_Factory(t) {
    return new (t || QuestionarioRespostaPerguntaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: QuestionarioRespostaPerguntaDaoService,
    factory: QuestionarioRespostaPerguntaDaoService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46482:
/*!*******************************************************!*\
  !*** ./src/app/models/questionario-pergunta.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPergunta: () => (/* binding */ QuestionarioPergunta)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class QuestionarioPergunta extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.sequencia = 0; //sequencia da pergunta
    this.pergunta = ""; //pergunta
    this.tipo = "SELECT"; // tipo da resposta para esta pergunta
    this.criado_versao = 0; //versao de criacao
    this.deletado_versao = null; //versao em que for deletado
    this.respostas = null; // opções de respostas para essa pergunta
    this.initialization(data);
  }
}
/*
Preenchimento do campo respostas a depender do tipo:

EMOJI: LookupItem[] {key: "ICONE", value: "DESCRICAO", icon: "ICONE"}
SELECT: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
MULTI_SELECT: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
TEXT: undefined
TEXT_AREA: undefined
TIMER: {tipo: "DAYS_HOURS" | "DAYS" | "HOURS"}
DATE_TIME: {tipo: "DATE_TIME" | "DATE" | "TIME"}
SWICTH: LookupItem[] lookup.SIMNAO
NUMBER: undefined
RATE: {max: NUMBER, min: NUMBER},
RADIO: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
CHECK: LookupItem[] {key: "CODIGO", value: "DESCRICAO"}
*/
// tipos
//LIVRE - Resposta Aberta (Texto Livre): Permite que os respondentes expressem suas opiniões em suas próprias palavras.
//LISTA UNICA - Resposta de Escolha Única: respondente seleciona uma única opção entre as fornecidas.
//LISTA_MULTIPLA - O respondente pode selecionar várias opções entre as fornecidas.
//CLASSIFICACAO - O respondente avalia sua concordância ou discordância em uma escala. 
//VISUAL - O respondente fornece uma classificação visual, como estrelas ou emojis.
//NUMERICA - O respondente fornece um valor numérico como resposta.
//SWITCH - O respondente escolhe entre verdadeiro ou falso, sim ou não.
//INTENSIDADE - O respondente indica o nível de intensidade de uma característica. Ex. Em uma escala de 1 a 10, quão importante...
//ORDENACAO - O respondente ordena itens de acordo com suas preferências.
//LACUNA - O respondente preenche espaços em branco em uma frase.
//SWITCH-Resposta de Escolha Única: respondente seleciona uma única opção entre SIM ou NÃO.

/***/ }),

/***/ 29453:
/*!**********************************************!*\
  !*** ./src/app/models/questionario.model.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Questionario: () => (/* binding */ Questionario)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Questionario extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.tipo = "INTERNO"; //Tipo interno | personalizado
    this.nome = ""; //Nome do questionário
    this.codigo = ""; // Código do questionario
    this.versao = 0; //Perguntas do questionário
    this.perguntas = [];
    this.initialization(data);
  }
}

/***/ }),

/***/ 69262:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-list-pergunta/questionario-list-pergunta.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioListPerguntaComponent: () => (/* binding */ QuestionarioListPerguntaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/questionario.model */ 29453);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/badge/badge.component */ 95489);












function QuestionarioListPerguntaComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](row_r8.sequencia);
  }
}
function QuestionarioListPerguntaComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](row_r9.pergunta);
  }
}
function QuestionarioListPerguntaComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r5.lookup.getValue(ctx_r5.lookup.QUESTIONARIO_PERGUNTA_TIPO, row_r10.tipo), " ");
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_0_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "badge", 12);
  }
  if (rf & 2) {
    const resposta_r17 = ctx.$implicit;
    const i_r18 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("label", resposta_r17.key)("textValue", resposta_r17.data.valorResposta ? resposta_r17.data.valorResposta : (i_r18 + 1).toString())("icon", resposta_r17.icon);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, QuestionarioListPerguntaComponent_ng_template_12_ng_container_0_badge_2_Template, 1, 3, "badge", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", row_r11.respostas);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "badge", 16);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "badge", 17);
  }
  if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("textValue", row_r11.respostas.min);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_badge_1_Template, 1, 0, "badge", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_badge_2_Template, 1, 1, "badge", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "badge", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", row_r11.respostas.min == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", row_r11.respostas.min > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("textValue", row_r11.respostas.max);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainer"](0);
  }
}
function QuestionarioListPerguntaComponent_ng_template_12_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainer"](0);
  }
}
const _c0 = function () {
  return ["EMOJI", "SELECT", "MULTI_SELECT", "RADIO", "CHECK"];
};
function QuestionarioListPerguntaComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, QuestionarioListPerguntaComponent_ng_template_12_ng_container_0_Template, 3, 1, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, QuestionarioListPerguntaComponent_ng_template_12_ng_container_1_Template, 4, 3, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, QuestionarioListPerguntaComponent_ng_template_12_ng_container_2_Template, 1, 0, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, QuestionarioListPerguntaComponent_ng_template_12_ng_container_3_Template, 1, 0, "ng-container", 9);
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](4, _c0).includes(row_r11.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", row_r11.tipo == "NUMBER");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", row_r11.tipo == "TIMER");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", row_r11.tipo == "DATE_TIME");
  }
}
class QuestionarioListPerguntaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
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
  set questionarioId(value) {
    if (this._questionarioId != value) {
      this._questionarioId = value;
      this.loadPerguntas();
    }
  }
  get questionarioId() {
    return this._questionarioId;
  }
  set items(value) {
    if (this.items != value) {
      this.gridControl.value.perguntas = value;
      if (this.viewInit) this.cdRef.detectChanges();
    }
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__.Questionario());
    if (!this.gridControl.value.perguntas) this.gridControl.value.perguntas = [];
    return this.gridControl.value.perguntas;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.dao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPerguntaDaoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef);
    //this.orderBy = [['sequencia','asc']];
  }

  loadPerguntas() {
    this.dao.query({
      where: [["questionario_id", "==", this.questionarioId]],
      orderBy: [["sequencia", "asc"]]
    }).asPromise().then(rows => {
      this.items = rows || [];
    });
  }
  static #_ = this.ɵfac = function QuestionarioListPerguntaComponent_Factory(t) {
    return new (t || QuestionarioListPerguntaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: QuestionarioListPerguntaComponent,
    selectors: [["questionario-list-pergunta"]],
    viewQuery: function QuestionarioListPerguntaComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    inputs: {
      cdRef: "cdRef",
      noPersist: "noPersist",
      control: "control",
      entity: "entity",
      questionarioId: "questionarioId"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
    decls: 14,
    vars: 6,
    consts: [[3, "items", "title"], ["title", "Sequencia", 3, "template"], ["columnSequencia", ""], ["title", "Perguntas", 3, "template"], ["columnPerguntas", ""], ["title", "Tipo", 3, "template"], ["columnTipo", ""], ["title", "Op\u00E7\u00F5es - Valores", 3, "template"], ["columnOpcoes", ""], [4, "ngIf"], [1, "one-per-line"], ["class", "ml", 3, "label", "textValue", "icon", 4, "ngFor", "ngForOf"], [1, "ml", 3, "label", "textValue", "icon"], ["label", "M\u00EDnimo", "textValue", "0", 4, "ngIf"], ["label", "M\u00EDnimo", 3, "textValue", 4, "ngIf"], ["label", "M\u00E1ximo", 1, "ml", 3, "textValue"], ["label", "M\u00EDnimo", "textValue", "0"], ["label", "M\u00EDnimo", 3, "textValue"]],
    template: function QuestionarioListPerguntaComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "grid", 0)(1, "columns")(2, "column", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, QuestionarioListPerguntaComponent_ng_template_3_Template, 2, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, QuestionarioListPerguntaComponent_ng_template_6_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, QuestionarioListPerguntaComponent_ng_template_9_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, QuestionarioListPerguntaComponent_ng_template_12_Template, 4, 5, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](4);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](7);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](10);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.items)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("template", _r6);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_7__.BadgeComponent],
    styles: [".ml[_ngcontent-%COMP%] {\n  margin-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jYWRhc3Ryb3MvY3VycmljdWx1bS9xdWVzdGlvbmFyaW8vcXVlc3Rpb25hcmlvLWxpc3QtcGVyZ3VudGEvcXVlc3Rpb25hcmlvLWxpc3QtcGVyZ3VudGEuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLm1se1xyXG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 25767:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPerguntaFormComponent: () => (/* binding */ QuestionarioPerguntaFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_dao_questionario_resposta_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/questionario-resposta-pergunta-dao.service */ 5430);
/* harmony import */ var src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/questionario-pergunta.model */ 46482);
/* harmony import */ var src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/questionario.model */ 29453);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../components/input/input-number/input-number.component */ 9224);





















const _c0 = ["listaExemplo"];
const _c1 = ["listaTipoResposta"];
const _c2 = ["listaTipoRespostaB"];
function QuestionarioPerguntaFormComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", row_r14.pergunta, " ");
  }
}
function QuestionarioPerguntaFormComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-text", 29, 30);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", ctx_r7.lookup.getValue(ctx_r7.lookup.QUESTIONARIO_PERGUNTA_TIPO, row_r17.tipo), " ");
  }
}
function QuestionarioPerguntaFormComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "input-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("change", function QuestionarioPerguntaFormComponent_ng_template_31_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r19.onTipoPerguntaChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("items", ctx_r9.lookup.QUESTIONARIO_PERGUNTA_TIPO);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_34_div_0_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "badge", 36);
  }
  if (rf & 2) {
    const resposta_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", resposta_r25.value);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_34_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, QuestionarioPerguntaFormComponent_ng_template_34_div_0_badge_1_Template, 1, 1, "badge", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngForOf", row_r21.respostas);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_34_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate2"](" de ", row_r21.respostas.min, " at\u00E9 ", row_r21.respostas.max, " ");
  }
}
function QuestionarioPerguntaFormComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](0, QuestionarioPerguntaFormComponent_ng_template_34_div_0_Template, 2, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, QuestionarioPerguntaFormComponent_ng_template_34_div_1_Template, 2, 2, "div", 33);
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r11.isList(ctx_r11.formPergunta.controls.tipo.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r11.isRange(ctx_r11.formPergunta.controls.tipo.value));
  }
}
function QuestionarioPerguntaFormComponent_ng_template_36_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 8)(1, "input-multiselect", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](2, "input-text", 39, 40)(4, "input-text", 41, 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("addItemHandle", ctx_r29.addMultiRespostas.bind(ctx_r29));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵattribute"]("maxlength", 250);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_36_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](1, "input-number", 43)(2, "input-number", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6);
  }
}
function QuestionarioPerguntaFormComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](0, QuestionarioPerguntaFormComponent_ng_template_36_div_0_Template, 6, 6, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, QuestionarioPerguntaFormComponent_ng_template_36_div_1_Template, 3, 2, "div", 37);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r13.isList(ctx_r13.formPergunta.controls.tipo.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r13.isRange(ctx_r13.formPergunta.controls.tipo.value));
  }
}
class QuestionarioPerguntaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_6__.Questionario, src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_2__.QuestionarioDaoService);
    this.injector = injector;
    this.exemploLista = [{
      'key': '1',
      'value': 'Exemplo 1'
    }, {
      'key': '2',
      'value': 'Exemplo 2'
    }, {
      'key': '3',
      'value': 'Exemplo 3'
    }];
    this.exemploRadio = [{
      'key': '1',
      'value': 'Exemplo 1'
    }, {
      'key': '2',
      'value': 'Exemplo 2'
    }, {
      'key': '3',
      'value': 'Exemplo 3'
    }];
    this.perguntaValidate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.validate = (control, controlName) => {
      let result = null;
      if (['codigo'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + (entity?.nome || "");
    };
    this.questionarioPerguntaDao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaDaoService);
    this.questionarioRespostaPerguntaDao = injector.get(src_app_dao_questionario_resposta_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaPerguntaDaoService);
    this.join = ["perguntas"];
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      perguntas: {
        default: []
      },
      codigo: {
        default: ""
      },
      tipoQuestionario: {
        default: ""
      },
      switchExemplo: {
        default: false
      },
      switchAnonimo: {
        default: false
      }
    }, this.cdRef, this.validate);
    this.formPergunta = this.fh.FormBuilder({
      pergunta: {
        default: ""
      },
      tipo: {
        default: ""
      },
      respostas: {
        default: []
      },
      inputOpcoesResposta: {
        default: ""
      },
      inputValorResposta: {
        default: ""
      },
      inputMinimo: {
        default: 0
      },
      inputMaximo: {
        default: 10
      }
      //criado_versao: number | undefined;
      //deletado_versao: number | undefined;
    }, this.cdRef, this.perguntaValidate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = new src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_6__.Questionario();
      yield _this2.loadData(_this2.entity, _this2.form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let questionario = this.util.fill(new src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_6__.Questionario(), this.entity);
      questionario = this.util.fillForm(questionario, this.form.value);
      questionario.perguntas = this.form.controls.perguntas.value.filter(x => x._status?.length);
      resolve(questionario);
    });
  }
  addMultiRespostas() {
    let result = undefined;
    const opcaoResposta = this.formPergunta.controls.inputOpcoesResposta.value;
    const valorResposta = this.formPergunta.controls.inputValorResposta.value;
    const key = opcaoResposta;
    if (opcaoResposta && valorResposta && this.util.validateLookupItem(this.formPergunta.controls.respostas.value, key)) {
      result = {
        key: key,
        value: opcaoResposta + ' - ' + valorResposta,
        data: {
          opcaoResposta: opcaoResposta,
          valorResposta: valorResposta,
          _status: "ADD"
        }
      };
    }
    return result;
  }
  /**
   * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não.
   * @param row
   * @returns
   */
  /* public async remove(row: any) {
     return await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor?");
   }*/
  /**
   * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
  save(form, row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form?.markAllAsTouched();
      if (form?.valid) {
        row.pergunta = form.pergunta;
        row.tipo = form.tipo;
        // limpar campos do formulario
        // TODO
        return row;
      }
      return undefined;
    })();
  }
  isList(tipo) {
    return ['SELECT', 'MULTI_SELECT'].includes(tipo);
  }
  isRange(tipo) {
    return ['RATE', 'NUMBER'].includes(tipo);
  }
  addPergunta() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const maxSequencia = Math.max(0, ...(_this3.form.controls.perguntas.value || []).map(x => x.sequencia));
      return new src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioPergunta({
        sequencia: maxSequencia + 1,
        _status: "ADD"
      });
    })();
  }
  loadPergunta(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.formPergunta.controls.pergunta.setValue(row.pergunta);
      _this4.formPergunta.controls.tipo.setValue(row.tipo);
      _this4.formPergunta.controls.respostas.setValue(_this4.isList(row.tipo) ? row.respostas || [] : []);
      _this4.formPergunta.controls.inputMinimo.setValue(_this4.isRange(row.tipo) ? row.respostas.min : 0);
      _this4.formPergunta.controls.inputMaximo.setValue(_this4.isRange(row.tipo) ? row.respostas.max : 10);
    })();
  }
  removePergunta(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this5.dialog.confirm("Excluir ?", "Deseja realmente excluir esta pergunta?")) {
        row._status = "DEL";
        return true;
      }
      return undefined;
    })();
  }
  savePergunta(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form?.markAllAsTouched();
      if (form?.valid) {
        let values = form.value;
        row.pergunta = values.pergunta;
        row.tipo = values.tipo;
        row._status = row._status == "ADD" ? "ADD" : "EDIT";
        row.respostas = _this6.isList(values.tipo) ? values.respostas : _this6.isRange(values.tipo) ? {
          min: values.inputMinimo,
          max: values.inputMaximo
        } : null;
        return row;
      }
      return undefined;
    })();
  }
  onTipoPerguntaChange() {
    if (!this.isList(this.formPergunta.controls.tipo.value)) this.formPergunta.controls.respostas.setValue([]);
    if (!this.isRange(this.formPergunta.controls.tipo.value)) {
      this.formPergunta.controls.inputMinimo.setValue(0);
      this.formPergunta.controls.inputMaximo.setValue(10);
    }
    this.cdRef.detectChanges();
  }
  addItemHandle() {
    return {
      'key': 'key',
      'value': 'value'
    };
  }
  deleteItemHandle() {}
  static #_ = this.ɵfac = function QuestionarioPerguntaFormComponent_Factory(t) {
    return new (t || QuestionarioPerguntaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_18__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
    type: QuestionarioPerguntaFormComponent,
    selectors: [["questionario-pergunta-form"]],
    viewQuery: function QuestionarioPerguntaFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c1, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c2, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.listaExemplo = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.listaTipoResposta = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.listaTipoRespostaB = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵInheritDefinitionFeature"]],
    decls: 39,
    vars: 34,
    consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "C\u00F3digo", "icon", "bi bi-pen", "controlName", "codigo", 3, "size", "control"], ["label", "Nome", "icon", "bi bi-pen", "controlName", "nome", 3, "size", "control"], ["label", "Tipo", "icon", "bi bi-pen", "controlName", "tipoQuestionario", 3, "size", "control", "items"], ["label", "An\u00F4nimo", "icon", "fas fa-chalkboard", "controllName", "switchAnonimo", 3, "size", "control"], ["switchAnonimo", ""], ["title", "Exemplo dos tipos de respostas para as perguntas"], [1, "row"], [1, "col-md-3"], ["title", "Lista"], ["label", "Op\u00E7\u00F5es", "icon", "bi bi-pen", "controlName", "listaExemplo", 3, "size", "items"], ["title", "\u00DAnica escolha"], ["title", "M\u00FAltipla escolha"], ["title", "Sim ou N\u00E3o"], ["icon", "fas fa-chalkboard", "controllName", "switchExemplo", 3, "size", "label", "control"], ["switchExemplo", ""], ["title", "Perguntas"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], [3, "title", "template", "editTemplate"], ["columnPergunta", ""], ["editPergunta", ""], ["title", "Tipo de Resposta", "titleHint", "Escolha o tipo de op\u00E7\u00E3o de resposta", 3, "template", "editTemplate"], ["columnTipoResposta", ""], ["editTipoResposta", ""], ["title", "Op\u00E7\u00F5es para a Resposta", "titleHint", "Informe as escolhas de respostas da pergunta", 3, "template", "editTemplate"], ["columnResposta", ""], ["editResposta", ""], ["type", "options"], ["label", "", "icon", "", "controlName", "pergunta", 3, "size"], ["pergunta", ""], ["label", "", "icon", "", "controlName", "tipo", 3, "size", "items", "change"], ["class", "text-wrap width-min-content", 4, "ngIf"], [4, "ngIf"], [1, "text-wrap", "width-min-content"], [3, "label", 4, "ngFor", "ngForOf"], [3, "label"], ["class", "row", 4, "ngIf"], ["label", "", "controlName", "respostas", "noBox", "", 3, "size", "addItemHandle"], ["label", "Op\u00E7\u00F5es da resposta", "icon", "bi bi-pencil-fill", "controlName", "inputOpcoesResposta", 3, "size"], ["opcoesResposta", ""], ["label", "Valor da resposta", "icon", "bi bi-pencil-fill", "controlName", "inputValorResposta", 3, "size"], ["valorResposta", ""], ["label", "M\u00EDnimo", "controlName", "inputMinimo", 3, "size"], ["label", "M\u00E1ximo", "controlName", "inputMaximo", 3, "size"]],
    template: function QuestionarioPerguntaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("submit", function QuestionarioPerguntaFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function QuestionarioPerguntaFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](2, "input-text", 2)(3, "input-text", 3)(4, "input-select", 4)(5, "input-switch", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](7, "separator", 7)(8, "div", 8)(9, "div", 9)(10, "separator", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](11, "input-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](13, "separator", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](15, "separator", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](16, "div", 9)(17, "separator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](18, "input-switch", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](20, "separator", 17)(21, "grid", 18)(22, "columns")(23, "column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](24, QuestionarioPerguntaFormComponent_ng_template_24_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](26, QuestionarioPerguntaFormComponent_ng_template_26_Template, 2, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](28, "column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](29, QuestionarioPerguntaFormComponent_ng_template_29_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](31, QuestionarioPerguntaFormComponent_ng_template_31_Template, 1, 2, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](33, "column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](34, QuestionarioPerguntaFormComponent_ng_template_34_Template, 2, 2, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](36, QuestionarioPerguntaFormComponent_ng_template_36_Template, 2, 2, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](38, "column", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](19);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](25);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](27);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](30);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](32);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](35);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](37);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.codigo);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.tipoQuestionario)("items", ctx.lookup.QUESTIONARIO_TIPO);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.switchAnonimo);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 4)("items", ctx.exemploLista);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 2)("label", _r1.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.switchExemplo);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("control", ctx.form.controls.perguntas)("minHeight", 500)("form", ctx.formPergunta)("hasDelete", true)("add", ctx.addPergunta.bind(ctx))("load", ctx.loadPergunta.bind(ctx))("remove", ctx.removePergunta.bind(ctx))("save", ctx.savePergunta.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", ctx.lex.translate("Pergunta"))("template", _r2)("editTemplate", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("template", _r10)("editTemplate", _r12);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__.BadgeComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__.InputNumberComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 57631:
/*!*******************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-pergunta-list/questionario-list.component.ts ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioListComponent: () => (/* binding */ QuestionarioListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/questionario.model */ 29453);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
















function QuestionarioListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "toolbar");
  }
}
function QuestionarioListComponent_column_8_ng_template_1_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "badge", 17);
  }
  if (rf & 2) {
    const row_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", row_r6.perguntas == null ? null : row_r6.perguntas.length);
  }
}
function QuestionarioListComponent_column_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, QuestionarioListComponent_column_8_ng_template_1_badge_0_Template, 1, 1, "badge", 16);
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", row_r6.perguntas == null ? null : row_r6.perguntas.length);
  }
}
function QuestionarioListComponent_column_8_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "questionario-list-pergunta", 18);
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("entity", row_r9);
  }
}
function QuestionarioListComponent_column_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "column", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, QuestionarioListComponent_column_8_ng_template_1_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, QuestionarioListComponent_column_8_ng_template_3_Template, 1, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](2);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](4);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("align", "center")("hint", ctx_r1.lex.translate("Perguntas"))("template", _r2)("expandTemplate", _r4);
  }
}
class QuestionarioListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_2__.Questionario, src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_1__.QuestionarioDaoService);
    this.injector = injector;
    this.tipoQuestionario = [{
      'key': 'Interno',
      'value': 'Interno'
    }, {
      'key': 'Personalizado',
      'value': 'Personalizado'
    }];
    this.exibes = [];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      if (form.codigo?.length) {
        result.push(["codigo", "like", "%" + form.codigo.trim().replace(" ", "%") + "%"]);
      }
      if (form.tipo?.length) {
        result.push(["tipo", "like", "%" + form.tipo.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    this.join = ["perguntas"]; //perguntas.sequencia
    this.orderBy = [['nome', 'asc']];
    /* Inicializações */
    this.title = this.lex.translate("Questionários");
    this.code = "MOD_RX";
    //this.orderBy = [['sequencia','asc']];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      codigo: {
        default: ""
      },
      tipo: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    filter.controls.codigo.setValue("");
    filter.controls.tipo.setValue("");
    super.filterClear(filter);
  }
  onGridLoad(rows) {
    rows?.forEach(questionario => {
      questionario.perguntas = questionario.perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
    });
  }
  static #_ = this.ɵfac = function QuestionarioListComponent_Factory(t) {
    return new (t || QuestionarioListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: QuestionarioListComponent,
    selectors: [["questionario-list"]],
    viewQuery: function QuestionarioListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
    decls: 14,
    vars: 31,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "loadList", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["label", "C\u00F3digo", "controlName", "codigo", "placeholder", "C\u00F3digo", 3, "size", "control"], ["label", "Tipo do Question\u00E1rio", "controlName", "tipo", "placeholder", "Tipo", 3, "size", "control", "items"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "C\u00F3digo", "field", "codigo"], ["title", "Tipo", "field", "tipo"], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate"], ["columnPerguntas", ""], ["columnExpandedPerguntas", ""], ["icon", "bi bi-list-check", "color", "light", 3, "label", 4, "ngIf"], ["icon", "bi bi-list-check", "color", "light", 3, "label"], [3, "entity"]],
    template: function QuestionarioListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function QuestionarioListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, QuestionarioListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, QuestionarioListComponent_column_8_Template, 5, 4, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "column", 8)(10, "column", 9)(11, "column", 10)(12, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "pagination", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("loadList", ctx.onGridLoad.bind(ctx))("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.codigo);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.tipo)("items", ctx.tipoQuestionario);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent, _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_12__.QuestionarioListPerguntaComponent],
    styles: ["\n\n\n\n\n\n#opcoes[_ngcontent-%COMP%] {\n  display: block;\n}\n\n#tdOpcao[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jYWRhc3Ryb3MvY3VycmljdWx1bS9xdWVzdGlvbmFyaW8vcXVlc3Rpb25hcmlvLXBlcmd1bnRhL3F1ZXN0aW9uYXJpby1wZXJndW50YS1saXN0L3F1ZXN0aW9uYXJpby1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O01BQUE7QUFLQTtFQUNJLGNBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKiNvcGNvZXM6OmJlZm9yZXtcclxuICAgIGNvbnRlbnQ6IFwiXFxhXCI7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH0qL1xyXG4jb3Bjb2VzIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfVxyXG5cclxuI3RkT3BjYW97XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 67239:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-resposta/questionario-resposta-form/questionario-resposta-form.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaFormComponent: () => (/* binding */ QuestionarioRespostaFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);

class QuestionarioRespostaFormComponent {
  static #_ = this.ɵfac = function QuestionarioRespostaFormComponent_Factory(t) {
    return new (t || QuestionarioRespostaFormComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: QuestionarioRespostaFormComponent,
    selectors: [["app-questionario-resposta-form"]],
    decls: 2,
    vars: 0,
    template: function QuestionarioRespostaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "questionario-resposta-form works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 44762:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-resposta/questionario-resposta-list/questionario-resposta-list.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaListComponent: () => (/* binding */ QuestionarioRespostaListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);

class QuestionarioRespostaListComponent {
  static #_ = this.ɵfac = function QuestionarioRespostaListComponent_Factory(t) {
    return new (t || QuestionarioRespostaListComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: QuestionarioRespostaListComponent,
    selectors: [["app-questionario-resposta-list"]],
    decls: 2,
    vars: 0,
    template: function QuestionarioRespostaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "questionario-resposta-list works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 77554:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-routing.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRoutingModule: () => (/* binding */ QuestionarioRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-list/questionario-list.component */ 57631);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component */ 25767);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);









const routes = [{
  path: '',
  component: _questionario_pergunta_questionario_pergunta_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Lista",
    modal: false
  }
}, {
  path: 'new',
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão",
    modal: false
  }
}, {
  path: ':id/edit',
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consultar",
    modal: true
  }
}, {
  path: 'resposta/list',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão",
    modal: true
  }
}, {
  path: 'resposta/new',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão",
    modal: true
  }
}, {
  path: 'resposta/:id/edit',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição",
    modal: true
  }
}, {
  path: 'resposta/:id/consult',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consultar",
    modal: true
  }
}, {
  path: 'teste',
  component: _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__.QuestionarioListPerguntaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consultar",
    modal: true
  }
}];
class QuestionarioRoutingModule {
  static #_ = this.ɵfac = function QuestionarioRoutingModule_Factory(t) {
    return new (t || QuestionarioRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: QuestionarioRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](QuestionarioRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 98934:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioModule: () => (/* binding */ QuestionarioModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-list/questionario-list.component */ 57631);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component */ 25767);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-form/questionario-resposta-form.component */ 67239);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
/* harmony import */ var _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./questionario-routing.module */ 77554);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);










class QuestionarioModule {
  static #_ = this.ɵfac = function QuestionarioModule_Factory(t) {
    return new (t || QuestionarioModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: QuestionarioModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](QuestionarioModule, {
    declarations: [_questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__.QuestionarioListPerguntaComponent, _questionario_pergunta_questionario_pergunta_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_1__.QuestionarioListComponent, _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPerguntaFormComponent, _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioRespostaListComponent, _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=8934.js.map