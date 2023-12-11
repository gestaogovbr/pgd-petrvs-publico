"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[9242],{

/***/ 11180:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-form/usuario-form.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsuarioFormComponent: () => (/* binding */ UsuarioFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/usuario.model */ 26898);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../usuario-integrante/usuario-integrante.component */ 12479);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/unidade-integrante.model */ 83337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-editor/input-editor.component */ 55795);























class UsuarioFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_7__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__.Usuario, src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__.UsuarioDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id', 'unidade_lotacao_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
        result = "Inválido";
      } else if (['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      return result;
    };
    this.formValidation = form => {
      if (!this.formLotacao?.controls.unidade_lotacao_id.value?.length) {
        return "É obrigatória a definição da unidade de lotação do servidor!";
      }
      const erros_atribuicoes = [];
      this.unidadesIntegrantes?.grid?.items.forEach(unidadeIntegrante => {
        if (unidadeIntegrante.unidade_id == '') erros_atribuicoes.push({
          integrante: unidadeIntegrante,
          erro: 'Falta unidade_id'
        });
      });
      if (erros_atribuicoes.length) return "Na aba 'Atribuições' há unidade não salva. Salve-a antes de salvar o usuário!";
      return undefined;
    };
    this.titleEdit = entity => {
      return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.nome || "");
    };
    this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_2__.PerfilDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_4__.UnidadeDaoService);
    this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_9__.UnidadeIntegranteDaoService);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_3__.PlanoTrabalhoDaoService);
    this.form = this.fh.FormBuilder({
      email: {
        default: ""
      },
      nome: {
        default: ""
      },
      cpf: {
        default: ""
      },
      matricula: {
        default: ""
      },
      apelido: {
        default: ""
      },
      telefone: {
        default: ""
      },
      uf: {
        default: ""
      },
      sexo: {
        default: null
      },
      url_foto: {
        default: ""
      },
      texto_complementar_plano: {
        default: ""
      },
      perfil_id: {
        default: null
      },
      data_nascimento: {
        default: null
      }
    }, this.cdRef, this.validate);
    this.formLotacao = this.fh.FormBuilder({
      unidade_lotacao_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["lotacao.unidade:id"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
      _this.formLotacao.controls.unidade_lotacao_id.setValue(entity.lotacao?.unidade?.id);
      yield _this.unidadesIntegrantes?.loadData(entity);
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__.Usuario();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this2 = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (resolve, reject) {
        _this2.unidadesIntegrantes.grid.confirm();
        let usuario = _this2.util.fill(new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_6__.Usuario(), _this2.entity);
        usuario = _this2.util.fillForm(usuario, _this2.form.value);
        try {
          yield _this2.dao?.save(Object.assign(usuario, {
            'lotacao_id': _this2.formLotacao?.controls.unidade_lotacao_id.value
          })).then( /*#__PURE__*/function () {
            var _ref2 = (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (usuarioBanco) {
              usuario.lotacao_id = _this2.formLotacao?.controls.unidade_lotacao_id.value;
              let integrantesConsolidados = _this2.unidadesIntegrantes?.items || [];
              let indicesIntegrantesExcluir = [];
              integrantesConsolidados.filter(x => x._status == "DELETE").forEach((x, i) => indicesIntegrantesExcluir.push(i));
              let indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
              let lotacaoAlterada = indiceVinculoLotacao == -1 || usuario.lotacao_id != integrantesConsolidados[indiceVinculoLotacao].unidade_id;
              if (lotacaoAlterada) {
                // garantindo a coerência entre o campo de lotação do usuário e o vínculo de lotado dos integrantes
                if (indiceVinculoLotacao != -1) integrantesConsolidados[indiceVinculoLotacao].atribuicoes = integrantesConsolidados[indiceVinculoLotacao].atribuicoes.filter(x => x != "LOTADO");
                let indiceNovaUnidadeLotacao = integrantesConsolidados.findIndex(ic => ic.unidade_id == usuario.lotacao_id);
                indiceNovaUnidadeLotacao == -1 ? integrantesConsolidados.push(Object.assign(new src_app_models_unidade_integrante_model__WEBPACK_IMPORTED_MODULE_10__.IntegranteConsolidado(), {
                  unidade_id: usuario.lotacao_id,
                  usuario_id: usuarioBanco.id,
                  atribuicoes: ["LOTADO"]
                })) : integrantesConsolidados[indiceNovaUnidadeLotacao].atribuicoes.push("LOTADO");
                indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
              }
              // uma vez garantida a coerência entre o campo de lotação do usuário e o vínculo de lotado dos integrantes, vamos tratar do eventual vínculo a ser excluído 
              indicesIntegrantesExcluir.forEach(i => {
                integrantesConsolidados[i].atribuicoes = i != indiceVinculoLotacao ? [] : ["LOTADO"];
              });
              integrantesConsolidados.forEach(ic => ic.usuario_id = usuarioBanco.id);
              yield _this2.integranteDao.saveIntegrante(integrantesConsolidados);
            });
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          resolve(true);
        } catch (error) {
          if (_this2.editableForm) _this2.editableForm.error = error;
        }
      });
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  static #_ = this.ɵfac = function UsuarioFormComponent_Factory(t) {
    return new (t || UsuarioFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
    type: UsuarioFormComponent,
    selectors: [["app-usuario-form"]],
    viewQuery: function UsuarioFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_8__.UsuarioIntegranteComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.unidadesIntegrantes = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
    decls: 29,
    vars: 39,
    consts: [["initialFocus", "cpf", 3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [1, "row"], [1, "form-group", "col-md-3", "text-center"], [1, "mt-5", 3, "url", "size"], [1, "form-group", "col-md-9"], ["label", "CPF", "controlName", "cpf", "required", "", 3, "disabled", "size", "maskFormat"], ["label", "Matr\u00EDcula", "controlName", "matricula", "required", "", 3, "disabled", "size"], ["label", "E-mail", "controlName", "email", "textCase", "lower", "required", "", 3, "disabled", "size"], ["date", "", "label", "Nascimento", "noIcon", "", "controlName", "data_nascimento", 3, "size", "labelInfo"], ["label", "Nome", "controlName", "nome", "required", "", 3, "size"], ["label", "Apelido", "controlName", "apelido", "required", "", 3, "size"], ["label", "Perfil", "controlName", "perfil_id", "required", "", 3, "disabled", "size", "dao"], ["label", "Lota\u00E7\u00E3o", "controlName", "unidade_lotacao_id", "labelInfo", "Unidade de lota\u00E7\u00E3o do Usu\u00E1rio", "required", "", 3, "size", "emptyValue", "control", "dao"], ["lotacao", ""], ["label", "UF", "icon", "bi bi-flag", "controlName", "uf", 3, "size", "items"], ["label", "Sexo", "controlName", "sexo", 3, "size", "items"], ["label", "Telefone", "controlName", "telefone", 3, "size", "maskFormat"], ["key", "CONFIGURACOES", "label", "Configura\u00E7\u00F5es"], ["controlName", "texto_complementar_plano", 3, "label", "dataset"], ["key", "ATRIBUICOES", 3, "label"], ["noPersist", "", 3, "entity"], ["unidadesIntegrantes", ""]],
    template: function UsuarioFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function UsuarioFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function UsuarioFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](5, "profile-picture", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](6, "div", 6)(7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](8, "input-text", 7)(9, "input-text", 8)(10, "input-text", 9)(11, "input-datetime", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](13, "input-text", 11)(14, "input-text", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](16, "input-select", 13)(17, "input-search", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](20, "input-select", 16)(21, "input-radio", 17)(22, "input-text", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](23, "tab", 19)(24, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](25, "input-editor", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](26, "tab", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](27, "usuario-integrante", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("url", ctx.form.controls.url_foto.value)("size", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_CPF") ? "true" : undefined)("size", 3)("maskFormat", "000.000.000-00");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_MAT") ? "true" : undefined)("size", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_MAIL") ? "true" : undefined)("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("labelInfo", "Data de nascimento");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", !ctx.auth.hasPermissionTo("MOD_CFG_USER_PERFIL") ? "true" : undefined)("size", 4)("dao", ctx.perfilDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("emptyValue", null)("control", ctx.formLotacao.controls.unidade_lotacao_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("items", ctx.lookup.UF);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("items", ctx.lookup.SEXO);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", "Texto complementar " + ctx.lex.translate("Plano de Trabalho"))("dataset", ctx.planoDataset);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx.lex.translate("Atribui\u00E7\u00F5es"));
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("entity", ctx.entity);
      }
    },
    dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_13__.InputDatetimeComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_14__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__.InputSelectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_16__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_17__.TabComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__.ProfilePictureComponent, _components_input_input_editor_input_editor_component__WEBPACK_IMPORTED_MODULE_19__.InputEditorComponent, _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_8__.UsuarioIntegranteComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 12479:
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-integrante/usuario-integrante.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsuarioIntegranteComponent: () => (/* binding */ UsuarioIntegranteComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_services_integrante_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/integrante.service */ 27918);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
















const _c0 = ["unidade"];
function UsuarioIntegranteComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"]("Servidor: " + (ctx_r1.entity == null ? null : ctx_r1.entity.nome) + " - Matr\u00EDcula: " + (ctx_r1.entity == null ? null : ctx_r1.entity.matricula));
  }
}
function UsuarioIntegranteComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](row_r10.unidade_sigla || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" (IdServo: ", row_r10.unidade_codigo || "", ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", row_r10.unidade_nome || "", " ");
  }
}
function UsuarioIntegranteComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-search", 9, 10);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx_r5.unidadeDao);
  }
}
function UsuarioIntegranteComponent_ng_template_10_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "badge", 12)(2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const a_r15 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", ctx_r14.lookup.getColor(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, a_r15 || ""))("icon", ctx_r14.lookup.getIcon(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, a_r15 || ""))("label", ctx_r14.lookup.getValue(ctx_r14.lookup.UNIDADE_INTEGRANTE_TIPO, a_r15 || ""));
  }
}
function UsuarioIntegranteComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, UsuarioIntegranteComponent_ng_template_10_div_0_Template, 3, 3, "div", 11);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", row_r13.atribuicoes);
  }
}
function UsuarioIntegranteComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "input-multiselect", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "input-select", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("addItemHandle", ctx_r9.addItemHandle.bind(ctx_r9))("deleteItemHandle", ctx_r9.deleteItemHandle.bind(ctx_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("items", ctx_r9.tiposAtribuicao);
  }
}
class UsuarioIntegranteComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_4__.PageFrameBase {
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
    this.validate = (control, controlName) => {
      let result = null;
      if (["unidade_id", "atribuicoes"].includes(controlName) && !control.value?.length) {
        result = "Obrigatório";
      }
      if (controlName == "unidade_id" && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-a, ao invés de incluí-la novamente!";
      return result;
    };
    this.formValidation = form => {
      let atribuicoes = form.controls.atribuicoes.value;
      if (this.util.array_diff(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], atribuicoes.map(na => na.key) || []).length < 2) {
        return "A um mesmo servidor só pode ser atribuída uma função de gestor, para uma mesma Unidade!";
      }
      return undefined;
    };
    this.integranteService = injector.get(src_app_services_integrante_service__WEBPACK_IMPORTED_MODULE_5__.IntegranteService);
    this.integranteDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_3__.UnidadeIntegranteDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      unidade_id: {
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
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter(atribuicao => atribuicao.key != "LOTADO") : this.lookup.UNIDADE_INTEGRANTE_TIPO;
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
   * Método chamado na inicialização do componente para carregar todas as unidades-integrantes do usuário.
   * @param entity
   * @param form
   */
  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (entity.id) {
        let integrantes = [];
        try {
          let result = yield Promise.all([_this2.usuarioDao.getById(entity.id), _this2.integranteDao.loadIntegrantes("", entity.id)]);
          _this2.entity = result[0];
          integrantes = result[1].integrantes.filter(x => x.atribuicoes?.length > 0);
        } finally {
          integrantes.forEach(i => _this2.items?.push(_this2.integranteService.completarIntegrante(i, i.id, entity.id, i.atribuicoes)));
          _this2.items = _this2.integranteService.ordenar(_this2.items);
          _this2.cdRef.detectChanges();
          _this2.grid.loading = false;
        }
      }
    })();
  }
  /**
   * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
   * @returns
   */
  addIntegrante() {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let novo = {
        id: _this3.integranteDao.generateUuid(),
        unidade_id: "",
        atribuicoes: []
      };
      return novo;
    })();
  }
  addItemHandle() {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
    const key = this.form.controls.atribuicao.value;
    if (value?.length && this.util.validateLookupItem(this.form.controls.atribuicao.value, key)) {
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
   * Método chamado na edição de uma atribuição do usuário
   * @param form
   * @param row
   */
  loadIntegrante(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.unidade_id.setValue(_this4.grid?.adding ? row.unidade_id : row.id);
      form.controls.atribuicoes.setValue(_this4.integranteService.converterAtribuicoes(row.atribuicoes));
      form.controls.atribuicao.setValue("");
    })();
  }
  /**
   * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não.
   * @param row
   * @returns
   */
  removeIntegrante(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let nomeServidor = _this5.entity.nome;
      let nomeUnidade = row.unidade_nome;
      if (_this5.isNoPersist && row.atribuicoes.length == 1 && row.atribuicoes[0] == "LOTADO") {
        yield _this5.dialog.alert("IMPOSSÍVEL EXCLUIR !", "Um vínculo não pode ser excluído quando sua única atribuição é a lotação do servidor. Se quiser alterar a lotação, use a aba principal.");
      } else {
        let confirm = yield _this5.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor '" + nomeServidor + "' na unidade '" + nomeUnidade + "' ?");
        if (confirm) {
          let msg;
          try {
            if (!_this5.isNoPersist) {
              // se persistente
              _this5.loading = true;
              yield _this5.integranteDao.saveIntegrante([_this5.integranteService.completarIntegrante(row, row.id, _this5.entity.id, [])]).then(resposta => {
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
          } catch (e) {
            _this5.loading = false;
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
   * Garante que não será possível excluir a lotação de um servidor por este caminho
   * @param row Atribuição do servidor na unidade
   * @returns
   */
  deleteItemHandle(row) {
    return row.key != "LOTADO";
  }
  /**
   * Método chamado no salvamento de uma unidade-integrante (new/edit), seja este componente persistente ou não.
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
              yield _this6.integranteDao.saveIntegrante([_this6.integranteService.completarIntegrante(row, form.controls.unidade_id.value, _this6.entity.id, novasAtribuicoes)]).then(resposta => {
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
      unidade_sigla: this.unidade?.selectedItem?.entity.sigla,
      unidade_nome: this.unidade?.selectedItem?.entity.nome,
      unidade_codigo: this.unidade?.selectedItem?.entity.codigo
    }, this.form.controls.unidade_id.value, this.entity.id, atribuicoes);
    this.cdRef.detectChanges();
  }
  static #_ = this.ɵfac = function UsuarioIntegranteComponent_Factory(t) {
    return new (t || UsuarioIntegranteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
    type: UsuarioIntegranteComponent,
    selectors: [["usuario-integrante"]],
    viewQuery: function UsuarioIntegranteComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
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
    consts: [["editable", "", 3, "items", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["grid", ""], [4, "ngIf"], [3, "title", "template", "editTemplate"], ["columnUnidade", ""], ["editUnidade", ""], ["columnAtribuicoes", ""], ["editAtribuicoes", ""], ["type", "options"], ["label", "", "icon", "", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], [4, "ngFor", "ngForOf"], [3, "color", "icon", "label"], ["controlName", "atribuicoes", 3, "size", "addItemHandle", "deleteItemHandle"], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "atribuicao", 3, "size", "items"]],
    template: function UsuarioIntegranteComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "grid", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, UsuarioIntegranteComponent_span_2_Template, 3, 1, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "columns")(4, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, UsuarioIntegranteComponent_ng_template_5_Template, 7, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](7, UsuarioIntegranteComponent_ng_template_7_Template, 2, 2, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "column", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, UsuarioIntegranteComponent_ng_template_10_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, UsuarioIntegranteComponent_ng_template_12_Template, 2, 5, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
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
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.translate("Unidades"))("template", _r2)("editTemplate", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.translate("Atribui\u00E7\u00F5es"))("template", _r6)("editTemplate", _r8);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__.InputSearchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__.InputMultiselectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_12__.BadgeComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 87664:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-list/usuario-list.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsuarioListComponent: () => (/* binding */ UsuarioListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/perfil-dao.service */ 65298);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/usuario.model */ 26898);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);


















function UsuarioListComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r0.title);
  }
}
function UsuarioListComponent_toolbar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "toolbar");
  }
}
function UsuarioListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "profile-picture", 18);
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("url", row_r6.url_foto)("size", 40)("hint", row_r6.nome);
  }
}
function UsuarioListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"]((row_r7.perfil == null ? null : row_r7.perfil.nome) || "");
  }
}
class UsuarioListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_4__.Usuario, src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      if (filter?.controls.usuario?.value?.length) {
        result.push(["nome", "like", "%" + filter?.controls.usuario?.value.trim().replace(" ", "%") + "%"]);
      }
      if (filter?.controls.unidade_id?.value?.length) {
        result.push(["lotacao", "==", filter?.controls.unidade_id.value]);
      }
      if (filter?.controls.perfil_id?.value?.length) {
        result.push(["perfil_id", "==", filter?.controls.perfil_id?.value]);
      }
      return result;
    };
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.perfilDao = injector.get(src_app_dao_perfil_dao_service__WEBPACK_IMPORTED_MODULE_1__.PerfilDaoService);
    /* Inicializações */
    this.title = this.lex.translate("Usuários");
    this.code = "MOD_CFG_USER";
    this.join = ["perfil:id,nome"];
    this.filter = this.fh.FormBuilder({
      usuario: {
        default: ""
      },
      unidade_id: {
        default: ""
      },
      perfil_id: {
        default: null
      }
    });
    this.addOption(this.OPTION_INFORMACOES, "MOD_USER");
    //this.addOption(this.OPTION_EXCLUIR, "MOD_USER_EXCL");       // Tratar de forma diferenciada a exclusão de usuário
  }

  dynamicOptions(row) {
    let result = [];
    // Testa se o usuário logado possui permissão para gerenciar as atribuições do usuário do grid
    if (this.auth.hasPermissionTo("MOD_USER_ATRIB")) result.push({
      label: "Atribuições",
      icon: "bi bi-list-task",
      onClick: usuario => {
        this.go.navigate({
          route: ['configuracoes', 'usuario', '', usuario.id, 'integrante']
        }, {
          metadata: {
            entity_id: row.id
          }
        });
      }
    });
    return result;
  }
  static #_ = this.ɵfac = function UsuarioListComponent_Factory(t) {
    return new (t || UsuarioListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
    type: UsuarioListComponent,
    selectors: [["app-usuario-list"]],
    viewQuery: function UsuarioListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
    decls: 20,
    vars: 35,
    consts: [["class", "my-2", 4, "ngIf"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "collapseChange", "collapsed"], [1, "row"], ["controlName", "usuario", "placeholder", "Nome", 3, "size", "label", "control"], ["controlName", "unidade_id", 3, "size", "label", "control", "dao"], ["controlName", "perfil_id", "nullable", "", 3, "size", "label", "control", "dao"], ["icon", "bi-person", 3, "align", "template"], ["columnFoto", ""], ["title", "CPF", "field", "cpf"], ["title", "Matr\u00EDcula", "field", "matricula"], ["title", "Nome", "field", "nome", "orderBy", "nome"], [3, "title", "template"], ["columnPerfil", ""], ["type", "options", 3, "onEdit", "dynamicOptions", "options"], [3, "rows"], [1, "my-2"], [3, "url", "size", "hint"]],
    template: function UsuarioListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, UsuarioListComponent_h3_0_Template, 2, 1, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("select", function UsuarioListComponent_Template_grid_select_1_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, UsuarioListComponent_toolbar_2_Template, 1, 0, "toolbar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "filter", 3)(4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "input-text", 5)(6, "input-search", 6)(7, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "columns")(9, "column", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](10, UsuarioListComponent_ng_template_10_Template, 1, 3, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](12, "column", 10)(13, "column", 11)(14, "column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](15, "column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, UsuarioListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](18, "column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](19, "pagination", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](11);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.isModal);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_USER_INCL"))("hasEdit", ctx.auth.hasPermissionTo("MOD_USER_EDT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Usu\u00E1rio"))("control", ctx.filter.controls.usuario);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Lota\u00E7\u00E3o"))("control", ctx.filter.controls.unidade_id)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Perfil"))("control", ctx.filter.controls.perfil_id)("dao", ctx.perfilDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("align", "center")("template", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("title", ctx.lex.translate("Perfil"))("template", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("onEdit", ctx.edit)("dynamicOptions", ctx.dynamicOptions.bind(ctx))("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_8__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_9__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_10__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_11__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__.InputSelectComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_14__.ProfilePictureComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 86047:
/*!*************************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsuarioRoutingModule: () => (/* binding */ UsuarioRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usuario-form/usuario-form.component */ 11180);
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ 87664);
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario-integrante/usuario-integrante.component */ 12479);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);








const routes = [{
  path: '',
  component: _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_3__.UsuarioListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Usuários"
  }
}, {
  path: 'new',
  component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_2__.UsuarioFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Usuário",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_2__.UsuarioFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Usuário",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_2__.UsuarioFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Usuário",
    modal: true
  }
}, {
  path: ':id/:idUsuario/integrante',
  component: _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_4__.UsuarioIntegranteComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Atribuições do Usuário",
    modal: true
  }
}];
class UsuarioRoutingModule {
  static #_ = this.ɵfac = function UsuarioRoutingModule_Factory(t) {
    return new (t || UsuarioRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: UsuarioRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](UsuarioRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 29242:
/*!*****************************************************************!*\
  !*** ./src/app/modules/configuracoes/usuario/usuario.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsuarioModule: () => (/* binding */ UsuarioModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _usuario_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usuario-routing.module */ 86047);
/* harmony import */ var _usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usuario-list/usuario-list.component */ 87664);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usuario-form/usuario-form.component */ 11180);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario-integrante/usuario-integrante.component */ 12479);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);








class UsuarioModule {
  static #_ = this.ɵfac = function UsuarioModule_Factory(t) {
    return new (t || UsuarioModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: UsuarioModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _usuario_routing_module__WEBPACK_IMPORTED_MODULE_0__.UsuarioRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](UsuarioModule, {
    declarations: [_usuario_list_usuario_list_component__WEBPACK_IMPORTED_MODULE_1__.UsuarioListComponent, _usuario_form_usuario_form_component__WEBPACK_IMPORTED_MODULE_3__.UsuarioFormComponent, _usuario_integrante_usuario_integrante_component__WEBPACK_IMPORTED_MODULE_4__.UsuarioIntegranteComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _usuario_routing_module__WEBPACK_IMPORTED_MODULE_0__.UsuarioRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=9242.js.map