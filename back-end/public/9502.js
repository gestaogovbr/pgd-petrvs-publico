"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[9502],{

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
    this.inputSearchConfig.searchFields = [];
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
/* harmony import */ var _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../unidade-integrante/unidade-integrante.component */ 62498);
/* harmony import */ var src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/models/unidade-integrante.model */ 83337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ 66848);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);
/* harmony import */ var _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../uteis/calendar-expediente/calendar-expediente.component */ 75007);
/* harmony import */ var _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../uteis/notificacoes/notificacoes-config/notificacoes-config.component */ 92739);

var _class;































const _c0 = ["unidade_pai"];
const _c1 = ["cidade"];
const _c2 = ["gestor"];
const _c3 = ["gestorSubstituto"];
const _c4 = ["entidade"];
const _c5 = ["notificacoes"];
function UnidadeFormComponent_tab_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "tab", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](1, "notificacoes-config", 39, 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("unidadeId", ctx_r7.entity.id.length ? ctx_r7.entity.id : "ADD")("entity", ctx_r7.entity)("disabled", ctx_r7.formDisabled);
  }
}
const _c6 = function (a2) {
  return ["entidade_id", "==", a2];
};
const _c7 = function (a0) {
  return [a0];
};
class UnidadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_11__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.injector = injector;
    this.unidade_raiz = false;
    this.informal = true;
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == 'unidade_pai_id' && !control.value?.length && !this.unidade_raiz) {
        result = "Obrigatório";
      }
      if (controlName == 'codigo' && !this.form?.controls.informal.value && !parseInt(control.value)) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      const erros_integrantes = [];
      this.usuariosIntegrantes?.grid?.items.forEach(usuarioIntegrante => {
        if (usuarioIntegrante.usuario_id == '') erros_integrantes.push({
          integrante: usuarioIntegrante,
          erro: 'Falta o usuario'
        });
      });
      if (erros_integrantes.length) return "Na aba 'Integrantes' há usuário não salvo. Salve-o antes de salvar a unidade!";
      return undefined;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Unidade") + ': ' + (entity?.sigla || "");
    };
    this.entidadeDao = injector.get(src_app_dao_entidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.EntidadeDaoService);
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.CidadeDaoService);
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
        default: false
      },
      informal: {
        default: true
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
      usar_expediente_unidade: {
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
    this.join = ["cidade", "entidade", "unidade_pai", "gestor.usuario:id,nome", "gestor_substituto.usuario:id,nome", "notificacoes_templates", "gestor.gestor:id", "gestor_substituto.gestor_substituto:id"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.informal = !!entity.informal;
      _this.cdRef.detectChanges();
      let formValue = Object.assign({}, form.value);
      _this.form.patchValue(_this.util.fillForm(formValue, entity));
      yield Promise.all([_this.unidadePai.loadSearch(entity.unidade_pai || entity.unidade_pai_id), _this.cidade.loadSearch(entity.cidade || entity.cidade_id), _this.gestor.loadSearch(entity?.gestor?.usuario || entity.gestor?.usuario.id), _this.gestorSubstituto.loadSearch(entity?.gestor_substituto?.usuario || entity.gestor_substituto?.usuario.id), _this.entidade.loadSearch(entity.entidade || entity.entidade_id)]);
      entity.etiquetas = entity.etiquetas || [];
      _this.form.controls.informal.setValue(entity.informal);
      _this.unidade_raiz = _this.action == 'edit' && !entity.unidade_pai_id;
      _this.form.controls.usar_expediente_unidade.setValue(entity.expediente ? true : false);
      _this.fh.revalidate(_this.form);
      yield _this.usuariosIntegrantes?.loadData(entity);
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade({
      entidade_id: this.auth.unidade?.entidade_id,
      entidade: this.auth.unidade?.entidade,
      informal: 1
    });
    this.loadData(this.entity, form);
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
  saveData(form) {
    var _this2 = this,
      _ref;
    return new Promise(function (_x, _x2) {
      return (_ref = _ref || (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        _this2.notificacoes.saveData();
        _this2.usuariosIntegrantes.grid.confirm();
        let unidade = _this2.util.fill(new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_10__.Unidade(), _this2.entity);
        unidade = _this2.util.fillForm(unidade, _this2.form.value);
        unidade.notificacoes = _this2.entity.notificacoes;
        unidade.notificacoes_templates = _this2.entity.notificacoes_templates;
        let salvarGestor = !!_this2.formGestor.controls.gestor_id?.value && (!_this2.entity?.gestor?.id.length || !!_this2.entity?.gestor?.id.length && _this2.entity?.gestor?.usuario?.id != _this2.formGestor.controls.gestor_id?.value);
        let salvarGestorSubstituto = !!_this2.formGestor.controls.gestor_substituto_id?.value && (!_this2.entity?.gestor_substituto?.id.length || !!_this2.entity?.gestor_substituto?.id.length && _this2.entity?.gestor_substituto?.usuario?.id != _this2.formGestor.controls.gestor_substituto_id?.value);
        let apagarGestor = !_this2.formGestor.controls.gestor_id?.value && !!_this2.entity?.gestor?.id.length;
        let apagarGestorSubstituto = !_this2.formGestor.controls.gestor_substituto_id?.value && !!_this2.entity?.gestor_substituto?.id.length;
        let integrantesConsolidados = _this2.usuariosIntegrantes?.items || [];
        if (!_this2.form.controls.usar_expediente_unidade) unidade.expediente = null;
        try {
          var _ref2;
          yield _this2.dao?.save(unidade, ["gestor.gestor:id", "gestor_substituto.gestor_substituto:id", "gestor_delegado.gestor_delegado:id"]).then(function (_x3) {
            return (_ref2 = _ref2 || (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unidadeBanco) {
              //this.entity = unidadeBanco;
              if (salvarGestor) yield _this2.integranteDao.saveIntegrante([Object.assign(new src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_14__.IntegranteConsolidado(), {
                'unidade_id': unidadeBanco.id,
                'usuario_id': _this2.formGestor.controls.gestor_id.value,
                'atribuicoes': ["GESTOR"]
              })]);
              if (salvarGestorSubstituto) yield _this2.integranteDao.saveIntegrante([Object.assign(new src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_14__.IntegranteConsolidado(), {
                'unidade_id': unidadeBanco.id,
                'usuario_id': _this2.formGestor.controls.gestor_substituto_id.value,
                'atribuicoes': ["GESTOR_SUBSTITUTO"]
              })]);
              if (apagarGestor) yield _this2.integranteAtribuicaoDao.delete(_this2.entity?.gestor.gestor.id);
              if (apagarGestorSubstituto) yield _this2.integranteAtribuicaoDao.delete(_this2.entity?.gestor_substituto.gestor_substituto.id);
              integrantesConsolidados.forEach(v => v.unidade_id = unidadeBanco.id);
              if (integrantesConsolidados.length) yield _this2.integranteDao.saveIntegrante(integrantesConsolidados);
            })).apply(this, arguments);
          });
          resolve(true);
        } catch (error) {
          if (_this2.editableForm) _this2.editableForm.error = error;
        }
      })).apply(this, arguments);
    });
  }
  onInformalChange(event) {
    this.informal = this.form.controls.informal.value;
    this.form.controls.codigo.setValue("");
    this.form.controls.instituidora.setValue(false);
    this.form.controls.codigo.updateValueAndValidity();
  }
  onUsarExpedienteEntidadeChange() {
    this.form.controls.expediente.setValue(this.form.controls.usar_expediente_unidade.value ? this.form.controls.expediente.value || new src_app_models_expediente_model__WEBPACK_IMPORTED_MODULE_9__.Expediente() : null);
  }
  get informalIsDisabled() {
    //return this.action != 'new' ? 'true' : undefined;
    return 'true';
  }
  get instituidoraIsDisabled() {
    return this.informal ? 'true' : undefined;
  }
  get codigoIsDisabled() {
    return !this.informal && this.action == 'new' ? undefined : 'true';
  }
  get unidadePaiIsDisabled() {
    return this.unidade_raiz || !this.informal && this.action == 'edit' ? 'true' : undefined;
  }
  get isDisabled() {
    return !this.informal && this.action == 'edit' ? 'true' : undefined;
  }
}
_class = UnidadeFormComponent;
_class.ɵfac = function UnidadeFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_28__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-unidade-form"]],
  viewQuery: function UnidadeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_13__.UnidadeIntegranteComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵviewQuery"](_c5, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.usuariosIntegrantes = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.unidadePai = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.cidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gestor = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.gestorSubstituto = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.entidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵloadQuery"]()) && (ctx.notificacoes = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵInheritDefinitionFeature"]],
  decls: 45,
  vars: 67,
  consts: [["initialFocus", "sigla", 3, "title", "form", "disabled", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], ["label", "Informal", "labelClass", "text-nowrap", "controlName", "informal", 3, "disabled", "size", "labelInfo", "change"], ["label", "Instit.", "labelClass", "text-nowrap", "controlName", "instituidora", 3, "disabled", "size", "labelInfo"], ["label", "C\u00F3digo", "controlName", "codigo", 3, "disabled", "size"], ["label", "Sigla", "controlName", "sigla", "required", "", 3, "disabled", "size"], ["label", "Nome", "controlName", "nome", "required", "", 3, "disabled", "size"], ["label", "Gestor", "controlName", "gestor_id", "labelInfo", "Respons\u00E1vel pela unidade", 3, "disabled", "size", "emptyValue", "control", "dao"], ["gestor", ""], ["label", "Gestor Substituto", "controlName", "gestor_substituto_id", "labelInfo", "Respons\u00E1vel substituto pela unidade", 3, "disabled", "size", "emptyValue", "control", "dao"], ["gestorSubstituto", ""], ["controlName", "cidade_id", "required", "", 3, "disabled", "size", "dao"], ["cidade", ""], ["controlName", "unidade_pai_id", 3, "disabled", "size", "label", "where", "dao"], ["unidade_pai", ""], ["disabled", "", "controlName", "entidade_id", "required", "", 3, "size", "dao"], ["entidade", ""], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["controlName", "distribuicao_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos para a distribui\u00E7\u00E3o (lan\u00E7amento da demanda).", 3, "size", "label", "items"], ["controlName", "entrega_forma_contagem_prazos", "labelInfo", "A forma da contagem dos prazos na entrega da demanda (data da entrega e tempo despendido)", 3, "size", "label", "items"], ["label", "Arquivamento autom\u00E1tico", "controlName", "atividades_arquivamento_automatico", "labelInfo", "Se ap\u00F3s a avalia\u00E7\u00E3o, arquivar\u00E1 automaticamente a atividade.", 3, "size", "items"], ["clss", "row"], ["label", "Etiquetas", "multiselectStyle", "inline", "controlName", "etiquetas", 3, "maxItemWidth", "size", "addItemHandle"], ["label", "Texto", "controlName", "etiqueta_texto", 3, "size"], ["label", "\u00CDcone", "controlName", "etiqueta_icone", 3, "size", "items"], ["label", "Cor", "controlName", "etiqueta_cor", 3, "size"], ["controlName", "texto_complementar_plano", 3, "label", "dataset"], ["key", "EXPEDIENTE", "label", "Expediente"], ["labelPosition", "right", "icon", "bi bi-check2", "controlName", "usar_expediente_unidade", 3, "label", "size", "labelInfo", "change"], ["usarExpedienteEntidade", ""], [3, "disabled", "expedienteDisabled", "control"], ["expediente", ""], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es", 4, "ngIf"], ["key", "INTEGRANTES", 3, "label"], ["noPersist", "", 3, "entity"], ["usuariosIntegrantes", ""], ["key", "NOTIFICACOES", "label", "Notifica\u00E7\u00F5es"], [3, "unidadeId", "entity", "disabled"], ["notificacoes", ""]],
  template: function UnidadeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("submit", function UnidadeFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function UnidadeFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3)(4, "input-switch", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_4_listener($event) {
        return ctx.onInformalChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](5, "input-switch", 5)(6, "input-text", 6)(7, "input-text", 7)(8, "input-text", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](9, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](10, "input-search", 9, 10)(12, "input-search", 11, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](14, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](15, "input-search", 13, 14)(17, "input-search", 15, 16)(19, "input-search", 17, 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](21, "tab", 19)(22, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](23, "input-select", 20)(24, "input-select", 21)(25, "input-radio", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](26, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](27, "div", 23)(28, "input-multiselect", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](29, "input-text", 25)(30, "input-select", 26)(31, "input-color", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](32, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](33, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](34, "input-editor", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](35, "tab", 29)(36, "div", 3)(37, "input-switch", 30, 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵlistener"]("change", function UnidadeFormComponent_Template_input_switch_change_37_listener() {
        return ctx.onUsarExpedienteEntidadeChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](39, "calendar-expediente", 32, 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵtemplate"](41, UnidadeFormComponent_tab_41_Template, 3, 3, "tab", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementStart"](42, "tab", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelement"](43, "unidade-integrante", 36, 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.informalIsDisabled)("size", 1)("labelInfo", "Definir se " + ctx.lex.translate("a unidade") + " \u00E9 informal ou n\u00E3o." + ctx.lex.translate(" Unidades") + " informais s\u00E3o, por exemplo: times volantes, comiss\u00F5es, grupos de trabalho, etc." + ctx.lex.translate(" Unidades") + " informais n\u00E3o podem mudar para formais, ou vice-versa.");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.instituidoraIsDisabled)("size", 1)("labelInfo", "Se a " + ctx.lex.translate("unidade") + " \u00E9 instituidora de Programas. Unidade administrativa prevista no art. 4\u00BA do Decreto n\u00BA 11.072, de 2022.");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.codigoIsDisabled)("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.isDisabled)("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.isDisabled)("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.isDisabled)("size", 6)("emptyValue", null)("control", ctx.formGestor.controls.gestor_id)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.isDisabled)("size", 6)("emptyValue", null)("control", ctx.formGestor.controls.gestor_substituto_id)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.isDisabled)("size", 4)("dao", ctx.cidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.unidadePaiIsDisabled)("size", 4)("label", ctx.lex.translate("Unidade") + " pai")("where", _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpureFunction1"](65, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpureFunction1"](63, _c6, ctx.form.controls.entidade_id.value)))("dao", ctx.dao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("dao", ctx.entidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.translate("Prazo de Distribui\u00E7\u00E3o"))("items", ctx.lookup.DIA_HORA_CORRIDOS_OU_UTEIS);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("label", "Contagem " + ctx.lex.translate("Prazo de Entrega"))("items", ctx.lookup.HORAS_CORRIDAS_OU_UTEIS);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 4)("items", ctx.lookup.SIMNAO);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("maxItemWidth", 250)("size", 12)("addItemHandle", ctx.addItemHandle.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ICONES);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", "Texto complementar " + ctx.lex.translate("Plano de Trabalho"))("dataset", ctx.planoDataset);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵpropertyInterpolate2"]("labelInfo", "Se o expediente da ", ctx.lex.translate("unidade"), " n\u00E3o for definido usaremos o da ", ctx.lex.translate("entidade"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", "Usar o calend\u00E1rio " + ctx.lex.translate("unidade"))("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("disabled", ctx.form.controls.usar_expediente_unidade.value ? undefined : "true")("expedienteDisabled", ctx.entity == null ? null : ctx.entity.entidade == null ? null : ctx.entity.entidade.expediente)("control", ctx.form.controls.expediente);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("ngIf", ctx.entity);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("label", ctx.lex.translate("Integrantes"));
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_28__["ɵɵproperty"]("entity", ctx.entity);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_15__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_16__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_17__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_18__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_19__.InputSelectComponent, _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_20__.InputColorComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_21__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_22__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_23__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_24__.SeparatorComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_25__.InputEditorComponent, _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_26__.CalendarExpedienteComponent, _uteis_notificacoes_notificacoes_config_notificacoes_config_component__WEBPACK_IMPORTED_MODULE_27__.NotificacoesConfigComponent, _unidade_integrante_unidade_integrante_component__WEBPACK_IMPORTED_MODULE_13__.UnidadeIntegranteComponent],
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
/* harmony import */ var src_app_services_integrante_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/integrante.service */ 27918);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);

var _class;















const _c0 = ["usuario"];
function UnidadeIntegranteComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"]("Unidade: " + (ctx_r1.entity == null ? null : ctx_r1.entity.nome));
  }
}
function UnidadeIntegranteComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 9)(1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "profile-picture", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div", 12)(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("url", row_r10.usuario_url_foto || "")("size", 40)("hint", row_r10.usuario_nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](row_r10.usuario_nome || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](row_r10.usuario_apelido || "");
  }
}
function UnidadeIntegranteComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-search", 13, 14);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx_r5.usuarioDao);
  }
}
function UnidadeIntegranteComponent_ng_template_10_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "badge", 16)(2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const atribuicao_r15 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", ctx_r14.lookup.getColor(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r15 || ""))("icon", ctx_r14.lookup.getIcon(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r15 || ""))("label", ctx_r14.lookup.getValue(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, atribuicao_r15 || ""));
  }
}
function UnidadeIntegranteComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, UnidadeIntegranteComponent_ng_template_10_div_0_Template, 3, 3, "div", 15);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", row_r13.atribuicoes);
  }
}
function UnidadeIntegranteComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "input-multiselect", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "input-select", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("addItemHandle", ctx_r9.addItemHandle.bind(ctx_r9))("deleteItemHandle", ctx_r9.deleteItemHandle.bind(ctx_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("items", ctx_r9.tiposAtribuicao);
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
    //public unidade?: Unidade;
    this.tiposAtribuicao = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) result = "Obrigatório";
      if (controlName == "usuario_id" && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-o, ao invés de incluí-lo novamente!";
      return result;
    };
    this.formValidation = form => {
      let atribuicoes = form.controls.atribuicoes.value;
      //if() result = ""; CONSTRUIR A CONDIÇÃO PARA CHECAR SE HÁ A ATRIBUIÇÃO DE MAIS DE UM GESTOR PARA O MESMO SERVIDOR NA MESMA UNIDADE
      return undefined;
    };
    this.integranteService = injector.get(src_app_services_integrante_service__WEBPACK_IMPORTED_MODULE_5__.IntegranteService);
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
    this.entity_id = this.metadata?.entity_id || this.entity?.id;
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter(atribuicao => !["GESTOR", "GESTOR_SUBSTITUTO"].includes(atribuicao.key)) : this.lookup.UNIDADE_INTEGRANTE_TIPO;
  }
  ngAfterViewInit() {
    var _this = this;
    (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.loadData({
        id: _this.entity_id
      }, _this.form);
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
      if (entity.id) {
        let integrantes = [];
        try {
          yield _this2.integranteDao.loadIntegrantes(entity.id, "").then(resposta => integrantes = resposta.integrantes.filter(x => x.atribuicoes?.length > 0));
        } finally {
          integrantes.forEach(i => _this2.items?.push(_this2.integranteService.completarIntegrante(i, entity.id, i.id, i.atribuicoes)));
          _this2.items = _this2.integranteService.ordenar(_this2.items);
          _this2.cdRef.detectChanges();
          _this2.grid.loading = false;
        }
      }
    })();
  }
  /**
   * Método chamado para inserir um integrante no grid, seja este componente persistente ou não.
   * @returns
   */
  addIntegrante() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let novo = {
        id: _this3.integranteDao.generateUuid(),
        usuario_id: "",
        atribuicoes: []
      };
      return novo;
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
      form.controls.usuario_id.setValue(_this4.grid?.adding ? row.usuario_id : row.id);
      form.controls.atribuicoes.setValue(_this4.integranteService.converterAtribuicoes(row.atribuicoes));
      form.controls.atribuicao.setValue("");
    })();
  }
  /**
   * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não.
   * @param row
   * @returns
   */
  removeIntegrante(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let nomeServidor = row.usuario_nome;
      let nomeUnidade = _this5.entity.nome;
      if (_this5.isNoPersist && row.atribuicoes.length == 1 && row.atribuicoes[0] == "LOTADO") {
        yield _this5.dialog.alert("IMPOSSÍVEL EXCLUIR !", "Um vínculo não pode ser excluído quando sua única atribuição é a lotação do servidor. Se quiser alterar sua lotação, defina-a em outra Unidade.");
      } else {
        let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor '" + nomeServidor + "' na unidade '" + nomeUnidade + "' ?");
        if (confirm) {
          let msg;
          try {
            if (!_this5.isNoPersist) {
              // se persistente
              _this5.loading = true;
              yield _this5.integranteDao.saveIntegrante([_this5.integranteService.completarIntegrante(row, _this5.entity.id, row.id, [])]).then(resposta => {
                if (msg = resposta.find(v => v._metadata.msg?.length)?._metadata.msg) {
                  if (_this5.grid) _this5.grid.error = msg;
                }
                ;
              });
              yield _this5.loadData({
                id: _this5.entity.id
              }, _this5.form);
            } else {
              // se não persistente
              Object.assign(row, {
                '_status': "DELETE",
                'atribuicoes': []
              });
              return false;
            }
          } finally {
            _this5.loading = false;
          }
          //return msg ? false : true;
        }
      }

      return false;
    })();
  }
  /**
   * Garante que não será possível excluir atribuições que possam gerar inconsistências
   * @param row Atribuição do servidor na unidade
   * @returns
   */
  deleteItemHandle(row) {
    return this.integranteService.permitidoApagar(row.key, this.isNoPersist);
  }
  /**
   * Método chamado no salvamento de um usuário-integrante (new/edit), seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
  saveIntegrante(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.atribuicoes.setValue(_this6.lookup.uniqueLookupItem(form.controls.atribuicoes.value));
      /*     if (this.grid) this.grid!.error = "";
      this.cdRef.detectChanges(); */
      let error = undefined;
      //error = this.formValidation(form);
      if (!error) {
        let confirm = true;
        let n = _this6.integranteService.alterandoGestor(form, row.atribuicoes || []);
        if (n.length) confirm = yield _this6.dialog.confirm("Confirma a Alteração de Gestor ?", n.length == 1 ? "O " + n[0] + " será alterado." : "Serão alterados: " + n.join(', ') + ".");
        if (form.controls.atribuicoes.value.length && confirm) {
          _this6.loading = true;
          try {
            let novasAtribuicoes = form.controls.atribuicoes.value.map(x => x.key);
            if (!_this6.isNoPersist) {
              // se persistente
              yield _this6.integranteDao.saveIntegrante([_this6.integranteService.completarIntegrante(row, _this6.entity.id, form.controls.usuario_id.value, novasAtribuicoes)]).then(resposta => {
                let msg;
                if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg) {
                  if (_this6.grid) _this6.grid.error = msg;
                }
                ;
              });
              yield _this6.loadData({
                id: _this6.entity.id
              }, _this6.form);
              if (_this6.grid) _this6.grid.error = "";
            } else {
              // se não persistente
              _this6.substituirItem(row, novasAtribuicoes);
              //            await this.loadData({ id: this.entity!.id }, this.form);
            }
          } catch (error) {
            if (_this6.grid) _this6.grid.error = error;
            yield _this6.loadData({
              id: _this6.entity.id
            }, _this6.form);
          } finally {
            _this6.loading = false;
          }
        }
      } else {
        if (_this6.grid) _this6.grid.error = "ATENÇÃO" + "&" + error;
        _this6.substituirItem(row, form.controls.atribuicoes.value.map(x => x.key));
      }
      return undefined;
    })();
  }
  substituirItem(row, atribuicoes) {
    let index = this.items.findIndex(x => x["id"] == row["id"]);
    this.items[index] = this.integranteService.completarIntegrante({
      id: row.id,
      usuario_apelido: this.usuario?.selectedItem?.entity.apelido,
      usuario_nome: this.usuario?.selectedItem?.entity.nome
    }, this.entity.id, this.form.controls.usuario_id.value, atribuicoes);
    this.cdRef.detectChanges();
  }
}
_class = UnidadeIntegranteComponent;
_class.ɵfac = function UnidadeIntegranteComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["unidade-integrante"]],
  viewQuery: function UnidadeIntegranteComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    noPersist: "noPersist"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 15,
  vars: 15,
  consts: [["editable", "", 3, "items", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["grid", ""], [4, "ngIf"], [3, "title", "template", "editTemplate"], ["columnUsuario", ""], ["editUsuario", ""], ["columnAtribuicoes", ""], ["editAtribuicoes", ""], ["type", "options"], [1, "d-flex"], [1, "ms-3"], [3, "url", "size", "hint"], [1, "flex-fill", "ms-3"], ["label", "", "icon", "", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], [4, "ngFor", "ngForOf"], [3, "color", "icon", "label"], ["controlName", "atribuicoes", 3, "size", "addItemHandle", "deleteItemHandle"], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "atribuicao", 3, "size", "items"]],
  template: function UnidadeIntegranteComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "grid", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, UnidadeIntegranteComponent_span_2_Template, 3, 1, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "columns")(4, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, UnidadeIntegranteComponent_ng_template_5_Template, 9, 5, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](7, UnidadeIntegranteComponent_ng_template_7_Template, 2, 2, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, UnidadeIntegranteComponent_ng_template_10_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, UnidadeIntegranteComponent_ng_template_12_Template, 2, 5, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](14, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](6);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](8);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](11);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("items", ctx.items)("minHeight", 500)("form", ctx.form)("hasDelete", true)("add", ctx.addIntegrante.bind(ctx))("load", ctx.loadIntegrante.bind(ctx))("remove", ctx.removeIntegrante.bind(ctx))("save", ctx.saveIntegrante.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isNoPersist);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.translate("Usu\u00E1rios"))("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.translate("Atribui\u00E7\u00F5es"))("template", _r6)("editTemplate", _r8);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__.InputSearchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_9__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_10__.InputMultiselectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_12__.ProfilePictureComponent],
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;

















const _c0 = ["instituidora"];
function UnidadeListGridComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h3", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function UnidadeListGridComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "toolbar", 20);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("buttons", ctx_r1.buttons);
  }
}
function UnidadeListGridComponent_ng_template_12_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", row_r9.unidade.sigla, " ");
  }
}
function UnidadeListGridComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, UnidadeListGridComponent_ng_template_12_span_2_Template, 3, 1, "span", 22);
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](row_r9.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r9.unidade);
  }
}
function UnidadeListGridComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r12 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](((row_r12.cidade == null ? null : row_r12.cidade.nome) || "") + "/" + ((row_r12.cidade == null ? null : row_r12.cidade.uf) || ""));
  }
}
function UnidadeListGridComponent_ng_template_19_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "badge", 28);
  }
}
function UnidadeListGridComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, UnidadeListGridComponent_ng_template_19_badge_1_Template, 1, 0, "badge", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "badge", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", row_r13.instituidora);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("color", !row_r13.data_inativacao ? "success" : "danger")("icon", !row_r13.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle")("label", !row_r13.data_inativacao ? "Ativo" : "Inativo");
  }
}
class UnidadeListGridComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_6__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_5__.Unidade, src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.UnidadeDaoService);
    this.injector = injector;
    this.selectable = false;
    this.buttons = [];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      /* Se for selectable trás somente os inativos ou os não inativos, se não for então trás juntamente os inativos se form.inativos */
      result.push(this.selectable ? ["data_inativacao", form.inativos ? "!=" : "==", null] : ["inativos", "==", form.inativos]);
      if (form.entidade_id?.length) result.push(["entidade_id", "==", form.entidade_id]);
      if (form.nome?.length) result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
      if (form.instituidora) result.push(["instituidora", "==", 1]);
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
    this.addOption(this.OPTION_INFORMACOES, "MOD_UND");
    this.addOption(this.OPTION_EXCLUIR, "MOD_UND_EXCL");
  }
  dynamicOptions(row) {
    var _this = this,
      _ref;
    let result = [];
    let unidade = row;
    // Testa se o usuário logado possui permissão de inativar a unidade do grid
    if (this.auth.hasPermissionTo("MOD_UND_INATV")) result.push({
      icon: unidade.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle",
      label: unidade.data_inativacao ? 'Reativar' : 'Inativar',
      onClick: function onClick(_x) {
        return (_ref = _ref || (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unidade) {
          return yield _this.inativo(unidade, !unidade.data_inativacao);
        })).apply(this, arguments);
      }
    });
    // Testa se o usuário logado possui permissão para gerenciar integrantes da unidade do grid
    if (this.auth.hasPermissionTo("MOD_UND_INTG")) result.push({
      label: "Integrantes",
      icon: "bi bi-people",
      onClick: unidade => this.go.navigate({
        route: ['configuracoes', 'unidade', '', unidade.id, 'integrante']
      }, {
        metadata: {
          entity_id: row.id
        }
      })
    });
    return result;
  }
  inativo(unidade, inativo) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this2.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar essa unidade (" + unidade.nome + ")?" : "Deseja reativar essa unidade (" + unidade.nome + ")?")) {
        try {
          _this2.submitting = true;
          yield _this2.dao.inativar(unidade.id, inativo);
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
  get labelInfoInativas() {
    return this.selectable ? 'Se lista só as unidades inativas' : 'Se lista também as unidades inativas';
  }
}
_class = UnidadeListGridComponent;
_class.ɵfac = function UnidadeListGridComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["unidade-list-grid"]],
  viewQuery: function UnidadeListGridComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.instituidora = _t.first);
    }
  },
  inputs: {
    selectable: "selectable",
    snapshot: "snapshot"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 23,
  vars: 34,
  consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [3, "buttons", 4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome ou sigla...", 3, "size", "control"], ["label", "Instit.", "labelClass", "text-nowrap", "controlName", "instituidora", 3, "size", "control", "labelInfo"], ["instituidora", ""], ["label", "Inativos", "controlName", "inativos", 3, "size", "control", "labelInfo"], ["title", "Sigla", "field", "sigla"], ["title", "Nome", "orderBy", "nome", 3, "template"], ["columnNome", ""], ["title", "C\u00F3digo", "field", "codigo"], [3, "title", "template"], ["columnCidade", ""], ["title", "Situa\u00E7\u00E3o", 3, "template"], ["columnSituacao", ""], ["type", "options", 3, "onEdit", "options", "dynamicOptions"], [3, "rows"], [1, "my-2"], [3, "buttons"], [1, "d-block"], ["class", "badge bg-light text-dark", 4, "ngIf"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-arrow-return-right"], [1, "one-per-line"], ["color", "primary", "icon", "bi bi-star", "label", "Instituidora", 4, "ngIf"], [3, "color", "icon", "label"], ["color", "primary", "icon", "bi bi-star", "label", "Instituidora"]],
  template: function UnidadeListGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, UnidadeListGridComponent_h3_0_Template, 2, 1, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function UnidadeListGridComponent_Template_grid_select_1_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, UnidadeListGridComponent_toolbar_2_Template, 1, 1, "toolbar", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "input-text", 5)(6, "input-switch", 6, 7)(8, "input-switch", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](9, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](12, UnidadeListGridComponent_ng_template_12_Template, 3, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](14, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, UnidadeListGridComponent_ng_template_16_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](18, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](19, UnidadeListGridComponent_ng_template_19_Template, 3, 4, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](21, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](22, "pagination", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](13);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](17);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.isModal);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_UND_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_UND_EDT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 5)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.instituidora)("labelInfo", "Se lista SOMENTE as " + ctx.lex.translate("unidades") + " instituidoras de " + ctx.lex.translate("programas"));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.inativos)("labelInfo", ctx.labelInfoInativas);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", ctx.lex.translate("Cidade"))("template", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("template", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options)("dynamicOptions", ctx.dynamicOptions.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_12__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_14__.BadgeComponent],
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
      if (_this.viewInit) _this.saveUsuarioConfig({
        active_tab: tab.key
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

/***/ })

}]);
//# sourceMappingURL=9502.js.map