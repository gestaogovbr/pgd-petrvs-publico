"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[5944],{

/***/ 24290:
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-dashboard/atividade-dashboard.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeDashboardComponent: () => (/* binding */ AtividadeDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/form-helper.service */ 38720);
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../atividade-list-base */ 94180);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
var _class;





const _c0 = ["programa"];
const _c1 = ["unidadesSubordinadas"];
class AtividadeDashboardComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__.AtividadeListBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      /*if(controlName == 'programa_id' && !control.value?.length) {
        result = "Obrigatório";
      }*/
      return result;
    };
    /* Inicializações */
    //this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
    this.fh = this.injector.get(src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_0__.FormHelperService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef);
    this.filter = this.fh.FormBuilder({
      programa_id: {
        default: ""
      },
      unidadesSubordinadas: {
        default: false
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
_class = AtividadeDashboardComponent;
_class.ɵfac = function AtividadeDashboardComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["atividade-dashboard"]],
  viewQuery: function AtividadeDashboardComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.programa = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.unidadesSubordinadas = _t.first);
    }
  },
  inputs: {
    snapshot: "snapshot",
    fixedFilter: "fixedFilter"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]],
  decls: 0,
  vars: 0,
  template: function AtividadeDashboardComponent_Template(rf, ctx) {},
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 71945:
/*!*******************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-concluir/atividade-form-concluir.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormConcluirComponent: () => (/* binding */ AtividadeFormConcluirComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ 88340);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/documento.model */ 43972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../uteis/calendar-efemerides/calendar-efemerides.component */ 60785);
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ 92433);
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../atividade-list-tarefa/atividade-list-tarefa.component */ 62095);

var _class;






















const _c0 = ["tipoAtividade"];
const _c1 = ["docEntregue"];
function AtividadeFormConcluirComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "input-datetime", 16)(2, "input-number", 17)(3, "input-datetime", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("label", ctx_r2.lex.translate("Distribui\u00E7\u00E3o"))("control", ctx_r2.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("label", ctx_r2.lex.translate("Prazo de entrega"))("control", ctx_r2.form.controls.data_estipulada_entrega);
  }
}
function AtividadeFormConcluirComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "input-datetime", 19)(2, "input-timer", 20)(3, "input-number", 17)(4, "input-datetime", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Distribui\u00E7\u00E3o"))("control", ctx_r4.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Esfor\u00E7o"))("control", ctx_r4.form.controls.esforco);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 3)("label", ctx_r4.lex.translate("Prazo de entrega"))("control", ctx_r4.form.controls.data_estipulada_entrega);
  }
}
function AtividadeFormConcluirComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "input-datetime", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "input-datetime", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function AtividadeFormConcluirComponent_div_16_Template_input_datetime_change_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r9.onDataEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input-datetime", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r5.form.controls.data_inicio);
  }
}
function AtividadeFormConcluirComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "input-datetime", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "input-datetime", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function AtividadeFormConcluirComponent_ng_template_17_Template_input_datetime_change_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r11.onDataEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input-timer", 26)(4, "input-datetime", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r7.form.controls.data_inicio);
  }
}
function AtividadeFormConcluirComponent_separator_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "separator", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "calendar-efemerides", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("efemerides", ctx_r8.efemerides);
  }
}
class AtividadeFormConcluirComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__.AtividadeDaoService);
    this.injector = injector;
    this.modalWidth = 800;
    this.entregas = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == "plano_trabalho_entrega_id" && !control.value?.length || controlName == "data_entrega" && !this.util.isDataValid(control.value)) {
        result = "Obrigatório";
      }
      return result;
    };
    this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_7__.TipoAtividadeDaoService);
    this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_6__.TipoDocumentoDaoService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_5__.CalendarService);
    this.form = this.fh.FormBuilder({
      tipo_atividade_id: {
        default: null
      },
      data_distribuicao: {
        default: null
      },
      esforco: {
        default: 0
      },
      progresso: {
        default: 0
      },
      data_estipulada_entrega: {
        default: null
      },
      data_inicio: {
        default: null
      },
      tempo_despendido: {
        default: 0
      },
      data_entrega: {
        default: null
      },
      arquivar: {
        default: true
      },
      descricao_tecnica: {
        default: ""
      },
      documento_entrega: {
        default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_8__.Documento()
      },
      documento_entrega_id: {
        default: null
      },
      plano_trabalho_entrega_id: {
        default: null
      }
    }, this.cdRef, this.validate);
    this.join = ["plano_trabalho.tipo_modalidade", "unidade", "plano_trabalho.entregas.plano_entrega_entrega:id,descricao"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      formValue = _this.util.fillForm(formValue, entity);
      formValue.data_entrega = _this.auth.hora;
      formValue.progresso = 100;
      yield _this.tipoAtividade.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id);
      if (entity.unidade_id != _this.auth.unidade.id) {
        yield _this.auth.selecionaUnidade(entity.unidade_id);
      }
      _this.entregas = entity.plano_trabalho?.entregas?.map(x => Object.assign({}, {
        key: x.id,
        value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
        data: x
      })) || [];
      formValue.arquivar = true;
      form.patchValue(formValue);
      _this.onDataEntregaChange();
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = yield _this2.dao.getAtividade(_this2.urlParams.get("id"));
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  onDataEntregaChange(event) {
    const entrega = this.form.controls.data_entrega.value;
    const inicio = this.entity.data_inicio;
    const cargaHoraria = this.entity.carga_horaria;
    const unidade = this.entity.unidade;
    const pausas = this.entity.pausas || [];
    const afastamentos = this.entity.usuario?.afastamentos || [];
    this.efemerides = this.util.isDataValid(entrega) ? this.calendar.calculaDataTempoUnidade(inicio, entrega, cargaHoraria, unidade, "ENTREGA", pausas, afastamentos) : undefined;
    if (this.efemerides) {
      this.form.controls.tempo_despendido.setValue(this.efemerides.tempoUtil);
      this.cdRef.detectChanges();
    }
  }
  onTipoAtividadeSelect(item) {
    const tipoAtividade = item.entity;
    this.form.controls.esforco.setValue(tipoAtividade?.esforco || 0);
    this.cdRef.detectChanges();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_4__.Atividade(), this.entity);
      atividade = this.util.fillForm(atividade, this.form.value);
      atividade.id = this.entity.id;
      atividade.descricao_tecnica = this.form.controls.descricao_tecnica.value;
      atividade.data_arquivamento = this.form.controls.arquivar.value ? new Date() : null;
      atividade.progresso = this.form.controls.progresso.value;
      atividade.produtividade = this.entity?.plano_trabalho?.tipo_modalidade?.atividade_tempo_despendido ? this.calendar.produtividade(atividade.esforco, atividade.tempo_despendido) : null;
      this.dao.concluir(atividade).then(saved => resolve(saved)).catch(reject);
    });
  }
}
_class = AtividadeFormConcluirComponent;
_class.ɵfac = function AtividadeFormConcluirComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form-concluir"]],
  viewQuery: function AtividadeFormConcluirComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.docEntregue = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 21,
  vars: 26,
  consts: [["initialFocus", "tipo_atividade_id", 3, "form", "disabled", "submit", "cancel"], [3, "documento"], [1, "row"], ["controlName", "tipo_atividade_id", 3, "label", "emptyValue", "size", "dao", "select"], ["tipoAtividade", ""], ["controlName", "plano_trabalho_entrega_id", "required", "", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["label", "Arquivar", "controlName", "arquivar", "labelInfo", "Arquivar automaticamente ap\u00F3s a conclus\u00E3o (Somente se o plano dispensar avalia\u00E7\u00E3o)", 3, "size", "control"], ["label", "Descri\u00E7\u00E3o t\u00E9cnica", "controlName", "descricao_tecnica", 3, "size", "rows", "control"], ["collapse", "", 3, "title", "collapsed"], ["persist", "", 3, "atividade"], ["class", "row", 4, "ngIf", "ngIfElse"], ["comEsforco", ""], ["title", "Conclus\u00E3o"], ["comTempoDespendido", ""], ["title", "C\u00E1lculos das horas", "collapse", "", 4, "ngIf"], ["noIcon", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control"], ["label", "Progresso", "disabled", "", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo). Sempre ser\u00E1 100% na conclus\u00E3o!", 3, "size", "decimals"], ["noIcon", "", "controlName", "data_estipulada_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["noIcon", "", "disabled", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control"], ["icon", "bi bi-stopwatch", "onlyHours", "", "controlName", "esforco", "labelInfo", "Tempo estimado de execu\u00E7\u00E3o", 3, "size", "label", "control"], ["noIcon", "", "disabled", "", "controlName", "data_estipulada_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["noIcon", "", "label", "Inicio", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["noIcon", "", "label", "Conclus\u00E3o", "controlName", "data_entrega", "labelInfo", "Data da conclus\u00E3o da atividade", "required", "", 3, "size", "control", "change"], ["label", "Data de arquivamento", "controlName", "data_arquivamento", "disabled", "", "labelInfo", "Data de arquivamento da atividade", 3, "size", "control"], ["noIcon", "", "label", "Conclus\u00E3o", "controlName", "data_entrega", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "size", "control", "change"], ["label", "Tempo despendido", "icon", "bi bi-hourglass-bottom", "controlName", "tempo_despendido", "disabled", "", "labelInfo", "Calculado no fim da atividade, sendo o tempo l\u00EDquido (considerando pausas)", 3, "size", "control"], ["title", "C\u00E1lculos das horas", "collapse", ""], [3, "efemerides"]],
  template: function AtividadeFormConcluirComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function AtividadeFormConcluirComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormConcluirComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "documento-link", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](2, "div", 2)(3, "input-search", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("select", function AtividadeFormConcluirComponent_Template_input_search_select_3_listener($event) {
        return ctx.onTipoAtividadeSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](5, "input-select", 5, 6)(7, "input-switch", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](9, "input-textarea", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](10, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](11, "atividade-list-tarefa", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](12, AtividadeFormConcluirComponent_div_12_Template, 4, 8, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](13, AtividadeFormConcluirComponent_ng_template_13_Template, 5, 11, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](15, "separator", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](16, AtividadeFormConcluirComponent_div_16_Template, 4, 6, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](17, AtividadeFormConcluirComponent_ng_template_17_Template, 5, 8, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](19, "documento-link", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](20, AtividadeFormConcluirComponent_separator_20_Template, 2, 1, "separator", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](14);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("documento", ctx.form.controls.documento_entrega.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de Atividade"))("emptyValue", null)("size", 5)("dao", ctx.tipoAtividadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("label", ctx.lex.translate("Entrega do plano"))("size", 5)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.entregas)("labelInfo", ctx.lex.translate("Entrega do plano") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.arquivar);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao_tecnica);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("title", ctx.lex.translate("Tarefa da atividade"))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("atividade", ctx.entity);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_esforco))("ngIfElse", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_tempo_despendido))("ngIfElse", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("documento", ctx.form.controls.documento_entrega.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.efemerides && (ctx.entity == null ? null : ctx.entity.plano_trabalho == null ? null : ctx.entity.plano_trabalho.tipo_modalidade == null ? null : ctx.entity.plano_trabalho.tipo_modalidade.atividade_tempo_despendido));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_10__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_11__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_12__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__.InputSelectComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_14__.InputTimerComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_16__.InputNumberComponent, _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_17__.CalendarEfemeridesComponent, _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_18__.DocumentosLinkComponent, _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_19__.AtividadeListTarefaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 22921:
/*!*****************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-iniciar/atividade-form-iniciar.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormIniciarComponent: () => (/* binding */ AtividadeFormIniciarComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);

var _class;














const _c0 = ["usuario"];
const _c1 = ["planoTrabalho"];
const _c2 = ["planejado"];
const _c3 = function () {
  return ["planos_trabalho.tipo_modalidade:id,nome", "planos_trabalho.entregas.entrega:id,nome"];
};
class AtividadeFormIniciarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  get labelInfoSuspender() {
    const n = this.iniciadas.length > 1 ? this.lex.translate("tarefas") : this.lex.translate("tarefa");
    const s = this.iniciadas.length == 1 ? "" : "s";
    const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
    return this.iniciadas.length ? `Suspender a${s}${q} ${n} já iniciada${s}?` : "Não há outras atividades iniciadas pelo usuário!";
  }
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__.AtividadeDaoService);
    this.injector = injector;
    this.modalWidth = 600;
    this.iniciadas = [];
    this.planoTrabalhoSelecionado = null;
    this.planosTrabalhos = [];
    this.planosTrabalhosEntregas = [];
    this.planoTrabalhoJoin = ["entregas.plano_entrega_entrega:id,descricao", "tipo_modalidade:id,nome"];
    this.validate = (control, controlName) => {
      let result = null;
      if (["usuario_id", "plano_trabalho_id", "plano_trabalho_entrega_id"].includes(controlName) && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "data_inicio" && !control.value) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      let result = undefined;
      /* (RN_ATV_6) Somente será permitido iniciar a atividade dentro do período do plano de trabalho. */
      if (this.planoTrabalhoSelecionado && (this.util.asTimestamp(this.form.controls.data_inicio.value) < this.util.asTimestamp(this.planoTrabalhoSelecionado.data_inicio) || this.util.asTimestamp(this.form.controls.data_inicio.value) > this.util.asTimestamp(this.planoTrabalhoSelecionado.data_fim))) {
        result = "Data de início fora do período do plano de trabalho (" + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_inicio) + " até " + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_fim) + ") [RN_ATV_6]";
      }
      return result;
    };
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_5__.UsuarioDaoService);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_7__.PlanoTrabalhoDaoService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_6__.CalendarService);
    this.form = this.fh.FormBuilder({
      usuario_id: {
        default: undefined
      },
      plano_trabalho_id: {
        default: undefined
      },
      plano_trabalho_entrega_id: {
        default: undefined
      },
      data_distribuicao: {
        default: new Date()
      },
      data_estipulada_entrega: {
        default: new Date()
      },
      carga_horaria: {
        default: 0
      },
      tempo_planejado: {
        default: 0
      },
      esforco: {
        default: 0
      },
      data_inicio: {
        default: null
      },
      suspender: {
        default: false
      }
    }, this.cdRef, this.validate);
    this.join = ["unidade", "atividade", "usuario.planos_trabalho.tipo_modalidade"];
  }
  loadIniciadas(usuario_id) {
    this.iniciadas = [];
    if (usuario_id?.length) {
      this.dao.iniciadas(usuario_id).then(idsIniciadas => {
        this.iniciadas = idsIniciadas;
        this.cdRef.detectChanges();
      });
    }
  }
  onUsuarioSelect(item) {
    const usuario = item.entity;
    const planosTrabalhos = usuario?.planos_trabalho || [];
    this.planosTrabalhos = planosTrabalhos.filter(x => x.unidade_id == this.entity.unidade_id).map(x => {
      return {
        key: x.id,
        value: (x.tipo_modalidade?.nome || "") + " - " + this.dao.getDateFormatted(x.data_inicio) + " à " + this.dao.getDateFormatted(x.data_fim),
        data: x
      };
    });
    this.cdRef.detectChanges();
    if (!this.form.controls.plano_trabalho_id.value?.length && this.planosTrabalhos.length == 1) {
      this.form.controls.plano_trabalho_id.setValue(this.planosTrabalhos[0].key);
    }
    this.cdRef.detectChanges();
  }
  onPlanoChange(event) {
    var _this = this;
    (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.entity && _this.planoTrabalho?.selectedItem?.data) {
        const planoTrabalho = _this.planoTrabalho?.selectedItem?.data;
        if (_this.planoTrabalhoSelecionado?.id != planoTrabalho.id) {
          _this.planoTrabalhoSelecionado = yield _this.planoTrabalhoDao.getById(planoTrabalho.id, _this.planoTrabalhoJoin);
        }
        const cargaHoraria = planoTrabalho?.carga_horaria || _this.calendar.expedienteMedio(_this.entity.unidade);
        const tempo_planejado = _this.calendar.horasUteis(_this.form.controls.data_distribuicao.value, _this.form.controls.data_estipulada_entrega.value, cargaHoraria, _this.entity.unidade, "DISTRIBUICAO");
        _this.form.controls.carga_horaria.setValue(cargaHoraria);
        _this.form.controls.tempo_planejado.setValue(tempo_planejado);
        _this.form.controls.esforco.setValue(_this.form.controls.esforco.value || _this.entity?.tipo_atividade?.esforco || 0);
        /* Carrega entregas */
        const planoTrabalhoEntregaId = _this.form.controls.plano_trabalho_entrega_id.value;
        _this.planosTrabalhosEntregas = _this.planoTrabalhoSelecionado?.entregas?.map(x => Object.assign({}, {
          key: x.id,
          value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
          data: x
        })) || [];
        _this.cdRef.detectChanges();
        _this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && _this.planosTrabalhos.length > 0 ? _this.planosTrabalhos[0].key : planoTrabalhoEntregaId);
      }
    })();
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      formValue = _this2.util.fillForm(formValue, entity);
      if (!formValue.usuario_id?.length) {
        formValue.usuario_id = _this2.auth.usuario?.id;
      }
      formValue.data_inicio = formValue.data_inicio || _this2.util.setStrTime(new Date(), _this2.auth.unidadeHora);
      yield _this2.usuario.loadSearch(entity.usuario || formValue.usuario_id);
      _this2.loadIniciadas(formValue.usuario_id);
      if (entity.unidade_id != _this2.auth.unidade.id) {
        yield _this2.auth.selecionaUnidade(entity.unidade_id);
      }
      form.patchValue(formValue);
      _this2.onPlanoChange(new Event('change'));
    })();
  }
  initializeData(form) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.entity = yield _this3.dao.getById(_this3.urlParams.get("id"), _this3.join);
      yield _this3.loadData(_this3.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade(), this.entity);
      atividade = this.util.fillForm(atividade, this.form.value);
      atividade.id = this.entity.id;
      atividade.suspender = this.form.controls.suspender.value;
      this.dao.iniciar(atividade).then(saved => resolve(saved)).catch(reject);
    });
  }
}
_class = AtividadeFormIniciarComponent;
_class.ɵfac = function AtividadeFormIniciarComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form-iniciar"]],
  viewQuery: function AtividadeFormIniciarComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.planoTrabalho = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.planejado = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 28,
  consts: [["initialFocus", "data_distribuicao", 3, "form", "disabled", "submit", "cancel"], [1, "row"], ["controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de cadastro da atividade", 3, "size", "label", "control"], ["controlName", "data_estipulada_entrega", "disabled", "", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control"], ["label", "Respons\u00E1vel", "controlName", "usuario_id", "labelInfo", "Respons\u00E1vel por executar a atividade", "required", "", 3, "size", "dao", "join", "select"], ["usuario", ""], ["controlName", "plano_trabalho_id", "required", "", 3, "label", "size", "control", "items", "labelInfo", "change"], ["planoTrabalho", ""], ["controlName", "plano_trabalho_entrega_id", "required", "", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["label", "Inicio", "controlName", "data_inicio", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", "required", "", 3, "size", "control"], ["label", "Suspender as demais", "controlName", "suspender", 3, "size", "control", "disabled", "labelInfo"]],
  template: function AtividadeFormIniciarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function AtividadeFormIniciarComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormIniciarComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-datetime", 2)(3, "input-datetime", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 1)(6, "input-search", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("select", function AtividadeFormIniciarComponent_Template_input_search_select_6_listener($event) {
        return ctx.onUsuarioSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "div", 1)(9, "input-select", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function AtividadeFormIniciarComponent_Template_input_select_change_9_listener($event) {
        return ctx.onPlanoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "input-select", 8, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "separator");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](15, "input-datetime", 10)(16, "input-switch", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("label", ctx.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx.form.controls.data_distribuicao);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("label", ctx.lex.translate("Prazo de entrega"))("control", ctx.form.controls.data_estipulada_entrega);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx.usuarioDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](27, _c3));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", ctx.lex.translate("Plano de trabalho"))("size", 7)("control", ctx.form.controls.plano_trabalho_id)("items", ctx.planosTrabalhos)("labelInfo", ctx.lex.translate("Plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", ctx.lex.translate("Entrega do plano"))("size", 5)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.planosTrabalhosEntregas)("labelInfo", ctx.lex.translate("Entrega") + " do " + ctx.lex.translate("plano de trabalho") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.data_inicio);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.suspender)("disabled", !ctx.iniciadas.length ? "" : undefined)("labelInfo", ctx.labelInfoSuspender);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 61468:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-pausar/atividade-form-pausar.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormPausarComponent: () => (/* binding */ AtividadeFormPausarComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);

var _class;









function AtividadeFormPausarComponent_top_alert_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "top-alert", 5);
  }
}
function AtividadeFormPausarComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "input-datetime", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("control", ctx_r1.form.controls.data_inicio);
  }
}
class AtividadeFormPausarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__.AtividadeDaoService);
    this.injector = injector;
    this.reiniciar = false;
    this.modalWidth = 400;
    this.validate = (control, controlName) => {
      let result = null;
      let pausado = this.entity?.pausas?.find(x => !x.data_fim);
      if (controlName == "data") {
        if (this.reiniciar && !pausado) {
          result = "Não á pausa!";
        } else if (!this.util.isDataValid(control.value)) {
          result = "Obrigatório";
        } else if (pausado && this.entity && control.value.getTime() < this.entity.data_inicio.getTime()) {
          result = "Menor que início!";
        }
      }
      return result;
    };
    this.form = this.fh.FormBuilder({
      data_inicio: {
        default: undefined
      },
      data: {
        default: new Date()
      }
    }, this.cdRef, this.validate);
  }
  ngAfterViewInit() {
    this.reiniciar = !!this.queryParams?.reiniciar;
    this.title = this.reiniciar ? "Reiniciar" : "Suspender";
    super.ngAfterViewInit();
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.reiniciar = !!this.queryParams?.reiniciar;
      let pausado = _this.entity?.pausas?.find(x => !x.data_fim);
      if (_this.reiniciar && !pausado) {
        _this.error("Não há pausa ativa para ser reiniciada.");
      }
      let formValue = {
        inicio: _this.reiniciar ? pausado?.data_inicio : undefined,
        data: _this.util.setStrTime(new Date(), _this.auth.unidadeHora)
      };
      if (entity.unidade_id != _this.auth.unidade.id) {
        yield _this.auth.selecionaUnidade(entity.unidade_id);
      }
      form.patchValue(formValue);
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = yield _this2.dao.getAtividade(_this2.urlParams.get("id"));
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let pausa = {
        atividade_id: this.entity.id,
        data: this.form.controls.data.value
      };
      if (this.reiniciar) {
        this.dao.reiniciar(pausa).then(saved => resolve(saved)).catch(reject);
      } else {
        this.dao.pausar(pausa).then(saved => resolve(saved)).catch(reject);
      }
    });
  }
}
_class = AtividadeFormPausarComponent;
_class.ɵfac = function AtividadeFormPausarComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form-pausar"]],
  viewQuery: function AtividadeFormPausarComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 8,
  consts: [["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!", 4, "ngIf"], ["initialFocus", "data", 3, "form", "disabled", "submit", "cancel"], ["class", "row", 4, "ngIf"], [1, "row"], ["controlName", "data", "required", "", 3, "size", "label", "control", "labelInfo"], ["type", "warning", "message", "Dica: N\u00E3o \u00E9 necess\u00E1rio suspender a tarefa entre as jornadas de trabalho!"], ["label", "In\u00EDcio da pausa", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data de in\u00EDcio da \u00FAltima pausa", 3, "size", "control"]],
  template: function AtividadeFormPausarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, AtividadeFormPausarComponent_top_alert_0_Template, 1, 0, "top-alert", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "editable-form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function AtividadeFormPausarComponent_Template_editable_form_submit_1_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormPausarComponent_Template_editable_form_cancel_1_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, AtividadeFormPausarComponent_div_2_Template, 2, 2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "input-datetime", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.reiniciar);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.reiniciar);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("size", 12)("label", ctx.reiniciar ? "Data de rein\u00EDcio" : "Data da pausa")("control", ctx.form.controls.data)("labelInfo", ctx.reiniciar ? "Data e hora do rein\u00EDcio da atividade" : "Data e hora do in\u00EDcio da pausa/suspens\u00E3o");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_5__.InputDatetimeComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_6__.TopAlertComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 35519:
/*!*********************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-prorrogar/atividade-form-prorrogar.component.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormProrrogarComponent: () => (/* binding */ AtividadeFormProrrogarComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);

var _class;







class AtividadeFormProrrogarComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__.AtividadeDaoService);
    this.injector = injector;
    this.modalWidth = 400;
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == "data_estipulada_entrega") {
        if (!this.util.isDataValid(control.value)) {
          result = "Obrigatório";
        } else if (this.entity?.data_distribuicao && control.value.getTime() < this.entity.data_distribuicao.getTime()) {
          result = "Menor que distribuição!";
        }
      }
      return result;
    };
    this.form = this.fh.FormBuilder({
      data_distribuicao: {
        default: new Date()
      },
      data_estipulada_entrega: {
        default: new Date()
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = {
        data_distribuicao: entity.data_distribuicao,
        data_estipulada_entrega: entity.data_estipulada_entrega
      };
      if (entity.unidade_id != _this.auth.unidade.id) {
        yield _this.auth.selecionaUnidade(entity.unidade_id);
      }
      form.patchValue(formValue);
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = yield _this2.dao.getAtividade(_this2.urlParams.get("id"));
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let prorrogar = {
        id: this.entity.id,
        data_estipulada_entrega: this.form.controls.data_estipulada_entrega.value
      };
      this.dao.prorrogar(prorrogar).then(saved => resolve(saved)).catch(reject);
    });
  }
}
_class = AtividadeFormProrrogarComponent;
_class.ɵfac = function AtividadeFormProrrogarComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form-prorrogar"]],
  viewQuery: function AtividadeFormProrrogarComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 7,
  consts: [["initialFocus", "data_estipulada_entrega", 3, "form", "disabled", "submit", "cancel"], [1, "row"], ["label", "Data da distribui\u00E7\u00E3o", "controlName", "data_distribuicao", "disabled", "", "labelInfo", "Data de distribui\u00E7\u00E3o da atividade", 3, "size", "control"], ["controlName", "data_estipulada_entrega", "labelInfo", "Prazo para entrega da atividade", "required", "", 3, "size", "label", "control"]],
  template: function AtividadeFormProrrogarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("submit", function AtividadeFormProrrogarComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormProrrogarComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "input-datetime", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "input-datetime", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.data_distribuicao);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 12)("label", ctx.lex.translate("Prazo de entrega"))("control", ctx.form.controls.data_estipulada_entrega);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_5__.InputDatetimeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 49286:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form-tarefa/atividade-form-tarefa.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormTarefaComponent: () => (/* binding */ AtividadeFormTarefaComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tipo-documento-dao.service */ 88340);
/* harmony import */ var src_app_dao_tipo_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/tipo-tarefa-dao.service */ 15213);
/* harmony import */ var src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/atividade-tarefa-dao.service */ 949);
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ 88543);
/* harmony import */ var src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/tipo-processo-dao.service */ 70361);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/comentario.service */ 2124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ 54240);
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ 92433);

var _class;



















const _c0 = ["documento"];
const _c1 = ["comentarios"];
const _c2 = ["tipoTarefa"];
class AtividadeFormTarefaComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_7__.AtividadeTarefa, src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_6__.AtividadeTarefaDaoService);
    this.injector = injector;
    this.modalWidth = 800;
    this.validate = (control, controlName) => {
      let result = null;
      if (["descricao"].includes(controlName) && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      const values = form.value;
      if (values.tipo_tarefa_id?.length && !this.tipoTarefa?.selectedEntity) {
        return "Aguarde o carregamento " + this.lex.translate("tipo de tarefa") + ". Caso demore, selecione novamente!";
      }
      if (values.concluido && this.tipoTarefa?.selectedEntity?.documental && this.documento?.isEmpty()) {
        return this.gb.isEmbedded ? "Obrigatório selecionar um arquivo para a tarefa selecionada!" : "Utilize o sistema como extensão para concluir!";
      }
      return undefined;
    };
    this.tipoTarefaDao = injector.get(src_app_dao_tipo_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_5__.TipoTarefaDaoService);
    this.tipoDocumentoDao = injector.get(src_app_dao_tipo_documento_dao_service__WEBPACK_IMPORTED_MODULE_4__.TipoDocumentoDaoService);
    this.tipoProcessoDao = injector.get(src_app_dao_tipo_processo_dao_service__WEBPACK_IMPORTED_MODULE_8__.TipoProcessoDaoService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__.ListenerAllPagesService);
    this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_10__.ComentarioService);
    this.title = this.lex.translate("Tarefa da atividade");
    this.form = this.fh.FormBuilder({
      descricao: {
        default: ""
      },
      tipo_tarefa_id: {
        default: null
      },
      tempo_estimado: {
        default: 0
      },
      concluido: {
        default: false
      },
      id_processo: {
        default: 0
      },
      numero_processo: {
        default: ""
      },
      documento: {
        default: null
      },
      comentarios: {
        default: []
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
    this.action = segment == "comentar" ? segment : this.action;
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      formValue = _this.util.fillForm(formValue, entity);
      yield _this.tipoTarefa?.loadSearch(entity.tipo_tarefa || formValue.tipo_tarefa_id);
      formValue.concluido = !!entity.data_conclusao;
      formValue.comentarios = _this.comentario.orderComentarios(formValue.comentarios || []);
      form.patchValue(formValue);
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.entity = _this2.metadata.tarefa;
      _this2.atividade = _this2.metadata.atividade;
      _this2.sei = _this2.metadata.sei;
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.comentarios?.confirm();
      _this3.util.fillForm(_this3.entity, _this3.form.value);
      _this3.entity.tipo_tarefa = _this3.tipoTarefa?.selectedEntity;
      _this3.entity.data_conclusao = _this3.form.controls.concluido.value && !_this3.entity.data_conclusao ? _this3.auth.hora : _this3.entity.data_conclusao;
      return new src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_9__.NavigateResult(_this3.entity);
    })();
  }
  onTipoTarefaSelect(item) {
    const tipoTarefa = item.entity;
    this.form.controls.tempo_estimado.setValue(tipoTarefa?.tempo_estimado || 0);
  }
}
_class = AtividadeFormTarefaComponent;
_class.ɵfac = function AtividadeFormTarefaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_18__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form-tarefa"]],
  viewQuery: function AtividadeFormTarefaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.documento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.tipoTarefa = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵInheritDefinitionFeature"]],
  decls: 15,
  vars: 16,
  consts: [["initialFocus", "descricao", 3, "form", "disabled", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["key", "TAREFA", 3, "label"], [1, "row"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size", "rows", "control"], ["controlName", "tipo_tarefa_id", 3, "label", "size", "control", "dao", "select"], ["tipoTarefa", ""], ["label", "Conclu\u00EDdo", "controlName", "concluido", "labelInfo", "Se foi conclu\u00EDda", 3, "size", "control"], [3, "sei", "documento"], ["documento", ""], ["key", "COMENTARIOS", "label", "Comentarios"], ["clss", "row"], ["origem", "ATIVIDADE_TAREFA", 3, "control"], ["comentarios", ""]],
  template: function AtividadeFormTarefaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("submit", function AtividadeFormTarefaComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormTarefaComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](4, "input-textarea", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "div", 3)(6, "input-search", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("select", function AtividadeFormTarefaComponent_Template_input_search_select_6_listener($event) {
        return ctx.onTipoTarefaSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](8, "input-switch", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](9, "documento-link", 8, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "tab", 10)(12, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](13, "comentarios", 12, 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("title", !ctx.isModal ? ctx.title : "");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx.lex.translate("Tarefa da Atividade"));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de Tarefa"))("size", 10)("control", ctx.form.controls.tipo_tarefa_id)("dao", ctx.tipoTarefaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.concluido);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("sei", ctx.sei)("documento", ctx.form.controls.documento.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("control", ctx.form.controls.comentarios);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_13__.InputTextareaComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__.TabComponent, _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_16__.ComentariosComponent, _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_17__.DocumentosLinkComponent],
  styles: ["@charset \"UTF-8\";\n.comentario-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.comentario-user[_ngcontent-%COMP%] {\n  width: 50px;\n  vertical-align: top;\n  padding: 8px;\n}\n\n.comentario-container[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  width: auto;\n  border-left: var(--bs-gray-400) 2px solid;\n  position: relative;\n}\n\n.comentario-user-indicator[_ngcontent-%COMP%] {\n  content: \"\";\n  position: absolute;\n  width: 0px;\n  height: 0px;\n  top: 0px;\n  left: -12px;\n  border-top: 0.75rem solid var(--bs-gray-400);\n  border-left: 0.75rem solid transparent;\n  border-bottom: none;\n  border-right: none;\n}\n\n.comentario-level[_ngcontent-%COMP%] {\n  color: var(--bs-gray);\n}\n\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7em;\n  color: var(--bs-gray);\n}\n.comentario-message-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]::before {\n  content: \" \u2022 \";\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vYXRpdmlkYWRlL2F0aXZpZGFkZS1mb3JtLXRhcmVmYS9hdGl2aWRhZGUtZm9ybS10YXJlZmEuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0ksV0FBQTtBQUVKOztBQUFBO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUdKOztBQURBO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUNBQUE7RUFDQSxrQkFBQTtBQUlKOztBQUZBO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLDRDQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBS0o7O0FBSEE7RUFDSSxxQkFBQTtBQU1KOztBQUhJO0VBQ0ksZ0JBQUE7RUFDQSxxQkFBQTtBQU1SO0FBSkk7RUFDSSxjQUFBO0FBTVIiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tZW50YXJpby10YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4uY29tZW50YXJpby11c2VyIHtcclxuICAgIHdpZHRoOiA1MHB4OyBcclxuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7IFxyXG4gICAgcGFkZGluZzogOHB4O1xyXG59XHJcbi5jb21lbnRhcmlvLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGJvcmRlci1sZWZ0OiB2YXIoLS1icy1ncmF5LTQwMCkgMnB4IHNvbGlkO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5jb21lbnRhcmlvLXVzZXItaW5kaWNhdG9yIHtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMHB4O1xyXG4gICAgaGVpZ2h0OiAwcHg7XHJcbiAgICB0b3A6IDBweDtcclxuICAgIGxlZnQ6IC0xMnB4O1xyXG4gICAgYm9yZGVyLXRvcDogLjc1cmVtIHNvbGlkIHZhcigtLWJzLWdyYXktNDAwKTtcclxuICAgIGJvcmRlci1sZWZ0OiAuNzVyZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG59XHJcbi5jb21lbnRhcmlvLWxldmVsIHtcclxuICAgIGNvbG9yOiB2YXIoLS1icy1ncmF5KTtcclxufVxyXG4uY29tZW50YXJpby1tZXNzYWdlLXRpdGxlIHtcclxuICAgIHNwYW4ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgICAgICAgY29sb3I6IHZhcigtLWJzLWdyYXkpO1xyXG4gICAgfVxyXG4gICAgc3Bhbjo6YmVmb3JlIHtcclxuICAgICAgICBjb250ZW50OiBcIiDDosKAwqIgXCI7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 97037:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-form/atividade-form.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeFormComponent: () => (/* binding */ AtividadeFormComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/atividade.model */ 73101);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/calendar.service */ 6551);
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ 88543);
/* harmony import */ var src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/comentario.service */ 2124);
/* harmony import */ var src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/tipo-atividade-dao.service */ 22981);
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/models/documento.model */ 43972);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var _atividade_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../atividade.service */ 57338);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ 54240);
/* harmony import */ var _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-link/documentos-link.component */ 92433);
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../atividade-list-tarefa/atividade-list-tarefa.component */ 62095);

var _class;

































const _c0 = ["etiqueta"];
const _c1 = ["tipoAtividade"];
const _c2 = ["planoTrabalho"];
const _c3 = ["unidade"];
const _c4 = ["usuario"];
const _c5 = ["comentarios"];
const _c6 = ["requisicao"];
function AtividadeFormComponent_input_switch_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](0, "input-switch", 47);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 1)("disabled", ctx_r3.form.controls.concluido.value ? "true" : undefined);
  }
}
function AtividadeFormComponent_input_switch_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "input-switch", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_input_switch_13_Template_input_switch_change_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r15.onConcluidoChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 1);
  }
}
function AtividadeFormComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 5)(1, "input-datetime", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_div_21_Template_input_datetime_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r17.onDataDistribuicaoChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](2, "input-number", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](3, "input-datetime", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_div_21_Template_input_datetime_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r18);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r19.onPrazoEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("label", ctx_r8.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx_r8.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("label", ctx_r8.lex.translate("Prazo de entrega"))("control", ctx_r8.form.controls.data_estipulada_entrega);
  }
}
function AtividadeFormComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 5)(1, "input-datetime", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_ng_template_22_Template_input_datetime_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r20.onDataDistribuicaoChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](2, "input-timer", 52)(3, "input-number", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](4, "input-datetime", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_ng_template_22_Template_input_datetime_change_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵrestoreView"](_r21);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵresetView"](ctx_r22.onPrazoEntregaChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 3)("label", ctx_r10.lex.translate("Data de distribui\u00E7\u00E3o"))("control", ctx_r10.form.controls.data_distribuicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 3)("label", ctx_r10.lex.translate("Esfor\u00E7o"))("control", ctx_r10.form.controls.esforco);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 3)("decimals", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 3)("label", ctx_r10.lex.translate("Prazo de entrega"))("control", ctx_r10.form.controls.data_estipulada_entrega);
  }
}
function AtividadeFormComponent_separator_24_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](1, "input-datetime", 56)(2, "input-datetime", 57)(3, "input-datetime", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r23.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r23.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r23.form.controls.data_inicio);
  }
}
function AtividadeFormComponent_separator_24_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](1, "input-datetime", 56)(2, "input-datetime", 57)(3, "input-timer", 59)(4, "input-datetime", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r25.form.controls.data_inicio);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r25.form.controls.data_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r25.form.controls.tempo_despendido);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 4)("control", ctx_r25.form.controls.data_inicio);
  }
}
function AtividadeFormComponent_separator_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "separator", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](1, AtividadeFormComponent_separator_24_div_1_Template, 4, 6, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](2, AtividadeFormComponent_separator_24_ng_template_2_Template, 5, 8, "ng-template", null, 54, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](4, "documento-link", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](3);
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", !(_r6 == null ? null : _r6.selectedItem == null ? null : _r6.selectedItem.data == null ? null : _r6.selectedItem.data.tipo_modalidade == null ? null : _r6.selectedItem.data.tipo_modalidade.atividade_tempo_despendido))("ngIfElse", _r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("documento", ctx_r11.form.controls.documento_entrega.value);
  }
}
class AtividadeFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade, src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_2__.AtividadeDaoService);
    this.injector = injector;
    this.etiquetas = [];
    this.checklist = []; //public checklist: LookupItem[] = [];
    this.planosTrabalhos = [];
    this.planoTrabalhoJoin = ["entregas.plano_entrega_entrega:id,descricao", "tipo_modalidade:id,nome"];
    this.planoTrabalhoSelecionado = null;
    this.usuarioJoin = ['planos_trabalho.entregas.plano_entrega_entrega:id,descricao', 'planos_trabalho.tipo_modalidade:id,nome'];
    this.entregas = [];
    this.validateChecklist = (control, controlName) => {
      let result = null;
      return result;
    };
    this.validate = (control, controlName) => {
      let result = null;
      if (["unidade_id", "descricao"].includes(controlName) && !control?.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "tipo_atividade_id" && !control?.value?.length && !this.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO")) {
        result = "Obrigatório";
      } else if (["data_distribuicao", "data_estipulada_entrega"].includes(controlName)) {
        let prazoEntrega = this.form?.controls.data_estipulada_entrega?.value;
        let dataDistribuicao = this.form?.controls.data_distribuicao?.value;
        if (!this.util.isDataValid(control.value)) {
          result = "Data inválida";
        } else if (controlName == "data_distribuicao" && control.value && this.util.isDataValid(prazoEntrega) && control.value.getTime() > prazoEntrega.getTime()) {
          result = "Maior que entrega";
        } else if (controlName == "data_estipulada_entrega" && control.value && this.util.isDataValid(dataDistribuicao) && control.value.getTime() < dataDistribuicao.getTime()) {
          result = "Menor que distribuição";
        }
      } else if (controlName == "plano_trabalho_id" && !control.value?.length && this.form?.controls?.usuario_id.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "plano_trabalho_entrega_id") {
        if (this.form?.controls?.plano_trabalho_id.value?.length && !control.value?.length) {
          result = "Obrigatório";
        } else if (control.value?.length && !this.entregas.find(x => x.key == control.value)) {
          result = "Selecione";
        }
      }
      return result;
    };
    this.formValidation = form => {
      let result = undefined;
      this.loadEtiquetas();
      if (this.form.controls.tipo_atividade_id.value) {
        let checkAtividade = this.tipoAtividade?.selectedEntity.checklist;
        if (checkAtividade && this.form.controls.checklist.value.length == checkAtividade.length) this.loadChecklist(); // this.loadChecklist();
      }

      const etiquetasKeys = this.etiquetas.map(x => x.key);
      const checklistKeys = this.checklist.map(x => x.id); //const checklistKeys = this.checklist.map(x => x.key);
      const etiqueta = (this.form.controls.etiquetas.value || []).find(x => !etiquetasKeys.includes(x.key));
      const checklst = (this.form.controls.checklist.value || []).find(x => !checklistKeys.includes(x.id) && x.checked);
      if (etiqueta) result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
      if (checklst) result = "Checklist " + checklst.texto + "não pode ser utilizado!";
      /* (RN_ATV_5) A atividade deverá ter perído compatível com o do plano de trabalho (Data de distribuição e Prazo de entrega devem estar dentro do período do plano de trabalho); */
      if (this.planoTrabalhoSelecionado && (this.util.asTimestamp(this.form.controls.data_distribuicao.value) < this.util.asTimestamp(this.planoTrabalhoSelecionado.data_inicio) || this.util.asTimestamp(this.form.controls.data_estipulada_entrega.value) > this.util.asTimestamp(this.planoTrabalhoSelecionado.data_fim))) {
        result = "A atividade deverá ter perído compatível com o do plano de trabalho (" + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_inicio) + " até " + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_fim) + ") [RN_ATV_5]";
      }
      return result;
    };
    const horaInicial = this.auth.hora;
    this.tipoAtividadeDao = injector.get(src_app_dao_tipo_atividade_dao_service__WEBPACK_IMPORTED_MODULE_10__.TipoAtividadeDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.planoTrabalhoDao = injector.get(src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_12__.PlanoTrabalhoDaoService);
    this.atividadeService = injector.get(_atividade_service__WEBPACK_IMPORTED_MODULE_13__.AtividadeService);
    this.calendar = injector.get(src_app_services_calendar_service__WEBPACK_IMPORTED_MODULE_7__.CalendarService);
    this.comentario = injector.get(src_app_services_comentario_service__WEBPACK_IMPORTED_MODULE_9__.ComentarioService);
    this.form = this.fh.FormBuilder({
      numero: {
        default: 0
      },
      descricao: {
        default: ""
      },
      data_distribuicao: {
        default: horaInicial
      },
      carga_horaria: {
        default: 0
      },
      tempo_planejado: {
        default: 0
      },
      data_estipulada_entrega: {
        default: horaInicial
      },
      data_inicio: {
        default: null
      },
      data_entrega: {
        default: null
      },
      esforco: {
        default: 0
      },
      tempo_despendido: {
        default: 0
      },
      data_arquivamento: {
        default: null
      },
      etiquetas: {
        default: []
      },
      checklist: {
        default: []
      },
      prioridade: {
        default: 0
      },
      progresso: {
        default: 0
      },
      plano_trabalho_id: {
        default: null
      },
      plano_trabalho_entrega_id: {
        default: null
      },
      tipo_atividade_id: {
        default: null
      },
      demandante_id: {
        default: ""
      },
      usuario_id: {
        default: null
      },
      unidade_id: {
        default: ""
      },
      documento_requisicao_id: {
        default: null
      },
      documento_entrega_id: {
        default: null
      },
      comentarios: {
        default: []
      },
      pausas: {
        default: []
      },
      etiqueta: {
        default: ""
      },
      tarefas: {
        default: []
      },
      iniciado: {
        default: false
      },
      concluido: {
        default: false
      },
      documento_requisicao: {
        default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__.Documento()
      },
      documento_entrega: {
        default: new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__.Documento()
      }
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: {
        default: ""
      },
      texto: {
        default: ""
      },
      checked: {
        default: false
      }
    }, this.cdRef, this.validateChecklist);
    this.join = ["usuario.planos_trabalho.tipo_modalidade:id,nome", "pausas", "tipo_atividade", "unidade", "comentarios.usuario", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario", "documento_requisicao", "documento_entrega"];
  }
  //"usuario.planos_trabalho.entregas.plano_entrega_entrega:id,descricao", 
  ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length - 1]?.path : "") || "";
    this.action = ["comentar", "clonar"].includes(segment) ? segment : this.action;
  }
  get isClonar() {
    return this.action == "clonar";
  }
  get titleAtividade() {
    return this.form?.controls.numero?.value ? "#" + this.form?.controls.numero?.value : "";
  }
  addItemHandleEtiquetas() {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.form.controls.etiqueta.setValue("");
      }
    }
    return result;
  }
  onUnidadeChange(event) {
    this.loadEtiquetas();
  }
  onDataDistribuicaoChange(event) {
    this.loadUsuario(this.usuario?.selectedEntity); /* Atualiza a lista de planos de trabalho válidos no período */
    this.form?.controls.data_estipulada_entrega.updateValueAndValidity();
  }
  onPrazoEntregaChange(event) {
    this.form?.controls.data_distribuicao.updateValueAndValidity();
  }
  onPlanoTrabalhoChange(event) {
    var _this = this;
    (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.entity) {
        const planoTrabalho = _this.usuario?.selectedEntity?.planos_trabalho?.find(x => x.id == _this.form.controls.plano_trabalho_id.value);
        if (planoTrabalho) {
          if (_this.planoTrabalhoSelecionado?.id != planoTrabalho.id) {
            _this.planoTrabalhoSelecionado = yield _this.planoTrabalhoDao.getById(planoTrabalho.id, _this.planoTrabalhoJoin);
          }
          if (_this.form.controls.unidade_id.value != planoTrabalho.unidade_id) {
            const unidade = yield _this.unidadeDao.getById(planoTrabalho.unidade_id);
            if (unidade) {
              yield _this.unidade?.loadSearch(unidade);
              yield _this.auth.selecionaUnidade(unidade.id);
            }
          }
          const planoTrabalhoEntregaId = _this.form.controls.plano_trabalho_entrega_id.value;
          _this.entregas = _this.planoTrabalhoSelecionado?.entregas?.map(x => Object.assign({}, {
            key: x.id,
            value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
            data: x
          })) || [];
          _this.cdRef.detectChanges();
          _this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && _this.entregas.length > 0 ? _this.entregas[0].key : planoTrabalhoEntregaId);
        } else {
          _this.entregas = [];
          _this.form.controls.plano_trabalho_entrega_id.setValue(null);
        }
      }
    })();
  }
  loadEtiquetas() {
    this.etiquetas = this.atividadeService.buildEtiquetas(this.unidade?.selectedEntity, this.tipoAtividade?.selectedEntity);
  }
  loadChecklist() {
    const tipoAtividade = this.tipoAtividade?.selectedEntity;
    let checkAdd = tipoAtividade.checklist?.map(a => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      };
    });
    this.checklist = checkAdd || []; //this.checklist = tipoAtividade?.checklist || [];
    this.form.controls.checklist.setValue(checkAdd);
    this.atividadeService.buildChecklist(tipoAtividade, this.form.controls.checklist);
  }
  loadTipoAtividade(tipoAtividade) {
    if (tipoAtividade) {
      this.loadEtiquetas();
      this.loadChecklist();
    } else {
      this.etiquetas = [];
      this.form.controls.esforco.setValue(0);
      this.form.controls.tempo_planejado.setValue(0);
    }
    this.cdRef.detectChanges();
  }
  getPlanosTrabalhos(usuario, data_distribuicao, plano_trabalho_id) {
    return usuario.planos_trabalho?.filter(x => x.id == plano_trabalho_id || this.util.between(data_distribuicao, {
      start: x.data_inicio,
      end: x.data_fim
    })).map(x => Object.assign({
      key: x.id,
      value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio) + " a " + this.usuarioDao.getDateFormatted(x.data_fim),
      data: x
    })) || [];
  }
  loadUsuario(usuario) {
    if (usuario) {
      const planoTrabalhoId = this.form.controls.plano_trabalho_id.value;
      const dataDistribuicao = this.form.controls.data_distribuicao.value || new Date();
      this.planosTrabalhos = this.getPlanosTrabalhos(usuario, dataDistribuicao, planoTrabalhoId); //usuario?.planos?.map(x => Object.assign({key: x.id, value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim), data: x})) || [];
      if (this.hasUsuarioActionNew && this.auth.usuario.id == this.form.controls.usuario_id.value) this.form.controls.iniciado.setValue(true);
      this.cdRef.detectChanges();
      this.form.controls.plano_trabalho_id.setValue(!planoTrabalhoId?.length && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoId);
    } else {
      this.planosTrabalhos = [];
      this.form.controls.plano_trabalho_id.setValue(null);
    }
    this.cdRef.detectChanges();
  }
  get hasUsuarioActionNew() {
    return this.form?.controls.usuario_id?.value?.length && this.action == "new";
  }
  onTipoAtividadeSelect(item) {
    const tipoAtividade = item.entity;
    this.loadTipoAtividade(tipoAtividade);
    this.atividadeService.comentarioAtividade(tipoAtividade, this.form.controls.comentarios);
    this.cdRef.detectChanges();
  }
  /*public comentarioAtividade(tipoAtividade?: TipoAtividade) {
    const comentarios: Comentario[] = this.form.controls.comentarios.value || [];
    const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
    if(index >= 0) {
      if(comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if(tipoAtividade?.comentario?.length) {
      const comentario = new Comentario();
      comentario.id = this.dao!.generateUuid();
      comentario.path = "";
      comentario.texto = tipoAtividade.comentario;
      comentario.data_comentario = this.auth.hora;
      comentario.usuario_id = this.auth.usuario!.id;
      comentario.comentario_id = null;
      comentario.tipo = "TIPO_ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      this.form.controls.comentarios.setValue(this.comentario.orderComentarios(comentarios));
      this.cdRef.detectChanges();
    }
  }*/
  onTipoAtividadeChange(event) {
    if (!this.form?.controls.tipo_atividade_id.value?.length) this.loadTipoAtividade(undefined);
  }
  onUsuarioSelect(item) {
    const usuario = item.entity;
    this.loadUsuario(usuario);
  }
  onUsuarioChange(event) {
    if (!this.form?.controls.usuario_id.value?.length) this.loadUsuario(undefined);
  }
  onConcluidoChange(event) {
    if (this.hasUsuarioActionNew && this.form.controls.concluido.value) {
      this.form.controls.iniciado.setValue(true);
      this.form.controls.progresso.setValue(100);
    } else {
      this.form.controls.progresso.setValue(0);
    }
  }
  orderPausas(pausas) {
    return pausas.sort((a, b) => {
      return a.data_inicio < b.data_inicio ? -1 : 1;
    });
  }
  loadData(entity, form) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      formValue = _this2.util.fillForm(formValue, entity);
      _this2.planoTrabalhoSelecionado = entity.plano_trabalho;
      yield Promise.all([_this2.unidade?.loadSearch(entity.unidade || formValue.unidade_id, false), _this2.usuario?.loadSearch(entity.usuario || formValue.usuario_id, false), _this2.tipoAtividade?.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id, false)]);
      form.patchValue(formValue, {
        emitEvent: false
      }); /* Carrega valores iniciais no form e previne que o plano_id seja sobrescrito */
      if (entity.usuario) _this2.loadUsuario(entity.usuario);
      if (entity.tipo_atividade) _this2.loadTipoAtividade(entity.tipo_atividade);
      if (entity.unidade_id != _this2.auth.unidade.id) yield _this2.auth.selecionaUnidade(entity.unidade_id);
      entity.comentarios = _this2.comentario.orderComentarios(entity.comentarios || []);
      entity.pausas = _this2.orderPausas(entity.pausas || []);
      form.patchValue(_this2.util.fillForm(formValue, _this2.form.value)); /* Carrega os valores e dispara os eventos */
      _this2.loadEtiquetas();
    })();
  }
  initializeData(form) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.isClonar) {
        const source = yield _this3.dao.getAtividade(_this3.urlParams.get("id"));
        _this3.entity = new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade();
        Object.assign(_this3.entity, {
          tipo_atividade: source.tipo_atividade,
          unidade: source.unidade,
          usuario: source.usuario,
          plano_trabalho: source.plano_trabalho,
          descricao: source.descricao,
          data_distribuicao: source.data_distribuicao,
          tempo_planejado: source.tempo_planejado,
          carga_horaria: source.carga_horaria,
          data_estipulada_entrega: source.data_estipulada_entrega,
          esforco: source.esforco,
          tipo_atividade_id: source.tipo_atividade_id,
          demandante_id: _this3.auth.usuario?.id,
          usuario_id: source.usuario_id,
          unidade_id: source.unidade_id,
          plano_trabalho_id: source.plano_trabalho_id,
          etiquetas: source.etiquetas,
          checklist: source.checklist,
          metadados: source.metadados,
          plano_trabalho_entrega_id: source.plano_trabalho_entrega_id,
          progresso: source.progresso,
          tarefas: (source.tarefas || []).map(tarefa => new src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_8__.AtividadeTarefa(Object.assign({}, tarefa, {
            id: _this3.dao.generateUuid(),
            comentarios: [],
            _status: "ADD"
          }))),
          documento_requisicao: !source.documento_requisicao ? undefined : Object.assign({}, new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__.Documento(Object.assign({}, source.documento_requisicao, {
            id: _this3.dao.generateUuid(),
            _status: "ADD"
          }))),
          documento_entrega: !source.documento_entrega ? undefined : Object.assign({}, new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_11__.Documento(Object.assign({}, source.documento_entrega, {
            id: _this3.dao.generateUuid(),
            _status: "ADD"
          })))
        });
      } else {
        _this3.sei = _this3.metadata?.sei;
        _this3.entity = new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade();
        _this3.entity.data_distribuicao = _this3.auth.hora;
        _this3.entity.data_estipulada_entrega = _this3.entity.data_distribuicao;
        _this3.entity.demandante_id = _this3.auth.usuario?.id || "";
        _this3.entity.unidade_id = _this3.auth.unidade?.id || "";
        _this3.entity.unidade = _this3.auth.unidade;
        _this3.entity.metadados = {
          atrasado: false,
          tempo_despendido: 0,
          tempo_atraso: 0,
          pausado: false,
          iniciado: false,
          concluido: false,
          avaliado: false,
          arquivado: false,
          produtividade: 0,
          consolidacoes: []
        };
        if (!_this3.auth.isGestorUnidade(_this3.entity.unidade_id)) {
          let usuario = yield _this3.usuarioDao.getById(_this3.auth.usuario.id, _this3.usuarioJoin);
          _this3.entity.usuario_id = usuario?.id || null;
          _this3.entity.usuario = usuario || undefined;
        }
      }
      yield _this3.loadData(_this3.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      let atividade = this.util.fill(new src_app_models_atividade_model__WEBPACK_IMPORTED_MODULE_3__.Atividade(), this.entity);
      this.comentarios?.confirm();
      atividade = this.util.fillForm(atividade, this.form.value);
      if (this.hasUsuarioActionNew) {
        if (this.form.controls.iniciado.value) {
          atividade.data_inicio = atividade.data_distribuicao;
          atividade.status = 'INICIADO';
          if (this.form.controls.concluido.value) {
            let efemerides = this.calendar.calculaDataTempoUnidade(atividade.data_inicio, atividade.data_estipulada_entrega, this.planoTrabalhoSelecionado.carga_horaria, this.unidade?.selectedEntity, "ENTREGA");
            atividade.data_entrega = atividade.data_estipulada_entrega;
            atividade.progresso = 100;
            atividade.tempo_despendido = efemerides?.tempoUtil || 0;
            atividade.status = 'CONCLUIDO';
          }
        }
      }
      atividade.documento_requisicao = this.requisicao?.documento;
      atividade.comentarios = atividade.comentarios.filter(x => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
      atividade.tarefas = atividade.tarefas.filter(tarefa => {
        tarefa.comentarios = tarefa.comentarios.filter(x => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
        return ["ADD", "EDIT", "DELETE"].includes(tarefa._status || "");
      });
      resolve(atividade);
    });
  }
}
_class = AtividadeFormComponent;
_class.ɵfac = function AtividadeFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_31__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-form"]],
  viewQuery: function AtividadeFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵviewQuery"](_c6, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.etiqueta = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.tipoAtividade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.planoTrabalho = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵloadQuery"]()) && (ctx.requisicao = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵInheritDefinitionFeature"]],
  decls: 59,
  vars: 58,
  consts: [["initialFocus", "descricao", 3, "form", "disabled", "submit", "cancel"], ["display", "", "right", "", 3, "title"], ["key", "ATIVIDADE", "label", "Atividade"], [3, "sei", "documento"], ["requisicao", ""], [1, "row"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", "required", "", 3, "size", "rows", "control"], ["controlName", "unidade_id", "required", "", 3, "label", "size", "dao", "change"], ["unidade", ""], ["controlName", "tipo_atividade_id", 3, "label", "emptyValue", "size", "dao", "labelInfo", "required", "select", "change"], ["tipoAtividade", ""], ["label", "Iniciado", "controlName", "iniciado", 3, "size", "disabled", 4, "ngIf"], ["label", "Conclu\u00EDdo", "controlName", "concluido", 3, "size", "change", 4, "ngIf"], ["controlName", "usuario_id", "labelInfo", "Participante respons\u00E1vel pela execu\u00E7\u00E3o", 3, "label", "size", "emptyValue", "dao", "join", "select", "change"], ["usuario", ""], ["controlName", "plano_trabalho_id", 3, "label", "size", "control", "items", "labelInfo", "change"], ["planoTrabalho", ""], ["controlName", "plano_trabalho_entrega_id", 3, "label", "size", "control", "items", "labelInfo"], ["entrega", ""], ["class", "row", 4, "ngIf", "ngIfElse"], ["comEsforco", ""], ["title", "Conclus\u00E3o", 4, "ngIf"], ["key", "TAREFAS", 3, "label"], [3, "control", "atividade", "disabled"], ["key", "CARACTERIZACAO", "label", "Caracteriza\u00E7\u00E3o"], ["label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control", "addItemHandle"], ["controlName", "etiqueta", 3, "size", "control", "items"], ["etiqueta", ""], [1, "col-md-6"], ["editable", "", 3, "control", "form", "hasAdd", "hasDelete"], ["type", "switch", "title", "Check", "field", "checked"], ["type", "text", "title", "Texto", "field", "texto"], ["type", "options"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"], ["clss", "row"], ["origem", "ATIVIDADE", 3, "control"], ["comentarios", ""], ["key", "COMPLEMENTARES", "label", "Complementares"], ["label", "Demandante", "controlName", "demandante_id", "disabled", "", 3, "size", "dao"], [1, "card", "col-md-4", "mt-4"], [1, "card-header"], [1, "bi", "bi-pause-circle"], [1, "card-body"], ["disabled", "", 3, "control", "hasEdit", "hasDelete", "minHeight"], ["pausas", ""], ["title", "In\u00EDcio", "type", "datetime", "field", "data_inicio"], ["title", "Fim", "type", "datetime", "field", "data_fim"], ["label", "Iniciado", "controlName", "iniciado", 3, "size", "disabled"], ["label", "Conclu\u00EDdo", "controlName", "concluido", 3, "size", "change"], ["noIcon", "", "controlName", "data_distribuicao", "labelInfo", "Data de inclus\u00E3o/distribui\u00E7\u00E3o/lan\u00E7amento", 3, "size", "label", "control", "change"], ["label", "Progresso", "disabled", "", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso de execu\u00E7\u00E3o (% Conclu\u00EDdo)", 3, "size", "decimals"], ["noIcon", "", "controlName", "data_estipulada_entrega", "labelInfo", "Data estipulada para entrega da atividade", 3, "size", "label", "control", "change"], ["icon", "bi bi-stopwatch", "onlyHours", "", "controlName", "esforco", "labelInfo", "Tempo estimado de execu\u00E7\u00E3o", 3, "size", "label", "control"], ["title", "Conclus\u00E3o"], ["comTempoDespendido", ""], [3, "documento"], ["noIcon", "", "label", "Inicio", "controlName", "data_inicio", "disabled", "", "labelInfo", "Data em que o usu\u00E1rio iniciou a atividade", 3, "size", "control"], ["noIcon", "", "label", "Conclus\u00E3o", "controlName", "data_entrega", "disabled", "", "labelInfo", "Data da conclus\u00E3o da atividade", 3, "size", "control"], ["label", "Data de arquivamento", "controlName", "data_arquivamento", "disabled", "", "labelInfo", "Data de arquivamento da atividade", 3, "size", "control"], ["label", "Tempo despendido", "icon", "bi bi-hourglass-bottom", "controlName", "tempo_despendido", "disabled", "", "labelInfo", "Calculado no fim da atividade, sendo o tempo l\u00EDquido (considerando pausas)", 3, "size", "control"]],
  template: function AtividadeFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("submit", function AtividadeFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function AtividadeFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](3, "documento-link", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](6, "input-textarea", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](7, "div", 5)(8, "input-search", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_Template_input_search_change_8_listener($event) {
        return ctx.onUnidadeChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](10, "input-search", 9, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("select", function AtividadeFormComponent_Template_input_search_select_10_listener($event) {
        return ctx.onTipoAtividadeSelect($event);
      })("change", function AtividadeFormComponent_Template_input_search_change_10_listener($event) {
        return ctx.onTipoAtividadeChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](12, AtividadeFormComponent_input_switch_12_Template, 1, 2, "input-switch", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](13, AtividadeFormComponent_input_switch_13_Template, 1, 1, "input-switch", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](14, "div", 5)(15, "input-search", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("select", function AtividadeFormComponent_Template_input_search_select_15_listener($event) {
        return ctx.onUsuarioSelect($event);
      })("change", function AtividadeFormComponent_Template_input_search_change_15_listener($event) {
        return ctx.onUsuarioChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](17, "input-select", 15, 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵlistener"]("change", function AtividadeFormComponent_Template_input_select_change_17_listener($event) {
        return ctx.onPlanoTrabalhoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](19, "input-select", 17, 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](21, AtividadeFormComponent_div_21_Template, 4, 8, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](22, AtividadeFormComponent_ng_template_22_Template, 5, 11, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtemplate"](24, AtividadeFormComponent_separator_24_Template, 5, 3, "separator", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](25, "tab", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](26, "atividade-list-tarefa", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](27, "tab", 24)(28, "div", 5)(29, "input-multiselect", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](30, "input-select", 26, 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](32, "div", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](33, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](34, "h5");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](35, "Checklist");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](36, "grid", 29)(37, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](38, "column", 30)(39, "column", 31)(40, "column", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](41, "tab", 33)(42, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](43, "comentarios", 35, 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](45, "tab", 37)(46, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](47, "input-search", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](48, "div", 34)(49, "div", 39)(50, "h5", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](51, "i", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵtext"](52, " Suspens\u00F5es/Pausas ");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementStart"](53, "div", 42)(54, "grid", 43, 44)(56, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelement"](57, "column", 45)(58, "column", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵelementEnd"]()()()()()()()();
    }
    if (rf & 2) {
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](18);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵreference"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("title", ctx.titleAtividade);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("sei", ctx.sei)("documento", ctx.form.controls.documento_requisicao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("rows", 2)("control", ctx.form.controls.descricao);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Unidade"))("size", ctx.hasUsuarioActionNew ? 5 : 6)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Tipo de atividade"))("emptyValue", null)("size", ctx.hasUsuarioActionNew ? 5 : 6)("dao", ctx.tipoAtividadeDao)("labelInfo", ctx.lex.translate("Tipo de atividade") + " utilizado para classificar a atividade")("required", !ctx.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO") ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", ctx.hasUsuarioActionNew);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", ctx.hasUsuarioActionNew);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Respons\u00E1vel"))("size", 4)("emptyValue", null)("dao", ctx.usuarioDao)("join", ctx.usuarioJoin);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Plano de trabalho"))("size", 4)("control", ctx.form.controls.plano_trabalho_id)("items", ctx.planosTrabalhos)("labelInfo", ctx.lex.translate("Plano de trabalho"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Entrega"))("size", 4)("control", ctx.form.controls.plano_trabalho_entrega_id)("items", ctx.entregas)("labelInfo", ctx.lex.translate("Entrega") + ctx.lex.translate("plano de trabalho") + " que a " + ctx.lex.translate("atividade") + " \u00E9 referente");
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", !(_r6 == null ? null : _r6.selectedItem == null ? null : _r6.selectedItem.data == null ? null : _r6.selectedItem.data.tipo_modalidade == null ? null : _r6.selectedItem.data.tipo_modalidade.atividade_esforco))("ngIfElse", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("ngIf", ctx.form.controls.data_entrega.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("label", ctx.lex.translate("Tarefas"));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx.form.controls.tarefas)("atividade", ctx.entity)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.etiquetas)("addItemHandle", ctx.addItemHandleEtiquetas.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.etiqueta)("items", ctx.etiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx.form.controls.checklist)("form", ctx.formChecklist)("hasAdd", true)("hasDelete", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx.form.controls.comentarios);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("size", 12)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_31__["ɵɵproperty"]("control", ctx.form.controls.pausas)("hasEdit", false)("hasDelete", false)("minHeight", 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_32__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_14__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_15__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_16__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_17__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_18__.InputSearchComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_19__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_20__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_21__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_22__.InputMultiselectComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_23__.InputTimerComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_24__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_25__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_26__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_27__.InputNumberComponent, _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_28__.ComentariosComponent, _uteis_documentos_documentos_link_documentos_link_component__WEBPACK_IMPORTED_MODULE_29__.DocumentosLinkComponent, _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_30__.AtividadeListTarefaComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 52416:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-hierarquia/atividade-hierarquia.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeHierarquiaComponent: () => (/* binding */ AtividadeHierarquiaComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-base */ 17112);
/* harmony import */ var _plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../plano-entrega/plano-entrega.service */ 77447);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _uteis_planejamento_show_planejamento_show_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../uteis/planejamento-show/planejamento-show.component */ 57045);

var _class;








function AtividadeHierarquiaComponent_ng_container_0_planejamento_show_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "planejamento-show", 10);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("planejamento", ctx_r1.atividade.planejamento);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 11)(1, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Cadeia de valor:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r2.atividade.cadeiaValor.nome);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_5_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
}
const _c0 = function () {
  return [];
};
function AtividadeHierarquiaComponent_ng_container_0_div_5_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, AtividadeHierarquiaComponent_ng_container_0_div_5_div_3_ng_container_2_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const objetivo_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](2, _c0).constructor(i_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](objetivo_r7.nome);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 12)(1, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Objetivos:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeHierarquiaComponent_ng_container_0_div_5_div_3_Template, 5, 3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r3.atividade.objetivos);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const processo_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](processo_r13.nome);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 16)(1, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Processos:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeHierarquiaComponent_ng_container_0_div_6_div_3_Template, 3, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r4.atividade.processos);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_7_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, AtividadeHierarquiaComponent_ng_container_0_div_7_div_3_ng_container_2_Template, 2, 0, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 18)(4, "h5", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 19)(7, "span", 20)(8, "b", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Meta:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "badge", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "span", 23)(12, "b", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, "Realizado:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "badge", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "span", 25)(16, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, "Progresso:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "progress-bar", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](19, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const entrega_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](6, _c0).constructor(i_r16));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", entrega_r15.descricao, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", ctx_r14.planoEntregaService.getValorMeta(entrega_r15));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("label", ctx_r14.planoEntregaService.getValorRealizado(entrega_r15));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", entrega_r15.progresso_realizado)("goal", entrega_r15.progresso_esperado);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 17)(1, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Entrega do plano de entregas:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeHierarquiaComponent_ng_container_0_div_7_div_3_Template, 20, 7, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r5.atividade.entregasPlanoEntrega);
  }
}
function AtividadeHierarquiaComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, AtividadeHierarquiaComponent_ng_container_0_planejamento_show_2_Template, 1, 1, "planejamento-show", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, AtividadeHierarquiaComponent_ng_container_0_div_3_Template, 5, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, AtividadeHierarquiaComponent_ng_container_0_div_5_Template, 4, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, AtividadeHierarquiaComponent_ng_container_0_div_6_Template, 4, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, AtividadeHierarquiaComponent_ng_container_0_div_7_Template, 4, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 7)(9, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, "Aloca\u00E7\u00E3o:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "h5", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "For\u00E7a de trabalho: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "div", 9)(18, "h6");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "Atividade:");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "h5", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](23, "Data estipulada para entrega: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.atividade.planejamento);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.atividade.cadeiaValor);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.atividade.objetivos);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.atividade.processos == null ? null : ctx_r0.atividade.processos.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.atividade.entregasPlanoEntrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r0.atividade.entregaPlanoTrabalho.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", ctx_r0.atividade.entregaPlanoTrabalho.forca_trabalho, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r0.atividade.atividade.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r0.util.getDateTimeFormatted(ctx_r0.atividade.atividade.data_estipulada_entrega));
  }
}
class AtividadeHierarquiaComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_2__.PageBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_1__.AtividadeDaoService);
    this.planoEntregaService = injector.get(_plano_entrega_plano_entrega_service__WEBPACK_IMPORTED_MODULE_3__.PlanoEntregaService);
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.urlParams.get("id")) {
      this.loadAtividade(this.urlParams.get("id"));
    }
  }
  loadAtividade(atividade_id) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this.atividadeDao.getHierarquia(atividade_id);
      if (result) {
        _this.atividade = result;
      }
    })();
  }
}
_class = AtividadeHierarquiaComponent;
_class.ɵfac = function AtividadeHierarquiaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["atividade-hierarquia"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 1,
  vars: 1,
  consts: [[4, "ngIf"], [1, "d-flex", "align-items-stretch"], [3, "planejamento", 4, "ngIf"], ["class", "cadeiaValor arrow_box first-box w-100 ms-3", 4, "ngIf"], ["class", "objetivos arrow_box w-100", 4, "ngIf"], ["class", "procesos arrow_box w-100 ms-3", 4, "ngIf"], ["class", "plano_entrega_entrega arrow_box", 4, "ngIf"], [1, "plano_trabalho_entrega", "arrow_box"], [1, "mb-2"], [1, "atividade", "arrow_box"], [3, "planejamento"], [1, "cadeiaValor", "arrow_box", "first-box", "w-100", "ms-3"], [1, "objetivos", "arrow_box", "w-100"], [4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-start", "align-items-center"], [1, "bi", "bi-chevron-right"], [1, "procesos", "arrow_box", "w-100", "ms-3"], [1, "plano_entrega_entrega", "arrow_box"], [1, "ms-3", "flex-grow-1", "d-flex", "flex-column"], [1, "d-flex", "justify-content-start", "align-items-center", "m-0"], [1, "text-center"], [1, "d-block"], ["icon", "bi bi-graph-up-arrow", "color", "light", 3, "label"], [1, "text-center", "ms-3"], ["icon", "bi bi-check-lg", "color", "light", 3, "label"], [1, "ms-3", "flex-fill"], [1, ""], ["color", "success", 3, "value", "goal"]],
  template: function AtividadeHierarquiaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, AtividadeHierarquiaComponent_ng_container_0_Template, 26, 9, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.atividade);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_4__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_5__.ProgressBarComponent, _uteis_planejamento_show_planejamento_show_component__WEBPACK_IMPORTED_MODULE_6__.PlanejamentoShowComponent],
  styles: ["h6[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(194, 225, 245, 0.14);\n  padding-bottom: 5px;\n  color: var(--bs-body-color);\n}\n\nh5[_ngcontent-%COMP%] {\n  color: var(--bs-body-color);\n  font-weight: 300;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vYXRpdmlkYWRlL2F0aXZpZGFkZS1oaWVyYXJxdWlhL2F0aXZpZGFkZS1oaWVyYXJxdWlhLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0RBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtBQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaDYge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2IoMTk0IDIyNSAyNDUgLyAxNCUpO1xyXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbiAgY29sb3I6ICB2YXIoLS1icy1ib2R5LWNvbG9yKTtcclxufVxyXG5oNSB7XHJcbiAgY29sb3I6IHZhcigtLWJzLWJvZHktY29sb3IpO1xyXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 65971:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-kanban/atividade-list-kanban.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeListKanbanComponent: () => (/* binding */ AtividadeListKanbanComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../atividade-list-base */ 94180);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;


const _c0 = ["filterRef"];
const _c1 = ["kanbanEtiquetas"];
const _c2 = ["dockerNaoIniciado"];
const _c3 = ["dockerPausado"];
const _c4 = ["dockerIniciado"];
const _c5 = ["dockerConcluido"];
const _c6 = ["planoEntrega"];
const _c7 = ["planoEntregaEntrega"];
function AtividadeListKanbanComponent_ng_template_21_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "badge", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AtividadeListKanbanComponent_ng_template_21_badge_0_Template_badge_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r19);
      const card_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r17.onEntregaClick(card_r13.data));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r14.entityService.getIcon("Entrega"))("label", card_r13.data.plano_trabalho_entrega.descricao);
  }
}
function AtividadeListKanbanComponent_ng_template_21_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "profile-picture", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("url", card_r13.data.usuario.url_foto)("hint", "Respons\u00E1vel: " + ((card_r13.data.usuario == null ? null : card_r13.data.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio"));
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_badge_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "badge", 43);
  }
  if (rf & 2) {
    const status_r26 = ctx.$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", status_r26.color)("label", status_r26.label)("icon", status_r26.icon)("data", status_r26)("click", status_r26.data.filter ? ctx_r22.onStatusClick.bind(ctx_r22) : undefined);
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "badge", 43);
  }
  if (rf & 2) {
    const etiqueta_r27 = ctx.$implicit;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", etiqueta_r27.color)("label", etiqueta_r27.value)("icon", etiqueta_r27.icon)("data", etiqueta_r27)("click", ctx_r23.onEtiquetaClick.bind(ctx_r23));
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_separator_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "separator", 44);
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_tr_1_i_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 48);
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_tr_1_i_2_Template, 1, 0, "i", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const check_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", check_r29.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](check_r29.texto);
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_tr_1_Template, 5, 2, "tr", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const card_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).card;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", card_r13.data.checklist);
  }
}
function AtividadeListKanbanComponent_ng_template_21_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "documentos-badge", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, AtividadeListKanbanComponent_ng_template_21_ng_container_16_badge_3_Template, 1, 5, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AtividadeListKanbanComponent_ng_template_21_ng_container_16_badge_4_Template, 1, 5, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AtividadeListKanbanComponent_ng_template_21_ng_container_16_separator_5_Template, 1, 0, "separator", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AtividadeListKanbanComponent_ng_template_21_ng_container_16_table_6_Template, 2, 1, "table", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "reaction", 41)(8, "comentarios-widget", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const card_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().card;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("documento", card_r13.data.documento_requisicao);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r16.atividadeService.getStatus(card_r13.data));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", card_r13.data.etiquetas);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r13.data.checklist == null ? null : card_r13.data.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r13.data.checklist == null ? null : card_r13.data.checklist.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("entity", card_r13.data);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("entity", card_r13.data)("selectable", false)("query", ctx_r16.query);
  }
}
function AtividadeListKanbanComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AtividadeListKanbanComponent_ng_template_21_badge_0_Template, 1, 2, "badge", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 26)(2, "div", 27)(3, "div", 28)(4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, AtividadeListKanbanComponent_ng_template_21_div_15_Template, 2, 2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, AtividadeListKanbanComponent_ng_template_21_ng_container_16_Template, 9, 9, "ng-container", 34);
  }
  if (rf & 2) {
    const card_r13 = ctx.card;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r13.data.plano_trabalho_entrega);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" #", card_r13.data.numero, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", card_r13.data.unidade.sigla, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("title", "Respons\u00E1vel: ", (card_r13.data.usuario == null ? null : card_r13.data.usuario.nome) || "N\u00E3o atribuido a nenhum usu\u00E1rio", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"]("bi " + ((card_r13.data.usuario == null ? null : card_r13.data.usuario.nome == null ? null : card_r13.data.usuario.nome.length) ? "bi-person-check" : "bi-person-x"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r6.util.apelidoOuNome(card_r13.data.usuario, true) || "(N\u00E3o atribu\u00EDdo)", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("title", "Demandante: ", (card_r13.data.demandante == null ? null : card_r13.data.demandante.nome) || "Desconhecido", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r6.util.apelidoOuNome(card_r13.data.demandante, true) || "Desconhecido", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", card_r13.data.usuario);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r6.filter == null ? null : ctx_r6.filter.controls == null ? null : ctx_r6.filter.controls.resumido == null ? null : ctx_r6.filter.controls.resumido.value));
  }
}
function AtividadeListKanbanComponent_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "input-select", 49);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 12)("control", ctx_r8.formEdit.controls.etiqueta)("items", ctx_r8.etiquetasEdit);
  }
}
function AtividadeListKanbanComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 50)(1, "div", 26)(2, "div", 27)(3, "h5", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 53)(6, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "i", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "h6", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "span", 59)(12, "span", 60)(13, "span", 60)(14, "span", 52)(15, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function AtividadeListKanbanComponent_kanban_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "kanban", 61)(1, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "docker", 62, 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "docker", 64, 65)(7, "docker", 66, 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "swimlane");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "docker", 68, 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](22);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r5)("placeholderTemplate", _r9)("loading", ctx_r11.loading)("dragSwimlanes", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r11.cardsConfig.naoIniciado)("toggle", ctx_r11.onDockerCollapse.bind(ctx_r11))("menu", ctx_r11.menuDockerNaoIniciado)("dragged", ctx_r11.onDragged.bind(ctx_r11))("drop", ctx_r11.onDrop.bind(ctx_r11))("dropIf", ctx_r11.canDrop(ctx_r11.DOCKERS[ctx_r11.NAOINICIADO]))("cards", ctx_r11.cards[ctx_r11.NAOINICIADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r11.cardsConfig.iniciado)("toggle", ctx_r11.onDockerCollapse.bind(ctx_r11))("dragged", ctx_r11.onDragged.bind(ctx_r11))("drop", ctx_r11.onDrop.bind(ctx_r11))("dropIf", ctx_r11.canDrop(ctx_r11.DOCKERS[ctx_r11.INICIADO]))("cards", ctx_r11.cards[ctx_r11.INICIADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r11.cardsConfig.pausado)("toggle", ctx_r11.onDockerCollapse.bind(ctx_r11))("dragged", ctx_r11.onDragged.bind(ctx_r11))("drop", ctx_r11.onDrop.bind(ctx_r11))("dropIf", ctx_r11.canDrop(ctx_r11.DOCKERS[ctx_r11.PAUSADO]))("cards", ctx_r11.cards[ctx_r11.PAUSADO]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collapse", ctx_r11.cardsConfig.concluido)("toggle", ctx_r11.onDockerCollapse.bind(ctx_r11))("dragged", ctx_r11.onDragged.bind(ctx_r11))("drop", ctx_r11.onDrop.bind(ctx_r11))("dropIf", ctx_r11.canDrop(ctx_r11.DOCKERS[ctx_r11.CONCLUIDO]))("cards", ctx_r11.cards[ctx_r11.CONCLUIDO]);
  }
}
function AtividadeListKanbanComponent_kanban_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "kanban", 70, 71);
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](22);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](26);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dockers", ctx_r12.labels)("template", _r5)("placeholderTemplate", _r9)("loading", ctx_r12.loading)("swimlaneDrop", ctx_r12.onSwimlaneDrop.bind(ctx_r12))("dockerDragged", ctx_r12.onDragged.bind(ctx_r12))("dockerDrop", ctx_r12.onDrop.bind(ctx_r12))("dockerEditTemplate", _r7)("dockerToggle", ctx_r12.onDockerCollapse.bind(ctx_r12))("dockerEdit", ctx_r12.editEtiquetas.bind(ctx_r12))("dockerSave", ctx_r12.saveEtiquetas.bind(ctx_r12))("dockerDelete", ctx_r12.deleteEtiquetas.bind(ctx_r12))("dockerCancel", ctx_r12.cancelEtiquetas.bind(ctx_r12))("dockerColorStyle", ctx_r12.getLabelStyle);
  }
}
class AtividadeListKanbanComponent extends _atividade_list_base__WEBPACK_IMPORTED_MODULE_1__.AtividadeListBase {
  constructor(injector) {
    var _this;
    super(injector);
    _this = this;
    this.injector = injector;
    this.TITLE_OUTRAS = "Outras";
    this.NAOINICIADO = 0;
    this.PAUSADO = 1;
    this.INICIADO = 2;
    this.CONCLUIDO = 3;
    this.AVALIADO = 4;
    this.DOCKERS = ["NAOINICIADO", "PAUSADO", "INICIADO", "CONCLUIDO"];
    this.cards = [[], [], [], []];
    this.cardsConfig = {
      naoIniciado: false,
      pausado: false,
      iniciado: false,
      concluido: false
    };
    this.labels = [];
    this.cardsVersion = 0;
    this.dragDrop = {};
    this.rowsLimit = 500;
    this.kanbanQueryOptions = {};
    this.etiquetasEdit = [];
    this.planosEntregas = [];
    this.planosEntregasEntregas = [];
    this.toolbarButtons = [{
      icon: "bi bi-search",
      label: "Filtrar",
      onClick: () => this.filterRef?.toggle()
    }, {
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      label: "Incluir",
      onClick: function () {
        var _ref = (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return yield _this.add();
        });
        return function onClick() {
          return _ref.apply(this, arguments);
        };
      }()
    }];
    this.outrasButtons = [{
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }];
    this.etiquetasButtons = [{
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }];
    this.menuDockerNaoIniciado = [{
      icon: "bi bi-plus-circle",
      color: "btn-outline-primary",
      hint: "Incluir",
      onClick: function () {
        var _ref2 = (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return yield _this.add();
        });
        return function onClick() {
          return _ref2.apply(this, arguments);
        };
      }()
    }];
    this.filterWhere = filter => {
      let result = this.fixedFilter || [];
      let form = filter.value;
      if (form.usuario_id?.length) {
        result.push(["usuario_id", "==", form.usuario_id]);
      }
      if (form.unidade_id?.length) {
        result.push(["unidade_id", "==", form.unidade_id]);
      }
      if (form.unidades_subordinadas) {
        result.push(["unidades_subordinadas", "==", true]);
      }
      if (form.etiquetas?.length) {
        result.push(["etiquetas", "in", form.etiquetas.map(x => x.value)]);
      }
      if (form.numero_processo?.length) {
        result.push(["numero_processo", "==", form.numero_processo]);
      }
      if (form.status?.length && !result.find(x => x[0] == "status")) {
        result.push(["status", "==", form.status]);
      }
      if (form.plano_entrega_id?.length) {
        result.push(["plano_entrega_id", "==", form.plano_entrega_id]);
      }
      if (form.plano_entrega_entrega_id?.length) {
        result.push(["plano_entrega_entrega_id", "==", form.plano_entrega_entrega_id]);
      }
      result.push(["data_arquivamento", "==", null]); /* Não trazer as arquivadas */
      return result;
    };
    /* Inicializações */
    this.code = "MOD_DMD";
    this.filter = this.fh.FormBuilder({
      atribuidas_para_mim: {
        default: false
      },
      usuario_id: {
        default: ""
      },
      somente_unidade_atual: {
        default: false
      },
      unidades_subordinadas: {
        default: false
      },
      unidade_id: {
        default: ""
      },
      numero_processo: {
        default: ""
      },
      status: {
        default: ""
      },
      usarEtiquetas: {
        default: !!this.usuarioConfig?.kanban_usar_etiquetas
      },
      resumido: {
        default: !!this.usuarioConfig?.kanban_resumido
      },
      etiquetas: {
        default: []
      },
      plano_entrega_id: {
        default: null
      },
      plano_entrega_entrega_id: {
        default: null
      }
    });
    this.formEdit = this.fh.FormBuilder({
      etiqueta: {
        default: null
      }
    });
    this.cardsConfig = Object.assign(this.cardsConfig, this.usuarioConfig?.kanban_status_dockers);
    this.groupBy = [];
    this.loadEtiquetas();
    this.loadLabel();
  }
  defaultUsuarioConfig() {
    return Object.assign(super.defaultUsuarioConfig(), {
      active_tab: "TABELA",
      kanban_resumido: false,
      kanban_usar_etiquetas: false,
      kanban_status_dockers: {
        naoIniciado: false,
        pausado: false,
        iniciado: false,
        concluido: false
      },
      kanban_etiquetas_dockers: []
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.query.onLoadingChange = loading => {
      this.loading = loading;
      this.cdRef.detectChanges();
    };
    this.loading = this.query.loading;
    this.query.subject.asObservable().subscribe(this.onQueryLoad.bind(this));
    this.cdRef.detectChanges();
  }
  isOutras(x) {
    return x.title == this.TITLE_OUTRAS && !x.labels.length;
  }
  loadLabel() {
    const dockers = [...(this.usuarioConfig?.kanban_etiquetas_dockers || [])];
    if (!dockers.find(this.isOutras.bind(this))) dockers.splice(0, 0, {
      title: this.TITLE_OUTRAS,
      labels: [],
      collapse: false
    });
    this.labels = dockers.reduce((a, v) => {
      if (!a.find(x => x.title?.length && x.title == v.title || x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key)) {
        a.push({
          labels: this.isOutras(v) ? [] : v.labels,
          title: v.title,
          menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
          cards: [],
          editing: false,
          collapse: v.collapse
        });
      }
      return a;
    }, []);
    /*this.labels = dockers.map(x => {
      return {
        labels: this.isOutras(x) ? [] : x.labels,
        title: x.title,
        menu: this.isOutras(x) ? this.outrasButtons : this.etiquetasButtons,
        cards: [],
        editing: false,
        collapse: x.collapse
      }
    });*/
  }

  get isEtiquetas() {
    return !!this.filter?.controls?.usarEtiquetas?.value;
  }
  onUsarEtiquetasChange(event) {
    this.saveUsuarioConfig({
      kanban_usar_etiquetas: this.filter.controls.usarEtiquetas.value
    });
    if (this.query) this.onQueryLoad(this.query.rows);
  }
  incluirLista(docker) {
    this.labels.splice(docker.key + 1, 0, {
      labels: [],
      menu: this.etiquetasButtons,
      cards: [],
      editing: true,
      collapse: false
    });
    this.kanbanEtiquetas?.refreshDoubleScrollbar();
    this.cdRef.detectChanges();
  }
  onResumidoChange(event) {
    this.saveUsuarioConfig({
      kanban_resumido: this.filter.controls.resumido.value
    });
    this.cdRef.detectChanges();
  }
  loadEtiquetas() {
    //this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
  }
  getLabelStyle(label) {
    const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
    //const txtColor = this.util.contrastColor(bgColor);
    return `border-color: ${bgColor} !important;`;
  }
  onDockerCollapse(docker, collapse) {
    if (this.isEtiquetas) {
      this.labels[docker.key].collapse = collapse;
      this.saveEtiquetasUsuarioConfig();
    } else {
      this.cardsConfig = {
        naoIniciado: !!this.dockerNaoIniciado?.collapse,
        pausado: !!this.dockerPausado?.collapse,
        iniciado: !!this.dockerIniciado?.collapse,
        concluido: !!this.dockerConcluido?.collapse
      };
      this.saveUsuarioConfig({
        kanban_status_dockers: this.cardsConfig
      });
    }
    this.kanbanEtiquetas?.refreshDoubleScrollbar();
  }
  editEtiquetas(docker) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const label = _this2.labels[docker.key];
      const allUsed = _this2.labels.reduce((a, v, i) => {
        if (v.labels.length && i != docker.key) a.push(v.labels[0].key);
        return a;
      }, []);
      _this2.etiquetasEdit = _this2.etiquetas.filter(x => !allUsed.includes(x.key));
      _this2.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
    })();
  }
  saveEtiquetasUsuarioConfig() {
    const dockers = this.labels.reduce((a, v) => {
      if (!a.find(x => x.title?.length && x.title == v.title || x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key)) {
        a.push({
          title: v.title,
          labels: v.labels,
          collapse: v.collapse
        });
      }
      return a;
    }, []);
    /*const dockers = this.labels.map(x => {
      return {
        title: x.title,
        labels: x.labels,
        collapse: x.collapse
      }
    });*/
    this.saveUsuarioConfig({
      kanban_etiquetas_dockers: dockers
    });
  }
  saveEtiquetas(docker) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const key = _this3.formEdit.controls.etiqueta.value;
      if (key?.length) {
        const label = _this3.labels[docker.key];
        const etiqueta = _this3.etiquetasEdit.find(x => x.key == key);
        if (etiqueta) label.labels = [etiqueta];
        if (_this3.query) _this3.onQueryLoad(_this3.query.rows);
        _this3.saveEtiquetasUsuarioConfig();
        return true;
      }
      return false;
    })();
  }
  cancelEtiquetas(docker) {
    var _this4 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const label = _this4.labels[docker.key];
      if (!label.labels?.length) {
        _this4.labels.splice(docker.key, 1);
        _this4.kanbanEtiquetas?.refreshDoubleScrollbar();
      }
    })();
  }
  deleteEtiquetas(docker) {
    var _this5 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.labels.splice(docker.key, 1);
      _this5.kanbanEtiquetas?.refreshDoubleScrollbar();
      if (_this5.query) _this5.onQueryLoad(_this5.query.rows);
      _this5.saveEtiquetasUsuarioConfig();
    })();
  }
  getNomes(context) {
    return Object.getOwnPropertyNames(context.filter.controls || {}).join(",");
  }
  modalRefreshId(atividade) {
    return {
      modal: true,
      modalClose: modalResult => {
        const destination = this.dragDrop.destination;
        const source = this.dragDrop.source;
        if (modalResult) {
          if (destination && source) {
            destination.list.splice(destination.index, 0, destination.card);
            source.list.splice(source.index, 1);
          }
          (this.grid?.query || this.query).refreshId(atividade.id);
        }
        this.dragDrop = {};
      }
    };
  }
  mergeEtiqueta(etiqueta) {
    if (!this.etiquetas.find(x => x.key == etiqueta.key)) {
      this.etiquetas.push(etiqueta);
    }
  }
  filterSubmit(filter) {
    super.filterSubmit(filter);
    this.cards = [[], [], [], []];
    this.labels.forEach(x => x.cards = []);
    return this.queryOptions;
  }
  onQueryLoad(rows) {
    super.onGridLoad(rows);
    this.cardsVersion++;
    if (!this.filter?.controls?.usarEtiquetas?.value) {
      rows?.forEach(row => {
        const atividade = row;
        let status = this.lookup.ATIVIDADE_STATUS.find(x => x.key == atividade.status)?.key;
        switch (status || "INCLUIDO") {
          case "PAUSADO":
            this.putCard(this.cards[this.PAUSADO], atividade);
            break;
          case "INICIADO":
            this.putCard(this.cards[this.INICIADO], atividade);
            break;
          case "CONCLUIDO":
            this.putCard(this.cards[this.CONCLUIDO], atividade);
            break;
          default:
            this.putCard(this.cards[this.NAOINICIADO], atividade);
        }
      });
      for (let cards of this.cards) {
        for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
      }
    } else {
      const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
      rows?.forEach(row => {
        let atividade = row;
        let docker = undefined;
        atividade.etiquetas = atividade.etiquetas || [];
        for (let i = 0; i < atividade.etiquetas.length; i++) {
          for (let j = 1; j < this.labels.length && !docker; j++) {
            if (this.labels[j].labels[0].key == atividade.etiquetas[i].key) docker = this.labels[j];
          }
          if (!this.etiquetas.some(x => x.key == atividade.etiquetas[i].key)) this.etiquetas.push(atividade.etiquetas[i]);
        }
        this.putCard(docker?.cards || this.labels[outrasIndex]?.cards || [], atividade);
      });
      for (let cards of this.labels.map(x => x.cards || [])) {
        for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
      }
      /*this.labels[0].labels = [];
      this.etiquetas.forEach(x => {
        if(!this.labels.find(y => y.labels.find(z => z.key == x.key))) this.labels[0].labels.push(x)
      });*/
    }

    this.cdRef.detectChanges();
  }
  putCard(list, atividade) {
    const index = list.findIndex(x => x.id == atividade.id);
    const card = {
      id: atividade.id,
      title: atividade.tipo_atividade?.nome || "(Atividade não atribuída)",
      subTitle: atividade.descricao || "",
      data: atividade,
      version: this.cardsVersion,
      menu: undefined,
      dynamicMenu: this.dynamicCardMenu.bind(this)
    };
    if (index >= 0) {
      list[index] = Object.assign(list[index], card);
    } else {
      list.push(card);
    }
  }
  dynamicCardMenu(card) {
    const menu = this.atividadeService.dynamicButtons.bind(this)(card.data, this.optionsMetadata);
    menu.push({
      icon: "bi bi-three-dots",
      hint: "Opções",
      dynamicItems: this.cardDynamicOptions.bind(this)
    });
    if (!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join()) card.menu = menu;
    return card.menu;
  }
  cardDynamicOptions(card) {
    const olders = card.menu?.find(x => x.hint == "Opções");
    if (olders) {
      const options = this.atividadeService.dynamicOptions.bind(this)(card.data, this.optionsMetadata);
      if (!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join()) olders.items = options;
    }
    return olders?.items;
  }
  canDrop(status) {
    let self = this;
    return drag => {
      if (self.isEtiquetas) {
        return true;
      } else {
        const buttons = self.atividadeService.dynamicOptions.bind(self)(drag.data, self.optionsMetadata);
        return !!buttons.find(x => x.id == status);
      }
    };
  }
  updateEtiquetasAtividade(dragDrop) {
    const sourceLabel = this.labels.find(x => x.cards == dragDrop.source.list)?.labels[0];
    const destinationLabel = this.labels.find(x => x.cards == dragDrop.destination.list)?.labels[0];
    const atividade = dragDrop.destination.atividade;
    if (sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key) return;
    if (sourceLabel) atividade.etiquetas.splice(atividade.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
    if (destinationLabel) atividade.etiquetas.unshift(destinationLabel);
    this.loading = true;
    this.dao.update(atividade.id, {
      etiquetas: atividade.etiquetas
    }).then(atividade => this.modalRefreshId(atividade).modalClose.bind(this)(atividade.id)).finally(() => this.loading = false);
  }
  onDragged(item, list, effect) {
    if (["copy", "move"].includes(effect)) {
      const index = list.indexOf(item);
      this.dragDrop.source = {
        list,
        index
      };
      if (this.isEtiquetas) this.updateEtiquetasAtividade(this.dragDrop);
    }
  }
  onDrop(event, list) {
    if (list && ["copy", "move"].includes(event.dropEffect)) {
      const atividade = event.data.data;
      const card = event.data;
      let index = typeof event.index === "undefined" ? list.length : event.index;
      this.dragDrop = {
        destination: {
          list,
          index,
          card,
          atividade
        }
      };
      if (!this.isEtiquetas) {
        const buttons = this.atividadeService.dynamicOptions.bind(this)(atividade, this.optionsMetadata);
        const docker = this.cards.indexOf(list);
        if (docker >= 0) {
          const action = buttons.find(x => x.id == this.DOCKERS[docker]);
          if (action?.onClick) action?.onClick(atividade);
        }
      }
    }
  }
  onStatusClick(status) {
    this.filter?.controls.status.setValue(status.data?.status);
    this.filterCollapsed = false;
    this.filterRef?.onButtonFilterClick();
    this.cdRef.detectChanges();
  }
  onEtiquetaClick(etiqueta) {
    let etiquetas = this.filter.controls.etiquetas.value;
    etiquetas.push(etiqueta);
    this.filter?.controls.etiquetas.setValue(etiquetas);
    this.filterCollapsed = false;
    this.filterRef?.onButtonFilterClick();
    this.cdRef.detectChanges();
  }
  filterClear(filter) {
    this.filter.controls.atribuidas_para_mim.setValue(false);
    this.filter.controls.usuario_id.setValue("");
    this.filter.controls.somente_unidade_atual.setValue(false);
    this.filter.controls.unidades_subordinadas.setValue(false);
    this.filter.controls.unidade_id.setValue("");
    this.filter.controls.numero_processo.setValue("");
    this.filter.controls.plano_entrega_id.setValue(null);
    this.filter.controls.plano_entrega_entrega_id.setValue(null);
    if (!this.fixedFilter?.length || !this.fixedFilter.find(x => x[0] == "status")) this.filter.controls.status.setValue(null);
    this.filter.controls.etiquetas.setValue([]);
    super.filterClear(filter);
  }
  onSwimlaneDrop(event, fromIndex) {
    const element = this.labels[fromIndex];
    const toIndex = fromIndex < event.index ? event.index - 1 : event.index;
    this.labels.splice(fromIndex, 1);
    this.labels.splice(toIndex, 0, element);
    this.saveEtiquetasUsuarioConfig();
  }
  onEntregaClick(atividade) {
    this.go.navigate({
      route: ['gestao', 'atividade', atividade.id, 'hierarquia']
    }, {
      metadata: {
        atividade: atividade
      }
    });
  }
  onUnidadeChange(event) {
    var _this6 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let unidade_selecionada = yield _this6.unidadeDao.getById(_this6.filter?.controls.unidade_id.value, ['planos_entrega']);
      _this6.planosEntregas = unidade_selecionada?.planos_entrega?.map(x => Object.assign({
        key: x.id,
        value: x.nome
      })) || [];
    })();
  }
  onPlanoEntregaChange(event) {
    var _this7 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let plano_entrega_selecionado = [];
      let unidade_selecionada = yield _this7.unidadeDao.getById(_this7.filter?.controls.unidade_id.value, ['planos_entrega.entregas']);
      unidade_selecionada?.planos_entrega?.forEach(element => {
        if (element.id == _this7.filter.controls.plano_entrega_id.value) plano_entrega_selecionado.push(element.entregas);
      });
      _this7.planosEntregasEntregas = plano_entrega_selecionado[0].map(x => Object.assign({
        key: x.id,
        value: x.descricao
      })) || [];
    })();
  }
}
_class = AtividadeListKanbanComponent;
_class.ɵfac = function AtividadeListKanbanComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["atividade-list-kanban"]],
  viewQuery: function AtividadeListKanbanComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c7, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.filterRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.kanbanEtiquetas = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerNaoIniciado = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerPausado = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerIniciado = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.dockerConcluido = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.planoEntrega = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.planoEntregaEntrega = _t.first);
    }
  },
  inputs: {
    snapshot: "snapshot",
    fixedFilter: "fixedFilter"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
  decls: 29,
  vars: 52,
  consts: [[3, "buttons"], ["labelPosition", "left", "label", "Resumido", "controlName", "resumido", 3, "size", "control", "change"], ["labelPosition", "left", "label", "Usar etiquetas", "controlName", "usarEtiquetas", 1, "me-2", 3, "size", "control", "change"], [3, "deleted", "form", "where", "query", "submit", "clear", "collapseChange", "collapsed"], ["filterRef", ""], [1, "row"], ["label", "Minhas", "controlName", "atribuidas_para_mim", 3, "size", "control", "change"], ["controlName", "usuario_id", 3, "size", "label", "control", "disabled", "dao"], ["usuario", ""], ["label", "Atual", "controlName", "somente_unidade_atual", "labelInfo", "Somente as atividades da unidade selecionada", 3, "size", "control", "change"], ["maskFormat", "00000.000000/0000-00", "controlName", "numero_processo", "labelInfo", "Pesquisa no documento de requisi\u00E7\u00E3o, conclus\u00E3o e nos documentos das tarefas", 3, "size", "label", "control"], ["label", "Status", "itemTodos", "- Todos -", "controlName", "status", 3, "size", "valueTodos", "disabled", "control", "items"], ["controlName", "unidade_id", 3, "size", "label", "control", "disabled", "dao", "change"], ["unidade", ""], ["label", "Sub.", "controlName", "unidades_subordinadas", "labelInfo", "Incluir as unidades subordinadas", 3, "size", "control"], ["itemTodos", "- Todos -", "controlName", "plano_entrega_id", 3, "size", "label", "valueTodos", "control", "items", "change"], ["planoEntrega", ""], ["itemTodos", "- Todos -", "controlName", "plano_entrega_entrega_id", 3, "size", "label", "valueTodos", "control", "items"], ["planoEntregaEntrega", ""], ["noForm", "", "noBox", "", "label", "Etiquetas", "controlName", "etiquetas", 3, "size", "control"], ["ticket", ""], ["editDocker", ""], ["placeholder", ""], ["useCardData", "", 3, "template", "placeholderTemplate", "loading", "dragSwimlanes", 4, "ngIf"], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle", 4, "ngIf"], ["color", "info", "role", "button", 3, "icon", "label", "click", 4, "ngIf"], [1, "d-flex", "w-100"], [1, "flex-fill"], [1, "text-nowrap"], [1, "badge", "bg-light", "text-dark"], [1, "bi", "bi-briefcase"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", 3, "title"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "badge", "bg-light", "text-dark", "fw-light", 3, "title"], [1, "bi", "bi-cursor"], [4, "ngIf"], ["color", "info", "role", "button", 3, "icon", "label", "click"], [3, "url", "hint"], [1, "card-status-container"], [3, "documento"], ["class", "ms-1", 3, "color", "label", "icon", "data", "click", 4, "ngFor", "ngForOf"], ["small", "", "title", "Checklist", 4, "ngIf"], ["origem", "ATIVIDADE", 3, "entity"], ["origem", "ATIVIDADE", 3, "entity", "selectable", "query"], [1, "ms-1", 3, "color", "label", "icon", "data", "click"], ["small", "", "title", "Checklist"], [4, "ngFor", "ngForOf"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "micro-text", "fw-ligh"], [1, "bi", "bi-check-circle"], ["controlName", "etiqueta", 3, "size", "control", "items"], [1, "card-body"], [1, "card-title", "placeholder-glow"], [1, "placeholder", "col-6"], ["role", "group", "aria-label", "Basic outlined example", 1, "btn-group"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "disabled", "placeholder"], [1, "bi", "bi-question"], [1, "card-subtitle", "mb-2", "text-muted", "placeholder-glow"], [1, "placeholder", "col-8"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-7"], [1, "placeholder", "col-4"], ["useCardData", "", 3, "template", "placeholderTemplate", "loading", "dragSwimlanes"], ["icon", "bi bi-hourglass-split", "title", "N\u00E3o iniciado", "color", "border-warning", 3, "collapse", "toggle", "menu", "dragged", "drop", "dropIf", "cards"], ["dockerNaoIniciado", ""], ["icon", "bi bi-play-circle", "title", "Iniciadas", "color", "border-info", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerIniciado", ""], ["icon", "bi bi-pause-circle", "title", "Pausadas", "color", "border-danger", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerPausado", ""], ["icon", "bi bi-check-circle", "title", "Conclu\u00EDdas", "color", "border-primary", 3, "collapse", "toggle", "dragged", "drop", "dropIf", "cards"], ["dockerConcluido", ""], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle"], ["kanbanEtiquetas", ""]],
  template: function AtividadeListKanbanComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "toolbar", 0)(1, "input-switch", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_1_listener($event) {
        return ctx.onResumidoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "input-switch", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_2_listener($event) {
        return ctx.onUsarEtiquetasChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "filter", 3, 4)(5, "div", 5)(6, "input-switch", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_6_listener($event) {
        return ctx.onAtribuidasParaMimChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "input-search", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "input-switch", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_switch_change_9_listener($event) {
        return ctx.onSomenteUnidadeAtualChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "input-text", 10)(11, "input-select", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 5)(13, "input-search", 12, 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_search_change_13_listener($event) {
        return ctx.onUnidadeChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input-switch", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "input-select", 15, 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AtividadeListKanbanComponent_Template_input_select_change_16_listener($event) {
        return ctx.onPlanoEntregaChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "input-select", 17, 18)(20, "input-multiselect", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, AtividadeListKanbanComponent_ng_template_21_Template, 17, 11, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, AtividadeListKanbanComponent_ng_template_23_Template, 1, 3, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, AtividadeListKanbanComponent_ng_template_25_Template, 16, 0, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, AtividadeListKanbanComponent_kanban_27_Template, 12, 29, "kanban", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, AtividadeListKanbanComponent_kanban_28_Template, 2, 14, "kanban", 24);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.resumido);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 2)("control", ctx.filter.controls.usarEtiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("query", ctx.query)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.atribuidas_para_mim);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 4)("label", ctx.lex.translate("Usu\u00E1rio"))("control", ctx.filter.controls.usuario_id)("disabled", ctx.filter.controls.atribuidas_para_mim.value ? "true" : undefined)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.somente_unidade_atual);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 3)("label", "N\u00BA " + ctx.lex.translate("Processo") + " (Sei)")("control", ctx.filter.controls.numero_processo);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 3)("valueTodos", null)("disabled", (ctx.fixedFilter == null ? null : ctx.fixedFilter.length) && ctx.fixedFilter[0][0] == "status" ? "true" : undefined)("control", ctx.filter.controls.status)("items", ctx.lookup.ATIVIDADE_STATUS);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Unidade"))("control", ctx.filter.controls.unidade_id)("disabled", ctx.filter.controls.somente_unidade_atual.value ? "true" : undefined)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 1)("control", ctx.filter.controls.unidades_subordinadas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 3)("label", ctx.lex.translate("Plano de Entrega"))("valueTodos", null)("control", ctx.filter.controls.plano_entrega_id)("items", ctx.planosEntregas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 2)("label", ctx.lex.translate("Entrega do Plano de Entrega"))("valueTodos", null)("control", ctx.filter.controls.plano_entrega_entrega_id)("items", ctx.planosEntregasEntregas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.etiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEtiquetas);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isEtiquetas);
    }
  },
  styles: [".comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: initial;\n  white-space: normal;\n}\n.comentario-badge[data-expanded=true][_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: auto;\n  display: block;\n  max-width: 290px;\n  white-space: initial;\n}\n\n.atividade-atividade[_ngcontent-%COMP%], .atividade-descricao[_ngcontent-%COMP%] {\n  height: auto;\n  display: block;\n  max-width: 200px;\n  white-space: initial;\n}\n\n.comentario-badge[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  display: block;\n  background-color: #ffe69c !important;\n  margin-bottom: 1px;\n  text-align: left;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-title[_ngcontent-%COMP%] {\n  display: none;\n}\n.comentario-badge[_ngcontent-%COMP%]   .comentario-text[_ngcontent-%COMP%] {\n  display: inline-block;\n  max-width: 290px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 12px;\n}\n\n.docker-border[_ngcontent-%COMP%] {\n  border-width: 1px;\n}\n\n.card-status-container[_ngcontent-%COMP%] {\n  width: 330px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9nZXN0YW8vYXRpdmlkYWRlL2F0aXZpZGFkZS1saXN0LWthbmJhbi9hdGl2aWRhZGUtbGlzdC1rYW5iYW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0FBQVI7QUFFSTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7QUFBUjs7QUFJQTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQURKOztBQUlBO0VBQ0ksbUJBQUE7RUFDQSxjQUFBO0VBRUEsb0NBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBRko7QUFHSTtFQUNJLGFBQUE7QUFEUjtBQUdJO0VBQ0kscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFEUjs7QUFLQTtFQUNJLGlCQUFBO0FBRko7O0FBS0E7RUFDSSxZQUFBO0FBRkoiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tZW50YXJpby1iYWRnZVtkYXRhLWV4cGFuZGVkPXRydWVdIHtcclxuICAgIC5jb21lbnRhcmlvLXRpdGxlIHtcclxuICAgICAgICBkaXNwbGF5OiBpbml0aWFsO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcbiAgICB9XHJcbiAgICAuY29tZW50YXJpby10ZXh0IHtcclxuICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG1heC13aWR0aDogMjkwcHg7XHJcbiAgICAgICAgd2hpdGUtc3BhY2U6IGluaXRpYWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5hdGl2aWRhZGUtYXRpdmlkYWRlLCAuYXRpdmlkYWRlLWRlc2NyaWNhbyB7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1heC13aWR0aDogMjAwcHg7XHJcbiAgICB3aGl0ZS1zcGFjZTogaW5pdGlhbDtcclxufVxyXG5cclxuLmNvbWVudGFyaW8tYmFkZ2Uge1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgLy93aWR0aDogMjAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlNjljICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgLmNvbWVudGFyaW8tdGl0bGUge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuY29tZW50YXJpby10ZXh0IHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgbWF4LXdpZHRoOiAyOTBweDtcclxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfVxyXG59XHJcblxyXG4uZG9ja2VyLWJvcmRlciB7XHJcbiAgICBib3JkZXItd2lkdGg6IDFweDtcclxufVxyXG5cclxuLmNhcmQtc3RhdHVzLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMzMwcHg7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 62095:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list-tarefa/atividade-list-tarefa.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeListTarefaComponent: () => (/* binding */ AtividadeListTarefaComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/atividade-tarefa-dao.service */ 949);
/* harmony import */ var src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/listeners/listener-all-pages.service */ 79084);
/* harmony import */ var src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/atividade-tarefa.model */ 88543);
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-base */ 17112);
/* harmony import */ var _atividade_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../atividade.service */ 57338);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ 81419);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);

var _class;















function AtividadeListTarefaComponent_ng_template_3_strong_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "strong", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((row_r11.tipo_tarefa == null ? null : row_r11.tipo_tarefa.nome) || "");
  }
}
function AtividadeListTarefaComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, AtividadeListTarefaComponent_ng_template_3_strong_0_Template, 2, 1, "strong", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", row_r11.tipo_tarefa == null ? null : row_r11.tipo_tarefa.nome == null ? null : row_r11.tipo_tarefa.nome.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", row_r11.descricao, " ");
  }
}
function AtividadeListTarefaComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "documentos-badge", 13);
  }
  if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("documento", row_r14.documento);
  }
}
function AtividadeListTarefaComponent_ng_template_9_i_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "i", 16);
  }
}
function AtividadeListTarefaComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, AtividadeListTarefaComponent_ng_template_9_i_1_Template, 1, 0, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", row_r15.data_conclusao);
  }
}
function AtividadeListTarefaComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-switch", 17);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r7.formEdit.controls.concluido);
  }
}
function AtividadeListTarefaComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "comentarios-widget", 18);
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("entity", row_r18)("noPersist", ctx_r9.isPersist ? undefined : "true")("selectable", ctx_r9.selectable)("grid", ctx_r9.grid)("save", ctx_r9.addComentarioResult.bind(ctx_r9));
  }
}
function AtividadeListTarefaComponent_column_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "column", 19);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dynamicButtons", ctx_r10.dynamicButtons.bind(ctx_r10));
  }
}
class AtividadeListTarefaComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_5__.PageBase {
  set atividade(value) {
    if (this._atividade != value) {
      this._atividade = value;
      if (this.isPersist && value?.tarefas) {
        this.control.setValue(value?.tarefas);
      }
    }
  }
  get atividade() {
    return this._atividade;
  }
  constructor(injector) {
    var _this;
    super(injector);
    _this = this;
    this.injector = injector;
    this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl();
    this.disabled = false;
    this.editable = true;
    this.selectable = false;
    this.id_processo = 0;
    this.addComentarioButton = {
      icon: "bi bi-plus-circle",
      hint: "Incluir comentário"
    };
    this.editTarefa = /*#__PURE__*/function () {
      var _ref = (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (row) {
        _this.go.navigate({
          route: ['gestao', 'atividade', 'tarefa']
        }, {
          metadata: {
            tarefa: row,
            atividade: _this.atividade
          },
          modalClose: modalResult => {
            if (modalResult) {
              (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
                const tarefas = _this.control.value;
                const index = tarefas.findIndex(x => x.id == row.id);
                if (index >= 0) {
                  modalResult._status = modalResult._status == "ADD" ? "ADD" : "EDIT";
                  if (_this.isPersist && _this.atividade?.tarefas) {
                    _this.grid.error = undefined;
                    try {
                      _this.dialog.showSppinerOverlay("Salvando dados do formulário");
                      modalResult = yield _this.dao.save(modalResult, _this.join);
                    } catch (error) {
                      _this.grid.error = error.message ? error.message : error;
                      modalResult = undefined;
                    } finally {
                      _this.dialog.closeSppinerOverlay();
                    }
                  }
                  if (modalResult) {
                    tarefas[index] = modalResult;
                    _this.control.setValue(tarefas);
                  }
                }
                _this.cdRef.detectChanges();
              })();
            }
          }
        });
        return undefined;
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.dao = injector.get(src_app_dao_atividade_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_2__.AtividadeTarefaDaoService);
    this.atividadeService = injector.get(_atividade_service__WEBPACK_IMPORTED_MODULE_6__.AtividadeService);
    this.allPages = injector.get(src_app_listeners_listener_all_pages_service__WEBPACK_IMPORTED_MODULE_3__.ListenerAllPagesService);
    this.formEdit = this.fh.FormBuilder({
      concluido: {
        default: false
      }
    });
    this.join = ["tipo_tarefa", "comentarios.usuario"];
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.queryParams?.id_processo) {
      this.id_processo = this.queryParams?.id_processo;
    }
    if (this.isPersist && this.atividade?.tarefas) {
      this.control.setValue(this.atividade?.tarefas);
    }
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.id_processo) {
      this.loading = true;
      this.dao.query({
        where: [["id_processo", "==", this.id_processo]]
      }).asPromise().then(tarefas => {
        this.control.setValue(tarefas || []);
        this.cdRef.detectChanges();
      }).finally(() => {
        this.loading = false;
      });
    }
  }
  get isPersist() {
    return this.persist != undefined;
  }
  addTarefa() {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const tarefa = new src_app_models_atividade_tarefa_model__WEBPACK_IMPORTED_MODULE_4__.AtividadeTarefa();
      tarefa.id = _this2.dao.generateUuid();
      tarefa.usuario = _this2.auth.usuario;
      tarefa.usuario_id = _this2.auth.usuario.id;
      tarefa.atividade_id = _this2.atividade?.id || "";
      tarefa.comentarios = [];
      tarefa._status = "ADD";
      _this2.go.navigate({
        route: ['gestao', 'atividade', 'tarefa']
      }, {
        metadata: {
          tarefa: tarefa,
          atividade: _this2.atividade
        },
        modalClose: modalResult => {
          if (modalResult) {
            (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              const tarefas = _this2.control.value || [];
              if (_this2.isPersist && _this2.atividade?.tarefas) {
                _this2.grid.error = undefined;
                try {
                  _this2.dialog.showSppinerOverlay("Salvando dados do formulário");
                  modalResult = yield _this2.dao.save(modalResult, _this2.join);
                } catch (error) {
                  _this2.grid.error = error.message ? error.message : error;
                  modalResult = undefined;
                } finally {
                  _this2.dialog.closeSppinerOverlay();
                }
              }
              if (modalResult) {
                tarefas.push(modalResult);
                _this2.control.setValue(tarefas);
              }
              _this2.cdRef.detectChanges();
            })();
          }
        }
      });
      return undefined;
    })();
  }
  deleteTarefa(row) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const confirm = yield _this3.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
      _this3.grid.error = undefined;
      if (confirm) {
        try {
          if (_this3.isPersist && _this3.atividade?.tarefas || row._status == "ADD") {
            const tarefas = _this3.control.value;
            const index = tarefas.findIndex(x => x.id == row.id);
            if (_this3.isPersist && _this3.atividade?.tarefas) yield _this3.dao.delete(row);
            if (index >= 0) {
              tarefas.splice(index, 1);
              _this3.control.setValue(tarefas);
            }
          } else {
            row._status = "DELETE";
          }
          _this3.dialog.alert("Sucesso", "Registro excluído com sucesso!");
          _this3.cdRef.detectChanges();
        } catch (error) {
          _this3.grid.error = error?.message ? error?.message : error;
        }
      }
    })();
  }
  /*public comentarioClick(element: HTMLSpanElement) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }*/
  /*public addComentarioClick(row: any) {
    this.go.navigate({route: ['gestao', 'atividade', 'entrega', row.id, 'comentar']}, {modal: true, metadata: {entrega: row, atividade: this.atividade}, modalClose: this.addComentarioResult.bind(this)});
  }*/
  onColumnConcluidoEdit(row) {
    var _this4 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.formEdit.controls.concluido.setValue(!!row.data_conclusao);
    })();
  }
  onColumnConcluidoSave(row) {
    var _this5 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const data_conclusao = _this5.formEdit.controls.concluido.value && !!row.data_conclusao ? _this5.auth.hora : row.data_conclusao;
        const saved = yield _this5.dao.update(row.id, {
          data_conclusao
        });
        row.concluido = _this5.formEdit.controls.concluido.value;
        return !!saved;
      } catch (error) {
        return false;
      }
    })();
  }
  addComentarioResult(modalResult) {
    if (modalResult) {
      if (this.isPersist) {
        this.dao.getById(modalResult.id, this.join).then(tarefa => {
          if (tarefa) {
            const tarefas = this.control.value || [];
            const index = tarefas.findIndex(x => x.id = tarefa.id);
            if (index >= 0) {
              tarefas[index] = tarefa;
              this.control.setValue(tarefas);
              this.cdRef.detectChanges();
            }
          }
        });
      } else {
        const changed = modalResult.comentarios.filter(x => ["ADD", "EDIT", "DELETE"].includes(x._status || "")).length > 0;
        modalResult._status = changed && !["ADD", "EDIT", "DELETE"].includes(modalResult._status || "") ? "EDIT" : modalResult._status;
      }
    }
  }
  dynamicButtons(row) {
    let result = [];
    let tarefa = row;
    let lastConsolidacao = this.atividadeService.lastConsolidacao(this.atividade.metadados.consolidacoes);
    /* (RN_CSLD_12) Tarefas concluidas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, nem Remover conclusão.
       (RN_CSLD_13) Tarefas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, somente a opção de Concluir ficará disponível. */
    if (!lastConsolidacao || lastConsolidacao.status == "INCLUIDO" || this.util.asTimestamp(lastConsolidacao.data_conclusao) < this.util.asTimestamp(tarefa.created_at)) {
      //result.push(Object.assign(this.grid!.BUTTON_EDIT, { onClick: this.editTarefa.bind(this) }));
      //result.push(Object.assign(this.grid!.BUTTON_DELETE, { onClick: this.deleteTarefa.bind(this) }));
      result.push({
        label: "Alterar",
        icon: "bi bi-pencil-square",
        hint: "Alterar",
        color: "btn-outline-info",
        onClick: this.editTarefa.bind(this)
      });
      result.push({
        label: "Excluir",
        icon: "bi bi-trash",
        hint: "Excluir",
        color: "btn-outline-danger",
        onClick: this.deleteTarefa.bind(this)
      });
    }
    return result;
  }
  canConcluidoEdit(row) {
    let tarefa = row;
    let lastConsolidacao = this.atividadeService.lastConsolidacao(this.atividade.metadados.consolidacoes);
    /* (RN_CSLD_12) e (RN_CSLD_13) */
    return !lastConsolidacao || lastConsolidacao.status == "INCLUIDO" || this.util.asTimestamp(lastConsolidacao.data_conclusao) < this.util.asTimestamp(tarefa.data_conclusao);
  }
}
_class = AtividadeListTarefaComponent;
_class.ɵfac = function AtividadeListTarefaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["atividade-list-tarefa"]],
  viewQuery: function AtividadeListTarefaComponent_Query(rf, ctx) {
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
    persist: "persist",
    disabled: "disabled",
    editable: "editable",
    selectable: "selectable",
    id_processo: "id_processo",
    atividade: "atividade"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 18,
  consts: [[3, "control", "add", "disabled", "minHeight", "hasEdit", "hasDelete", "editable"], [3, "title", "template"], ["tipoTarefaDescricao", ""], ["title", "Documento", 3, "template"], ["documento", ""], ["title", "Conclu\u00EDdo", 3, "align", "template", "columnEditTemplate", "canEdit", "edit", "save"], ["concluido", ""], ["editConcluido", ""], ["title", "Informa\u00E7\u00F5es adicionais", 3, "template"], ["tarefaComentarios", ""], ["type", "options", 3, "dynamicButtons", 4, "ngIf"], ["class", "d-block", 4, "ngIf"], [1, "d-block"], [3, "documento"], [1, "text-center"], ["class", "bi bi-check-circle", 4, "ngIf"], [1, "bi", "bi-check-circle"], ["controlName", "concluido", 3, "size", "control"], ["origem", "ATIVIDADE_TAREFA", 3, "entity", "noPersist", "selectable", "grid", "save"], ["type", "options", 3, "dynamicButtons"]],
  template: function AtividadeListTarefaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "grid", 0)(1, "columns")(2, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, AtividadeListTarefaComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, AtividadeListTarefaComponent_ng_template_6_Template, 1, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, AtividadeListTarefaComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, AtividadeListTarefaComponent_ng_template_11_Template, 1, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, AtividadeListTarefaComponent_ng_template_14_Template, 1, 5, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](16, AtividadeListTarefaComponent_column_16_Template, 1, 1, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](4);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](7);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](12);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("control", ctx.control)("add", ctx.addTarefa.bind(ctx))("disabled", ctx.disabled ? "true" : undefined)("minHeight", 300)("hasEdit", false)("hasDelete", false)("editable", ctx.editable ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("title", ctx.lex.translate("Tipo de Tarefa") + " e Descri\u00E7\u00E3o")("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("align", "center")("template", _r4)("columnEditTemplate", _r6)("canEdit", ctx.canConcluidoEdit.bind(ctx))("edit", ctx.editable ? ctx.onColumnConcluidoEdit.bind(ctx) : undefined)("save", ctx.editable ? ctx.onColumnConcluidoSave.bind(ctx) : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.editable && !ctx.selectable && !ctx.id_processo);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__.InputSwitchComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_10__.ComentariosWidgetComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_11__.DocumentosBadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 61010:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-list/atividade-list.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeListComponent: () => (/* binding */ AtividadeListComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-base */ 17112);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;


function AtividadeListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-list-grid", 6);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r1.snapshot || ctx_r1.modalRoute || ctx_r1.route.snapshot);
  }
}
function AtividadeListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-list-kanban", 6);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r3.snapshot || ctx_r3.modalRoute || ctx_r3.route.snapshot);
  }
}
function AtividadeListComponent_tab_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "atividade-dashboard", 6);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("snapshot", ctx_r6.snapshot || ctx_r6.modalRoute || ctx_r6.route.snapshot);
  }
}
function AtividadeListComponent_tab_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AtividadeListComponent_tab_7_ng_template_1_Template, 1, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r5);
  }
}
class AtividadeListComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_1__.PageBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.activeTab = "TABELA";
    /* Inicializações */
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
  }
  ngOnInit() {
    super.ngOnInit();
    this.activeTab = this.usuarioConfig.active_tab || "TABELA";
  }
  onSelectTab(tab) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.activeTab = tab.key;
      if (_this.viewInit) _this.saveUsuarioConfig({
        active_tab: _this.activeTab
      });
    })();
  }
}
_class = AtividadeListComponent;
_class.ɵfac = function AtividadeListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-atividade-list"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
  decls: 8,
  vars: 6,
  consts: [["right", "", 3, "title", "select", "active"], ["key", "TABELA", "icon", "bi bi-table", "label", "Lista", 3, "template"], ["grid", ""], ["key", "KANBAN", "icon", "bi bi-card-heading", "label", "Quadro", 3, "template"], ["kanban", ""], ["key", "DASHBOARD", "icon", "bi bi-file-earmark-bar-graph", "label", "Dashboard", 3, "template", 4, "ngIf"], [3, "snapshot"], ["key", "DASHBOARD", "icon", "bi bi-file-earmark-bar-graph", "label", "Dashboard", 3, "template"], ["dashboard", ""]],
  template: function AtividadeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, AtividadeListComponent_ng_template_2_Template, 1, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AtividadeListComponent_ng_template_5_Template, 1, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, AtividadeListComponent_tab_7_Template, 3, 1, "tab", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx))("active", ctx.activeTab);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf",  false && 0);
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 73410:
/*!**********************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade-routing.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeRoutingModule: () => (/* binding */ AtividadeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./atividade-form-concluir/atividade-form-concluir.component */ 71945);
/* harmony import */ var _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./atividade-form-tarefa/atividade-form-tarefa.component */ 49286);
/* harmony import */ var _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./atividade-form-iniciar/atividade-form-iniciar.component */ 22921);
/* harmony import */ var _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./atividade-form-pausar/atividade-form-pausar.component */ 61468);
/* harmony import */ var _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./atividade-form-prorrogar/atividade-form-prorrogar.component */ 35519);
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ 97037);
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./atividade-list-tarefa/atividade-list-tarefa.component */ 62095);
/* harmony import */ var _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./atividade-list-grid/atividade-list-grid.component */ 48644);
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ 61010);
/* harmony import */ var _atividade_hierarquia_atividade_hierarquia_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./atividade-hierarquia/atividade-hierarquia.component */ 52416);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;















const routes = [{
  path: '',
  component: _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_10__.AtividadeListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Atividades"
  }
}, {
  path: 'grid',
  component: _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_9__.AtividadeListGridComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Atividades"
  }
}, {
  path: 'new',
  component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Inclusão de Atividade",
    modal: true
  }
}, {
  path: 'tarefa',
  component: _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_3__.AtividadeFormTarefaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Tarefa da Atividade",
    modal: true
  }
}, {
  path: 'tarefa/concluir',
  component: _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_8__.AtividadeListTarefaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Concluir Tarefa",
    modal: true
  }
}, {
  path: 'tarefa/:tarefa_id/comentar',
  component: _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_3__.AtividadeFormTarefaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Comentários",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Edição da Atividade",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Consulta a Atividade",
    modal: true
  }
}, {
  path: ':id/clonar',
  component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Clone de Atividade",
    modal: true
  }
}, {
  path: ':id/iniciar',
  component: _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_4__.AtividadeFormIniciarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Início de Atividade",
    modal: true
  }
}, {
  path: ':id/concluir',
  component: _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_2__.AtividadeFormConcluirComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Conclusão de Atividade",
    modal: true
  }
}, {
  path: ':id/pausar',
  component: _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_5__.AtividadeFormPausarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Suspensão de Atividade",
    modal: true
  }
}, {
  path: ':id/prorrogar',
  component: _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_6__.AtividadeFormProrrogarComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Prorrogação de Atividade",
    modal: true
  }
}, {
  path: ':id/comentar',
  component: _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Comentários de Atividade",
    modal: true
  }
}, {
  path: ':id/hierarquia',
  component: _atividade_hierarquia_atividade_hierarquia_component__WEBPACK_IMPORTED_MODULE_11__.AtividadeHierarquiaComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Hierarquia da Atividade",
    modal: true
  }
}];
class AtividadeRoutingModule {}
_class = AtividadeRoutingModule;
_class.ɵfac = function AtividadeRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AtividadeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule]
  });
})();

/***/ }),

/***/ 5944:
/*!**************************************************************!*\
  !*** ./src/app/modules/gestao/atividade/atividade.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AtividadeModule: () => (/* binding */ AtividadeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atividade-routing.module */ 73410);
/* harmony import */ var _atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atividade-list/atividade-list.component */ 61010);
/* harmony import */ var _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./atividade-form/atividade-form.component */ 97037);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./atividade-list-grid/atividade-list-grid.component */ 48644);
/* harmony import */ var _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./atividade-form-iniciar/atividade-form-iniciar.component */ 22921);
/* harmony import */ var _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./atividade-form-concluir/atividade-form-concluir.component */ 71945);
/* harmony import */ var _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./atividade-form-pausar/atividade-form-pausar.component */ 61468);
/* harmony import */ var _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./atividade-form-prorrogar/atividade-form-prorrogar.component */ 35519);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./atividade-list-kanban/atividade-list-kanban.component */ 65971);
/* harmony import */ var _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./atividade-dashboard/atividade-dashboard.component */ 24290);
/* harmony import */ var _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./atividade-form-tarefa/atividade-form-tarefa.component */ 49286);
/* harmony import */ var _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./atividade-list-tarefa/atividade-list-tarefa.component */ 62095);
/* harmony import */ var _atividade_hierarquia_atividade_hierarquia_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./atividade-hierarquia/atividade-hierarquia.component */ 52416);
/* harmony import */ var primeng_organizationchart__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! primeng/organizationchart */ 29124);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../components/progress-bar/progress-bar.component */ 69756);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../components/reaction/reaction.component */ 32877);
/* harmony import */ var _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../uteis/calendar-efemerides/calendar-efemerides.component */ 60785);
/* harmony import */ var _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../uteis/comentarios/comentarios-widget/comentarios-widget.component */ 81419);
/* harmony import */ var _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../uteis/documentos/documentos-badge/documentos-badge.component */ 72504);
/* harmony import */ var _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../../../components/kanban/kanban.component */ 58189);
/* harmony import */ var _components_kanban_swimlane_swimlane_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../../../components/kanban/swimlane/swimlane.component */ 64502);
/* harmony import */ var _components_kanban_docker_docker_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../../../components/kanban/docker/docker.component */ 56152);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../../../components/profile-picture/profile-picture.component */ 2729);
var _class;














































class AtividadeModule {}
_class = AtividadeModule;
_class.ɵfac = function AtividadeModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_43__.CommonModule, _atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__.AtividadeRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_9__.UteisModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_44__.OrganizationChartModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵsetNgModuleScope"](AtividadeModule, {
    declarations: [_atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_1__.AtividadeListComponent, _atividade_form_atividade_form_component__WEBPACK_IMPORTED_MODULE_2__.AtividadeFormComponent, _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.AtividadeListGridComponent, _atividade_form_iniciar_atividade_form_iniciar_component__WEBPACK_IMPORTED_MODULE_5__.AtividadeFormIniciarComponent, _atividade_form_concluir_atividade_form_concluir_component__WEBPACK_IMPORTED_MODULE_6__.AtividadeFormConcluirComponent, _atividade_form_pausar_atividade_form_pausar_component__WEBPACK_IMPORTED_MODULE_7__.AtividadeFormPausarComponent, _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_11__.AtividadeDashboardComponent, _atividade_form_prorrogar_atividade_form_prorrogar_component__WEBPACK_IMPORTED_MODULE_8__.AtividadeFormProrrogarComponent, _atividade_form_tarefa_atividade_form_tarefa_component__WEBPACK_IMPORTED_MODULE_12__.AtividadeFormTarefaComponent, _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_13__.AtividadeListTarefaComponent, _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_10__.AtividadeListKanbanComponent, _atividade_hierarquia_atividade_hierarquia_component__WEBPACK_IMPORTED_MODULE_14__.AtividadeHierarquiaComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_43__.CommonModule, _atividade_routing_module__WEBPACK_IMPORTED_MODULE_0__.AtividadeRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_9__.UteisModule, primeng_organizationchart__WEBPACK_IMPORTED_MODULE_44__.OrganizationChartModule],
    exports: [_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.AtividadeListGridComponent]
  });
})();
_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵsetComponentScope"](_atividade_list_atividade_list_component__WEBPACK_IMPORTED_MODULE_1__.AtividadeListComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_43__.NgIf, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_15__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_16__.TabComponent, _atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.AtividadeListGridComponent, _atividade_dashboard_atividade_dashboard_component__WEBPACK_IMPORTED_MODULE_11__.AtividadeDashboardComponent, _atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_10__.AtividadeListKanbanComponent], []);
_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵsetComponentScope"](_atividade_list_grid_atividade_list_grid_component__WEBPACK_IMPORTED_MODULE_4__.AtividadeListGridComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_43__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_43__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_17__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_18__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_19__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_20__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_22__.PaginationComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_23__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_24__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_25__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_26__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_27__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_28__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_29__.SeparatorComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_30__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_31__.BadgeComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_32__.ProgressBarComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_33__.InputNumberComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_34__.ReactionComponent, _uteis_calendar_efemerides_calendar_efemerides_component__WEBPACK_IMPORTED_MODULE_35__.CalendarEfemeridesComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_36__.ComentariosWidgetComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_37__.DocumentosBadgeComponent, _atividade_list_tarefa_atividade_list_tarefa_component__WEBPACK_IMPORTED_MODULE_13__.AtividadeListTarefaComponent], []);
_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵsetComponentScope"](_atividade_list_kanban_atividade_list_kanban_component__WEBPACK_IMPORTED_MODULE_10__.AtividadeListKanbanComponent, [_angular_common__WEBPACK_IMPORTED_MODULE_43__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_43__.NgIf, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_20__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_21__.ToolbarComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_23__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_24__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_25__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_27__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_28__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_29__.SeparatorComponent, _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_38__.KanbanComponent, _components_kanban_swimlane_swimlane_component__WEBPACK_IMPORTED_MODULE_39__.SwimlaneComponent, _components_kanban_docker_docker_component__WEBPACK_IMPORTED_MODULE_40__.DockerComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_31__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_41__.ProfilePictureComponent, _components_reaction_reaction_component__WEBPACK_IMPORTED_MODULE_34__.ReactionComponent, _uteis_comentarios_comentarios_widget_comentarios_widget_component__WEBPACK_IMPORTED_MODULE_36__.ComentariosWidgetComponent, _uteis_documentos_documentos_badge_documentos_badge_component__WEBPACK_IMPORTED_MODULE_37__.DocumentosBadgeComponent], []);

/***/ })

}]);
//# sourceMappingURL=5944.js.map