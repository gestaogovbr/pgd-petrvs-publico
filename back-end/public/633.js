"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[633],{

/***/ 62398:
/*!***************************************************************!*\
  !*** ./src/app/models/tipo-avaliacao-justificativas.model.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoJustificativa: () => (/* binding */ TipoAvaliacaoJustificativa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoAvaliacaoJustificativa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.tipo_avaliacao_nota_id = "";
    this.tipo_justificativa_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 70721:
/*!***********************************************!*\
  !*** ./src/app/models/tipo-avaliacao-nota.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoNota: () => (/* binding */ TipoAvaliacaoNota)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoAvaliacaoNota extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.sequencia = 0;
    this.nota = 0;
    this.descricao = "";
    this.aprova = false;
    this.justifica = false;
    this.pergunta = "";
    this.icone = "";
    this.cor = "";
    this.codigo = "";
    this.justificativas = [];
    this.tipo_avaliacao_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 76609:
/*!************************************************!*\
  !*** ./src/app/models/tipo-avaliacao.model.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacao: () => (/* binding */ TipoAvaliacao)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoAvaliacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.notas = []; /* Notas */
    this.tipo = 'QUANTITATIVO'; /* Se a nota será um número ou um conceito */
    this.nome = ""; /* Nome do tipo de avaliação */
    this.initialization(data);
  }
}

/***/ }),

/***/ 76890:
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-form/tipo-avaliacao-form.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoFormComponent: () => (/* binding */ TipoAvaliacaoFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ 20207);
/* harmony import */ var src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/tipo-avaliacao.model */ 76609);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-justificativa-dao.service */ 79055);
/* harmony import */ var src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/tipo-justificativa.model */ 65296);
/* harmony import */ var src_app_models_tipo_avaliacao_nota__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/tipo-avaliacao-nota */ 70721);
/* harmony import */ var src_app_models_tipo_avaliacao_justificativas_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/tipo-avaliacao-justificativas.model */ 62398);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ 66848);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);

var _class;






















function TipoAvaliacaoFormComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](row_r18.nota);
  }
}
function TipoAvaliacaoFormComponent_ng_template_12_input_number_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-number", 23);
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r20.formNota.controls.nota);
  }
}
function TipoAvaliacaoFormComponent_ng_template_12_input_text_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-text", 23);
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r21.formNota.controls.nota);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
  }
}
function TipoAvaliacaoFormComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, TipoAvaliacaoFormComponent_ng_template_12_input_number_0_Template, 1, 1, "input-number", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, TipoAvaliacaoFormComponent_ng_template_12_input_text_1_Template, 1, 2, "input-text", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "input-text", 22);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.form.controls.tipo.value == "QUANTITATIVO");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.form.controls.tipo.value == "QUALITATIVO");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r5.formNota.controls.codigo);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
  }
}
function TipoAvaliacaoFormComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 24);
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", row_r22.descricao)("icon", row_r22.icone)("color", row_r22.cor);
  }
}
function TipoAvaliacaoFormComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-text", 25)(1, "input-select", 26)(2, "input-color", 27);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r9.formNota.controls.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx_r9.formNota.controls.icone)("items", ctx_r9.lookup.ICONES);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx_r9.formNota.controls.cor);
  }
}
function TipoAvaliacaoFormComponent_ng_template_20_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 31);
  }
}
function TipoAvaliacaoFormComponent_ng_template_20_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 32);
  }
}
function TipoAvaliacaoFormComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, TipoAvaliacaoFormComponent_ng_template_20_badge_3_Template, 1, 0, "badge", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, TipoAvaliacaoFormComponent_ng_template_20_badge_4_Template, 1, 0, "badge", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r24 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](row_r24.pergunta);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", row_r24.aprova);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", row_r24.justifica);
  }
}
function TipoAvaliacaoFormComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-text", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "input-switch", 33)(3, "input-switch", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx_r13.formNota.controls.pergunta);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx_r13.formNota.controls.aprova);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx_r13.formNota.controls.justifica);
  }
}
function TipoAvaliacaoFormComponent_ng_template_25_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 36);
  }
  if (rf & 2) {
    const justificativa_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", justificativa_r30.tipo_justificativa.nome);
  }
}
function TipoAvaliacaoFormComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, TipoAvaliacaoFormComponent_ng_template_25_badge_1_Template, 1, 1, "badge", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngForOf", row_r28.justificativas);
  }
}
const _c0 = function () {
  return ["cadastros", "tipo-justificativa", "new"];
};
const _c1 = function (a0) {
  return {
    route: a0
  };
};
function TipoAvaliacaoFormComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "input-multiselect", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "input-select", 38, 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](2);
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("canEdit", true)("addItemControl", _r32)("control", ctx_r17.formNota.controls.justificativas);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx_r17.formNota.controls.tipo_justificativa_id)("dao", ctx_r17.tipoJustificativaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](9, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction0"](8, _c0)));
  }
}
class TipoAvaliacaoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_3__.TipoAvaliacao, src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacaoDaoService);
    this.injector = injector;
    this.justificativasLista = [];
    this.tipoJustificativa = new src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_6__.TipoJustificativa();
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.validateNota = (control, controlName) => {
      let result = null;
      if (['pergunta', 'descricao', 'icone'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Tipo de Avaliação") + ': ' + (entity?.nome || "");
    };
    this.tipoJustificativaDao = injector.get(src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoJustificativaDaoService);
    this.join = ["notas.justificativas.tipo_justificativa"];
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      tipo: {
        default: "QUANTITATIVO"
      },
      notas: {
        default: []
      }
    }, this.cdRef, this.validate);
    this.formNota = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      nota: {
        default: 0
      },
      codigo: {
        default: ""
      },
      aprova: {
        default: false
      },
      pergunta: {
        default: ""
      },
      justifica: {
        default: false
      },
      icone: {
        default: ""
      },
      cor: {
        default: ""
      },
      justificativas: {
        default: []
      },
      tipo_justificativa_id: {
        default: null
      }
    }, this.cdRef, this.validateNota);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    this.entity = new src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_3__.TipoAvaliacao();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let tipoAvaliacao = this.util.fill(new src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_3__.TipoAvaliacao(), this.entity);
      tipoAvaliacao = this.util.fillForm(tipoAvaliacao, this.form.value);
      resolve(tipoAvaliacao);
    });
  }
  addNota() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_tipo_avaliacao_nota__WEBPACK_IMPORTED_MODULE_7__.TipoAvaliacaoNota({
        tipo_avaliacao_id: _this.entity.id,
        sequencia: _this.form.controls.notas.value.length + 1
      });
    })();
  }
  loadNota(form, row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.patchValue(row);
      form.controls.tipo_justificativa_id.setValue(null);
      form.controls.justificativas.setValue(row.justificativas?.map(x => Object.assign({}, {
        key: x.tipo_justificativa_id,
        value: x.tipo_justificativa.nome,
        data: x.tipo_justificativa
      })) || []);
    })();
  }
  removeNota(row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this2.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    })();
  }
  saveNota(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let justificativas = form.controls.justificativas.value || [];
      _this3.util.fillForm(row, form.value);
      row.justificativas = justificativas.map(x => {
        let older = (row.justificativas || []).find(y => y.tipo_justificativa_id == x.key);
        return older || new src_app_models_tipo_avaliacao_justificativas_model__WEBPACK_IMPORTED_MODULE_8__.TipoAvaliacaoJustificativa({
          tipo_avaliacao_nota_id: _this3.entity.id,
          tipo_justificativa_id: x.key,
          tipo_justificativa: x.data
        });
      });
      return row;
    })();
  }
}
_class = TipoAvaliacaoFormComponent;
_class.ɵfac = function TipoAvaliacaoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tipo-avaliacao-form"]],
  viewQuery: function TipoAvaliacaoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 30,
  vars: 25,
  consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "controlName", "nome", "required", "", 3, "size"], ["label", "Tipo da nota", "controlName", "tipo", 3, "size", "items"], ["tipo", ""], ["title", "Notas"], ["editable", "", 3, "control", "form", "hasDelete", "add", "load", "remove", "save"], ["grid", ""], ["title", "Nota", 3, "template", "editTemplate"], ["columnNota", ""], ["editNota", ""], ["title", "Descri\u00E7\u00E3o/Icone/Cor", 3, "template", "editTemplate"], ["columnDescricao", ""], ["editDescricao", ""], [3, "title", "template", "editTemplate"], ["columnPerguntaConfiguracoes", ""], ["editPerguntaConfiguracoes", ""], [3, "title", "width", "template", "editTemplate"], ["columnJustificativas", ""], ["editJustificativas", ""], ["type", "options"], [3, "control", 4, "ngIf"], ["placeholder", "C\u00F3digo integra\u00E7\u00E3o", 3, "control"], [3, "control"], [3, "label", "icon", "color"], ["placeholder", "Descri\u00E7\u00E3o", 3, "control"], ["icon", "fas fa-sign-out-alt", 3, "size", "control", "items"], [3, "size", "control"], [1, "one-per-line"], ["color", "success", "icon", "bi bi-check", "label", "Aprova", "hint", "Se para esta nota ser\u00E1 considerado como aprovado, quando aplic\u00E1vel", 4, "ngIf"], ["color", "warning", "icon", "bi bi-patch-question", "label", "Justifica", "hint", "Se para esta nota ser\u00E1 obrigat\u00F3rio uma justificativa", 4, "ngIf"], ["color", "success", "icon", "bi bi-check", "label", "Aprova", "hint", "Se para esta nota ser\u00E1 considerado como aprovado, quando aplic\u00E1vel"], ["color", "warning", "icon", "bi bi-patch-question", "label", "Justifica", "hint", "Se para esta nota ser\u00E1 obrigat\u00F3rio uma justificativa"], ["scale", "small", "labelPosition", "right", "label", "Aprova?", "labelInfo", "Se para esta nota ser\u00E1 considerado como aprovado, quando aplic\u00E1vel", 3, "size", "control"], ["scale", "small", "labelPosition", "right", "label", "Justifica?", "labelInfo", "Se para esta nota ser\u00E1 obrigat\u00F3rio uma justificativa", 3, "size", "control"], ["color", "light", 3, "label", 4, "ngFor", "ngForOf"], ["color", "light", 3, "label"], ["noBox", "", 3, "size", "canEdit", "addItemControl", "control"], ["fullEntity", "", 3, "size", "control", "dao", "addRoute"], ["justificativa", ""]],
  template: function TipoAvaliacaoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function TipoAvaliacaoFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function TipoAvaliacaoFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "input-text", 2)(3, "input-select", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "separator", 5)(6, "grid", 6, 7)(8, "columns")(9, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](10, TipoAvaliacaoFormComponent_ng_template_10_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](12, TipoAvaliacaoFormComponent_ng_template_12_Template, 3, 4, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](14, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](15, TipoAvaliacaoFormComponent_ng_template_15_Template, 1, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](17, TipoAvaliacaoFormComponent_ng_template_17_Template, 3, 7, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](19, "column", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](20, TipoAvaliacaoFormComponent_ng_template_20_Template, 5, 3, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](22, TipoAvaliacaoFormComponent_ng_template_22_Template, 4, 6, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](24, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](25, TipoAvaliacaoFormComponent_ng_template_25_Template, 2, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](27, TipoAvaliacaoFormComponent_ng_template_27_Template, 3, 11, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](29, "column", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](11);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](13);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](16);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](18);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](21);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](23);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](26);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("items", ctx.lookup.TIPO_AVALIACAO_TIPO);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("control", ctx.form.controls.notas)("form", ctx.formNota)("hasDelete", true)("add", ctx.addNota.bind(ctx))("load", ctx.loadNota.bind(ctx))("remove", ctx.removeNota.bind(ctx))("save", ctx.saveNota.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", "Pergunta motivacional\nConfigura\u00E7\u00F5es")("template", _r10)("editTemplate", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", ctx.lex.translate("Tipos de justificativa"))("width", 300)("template", _r14)("editTemplate", _r16);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_9__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__.InputSelectComponent, _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_15__.InputColorComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_17__.SeparatorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_18__.BadgeComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_19__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 32017:
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-list/tipo-avaliacao-list.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoListComponent: () => (/* binding */ TipoAvaliacaoListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ 20207);
/* harmony import */ var src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-avaliacao.model */ 76609);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
var _class;














function TipoAvaliacaoListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar");
  }
}
function TipoAvaliacaoListComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r5 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", row_r5.nome, " ");
  }
}
function TipoAvaliacaoListComponent_ng_template_10_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r7.getNotasText(row_r6.notas), " ");
  }
}
function TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_badge_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 19);
  }
}
function TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_badge_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 20);
  }
}
function TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_badge_10_Template, 1, 0, "badge", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_badge_11_Template, 1, 0, "badge", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const nota_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("label", nota_r12.nota)("icon", nota_r12.icon)("color", nota_r12.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", nota_r12.descricao, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](nota_r12.pergunta);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", nota_r12.aprova);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", nota_r12.justifica);
  }
}
function TipoAvaliacaoListComponent_ng_template_10_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "table", 13)(1, "thead")(2, "tr")(3, "th", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "Nota");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "th", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, "Descri\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "Pergunta motivacional");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "th", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11, "Op\u00E7\u00F5es");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, TipoAvaliacaoListComponent_ng_template_10_ng_template_1_tr_13_Template, 12, 7, "tr", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r9.notasOrdenadas(row_r6).notas);
  }
}
function TipoAvaliacaoListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, TipoAvaliacaoListComponent_ng_template_10_div_0_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, TipoAvaliacaoListComponent_ng_template_10_ng_template_1_Template, 14, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](2);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r4.selectable)("ngIfElse", _r8);
  }
}
class TipoAvaliacaoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_avaliacao_model__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacao, src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_1__.TipoAvaliacaoDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Avaliação");
    this.code = "MOD_TIPO_AVAL";
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_AVAL_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  getNotasText(notas) {
    return notas.map(x => x.nota).join(", ");
  }
  notasOrdenadas(row) {
    let notasOrdenadas = row.notas;
    notasOrdenadas.sort((a, b) => a.sequencia - b.sequencia);
    row.notas = notasOrdenadas;
    return row;
  }
}
_class = TipoAvaliacaoListComponent;
_class.ɵfac = function TipoAvaliacaoListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tipo-avaliacao-list"]],
  viewQuery: function TipoAvaliacaoListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
  decls: 14,
  vars: 25,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", "placeholder", "Nome...", 3, "size", "label", "control"], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Notas", 3, "template"], ["columnNotas", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [4, "ngIf", "ngIfElse"], ["tabelaNotas", ""], [1, "table"], ["scope", "col"], [4, "ngFor", "ngForOf"], [3, "label", "icon", "color"], ["icon", "bi bi-hand-thumbs-up", "color", "success", "label", "Aprova", 4, "ngIf"], ["icon", "bi bi-patch-question", "color", "primary", "label", "Justifica", 4, "ngIf"], ["icon", "bi bi-hand-thumbs-up", "color", "success", "label", "Aprova"], ["icon", "bi bi-patch-question", "color", "primary", "label", "Justifica"]],
  template: function TipoAvaliacaoListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function TipoAvaliacaoListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, TipoAvaliacaoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "columns")(6, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, TipoAvaliacaoListComponent_ng_template_7_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, TipoAvaliacaoListComponent_ng_template_10_Template, 3, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "pagination", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](8);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_AVAL_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_AVAL_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("label", "Nome " + ctx.lex.translate("tipo de avalia\u00E7\u00E3o"))("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 3905:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao-routing.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoRoutingModule: () => (/* binding */ TipoAvaliacaoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-avaliacao-form/tipo-avaliacao-form.component */ 76890);
/* harmony import */ var _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-avaliacao-list/tipo-avaliacao-list.component */ 32017);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_3__.TipoAvaliacaoListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Tipos de Avaliação"
  }
}, {
  path: 'new',
  component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacaoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Tipo de Avaliação",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacaoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Tipo de Avaliação",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacaoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Tipo de Avaliação",
    modal: true
  }
}];
class TipoAvaliacaoRoutingModule {}
_class = TipoAvaliacaoRoutingModule;
_class.ɵfac = function TipoAvaliacaoRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoAvaliacaoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 43633:
/*!***************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-avaliacao/tipo-avaliacao.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAvaliacaoModule: () => (/* binding */ TipoAvaliacaoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tipo-avaliacao-routing.module */ 3905);
/* harmony import */ var _tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-avaliacao-form/tipo-avaliacao-form.component */ 76890);
/* harmony import */ var _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-avaliacao-list/tipo-avaliacao-list.component */ 32017);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class TipoAvaliacaoModule {}
_class = TipoAvaliacaoModule;
_class.ɵfac = function TipoAvaliacaoModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoAvaliacaoRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoAvaliacaoModule, {
    declarations: [_tipo_avaliacao_form_tipo_avaliacao_form_component__WEBPACK_IMPORTED_MODULE_1__.TipoAvaliacaoFormComponent, _tipo_avaliacao_list_tipo_avaliacao_list_component__WEBPACK_IMPORTED_MODULE_2__.TipoAvaliacaoListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_avaliacao_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoAvaliacaoRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=633.js.map