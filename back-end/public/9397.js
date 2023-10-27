"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[9397],{

/***/ 48043:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-justificativa/tipo-justificativa-form/tipo-justificativa-form.component.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativaFormComponent: () => (/* binding */ TipoJustificativaFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-justificativa-dao.service */ 79055);
/* harmony import */ var src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-justificativa.model */ 65296);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
var _class;







class TipoJustificativaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativa, src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_1__.TipoJustificativaDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Tipo de Justificativa") + ': ' + (entity?.nome || "");
    };
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      data_inicio: {
        default: ""
      },
      data_fim: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativa());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const tipoJustificativa = this.util.fill(new src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativa(), this.entity);
      resolve(this.util.fillForm(tipoJustificativa, this.form.value));
    });
  }
}
_class = TipoJustificativaFormComponent;
_class.ɵfac = function TipoJustificativaFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-entidade-form"]],
  viewQuery: function TipoJustificativaFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 3,
  vars: 4,
  consts: [["initialFocus", "nome", 3, "form", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "controlName", "nome", "required", "", 3, "size"]],
  template: function TipoJustificativaFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("submit", function TipoJustificativaFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function TipoJustificativaFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "input-text", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", ctx.form)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("maxlength", 250);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__.InputTextComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 58142:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-justificativa/tipo-justificativa-list/tipo-justificativa-list.component.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativaListComponent: () => (/* binding */ TipoJustificativaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tipo-justificativa-dao.service */ 79055);
/* harmony import */ var src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tipo-justificativa.model */ 65296);
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













function TipoJustificativaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "toolbar");
  }
}
class TipoJustificativaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_tipo_justificativa_model__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativa, src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_1__.TipoJustificativaDaoService);
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
    this.title = this.lex.translate("Tipos de Justificativa");
    this.code = "MOD_TIPO_JUST";
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de justificativa
    if (this.auth.hasPermissionTo("MOD_TIPO_JUST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de justificativa
    if (this.auth.hasPermissionTo("MOD_TIPO_JUST_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }
}
_class = TipoJustificativaListComponent;
_class.ɵfac = function TipoJustificativaListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-tipo-justificativa-list"]],
  viewQuery: function TipoJustificativaListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 9,
  vars: 24,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", "placeholder", "Nome...", 3, "size", "label", "control"], ["title", "Descri\u00E7\u00E3o", "field", "nome"], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
  template: function TipoJustificativaListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function TipoJustificativaListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, TipoJustificativaListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "column", 5)(7, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "pagination", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TIPO_JUST_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TIPO_JUST_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("label", "Nome " + ctx.lex.translate("tipo de justificativa"))("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
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

/***/ 7428:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-justificativa/tipo-justificativa-routing.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativaRoutingModule: () => (/* binding */ TipoJustificativaRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-justificativa-form/tipo-justificativa-form.component */ 48043);
/* harmony import */ var _tipo_justificativa_list_tipo_justificativa_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tipo-justificativa-list/tipo-justificativa-list.component */ 58142);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _tipo_justificativa_list_tipo_justificativa_list_component__WEBPACK_IMPORTED_MODULE_3__.TipoJustificativaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Tipos de Justificativa"
  }
}, {
  path: 'new',
  component: _tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Tipo de Justificativa",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Tipo de Justificativa",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Tipo de Justificativa",
    modal: true
  }
}];
class TipoJustificativaRoutingModule {}
_class = TipoJustificativaRoutingModule;
_class.ɵfac = function TipoJustificativaRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoJustificativaRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 39397:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/cadastros/tipo-justificativa/tipo-justificativa.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativaModule: () => (/* binding */ TipoJustificativaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _tipo_justificativa_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tipo-justificativa-routing.module */ 7428);
/* harmony import */ var _tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tipo-justificativa-form/tipo-justificativa-form.component */ 48043);
/* harmony import */ var _tipo_justificativa_list_tipo_justificativa_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tipo-justificativa-list/tipo-justificativa-list.component */ 58142);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class TipoJustificativaModule {}
_class = TipoJustificativaModule;
_class.ɵfac = function TipoJustificativaModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_justificativa_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoJustificativaRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TipoJustificativaModule, {
    declarations: [_tipo_justificativa_form_tipo_justificativa_form_component__WEBPACK_IMPORTED_MODULE_1__.TipoJustificativaFormComponent, _tipo_justificativa_list_tipo_justificativa_list_component__WEBPACK_IMPORTED_MODULE_2__.TipoJustificativaListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _tipo_justificativa_routing_module__WEBPACK_IMPORTED_MODULE_0__.TipoJustificativaRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=9397.js.map