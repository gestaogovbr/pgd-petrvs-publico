"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[448],{

/***/ 90159:
/*!******************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/capacidade/capacidade-form/capacidade-form.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeFormComponent: () => (/* binding */ CapacidadeFormComponent)
/* harmony export */ });
/* harmony import */ var _home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/capacidade-dao.service */ 86994);
/* harmony import */ var src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/capacidade.model */ 93164);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-capacidade-dao.service */ 96150);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/input/input-select/input-select.component */ 64603);

var _class;











const _c0 = ["tipo_capacidade"];
function CapacidadeFormComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
class CapacidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_3__.Capacidade, src_app_dao_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.CapacidadeDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['perfil_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Capacidade") + ': ' + (entity?.perfil?.nome || "") + ': ' + (entity?.tipo_capacidade?.codigo || "");
    };
    this.tipoCapacidadeDao = injector.get(src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoCapacidadeDaoService);
    this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_6__.PerfilDaoService);
    this.form = this.fh.FormBuilder({
      perfil_id: {
        default: ""
      },
      tipo_capacidade_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.join = ["tipo_capacidade"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_home_geisimar_Petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      yield Promise.all([_this.tipoCapacidade.loadSearch(entity.tipo_capacidade || entity.tipo_capacidade_id)]);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    form.patchValue(new src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_3__.Capacidade());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const capacidade = this.util.fill(new src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_3__.Capacidade(), this.entity);
      resolve(this.util.fillForm(capacidade, this.form.value));
    });
  }
}
_class = CapacidadeFormComponent;
_class.ɵfac = function CapacidadeFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-capacidade-form"]],
  viewQuery: function CapacidadeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.tipoCapacidade = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 7,
  vars: 7,
  consts: [["class", "my-2", 4, "ngIf"], ["initialFocus", "tipo_capacidade_id", 3, "form", "submit", "cancel"], [1, "row"], ["controlName", "tipo_capacidade_id", 3, "size", "dao"], ["tipo_capacidade", ""], ["controlName", "perfil_id", "required", "", 3, "size", "label", "dao"], [1, "my-2"]],
  template: function CapacidadeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, CapacidadeFormComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "editable-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function CapacidadeFormComponent_Template_editable_form_submit_1_listener() {
        return ctx.onSaveData();
      })("cancel", function CapacidadeFormComponent_Template_editable_form_cancel_1_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "input-search", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "input-select", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("dao", ctx.tipoCapacidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 6)("label", ctx.lex.translate("Perfil"))("dao", ctx.perfilDao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__.InputSearchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__.InputSelectComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 90484:
/*!******************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/capacidade/capacidade-list/capacidade-list.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeListComponent: () => (/* binding */ CapacidadeListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/capacidade-dao.service */ 86994);
/* harmony import */ var src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/capacidade.model */ 93164);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-capacidade-dao.service */ 96150);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);
var _class;















function CapacidadeListComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "h3", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function CapacidadeListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", row_r7.perfil.nome, "");
  }
}
function CapacidadeListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", row_r8.tipo_capacidade.codigo, "");
  }
}
function CapacidadeListComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", row_r9.tipo_capacidade.descricao, "");
  }
}
class CapacidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_capacidade_model__WEBPACK_IMPORTED_MODULE_2__.Capacidade, src_app_dao_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_1__.CapacidadeDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.descricao?.length) {
        result.push(["perfil_id", "=", this.urlParams?.get("perfil_id")]);
      }
      return result;
    };
    this.join = ["tipo_capacidade", "perfil"];
    this.tipoCapacidadeDao = injector.get(src_app_dao_tipo_capacidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.TipoCapacidadeDaoService);
    this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_5__.PerfilDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Capacidades");
    this.code = "MOD_TIPO_CAP";
    this.filter = this.fh.FormBuilder({
      descricao: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de capacidade
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de capacidade
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.perfilDao.getById(this.urlParams.get("perfil_id")).then(perfil => {
      this.title = this.lex.translate("Capacidades") + " do perfil " + perfil?.nome;
      this.cdRef.detectChanges();
    });
  }
  filterClear(filter) {
    filter.controls.descricao.setValue("");
    super.filterClear(filter);
  }
}
_class = CapacidadeListComponent;
_class.ɵfac = function CapacidadeListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-capacidade-list"]],
  viewQuery: function CapacidadeListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 18,
  vars: 24,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "descricao", 3, "size", "label", "control"], [3, "title", "template"], ["columnPerfil", ""], ["title", "C\u00F3digo", 3, "template"], ["columnCodCapacidade", ""], ["columnTipoCapacidade", ""], ["type", "options", 3, "onEdit", "onDelete"], [3, "rows"], [1, "my-2"]],
  template: function CapacidadeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, CapacidadeListComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "filter", 2)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "columns")(7, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, CapacidadeListComponent_ng_template_8_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, CapacidadeListComponent_ng_template_11_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, CapacidadeListComponent_ng_template_14_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](16, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](17, "pagination", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](9);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](12);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", ctx.lex.translate("Capacidade"))("control", ctx.filter.controls.descricao);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.translate("Perfil"))("template", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.translate("Capacidade"))("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("onEdit", ctx.edit)("onDelete", ctx.delete);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__.InputTextComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 41888:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/capacidade/capacidade-routing.module.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeRoutingModule: () => (/* binding */ CapacidadeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _capacidade_form_capacidade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./capacidade-form/capacidade-form.component */ 90159);
/* harmony import */ var _capacidade_list_capacidade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./capacidade-list/capacidade-list.component */ 90484);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _capacidade_list_capacidade_list_component__WEBPACK_IMPORTED_MODULE_3__.CapacidadeListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Capacidades"
  }
}, {
  path: 'new',
  component: _capacidade_form_capacidade_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Capacidade",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _capacidade_form_capacidade_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Capacidade",
    modal: true
  }
}];
class CapacidadeRoutingModule {}
_class = CapacidadeRoutingModule;
_class.ɵfac = function CapacidadeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CapacidadeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 18448:
/*!******************************************************************************!*\
  !*** ./src/app/modules/configuracoes/perfil/capacidade/capacidade.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeModule: () => (/* binding */ CapacidadeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _capacidade_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capacidade-routing.module */ 41888);
/* harmony import */ var _capacidade_form_capacidade_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./capacidade-form/capacidade-form.component */ 90159);
/* harmony import */ var _capacidade_list_capacidade_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./capacidade-list/capacidade-list.component */ 90484);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class CapacidadeModule {}
_class = CapacidadeModule;
_class.ɵfac = function CapacidadeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _capacidade_routing_module__WEBPACK_IMPORTED_MODULE_0__.CapacidadeRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CapacidadeModule, {
    declarations: [_capacidade_form_capacidade_form_component__WEBPACK_IMPORTED_MODULE_1__.CapacidadeFormComponent, _capacidade_list_capacidade_list_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _capacidade_routing_module__WEBPACK_IMPORTED_MODULE_0__.CapacidadeRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=448.js.map