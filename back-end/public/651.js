"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[651],{

/***/ 37389:
/*!****************************************!*\
  !*** ./src/app/models/funcao.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Funcao: () => (/* binding */ Funcao)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Funcao extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; //Nome da funcao
    this.nivel = ""; //Nível da funcao
    this.descricao = ""; //Descrição da funcao
    this.siape = ""; //Código SIAPE da funcao
    this.cbo = ""; //Código CBO da funcao
    this.ativo = 1; //Funcao esta ativo ou não
    this.initialization(data);
  }
}

/***/ }),

/***/ 72700:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/funcao/funcao-form/funcao-form.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FuncaoFormComponent: () => (/* binding */ FuncaoFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/funcao.model */ 37389);
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);








class FuncaoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  //public tipoCursoDao ?: TipoCursoDaoService;
  constructor(injector) {
    super(injector, src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__.Funcao, src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__.FuncaoDaoService);
    this.injector = injector;
    this.titulos = [];
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
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      nivel: {
        default: ""
      },
      siape: {
        default: ""
      },
      cbo: {
        default: ""
      },
      descricao: {
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
    form.patchValue(new src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__.Funcao());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const funcao = this.util.fill(new src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__.Funcao(), this.entity);
      resolve(this.util.fillForm(funcao, this.form.value));
    });
  }
  static #_ = this.ɵfac = function FuncaoFormComponent_Factory(t) {
    return new (t || FuncaoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: FuncaoFormComponent,
    selectors: [["funcao-form"]],
    viewQuery: function FuncaoFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
    decls: 8,
    vars: 15,
    consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome da Fun\u00E7\u00E3o", "controlName", "nome", "required", "", 3, "size"], ["label", "N\u00EDvel da Fun\u00E7\u00E3o", "controlName", "nivel", 3, "size"], ["label", "C\u00F3digo SIAPE da Fun\u00E7\u00E3o", "controlName", "siape", 3, "size"], ["label", "C\u00F3digo CBO da Fun\u00E7\u00E3o", "controlName", "cbo", 3, "size"], ["label", "Descri\u00E7\u00E3o da Fun\u00E7\u00E3o", "controlName", "descricao", 3, "size"], ["labelPosition", "left", "label", "Ativo", "controlName", "ativo", 3, "size"]],
    template: function FuncaoFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("submit", function FuncaoFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function FuncaoFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "input-text", 2)(3, "input-text", 3)(4, "input-text", 4)(5, "input-text", 5)(6, "input-text", 6)(7, "input-switch", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", 250);
      }
    },
    dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 88868:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/funcao/funcao-list/funcao-list.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FuncaoListComponent: () => (/* binding */ FuncaoListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/funcao.model */ 37389);
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);














function FuncaoListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar");
  }
}
function FuncaoListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r3 = ctx.row;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r2.lookup.getValue(ctx_r2.lookup.SIMNAO, row_r3.ativo), " ");
  }
}
class FuncaoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_1__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_funcao_model__WEBPACK_IMPORTED_MODULE_2__.Funcao, src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__.FuncaoDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      if (form.descricao?.length) {
        result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
      }
      if (form.nivel?.length) {
        result.push(["nivel", "like", "%" + form.nivel.trim().replace(" ", "%") + "%"]);
      }
      if (form.siape?.length) {
        result.push(["siape", "like", "%" + form.siape.trim().replace(" ", "%") + "%"]);
      }
      if (form.cbo?.length) {
        result.push(["cbo", "like", "%" + form.cbo.trim().replace(" ", "%") + "%"]);
      }
      /* if(form.ativo?.length) {
         result.push(["ativo", "like", "%" + form.titulo + "%"]);
       }*/
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Funções");
    this.code = "MOD_RX";
    //this.join = ["area:nome","tipo:nome"];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      descricao: {
        default: ""
      },
      nivel: {
        default: ""
      },
      siape: {
        default: ""
      },
      cbo: {
        default: ""
      },
      //efetivo: {default: 1},
      ativo: {
        default: 1
      }
    });
    // Testa se o usuário possui permissão para exibir dados de cursos
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o curso
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
    filter.controls.descrição.setValue("");
    filter.controls.nivel.setValue("");
    filter.controls.siape.setValue("");
    filter.controls.cbo.setValue("");
    super.filterClear(filter);
  }
  static #_ = this.ɵfac = function FuncaoListComponent_Factory(t) {
    return new (t || FuncaoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: FuncaoListComponent,
    selectors: [["funcao-list"]],
    viewQuery: function FuncaoListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 21,
    vars: 38,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome da Fun\u00E7\u00E3o", "controlName", "nome", "placeholder", "Nome da \u00E1rea de conhecimento", 3, "size", "control"], ["label", "N\u00EDvel", "controlName", "nivel", "placeholder", "", 3, "size", "control"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "placeholder", "", 3, "size", "control"], ["label", "C\u00F3digo SIAPE", "controlName", "siape", "placeholder", "", 3, "size", "control"], ["label", "C\u00F3digo CBO", "controlName", "cbo", "placeholder", "", 3, "size", "control"], ["label", "Ativo", "controlName", "ativo", "placeholder", "", 3, "size", "control"], ["title", "Fun\u00E7\u00F5es", "field", "nome", "orderBy", "nome"], ["title", "N\u00EDvel", "field", "nivel"], ["title", "Descri\u00E7\u00E3o", "field", "descricao"], ["title", "SIAPE", "field", "siape"], ["title", "CBO", "field", "cbo"], ["title", "Ativo", 3, "template"], ["columnAtivo", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
    template: function FuncaoListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function FuncaoListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, FuncaoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-text", 6)(7, "input-text", 7)(8, "input-text", 8)(9, "input-switch", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "column", 10)(12, "column", 11)(13, "column", 12)(14, "column", 13)(15, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, FuncaoListComponent_ng_template_17_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](19, "column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](20, "pagination", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.nivel);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.descricao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.siape);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.cbo);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.ativo);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 64193:
/*!******************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/funcao/funcao-routing.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FuncaoRoutingModule: () => (/* binding */ FuncaoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _funcao_list_funcao_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./funcao-list/funcao-list.component */ 88868);
/* harmony import */ var _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./funcao-form/funcao-form.component */ 72700);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







const routes = [{
  path: '',
  component: _funcao_list_funcao_list_component__WEBPACK_IMPORTED_MODULE_2__.FuncaoListComponent,
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
  component: _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_3__.FuncaoFormComponent,
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
  component: _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_3__.FuncaoFormComponent,
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
  component: _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_3__.FuncaoFormComponent,
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
class FuncaoRoutingModule {
  static #_ = this.ɵfac = function FuncaoRoutingModule_Factory(t) {
    return new (t || FuncaoRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: FuncaoRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FuncaoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 70651:
/*!**********************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/funcao/funcao.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FuncaoModule: () => (/* binding */ FuncaoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _funcao_list_funcao_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./funcao-list/funcao-list.component */ 88868);
/* harmony import */ var _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./funcao-form/funcao-form.component */ 72700);
/* harmony import */ var _funcao_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./funcao-routing.module */ 64193);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







class FuncaoModule {
  static #_ = this.ɵfac = function FuncaoModule_Factory(t) {
    return new (t || FuncaoModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: FuncaoModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _funcao_routing_module__WEBPACK_IMPORTED_MODULE_3__.FuncaoRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FuncaoModule, {
    declarations: [_funcao_list_funcao_list_component__WEBPACK_IMPORTED_MODULE_1__.FuncaoListComponent, _funcao_form_funcao_form_component__WEBPACK_IMPORTED_MODULE_2__.FuncaoFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _funcao_routing_module__WEBPACK_IMPORTED_MODULE_3__.FuncaoRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=651.js.map