"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[242],{

/***/ 5601:
/*!************************************************!*\
  !*** ./src/app/models/tipo-atividade.model.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAtividade: () => (/* binding */ TipoAtividade)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoAtividade extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; //Nome da classe de atividade
    this.esforco = 8; //Tempo previsto para a execução da atividade (Horas decimais)
    this.dias_planejado = 0; //Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)
    this.etiquetas = []; //Nome das etiquetas predefinidas para a atividade
    this.checklist = []; //Nome dos checklist predefinidas para a atividade
    this.comentario = ""; //Comentário predefinido para a atividade
    this.initialization(data);
  }
}

/***/ }),

/***/ 43950:
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-form/tipo-atividade-form.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAtividadeFormComponent: () => (/* binding */ TipoAtividadeFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/tipo-atividade.model */ 5601);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ 66848);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);

var _class;













class TipoAtividadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_3__.TipoAtividade, src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__.TipoAtividadeDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (['esforco'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Tipo de Atividade") + ': ' + (entity?.nome || "");
    };
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      esforco: {
        default: 48
      },
      dias_planejado: {
        default: ""
      },
      etiquetas: {
        default: []
      },
      checklist: {
        default: []
      },
      comentario: {
        default: ""
      },
      etiqueta_texto: {
        default: ""
      },
      etiqueta_icone: {
        default: null
      },
      etiqueta_cor: {
        default: null
      },
      checklist_texto: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  addItemHandleChecklist() {
    let result = undefined;
    const value = this.form.controls.checklist_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.checklist.value, key)) {
      result = {
        key: key,
        value: this.form.controls.checklist_texto.value
      };
      this.form.controls.checklist_texto.setValue("");
    }
    return result;
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.etiqueta_texto.value,
        color: this.form.controls.etiqueta_cor.value,
        icon: this.form.controls.etiqueta_icone.value
      };
      this.form.controls.etiqueta_texto.setValue("");
      this.form.controls.etiqueta_icone.setValue(null);
      this.form.controls.etiqueta_cor.setValue(null);
    }
    return result;
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_3__.TipoAtividade();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let tipoAtividade = _this2.util.fill(new src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_3__.TipoAtividade(), _this2.entity);
      return _this2.util.fillForm(tipoAtividade, _this2.form.value);
    })();
  }
}
_class = TipoAtividadeFormComponent;
_class.ɵfac = function TipoAtividadeFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tipo-atividade-form"]],
  viewQuery: function TipoAtividadeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 15,
  vars: 20,
  consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome", "controlName", "nome", "required", "", 3, "size"], ["onlyHours", "", "icon", "bi bi-stopwatch", "controlName", "esforco", "labelInfo", "Tempo em horas correntes previsto para a execu\u00E7\u00E3o da atividade", 3, "label", "size"], ["numbers", "", "icon", "bi bi-calendar2-check", "sufix", "dias", "icon", "bi bi-calendar-date", "controlName", "dias_planejado", "labelInfo", "Tempo em dias previsto para realizar a atividade", 3, "label", "size", "control"], ["title", "Etiquetas/Check-list/Coment\u00E1rio"], ["label", "Etiquetas", "controlName", "etiquetas", 3, "size", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size"], ["label", "\u00CDcone", "icon", "fas fa-sign-out-alt", "controlName", "etiqueta_icone", "liveSearch", "", 3, "size", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size"], ["label", "Checklists", "controlName", "checklist", 3, "size", "addItemHandle"], ["controlName", "checklist_texto", 3, "size"], ["label", "Coment\u00E1rios", "controlName", "comentario", "labelInfo", "Coment\u00E1rio que ser\u00E1 adicionado automaticamente", 3, "size", "rows"]],
  template: function TipoAtividadeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("submit", function TipoAtividadeFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function TipoAtividadeFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "input-text", 2)(3, "input-timer", 3)(4, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "separator", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 1)(7, "input-multiselect", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](8, "input-text", 7)(9, "input-select", 8)(10, "input-color", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "input-multiselect", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](12, "input-text", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](14, "input-textarea", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", ctx.lex.translate("Esfor\u00E7o"))("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", ctx.lex.translate("Tempo planejado"))("size", 3)("control", ctx.form.controls.dias_planejado);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 8)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ICONES);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("addItemHandle", ctx.addItemHandleChecklist.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 3);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_6__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__.InputSelectComponent, _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_8__.InputColorComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__.InputMultiselectComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_10__.InputTimerComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 16920:
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-list/tipo-atividade-list.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAtividadeListComponent: () => (/* binding */ TipoAtividadeListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-atividade.model */ 5601);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/report/report.component */ 58252);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
var _class;















function TipoAtividadeListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "toolbar");
  }
}
function TipoAtividadeListComponent_ng_template_7_small_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r21.comentario);
  }
}
function TipoAtividadeListComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, TipoAtividadeListComponent_ng_template_7_small_2_Template, 2, 1, "small", 1);
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r21.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", row_r21.comentario);
  }
}
function TipoAtividadeListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "badge", 27)(2, "badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("hint", ctx_r4.lex.translate("Esfor\u00E7o"))("label", ctx_r4.util.decimalToTimerFormated(row_r24.esforco, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("hint", ctx_r4.lex.translate("Tempo planejado") + " em dias")("label", row_r24.dias_planejado + " dias");
  }
}
function TipoAtividadeListComponent_ng_template_13_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 31);
  }
  if (rf & 2) {
    const etiqueta_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("icon", etiqueta_r27.icon)("label", etiqueta_r27.value)("color", etiqueta_r27.color);
  }
}
function TipoAtividadeListComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, TipoAtividadeListComponent_ng_template_13_badge_1_Template, 1, 3, "badge", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r25 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r25.etiquetas);
  }
}
function TipoAtividadeListComponent_ng_template_16_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 33);
  }
  if (rf & 2) {
    const check_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("label", check_r30.value);
  }
}
function TipoAtividadeListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, TipoAtividadeListComponent_ng_template_16_badge_1_Template, 1, 1, "badge", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r28.checklist);
  }
}
function TipoAtividadeListComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r31 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r31.nome);
  }
}
function TipoAtividadeListComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r32 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r32.esforco);
  }
}
function TipoAtividadeListComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r33 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r33.dias_planejado);
  }
}
function TipoAtividadeListComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r34 = ctx.row;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r16.getReportEtiquetas(row_r34));
  }
}
function TipoAtividadeListComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r35 = ctx.row;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r18.getReportChecklist(row_r35));
  }
}
function TipoAtividadeListComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r36 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r36.comentario_predefinido);
  }
}
class TipoAtividadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_atividade_model__WEBPACK_IMPORTED_MODULE_2__.TipoAtividade, src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__.TipoAtividadeDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      if (form.nome?.length) result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Tipos de Atividade");
    this.code = "MOD_TIPO_ATV";
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de atividade
    if (this.auth.hasPermissionTo("MOD_TIPO_ATV_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de atividade
    if (this.auth.hasPermissionTo("MOD_ATV_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }
  getReportEtiquetas(row) {
    let result = "";
    row.etiquetas.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }
  getReportChecklist(row) {
    let result = "";
    row.checklist.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }
}
_class = TipoAtividadeListComponent;
_class.ɵfac = function TipoAtividadeListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tipo-atividade-list"]],
  viewQuery: function TipoAtividadeListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 39,
  vars: 30,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Tempos", 3, "template"], ["columnTempos", ""], ["title", "Etiquetas", 3, "template"], ["columnEtiquetas", ""], ["title", "Checklist", 3, "template"], ["columnChecklist", ""], ["type", "options", 3, "onEdit", "options"], ["reportNome", ""], [3, "title", "template"], ["reportEsforco", ""], ["title", "Dias planejamento", 3, "template"], ["reportDiasPlanejado", ""], ["reportEtiquetas", ""], ["title", "Check-list", 3, "template"], ["reportChecklist", ""], ["title", "Coment\u00E1rio", 3, "template"], ["reportComentario", ""], [3, "rows"], [1, "d-block"], [1, "one-per-line"], ["icon", "bi bi-stopwatch", "color", "light", 3, "hint", "label"], ["icon", "bi bi-calendar2-check", "color", "light", 3, "hint", "label"], [1, "one-per-line", "text-break", "w-100"], [3, "icon", "label", "color", 4, "ngFor", "ngForOf"], [3, "icon", "label", "color"], ["color", "light", "icon", "bi bi-check2-square", 3, "label", 4, "ngFor", "ngForOf"], ["color", "light", "icon", "bi bi-check2-square", 3, "label"]],
  template: function TipoAtividadeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("select", function TipoAtividadeListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, TipoAtividadeListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "columns")(6, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, TipoAtividadeListComponent_ng_template_7_Template, 3, 2, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, TipoAtividadeListComponent_ng_template_10_Template, 3, 4, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](12, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](13, TipoAtividadeListComponent_ng_template_13_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](15, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](16, TipoAtividadeListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](18, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "report")(20, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](21, TipoAtividadeListComponent_ng_template_21_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](23, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](24, TipoAtividadeListComponent_ng_template_24_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](26, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](27, TipoAtividadeListComponent_ng_template_27_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](30, TipoAtividadeListComponent_ng_template_30_Template, 1, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](32, "column", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](33, TipoAtividadeListComponent_ng_template_33_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "column", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](36, TipoAtividadeListComponent_ng_template_36_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](38, "pagination", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](8);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](11);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](14);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](17);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](22);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](25);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](28);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](31);
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](34);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_ATV_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_ATV_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.translate("Esfor\u00E7o"))("template", _r11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r17);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r19);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_grid_report_report_component__WEBPACK_IMPORTED_MODULE_10__.ReportComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 46648:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade-routing.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAtividadeRoutingModule: () => (/* binding */ TipoAtividadeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-atividade-form/tipo-atividade-form.component */ 43950);
/* harmony import */ var _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-atividade-list/tipo-atividade-list.component */ 16920);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_3__.TipoAtividadeListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Atividades"
  }
}, {
  path: 'new',
  component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Inclusão de Atividade",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Edição de Atividade",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoAtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Consulta a Atividade",
    modal: true
  }
}];
class TipoAtividadeRoutingModule {}
_class = TipoAtividadeRoutingModule;
_class.ɵfac = function TipoAtividadeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoAtividadeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 46242:
/*!***************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-atividade/tipo-atividade.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoAtividadeModule: () => (/* binding */ TipoAtividadeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tipo-atividade-routing.module */ 46648);
/* harmony import */ var _tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-atividade-form/tipo-atividade-form.component */ 43950);
/* harmony import */ var _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-atividade-list/tipo-atividade-list.component */ 16920);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class TipoAtividadeModule {}
_class = TipoAtividadeModule;
_class.ɵfac = function TipoAtividadeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoAtividadeRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoAtividadeModule, {
    declarations: [_tipo_atividade_form_tipo_atividade_form_component__WEBPACK_IMPORTED_MODULE_1__.TipoAtividadeFormComponent, _tipo_atividade_list_tipo_atividade_list_component__WEBPACK_IMPORTED_MODULE_2__.TipoAtividadeListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoAtividadeRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=242.js.map