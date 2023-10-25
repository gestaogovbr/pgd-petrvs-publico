"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8934],{

/***/ 8305:
/*!**********************************************************!*\
  !*** ./src/app/dao/questionario-pergunta-dao.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPerguntaDaoService: () => (/* binding */ QuestionarioPerguntaDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);


class QuestionarioPerguntaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("QuestionarioPergunta", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["nome, codigo, perguntas, tipo"];
  }
  static #_ = this.ɵfac = function QuestionarioPerguntaDaoService_Factory(t) {
    return new (t || QuestionarioPerguntaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: QuestionarioPerguntaDaoService,
    factory: QuestionarioPerguntaDaoService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 46482:
/*!*******************************************************!*\
  !*** ./src/app/models/questionario-pergunta.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPergunta: () => (/* binding */ QuestionarioPergunta)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class QuestionarioPergunta extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.tipo = ""; //Tipo interno | personalizado
    this.nome = ""; //Nome do questionário
    this.codigo = ""; // Código do questionario
    this.perguntas = ""; //Perguntas do questionário
    this.initialization(data);
  }
}

/***/ }),

/***/ 25767:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPerguntaFormComponent: () => (/* binding */ QuestionarioPerguntaFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/questionario-pergunta.model */ 46482);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/separator/separator.component */ 25560);











const _c0 = ["listaExemplo"];
const _c1 = ["listaTipoResposta"];
class QuestionarioPerguntaFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_3__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPergunta, src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_1__.QuestionarioPerguntaDaoService);
    this.injector = injector;
    this.tipoQuestionario = [{
      'key': 'Interno',
      'value': 'Interno'
    }, {
      'key': 'Personalizado',
      'value': 'Personalizado'
    }];
    this.exemploLista = [{
      'key': '1',
      'value': 'Exemplo 1'
    }, {
      'key': '2',
      'value': 'Exemplo 2'
    }, {
      'key': '3',
      'value': 'Exemplo 3'
    }];
    this.exemploRadio = [{
      'key': '1',
      'value': 'Exemplo 1'
    }, {
      'key': '2',
      'value': 'Exemplo 2'
    }, {
      'key': '3',
      'value': 'Exemplo 3'
    }];
    this.tipoPergunta = [{
      'key': 'LISTA',
      'value': 'Lista'
    }, {
      'key': 'SWITCH',
      'value': 'Sim/Não'
    }, {
      'key': 'MULTIPLA',
      'value': 'Resposta Múltipla'
    }, {
      'key': 'UNICA',
      'value': 'Resposta Única'
    }];
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['inputPergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + (entity?.nome || "");
    };
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      codigo: {
        default: ""
      },
      tipo: {
        default: ""
      },
      perguntas: {
        default: ""
      },
      pergunta: {
        default: ""
      },
      switchExemplo: {
        default: false
      },
      multiPerguntas: {
        default: []
      },
      multiOpcaoResposta: {
        default: []
      },
      inputPergunta: {
        default: ""
      },
      listaTipoResposta: {
        default: ""
      },
      inputOpcoesResposta: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPergunta());
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      const questionario = this.util.fill(new src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPergunta(), this.entity);
      resolve(this.util.fillForm(questionario, this.form.value));
    });
  }
  onEscolheTipoPerguntaChange() {
    let select = document.getElementById('tdID');
    let table = document.getElementById('tablePerguntas');
    let input = this.listaExemplo?.value;
    let teste = `<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>`;
    if (input != "SWICTH") {
      //select.innerHTML += '<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>';
      select.innerHTML += teste;
    }
  }
  addMultiPerguntas() {
    let result = undefined;
    const pergunta = this.form?.controls.inputPergunta.value;
    const tipoResposta = this.listaTipoResposta?.selectedItem;
    const key = this.util.textHash(pergunta);
    if (pergunta && tipoResposta?.value && this.form?.controls.multiOpcaoResposta.value && this.util.validateLookupItem(this.form.controls.multiPerguntas.value, key)) {
      let opcoesResposta = this.form?.controls.multiOpcaoResposta.value;
      let opcoesTexto = "";
      let index = opcoesResposta.length;
      if (tipoResposta.key != 'SWITCH') {
        opcoesResposta.forEach(element => {
          if (index == 1) {
            opcoesTexto += element.value;
          } else {
            opcoesTexto += element.value + ' - ';
          }
          index--;
        });
        console.log('opcoesTexto', opcoesTexto);
        result = {
          key: key,
          value: 'Pergunta: ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opções da resposta: ' + opcoesTexto,
          data: {
            tipo: tipoResposta.key,
            opcaoResposta: opcoesResposta,
            _status: "ADD"
          }
        };
      } else {
        result = {
          key: key,
          value: 'Pergunta: ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opções da resposta: ' + tipoResposta.value,
          data: {
            tipo: tipoResposta.key,
            opcaoResposta: 'UNICA',
            _status: "ADD"
          }
        };
      }
      this.form.controls.inputPergunta.setValue("");
      this.form.controls.listaTipoResposta.setValue("");
      this.form.controls.inputOpcoesResposta.setValue("");
      this.form.controls.multiOpcaoResposta.setValue([]);
    }
    return result;
  }
  addMultiRespostas() {
    let result = undefined;
    const opcaoResposta = this.form?.controls.inputOpcoesResposta.value;
    const key = this.util.textHash(opcaoResposta);
    if (opcaoResposta && this.form?.controls.inputPergunta.value && this.listaTipoResposta?.selectedItem?.value && this.util.validateLookupItem(this.form.controls.multiOpcaoResposta.value, key)) {
      result = {
        key: key,
        value: opcaoResposta,
        data: {
          _status: "ADD"
        }
      };
      this.form.controls.inputOpcoesResposta.setValue("");
    }
    return result;
  }
  static #_ = this.ɵfac = function QuestionarioPerguntaFormComponent_Factory(t) {
    return new (t || QuestionarioPerguntaFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: QuestionarioPerguntaFormComponent,
    selectors: [["app-questionario-pergunta-form"]],
    viewQuery: function QuestionarioPerguntaFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.listaExemplo = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.listaTipoResposta = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
    decls: 63,
    vars: 33,
    consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "Nome do Question\u00E1rio", "icon", "bi bi-pen", "controlName", "nome", 3, "size", "control"], ["label", "C\u00F3digo do Question\u00E1rio", "icon", "bi bi-pen", "controlName", "codigo", 3, "size", "control"], ["label", "Tipo do Question\u00E1rio", "icon", "bi bi-pen", "controlName", "tipo", 3, "size", "control", "items"], [1, "table-opcoes", "d-grid"], ["name", "tableOpcoes", "id", "tableOpcoes", 1, "table", "table-responsive", "table-hover", "table-sm"], [1, "thead-light"], ["scope", "col"], ["scope", "row"], ["label", "Op\u00E7\u00F5es", "icon", "bi bi-pen", "controlName", "listaExemplo", 3, "size", "items"], [1, "form-check"], ["type", "radio", "name", "flexRadioDefault", "id", "flexRadioDefault1", "checked", "", 1, "form-check-input"], ["for", "flexRadioDefault1", 1, "form-check-label"], ["type", "radio", "name", "flexRadioDefault", "id", "flexRadioDefault2", 1, "form-check-input"], ["for", "flexRadioDefault2", 1, "form-check-label"], ["type", "radio", "name", "flexRadioDefault", "id", "flexRadioDefault3", 1, "form-check-input"], ["for", "flexRadioDefault3", 1, "form-check-label"], ["type", "checkbox", "value", "", "id", "defaultCheck1", "name", "checkbox", 1, "form-check-input"], ["for", "defaultCheck1", 1, "form-check-label"], ["type", "checkbox", "value", "", "id", "defaultCheck2", "name", "checkbox", 1, "form-check-input"], ["for", "defaultCheck2", 1, "form-check-label"], ["icon", "fas fa-chalkboard", "controllName", "switchExemplo", 3, "size", "label", "control"], ["switchExemplo", ""], ["label", "", "controlName", "multiPerguntas", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "Pergunta", "icon", "bi bi-pencil-fill", "controlName", "inputPergunta", 3, "size", "control"], ["inputPergunta", ""], ["label", "Tipo de resposta", "icon", "bi bi-pen", "controlName", "listaTipoResposta", 3, "size", "control", "items"], ["listaTipoResposta", ""], ["label", "", "controlName", "multiOpcaoResposta", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Op\u00E7\u00F5es da resposta", "icon", "bi bi-pencil-fill", "controlName", "inputOpcoesResposta", 3, "size", "control"], ["opcoesResposta", ""]],
    template: function QuestionarioPerguntaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function QuestionarioPerguntaFormComponent_Template_editable_form_submit_0_listener() {
          return ctx.onSaveData();
        })("cancel", function QuestionarioPerguntaFormComponent_Template_editable_form_cancel_0_listener() {
          return ctx.onCancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "input-text", 2)(3, "input-text", 3)(4, "input-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "separator")(6, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7, "Exemplo dos tipos de respostas:");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 5)(9, "table", 6)(10, "thead", 7)(11, "tr")(12, "th", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13, "Lista");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "th", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15, "\u00DAnica escolha");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "th", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](17, "M\u00FAltipla escolha");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "th", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, "Sim ou N\u00E3o");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "tbody")(21, "tr")(22, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](23, "input-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](24, "td", 9)(25, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](26, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](28, " Op\u00E7\u00E3o 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](30, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](32, " Op\u00E7\u00E3o 2 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](34, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](36, " Op\u00E7\u00E3o 3 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "td", 9)(38, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](39, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](40, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](41, " Op\u00E7\u00E3o 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](43, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](44, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](45, " Op\u00E7\u00E3o 2 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](46, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](47, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](48, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](49, " Op\u00E7\u00E3o 3 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](50, "td", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](51, "input-switch", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](53, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](54, "Perguntas:");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](55, "input-multiselect", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](56, "input-text", 25, 26)(58, "input-select", 27, 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](60, "input-multiselect", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](61, "input-text", 30, 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](52);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.codigo);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tipo)("items", ctx.tipoQuestionario);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("items", ctx.exemploLista);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 2)("label", _r0.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.switchExemplo);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.multiPerguntas)("addItemHandle", ctx.addMultiPerguntas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.inputPergunta);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.listaTipoResposta)("items", ctx.tipoPergunta);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("hidden", (_r2 == null ? null : _r2.selectedItem == null ? null : _r2.selectedItem.key) == ("SWITCH" || 0 || 0))("size", 5)("control", ctx.form.controls.multiOpcaoResposta)("addItemHandle", ctx.addMultiRespostas.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.inputOpcoesResposta);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("maxlength", 250);
      }
    },
    dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_5__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_6__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_7__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__.SeparatorComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 7259:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioPerguntaListComponent: () => (/* binding */ QuestionarioPerguntaListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/questionario-pergunta.model */ 46482);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);














function QuestionarioPerguntaListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "toolbar");
  }
}
class QuestionarioPerguntaListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_pergunta_model__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPergunta, src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_1__.QuestionarioPerguntaDaoService);
    this.injector = injector;
    this.tipoQuestionario = [{
      'key': 'Interno',
      'value': 'Interno'
    }, {
      'key': 'Personalizado',
      'value': 'Personalizado'
    }];
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
      }
      if (form.codigo?.length) {
        result.push(["codigo", "like", "%" + form.codigo.trim().replace(" ", "%") + "%"]);
      }
      if (form.tipo?.length) {
        result.push(["tipo", "like", "%" + form.tipo.trim().replace(" ", "%") + "%"]);
      }
      return result;
    };
    /* Inicializações */
    this.title = this.lex.translate("Questionários");
    this.code = "MOD_RX";
    this.orderBy = [['nome', 'asc']];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      }
    });
    // Testa se o usuário possui permissão para exibir dados de cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir a cidade
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    filter.controls.codigo.setValue("");
    filter.controls.tipo.setValue("");
    super.filterClear(filter);
  }
  static #_ = this.ɵfac = function QuestionarioPerguntaListComponent_Factory(t) {
    return new (t || QuestionarioPerguntaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
    type: QuestionarioPerguntaListComponent,
    selectors: [["app-questionario-pergunta-list"]],
    viewQuery: function QuestionarioPerguntaListComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      }
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
    decls: 14,
    vars: 29,
    consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["label", "C\u00F3digo", "controlName", "codigo", "placeholder", "C\u00F3digo", 3, "size", "control"], ["label", "Tipo", "controlName", "tipo", "placeholder", "Tipo", 3, "size", "control", "items"], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "C\u00F3digo", "field", "codigo"], ["title", "Tipo", "field", "tipo"], ["title", "Perguntas", "field", "perguntas"], ["type", "options", 3, "onEdit", "options"], [3, "rows"]],
    template: function QuestionarioPerguntaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "grid", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("select", function QuestionarioPerguntaListComponent_Template_grid_select_0_listener($event) {
          return ctx.onSelect($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, QuestionarioPerguntaListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "columns");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "column", 7)(9, "column", 8)(10, "column", 9)(11, "column", 10)(12, "column", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "pagination", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectable);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.nome);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.codigo);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("maxlength", 250);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.tipo)("items", ctx.tipoQuestionario);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 67239:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-resposta/questionario-resposta-form/questionario-resposta-form.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaFormComponent: () => (/* binding */ QuestionarioRespostaFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);

class QuestionarioRespostaFormComponent {
  static #_ = this.ɵfac = function QuestionarioRespostaFormComponent_Factory(t) {
    return new (t || QuestionarioRespostaFormComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: QuestionarioRespostaFormComponent,
    selectors: [["app-questionario-resposta-form"]],
    decls: 2,
    vars: 0,
    template: function QuestionarioRespostaFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "questionario-resposta-form works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 44762:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-resposta/questionario-resposta-list/questionario-resposta-list.component.ts ***!
  \****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaListComponent: () => (/* binding */ QuestionarioRespostaListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);

class QuestionarioRespostaListComponent {
  static #_ = this.ɵfac = function QuestionarioRespostaListComponent_Factory(t) {
    return new (t || QuestionarioRespostaListComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: QuestionarioRespostaListComponent,
    selectors: [["app-questionario-resposta-list"]],
    decls: 2,
    vars: 0,
    template: function QuestionarioRespostaListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "questionario-resposta-list works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 77554:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-routing.module.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRoutingModule: () => (/* binding */ QuestionarioRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_list_questionario_pergunta_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component */ 7259);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component */ 25767);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);








const routes = [{
  path: '',
  component: _questionario_pergunta_questionario_pergunta_list_questionario_pergunta_list_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPerguntaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Lista",
    modal: false
  }
}, {
  path: 'new',
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
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
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
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
  component: _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioPerguntaFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consultar",
    modal: true
  }
}, {
  path: 'resposta/list',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
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
  path: 'resposta/new',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
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
  path: 'resposta/:id/edit',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
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
  path: 'resposta/:id/consult',
  component: _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaListComponent,
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
class QuestionarioRoutingModule {
  static #_ = this.ɵfac = function QuestionarioRoutingModule_Factory(t) {
    return new (t || QuestionarioRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
    type: QuestionarioRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](QuestionarioRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 98934:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioModule: () => (/* binding */ QuestionarioModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_list_questionario_pergunta_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component */ 7259);
/* harmony import */ var _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component */ 25767);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-form/questionario-resposta-form.component */ 67239);
/* harmony import */ var _questionario_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionario-routing.module */ 77554);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);









class QuestionarioModule {
  static #_ = this.ɵfac = function QuestionarioModule_Factory(t) {
    return new (t || QuestionarioModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
    type: QuestionarioModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_5__.QuestionarioRoutingModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](QuestionarioModule, {
    declarations: [_questionario_pergunta_questionario_pergunta_list_questionario_pergunta_list_component__WEBPACK_IMPORTED_MODULE_1__.QuestionarioPerguntaListComponent, _questionario_pergunta_questionario_pergunta_form_questionario_pergunta_form_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioPerguntaFormComponent, _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioRespostaListComponent, _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_5__.QuestionarioRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=8934.js.map