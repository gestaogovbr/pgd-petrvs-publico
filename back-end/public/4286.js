"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[4286],{

/***/ 24896:
/*!***************************************!*\
  !*** ./src/app/models/cargo.model.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cargo: () => (/* binding */ Cargo)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Cargo extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; //Nome do Cargo
    this.nivel = ""; //Nivel do Cargo
    this.descricao = ""; //Descricao do Cargo
    this.siape = ""; //Códido SIAPE do Cargo
    this.cbo = ""; //Código CBO do Cargo
    this.efetivo = 1; //Cargo efetivo ou comissionado
    this.ativo = 1; //Cargo esta ativo ou não
    this.initialization(data);
  }
}

/***/ }),

/***/ 81638:
/*!***************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/cargo/cargo-form/cargo-form.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CargoFormComponent: () => (/* binding */ CargoFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/cargo.model */ 24896);
/* harmony import */ var src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cargo-dao.service */ 99255);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);








class CargoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  //public tipoCursoDao ?: TipoCursoDaoService;
  constructor(injector) {
    super(injector, src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__.Cargo, src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_3__.CargoDaoService);
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
      cbo: {
        default: ""
      },
      siape: {
        default: ""
      },
      descricao: {
        default: ""
      },
      ativo: {
        default: true
      },
      efetivo: {
        default: true
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__.Cargo());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const cargo = this.util.fill(new src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__.Cargo(), this.entity);
      resolve(this.util.fillForm(cargo, this.form.value));
    });
  }
  static #_ = this.ɵfac = function CargoFormComponent_Factory(t) {
    return new (t || CargoFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
    type: CargoFormComponent,
    selectors: [["cargo-form"]],
    viewQuery: function CargoFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
    decls: 9,
    vars: 15,
    consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Nome do Cargo", "controlName", "nome", "required", "", 3, "size"], ["label", "N\u00EDvel do Cargo", "controlName", "nivel", 3, "size"], ["label", "C\u00F3digo SIAPE do Cargo", "controlName", "siape", 3, "size"], ["label", "C\u00F3digo CBO do Cargo", "controlName", "cbo", 3, "size"], ["label", "Descri\u00E7\u00E3o do Cargo", "controlName", "descricao", 3, "size"], ["labelPosition", "left", "label", "Efetivo", "controlName", "efetivo", 3, "size"], ["labelPosition", "left", "label", "Ativo", "controlName", "ativo", 3, "size"]],
    template: function CargoFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("submit", function CargoFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function CargoFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "input-text", 2)(3, "input-text", 3)(4, "input-text", 4)(5, "input-text", 5)(6, "input-text", 6)(7, "input-switch", 7)(8, "input-switch", 8);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 2);
      }
    },
    dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 98966:
/*!***************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/cargo/cargo-list/cargo-list.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CargoListComponent: () => (/* binding */ CargoListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/cargo.model */ 24896);
/* harmony import */ var src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cargo-dao.service */ 99255);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../components/input/input-text/input-text.component */ 92392);














function CargoListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar");
  }
}
function CargoListComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r5 = ctx.row;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r2.lookup.getValue(ctx_r2.lookup.SIMNAO, row_r5.efetivo), " ");
  }
}
function CargoListComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r4.lookup.getValue(ctx_r4.lookup.SIMNAO, row_r6.ativo), " ");
  }
}
class CargoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_1__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_cargo_model__WEBPACK_IMPORTED_MODULE_2__.Cargo, src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_3__.CargoDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      let valEfetivo = form.efetivo.value ? 1 : 0;
      let valAtivo = form.ativo.value ? 1 : 0;
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
      if (form.ativo) {
        result.push(["ativo", "==", 1]);
        //result.push(["ativo", "like", "%" + form.titulo + "%"]);
      }
      result.push(["efetivo", "==", form.efetivo ? 1 : 0]);
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Cargos");
    this.code = "MOD_RX";
    this.orderBy = [['nome', 'asc']];
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
      efetivo: {
        default: 1
      },
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
  static #_ = this.ɵfac = function CargoListComponent_Factory(t) {
    return new (t || CargoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: CargoListComponent,
    selectors: [["app-cargo-list"]],
    viewQuery: function CargoListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 25,
    vars: 41,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome do Cargo", "controlName", "nome", "placeholder", "Nome da \u00E1rea de conhecimento", 3, "size", "control"], ["label", "N\u00EDvel", "controlName", "nivel", "placeholder", "", 3, "size", "control"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "placeholder", "", 3, "size", "control"], ["label", "C\u00F3digo SIAPE", "controlName", "siape", "placeholder", "", 3, "size", "control"], ["label", "C\u00F3digo CBO", "controlName", "cbo", "placeholder", "", 3, "size", "control"], ["label", "Efetivo", "controlName", "efetivo", "placeholder", "", 3, "size", "control"], ["label", "Ativo", "controlName", "ativo", "placeholder", "", 3, "size", "control"], ["title", "Cargos", "field", "nome", "orderBy", "nome"], ["title", "N\u00EDvel", "field", "nivel"], ["title", "Descri\u00E7\u00E3o", "field", "descricao"], ["title", "SIAPE", "field", "siape"], ["title", "CBO", "field", "cbo"], ["title", "Efetivo", 3, "template"], ["columnEfetivo", ""], ["title", "Ativo", 3, "template"], ["columnAtivo", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
    template: function CargoListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function CargoListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, CargoListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-text", 6)(7, "input-text", 7)(8, "input-text", 8)(9, "input-switch", 9)(10, "input-switch", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "column", 11)(13, "column", 12)(14, "column", 13)(15, "column", 14)(16, "column", 15)(17, "column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, CargoListComponent_ng_template_18_Template, 1, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, CargoListComponent_ng_template_21_Template, 1, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](23, "column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](24, "pagination", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](19);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](22);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.efetivo);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.ativo);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r3);
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

/***/ 77321:
/*!****************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/cargo/cargo-routing.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CargoRoutingModule: () => (/* binding */ CargoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _cargo_list_cargo_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cargo-list/cargo-list.component */ 98966);
/* harmony import */ var _cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cargo-form/cargo-form.component */ 81638);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







;
const routes = [{
  path: '',
  component: _cargo_list_cargo_list_component__WEBPACK_IMPORTED_MODULE_2__.CargoListComponent,
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
  component: _cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_3__.CargoFormComponent,
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
  component: _cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_3__.CargoFormComponent,
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
  component: _cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_3__.CargoFormComponent,
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
class CargoRoutingModule {
  static #_ = this.ɵfac = function CargoRoutingModule_Factory(t) {
    return new (t || CargoRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: CargoRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CargoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 94286:
/*!********************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/cargo/cargo.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CargoModule: () => (/* binding */ CargoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cargo-form/cargo-form.component */ 81638);
/* harmony import */ var _cargo_list_cargo_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cargo-list/cargo-list.component */ 98966);
/* harmony import */ var _cargo_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cargo-routing.module */ 77321);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







class CargoModule {
  static #_ = this.ɵfac = function CargoModule_Factory(t) {
    return new (t || CargoModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: CargoModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _cargo_routing_module__WEBPACK_IMPORTED_MODULE_3__.CargoRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CargoModule, {
    declarations: [_cargo_form_cargo_form_component__WEBPACK_IMPORTED_MODULE_1__.CargoFormComponent, _cargo_list_cargo_list_component__WEBPACK_IMPORTED_MODULE_2__.CargoListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _cargo_routing_module__WEBPACK_IMPORTED_MODULE_3__.CargoRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=4286.js.map