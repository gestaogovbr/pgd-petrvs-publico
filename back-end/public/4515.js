"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[4515],{

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
    this.inputSearchConfig.searchFields = ["apresentacao", "telefone", "idiomas", "estado_civil", "quantidade_filhos"];
  }
  lookupsCurriculum() {
    return new Promise((resolve, reject) => {
      this.server.post('api/Curriculum/lookups-curriculum', {}).subscribe(response => {
        resolve(response?.lookups || []);
        console.log(response.lookups);
      }, error => reject(error));
    });
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

/***/ 16403:
/*!*****************************************************!*\
  !*** ./src/app/dao/curriculum-graduacao.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumGraduacaoDaoService: () => (/* binding */ CurriculumGraduacaoDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class CurriculumGraduacaoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("CurriculumGraduacao", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["pretensão"];
  }
}
_class = CurriculumGraduacaoDaoService;
_class.ɵfac = function CurriculumGraduacaoDaoService_Factory(t) {
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
    this.inputSearchConfig.searchFields = ["ano_ingresso", "lotacao_atual", "pgd_inserido", "pgd_interesse", "funcoes", "unidades_lotado", "atividades_fora", "atividades_internas", "especifique_habilidades", "docencia_fora", "docencia_interna", "curso_fora", "curso_interno", "viagem_nacional", "viagem_internacional", "interesse_bnt", "remocao"];
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

/***/ 35871:
/*!********************************************!*\
  !*** ./src/app/dao/materia-dao.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MateriaDaoService: () => (/* binding */ MateriaDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class MateriaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Materia", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["nome"];
  }
}
_class = MateriaDaoService;
_class.ɵfac = function MateriaDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 10470:
/*!***************************************************!*\
  !*** ./src/app/models/curriculum-idioma.model.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumIdioma: () => (/* binding */ CurriculumIdioma)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class CurriculumIdioma extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.idioma = 'INGLES';
    this.idiomaFala = 'BASICO';
    this.idiomaEscrita = 'BASICO';
    this.idiomaEntendimento = 'BASICO';
    this.initialization(data);
  }
}

/***/ }),

/***/ 56982:
/*!*******************************************************!*\
  !*** ./src/app/models/currriculum-graduacao.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumGraduacao: () => (/* binding */ CurriculumGraduacao)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class CurriculumGraduacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  //public curriculum_id: string = ""; //ID do curriculum
  constructor(data) {
    super();
    this.pretensao = 0; //Pretensão de fazer curso caso não tenha
    this.initialization(data);
  }
}

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
    this.historicoAtividadeExterna = [];
    this.historicoAtividadeInterna = [];
    this.historicoCursoExterno = [];
    this.historicoCursoInterno = [];
    this.historicoDocenciaExterna = [];
    this.historicoDocenciaInterna = [];
    this.historicoFuncao = [];
    this.historicoLotacao = [];
    this.ano_ingresso = ""; //Ano de ingresso na instituição
    this.lotacao_atual = ""; //Lotação atual do servidor
    this.pgd_inserido = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
    this.pgd_interesse = ""; //Tem interesse ou não no PGD da instituição e qual modalidade
    this.telefone = ""; // Telefone do chefe imediato caso tenha interesse no PGD
    //public funcoes: [] = [];// Funções ocupadas em toda carreira como titular ou substituto
    //public unidades_lotado: [] = [];// Unidades de lotação em toda carreira
    //public atividades_fora: [] = [];//Atividades desempenhadas externamente que podem contribuir para intituição
    //public atividades_internas: [] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
    this.especifique_habilidades = []; //Atividades desempenhadas internamente que podem contribuir para intituição
    this.docencia_fora = []; // Já foi docente fora da instituição
    this.docencia_interna = []; // Já foi docente na instituição
    //public curso_fora: [] = [];//Quais cursos você já fez e quais pretende fazer fora da Instituição
    //public curso_interno: [] = [];//Quais os principais cursos que você já fez e pretende fazer na Instituição
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
    this.graduacoes = [];
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

/***/ 92976:
/*!*************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosbig5FormComponent: () => (/* binding */ CurriculumAtributosbig5FormComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
var _class;





const _c0 = ["comunica"];
const _c1 = ["lideranca"];
const _c2 = ["resolucao"];
const _c3 = ["pensamento"];
const _c4 = ["criatividade"];
const _c5 = ["habilidade"];
const _c6 = ["adaptabilidade"];
const _c7 = ["etica"];
class CurriculumAtributosbig5FormComponent {
  constructor(router) {
    this.router = router;
    this.comunica = "/assets/icons/iconeComunicacao.png"; //"../assets/icons/Comunica.jpg";
    this.lideranca = "/assets/icons/iconeLideranca.png";
    this.resolucao = "/assets/icons/iconeResolucao.png";
    this.pensamento = "/assets/icons/iconePensamento.png";
    this.criatividade = "/assets/icons/iconeCriatividade.png";
    this.habilidade = "/assets/icons/iconeHabilidades.png";
    this.adaptabilidade = "/assets/icons/iconeAdaptabilidade.png";
    this.etica = "/assets/icons/iconeEtica.png";
    this.bigicoAmarelo = "/assets/images/iconBigAmarelo.png";
    this.bigico = "/assets/images/iconBig.png";
    /*const range = document.getElementById('range') as HTMLInputElement;
    console.log('RANGE-->',range)
     const rangeV = document.getElementById('rangeV');
          
       const setValue = ()=>{
            console.log(range)
            const
              newValue = Number( (parseInt(range.value))  - (parseInt(range.min)) * 100 / (parseInt(range.max) - parseInt(range.min) )),
              newPosition = 10 - (newValue * 0.2);
            rangeV!.innerHTML = `<span>${range}</span>`;
            rangeV!.style.left = `calc(${newValue}% + (${newPosition}px))`;
          };
    document.addEventListener('DOMContentLoaded', setValue);
    console.log(range)
    //range.addEventListener('input', setValue);*/
  }

  ngOnInit() {}
  /*this.form = this.fh.FormBuilder({
    nome: { default: "" },
    perguntas: { default: [] },
    codigo: { default: "" },
    tipoQuestionario: { default: "" },
    switchExemplo: { default: false },
  }, this.cdRef, this.validate);
     public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }*/
  valorSoftChange(soft, name) {
    const comunicaEL = document.getElementsByName('comunica');
    let comunica = comunicaEL;
    let lideranca = this.liderancaV.value;
    console.log(parseInt(soft), name, comunica, lideranca);
    /**
     * let $inputsFunc2 = $('.skills');
         let soma2=0;
         $inputsFunc2.each(function() {
        if($(this).val()==''){
          $(this).val(0);
        }
                                                
        soma2 += parseInt($(this).val(), 0);
                                                      
    });
    let soma=a+b+c+d+e+f+g;
         if(soma2==20){
      $('#lbltotalskill').text(soma2);
      $('#lbltotalskill').css('color','red')
      $('#lbltotalSK').css('color','red')
         }else{
      $('#lbltotalskill').text(soma2);
      $('#lbltotalskill').css('color','black')
      $('#lbltotalSK').css('color','black')
         }
     */
  }

  voltarb5() {}
  resposta() {}
  proxb5() {}
}
_class = CurriculumAtributosbig5FormComponent;
_class.ɵfac = function CurriculumAtributosbig5FormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributosbig5-form"]],
  viewQuery: function CurriculumAtributosbig5FormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c7, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.comunicaV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.liderancaV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.resolucaoV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.pensamentoV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.criatividadeV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.habilidadeV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.adaptabilidadeV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.eticaV = _t.first);
    }
  },
  decls: 95,
  vars: 8,
  consts: [["display", "", "right", ""], ["key", "BIG5", "label", "Big-Five", 1, "fw-bold"], ["key", "SOFTSKILLS", "label", "Soft-Skills", 1, "fw-bold"], [1, "my-5"], [1, "row", "justify-content-between", "g-4"], [1, "col-lg-3"], [1, "card", "h-100"], ["id", "imgComunica", "alt", "...", 1, "card-img-top", 3, "src"], [1, "card-body"], [1, "card-title", "text-center"], [1, "row", "justify-content-center"], [1, "col-md-6"], [1, "card-text"], ["type", "number", "dir", "rtl", "value", "0", "name", "comunica", 1, "form-control", 3, "change"], ["comunicaV", ""], ["id", "imgLideranca", "alt", "...", 1, "card-img-top", 3, "src"], ["type", "number", "dir", "rtl", "value", "0", "name", "lideranca", 1, "form-control", 3, "change"], ["liderancaV", ""], ["id", "imgResolucao", "alt", "...", 1, "card-img-top", 3, "src"], ["type", "number", "dir", "rtl", "value", "0", "name", "resolucao", 1, "form-control", 3, "change"], ["resolucaoV", ""], ["id", "imgCriatividade", "alt", "...", 1, "card-img-top", 3, "src"], [1, "col-md-5"], ["type", "number", "dir", "rtl", "value", "0", "name", "criatividade", 1, "form-control", 3, "change"], ["criatividadeV", ""], [1, "row", "justify-content-between", "g-4", "mt-3"], ["id", "imgPensamento", "alt", "...", 1, "card-img-top", 3, "src"], ["type", "number", "dir", "rtl", "value", "0", "name", "pensamento", 1, "form-control", 3, "change"], ["pensamentoV", ""], ["id", "imgHabilidade", "alt", "...", 1, "card-img-top", 3, "src"], [1, "col-md-4"], ["type", "number", "dir", "rtl", "value", "0", "name", "habilidade", 1, "form-control", 3, "change"], ["habilidadeV", ""], ["id", "imgAdaptabilidade", "alt", "...", 1, "card-img-top", 3, "src"], ["type", "number", "dir", "rtl", "value", "0", "name", "adaptabilidade", 1, "form-control", 3, "change"], ["adaptabilidadeV", ""], ["id", "imgEtica", "alt", "...", 1, "card-img-top", 3, "src"], ["type", "number", "dir", "rtl", "value", "0", "name", "etica", 1, "form-control", 3, "change"], ["eticaV", ""]],
  template: function CurriculumAtributosbig5FormComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tabs", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "tab", 2)(3, "h4", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Compet\u00EAncias Gerenciais, distribua 20 pontos entre as habilidades abaixo: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4)(6, "div", 5)(7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "img", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 8)(10, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Comunica\u00E7\u00E3o");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 10)(13, "div", 11)(14, "p", 12)(15, "input", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_15_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](16);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r0.value, _r0.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 5)(18, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](19, "img", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 8)(21, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Lideran\u00E7a");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 10)(24, "div", 11)(25, "p", 12)(26, "input", 16, 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_26_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](27);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r1.value, _r1.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "div", 5)(29, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "img", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 8)(32, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "Resolu\u00E7\u00E3o de Problemas");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "div", 10)(35, "div", 11)(36, "p", 12)(37, "input", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_37_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](38);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r2.value, _r2.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 5)(40, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](41, "img", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "div", 8)(43, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Criatividade e Curiosidade");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 10)(46, "div", 22)(47, "p", 12)(48, "input", 23, 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_48_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](49);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r3.value, _r3.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "div", 25)(51, "div", 5)(52, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](53, "img", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "div", 8)(55, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "Pensamento Cr\u00EDtico");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 10)(58, "div", 11)(59, "p", 12)(60, "input", 27, 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_60_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](61);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r4.value, _r4.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "div", 5)(63, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](64, "img", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "div", 8)(66, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67, "Habilidade com Pessoas e Equipes");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "div", 10)(69, "div", 30)(70, "p", 12)(71, "input", 31, 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_71_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](72);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r5.value, _r5.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "div", 5)(74, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](75, "img", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "div", 8)(77, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "Adaptabilidade e Resili\u00EAncia");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 10)(80, "div", 22)(81, "p", 12)(82, "input", 34, 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_82_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](83);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r6.value, _r6.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "div", 5)(85, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](86, "img", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "div", 8)(88, "h5", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](89, "\u00C9tica");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "div", 10)(91, "div", 11)(92, "p", 12)(93, "input", 37, 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_93_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](94);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.valorSoftChange(_r7.value, _r7.name));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.comunica, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.lideranca, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.resolucao, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.criatividade, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.pensamento, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.habilidade, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.adaptabilidade, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx.etica, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    }
  },
  dependencies: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__.TabComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);input[type=range][_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  margin: 20px 0;\n  width: 100%;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 4px;\n  cursor: pointer;\n  animate: 0.2s;\n  background: grey;\n  border-radius: 25px;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-thumb {\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 0 4px 0 rgb(0, 0, 0);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -8px;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus::-webkit-slider-runnable-track {\n  background: grey;\n}\n\n.range-wrap[_ngcontent-%COMP%] {\n  width: 500px;\n  position: relative;\n}\n\n.range-value[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -50%;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  background: grey;\n  color: #fff;\n  font-size: 12px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0);\n  border-radius: 6px;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 10px solid grey;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  margin-top: -1px;\n}\n\n#lblPerma[_ngcontent-%COMP%] {\n  float: right;\n  font-size: 200%;\n  text-align: center;\n  padding-left: 1em;\n}\n\n.divSlidePerma[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n  height: auto;\n}\n\n.card-body-perma[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #223;\n  display: grid;\n}\n\n.box[_ngcontent-%COMP%] {\n  --border-size: 3px;\n  --border-angle: 0turn;\n  width: 60vmin;\n  height: 10vmin;\n  background-image: conic-gradient(from var(--border-angle), #223, #223 50%, #223), conic-gradient(from var(--border-angle), transparent 20%, white, #fec901);\n  background-size: calc(100% - var(--border-size) * 2) calc(100% - var(--border-size) * 2), cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  animation: _ngcontent-%COMP%_bg-spin 3s linear infinite;\n  border-color: #223;\n}\n@keyframes _ngcontent-%COMP%_bg-spin {\n  to {\n    --border-angle: 1turn;\n  }\n}\n.box[_ngcontent-%COMP%]:hover {\n  animation-play-state: paused;\n}\n\n@property --border-angle {\n  syntax: \"<angle>\";\n  inherits: true;\n  initial-value: 0turn;\n}\n#lblPerma[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.hb51[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fec901;\n}\n\n.bb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n.fb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n#btnvb5[_ngcontent-%COMP%], #btneb5[_ngcontent-%COMP%] {\n  color: #fec901;\n  outline-color: #fec901;\n}\n\n.lblRadio[_ngcontent-%COMP%] {\n  background-color: #fec901;\n  color: #223;\n  outline: #223;\n}\n\n.lblRadio[_ngcontent-%COMP%]:hover {\n  background-color: #223;\n  color: #fec901;\n  border-color: #fec901;\n}\n\n.lblpergB5[_ngcontent-%COMP%] {\n  color: #fec901;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.hperma[_ngcontent-%COMP%], .fperma[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fff;\n}\n\n.btnpermav[_ngcontent-%COMP%], .btnpermap[_ngcontent-%COMP%] {\n  background-color: #fff;\n  color: #213;\n  border-color: #213;\n}\n\ninput[type=radio][_ngcontent-%COMP%]:checked    + .lblRadio[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJpY3VsdW0tYXRyaWJ1dG9zYmlnNS1mb3JtL2N1cnJpY3VsdW0tYXRyaWJ1dG9zYmlnNS1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksd0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUFKOztBQUVFO0VBQ0UsYUFBQTtBQUNKOztBQUNFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFSjs7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLHdCQUFBO0VBQ0EsZ0JBQUE7QUFHSjs7QUFERTtFQUNFLGdCQUFBO0FBSUo7O0FBRkU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFLSjs7QUFIRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtBQU1KOztBQUpFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FBT0o7O0FBTEU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVFKOztBQUxBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBUUo7O0FBTEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQVFGOztBQUpBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBQU9GOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsMkpBQUE7RUFDQSwrRkFBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7RUFFQSxxQ0FBQTtFQUNBLGtCQUFBO0FBS0Y7QUFJQTtFQUNFO0lBQ0kscUJBQUE7RUFJSjtBQUNGO0FBREE7RUFFRSw0QkFBQTtBQUdGOztBQUFBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7QUFHRjtBQUFBO0VBQ0UsWUFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0FBRUY7O0FBQ0E7RUFDRSxzQkFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7QUFFRjs7QUFDQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtBQUVGOztBQUNBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQUVGOztBQUNBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUFFRjs7QUFFQTtFQUVFLGNBQUE7QUFBRjs7QUFLQTtFQUNFLGVBQUE7QUFGRjs7QUFNQTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtBQUhGOztBQU9BO0VBRUUsc0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFMRjs7QUFVQTtFQUNFLHNCQUFBO0FBUEY7O0FBVUE7RUFDRSxlQUFBO0FBUEY7O0FBV0E7RUFDRSx3QkFBQTtFQUNBLGlCQUFBO0FBUkY7O0FBV0E7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVlBO0VBQ0UsbUJBQUE7QUFURiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmNkbmZvbnRzLmNvbS9jc3MvbmV1dHJhLXRleHQtYWx0Jyk7XHJcblxyXG5pbnB1dFt0eXBlPXJhbmdlXSB7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBtYXJnaW46IDIwcHggMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBpbnB1dFt0eXBlPXJhbmdlXTpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gIH1cclxuICBpbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItcnVubmFibGUtdHJhY2sge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDRweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGFuaW1hdGU6IDAuMnM7XHJcbiAgICBiYWNrZ3JvdW5kOiBncmV5Oy8vIzAzYTlmNDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgfVxyXG4gIGlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci10aHVtYiB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IDAgcmdiYSgwLDAsMCwgMSk7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBtYXJnaW4tdG9wOiAtOHB4O1xyXG4gIH1cclxuICBpbnB1dFt0eXBlPXJhbmdlXTpmb2N1czo6LXdlYmtpdC1zbGlkZXItcnVubmFibGUtdHJhY2sge1xyXG4gICAgYmFja2dyb3VuZDogZ3JleTsgLy8jMDNhOWY0O1xyXG4gIH1cclxuICAucmFuZ2Utd3JhcHtcclxuICAgIHdpZHRoOiA1MDBweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB9XHJcbiAgLnJhbmdlLXZhbHVle1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtNTAlO1xyXG4gIH1cclxuICAucmFuZ2UtdmFsdWUgc3BhbntcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiBncmV5Oy8vICMwM2E5ZjQ7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgfVxyXG4gIC5yYW5nZS12YWx1ZSBzcGFuOmJlZm9yZXtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDogMDtcclxuICAgIGhlaWdodDogMDtcclxuICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgZ3JleTsgLy8jMDNhOWY0O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgdG9wOiAxMDAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IC01cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAtMXB4O1xyXG4gIH1cclxuXHJcbiNsYmxQZXJtYXtcclxuICAgIGZsb2F0OnJpZ2h0O1xyXG4gICAgZm9udC1zaXplOiAyMDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxZW07XHJcbn1cclxuXHJcbi5kaXZTbGlkZVBlcm1hIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogcm93LXJldmVyc2U7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gIGhlaWdodDogYXV0bztcclxuIFxyXG59XHJcblxyXG4uY2FyZC1ib2R5LXBlcm1he1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kOiAjMjIzO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgLy9wbGFjZS1pdGVtczogY2VudGVyO1xyXG5cclxufVxyXG5cclxuLmJveCB7XHJcbiAgLS1ib3JkZXItc2l6ZTogM3B4O1xyXG4gIC0tYm9yZGVyLWFuZ2xlOiAwdHVybjtcclxuICB3aWR0aDogNjB2bWluO1xyXG4gIGhlaWdodDogMTB2bWluO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGNvbmljLWdyYWRpZW50KGZyb20gdmFyKC0tYm9yZGVyLWFuZ2xlKSwgIzIyMywgIzIyMyA1MCUsICMyMjMpLCBjb25pYy1ncmFkaWVudChmcm9tIHZhcigtLWJvcmRlci1hbmdsZSksIHRyYW5zcGFyZW50IDIwJSwgd2hpdGUsICNmZWM5MDEpO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY2FsYygxMDAlIC0gKHZhcigtLWJvcmRlci1zaXplKSAqIDIpKSBjYWxjKDEwMCUgLSAodmFyKC0tYm9yZGVyLXNpemUpICogMikpLCBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgLXdlYmtpdC1hbmltYXRpb246IGJnLXNwaW4gM3MgbGluZWFyIGluZmluaXRlO1xyXG4gIGFuaW1hdGlvbjogYmctc3BpbiAzcyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgYm9yZGVyLWNvbG9yOiMyMjM7XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBiZy1zcGluIHtcclxuICB0byB7XHJcbiAgICAgIC0tYm9yZGVyLWFuZ2xlOiAxdHVybjtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgYmctc3BpbiB7XHJcbiAgdG8ge1xyXG4gICAgICAtLWJvcmRlci1hbmdsZTogMXR1cm47XHJcbiAgfVxyXG59XHJcblxyXG4uYm94OmhvdmVyIHtcclxuICAtd2Via2l0LWFuaW1hdGlvbi1wbGF5LXN0YXRlOiBwYXVzZWQ7XHJcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHBhdXNlZDtcclxufVxyXG5cclxuQHByb3BlcnR5IC0tYm9yZGVyLWFuZ2xlIHtcclxuICBzeW50YXg6IFwiPGFuZ2xlPlwiO1xyXG4gIGluaGVyaXRzOiB0cnVlO1xyXG4gIGluaXRpYWwtdmFsdWU6IDB0dXJuO1xyXG59XHJcblxyXG4jbGJsUGVybWF7XHJcbiAgY29sb3I6d2hpdGU7XHJcbn1cclxuXHJcbi5oYjUxe1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjM7XHJcbiAgY29sb3I6ICNmZWM5MDE7XHJcbn1cclxuXHJcbi5iYjUxe1xyXG4gIGJhY2tncm91bmQtY29sb3I6IzIyMztcclxufVxyXG5cclxuLmZiNTF7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjojMjIzO1xyXG59XHJcblxyXG4jYnRudmI1LCAjYnRuZWI1e1xyXG4gIGNvbG9yOiNmZWM5MDE7XHJcbiAgb3V0bGluZS1jb2xvcjojZmVjOTAxO1xyXG59XHJcblxyXG4ubGJsUmFkaW97XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlYzkwMTsvL2ZlYzkwMVxyXG4gIGNvbG9yOiMyMjM7Ly8yMjNcclxuICBvdXRsaW5lOiAjMjIzO1xyXG59XHJcblxyXG4ubGJsUmFkaW86aG92ZXJ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjojMjIzO1xyXG4gIGNvbG9yOiAjZmVjOTAxO1xyXG4gIGJvcmRlci1jb2xvcjogI2ZlYzkwMTtcclxuXHJcbn1cclxuXHJcbi5sYmxwZXJnQjV7XHJcbiAgXHJcbiAgY29sb3I6ICNmZWM5MDE7XHJcblxyXG59XHJcblxyXG5cclxuI2ltZ0JpZ0ljbywjaW1nQmlnSWNvQW1hcmVsb3tcclxuICBtYXgtd2lkdGg6IDMwcHg7XHJcbiAgXHJcbn1cclxuXHJcbi5ocGVybWEsIC5mcGVybWEge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjM7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgLy9mb250LWZhbWlseTonVHJlYnVjaGV0IE1TJywgJ0x1Y2lkYSBTYW5zIFVuaWNvZGUnLCAnTHVjaWRhIEdyYW5kZScsICdMdWNpZGEgU2FucycsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uYnRucGVybWF2LCAuYnRucGVybWFwe1xyXG5cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIGNvbG9yOiAjMjEzO1xyXG4gIGJvcmRlci1jb2xvcjogIzIxMztcclxuXHJcbn1cclxuXHJcblxyXG5pbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCsgLmxibFJhZGlveyAgXHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgXHJcbn1cclxuXHJcbiNpbWdCaWdJY28sI2ltZ0JpZ0ljb0FtYXJlbG97XHJcbiAgbWF4LXdpZHRoOiAzMHB4O1xyXG5cclxufVxyXG5cclxuLmg0LCAuY2FyZC10aXRsZXtcclxuICBmb250LWZhbWlseTogbmV1dHJhIHRleHQ7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5jYXJkLWltZy10b3B7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG1heC13aWR0aDogOTBweDtcclxuIC8vIGJhY2tncm91bmQtY29sb3I6ICNmNWY3ZmE7XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
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
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ 20497);
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ 24997);
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ 34406);
/* harmony import */ var src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/curriculum-dao.service */ 39910);
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/currriculum.model */ 70156);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/animations */ 66400);
/* harmony import */ var src_app_dao_curriculum_graduacao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/curriculum-graduacao.service */ 16403);
/* harmony import */ var src_app_models_currriculum_graduacao_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/currriculum-graduacao.model */ 56982);
/* harmony import */ var src_app_models_curriculum_idioma_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/models/curriculum-idioma.model */ 10470);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ 9224);

var _class;
























const _c0 = ["areaPos"];
const _c1 = ["estados"];
const _c2 = ["curso_id"];
const _c3 = ["idiomas"];
const _c4 = ["municipio"];
function CurriculumFormComponent_grid_21_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r35 = ctx.row;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r20.lookup.getValue(ctx_r20.lookup.IDIOMAS, row_r35.idioma), " ");
  }
}
function CurriculumFormComponent_grid_21_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 45);
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r22.lookup.IDIOMAS);
  }
}
function CurriculumFormComponent_grid_21_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r37 = ctx.row;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r24.lookup.getValue(ctx_r24.lookup.NIVEL_IDIOMA, row_r37.idiomaFala), " ");
  }
}
function CurriculumFormComponent_grid_21_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 46);
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r26.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_21_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r39 = ctx.row;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r28.lookup.getValue(ctx_r28.lookup.NIVEL_IDIOMA, row_r39.idiomaEscrita), " ");
  }
}
function CurriculumFormComponent_grid_21_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 47);
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r30.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_21_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r41 = ctx.row;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r32.lookup.getValue(ctx_r32.lookup.NIVEL_IDIOMA, row_r41.idiomaEntendimento), " ");
  }
}
function CurriculumFormComponent_grid_21_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 48);
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r34.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "grid", 32)(1, "columns")(2, "column", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](3, CurriculumFormComponent_grid_21_ng_template_3_Template, 1, 1, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, CurriculumFormComponent_grid_21_ng_template_5_Template, 1, 2, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "column", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](8, CurriculumFormComponent_grid_21_ng_template_8_Template, 1, 1, "ng-template", null, 37, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](10, CurriculumFormComponent_grid_21_ng_template_10_Template, 1, 2, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "column", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](13, CurriculumFormComponent_grid_21_ng_template_13_Template, 1, 1, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](15, CurriculumFormComponent_grid_21_ng_template_15_Template, 1, 2, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](17, "column", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](18, CurriculumFormComponent_grid_21_ng_template_18_Template, 1, 1, "ng-template", null, 43, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](20, CurriculumFormComponent_grid_21_ng_template_20_Template, 1, 2, "ng-template", null, 44, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](22, "column", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](4);
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](6);
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](9);
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](11);
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](14);
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](16);
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](19);
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](21);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("control", ctx_r2.form.controls.idiomas)("minHeight", 500)("form", ctx_r2.formIdiomaGrid)("hasDelete", true)("add", ctx_r2.addIdiomas.bind(ctx_r2))("load", ctx_r2.loadIdiomas.bind(ctx_r2))("remove", ctx_r2.removeIdiomas.bind(ctx_r2))("save", ctx_r2.saveIdiomas.bind(ctx_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r19)("editTemplate", _r21);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r23)("editTemplate", _r25);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r27)("editTemplate", _r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r31)("editTemplate", _r33);
  }
}
function CurriculumFormComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r43 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r43.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumFormComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-switch", 49);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("label", ctx_r6.formGraduacao.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r6.formGraduacao.controls.pretensao);
  }
}
function CurriculumFormComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r45 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r45.area_conhecimento, " ");
  }
}
function CurriculumFormComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-search", 50, 51);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("dao", ctx_r10.areaDao)("control", ctx_r10.formGraduacao.controls.area_conhecimento);
  }
}
function CurriculumFormComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r48 = ctx.row;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r12.lookup.getValue(ctx_r12.lookup.TITULOS_CURSOS, row_r48.titulo), " ");
  }
}
function CurriculumFormComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "input-select", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumFormComponent_ng_template_38_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r50.onAreaPosGraduacaoChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx_r14.formGraduacao.controls.titulo)("items", ctx_r14.lookup.TITULOS_CURSOS);
  }
}
function CurriculumFormComponent_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r52.curso_id, " ");
  }
}
const _c5 = function () {
  return ["raiox", "cadastros", "curso", "new"];
};
const _c6 = function (a0) {
  return {
    route: a0
  };
};
function CurriculumFormComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 53, 54);
  }
  if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("control", ctx_r18.formGraduacao.controls.curso_id)("dao", ctx_r18.cursoDao)("where", ctx_r18.cursoWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](6, _c6, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction0"](5, _c5)));
  }
}
const _c7 = function (a2) {
  return ["uf", "==", a2];
};
class CurriculumFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__.Curriculum, src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_6__.CurriculumDaoService);
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
    this.dataTableIdioma = [];
    this.show = 'true';
    this.validate = (control, controlName) => {
      let result = null;
      /*if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      }*/
      return result;
    };
    this.join = ['graduacoes'];
    //super(injector,Curso, CursoDaoService)
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.CidadeDaoService);
    this.areaDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_4__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_5__.CursoDaoService);
    this.curriculumGraduacaoDAO = injector.get(src_app_dao_curriculum_graduacao_service__WEBPACK_IMPORTED_MODULE_8__.CurriculumGraduacaoDaoService);
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
      idiomas: {
        default: []
      },
      ativo: {
        default: true
      },
      graduacoesLista: {
        default: []
      }
    }, this.cdRef, this.validate);
    this.formGraduacao = this.fh.FormBuilder({
      curriculum_id: {
        default: ""
      },
      curso_id: {
        default: ""
      },
      area_conhecimento: {
        default: ""
      },
      curso: {
        default: ""
      },
      graduacao: {
        default: []
      },
      pretensao: {
        default: 0
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
    this.formIdiomaGrid = this.fh.FormBuilder({
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
      idiomas: {
        default: []
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const curriculuns = yield _this2.dao?.query({
        where: ['usuario_id', '==', _this2.auth.usuario?.id],
        join: _this2.join
      }).asPromise();
      let entity = curriculuns?.length ? curriculuns[0] : new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__.Curriculum(); //this.entity
      const cidade = entity.cidade_id != '' ? yield _this2.cidadeDao?.getById(entity.cidade_id) : null;
      console.log('CIDADE', cidade);
      //this.form?.controls.estados.setValue(this.lookup.UF.find(x => x.key == 'AM'));//cidade.uf));
      let uf = _this2.lookup.getLookup(_this2.lookup.UF, cidade?.uf);
      _this2.form?.controls.estados.setValue(uf?.key); //cidade.uf));
      entity.quantidade_filhos > 0 ? _this2.form?.controls.filhos.setValue(true) : _this2.form?.controls.filhos.setValue(false);
      const municipio = _this2.lookup.UF.find(x => x.key == cidade?.uf);
      entity.idiomas.length > 0 ? _this2.form?.controls.radioFalaIdioma.setValue(true) : _this2.form?.controls.radioFalaIdioma.setValue(false);
      //entity.filhos == 1 ? this.form?.controls.radioFalaIdioma.setValue(true) : this.form?.controls.radioFalaIdioma.setValue(false);
      entity.graduacoes.length > 0 ? _this2.formGraduacao.controls.graduacaopos.setValue(_this2.montaGraduacaoPos(entity.graduacoes)) : '';
      //entity.graduacoes.length > 0 ?  this.montaGraduacaoPos(entity.graduacoes) : '';
      yield _this2.loadData(entity, _this2.form);
    })();
  }
  montaGraduacaoPos(cursoId) {
    var _this3 = this,
      _ref;
    let result = undefined;
    let gard = [];
    cursoId.forEach(function (_x) {
      return (_ref = _ref || (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (curso1) {
        const graduacao = yield _this3.cursoDao?.getById(curso1.id, ['areaConhecimento', 'tipoCurso']);
        const area = {
          'key': graduacao?.area_id,
          'value': graduacao?.area_conhecimento?.nome
        };
        const curso = {
          'key': graduacao?.id,
          'value': graduacao?.nome
        };
        const titulo = _this3.lookup.TITULOS_CURSOS.find(x => x.key == graduacao?.titulo);
        const pretensao = _this3.opcoesEscolha.find(value => value.key == curso1.pretensao);
        const key = _this3.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || ""));
        result = {
          key: key,
          value: area.value + ' - ' + curso.value + ' - ' + titulo?.value + ' - ' + pretensao?.value,
          data: {
            id: _this3.dao?.generateUuid(),
            area: area.key,
            curso: curso.key,
            titulo: titulo?.key,
            pretensao: pretensao?.key,
            _status: "EDIT"
          }
        };
        gard.push(result);
      })).apply(this, arguments);
    });
    console.log('Gard', gard);
    //this.formGraduacao?.controls.graduacaopos.setValue(gard)
    return gard;
  }
  saveData(form) {
    //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
    //console.log('FORMULARIO', this.form!.value)
    return new Promise((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__.Curriculum(), this.entity);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      curriculum.cidade_id = "86297f92-d919-e12f-476d-6aff99c46809";
      //(this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => curriculum.idiomas.push(element.data));// iNSERE DADOS DO MULTI-SELECT IDIOMAS
      curriculum.graduacoes = this.formGraduacao.controls.graduacaopos.value.map(x => Object.assign({}, {
        curso_id: x.data.curso,
        pretensao: x.data.pretensao
      }));
      //curriculum.graduacoes = this.formGraduacao!.controls.graduacaopos.value.filter((x: CurriculumGraduacao) => x._status?.length);
      resolve(curriculum);
    });
  }
  onEstadosChange() {
    //console.log('onEstadosChange', this.form?.controls.estados)
    //const estados = this.estadosV!.value;
    this.show = 'false';
    const estados = this.form.controls.estados.value;
    this.selecionaMunicipios(estados);
    //this.municipioV?.disabled;
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
    this.show = 'true';
  }
  addItemIdioma() {
    let result = undefined;
    let res = this.form.value;
    //console.log('addItemIdioma', res)
    const idioma = this.lookup.IDIOMAS.find(x => x.key == this.form.controls.idioma.value);
    const escrita = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEscrita.value);
    const fala = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaFala.value);
    const entende = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEntendimento.value);
    const key = idioma?.key != "" ? this.util.textHash(idioma?.key) : null;
    // console.log('addItemIdioma', ' - ', idioma, ' - ', escrita, ' - ', fala, ' - ', entende, ' - ', key)
    if (idioma && escrita && fala && entende && this.util.validateLookupItem(this.form.controls.idiomas.value, key)) {
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
  addItemGraduacaoPos() {
    let result = undefined;
    const area = {
      'key': this.formGraduacao.controls.areaPos.value,
      'value': this.areaPosV?.selectedItem?.text
    };
    const curso = this.cursoV.selectedItem; //this.cursosGradPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formGraduacao.controls.pretensao.value ? 1 : 0)); //converte o value do switch
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || "")); // + (pretensao?.key || ""));
    //console.log('AREA', area, 'AREA', curso, 'AREA', titulo, 'AREA', pretensao)
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
      //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
      this.formGraduacao.controls.areaPos.setValue("");
      this.formGraduacao.controls.cursoPos.setValue("");
      this.formGraduacao.controls.titulo.setValue("");
      this.formGraduacao.controls.pretensao.setValue(false);
    }
    return result;
  }
  onAreaGraducaoPosChange() {
    this.cursoDao?.query({
      where: [['area_curso_id', '==', this.formGraduacao.controls.area_conhecimento.value], ['titulo', 'like', 'GRAD%']]
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
    this.cursoWhere = [['area_id', '==', this.formGraduacao.controls.area_conhecimento.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
    this.cdRef.detectChanges();
    /*this.cursoDao?.query({ where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]] }).getAll().then((cursos3) => {
      this.cursosGradPos = cursos3.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });*/
  }
  /*ngOnInit(): void {
    super.ngOnInit();
    /*this.action = "edit";
    this.id = this.auth.usuario?.id;* /
    /*this.dao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id] }).getAll().then((user) => {
      //console.log('USER', user.map(x => x.id))
      if (!(user == null || user.length == 0)) {
        //console.log('VAZIO')
        const userID = (user.map(x => x.id)).toString()
        //console.log('USERID',userID)
        this.form?.controls.id.setValue(userID)//.toString())))
      }
    });* /
  }*/
  togglePopOver() {}
  /*get stateName() {
    return this.show ? 'show' : 'hide'
  }
   
  public togglePopOver() {
    
    const pop = document.getElementById('divPop');
    //console.log(pop?.hidden)
    if (pop?.hidden){
      pop!.hidden=false;
       }else{
      pop!.hidden=true;
    }
    this.show = !this.show;
  }
    */
  /**
   * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
   */
  /*public async save(form: IIndexable, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      row.idioma = form.idioma;
      row.fala = form.fala;
      row.escrita = form.escrita;
      row.entendimento = form.entendimento;
  
      // limpar campos do formulario
      // TODO
      return row;
    }
    return undefined;
  }*/
  addIdiomas() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_curriculum_idioma_model__WEBPACK_IMPORTED_MODULE_10__.CurriculumIdioma();
    })();
  }
  loadIdiomas(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.formIdiomaGrid.controls.idioma.setValue(row.idioma);
      _this4.formIdiomaGrid.controls.idiomaFala.setValue(row.idiomaFala);
      _this4.formIdiomaGrid.controls.idiomaEscrita.setValue(row.idiomaEscrita);
      _this4.formIdiomaGrid.controls.idiomaEntendimento.setValue(row.idiomaEntendimento);
    })();
  }
  removeIdiomas(row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this5.dialog.confirm("Excluir ?", "Deseja realmente excluir esta pergunta?")) {
        return true;
      }
      return undefined;
    })();
  }
  saveIdiomas(form, row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form?.markAllAsTouched();
      if (form?.valid) {
        let values = form.value;
        row.idioma = values.idioma;
        row.idiomaFala = values.idiomaFala;
        row.idiomaEscrita = values.idiomaEscrita;
        row.idiomaEntendimento = values.idiomaEntendimento;
        return row;
      }
      return undefined;
    })();
  }
  addGraduacao() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_currriculum_graduacao_model__WEBPACK_IMPORTED_MODULE_9__.CurriculumGraduacao({});
    })();
  }
  saveGraduacao(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('SAVE FORM e ROW VALUES', values);
      row.pretensao = values.pretensao;
      row.area_conhecimento = values.area_conhecimento;
      row.titulo = values.titulo;
      row.curso_id = values.curso_id;
      console.log('SAVE FORM e ROW', row);
      return row;
    }
    return undefined;
  }
  loadGraduacao(form, row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('loadGraduacao', row);
      //let cursoID=row.curso_id?.id;
      //const graduacao = await this.cursoDao?.getById(cursoID!, ['areaConhecimento','tipoCurso']);
      _this6.formGraduacao.controls.pretensao.setValue(row.pretensao);
      _this6.formGraduacao.controls.area_conhecimento.setValue(row.area_conhecimento);
      _this6.formGraduacao.controls.titulo.setValue(row.curso_id?.titulo);
      _this6.formGraduacao.controls.curso_id.setValue(row.curso_id);
    })();
  }
  removeGraduacao(row) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this7.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DEL";
      }
      return undefined;
    })();
  }
}
_class = CurriculumFormComponent;
_class.ɵfac = function CurriculumFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_21__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-pessoal-form"]],
  viewQuery: function CurriculumFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c4, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.areaPosV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.estadosV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.cursoV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.idiomasM = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.municipioV = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵInheritDefinitionFeature"]],
  decls: 46,
  vars: 47,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "Apresente-se", "icon", "bi-card-list", "controlName", "apresentacao", 3, "size", "bold", "control"], ["title", "Dados Residenciais"], [1, "row", "mt-2"], ["label", "Estado", "icon", "fas fa-flag", "controlName", "estados", 3, "size", "control", "items"], ["estados", ""], ["label", "Munic\u00EDpio", "icon", "far fa-flag", "controlName", "cidade_id", 3, "size", "control", "dao", "where"], ["municipio", ""], ["label", "Telefone de contato WhatsAPP", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"], ["title", "Estado Civil"], ["label", "Estado Civil", "icon", "fas fa-ring", "controlName", "estado_civil", 3, "size", "control", "items"], ["label", "Possui Filhos?", "icon", "fas fa-child", "controlName", "filhos", 3, "size", "control"], ["label", "Quantos?", "icon", "bi bi-arrow-up-right-circle", "controlName", "quantidade_filhos", 3, "hidden", "size", "control", "minValue"], ["title", "Idiomas", 3, "click"], [1, "row", "my-3"], ["label", "Fala outros idiomas?", "icon", "fas fa-language", "controlName", "radioFalaIdioma", 3, "size", "control"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save", 4, "ngIf"], ["editable", "", 3, "minHeight", "form", "control", "hasDelete", "add", "load", "remove", "save"], ["title", "Pretende Cursar?", "titleHint", "Pretende cursar ou j\u00E1 esta concluido.", 3, "template", "editTemplate"], ["columnPretende", ""], ["editPretende", ""], ["title", "\u00C1rea do Conhecimento", "titleHint", "colha a \u00C1rea de conhecimento.", 3, "template", "editTemplate"], ["columnArea", ""], ["editArea", ""], ["title", "T\u00EDtulo", "titleHint", "Qual a titula\u00E7\u00E3o que se refere ao curso.", 3, "template", "editTemplate"], ["columnTitulo", ""], ["editTitulo", ""], ["title", "Curso", "titleHint", "Escolha o curso.", 3, "template", "editTemplate"], ["columnCurso", ""], ["editCurso", ""], ["type", "options"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["title", "Idioma", "titleHint", "Escolha o idioma.", 3, "template", "editTemplate"], ["columnIdioma", ""], ["editIdioma", ""], ["title", "N\u00EDvel de fala", "titleHint", "Escolha o seu n\u00EDvel de fala.", 3, "template", "editTemplate"], ["columnNivelFala", ""], ["editNivelFala", ""], ["title", "N\u00EDvel de escrita", "titleHint", "Escolha o seu n\u00EDvel de escrita.", 3, "template", "editTemplate"], ["columnNivelEscrita", ""], ["editNivelEscrita", ""], ["title", "N\u00EDvel de entendimento", "titleHint", "Escolha o seu n\u00EDvel de entendimento.", 3, "template", "editTemplate"], ["columnNivelEntendimento", ""], ["editNivelEntendimento", ""], ["label", "", "icon", "", "controlName", "idioma", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaFala", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaEscrita", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaEntendimento", 3, "size", "items"], ["icon", "fas fa-user-graduate", "controlName", "pretensao", "labelInfo", "Pretendo Cursar", 3, "size", "label", "control"], ["label", "\u00C1rea de conhecimento", "controlName", "area_conhecimento", 3, "size", "dao", "control"], ["areaPos", ""], ["label", "Titulo", "icon", "bi bi-mortarboard-fill", "controlName", "titulo", "liveSearch", "", 3, "size", "control", "items", "change"], ["label", "Curso", "icon", "fas fa-graduation-cap", "controlName", "curso_id", "liveSearch", "", 3, "size", "control", "dao", "where", "addRoute"], ["cursoV", "", "curso", ""]],
  template: function CurriculumFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("submit", function CurriculumFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](2, "input-textarea", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](4, "separator", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](6, "input-select", 5, 6)(8, "input-select", 7, 8)(10, "input-text", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](11, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](12, "separator", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](13, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](14, "input-select", 11)(15, "input-switch", 12)(16, "input-number", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](17, "div", 1)(18, "separator", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CurriculumFormComponent_Template_separator_click_18_listener() {
        return ctx.togglePopOver();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](19, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](20, "input-switch", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](21, CurriculumFormComponent_grid_21_Template, 23, 16, "grid", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](22, "div", 15)(23, "grid", 18)(24, "columns")(25, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](26, CurriculumFormComponent_ng_template_26_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](28, CurriculumFormComponent_ng_template_28_Template, 1, 3, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](30, "column", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](31, CurriculumFormComponent_ng_template_31_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](33, CurriculumFormComponent_ng_template_33_Template, 2, 3, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](35, "column", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](36, CurriculumFormComponent_ng_template_36_Template, 1, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](38, CurriculumFormComponent_ng_template_38_Template, 1, 3, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](40, "column", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](41, CurriculumFormComponent_ng_template_41_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](43, CurriculumFormComponent_ng_template_43_Template, 3, 8, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](45, "column", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](27);
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](29);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](32);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](34);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](37);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](39);
      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](42);
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("bold", true)("control", ctx.form.controls.apresentacao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.estados)("items", ctx.lookup.UF);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cidade_id)("dao", ctx.cidadeDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](45, _c7, ctx.form.controls.estados.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.estado_civil)("items", ctx.lookup.ESTADO_CIVIL);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.filhos);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("hidden", ctx.form.controls.filhos.value ? undefined : "true")("size", 1)("control", ctx.form.controls.quantidade_filhos)("minValue", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.radioFalaIdioma);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.form.controls.radioFalaIdioma.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("minHeight", 500)("form", ctx.formGraduacao)("control", ctx.form.controls.graduacoesLista)("hasDelete", true)("add", ctx.addGraduacao.bind(ctx))("load", ctx.loadGraduacao.bind(ctx))("remove", ctx.removeGraduacao.bind(ctx))("save", ctx.saveGraduacao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r3)("editTemplate", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r7)("editTemplate", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r11)("editTemplate", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r15)("editTemplate", _r17);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_11__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_14__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_15__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_16__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_17__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_18__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_19__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_20__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.trigger)('popOverState', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.state)('show', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.state)('hide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.style)({
      opacity: 0
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.transition)('show => hide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.animate)('600ms ease-out')), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.transition)('hide => show', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_23__.animate)('1000ms ease-in'))])]
  }
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
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/currriculum.model */ 70156);
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/centro-treinamento-dao.service */ 57565);
/* harmony import */ var src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/grupo-especializado-dao.service */ 51353);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/currriculum-profissional.model */ 46722);
/* harmony import */ var src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/curriculum-profissional-dao.service */ 60978);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/curriculum-dao.service */ 39910);
/* harmony import */ var src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/dao/cargo-dao.service */ 99255);
/* harmony import */ var src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/dao/area-tematica-dao.service */ 88653);
/* harmony import */ var src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/dao/area-atividade-externa-dao.service */ 14710);
/* harmony import */ var src_app_dao_materia_dao_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/dao/materia-dao.service */ 35871);
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ 34406);
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ 24997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);

var _class;































const _c0 = ["radioDocenciaExterna"];
const _c1 = ["radioDocenciaInterna"];
const _c2 = ["radioCursosInternos"];
const _c3 = ["radioCursosExternos"];
const _c4 = ["radioInteresseBNT"];
const _c5 = ["radioProgramaGestao"];
const _c6 = ["radioInteresseProgramaGestao"];
const _c7 = ["radioInteresseRemocao"];
const _c8 = ["radioViajaNacional"];
const _c9 = ["radioViajaInternacional"];
const _c10 = ["escolhaRadioProgramaGestao"];
const _c11 = ["escolhaInteresseProgramaGestao"];
const _c12 = ["funcoes"];
const _c13 = ["unidades"];
const _c14 = ["lotacaoAtual"];
const _c15 = ["gruposEspecializados"];
const _c16 = ["centroTreinamento"];
const _c17 = ["cargos"];
const _c18 = ["selectLotacao"];
const _c19 = ["selectAreaAtividadeExterna"];
const _c20 = ["areaConhecimento"];
const _c21 = ["areaExterna"];
const _c22 = ["areaAtividadeInterna"];
const _c23 = ["selectDocenciaInterna"];
const _c24 = ["selectCursosInternos"];
function CurriculumProfissionalFormComponent_input_radio_97_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "input-radio", 94, 95);
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("items", ctx_r22.lookup.PG_PRF);
  }
}
function CurriculumProfissionalFormComponent_input_radio_102_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "input-radio", 96, 97);
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("items", ctx_r24.lookup.PG_PRF);
  }
}
function CurriculumProfissionalFormComponent_input_text_103_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](0, "input-text", 98);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx_r25.form.controls.telefone)("maskFormat", "(00) 0000-0000 || (00) 0 0000-0000");
    _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵattribute"]("maxlength", 250);
  }
}
class CurriculumProfissionalFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_9__.CurriculumProfissional, src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_10__.CurriculumProfissionalDaoService);
    this.injector = injector;
    this.testeLookup = [{
      'key': 'key 1',
      'value': 'value 1'
    }];
    this.opcoesEscolha = [{
      'key': 1,
      'value': 'Feito'
    }, {
      'key': 0,
      'value': 'Pretendo Fazer'
    }];
    this.anos = [];
    this.unidadesItems = [];
    this.funcoesItems = [];
    this.gruposItems = [];
    this.centroTreinamentoItems = [];
    this.cargosItems = [];
    this.usuarioUnidade = [];
    this.especifiqueHabilidades = [];
    this.disciplinasItens = [];
    this.disciplinasItens2 = [];
    this.cursosItens = [];
    this.materiaWhere = [["id", "==", null]];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.curriculumDao = injector.get(src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_13__.CurriculumDaoService);
    this.userDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_11__.UsuarioDaoService);
    this.lotacaoDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_12__.UnidadeIntegranteDaoService);
    this.centroTreinamentoDao = injector.get(src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_6__.CentroTreinamentoDaoService);
    this.funcaoDao = injector.get(src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_5__.FuncaoDaoService);
    this.grupoDao = injector.get(src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_7__.GrupoEspecializadoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_8__.UnidadeDaoService);
    this.cargoDao = injector.get(src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_14__.CargoDaoService);
    this.areaTematicaDao = injector.get(src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_15__.AreaTematicaDaoService);
    this.areaAtividadeExternaDao = injector.get(src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_16__.AreaAtividadeExternaDaoService);
    this.materiaDao = injector.get(src_app_dao_materia_dao_service__WEBPACK_IMPORTED_MODULE_17__.MateriaDaoService);
    this.areaConhecimentoDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_19__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_18__.CursoDaoService);
    this.areaExternaDao = injector.get(src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_16__.AreaAtividadeExternaDaoService);
    this.lookupService = injector.get(src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_3__.LookupService);
    this.form = this.fh.FormBuilder({
      radioProgramaGestao: {
        default: false
      },
      radioInteresseProgramaGestao: {
        default: false
      },
      radioInteresseBNT: {
        default: false
      },
      radioInteresseRemocao: {
        default: false
      },
      radioViajaNacional: {
        default: false
      },
      radioViajaInternacional: {
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
      especifique_habilidades: {
        default: []
      },
      inputEspecifiqueHabilidade: {
        default: ""
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
      gruposEspecializados: {
        default: ""
      },
      telefone: {
        default: ""
      },
      escolhaInteresseProgramaGestao: {
        default: ""
      },
      escolhaRadioProgramaGestao: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formAtividadeExterna = this.fh.FormBuilder({
      radioAtividadeExterna: {
        default: false
      },
      atividadesDesempenhou: {
        default: []
      },
      selectAreaAtividadeExterna: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formAtividadeInterna = this.fh.FormBuilder({
      radioAtividadeInterna: {
        default: false
      },
      atividadesDesempenhouInterna: {
        default: []
      },
      areaAtividadeInterna: {
        default: ""
      },
      inputAtividadeInterna: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formDocenciaExterna = this.fh.FormBuilder({
      radioDocenciaFora: {
        default: false
      },
      docenciaFora: {
        default: []
      },
      inputDocenciaFora: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formDocenciaInterna = this.fh.FormBuilder({
      radioDocenciaPRF: {
        default: false
      },
      docenciaPRF: {
        default: []
      },
      selectDocenciaInterna: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formCursoInterno = this.fh.FormBuilder({
      radioCursosInternos: {
        default: false
      },
      cursosInternos: {
        default: []
      },
      areaInterna: {
        default: ""
      },
      selectCursosInternos: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formCursoExterno = this.fh.FormBuilder({
      radioCursosExternos: {
        default: false
      },
      cursosExternos: {
        default: []
      },
      areaExterna: {
        default: ""
      },
      inputCursosExternos: {
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
    console.log('userUnidade', userUnidade);
    //this.cursoDao?.query({ where: [['nome', '==', 'Curso Institucional']]}).g().then((municipios) => {
    // this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    //});
  }

  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let lookups = yield _this.curriculumDao.lookupsCurriculum();
      _this.unidadesItems = lookups.unidades;
      _this.funcoesItems = lookups.funcoes;
      _this.gruposItems = lookups.grupos;
      _this.centroTreinamentoItems = lookups.ct;
      _this.cargosItems = lookups.cargos;
      _this.lotacaoAtual.loadSearch(_this.auth.lotacao);
      //let institucional_id = await this.cursoDao.idInstitucional();
      _this.materiaDao?.query({
        where: [[]],
        orderBy: [['nome', 'asc']]
      }).getAll().then(materias => {
        _this.disciplinasItens2 = materias.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome
        }));
      });
      _this.cursoDao?.query({
        where: [['titulo', '==', 'INSTITUCIONAL']],
        orderBy: [['nome', 'asc']]
      }).getAll().then(materias => {
        _this.cursosItens = materias.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome
        }));
      });
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    return new Promise((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_4__.Curriculum(), this.entity);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      (this.form?.controls.idiomasM.value).forEach(element => curriculum.idiomas.push(element.data));
      resolve(curriculum);
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  addItemFuncao() {
    let result = undefined;
    let res = this.form.value;
    console.log('addItemFuncao', res);
    const funcao = this.funcoes?.selectedItem;
    const key = this.util.textHash(funcao.key);
    console.log('addItemFuncao', ' - ', funcao, '-', key);
    if (funcao && this.util.validateLookupItem(this.form.controls.funcoes.value, key)) {
      // && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: funcao.value,
        data: {
          _status: "ADD"
        }
      };
      this.form.controls.funcoesOcupadas.setValue("");
    }
    return result;
  }
  addItemLotacao() {
    let result = undefined;
    //this.funcoesItems = lotacao!.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    const lotacao = this.selectLotacao?.selectedEntity;
    const key = lotacao?.id;
    if (lotacao && this.util.validateLookupItem(this.form.controls.lotacoes.value, key)) {
      // && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: lotacao.sigla + " - " + lotacao.nome,
        data: {
          _status: "ADD"
        }
      };
      this.form.controls.selectLotacao.setValue("");
    }
    return result;
  }
  addItemHabilidades() {
    let result = undefined;
    const habilidades = this.form.controls.inputEspecifiqueHabilidade.value;
    const key = this.util.textHash(habilidades);
    const especifiqueHabilidades = {
      'key': key,
      'value': habilidades
    };
    if (especifiqueHabilidades && this.util.validateLookupItem(this.form.controls.especifique_habilidades.value, key)) {
      result = {
        key: key,
        value: habilidades,
        data: {
          _status: "ADD"
        }
      };
      this.form.controls.inputEspecifiqueHabilidade.setValue("");
    }
    return result;
  }
  addItemAtividadeExterna() {
    let result = undefined;
    const area = this.selectAreaAtividadeExterna?.selectedEntity;
    const key = area?.id;
    if (area && this.util.validateLookupItem(this.formAtividadeExterna.controls.atividadesDesempenhou.value, key)) {
      result = {
        key: key,
        value: area.nome,
        data: {
          _status: "ADD"
        }
      };
      this.formAtividadeExterna.controls.selectAreaAtividadeExterna.setValue("");
    }
    return result;
  }
  addItemAtividadeInterna() {
    let result = undefined;
    //this.funcoesItems = lotacao!.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    const area = this.areaAtividadeInterna?.selectedEntity;
    const atividade = this.formAtividadeInterna.controls.inputAtividadeInterna.value;
    const key = this.util.textHash(atividade);
    if (atividade && this.util.validateLookupItem(this.formAtividadeInterna.controls.atividadesDesempenhouInterna.value, key)) {
      // && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: area.nome + " - " + atividade,
        data: {
          _status: "ADD"
        }
      };
      this.formAtividadeInterna.controls.inputAtividadeInterna.setValue("");
      this.formAtividadeInterna.controls.areaAtividadeInterna.setValue("");
    }
    return result;
  }
  addItemDocenciaExterna() {
    let result = undefined;
    const docencia = this.formDocenciaExterna.controls.inputDocenciaFora.value;
    const key = this.util.textHash(docencia);
    const docencias = {
      'key': key,
      'value': docencia
    };
    if (docencias && this.util.validateLookupItem(this.formDocenciaExterna.controls.docenciaFora.value, key)) {
      result = {
        key: key,
        value: docencia,
        data: {
          _status: "ADD"
        }
      };
      this.formDocenciaExterna.controls.inputDocenciaFora.setValue("");
    }
    return result;
  }
  addItemDocenciaInterna() {
    let result = undefined;
    const docencia = this.selectDocenciaInterna?.selectedItem;
    console.log('DOCENCIA', docencia);
    const key = this.formDocenciaInterna.controls.selectDocenciaInterna.value;
    const docencias = {
      'key': docencia?.key,
      'value': docencia?.value
    };
    if (docencias && this.util.validateLookupItem(this.formDocenciaInterna.controls.docenciaPRF.value, key)) {
      result = {
        key: docencia.key,
        value: docencia.value,
        data: {
          _status: "ADD"
        }
      };
      this.formDocenciaInterna.controls.selectDocenciaInterna.setValue("");
    }
    return result;
  }
  onAreaConhecimentoChange() {
    this.cursoDao?.query({
      where: [['area_id', '==', this.formCursoInterno.controls.areaInterna.value]]
    }).getAll().then(cursos2 => {
      this.disciplinasItens = cursos2.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome
      }));
      this.cdRef.detectChanges();
    });
  }
  addItemCursoExterno() {
    let result = undefined;
    const areaCurso = this.areaExterna?.selectedEntity;
    const curso = this.formCursoExterno.controls.inputCursosExternos.value;
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formCursoExterno.controls.radioCursosExternos.value ? 1 : 0)); //converte o value do switch
    const key = this.util.textHash(curso);
    if (areaCurso && curso && pretensao && this.util.validateLookupItem(this.formCursoExterno.controls.cursosExternos.value, key)) {
      result = {
        key: key,
        value: areaCurso.nome + ' - ' + curso + ' - ' + pretensao.value,
        data: {
          area: areaCurso.id,
          curso: curso,
          pretensao: pretensao.key,
          _status: "ADD"
        }
      };
      this.formCursoExterno.controls.areaExterna.setValue("");
      this.formCursoExterno.controls.inputCursosExternos.setValue("");
    }
    return result;
  }
  addItemCursoInterno() {
    let result = undefined;
    const areaCurso = this.areaConhecimento?.selectedEntity;
    const curso = this.selectCursosInternos?.selectedItem;
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formCursoInterno.controls.radioCursosInternos.value ? 1 : 0)); //converte o value do switch
    const key = curso?.key;
    if (areaCurso && curso && pretensao && this.util.validateLookupItem(this.formCursoInterno.controls.cursosInternos.value, key)) {
      result = {
        key: key,
        value: areaCurso.nome + ' - ' + curso.value + ' - ' + pretensao.value,
        data: {
          area: areaCurso.id,
          curso: curso.key,
          pretensao: pretensao.key,
          _status: "ADD"
        }
      };
      this.formCursoInterno.controls.areaInterna.setValue("");
      this.formCursoInterno.controls.selectCursosInternos.setValue("");
    }
    return result;
  }
  onChangeEscolhePG() {
    this.escolhaRadioProgramaGestao?.setValue("");
  }
  onChangeEscolheInteressePG() {
    this.escolhaInteresseProgramaGestao?.setValue("");
  }
  onAddClick() {}
}
_class = CurriculumProfissionalFormComponent;
_class.ɵfac = function CurriculumProfissionalFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_29__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-profissional-form"]],
  viewQuery: function CurriculumProfissionalFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c7, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c9, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c10, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c11, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c12, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c13, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c14, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c15, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c16, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c17, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c18, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c19, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c20, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c21, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c22, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c23, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵviewQuery"](_c24, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioDocenciaExterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioCursosInternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioCursosExternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioInteresseBNT = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioInteresseProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioInteresseRemocao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioViajaNacional = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.radioViajaInternacional = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.escolhaRadioProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.escolhaInteresseProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.funcoes = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.unidades = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.lotacaoAtual = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.gruposEspecializados = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.centroTreinamento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.cargos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.selectLotacao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.selectAreaAtividadeExterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.areaConhecimento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.areaExterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.areaAtividadeInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.selectDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵloadQuery"]()) && (ctx.selectCursosInternos = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵInheritDefinitionFeature"]],
  decls: 109,
  vars: 139,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "left", ""], ["key", "FUNCIONAIS", "label", "Funcionais", 1, "fw-bold"], [1, "row", "mb-2", "mt-4"], ["label", "Ingresso na Institui\u00E7\u00E3o", "icon", "bi bi-calendar-check-fill", "controlName", "ano_ingresso", 3, "size", "control", "items"], ["label", "Centro de Treinamento", "icon", "bi bi-building-fill", "controlName", "centro_treinamento", 3, "size", "control", "items"], ["centroTreinamento", ""], ["label", "Cargo", "controlName", "cargo", 3, "size", "control", "dao"], ["cargos", ""], [1, "row"], ["title", "Hist\u00F3rico de Lota\u00E7\u00F5es e Fun\u00E7\u00F5es Gratificadas", 1, "mb-3", "mt-3", 3, "bold"], ["label", "Fun\u00E7\u00F5es ocupadas como titular ou substituto", "controlName", "funcoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["icon", "bi bi-check-circle-fill", "controlName", "funcoesOcupadas", 3, "size", "control", "items"], ["funcoes", ""], ["label", "Voc\u00EA faz parte de algum grupo especializado?", "icon", "bi bi-check-circle", "controlName", "gruposEspecializados", "id", "gruposEspecializados", 3, "size", "control", "items"], ["gruposEspecializados", ""], [1, "row", "my-3"], ["label", "Selecione todas as unidades em que j\u00E1 foi lotado", "controlName", "lotacoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["controlName", "selectLotacao", "liveSearch", "", 3, "size", "control", "dao"], ["selectLotacao", ""], ["label", "Lota\u00E7\u00E3o atual", "controlName", "lotacaoAtual", 3, "size", "control", "dao"], ["lotacaoAtual", ""], ["key", "HARD_SKILLS", "label", "Hard Skills", 1, "fw-bold"], [1, "row", "mb-2", "mt-3"], ["title", "Desempenhou atividades externamente e que podem contribuir para a institui\u00E7\u00E3o?", 1, "mb-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeExterna", 3, "size", "label", "control"], ["radioAtividadeExterna", ""], ["controlName", "atividadesDesempenhou", "noBox", "", 3, "size", "hidden", "control", "addItemHandle", "bold"], ["label", "\u00C1rea da Atividade Externa", "controlName", "selectAreaAtividadeExterna", 3, "size", "control", "dao"], ["selectAreaAtividadeExterna", ""], ["title", "Desempenhou atividades internamente que podem contribuir ou contribuiram para a institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeInterna", 3, "size", "label", "control"], ["radioAtividadeInterna", ""], ["label", "", "controlName", "atividadesDesempenhouInterna", "noBox", "", 3, "size", "hidden", "control", "addItemHandle"], ["label", "\u00C1rea Tem\u00E1tica", "controlName", "areaAtividadeInterna", 3, "size", "control", "dao"], ["areaAtividadeInterna", ""], ["label", "Atividade", "icon", "bi bi-arrows-angle-contract", "controlName", "inputAtividadeInterna", 3, "size", "control"], ["title", "Informe as suas habilidades", 1, "mb-3", 3, "bold"], ["controlName", "especifique_habilidades", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Especifique", "icon", "bi bi-list-stars", "controlName", "inputEspecifiqueHabilidade", 3, "size", "control"], ["key", "DOCENCIA", "label", "Doc\u00EAncia", 1, "fw-bold", "mb-3"], ["title", "Voc\u00EA j\u00E1 realizou algum trabalho de doc\u00EAncia fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaFora", 3, "size", "label", "control"], ["radioDocenciaFora", ""], ["label", "", "controlName", "docenciaFora", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Qual/Quais", "icon", "bi bi-mortarboard-fill", "controlName", "inputDocenciaFora", 3, "size", "control"], ["title", "Voc\u00EA \u00E9 docente ou instrutor da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaPRF", 3, "size", "label", "control"], ["radioDocenciaPRF", ""], ["label", "Em qual/quais disciplinas?", "icon", "bi bi-mortarboard-fill", "controlName", "docenciaPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["icon", "bi bi-mortarboard-fill", "controlName", "selectDocenciaInterna", 3, "size", "control", "items"], ["selectDocenciaInterna", ""], ["key", "CURSOS", "label", "Cursos", 1, "fw-bold", "mb-3"], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer na Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursosInternos", 3, "size", "label", "control"], ["radioCursosInternos", ""], ["label", "", "controlName", "cursosInternos", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "\u00C1rea", "controlName", "areaInterna", 3, "size", "control", "dao", "change"], ["areaConhecimento", ""], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "selectCursosInternos", 3, "size", "control", "items"], ["selectCursosInternos", ""], [1, "row", "mb-3"], ["title", "Quais cursos voc\u00EA j\u00E1 fez e quais pretende fazer fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursosExternos", 3, "size", "label", "control"], ["radioCursosExternos", ""], ["label", "", "controlName", "cursosExternos", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "\u00C1rea/Institui\u00E7\u00E3o/Coorpora\u00E7\u00E3o", "controlName", "areaExterna", 3, "size", "control", "dao"], ["areaExterna", ""], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "inputCursosExternos", "liveSearch", "", 3, "size", "control"], ["key", "DISPONIBILIDADE", "label", "Disponibilidade", 1, "fw-bold", "mb-3"], ["title", "Viagens", 1, "mb-3", "mt-3", 3, "bold"], [1, "col-lg-6"], [1, "bi", "bi-flag-fill"], ["labelPosition", "right", "controlName", "radioViajaNacional", 3, "size", "label", "control"], ["radioViajaNacional", ""], [1, "bi", "bi-globe-americas"], ["labelPosition", "right", "controlName", "radioViajaInternacional", 3, "size", "label", "control"], ["radioViajaInternacional", ""], ["title", "Voc\u00EA tem interesse na participa\u00E7\u00E3o do Banco Nacional de Talentos (BNT IN PRF N\u00BA 58 de 27 de agosto de 2021) SEI 35010079?", 1, "my-3", 3, "bold"], ["icon", "bi bi-universal-access", "controlName", "radioInteresseBNT", 3, "size", "label", "control"], ["radioInteresseBNT", ""], ["title", "Voc\u00EA est\u00E1 inserido no programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-calendar2-check", "controlName", "radioProgramaGestao", 3, "size", "label", "control", "change"], ["radioProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioProgramaGestao", 3, "size", "items", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em participar do programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-bookmark-check", "controlName", "radioInteresseProgramaGestao", 3, "size", "label", "control", "change"], ["radioInteresseProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteresseProgramaGestao", 3, "size", "items", 4, "ngIf"], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em remo\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-house-door-fill", "controlName", "radioInteresseRemocao", 3, "size", "label", "control"], ["radioInteresseRemocao", ""], [1, "mb-5"], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioProgramaGestao", 3, "size", "items"], ["escolhaRadioProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteresseProgramaGestao", 3, "size", "items"], ["escolhaInteresseProgramaGestao", ""], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"]],
  template: function CurriculumProfissionalFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("submit", function CurriculumProfissionalFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumProfissionalFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](4, "input-select", 4)(5, "input-select", 5, 6)(7, "input-search", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](9, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](10, "separator", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](11, "input-multiselect", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](12, "input-select", 12, 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](14, "input-select", 14, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](16, "div", 16)(17, "input-multiselect", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](18, "input-search", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](20, "input-search", 20, 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](22, "tab", 22)(23, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](24, "separator", 24)(25, "input-switch", 25, 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](27, "input-multiselect", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](28, "input-search", 28, 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](30, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](31, "separator", 30)(32, "input-switch", 31, 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](34, "input-multiselect", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](35, "input-search", 34, 35)(37, "input-text", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](38, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](39, "separator", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](40, "input-multiselect", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](41, "input-text", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](42, "tab", 40)(43, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](44, "separator", 41)(45, "input-switch", 42, 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](47, "input-multiselect", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](48, "input-text", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](49, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](50, "separator", 46)(51, "input-switch", 47, 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](53, "input-multiselect", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](54, "input-select", 50, 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](56, "tab", 52)(57, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](58, "separator", 53)(59, "input-switch", 54, 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](61, "input-multiselect", 56)(62, "input-search", 57, 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_search_change_62_listener() {
        return ctx.onAreaConhecimentoChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](64, "input-select", 59, 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](66, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](67, "separator", 62)(68, "input-switch", 63, 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](70, "input-multiselect", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](71, "input-search", 66, 67)(73, "input-text", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](74, "tab", 69)(75, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](76, "separator", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](77, "div", 71)(78, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](79, "i", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](80, " J\u00E1 fez viagem nacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](81, "input-switch", 73, 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](83, "div", 71)(84, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](85, "i", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtext"](86, " J\u00E1 fez viagem internacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](87, "input-switch", 76, 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](89, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](90, "separator", 78)(91, "input-switch", 79, 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](93, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](94, "separator", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](95, "input-switch", 82, 83);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_95_listener() {
        return ctx.onChangeEscolhePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](97, CurriculumProfissionalFormComponent_input_radio_97_Template, 2, 2, "input-radio", 84);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](98, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](99, "separator", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](100, "input-switch", 86, 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_100_listener() {
        return ctx.onChangeEscolheInteressePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](102, CurriculumProfissionalFormComponent_input_radio_102_Template, 2, 2, "input-radio", 88);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵtemplate"](103, CurriculumProfissionalFormComponent_input_text_103_Template, 1, 4, "input-text", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementStart"](104, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](105, "separator", 90)(106, "input-switch", 91, 92);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelement"](108, "separator", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](26);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](33);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](46);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](52);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](60);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](69);
      const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](82);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](88);
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](92);
      const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](96);
      const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](101);
      const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵreference"](107);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.ano_ingresso)("items", ctx.anos);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.centro_treinamento)("items", ctx.centroTreinamentoItems);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cargo)("dao", ctx.cargoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.funcoes)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.funcoesOcupadas)("items", ctx.funcoesItems);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.gruposEspecializados)("items", ctx.gruposItems);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotaces)("addItemHandle", ctx.addItemLotacao.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.selectLotacao)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotacaoAtual)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r6.value ? "Sim" : "N\u00E3o")("control", ctx.formAtividadeExterna.controls.radioAtividadeExterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 10)("hidden", !ctx.formAtividadeExterna.controls.radioAtividadeExterna.value)("control", ctx.formAtividadeExterna.controls.atividadesDesempenhou)("addItemHandle", ctx.addItemAtividadeExterna.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.formAtividadeExterna.controls.selectAreaAtividadeExterna)("dao", ctx.areaAtividadeExternaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r8.value ? "Sim" : "N\u00E3o")("control", ctx.formAtividadeInterna.controls.radioAtividadeInterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 10)("hidden", !ctx.formAtividadeInterna.controls.radioAtividadeInterna.value)("control", ctx.formAtividadeInterna.controls.atividadesDesempenhouInterna)("addItemHandle", ctx.addItemAtividadeInterna.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.formAtividadeInterna.controls.areaAtividadeInterna)("dao", ctx.areaTematicaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formAtividadeInterna.controls.inputAtividadeInterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.especifique_habilidades)("addItemHandle", ctx.addItemHabilidades.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.inputEspecifiqueHabilidade);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r10.value ? "Sim" : "N\u00E3o")("control", ctx.formDocenciaExterna.controls.radioDocenciaFora);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("hidden", !ctx.formDocenciaExterna.controls.radioDocenciaFora.value)("size", 8)("control", ctx.formDocenciaExterna.controls.docenciaFora)("addItemHandle", ctx.addItemDocenciaExterna.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formDocenciaExterna.controls.inputDocenciaFora);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r11.value ? "Sim" : "N\u00E3o")("control", ctx.formDocenciaInterna.controls.radioDocenciaPRF);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("hidden", !ctx.formDocenciaInterna.controls.radioDocenciaPRF.value)("size", 8)("control", ctx.formDocenciaInterna.controls.docenciaPRF)("addItemHandle", ctx.addItemDocenciaInterna.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formDocenciaInterna.controls.selectDocenciaInterna)("items", ctx.disciplinasItens2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r13.value ? "Fiz" : "Pretendo")("control", ctx.formCursoInterno.controls.radioCursosInternos);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formCursoInterno.controls.cursosInternos)("addItemHandle", ctx.addItemCursoInterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.formCursoInterno.controls.areaInterna)("dao", ctx.areaConhecimentoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formCursoInterno.controls.selectCursosInternos)("items", ctx.disciplinasItens);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r16.value ? "Fiz" : "Pretendo")("control", ctx.formCursoExterno.controls.radioCursosExternos);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formCursoExterno.controls.cursosExternos)("addItemHandle", ctx.addItemCursoExterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 4)("control", ctx.formCursoExterno.controls.areaExterna)("dao", ctx.areaExternaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 8)("control", ctx.formCursoExterno.controls.inputCursosExternos);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r18.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaNacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 2)("label", _r19.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaInternacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 1)("label", _r20.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseBNT);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 1)("label", _r21.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioProgramaGestao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.form.controls.radioProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 1)("label", _r23.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseProgramaGestao);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteresseProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteresseProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_29__["ɵɵproperty"]("size", 1)("label", _r26.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseRemocao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_30__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_20__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_21__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_22__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_23__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_24__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_25__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_26__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_27__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_28__.SeparatorComponent],
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
/* harmony import */ var src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 92976);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../home/home.component */ 34269);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [
//{ path: '', component: RaioxhomeComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
{
  path: '',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_5__.HomeComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Home Raio-X"
  }
},
//{ path: 'home', component: RaioxhomeComponent, canActivate: [AuthGuard], data: { title: "Home Raio-X" } },
{
  path: 'home',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_5__.HomeComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Home Raio-X"
  }
}, {
  path: 'pessoal',
  component: src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__.CurriculumFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: ""
  }
}, {
  path: 'profissional',
  component: src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: "Dados Profissionais"
  }
}, {
  path: 'big5',
  component: _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: "Teste BIG 5"
  }
}, {
  path: 'cadastros',
  loadChildren: () => __webpack_require__.e(/*! import() */ 64).then(__webpack_require__.bind(__webpack_require__, /*! ../cadastros/curriculum/curriculum-cadastros.module */ 64)).then(m => m.CurriculumCadastrosModule),
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curriculum-routing.module */ 26447);
/* harmony import */ var _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 92976);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;








class CurriculumModule {}
_class = CurriculumModule;
_class.ɵfac = function CurriculumModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](CurriculumModule, {
    declarations: [
    //CurriculumListComponent,
    _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__.CurriculumFormComponent, _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalFormComponent, _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=4515.js.map