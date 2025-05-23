"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[7550],{

/***/ 10997:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/gestao/programa/programa-form/programa-form.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaFormComponent: () => (/* binding */ ProgramaFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/template-dao.service */ 99230);
/* harmony import */ var src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-avaliacao-dao.service */ 20207);
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ 88340);
/* harmony import */ var src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-justificativa-dao.service */ 79055);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/programa.model */ 90758);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/uteis/templates/template.service */ 49367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/action-button/action-button.component */ 28032);


























const _c0 = ["unidade"];
const _c1 = ["tipoAvaliacao"];
function ProgramaFormComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](0, "div", 42)(1, "div", 43)(2, "action-button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵlistener"]("click", function ProgramaFormComponent_div_14_Template_action_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵresetView"](ctx_r11.onClickIN());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]()()();
  }
}
function ProgramaFormComponent_input_select_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](0, "input-select", 45);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 3)("control", ctx_r5.form.controls.periodicidade_valor)("items", ctx_r5.lookup.DIA_SEMANA);
  }
}
function ProgramaFormComponent_input_number_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](0, "input-number", 46);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 3)("control", ctx_r6.form.controls.periodicidade_valor);
  }
}
function ProgramaFormComponent_input_number_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](0, "input-number", 47);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 3)("control", ctx_r7.form.controls.periodicidade_valor);
  }
}
function ProgramaFormComponent_input_number_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](0, "input-number", 48);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx_r8.form.controls.nota_padrao_avaliacao);
  }
}
function ProgramaFormComponent_input_select_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](0, "input-select", 49);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx_r9.form.controls.nota_padrao_avaliacao)("items", ctx_r9.tipoAvaliacaoQualitativo);
  }
}
const _c2 = function () {
  return {
    instituidora: true
  };
};
const _c3 = function (a0) {
  return {
    filter: a0
  };
};
const _c4 = function () {
  return ["especie", "==", "TCR"];
};
const _c5 = function (a0) {
  return [a0];
};
const _c6 = function () {
  return ["SEMANAL", "QUINZENAL"];
};
const _c7 = function () {
  return ["MENSAL", "BIMESTRAL", "TRIMESTRAL", "SEMESTRAL"];
};
const _c8 = function () {
  return ["DIAS"];
};
class ProgramaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_8__.Programa, src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_2__.ProgramaDaoService);
    this.injector = injector;
    this._tipoAvaliacaoQualitativo = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'unidade_id', 'tipo_avaliacao_plano_trabalho_id', 'tipo_avaliacao_plano_entrega_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "prazo_max_plano_entrega" && parseInt(control.value || 0) > 99999) {
        result = "Inválido";
      } else if (['data_inicio', 'data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      } else if (controlName == "periodicidade_valor") {
        if (['SEMANAL', 'QUINZENAL'].includes(this.form?.controls.periodicidade_consolidacao.value) && control.value > 6) result = "Inválido";
        if (['MENSAL', 'BIMESTRAL', 'TRIMESTRAL', 'SEMESTRAL'].includes(this.form?.controls.periodicidade_consolidacao.value) && control.value > 31) result = "Máximo 31";
        if (['DIAS'].includes(this.form?.controls.periodicidade_consolidacao.value) && control.value < 0) result = "Inválido";
      }
      return result;
    };
    this.formValidation = form => {
      let result = null;
      if (this.form?.controls.data_fim.value && this.form?.controls.data_inicio.value > this.form?.controls.data_fim.value) {
        result = "A data do fim não pode ser anterior à data do inicio!";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Programa") + ': ' + (entity?.nome || "");
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeDaoService);
    this.templateDao = injector.get(src_app_dao_template_dao_service__WEBPACK_IMPORTED_MODULE_3__.TemplateDaoService);
    this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoDocumentoDaoService);
    this.tipoAvaliacaoDao = injector.get(src_app_dao_tipo_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_4__.TipoAvaliacaoDaoService);
    this.tipoJustificativaDao = injector.get(src_app_dao_tipo_justificativa_dao_service__WEBPACK_IMPORTED_MODULE_6__.TipoJustificativaDaoService);
    this.templateService = injector.get(src_app_modules_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_10__.TemplateService);
    this.modalWidth = 700;
    this.form = this.fh.FormBuilder({
      unidade_id: {
        default: ""
      },
      nome: {
        default: ""
      },
      normativa: {
        default: ""
      },
      link_normativa: {
        default: null
      },
      config: {
        default: null
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      template_tcr_id: {
        default: null
      },
      tipo_avaliacao_plano_entrega_id: {
        default: ""
      },
      tipo_avaliacao_plano_trabalho_id: {
        default: ""
      },
      tipo_documento_tcr_id: {
        default: null
      },
      prazo_max_plano_entrega: {
        default: 365
      },
      termo_obrigatorio: {
        default: true
      },
      periodicidade_consolidacao: {
        default: 'MENSAL'
      },
      periodicidade_valor: {
        default: 1
      },
      dias_tolerancia_consolidacao: {
        default: 10
      },
      registra_comparecimento: {
        default: true
      },
      plano_trabalho_assinatura_participante: {
        default: true
      },
      plano_trabalho_assinatura_gestor_lotacao: {
        default: true
      },
      plano_trabalho_assinatura_gestor_unidade: {
        default: true
      },
      plano_trabalho_assinatura_gestor_entidade: {
        default: true
      },
      checklist_avaliacao_entregas_plano_trabalho: {
        default: []
      },
      checklist_plano_trabalho_texto: {
        default: ""
      },
      checklist_avaliacao_entregas_plano_entrega: {
        default: []
      },
      checklist_plano_entrega_texto: {
        default: ""
      },
      plano_trabalho_criterios_avaliacao: {
        default: []
      },
      plano_trabalho_criterio_avaliacao: {
        default: ""
      },
      dias_tolerancia_avaliacao: {
        default: 20
      },
      dias_tolerancia_recurso_avaliacao: {
        default: 20
      },
      nota_padrao_avaliacao: {
        default: 0
      },
      tipo_justificativa_id: {
        default: null
      }
    }, this.cdRef, this.validate);
    this.join = ["unidade"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      yield Promise.all([_this.unidade.loadSearch(entity.unidade || entity.unidade_id)]);
      entity.plano_trabalho_criterios_avaliacao = entity.plano_trabalho_criterios_avaliacao || [];
      entity.checklist_avaliacao_entregas_plano_entrega = entity.checklist_avaliacao_entregas_plano_entrega || [];
      entity.checklist_avaliacao_entregas_plano_trabalho = entity.checklist_avaliacao_entregas_plano_trabalho || [];
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    form.patchValue(new src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_8__.Programa());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const programa = this.util.fill(new src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_8__.Programa(), this.entity);
      resolve(this.util.fillForm(programa, this.form.value));
    });
  }
  isTipoAvaliacao(tipo) {
    let selected = this.tipoAvaliacao?.selectedEntity;
    return selected?.tipo == tipo || !selected && tipo == "QUANTITATIVO";
  }
  get tipoAvaliacaoQualitativo() {
    let selected = this.tipoAvaliacao?.selectedEntity;
    let items = selected?.notas?.map(x => Object.assign({}, {
      key: x.nota,
      value: x.nota
    })) || [];
    if (JSON.stringify(items) != JSON.stringify(this._tipoAvaliacaoQualitativo)) this._tipoAvaliacaoQualitativo = items;
    return this._tipoAvaliacaoQualitativo;
  }
  /*public addItemHandlePlanoTrabalhoCriteriosAvaliacao(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.plano_trabalho_criterio_avaliacao.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form!.controls.plano_trabalho_criterios_avaliacao.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.plano_trabalho_criterio_avaliacao.value
      };
      this.form!.controls.plano_trabalho_criterio_avaliacao.setValue("");
    }
    return result;
  };
     public addItemHandlePlanoTrabalhoChecklist(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.checklist_plano_trabalho_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.checklist_avaliacao_entregas_plano_trabalho.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.checklist_plano_trabalho_texto.value
      };
      this.form!.controls.checklist_plano_trabalho_texto.setValue("");
    }
    return result;
  };*/
  addItemHandlePlanoEntregaChecklist() {
    let result = undefined;
    const value = this.form.controls.checklist_plano_entrega_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.checklist_avaliacao_entregas_plano_entrega.value, key)) {
      result = {
        key: key,
        value: this.form.controls.checklist_plano_entrega_texto.value
      };
      this.form.controls.checklist_plano_entrega_texto.setValue("");
    }
    return result;
  }
  onClickIN() {
    window.open(this.form?.controls.link_normativa.value);
  }
  static #_ = this.ɵfac = function ProgramaFormComponent_Factory(t) {
    return new (t || ProgramaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_23__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵdefineComponent"]({
    type: ProgramaFormComponent,
    selectors: [["app-programa-form"]],
    viewQuery: function ProgramaFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵloadQuery"]()) && (ctx.tipoAvaliacao = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵInheritDefinitionFeature"]],
    decls: 50,
    vars: 83,
    consts: [["initialFocus", "unidade_id", 3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "GERAL", "label", "Geral"], [1, "row"], ["label", "Unidade Instituidora", "controlName", "unidade_id", "required", "", 3, "size", "dao", "selectParams"], ["unidade", ""], ["date", "", "label", "Data de In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "Data de in\u00EDcio da vig\u00EAncia do programa de gest\u00E3o na unidade instituidora", 3, "size", "control"], ["date", "", "label", "Data de Fim", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "Data de fim da vig\u00EAncia do programa de gest\u00E3o na unidade instituidora", 3, "size", "control"], ["label", "Dura\u00E7\u00E3o M\u00E1x P.E.", "icon", "bi bi-blockquote-left", "controlName", "prazo_max_plano_entrega", "labelInfo", "Limite m\u00E1ximo de dias corridos para a dura\u00E7\u00E3o do plano de entregas a partir da sua data de cria\u00E7\u00E3o (Zero para n\u00E3o limitar)", 3, "size", "control"], ["label", "T\u00EDtulo", "icon", "bi bi-textarea-t", "controlName", "nome", "required", "", 3, "size", "control"], ["label", "Normativa", "icon", "bi bi-blockquote-left", "controlName", "normativa", "labelInfo", "Normativa que regula o Programa", 3, "size", "control"], ["label", "Link Normativa", "icon", "bi bi-link-45deg", "controlName", "link_normativa", "labelInfo", "Link web da instru\u00E7\u00E3o normativa", 3, "size", "control"], ["class", "row justify-content-end my-2", 4, "ngIf"], ["key", "PLANO_ENTREGA", 3, "label"], ["controlName", "tipo_avaliacao_plano_entrega_id", "required", "", 3, "label", "size", "dao", "labelInfo"], ["tipoAvaliacaoEntrega", ""], [3, "title"], ["label", "Checklists das entregas", "controlName", "checklist_avaliacao_entregas_plano_entrega", 3, "size", "addItemHandle"], ["controlName", "checklist_plano_entrega_texto", 3, "size"], ["key", "PLANO_TRABALHO", 3, "label"], ["scale", "small", "labelPosition", "right", "controlName", "termo_obrigatorio", "label", "Se o termo \u00E9 obrigat\u00F3rio", 3, "size"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_participante", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_lotacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_unidade", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_entidade", 3, "size", "label"], ["detailsButton", "", "labelInfo", "Template do termo utilizado no plano de trabalho", "controlName", "template_tcr_id", "required", "", 3, "label", "size", "dao", "where", "selectRoute", "details"], ["controlName", "tipo_documento_tcr_id", "labelInfo", "Tipo de documento utilizado para exportar o termo para o SEI/SUPER", 3, "label", "size", "dao"], ["tipoDocumento", ""], ["controlName", "tipo_avaliacao_plano_trabalho_id", "required", "", 3, "label", "size", "dao", "labelInfo"], ["tipoAvaliacao", ""], ["label", "Periodicidade", "controlName", "periodicidade_consolidacao", "labelInfo", "Per\u00EDodo para avalia\u00E7\u00E3o do plano de trabalho", 3, "size", "control", "items"], ["label", "Dia da semana", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", "items", 4, "ngIf"], ["label", "Dia do m\u00EAs", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", 4, "ngIf"], ["label", "Qtd. de Dias", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", 4, "ngIf"], ["label", "Toler\u00E2ncia", "controlName", "dias_tolerancia_consolidacao", "labelInfo", "Dias de toler\u00E2ncia para o lan\u00E7amento do registro das atividades na consolida\u00E7\u00E3o, ap\u00F3s esses dias ser\u00E1 liberado automaticamente para avalia\u00E7\u00E3o", 3, "size", "control"], ["type", "warning", 3, "message"], ["label", "Toler\u00E2ncia p/ avalia\u00E7\u00E3o", "controlName", "dias_tolerancia_avaliacao", "labelInfo", "Dias de toler\u00E2ncia para realizar a avalia\u00E7\u00E3o, considerando a toler\u00E2ncia da consolida\u00E7\u00E3o. Caso seja zero n\u00E3o far\u00E1 nada, caso contr\u00E1rio ap\u00F3s esse prazo a consolida\u00E7\u00E3o ser\u00E1 automaticamente avaliada com a nota padr\u00E3o", 3, "size", "control"], ["label", "Toler\u00E2ncia p/ recurso", "controlName", "dias_tolerancia_recurso_avaliacao", "labelInfo", "Dias de toler\u00E2ncia para recorrer da avalia\u00E7\u00E3o", 3, "size", "control"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", 4, "ngIf"], ["label", "Conceito", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", "items", 4, "ngIf"], ["controlName", "tipo_justificativa_id", "labelInfo", "Tipo de justificativa, para quando o gestor n\u00E3o realizar a avalia\u00E7\u00E3o dentro do prazo", 3, "label", "size", "emptyValue", "dao"], ["tipoJustificativa", ""], [1, "row", "justify-content-end", "my-2"], [1, "col-4"], ["label", "Acessar Instr. Normativa", "icon", "bi bi-box-arrow-up-right", 3, "click"], ["label", "Dia da semana", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", "items"], ["label", "Dia do m\u00EAs", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control"], ["label", "Qtd. de Dias", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control"], ["label", "Conceito", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", "items"]],
    template: function ProgramaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵlistener"]("submit", function ProgramaFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function ProgramaFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](4, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](7, "input-datetime", 6)(8, "input-datetime", 7)(9, "input-number", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](11, "input-text", 9)(12, "input-text", 10)(13, "input-text", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](14, ProgramaFormComponent_div_14_Template, 3, 0, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](15, "tab", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](16, "input-search", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](18, "separator", 16)(19, "input-multiselect", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](20, "input-text", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](21, "tab", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](22, "input-switch", 20)(23, "input-switch", 21)(24, "input-switch", 22)(25, "input-switch", 23)(26, "input-switch", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](27, "input-search", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵlistener"]("details", function ProgramaFormComponent_Template_input_search_details_27_listener($event) {
          return ctx.templateService.details($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](28, "input-search", 26, 27)(30, "input-search", 28, 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](32, "separator", 16)(33, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](34, "input-select", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](35, ProgramaFormComponent_input_select_35_Template, 1, 3, "input-select", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](36, ProgramaFormComponent_input_number_36_Template, 1, 2, "input-number", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](37, ProgramaFormComponent_input_number_37_Template, 1, 2, "input-number", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](38, "input-number", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](39, "separator", 16)(40, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](41, "top-alert", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](42, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](43, "input-number", 36)(44, "input-number", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementStart"](45, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](46, ProgramaFormComponent_input_number_46_Template, 1, 2, "input-number", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵtemplate"](47, ProgramaFormComponent_input_select_47_Template, 1, 3, "input-select", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelement"](48, "input-search", 40, 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("dao", ctx.unidadeDao)("selectParams", _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction1"](75, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction0"](74, _c2)));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_inicio);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_fim);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.prazo_max_plano_entrega);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.normativa);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.link_normativa);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", ctx.form.controls.link_normativa.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", ctx.lex.translate("Plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o do Plano de entrega"))("size", 12)("dao", ctx.tipoAvaliacaoDao)("labelInfo", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o") + " que especifica a forma que ser\u00E1 avaliado " + ctx.lex.translate("plano de trabalho") + " e " + ctx.lex.translate("plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("title", ctx.lex.translate("Avalia\u00E7\u00E3o") + ctx.lex.translate(" do Plano de Entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("addItemHandle", ctx.addItemHandlePlanoEntregaChecklist.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", ctx.lex.translate("Plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("label", "Exige assinatura " + ctx.lex.translate("do usu\u00E1rio") + ctx.lex.translate(" do plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor da lota\u00E7\u00E3o " + ctx.lex.translate("do usu\u00E1rio") + " (para " + ctx.lex.translate("unidade") + " distinta)");
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("da unidade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("da entidade"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", "Template " + ctx.lex.translate("termo") + " (TCR)")("size", 12)("dao", ctx.templateDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction1"](78, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction0"](77, _c4)))("selectRoute", ctx.templateService.selectRoute("TCR", ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.template_tcr_id == null ? null : ctx.form.controls.template_tcr_id.value));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", "Tipo de documento " + ctx.lex.translate("termo"))("size", 12)("dao", ctx.tipoDocumentoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o do Plano de trabalho"))("size", 12)("dao", ctx.tipoAvaliacaoDao)("labelInfo", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o") + " que especifica a forma que ser\u00E1 avaliado " + ctx.lex.translate("plano de trabalho") + " e " + ctx.lex.translate("plano de entrega"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("title", ctx.lex.translate("Consolida\u00E7\u00E3o") + ctx.lex.translate(" do Plano de trabalho"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.periodicidade_consolidacao)("items", ctx.lookup.PERIODICIDADE_CONSOLIDACAO);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction0"](80, _c6).includes(ctx.form.controls.periodicidade_consolidacao.value));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction0"](81, _c7).includes(ctx.form.controls.periodicidade_consolidacao.value));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵpureFunction0"](82, _c8).includes(ctx.form.controls.periodicidade_consolidacao.value));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.dias_tolerancia_consolidacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("title", ctx.lex.translate("Avalia\u00E7\u00E3o") + ctx.lex.translate(" da Consolida\u00E7\u00E3o"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("message", "O sistema ir\u00E1 atribuir automaticamente a nota e o tipo de justificativa abaixo quando a toler\u00E2ncia para avalia\u00E7\u00E3o for alcan\u00E7ada");
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.dias_tolerancia_avaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.dias_tolerancia_recurso_avaliacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", ctx.isTipoAvaliacao("QUANTITATIVO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("ngIf", ctx.isTipoAvaliacao("QUALITATIVO"));
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_23__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de justificativa"))("size", 8)("emptyValue", null)("dao", ctx.tipoJustificativaDao);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__.SeparatorComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_20__.TopAlertComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_21__.InputNumberComponent, _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_22__.ActionButtonComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 83769:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/gestao/programa/programa-list/programa-list.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaListComponent: () => (/* binding */ ProgramaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/programa.model */ 90758);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);














function ProgramaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "toolbar");
  }
}
function ProgramaListComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r9.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r9.normativa, "");
  }
}
function ProgramaListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r10.unidade.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", row_r10.unidade.sigla, "");
  }
}
function ProgramaListComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "br");
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r6.dao.getDateFormatted(row_r11.data_inicio), "");
  }
}
function ProgramaListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r8.dao.getDateFormatted(row_r12.data_fim), "");
  }
}
class ProgramaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector, dao) {
    super(injector, src_app_models_programa_model__WEBPACK_IMPORTED_MODULE_2__.Programa, src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProgramaDaoService);
    this.injector = injector;
    this.vigentesUnidadeExecutora = false;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (this.vigentesUnidadeExecutora) result.push(['vigentesUnidadeExecutora', "==", this.auth.unidade.id]);
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Programas de Gestão");
    this.code = "MOD_PRGT";
    this.join = ["unidade:id, nome"];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_PRGT_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    // Testa se o usuário possui permissão para visualizar os participantes do programa de gestão
    if (this.auth.hasPermissionTo("MOD_PART")) {
      this.options.push({
        icon: "bi bi-people",
        label: "Participantes",
        onClick: programa => this.go.navigate({
          route: ["gestao", "programa", programa.id, "participantes"]
        }, {
          metadata: {
            'programa': programa
          }
        })
      });
    }
    /*     if (this.auth.hasPermissionTo("MOD_PART")) {
          this.options.push({
            icon: "bi bi-folder",
            label: "Desdobramentos",
            onClick: (programa: Programa) => this.go.navigate({route: ["gestao", "desdobramento", programa.id, "programa"]})
          });
        } */
  }
  ngOnInit() {
    super.ngOnInit();
    this.vigentesUnidadeExecutora = this.metadata?.vigentesUnidadeExecutora;
  }
  static #_ = this.ɵfac = function ProgramaListComponent_Factory(t) {
    return new (t || ProgramaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProgramaDaoService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: ProgramaListComponent,
    selectors: [["app-programa-list"]],
    viewQuery: function ProgramaListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
    decls: 20,
    vars: 28,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", 3, "size", "label", "control", "placeholder"], ["title", "T\u00EDtulo/Normativa", 3, "template"], ["columnTituloNormativa", ""], ["title", "Unidade instituidora", 3, "template"], ["columnUnidadeInstituidora", ""], ["title", "In\u00EDcio da Vig\u00EAncia", 3, "template"], ["columnInicioVigencia", ""], ["title", "Fim da Vig\u00EAncia", 3, "template"], ["columnFimVigencia", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
    template: function ProgramaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("select", function ProgramaListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, ProgramaListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "input-text", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "columns")(6, "column", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ProgramaListComponent_ng_template_7_Template, 5, 2, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "column", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, ProgramaListComponent_ng_template_10_Template, 5, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "column", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, ProgramaListComponent_ng_template_13_Template, 3, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, ProgramaListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](18, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "pagination", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](8);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](11);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](14);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PRGT_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PRGT_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("label", "Nome do " + ctx.lex.translate("programa"))("control", ctx.filter.controls.nome)("placeholder", "Nome do " + ctx.lex.translate("programa"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 11950:
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/programa/programa-participantes/programa-participantes.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaParticipantesComponent: () => (/* binding */ ProgramaParticipantesComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 86699);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/programa-dao.service */ 92214);
/* harmony import */ var src_app_dao_programa_participante_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/programa-participante-dao.service */ 91042);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/usuario.model */ 26898);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);






















const _c0 = ["programaSearch"];
function ProgramaParticipantesComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "toolbar")(1, "input-switch", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function ProgramaParticipantesComponent_toolbar_1_Template_input_switch_change_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵresetView"](ctx_r14.grid.reloadFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 3)("label", ctx_r0.lex.translate("Habilitados"))("labelInfo", "Se ON, retorna apenas " + ctx_r0.lex.translate("os usu\u00E1rios") + " habilitados " + ctx_r0.lex.translate("no programa") + ". Se OFF, retorna apenas os desabilitados.")("control", ctx_r0.filter.controls.habilitados);
  }
}
function ProgramaParticipantesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 21)(1, "span")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"]("Programa: " + (ctx_r3.programa == null ? null : ctx_r3.programa.nome) || 0);
  }
}
function ProgramaParticipantesComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "profile-picture", 22);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("url", row_r16.url_foto)("size", 40)("hint", row_r16.nome);
  }
}
function ProgramaParticipantesComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r17.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r17.apelido);
  }
}
function ProgramaParticipantesComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 23);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("icon", ctx_r9.isHabilitado(row_r18) ? "bi bi-person-check" : "bi-person-fill-slash")("label", ctx_r9.isHabilitado(row_r18) ? ctx_r9.lex.translate("Habilitado") : ctx_r9.lex.translate("Desabilitado"))("color", ctx_r9.isHabilitado(row_r18) ? "success" : "danger");
  }
}
function ProgramaParticipantesComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r19.lotacao.unidade.sigla);
  }
}
function ProgramaParticipantesComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](ctx_r13.hasPlanoTrabalhoAtivo(row_r20) ? "sim" : "n\u00E3o");
  }
}
const _c1 = function (a2) {
  return ["vigentesUnidadeExecutora", "==", a2];
};
const _c2 = function (a0) {
  return [a0];
};
const _c3 = function () {
  return {
    "vigentesUnidadeExecutora": true
  };
};
class ProgramaParticipantesComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_8__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_7__.Usuario, src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.injector = injector;
    this.multiselectMenu = [];
    this.programa = null;
    this.BOTAO_HABILITAR = {
      label: this.lex.translate("Habilitar"),
      hint: this.lex.translate("Habilitar"),
      icon: "bi bi-person-check-fill",
      color: "btn-outline-success",
      onClick: this.habilitarParticipante.bind(this)
    };
    this.BOTAO_DESABILITAR = {
      label: this.lex.translate("Desabilitar"),
      hint: this.lex.translate("Desabilitar"),
      icon: "bi bi-person-x-fill",
      color: "btn-outline-danger",
      onClick: this.desabilitarParticipante.bind(this)
    };
    this.validate = (control, controlName) => {
      let result = null;
      if (['programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.unidade_id?.length) result.push(["lotacao", "==", form.unidade_id]);
      if (form.nome_usuario?.length) result.push(["nome", "like", "%" + form.nome_usuario.trim().replace(" ", "%") + "%"]);
      result.push(["habilitado", '==', this.filter?.controls.habilitados.value]);
      result.push(["programa_id", "==", this.programa?.id]);
      return result;
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.programaParticipanteDao = injector.get(src_app_dao_programa_participante_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProgramaParticipanteDaoService);
    this.programaDao = injector.get(src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_3__.ProgramaDaoService);
    /* Inicializações */
    this.code = "MOD_PART";
    this.filter = this.fh.FormBuilder({
      programa_id: {
        default: this.programa?.id
      },
      unidade_id: {
        default: this.auth.unidade?.id
      },
      nome_usuario: {
        default: ""
      },
      habilitados: {
        default: false
      }
    }, this.cdRef, this.validate);
    if (this.auth.hasPermissionTo('MOD_PART_HAB')) this.multiselectMenu.push({
      icon: "bi bi-person-check-fill",
      label: this.lex.translate("Habilitar"),
      color: "btn-outline-success",
      onClick: this.habilitarParticipantes.bind(this)
    });
    if (this.auth.hasPermissionTo('MOD_PART_DESAB')) this.multiselectMenu.push({
      icon: "bi bi-person-x-fill",
      label: this.lex.translate("Desabilitar"),
      color: "btn-outline-danger",
      onClick: this.desabilitarParticipantes.bind(this)
    });
    this.join = ["lotacao.unidade:id,sigla", "planos_trabalho:id,status", "participacoes_programas:id"];
    this.title = this.lex.translate("Habilitações");
    this.orderBy = [['nome', 'asc']];
  }
  dynamicButtons(row) {
    let result = [];
    if (this.auth.hasPermissionTo('MOD_PART_HAB') && !this.isHabilitado(row)) result.push(this.BOTAO_HABILITAR);
    if (this.auth.hasPermissionTo('MOD_PART_DESAB') && this.isHabilitado(row)) result.push(this.BOTAO_DESABILITAR);
    return result;
  }
  ngAfterViewInit() {
    var _this = this;
    super.ngAfterViewInit();
    this.grid.BUTTON_MULTISELECT_SELECIONAR = "Marcar";
    this.grid.BUTTON_MULTISELECT_CANCELAR_SELECAO = "Cancelar Marcação";
    this.grid.BUTTON_MULTISELECT.label = "Marcar";
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.loading = true;
      try {
        _this.programa = _this.metadata?.programa;
        if (!_this.programa) yield _this.programaDao.query({
          where: [['vigentesUnidadeExecutora', "==", _this.auth.unidade.id]]
        }).asPromise().then(programas => {
          _this.programa = programas[0];
          _this.programaSearch?.loadSearch(_this.programa);
        });
      } finally {
        _this.loading = false;
      }
    })();
  }
  filterClear(filter) {
    filter.controls.unidade_id.setValue(undefined);
    filter.controls.nome_usuario.setValue('');
    filter.controls.habilitados.setValue(true);
  }
  habilitarParticipante(row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.programaParticipanteDao.habilitar([row.id], _this2.programa.id, 1, false).then(resposta => {
        (_this2.grid?.query || _this2.query).refreshId(row.id);
        _this2.cdRef.detectChanges();
      });
      return false;
    })();
  }
  desabilitarParticipante(row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let desabilitar = yield _this3.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR " + _this3.lex.translate("o servidor") + " " + row.nome.toUpperCase() + " " + _this3.lex.translate("do programa") + " " + (_this3.programa?.nome).toUpperCase() + " ?");
      if (desabilitar) {
        let suspender = false;
        if (_this3.hasPlanoTrabalhoAtivo(row)) {
          suspender = yield _this3.dialog.confirm("ATENÇÃO", _this3.lex.translate("O servidor") + " possui " + _this3.lex.translate("Plano de Trabalho") + " ativo vinculado a " + _this3.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo o seu " + _this3.lex.translate("Plano de Trabalho" + " ?"));
        }
        if (!_this3.hasPlanoTrabalhoAtivo(row) || suspender) {
          yield _this3.programaParticipanteDao.habilitar([row.id], _this3.programa.id, 0, suspender).then(resposta => {
            (_this3.grid?.query || _this3.query).refreshId(row.id);
            _this3.cdRef.detectChanges();
          });
        }
      }
    })();
  }
  habilitarParticipantes() {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.grid.multiselectedCount) {
        _this4.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitação");
      } else {
        const self = _this4;
        _this4.dialog.confirm("Habilitar Participantes ?", "Confirma a habilitação de todos esses participantes?").then(habilitar_todos => {
          if (habilitar_todos) {
            const idsUsuarios = Object.values(_this4.grid.multiselected).map(x => x.id);
            _this4.programaParticipanteDao.habilitar(idsUsuarios, _this4.programa.id, 1, false).then(function () {
              self.dialog.topAlert("Participantes habilitados com sucesso!", 5000);
              (self.grid?.query || self.query).refresh();
            }).catch(function (error) {
              self.dialog.alert("Erro", "Erro ao habilitar os participantes: " + error?.message ? error?.message : 0);
            });
            _this4.grid?.enableMultiselect(false);
            self.cdRef.detectChanges();
          }
        });
      }
    })();
  }
  desabilitarParticipantes() {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let idsProgramasParticipantes = Object.keys(_this5.grid.multiselected);
      _this5.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR, " + _this5.lex.translate("do programa") + " " + (_this5.programa?.nome).toUpperCase() + " todos " + _this5.lex.translate("os usuários") + " selecionados ?").then( /*#__PURE__*/function () {
        var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (desabilitar) {
          if (desabilitar) {
            const self = _this5;
            let qde_usuarios_com_plano_trabalho_ativo = 0;
            yield _this5.programaParticipanteDao.quantidadePlanosTrabalhoAtivos(idsProgramasParticipantes).then(resposta => {
              qde_usuarios_com_plano_trabalho_ativo = resposta;
            });
            let suspender = false;
            if (!!qde_usuarios_com_plano_trabalho_ativo) {
              yield _this5.dialog.confirm("ATENÇÃO", "Há " + qde_usuarios_com_plano_trabalho_ativo + _this5.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? " usuário" : " usuários") + " com " + _this5.lex.translate("Plano de Trabalho") + " ativo vinculado a " + _this5.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo " + (qde_usuarios_com_plano_trabalho_ativo == 1 ? "o seu " : "todos ") + _this5.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? "Plano de Trabalho" : "os Planos de Trabalho") + " ?").then(resposta => {
                suspender = resposta;
              });
            }
            if (!qde_usuarios_com_plano_trabalho_ativo || suspender) {
              const idsUsuarios = Object.values(_this5.grid.multiselected).map(x => x.id);
              _this5.programaParticipanteDao.habilitar(idsUsuarios, _this5.programa.id, 0, suspender).then(resposta => {
                self.dialog.topAlert("Participantes desabilitados com sucesso!", 5000);
                (_this5.grid?.query || _this5.query).refresh();
              }).catch(function (error) {
                if (self.grid) self.grid.error = error;
              });
              _this5.grid?.enableMultiselect(false);
              _this5.cdRef.detectChanges();
            }
          }
        });
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    })();
  }
  onProgramaChange() {
    this.programa = this.programaSearch?.selectedItem?.entity;
    if (this.programa) this.grid?.reloadFilter();
  }
  isHabilitado(row) {
    return !!row.participacoes_programas.find(x => x.habilitado == 1 && x.programa_id == this.programa?.id);
  }
  hasPlanoTrabalhoAtivo(row) {
    return !!row.planos_trabalho?.find(x => x.status == "ATIVO" && this.util.between((0,moment__WEBPACK_IMPORTED_MODULE_1__.now)(), {
      start: x.data_inicio,
      end: x.data_fim
    }));
  }
  static #_ = this.ɵfac = function ProgramaParticipantesComponent_Factory(t) {
    return new (t || ProgramaParticipantesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
    type: ProgramaParticipantesComponent,
    selectors: [["app-programa-participantes"]],
    viewQuery: function ProgramaParticipantesComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.programaSearch = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
    decls: 29,
    vars: 53,
    consts: [["multiselect", "", "editable", "", 3, "dao", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "hasDelete", "multiselectMenu", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "clear", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "programa_id", "required", "", 3, "size", "disabled", "control", "dao", "where", "metadata", "change"], ["programaSearch", ""], ["controlName", "nome_usuario", 3, "size", "label", "control", "placeholder"], ["controlName", "unidade_id", 3, "size", "control", "label", "labelInfo", "dao"], ["unidade", ""], ["class", "mt-2 mb-4", 4, "ngIf"], ["icon", "bi-person", 1, "text-center", 3, "template"], ["columnFoto", ""], [3, "title", "template"], ["columnUsuario", ""], [3, "title", "align", "template"], ["columnHabilitado", ""], ["columnLotacao", ""], ["columnPlanoTrabalho", ""], ["type", "options", 3, "dynamicButtons"], [3, "rows"], ["labelPosition", "left", "controlName", "habilitados", 3, "size", "label", "labelInfo", "control", "change"], [1, "mt-2", "mb-4"], [3, "url", "size", "hint"], [3, "icon", "label", "color"]],
    template: function ProgramaParticipantesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function ProgramaParticipantesComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ProgramaParticipantesComponent_toolbar_1_Template, 2, 4, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3)(4, "input-search", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("change", function ProgramaParticipantesComponent_Template_input_search_change_4_listener() {
          return ctx.onProgramaChange();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](7, "input-text", 6)(8, "input-search", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](10, ProgramaParticipantesComponent_div_10_Template, 4, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](11, "columns")(12, "column", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](13, ProgramaParticipantesComponent_ng_template_13_Template, 1, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](15, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](16, ProgramaParticipantesComponent_ng_template_16_Template, 5, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](18, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](19, ProgramaParticipantesComponent_ng_template_19_Template, 1, 3, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](21, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](22, ProgramaParticipantesComponent_ng_template_22_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](24, "column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](25, ProgramaParticipantesComponent_ng_template_25_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](27, "column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](28, "pagination", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](14);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](17);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](20);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](23);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dao", ctx.dao)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", false)("hasEdit", false)("hasDelete", false)("multiselectMenu", ctx.multiselectMenu);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("clear", ctx.filterClear.bind(ctx))("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("disabled", ctx.isModal ? "true" : undefined)("control", ctx.filter.controls.programa_id)("dao", ctx.programaDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](50, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction1"](48, _c1, ctx.auth.unidade.id)))("metadata", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](52, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("label", "Nome do " + ctx.lex.translate("usu\u00E1rio"))("control", ctx.filter.controls.nome_usuario)("placeholder", "Nome do " + ctx.lex.translate("usuario") + "...");
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.unidade_id)("label", ctx.lex.translate("Unidade ") + ctx.lex.translate("de lota\u00E7\u00E3o"))("labelInfo", "Se a op\u00E7\u00E3o TODOS estiver OFF, exibe apenas " + ctx.lex.translate("os usu\u00E1rios") + " habilitados lotados " + ctx.lex.translate("nessa unidade") + ". Se a op\u00E7\u00E3o TODOS estiver ON, exibe todos " + ctx.lex.translate("os usu\u00E1rios") + " lotados " + ctx.lex.translate("nessa unidade") + ", habilitados, desabilitados e inabilitados.")("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx.grid == null ? null : ctx.grid.filterRef == null ? null : ctx.grid.filterRef.collapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.lex.translate("Usu\u00E1rio"))("template", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.lex.translate("Habilitado"))("align", "center")("template", _r8);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.lex.translate("Lota\u00E7\u00E3o"))("template", _r10);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.lex.translate("Plano de Trabalho") + " ativo?")("align", "center")("template", _r12);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_9__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_10__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_11__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_12__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_13__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_14__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__.InputTextComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__.ProfilePictureComponent],
    styles: [".habilitado[_ngcontent-%COMP%] {\n  background: #198754;\n  border: 2px solid #1B5E20;\n}\n\n.desabilitado[_ngcontent-%COMP%] {\n  background: #dc3545;\n  border: 2px solid #B71C1C;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vcHJvZ3JhbWEvcHJvZ3JhbWEtcGFydGljaXBhbnRlcy9wcm9ncmFtYS1wYXJ0aWNpcGFudGVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksbUJBQUE7RUFDQSx5QkFBQTtBQUNKOztBQUVBO0VBQ0ksbUJBQUE7RUFDQSx5QkFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmhhYmlsaXRhZG8ge1xyXG4gICAgYmFja2dyb3VuZDogIzE5ODc1NDsgXHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMUI1RTIwXHJcbn1cclxuXHJcbi5kZXNhYmlsaXRhZG8ge1xyXG4gICAgYmFja2dyb3VuZDogI2RjMzU0NTsgXHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjQjcxQzFDXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 37743:
/*!********************************************************************!*\
  !*** ./src/app/modules/gestao/programa/programa-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaRoutingModule: () => (/* binding */ ProgramaRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./programa-form/programa-form.component */ 10997);
/* harmony import */ var _programa_list_programa_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./programa-list/programa-list.component */ 83769);
/* harmony import */ var _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./programa-participantes/programa-participantes.component */ 11950);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);








const routes = [{
  path: '',
  component: _programa_list_programa_list_component__WEBPACK_IMPORTED_MODULE_3__.ProgramaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Programas"
  }
}, {
  path: 'new',
  component: _programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_2__.ProgramaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Programa",
    modal: true
  }
}, {
  path: 'participantes',
  component: _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__.ProgramaParticipantesComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Participantes do Programa"
  }
}, {
  path: ':id/edit',
  component: _programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_2__.ProgramaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Programa",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_2__.ProgramaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Programa",
    modal: true
  }
}, {
  path: ':id/participantes',
  component: _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__.ProgramaParticipantesComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Participantes do Programa",
    modal: true
  }
}];
class ProgramaRoutingModule {
  static #_ = this.ɵfac = function ProgramaRoutingModule_Factory(t) {
    return new (t || ProgramaRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: ProgramaRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProgramaRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 57550:
/*!************************************************************!*\
  !*** ./src/app/modules/gestao/programa/programa.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaModule: () => (/* binding */ ProgramaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _programa_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./programa-routing.module */ 37743);
/* harmony import */ var _programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./programa-form/programa-form.component */ 10997);
/* harmony import */ var _programa_list_programa_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./programa-list/programa-list.component */ 83769);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./programa-participantes/programa-participantes.component */ 11950);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);








class ProgramaModule {
  static #_ = this.ɵfac = function ProgramaModule_Factory(t) {
    return new (t || ProgramaModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: ProgramaModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _programa_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgramaRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProgramaModule, {
    declarations: [_programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_1__.ProgramaFormComponent, _programa_list_programa_list_component__WEBPACK_IMPORTED_MODULE_2__.ProgramaListComponent, _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__.ProgramaParticipantesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _programa_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgramaRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=7550.js.map