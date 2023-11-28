"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[8934],{

/***/ 10535:
/*!*************************************************!*\
  !*** ./src/app/dao/questionario-dao.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioDaoService: () => (/* binding */ QuestionarioDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class QuestionarioDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Questionario", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["nome, codigo, versao, tipo"];
  }
}
_class = QuestionarioDaoService;
_class.ɵfac = function QuestionarioDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 29453:
/*!**********************************************!*\
  !*** ./src/app/models/questionario.model.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Questionario: () => (/* binding */ Questionario)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Questionario extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.tipo = ""; //Tipo interno | personalizado
    this.nome = ""; //Nome do questionário
    this.codigo = ""; // Código do questionario
    this.initialization(data);
  }
}

/***/ }),

/***/ 69262:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-list-pergunta/questionario-list-pergunta.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioListPerguntaComponent: () => (/* binding */ QuestionarioListPerguntaComponent)
/* harmony export */ });
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../components/grid/column/column.component */ 83351);
var _class;






const _c0 = ["listaAtividades"];
function QuestionarioListPerguntaComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
  }
  if (rf & 2) {
    const row_r2 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](row_r2.data.pergunta.pergunta);
  }
}
class QuestionarioListPerguntaComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_1__.PageFrameBase {
  set entregaId(value) {
    if (this._entregaId != value) {
      this._entregaId = value;
    }
  }
  get entregaId() {
    return this._entregaId;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.items = [];
    this.loader = false;
    this.questionarioDao = injector.get(src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_0__.QuestionarioDaoService);
    //this.join = ['unidade', 'usuario','demandante']
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }
  loadData() {
    this.loader = true;
    // this.questionarioDao.query({where: [["plano_trabalho_entrega_id", "==", this._entregaId]], join: this.join}).asPromise().then(response => {
    this.questionarioDao.query({}).asPromise().then(response => {
      this.items = response;
    }).finally(() => {
      this.loader = false;
    });
  }
}
_class = QuestionarioListPerguntaComponent;
_class.ɵfac = function QuestionarioListPerguntaComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["questionario-list-pergunta"]],
  viewQuery: function QuestionarioListPerguntaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.listaAtividades = _t.first);
    }
  },
  inputs: {
    entregaId: "entregaId"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 6,
  consts: [[3, "items", "title", "orderBy", "groupBy", "join"], ["title", "Perguntas", 3, "template"], ["columnPerguntas", ""]],
  template: function QuestionarioListPerguntaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "grid", 0)(1, "columns")(2, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, QuestionarioListPerguntaComponent_ng_template_3_Template, 3, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("items", ctx.items)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("template", _r0);
    }
  },
  dependencies: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__.ColumnComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 18347:
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-form/questionario-form.component.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioFormComponent: () => (/* binding */ QuestionarioFormComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/questionario.model */ 29453);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../components/separator/separator.component */ 25560);

var _class;














const _c0 = ["listaExemplo"];
const _c1 = ["listaTipoResposta"];
const _c2 = ["listaTipoRespostaB"];
function QuestionarioFormComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", row_r13.pergunta, " ");
  }
}
function QuestionarioFormComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-text", 27, 28);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12);
  }
}
function QuestionarioFormComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", ctx_r6.lookup.getValue(ctx_r6.tipo, row_r16.tipoResposta), " ");
  }
}
function QuestionarioFormComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-select", 29);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("items", ctx_r8.tipo);
  }
}
function QuestionarioFormComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 30)(1, "input-multiselect", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-text", 32, 33)(4, "input-text", 34, 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("hidden", (ctx_r10.listaTipoRespostaB == null ? null : ctx_r10.listaTipoRespostaB.selectedItem == null ? null : ctx_r10.listaTipoRespostaB.selectedItem.key) == ("SWITCH" || 0 || 0))("size", 12)("addItemHandle", ctx_r10.addMultiRespostasB.bind(ctx_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
  }
}
function QuestionarioFormComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "input-multiselect", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "input-text", 32, 33)(3, "input-text", 34, 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("hidden", (ctx_r12.listaTipoRespostaB == null ? null : ctx_r12.listaTipoRespostaB.selectedItem == null ? null : ctx_r12.listaTipoRespostaB.selectedItem.key) == ("SWITCH" || 0 || 0))("size", 12)("addItemHandle", ctx_r12.addMultiRespostasB.bind(ctx_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
  }
}
class QuestionarioFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__.Questionario, src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_2__.QuestionarioDaoService);
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
    this.tipo = [{
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
    this.perguntaValidate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if (['input'].indexOf(controlName) >= 0 && !control.value?.length) {
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
        default: []
      },
      pergunta: {
        default: ""
      },
      switchExemplo: {
        default: false
      },
      multiOpcaoResposta: {
        default: []
      },
      input: {
        default: ""
      },
      listaTipoResposta: {
        default: ""
      },
      inputOpcoesResposta: {
        default: ""
      },
      inputValorResposta: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formPergunta = this.fh.FormBuilder({
      perguntasB: {
        default: []
      },
      perguntaB: {
        default: ""
      },
      listaTipoRespostaB: {
        default: ""
      },
      tipoRespostaB: {
        default: []
      },
      inputOpcoesRespostaB: {
        default: ""
      },
      inputValorRespostaB: {
        default: ""
      },
      opcoesResposta: {
        default: {
          'opcao': "",
          'valor': ""
        }
      }
    }, this.cdRef, this.perguntaValidate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__.Questionario());
  }
  saveData(form) {
    console.log('PERGUNTAS', this.form?.controls.perguntas.value);
    return new Promise((resolve, reject) => {
      const questionario = this.util.fill(new src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_3__.Questionario(), this.entity);
      resolve(this.util.fillForm(questionario, this.form.value));
    });
  }
  onEscolheTipoChange() {
    let select = document.getElementById('tdID');
    let table = document.getElementById('tables');
    let input = this.listaExemplo?.value;
    let teste = `<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>`;
    if (input != "SWICTH") {
      //select.innerHTML += '<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>';
      select.innerHTML += teste;
    }
  }
  addMultis() {
    console.log('PERGUNTAS', this.form?.controls.perguntas.value);
    let result = undefined;
    const pergunta = this.form?.controls.input.value;
    const tipoResposta = this.listaTipoResposta?.selectedItem;
    const key = this.util.textHash(pergunta);
    if (pergunta && tipoResposta?.value && this.form?.controls.multiOpcaoResposta.value && this.util.validateLookupItem(this.form.controls.perguntas.value, key)) {
      let opcoesResposta = this.form?.controls.multiOpcaoResposta.value;
      let opcoesTexto = "";
      let valoresResposta = "";
      let index = opcoesResposta.length;
      if (tipoResposta.key != 'SWITCH') {
        opcoesResposta.forEach(element => {
          if (index == 1) {
            //opcoesTexto += (element.value)
            opcoesTexto += element.data.opcao + ' - Valor: ' + element.data.valor;
            // valoresResposta += (element.data.valor)
          } else {
            opcoesTexto += element.data.opcao + ' - Valor: ' + element.data.valor + ' - ';
            //valoresResposta += (element.data.valor) + ' - ' 
          }

          index--;
        });
        console.log('opcoesTexto', opcoesTexto);
        result = {
          key: key,
          value: ': ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' + opcoesTexto,
          data: {
            pergunta: pergunta,
            tipo: tipoResposta,
            opcaoResposta: opcoesResposta,
            _status: "ADD"
          }
        };
      } else {
        result = {
          key: key,
          value: ': ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' + tipoResposta.value,
          data: {
            pergunta: {
              'pergunta': pergunta,
              'valor': ''
            },
            tipo: tipoResposta,
            opcaoResposta: {
              'key': 'UNICA',
              'value': 'Resposta Única'
            },
            _status: "ADD"
          }
        };
      }
      this.form.controls.input.setValue("");
      this.form.controls.listaTipoResposta.setValue("");
      this.form.controls.inputOpcoesResposta.setValue("");
      this.form.controls.multiOpcaoResposta.setValue([]);
    }
    return result;
  }
  addMultiRespostasB() {
    let result = undefined;
    const opcaoResposta = this.formPergunta.controls.inputOpcoesRespostaB.value;
    const valorResposta = this.formPergunta.controls.inputValorRespostaB.value;
    const key = this.util.textHash(opcaoResposta + valorResposta);
    /*
       valor - respota ?
    */
    if (opcaoResposta && valorResposta && this.util.validateLookupItem(this.formPergunta.controls.perguntasB.value, key)) {
      result = {
        key: key,
        value: opcaoResposta + ' - ' + valorResposta,
        data: {
          opcaoResposta: opcaoResposta,
          valorResposta: valorResposta,
          _status: "ADD"
        }
      };
      //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
      //this.formPergunta.controls.inputOpcoesRespostaB.setValue("");
      //this.formPergunta.controls.inputValorRespostaB.setValue("");
    }

    return result;
  }
  /**
  * Método chamado para inserir um integrante no grid, seja este componente persistente ou não.
  /** @returns
     public async add() {
   return {
     id: this.dao!.generateUuid(),
     perguntaB: "",
     listaTipoRespostaB:"",
     tipoRespostaB:"",
     multiOpcaoRespostaB:[],
     inputOpcoesRespostaB:"",
     inputValorRespostaB:"",
     opcoesResposta:{'opcao':'','valor':''},
   } as IIndexable;
  }
  /**
  * Método chamado na edição de um integrante da Unidade.
  * @param form
  * @param row
  */
  load(form, row) {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  } ///form.controls.usuario_id.setValue(this.grid?.adding ? row.usuario_id : row.id);
  ///form.controls.atribuicoes.setValue(this.unidadeIntegranteService.converterAtribuicoes(row.atribuicoes));
  ///form.controls.atribuicao.setValue("");
  /**
   * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não.
   * @param row
   * @returns
   */
  remove(row) {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor?");
    })();
  }
  /**
   * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
  save(form, row) {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form?.markAllAsTouched();
      if (form?.valid) {
        row.pergunta = form.pergunta;
        row.tipo = form.tipo;
        // limpar campos do formulario
        // TODO
        return row;
      }
      return undefined;
    })();
  }
  addPergunta() {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {};
      /*{
        id: this.dao!.generateUuid(),
        perguntaB: "",
        listaTipoRespostaB:"",
        tipoRespostaB:"",
        multiOpcaoRespostaB:[],
        inputOpcoesRespostaB:"",
        inputValorRespostaB:"",
        opcoesResposta:{'opcao':'','valor':''},
      };*/
    })();
  }

  loadPergunta() {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  removePergunta() {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  savePergunta() {
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  addItemHandle() {
    return {
      'key': 'key',
      'value': 'value'
    };
  }
  deleteItemHandle() {}
}
_class = QuestionarioFormComponent;
_class.ɵfac = function QuestionarioFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["questionario-form"]],
  viewQuery: function QuestionarioFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.listaExemplo = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.listaTipoResposta = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.listaTipoRespostaB = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 37,
  vars: 32,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "C\u00F3digo", "icon", "bi bi-pen", "controlName", "codigo", 3, "size", "control"], ["label", "Nome", "icon", "bi bi-pen", "controlName", "nome", 3, "size", "control"], ["label", "Tipo", "icon", "bi bi-pen", "controlName", "tipo", 3, "size", "control", "items"], ["title", "Exemplo dos tipos de respostas para as perguntas"], [1, "row"], [1, "col-md-3"], ["title", "Lista"], ["label", "Op\u00E7\u00F5es", "icon", "bi bi-pen", "controlName", "listaExemplo", 3, "size", "items"], ["title", "\u00DAnica escolha"], ["title", "M\u00FAltipla escolha"], ["title", "Sim ou N\u00E3o"], ["icon", "fas fa-chalkboard", "controllName", "switchExemplo", 3, "size", "label", "control"], ["switchExemplo", ""], ["title", "Perguntas"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], [3, "title", "template", "editTemplate"], ["columnPergunta", ""], ["editPergunta", ""], ["title", "Tipo de Resposta", "titleHint", "Escolha o tipo de op\u00E7\u00E3o de resposta", 3, "template", "editTemplate"], ["columnTipoResposta", ""], ["editTipoResposta", ""], ["title", "Respostas", "titleHint", "Informe as escolhas de respostas da pergunta", 3, "template", "editTemplate"], ["columnResposta", ""], ["editResposta", ""], ["type", "options"], ["label", "", "icon", "", "controlName", "perguntaB", 3, "size"], ["pergunta", ""], ["label", "", "icon", "fas fa-sign-out-alt", "controlName", "listaTipoRespostB", 3, "size", "items"], [1, "text-wrap", "width-min-content"], ["label", "", "controlName", "multiOpcaoRespostaB", "noBox", "", 3, "hidden", "size", "addItemHandle"], ["label", "Op\u00E7\u00F5es da resposta", "icon", "bi bi-pencil-fill", "controlName", "inputOpcoesRespostaB", 3, "size"], ["opcoesResposta", ""], ["label", "Valor da resposta", "icon", "bi bi-pencil-fill", "controlName", "inputValorRespostaB", 3, "size"], ["valorResposta", ""]],
  template: function QuestionarioFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function QuestionarioFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function QuestionarioFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-text", 2)(3, "input-text", 3)(4, "input-select", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "separator", 5)(6, "div", 6)(7, "div", 7)(8, "separator", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "input-select", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "separator", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "separator", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "div", 7)(15, "separator", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](16, "input-switch", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "separator", 15)(19, "grid", 16)(20, "columns")(21, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](22, QuestionarioFormComponent_ng_template_22_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](24, QuestionarioFormComponent_ng_template_24_Template, 2, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](26, "column", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](27, QuestionarioFormComponent_ng_template_27_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](29, QuestionarioFormComponent_ng_template_29_Template, 1, 2, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](31, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](32, QuestionarioFormComponent_ng_template_32_Template, 6, 7, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](34, QuestionarioFormComponent_ng_template_34_Template, 5, 7, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](36, "column", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](17);
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](23);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](25);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](28);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](30);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](33);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](35);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.codigo);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tipo)("items", ctx.tipoQuestionario);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("items", ctx.exemploLista);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2)("label", _r0.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.switchExemplo);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("control", ctx.formPergunta.controls.perguntasB)("minHeight", 500)("form", ctx.formPergunta)("hasDelete", true)("add", ctx.addPergunta.bind(ctx))("load", ctx.loadPergunta.bind(ctx))("remove", ctx.removePergunta.bind(ctx))("save", ctx.savePergunta.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", ctx.lex.translate("Pergunta"))("template", _r1)("editTemplate", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("template", _r5)("editTemplate", _r7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("template", _r9)("editTemplate", _r11);
    }
  },
  dependencies: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_5__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_11__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 88626:
/*!**********************************************************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/questionario/questionario-pergunta/questionario-list/questionario-list.component.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioListComponent: () => (/* binding */ QuestionarioListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/questionario.model */ 29453);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
var _class;















function QuestionarioListComponent_toolbar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "toolbar");
  }
}
function QuestionarioListComponent_column_8_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", row_r6.perguntas == null ? null : row_r6.perguntas.length, "");
  }
}
function QuestionarioListComponent_column_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, QuestionarioListComponent_column_8_ng_template_1_span_0_Template, 3, 1, "span", 16);
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", row_r6.perguntas == null ? null : row_r6.perguntas.length);
  }
}
function QuestionarioListComponent_column_8_ng_template_3_tr_9_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const opcoes_r14 = ctx.$implicit;
    const i_r15 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate3"]("", i_r15 + 1, " - ", opcoes_r14.data.opcao, " - Valor: ", opcoes_r14.data.valor, "");
  }
}
function QuestionarioListComponent_column_8_ng_template_3_tr_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "td", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, QuestionarioListComponent_column_8_ng_template_3_tr_9_span_5_Template, 2, 3, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const pergunta_r11 = ctx.$implicit;
    const i_r12 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"]("", i_r12 + 1, " - ", pergunta_r11.data.pergunta.pergunta, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](pergunta_r11.data.tipo.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", pergunta_r11.data.opcaoResposta);
  }
}
function QuestionarioListComponent_column_8_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "table", 19)(1, "thead")(2, "tr")(3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4, "Pergunta");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6, "Tipo de Resposta");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8, "Op\u00E7\u00F5es de resposta e Valor");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, QuestionarioListComponent_column_8_ng_template_3_tr_9_Template, 6, 4, "tr", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](10, "questionario-list-pergunta");
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r9.perguntas);
  }
}
function QuestionarioListComponent_column_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "column", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, QuestionarioListComponent_column_8_ng_template_1_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, QuestionarioListComponent_column_8_ng_template_3_Template, 11, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](2);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](4);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("align", "center")("hint", ctx_r1.lex.translate("Perguntas"))("template", _r2)("expandTemplate", _r4);
  }
}
class QuestionarioListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_model__WEBPACK_IMPORTED_MODULE_2__.Questionario, src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_1__.QuestionarioDaoService);
    this.injector = injector;
    this.tipoQuestionario = [{
      'key': 'Interno',
      'value': 'Interno'
    }, {
      'key': 'Personalizado',
      'value': 'Personalizado'
    }];
    this.exibes = [];
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
      },
      codigo: {
        default: ""
      },
      tipo: {
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
  onGridLoad(rows) {
    console.log('ROWS->', rows);
    rows?.forEach(v => {
      console.log('V->', v.perguntas);
      v.exibePerguntas = v.perguntas;
    });
  }
}
_class = QuestionarioListComponent;
_class.ɵfac = function QuestionarioListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["questionario-list"]],
  viewQuery: function QuestionarioListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 14,
  vars: 31,
  consts: [[3, "dao", "add", "title", "orderBy", "groupBy", "join", "loadList", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", "placeholder", "Nome", 3, "size", "control"], ["label", "C\u00F3digo", "controlName", "codigo", "placeholder", "C\u00F3digo", 3, "size", "control"], ["label", "Tipo do Question\u00E1rio", "controlName", "tipo", "placeholder", "Tipo", 3, "size", "control", "items"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate", 4, "ngIf"], ["title", "Nome", "field", "nome", "orderBy", "nome"], ["title", "C\u00F3digo", "field", "codigo"], ["title", "Tipo", "field", "tipo"], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["type", "expand", "icon", "bi bi-list-check", 3, "align", "hint", "template", "expandTemplate"], ["columnPerguntas", ""], ["columnExpandedPerguntas", ""], ["class", "badge rounded-pill bg-light text-dark", 4, "ngIf"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], [1, "bi", "bi-list-check"], [1, "table", "table-responsive", "table-striped", "table-hover", "table-sm"], [4, "ngFor", "ngForOf"], ["id", "tdOpcao"], ["id", "opcoes", 4, "ngFor", "ngForOf"], ["id", "opcoes"]],
  template: function QuestionarioListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("select", function QuestionarioListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, QuestionarioListComponent_toolbar_1_Template, 1, 0, "toolbar", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "filter", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "input-text", 4)(5, "input-text", 5)(6, "input-select", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "columns");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, QuestionarioListComponent_column_8_Template, 5, 4, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](9, "column", 8)(10, "column", 9)(11, "column", 10)(12, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "pagination", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("title", ctx.isModal ? "" : ctx.title)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("loadList", ctx.onGridLoad.bind(ctx))("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit", ctx.auth.hasPermissionTo("MOD_RX_VIS_DPE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.codigo);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.tipo)("items", ctx.tipoQuestionario);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_11__.QuestionarioListPerguntaComponent],
  styles: ["\n\n\n\n\n\n#opcoes[_ngcontent-%COMP%] {\n  display: block;\n}\n\n#tdOpcao[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jYWRhc3Ryb3MvY3VycmljdWx1bS9xdWVzdGlvbmFyaW8vcXVlc3Rpb25hcmlvLXBlcmd1bnRhL3F1ZXN0aW9uYXJpby1saXN0L3F1ZXN0aW9uYXJpby1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O01BQUE7QUFLQTtFQUNJLGNBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKiNvcGNvZXM6OmJlZm9yZXtcclxuICAgIGNvbnRlbnQ6IFwiXFxhXCI7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH0qL1xyXG4jb3Bjb2VzIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gfVxyXG5cclxuI3RkT3BjYW97XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

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
var _class;

class QuestionarioRespostaFormComponent {}
_class = QuestionarioRespostaFormComponent;
_class.ɵfac = function QuestionarioRespostaFormComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
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
var _class;

class QuestionarioRespostaListComponent {}
_class = QuestionarioRespostaListComponent;
_class.ɵfac = function QuestionarioRespostaListComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _questionario_pergunta_questionario_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-list/questionario-list.component */ 88626);
/* harmony import */ var _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-pergunta/questionario-form/questionario-form.component */ 18347);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [{
  path: '',
  component: _questionario_pergunta_questionario_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioListComponent,
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
  component: _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioFormComponent,
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
  component: _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioFormComponent,
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
  component: _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioFormComponent,
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
}, {
  path: 'teste',
  component: _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__.QuestionarioListPerguntaComponent,
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
class QuestionarioRoutingModule {}
_class = QuestionarioRoutingModule;
_class.ɵfac = function QuestionarioRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](QuestionarioRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _questionario_pergunta_questionario_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./questionario-pergunta/questionario-list/questionario-list.component */ 88626);
/* harmony import */ var _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questionario-pergunta/questionario-form/questionario-form.component */ 18347);
/* harmony import */ var _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-list/questionario-resposta-list.component */ 44762);
/* harmony import */ var _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questionario-resposta/questionario-resposta-form/questionario-resposta-form.component */ 67239);
/* harmony import */ var _questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionario-list-pergunta/questionario-list-pergunta.component */ 69262);
/* harmony import */ var _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./questionario-routing.module */ 77554);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;










class QuestionarioModule {}
_class = QuestionarioModule;
_class.ɵfac = function QuestionarioModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](QuestionarioModule, {
    declarations: [_questionario_list_pergunta_questionario_list_pergunta_component__WEBPACK_IMPORTED_MODULE_5__.QuestionarioListPerguntaComponent, _questionario_pergunta_questionario_list_questionario_list_component__WEBPACK_IMPORTED_MODULE_1__.QuestionarioListComponent, _questionario_pergunta_questionario_form_questionario_form_component__WEBPACK_IMPORTED_MODULE_2__.QuestionarioFormComponent, _questionario_resposta_questionario_resposta_list_questionario_resposta_list_component__WEBPACK_IMPORTED_MODULE_3__.QuestionarioRespostaListComponent, _questionario_resposta_questionario_resposta_form_questionario_resposta_form_component__WEBPACK_IMPORTED_MODULE_4__.QuestionarioRespostaFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, _questionario_routing_module__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=8934.js.map