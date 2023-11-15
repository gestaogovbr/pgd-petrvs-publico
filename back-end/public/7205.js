"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[7205],{

/***/ 73482:
/*!**************************************!*\
  !*** ./src/app/dao/query-options.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryOptions: () => (/* binding */ QueryOptions)
/* harmony export */ });
class QueryOptions {
  constructor(data) {
    if (data) Object.assign(this, data);
  }
}

/***/ }),

/***/ 93164:
/*!********************************************!*\
  !*** ./src/app/models/capacidade.model.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Capacidade: () => (/* binding */ Capacidade)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Capacidade extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.perfil_id = null; /* ID do Perfil */
    this.tipo_capacidade_id = ""; /* ID do Tipo_capacidade  */
    this.initialization(data);
  }
}

/***/ }),

/***/ 89561:
/*!****************************************!*\
  !*** ./src/app/models/perfil.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Perfil: () => (/* binding */ Perfil)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Perfil extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.capacidades = []; /* Objecto com lista de capacidades */
    this.nivel = 0; /* Nível de permissões */
    this.nome = ""; /* Nome do perfil */
    this.descricao = ""; /* Descrição sobre o perfil */
    this.initialization(data);
  }
}

/***/ }),

/***/ 40625:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/perfil-form/perfil-form.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerfilFormComponent: () => (/* binding */ PerfilFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var src_app_dao_query_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/query-options */ 73482);
/* harmony import */ var src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-capacidade-dao.service */ 96150);
/* harmony import */ var src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/capacidade.model */ 93164);
/* harmony import */ var src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/perfil.model */ 89561);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);

var _class;


















function PerfilFormComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h3", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function PerfilFormComponent_tab_9_ng_template_5_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", row_r13.filhos == null ? null : row_r13.filhos.length, "");
  }
}
function PerfilFormComponent_tab_9_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, PerfilFormComponent_tab_9_ng_template_5_span_0_Template, 3, 1, "span", 23);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r13.filhos == null ? null : row_r13.filhos.length);
  }
}
function PerfilFormComponent_tab_9_ng_template_7_tr_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "tr")(1, "td")(2, "div", 28)(3, "span", 29)(4, "small", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](7, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "td")(9, "div", 33)(10, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "td", 35)(13, "div", 36)(14, "span", 37)(15, "input-switch", 38, 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PerfilFormComponent_tab_9_ng_template_7_tr_2_Template_input_switch_change_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r21);
      const row_r18 = restoredCtx.$implicit;
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](16);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r20.onHabilitadoChangeFilha(row_r18, _r19.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", row_r18.codigo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](row_r18.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 1)("size", 2)("disabled", ctx_r17.action == "consult" ? "true" : undefined)("source", row_r18);
  }
}
function PerfilFormComponent_tab_9_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "table", 26)(1, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, PerfilFormComponent_tab_9_ng_template_7_tr_2_Template, 17, 6, "tr", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", row_r16.filhos);
  }
}
function PerfilFormComponent_tab_9_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 40)(1, "strong", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](row_r22.codigo);
  }
}
function PerfilFormComponent_tab_9_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", row_r23.descricao, "");
  }
}
function PerfilFormComponent_tab_9_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "input-switch", 42, 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function PerfilFormComponent_tab_9_ng_template_16_Template_input_switch_change_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r27);
      const row_r24 = restoredCtx.row;
      const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](1);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r26.onHabilitadoChange(row_r24, _r25.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r12.action == "consult" ? "true" : undefined)("source", row_r24);
  }
}
function PerfilFormComponent_tab_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "tab", 10)(1, "grid", 11, 12)(3, "columns")(4, "column", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](5, PerfilFormComponent_tab_9_ng_template_5_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](7, PerfilFormComponent_tab_9_ng_template_7_Template, 3, 1, "ng-template", 15, 16, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "column", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](10, PerfilFormComponent_tab_9_ng_template_10_Template, 3, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "column", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](13, PerfilFormComponent_tab_9_ng_template_13_Template, 2, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, PerfilFormComponent_tab_9_ng_template_16_Template, 2, 2, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](6);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](8);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](11);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](14);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](17);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", ctx_r1.lex.noun("Capacidade", true));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("items", ctx_r1.tiposCapacidades)("scrollable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("align", "center")("hint", "Lista das capacidades com status m\u00F3dulo")("template", _r3)("expandTemplate", _r5)("minWidth", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r7)("minWidth", 160)("maxWidth", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", ctx_r1.lex.noun("M\u00F3dulo/Capacidade"))("template", _r9)("minWidth", 600);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r11);
  }
}
class PerfilFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_8__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_7__.Perfil, src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_3__.PerfilDaoService);
    this.injector = injector;
    this.tiposCapacidades = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Perfil") + ': ' + (entity?.nome || "");
    };
    this.tipoCapacidadeDao = injector.get(src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoCapacidadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      capacidades: {
        default: []
      },
      descricao: {
        default: ""
      },
      nivel: {
        default: ""
      },
      data_inicio: {
        default: ""
      },
      data_fim: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.join = ["capacidades.tipo_capacidade"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      _this.entity = entity;
      var queryOptions = new src_app_dao_query_options__WEBPACK_IMPORTED_MODULE_4__.QueryOptions({
        where: [["grupo_id", "==", null]],
        orderBy: [["codigo", "asc"]],
        join: ["filhos"]
      });
      _this.tiposCapacidades = yield _this.tipoCapacidadeDao.query(queryOptions).asPromise();
      formValue = _this.util.fillForm(formValue, entity);
      for (let tipoCapacidade of _this.tiposCapacidades) {
        const capacidade = entity.capacidades?.find(x => x.tipo_capacidade?.codigo == tipoCapacidade.codigo);
        tipoCapacidade._metadata = Object.assign(tipoCapacidade._metadata || {}, {
          habilitado: !!capacidade
        });
        if (capacidade) console.log(capacidade.tipo_capacidade?.codigo);
        for (let tipoCapacidadeFilha of tipoCapacidade.filhos) {
          const capacidadeFilha = entity.capacidades?.find(x => x.tipo_capacidade?.codigo == tipoCapacidadeFilha.codigo);
          tipoCapacidadeFilha._metadata = Object.assign(tipoCapacidadeFilha._metadata || {}, {
            habilitado: !!capacidadeFilha
          });
        }
      }
      form.patchValue(formValue);
    })();
  }
  onHabilitadoChange(row, habilitado) {
    let capacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == row.id);
    if (habilitado) {
      if (capacidade && capacidade._status == "DELETE") capacidade._status = undefined;
      if (!capacidade) this.entity.capacidades.push(new src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_6__.Capacidade({
        tipo_capacidade_id: row.id,
        perfil_id: this.entity.id,
        _status: "ADD"
      }));
    } else {
      if (capacidade && !capacidade._status) capacidade._status = "DELETE";
      if (capacidade && capacidade._status == "ADD") this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == row.id), 1);
      for (let filho of row.filhos) {
        filho._metadata = Object.assign(filho._metadata || {}, {
          habilitado: false
        });
        let subCapacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == filho.id);
        if (subCapacidade && !subCapacidade._status) subCapacidade._status = "DELETE";
        if (subCapacidade && subCapacidade._status == "ADD") this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == filho.id), 1);
      }
    }
    this.refreshCapacidadesHabilitadas();
  }
  refreshCapacidadesHabilitadas() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, _this2.form.value);
      formValue = _this2.util.fillForm(formValue, _this2.entity);
      _this2.form.patchValue(formValue);
      _this2.cdRef.detectChanges();
    })();
  }
  onHabilitadoChangeFilha(row, habilitado) {
    let capacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == row.id);
    let pai = this.tiposCapacidades.find(x => x.id == row.grupo_id);
    if (habilitado) {
      if (!pai._metadata.habilitado) {
        pai._metadata = Object.assign(pai._metadata || {}, {
          habilitado: true
        });
        let capacidadePai = this.entity.capacidades?.find(x => x.tipo_capacidade_id == pai.id);
        if (capacidadePai && capacidadePai._status == "DELETE") capacidadePai._status = undefined;
        if (!capacidadePai) this.entity.capacidades.push(new src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_6__.Capacidade({
          tipo_capacidade_id: pai.id,
          perfil_id: this.entity.id,
          _status: "ADD"
        }));
      }
      if (capacidade && capacidade._status == "DELETE") capacidade._status = undefined;
      if (!capacidade) this.entity.capacidades.push(new src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_6__.Capacidade({
        tipo_capacidade_id: row.id,
        perfil_id: this.entity.id,
        _status: "ADD"
      }));
    } else {
      if (capacidade && !capacidade._status) capacidade._status = "DELETE";
      if (capacidade && capacidade._status == "ADD") this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == row.id), 1);
    }
    this.refreshCapacidadesHabilitadas();
  }
  initializeData(form) {
    form.patchValue(new src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_7__.Perfil());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let perfil = this.util.fill(new src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_7__.Perfil(), this.entity);
      perfil = this.util.fillForm(perfil, this.form.value);
      perfil.capacidades = perfil.capacidades.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      resolve(perfil);
    });
  }
}
_class = PerfilFormComponent;
_class.ɵfac = function PerfilFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-perfil-form"]],
  viewQuery: function PerfilFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.gridPai = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 10,
  vars: 10,
  consts: [["class", "my-2", 4, "ngIf"], ["initialFocus", "nome", 3, "form", "disabled", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "Nome", "controlName", "nome", "required", "", 3, "size"], ["numbers", "", "label", "N\u00EDvel", "controlName", "nivel", 3, "size"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size"], ["key", "CAPACIDADES", 3, "label", 4, "ngIf"], [1, "my-2"], ["key", "CAPACIDADES", 3, "label"], [3, "items", "scrollable"], ["gridPai", ""], ["type", "expand", "icon", "bi bi-shield-lock", 3, "align", "hint", "template", "expandTemplate", "minWidth"], ["columnCapacidades", ""], ["style", "justify-content: inherit;"], ["columnExpandedCapacidades", ""], ["title", "C\u00F3digo", "orderBy", "codigo", 3, "template", "minWidth", "maxWidth"], ["columnCodCapacidade", ""], [3, "title", "template", "minWidth"], ["columnTipoCapacidade", ""], ["title", "Habilitado", 3, "template"], ["columnSelecionado", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-grid"], [1, "table", "table-hover"], [4, "ngFor", "ngForOf"], [2, "width", "220px"], [1, "text-wrap", "text-center"], [1, "micro-text", "fw-light"], [1, "bi", "bi-key"], [1, "badge", "bg-light", "text-dark"], [2, "width", "450px"], [1, "badge", "bg-light", "text-dark", "text-wrap"], [2, "text-align", "right"], [2, "width", "60px", "margin-left", "40px"], [1, "text-align"], ["scale", "medium", "path", "_metadata.habilitado", 1, "text-align", 2, "right", "10px", 3, "size", "disabled", "source", "change"], ["habilitado", ""], [1, "text-wrap"], [1, "grid-group-text"], ["path", "_metadata.habilitado", 2, "width", "45px", "margin-right", "70px", 3, "disabled", "source", "change"]],
  template: function PerfilFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, PerfilFormComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "editable-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("submit", function PerfilFormComponent_Template_editable_form_submit_1_listener() {
        return ctx.onSaveData();
      })("cancel", function PerfilFormComponent_Template_editable_form_cancel_1_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "tabs", 2)(3, "tab", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "input-text", 5)(6, "input-text", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](8, "input-text", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](9, PerfilFormComponent_tab_9_Template, 18, 15, "tab", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.auth.hasPermissionTo("MOD_TIPO_CAP"));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__.TabComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 36749:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/perfil-list/perfil-list.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerfilListComponent: () => (/* binding */ PerfilListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/perfil.model */ 89561);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
var _class;













function PerfilListComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function PerfilListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r3 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r3.nivel);
  }
}
class PerfilListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_perfil_model__WEBPACK_IMPORTED_MODULE_2__.Perfil, src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__.PerfilDaoService);
    this.injector = injector;
    this.options = [];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Perfis");
    this.code = "MOD_CFG_PERFS";
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_PERF_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
}
_class = PerfilListComponent;
_class.ɵfac = function PerfilListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-perfil-list"]],
  viewQuery: function PerfilListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 14,
  vars: 22,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", "placeholder", "Nome...", 3, "size", "label", "control"], ["title", "Nome", "field", "nome"], ["title", "Descri\u00E7\u00E3o", "field", "descricao"], ["title", "N\u00EDvel de acesso", 3, "template"], ["columnNivel", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "my-2"]],
  template: function PerfilListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PerfilListComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "filter", 2)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "column", 5)(8, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, PerfilListComponent_ng_template_10_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](12, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "pagination", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", ctx.auth.hasPermissionTo("MOD_PERF_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PERF_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("label", "Nome " + ctx.lex.translate("Perfil"))("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 82872:
/*!***********************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/perfil-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerfilRoutingModule: () => (/* binding */ PerfilRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./perfil-form/perfil-form.component */ 40625);
/* harmony import */ var _perfil_list_perfil_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./perfil-list/perfil-list.component */ 36749);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _perfil_list_perfil_list_component__WEBPACK_IMPORTED_MODULE_3__.PerfilListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Perfils"
  }
}, {
  path: 'new',
  component: _perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_2__.PerfilFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Perfil",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_2__.PerfilFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Perfil",
    modal: true
  }
}, {
  path: ':perfil_id/capacidade',
  loadChildren: () => __webpack_require__.e(/*! import() */ 8448).then(__webpack_require__.bind(__webpack_require__, /*! ./capacidade/capacidade.module */ 18448)).then(m => m.CapacidadeModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: ':id/consult',
  component: _perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_2__.PerfilFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Perfil",
    modal: true
  }
}];
class PerfilRoutingModule {}
_class = PerfilRoutingModule;
_class.ɵfac = function PerfilRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PerfilRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 57205:
/*!***************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/perfil.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PerfilModule: () => (/* binding */ PerfilModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _perfil_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perfil-routing.module */ 82872);
/* harmony import */ var _perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perfil-form/perfil-form.component */ 40625);
/* harmony import */ var _perfil_list_perfil_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./perfil-list/perfil-list.component */ 36749);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class PerfilModule {}
_class = PerfilModule;
_class.ɵfac = function PerfilModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _perfil_routing_module__WEBPACK_IMPORTED_MODULE_0__.PerfilRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PerfilModule, {
    declarations: [_perfil_form_perfil_form_component__WEBPACK_IMPORTED_MODULE_1__.PerfilFormComponent, _perfil_list_perfil_list_component__WEBPACK_IMPORTED_MODULE_2__.PerfilListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _perfil_routing_module__WEBPACK_IMPORTED_MODULE_0__.PerfilRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=7205.js.map