"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[515],{

/***/ 39910:
/*!***********************************************!*\
  !*** ./src/app/dao/curriculum-dao.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumDaoService: () => (/* binding */ CurriculumDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class CurriculumDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Curriculum", injector);
    this.injector = injector;
    this.searchFields = ["apresentacao", "telefone", "idiomas", "estado_civil", "quantidade_filhos"];
  }
}
_class = CurriculumDaoService;
_class.ɵfac = function CurriculumDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 60978:
/*!************************************************************!*\
  !*** ./src/app/dao/curriculum-profissional-dao.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumProfissionalDaoService: () => (/* binding */ CurriculumProfissionalDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class CurriculumProfissionalDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("CurriculumProfissional", injector);
    this.injector = injector;
    this.searchFields = ["ano_ingresso", "lotacao_atual", "pgd_inserido", "pgd_interesse", "funcoes", "unidades_lotado", "atividades_fora", "atividades_internas", "especifique_habilidades", "docencia_fora", "docencia_interna", "curso_fora", "curso_interno", "viagem_nacional", "viagem_internacional", "interesse_bnt", "remocao"];
  }
}
_class = CurriculumProfissionalDaoService;
_class.ɵfac = function CurriculumProfissionalDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 46722:
/*!**********************************************************!*\
  !*** ./src/app/models/currriculum-profissional.model.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumProfissional: () => (/* binding */ CurriculumProfissional)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class CurriculumProfissional extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.ano_ingresso = ""; //Ano de ingresso na instituição
    this.lotacao_atual = ""; //Lotação atual do servidor
    this.pgd_inserido = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
    this.pgd_interesse = ""; //Tem interesse ou não no PGD da instituição e qual modalidade
    this.telefone = ""; // Telefone do chefe imediato caso tenha interesse no PGD
    this.funcoes = []; // Funções ocupadas em toda carreira como titular ou substituto
    this.unidades_lotado = []; // Unidades de lotação em toda carreira
    this.atividades_fora = []; //Atividades desempenhadas externamente que podem contribuir para intituição
    this.atividades_internas = []; //Atividades desempenhadas internamente que podem contribuir para intituição
    this.especifique_habilidades = []; //Atividades desempenhadas internamente que podem contribuir para intituição
    this.docencia_fora = []; // Já foi docente fora da instituição
    this.docencia_interna = []; // Já foi docente na instituição
    this.curso_fora = []; //Quais cursos você já fez e quais pretende fazer fora da Instituição
    this.curso_interno = []; //Quais os principais cursos que você já fez e pretende fazer na Instituição
    this.viagem_nacional = 0; //Já fez viagem nacional a trabalho
    this.viagem_internacional = 0; //Já fez viagem internacional a trabalho
    this.interesse_bnt = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
    this.remocao = 0; // Tem interesse em remoção
    this.curriculum_id = ""; //ID Curriculum
    this.centro_treinamento_id = ""; //ID do CT 
    this.cargo_id = ""; //ID do Cargo
    this.grupo_especializado_id = ""; //ID do Grupo Especializado
    this.initialization(data);
  }
}

/***/ }),

/***/ 70156:
/*!*********************************************!*\
  !*** ./src/app/models/currriculum.model.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Curriculum: () => (/* binding */ Curriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Curriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  // public curriculum_id? : string= ""; 
  constructor(data) {
    super();
    this.apresentacao = ""; //Apresentação do servidor
    this.telefone = ""; // Telefone do servidor
    this.idiomas = []; // Idiomas falado pelo servidor
    this.estado_civil = ""; //
    this.quantidade_filhos = 0;
    this.ativo = 1; //Curriculum ativo ou não
    this.usuario_id = ""; //ID do usuario 
    this.cidade_id = ""; //ID da cidade
    this.initialization(data);
  }
}

/***/ }),

/***/ 43433:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/curriculum-list/curriculum-list.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumListComponent: () => (/* binding */ CurriculumListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;

class CurriculumListComponent {
  constructor() {}
  ngOnInit() {}
}
_class = CurriculumListComponent;
_class.ɵfac = function CurriculumListComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-curriculum-list"]],
  decls: 2,
  vars: 0,
  template: function CurriculumListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "curriculum-list works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 92976:
/*!*************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosbig5FormComponent: () => (/* binding */ CurriculumAtributosbig5FormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
var _class;




class CurriculumAtributosbig5FormComponent {
  constructor(router) {
    this.router = router;
    this.comunica = "/assets/images/iconeComunicacao.png"; //"../assets/images/Comunica.jpg";
    this.lideranca = "/assets/images/iconeLideranca.png";
    this.resolucao = "/assets/images/iconeResolucao.png";
    this.pensamento = "/assets/images/iconePensamento.png";
    this.criatividade = "/assets/images/iconeCriatividade.png";
    this.habilidade = "/assets/images/iconeHabilidades.png";
    this.adaptabilidade = "/assets/images/iconeAdaptabilidade.png";
    this.bigicoAmarelo = "/assets/images/iconBigAmarelo.png";
    this.bigico = "/assets/images/iconBig.png";
    const range = document.getElementById('range');
    console.log('RANGE-->', range);
    const rangeV = document.getElementById('rangeV');
    const setValue = () => {
      console.log(range);
      const newValue = Number(parseInt(range.value) - parseInt(range.min) * 100 / (parseInt(range.max) - parseInt(range.min))),
        newPosition = 10 - newValue * 0.2;
      rangeV.innerHTML = `<span>${range}</span>`;
      rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    };
    document.addEventListener('DOMContentLoaded', setValue);
    console.log(range);
    //range.addEventListener('input', setValue);
  }

  ngOnInit() {}
  inicio() {
    if ($('#big5').is(":hidden")) {
      $('#big5').show();
      $('#lblinicio').text('Voltar');
      $('#btnInicio').removeClass().addClass('btn btn-dark');
    } else {
      $('#big5').hide();
      $('#lblinicio').text('Iniciar');
      $('#btnInicio').removeClass().addClass('btn btn-success');
    }
  }
  onChangePerma() {
    console.log();
    let value = $('#rangePerma').val();
    $('#lblPerma').text(value.toString());
  }
  onChangeValorSoft() {}
  voltarb5() {}
  resposta() {}
  proxb5() {}
}
_class = CurriculumAtributosbig5FormComponent;
_class.ɵfac = function CurriculumAtributosbig5FormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributosbig5-form"]],
  decls: 189,
  vars: 10,
  consts: [["display", "", "right", ""], ["key", "BIG5", "label", "Big-Five", 1, "fw-bold"], ["id", "b5exp", 1, "my-3"], ["id", "pb5exp", 1, "text-justify", "fw-bold"], [1, "row", "justify-content-center"], [1, "col-md-5"], [1, "card", "text-center", "mt-5"], [1, "card-header"], ["id", "imgBigIco", "alt", "...", 1, "card-img-top", "me-2", 3, "src"], [1, "card-body"], [1, "row", "my-2"], [1, "col-lg-12"], ["for", "escolheRelatorioIFR", 1, "label", "mb-3"], [1, "btn-group", "d-grid", "justify-content-md-center"], [1, "col-12", "mb-1"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "dataIF", "autocomplete", "off", "value", "dataIF", "checked", "", 1, "btn-check", "btnRadio"], ["for", "dataIF", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "mesAno", "autocomplete", "off", "value", "mesAno", 1, "btn-check", "btnRadio"], ["for", "mesAno", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "total", "autocomplete", "off", "value", "total", 1, "btn-check", "btnRadio"], ["for", "total", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], [1, "card-footer"], [1, "row"], [1, "col-md-12", "d-flex", "justify-content-between"], [1, "col-md-3"], ["type", "button", "id", "btnv", "disabled", "", 1, "btn", "btn-primary", 3, "click"], ["type", "button", "id", "btne", "disabled", "", 1, "btn", "btn-primary", 3, "click"], [1, "btn-group", "d-flex", "flex-wrap"], ["for", "dataIF", 1, "btn", "btn-outline-primary", "btnRadio"], ["for", "mesAno", 1, "btn", "btn-outline-primary", "mx-2", "btnRadio"], ["for", "total", 1, "btn", "btn-outline-primary", "btnRadio"], ["key", "DISC", "label", "Disc", 1, "fw-bold"], ["key", "PERMA", "label", "M\u00E9todo PERMA", 1, "fw-bold"], [1, "col-md-7"], [1, "card", "mt-5"], [1, "card-header", "hperma"], [1, "card-body-perma"], [1, "range-wrap", "divSlidePerma", "w-100", "box"], ["name", "lblPerma", "id", "lblPerma", 1, "me-2", "lperma"], ["id", "rangePerma", "name", "rangePerma", "type", "range", "min", "0", "max", "10", "value", "0", "step", "1", 1, "ms-2", "rperma", 3, "change"], [1, "card-footer", "fperma"], [1, "d-flex", "justify-content-between"], ["type", "button", "id", "btnv", "disabled", "", 1, "btn", "btnpermav", 3, "click"], ["type", "button", "id", "btne", "disabled", "", 1, "btn", "btnpermap", 3, "click"], ["key", "SRQ19", "label", "SRQ-19", 1, "fw-bold"], ["key", "SOFTSKILLS", "label", "Soft-Skills", 1, "fw-bold"], [1, "my-5"], [1, "row", "justify-content-between", "g-4"], [1, "col-lg-3"], [1, "card", "h-100"], ["id", "imgComunica", "alt", "...", 1, "card-img-top", 3, "src"], [1, "card-title", "text-center"], [1, "col-md-6"], [1, "card-text"], ["type", "number", "dir", "rtl", "value", "0", 1, "form-control"], ["id", "imgLideranca", "alt", "...", 1, "card-img-top", 3, "src"], ["id", "imgResolucao", "alt", "...", 1, "card-img-top", 3, "src"], ["id", "imgCriatividade", "alt", "...", 1, "card-img-top", 3, "src"], [1, "row", "justify-content-between", "g-4", "mt-3"], ["id", "imgPensamento", "alt", "...", 1, "card-img-top", 3, "src"], ["id", "imgHabilidade", "alt", "...", 1, "card-img-top", 3, "src"], [1, "col-md-4"], ["id", "imgAdaptabilidade", "alt", "...", 1, "card-img-top", 3, "src"]],
  template: function CurriculumAtributosbig5FormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1)(2, "div", 2)(3, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Voc\u00EA quer se conhecer melhor? Este teste de personalidade ir\u00E1 ajud\u00E1-lo a compreender as formas de seu comportamento e os motivos de suas a\u00E7\u00F5es. Ao final do teste voc\u00EA poder\u00E1 optar se deseja torn\u00E1-lo p\u00FAblico ou n\u00E3o. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Para prosseguir \u00E9 necess\u00E1rio responder a pergunta");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 9)(13, "div", 10)(14, "div", 11)(15, "label", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "1. Eu sou a alma da festa.");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 13)(19, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Muito Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "label", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Relativamente Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "label", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Nem Adequado, Nem Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "label", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Relativamente Adequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](36, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "label", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Muito Adequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 21)(40, "div", 22)(41, "div", 23)(42, "div", 24)(43, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_43_listener() {
        return ctx.voltarb5();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Voltar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 24)(46, "button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_46_listener() {
        return ctx.resposta();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Enviar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "div", 6)(49, "div", 7)(50, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](51, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "Para prosseguir \u00E9 necess\u00E1rio responder a pergunta");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "div", 9)(54, "div", 10)(55, "div", 11)(56, "label", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](57, "1. Eu sou a alma da festa.");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](58, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](60, "input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](61, "label", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](62, "Muito Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](63, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](64, "label", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](65, "Relativamente Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](66, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "label", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](68, "Nem Adequado, Nem Inadequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](69, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](70, "label", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](71, "Relativamente Adequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](72, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "label", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](74, "Muito Adequado");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](75, "div", 21)(76, "div", 22)(77, "div", 23)(78, "div", 24)(79, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_79_listener() {
        return ctx.voltarb5();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](80, "Voltar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](81, "div", 24)(82, "button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_82_listener() {
        return ctx.resposta();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "Enviar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](84, "tab", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](85, "tab", 32)(86, "div", 4)(87, "div", 33)(88, "div", 34)(89, "div", 35)(90, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](91, "1. Em geral, at\u00E9 que ponto voc\u00EA se sente satisfeito?");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](92, "div", 36)(93, "div", 37)(94, "label", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](95, "0");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](96, "input", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_96_listener() {
        return ctx.onChangePerma();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](97, "div", 40)(98, "div", 41)(99, "button", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_99_listener() {
        return ctx.voltarb5();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](100, "Voltar");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](101, "button", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_101_listener() {
        return ctx.resposta();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](102, "Pr\u00F3ximo");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](103, "tab", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](104, "tab", 45)(105, "h4", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](106, "Compet\u00EAncias Gerenciais, distribua 20 pontos entre as habilidades abaixo: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](107, "div", 47)(108, "div", 48)(109, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](110, "img", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](111, "div", 9)(112, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](113, "Comunica\u00E7\u00E3o");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](114, "div", 4)(115, "div", 52)(116, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](117, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](118, "div", 48)(119, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](120, "img", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](121, "div", 9)(122, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](123, "Lideran\u00E7a");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](124, "div", 4)(125, "div", 52)(126, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](127, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](128, "div", 48)(129, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](130, "img", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](131, "div", 9)(132, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](133, "Resolu\u00E7\u00E3o de Problemas");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](134, "div", 4)(135, "div", 52)(136, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](137, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](138, "div", 48)(139, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](140, "img", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](141, "div", 9)(142, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](143, "Criatividade e Curiosidade");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](144, "div", 4)(145, "div", 52)(146, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](147, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](148, "div", 58)(149, "div", 48)(150, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](151, "img", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](152, "div", 9)(153, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](154, "Pensamento Cr\u00EDtico");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](155, "div", 4)(156, "div", 52)(157, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](158, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](159, "div", 48)(160, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](161, "img", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](162, "div", 9)(163, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](164, "Habilidade com Pessoas e Equipes");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](165, "div", 4)(166, "div", 61)(167, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](168, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](169, "div", 48)(170, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](171, "img", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](172, "div", 9)(173, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](174, "Adaptabilidade e Resili\u00EAncia");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](175, "div", 4)(176, "div", 5)(177, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](178, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](179, "div", 48)(180, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](181, "img", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](182, "div", 9)(183, "h5", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](184, "\u00C9tica");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](185, "div", 4)(186, "div", 5)(187, "p", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](188, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.bigico, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](41);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.bigico, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](59);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.comunica, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.lideranca, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.resolucao, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.criatividade, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.pensamento, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.habilidade, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.adaptabilidade, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.adaptabilidade, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    }
  },
  dependencies: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_0__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_1__.TabComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);input[type=range][_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  margin: 20px 0;\n  width: 100%;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 4px;\n  cursor: pointer;\n  animate: 0.2s;\n  background: grey;\n  border-radius: 25px;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-thumb {\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 0 4px 0 rgb(0, 0, 0);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -8px;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus::-webkit-slider-runnable-track {\n  background: grey;\n}\n\n.range-wrap[_ngcontent-%COMP%] {\n  width: 500px;\n  position: relative;\n}\n\n.range-value[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -50%;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  background: grey;\n  color: #fff;\n  font-size: 12px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0);\n  border-radius: 6px;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 10px solid grey;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  margin-top: -1px;\n}\n\n#lblPerma[_ngcontent-%COMP%] {\n  float: right;\n  font-size: 200%;\n  text-align: center;\n  padding-left: 1em;\n}\n\n.divSlidePerma[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n  height: auto;\n}\n\n.card-body-perma[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #223;\n  display: grid;\n}\n\n.box[_ngcontent-%COMP%] {\n  --border-size: 3px;\n  --border-angle: 0turn;\n  width: 60vmin;\n  height: 10vmin;\n  background-image: conic-gradient(from var(--border-angle), #223, #223 50%, #223), conic-gradient(from var(--border-angle), transparent 20%, white, #fec901);\n  background-size: calc(100% - var(--border-size) * 2) calc(100% - var(--border-size) * 2), cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  animation: _ngcontent-%COMP%_bg-spin 3s linear infinite;\n  border-color: #223;\n}\n@keyframes _ngcontent-%COMP%_bg-spin {\n  to {\n    --border-angle: 1turn;\n  }\n}\n.box[_ngcontent-%COMP%]:hover {\n  animation-play-state: paused;\n}\n\n@property --border-angle {\n  syntax: \"<angle>\";\n  inherits: true;\n  initial-value: 0turn;\n}\n#lblPerma[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.hb51[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fec901;\n}\n\n.bb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n.fb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n#btnvb5[_ngcontent-%COMP%], #btneb5[_ngcontent-%COMP%] {\n  color: #fec901;\n  outline-color: #fec901;\n}\n\n.lblRadio[_ngcontent-%COMP%] {\n  background-color: #fec901;\n  color: #223;\n  outline: #223;\n}\n\n.lblRadio[_ngcontent-%COMP%]:hover {\n  background-color: #223;\n  color: #fec901;\n  border-color: #fec901;\n}\n\n.lblpergB5[_ngcontent-%COMP%] {\n  color: #fec901;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.hperma[_ngcontent-%COMP%], .fperma[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fff;\n}\n\n.btnpermav[_ngcontent-%COMP%], .btnpermap[_ngcontent-%COMP%] {\n  background-color: #fff;\n  color: #213;\n  border-color: #213;\n}\n\ninput[type=radio][_ngcontent-%COMP%]:checked    + .lblRadio[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.h4[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJpY3VsdW0tYXRyaWJ1dG9zYmlnNS1mb3JtL2N1cnJpY3VsdW0tYXRyaWJ1dG9zYmlnNS1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksd0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUVFO0VBQ0UsYUFBQTtBQUNKOztBQUNFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLHdCQUFBO0VBQ0EsZ0JBQUE7QUFHSjs7QUFERTtFQUNFLGdCQUFBO0FBSUo7O0FBRkU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFLSjs7QUFIRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtBQU1KOztBQUpFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FBT0o7O0FBTEU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVFKOztBQUxBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBUUo7O0FBTEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQVFGOztBQUpBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBQU9GOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsMkpBQUE7RUFDQSwrRkFBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7RUFFQSxxQ0FBQTtFQUNBLGtCQUFBO0FBS0Y7QUFJQTtFQUNFO0lBQ0kscUJBQUE7RUFJSjtBQUNGO0FBREE7RUFFRSw0QkFBQTtBQUdGOztBQUFBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFHRjtBQUFBO0VBQ0UsWUFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0FBRUY7O0FBQ0E7RUFDRSxzQkFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7QUFFRjs7QUFDQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtBQUVGOztBQUNBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUFFRjs7QUFFQTtFQUVFLGNBQUE7QUFBRjs7QUFLQTtFQUNFLGVBQUE7QUFGRjs7QUFNQTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtBQUhGOztBQU9BO0VBRUUsc0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFMRjs7QUFVQTtFQUNFLHNCQUFBO0FBUEY7O0FBVUE7RUFDRSxlQUFBO0FBUEY7O0FBV0E7RUFDRSx3QkFBQTtFQUNBLGlCQUFBO0FBUkY7O0FBV0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVdBO0VBQ0UsbUJBQUE7QUFSRiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmNkbmZvbnRzLmNvbS9jc3MvbmV1dHJhLXRleHQtYWx0Jyk7XG5cbmlucHV0W3R5cGU9cmFuZ2VdIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgaW5wdXRbdHlwZT1yYW5nZV06Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbiAgaW5wdXRbdHlwZT1yYW5nZV06Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYW5pbWF0ZTogMC4ycztcbiAgICBiYWNrZ3JvdW5kOiBncmV5Oy8vIzAzYTlmNDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICB9XG4gIGlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci10aHVtYiB7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggMCByZ2JhKDAsMCwwLCAxKTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIG1hcmdpbi10b3A6IC04cHg7XG4gIH1cbiAgaW5wdXRbdHlwZT1yYW5nZV06Zm9jdXM6Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiBncmV5OyAvLyMwM2E5ZjQ7XG4gIH1cbiAgLnJhbmdlLXdyYXB7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAucmFuZ2UtdmFsdWV7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLTUwJTtcbiAgfVxuICAucmFuZ2UtdmFsdWUgc3BhbntcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQ6IGdyZXk7Ly8gIzAzYTlmNDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAwKTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIH1cbiAgLnJhbmdlLXZhbHVlIHNwYW46YmVmb3Jle1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIGdyZXk7IC8vIzAzYTlmNDtcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIHRvcDogMTAwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gICAgbWFyZ2luLXRvcDogLTFweDtcbiAgfVxuXG4jbGJsUGVybWF7XG4gICAgZmxvYXQ6cmlnaHQ7XG4gICAgZm9udC1zaXplOiAyMDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuLmRpdlNsaWRlUGVybWEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWZsb3c6IHJvdy1yZXZlcnNlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBoZWlnaHQ6IGF1dG87XG4gXG59XG5cbi5jYXJkLWJvZHktcGVybWF7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogIzIyMztcbiAgZGlzcGxheTogZ3JpZDtcbiAgLy9wbGFjZS1pdGVtczogY2VudGVyO1xuXG59XG5cbi5ib3gge1xuICAtLWJvcmRlci1zaXplOiAzcHg7XG4gIC0tYm9yZGVyLWFuZ2xlOiAwdHVybjtcbiAgd2lkdGg6IDYwdm1pbjtcbiAgaGVpZ2h0OiAxMHZtaW47XG4gIGJhY2tncm91bmQtaW1hZ2U6IGNvbmljLWdyYWRpZW50KGZyb20gdmFyKC0tYm9yZGVyLWFuZ2xlKSwgIzIyMywgIzIyMyA1MCUsICMyMjMpLCBjb25pYy1ncmFkaWVudChmcm9tIHZhcigtLWJvcmRlci1hbmdsZSksIHRyYW5zcGFyZW50IDIwJSwgd2hpdGUsICNmZWM5MDEpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNhbGMoMTAwJSAtICh2YXIoLS1ib3JkZXItc2l6ZSkgKiAyKSkgY2FsYygxMDAlIC0gKHZhcigtLWJvcmRlci1zaXplKSAqIDIpKSwgY292ZXI7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBiZy1zcGluIDNzIGxpbmVhciBpbmZpbml0ZTtcbiAgYW5pbWF0aW9uOiBiZy1zcGluIDNzIGxpbmVhciBpbmZpbml0ZTtcbiAgYm9yZGVyLWNvbG9yOiMyMjM7XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBiZy1zcGluIHtcbiAgdG8ge1xuICAgICAgLS1ib3JkZXItYW5nbGU6IDF0dXJuO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYmctc3BpbiB7XG4gIHRvIHtcbiAgICAgIC0tYm9yZGVyLWFuZ2xlOiAxdHVybjtcbiAgfVxufVxuXG4uYm94OmhvdmVyIHtcbiAgLXdlYmtpdC1hbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuICBhbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xufVxuXG5AcHJvcGVydHkgLS1ib3JkZXItYW5nbGUge1xuICBzeW50YXg6IFwiPGFuZ2xlPlwiO1xuICBpbmhlcml0czogdHJ1ZTtcbiAgaW5pdGlhbC12YWx1ZTogMHR1cm47XG59XG5cbiNsYmxQZXJtYXtcbiAgY29sb3I6d2hpdGU7XG59XG5cbi5oYjUxe1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIzO1xuICBjb2xvcjogI2ZlYzkwMTtcbn1cblxuLmJiNTF7XG4gIGJhY2tncm91bmQtY29sb3I6IzIyMztcbn1cblxuLmZiNTF7XG4gIGJhY2tncm91bmQtY29sb3I6IzIyMztcbn1cblxuI2J0bnZiNSwgI2J0bmViNXtcbiAgY29sb3I6I2ZlYzkwMTtcbiAgb3V0bGluZS1jb2xvcjojZmVjOTAxO1xufVxuXG4ubGJsUmFkaW97XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWM5MDE7Ly9mZWM5MDFcbiAgY29sb3I6IzIyMzsvLzIyM1xuICBvdXRsaW5lOiAjMjIzO1xufVxuXG4ubGJsUmFkaW86aG92ZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6IzIyMztcbiAgY29sb3I6ICNmZWM5MDE7XG4gIGJvcmRlci1jb2xvcjogI2ZlYzkwMTtcblxufVxuXG4ubGJscGVyZ0I1e1xuICBcbiAgY29sb3I6ICNmZWM5MDE7XG5cbn1cblxuXG4jaW1nQmlnSWNvLCNpbWdCaWdJY29BbWFyZWxve1xuICBtYXgtd2lkdGg6IDMwcHg7XG4gIFxufVxuXG4uaHBlcm1hLCAuZnBlcm1hIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMztcbiAgY29sb3I6ICNmZmY7XG4gIC8vZm9udC1mYW1pbHk6J1RyZWJ1Y2hldCBNUycsICdMdWNpZGEgU2FucyBVbmljb2RlJywgJ0x1Y2lkYSBHcmFuZGUnLCAnTHVjaWRhIFNhbnMnLCBBcmlhbCwgc2Fucy1zZXJpZjtcbn1cblxuLmJ0bnBlcm1hdiwgLmJ0bnBlcm1hcHtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBjb2xvcjogIzIxMztcbiAgYm9yZGVyLWNvbG9yOiAjMjEzO1xuXG59XG5cblxuaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQrIC5sYmxSYWRpb3sgIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBcbn1cblxuI2ltZ0JpZ0ljbywjaW1nQmlnSWNvQW1hcmVsb3tcbiAgbWF4LXdpZHRoOiAzMHB4O1xuXG59XG5cbi5oNHtcbiAgZm9udC1mYW1pbHk6IG5ldXRyYSB0ZXh0O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmNhcmQtaW1nLXRvcHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDkwcHg7XG59XG5cbi5jYXJke1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 97733:
/*!*********************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-form/curriculum-form.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumFormComponent: () => (/* binding */ CurriculumFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ 20497);
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ 24997);
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ 34406);
/* harmony import */ var src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/curriculum-dao.service */ 39910);
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/currriculum.model */ 70156);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/animations */ 66400);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ 9224);
var _class;



















const _c0 = ["areaPos"];
const _c1 = ["estados"];
const _c2 = ["curso"];
function CurriculumFormComponent_input_multiselect_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "input-multiselect", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "input-select", 29)(2, "input-select", 30)(3, "input-select", 31)(4, "input-select", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 10)("control", ctx_r1.form.controls.idiomasM)("addItemHandle", ctx_r1.addItemIdioma.bind(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idioma)("items", ctx_r1.lookup.IDIOMAS);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaFala)("items", ctx_r1.lookup.NIVEL_IDIOMA);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaEscrita)("items", ctx_r1.lookup.NIVEL_IDIOMA);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaEntendimento)("items", ctx_r1.lookup.NIVEL_IDIOMA);
  }
}
const _c3 = function () {
  return ["raiox", "cadastros", "gerais", "curso", "new"];
};
const _c4 = function (a0) {
  return {
    route: a0
  };
};
class CurriculumFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__.Curriculum, src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_5__.CurriculumDaoService);
    this.injector = injector;
    this.municipios = [];
    //public areasGraduacao: LookupItem[] = [];
    this.cursos = [];
    this.cursosPos = [];
    this.cursosGradPos = [];
    // public grad : LookupItem[] = [];
    this.opcoesEscolha = [{
      'key': 1,
      'value': 'Pretendo Fazer'
    }, {
      'key': 0,
      'value': 'Finalizado'
    }];
    this.cursoWhere = [["id", "==", null]];
    this.show = false;
    this.validate = (control, controlName) => {
      let result = null;
      /*if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      }*/
      return result;
    };
    //super(injector,Curso, CursoDaoService)
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.CidadeDaoService);
    this.areaDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_3__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_4__.CursoDaoService);
    this.join = ['graduacoes'];
    this.form = this.fh.FormBuilder({
      id: {
        default: ""
      },
      usuario_id: {
        default: ""
      },
      cidade_id: {
        default: ""
      },
      apresentacao: {
        default: ""
      },
      estados: {
        default: ""
      },
      telefone: {
        default: ""
      },
      estado_civil: {
        default: ""
      },
      filhos: {
        default: false
      },
      quantidade_filhos: {
        default: 0
      },
      radioFalaIdioma: {
        default: false
      },
      idioma: {
        default: ""
      },
      idiomaFala: {
        default: ""
      },
      idiomaEscrita: {
        default: ""
      },
      idiomaEntendimento: {
        default: ""
      },
      idiomasM: {
        default: []
      },
      idiomas: {
        default: []
      },
      ativo: {
        default: true
      }
    }, this.cdRef, this.validate);
    this.formGraduacao = this.fh.FormBuilder({
      curriculum_id: {
        default: ""
      },
      curso_id: {
        default: ""
      },
      area: {
        default: ""
      },
      curso: {
        default: ""
      },
      graduacao: {
        default: []
      },
      pretensao: {
        default: false
      },
      areaPos: {
        default: ""
      },
      cursoPos: {
        default: ""
      },
      titulo: {
        default: ""
      },
      graduacaopos: {
        default: []
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    form.patchValue(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__.Curriculum());
  }
  saveData(form) {
    console.log('FORMULARIOGRAD', this.formGraduacao.value);
    console.log('FORMULARIO', this.form.value);
    return new Promise((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__.Curriculum(), this.entity);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      (this.form?.controls.idiomasM.value).forEach(element => curriculum.idiomas.push(element.data));
      // let graduacoes = this.util.fill(new CurriculumGraduacao(),)
      resolve(curriculum);
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  onEstadosChange() {
    //console.log('onEstadosChange', this.form?.controls.estados)
    const estados = this.estadosV.value;
    this.selecionaMunicipios(estados);
  }
  selecionaMunicipios(uf) {
    //console.log(uf)
    this.cidadeDao?.query({
      where: [['uf', '==', uf]],
      orderBy: [['nome', 'asc']]
    }).getAll().then(municipios => {
      this.municipios = municipios.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome
      }));
    });
  }
  addItemIdioma() {
    let result = undefined;
    //console.log('addItemGraduacao',this.formGraduacao!.value)
    let res = this.form.value;
    console.log('addItemIdioma', res);
    const idioma = this.lookup.IDIOMAS.find(x => x.key == this.form.controls.idioma.value);
    const escrita = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEscrita.value); //this.form!.controls.idiomaEscrita.value;
    const fala = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaFala.value); //this.form!.controls.idiomaFala.value;
    const entende = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEntendimento.value); //idiomaFalathis.form!.controls.idiomaEntendimento.value;
    const key = this.util.textHash(idioma?.key);
    console.log('addItemIdioma', ' - ', idioma, ' - ', escrita, ' - ', fala, ' - ', entende, ' - ', key);
    if (idioma && escrita && fala && entende && this.util.validateLookupItem(this.form.controls.idiomasM.value, key)) {
      // && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: idioma.value + ' - ' + escrita.value + ' - ' + fala.value + ' - ' + entende.value,
        data: {
          idioma: idioma.key,
          escrita: escrita.key,
          fala: fala.key,
          entende: entende.key
        }
      };
      this.form.controls.idioma.setValue("");
      this.form.controls.idiomaFala.setValue("");
      this.form.controls.idiomaEscrita.setValue("");
      this.form.controls.idiomaEntendimento.setValue("");
    }
    return result;
  }
  /* public addItemGraduacao(): LookupItem | undefined {
     let result = undefined;
         const area = { 'key': this.formGraduacao!.controls.area.value, 'value': this.area?.selectedItem?.text };
     const curso = this.cursos.find(value => value.key == this.formGraduacao!.controls.curso.value)
     const status = this.opcoesEscolha.find(value => value.key == (this.formGraduacao!.controls.pretensao.value ? 1 : 0))//converte o value do switch
     const key = this.util.textHash((area.key || "") + (curso?.key || "") + (status?.key || ""));
         if (curso && area && status && this.util.validateLookupItem(this.formGraduacao!.controls.graduacao.value, key)) {
           result = {
         key: key,
         value: area.value + ' - ' + curso.value + ' - ' + status?.value,
         data: {
           area: area.key,
           curso: curso.key,
           status: status?.key
         }
       };
       console.log('FORMGRAD->', this.formGraduacao!.value)
       this.formGraduacao!.controls.area.setValue("");
       this.formGraduacao!.controls.curso.setValue("");
       this.formGraduacao!.controls.pretensao.setValue(false);
     }
     return result;
   };*/
  addItemGraduacaoPos() {
    let result = undefined;
    /*this.cursoDao?.query({where: [['id', '==', this.formGraduacao!.controls.curso.value]]}).getAll().then((curso2)=>{
        curso = curso2.map(x => Object.assign({},{key: x.id, value: x.nome_curso}) as LookupItem);
        console.log('CURSO DENTRO->',curso)
    })*/
    const area = {
      'key': this.formGraduacao.controls.areaPos.value,
      'value': this.areaPosV?.selectedItem?.text
    };
    const curso = this.cursoV.selectedItem; //this.cursosGradPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formGraduacao.controls.pretensao.value ? 1 : 0)); //converte o value do switch
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || "")); // + (pretensao?.key || ""));
    console.log('AREA', area, 'AREA', curso, 'AREA', titulo, 'AREA', pretensao);
    if (curso && area && titulo && pretensao && this.util.validateLookupItem(this.formGraduacao.controls.graduacaopos.value, key)) {
      result = {
        key: key,
        value: area.value + ' - ' + curso.value + ' - ' + titulo?.value + ' - ' + pretensao?.value,
        data: {
          id: this.dao?.generateUuid(),
          area: area.key,
          curso: curso.key,
          titulo: titulo?.key,
          pretensao: pretensao?.key,
          _status: "ADD"
        }
      };
      console.log('FORMULARIOGRAD', this.formGraduacao.value);
      this.formGraduacao.controls.areaPos.setValue("");
      this.formGraduacao.controls.cursoPos.setValue("");
      this.formGraduacao.controls.titulo.setValue("");
      this.formGraduacao.controls.pretensao.setValue(false);
    }
    return result;
  }
  onAreaGraducaoPosChange() {
    this.cursoDao?.query({
      where: [['area_curso_id', '==', this.formGraduacao.controls.area.value], ['titulo', 'like', 'GRAD%']]
    }).getAll().then(cursos2 => {
      this.cursos = cursos2.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome
      }));
      this.cdRef.detectChanges();
    });
  }
  onAreaPosGraduacaoChange() {
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
    // this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value && 'titulo','==',titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC","GRAD_LIC","ESPECIAL","MESTRADO","DOUTORADO","POS_DOUTORADO"]]]}).getAll().then((cursos3) => {
    this.cursoWhere = [['area_id', '==', this.formGraduacao.controls.areaPos.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
    this.cdRef.detectChanges();
    /*this.cursoDao?.query({ where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]] }).getAll().then((cursos3) => {
      this.cursosGradPos = cursos3.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });*/
  }

  ngOnInit() {
    this.dao?.query({
      where: ['usuario_id', '==', this.auth.usuario?.id]
    }).getAll().then(user => {
      console.log('USER', user.map(x => x.id));
      if (!(user == null || user.length == 0)) {
        //console.log('VAZIO')
        const userID = user.map(x => x.id).toString();
        //console.log('USERID',userID)          
        this.form?.controls.id.setValue(userID); //.toString())))
      }
    });
  }

  onAddClick() {}
  get stateName() {
    return this.show ? 'show' : 'hide';
  }
  togglePopOver() {
    const pop = document.getElementById('divPop');
    console.log(pop?.hidden);
    if (pop?.hidden) {
      pop.hidden = false;
    } else {
      pop.hidden = true;
    }
    this.show = !this.show;
  }
}
_class = CurriculumFormComponent;
_class.ɵfac = function CurriculumFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-pessoal-form"]],
  viewQuery: function CurriculumFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.areaPosV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.estadosV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵloadQuery"]()) && (ctx.cursoV = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]],
  decls: 34,
  vars: 48,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "Apresente-se", "icon", "bi-card-list", "controlName", "apresentacao", 3, "size", "bold", "control"], ["title", "Dados Residenciais"], [1, "row", "mt-2"], ["label", "Estado", "icon", "fas fa-flag", "controlName", "estados", 3, "size", "control", "items", "change"], ["estados", ""], ["label", "Munic\u00EDpio", "icon", "far fa-flag", "controlName", "cidade_id", 3, "size", "control", "items"], ["label", "Telefone de contato WhatsAPP", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"], ["title", "Estado Civil"], ["label", "Estado Civil", "icon", "fas fa-ring", "controlName", "estado_civil", 3, "size", "control", "items"], ["label", "Possui Filhos?", "icon", "fas fa-child", "controlName", "filhos", "labelInfo", "Possui Filhos?", 3, "size", "control"], ["label", "Quantos?", "icon", "bi bi-arrow-up-right-circle", "controlName", "quantidade_filhos", 3, "hidden", "size", "control", "minValue"], ["title", "Idiomas", 3, "click"], ["id", "divPop", "hidden", ""], [1, "bi", "bi-exclamation-triangle-fill"], [1, "row", "my-3"], ["label", "Fala outros idiomas?", "icon", "fas fa-language", "controlName", "radioFalaIdioma", 3, "size", "control"], ["controlName", "idiomasM", "noBox", "", 3, "size", "control", "addItemHandle", 4, "ngIf"], [1, "row", "mt-3", "mb-5"], ["label", "Gradua\u00E7\u00E3o e P\u00F3s-Gradua\u00E7\u00E3o - Especializa\u00E7\u00E3o, Mestrado, Doutorado e P\u00F3s Doutorado", "controlName", "graduacaopos", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Pretende Cursar?", "icon", "fas fa-user-graduate", "controlName", "pretensao", "labelInfo", "Pretendo Cursar", 3, "size", "control"], ["label", "\u00C1rea de conhecimento", "controlName", "areaPos", 3, "size", "dao", "control"], ["areaPos", ""], ["label", "Titulo", "icon", "bi bi-mortarboard-fill", "controlName", "titulo", "liveSearch", "", 3, "size", "control", "items", "change"], ["label", "Curso", "icon", "fas fa-graduation-cap", "controlName", "cursoPos", "liveSearch", "", 3, "size", "control", "dao", "where", "addRoute"], ["curso", ""], [1, "mb-1"], ["controlName", "idiomasM", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "Idioma", "icon", "fas fa-sign-out-alt", "controlName", "idioma", "liveSearch", "", 3, "size", "control", "items"], ["label", "N\u00EDvel de fala?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaFala", 3, "size", "control", "items"], ["label", "N\u00EDvel de escrita?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaEscrita", 3, "size", "control", "items"], ["label", "N\u00EDvel de entendimento?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaEntendimento", 3, "size", "control", "items"]],
  template: function CurriculumFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("submit", function CurriculumFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "input-textarea", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "separator", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "div", 4)(6, "input-select", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function CurriculumFormComponent_Template_input_select_change_6_listener() {
        return ctx.onEstadosChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](8, "input-select", 7)(9, "input-text", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](11, "separator", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](12, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "input-select", 10)(14, "input-switch", 11)(15, "input-number", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "div", 1)(17, "separator", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function CurriculumFormComponent_Template_separator_click_17_listener() {
        return ctx.togglePopOver();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](18, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](19, "i", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](20, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](21, "Hello! I'm a helpful message.");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](22, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](23, "input-switch", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](24, CurriculumFormComponent_input_multiselect_24_Template, 5, 15, "input-multiselect", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](25, "div", 19)(26, "input-multiselect", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](27, "input-switch", 21)(28, "input-search", 22, 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](30, "input-select", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function CurriculumFormComponent_Template_input_select_change_30_listener() {
        return ctx.onAreaPosGraduacaoChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](31, "input-select", 25, 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](33, "separator", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("bold", true)("control", ctx.form.controls.apresentacao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.estados)("items", ctx.lookup.UF);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cidade_id)("items", ctx.municipios);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.estado_civil)("items", ctx.lookup.ESTADO_CIVIL);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.filhos);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("hidden", ctx.form.controls.filhos.value ? undefined : "true")("size", 4)("control", ctx.form.controls.quantidade_filhos)("minValue", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("@popOverState", ctx.stateName);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.radioFalaIdioma);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.form.controls.radioFalaIdioma.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 12)("control", ctx.formGraduacao.controls.graduacaopos)("addItemHandle", ctx.addItemGraduacaoPos.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2)("control", ctx.formGraduacao.controls.pretensao);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("dao", ctx.areaDao)("control", ctx.formGraduacao.controls.areaPos);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 2)("control", ctx.formGraduacao.controls.titulo)("items", ctx.lookup.TITULOS_CURSOS);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("size", 4)("control", ctx.formGraduacao.controls.cursoPos)("dao", ctx.cursoDao)("where", ctx.cursoWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](46, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction0"](45, _c3)));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_12__.InputMultiselectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_14__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.trigger)('popOverState', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.state)('show', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.state)('hide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.style)({
      opacity: 0
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.transition)('show => hide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.animate)('600ms ease-out')), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.transition)('hide => show', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_17__.animate)('1000ms ease-in'))])]
  }
});

/***/ }),

/***/ 22222:
/*!***************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-home/raioxhome.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RaioxhomeComponent: () => (/* binding */ RaioxhomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth.service */ 32333);
var _class;



class RaioxhomeComponent {
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
    this.logoInicial = "../../../../assets/images/logo-raio-x-1.png";
    this.imgDadosPessoais = "../../../../assets/images/Dados_pessoais.png";
    this.imgDadosProfissionais = "../../../../assets/images/Dados_profissionais.png";
    this.imgAtributos = "../../../../assets/images/Atributos_comportamentais.png";
    this.imgOportunidades = "../../../../assets/images/Oportunidade.png";
  }
  ngOnInit() {}
  dadosPessoais() {
    this.router.navigate(['raiox/pessoal']);
  }
  mensagemSaudacao() {
    const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
    const apelido = this.auth.usuario?.apelido.toUpperCase();
    const mail = this.auth.usuario?.email;
    return hora < 1200 ? "BOM DIA, " + apelido : hora < 1800 ? "BOA TARDE, " + apelido : "BOA NOITE, " + apelido;
  }
}
_class = RaioxhomeComponent;
_class.ɵfac = function RaioxhomeComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-raioxhome"]],
  decls: 6,
  vars: 2,
  consts: [[1, "saudacao"], [1, "msgSaudacao"], [1, "logo-raio-x", "mt-5"], ["id", "logoRaioX", 3, "src"]],
  template: function RaioxhomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "body")(1, "div", 0)(2, "h2", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "img", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.mensagemSaudacao());
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx.logoInicial, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    }
  },
  styles: ["@import url(https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400[_ngcontent-%COMP%];500[_ngcontent-%COMP%];800&display=swap)[_ngcontent-%COMP%];@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);body[_ngcontent-%COMP%]::-webkit-scrollbar, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 11px;\n}\n\nbody[_ngcontent-%COMP%]::-webkit-scrollbar-track, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar-track, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar-track, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar-track, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background-color: #fff;\n}\n\nbody[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #1d2143;\n  border-radius: 5px;\n}\n\n.logo-raio-x[_ngcontent-%COMP%], .saudacao[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  margin: auto;\n  display: flex;\n  justify-content: center;\n}\n\n.msgSaudacao[_ngcontent-%COMP%] {\n  color: #1d2143;\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.logo-raio-x[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 500px;\n  width: 100%;\n  height: auto;\n  object-fit: cover;\n}\n\n.closing[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n}\n\nbutton[_ngcontent-%COMP%]   #imgBTNProf[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNGer[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNPessoal[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNatributos[_ngcontent-%COMP%] {\n  width: auto;\n  height: 120px;\n  border: none;\n}\n\n.card-group--custom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.title-custom[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-family: \"Fira Sans\", sans-serif;\n  color: #1d2143;\n}\n\n.card-custom[_ngcontent-%COMP%] {\n  border-radius: 20px 20px 20px 0px;\n  width: 260px;\n  height: auto;\n  transition: all 0.2s linear;\n}\n\n.card-custom[_ngcontent-%COMP%]:hover {\n  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);\n}\n\n.card-header--custom[_ngcontent-%COMP%] {\n  background-color: #d9dad9;\n  border-radius: 15px 15px 0px 0px !important;\n}\n\n.card-custom[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJpY3VsdW0taG9tZS9yYWlveGhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDSSxXQUFBO0FBQUo7O0FBR0M7RUFDSSxzQkFBQTtBQUFMOztBQUdDO0VBQ0kseUJBQUE7RUFDQSxrQkFBQTtBQUFMOztBQUdFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBQUo7O0FBR0U7RUFDRSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUlFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBREo7O0FBSUU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFESjs7QUFLRTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQUZKOztBQU9FO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBSko7O0FBT0U7RUFDRSxnQkFBQTtFQUNBLG9DQUFBO0VBQ0EsY0FBQTtBQUpKOztBQU9FO0VBQ0UsaUNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQUFBO0FBSko7O0FBT0U7RUFHSSw4Q0FBQTtBQUpOOztBQVFFO0VBQ0UseUJBQUE7RUFDQSwyQ0FBQTtBQUxKOztBQVNHO0VBQ0ksc0JBQUE7QUFOUCIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUZpcmErU2Fuczp3Z2h0QDMwMDs0MDA7NTAwOzgwMCZkaXNwbGF5PXN3YXAnKTtcclxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9uZXV0cmEtdGV4dC1hbHQnKTtcclxuICBcclxuYm9keTo6LXdlYmtpdC1zY3JvbGxiYXIsICNkYWRvc3Blc3NvYWlzOjotd2Via2l0LXNjcm9sbGJhciwgI2RhZG9zUDo6LXdlYmtpdC1zY3JvbGxiYXIsICNvcG9ydHVuaWRhZGVzOjotd2Via2l0LXNjcm9sbGJhciwgI2F0cmlidXRvczo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDExcHg7XHJcbiB9XHJcblxyXG4gYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2ssICNkYWRvc3Blc3NvYWlzOjotd2Via2l0LXNjcm9sbGJhci10cmFjaywgI2RhZG9zUDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2ssICNvcG9ydHVuaWRhZGVzOjotd2Via2l0LXNjcm9sbGJhci10cmFjaywgI2F0cmlidXRvczo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiB9XHJcblxyXG4gYm9keTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsICNkYWRvc3Blc3NvYWlzOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiwgI2RhZG9zUDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIsICNvcG9ydHVuaWRhZGVzOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiwgI2F0cmlidXRvczo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gICAgIGJhY2tncm91bmQtY29sb3I6ICMxZDIxNDM7XHJcbiAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gfVxyXG4gICAgXHJcbiAgLmxvZ28tcmFpby14LCAuc2F1ZGFjYW97XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC5tc2dTYXVkYWNhbyB7XHJcbiAgICBjb2xvcjogIzFkMjE0MztcclxuICAgIGZvbnQtZmFtaWx5OiBuZXV0cmEgdGV4dDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgLmxvZ28tcmFpby14IGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICB9XHJcblxyXG4gIC5jbG9zaW5ne1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgYnV0dG9uICNpbWdCVE5Qcm9mLCBidXR0b24gI2ltZ0JUTkdlciwgYnV0dG9uICNpbWdCVE5QZXNzb2FsLCBidXR0b24gI2ltZ0JUTmF0cmlidXRvcyB7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICB9XHJcblxyXG4gIFxyXG5cclxuICAuY2FyZC1ncm91cC0tY3VzdG9tIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gIC50aXRsZS1jdXN0b20ge1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIGZvbnQtZmFtaWx5OiAnRmlyYSBTYW5zJywgc2Fucy1zZXJpZjtcclxuICAgIGNvbG9yOiAjMWQyMTQzO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtY3VzdG9tIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAyMHB4IDBweDtcclxuICAgIHdpZHRoOiAyNjBweDtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIHRyYW5zaXRpb246IGFsbCAuMnMgbGluZWFyO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtY3VzdG9tOmhvdmVyIHtcclxuICAgICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAzcHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gICAgICAtbW96LWJveC1zaGFkb3c6IDBweCAwcHggNXB4IDNweCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDNweCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgfVxyXG5cclxuXHJcbiAgLmNhcmQtaGVhZGVyLS1jdXN0b20ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZGFkOTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDE1cHggMTVweCAwcHggMHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgIC5jYXJkLWN1c3RvbSB7XHJcbiAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICB9XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 26832:
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumProfissionalFormComponent: () => (/* binding */ CurriculumProfissionalFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/currriculum.model */ 70156);
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/centro-treinamento-dao.service */ 57565);
/* harmony import */ var src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/grupo-especializado-dao.service */ 51353);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/currriculum-profissional.model */ 46722);
/* harmony import */ var src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/curriculum-profissional-dao.service */ 60978);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
var _class;























const _c0 = ["radioDocenciaFora"];
const _c1 = ["radioDocenciaPRF"];
const _c2 = ["radioCursos"];
const _c3 = ["radioCursosFora"];
const _c4 = ["radioInteresseBNT"];
const _c5 = ["radioPG"];
const _c6 = ["radioInteressePG"];
const _c7 = ["radioInteresseRemove"];
const _c8 = ["radioViajaN"];
const _c9 = ["radioViajaI"];
const _c10 = ["escolhaRadioPG"];
const _c11 = ["escolhaInteressePG"];
function CurriculumProfissionalFormComponent_input_radio_84_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-radio", 79, 80);
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("items", ctx_r11.lookup.PG_PRF);
  }
}
function CurriculumProfissionalFormComponent_input_radio_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-radio", 81, 82);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("items", ctx_r13.lookup.PG_PRF);
  }
}
function CurriculumProfissionalFormComponent_input_text_90_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-text", 83);
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx_r14.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
  }
}
class CurriculumProfissionalFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_7__.CurriculumProfissional, src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_8__.CurriculumProfissionalDaoService);
    this.injector = injector;
    this.testeLookup = [{
      'key': 'key 1',
      'value': 'value 1'
    }];
    this.anos = [];
    this.ct = [];
    this.cargo = [];
    this.funcao = [];
    this.grupo = [];
    this.unidade = [];
    this.usuarioUnidade = [];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.userDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__.UsuarioDaoService);
    this.lotacaoDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_10__.UnidadeIntegranteDaoService);
    this.ctDao = injector.get(src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_4__.CentroTreinamentoDaoService);
    this.funcaoDao = injector.get(src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__.FuncaoDaoService);
    this.grupoDao = injector.get(src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_5__.GrupoEspecializadoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      radioDocenciaFora: {
        default: false
      },
      radioDocenciaPRF: {
        default: false
      },
      radioCursos: {
        default: false
      },
      radioPretendoCursos: {
        default: false
      },
      radioCursosFora: {
        default: false
      },
      radioPretendoCursosFora: {
        default: false
      },
      radioPG: {
        default: false
      },
      radioInteressePG: {
        default: false
      },
      radioInteresseBNT: {
        default: false
      },
      radioInteresseRemove: {
        default: false
      },
      radioViajaN: {
        default: false
      },
      radioViajaI: {
        default: false
      },
      ano_ingresso: {
        default: false
      },
      centro_treinamento: {
        default: false
      },
      cargo: {
        default: false
      },
      funcoes: {
        default: []
      },
      lotacoes: {
        default: []
      },
      funcoesOcupadas: {
        default: ""
      },
      selectLotacao: {
        default: ""
      },
      lotacaoAtual: {
        default: ""
      },
      grupo: {
        default: ""
      },
      telefone: {
        default: ""
      },
      escolhaInteressePG: {
        default: ""
      },
      escolhaRadioPG: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
      this.anos.push(Object.assign({}, {
        key: i,
        value: i.toString()
      }));
    }
    const userUnidade = this.auth.unidade;
    console.log(userUnidade);
    /*   this.lotacaoDao?.query({ where: [['usuario_id', '==', userID],['principal', '==', 1 ]]}).getAll().then((user) => {
           const unidadeID=user[0].unidade_id;
           this.unidadeDao?.query({ where: [['id', '==', unidadeID]]}).getAll().then((unidade) => {
               console.log('UNIDADES',unidade[0].sigla,unidade[0].nome)
                 //this.usuarioUnidade = user.map(x => Object.assign({}, { key: x.id, value: x.unidade_id }) as LookupItem);
                 //this.cdRef.detectChanges();
           });
       });*/
  }

  loadData(entity, form) {
    //throw new Error('Method not implemented.');
  }
  initializeData(form) {
    //throw new Error('Method not implemented.');
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_2__.Curriculum(), this.entity);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      (this.form?.controls.idiomasM.value).forEach(element => curriculum.idiomas.push(element.data));
      resolve(curriculum);
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  onChangeEscolhePG() {
    this.escolhaRadioPG?.setValue("");
  }
  onChangeEscolheInteressePG() {
    this.escolhaInteressePG?.setValue("");
  }
  addItemFuncao() {
    return;
  }
  onAddClick() {}
}
_class = CurriculumProfissionalFormComponent;
_class.ɵfac = function CurriculumProfissionalFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-profissional-form"]],
  viewQuery: function CurriculumProfissionalFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c7, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c9, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c10, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c11, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioDocenciaFora = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioDocenciaPRF = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioCursos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioCursosFora = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioInteresseBNT = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioPG = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioInteressePG = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioInteresseRemove = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioViajaN = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.radioViajaI = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.escolhaRadioPG = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.escolhaInteressePG = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 96,
  vars: 130,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "left", ""], ["key", "FUNCIONAIS", "label", "Funcionais", 1, "fw-bold"], [1, "row", "mb-2", "mt-4"], ["label", "Ingresso na Institui\u00E7\u00E3o", "icon", "bi bi-calendar-check-fill", "controlName", "ano_ingresso", 3, "size", "control", "items"], ["label", "Centro de Treinamento", "icon", "bi bi-building-fill", "controlName", "centro_treinamento", 3, "size", "control", "dao"], ["label", "Cargo", "icon", "bi bi-person-badge", "controlName", "cargo", 3, "size", "control", "items"], [1, "row"], ["title", "Hist\u00F3rico de Lota\u00E7\u00F5es e Fun\u00E7\u00F5es Gratificadas", 1, "mb-3", "mt-3", 3, "bold"], ["controlName", "funcoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Fun\u00E7\u00F5es ocupadas como titular ou substituto", "icon", "bi bi-check-circle-fill", "controlName", "funcoesOcupadas", "liveSearch", "", 3, "size", "control", "dao"], ["label", "Voc\u00EA faz parte de algum grupo especializado?", "icon", "bi bi-check-circle", "controlName", "grupo", "id", "testeID", "liveSearch", "", 3, "size", "control", "dao"], [1, "row", "my-3"], ["controlName", "lotacoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Selecione todas as unidades em que j\u00E1 foi lotado", "icon", "bi bi-check-circle-fill", "controlName", "selectLotacao", "liveSearch", "", 3, "size", "control", "dao"], ["label", "Lota\u00E7\u00E3o atual", "icon", "bi bi-check-circle", "controlName", "lotacaoAtual", "liveSearch", "", 3, "size", "control", "dao"], ["key", "HARD_SKILLS", "label", "Hard Skills", 1, "fw-bold"], [1, "row", "mb-2", "mt-3"], ["title", "Desempenhou atividades fora e que podem contribuir para a institui\u00E7\u00E3o? Informe a \u00E1rea:", 1, "mb-3", 3, "bold"], ["controlName", "atividades_fora", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Area", "icon", "bi bi-box-arrow-in-down", "controlName", "selecAtividadeFora", "liveSearch", "", 3, "size", "control", "items"], ["title", "Quais atividades voc\u00EA desempenhou internamente que podem contribuir para a institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["label", "", "controlName", "atividadeDesempenhou", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "\u00C1rea", "controlName", "areaatividadeDesempenhou", "icon", "fas fa-layer-group", 3, "size", "control"], ["area", ""], ["label", "Atividade", "icon", "bi bi-arrows-angle-contract", "controlName", "selectAtividade", "liveSearch", "", 3, "size", "control", "items"], ["title", "Informe as suas habilidades", 1, "mb-3", 3, "bold"], ["controlName", "especifique_habilidades", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Especifique", "icon", "bi bi-list-stars", "controlName", "inputEspecifique", "liveSearch", "", 3, "size", "control"], ["key", "DOCENCIA", "label", "Doc\u00EAncia", 1, "fw-bold", "mb-3"], ["title", "Voc\u00EA j\u00E1 realizou algum trabalho de doc\u00EAncia fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaFora", 3, "size", "label", "control"], ["radioDocenciaFora", ""], ["label", "", "controlName", "docenciaFora", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Qual/Quais", "icon", "bi bi-mortarboard-fill", "controlName", "docenciaFora", "liveSearch", "", 3, "size", "control"], ["title", "Voc\u00EA \u00E9 docente ou instrutor da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaPRF", 3, "size", "label", "control"], ["radioDocenciaPRF", ""], ["label", "Em qual/quais disciplinas?", "icon", "bi bi-mortarboard-fill", "controlName", "docenciaPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["icon", "bi bi-mortarboard-fill", "controlName", "selectDocenciaPRF", "liveSearch", "", 3, "size", "control", "items"], ["key", "CURSOS", "label", "Cursos", 1, "fw-bold", "mb-3"], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer na Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursos", 3, "size", "label", "control"], ["radioCursos", ""], ["label", "", "controlName", "cursosPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "\u00C1rea", "controlName", "areaCursoPRF", 3, "size", "control"], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "selectCursosPRF", "liveSearch", "", 3, "size", "control", "items"], [1, "row", "mb-3"], ["title", "Quais cursos voc\u00EA j\u00E1 fez e quais pretende fazer fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursosFora", 3, "size", "label", "control"], ["radioCursosFora", ""], ["label", "", "controlName", "cursosForaPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Institui\u00E7\u00E3o/Coorpora\u00E7\u00E3o", "controlName", "instituicao", 3, "size", "control"], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "selectCursosForaPRF", "liveSearch", "", 3, "size", "control", "items"], ["key", "DISPONIBILIDADE", "label", "Disponibilidade", 1, "fw-bold", "mb-3"], ["title", "Viagens", 1, "mb-3", "mt-3", 3, "bold"], [1, "col-lg-6"], [1, "bi", "bi-flag-fill"], ["labelPosition", "right", "controlName", "radioViajaN", 3, "size", "label", "control"], ["radioViajaN", ""], [1, "bi", "bi-globe-americas"], ["labelPosition", "right", "controlName", "radioViajaI", 3, "size", "label", "control"], ["radioViajaI", ""], ["title", "Voc\u00EA tem interesse na participa\u00E7\u00E3o do Banco Nacional de Talentos (BNT IN PRF N\u00BA 58 de 27 de agosto de 2021) SEI 35010079?", 1, "my-3", 3, "bold"], ["icon", "bi bi-universal-access", "controlName", "radioInteresseBNT", 3, "size", "label", "control"], ["radioInteresseBNT", ""], ["title", "Voc\u00EA est\u00E1 inserido no programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-calendar2-check", "controlName", "radioPG", 3, "size", "label", "control", "change"], ["radioPG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioPG", 3, "size", "items", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em participar do programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-bookmark-check", "controlName", "radioInteressePG", 3, "size", "label", "control", "change"], ["radioInteressePG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteressePG", 3, "size", "items", 4, "ngIf"], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em remo\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-house-door-fill", "controlName", "radioInteresseRemove", 3, "size", "label", "control"], ["radioInteresseRemove", ""], [1, "mb-5"], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioPG", 3, "size", "items"], ["escolhaRadioPG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteressePG", 3, "size", "items"], ["escolhaInteressePG", ""], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"]],
  template: function CurriculumProfissionalFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function CurriculumProfissionalFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumProfissionalFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "input-select", 4)(5, "input-select", 5)(6, "input-select", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](8, "separator", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](9, "input-multiselect", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](10, "input-select", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](11, "input-select", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "div", 12)(13, "input-multiselect", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](14, "input-select", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](15, "input-select", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](16, "tab", 16)(17, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](18, "separator", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](19, "input-multiselect", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](20, "input-select", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](21, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](22, "separator", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](23, "input-multiselect", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](24, "input-search", 23, 24)(26, "input-select", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](27, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](28, "separator", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](29, "input-multiselect", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](30, "input-text", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](31, "tab", 29)(32, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](33, "separator", 30)(34, "input-switch", 31, 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](36, "input-multiselect", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](37, "input-text", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](38, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](39, "separator", 35)(40, "input-switch", 36, 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](42, "input-multiselect", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](43, "input-select", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](44, "tab", 40)(45, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](46, "separator", 41)(47, "input-switch", 42, 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](49, "input-multiselect", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](50, "input-search", 45, 24)(52, "input-select", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](53, "div", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](54, "separator", 48)(55, "input-switch", 49, 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](57, "input-multiselect", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](58, "input-search", 52, 24)(60, "input-select", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](61, "tab", 54)(62, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](63, "separator", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](64, "div", 56)(65, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](66, "i", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](67, " J\u00E1 fez viagem nacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](68, "input-switch", 58, 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](70, "div", 56)(71, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](72, "i", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](73, " J\u00E1 fez viagem internacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](74, "input-switch", 61, 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](76, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](77, "separator", 63)(78, "input-switch", 64, 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](80, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](81, "separator", 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](82, "input-switch", 67, 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_82_listener() {
        return ctx.onChangeEscolhePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](84, CurriculumProfissionalFormComponent_input_radio_84_Template, 2, 2, "input-radio", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](85, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](86, "separator", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](87, "input-switch", 71, 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_87_listener() {
        return ctx.onChangeEscolheInteressePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](89, CurriculumProfissionalFormComponent_input_radio_89_Template, 2, 2, "input-radio", 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](90, CurriculumProfissionalFormComponent_input_text_90_Template, 1, 3, "input-text", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](91, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](92, "separator", 75)(93, "input-switch", 76, 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](95, "separator", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](35);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](41);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](48);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](56);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](69);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](75);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](79);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](83);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](88);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](94);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.ano_ingresso)("items", ctx.anos);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.centro_treinamento)("dao", ctx.ctDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cargo)("items", ctx.lookup.CARGOS_PRF);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.funcoes)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.funcoesOcupadas)("dao", ctx.funcaoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.grupo)("dao", ctx.grupoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotaces)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.selectLotacao)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotacaoAtual)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.atividades_fora)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.selecAtividadeFora)("items", ctx.testeLookup);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.atividadeDesempenhou)("addItemHandle", ctx.addItemFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.areaatividadeDesempenhou);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectAtividade)("items", ctx.testeLookup);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.especifique_habilidades)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.inputEspecifique);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r1.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaFora);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("hidden", !ctx.form.controls.radioDocenciaFora.value)("size", 8)("control", ctx.form.controls.docenciaFora)("addItemHandle", ctx.addItemFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.docenciaFora);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r2.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaPRF);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("hidden", !ctx.form.controls.radioDocenciaPRF.value)("size", 8)("control", ctx.form.controls.docenciaFora)("addItemHandle", ctx.addItemFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectDocenciaPRF)("items", ctx.testeLookup);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r3.value ? "Pretendo" : "N\u00E3o Pretendo")("control", ctx.form.controls.radioCursos);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("hidden", !ctx.form.controls.radioCursos.value)("size", 8)("control", ctx.form.controls.cursosPRF)("addItemHandle", ctx.addItemFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.areaCursoPRF);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectCursosPRF)("items", ctx.testeLookup);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r5.value ? "Pretendo" : "N\u00E3o Pretendo")("control", ctx.form.controls.radioCursosFora);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("hidden", !ctx.form.controls.radioCursosFora.value)("size", 8)("control", ctx.form.controls.cursosForaPRF)("addItemHandle", ctx.addItemFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.instituicao);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectCursosForaPRF)("items", ctx.testeLookup);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r7.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaN);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 2)("label", _r8.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaI);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 1)("label", _r9.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseBNT);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 1)("label", _r10.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioPG);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.form.controls.radioPG.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 1)("label", _r12.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteressePG);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteressePG.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteressePG.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 1)("label", _r15.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseRemove);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_11__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_14__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_15__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_17__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_18__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 26447:
/*!*****************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-routing.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumRoutingModule: () => (/* binding */ CurriculumRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-home/raioxhome.component */ 22222);
/* harmony import */ var src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 92976);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [{
  path: '',
  component: src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_2__.RaioxhomeComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Home Raio-X"
  }
}, {
  path: 'home',
  component: src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_2__.RaioxhomeComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: "Home Raio-X"
  }
}, {
  path: 'pessoal',
  component: src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'profissional',
  component: src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumProfissionalFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: "Dados Profissionais"
  }
}, {
  path: 'big5',
  component: _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_5__.CurriculumAtributosbig5FormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: "Teste BIG 5"
  }
}];
class CurriculumRoutingModule {}
_class = CurriculumRoutingModule;
_class.ɵfac = function CurriculumRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](CurriculumRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 84515:
/*!*********************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumModule: () => (/* binding */ CurriculumModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curriculum-routing.module */ 26447);
/* harmony import */ var _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 92976);
/* harmony import */ var _cadastros_curriculum_curriculum_list_curriculum_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cadastros/curriculum/curriculum-list/curriculum-list.component */ 43433);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









class CurriculumModule {}
_class = CurriculumModule;
_class.ɵfac = function CurriculumModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](CurriculumModule, {
    declarations: [_cadastros_curriculum_curriculum_list_curriculum_list_component__WEBPACK_IMPORTED_MODULE_5__.CurriculumListComponent, _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__.CurriculumFormComponent, _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalFormComponent, _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=515.js.map