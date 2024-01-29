"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[5288],{

/***/ 85939:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-form/cadeia-valor-form.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorFormComponent: () => (/* binding */ CadeiaValorFormComponent)
/* harmony export */ });
/* harmony import */ var _home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/cadeia-valor.model */ 69478);
/* harmony import */ var _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../cadeia-valor-list-processos/cadeia-valor-list-processos.component */ 83869);













const _c0 = ["processos"];
const _c1 = ["unidade"];
class CadeiaValorFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  constructor(injector) {
    super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__.CadeiaValor, _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      return result;
    };
    this.formValidation = form => {
      let result = null;
      if (this.form.controls.data_fim.value && this.form.controls.data_inicio.value > this.form.controls.data_fim.value) {
        return "A data do início não pode ser maior que a data do fim!";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Cadeia de Valor") + ': ' + (entity?.nome || "");
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.join = ['processos'];
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: null
      },
      unidade_id: {
        default: ""
      },
      moveFilhos: {
        default: false
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    this.entity = new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__.CadeiaValor();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        _this.processos.grid.confirm();
        let cadeiaValor = _this.util.fill(new _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_2__.CadeiaValor(), _this.entity);
        _this.form.value.entidade_id = _this.auth.entidade?.id;
        //this.form!.value.unidade_id = this.auth.unidade?.id
        cadeiaValor = _this.util.fillForm(cadeiaValor, _this.form.value);
        cadeiaValor.processos = _this.processos.items;
        resolve(cadeiaValor);
      });
    })();
  }
  static #_ = this.ɵfac = function CadeiaValorFormComponent_Factory(t) {
    return new (t || CadeiaValorFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: CadeiaValorFormComponent,
    selectors: [["app-cadeia-valor-form"]],
    viewQuery: function CadeiaValorFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.processos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 12,
    vars: 17,
    consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["icon", "bi bi-textarea-t", "controlName", "nome", "required", "", 3, "size", "label", "control"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "required", "", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "data_fim", "required", "", 3, "size", "control", "labelInfo"], ["controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["noPersist", "", 3, "entity", "cdRef"], ["processos", ""]],
    template: function CadeiaValorFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function CadeiaValorFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function CadeiaValorFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 1)(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "input-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-datetime", 3)(6, "input-datetime", 4)(7, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "separator")(10, "cadeia-valor-list-processos", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("label", "Nome da " + ctx.lex.translate("cadeia de valor"))("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_inicio)("labelInfo", "In\u00EDcio da " + ctx.lex.translate("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_fim)("labelInfo", "Fim da " + ctx.lex.translate("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      }
    },
    dependencies: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_4__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_6__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_8__.InputDatetimeComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_9__.SeparatorComponent, _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_10__.CadeiaValorListProcessosComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 81420:
/*!********************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-grid/cadeia-valor-list-grid.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorListGridComponent: () => (/* binding */ CadeiaValorListGridComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ 15316);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/cadeia-valor.model */ 69478);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../cadeia-valor-list-processos/cadeia-valor-list-processos.component */ 83869);

















const _c0 = ["unidade"];
function CadeiaValorListGridComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "toolbar");
  }
}
function CadeiaValorListGridComponent_column_9_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", row_r14 == null ? null : row_r14.length, "");
  }
}
function CadeiaValorListGridComponent_column_9_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](0, CadeiaValorListGridComponent_column_9_ng_template_1_span_0_Template, 3, 1, "span", 20);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", row_r14 == null ? null : row_r14.length);
  }
}
function CadeiaValorListGridComponent_column_9_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "cadeia-valor-list-processos", 23, 24);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("entity", row_r17)("cdRef", ctx_r13.cdRef);
  }
}
function CadeiaValorListGridComponent_column_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "column", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, CadeiaValorListGridComponent_column_9_ng_template_1_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](3, CadeiaValorListGridComponent_column_9_ng_template_3_Template, 2, 2, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](2);
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](4);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("align", "center")("hint", ctx_r2.lex.translate("Processos"))("template", _r10)("expandTemplate", _r12);
  }
}
function CadeiaValorListGridComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](row_r19.nome);
  }
}
function CadeiaValorListGridComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r6.dao.getDateFormatted(row_r20.data_inicio));
  }
}
function CadeiaValorListGridComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r8.dao.getDateFormatted(row_r21.data_fim));
  }
}
function CadeiaValorListGridComponent_column_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "column", 26);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("onEdit", ctx_r9.edit)("options", ctx_r9.options);
  }
}
class CadeiaValorListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_4__.CadeiaValor, src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__.CadeiaValorDaoService);
    this.injector = injector;
    this.selectable = false;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      /*if(form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }*/
      if (form.unidade_id?.length) {
        result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.data_inicio) {
        result.push(["data_fim", ">=", form.data_inicio]);
      }
      if (form.data_fim) {
        result.push(["data_inicio", "<=", form.data_fim]);
      }
      return result;
    };
    this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.EntidadeDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    this.join = ['processos'];
    this.code = "MOD_CADV";
    /* Inicializações */
    this.filter = this.fh.FormBuilder({
      data_inicio: {
        default: null
      },
      data_fim: {
        default: null
      },
      //nome: {default: ""},
      unidade_id: {
        default: ""
      },
      entidade_id: {
        default: null
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_CADV_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  onChangeData() {
    const di = new Date(this.filter.controls.data_inicio.value).getTime();
    const df = new Date(this.filter.controls.data_fim.value).getTime();
    if (df < di) {
      let diaI = new Date(di);
      diaI.setDate(diaI.getDate() + 1);
      this.filter.controls.data_fim.setValue(diaI);
    }
  }
  static #_ = this.ɵfac = function CadeiaValorListGridComponent_Factory(t) {
    return new (t || CadeiaValorListGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_14__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
    type: CadeiaValorListGridComponent,
    selectors: [["cadeia-valor-list-grid"]],
    viewQuery: function CadeiaValorListGridComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_c0, 7);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      }
    },
    inputs: {
      snapshot: "snapshot",
      fixedFilter: "fixedFilter",
      selectable: "selectable"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵInheritDefinitionFeature"]],
    decls: 21,
    vars: 30,
    consts: [[3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "unidade_id", "required", "", 3, "size", "control", "dao"], ["unidade", ""], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", 3, "size", "control", "labelInfo", "change"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "data_fim", 3, "size", "control", "labelInfo", "change"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["type", "options", 3, "onEdit", "options", 4, "ngIf"], [3, "rows"], ["type", "expand", "icon", "bi bi-boxes", 3, "align", "hint", "template", "expandTemplate"], ["columnProcessos", ""], ["columnExpandedProcessos", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-boxes"], [3, "entity", "cdRef"], ["processos", ""], [1, "text-break", "w-100"], ["type", "options", 3, "onEdit", "options"]],
    template: function CadeiaValorListGridComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("select", function CadeiaValorListGridComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, CadeiaValorListGridComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](4, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "input-datetime", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CadeiaValorListGridComponent_Template_input_datetime_change_6_listener() {
          return ctx.onChangeData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "input-datetime", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CadeiaValorListGridComponent_Template_input_datetime_change_7_listener() {
          return ctx.onChangeData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](8, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, CadeiaValorListGridComponent_column_9_Template, 5, 4, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](11, CadeiaValorListGridComponent_ng_template_11_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](14, CadeiaValorListGridComponent_ng_template_14_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](16, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](17, CadeiaValorListGridComponent_ng_template_17_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](19, CadeiaValorListGridComponent_column_19_Template, 1, 2, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](20, "pagination", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](12);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](15);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_CADV_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_CADV_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_inicio)("labelInfo", "In\u00EDcio " + ctx.lex.translate("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_fim)("labelInfo", "Fim " + ctx.lex.translate("cadeia de valor"));
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__.InputDatetimeComponent, _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_13__.CadeiaValorListProcessosComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 38616:
/*!************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorListProcessosEntregasComponent: () => (/* binding */ CadeiaValorListProcessosEntregasComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ 67501);
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ 76229);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);














function CadeiaValorListProcessosEntregasComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function CadeiaValorListProcessosEntregasComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar", 13);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("buttons", ctx_r1.buttons);
  }
}
function CadeiaValorListProcessosEntregasComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    const metadata_r7 = ctx.metadata;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r3.getSequencia(metadata_r7, row_r6));
  }
}
function CadeiaValorListProcessosEntregasComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r8.nome);
  }
}
class CadeiaValorListProcessosEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorProcesso, src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorProcessoDaoService);
    this.injector = injector;
    this.buttons = [];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      if (form.planejamento_id?.length) {
        result.push(["cadeia_valor_id", "==", form.cadeia_valor_id]);
      }
      if (form.nome?.length) {
        result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
      }
      return result;
    };
    this.cadeiaValorDao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_1__.CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorProcessoDaoService);
    this.title = this.lex.translate("Processos");
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      cadeia_valor_id: {
        default: null
      }
    });
    this.OPTION_INFORMACOES.onClick = processo => this.go.navigate({
      route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult']
    }, {
      modal: true
    });
    this.addOption(this.OPTION_INFORMACOES);
  }
  /*public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let processo: CadeiaValorProcesso = row as CadeiaValorProcesso;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (processo: CadeiaValorProcesso) => this.go.navigate({ route: ['gestao', 'cadeia-valor', 'processo', processo.id, 'consult'] }, { modal: true }) });
    return result;
  }*/
  filterClear(filter) {
    super.filterClear(filter);
  }
  getSequencia(metadata, row) {
    if (!metadata.nivel) {
      let paiId = row.processo_pai_id;
      let niveis = "";
      while (paiId) {
        let atual = this.grid?.items.find(x => x.id == paiId);
        niveis = (atual?.sequencia || "") + "." + niveis;
        paiId = atual?.processo_pai_id || null;
      }
      niveis += row.sequencia;
      if (metadata.nivel != niveis) metadata.nivel = niveis;
    }
    this.sortProcessos();
    return metadata.nivel;
  }
  sortProcessos() {
    this.grid?.items.sort((a, b) => {
      const sa = (this.grid.getMetadata(a)?.nivel || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      const sb = (this.grid.getMetadata(b)?.nivel || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }
  static #_ = this.ɵfac = function CadeiaValorListProcessosEntregasComponent_Factory(t) {
    return new (t || CadeiaValorListProcessosEntregasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: CadeiaValorListProcessosEntregasComponent,
    selectors: [["cadeia-valor-list-processos-entregas"]],
    viewQuery: function CadeiaValorListProcessosEntregasComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 15,
    vars: 23,
    consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "select"], [3, "buttons", 4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["title", "N\u00EDvel", 3, "template"], ["columnNivel", ""], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"]],
    template: function CadeiaValorListProcessosEntregasComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, CadeiaValorListProcessosEntregasComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function CadeiaValorListProcessosEntregasComponent_Template_grid_select_1_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, CadeiaValorListProcessosEntregasComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "columns")(7, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, CadeiaValorListProcessosEntregasComponent_ng_template_8_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, CadeiaValorListProcessosEntregasComponent_ng_template_11_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "pagination", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](9);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 7)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 83869:
/*!******************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list-processos/cadeia-valor-list-processos.component.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorListProcessosComponent: () => (/* binding */ CadeiaValorListProcessosComponent)
/* harmony export */ });
/* harmony import */ var _home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ 67501);
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ 76229);
/* harmony import */ var src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/cadeia-valor.model */ 69478);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_level_input_level_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-level/input-level.component */ 31720);
















function CadeiaValorListProcessosComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "small", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    const metadata_r9 = ctx.metadata;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r1.getSequencia(metadata_r9, row_r8));
  }
}
function CadeiaValorListProcessosComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-level", 11);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("validate", ctx_r3.validateLevel);
  }
}
function CadeiaValorListProcessosComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "strong", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    const metadata_r12 = ctx.metadata;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("margin-left", ctx_r5.getNivelSequencia(metadata_r12), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r11.nome || "");
  }
}
function CadeiaValorListProcessosComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-text", 13);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("control", ctx_r7.form.controls.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
  }
}
class CadeiaValorListProcessosComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_7__.PageFrameBase {
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
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_6__.CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];
    return this.gridControl.value.processos;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['nivel'].indexOf(controlName) >= 0) {
        result = this.existePai(control);
      }
      return result;
    };
    this.validateLevel = (parents, item, children) => {
      if (children.length) {
        let path = [...parents.map(x => x.value), item.value];
        return this.processos(path).length == path.length;
      } else {
        let items = this.processos(parents.map(x => x.value));
        let sibilings = items.length == parents.length && items.length ? this.items.filter(x => x.processo_pai_id == items[items.length - 1].id) : [];
        return sibilings.length + 1 >= item.value;
      }
    };
    this.processos = path => {
      let items = [];
      path.reduce((a, v) => {
        let item = a.find(x => x.sequencia == v);
        if (item) {
          items.push(item);
          return this.items.filter(x => x.processo_pai_id == item?.id);
        } else {
          return [];
        }
      }, this.items.filter(x => !x.processo_pai_id));
      return items;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorDaoService);
    this.processosDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorProcessoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      sequencia: {
        default: 1
      },
      nivel: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  existePai(control) {
    let result = null;
    let niveis = control.value.split(".");
    let todos = this.items;
    if (niveis.length > 1) {
      let ultimoCriado = todos.reduce((a, b) => a.created_at > b.created_at ? a : b);
      let pais = this.processos(niveis.slice(0, niveis.length - 1));
      if (!ultimoCriado.processo_pai_id) {
        if (pais[0].id == ultimoCriado.id) {
          result = "Não existe o nível pai";
        } else {
          result = pais.length + 1 == niveis.length ? "Adicione o nível filho pelo botão 'Adicionar filho'" : "Não existe o nível pai";
        }
      } else {
        let paiId = ultimoCriado.processo_pai_id;
        let niveisPai = "";
        while (paiId) {
          let atual = this.items.find(x => x.id == paiId);
          niveisPai = (atual?.sequencia || "") + "." + niveisPai;
          paiId = atual?.processo_pai_id || null;
        }
        let controleNiveis;
        controleNiveis = niveisPai.split(".");
        controleNiveis.pop();
        controleNiveis.push((ultimoCriado.sequencia - 1).toString());
        if (this.JSON.stringify(niveis) <= this.JSON.stringify(controleNiveis) && niveis[niveis.length - 1].parseInt() <= controleNiveis[controleNiveis.length - 1].parseInt()) {
          result = "Nível já existente";
        } else if (niveis.length > controleNiveis.length) {
          result = pais.length + 1 == niveis.length ? "Adicione o nível filho pelo botão 'Adicionar filho'" : "Não existe o nível pai";
        }
      }
    } else if (todos.length > 0) {
      let ultimoCriado = todos.reduce((a, b) => a.created_at > b.created_at ? a : b);
      if (niveis[0] < ultimoCriado.sequencia) {
        result = "Nível já existente";
      } else if (niveis[0] > ultimoCriado.sequencia) {
        result = "Insira o nível em sequência numérica";
      } else {
        result = ultimoCriado.processo_pai_id == null ? null : "Adicione este nível pelo botão 'Adicionar nível'";
      }
    }
    return result;
  }
  loadData(entity, form) {
    this.cdRef.detectChanges();
    this.sortProcessos();
  }
  addChildProcesso(row, metadata, index) {
    var _this = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let processo = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_5__.CadeiaValorProcesso({
        id: _this.dao.generateUuid(),
        processo_pai_id: row.id,
        sequencia: _this.items.filter(x => x.processo_pai_id == row.id).length + 1,
        nome: ""
      });
      _this.items.push(processo);
      _this.grid.setMetadata(processo, {
        nivel: _this.getSequencia({}, processo)
      });
      _this.sortProcessos();
      _this.grid.adding = true;
      yield _this.grid.edit(processo);
      return undefined;
    })();
  }
  getSequencia(metadata, row) {
    if (!metadata.nivel) {
      let paiId = row.processo_pai_id;
      let niveis = "";
      let path = [];
      while (paiId) {
        path.push(paiId);
        let atual = this.items.find(x => x.id == paiId);
        niveis = (atual?.sequencia || "") + "." + niveis;
        paiId = atual?.processo_pai_id || null;
      }
      niveis += row.sequencia;
      if (metadata.nivel != niveis) {
        metadata.nivel = niveis;
        metadata.path = path;
      }
      if (!this.grid) this.sortProcessosItems();
    }
    return metadata.nivel;
  }
  getNivelSequencia(metadata) {
    return 10 * (metadata.nivel.match(/\./g) || []).length;
  }
  sortProcessos() {
    this.items.sort((a, b) => {
      const sa = (this.grid.getMetadata(a)?.nivel || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      const sb = (this.grid.getMetadata(b)?.nivel || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }
  sortProcessosItems() {
    this.items.sort((a, b) => {
      let nivelA = a.processo_pai_id ? this.retornaNivel(a) : a.sequencia.toString();
      let nivelB = b.processo_pai_id ? this.retornaNivel(b) : b.sequencia.toString();
      const nA = (nivelA || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      const nB = (nivelB || "").split(".").map(x => ("000" + x).substr(-3)).join(".");
      return nA < nB ? -1 : nA > nB ? 1 : 0;
    });
  }
  retornaNivel(processo) {
    let paiId = processo.processo_pai_id;
    let nivelPai = "";
    while (paiId) {
      let atual = this.items.find(x => x.id == paiId);
      nivelPai = (atual?.sequencia || "") + "." + nivelPai;
      paiId = atual?.processo_pai_id || null;
    }
    nivelPai += processo.sequencia;
    return nivelPai;
  }
  addProcesso() {
    var _this2 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let processo = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_5__.CadeiaValorProcesso({
        id: _this2.dao.generateUuid(),
        sequencia: _this2.items.filter(x => !x.processo_pai_id).length + 1,
        nome: ""
      });
      return processo;
    })();
  }
  loadProcesso(form, row) {
    var _this3 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.nivel.setValue(_this3.getSequencia(_this3.grid?.getMetadata(row), row));
      form.controls.sequencia.setValue(row.sequencia);
      form.controls.nome.setValue(row.nome);
      _this3.cdRef.detectChanges();
    })();
  }
  removeProcesso(row) {
    var _this4 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this4.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
      if (confirm) {
        let processo = row;
        let filhos = _this4.items.filter(x => x.processo_pai_id == processo.id) || [];
        filhos.forEach(x => _this4.removeProcesso(x));
        _this4.items.splice(_this4.items.findIndex(x => x.id == processo.id), 1);
        if (!_this4.isNoPersist) yield _this4.processosDao?.delete(row);
        return true;
      } else {
        return false;
      }
    })();
  }
  saveProcesso(form, row) {
    var _this5 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this5.form.markAllAsTouched();
      if (_this5.form.valid) {
        let niveis = form.controls.nivel.value.split(".");
        let parents = _this5.processos(niveis.slice(0, niveis.length - 1));
        let parentId = parents?.length ? parents[parents.length - 1].id : null;
        let sequencia = niveis[niveis.length - 1] * 1;
        /* Atualiza o indice a partir sa sequencia atual para os irmão que tem sequencia maior */
        _this5.items.filter(x => x.processo_pai_id == parentId && x.sequencia >= sequencia).forEach(x => x.sequencia++);
        row.id = row.id == "NEW" ? _this5.dao.generateUuid() : row.id;
        row.sequencia = sequencia;
        row.cadeia_valor_id = _this5.entity?.id;
        row.processo_pai_id = parentId;
        row.nome = form.controls.nome.value;
        result = row;
        if (!_this5.isNoPersist) result = yield _this5.processosDao?.save(row);
      }
      return result;
    })();
  }
  editEndProcesso(id) {
    this.grid?.clearMetadata();
    this.cdRef.detectChanges();
    this.sortProcessos();
    this.cdRef.detectChanges();
  }
  dynamicButtons(row) {
    let result = [];
    result.push({
      hint: "Adicionar filho",
      icon: "bi bi-plus-circle",
      onClick: this.addChildProcesso.bind(this)
    });
    return result;
  }
  static #_ = this.ɵfac = function CadeiaValorListProcessosComponent_Factory(t) {
    return new (t || CadeiaValorListProcessosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: CadeiaValorListProcessosComponent,
    selectors: [["cadeia-valor-list-processos"]],
    viewQuery: function CadeiaValorListProcessosComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    inputs: {
      cdRef: "cdRef",
      noPersist: "noPersist",
      control: "control",
      entity: "entity"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
    decls: 15,
    vars: 15,
    consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["editable", "", 3, "items", "form", "hasDelete", "add", "load", "remove", "save", "editEnd"], ["title", "N\u00EDvel", 3, "template", "editTemplate"], ["nivel", ""], ["editNivel", ""], ["title", "Processos", 3, "template", "editTemplate"], ["processo", ""], ["editProcesso", ""], ["type", "options", 3, "dynamicButtons"], [1, "d-block"], ["controlName", "nivel", 3, "size", "validate"], [1, "d-block", "text-break", "w-100"], ["controlName", "nome", 3, "size", "control"]],
    template: function CadeiaValorListProcessosComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2)(3, "columns")(4, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, CadeiaValorListProcessosComponent_ng_template_5_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, CadeiaValorListProcessosComponent_ng_template_7_Template, 1, 2, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "column", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, CadeiaValorListProcessosComponent_ng_template_10_Template, 2, 3, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, CadeiaValorListProcessosComponent_ng_template_12_Template, 1, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](14, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](6);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](8);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](11);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("add", ctx.addProcesso.bind(ctx))("load", ctx.loadProcesso.bind(ctx))("remove", ctx.removeProcesso.bind(ctx))("save", ctx.saveProcesso.bind(ctx))("editEnd", ctx.editEndProcesso.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r0)("editTemplate", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r4)("editTemplate", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
      }
    },
    dependencies: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_8__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_9__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__.InputTextComponent, _components_input_input_level_input_level_component__WEBPACK_IMPORTED_MODULE_11__.InputLevelComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 32946:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-list/cadeia-valor-list.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorListComponent: () => (/* binding */ CadeiaValorListComponent)
/* harmony export */ });
/* harmony import */ var _home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-list-base */ 78509);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/cadeia-valor.model */ 69478);
/* harmony import */ var _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cadeia-valor-list-grid/cadeia-valor-list-grid.component */ 81420);
/* harmony import */ var _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../cadeia-valor-mapa/cadeia-valor-mapa.component */ 63934);












function CadeiaValorListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "cadeia-valor-list-grid", 4);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("selectable", ctx_r1.selectable)("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
  }
}
function CadeiaValorListComponent_tab_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "cadeia-valor-mapa");
  }
}
function CadeiaValorListComponent_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, CadeiaValorListComponent_tab_4_ng_template_1_Template, 1, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r3);
  }
}
class CadeiaValorListComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_1__.PageListBase {
  constructor(injector) {
    super(injector, _models_cadeia_valor_model__WEBPACK_IMPORTED_MODULE_3__.CadeiaValor, _dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      return result;
    };
    /* Inicializações */
    this.code = "MOD_CADV";
    this.title = this.lex.translate('Cadeias de Valores');
    this.filter = this.fh.FormBuilder({});
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }
  onSelectTab(tab) {
    var _this = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.viewInit) _this.saveUsuarioConfig({
        active_tab: tab.key
      });
    })();
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }
  static #_ = this.ɵfac = function CadeiaValorListComponent_Factory(t) {
    return new (t || CadeiaValorListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: CadeiaValorListComponent,
    selectors: [["app-cadeia-valor-list"]],
    viewQuery: function CadeiaValorListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.TabsComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
    decls: 5,
    vars: 4,
    consts: [["right", "", 3, "title", "select"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template", 4, "ngIf"], [3, "selectable", "snapshot"], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template"], ["mapa", ""]],
    template: function CadeiaValorListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, CadeiaValorListComponent_ng_template_2_Template, 1, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, CadeiaValorListComponent_tab_4_Template, 3, 1, "tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.selectable);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.TabComponent, _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_7__.CadeiaValorListGridComponent, _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_8__.CadeiaValorMapaComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 63934:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-mapa/cadeia-valor-mapa.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorMapaComponent: () => (/* binding */ CadeiaValorMapaComponent),
/* harmony export */   NeastedProcesso: () => (/* binding */ NeastedProcesso)
/* harmony export */ });
/* harmony import */ var _home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cadeia-valor-dao.service */ 19520);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/cadeia-valor-processo.model */ 76229);
/* harmony import */ var src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/cadeia-valor-processo-dao.service */ 67501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ 28032);
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-drag-drop */ 51474);













const _c0 = ["cadeiaValorInstitucional"];
const _c1 = ["editProcessoForm"];
function CadeiaValorMapaComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 1)(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-text", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx_r1.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("label", "Nome do " + ctx_r1.lex.translate("processo"))("control", ctx_r1.form.controls.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
  }
}
const _c2 = function (a0) {
  return {
    processo: a0
  };
};
function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndEnd_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r12.onDragEnd($event));
    })("dndMoved", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndMoved_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13);
      const subprocesso_r11 = restoredCtx.$implicit;
      const processo_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().processo;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r14.onDragged(subprocesso_r11, processo_r9.children, "move"));
    })("dndStart", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template_div_dndStart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r16.onDragStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 22)(2, "h5", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](6, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const subprocesso_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](8);
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--bg:" + subprocesso_r11.cor + ";--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDisableIf", !ctx_r10.canEdit)("dndDraggable", subprocesso_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", subprocesso_r11.level, ". ", subprocesso_r11.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", subprocesso_r11)("items", ctx_r10.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](10, _c2, subprocesso_r11));
  }
}
const _c3 = function () {
  return ["processo"];
};
function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template_div_dndDrop_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r18);
      const processo_r9 = restoredCtx.processo;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r17.onDrop($event, processo_r9.children));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 30)(2, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "span", 23)(4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, CadeiaValorMapaComponent_div_14_div_13_ng_template_7_div_5_Template, 7, 12, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const processo_r9 = ctx.processo;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](4, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--bg:gray;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", processo_r9.children);
  }
}
function CadeiaValorMapaComponent_div_14_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndEnd_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r19.onDragEnd($event));
    })("dndMoved", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndMoved_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r20);
      const processo_r6 = restoredCtx.$implicit;
      const macro_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r21.onDragged(processo_r6, macro_r4.children, "move"));
    })("dndStart", function CadeiaValorMapaComponent_div_14_div_13_Template_div_dndStart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r20);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r23.onDragStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 22)(2, "h4", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](6, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, CadeiaValorMapaComponent_div_14_div_13_ng_template_7_Template, 6, 5, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const processo_r6 = ctx.$implicit;
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](8);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--bg:" + processo_r6.cor + ";--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDisableIf", !ctx_r5.canEdit)("dndDraggable", processo_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", processo_r6.level, ". ", processo_r6.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", processo_r6)("items", ctx_r5.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", _r7)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](10, _c2, processo_r6));
  }
}
function CadeiaValorMapaComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndEnd", function CadeiaValorMapaComponent_div_14_Template_div_dndEnd_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r24.onDragEnd($event));
    })("dndMoved", function CadeiaValorMapaComponent_div_14_Template_div_dndMoved_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r25);
      const macro_r4 = restoredCtx.$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r26.onDragged(macro_r4, ctx_r26.processos, "move"));
    })("dndStart", function CadeiaValorMapaComponent_div_14_Template_div_dndStart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r25);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r27.onDragStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 7)(2, "div", 8)(3, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "action-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_div_14_Template_div_dndDrop_7_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r25);
      const macro_r4 = restoredCtx.$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r28.onDrop($event, macro_r4.children));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 21)(9, "div", 22)(10, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "span", 23)(12, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, CadeiaValorMapaComponent_div_14_div_13_Template, 9, 12, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const macro_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDisableIf", !ctx_r3.canEdit)("dndDraggable", macro_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--border-color:" + macro_r4.cor + ";--bg:white;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", macro_r4.level, ". ", macro_r4.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", macro_r4)("items", ctx_r3.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](12, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--bg:gray;--color:black;");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", macro_r4.children);
  }
}
class NeastedProcesso extends src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorProcesso {
  constructor(data) {
    super();
    this.children = [];
    this.cor = "#010101";
    this.level = "";
    this.initialization(data);
  }
}
class CadeiaValorMapaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.cadeiasValor = [];
    this.processos = [];
    this.canEdit = true;
    this.options = [{
      icon: "bi bi-file-earmark-bar-graph",
      label: "Entregas",
      onClick: this.consultProcesso.bind(this)
    }, {
      divider: true
    }, {
      icon: "bi bi-plus-circle",
      label: "Incluir subprocesso",
      onClick: this.addProcesso.bind(this)
    }, {
      icon: "bi bi-pencil-square",
      label: "Alterar",
      onClick: this.editProcesso.bind(this)
    }, {
      divider: true
    }, {
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.deleteProcesso.bind(this)
    }];
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == "nome" && !control.value?.length) result = "Obrigatório";
      return result;
    };
    this.dao = injector.get(src_app_dao_cadeia_valor_dao_service__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get(src_app_dao_cadeia_valor_processo_dao_service__WEBPACK_IMPORTED_MODULE_5__.CadeiaValorProcessoDaoService);
    this.join = ['processos'];
    this.title = this.lex.translate('Cadeias de Valores');
    this.form = this.fh.FormBuilder({
      cadeia_valor_id: {
        default: null
      },
      nome: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }
  consultProcesso(processo) {
    this.go.navigate({
      route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo.id]
    });
  }
  addProcesso(processo) {
    var _this = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let child = new src_app_models_cadeia_valor_processo_model__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorProcesso({
        path: processo.path + "/" + processo.id,
        cadeia_valor_id: processo.cadeia_valor_id,
        processo_pai_id: processo.id,
        nome: "",
        sequencia: 1
      });
      yield _this.editProcesso(child);
    })();
  }
  editProcesso(processo) {
    var _this2 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = processo;
      _this2.form.controls.nome.setValue(processo.nome);
      _this2.form.controls.nome.setErrors(null);
      let result = yield _this2.dialog.template({
        title: "Processo",
        modalWidth: 500
      }, _this2.editProcessoForm, [{
        label: "Gravar",
        icon: "bi bi-check-circle",
        color: "btn-outline-success",
        value: "GRAVAR"
      }, {
        label: "Cancelar",
        icon: "bi bi-dash-circle",
        color: "btn btn-outline-danger",
        value: "CANCELAR"
      }]).asPromise();
      if (result.button.value == "GRAVAR") {
        if (_this2.form.valid) {
          _this2.entity.nome = _this2.form.controls.nome.value;
          _this2.submitting = true;
          try {
            let entity = yield _this2.cadeiaValorProcessoDao.save(_this2.entity);
            if (entity) result.dialog.close();
            yield _this2.refreshCadeiaValor();
          } catch (error) {
            _this2.dialog.alert("Error", error.message ? error.message : error || "Erro desconhecido");
          } finally {
            _this2.submitting = false;
          }
        } else {
          _this2.form.markAllAsTouched();
        }
      } else {
        result.dialog.close();
      }
    })();
  }
  deleteProcesso(processo) {
    var _this3 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this3.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) {
        try {
          yield _this3.cadeiaValorProcessoDao.delete(processo.id);
          yield _this3.refreshCadeiaValor();
        } catch (error) {
          _this3.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error || "Erro desconhecido"));
        }
      }
    })();
  }
  loadData(entity, form) {
    var _this4 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.query = _this4.dao.query({
        where: [["data_arquivamento", "==", null]],
        orderBy: [["data_inicio", "desc"]],
        join: _this4.join
      });
      _this4.query.asPromise().then(cadeiasValor => {
        let cadeiaValorId = _this4.form.controls.cadeia_valor_id.value;
        _this4.form.controls.cadeia_valor_id.setValue(null);
        _this4.cadeiasValor = cadeiasValor.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome,
          data: x
        }));
        _this4.cdRef.detectChanges();
        _this4.form.controls.cadeia_valor_id.setValue(cadeiaValorId || (_this4.cadeiasValor.length ? _this4.cadeiasValor[0].key : null));
      });
    })();
  }
  onCadeiaValorChange() {
    const recursiveProcesso = (level, processos) => processos.sort((a, b) => a.sequencia - b.sequencia).map(x => Object.assign(new NeastedProcesso({
      children: recursiveProcesso(level + x.sequencia + '.', this.cadeiaValor.processos.filter(y => y.processo_pai_id == x.id)),
      level: level + x.sequencia,
      cor: this.lookup.CORES_BACKGROUND[Math.floor(Math.random() * this.lookup.CORES_BACKGROUND.length)].color
    }), x));
    this.cadeiaValor = this.cadeiaValorInstitucional?.selectedItem?.data;
    if (this.cadeiaValor) this.processos = recursiveProcesso("", this.cadeiaValor.processos.filter(x => !x.processo_pai_id));
  }
  refreshCadeiaValor() {
    var _this5 = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.loadData(_this5.entity, _this5.form);
    })();
  }
  onProcessoClick(data) {
    let objetivo = data;
    this.go.navigate({
      route: ['gestao', 'cadeiaValor', this.cadeiaValor?.id, 'objetivos', objetivo.id]
    });
  }
  onObjetivoDeleteClick(data) {
    let objetivo = data;
  }
  onObjetivoEditClick(data) {
    let objetivo = data;
  }
  /* Drag & Drop */
  onDrop(event, list) {
    console.log("Drop", event);
    list?.splice(typeof event.index === 'undefined' ? list.length : event.index, 0, event.data);
  }
  onDragEnd(event) {
    console.log("DragEnd", event);
  }
  onDragged(item, list, effect) {
    console.log("Dragged", item, list);
    list.splice(list.indexOf(item), 1);
  }
  onDragStart(event) {
    console.log("DragStart", event);
  }
  static #_ = this.ɵfac = function CadeiaValorMapaComponent_Factory(t) {
    return new (t || CadeiaValorMapaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: CadeiaValorMapaComponent,
    selectors: [["cadeia-valor-mapa"]],
    viewQuery: function CadeiaValorMapaComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.cadeiaValorInstitucional = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editProcessoForm = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
    decls: 15,
    vars: 9,
    consts: [["editProcessoForm", ""], ["noButtons", "", 3, "form"], [1, "row", "my-2"], ["controlName", "cadeia_valor_id", 3, "size", "control", "items", "change"], ["cadeiaValorInstitucional", ""], [1, "row", "my-2", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "row", "cadeia-valor"], [1, "nivel-1"], [1, "d-flex", "justify-content-between"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-2"], [1, "placeholder", "col-4"], [1, "placeholder", "col-6"], ["class", "row cadeia-valor", "dndType", "processo", "dndEffectAllowed", "move", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], [1, "row"], ["icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "label", "control"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "row", "cadeia-valor", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "texto", "text-break"], [1, "btn-group", "dropstart", "dropdown-menu-button", "ms-2"], ["noArrow", "", "icon", "bi bi-wrench-adjustable-circle", "color", "transparent-black p-1 py-0", 3, "data", "items"], [1, "d-flex", "align-content-stretch", "flex-wrap", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "nivel-2"], [1, "d-flex", "justify-content-between", "mb-2"], [1, "placeholder", "col-5"], [1, "placeholder", "col-7"], ["class", "nivel-2", "dndType", "processo", "dndEffectAllowed", "move", 3, "style", "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "nivel-2", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["innerProcessos", ""], [3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "nivel-3"], ["class", "nivel-3", "dndType", "processo", "dndEffectAllowed", "move", 3, "style", "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "processo", "dndEffectAllowed", "move", 1, "nivel-3", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "btn-group", "dropstart", "dropdown-menu-button", "ms-2", "align-button"]],
    template: function CadeiaValorMapaComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, CadeiaValorMapaComponent_ng_template_0_Template, 3, 5, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "editable-form", 1)(3, "div", 2)(4, "input-select", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CadeiaValorMapaComponent_Template_input_select_change_4_listener() {
          return ctx.onCadeiaValorChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dndDrop", function CadeiaValorMapaComponent_Template_div_dndDrop_6_listener($event) {
          return ctx.onDrop($event, ctx.processos);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "span", 10)(12, "span", 11)(13, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, CadeiaValorMapaComponent_div_14_Template, 14, 13, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.cadeia_valor_id)("items", ctx.cadeiasValor);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](8, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleMap"]("--border-color:gray;--bg:white;--color:black;");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx.processos);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgTemplateOutlet, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__.InputSelectComponent, _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_8__.ActionButtonComponent, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__.DndDraggableDirective, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__.DndDropzoneDirective, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__.DndPlaceholderRefDirective],
    styles: [".cadeia-valor[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  background: none;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .dropdown-menu-button[_ngcontent-%COMP%] {\n  margin-top: -5px;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .align-button[_ngcontent-%COMP%] {\n  margin-top: -10px;\n}\n\n.cadeia-valor[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n  max-width: 200px;\n}\n\n.nivel-1[_ngcontent-%COMP%] {\n  border: 2px solid var(--border-color);\n  padding: 5px;\n  background: var(--bg);\n  position: relative;\n  margin-bottom: 15px;\n  color: var(--color);\n}\n\n.nivel-1[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 18px;\n}\n\n.nivel-1[_ngcontent-%COMP%]::after, .nivel-1[_ngcontent-%COMP%]::before {\n  top: 100%;\n  left: 95%;\n  border: solid #fff;\n  content: \"\";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n\n.nivel-1[_ngcontent-%COMP%]::after {\n  border-width: 20px;\n  margin-left: -20px;\n  border-color: rgba(136, 183, 213, 0);\n  border-top-color: var(--bg);\n}\n\n.nivel-1[_ngcontent-%COMP%]::before {\n  border-width: 23px;\n  margin-left: -23px;\n  border-color: rgba(194, 225, 245, 0);\n  border-top-color: var(--border-color);\n}\n\n.nivel-2[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 10px;\n  color: var(--color);\n  background-color: var(--bg);\n  margin-bottom: 10px;\n  margin-right: 40px;\n}\n\n.nivel-2[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  text-align: center;\n}\n\n.nivel-2[_ngcontent-%COMP%]:before, .nivel-2[_ngcontent-%COMP%]:after {\n  width: 20px;\n  height: 50%;\n  position: absolute;\n  left: 100%;\n  content: \"\";\n}\n\n.nivel-2[_ngcontent-%COMP%]:before {\n  top: 0px;\n  background: linear-gradient(to right top, var(--bg) 50%, transparent 50%);\n}\n\n.nivel-2[_ngcontent-%COMP%]:after {\n  top: 50%;\n  background: linear-gradient(to right bottom, var(--bg) 50%, transparent 50%);\n}\n\n.nivel-3[_ngcontent-%COMP%] {\n  background-color: var(--bg);\n  color: var(--color);\n  padding: 5px;\n  margin-bottom: 10px;\n}\n\n.nivel-3[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 400;\n  margin: 0;\n}\n\n.nivel-3[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  margin-top: 5px;\n  padding: 5px;\n  font-size: 13px;\n  background-color: var(--bg);\n  color: var(--color);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vY2FkZWlhLXZhbG9yL2NhZGVpYS12YWxvci1tYXBhL2NhZGVpYS12YWxvci1tYXBhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtBQUNKOztBQUVBO0VBQ0kscUNBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVBOztFQUVJLFNBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0FBQ0o7O0FBRUE7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSwyQkFBQTtBQUNKOztBQUVBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0VBQ0EscUNBQUE7QUFDSjs7QUFFQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFFQTs7RUFFSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUFDSjs7QUFFQTtFQUNJLFFBQUE7RUFDQSx5RUFBQTtBQUNKOztBQUVBO0VBQ0ksUUFBQTtFQUNBLDRFQUFBO0FBQ0o7O0FBRUE7RUFDSSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi5jYWRlaWEtdmFsb3IgLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuXHJcbi5jYWRlaWEtdmFsb3IgLmRyb3Bkb3duLW1lbnUtYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IC01cHg7XHJcbn1cclxuXHJcbi5jYWRlaWEtdmFsb3IgLmFsaWduLWJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTBweDtcclxufVxyXG5cclxuLmNhZGVpYS12YWxvciAudGV4dG8ge1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLm5pdmVsLTEge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnKTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICBjb2xvcjogdmFyKC0tY29sb3IpO1xyXG59XHJcblxyXG4ubml2ZWwtMSBoMyB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuXHJcbi5uaXZlbC0xOjphZnRlcixcclxuLm5pdmVsLTE6OmJlZm9yZSB7XHJcbiAgICB0b3A6IDEwMCU7XHJcbiAgICBsZWZ0OiA5NSU7XHJcbiAgICBib3JkZXI6IHNvbGlkICNmZmY7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgaGVpZ2h0OiAwO1xyXG4gICAgd2lkdGg6IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxufVxyXG5cclxuLm5pdmVsLTE6OmFmdGVyIHtcclxuICAgIGJvcmRlci13aWR0aDogMjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMjBweDtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiYSgxMzYsIDE4MywgMjEzLCAwKTtcclxuICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWJnKTtcclxufVxyXG5cclxuLm5pdmVsLTE6OmJlZm9yZSB7XHJcbiAgICBib3JkZXItd2lkdGg6IDIzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogLTIzcHg7XHJcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMTk0LCAyMjUsIDI0NSwgMCk7XHJcbiAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1ib3JkZXItY29sb3IpO1xyXG59XHJcblxyXG4ubml2ZWwtMiB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnKTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbi5uaXZlbC0yIGg0IHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLm5pdmVsLTI6YmVmb3JlLFxyXG4ubml2ZWwtMjphZnRlciB7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGhlaWdodDogNTAlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogMTAwJTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbn1cclxuXHJcbi5uaXZlbC0yOmJlZm9yZSB7XHJcbiAgICB0b3A6IDBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCB0b3AsIHZhcigtLWJnKSA1MCUsIHRyYW5zcGFyZW50IDUwJSk7XHJcbn1cclxuXHJcbi5uaXZlbC0yOmFmdGVyIHtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0IGJvdHRvbSwgdmFyKC0tYmcpIDUwJSwgdHJhbnNwYXJlbnQgNTAlKTtcclxufVxyXG5cclxuLm5pdmVsLTMge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmcpO1xyXG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5uaXZlbC0zIGg1IHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5uaXZlbC0zIGRpdiB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnKTtcclxuICAgIGNvbG9yOiB2YXIoLS1jb2xvcik7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 97075:
/*!****************************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor-routing.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorRoutingModule: () => (/* binding */ CadeiaValorRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../guards/auth.guard */ 1391);
/* harmony import */ var _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../resolvies/config.resolver */ 2314);
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ 32946);
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ 85939);
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ 81420);
/* harmony import */ var _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component */ 38616);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);









const routes = [{
  path: '',
  component: _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorListComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Cadeia de Valor"
  }
}, {
  path: 'grid',
  component: _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorListGridComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Cadeia de Valor"
  }
}, {
  path: 'new',
  component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorFormComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Cadeia de Valor",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorFormComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Cadeia de Valor",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorFormComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Cadeia de Valor",
    modal: true
  }
}, {
  path: 'processoList',
  component: _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_5__.CadeiaValorListProcessosEntregasComponent,
  canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: _resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Lista de Processos da Cadeia de Valor",
    modal: true
  }
}];
class CadeiaValorRoutingModule {
  static #_ = this.ɵfac = function CadeiaValorRoutingModule_Factory(t) {
    return new (t || CadeiaValorRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: CadeiaValorRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](CadeiaValorRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 45288:
/*!********************************************************************!*\
  !*** ./src/app/modules/gestao/cadeia-valor/cadeia-valor.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CadeiaValorModule: () => (/* binding */ CadeiaValorModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-drag-drop */ 51474);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/components.module */ 10822);
/* harmony import */ var _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cadeia-valor-routing.module */ 97075);
/* harmony import */ var _cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cadeia-valor-list/cadeia-valor-list.component */ 32946);
/* harmony import */ var _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadeia-valor-form/cadeia-valor-form.component */ 85939);
/* harmony import */ var _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadeia-valor-list-grid/cadeia-valor-list-grid.component */ 81420);
/* harmony import */ var _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cadeia-valor-mapa/cadeia-valor-mapa.component */ 63934);
/* harmony import */ var _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cadeia-valor-list-processos/cadeia-valor-list-processos.component */ 83869);
/* harmony import */ var _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cadeia-valor-list-processos-entregas/cadeia-valor-list-processos-entregas.component */ 38616);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 51197);












class CadeiaValorModule {
  static #_ = this.ɵfac = function CadeiaValorModule_Factory(t) {
    return new (t || CadeiaValorModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: CadeiaValorModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__.DndModule, _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__.CadeiaValorRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](CadeiaValorModule, {
    declarations: [_cadeia_valor_list_cadeia_valor_list_component__WEBPACK_IMPORTED_MODULE_2__.CadeiaValorListComponent, _cadeia_valor_form_cadeia_valor_form_component__WEBPACK_IMPORTED_MODULE_3__.CadeiaValorFormComponent, _cadeia_valor_list_grid_cadeia_valor_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.CadeiaValorListGridComponent, _cadeia_valor_list_processos_cadeia_valor_list_processos_component__WEBPACK_IMPORTED_MODULE_6__.CadeiaValorListProcessosComponent, _cadeia_valor_mapa_cadeia_valor_mapa_component__WEBPACK_IMPORTED_MODULE_5__.CadeiaValorMapaComponent, _cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_7__.CadeiaValorListProcessosEntregasComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_11__.DndModule, _cadeia_valor_routing_module__WEBPACK_IMPORTED_MODULE_1__.CadeiaValorRoutingModule],
    exports: [_cadeia_valor_list_processos_entregas_cadeia_valor_list_processos_entregas_component__WEBPACK_IMPORTED_MODULE_7__.CadeiaValorListProcessosEntregasComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=5288.js.map