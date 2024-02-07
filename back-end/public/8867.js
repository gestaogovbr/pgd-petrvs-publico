"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8867],{

/***/ 81753:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/gestao/ocorrencia/ocorrencia-form/ocorrencia-form.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OcorrenciaFormComponent: () => (/* binding */ OcorrenciaFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/ocorrencia-dao.service */ 25034);
/* harmony import */ var src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/ocorrencia.model */ 34325);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);














const _c0 = ["plano"];
const _c1 = ["usuario"];
function OcorrenciaFormComponent_top_alert_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "top-alert", 10);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("message", ctx_r0.warning);
  }
}
class OcorrenciaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_3__.Ocorrencia, src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_2__.OcorrenciaDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      /* RI_OCOR_1 */
      if (controlName == 'plano_trabalho_id' && !!control.value?.length && this.plano?.selectedEntity?.usuario_id != this.form?.controls.usuario_id.value) {
        result = "Obrigatório ser o mesmo " + this.lex.translate("usuário") + " do " + this.lex.translate("plano de trabalho");
      } else if (['data_inicio', 'data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      } else if (controlName == "data_fim" && this.util.asTimestamp(this.form?.controls.data_inicio.value) > this.util.asTimestamp(control.value)) {
        result = "Menor que início";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("ocorrência") + ': ' + (entity?.usuario?.nome || "");
    };
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__.UsuarioDaoService);
    this.modalWidth = 500;
    this.form = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      usuario_id: {
        default: ""
      },
      plano_trabalho_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.join = ["usuario", "plano_trabalho.usuario:id,nome,apelido"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      /* Caso venha pela chamada da consolidação do plano de trabalho */
      if (_this.metadata?.consolidacao) {
        _this.consolidacao = _this.metadata?.consolidacao;
        _this.planoTrabalho = _this.metadata?.plano_trabalho || _this.consolidacao.plano_trabalho;
        entity.usuario_id = _this.planoTrabalho.usuario_id;
        entity.usuario = _this.planoTrabalho.usuario;
        entity.plano_trabalho_id = _this.consolidacao.plano_trabalho_id;
        entity.plano_trabalho = _this.planoTrabalho;
      }
      yield Promise.all([_this.usuario.loadSearch(entity.usuario || entity.usuario_id), _this.plano.loadSearch(entity.plano_trabalho || entity.plano_trabalho_id)]);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_3__.Ocorrencia();
    this.entity.usuario_id = this.auth.usuario.id;
    this.loadData(this.entity, form);
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let ocorrencia = this.util.fill(new src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_3__.Ocorrencia(), this.entity);
      ocorrencia = this.util.fillForm(ocorrencia, this.form.value);
      resolve(ocorrencia);
    });
  }
  get warning() {
    let result = undefined;
    let inicio = this.util.asDate(this.form.controls.data_inicio.value);
    let fim = this.util.asDate(this.form.controls.data_fim.value);
    if (this.consolidacao && inicio && fim && (this.util.daystamp(inicio) < this.util.daystamp(this.consolidacao.data_inicio) || this.util.daystamp(fim) > this.util.daystamp(this.consolidacao.data_fim))) {
      result = "Atenção: Data da consolidação do plano é de " + this.util.getDateFormatted(this.consolidacao.data_inicio) + " a " + this.util.getDateFormatted(this.consolidacao.data_fim);
    }
    return result;
  }
  static #_ = this.ɵfac = function OcorrenciaFormComponent_Factory(t) {
    return new (t || OcorrenciaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: OcorrenciaFormComponent,
    selectors: [["app-ocorrencia-form"]],
    viewQuery: function OcorrenciaFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.plano = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 13,
    vars: 13,
    consts: [["type", "warning", 3, "message", 4, "ngIf"], ["initialFocus", "usuario_id", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["controlName", "usuario_id", "required", "", 3, "size", "disabled", "dao"], ["usuario", ""], ["controlName", "plano_trabalho_id", 3, "size", "dao"], ["plano", ""], ["label", "In\u00EDcio", "controlName", "data_inicio", "required", "", 3, "size"], ["label", "Fim", "controlName", "data_fim", "required", "", 3, "size"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size", "rows"], ["type", "warning", 3, "message"]],
    template: function OcorrenciaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, OcorrenciaFormComponent_top_alert_0_Template, 1, 1, "top-alert", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "editable-form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function OcorrenciaFormComponent_Template_editable_form_submit_1_listener() {
          return ctx.onSaveData();
        })("cancel", function OcorrenciaFormComponent_Template_editable_form_cancel_1_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "input-search", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "input-search", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "input-datetime", 7)(10, "input-datetime", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "input-textarea", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.warning == null ? null : ctx.warning.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("disabled", ctx.consolidacao || ctx.action != "new" ? "true" : undefined)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("dao", ctx.planoTrabalhoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("rows", 3);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__.InputDatetimeComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_10__.TopAlertComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 49439:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/gestao/ocorrencia/ocorrencia-list/ocorrencia-list.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OcorrenciaListComponent: () => (/* binding */ OcorrenciaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/ocorrencia-dao.service */ 25034);
/* harmony import */ var src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/ocorrencia.model */ 34325);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);



















function OcorrenciaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "toolbar");
  }
}
function OcorrenciaListComponent_ng_template_14_badge_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "badge", 25);
  }
  if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]().row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("maxWidth", 300)("icon", ctx_r10.entityService.getIcon("PlanoTrabalho"))("label", row_r9.plano_trabalho.unidade.sigla + " - #" + row_r9.plano_trabalho.numero)("textValue", ctx_r10.util.getDateFormatted(row_r9.plano_trabalho.data_inicio) + " \u00E0 " + ctx_r10.util.getDateFormatted(row_r9.plano_trabalho.data_fim))("hint", ctx_r10.lex.translate("Plano de trabalho"));
  }
}
function OcorrenciaListComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 20)(1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "profile-picture", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "div", 23)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](7, OcorrenciaListComponent_ng_template_14_badge_7_Template, 1, 5, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("url", row_r9.usuario.url_foto)("size", 40)("hint", row_r9.usuario.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](row_r9.usuario.nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", row_r9.plano_trabalho);
  }
}
function OcorrenciaListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", ctx_r6.dao.getDateFormatted(row_r12.data_inicio), "");
  }
}
function OcorrenciaListComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", ctx_r8.dao.getDateFormatted(row_r13.data_fim), "");
  }
}
class OcorrenciaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_ocorrencia_model__WEBPACK_IMPORTED_MODULE_2__.Ocorrencia, src_app_dao_ocorrencia_dao_service__WEBPACK_IMPORTED_MODULE_1__.OcorrenciaDaoService);
    this.injector = injector;
    this.listagemInicial = true;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.plano_trabalho_id?.length) {
        result.push(["plano_trabalho_id", "==", form.plano_trabalho_id]);
      } else if (form.usuario_id?.length) {
        result.push(["usuario_id", "==", form.usuario_id]);
      } else if (form.descricao?.length) {
        result.push(["descricao", "like", "%" + form.descricao.replace(" ", "%") + "%"]);
      } else if (this.dao?.validDateTime(form.data_inicio)) {
        result.push(["data_fim", ">=", form.data_inicio]);
      } else if (this.dao?.validDateTime(form.data_fim)) {
        result.push(["data_inicio", "<=", form.data_fim]);
      }
      return result;
    };
    /* Inicializações */
    this.join = ["plano_trabalho:id,numero,data_inicio,data_fim", "plano_trabalho.unidade:id,nome,sigla", "usuario:id,nome,url_foto"];
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_5__.PlanoTrabalhoDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__.UsuarioDaoService);
    this.title = this.lex.translate("Ocorrências");
    this.code = "MOD_OCOR";
    this.filter = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      data_inicio: {
        default: undefined
      },
      data_fim: {
        default: undefined
      },
      usuario_id: {
        default: ""
      },
      plano_trabalho_id: {
        default: ""
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_OCOR_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }
  filtro() {
    this.listagemInicial = false;
  }
  static #_ = this.ɵfac = function OcorrenciaListComponent_Factory(t) {
    return new (t || OcorrenciaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
    type: OcorrenciaListComponent,
    selectors: [["app-ocorrencia-list"]],
    viewQuery: function OcorrenciaListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵInheritDefinitionFeature"]],
    decls: 25,
    vars: 34,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], [4, "ngIf"], [3, "form", "where", "submit", "collapseChange", "collapsed", "deleted"], [1, "row"], ["controlName", "usuario_id", 3, "size", "control", "dao"], ["usuario", ""], ["controlName", "plano_trabalho_id", 3, "size", "control", "dao"], ["planoTrabalho", ""], ["label", "Cont\u00E9m a descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "control"], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", 3, "size", "control", "click"], ["date", "", "label", "Fim", "controlName", "data_fim", 3, "size", "control", "click"], [3, "title", "template"], ["columnUsuario", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["title", "Descri\u00E7\u00E3o", "field", "descricao"], ["type", "options", 3, "onEdit", "options"], [3, "rows"], [1, "d-flex"], [1, "ms-3"], [3, "url", "size", "hint"], [1, "flex-fill", "ms-3"], ["color", "light", 3, "maxWidth", "icon", "label", "textValue", "hint", 4, "ngIf"], ["color", "light", 3, "maxWidth", "icon", "label", "textValue", "hint"]],
    template: function OcorrenciaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, OcorrenciaListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](4, "input-search", 4, 5)(6, "input-search", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](9, "input-text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](10, "input-datetime", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function OcorrenciaListComponent_Template_input_datetime_click_10_listener() {
          return ctx.filtro();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](11, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function OcorrenciaListComponent_Template_input_datetime_click_11_listener() {
          return ctx.filtro();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](12, "columns")(13, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](14, OcorrenciaListComponent_ng_template_14_Template, 8, 5, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](16, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](17, OcorrenciaListComponent_ng_template_17_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](19, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](20, OcorrenciaListComponent_ng_template_20_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](22, "column", 17)(23, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](24, "pagination", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](15);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](18);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", ctx.auth.hasPermissionTo("MOD_OCOR_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_OCOR_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed)("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.usuario_id)("dao", ctx.usuarioDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.plano_trabalho_id)("dao", ctx.planoTrabalhoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.descricao);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.data_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("title", ctx.lex.translate("Usu\u00E1rio"))("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__.InputDatetimeComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__.ProfilePictureComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 72491:
/*!************************************************************************!*\
  !*** ./src/app/modules/gestao/ocorrencia/ocorrencia-routing.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OcorrenciaRoutingModule: () => (/* binding */ OcorrenciaRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ocorrencia-form/ocorrencia-form.component */ 81753);
/* harmony import */ var _ocorrencia_list_ocorrencia_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ocorrencia-list/ocorrencia-list.component */ 49439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







const routes = [{
  path: '',
  component: _ocorrencia_list_ocorrencia_list_component__WEBPACK_IMPORTED_MODULE_3__.OcorrenciaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Ocorrências"
  }
}, {
  path: 'new',
  component: _ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_2__.OcorrenciaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Ocorrência",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_2__.OcorrenciaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Ocorrência",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_2__.OcorrenciaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Ocorrência",
    modal: true
  }
}];
class OcorrenciaRoutingModule {
  static #_ = this.ɵfac = function OcorrenciaRoutingModule_Factory(t) {
    return new (t || OcorrenciaRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: OcorrenciaRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](OcorrenciaRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 18867:
/*!****************************************************************!*\
  !*** ./src/app/modules/gestao/ocorrencia/ocorrencia.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OcorrenciaModule: () => (/* binding */ OcorrenciaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _ocorrencia_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ocorrencia-routing.module */ 72491);
/* harmony import */ var _ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ocorrencia-form/ocorrencia-form.component */ 81753);
/* harmony import */ var _ocorrencia_list_ocorrencia_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ocorrencia-list/ocorrencia-list.component */ 49439);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);







class OcorrenciaModule {
  static #_ = this.ɵfac = function OcorrenciaModule_Factory(t) {
    return new (t || OcorrenciaModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: OcorrenciaModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _ocorrencia_routing_module__WEBPACK_IMPORTED_MODULE_0__.OcorrenciaRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](OcorrenciaModule, {
    declarations: [_ocorrencia_form_ocorrencia_form_component__WEBPACK_IMPORTED_MODULE_1__.OcorrenciaFormComponent, _ocorrencia_list_ocorrencia_list_component__WEBPACK_IMPORTED_MODULE_2__.OcorrenciaListComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _ocorrencia_routing_module__WEBPACK_IMPORTED_MODULE_0__.OcorrenciaRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=8867.js.map