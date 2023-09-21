"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[685],{

/***/ 37511:
/*!*******************************************************!*\
  !*** ./src/app/models/planejamento-objetivo.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoObjetivo: () => (/* binding */ PlanejamentoObjetivo)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class PlanejamentoObjetivo extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Nome do objetivo */
    this.fundamentacao = ""; /* Fundamentação para a definição do objetivo */
    this.sequencia = 0;
    this.path = null;
    this.planejamento_id = null;
    this.eixo_tematico_id = null;
    this.objetivo_pai_id = null;
    this.objetivo_superior_id = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 91193:
/*!**********************************************!*\
  !*** ./src/app/models/planejamento.model.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Planejamento: () => (/* binding */ Planejamento)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Planejamento extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.data_arquivamento = null; /* Data de arquivamento */
    this.data_inicio = new Date(); /* Data de início do planejamento */
    this.data_fim = null; /* Data final do planejamento */
    this.nome = ""; /* Nome do planejamento institucional */
    this.missao = ""; /* Missão da Instituição/Unidade */
    this.visao = ""; /* Visão da Instituição/Unidade */
    this.valores = []; /* Valores da Instituição/Unidade */
    this.unidade_id = null; /* Unidade à qual está vinculado o planejamento institucional */
    this.entidade_id = null; /* Entidade à qual está vinculado o planejamento institucional */
    this.planejamento_superior_id = null; /* Planejamento hierarquicamente superior ao qual o atual planejamento está vinculado */
    this.initialization(data);
  }
}

/***/ }),

/***/ 74768:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-form-objetivo/planejamento-form-objetivo.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoFormObjetivoComponent: () => (/* binding */ PlanejamentoFormObjetivoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ 1240);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ 37511);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);

var _class;














const _c0 = ["planejamentoSuperiorNome"];
const _c1 = ["eixoTematico"];
function PlanejamentoFormObjetivoComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input-text", 9, 10)(3, "input-select", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("icon", ctx_r2.entityService.getIcon("Planejamento"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx_r2.objetivos_superiores)("size", 12)("control", ctx_r2.form.controls.objetivo_superior_id);
  }
}
class PlanejamentoFormObjetivoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_5__.PlanejamentoObjetivo, src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoObjetivoDaoService);
    this.injector = injector;
    this.objetivos = [];
    this.objetivos_superiores = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'fundamentacao', 'eixo_tematico_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      let result = null;
      /*  Regra está sendo discutida
          (RN_PLAN_INST_OBJ_A)
          Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior
      */
      /*     if(this.isPlanejamentoUNEX() && !this.form?.controls.objetivo_superior_id.value){
            result = "Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!";
          } */
      return result;
    };
    this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    this.eixoTematicoDao = injector.get(src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_2__.EixoTematicoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      fundamentacao: {
        default: ""
      },
      planejamento_id: {
        default: null
      },
      planejamento_superior_nome: {
        default: ""
      },
      eixo_tematico_id: {
        default: null
      },
      objetivo_superior_id: {
        default: null
      },
      objetivo_pai_id: {
        default: null
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
      yield _this.eixoTematico?.loadSearch(entity.eixo_tematico || entity.eixo_tematico_id);
      _this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
      _this.planejamento = _this.metadata?.planejamento;
      if (_this.planejamento) _this.planejamento.planejamento_superior = _this.metadata.planejamento_superior || null;
      if (_this.planejamento.planejamento_superior) _this.planejamento.planejamento_superior.objetivos = _this.metadata?.objetivos_superiores || null;
      _this.form?.controls.planejamento_superior_nome.setValue(_this.planejamento?.planejamento_superior?.nome || '');
      _this.objetivos_superiores = _this.planejamento?.planejamento_superior?.objetivos?.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome,
        data: x
      })) || [];
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = _this2.metadata?.objetivo;
      _this2.objetivos = (_this2.metadata?.objetivos).map(x => Object.assign({}, {
        key: x.id,
        value: x.nome,
        data: x
      }));
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    var _this3 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        const objetivo = Object.assign({}, _this3.entity);
        resolve(new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_7__.NavigateResult(_this3.util.fillForm(objetivo, _this3.form.value)));
      });
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  isPlanejamentoUNEX() {
    return this.planejamento?.unidade_id != null;
  }
}
_class = PlanejamentoFormObjetivoComponent;
_class.ɵfac = function PlanejamentoFormObjetivoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-planejamento-form-objetivo"]],
  viewQuery: function PlanejamentoFormObjetivoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.planejamentoSuperiorNome = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.eixoTematico = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 12,
  vars: 15,
  consts: [["initialFocus", "eixo_tematico_id", 3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["controlName", "eixo_tematico_id", "required", "", 3, "size", "disabled", "dao"], ["eixoTematico", ""], ["label", "Objetivo Pai", "icon", "fab fa-unity", "controlName", "objetivo_pai_id", 3, "size", "items"], ["objetivoPai", ""], ["class", "row", 4, "ngIf"], ["icon", "bi bi-textarea-t", "label", "Nome", "controlName", "nome", "required", "", 3, "size", "control"], ["icon", "bi bi-textarea-t", "label", "Fundamenta\u00E7\u00E3o", "controlName", "fundamentacao", "required", "", 3, "size", "rows", "control"], ["disabled", "true", "label", "Planejamento Superior vinculado", "controlName", "planejamento_superior_nome", 1, "disabled", 3, "size", "icon"], ["planejamento_superior_nome", ""], ["label", "Objetivo de Planejamento Superior (Vinculado)", "icon", "fab fa-unity", "controlName", "objetivo_superior_id", 3, "items", "size", "control"]],
  template: function PlanejamentoFormObjetivoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("submit", function PlanejamentoFormObjetivoComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanejamentoFormObjetivoComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 1)(2, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "input-search", 2, 3)(5, "input-select", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, PlanejamentoFormObjetivoComponent_div_7_Template, 4, 6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](9, "input-text", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](11, "input-textarea", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("disabled", (ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.objetivo_pai_id == null ? null : ctx.form.controls.objetivo_pai_id.value) ? "true" : undefined)("dao", ctx.eixoTematicoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("items", ctx.objetivos);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.planejamento == null ? null : ctx.planejamento.planejamento_superior_id);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("rows", 4)("control", ctx.form.controls.fundamentacao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 72350:
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-form/planejamento-form.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoFormComponent: () => (/* binding */ PlanejamentoFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento.model */ 91193);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../planejamento-list-objetivo/planejamento-list-objetivo.component */ 17726);

var _class;

















const _c0 = ["planejamentoSuperior"];
const _c1 = ["objetivos"];
class PlanejamentoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__.PageFormBase {
  constructor(injector) {
    var _this;
    super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__.Planejamento, src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    _this = this;
    this.injector = injector;
    this.planejamentosSuperiores = [];
    this.hasPermissionToUNEX = false;
    this.validate = (control, controlName) => {
      let result = null;
      /*  (RN_PLAN_INST_A)
          Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais.
      */
      if (['nome', 'unidade_id', 'missao', 'visao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['missao', 'visao'].indexOf(controlName) >= 0 && control.value?.length > this.MAX_LENGTH_TEXT) {
        result = "Conteúdo (" + control.value?.length + " caracteres) excede o comprimento máximo: " + this.MAX_LENGTH_TEXT + ".";
      }
      if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      return result;
    };
    this.formValidation = /*#__PURE__*/function () {
      var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (form) {
        /*  (RN_PLAN_INST_A)
            Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais.
        */
        let result = undefined;
        if (_this.form.controls.data_fim.value && _this.form.controls.data_inicio.value > _this.form.controls.data_fim.value) return "A data do início não pode ser maior que a data do fim!";
        if (_this.form.controls.valores.value.length == 0) return "É obrigatória a inclusão de ao menos um valor institucional!";
        /*  (RN_PLAN_INST_B) Não pode existir mais de um planejamento institucional para uma mesma unidade em um mesmo período de tempo;
            GitLab #651: aguardando definição do assunto
        if(!form!.controls.unidade_id.value.length) {
          this.dao?.query({where: [['unidade_id', "==", null],["data_inicio", "<=", form!.controls.data_inicio.value]]})
        } else {
          this.dao?.query({where: [["unidade_id", "==", form!.controls.unidade_id.value]]})
        }
        */
        yield _this.dao?.query({
          where: [['unidade_id', '==', _this.form.controls.unidade_id.value]]
        }).getAll().then(unidade => {
          console.log("unidade", unidade);
          result = unidade.length > 0 ? "Unidade já possui planejamento para as datas selecionadas" : undefined;
        });
        return result;
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Planejamento Institucional") + ': ' + (entity?.nome || "");
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.UnidadeDaoService);
    this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
    this.join = ['objetivos', 'objetivos.objetivo_pai:id,nome', 'objetivos.objetivo_superior:id,planejamento_id', 'objetivos.eixo_tematico:id,nome', 'planejamento_superior:id,nome', 'planejamento_superior.objetivos'];
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      unidade_id: {
        default: null
      },
      entidade_id: {
        default: null
      },
      planejamento_superior_id: {
        default: null
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: null
      },
      missao: {
        default: ""
      },
      visao: {
        default: ""
      },
      valores: {
        default: []
      },
      valor_texto: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.carregaPlanejamentosSuperiores();
    this.form.controls.planejamento_superior_id.setValue(entity.planejamento_superior_id);
  }
  initializeData(form) {
    this.entity = new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__.Planejamento();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        _this2.objetivos.grid.confirm();
        let planejamento = _this2.util.fill(new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__.Planejamento(), _this2.entity);
        planejamento = _this2.util.fillForm(planejamento, _this2.form.value);
        planejamento.objetivos = _this2.objetivos.items;
        resolve(planejamento);
      });
    })();
  }
  addValorHandle() {
    let result = undefined;
    const value = this.form.controls.valor_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
      result = {
        key: key,
        value: this.form.controls.valor_texto.value
      };
      this.form.controls.valor_texto.setValue("");
    }
    return result;
  }
  onUnidadeChange(event) {
    if (this.entity.unidade_id != this.form.controls.unidade_id.value) this.carregaPlanejamentosSuperiores();
  }
  carregaPlanejamentosSuperiores() {
    this.dao?.query({
      where: [['unidade_executora_id', '==', this.form.controls.unidade_id.value], ['manut_planej_unidades_executoras', '==', true]]
    }).getAll().then(pls => {
      this.planejamentosSuperiores = pls.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome
      }));
      this.planejamentosSuperiores.unshift({
        key: null,
        value: 'Escolha um Planejamento superior...'
      });
      this.objetivos.loadData(this.entity, this.form);
      this.cdRef.detectChanges();
    });
  }
  /**
   * @param event
   * Se o planejamento superior for alterado, e já houver objetivos na lista vinculados a objetivos dele, avisar que eles perderão esses vínculos.
   */
  onPlanejamentoChange(event) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.form.controls.planejamento_superior_id.value != _this3.entity?.planejamento_superior_id && _this3.entity?.objetivos?.length && _this3.entity?.objetivos.filter(x => x.objetivo_superior && x.objetivo_superior.planejamento_id == _this3.entity?.planejamento_superior_id).length) {
        let confirm = yield _this3.dialog.confirm("Alteração de Planejamento Superior", "Como já existe(m) objetivo(s) neste Planejamento, vinculado(s) a objetivo(s) do Planejamento Superior anterior, seus vínculos serão perdidos! Deseja continuar?");
        if (confirm) {
          _this3.entity?.objetivos?.forEach(obj => obj.objetivo_superior_id = null);
          //atualizar a lista de objetivos superiores
        } else {
          _this3.form.controls.planejamento_superior_id.setValue(_this3.entity?.planejamento_superior_id);
        }
        ;
      }
      ;
      _this3.objetivos.planejamento_superior_id = _this3.form.controls.planejamento_superior_id.value;
      _this3.objetivos?.grid?.loadColumns();
      _this3.cdRef.detectChanges();
    })();
  }
  /**
   *
   * @returns boolean Informa se o planejamento é da Unidade Instituidora ou não.
   */
  isPlanejamentoUNINST() {
    return !this.form.controls.unidade_id.value?.length;
  }
  /**
   *
   * @returns boolean Informa se o planejamento é da Unidade Executora ou não.
   */
  isPlanejamentoUNEXEC() {
    return !this.isPlanejamentoUNINST();
  }
}
_class = PlanejamentoFormComponent;
_class.ɵfac = function PlanejamentoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-planejamento-form"]],
  viewQuery: function PlanejamentoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.planejamentoSuperior = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.objetivos = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵInheritDefinitionFeature"]],
  decls: 24,
  vars: 30,
  consts: [["initialFocus", "nome", 3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "DADOS", "label", "Dados"], [1, "row"], ["label", "Nome do Planejamento Institucional", "controlName", "nome", "required", "", 3, "size", "icon", "control"], ["controlName", "unidade_id", "labelInfo", "Unidade \u00E0 qual se refere o planejamento", "required", "", 3, "size", "control", "dao", "change"], ["date", "", "label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "In\u00EDcio do Planejamento Institucional", "required", "", 3, "size", "control"], ["date", "", "label", "Fim", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "Fim do Planejamento Institucional", "required", "", 3, "size", "control"], ["label", "Planejamento Institucional Superior", "controlName", "planejamento_superior_id", 3, "items", "control", "icon", "change"], ["planejamentoSuperior", ""], [1, "col-md-6"], ["label", "Miss\u00E3o", "controlName", "missao", "required", "", 3, "size", "rows", "control"], ["label", "Vis\u00E3o", "controlName", "visao", "required", "", 3, "size", "rows", "control"], ["label", "Valores", "controlName", "valores", 3, "size", "addItemHandle"], ["label", "Valor Institucional", "icon", "far fa-edit", "controlName", "valor_texto", 3, "control"], ["key", "OBJETIVOS", "label", "Objetivos"], ["noPersist", "", 3, "entity", "disabled", "planejamento_superior_id"], ["objetivos", ""]],
  template: function PlanejamentoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("submit", function PlanejamentoFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PlanejamentoFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](5, "input-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 3)(7, "input-search", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function PlanejamentoFormComponent_Template_input_search_change_7_listener($event) {
        return ctx.onUnidadeChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](8, "input-datetime", 6)(9, "input-datetime", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](10, "div", 3)(11, "input-select", 8, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function PlanejamentoFormComponent_Template_input_select_change_11_listener($event) {
        return ctx.onPlanejamentoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 3)(14, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](15, "input-textarea", 11)(16, "input-textarea", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "div", 10)(18, "div", 3)(19, "input-multiselect", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](20, "input-text", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](21, "tab", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](22, "planejamento-list-objetivo", 16, 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("icon", ctx.entityService.getIcon("Planejamento"))("control", ctx.form.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.unidade_id)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("items", ctx.planejamentosSuperiores)("control", ctx.form.controls.planejamento_superior_id)("icon", ctx.entityService.getIcon("Planejamento"));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx.form.controls.missao);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("rows", 3)("control", ctx.form.controls.visao);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("addItemHandle", ctx.addValorHandle.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("control", ctx.form.controls.valor_texto);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("entity", ctx.entity)("disabled", ctx.action == "consult")("planejamento_superior_id", ctx.form.controls.planejamento_superior_id.value);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_9__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_13__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_14__.TabComponent, _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_15__.PlanejamentoListObjetivoComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 17726:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list-objetivo/planejamento-list-objetivo.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoListObjetivoComponent: () => (/* binding */ PlanejamentoListObjetivoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ 37511);
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/planejamento.model */ 91193);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/eixo-tematico-dao.service */ 1240);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;














function PlanejamentoListObjetivoComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "badge", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const separator_r10 = ctx.separator;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("icon", ((tmp_0_0 = ctx_r2.getEixo(separator_r10 == null ? null : separator_r10.text)) == null ? null : tmp_0_0.icone) || "bi bi-gear")("color", ((tmp_1_0 = ctx_r2.getEixo(separator_r10 == null ? null : separator_r10.text)) == null ? null : tmp_1_0.cor) || "primary")("label", ((tmp_2_0 = ctx_r2.getEixo(separator_r10 == null ? null : separator_r10.text)) == null ? null : tmp_2_0.nome) || "Desconhecido");
  }
}
function PlanejamentoListObjetivoComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("margin-left", ((row_r11._metadata == null ? null : row_r11._metadata.level) || 0) * 20, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r4.marcador(row_r11) + row_r11.nome);
  }
}
function PlanejamentoListObjetivoComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r12.eixo_tematico == null ? null : row_r12.eixo_tematico.nome);
  }
}
function PlanejamentoListObjetivoComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r13.fundamentacao);
  }
}
function PlanejamentoListObjetivoComponent_column_14_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((row_r16.objetivo_superior == null ? null : row_r16.objetivo_superior.nome) || "");
  }
}
function PlanejamentoListObjetivoComponent_column_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "column", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, PlanejamentoListObjetivoComponent_column_14_ng_template_1_Template, 2, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r14);
  }
}
class PlanejamentoListObjetivoComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_6__.PageFrameBase {
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
  set disabled(value) {
    if (this._disabled != value) this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }
  set noPersist(value) {
    super.noPersist = value;
  }
  get noPersist() {
    return super.noPersist;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_5__.Planejamento());
    if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
    return this.gridControl.value.objetivos;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.minHeight = 350;
    this.options = [];
    this._disabled = false;
    this.eixos = [];
    this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoDaoService);
    this.objetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_7__.PlanejamentoObjetivoDaoService);
    this.eixoDao = injector.get(src_app_dao_eixo_tematico_dao_service__WEBPACK_IMPORTED_MODULE_8__.EixoTematicoDaoService);
    this.groupBy = [{
      field: "eixo_tematico_id",
      label: "Eixo Temático"
    }];
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      fundamentacao: {
        default: ""
      },
      planejamento_id: {
        default: null
      },
      eixo_tematico_id: {
        default: null
      },
      objetivo_superior_id: {
        default: null
      }
    }, this.cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.carregaEixos();
    this.sortObjetivos();
  }
  dynamicButtons(row) {
    let result = [];
    let objetivo = row;
    if (this.auth.hasPermissionTo('MOD_PLAN_INST_EDT') && !this.disabled) {
      result.push({
        hint: "Alterar",
        icon: "bi bi-pencil-square",
        color: "btn-outline-info",
        onClick: objetivo => {
          this.editObjetivo(objetivo);
        }
      });
    }
    return result;
  }
  dynamicOptions(row) {
    let result = [];
    let objetivo = row;
    result.push({
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: objetivo => this.go.navigate({
        route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult']
      }, {
        modal: true
      })
    });
    if (this.auth.hasPermissionTo('MOD_PLAN_INST_EXCL') && !this.disabled) {
      result.push({
        label: "Excluir",
        icon: "bi bi-trash",
        color: "btn-outline-danger",
        onClick: objetivo => {
          this.removeObjetivo(objetivo);
        }
      });
    }
    return result;
  }
  marcador(row) {
    let level = row._metadata?.level || 0;
    return level < 1 ? "" : level < 2 ? "• " : level < 3 ? "- " : "+ ";
  }
  addObjetivo() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // ************ 
      // se for adicionar um objetivo num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois se
      // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
      let objetivo = new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoObjetivo({
        _status: "ADD",
        id: _this.dao.generateUuid(),
        planejamento_id: _this.entity?.id
      });
      _this.go.navigate({
        route: ['gestao', 'planejamento', 'objetivo']
      }, {
        metadata: {
          planejamento: _this.entity,
          objetivo: objetivo,
          objetivos: _this.objetivosPai(objetivo.id)
        },
        modalClose: function () {
          var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
            if (modalResult) {
              try {
                _this.carregaEixos();
                _this.isNoPersist ? _this.items.push(modalResult) : _this.items.push(yield _this.objetivoDao.save(modalResult));
                _this.sortObjetivos();
              } catch (error) {
                _this.error(error?.error || error?.message || error);
              }
            }
            ;
          });
          return function modalClose(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    })();
  }
  objetivosPai(filhoId) {
    let items = [];
    let addItens = list => {
      for (let item of list) {
        if (item.id != filhoId) {
          items.push(item);
          addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia));
        }
      }
    };
    addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia));
    return items;
  }
  sortObjetivos() {
    let items = [];
    let addItens = (list, level) => {
      for (let item of list) {
        item._metadata = Object.assign(item._metadata || {}, {
          level
        });
        items.push(item);
        if (item._status != "DELETE") addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia), level + 1);
      }
    };
    addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia), 0);
    this.items.length = 0;
    this.items.push(...items);
    this.cdRef.detectChanges();
  }
  editObjetivo(objetivo) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
      let index = _this2.items.indexOf(objetivo);
      _this2.go.navigate({
        route: ['gestao', 'planejamento', 'objetivo']
      }, {
        metadata: {
          planejamento: _this2.entity,
          objetivo: objetivo,
          objetivos: _this2.objetivosPai(objetivo.id)
        },
        modalClose: function () {
          var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
            if (modalResult) {
              if (!_this2.isNoPersist) yield _this2.objetivoDao?.save(modalResult);
              _this2.items[index] = modalResult;
              _this2.carregaEixos();
              _this2.sortObjetivos();
            }
            ;
          });
          return function modalClose(_x2) {
            return _ref2.apply(this, arguments);
          };
        }()
      });
    })();
  }
  removeObjetivo(objetivo) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this3.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) {
        let index = _this3.items.indexOf(objetivo);
        if (_this3.isNoPersist) {
          objetivo._status = "DELETE";
        } else {
          yield _this3.objetivoDao.delete(objetivo);
          _this3.grid?.items.splice(index, 1);
        }
        ;
        _this3.sortObjetivos();
        return true;
      } else {
        return false;
      }
    })();
  }
  getEixo(id) {
    return this.eixos?.find(x => x.id == id);
  }
  carregaEixos() {
    this.eixoDao?.query().getAll().then(eixos => {
      this.eixos = eixos;
    });
  }
}
_class = PlanejamentoListObjetivoComponent;
_class.ɵfac = function PlanejamentoListObjetivoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["planejamento-list-objetivo"]],
  viewQuery: function PlanejamentoListObjetivoComponent_Query(rf, ctx) {
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
    planejamento_superior_id: "planejamento_superior_id",
    control: "control",
    entity: "entity",
    disabled: "disabled",
    noPersist: "noPersist"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 16,
  vars: 18,
  consts: [["editable", "", 3, "items", "form", "selectable", "minHeight", "add", "remove", "hasDelete", "hasEdit", "hasAdd", "join", "groupBy", "groupTemplate"], ["gridObjetivos", ""], ["groupEixoTematico", ""], ["title", "Nome", 3, "template"], ["columnNome", ""], ["title", "Eixo Tem\u00E1tico", 3, "template"], ["columnEixoTematico", ""], ["title", "Fundamenta\u00E7\u00E3o", 3, "template"], ["columnFundamentacao", ""], ["title", "Objetivo Superior", 3, "template", 4, "ngIf"], ["type", "options", 3, "dynamicButtons", "dynamicOptions"], [1, "text-wrap"], [3, "icon", "color", "label"], [1, "text-break", "w-100"], ["title", "Objetivo Superior", 3, "template"], ["columnObjetivoSuperior", ""]],
  template: function PlanejamentoListObjetivoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "grid", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, PlanejamentoListObjetivoComponent_ng_template_2_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "columns")(5, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, PlanejamentoListObjetivoComponent_ng_template_6_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, PlanejamentoListObjetivoComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, PlanejamentoListObjetivoComponent_ng_template_12_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, PlanejamentoListObjetivoComponent_column_14_Template, 3, 1, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](15, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](3);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](7);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("selectable", false)("minHeight", ctx.minHeight)("add", ctx.addObjetivo.bind(ctx))("remove", ctx.removeObjetivo.bind(ctx))("hasDelete", false)("hasEdit", false)("hasAdd", !ctx.disabled)("join", ctx.join)("groupBy", ctx.groupBy)("groupTemplate", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.planejamento_superior_id == null ? null : ctx.planejamento_superior_id.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx))("dynamicOptions", ctx.dynamicOptions.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 10812:
/*!**************************************************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component.ts ***!
  \**************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoListObjetivosEntregasComponent: () => (/* binding */ PlanejamentoListObjetivosEntregasComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ 37511);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
var _class;














function PlanejamentoListObjetivosEntregasComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function PlanejamentoListObjetivosEntregasComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar", 12);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("buttons", ctx_r1.buttons);
  }
}
function PlanejamentoListObjetivosEntregasComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r4 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r4.nome);
  }
}
class PlanejamentoListObjetivosEntregasComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_4__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoObjetivo, src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoObjetivoDaoService);
    this.injector = injector;
    this.buttons = [];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      if (form.planejamento_id?.length) {
        result.push(["planejamento_id", "==", form.planejamento_id]);
      }
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    this.join = ['objetivos'];
    this.planejamentoDao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_1__.PlanejamentoDaoService);
    this.planejamentoObjetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoObjetivoDaoService);
    this.title = this.lex.translate("Objetivos") + ' ' + this.lex.translate("do Planejamento Institucional");
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      planejamento_id: {
        default: null
      }
    });
  }
  dynamicOptions(row) {
    let result = [];
    result.push({
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: objetivo => this.go.navigate({
        route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult']
      }, {
        modal: true
      })
    });
    return result;
  }
  filterClear(filter) {
    super.filterClear(filter);
    this.filter?.controls.nome.setValue("");
  }
}
_class = PlanejamentoListObjetivosEntregasComponent;
_class.ɵfac = function PlanejamentoListObjetivosEntregasComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["planejamento-list-objetivos-entregas"]],
  viewQuery: function PlanejamentoListObjetivosEntregasComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
  decls: 13,
  vars: 21,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "select"], [3, "buttons", 4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "Fundamenta\u00E7\u00E3o", "field", "fundamentacao"], ["type", "options", 3, "onEdit", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"]],
  template: function PlanejamentoListObjetivosEntregasComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, PlanejamentoListObjetivosEntregasComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function PlanejamentoListObjetivosEntregasComponent_Template_grid_select_1_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, PlanejamentoListObjetivosEntregasComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-text", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "columns")(7, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, PlanejamentoListObjetivosEntregasComponent_ng_template_8_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "column", 8)(11, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "pagination", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__.InputTextComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 68809:
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-list/planejamento-list.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoListComponent: () => (/* binding */ PlanejamentoListComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento.model */ 91193);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../planejamento-list-objetivo/planejamento-list-objetivo.component */ 17726);
/* harmony import */ var _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../planejamento-mapa/planejamento-mapa.component */ 23195);

var _class;






















const _c0 = ["unidade"];
function PlanejamentoListComponent_ng_template_2_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "toolbar");
  }
}
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", row_r19.objetivos == null ? null : row_r19.objetivos.length, "");
  }
}
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_span_0_Template, 3, 1, "span", 29);
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r19.objetivos == null ? null : row_r19.objetivos.length);
  }
}
function PlanejamentoListComponent_ng_template_2_column_12_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "planejamento-list-objetivo", 32);
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", row_r22);
  }
}
function PlanejamentoListComponent_ng_template_2_column_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "column", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanejamentoListComponent_ng_template_2_column_12_ng_template_1_Template, 1, 1, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, PlanejamentoListComponent_ng_template_2_column_12_ng_template_3_Template, 1, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](2);
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](4);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("align", "center")("hint", ctx_r6.lex.translate("Objetivo"))("template", _r15)("expandTemplate", _r17);
  }
}
function PlanejamentoListComponent_ng_template_2_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r23.nome);
  }
}
function PlanejamentoListComponent_ng_template_2_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r24 = ctx.row;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r10.dao.getDateFormatted(row_r24.data_inicio), "");
  }
}
function PlanejamentoListComponent_ng_template_2_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r25 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r12.dao.getDateFormatted(row_r25.data_fim), "");
  }
}
function PlanejamentoListComponent_ng_template_2_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", (row_r26.unidade == null ? null : row_r26.unidade.nome) || "", "");
  }
}
function PlanejamentoListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "grid", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function PlanejamentoListComponent_ng_template_2_Template_grid_select_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r27.onSelect($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, PlanejamentoListComponent_ng_template_2_toolbar_1_Template, 1, 0, "toolbar", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "filter", 7)(3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](4, "input-text", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "div", 8)(6, "input-switch", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function PlanejamentoListComponent_ng_template_2_Template_input_switch_change_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r29.onSoEntidadeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](7, "input-search", 11, 12)(9, "input-datetime", 13)(10, "input-datetime", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](11, "columns");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](12, PlanejamentoListComponent_ng_template_2_column_12_Template, 5, 4, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](13, "column", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, PlanejamentoListComponent_ng_template_2_ng_template_14_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](16, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](17, PlanejamentoListComponent_ng_template_2_ng_template_17_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](19, "column", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](20, PlanejamentoListComponent_ng_template_2_ng_template_20_Template, 2, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](22, "column", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](23, PlanejamentoListComponent_ng_template_2_ng_template_23_Template, 2, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](25, "column", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](26, "pagination", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](15);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](18);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](21);
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](24);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dao", ctx_r1.dao)("add", ctx_r1.add)("orderBy", ctx_r1.orderBy)("join", ctx_r1.join)("init", ctx_r1.initGrid.bind(ctx_r1))("selectable", ctx_r1.selectable)("hasAdd", ctx_r1.auth.hasPermissionTo("MOD_PLAN_INST_INCL"))("hasEdit", ctx_r1.auth.hasPermissionTo("MOD_PLAN_INST_EDT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx_r1.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("form", ctx_r1.filter)("where", ctx_r1.filterWhere)("submit", ctx_r1.filterSubmit.bind(ctx_r1))("clear", ctx_r1.filterClear.bind(ctx_r1))("collapseChange", ctx_r1.filterCollapseChange.bind(ctx_r1))("collapsed", !ctx_r1.selectable && ctx_r1.filterCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("label", ctx_r1.lex.translate("Planejamento Institucional"))("control", ctx_r1.filter.controls.nome)("placeholder", "Nome " + ctx_r1.lex.translate("Planejamento Institucional") + "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 2)("label", "S\u00F3 da " + ctx_r1.lex.translate("Entidade"))("control", ctx_r1.filter.controls.so_entidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("label", ctx_r1.lex.translate("Unidade"))("disabled", ctx_r1.unidade_disabled)("dao", ctx_r1.unidadeDao);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx_r1.filter.controls.data_inicio)("labelInfo", "Data de in\u00EDcio do" + ctx_r1.lex.translate("Planejamento Institucional"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("control", ctx_r1.filter.controls.data_fim)("labelInfo", "Data do fim do " + ctx_r1.lex.translate("Planejamento Institucional"));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx_r1.selectable);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("onEdit", ctx_r1.edit)("options", ctx_r1.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("rows", ctx_r1.rowsLimit);
  }
}
function PlanejamentoListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "planejamento-mapa");
  }
}
class PlanejamentoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_planejamento_model__WEBPACK_IMPORTED_MODULE_4__.Planejamento, src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.so_entidade) {
        filter.controls.unidade_id.setValue(null);
        result.push(["unidade_id", "==", null]);
      } else {
        if (form.unidade_id) result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      if (form.data_inicio) {
        result.push(["data_inicio", ">=", form.data_inicio]);
      }
      if (form.data_fim) {
        result.push(["data_fim", "<=", form.data_fim]);
      }
      return result;
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    /* Inicializações */
    this.code = "MOD_PLAN_INST";
    this.title = this.lex.translate('Planejamentos Institucionais');
    this.filter = this.fh.FormBuilder({
      data_inicio: {
        default: null
      },
      data_fim: {
        default: null
      },
      nome: {
        default: ""
      },
      unidade_id: {
        default: null
      },
      so_entidade: {
        default: false
      },
      agrupar: {
        default: true
      }
    });
    this.join = ['unidade:id,nome,sigla', 'objetivos', 'objetivos.eixo_tematico:id,nome', 'objetivos.objetivo_superior:id,nome', 'planejamento_superior:id,nome', 'planejamento_superior.objetivos'];
    // Testa se o usuário possui permissão para exibir planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }
  /* override */
  onLoad() {}
  initGrid(grid) {
    grid.queryInit();
  }
  onSelectTab(tab) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //if(tab.key == "TABELA") this.onLoad();
      _this.saveUsuarioConfig({
        active_tab: tab
      });
    })();
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    filter.controls.data_inicio.setValue(null);
    filter.controls.data_fim.setValue(null);
    filter.controls.unidade_id.setValue(null);
    filter.controls.so_entidade.setValue(false);
    super.filterClear(filter);
  }
  onSoEntidadeChange(event) {
    if (this.filter.controls.so_entidade.value) {
      this.filter.controls.unidade_id.setValue(null);
      this.unidade_disabled = 'disabled';
    } else {
      this.filter.controls.unidade_id.setValue(undefined);
      this.unidade_disabled = undefined;
    }
  }
}
_class = PlanejamentoListComponent;
_class.ɵfac = function PlanejamentoListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-planejamento-list"]],
  viewQuery: function PlanejamentoListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__.TabsComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 7,
  vars: 4,
  consts: [["right", "", 3, "title", "select"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["lista", ""], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template"], ["mapa", ""], [3, "dao", "add", "orderBy", "join", "init", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", 3, "size", "label", "control", "placeholder"], ["controlName", "so_entidade", 3, "size", "label", "control", "change"], ["controlName", "unidade_id", 3, "size", "label", "disabled", "dao"], ["unidade", ""], ["date", "", "label", "In\u00EDcio", "controlName", "data_inicio", 3, "size", "control", "labelInfo"], ["date", "", "label", "Fim", "controlName", "data_fim", 3, "size", "control", "labelInfo"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "In\u00EDcio", 3, "template"], ["columnInicio", ""], ["title", "Fim", 3, "template"], ["columnFim", ""], ["title", "Unidade", 3, "template"], ["columnUnidade", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["type", "expand", "icon", "bi bi-bullseye", 3, "align", "hint", "template", "expandTemplate"], ["columnObjetivos", ""], ["columnExpandedObjetivos", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-bullseye"], [3, "entity"], [1, "text-break", "w-100"]],
  template: function PlanejamentoListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, PlanejamentoListComponent_ng_template_2_Template, 27, 41, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, PlanejamentoListComponent_ng_template_5_Template, 1, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](3);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r2);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_15__.InputDatetimeComponent, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_6__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__.TabComponent, _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_17__.PlanejamentoListObjetivoComponent, _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_18__.PlanejamentoMapaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 23195:
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-mapa/planejamento-mapa.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoMapaComponent: () => (/* binding */ PlanejamentoMapaComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/planejamento-dao.service */ 5458);
/* harmony import */ var src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/planejamento-objetivo-dao.service */ 91058);
/* harmony import */ var src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/planejamento-objetivo.model */ 37511);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ 28032);
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-drag-drop */ 51474);

var _class;













const _c0 = ["planejamentoInstitucional"];
function PlanejamentoMapaComponent_div_5_li_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "li", 18)(1, "blockquote", 16)(2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const valor_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](valor_r4.value);
  }
}
function PlanejamentoMapaComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Valores ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 13)(6, "ul", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, PlanejamentoMapaComponent_div_5_li_7_Template, 4, 1, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 10)(9, "div", 11)(10, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11, " Miss\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 13)(13, "blockquote", 16)(14, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 10)(17, "div", 11)(18, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](19, " Vis\u00E3o ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "div", 13)(21, "blockquote", 16)(22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r1.planejamento.valores);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r1.planejamento.missao);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r1.planejamento.visao);
  }
}
const _c1 = function (a0, a1) {
  return {
    objetivo: a0,
    pai: a1
  };
};
function PlanejamentoMapaComponent_div_8_div_18_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainer"](0, 45);
  }
  if (rf & 2) {
    const subobjetivo_r11 = ctx.$implicit;
    const objetivo_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction2"](2, _c1, subobjetivo_r11, objetivo_r7));
  }
}
function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainer"](0, 45);
  }
  if (rf & 2) {
    const subobjetivo_r16 = ctx.$implicit;
    const objetivo_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().objetivo;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction2"](2, _c1, subobjetivo_r16, objetivo_r13));
  }
}
const _c2 = function () {
  return ["objetivo"];
};
function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dndEnd", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndEnd_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r18.onObjetivoDragEnd($event));
    })("dndMoved", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndMoved_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r19);
      const objetivo_r13 = restoredCtx.objetivo;
      const pai_r14 = restoredCtx.pai;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r20.onObjetivoDragged(objetivo_r13, pai_r14, "move"));
    })("dndStart", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndStart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r19);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r21.onObjetivoDragStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 47)(2, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "action-button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template_div_dndDrop_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r19);
      const objetivo_r13 = restoredCtx.objetivo;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r22.onObjetivoDrop($event, objetivo_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_div_18_ng_template_9_ng_container_8_Template, 1, 5, "ng-container", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const objetivo_r13 = ctx.objetivo;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dndDisableIf", !ctx_r10.canEdit)("dndDraggable", objetivo_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](objetivo_r13.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("button", ctx_r10.subObjetivosMenu)("data", objetivo_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](7, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", objetivo_r13.objetivos);
  }
}
function PlanejamentoMapaComponent_div_8_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dndEnd", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndEnd_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r23.onObjetivoDragEnd($event));
    })("dndMoved", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndMoved_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r24);
      const objetivo_r7 = restoredCtx.$implicit;
      const eixo_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r25.onObjetivoDragged(objetivo_r7, eixo_r5, "move"));
    })("dndStart", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndStart_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r24);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r27.onObjetivoDragStart($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 25)(2, "div", 35)(3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_div_18_Template_div_dndDrop_5_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r24);
      const objetivo_r7 = restoredCtx.$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r28.onObjetivoDrop($event, objetivo_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_div_18_ng_container_8_Template, 1, 5, "ng-container", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, PlanejamentoMapaComponent_div_8_div_18_ng_template_9_Template, 9, 8, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](12, "action-button", 42)(13, "action-button", 43)(14, "action-button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const objetivo_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dndDisableIf", !ctx_r6.canEdit)("dndDraggable", objetivo_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](objetivo_r7.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](11, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", objetivo_r7.objetivos);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoClick.bind(ctx_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoEditClick.bind(ctx_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("data", objetivo_r7)("onClick", ctx_r6.onObjetivoDeleteClick.bind(ctx_r6));
  }
}
function PlanejamentoMapaComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "action-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 21)(3, "div", 22)(4, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("dndDrop", function PlanejamentoMapaComponent_div_8_Template_div_dndDrop_6_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r30);
      const eixo_r5 = restoredCtx.$implicit;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r29.onObjetivoDrop($event, eixo_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "div", 24)(8, "div", 25)(9, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "span", 27)(11, "span", 28)(12, "span", 29)(13, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "action-button", 32)(16, "action-button", 32)(17, "action-button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, PlanejamentoMapaComponent_div_8_div_18_Template, 15, 12, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const eixo_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background-color", eixo_r5.eixo.cor);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("data", eixo_r5)("onClick", ctx_r2.onObjetivoAddClick.bind(ctx_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](eixo_r5.eixo.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dndDropzone", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](7, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", eixo_r5.objetivos);
  }
}
class PlanejamentoMapaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.canEdit = true;
    this.planejamentos = [];
    this.eixos = [];
    this.objetivos = [];
    this.subObjetivosMenu = {
      icon: "bi bi-three-dots-vertical",
      color: "transparent-black p-1 py-0",
      items: [{
        icon: "bi bi-file-earmark-bar-graph",
        label: "Entregas",
        onClick: this.onObjetivoClick.bind(this)
      }, {
        icon: "bi bi-pencil-square",
        label: "Alterar",
        onClick: this.onObjetivoEditClick.bind(this)
      }, {
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.onObjetivoDeleteClick.bind(this)
      }]
    };
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.dao = injector.get(src_app_dao_planejamento_dao_service__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoDaoService);
    this.objetivoDao = injector.get(src_app_dao_planejamento_objetivo_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoObjetivoDaoService);
    this.join = ['objetivos'];
    this.title = this.lex.translate("Objetivos") + ' ' + this.lex.translate('do Planejamento Institucional');
    this.form = this.fh.FormBuilder({
      planejamento_id: {
        default: null
      },
      todos: {
        default: false
      }
    }, this.cdRef, this.validate);
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.query = _this.dao.query({
        where: [["data_arquivamento", "==", null]],
        orderBy: [["data_inicio", "desc"]]
      });
      _this.query.asPromise().then(planejamentos => {
        _this.planejamentos = planejamentos.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome,
          data: x
        }));
        _this.cdRef.detectChanges();
        _this.form.controls.planejamento_id.setValue(_this.planejamentos.length ? _this.planejamentos[0].key : null);
      });
    })();
  }
  objetivosPai(filhoId) {
    let items = [];
    let addItens = list => {
      for (let item of list) {
        if (item.id != filhoId) {
          items.push(item);
          addItens(this.objetivos.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia));
        }
      }
    };
    addItens(this.objetivos.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia));
    return items;
  }
  marcador(row) {
    let level = row._metadata?.level || 0;
    return level < 1 ? "" : level < 2 ? "• " : level < 3 ? "- " : "+ ";
  }
  objetivosEixo(eixoId) {
    let objetivos = this.planejamento?.objetivos?.filter(y => y.eixo_tematico_id == eixoId && !y.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia) || [];
    let recursivo = (list, level) => {
      for (let item of list) {
        item.objetivos = this.planejamento?.objetivos?.filter(y => y.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia) || [];
        item._metadata = Object.assign(item._metadata || {}, {
          level
        });
        recursivo(item.objetivos, level + 1);
      }
    };
    recursivo(objetivos, 0);
    return objetivos;
  }
  onPlanejamentoChange() {
    if (this.planejamentoInstitucional.selectedItem) {
      this.dao.getById(this.planejamentoInstitucional.selectedItem?.key, this.join).then(planejamento => {
        this.planejamento = planejamento;
        this.objetivos = this.planejamento.objetivos || [];
        this.eixos = this.query.extra?.eixos?.filter(x => this.form?.controls.todos.value || this.planejamento?.objetivos?.find(y => y.eixo_tematico_id == x.id)).map(x => Object.assign({}, {
          eixo: x,
          eixo_tematico_id: x.id,
          objetivos: this.objetivosEixo(x.id)
        })) || [];
        this.cdRef.detectChanges();
      });
    }
  }
  onTodosChange() {
    this.onPlanejamentoChange();
  }
  onObjetivoClick(data) {
    let objetivo = data;
    this.go.navigate({
      route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id]
    });
  }
  onObjetivoAddClick(data) {
    var _this2 = this;
    let eixo = this.eixos.find(x => x.eixo.id == data.id);
    let objetivo = new src_app_models_planejamento_objetivo_model__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoObjetivo({
      _status: "ADD",
      id: this.dao.generateUuid(),
      planejamento_id: this.planejamento?.id,
      eixo_tematico_id: data.eixo.id,
      eixo_tematico: data.eixo,
      sequencia: eixo?.objetivos.length ? eixo?.objetivos[0].sequencia : 0
    });
    this.go.navigate({
      route: ['gestao', 'planejamento', 'objetivo']
    }, {
      metadata: {
        planejamento: this.planejamento,
        objetivo: objetivo,
        objetivos: this.objetivosPai(objetivo.id)
      },
      modalClose: function () {
        var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
          if (modalResult) _this2.objetivoDao.save(modalResult).then(objetivo => _this2.onPlanejamentoChange());
        });
        return function modalClose(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }
  onObjetivoDeleteClick(data) {
    let objetivo = data;
    this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
      if (confirm) this.objetivoDao.delete(objetivo).then(result => this.onPlanejamentoChange());
    });
  }
  onObjetivoEditClick(data) {
    var _this3 = this;
    let objetivo = data;
    this.go.navigate({
      route: ['gestao', 'planejamento', 'objetivo']
    }, {
      metadata: {
        planejamento: this.planejamento,
        objetivo: objetivo
      },
      modalClose: function () {
        var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (modalResult) {
          if (modalResult) _this3.objetivoDao?.save(modalResult).then(planejamento => _this3.onPlanejamentoChange());
        });
        return function modalClose(_x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    });
  }
  /* Drag & Drop */
  onObjetivoDrop(event, dropped) {
    console.log("Drop", event);
    dropped.objetivos = dropped.objetivos || [];
    let objetivo = event.data;
    let index = typeof event.index === 'undefined' ? dropped.objetivos.length : event.index;
    let neighborhood = index ? dropped.objetivos[index] || dropped.objetivos[index - 1] || undefined : undefined;
    dropped.objetivos.splice(index, 0, objetivo);
    this.loading = true;
    this.objetivoDao?.update(objetivo.id, {
      eixo_tematico_id: dropped.eixo_tematico_id,
      objetivo_pai_id: dropped.id || null,
      sequencia: neighborhood?.sequencia || 0
    }).then(result => this.onPlanejamentoChange()).finally(() => this.loading = false);
  }
  onObjetivoDragEnd(event) {
    console.log("DragEnd", event);
  }
  onObjetivoDragged(item, dragged, effect) {
    console.log("Dragged", item, dragged.objetivos);
    dragged.objetivos = dragged.objetivos || [];
    dragged.objetivos.splice(dragged.objetivos.indexOf(item), 1);
  }
  onObjetivoDragStart(event) {
    console.log("DragStart", event);
  }
}
_class = PlanejamentoMapaComponent;
_class.ɵfac = function PlanejamentoMapaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["planejamento-mapa"]],
  viewQuery: function PlanejamentoMapaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.planejamentoInstitucional = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 10,
  vars: 8,
  consts: [["noButtons", "", 3, "form"], [1, "row", "mt-2"], ["controlName", "planejamento_id", 3, "size", "control", "items", "change"], ["planejamentoInstitucional", ""], ["transparent", "", "collapse", "", "title", "Valores, miss\u00E3o e vis\u00E3o"], ["class", "row", 4, "ngIf"], [1, "row", "my-2"], ["labelPosition", "left", "label", "Todos os eixos", "controlName", "todos", 3, "size", "control", "change"], ["class", "eixo", 3, "background-color", 4, "ngFor", "ngForOf"], [1, "row"], [1, "col-4"], [1, "card", "h-100"], [1, "card-header"], [1, "card-body"], [1, "list-group", "list-group-flush"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "blockquote", "mb-0"], [1, "fst-italic"], [1, "list-group-item"], [1, "eixo"], ["icon", "bi bi-plus-circle", "color", "transparent-black", 3, "data", "onClick"], [1, "d-flex", "align-items-center", "align-content-stretch", "p-3"], [1, "descricao"], [1, "objetivos", "w-100", "row", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "col-md-4"], [1, "objetivo", "shadow-sm", "d-flex", "flex-column", "align-content-between"], [1, "placeholder-glow"], [1, "placeholder", "col-2"], [1, "placeholder", "col-3"], [1, "placeholder", "col-1"], [1, "placeholder", "col-6"], [1, "buttons", "w-100", "d-flex", "justify-content-end", "px-1"], ["placeholder", "", "icon", "bi bi-question", "color", "transparent-black p-0"], ["class", "col-md-4", "dndType", "objetivo", "dndEffectAllowed", "move", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart", 4, "ngFor", "ngForOf"], ["dndType", "objetivo", "dndEffectAllowed", "move", 1, "col-md-4", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "m-2"], ["dndHandle", "", 1, "card-text", "text-break", "w-100"], [1, "subobjetivo", 3, "dndDropzone", "dndDrop"], ["dndPlaceholderRef", "", 1, "border", "mt-3", "p-2"], [1, "placeholder", "w-75"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngFor", "ngForOf"], ["subobjetivos", ""], ["icon", "bi bi-file-earmark-bar-graph", "color", "transparent-black px-1", 3, "data", "onClick"], ["icon", "bi bi-pencil-square", "color", "transparent-black px-1", 3, "data", "onClick"], ["icon", "bi bi-trash", "color", "transparent-black px-1", 3, "data", "onClick"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["dndType", "objetivo", "dndEffectAllowed", "move", 1, "border", "mt-3", "p-2", 3, "dndDisableIf", "dndDraggable", "dndEnd", "dndMoved", "dndStart"], [1, "d-flex", "justify-content-between"], [1, "me-2", "card-text", "text-break", "w-100"], ["noArrow", "", 3, "button", "data"]],
  template: function PlanejamentoMapaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "input-select", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function PlanejamentoMapaComponent_Template_input_select_change_2_listener() {
        return ctx.onPlanejamentoChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "separator", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, PlanejamentoMapaComponent_div_5_Template, 24, 3, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 6)(7, "input-switch", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function PlanejamentoMapaComponent_Template_input_switch_change_7_listener() {
        return ctx.onTodosChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, PlanejamentoMapaComponent_div_8_Template, 19, 8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "div", 6);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.planejamento_id)("items", ctx.planejamentos);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.planejamento);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.todos);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.eixos);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgTemplateOutlet, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_6__.InputSwitchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__.SeparatorComponent, _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_9__.ActionButtonComponent, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__.DndDraggableDirective, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__.DndDropzoneDirective, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__.DndHandleDirective, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_12__.DndPlaceholderRefDirective],
  styles: [".blockquote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n  transform: scaleX(-1) scaleY(-1);\n  white-space: normal;\n  height: min-content;\n  text-align: center;\n  \n\n\n\n\n\n}\n\n.eixo[_ngcontent-%COMP%]   .descricao[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.eixo[_ngcontent-%COMP%]   .w-25[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivos[_ngcontent-%COMP%] {\n  min-height: 100px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%] {\n  background: #fff;\n  margin: 0 10px;\n}\n\n.eixo[_ngcontent-%COMP%]   .subobjetivo[_ngcontent-%COMP%] {\n  min-height: 50px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  cursor: grab;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: #5e5b5b;\n  font-size: 0.8rem;\n  margin: 0;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {\n  border-top: 1px solid #ddd;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 5px;\n}\n\n.eixo[_ngcontent-%COMP%]   .objetivo[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: #ddd;\n}\n\n.detalhe_entrega[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n\n.dndDraggingSource[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.acao-planos[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]::after {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vcGxhbmVqYW1lbnRvLWluc3RpdHVjaW9uYWwvcGxhbmVqYW1lbnRvLW1hcGEvcGxhbmVqYW1lbnRvLW1hcGEuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLFNBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0VBQ0EsdUJBQUE7RUFFQSxnQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBOzs7O3NCQUFBO0FBS0o7O0FBRUE7RUFDSSxrQkFBQTtBQUNKOztBQUVBO0VBQ0ksbUJBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLGNBQUE7QUFDSjs7QUFHQTtFQUNJLGdCQUFBO0FBQUo7O0FBR0E7RUFDSSxpQkFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxTQUFBO0FBQUo7O0FBR0E7RUFDSSwwQkFBQTtBQUFKOztBQUdBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUFBSjs7QUFHQTtFQUNJLHNCQUFBO0FBQUo7O0FBR0E7RUFDSSxpQkFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtBQUFKOztBQUlJO0VBQ0ksYUFBQTtBQURSIiwic291cmNlc0NvbnRlbnQiOlsiLmJsb2NrcXVvdGUgcCB7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuLmVpeG8gLmRlc2NyaWNhbyB7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbn1cclxuXHJcbi5laXhvIC5kZXNjcmljYW8gaDQge1xyXG4gICAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcclxuICAgIHRleHQtb3JpZW50YXRpb246IG1peGVkO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgtMSkgc2NhbGVZKC0xKTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGVYKC0xKSBzY2FsZVkoLTEpO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuICAgIGhlaWdodDogbWluLWNvbnRlbnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAvKnRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyovXHJcbn1cclxuXHJcbi5laXhvIC5kZXNjcmljYW8gYnV0dG9uIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxufVxyXG5cclxuLmVpeG8gLnctMjUge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvcyB7XHJcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvIHtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBtYXJnaW46IDAgMTBweDtcclxuICAgIC8vaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uZWl4byAuc3Vib2JqZXRpdm8ge1xyXG4gICAgbWluLWhlaWdodDogNTBweDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvIC5jYXJkLXRleHQge1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBjdXJzb3I6IGdyYWI7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byBwIHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBjb2xvcjogIzVlNWI1YjtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG4uZWl4byAub2JqZXRpdm8gLmJ1dHRvbnMge1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XHJcbn1cclxuXHJcbi5laXhvIC5vYmpldGl2byAuYnV0dG9ucyBhIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBhZGRpbmc6IDVweDtcclxufVxyXG5cclxuLmVpeG8gLm9iamV0aXZvIC5idXR0b25zIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcclxufVxyXG5cclxuLmRldGFsaGVfZW50cmVnYSBwIHtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG59XHJcblxyXG4uZG5kRHJhZ2dpbmdTb3VyY2Uge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmFjYW8tcGxhbm9zIHtcclxuICAgIC5kcm9wZG93bi10b2dnbGU6OmFmdGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 73543:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento-routing.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoRoutingModule: () => (/* binding */ PlanejamentoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./planejamento-form/planejamento-form.component */ 72350);
/* harmony import */ var _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./planejamento-list/planejamento-list.component */ 68809);
/* harmony import */ var _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./planejamento-form-objetivo/planejamento-form-objetivo.component */ 74768);
/* harmony import */ var _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component */ 10812);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [{
  path: '',
  component: _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Planejamentos Institucionais"
  }
}, {
  path: 'new',
  component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Planejamento Institucional",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Planejamento Institucional",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Planejamento Institucional",
    modal: true
  }
}, {
  path: 'objetivo',
  component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoFormObjetivoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Objetivo de Planejamento Institucional",
    modal: true
  }
}, {
  path: 'objetivoList',
  component: _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_5__.PlanejamentoListObjetivosEntregasComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Objetivos de Planejamento Institucional",
    modal: true
  }
}, {
  path: 'objetivo/:id/consult',
  component: _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoFormObjetivoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Objetivo de Planejamento Institucional",
    modal: true
  }
}];
class PlanejamentoRoutingModule {}
_class = PlanejamentoRoutingModule;
_class.ɵfac = function PlanejamentoRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](PlanejamentoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 1685:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/gestao/planejamento-institucional/planejamento.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanejamentoModule: () => (/* binding */ PlanejamentoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./planejamento-list/planejamento-list.component */ 68809);
/* harmony import */ var _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./planejamento-form/planejamento-form.component */ 72350);
/* harmony import */ var _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./planejamento-routing.module */ 73543);
/* harmony import */ var _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./planejamento-list-objetivo/planejamento-list-objetivo.component */ 17726);
/* harmony import */ var _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./planejamento-form-objetivo/planejamento-form-objetivo.component */ 74768);
/* harmony import */ var _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planejamento-mapa/planejamento-mapa.component */ 23195);
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-drag-drop */ 51474);
/* harmony import */ var _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component */ 10812);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;











class PlanejamentoModule {}
_class = PlanejamentoModule;
_class.ɵfac = function PlanejamentoModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_10__.DndModule, _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](PlanejamentoModule, {
    declarations: [_planejamento_list_planejamento_list_component__WEBPACK_IMPORTED_MODULE_1__.PlanejamentoListComponent, _planejamento_form_planejamento_form_component__WEBPACK_IMPORTED_MODULE_2__.PlanejamentoFormComponent, _planejamento_list_objetivo_planejamento_list_objetivo_component__WEBPACK_IMPORTED_MODULE_4__.PlanejamentoListObjetivoComponent, _planejamento_form_objetivo_planejamento_form_objetivo_component__WEBPACK_IMPORTED_MODULE_5__.PlanejamentoFormObjetivoComponent, _planejamento_mapa_planejamento_mapa_component__WEBPACK_IMPORTED_MODULE_6__.PlanejamentoMapaComponent, _planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_7__.PlanejamentoListObjetivosEntregasComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, ngx_drag_drop__WEBPACK_IMPORTED_MODULE_10__.DndModule, _planejamento_routing_module__WEBPACK_IMPORTED_MODULE_3__.PlanejamentoRoutingModule],
    exports: [_planejamento_list_objetivos_entregas_planejamento_list_objetivos_entregas_component__WEBPACK_IMPORTED_MODULE_7__.PlanejamentoListObjetivosEntregasComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=685.js.map