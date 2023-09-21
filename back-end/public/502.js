"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[502],{

/***/ 32689:
/*!******************************************************************!*\
  !*** ./src/app/dao/unidade-integrante-atribuicao-dao.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeIntegranteAtribuicaoDaoService: () => (/* binding */ UnidadeIntegranteAtribuicaoDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class UnidadeIntegranteAtribuicaoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("UnidadeIntegranteAtribuicao", injector);
    this.injector = injector;
    this.searchFields = [];
  }
}
_class = UnidadeIntegranteAtribuicaoDaoService;
_class.ɵfac = function UnidadeIntegranteAtribuicaoDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 62857:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-form/unidade-form.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeFormComponent: () => (/* binding */ UnidadeFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ 20497);
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ 15316);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_unidade_integrante_atribuicao_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-integrante-atribuicao-dao.service */ 32689);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/expediente.model */ 22559);
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/unidade.model */ 53937);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_modules_uteis_notificacoes_notificacao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/modules/uteis/notificacoes/notificacao.service */ 22067);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ 66848);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
/* harmony import */ var _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../uteis/calendar-expediente/calendar-expediente.component */ 75007);
/* harmony import */ var _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../uteis/notificacoes/notificacoes-config/notificacoes-config.component */ 92739);

var _class;




























const _c0 = ["unidade_pai"];
const _c1 = ["cidade"];
const _c2 = ["gestor"];
const _c3 = ["gestorSubstituto"];
const _c4 = ["entidade"];
const _c5 = ["notificacoes"];
const _c6 = ["instituidora"];
function UnidadeFormComponent_tab_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "tab", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](1, "notificacoes-config", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("unidadeId", ctx_r8.entity.id.length ? ctx_r8.entity.id : "ADD")("entity", ctx_r8.entity)("disabled", ctx_r8.formDisabled);
  }
}
const _c7 = function (a2) {
  return ["entidade_id", "==", a2];
};
const _c8 = function (a0) {
  return [a0];
};
class UnidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['codigo', 'sigla', 'nome', 'cidade_id', 'entidade_id', 'unidade_pai_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Unidade") + ': ' + (entity?.sigla || "");
    };
    this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.EntidadeDaoService);
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.CidadeDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_8__.UsuarioDaoService);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_4__.PlanoTrabalhoDaoService);
    this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeIntegranteDaoService);
    this.integranteAtribuicaoDao = injector.get(src_app_dao_unidade_integrante_atribuicao_dao_service__WEBPACK_IMPORTED_MODULE_6__.UnidadeIntegranteAtribuicaoDaoService);
    this.notificacao = injector.get(src_app_modules_uteis_notificacoes_notificacao_service__WEBPACK_IMPORTED_MODULE_12__.NotificacaoService);
    this.modalWidth = 1200;
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.form = this.fh.FormBuilder({
      codigo: {
        default: ""
      },
      sigla: {
        default: ""
      },
      nome: {
        default: ""
      },
      path: {
        default: ""
      },
      cidade_id: {
        default: ""
      },
      uf: {
        default: ""
      },
      instituidora: {
        default: 0
      },
      atividades_arquivamento_automatico: {
        default: 1
      },
      distribuicao_forma_contagem_prazos: {
        default: "DIAS_UTEIS"
      },
      entrega_forma_contagem_prazos: {
        default: "HORAS_UTEIS"
      },
      notificacoes: {
        default: {}
      },
      etiquetas: {
        default: []
      },
      unidade_pai_id: {
        default: ""
      },
      entidade_id: {
        default: this.auth.unidade?.entidade_id
      },
      etiqueta_texto: {
        default: ""
      },
      etiqueta_icone: {
        default: null
      },
      etiqueta_cor: {
        default: null
      },
      expediente24: {
        default: true
      },
      expediente: {
        default: null
      },
      usar_expediente_entidade: {
        default: false
      },
      texto_complementar_plano: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formGestor = this.fh.FormBuilder({
      gestor_id: {
        default: ""
      },
      gestor_substituto_id: {
        default: ""
      }
    }, this.cdRef);
    this.join = ["cidade", "entidade", "gestor.usuario:id,nome", "gestor_substituto.usuario:id,nome", "notificacoes_templates", "gestor.gestor:id", "gestor_substituto.gestor_substituto:id"];
  }
  get is24hrs() {
    return this.form?.controls.expediente24.value ? "" : undefined;
  }
  onUsarExpedienteEntidadeChange() {
    this.form.controls.expediente.setValue(this.form.controls.usar_expediente_entidade.value ? null : this.form.controls.expediente.value || new src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_9__.Expediente());
  }
  addItemHandle() {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.etiqueta_texto.value,
        color: this.form.controls.etiqueta_cor.value,
        icon: this.form.controls.etiqueta_icone.value
      };
      this.form.controls.etiqueta_texto.setValue("");
      this.form.controls.etiqueta_icone.setValue(null);
      this.form.controls.etiqueta_cor.setValue(null);
    }
    return result;
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      yield Promise.all([_this.unidadePai.loadSearch(entity.unidade_pai || entity.unidade_pai_id), _this.cidade.loadSearch(entity.cidade || entity.cidade_id), _this.gestor.loadSearch(entity?.gestor?.usuario || entity.gestor?.usuario.id), _this.gestorSubstituto.loadSearch(entity?.gestor_substituto?.usuario || entity.gestor_substituto?.usuario.id), _this.entidade.loadSearch(entity.entidade || entity.entidade_id)]);
      _this.form.patchValue(_this.util.fillForm(formValue, {
        ...entity,
        ...{}
      }));
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade({
      entidade_id: this.auth.unidade?.entidade_id,
      entidade: this.auth.unidade?.entidade
    });
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this2 = this;
    return new Promise((resolve, reject) => {
      this.notificacoes.saveData();
      let unidade = this.util.fill(new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade(), this.entity);
      unidade = this.util.fillForm(unidade, this.form.value);
      unidade.notificacoes = this.entity.notificacoes;
      let salvarGestor = !!this.formGestor.controls.gestor_id?.value && (!this.entity?.gestor?.id.length || !!this.entity?.gestor?.id.length && this.entity?.gestor?.usuario?.id != this.formGestor.controls.gestor_id?.value);
      let salvarGestorSubstituto = !!this.formGestor.controls.gestor_substituto_id?.value && (!this.entity?.gestor_substituto?.id.length || !!this.entity?.gestor_substituto?.id.length && this.entity?.gestor_substituto?.usuario?.id != this.formGestor.controls.gestor_substituto_id?.value);
      let apagarGestor = !this.formGestor.controls.gestor_id?.value && !!this.entity?.gestor?.id.length;
      let apagarGestorSubstituto = !this.formGestor.controls.gestor_substituto_id?.value && !!this.entity?.gestor_substituto?.id.length;
      this.dao?.save(unidade, ["gestor.gestor:id", "gestor_substituto.gestor_substituto:id"]).then( /*#__PURE__*/function () {
        var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unidade) {
          _this2.entity = unidade;
          if (salvarGestor) yield _this2.integranteDao.saveIntegrante([{
            'unidade_id': _this2.entity.id,
            'usuario_id': _this2.formGestor.controls.gestor_id.value,
            'atribuicoes': ["GESTOR"]
          }]);
          if (salvarGestorSubstituto) yield _this2.integranteDao.saveIntegrante([{
            'unidade_id': _this2.entity.id,
            'usuario_id': _this2.formGestor.controls.gestor_substituto_id.value,
            'atribuicoes': ["GESTOR_SUBSTITUTO"]
          }]);
          if (apagarGestor) yield _this2.integranteAtribuicaoDao.delete(_this2.entity?.gestor.gestor.id);
          if (apagarGestorSubstituto) yield _this2.integranteAtribuicaoDao.delete(_this2.entity?.gestor_substituto.gestor_substituto.id);
          resolve(true);
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  }
  onChangeInstituidora() {}
}
_class = UnidadeFormComponent;
_class.ɵfac = function UnidadeFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_26__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-unidade-form"]],
  viewQuery: function UnidadeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c6, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.unidadePai = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.gestor = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.gestorSubstituto = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.notificacoes = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.instituidora = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵInheritDefinitionFeature"]],
  decls: 42,
  vars: 56,
  consts: [["initialFocus", "codigo", 3, "title", "form", "disabled", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["labelClass", "text-nowrap", "controlName", "instituidora", 3, "size", "label", "labelInfo", "change"], ["instituidora", ""], ["label", "C\u00F3digo", "controlName", "codigo", "required", "", 3, "size"], ["label", "Sigla", "controlName", "sigla", "required", "", 3, "size"], ["label", "Nome", "controlName", "nome", "required", "", 3, "size"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "size", "emptyValue", "control", "dao"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "size", "emptyValue", "control", "dao"], ["gestorSubstituto", ""], ["controlName", "cidade_id", "required", "", 3, "size", "dao"], ["cidade", ""], ["controlName", "unidade_pai_id", "required", "", 3, "size", "label", "where", "dao"], ["unidade_pai", ""], ["disabled", "", "controlName", "entidade_id", "required", "", 3, "size", "dao"], ["entidade", ""], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["controlName", "distribuicao_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos para a distribui\u00E7\u00E3o (lan\u00E7amento da demanda).", 3, "size", "label", "items"], ["controlName", "entrega_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos na entrega da demanda (data da entrega e tempo despendido)", 3, "size", "label", "items"], ["label", "Arquivamento autom\u00E1tico", "controlName", "atividades_arquivamento_automatico", "labelInfo", "Se ap\u00F3s a avalia\u00E7\u00E3o, arquivar\u00E1 automaticamente a atividade.", 3, "size", "items"], ["clss", "row"], ["label", "Etiquetas", "multiselectStyle", "inline", "controlName", "etiquetas", 3, "maxItemWidth", "size", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size"], ["label", "\u00CDcone", "controlName", "etiqueta_icone", 3, "size", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size"], ["controlName", "texto_complementar_plano", 3, "label", "dataset"], ["key", "EXPEDIENTE", "label", "Expediente"], ["labelPosition", "right", "icon", "bi bi-check2", "controlName", "usar_expediente_entidade", "labelInfo", "Se utiliza o expediente configurado na entidade ao inv\u00E9s de especificar na unidade", 3, "label", "size", "change"], ["usarExpedienteEntidade", ""], [3, "disabled", "expedienteDisabled", "control"], ["expediente", ""], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es", 4, "ngIf"], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [3, "unidadeId", "entity", "disabled"], ["notificacoes", ""]],
  template: function UnidadeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("submit", function UnidadeFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function UnidadeFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3)(4, "input-switch", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_4_listener() {
        return ctx.onChangeInstituidora();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](6, "input-text", 6)(7, "input-text", 7)(8, "input-text", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](9, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](10, "input-search", 9, 10)(12, "input-search", 11, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](14, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](15, "input-search", 13, 14)(17, "input-search", 15, 16)(19, "input-search", 17, 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](21, "tab", 19)(22, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](23, "input-select", 20)(24, "input-select", 21)(25, "input-radio", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](26, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](27, "div", 23)(28, "input-multiselect", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](29, "input-text", 25)(30, "input-select", 26)(31, "input-color", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](32, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](33, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](34, "input-editor", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](35, "tab", 29)(36, "div", 3)(37, "input-switch", 30, 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_37_listener() {
        return ctx.onUsarExpedienteEntidadeChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](39, "calendar-expediente", 32, 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](41, UnidadeFormComponent_tab_41_Template, 3, 3, "tab", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 1)("label", _r0.value ? "Instit." : "Exec.")("labelInfo", "Se a " + ctx.lex.noun("unidade") + " \u00E9 instituidora ou executora de Programas.");
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.formGestor.controls.gestor_id)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 6)("emptyValue", null)("control", ctx.formGestor.controls.gestor_substituto_id)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("dao", ctx.cidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Unidade") + " pai")("where", _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpureFunction1"](54, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpureFunction1"](52, _c7, ctx.form.controls.entidade_id.value)))("dao", ctx.dao);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("dao", ctx.entidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.translate("Prazo de Distribui\u00E7\u00E3o"))("items", ctx.lookup.DIA_HORA_CORRIDOS_OU_UTEIS);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.translate("Prazo de Entrega"))("items", ctx.lookup.HORAS_CORRIDAS_OU_UTEIS);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 4)("items", ctx.lookup.SIMNAO);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("maxItemWidth", 250)("size", 12)("addItemHandle", ctx.addItemHandle.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ICONES);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("label", "Texto complementar " + ctx.lex.translate("Plano de Trabalho"))("dataset", ctx.planoDataset);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("label", "Usar o calend\u00E1rio " + ctx.lex.translate("entidade"))("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("disabled", ctx.form.controls.usar_expediente_entidade.value ? undefined : "true")("expedienteDisabled", ctx.entity == null ? null : ctx.entity.entidade == null ? null : ctx.entity.entidade.expediente)("control", ctx.form.controls.expediente);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.entity);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_27__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_14__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_15__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_16__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__.InputSelectComponent, _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_18__.InputColorComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_19__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_20__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_21__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_22__.SeparatorComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_23__.InputEditorComponent, _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_24__.CalendarExpedienteComponent, _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_25__.NotificacoesConfigComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 62498:
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-integrante/unidade-integrante.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeIntegranteComponent: () => (/* binding */ UnidadeIntegranteComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);

var _class;














function UnidadeIntegranteComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r0.entity == null ? null : ctx_r0.entity.nome);
  }
}
function UnidadeIntegranteComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 9)(1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "profile-picture", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "div", 12)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("url", row_r9.usuario_url_foto || "")("size", 40)("hint", row_r9.usuario_nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r9.usuario_nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r9.usuario_apelido || "");
  }
}
function UnidadeIntegranteComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-search", 13, 14);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("dao", ctx_r4.usuarioDao);
  }
}
function UnidadeIntegranteComponent_ng_template_9_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 17);
  }
  if (rf & 2) {
    const atribuicao_r14 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", ctx_r13.lookup.getColor(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r14 || ""))("icon", ctx_r13.lookup.getIcon(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r14 || ""))("label", ctx_r13.lookup.getValue(ctx_r13.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r14 || ""));
  }
}
function UnidadeIntegranteComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, UnidadeIntegranteComponent_ng_template_9_badge_1_Template, 1, 3, "badge", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r12.atribuicoes);
  }
}
function UnidadeIntegranteComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "input-multiselect", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input-select", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 8)("addItemHandle", ctx_r8.addItemHandle.bind(ctx_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("items", ctx_r8.lookup.UNIDADE_INTEGRANTE_TIPO);
  }
}
class UnidadeIntegranteComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
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
  set noPersist(value) {
    super.noPersist = value;
  }
  get noPersist() {
    return super.noPersist;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.items = [];
    this.tiposAtribuicao = [];
    this.usuariosJaVinculados = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeIntegranteDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: {
        default: ""
      },
      atribuicoes: {
        default: undefined
      },
      atribuicao: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    //this.unidadeId = this.urlParams?.has("idUnidade") ? this.urlParams!.get("idUnidade") : this.metadata?.idUnidade || this.unidadeId;
    //this.entity = this.unidade
    this.entity = this.metadata?.entity || this.entity;
    this.entity_id = this.metadata?.entity_id || this.entity_id;
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter(atribuicao => atribuicao.key != "LOTADO") : this.lookup.UNIDADE_INTEGRANTE_TIPO;
  }
  ngAfterViewInit() {
    var _this = this;
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData({}, _this.form);
    })();
  }
  /**
   * Método chamado na inicialização do componente para carregar todos os integrantes da unidade.
   * @param entity
   * @param form
   */
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.grid.loading = true;
      try {
        let result = yield _this2.integranteDao.loadIntegrantes(_this2.entity.id, "");
        _this2.items = result.integrantes.filter(x => x.atribuicoes.length > 0);
        _this2.unidade = result.unidade;
      } finally {
        _this2.grid.loading = false;
      }
      _this2.cdRef.detectChanges();
    })();
  }
  addIntegrante() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: _this3.integranteDao.generateUuid(),
        usuario_id: "",
        atribuicoes: []
      };
    })();
  }
  addItemHandle() {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
    const key = this.form.controls.atribuicao.value;
    if (value?.length && this.util.validateLookupItem(this.form.controls.atribuicoes.value, key)) {
      const icon = this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
      const color = this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
      result = {
        key: key,
        value: value,
        icon: icon,
        color: color
      };
      this.form.controls.atribuicao.setValue("");
    }
    return result;
  }
  /**
   * Método chamado na edição de um integrante da Unidade.
   * @param form
   * @param row
   */
  loadIntegrante(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.usuario_id.setValue(row.id);
      form.controls.atribuicoes.setValue(row.atribuicoes.map(x => Object.assign({}, {
        key: x,
        value: _this4.lookup.getValue(_this4.lookup.UNIDADE_INTEGRANTE_TIPO, x),
        icon: _this4.lookup.getIcon(_this4.lookup.UNIDADE_INTEGRANTE_TIPO, x),
        color: _this4.lookup.getColor(_this4.lookup.UNIDADE_INTEGRANTE_TIPO, x)
      })));
      form.controls.atribuicao.setValue("");
    })();
  }
  removeIntegrante(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      if (confirm) {
        _this5.loading = true;
        try {
          yield _this5.integranteDao.saveIntegrante([{
            'unidade_id': _this5.unidade.id,
            'usuario_id': row.id,
            'atribuicoes': []
          }]);
          yield _this5.loadData({}, _this5.form);
        } finally {
          _this5.loading = false;
        }
        return true;
      } else {
        return false;
      }
    })();
  }
  saveIntegrante(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (form.controls.atribuicoes.value.length) {
        _this6.loading = true;
        try {
          yield _this6.integranteDao.saveIntegrante([{
            'unidade_id': _this6.unidade.id,
            'usuario_id': form.controls.usuario_id.value,
            'atribuicoes': form.controls.atribuicoes.value.map(x => x.key)
          }]);
          yield _this6.loadData({}, _this6.form);
        } finally {
          _this6.loading = false;
        }
      }
      return undefined;
    })();
  }
}
_class = UnidadeIntegranteComponent;
_class.ɵfac = function UnidadeIntegranteComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-unidade-integrante"]],
  viewQuery: function UnidadeIntegranteComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    noPersist: "noPersist",
    entity_id: "entity_id"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 14,
  vars: 17,
  consts: [["editable", "", 3, "items", "minHeight", "form", "hasDelete", "add", "load", "remove", "save", "hasAdd", "hasEdit"], [4, "ngIf"], [3, "title", "template", "editTemplate"], ["columnUsuario", ""], ["editUsuario", ""], ["title", "Atribui\u00E7\u00F5es", "titleHint", "Atribui\u00E7\u00F5es do usu\u00E1rio nesta unidade", 3, "template", "editTemplate"], ["columnUnidadeDestino", ""], ["editUnidadeDestino", ""], ["type", "options"], [1, "row"], [1, "col-2"], [3, "url", "size", "hint"], [1, "col-10"], ["label", "", "icon", "", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], [1, "text-wrap", "width-min-content"], [3, "color", "icon", "label", 4, "ngFor", "ngForOf"], [3, "color", "icon", "label"], ["controlName", "atribuicoes", 3, "size", "addItemHandle"], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "atribuicao", 3, "size", "items"]],
  template: function UnidadeIntegranteComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, UnidadeIntegranteComponent_span_1_Template, 3, 1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "columns")(3, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, UnidadeIntegranteComponent_ng_template_4_Template, 9, 5, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, UnidadeIntegranteComponent_ng_template_6_Template, 2, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, UnidadeIntegranteComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, UnidadeIntegranteComponent_ng_template_11_Template, 2, 4, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](5);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](7);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.items)("minHeight", 500)("form", ctx.form)("hasDelete", true)("add", ctx.addIntegrante.bind(ctx))("load", ctx.loadIntegrante.bind(ctx))("remove", ctx.removeIntegrante.bind(ctx))("save", ctx.saveIntegrante.bind(ctx))("hasAdd", ctx.auth.hasPermissionTo("MOD_PRGT_PART_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_PRGT_PART_EDT"))("hasDelete", ctx.auth.hasPermissionTo("MOD_PRGT_PART_EXCL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.isNoPersist);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.translate("Usu\u00E1rio"))("template", _r1)("editTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r5)("editTemplate", _r7);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_7__.InputSearchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__.InputMultiselectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__.ProfilePictureComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 16589:
/*!************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-list-grid/unidade-list-grid.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeListGridComponent: () => (/* binding */ UnidadeListGridComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ 20497);
/* harmony import */ var src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/entidade-dao.service */ 15316);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/unidade.model */ 53937);
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
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;


















const _c0 = ["instituidora"];
function UnidadeListGridComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function UnidadeListGridComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "toolbar", 22);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("buttons", ctx_r1.buttons);
  }
}
function UnidadeListGridComponent_ng_template_14_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" ", row_r10.unidade.sigla, " ");
  }
}
function UnidadeListGridComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](2, UnidadeListGridComponent_ng_template_14_span_2_Template, 3, 1, "span", 24);
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](row_r10.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", row_r10.unidade);
  }
}
function UnidadeListGridComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](((row_r13.cidade == null ? null : row_r13.cidade.nome) || "") + "/" + ((row_r13.cidade == null ? null : row_r13.cidade.uf) || ""));
  }
}
function UnidadeListGridComponent_ng_template_21_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "badge", 30);
  }
}
function UnidadeListGridComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](1, UnidadeListGridComponent_ng_template_21_badge_1_Template, 1, 0, "badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](2, "badge", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", row_r14.instituidora);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("color", !row_r14.data_inativacao ? "success" : "danger")("icon", !row_r14.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle")("label", !row_r14.data_inativacao ? "Ativo" : "Inativo");
  }
}
class UnidadeListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_5__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.UnidadeDaoService);
    this.injector = injector;
    this.selectable = false;
    this.buttons = [];
    this.unidadesJaVinculadas = [];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      /* Se for selectable trás somente os inativos ou os não inativos, se não for então trás juntamente os inativos se form.inativos */
      result.push(this.selectable ? ["data_inativacao", form.inativos ? "!=" : "==", null] : ["inativos", "==", form.inativos]);
      if (form.entidade_id?.length) result.push(["entidade_id", "==", form.entidade_id]);
      if (form.nome?.length) result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
      if (form.instituidora) result.push(["instituidora", "==", 1]);
      if (this.unidadesJaVinculadas.length) result.push(["id", "not in", this.unidadesJaVinculadas]);
      return result;
    };
    this.join = ["cidade", "unidade_pai:id,sigla", "entidade:id,sigla", "gestor.usuario:id", "gestor_substituto.usuario:id"];
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.CidadeDaoService);
    this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.EntidadeDaoService);
    /* Inicializações */
    this.code = "MOD_CFG_UND";
    this.filter = this.fh.FormBuilder({
      entidade_id: {
        default: this.auth.unidade?.entidade_id
      },
      inativos: {
        default: false
      },
      instituidora: {
        default: false
      },
      nome: {
        default: ""
      }
    });
    this.groupBy = [{
      field: "entidade.sigla",
      label: "Entidade"
    }];
    // Testa se o usuário possui permissão unificar unidade
    if (this.auth.hasPermissionTo("MOD_UND_UNIR")) {
      this.buttons.push({
        icon: "bi bi-arrows-collapse",
        color: "btn-outline-danger",
        label: "Unificar",
        onClick: unidade => this.go.navigate({
          route: ['configuracoes', 'unidade', 'merge']
        }, this.modalRefresh())
      });
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.unidadesJaVinculadas = this.metadata?.unidadesJaVinculadas || this.unidadesJaVinculadas;
  }
  dynamicOptions(row) {
    var _this = this;
    let result = [];
    let unidade = row;
    // Testa se o usuário possui permissão para exibir dados da unidade
    if (this.auth.hasPermissionTo("MOD_UND_CONS")) result.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    // Testa se o usuário possui permissão de inativar a unidade
    if (this.auth.hasPermissionTo("MOD_UND_INATV")) result.push({
      icon: unidade.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle",
      label: unidade.data_inativacao ? 'Reativar' : 'Inativar',
      onClick: function () {
        var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unidade) {
          return yield _this.inativo(unidade, !unidade.data_inativacao);
        });
        return function onClick(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    });
    // Testa se o usuário possui permissão para gerenciar integrantes da unidade
    if (this.auth.hasPermissionTo("MOD_UND_INTG")) result.push({
      icon: "bi bi-people",
      label: "Integrantes",
      onClick: unidade => this.go.navigate({
        route: ['configuracoes', 'unidade', '', unidade.id, 'integrante']
      }, {
        metadata: {
          entity: row
        }
      })
    });
    // Testa se o usuário possui permissão para excluir unidade
    if (this.auth.hasPermissionTo("MOD_UND_EXCL")) result.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
    return result;
  }
  inativo(unidade, inativo) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this2.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar a unidade?" : "Deseja reativar a unidade?")) {
        try {
          _this2.submitting = true;
          yield _this2.dao.inativo(unidade.id, inativo);
          yield _this2.modalRefreshId(unidade).modalClose(undefined);
        } finally {
          _this2.submitting = false;
        }
      }
    })();
  }
  filterClear(filter) {
    super.filterClear(filter);
  }
}
_class = UnidadeListGridComponent;
_class.ɵfac = function UnidadeListGridComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_16__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["unidade-list-grid"]],
  viewQuery: function UnidadeListGridComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵloadQuery"]()) && (ctx.instituidora = _t.first);
    }
  },
  inputs: {
    selectable: "selectable",
    snapshot: "snapshot"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵInheritDefinitionFeature"]],
  decls: 25,
  vars: 34,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [3, "buttons", 4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["controlName", "entidade_id", 3, "size", "dao"], ["entidade", ""], ["labelClass", "text-nowrap", "controlName", "instituidora", 3, "size", "label", "control", "labelInfo"], ["instituidora", ""], ["label", "Nome", "controlName", "nome", "placeholder", "Nome ou sigla...", 3, "size", "control"], ["label", "Inativos", "controlName", "inativos", "labelInfo", "Se lista tamb\u00E9m as unidade inativas", 3, "size", "control"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "C\u00F3digo", "field", "codigo"], [3, "title", "template"], ["columnCidade", ""], ["title", "Situa\u00E7\u00E3o", 3, "template"], ["columnSituacao", ""], ["type", "options", 3, "onEdit", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-arrow-return-right"], [1, "one-per-line"], ["color", "primary", "icon", "bi bi-star", "label", "Instituidora", 4, "ngIf"], [3, "color", "icon", "label"], ["color", "primary", "icon", "bi bi-star", "label", "Instituidora"]],
  template: function UnidadeListGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](0, UnidadeListGridComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("select", function UnidadeListGridComponent_Template_grid_select_1_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](2, UnidadeListGridComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](5, "input-search", 5, 6)(7, "input-switch", 7, 8)(9, "input-text", 9)(10, "input-switch", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](11, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](12, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](14, UnidadeListGridComponent_ng_template_14_Template, 3, 2, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](16, "column", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, UnidadeListGridComponent_ng_template_18_Template, 2, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](20, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](21, UnidadeListGridComponent_ng_template_21_Template, 3, 4, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](23, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](24, "pagination", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](15);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](19);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵreference"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_UND_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_UND_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 4)("dao", ctx.entidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 2)("label", _r3.value ? "Instit." : "Exec.")("control", ctx.filter.controls.instituidora)("labelInfo", "Se lista SOMENTE as " + ctx.lex.noun("unidades") + " instituidoras de " + ctx.lex.noun("programa", true));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.inativos);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("title", ctx.lex.translate("Cidade"))("template", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_13__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_14__.InputTextComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 27557:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-list-map/unidade-list-map.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeListMapComponent: () => (/* binding */ UnidadeListMapComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/unidade.model */ 53937);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ 55397);
/* harmony import */ var ngx_scrollbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-scrollbar */ 84714);

var _class;







function UnidadeListMapComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const node_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](node_r1.label);
  }
}
class UnidadeListMapComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_2__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_1__.UnidadeDaoService);
    this.injector = injector;
    this.data = [];
    this.dao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_1__.UnidadeDaoService);
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.carregaUnidades();
  }
  carregaUnidades() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let minhaUnidade = _this.auth.usuario?.lotacao?.unidade_id;
      let unidades = yield _this.dao.hierarquiaUnidades(minhaUnidade);
      let caminhoAteARaiz = [];
      let unidadeAtualId = minhaUnidade;
      while (unidadeAtualId) {
        let unidadeAtual = unidades.find(x => x.id === unidadeAtualId);
        if (unidadeAtual) {
          caminhoAteARaiz.unshift(unidadeAtualId);
          unidadeAtualId = unidadeAtual.unidade_pai_id || undefined;
        } else {
          break;
        }
      }
      let filhos = unidadeId => {
        return unidades.filter(x => x.unidade_pai_id === unidadeId).map(x => ({
          type: 'unidade',
          label: x.sigla,
          expanded: minhaUnidade === x.id ? false : caminhoAteARaiz.includes(x.id),
          styleClass: minhaUnidade == x.id ? 'text-bg-primary' : '',
          data: {
            hint: x.nome,
            unidade: x
          },
          children: temFilhos(x.id) ? filhos(x.id) : [{
            type: 'fake',
            expanded: false,
            label: 'Carregando...'
          }]
        }));
      };
      let temFilhos = unidadeId => {
        return unidades.some(x => x.unidade_pai_id === unidadeId);
      };
      _this.data = filhos(null);
    })();
  }
  expandeUnidade(event) {
    this.carregaFilhas(event.node.data.unidade.id, event.node);
  }
  carregaFilhas(unidade_id, node) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let unidades = yield _this2.dao.unidadesFilhas(unidade_id);
      node.children = unidades.map(x => ({
        type: 'unidade',
        label: x.sigla,
        expanded: false,
        data: {
          unidade: x,
          hint: x.nome
        },
        children: [{
          type: 'fake',
          expanded: false,
          label: 'Carregando...'
        }]
      }));
    })();
  }
}
_class = UnidadeListMapComponent;
_class.ɵfac = function UnidadeListMapComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["unidade-mapa"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 1,
  consts: [["autoHeightDisabled", "false", "track", "all"], [1, "my-3"], [3, "value", "onNodeExpand"], ["pTemplate", "unidade"], [1, "font-bold"]],
  template: function UnidadeListMapComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ng-scrollbar", 0)(1, "div", 1)(2, "p-organizationChart", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("onNodeExpand", function UnidadeListMapComponent_Template_p_organizationChart_onNodeExpand_2_listener($event) {
        return ctx.expandeUnidade($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, UnidadeListMapComponent_ng_template_3_Template, 2, 1, "ng-template", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.data);
    }
  },
  dependencies: [primeng_organizationchart__WEBPACK_IMPORTED_MODULE_5__.OrganizationChart, primeng_api__WEBPACK_IMPORTED_MODULE_6__.PrimeTemplate, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_7__.NgScrollbar],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 76277:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-list/unidade-list.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeListComponent: () => (/* binding */ UnidadeListComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/unidade.model */ 53937);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _unidade_list_grid_unidade_list_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../unidade-list-grid/unidade-list-grid.component */ 16589);
/* harmony import */ var _unidade_list_map_unidade_list_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../unidade-list-map/unidade-list-map.component */ 27557);

var _class;











function UnidadeListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "unidade-list-grid", 4);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("selectable", ctx_r1.selectable)("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
  }
}
function UnidadeListComponent_tab_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "unidade-mapa");
  }
}
function UnidadeListComponent_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tab", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, UnidadeListComponent_tab_4_ng_template_1_Template, 1, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r3);
  }
}
class UnidadeListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_4__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      return result;
    };
    this.title = this.lex.translate("Unidades");
    this.code = "MOD_CFG_UND";
    this.filter = this.fh.FormBuilder({});
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.tabs.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }
  onSelectTab(tab) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.saveUsuarioConfig({
        active_tab: tab
      });
    })();
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }
}
_class = UnidadeListComponent;
_class.ɵfac = function UnidadeListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-unidade-list"]],
  viewQuery: function UnidadeListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__.TabsComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 4,
  consts: [["right", "", 3, "title", "select"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template", 4, "ngIf"], [3, "selectable", "snapshot"], ["key", "MAPA", "icon", "bi bi-card-heading", "label", "Mapa", 3, "template"], ["mapa", ""]],
  template: function UnidadeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, UnidadeListComponent_ng_template_2_Template, 1, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, UnidadeListComponent_tab_4_Template, 3, 1, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.selectable);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_6__.TabComponent, _unidade_list_grid_unidade_list_grid_component__WEBPACK_IMPORTED_MODULE_7__.UnidadeListGridComponent, _unidade_list_map_unidade_list_map_component__WEBPACK_IMPORTED_MODULE_8__.UnidadeListMapComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 63569:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-merge/unidade-merge.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeMergeComponent: () => (/* binding */ UnidadeMergeComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);

var _class;












const _c0 = ["unidadeOrigem"];
const _c1 = ["unidadeDestino"];
function UnidadeMergeComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r8.unidade_origem == null ? null : row_r8.unidade_origem.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"]("", (row_r8.unidade_origem == null ? null : row_r8.unidade_origem.codigo) || "", " - ", (row_r8.unidade_origem == null ? null : row_r8.unidade_origem.sigla) || "", "");
  }
}
const _c2 = function () {
  return ["inativo", "!=", null];
};
const _c3 = function (a0) {
  return [a0];
};
const _c4 = function () {
  return ["configuracoes", "unidade"];
};
const _c5 = function () {
  return {
    inativos: true
  };
};
const _c6 = function (a0) {
  return {
    filter: a0
  };
};
const _c7 = function (a0, a1) {
  return {
    route: a0,
    params: a1
  };
};
function UnidadeMergeComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-search", 12, 13);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("dao", ctx_r3.dao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](4, _c2)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction2"](11, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](7, _c4), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](9, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](8, _c5))));
  }
}
function UnidadeMergeComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((row_r11.unidade_destino == null ? null : row_r11.unidade_destino.nome) || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"]("", (row_r11.unidade_destino == null ? null : row_r11.unidade_destino.codigo) || "", " - ", (row_r11.unidade_destino == null ? null : row_r11.unidade_destino.sigla) || "", "");
  }
}
const _c8 = function () {
  return ["inativo", "==", null];
};
const _c9 = function () {
  return {
    inativos: false
  };
};
function UnidadeMergeComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-search", 14, 15);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("dao", ctx_r7.dao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](4, _c8)))("selectRoute", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction2"](11, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](7, _c4), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](9, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](8, _c9))));
  }
}
class UnidadeMergeComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.items = [];
    this.toolbarButtons = [{
      icon: "bi bi-yin-yang",
      label: "Mesma sigla",
      hint: "Unificar todos que tenham a mesma sigla. Sendo a inativa considerada como origem.",
      onClick: this.onMesmaSiglaClick.bind(this)
    }];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.dao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      exclui_origem: {
        default: false
      },
      origem_inativo: {
        default: true
      },
      unidade_origem_id: {
        default: ""
      },
      unidade_destino_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  onMesmaSiglaClick() {
    this.loading = true;
    this.dao.mesmaSigla().then(unidades => {
      let destinos = [];
      destinos = unidades.reduce((acumulador, valor) => {
        if (!valor.data_inativacao && !acumulador.find(x => x.sigla == valor.sigla)) acumulador.push(valor);
        return acumulador;
      }, destinos);
      let destinosIds = destinos.map(x => x.id);
      let origens = unidades.filter(x => !destinosIds.includes(x.id) && !!x.data_inativacao);
      let origensIds = origens.map(x => x.id);
      this.items = [];
      for (let origem of origens) {
        let destino = destinos.find(x => x.sigla == origem.sigla);
        if (destino) {
          this.items.push({
            id: this.dao.generateUuid(),
            unidade_origem_id: origem.id,
            unidade_destino_id: destino.id,
            unidade_origem: origem,
            unidade_destino: destino
          });
        }
      }
      /* Pegas as unidade que tem a Sigla repetida mas que não estão inativas */
      let error = [];
      for (let unidade of unidades) {
        if (!destinosIds.includes(unidade.id) && !origensIds.includes(unidade.id)) error.push(unidade.codigo + " - " + unidade.sigla + " - " + unidade.nome);
      }
      if (error.length) this.editableForm.error = (error.length == 1 ? "A unidade abaixo possui duplicidade de SIGLA, mas não está inativa:" : "As unidades abaixo possuem duplicidade de SIGLA, mas não estão inativas:") + "\n" + error.join("\n");
    }).finally(() => {
      this.loading = false;
    });
  }
  addMerge() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: _this.dao.generateUuid(),
        unidade_origem_id: "",
        unidade_destino_id: "",
        unidade_origem: undefined,
        unidade_destino: undefined
      };
    })();
  }
  loadMerge(form, row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.unidade_origem_id.setValue(row.unidade_origem_id);
      form.controls.unidade_destino_id.setValue(row.unidade_destino_id);
    })();
  }
  removeMerge(row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return true;
    })();
  }
  saveMerge(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      if (_this2.form.controls.unidade_origem_id.value?.length || _this2.form.controls.unidade_destino_id.value?.length) {
        row.unidade_origem_id = form.controls.unidade_origem_id.value;
        row.unidade_origem = _this2.unidadeOrigem?.selectedEntity || (yield _this2.dao?.getById(row.unidade_origem_id));
        row.unidade_destino_id = form.controls.unidade_destino_id.value;
        row.unidade_destino = _this2.unidadeDestino?.selectedEntity || (yield _this2.dao?.getById(row.unidade_destino_id));
        result = row;
      }
      return result;
    })();
  }
  onMerge() {
    let error = undefined;
    for (let row of this.items) error = error || (!row.unidade_origem_id?.length || !row.unidade_destino_id?.length ? "A origem e o destino precisam estar preenchidos em todos" : undefined);
    this.editableForm.error = error;
    if (!error?.length) {
      this.loading = true;
      this.dao.unificar(this.items.map(x => Object.assign({}, {
        unidade_origem_id: x.unidade_origem_id,
        unidade_destino_id: x.unidade_destino_id
      })), this.form.controls.exclui_origem.value).then(result => {
        if (result) this.close();
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
_class = UnidadeMergeComponent;
_class.ɵfac = function UnidadeMergeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-unidade-merge"]],
  viewQuery: function UnidadeMergeComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.unidadeOrigem = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.unidadeDestino = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 16,
  consts: [["confirmLabel", "Unificar", 3, "form", "title", "submit", "cancel"], ["type", "warning", "message", "Por motivos de seguran\u00E7a ser\u00E1 permitido somente unificar unidades inativas para unidade ativas. E caso [Exclui origem] n\u00E3o esteja habilitado, a unidade de origem continuar\u00E1 na lista (como inativa)."], [3, "buttons"], ["labelPosition", "left", "label", "Exclui origem", "controlName", "exclui_origem", 3, "size"], ["editable", "", 3, "items", "form", "add", "load", "remove", "save"], ["titleHint", "Unidade que ser\u00E1 substitu\u00EDda pela outra", 3, "title", "template", "editTemplate"], ["columnUnidadeOrigem", ""], ["editUnidadeOrigem", ""], ["titleHint", "Unidade que sobrar\u00E1 ap\u00F3s a unifica\u00E7\u00E3o", 3, "title", "template", "editTemplate"], ["columnUnidadeDestino", ""], ["editUnidadeDestino", ""], ["type", "options"], ["label", "", "icon", "", "controlName", "unidade_origem_id", 3, "size", "dao", "where", "selectRoute"], ["unidade_origem", ""], ["label", "", "icon", "", "controlName", "unidade_destino_id", 3, "size", "dao", "where", "selectRoute"], ["unidade_destino", ""]],
  template: function UnidadeMergeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function UnidadeMergeComponent_Template_editable_form_submit_0_listener() {
        return ctx.onMerge();
      })("cancel", function UnidadeMergeComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "top-alert", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "input-switch", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "grid", 4)(5, "columns")(6, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, UnidadeMergeComponent_ng_template_7_Template, 5, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, UnidadeMergeComponent_ng_template_9_Template, 2, 14, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, UnidadeMergeComponent_ng_template_12_Template, 5, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, UnidadeMergeComponent_ng_template_14_Template, 2, 14, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](16, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](8);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](10);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](13);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("add", ctx.addMerge.bind(ctx))("load", ctx.loadMerge.bind(ctx))("remove", ctx.removeMerge.bind(ctx))("save", ctx.saveMerge.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", ctx.lex.translate("Unidade") + " origem")("template", _r0)("editTemplate", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", ctx.lex.translate("Unidade") + " destino")("template", _r4)("editTemplate", _r6);
    }
  },
  dependencies: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__.InputSearchComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_10__.TopAlertComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 36275:
/*!*************************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeRoutingModule: () => (/* binding */ UnidadeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unidade-form/unidade-form.component */ 62857);
/* harmony import */ var _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unidade-list/unidade-list.component */ 76277);
/* harmony import */ var _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unidade-merge/unidade-merge.component */ 63569);
/* harmony import */ var _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unidade-integrante/unidade-integrante.component */ 62498);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [{
  path: '',
  component: _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__.UnidadeListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Unidades"
  }
}, {
  path: ':id/subordinadas',
  component: _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_3__.UnidadeListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Unidades subordinadas"
  }
}, {
  path: 'new',
  component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__.UnidadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Unidade",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__.UnidadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Unidade",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_2__.UnidadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Unidade",
    modal: true
  }
}, {
  path: ':id/:idUnidade/integrante',
  component: _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_5__.UnidadeIntegranteComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Integrantes da Unidade",
    modal: true
  }
}, {
  path: 'merge',
  component: _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_4__.UnidadeMergeComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Unificação",
    modal: true
  }
}];
class UnidadeRoutingModule {}
_class = UnidadeRoutingModule;
_class.ɵfac = function UnidadeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UnidadeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 89502:
/*!*****************************************************************!*\
  !*** ./src/app/modules/configuracoes/unidade/unidade.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnidadeModule: () => (/* binding */ UnidadeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _unidade_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unidade-routing.module */ 36275);
/* harmony import */ var _unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unidade-form/unidade-form.component */ 62857);
/* harmony import */ var _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unidade-list/unidade-list.component */ 76277);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unidade-merge/unidade-merge.component */ 63569);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-scrollbar */ 84714);
/* harmony import */ var _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unidade-integrante/unidade-integrante.component */ 62498);
/* harmony import */ var _unidade_list_grid_unidade_list_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unidade-list-grid/unidade-list-grid.component */ 16589);
/* harmony import */ var _unidade_list_map_unidade_list_map_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./unidade-list-map/unidade-list-map.component */ 27557);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;














class UnidadeModule {}
_class = UnidadeModule;
_class.ɵfac = function UnidadeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__.UteisModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _unidade_routing_module__WEBPACK_IMPORTED_MODULE_0__.UnidadeRoutingModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_12__.OrganizationChartModule, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__.NgScrollbarModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](UnidadeModule, {
    declarations: [_unidade_form_unidade_form_component__WEBPACK_IMPORTED_MODULE_1__.UnidadeFormComponent, _unidade_list_unidade_list_component__WEBPACK_IMPORTED_MODULE_2__.UnidadeListComponent, _unidade_merge_unidade_merge_component__WEBPACK_IMPORTED_MODULE_4__.UnidadeMergeComponent, _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_6__.UnidadeIntegranteComponent, _unidade_list_grid_unidade_list_grid_component__WEBPACK_IMPORTED_MODULE_7__.UnidadeListGridComponent, _unidade_list_map_unidade_list_map_component__WEBPACK_IMPORTED_MODULE_8__.UnidadeListMapComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__.UteisModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _unidade_routing_module__WEBPACK_IMPORTED_MODULE_0__.UnidadeRoutingModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_12__.OrganizationChartModule, ngx_scrollbar__WEBPACK_IMPORTED_MODULE_13__.NgScrollbarModule]
  });
})();

/***/ }),

/***/ 62560:
/*!*******************************************************************!*\
  !*** ./node_modules/primeng/fesm2022/primeng-icons-chevronup.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChevronUpIcon: () => (/* binding */ ChevronUpIcon)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 61861);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var primeng_baseicon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/baseicon */ 47086);

var _class;



class ChevronUpIcon extends primeng_baseicon__WEBPACK_IMPORTED_MODULE_1__.BaseIcon {}
_class = ChevronUpIcon;
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ChevronUpIcon, "\u0275fac", /* @__PURE__ */function () {
  let ɵ_class_BaseFactory;
  return function _class_Factory(t) {
    return (ɵ_class_BaseFactory || (ɵ_class_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](_class)))(t || _class);
  };
}());
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ChevronUpIcon, "\u0275cmp", /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["ChevronUpIcon"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
  decls: 2,
  vars: 5,
  consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z", "fill", "currentColor"]],
  template: function _class_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "svg", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "path", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.getClassNames());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
    }
  },
  encapsulation: 2
}));
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ChevronUpIcon, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Component,
    args: [{
      selector: 'ChevronUpIcon',
      standalone: true,
      imports: [primeng_baseicon__WEBPACK_IMPORTED_MODULE_1__.BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 29124:
/*!*********************************************************************!*\
  !*** ./node_modules/primeng/fesm2022/primeng-organizationchart.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrganizationChart: () => (/* binding */ OrganizationChart),
/* harmony export */   OrganizationChartModule: () => (/* binding */ OrganizationChartModule),
/* harmony export */   OrganizationChartNode: () => (/* binding */ OrganizationChartNode)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 61861);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ 66400);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ 55397);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 30240);
/* harmony import */ var primeng_icons_chevrondown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/icons/chevrondown */ 96167);
/* harmony import */ var primeng_icons_chevronup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/icons/chevronup */ 62560);
/* harmony import */ var primeng_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/dom */ 5163);

var _class, _class2, _class3;










const _c0 = ["pOrganizationChartNode", ""];
function _class_tbody_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.node.label);
  }
}
function _class_tbody_0_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
const _c1 = function (a0) {
  return {
    $implicit: a0
  };
};
function _class_tbody_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_tbody_0_div_5_ng_container_1_Template, 1, 0, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r2.chart.getTemplateForNode(ctx_r2.node))("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c1, ctx_r2.node));
  }
}
const _c2 = function () {
  return {
    display: "inline"
  };
};
function _class_tbody_0_a_6_ng_container_1_ChevronDownIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "ChevronDownIcon", 11);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("styleClass", "p-node-toggler-icon")("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](2, _c2));
  }
}
function _class_tbody_0_a_6_ng_container_1_ChevronUpIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "ChevronUpIcon", 11);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("styleClass", "p-node-toggler-icon")("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](2, _c2));
  }
}
function _class_tbody_0_a_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_tbody_0_a_6_ng_container_1_ChevronDownIcon_1_Template, 1, 3, "ChevronDownIcon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, _class_tbody_0_a_6_ng_container_1_ChevronUpIcon_2_Template, 1, 3, "ChevronUpIcon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r8.node.expanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r8.node.expanded);
  }
}
function _class_tbody_0_a_6_span_2_1_ng_template_0_Template(rf, ctx) {}
function _class_tbody_0_a_6_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, _class_tbody_0_a_6_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function _class_tbody_0_a_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_tbody_0_a_6_span_2_1_Template, 1, 0, null, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r9.chart.togglerIconTemplate)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c1, ctx_r9.node.expanded));
  }
}
function _class_tbody_0_a_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class_tbody_0_a_6_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r14.toggleNode($event, ctx_r14.node));
    })("keydown.enter", function _class_tbody_0_a_6_Template_a_keydown_enter_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r16.toggleNode($event, ctx_r16.node));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_tbody_0_a_6_ng_container_1_Template, 3, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, _class_tbody_0_a_6_span_2_Template, 2, 6, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r3.chart.togglerIconTemplate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.chart.togglerIconTemplate);
  }
}
function _class_tbody_0_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("colspan", ctx_r4.colspan);
  }
}
const _c3 = function (a0) {
  return {
    "p-organizationchart-line-top": a0
  };
};
function _class_tbody_0_ng_container_12_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\xA0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "td", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\xA0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const first_r19 = ctx.first;
    const last_r20 = ctx.last;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c3, !first_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c3, !last_r20));
  }
}
function _class_tbody_0_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class_tbody_0_ng_container_12_ng_template_1_Template, 4, 6, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.node.children);
  }
}
function _class_tbody_0_td_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "table", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const child_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", child_r21);
  }
}
const _c4 = function (a1, a2) {
  return {
    "p-organizationchart-node-content": true,
    "p-organizationchart-selectable-node": a1,
    "p-highlight": a2
  };
};
function _class_tbody_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tbody")(1, "tr")(2, "td")(3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function _class_tbody_0_Template_div_click_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.onNodeClick($event, ctx_r22.node));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, _class_tbody_0_div_4_Template, 2, 1, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, _class_tbody_0_div_5_Template, 2, 4, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, _class_tbody_0_a_6_Template, 3, 2, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "tr", 3)(8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "tr", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, _class_tbody_0_ng_container_11_Template, 3, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, _class_tbody_0_ng_container_12_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "tr", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, _class_tbody_0_td_14_Template, 2, 1, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("colspan", ctx_r0.colspan);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r0.node.styleClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](17, _c4, ctx_r0.chart.selectionMode && ctx_r0.node.selectable !== false, ctx_r0.isSelected()));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.chart.getTemplateForNode(ctx_r0.node));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.chart.getTemplateForNode(ctx_r0.node));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r0.leaf);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("colspan", ctx_r0.colspan);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.node.children && ctx_r0.node.children.length === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.node.children && ctx_r0.node.children.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.node.children);
  }
}
function _class2_table_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "table", 2);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("node", ctx_r0.root);
  }
}
const _c5 = function (a1) {
  return {
    "p-organizationchart p-component": true,
    "p-organizationchart-preservespace": a1
  };
};
class OrganizationChartNode {
  constructor(chart, cd) {
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cd", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "node", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "root", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "first", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "last", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "chart", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "subscription", void 0);
    this.cd = cd;
    this.chart = chart;
    this.subscription = this.chart.selectionSource$.subscribe(() => {
      this.cd.markForCheck();
    });
  }
  get leaf() {
    if (this.node) {
      return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    }
  }
  get colspan() {
    if (this.node) {
      return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
    }
  }
  onNodeClick(event, node) {
    this.chart.onNodeClick(event, node);
  }
  toggleNode(event, node) {
    node.expanded = !node.expanded;
    if (node.expanded) this.chart.onNodeExpand.emit({
      originalEvent: event,
      node: this.node
    });else this.chart.onNodeCollapse.emit({
      originalEvent: event,
      node: this.node
    });
    event.preventDefault();
  }
  isSelected() {
    return this.chart.isSelected(this.node);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
_class = OrganizationChartNode;
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChartNode, "\u0275fac", function _class_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"]((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => OrganizationChart)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
});
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChartNode, "\u0275cmp", /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["", "pOrganizationChartNode", ""]],
  hostAttrs: [1, "p-element"],
  inputs: {
    node: "node",
    root: "root",
    first: "first",
    last: "last"
  },
  attrs: _c0,
  decls: 1,
  vars: 1,
  consts: [[4, "ngIf"], [3, "ngClass", "click"], ["tabindex", "0", "class", "p-node-toggler", 3, "click", "keydown.enter", 4, "ngIf"], [1, "p-organizationchart-lines", 3, "ngClass"], [1, "p-organizationchart-line-down"], [1, "p-organizationchart-nodes", 3, "ngClass"], ["colspan", "2", 4, "ngFor", "ngForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "0", 1, "p-node-toggler", 3, "click", "keydown.enter"], ["class", "p-node-toggler-icon", 3, "ngStyle", 4, "ngIf"], [3, "styleClass", "ngStyle", 4, "ngIf"], [3, "styleClass", "ngStyle"], [1, "p-node-toggler-icon", 3, "ngStyle"], ["ngFor", "", 3, "ngForOf"], [1, "p-organizationchart-line-left", 3, "ngClass"], [1, "p-organizationchart-line-right", 3, "ngClass"], ["colspan", "2"], ["pOrganizationChartNode", "", 1, "p-organizationchart-table", 3, "node"]],
  template: function _class_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, _class_tbody_0_Template, 15, 20, "tbody", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.node);
    }
  },
  dependencies: function () {
    return [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle, primeng_icons_chevrondown__WEBPACK_IMPORTED_MODULE_3__.ChevronDownIcon, primeng_icons_chevronup__WEBPACK_IMPORTED_MODULE_4__.ChevronUpIcon, _class];
  },
  styles: [".p-organizationchart-table{border-spacing:0;border-collapse:separate;margin:0 auto}.p-organizationchart-table>tbody>tr>td{text-align:center;vertical-align:top;padding:0 .75rem}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{position:absolute;bottom:-.75rem;margin-left:-.75rem;z-index:2;left:50%;-webkit-user-select:none;user-select:none;cursor:pointer;width:1.5rem;height:1.5rem}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{margin:0 auto;height:20px;width:1px}.p-organizationchart-line-right,.p-organizationchart-line-left{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{visibility:hidden;display:inherit}\n"],
  encapsulation: 2,
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.trigger)('childState', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)(150)]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)('* => void', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)(150, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
      opacity: 0
    }))])])]
  }
}));
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OrganizationChartNode, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: '[pOrganizationChartNode]',
      template: `
        <tbody *ngIf="node">
            <tr>
                <td [attr.colspan]="colspan">
                    <div
                        [class]="node.styleClass"
                        [ngClass]="{ 'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false, 'p-highlight': isSelected() }"
                        (click)="onNodeClick($event, node)"
                    >
                        <div *ngIf="!chart.getTemplateForNode(node)">{{ node.label }}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </div>
                        <a *ngIf="!leaf" tabindex="0" class="p-node-toggler" (click)="toggleNode($event, node)" (keydown.enter)="toggleNode($event, node)">
                            <ng-container *ngIf="!chart.togglerIconTemplate">
                                <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-node-toggler-icon'" [ngStyle]="{ display: 'inline' }" />
                                <ChevronUpIcon *ngIf="!node.expanded" [styleClass]="'p-node-toggler-icon'" [ngStyle]="{ display: 'inline' }" />
                            </ng-container>
                            <span class="p-node-toggler-icon" *ngIf="chart.togglerIconTemplate" [ngStyle]="{ display: 'inline' }">
                                <ng-template *ngTemplateOutlet="chart.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                            </span>
                        </a>
                    </div>
                </td>
            </tr>
            <tr [ngClass]="!leaf && node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <td [attr.colspan]="colspan">
                    <div class="p-organizationchart-line-down"></div>
                </td>
            </tr>
            <tr [ngClass]="!leaf && node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [attr.colspan]="colspan">
                        <div class="p-organizationchart-line-down"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                        <td class="p-organizationchart-line-left" [ngClass]="{ 'p-organizationchart-line-top': !first }">&nbsp;</td>
                        <td class="p-organizationchart-line-right" [ngClass]="{ 'p-organizationchart-line-top': !last }">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngClass]="!leaf && node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-nodes" [@childState]="'in'">
                <td *ngFor="let child of node.children" colspan="2">
                    <table class="p-organizationchart-table" pOrganizationChartNode [node]="child"></table>
                </td>
            </tr>
        </tbody>
    `,
      animations: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.trigger)('childState', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        opacity: 1
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        opacity: 0
      }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)(150)]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)('* => void', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)(150, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        opacity: 0
      }))])])],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.Default,
      host: {
        class: 'p-element'
      },
      styles: [".p-organizationchart-table{border-spacing:0;border-collapse:separate;margin:0 auto}.p-organizationchart-table>tbody>tr>td{text-align:center;vertical-align:top;padding:0 .75rem}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{position:absolute;bottom:-.75rem;margin-left:-.75rem;z-index:2;left:50%;-webkit-user-select:none;user-select:none;cursor:pointer;width:1.5rem;height:1.5rem}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{margin:0 auto;height:20px;width:1px}.p-organizationchart-line-right,.p-organizationchart-line-left{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{visibility:hidden;display:inherit}\n"]
    }]
  }], function () {
    return [{
      type: OrganizationChart,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => OrganizationChart)]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }];
  }, {
    node: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    root: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    first: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    last: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }]
  });
})();
/**
 * OrganizationChart visualizes hierarchical organization data.
 * @group Components
 */
class OrganizationChart {
  /**
   * A single treenode instance or an array to refer to the selections.
   * @group Props
   */
  get selection() {
    return this._selection;
  }
  set selection(val) {
    this._selection = val;
    if (this.initialized) this.selectionSource.next(null);
  }
  /**
   * Callback to invoke on selection change.
   * @param {*} any - selected value.
   * @group Emits
   */

  constructor(el, cd) {
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "el", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cd", void 0);
    /**
     * An array of nested TreeNodes.
     * @group Props
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "value", void 0);
    /**
     * Inline style of the component.
     * @group Props
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "style", void 0);
    /**
     * Style class of the component.
     * @group Props
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "styleClass", void 0);
    /**
     * Defines the selection mode.
     * @group Props
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectionMode", void 0);
    /**
     * Whether the space allocated by a node is preserved when hidden.
     * @group Props
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "preserveSpace", true);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectionChange", new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
    /**
     * Callback to invoke when a node is selected.
     * @param {OrganizationChartNodeSelectEvent} event - custom node select event.
     * @group Emits
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onNodeSelect", new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
    /**
     * Callback to invoke when a node is unselected.
     * @param {OrganizationChartNodeUnSelectEvent} event - custom node unselect event.
     * @group Emits
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onNodeUnselect", new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
    /**
     * Callback to invoke when a node is expanded.
     * @param {OrganizationChartNodeExpandEvent} event - custom node expand event.
     * @group Emits
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onNodeExpand", new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
    /**
     * Callback to invoke when a node is collapsed.
     * @param {OrganizationChartNodeCollapseEvent} event - custom node collapse event.
     * @group Emits
     */
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onNodeCollapse", new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "templates", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "templateMap", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "togglerIconTemplate", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectionSource", new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject());
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_selection", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "initialized", void 0);
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectionSource$", this.selectionSource.asObservable());
    this.el = el;
    this.cd = cd;
  }
  get root() {
    return this.value && this.value.length ? this.value[0] : null;
  }
  ngAfterContentInit() {
    if (this.templates.length) {
      this.templateMap = {};
    }
    this.templates.forEach(item => {
      if (item.getType() === 'togglericon') {
        this.togglerIconTemplate = item.template;
      } else {
        this.templateMap[item.getType()] = item.template;
      }
    });
    this.initialized = true;
  }
  getTemplateForNode(node) {
    if (this.templateMap) return node.type ? this.templateMap[node.type] : this.templateMap['default'];else return null;
  }
  onNodeClick(event, node) {
    let eventTarget = event.target;
    if (eventTarget.className && (primeng_dom__WEBPACK_IMPORTED_MODULE_7__.DomHandler.hasClass(eventTarget, 'p-node-toggler') || primeng_dom__WEBPACK_IMPORTED_MODULE_7__.DomHandler.hasClass(eventTarget, 'p-node-toggler-icon'))) {
      return;
    } else if (this.selectionMode) {
      if (node.selectable === false) {
        return;
      }
      let index = this.findIndexInSelection(node);
      let selected = index >= 0;
      if (this.selectionMode === 'single') {
        if (selected) {
          this.selection = null;
          this.onNodeUnselect.emit({
            originalEvent: event,
            node: node
          });
        } else {
          this.selection = node;
          this.onNodeSelect.emit({
            originalEvent: event,
            node: node
          });
        }
      } else if (this.selectionMode === 'multiple') {
        if (selected) {
          this.selection = this.selection.filter((val, i) => i != index);
          this.onNodeUnselect.emit({
            originalEvent: event,
            node: node
          });
        } else {
          this.selection = [...(this.selection || []), node];
          this.onNodeSelect.emit({
            originalEvent: event,
            node: node
          });
        }
      }
      this.selectionChange.emit(this.selection);
      this.selectionSource.next(null);
    }
  }
  findIndexInSelection(node) {
    let index = -1;
    if (this.selectionMode && this.selection) {
      if (this.selectionMode === 'single') {
        index = this.selection == node ? 0 : -1;
      } else if (this.selectionMode === 'multiple') {
        for (let i = 0; i < this.selection.length; i++) {
          if (this.selection[i] == node) {
            index = i;
            break;
          }
        }
      }
    }
    return index;
  }
  isSelected(node) {
    return this.findIndexInSelection(node) != -1;
  }
}
_class2 = OrganizationChart;
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChart, "\u0275fac", function _class2_Factory(t) {
  return new (t || _class2)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
});
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChart, "\u0275cmp", /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class2,
  selectors: [["p-organizationChart"]],
  contentQueries: function _class2_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, primeng_api__WEBPACK_IMPORTED_MODULE_8__.PrimeTemplate, 4);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.templates = _t);
    }
  },
  hostAttrs: [1, "p-element"],
  inputs: {
    value: "value",
    style: "style",
    styleClass: "styleClass",
    selectionMode: "selectionMode",
    preserveSpace: "preserveSpace",
    selection: "selection"
  },
  outputs: {
    selectionChange: "selectionChange",
    onNodeSelect: "onNodeSelect",
    onNodeUnselect: "onNodeUnselect",
    onNodeExpand: "onNodeExpand",
    onNodeCollapse: "onNodeCollapse"
  },
  decls: 2,
  vars: 7,
  consts: [[3, "ngStyle", "ngClass"], ["class", "p-organizationchart-table", "pOrganizationChartNode", "", 3, "node", 4, "ngIf"], ["pOrganizationChartNode", "", 1, "p-organizationchart-table", 3, "node"]],
  template: function _class2_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, _class2_table_1_Template, 1, 1, "table", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.styleClass);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", ctx.style)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c5, ctx.preserveSpace));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.root);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle, OrganizationChartNode],
  encapsulation: 2
}));
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OrganizationChart, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'p-organizationChart',
      template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{ 'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace }">
            <table class="p-organizationchart-table" pOrganizationChartNode [node]="root" *ngIf="root"></table>
        </div>
    `,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.Default,
      host: {
        class: 'p-element'
      }
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }];
  }, {
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    style: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    styleClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    selectionMode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    preserveSpace: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    selection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    selectionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    onNodeSelect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    onNodeUnselect: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    onNodeExpand: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    onNodeCollapse: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    templates: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ContentChildren,
      args: [primeng_api__WEBPACK_IMPORTED_MODULE_8__.PrimeTemplate]
    }]
  });
})();
class OrganizationChartModule {}
_class3 = OrganizationChartModule;
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChartModule, "\u0275fac", function _class3_Factory(t) {
  return new (t || _class3)();
});
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChartModule, "\u0275mod", /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: _class3
}));
(0,_usr_src_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OrganizationChartModule, "\u0275inj", /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, primeng_icons_chevrondown__WEBPACK_IMPORTED_MODULE_3__.ChevronDownIcon, primeng_icons_chevronup__WEBPACK_IMPORTED_MODULE_4__.ChevronUpIcon, primeng_api__WEBPACK_IMPORTED_MODULE_8__.SharedModule, primeng_api__WEBPACK_IMPORTED_MODULE_8__.SharedModule]
}));
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OrganizationChartModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, primeng_icons_chevrondown__WEBPACK_IMPORTED_MODULE_3__.ChevronDownIcon, primeng_icons_chevronup__WEBPACK_IMPORTED_MODULE_4__.ChevronUpIcon, primeng_api__WEBPACK_IMPORTED_MODULE_8__.SharedModule],
      exports: [OrganizationChart, primeng_api__WEBPACK_IMPORTED_MODULE_8__.SharedModule],
      declarations: [OrganizationChart, OrganizationChartNode]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=502.js.map