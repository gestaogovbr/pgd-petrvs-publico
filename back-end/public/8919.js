"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8919],{

/***/ 37458:
/*!****************************************************!*\
  !*** ./src/app/models/capacidade-tecnica.model.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeTecnica: () => (/* binding */ CapacidadeTecnica)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class CapacidadeTecnica extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; //Nome da Capacidade Tecnica
    this.ativo = 1; //Capacidade Tecnica esta ativo ou não
    this.area_tematica_id = ""; //Área Tematica
    this.initialization(data);
  }
}

/***/ }),

/***/ 70983:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/capacidade-tecnica/capacidade-tecnica-form/capacidade-tecnica-form.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeTecnicaFormComponent: () => (/* binding */ CapacidadeTecnicaFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/capacidade-tecnica.model */ 37458);
/* harmony import */ var src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/capacidade-tecnica-dao.service */ 53399);
/* harmony import */ var src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/area-tematica-dao.service */ 88653);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/input/input-select/input-select.component */ 64603);










const _c0 = function () {
  return ["raiox", "cadastros", "gerais", "areatematica", "new"];
};
const _c1 = function (a0) {
  return {
    route: a0
  };
};
class CapacidadeTecnicaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  // public areaTematicaWhere: any[] = [["id", "==", null]];
  constructor(injector) {
    super(injector, src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnica, src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_3__.CapacidadeTecnicaDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + (entity?.nome || "");
    };
    this.areaTematicaDao = injector.get(src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_4__.AreaTematicaDaoService);
    this.form = this.fh.FormBuilder({
      area_tematica_id: {
        default: ""
      },
      nome: {
        default: ""
      },
      ativo: {
        default: true
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnica());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const capacidadeTecnica = this.util.fill(new src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnica(), this.entity);
      resolve(this.util.fillForm(capacidadeTecnica, this.form.value));
    });
  }
  static #_ = this.ɵfac = function CapacidadeTecnicaFormComponent_Factory(t) {
    return new (t || CapacidadeTecnicaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
    type: CapacidadeTecnicaFormComponent,
    selectors: [["capacidade-tecnica-form"]],
    viewQuery: function CapacidadeTecnicaFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 13,
    consts: [["initialFocus", "areaTematica", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "\u00C1rea Tem\u00E1tica", "icon", "fas fa-layer-group", "controlName", "areaTematica", "liveSearch", "", 3, "size", "control", "dao", "addRoute"], ["curso", ""], ["label", "Nome da Capacidade T\u00E9cnica", "controlName", "nome", "required", "", 3, "size"], ["labelPosition", "left", "label", "Ativo", "controlName", "ativo", 3, "size"]],
    template: function CapacidadeTecnicaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function CapacidadeTecnicaFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function CapacidadeTecnicaFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "input-select", 2, 3)(4, "input-text", 4)(5, "input-switch", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.areaTematica)("dao", ctx.areaTematicaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](11, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](10, _c0)));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2);
      }
    },
    dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_5__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__.InputSelectComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 32887:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/capacidade-tecnica/capacidade-tecnica-list/capacidade-tecnica-list.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeTecnicaListComponent: () => (/* binding */ CapacidadeTecnicaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/capacidade-tecnica.model */ 37458);
/* harmony import */ var src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/capacidade-tecnica-dao.service */ 53399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);













function CapacidadeTecnicaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "toolbar");
  }
}
function CapacidadeTecnicaListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r5 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r5.area_tematica.nome);
  }
}
function CapacidadeTecnicaListComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r4.lookup.getValue(ctx_r4.lookup.SIMNAO, row_r6.ativo), " ");
  }
}
class CapacidadeTecnicaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_0__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_capacidade_tecnica_model__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnica, src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_3__.CapacidadeTecnicaDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      if (form.area_tematica_id?.length) {
        result.push(["id", "like", "%" + form.area_tematica_id.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Capacidades Técnicas");
    this.code = "MOD_RX";
    this.join = ["area_tematica:id,nome"];
    this.orderBy = [['nome', 'asc']];
    //console.log('JOIN-->',this.join)
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      area_tematica_id: {
        default: ""
      },
      ativo: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados de CapacidadeTecnicas
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o CapacidadeTecnica
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
    filter.controls.area_tematica_id.setValue("");
    super.filterClear(filter);
  }
  static #_ = this.ɵfac = function CapacidadeTecnicaListComponent_Factory(t) {
    return new (t || CapacidadeTecnicaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: CapacidadeTecnicaListComponent,
    selectors: [["capacidade-tecnica-list"]],
    viewQuery: function CapacidadeTecnicaListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
    decls: 17,
    vars: 31,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome da Capacidade T\u00E9cnica", "controlName", "nome", "placeholder", "Nome da Capacidade T\u00E9cnica", 3, "size", "control"], ["label", "Nome da \u00C1rea Tem\u00E1tica", "controlName", "area_tematica_id", "placeholder", "Nome da \u00C1rea Tem\u00E1tica", 3, "size", "control"], ["label", "Ativo", "controlName", "ativo", "placeholder", "", 3, "size", "control"], ["title", "Capacidade T\u00E9cnica", "field", "nome", "orderBy", "nome"], ["title", "\u00C1rea Tem\u00E1tica", 3, "template"], ["columnAreaTematica", ""], ["title", "Ativo", 3, "template"], ["columnAtivo", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
    template: function CapacidadeTecnicaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function CapacidadeTecnicaListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, CapacidadeTecnicaListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, CapacidadeTecnicaListComponent_ng_template_10_Template, 2, 1, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, CapacidadeTecnicaListComponent_ng_template_13_Template, 1, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](16, "pagination", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](11);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 5)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.area_tematica_id);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.ativo);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 27792:
/*!******************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/capacidade-tecnica/capacidade-tecnica-routing.module.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeTecnicaRoutingModule: () => (/* binding */ CapacidadeTecnicaRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./capacidade-tecnica-form/capacidade-tecnica-form.component */ 70983);
/* harmony import */ var _capacidade_tecnica_list_capacidade_tecnica_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./capacidade-tecnica-list/capacidade-tecnica-list.component */ 32887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







const routes = [{
  path: '',
  component: _capacidade_tecnica_list_capacidade_tecnica_list_component__WEBPACK_IMPORTED_MODULE_3__.CapacidadeTecnicaListComponent,
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
  component: _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnicaFormComponent,
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
  path: ':id/edit',
  component: _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnicaFormComponent,
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
  component: _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnicaFormComponent,
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
class CapacidadeTecnicaRoutingModule {
  static #_ = this.ɵfac = function CapacidadeTecnicaRoutingModule_Factory(t) {
    return new (t || CapacidadeTecnicaRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: CapacidadeTecnicaRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CapacidadeTecnicaRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 28919:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/capacidade-tecnica/capacidade-tecnica.module.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapacidadeTecnicaModule: () => (/* binding */ CapacidadeTecnicaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _capacidade_tecnica_list_capacidade_tecnica_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./capacidade-tecnica-list/capacidade-tecnica-list.component */ 32887);
/* harmony import */ var _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./capacidade-tecnica-form/capacidade-tecnica-form.component */ 70983);
/* harmony import */ var _capacidade_tecnica_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./capacidade-tecnica-routing.module */ 27792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







class CapacidadeTecnicaModule {
  static #_ = this.ɵfac = function CapacidadeTecnicaModule_Factory(t) {
    return new (t || CapacidadeTecnicaModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: CapacidadeTecnicaModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _capacidade_tecnica_routing_module__WEBPACK_IMPORTED_MODULE_3__.CapacidadeTecnicaRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CapacidadeTecnicaModule, {
    declarations: [_capacidade_tecnica_list_capacidade_tecnica_list_component__WEBPACK_IMPORTED_MODULE_1__.CapacidadeTecnicaListComponent, _capacidade_tecnica_form_capacidade_tecnica_form_component__WEBPACK_IMPORTED_MODULE_2__.CapacidadeTecnicaFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _capacidade_tecnica_routing_module__WEBPACK_IMPORTED_MODULE_3__.CapacidadeTecnicaRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=8919.js.map