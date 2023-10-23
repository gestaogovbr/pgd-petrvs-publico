"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[202],{

/***/ 83251:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/uteis/templates/template-form/template-form.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateFormComponent: () => (/* binding */ TemplateFormComponent)
/* harmony export */ });
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var _models_template_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/template.model */ 98409);
/* harmony import */ var _dao_template_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dao/template-dao.service */ 99230);
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _template_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../template.service */ 49367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
var _class;











class TemplateFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_0__.PageFormBase {
  constructor(injector) {
    super(injector, _models_template_model__WEBPACK_IMPORTED_MODULE_1__.Template, _dao_template_dao_service__WEBPACK_IMPORTED_MODULE_2__.TemplateDaoService);
    this.injector = injector;
    this.dataset = [];
    this.validate = (control, controlName) => {
      let result = null;
      // if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      //   result = "Obrigatório";
      // }
      return result;
    };
    this.templateService = injector.get(_template_service__WEBPACK_IMPORTED_MODULE_4__.TemplateService);
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      titulo: {
        default: ""
      },
      especie: {
        default: "OUTRO"
      },
      conteudo: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.dataset = this.templateService.dataset(form.controls.especie.value);
  }
  initializeData(form) {
    this.loadData(new _models_template_model__WEBPACK_IMPORTED_MODULE_1__.Template({
      especie: this.queryParams?.especie || "OUTRO"
    }), form);
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const template = this.util.fill(new _models_template_model__WEBPACK_IMPORTED_MODULE_1__.Template(), this.entity);
      template.dataset = this.templateService.prepareDatasetToSave(this.dataset);
      resolve(this.util.fillForm(template, this.form.value));
    });
  }
}
_class = TemplateFormComponent;
_class.ɵfac = function TemplateFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-template-form"]],
  viewQuery: function TemplateFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_3__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 7,
  vars: 8,
  consts: [["initialFocus", "titulo", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "T\u00EDtulo", "icon", "bi bi-upc", "controlName", "titulo", "required", "", 3, "size"], ["disabled", "", "label", "Esp\u00E9cie", "controlName", "especie", 3, "size", "items"], ["title", "Design"], ["controlName", "conteudo", 3, "dataset"]],
  template: function TemplateFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function TemplateFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function TemplateFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-text", 2)(3, "input-select", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "separator", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "input-editor", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("items", ctx.lookup.TEMPLATE_ESPECIE);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dataset", ctx.dataset);
    }
  },
  dependencies: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_3__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_7__.SeparatorComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_8__.InputEditorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 72867:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/uteis/templates/template-list/template-list.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateListComponent: () => (/* binding */ TemplateListComponent)
/* harmony export */ });
/* harmony import */ var src_app_models_template_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/template.model */ 98409);
/* harmony import */ var src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/template-dao.service */ 99230);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _template_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../template.service */ 49367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
var _class;


















function TemplateListComponent_toolbar_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "toolbar");
  }
}
function TemplateListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "br")(3, "badge", 14)(4, "badge", 15);
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](row_r7.titulo);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("label", row_r7.numero);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("icon", ctx_r2.lookup.getIcon(ctx_r2.lookup.TEMPLATE_ESPECIE, row_r7.especie))("label", ctx_r2.lookup.getValue(ctx_r2.lookup.TEMPLATE_ESPECIE, row_r7.especie))("color", ctx_r2.lookup.getColor(ctx_r2.lookup.TEMPLATE_ESPECIE, row_r7.especie));
  }
}
function TemplateListComponent_editable_form_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "editable-form", 16)(1, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "input-text", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "input-editor", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", true)("form", ctx_r3.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("control", ctx_r3.form.controls.titulo);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("control", ctx_r3.form.controls.conteudo);
  }
}
function TemplateListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1, " Nenhum template selecionado ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
}
function TemplateListComponent_toolbar_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "toolbar", 20);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("buttons", ctx_r6.selectButtons);
  }
}
class TemplateListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_template_model__WEBPACK_IMPORTED_MODULE_0__.Template, src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_1__.TemplateDaoService);
    this.injector = injector;
    this.listagem = false;
    this.selectButtons = [{
      color: "btn-outline-success",
      label: "Selecionar",
      icon: "bi-check-circle",
      disabled: () => !this.selected,
      onClick: () => this.onSelect(this.selected)
    }, {
      color: "btn-outline-danger",
      label: "Cancelar",
      icon: "bi bi-dash-circle",
      onClick: () => this.close()
    }];
    this._dataset = [];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (this.listagem) {
        this.addParams = {
          especie: form.especie
        };
        const especie = this.lookup.TEMPLATE_ESPECIE.find(item => item.key === form.especie);
        this.title = this.lex.translate("Templates") + " - " + especie?.value;
      }
      result.push(["especie", "==", form.especie]);
      if (form.titulo?.length) {
        result.push(["titulo", "like", "%" + form.titulo.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    this.templateService = injector.get(_template_service__WEBPACK_IMPORTED_MODULE_4__.TemplateService);
    this.title = this.lex.translate("Termos de Ciência e Responsabilidade");
    this.code = "MOD_TEMP";
    this.modalWidth = 1200;
    this.filter = this.fh.FormBuilder({
      titulo: {
        default: ""
      },
      especie: {
        default: "OUTRO"
      }
    });
    this.form = this.fh.FormBuilder({
      titulo: {
        default: ""
      },
      conteudo: {
        default: ""
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_TEMP_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.addParams = {
      especie: this.filter?.controls.especie.value
    };
    if (this.queryParams.modo == "listagem") {
      this.title = this.lex.translate("Templates") + " - OUTRO";
      this.listagem = true;
      this.options = this.options.filter(option => option.label !== 'Associar TCR');
    } else {
      this.filter?.controls['especie'].disable;
      if (this.auth.hasPermissionTo("MOD_TEMP_EDT")) {
        this.options.push({
          icon: "bi bi-check-all",
          label: "Associar TCR",
          onClick: (row => this.go.navigate({
            route: ['cadastros', 'template', row.id, 'termos']
          }, {
            modalClose: modalResult => console.log(modalResult?.conteudo)
          })).bind(this)
        });
      }
    }
  }
  // public get dataset(): TemplateDataset[] {
  //   const dataset = this.templateService.dataset(this.filter!.controls.especie.value);
  //   if(JSON.stringify(this._dataset) != JSON.stringify(dataset)) {
  //     this._dataset = dataset;
  //   }
  //   return this._dataset;
  // }
  // public async addTemplate() {
  //   const template = new Template();
  //   template.id = this.dao!.generateUuid();
  //   template.especie = this.filter!.controls.especie.value;
  //   template.dataset = this.dataset;
  //   template.unidade_id = this.auth.unidade!.id;
  //   template._status = "ADD";
  //   this.onSelect(template);
  //   return template;
  // }
  /*
     public async saveDocumento(form: FormGroup, item: Template) {
    const entity = form.value;
    item.titulo = form.controls.titulo.value;
    item.conteudo = form.controls.conteudo.value;
    const template = await this.dao!.save(item);
    form.controls.id.setValue(template.id);
    item.id = template.id;
    return template;
  }*/
  onTemplateSelect(selected) {
    this.selected = selected || undefined;
    this.form.patchValue({
      titulo: this.selected?.titulo || "",
      conteudo: this.selected?.conteudo || ""
    });
    this.cdRef.detectChanges();
  }
}
_class = TemplateListComponent;
_class.ɵfac = function TemplateListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-template-list"]],
  viewQuery: function TemplateListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 20,
  vars: 30,
  consts: [[1, "row"], [3, "ngClass"], [3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], ["label", "Esp\u00E9cie", "controlName", "especie", 3, "size", "items"], ["label", "T\u00EDtulo", "controlName", "titulo", "placeholder", "T\u00EDtulo ...", 3, "size", "control"], ["title", "Template", 3, "template"], ["columnTemplate", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["noButtons", "", 3, "disabled", "form", 4, "ngIf", "ngIfElse"], ["noSelected", ""], [3, "buttons", 4, "ngIf"], ["icon", "bi bi-hash", 3, "label"], [3, "icon", "label", "color"], ["noButtons", "", 3, "disabled", "form"], ["label", "T\u00EDtulo", 3, "size", "control"], ["label", "Pre-view do template", 3, "size", "control"], [1, "block", "w-100", "text-center"], [3, "buttons"]],
  template: function TemplateListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "grid", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function TemplateListComponent_Template_grid_select_2_listener($event) {
        return ctx.onTemplateSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, TemplateListComponent_toolbar_3_Template, 1, 0, "toolbar", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "filter", 4)(5, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](6, "input-select", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](8, "input-text", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "columns")(10, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](11, TemplateListComponent_ng_template_11_Template, 5, 5, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](14, "pagination", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, TemplateListComponent_editable_form_16_Template, 5, 7, "editable-form", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](17, TemplateListComponent_ng_template_17_Template, 2, 0, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](19, TemplateListComponent_toolbar_19_Template, 1, 1, "toolbar", 13);
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](12);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngClass", ctx.listagem ? "col-12" : "col-4");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_TEMP_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_TEMP_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("items", ctx.lookup.TEMPLATE_ESPECIE);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.titulo);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("rows", ctx.rowsLimit);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngClass", ctx.listagem ? "d-none" : "col-8");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.selected)("ngIfElse", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.selectable);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_10__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_11__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_13__.BadgeComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_14__.InputEditorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 33937:
/*!********************************************************************!*\
  !*** ./src/app/modules/uteis/templates/template-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateRoutingModule: () => (/* binding */ TemplateRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _template_list_template_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-list/template-list.component */ 72867);
/* harmony import */ var _template_form_template_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-form/template-form.component */ 83251);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







const routes = [{
  path: '',
  component: _template_list_template_list_component__WEBPACK_IMPORTED_MODULE_2__.TemplateListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Template"
  }
}, {
  path: 'new',
  component: _template_form_template_form_component__WEBPACK_IMPORTED_MODULE_3__.TemplateFormComponent,
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
  component: _template_form_template_form_component__WEBPACK_IMPORTED_MODULE_3__.TemplateFormComponent,
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
  component: _template_form_template_form_component__WEBPACK_IMPORTED_MODULE_3__.TemplateFormComponent,
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
class TemplateRoutingModule {}
_class = TemplateRoutingModule;
_class.ɵfac = function TemplateRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TemplateRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 89202:
/*!************************************************************!*\
  !*** ./src/app/modules/uteis/templates/template.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateModule: () => (/* binding */ TemplateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _template_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-routing.module */ 33937);
/* harmony import */ var _template_form_template_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-form/template-form.component */ 83251);
/* harmony import */ var _template_list_template_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-list/template-list.component */ 72867);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







//import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
class TemplateModule {}
_class = TemplateModule;
_class.ɵfac = function TemplateModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _template_routing_module__WEBPACK_IMPORTED_MODULE_0__.TemplateRoutingModule
  //CKEditorModule
  ]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TemplateModule, {
    declarations: [_template_form_template_form_component__WEBPACK_IMPORTED_MODULE_1__.TemplateFormComponent, _template_list_template_list_component__WEBPACK_IMPORTED_MODULE_2__.TemplateListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _template_routing_module__WEBPACK_IMPORTED_MODULE_0__.TemplateRoutingModule
    //CKEditorModule
    ]
  });
})();

/***/ })

}]);
//# sourceMappingURL=202.js.map