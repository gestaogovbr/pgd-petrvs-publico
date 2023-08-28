"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[618],{

/***/ 22557:
/*!*******************************************************!*\
  !*** ./src/app/models/programa-participante.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgramaParticipante: () => (/* binding */ ProgramaParticipante)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProgramaParticipante extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.todos = false;
    this.habilitado = true; /* Se o participante está habilitado */
    this.programa_id = ""; /* Programa */
    this.usuario_id = ""; /* Usuario */
    this.initialization(data);
  }
}

/***/ }),

/***/ 90758:
/*!******************************************!*\
  !*** ./src/app/models/programa.model.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Programa: () => (/* binding */ Programa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Programa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Nome do programa */
    this.normativa = ""; /* Normativa que regula o programa */
    this.config = null; /* Configuração extra de programa */
    this.data_inicio = new Date(); /* Data de início vigência */
    this.data_fim = new Date(); /* Data de fim vigência */
    this.termo_obrigatorio = false; /* tinyint; NOT NULL; */
    this.prazo_max_plano_entrega = 365; /*Limite máximo de dias corridos para o plano de entregas (Zero para não limitar) */
    this.periodicidade_consolidacao = 'MENSAL'; /* Período para avaliação do plano de trabalho */
    this.periodicidade_valor = 1; /* Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante */
    this.dias_tolerancia_consolidacao = 10; /* Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação */
    this.dias_tolerancia_avaliacao = 20; /* Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão */
    this.nota_padrao_avaliacao = null; /* Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo */
    this.plano_trabalho_assinatura_participante = 1; /* Exigir assinatura do usuário no plano de trabalho */
    this.plano_trabalho_assinatura_gestor_lotacao = 0; /* Exigir assinatura do gestor da unidade de lotação do servidor */
    this.plano_trabalho_assinatura_gestor_unidade = 0; /* Exigir assinatura do gestor da unidade */
    this.plano_trabalho_assinatura_gestor_entidade = 0; /* Exigir assinatura do gestor da entidade */
    this.tipo_avaliacao_plano_trabalho_id = ""; /* Tipo de avaliação do plano de trabalho */
    this.tipo_avaliacao_plano_entrega_id = ""; /* Tipo de avaliação do plano de entrega */
    this.tipo_justificativa_id = null; /* Tipo de justificativa, para quando o gestor não realizar a avaliação dentro do prazo */
    this.unidade_id = ""; /* Unidade vinculada ao programa */
    this.template_tcr_id = null; /* Template do TCR */
    this.tipo_documento_tcr_id = null; /* Tipo de documento do TCR */
    this.initialization(data);
  }
}

/***/ }),

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);

var _class;




















const _c0 = ["unidade"];
const _c1 = ["tipoAvaliacao"];
function ProgramaFormComponent_input_select_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-select", 31);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx_r4.form.controls.periodicidade_valor)("items", ctx_r4.lookup.DIA_SEMANA);
  }
}
function ProgramaFormComponent_input_number_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-number", 32);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx_r5.form.controls.periodicidade_valor);
  }
}
function ProgramaFormComponent_input_number_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-number", 33);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx_r6.form.controls.periodicidade_valor);
  }
}
function ProgramaFormComponent_input_number_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-number", 34);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx_r7.form.controls.nota_padrao_avaliacao);
  }
}
function ProgramaFormComponent_input_select_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-select", 35);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx_r8.form.controls.nota_padrao_avaliacao)("items", ctx_r8.tipoAvaliacaoQualitativo);
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
      config: {
        default: null
      },
      data_inicio: {
        default: new Date()
      },
      data_fim: {
        default: new Date()
      },
      termo_obrigatorio: {
        default: false
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
      periodicidade_consolidacao: {
        default: 'MENSAL'
      },
      periodicidade_valor: {
        default: 1
      },
      dias_tolerancia_consolidacao: {
        default: 10
      },
      plano_trabalho_assinatura_participante: {
        default: true
      },
      plano_trabalho_assinatura_gestor_lotacao: {
        default: false
      },
      plano_trabalho_assinatura_gestor_unidade: {
        default: false
      },
      plano_trabalho_assinatura_gestor_entidade: {
        default: false
      },
      dias_tolerancia_avaliacao: {
        default: 10
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
}
_class = ProgramaFormComponent;
_class.ɵfac = function ProgramaFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_18__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-programa-form"]],
  viewQuery: function ProgramaFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.tipoAvaliacao = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵInheritDefinitionFeature"]],
  decls: 37,
  vars: 70,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row"], ["label", "Unidade Instituidora", "controlName", "unidade_id", 3, "size", "dao", "selectParams"], ["unidade", ""], ["date", "", "label", "Data de In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "data_inicio", "labelInfo", "Data de in\u00EDcio da vig\u00EAncia do programa de gest\u00E3o na unidade instituidora", 3, "size", "control"], ["date", "", "label", "Data de Fim", "icon", "bi bi-calendar-date", "controlName", "data_fim", "labelInfo", "Data de fim da vig\u00EAncia do programa de gest\u00E3o na unidade instituidora", 3, "size", "control"], ["label", "Dura\u00E7\u00E3o M\u00E1x P.E.", "icon", "bi bi-blockquote-left", "controlName", "prazo_max_plano_entrega", "labelInfo", "Limite m\u00E1ximo de dias corridos para a dura\u00E7\u00E3o do plano de entregas a partir da sua data de cria\u00E7\u00E3o (Zero para n\u00E3o limitar)", 3, "size", "control"], ["label", "T\u00EDtulo", "icon", "bi bi-textarea-t", "controlName", "nome", 3, "size", "control"], ["label", "Normativa", "icon", "bi bi-blockquote-left", "controlName", "normativa", "labelInfo", "Normativa que regula o Programa", 3, "size", "control"], [3, "title"], ["controlName", "tipo_avaliacao_plano_entrega_id", 3, "label", "size", "dao", "labelInfo"], ["tipoAvaliacao", ""], ["label", "Se o termo \u00E9 obrigat\u00F3rio", "controlName", "termo_obrigatorio", "scale", "small", "labelPosition", "right", 3, "size"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_participante", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_lotacao", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_unidade", 3, "size", "label"], ["scale", "small", "labelPosition", "right", "controlName", "plano_trabalho_assinatura_gestor_entidade", 3, "size", "label"], ["detailsButton", "", "labelInfo", "Template do termo utilizado no plano de trabalho", "controlName", "template_tcr_id", 3, "label", "size", "dao", "where", "selectRoute", "details"], ["controlName", "tipo_documento_tcr_id", "labelInfo", "Tipo de documento utilizado para exportar o termo para o SEI/SUPER", 3, "label", "size", "dao"], ["tipoDocumento", ""], ["controlName", "tipo_avaliacao_plano_trabalho_id", 3, "label", "size", "dao", "labelInfo"], ["label", "Periodicidade", "controlName", "periodicidade_consolidacao", "labelInfo", "Per\u00EDodo para avalia\u00E7\u00E3o do plano de trabalho", 3, "size", "control", "items"], ["label", "Dia da semana", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", "items", 4, "ngIf"], ["label", "Dia do m\u00EAs", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", 4, "ngIf"], ["label", "Qtd. de Dias", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", 4, "ngIf"], ["label", "Toler\u00E2ncia", "controlName", "dias_tolerancia_consolidacao", "labelInfo", "Dias de toler\u00E2ncia para o lan\u00E7amento do registro das atividades na consolida\u00E7\u00E3o, ap\u00F3s esses dias ser\u00E1 liberado automaticamente para avalia\u00E7\u00E3o", 3, "size", "control"], ["label", "Toler\u00E2ncia", "controlName", "dias_tolerancia_avaliacao", "labelInfo", "Dias de toler\u00E2ncia para realizar a avalia\u00E7\u00E3o, considerando a toler\u00E2ncia da consolida\u00E7\u00E3o. Caso seja zero n\u00E3o far\u00E1 nada, caso contr\u00E1rio ap\u00F3s esse prazo a consolida\u00E7\u00E3o ser\u00E1 automaticamente avaliada com a nota padr\u00E3o", 3, "size", "control"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", 4, "ngIf"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", "items", 4, "ngIf"], ["controlName", "tipo_justificativa_id", "labelInfo", "Tipo de justificativa, para quando o gestor n\u00E3o realizar a avalia\u00E7\u00E3o dentro do prazo", 3, "label", "size", "emptyValue", "dao"], ["tipoJustificativa", ""], ["label", "Dia da semana", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control", "items"], ["label", "Dia do m\u00EAs", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control"], ["label", "Qtd. de Dias", "controlName", "periodicidade_valor", "labelInfo", "Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do m\u00EAs para o restante", 3, "size", "control"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control"], ["label", "Nota", "labelInfo", "Nota que ser\u00E1 atribu\u00EDdo automaticamente caso a toler\u00E2ncia seja alcan\u00E7ada", 3, "size", "control", "items"]],
  template: function ProgramaFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("submit", function ProgramaFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function ProgramaFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](2, "input-search", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](4, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](5, "input-datetime", 4)(6, "input-datetime", 5)(7, "input-number", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](8, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](9, "input-text", 7)(10, "input-text", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](12, "input-search", 10, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](14, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](15, "input-switch", 12)(16, "input-switch", 13)(17, "input-switch", 14)(18, "input-switch", 15)(19, "input-switch", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](20, "input-search", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("details", function ProgramaFormComponent_Template_input_search_details_20_listener($event) {
        return ctx.templateService.details($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](21, "input-search", 18, 19)(23, "input-search", 20, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](25, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](26, "input-select", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](27, ProgramaFormComponent_input_select_27_Template, 1, 3, "input-select", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](28, ProgramaFormComponent_input_number_28_Template, 1, 2, "input-number", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](29, ProgramaFormComponent_input_number_29_Template, 1, 2, "input-number", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](30, "input-number", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](31, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](32, "input-number", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](33, ProgramaFormComponent_input_number_33_Template, 1, 2, "input-number", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](34, ProgramaFormComponent_input_select_34_Template, 1, 3, "input-select", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](35, "input-search", 29, 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("dao", ctx.unidadeDao)("selectParams", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](62, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](61, _c2)));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.data_fim);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.prazo_max_plano_entrega);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.normativa);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", "Configura\u00E7\u00F5es " + ctx.lex.translate("do Plano de entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o"))("size", 12)("dao", ctx.tipoAvaliacaoDao)("labelInfo", ctx.lex.noun("Tipo de avalia\u00E7\u00E3o") + " que especifica a forma que ser\u00E1 avaliado " + ctx.lex.noun("plano de trabalho") + " e " + ctx.lex.noun("plano de entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", "Configura\u00E7\u00F5es " + ctx.lex.translate("do Plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("label", "Exige assinatura " + ctx.lex.translate("do usu\u00E1rio") + ctx.lex.translate(" do plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor da lota\u00E7\u00E3o " + ctx.lex.translate("do usu\u00E1rio") + " (para " + ctx.lex.translate("unidade") + " distinta)");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("da unidade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("label", "Exige assinatura do gestor " + ctx.lex.translate("da entidade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", "Template " + ctx.lex.translate("termo") + " (TCR)")("size", 12)("dao", ctx.templateDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](65, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](64, _c4)))("selectRoute", ctx.templateService.selectRoute("TCR"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", "Tipo de documento " + ctx.lex.translate("termo"))("size", 12)("dao", ctx.tipoDocumentoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de avalia\u00E7\u00E3o"))("size", 12)("dao", ctx.tipoAvaliacaoDao)("labelInfo", ctx.lex.noun("Tipo de avalia\u00E7\u00E3o") + " que especifica a forma que ser\u00E1 avaliado " + ctx.lex.noun("plano de trabalho") + " e " + ctx.lex.noun("plano de entrega"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", ctx.lex.translate("Consolida\u00E7\u00E3o") + ctx.lex.translate(" do Plano de trablaho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.periodicidade_consolidacao)("items", ctx.lookup.PERIODICIDADE_CONSOLIDACAO);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](67, _c6).includes(ctx.form.controls.periodicidade_consolidacao.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](68, _c7).includes(ctx.form.controls.periodicidade_consolidacao.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](69, _c8).includes(ctx.form.controls.periodicidade_consolidacao.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.dias_tolerancia_consolidacao);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", ctx.lex.translate("Avalia\u00E7\u00E3o") + ctx.lex.translate(" da Consolida\u00E7\u00E3o") + ctx.lex.translate(" do Plano de trablaho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.dias_tolerancia_avaliacao);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.isTipoAvaliacao("QUANTITATIVO"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx.isTipoAvaliacao("QUALITATIVO"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de justificativa"))("size", 6)("emptyValue", null)("dao", ctx.tipoJustificativaDao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_14__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_16__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

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
var _class;














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
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome + "%"]);
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
    // Testa se o usuário possui permissão para excluir o programa de gestão
    if (this.auth.hasPermissionTo("MOD_PRGT_PART")) {
      this.options.push({
        icon: "bi bi-people",
        label: "Participantes",
        onClick: programa => this.go.navigate({
          route: ["gestao", "programa", programa.id, "participantes"]
        })
      });
    }
  }
}
_class = ProgramaListComponent;
_class.ɵfac = function ProgramaListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_programa_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProgramaDaoService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
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
  vars: 26,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "nome", 3, "size", "label", "control", "placeholder"], ["title", "T\u00EDtulo/Normativa", 3, "template"], ["columnTituloNormativa", ""], ["title", "Unidade instituidora", 3, "template"], ["columnUnidadeInstituidora", ""], ["title", "In\u00EDcio da Vig\u00EAncia", 3, "template"], ["columnInicioVigencia", ""], ["title", "Fim da Vig\u00EAncia", 3, "template"], ["columnFimVigencia", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
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
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("label", "Nome do " + ctx.lex.translate("programa"))("control", ctx.filter.controls.nome)("placeholder", "Nome do " + ctx.lex.translate("programa"));
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
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_programa_participante_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/programa-participante-dao.service */ 91042);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_programa_participante_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/programa-participante.model */ 22557);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);

var _class;


















const _c0 = ["usuario"];
function ProgramaParticipantesComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "toolbar")(1, "input-switch", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("change", function ProgramaParticipantesComponent_toolbar_1_Template_input_switch_change_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵresetView"](ctx_r14.grid.reloadFilter());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 3)("control", ctx_r0.filter.controls.todos);
  }
}
function ProgramaParticipantesComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "profile-picture", 19);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("url", row_r16.usuario == null ? null : row_r16.usuario.url_foto)("size", 40)("hint", row_r16.usuario == null ? null : row_r16.usuario.nome);
  }
}
function ProgramaParticipantesComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "profile-picture", 20);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("url", ctx_r5.usuario == null ? null : ctx_r5.usuario.selectedEntity == null ? null : ctx_r5.usuario.selectedEntity.url_foto)("size", 40);
  }
}
function ProgramaParticipantesComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](row_r18.usuario == null ? null : row_r18.usuario.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](row_r18.usuario == null ? null : row_r18.usuario.apelido);
  }
}
function ProgramaParticipantesComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "input-search", 21, 22);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("control", ctx_r9.form.controls.usuario_id)("dao", ctx_r9.usuarioDao);
  }
}
function ProgramaParticipantesComponent_ng_template_19_i_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 24);
  }
}
function ProgramaParticipantesComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](0, ProgramaParticipantesComponent_ng_template_19_i_0_Template, 1, 0, "i", 23);
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", row_r21.habilitado);
  }
}
function ProgramaParticipantesComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "input-switch", 25);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 12)("control", ctx_r13.form.controls.habilitado);
  }
}
class ProgramaParticipantesComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_programa_participante_model__WEBPACK_IMPORTED_MODULE_5__.ProgramaParticipante, src_app_dao_programa_participante_dao_service__WEBPACK_IMPORTED_MODULE_2__.ProgramaParticipanteDaoService);
    this.injector = injector;
    this.programaId = "";
    this.multiselectAllFields = ["usuario_id", "habilitado"];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (this.filter?.controls.todos.value) {
        result.push([["todos", '==', true]]);
      } else {
        result.push(["programa_id", "==", this.programaId]);
        if (form.nome?.length) result.push(["usuario.nome", "like", "%" + form.nome + "%"]);
        if (form.unidade_id?.length) result.push(["usuario.areas_trabalho.unidade.id", "==", form.unidade_id]);
      }
      return result;
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_4__.UsuarioDaoService);
    this.programaParticipanteService = injector.get(src_app_dao_programa_participante_dao_service__WEBPACK_IMPORTED_MODULE_2__.ProgramaParticipanteDaoService);
    /* Inicializações */
    this.code = "MOD_PRGT_PART";
    this.filter = this.fh.FormBuilder({
      unidade_id: {
        default: undefined
      },
      nome: {
        default: ""
      },
      todos: {
        default: false
      }
    });
    this.form = this.fh.FormBuilder({
      usuario_id: {
        default: undefined
      },
      habilitado: {
        default: true
      }
    });
    this.multiselectMenu = !this.auth.hasPermissionTo('MOD_PRGT_PART_INCL') ? [] : [{
      icon: "bi bi-check",
      label: "Habilitar",
      onClick: this.habilitarParticipantes.bind(this)
    }];
    this.join = ["usuario:id,nome,apelido,url_foto", "usuario.lotacao:id,nome,unidade_id"];
  }
  ngOnInit() {
    super.ngOnInit();
    this.programaId = this.urlParams?.get('id') || "";
  }
  addParticipante() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_programa_participante_model__WEBPACK_IMPORTED_MODULE_5__.ProgramaParticipante({
        id: _this.dao.generateUuid(),
        usuario_id: "",
        _status: "ADD"
      });
    })();
  }
  loadParticipante(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const selected = row;
      _this2.form.patchValue({
        usuario_id: selected?.usuario_id,
        habilitado: !!selected?.habilitado
      });
      _this2.cdRef.detectChanges();
    })();
  }
  removeParticipante(row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this3.dialog.confirm("Exclui ?", "Deseja remover o participante?");
      if (confirm) {
        yield _this3.dao.delete(row);
        return true;
      } else {
        return false;
      }
    })();
  }
  saveParticipante(form, item) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this4.form.markAllAsTouched();
      if (_this4.form.valid) {
        item.usuario_id = form.controls.usuario_id.value;
        item.habilitado = !!form.controls.habilitado.value;
        item.usuario = _this4.usuario?.selectedEntity;
        item.programa_id = _this4.programaId;
        _this4.submitting = true;
        try {
          result = yield _this4.dao.save(item);
          item.id = result.id;
          yield _this4.dao.notificar(item);
        } catch (error) {
          _this4.error(error.message ? error.message : error);
        } finally {
          _this4.submitting = false;
        }
        _this4.cdRef.detectChanges();
      }
      return result;
    })();
  }
  habilitarParticipantes() {
    if (!this.grid.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitção");
    } else {
      const self = this;
      this.dialog.confirm("Habilitar Participantes ?", "Deseja realmente habilitar os participantes?").then(confirm => {
        if (confirm) {
          this.dao.habilitar(Object.keys(this.grid.multiselected), this.programaId, 1).then(function () {
            self.dialog.alert("Sucesso", "Habilitado com sucesso!");
          }).catch(function (error) {
            self.dialog.alert("Erro", "Erro ao habilitar os participantes: " + error?.message ? error?.message : 0);
          });
        }
      });
    }
  }
}
_class = ProgramaParticipantesComponent;
_class.ɵfac = function ProgramaParticipantesComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-programa-participantes"]],
  viewQuery: function ProgramaParticipantesComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵInheritDefinitionFeature"]],
  decls: 25,
  vars: 34,
  consts: [["multiselect", "", "editable", "", 3, "dao", "form", "title", "orderBy", "groupBy", "join", "add", "load", "remove", "save", "selectable", "hasAdd", "hasEdit", "hasDelete", "multiselectMenu", "select"], [4, "ngIf"], [3, "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control", "placeholder"], ["controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["icon", "bi-person", 3, "align", "template", "editTemplate"], ["columnFoto", ""], ["editFoto", ""], ["title", "Usu\u00E1rio", 3, "template", "editTemplate"], ["columnUsuario", ""], ["editUsuario", ""], ["title", "Habilitado", 3, "template", "editTemplate"], ["columnHabilitado", ""], ["editHabilitado", ""], ["type", "options"], [3, "rows"], ["labelPosition", "left", "label", "Todos", "controlName", "todos", 3, "size", "control", "change"], [3, "url", "size", "hint"], [3, "url", "size"], ["label", "", "icon", "", 3, "size", "control", "dao"], ["usuario", ""], ["class", "bi bi-person-check", 4, "ngIf"], [1, "bi", "bi-person-check"], ["controlName", "habilitado", 3, "size", "control"]],
  template: function ProgramaParticipantesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function ProgramaParticipantesComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, ProgramaParticipantesComponent_toolbar_1_Template, 2, 2, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](4, "input-text", 4)(5, "input-search", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "columns")(8, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](9, ProgramaParticipantesComponent_ng_template_9_Template, 1, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](11, ProgramaParticipantesComponent_ng_template_11_Template, 1, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](14, ProgramaParticipantesComponent_ng_template_14_Template, 5, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](16, ProgramaParticipantesComponent_ng_template_16_Template, 2, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](18, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](19, ProgramaParticipantesComponent_ng_template_19_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](21, ProgramaParticipantesComponent_ng_template_21_Template, 1, 2, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](23, "column", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](24, "pagination", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](10);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](12);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](15);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](17);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](20);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dao", ctx.dao)("form", ctx.form)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("add", ctx.addParticipante.bind(ctx))("load", ctx.loadParticipante.bind(ctx))("remove", ctx.removeParticipante.bind(ctx))("save", ctx.saveParticipante.bind(ctx))("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PRGT_PART_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PRGT_PART_EDT"))("hasDelete", ctx.auth.hasPermissionTo("MOD_PRGT_PART_EXCL"))("multiselectMenu", ctx.multiselectMenu);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.nome)("placeholder", "Nome do " + ctx.lex.translate("usuario") + "...");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 6)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("align", "center")("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r10)("editTemplate", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__.InputTextComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_15__.ProfilePictureComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

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
var _class;








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
class ProgramaRoutingModule {}
_class = ProgramaRoutingModule;
_class.ɵfac = function ProgramaRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
});
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
var _class;








class ProgramaModule {}
_class = ProgramaModule;
_class.ɵfac = function ProgramaModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _programa_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgramaRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProgramaModule, {
    declarations: [_programa_form_programa_form_component__WEBPACK_IMPORTED_MODULE_1__.ProgramaFormComponent, _programa_list_programa_list_component__WEBPACK_IMPORTED_MODULE_2__.ProgramaListComponent, _programa_participantes_programa_participantes_component__WEBPACK_IMPORTED_MODULE_4__.ProgramaParticipantesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _programa_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgramaRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=618.js.map