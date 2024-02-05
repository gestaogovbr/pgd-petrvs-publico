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
var _class;


class QuestionarioPerguntaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("QuestionarioPergunta", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["sequencia, pergunta, tipo, criado_versao,deletado_versao, respostas, deletedat"];
  }
}
_class = QuestionarioPerguntaDaoService;
_class.ɵfac = function QuestionarioPerguntaDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 54771:
/*!**********************************************************!*\
  !*** ./src/app/dao/questionario-resposta-dao.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaDaoService: () => (/* binding */ QuestionarioRespostaDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class QuestionarioRespostaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("QuestionarioResposta", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["data_respostas, editavel, versao"];
  }
}
_class = QuestionarioRespostaDaoService;
_class.ɵfac = function QuestionarioRespostaDaoService_Factory(t) {
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
  constructor(data) {
    super();
    this.pretensao = 0; //Pretensão de fazer curso caso não tenha
    this.curriculum_id = "";
    this.curso_id = "";
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
    this.historico_funcao = [];
    this.historico_lotacao = []; // Unidades de lotação em toda carreira
    this.historico_atividade_externa = []; //Atividades desempenhadas externamente que podem contribuir para intituição
    this.historico_atividade_interna = []; //Atividades desempenhadas internamente que podem contribuir para intituição
    this.historico_docencia_externa = []; // Já foi docente fora da instituição
    this.historico_docencia_interna = []; // Já foi docente fora da instituição
    this.historico_curso_externo = []; //Quais cursos você já fez e quais pretende fazer fora da Instituição
    this.historico_curso_interno = []; //Quais os principais cursos que você já fez e pretende fazer na Instituição
    this.ano_ingresso = 0; //Ano de ingresso na instituição
    this.lotacao_atual = ""; //Lotação atual do servidor
    this.especifique_habilidades = []; //Atividades desempenhadas internamente que podem contribuir para intituição
    this.viagem_nacional = 0; //Já fez viagem nacional a trabalho
    this.viagem_internacional = 0; //Já fez viagem internacional a trabalho
    this.interesse_bnt = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
    this.pgd_inserido = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
    this.pgd_interesse = ""; //Tem interesse ou não no PGD da instituição e qual modalidade
    this.telefone = ""; // Telefone do chefe imediato caso tenha interesse no PGD
    this.remocao = 0; // Tem interesse em remoção
    this.curriculum_id = ""; //ID Curriculum
    this.centro_treinamento_id = ""; //ID do CT 
    this.cargo_id = ""; //ID do Cargo
    this.grupo_especializado_id = ""; //ID do Grupo Especializado
    this.area_conhecimento_id = "";
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

/***/ 57179:
/*!*************************************************************************!*\
  !*** ./src/app/models/historico-atividade-externa-currriculum.model.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoAtividadeExternaCurriculum: () => (/* binding */ HistoricoAtividadeExternaCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoAtividadeExternaCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.curriculum_profissional_id = '';
    this.area_atividade_externa_id = '';
    this.initialization(data);
  }
}

/***/ }),

/***/ 93410:
/*!*************************************************************************!*\
  !*** ./src/app/models/historico-atividade-interna-currriculum.model.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoAtividadeInternaCurriculum: () => (/* binding */ HistoricoAtividadeInternaCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoAtividadeInternaCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.curriculum_profissional_id = "";
    this.capacidade_tecnica_id = "";
    this.area_tematica_id = "";
    this.atividade_desempenhada = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 58159:
/*!*********************************************************************!*\
  !*** ./src/app/models/historico-curso-externo-currriculum.model.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoCursoExternoCurriculum: () => (/* binding */ HistoricoCursoExternoCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoCursoExternoCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = '';
    this.pretensao = 0;
    this.curriculum_profissional_id = "";
    this.area_atividade_externa_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 65744:
/*!*********************************************************************!*\
  !*** ./src/app/models/historico-curso-interno-currriculum.model.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoCursoInternoCurriculum: () => (/* binding */ HistoricoCursoInternoCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoCursoInternoCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.pretensao = 0;
    this.curriculum_profissional_id = "";
    this.curso_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 41969:
/*!************************************************************************!*\
  !*** ./src/app/models/historico-docencia-externa-currriculum.model.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoDocenciaExternaCurriculum: () => (/* binding */ HistoricoDocenciaExternaCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoDocenciaExternaCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    // public curso?: Curso;
    //public curso_id : string = "";
    this.curriculum_profissional_id = "";
    this.area_atividade_externa_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 25559:
/*!************************************************************************!*\
  !*** ./src/app/models/historico-docencia-interna-currriculum.model.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoDocenciaInternaCurriculum: () => (/* binding */ HistoricoDocenciaInternaCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoDocenciaInternaCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.curriculum_profissional_id = "";
    this.curso_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 88747:
/*!**************************************************************!*\
  !*** ./src/app/models/historico-funcao-currriculum.model.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoFuncaoCurriculum: () => (/* binding */ HistoricoFuncaoCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoFuncaoCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.curriculum_profissional_id = "";
    this.funcao_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 576:
/*!***************************************************************!*\
  !*** ./src/app/models/historico-lotacao-currriculum.model.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoricoLotacaoCurriculum: () => (/* binding */ HistoricoLotacaoCurriculum)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class HistoricoLotacaoCurriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.curriculum_profissional_id = "";
    this.unidade_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 56260:
/*!****************************************************************!*\
  !*** ./src/app/models/questionario-resposta-pergunta.model.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioRespostaPergunta: () => (/* binding */ QuestionarioRespostaPergunta)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class QuestionarioRespostaPergunta extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.resposta = undefined;
    this.questionario_pergunta_id = "";
    this.questionario_resposta_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 86920:
/*!*******************************************************!*\
  !*** ./src/app/models/questionario-resposta.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuestionarioResposta: () => (/* binding */ QuestionarioResposta)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class QuestionarioResposta extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.questionario_resposta_pergunta = [];
    this.data_respostas = new Date(); // data em que o usuario respondeu
    this.editavel = 1; //se é possivel editar a resposta
    this.versao = 0; //versao do questionario respondido
    this.usuario_id = "";
    this.questionario_id = "";
    this.initialization(data);
  }
}

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
























const _c0 = ["quantidade_filhos"];
const _c1 = ["area"];
const _c2 = ["estados"];
const _c3 = ["curso"];
const _c4 = ["idiomas"];
const _c5 = ["municipio"];
function CurriculumFormComponent_grid_22_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r36 = ctx.row;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r21.lookup.getValue(ctx_r21.lookup.IDIOMAS, row_r36.idioma), " ");
  }
}
function CurriculumFormComponent_grid_22_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 47);
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r23.lookup.IDIOMAS);
  }
}
function CurriculumFormComponent_grid_22_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r38 = ctx.row;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r25.lookup.getValue(ctx_r25.lookup.NIVEL_IDIOMA, row_r38.idiomaFala), " ");
  }
}
function CurriculumFormComponent_grid_22_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 48);
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r27.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_22_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r40 = ctx.row;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r29.lookup.getValue(ctx_r29.lookup.NIVEL_IDIOMA, row_r40.idiomaEscrita), " ");
  }
}
function CurriculumFormComponent_grid_22_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 49);
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r31.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_22_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r42 = ctx.row;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r33.lookup.getValue(ctx_r33.lookup.NIVEL_IDIOMA, row_r42.idiomaEntendimento), " ");
  }
}
function CurriculumFormComponent_grid_22_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 50);
  }
  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("items", ctx_r35.lookup.NIVEL_IDIOMA);
  }
}
function CurriculumFormComponent_grid_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "grid", 34)(1, "columns")(2, "column", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](3, CurriculumFormComponent_grid_22_ng_template_3_Template, 1, 1, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](5, CurriculumFormComponent_grid_22_ng_template_5_Template, 1, 2, "ng-template", null, 37, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "column", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](8, CurriculumFormComponent_grid_22_ng_template_8_Template, 1, 1, "ng-template", null, 39, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](10, CurriculumFormComponent_grid_22_ng_template_10_Template, 1, 2, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "column", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](13, CurriculumFormComponent_grid_22_ng_template_13_Template, 1, 1, "ng-template", null, 42, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](15, CurriculumFormComponent_grid_22_ng_template_15_Template, 1, 2, "ng-template", null, 43, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](17, "column", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](18, CurriculumFormComponent_grid_22_ng_template_18_Template, 1, 1, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](20, CurriculumFormComponent_grid_22_ng_template_20_Template, 1, 2, "ng-template", null, 46, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](22, "column", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](4);
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](6);
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](9);
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](11);
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](14);
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](16);
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](19);
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](21);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("control", ctx_r3.form.controls.idiomas)("minHeight", 100)("form", ctx_r3.formIdiomaGrid)("hasDelete", true)("add", ctx_r3.addIdiomas.bind(ctx_r3))("load", ctx_r3.loadIdiomas.bind(ctx_r3))("remove", ctx_r3.removeIdiomas.bind(ctx_r3))("save", ctx_r3.saveIdiomas.bind(ctx_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r20)("editTemplate", _r22);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r24)("editTemplate", _r26);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r28)("editTemplate", _r30);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r32)("editTemplate", _r34);
  }
}
function CurriculumFormComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r44 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r44.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumFormComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-switch", 51);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("label", ctx_r7.formGraduacao.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r7.formGraduacao.controls.pretensao);
  }
}
function CurriculumFormComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r46 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r46.curso.area_conhecimento.nome, " ");
  }
}
function CurriculumFormComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-search", 52, 53);
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("dao", ctx_r11.areaDao)("control", ctx_r11.formGraduacao.controls.area_conhecimento_id);
  }
}
function CurriculumFormComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r49 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r13.lookup.getValue(ctx_r13.lookup.TITULOS_CURSOS, row_r49.curso.titulo), " ");
  }
}
function CurriculumFormComponent_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "input-select", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumFormComponent_ng_template_41_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r51.onAreaConhecimentoChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx_r15.formGraduacao.controls.titulo)("items", ctx_r15.lookup.TITULOS_CURSOS);
  }
}
function CurriculumFormComponent_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r53 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r53.curso.nome, " ");
  }
}
const _c6 = function () {
  return ["raiox", "cadastros", "curso", "new"];
};
const _c7 = function (a0) {
  return {
    route: a0
  };
};
function CurriculumFormComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "input-select", 55, 56);
  }
  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("control", ctx_r19.formGraduacao.controls.curso_id)("dao", ctx_r19.cursoDao)("where", ctx_r19.cursoWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](6, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction0"](5, _c6)));
  }
}
const _c8 = function (a2) {
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
    this.show = true;
    this.validate = (control, controlName) => {
      let result = null;
      /*if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
        result = "Valor não pode ser zero.";
      }*/
      return result;
    };
    this.join = ['graduacoes.curso.area_conhecimento'];
    //super(injector,Curso, CursoDaoService)
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_3__.CidadeDaoService);
    this.areaDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_4__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_5__.CursoDaoService);
    this.curriculumGraduacaoDAO = injector.get(src_app_dao_curriculum_graduacao_service__WEBPACK_IMPORTED_MODULE_8__.CurriculumGraduacaoDaoService);
    this.form = this.fh.FormBuilder({
      id: {
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
      idiomas: {
        default: []
      },
      ativo: {
        default: true
      },
      graduacoes: {
        default: []
      }
    }, this.cdRef, this.validate);
    this.formGraduacao = this.fh.FormBuilder({
      curso_id: {
        default: ""
      },
      area_conhecimento_id: {
        default: ""
      },
      pretensao: {
        default: 0
      },
      titulo: {
        default: ""
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
      curriculuns?.length ? _this2.id = curriculuns[0].id : _this2.id = "";
      const cidade = entity.cidade_id != '' ? yield _this2.cidadeDao?.getById(entity.cidade_id) : null;
      console.log('CIDADE', cidade);
      //this.form?.controls.estados.setValue(this.lookup.UF.find(x => x.key == 'AM'));//cidade.uf));
      let uf = _this2.lookup.getLookup(_this2.lookup.UF, cidade?.uf);
      _this2.form?.controls.estados.setValue(uf?.key); //cidade.uf));
      entity.quantidade_filhos > 0 ? _this2.form?.controls.filhos.setValue(true) : _this2.form?.controls.filhos.setValue(false);
      const municipio = _this2.lookup.UF.find(x => x.key == cidade?.uf);
      entity.idiomas.length > 0 ? _this2.form?.controls.radioFalaIdioma.setValue(true) : _this2.form?.controls.radioFalaIdioma.setValue(false);
      yield _this2.loadData(entity, _this2.form);
    })();
  }
  saveData(form) {
    //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
    //console.log('FORMULARIO', this.form!.value)
    return new Promise((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__.Curriculum(), this.entity);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum.id = this.id;
      // curriculum.quantidade_filhos == "" ? (curriculum.quantidade_filhos = 0) : (curriculum.quantidade_filhos = 2);
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      curriculum.cidade_id = "86297f92-d919-e12f-476d-6aff99c46809";
      //curriculum.graduacoes = this.formGraduacao!.controls.graduacoes.value.map((x: any) => Object.assign({},{curso_id:x.data.curso , pretensao:x.data.pretensao}));
      curriculum.graduacoes = this.form.controls.graduacoes.value.filter(x => x._status?.length);
      resolve(curriculum);
    });
  }
  onEstadosChange() {
    //console.log('onEstadosChange', this.form?.controls.estados)
    //const estados = this.estadosV!.value;
    this.show = false;
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
    this.show = true;
  }
  onAreaConhecimentoChange() {
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
    this.cursoWhere = [['area_id', '==', this.formGraduacao.controls.area_conhecimento_id.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
    this.cdRef.detectChanges();
  }
  /**
   * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
   * @param form
   * @param row
   * @returns
  
   */
  addIdiomas() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_curriculum_idioma_model__WEBPACK_IMPORTED_MODULE_10__.CurriculumIdioma();
    })();
  }
  loadIdiomas(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.formIdiomaGrid.controls.idioma.setValue(row.idioma);
      _this3.formIdiomaGrid.controls.idiomaFala.setValue(row.idiomaFala);
      _this3.formIdiomaGrid.controls.idiomaEscrita.setValue(row.idiomaEscrita);
      _this3.formIdiomaGrid.controls.idiomaEntendimento.setValue(row.idiomaEntendimento);
    })();
  }
  removeIdiomas(row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this4.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
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
      return new src_app_models_currriculum_graduacao_model__WEBPACK_IMPORTED_MODULE_9__.CurriculumGraduacao({
        _status: "ADD"
      });
    })();
  }
  saveGraduacao(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.pretensao = values.pretensao;
      row.curso_id = values.curso_id;
      row.curso = this.curso?.selectedItem?.data;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadGraduacao(form, row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      _this5.area?.setValue(row.curso?.area_id);
      _this5.formGraduacao.controls.area_conhecimento_id.setValue(row.curso?.area_id);
      _this5.formGraduacao.controls.pretensao.setValue(row.pretensao);
      _this5.formGraduacao.controls.titulo.setValue(row.curso?.titulo);
      _this5.formGraduacao.controls.curso_id.setValue(row.curso_id);
    })();
  }
  removeGraduacao(row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this6.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  qtdeFilhosOnChange() {
    if (this.form.controls.quantidade_filhos?.value == "") {
      this.form.controls.quantidade_filhos.setValue(0);
      this.form?.controls.filhos.setValue(false);
    }
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
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](_c5, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.quantidade_filhos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.area = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.estadosV = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.curso = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.idiomasM = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.municipioV = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵInheritDefinitionFeature"]],
  decls: 49,
  vars: 48,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "Apresente-se", "icon", "bi-card-list", "controlName", "apresentacao", 3, "size", "bold", "control"], ["title", "Dados Residenciais"], [1, "row", "mt-2"], ["label", "Estado", "icon", "fas fa-flag", "controlName", "estados", 3, "size", "control", "items"], ["estados", ""], ["label", "Munic\u00EDpio", "icon", "far fa-flag", "controlName", "cidade_id", 3, "size", "control", "dao", "where"], ["municipio", ""], ["label", "Telefone de contato WhatsAPP", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"], ["title", "Estado Civil"], ["label", "Estado Civil", "icon", "fas fa-ring", "controlName", "estado_civil", 3, "size", "control", "items"], ["label", "Possui Filhos?", "icon", "fas fa-child", "controlName", "filhos", 3, "size", "control"], ["label", "Quantos?", "icon", "bi bi-arrow-up-right-circle", "controlName", "quantidade_filhos", 3, "hidden", "size", "control", "minValue", "change"], ["qtdefilhos", ""], ["title", "Idiomas", 3, "click"], ["label", "Fala outros idiomas?", "icon", "fas fa-language", "controlName", "radioFalaIdioma", 3, "size", "control"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save", 4, "ngIf"], ["title", "Gradua\u00E7\u00E3o e P\u00F3s-Gradua\u00E7\u00E3o - Especializa\u00E7\u00E3o, Mestrado, Doutorado e P\u00F3s Doutorado", 3, "click"], [1, "row", "my-3"], ["editable", "", 3, "minHeight", "form", "control", "hasDelete", "add", "load", "remove", "save"], ["title", "Pretende Cursar?", "titleHint", "Pretende cursar ou j\u00E1 esta concluido.", 3, "template", "editTemplate"], ["columnPretende", ""], ["editPretende", ""], ["title", "\u00C1rea do Conhecimento", "titleHint", "colha a \u00C1rea de conhecimento.", 3, "template", "editTemplate"], ["columnArea", ""], ["editArea", ""], ["title", "T\u00EDtulo", "titleHint", "Qual a titula\u00E7\u00E3o que se refere ao curso.", 3, "template", "editTemplate"], ["columnTitulo", ""], ["editTitulo", ""], ["title", "Curso", "titleHint", "Escolha o curso.", 3, "template", "editTemplate"], ["columnCurso", ""], ["editCurso", ""], ["type", "options"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["title", "Idioma", "titleHint", "Escolha o idioma.", 3, "template", "editTemplate"], ["columnIdioma", ""], ["editIdioma", ""], ["title", "N\u00EDvel de fala", "titleHint", "Escolha o seu n\u00EDvel de fala.", 3, "template", "editTemplate"], ["columnNivelFala", ""], ["editNivelFala", ""], ["title", "N\u00EDvel de escrita", "titleHint", "Escolha o seu n\u00EDvel de escrita.", 3, "template", "editTemplate"], ["columnNivelEscrita", ""], ["editNivelEscrita", ""], ["title", "N\u00EDvel de entendimento", "titleHint", "Escolha o seu n\u00EDvel de entendimento.", 3, "template", "editTemplate"], ["columnNivelEntendimento", ""], ["editNivelEntendimento", ""], ["label", "", "icon", "", "controlName", "idioma", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaFala", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaEscrita", 3, "size", "items"], ["label", "", "icon", "", "controlName", "idiomaEntendimento", 3, "size", "items"], ["icon", "fas fa-user-graduate", "controlName", "pretensao", 3, "size", "label", "control"], ["label", "\u00C1rea de conhecimento", "controlName", "area_conhecimento_id", 3, "size", "dao", "control"], ["area", ""], ["label", "Titulo", "icon", "bi bi-mortarboard-fill", "controlName", "titulo", "liveSearch", "", 3, "size", "control", "items", "change"], ["label", "Curso", "icon", "fas fa-graduation-cap", "controlName", "curso_id", "fullEntity", "", "liveSearch", "", 3, "size", "control", "dao", "where", "addRoute"], ["curso", ""]],
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
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](14, "input-select", 11)(15, "input-switch", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](16, "input-number", 13, 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumFormComponent_Template_input_number_change_16_listener() {
        return ctx.qtdeFilhosOnChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](18, "div", 1)(19, "separator", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CurriculumFormComponent_Template_separator_click_19_listener() {
        return ctx.togglePopOver();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](20, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](21, "input-switch", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](22, CurriculumFormComponent_grid_22_Template, 23, 16, "grid", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](23, "div", 1)(24, "separator", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CurriculumFormComponent_Template_separator_click_24_listener() {
        return ctx.togglePopOver();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](25, "div", 19)(26, "grid", 20)(27, "columns")(28, "column", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](29, CurriculumFormComponent_ng_template_29_Template, 1, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](31, CurriculumFormComponent_ng_template_31_Template, 1, 3, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](33, "column", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](34, CurriculumFormComponent_ng_template_34_Template, 1, 1, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](36, CurriculumFormComponent_ng_template_36_Template, 2, 3, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](38, "column", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](39, CurriculumFormComponent_ng_template_39_Template, 1, 1, "ng-template", null, 28, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](41, CurriculumFormComponent_ng_template_41_Template, 1, 3, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](43, "column", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](44, CurriculumFormComponent_ng_template_44_Template, 1, 1, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](46, CurriculumFormComponent_ng_template_46_Template, 2, 8, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](48, "column", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](30);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](32);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](35);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](37);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](40);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](42);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](45);
      const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](47);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("bold", true)("control", ctx.form.controls.apresentacao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.estados)("items", ctx.lookup.UF);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cidade_id)("dao", ctx.cidadeDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](46, _c8, ctx.form.controls.estados.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.estado_civil)("items", ctx.lookup.ESTADO_CIVIL);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.filhos);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("hidden", ctx.form.controls.filhos.value ? undefined : "true")("size", 1)("control", ctx.form.controls.quantidade_filhos)("minValue", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵattribute"]("min", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.radioFalaIdioma);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.form.controls.radioFalaIdioma.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("minHeight", 150)("form", ctx.formGraduacao)("control", ctx.form.controls.graduacoes)("hasDelete", true)("add", ctx.addGraduacao.bind(ctx))("load", ctx.loadGraduacao.bind(ctx))("remove", ctx.removeGraduacao.bind(ctx))("save", ctx.saveGraduacao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r4)("editTemplate", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r8)("editTemplate", _r10);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r12)("editTemplate", _r14);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r16)("editTemplate", _r18);
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
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/centro-treinamento-dao.service */ 57565);
/* harmony import */ var src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/grupo-especializado-dao.service */ 51353);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/currriculum-profissional.model */ 46722);
/* harmony import */ var src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/curriculum-profissional-dao.service */ 60978);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ 88631);
/* harmony import */ var src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/dao/curriculum-dao.service */ 39910);
/* harmony import */ var src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/dao/cargo-dao.service */ 99255);
/* harmony import */ var src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/dao/area-tematica-dao.service */ 88653);
/* harmony import */ var src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/dao/area-atividade-externa-dao.service */ 14710);
/* harmony import */ var src_app_dao_materia_dao_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/dao/materia-dao.service */ 35871);
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ 34406);
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ 24997);
/* harmony import */ var src_app_models_historico_atividade_interna_currriculum_model__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/models/historico-atividade-interna-currriculum.model */ 93410);
/* harmony import */ var src_app_models_historico_lotacao_currriculum_model__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/models/historico-lotacao-currriculum.model */ 576);
/* harmony import */ var src_app_models_historico_funcao_currriculum_model__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/app/models/historico-funcao-currriculum.model */ 88747);
/* harmony import */ var src_app_models_historico_atividade_externa_currriculum_model__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/models/historico-atividade-externa-currriculum.model */ 57179);
/* harmony import */ var src_app_models_historico_docencia_externa_currriculum_model__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/app/models/historico-docencia-externa-currriculum.model */ 41969);
/* harmony import */ var src_app_models_historico_docencia_interna_currriculum_model__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/app/models/historico-docencia-interna-currriculum.model */ 25559);
/* harmony import */ var src_app_models_historico_curso_interno_currriculum_model__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/models/historico-curso-interno-currriculum.model */ 65744);
/* harmony import */ var src_app_models_historico_curso_externo_currriculum_model__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/models/historico-curso-externo-currriculum.model */ 58159);
/* harmony import */ var src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! src/app/dao/capacidade-tecnica-dao.service */ 53399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);

var _class;










































const _c0 = ["radioDocenciaExterna"];
const _c1 = ["radioDocenciaInterna"];
const _c2 = ["radioCursosInternos"];
const _c3 = ["radioCursosExternos"];
const _c4 = ["radioInteresseBNT"];
const _c5 = ["radioProgramaGestao"];
const _c6 = ["radioInteresseProgramaGestao"];
const _c7 = ["radioInteresseRemocao"];
const _c8 = ["radioViajemNacional"];
const _c9 = ["radioViajemInternacional"];
const _c10 = ["escolhaRadioProgramaGestao"];
const _c11 = ["escolhaInteresseProgramaGestao"];
const _c12 = ["funcao"];
const _c13 = ["unidade"];
const _c14 = ["lotacaoAtual"];
const _c15 = ["gruposEspecializados"];
const _c16 = ["centroTreinamento"];
const _c17 = ["cargos"];
const _c18 = ["selecionaLotacao"];
const _c19 = ["areaAtividadeExterna"];
const _c20 = ["areaAtividadeExternaDocencia"];
const _c21 = ["areaCursoInterno"];
const _c22 = ["areaCursoExterno"];
const _c23 = ["cursoDocenciaInterna"];
const _c24 = ["historicoCursoInterno"];
const _c25 = ["areaHistoricoCursoExterno"];
const _c26 = ["areaAtividadeInterna"];
const _c27 = ["selectDocenciaInterna"];
const _c28 = ["selectCursosInternos"];
const _c29 = ["areaTematica"];
const _c30 = ["capacidadeTecnica"];
function CurriculumProfissionalFormComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r49 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r49.funcao.nome, " ");
  }
}
const _c31 = function () {
  return ["raiox", "cadastros", "funcao", "new"];
};
const _c32 = function (a0) {
  return {
    route: a0
  };
};
function CurriculumProfissionalFormComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 83, 84);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("dao", ctx_r5.funcaoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c31)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r52 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r52.unidade.nome, " ");
  }
}
const _c33 = function () {
  return ["historico_lotacao"];
};
function CurriculumProfissionalFormComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 85, 86);
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("dao", ctx_r10.unidadeDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c33));
  }
}
function CurriculumProfissionalFormComponent_grid_40_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r59 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r59.area_atividade_externa.nome, " ");
  }
}
const _c34 = function () {
  return ["historico_atividade_externa", "historico_curso_externo", "historico_docencia_externa"];
};
const _c35 = function () {
  return ["raiox", "cadastros", "areaatividadeexterna", "new"];
};
function CurriculumProfissionalFormComponent_grid_40_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 90, 91);
  }
  if (rf & 2) {
    const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("dao", ctx_r58.areaAtividadeExternaDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c34))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](6, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](5, _c35)));
  }
}
function CurriculumProfissionalFormComponent_grid_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_40_ng_template_3_Template, 1, 1, "ng-template", null, 88, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_40_ng_template_5_Template, 2, 8, "ng-template", null, 89, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r13.form.controls.historico_atividade_externa)("minHeight", 150)("form", ctx_r13.formHistoricoAtividadeExternaGrid)("hasDelete", true)("add", ctx_r13.addHistoricoAtividadeExterna.bind(ctx_r13))("load", ctx_r13.loadHistoricoAtividadeExterna.bind(ctx_r13))("remove", ctx_r13.removeHistoricoAtividadeExterna.bind(ctx_r13))("save", ctx_r13.saveHistoricoAtividadeExterna.bind(ctx_r13));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r55)("editTemplate", _r57);
  }
}
function CurriculumProfissionalFormComponent_grid_45_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r74 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r74.capacidade_tecnica.area_tematica.nome, " ");
  }
}
const _c36 = function () {
  return ["capacidade_tecnica"];
};
const _c37 = function () {
  return ["raiox", "cadastros", "areatematica", "new"];
};
function CurriculumProfissionalFormComponent_grid_45_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r78 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "input-search", 101, 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_grid_45_ng_template_5_Template_input_search_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵrestoreView"](_r78);
      const ctx_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵresetView"](ctx_r77.onAreaAtividadeInternaChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r65.areaTematicaDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c36))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](6, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](5, _c37)));
  }
}
function CurriculumProfissionalFormComponent_grid_45_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r79 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r79.capacidade_tecnica.nome, " ");
  }
}
const _c38 = function () {
  return ["raiox", "cadastros", "capacidadetecnica", "new"];
};
function CurriculumProfissionalFormComponent_grid_45_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 103, 104);
  }
  if (rf & 2) {
    const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r69.capacidadeTecnicaDao)("where", ctx_r69.areaTematicaWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](5, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c38)));
  }
}
function CurriculumProfissionalFormComponent_grid_45_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r82 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r82.atividade_desempenhada, " ");
  }
}
function CurriculumProfissionalFormComponent_grid_45_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 105);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4);
  }
}
function CurriculumProfissionalFormComponent_grid_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_45_ng_template_3_Template, 1, 1, "ng-template", null, 93, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_45_ng_template_5_Template, 2, 8, "ng-template", null, 94, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](7, "column", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](8, CurriculumProfissionalFormComponent_grid_45_ng_template_8_Template, 1, 1, "ng-template", null, 96, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](10, CurriculumProfissionalFormComponent_grid_45_ng_template_10_Template, 2, 7, "ng-template", null, 97, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](12, "column", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](13, CurriculumProfissionalFormComponent_grid_45_ng_template_13_Template, 1, 1, "ng-template", null, 99, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](15, CurriculumProfissionalFormComponent_grid_45_ng_template_15_Template, 1, 1, "ng-template", null, 100, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](17, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const _r66 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](9);
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](11);
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](14);
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](16);
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r15.form.controls.historico_atividade_interna)("minHeight", 150)("form", ctx_r15.formHistoricoAtividadeInternaGrid)("hasDelete", true)("add", ctx_r15.addHistoricoAtividadeInterna.bind(ctx_r15))("load", ctx_r15.loadHistoricoAtividadeInterna.bind(ctx_r15))("remove", ctx_r15.removeHistoricoAtividadeInterna.bind(ctx_r15))("save", ctx_r15.saveHistoricoAtividadeInterna.bind(ctx_r15));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r62)("editTemplate", _r64);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r66)("editTemplate", _r68);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r70)("editTemplate", _r72);
  }
}
function CurriculumProfissionalFormComponent_grid_55_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r88 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r88.area_atividade_externa.nome, " ");
  }
}
function CurriculumProfissionalFormComponent_grid_55_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 109, 110);
  }
  if (rf & 2) {
    const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r87.areaAtividadeExternaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c35)));
  }
}
function CurriculumProfissionalFormComponent_grid_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_55_ng_template_3_Template, 1, 1, "ng-template", null, 107, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_55_ng_template_5_Template, 2, 6, "ng-template", null, 108, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r84 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r86 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r17.form.controls.historico_docencia_externa)("minHeight", 150)("form", ctx_r17.formHistoricoDocenciaExternaGrid)("hasDelete", true)("add", ctx_r17.addHistoricoDocenciaExterna.bind(ctx_r17))("load", ctx_r17.loadHistoricoDocenciaExterna.bind(ctx_r17))("remove", ctx_r17.removeHistoricoDocenciaExterna.bind(ctx_r17))("save", ctx_r17.saveHistoricoDocenciaExterna.bind(ctx_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r84)("editTemplate", _r86);
  }
}
function CurriculumProfissionalFormComponent_grid_60_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r95 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r95.curso.nome, " ");
  }
}
const _c39 = function () {
  return ["titulo", "==", "INSTITUCIONAL"];
};
const _c40 = function (a0) {
  return [a0];
};
const _c41 = function () {
  return ["raiox", "cadastros", "curso", "new"];
};
function CurriculumProfissionalFormComponent_grid_60_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 114, 115);
  }
  if (rf & 2) {
    const ctx_r94 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 3)("control", ctx_r94.form.controls.curso_id)("dao", ctx_r94.cursoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](6, _c40, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](5, _c39)))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](9, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](8, _c41)));
  }
}
function CurriculumProfissionalFormComponent_grid_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_60_ng_template_3_Template, 1, 1, "ng-template", null, 112, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_60_ng_template_5_Template, 2, 11, "ng-template", null, 113, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r91 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r93 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r19.form.controls.historico_docencia_interna)("minHeight", 150)("form", ctx_r19.formHistoricoDocenciaInternaGrid)("hasDelete", true)("add", ctx_r19.addHistoricoDocenciaInterna.bind(ctx_r19))("load", ctx_r19.loadHistoricoDocenciaInterna.bind(ctx_r19))("remove", ctx_r19.removeHistoricoDocenciaInterna.bind(ctx_r19))("save", ctx_r19.saveHistoricoDocenciaInterna.bind(ctx_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r91)("editTemplate", _r93);
  }
}
function CurriculumProfissionalFormComponent_ng_template_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r98 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r98.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_69_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-switch", 116);
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", ctx_r23.formHistoricoCursoInternoGrid.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r23.form.controls.pretensao);
  }
}
function CurriculumProfissionalFormComponent_ng_template_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r100 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r100.curso.nome, " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 117, 118);
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 3)("dao", ctx_r27.cursoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](5, _c40, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c39)))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](8, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](7, _c41)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_82_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r103 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r103.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_84_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-switch", 116);
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", ctx_r31.formHistoricoCursoExternoGrid.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r31.formHistoricoCursoExternoGrid.controls.pretensao);
  }
}
function CurriculumProfissionalFormComponent_ng_template_87_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r105 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r105.area_atividade_externa.nome, " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 119, 120);
  }
  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r35.areaAtividadeExternaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c35)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_92_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r108 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r108.nome, " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_94_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 121);
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 8)("control", ctx_r39.formHistoricoCursoExternoGrid.controls.nome);
  }
}
function CurriculumProfissionalFormComponent_input_radio_120_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-radio", 122, 123);
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("items", ctx_r44.lookup.PG_PRF)("control", ctx_r44.form.controls.pgd_inserido);
  }
}
function CurriculumProfissionalFormComponent_input_radio_125_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-radio", 124, 125);
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("items", ctx_r46.lookup.PG_PRF)("control", ctx_r46.form.controls.pgd_interesse);
  }
}
function CurriculumProfissionalFormComponent_input_text_126_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 126);
  }
  if (rf & 2) {
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx_r47.form.controls.telefone)("maskFormat", "(00) 0000-0000 || (00) 0 0000-0000");
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵattribute"]("maxlength", 250);
  }
}
const _c42 = function () {
  return ["raiox", "cadastros", "centrotreinamento", "new"];
};
const _c43 = function () {
  return ["raiox", "cadastros", "grupoespecializado", "new"];
};
class CurriculumProfissionalFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_2__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_8__.CurriculumProfissional, src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_9__.CurriculumProfissionalDaoService);
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
    this.areaTematicaWhere = [["id", "==", null]];
    this.curriculumID = "";
    this.curriculuns = [];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso', 'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso', 'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao', 'historico_lotacao.unidade', 'curriculum'];
    this.curriculumDao = injector.get(src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_12__.CurriculumDaoService);
    this.userDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_10__.UsuarioDaoService);
    this.lotacaoDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_11__.UnidadeIntegranteDaoService);
    this.centroTreinamentoDao = injector.get(src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_5__.CentroTreinamentoDaoService);
    this.funcaoDao = injector.get(src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_4__.FuncaoDaoService);
    this.grupoDao = injector.get(src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_6__.GrupoEspecializadoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeDaoService);
    this.cargoDao = injector.get(src_app_dao_cargo_dao_service__WEBPACK_IMPORTED_MODULE_13__.CargoDaoService);
    this.areaTematicaDao = injector.get(src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_14__.AreaTematicaDaoService);
    this.areaAtividadeExternaDao = injector.get(src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_15__.AreaAtividadeExternaDaoService);
    this.materiaDao = injector.get(src_app_dao_materia_dao_service__WEBPACK_IMPORTED_MODULE_16__.MateriaDaoService);
    this.areaConhecimentoDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_18__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_17__.CursoDaoService);
    this.areaExternaDao = injector.get(src_app_dao_area_atividade_externa_dao_service__WEBPACK_IMPORTED_MODULE_15__.AreaAtividadeExternaDaoService);
    this.capacidadeTecnicaDao = injector.get(src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_27__.CapacidadeTecnicaDaoService);
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
      radioViajemNacional: {
        default: false
      },
      radioViajemInternacional: {
        default: false
      },
      radioAtividadeExterna: {
        default: false
      },
      radioAtividadeInterna: {
        default: false
      },
      radioDocenciaExterna: {
        default: false
      },
      radioDocenciaInterna: {
        default: false
      },
      radioCursoExterno: {
        default: false
      },
      escolhaInteresseProgramaGestao: {
        default: ""
      },
      escolhaRadioProgramaGestao: {
        default: ""
      },
      inputEspecifiqueHabilidade: {
        default: ""
      },
      especifique_habilidades: {
        default: []
      },
      historico_funcao: {
        default: []
      },
      historico_lotacao: {
        default: []
      },
      historico_atividade_externa: {
        default: []
      },
      historico_atividade_interna: {
        default: []
      },
      historico_docencia_externa: {
        default: []
      },
      historico_docencia_interna: {
        default: []
      },
      historico_curso_interno: {
        default: []
      },
      historico_curso_externo: {
        default: []
      },
      ano_ingresso: {
        default: false
      },
      telefone: {
        default: ""
      },
      lotacao_atual: {
        default: ""
      },
      selecionaLotacao: {
        default: ""
      },
      viagem_nacional: {
        default: false
      },
      viagem_internacional: {
        default: false
      },
      interesse_bnt: {
        default: false
      },
      remocao: {
        default: false
      },
      pgd_inserido: {
        default: ""
      },
      pgd_interesse: {
        default: ""
      },
      centro_treinamento_id: {
        default: ""
      },
      cargo_id: {
        default: ""
      },
      grupo_especializado_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoFuncaoGrid = this.fh.FormBuilder({
      funcao_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoLotacaoGrid = this.fh.FormBuilder({
      unidade_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoAtividadeExternaGrid = this.fh.FormBuilder({
      area_atividade_externa_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoAtividadeInternaGrid = this.fh.FormBuilder({
      areaAtividadeInterna: {
        default: ""
      },
      inputAtividadeInterna: {
        default: ""
      },
      area_tematica_id: {
        default: ""
      },
      capacidade_tecnica_id: {
        default: ""
      },
      atividade_desempenhada: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoDocenciaExternaGrid = this.fh.FormBuilder({
      area_atividade_externa_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoDocenciaInternaGrid = this.fh.FormBuilder({
      curso_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formHistoricoCursoInternoGrid = this.fh.FormBuilder({
      radioPretensaoHistoricoCursoInterno: {
        default: false
      },
      curso_id: {
        default: ""
      },
      pretensao: {
        default: 0
      }
    }, this.cdRef, this.validate);
    this.formHistoricoCursoExternoGrid = this.fh.FormBuilder({
      area_atividade_externa_id: {
        default: ""
      },
      pretensao: {
        default: 0
      },
      nome: {
        default: ""
      }
    }, this.cdRef, this.validate);
  }
  ngOnInit() {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.curriculuns = await this.curriculumDao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id]}).asPromise();
      _this.curriculumDao?.query({
        where: [['usuario_id', '==', _this.auth.usuario?.id]]
      }).getAllIds().then(x => {
        console.log('X CURRICULUM ID', x.rows[0].id);
        if (x.rows?.length) {
          _this.curriculumID = x.rows[0].id;
        } else {
          _this.dialog.confirm("Preencher dados pessoais", "É necessário preencher dados pessoais");
        }
      });
      // console.log(this.curriculuns)  
      for (let i = 1980; i <= new Date().getFullYear(); i++) {
        _this.anos.push(Object.assign({}, {
          key: i,
          value: i.toString()
        }));
      }
      _this.lotacaoAtual?.setValue(_this.auth.unidade?.id);
      const userUnidade = _this.auth.unidade;
      console.log('userUnidade', userUnidade);
      //this.cursoDao?.query({ where: [['nome', '==', 'Curso Institucional']]}).g().then((municipios) => {
      // this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      //});
    })();
  }

  loadData(entity, form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      /*let lookups = await this.curriculumDao.lookupsCurriculum();
      this.unidadesItems = lookups.unidades;
      this.funcoesItems = lookups.funcoes;
      this.gruposItems = lookups.grupos;
      this.centroTreinamentoItems = lookups.ct;
      this.cargosItems = lookups.cargos;
      this.lotacaoAtual!.loadSearch(this.auth.lotacao);
      //let institucional_id = await this.cursoDao.idInstitucional();*/
      _this2.materiaDao?.query({
        where: [[]],
        orderBy: [['nome', 'asc']]
      }).getAll().then(materias => {
        _this2.disciplinasItens2 = materias.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome
        }));
      });
      _this2.cursoDao?.query({
        where: [['titulo', '==', 'INSTITUCIONAL']],
        orderBy: [['nome', 'asc']]
      }).getAll().then(materias => {
        _this2.cursosItens = materias.map(x => Object.assign({}, {
          key: x.id,
          value: x.nome
        }));
      });
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this2.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const curriculunsProfissional = yield _this3.dao?.query({
        where: ['curriculum_id', '==', _this3.curriculumID],
        join: _this3.join
      }).asPromise();
      let entity = curriculunsProfissional?.length ? curriculunsProfissional[0] : new src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_8__.CurriculumProfissional(); //this.entity
      curriculunsProfissional?.length ? _this3.id = curriculunsProfissional[0].id : _this3.id = "";
      entity.historico_atividade_interna.length > 0 ? _this3.form?.controls.radioAtividadeInterna.setValue(true) : _this3.form?.controls.radioAtividadeInterna.setValue(false);
      entity.historico_atividade_externa.length > 0 ? _this3.form?.controls.radioAtividadeExterna.setValue(true) : _this3.form?.controls.radioAtividadeExterna.setValue(false);
      entity.historico_docencia_interna.length > 0 ? _this3.form?.controls.radioDocenciaInterna.setValue(true) : _this3.form?.controls.radioDocenciaInterna.setValue(false);
      entity.historico_docencia_externa.length > 0 ? _this3.form?.controls.radioDocenciaExterna.setValue(true) : _this3.form?.controls.radioDocenciaExterna.setValue(false);
      yield _this3.loadData(entity, _this3.form);
    })();
  }
  saveData(form) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const curriculuns = yield _this4.curriculumDao?.query({
        where: [['usuario_id', '==', _this4.auth.usuario?.id]]
      }).asPromise();
      return new Promise((resolve, reject) => {
        // this.entity!.usuario_id=this.auth.usuario!.id;
        let curriculumProfissional = _this4.util.fill(new src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_8__.CurriculumProfissional(), _this4.entity);
        //curriculum.usuario_id=this.auth.usuario?.id;
        curriculumProfissional = _this4.util.fillForm(curriculumProfissional, _this4.form.value);
        curriculumProfissional.curriculum_id = curriculuns[0].id;
        curriculumProfissional.viagem_nacional = _this4.form?.controls.viagem_nacional.value ? 1 : 0;
        curriculumProfissional.viagem_internacional = _this4.form?.controls.viagem_internacional.value ? 1 : 0;
        curriculumProfissional.interesse_bnt = _this4.form?.controls.interesse_bnt.value ? 1 : 0;
        curriculumProfissional.remocao = _this4.form?.controls.remocao.value ? 1 : 0;
        //curriculumProfissional.usuario_id = this.auth.usuario?.id;
        curriculumProfissional.historico_atividade_interna = _this4.form.controls.historico_atividade_interna.value.filter(x => x._status?.length);
        curriculumProfissional.historico_atividade_externa = _this4.form.controls.historico_atividade_externa.value.filter(x => x._status?.length);
        curriculumProfissional.historico_curso_interno = _this4.form.controls.historico_curso_interno.value.filter(x => x._status?.length);
        curriculumProfissional.historico_curso_externo = _this4.form.controls.historico_curso_externo.value.filter(x => x._status?.length);
        curriculumProfissional.historico_docencia_interna = _this4.form.controls.historico_docencia_interna.value.filter(x => x._status?.length);
        curriculumProfissional.historico_docencia_externa = _this4.form.controls.historico_docencia_externa.value.filter(x => x._status?.length);
        curriculumProfissional.historico_funcao = _this4.form.controls.historico_funcao.value.filter(x => x._status?.length);
        curriculumProfissional.historico_lotacao = _this4.form.controls.historico_lotacao.value.filter(x => x._status?.length);
        //(this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => curriculumProfissional.idiomas.push(element.data));
        resolve(curriculumProfissional);
        //resolve(this.util.fillForm(curriculum, this.form!.value));
      });
    })();
  }

  /*public onAreaConhecimentoChange() {
    this.cursoDao?.query({ where: [['area_id', '==', this.formCursoInterno!.controls.areaCursoInterno.value]] }).getAll().then((cursos2) => {
      this.disciplinasItens = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });
  }*/
  onChangeEscolhePG() {
    this.escolhaRadioProgramaGestao?.setValue("");
  }
  onChangeEscolheInteressePG() {
    this.escolhaInteresseProgramaGestao?.setValue("");
  }
  onAddClick() {}
  //GRID FUNCAO
  addHistoricoFuncao() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_funcao_currriculum_model__WEBPACK_IMPORTED_MODULE_21__.HistoricoFuncaoCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoFuncao(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      console.log('ROW', row);
      let values = form.value;
      /*row.pretensao = values.pretensao;
      row.curso_id = values.curso_id;*/
      row.funcao = this.funcao?.selectedItem?.data;
      console.log('row.funcao', row.funcao.nome);
      row.funcao_id = values.funcao_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoFuncao(form, row) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      //this.area?.setValue(row.curso?.area_id)
      _this5.formHistoricoFuncaoGrid.controls.funcao_id.setValue(row.funcao?.id);
    })();
  }
  removeHistoricoFuncao(row) {
    var _this6 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this6.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  //GRID LOTACAO
  addHistoricoLotacao() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_lotacao_currriculum_model__WEBPACK_IMPORTED_MODULE_20__.HistoricoLotacaoCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoLotacao(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      //console.log('VALUES',values)
      //console.log('ROW',row)
      // row.unidade = this.unidade!.loadSearch(row.unidade_id);
      //row.unidade = this.unidade!.selectedItem;
      row.unidade_id = values.unidade_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoLotacao(form, row) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this7.formHistoricoLotacaoGrid.controls.unidade_id.setValue(row.unidade_id);
    })();
  }
  removeHistoricoLotacao(row) {
    var _this8 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this8.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  // GRID ATIVIDADE EXTERNA
  addHistoricoAtividadeExterna() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_atividade_externa_currriculum_model__WEBPACK_IMPORTED_MODULE_22__.HistoricoAtividadeExternaCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoAtividadeExterna(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      // console.log('VALUES',values)
      // console.log('ROW',row)
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      //row.areaAtividadeExterna = this.areaAtividadeExterna!.selectedItem;
      //console.log(row.areaAtividadeExterna)
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoAtividadeExterna(form, row) {
    var _this9 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this9.formHistoricoAtividadeExternaGrid.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
    })();
  }
  removeHistoricoAtividadeExterna(row) {
    var _this10 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this10.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  // GRID ATIVIDADE Interna
  addHistoricoAtividadeInterna() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_atividade_interna_currriculum_model__WEBPACK_IMPORTED_MODULE_19__.HistoricoAtividadeInternaCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoAtividadeInterna(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      //console.log('VALUES',values)
      //console.log('ROW',row)
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.areaTematica = this.areaTematica.selectedItem;
      row.area_tematica_id = values.area_tematica_id;
      row.capacidadeTecnica = this.capacidadeTecnica?.selectedItem;
      row.capacidade_tecnica_id = values.capacidade_tecnica_id;
      row.atividade_desempenhada = values.atividade_desempenhada;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoAtividadeInterna(form, row) {
    var _this11 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this11.formHistoricoAtividadeInternaGrid.controls.area_tematica_id.setValue(row.area_tematica_id);
      _this11.formHistoricoAtividadeInternaGrid.controls.capacidade_tecnica_id.setValue(row.capacidade_tecnica_id);
      _this11.formHistoricoAtividadeInternaGrid.controls.atividade_desempenhada.setValue(row.atividade_desempenhada);
    })();
  }
  removeHistoricoAtividadeInterna(row) {
    var _this12 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this12.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  // GRID Docencia Externa
  addHistoricoDocenciaExterna() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_docencia_externa_currriculum_model__WEBPACK_IMPORTED_MODULE_23__.HistoricoDocenciaExternaCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoDocenciaExterna(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES', values);
      console.log('ROW', row);
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      //row.areaAtividadeExternaDocencia = this.areaAtividadeExternaDocencia!.selectedItem;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoDocenciaExterna(form, row) {
    var _this13 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this13.formHistoricoDocenciaExternaGrid.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
    })();
  }
  removeHistoricoDocenciaExterna(row) {
    var _this14 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this14.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  // GRID Docencia Interna
  addHistoricoDocenciaInterna() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_docencia_interna_currriculum_model__WEBPACK_IMPORTED_MODULE_24__.HistoricoDocenciaInternaCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoDocenciaInterna(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES', values);
      console.log('ROW', row);
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      // row.cursoDocenciaInterna = this.cursoDocenciaInterna?.selectedItem;
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoDocenciaInterna(form, row) {
    var _this15 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this15.formHistoricoDocenciaInternaGrid.controls.curso_id.setValue(row.curso_id);
    })();
  }
  removeHistoricoDocenciaInterna(row) {
    var _this16 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this16.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
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
  // GRID Curso Interno
  addHistoricoCursoInterno() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_curso_interno_currriculum_model__WEBPACK_IMPORTED_MODULE_25__.HistoricoCursoInternoCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoCursoInterno(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES', values);
      console.log('ROW', row);
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      //row.historicoCursoInterno = this.historicoCursoInterno!.selectedItem;
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoCursoInterno(form, row) {
    var _this17 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this17.formHistoricoCursoInternoGrid.controls.curso_id.setValue(row.curso_id);
      _this17.formHistoricoCursoInternoGrid.controls.pretensao.setValue(row.pretensao);
    })();
  }
  removeHistoricoCursoInterno(row) {
    var _this18 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this18.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  // GRID Curso Externo
  addHistoricoCursoExterno() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new src_app_models_historico_curso_externo_currriculum_model__WEBPACK_IMPORTED_MODULE_26__.HistoricoCursoExternoCurriculum({
        _status: "ADD"
      });
    })();
  }
  saveHistoricoCursoExterno(form, row) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES', values);
      console.log('ROW', row);
      /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      // row.areaHistoricoCursoExterno = this.areaHistoricoCursoExterno!.selectedItem;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row.nome = values.nome;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoCursoExterno(form, row) {
    var _this19 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
      /*this.area?.setValue(row.curso?.area_id)*/
      _this19.formHistoricoCursoExternoGrid.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
      _this19.formHistoricoCursoExternoGrid.controls.pretensao.setValue(row.pretensao);
      _this19.formHistoricoCursoExternoGrid.controls.nome.setValue(row.nome);
    })();
  }
  removeHistoricoCursoExterno(row) {
    var _this20 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this20.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
        row._status = "DELETE";
      }
      return undefined;
    })();
  }
  onAreaAtividadeInternaChange() {
    this.areaTematicaWhere = [['area_tematica_id', '==', this.formHistoricoAtividadeInternaGrid.controls.area_tematica_id.value]];
    this.cdRef.detectChanges();
  }
}
_class = CurriculumProfissionalFormComponent;
_class.ɵfac = function CurriculumProfissionalFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_40__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-profissional-form"]],
  viewQuery: function CurriculumProfissionalFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c5, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c6, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c7, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c8, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c9, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c10, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c11, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c12, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c13, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c14, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c15, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c16, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c17, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c18, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c19, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c20, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c21, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c22, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c23, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c24, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c25, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c26, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c27, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c28, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c29, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c30, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioDocenciaExterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioCursosInternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioCursosExternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioInteresseBNT = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioInteresseProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioInteresseRemocao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioViajemNacional = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.radioViajemInternacional = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.escolhaRadioProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.escolhaInteresseProgramaGestao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.funcao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.lotacaoAtual = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.gruposEspecializados = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.centroTreinamento = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.cargos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.selecionaLotacao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaAtividadeExterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaAtividadeExternaDocencia = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaCursoInterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaCursoExterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.cursoDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.historicoCursoInterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaHistoricoCursoExterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaAtividadeInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.selectDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.selectCursosInternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaTematica = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.capacidadeTecnica = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵInheritDefinitionFeature"]],
  decls: 132,
  vars: 128,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "left", ""], ["key", "FUNCIONAIS", "label", "Funcionais", 1, "fw-bold"], [1, "row", "my-4"], ["label", "Ingresso na Institui\u00E7\u00E3o", "icon", "bi bi-calendar-check-fill", "controlName", "ano_ingresso", 3, "size", "control", "items"], ["label", "Centro de Treinamento", "icon", "bi bi-building-fill", "controlName", "centro_treinamento_id", "fullEntity", "", "liveSearch", "", 3, "size", "control", "dao", "addRoute"], ["centroTreinamento", ""], ["label", "Cargo", "controlName", "cargo_id", 3, "size", "control", "dao"], ["cargos", ""], [1, "row", "mt-3"], [1, "col-md-6"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["title", "Hist\u00F3rico de Fun\u00E7\u00F5es", "titleHint", "Fun\u00E7\u00F5es ocupadas como titular ou substituto.", 3, "template", "editTemplate"], ["columnFuncao", ""], ["editFuncao", ""], ["type", "options"], ["label", "Voc\u00EA faz parte de algum grupo especializado?", "icon", "bi bi-check-circle", "controlName", "grupo_especializado_id", "fullEntity", "", "liveSearch", "", 3, "size", "control", "dao", "addRoute"], ["gruposEspecializados", ""], ["title", "Hist\u00F3rico de Lota\u00E7\u00F5es", "titleHint", "Escolha a lota\u00E7\u00E3o.", 3, "template", "editTemplate"], ["columnLotacao", ""], ["editLotacao", ""], ["label", "Lota\u00E7\u00E3o atual", "controlName", "lotacao_atual", 3, "size", "control", "dao"], ["lotacaoAtual", ""], ["key", "HARD_SKILLS", "label", "Hard Skills", 1, "fw-bold"], ["title", "Desempenhou atividades externamente e que podem contribuir para a institui\u00E7\u00E3o?", 1, "mb-3", "mt-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeExterna", 3, "size", "label", "control"], ["radioAtividadeExterna", ""], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save", 4, "ngIf"], ["title", "Desempenhou atividades internamente que podem contribuir ou contribuiram para a institui\u00E7\u00E3o?", 1, "mb-3", "mt-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeInterna", 3, "size", "label", "control"], ["radioAtividadeInterna", ""], [1, "row", "mb-2", "mt-3"], ["title", "Informe as suas habilidades", 1, "mb-3", 3, "bold"], ["controlName", "especifique_habilidades", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Especifique", "icon", "bi bi-list-stars", "controlName", "inputEspecifiqueHabilidade", 3, "size", "control"], ["key", "DOCENCIA", "label", "Doc\u00EAncia", 1, "fw-bold", "mb-3"], ["title", "Voc\u00EA j\u00E1 realizou algum trabalho de doc\u00EAncia fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaExterna", 3, "size", "label", "control"], ["radioDocenciaExterna", ""], ["title", "Voc\u00EA \u00E9 docente ou instrutor da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaInterna", 3, "size", "label", "control"], ["radioDocenciaInterna", ""], ["key", "CURSOS", "label", "Cursos", 1, "fw-bold", "mb-3"], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer na Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["title", "Pretende Cursar?", "titleHint", "Pretende cursar ou j\u00E1 esta concluido.", 3, "template", "editTemplate"], ["columnPretende", ""], ["editPretende", ""], ["title", "Curso Institucional", "titleHint", "Escolha o curso.", 3, "template", "editTemplate"], ["columnCurso", ""], ["editCurso", ""], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["title", "\u00C1rea Externa", "titleHint", "Escolha a \u00E1rea externa.", 3, "template", "editTemplate"], ["columnArea", ""], ["editArea", ""], ["title", "Nome do Curso", "titleHint", "Informe o nome do curso.", 3, "template", "editTemplate"], ["columnNome", ""], ["editNome", ""], ["key", "DISPONIBILIDADE", "label", "Disponibilidade", 1, "fw-bold", "mb-3"], [1, "row"], ["title", "Viagens", 1, "mb-3", "mt-3", 3, "bold"], [1, "col-lg-6"], [1, "bi", "bi-flag-fill"], ["labelPosition", "right", "controlName", "viagem_nacional", 3, "size", "label", "control"], ["radioViajemNacional", ""], [1, "bi", "bi-globe-americas"], ["labelPosition", "right", "controlName", " viagem_internacional", 3, "size", "label", "control"], ["radioViajemInternacional", ""], ["title", "Voc\u00EA tem interesse na participa\u00E7\u00E3o do Banco Nacional de Talentos (BNT IN PRF N\u00BA 58 de 27 de agosto de 2021) SEI 35010079?", 1, "my-3", 3, "bold"], ["icon", "bi bi-universal-access", "controlName", "interesse_bnt", 3, "size", "label", "control"], ["radioInteresseBNT", ""], ["title", "Voc\u00EA est\u00E1 inserido no programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-calendar2-check", "controlName", "radioProgramaGestao", 3, "size", "label", "control", "change"], ["radioProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_inserido", 3, "size", "items", "control", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em participar do programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-bookmark-check", "controlName", "radioInteresseProgramaGestao", 3, "size", "label", "control", "change"], ["radioInteresseProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_interesse", 3, "size", "items", "control", 4, "ngIf"], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em remo\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-house-door-fill", "controlName", "remocao", 3, "size", "label", "control"], ["radioInteresseRemocao", ""], [1, "mb-5"], ["label", "", "icon", "", "controlName", "funcao_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "addRoute"], ["funcao", ""], ["controlName", "unidade_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "join"], ["unidade", ""], ["title", "Hist\u00F3rico de Atividades Externas", "titleHint", "Escolha a atividade.", 3, "template", "editTemplate"], ["columnAtividadeExterna", ""], ["editAtividadeExterna", ""], ["label", "", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "join", "addRoute"], ["areaAtividadeExterna", ""], ["title", "\u00C1rea tem\u00E1tica", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnAtividadeInterna", ""], ["editAtividadeInterna", ""], ["title", "Capacidade", "titleHint", "Escolha a capacidade.", 3, "template", "editTemplate"], ["columnCapacidade", ""], ["editCapacidade", ""], ["title", "Atividade desempenhada", "titleHint", "Informe a atividade.", 3, "template", "editTemplate"], ["columnAtividadeDesempenhada", ""], ["editAtividadeDesempenhada", ""], ["label", "Escolha a \u00E1rea tem\u00E1tica", "controlName", "area_tematica_id", "fullEntity", "", 3, "size", "dao", "join", "addRoute", "change"], ["areaTematica", ""], ["label", "Capacidade", "icon", "fas fa-graduation-cap", "controlName", "capacidade_tecnica_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "where", "addRoute"], ["capacidadeTecnica", ""], ["label", "Informe a atividade desempenhada", "icon", "", "controlName", "atividade_desempenhada", 3, "size"], ["title", "\u00C1rea Externa", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnDocenciaExterna", ""], ["editDocenciaExterna", ""], ["label", "Escolha a \u00E1rea externa", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "addRoute"], ["areaAtividadeExternaDocencia", ""], ["title", "Curso", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnDocenciaInterna", ""], ["editDocenciaInterna", ""], ["label", "Curso", "icon", "", "controlName", "curso_id", "fullEntity", "", "liveSearch", "", "orderBy", "[['nome', 'asc']]", 3, "size", "control", "dao", "where", "addRoute"], ["cursoDocenciaInterna", ""], ["icon", "fas fa-user-graduate", "controlName", "pretensao", 3, "size", "label", "control"], ["label", "Curso", "icon", "", "controlName", "curso_id", "fullEntity", "", "liveSearch", "", "orderBy", "[['nome', 'asc']]", 3, "size", "dao", "where", "addRoute"], ["historicoCursoInterno", ""], ["label", "\u00C1rea/Institui\u00E7\u00E3o/Coorpora\u00E7\u00E3o", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "addRoute"], ["areaHistoricoCursoExterno", ""], ["label", "Nome do Curso", "icon", "", "controlName", "nome", "liveSearch", "", 3, "size", "control"], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_inserido", 3, "size", "items", "control"], ["escolhaRadioProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_interesse", 3, "size", "items", "control"], ["escolhaInteresseProgramaGestao", ""], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"]],
  template: function CurriculumProfissionalFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("submit", function CurriculumProfissionalFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumProfissionalFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](4, "input-select", 4)(5, "input-select", 5, 6)(7, "input-search", 7, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](9, "div", 9)(10, "div", 10)(11, "grid", 11)(12, "columns")(13, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](14, CurriculumProfissionalFormComponent_ng_template_14_Template, 1, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](16, CurriculumProfissionalFormComponent_ng_template_16_Template, 2, 6, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](18, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](19, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](20, "input-select", 16, 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](22, "div", 9)(23, "div", 10)(24, "grid", 11)(25, "columns")(26, "column", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](27, CurriculumProfissionalFormComponent_ng_template_27_Template, 1, 1, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](29, CurriculumProfissionalFormComponent_ng_template_29_Template, 2, 4, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](31, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](32, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](33, "input-search", 21, 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](35, "tab", 23)(36, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](37, "separator", 24)(38, "input-switch", 25, 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](40, CurriculumProfissionalFormComponent_grid_40_Template, 8, 10, "grid", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](41, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](42, "separator", 28)(43, "input-switch", 29, 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](45, CurriculumProfissionalFormComponent_grid_45_Template, 18, 14, "grid", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](46, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](47, "separator", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](48, "input-multiselect", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](49, "input-text", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](50, "tab", 35)(51, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](52, "separator", 36)(53, "input-switch", 37, 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](55, CurriculumProfissionalFormComponent_grid_55_Template, 8, 10, "grid", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](56, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](57, "separator", 39)(58, "input-switch", 40, 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](60, CurriculumProfissionalFormComponent_grid_60_Template, 8, 10, "grid", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](61, "tab", 42)(62, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](63, "separator", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](64, "grid", 11)(65, "columns")(66, "column", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](67, CurriculumProfissionalFormComponent_ng_template_67_Template, 1, 1, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](69, CurriculumProfissionalFormComponent_ng_template_69_Template, 1, 3, "ng-template", null, 46, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](71, "column", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](72, CurriculumProfissionalFormComponent_ng_template_72_Template, 1, 1, "ng-template", null, 48, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](74, CurriculumProfissionalFormComponent_ng_template_74_Template, 2, 10, "ng-template", null, 49, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](76, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](77, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](78, "separator", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](79, "grid", 11)(80, "columns")(81, "column", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](82, CurriculumProfissionalFormComponent_ng_template_82_Template, 1, 1, "ng-template", null, 45, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](84, CurriculumProfissionalFormComponent_ng_template_84_Template, 1, 3, "ng-template", null, 46, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](86, "column", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](87, CurriculumProfissionalFormComponent_ng_template_87_Template, 1, 1, "ng-template", null, 52, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](89, CurriculumProfissionalFormComponent_ng_template_89_Template, 2, 6, "ng-template", null, 53, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](91, "column", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](92, CurriculumProfissionalFormComponent_ng_template_92_Template, 1, 1, "ng-template", null, 55, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](94, CurriculumProfissionalFormComponent_ng_template_94_Template, 1, 2, "ng-template", null, 56, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](96, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](97, "tab", 57)(98, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](99, "separator", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](100, "div", 60)(101, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](102, "i", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](103, " J\u00E1 fez viagem nacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](104, "input-switch", 62, 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](106, "div", 60)(107, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](108, "i", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](109, " J\u00E1 fez viagem internacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](110, "input-switch", 65, 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](112, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](113, "separator", 67)(114, "input-switch", 68, 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](116, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](117, "separator", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](118, "input-switch", 71, 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_118_listener() {
        return ctx.onChangeEscolhePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](120, CurriculumProfissionalFormComponent_input_radio_120_Template, 2, 3, "input-radio", 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](121, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](122, "separator", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](123, "input-switch", 75, 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_123_listener() {
        return ctx.onChangeEscolheInteressePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](125, CurriculumProfissionalFormComponent_input_radio_125_Template, 2, 3, "input-radio", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](126, CurriculumProfissionalFormComponent_input_text_126_Template, 1, 4, "input-text", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](127, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](128, "separator", 79)(129, "input-switch", 80, 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](131, "separator", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](15);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](17);
      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](28);
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](30);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](39);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](44);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](54);
      const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](59);
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](68);
      const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](70);
      const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](73);
      const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](75);
      const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](88);
      const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](90);
      const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](93);
      const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](95);
      const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](105);
      const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](111);
      const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](115);
      const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](119);
      const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](124);
      const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](130);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.ano_ingresso)("items", ctx.anos);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.centro_treinamento_id)("dao", ctx.centroTreinamentoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](123, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](122, _c42)));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cargo_id)("dao", ctx.cargoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_funcao)("minHeight", 150)("form", ctx.formHistoricoFuncaoGrid)("hasDelete", true)("add", ctx.addHistoricoFuncao.bind(ctx))("load", ctx.loadHistoricoFuncao.bind(ctx))("remove", ctx.removeHistoricoFuncao.bind(ctx))("save", ctx.saveHistoricoFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.grupo_especializado_id)("dao", ctx.grupoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](126, _c32, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](125, _c43)));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_lotacao)("minHeight", 150)("form", ctx.formHistoricoLotacaoGrid)("hasDelete", true)("add", ctx.addHistoricoLotacao.bind(ctx))("load", ctx.loadHistoricoLotacao.bind(ctx))("remove", ctx.removeHistoricoLotacao.bind(ctx))("save", ctx.saveHistoricoLotacao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r7)("editTemplate", _r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotacao_atual)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r12.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioAtividadeExterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioAtividadeExterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r14.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioAtividadeInterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioAtividadeInterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.especifique_habilidades)("addItemHandle", ctx.addItemHabilidades.bind(ctx))("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.inputEspecifiqueHabilidade);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r16.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaExterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioDocenciaExterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r18.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaInterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioDocenciaInterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_curso_interno)("minHeight", 150)("form", ctx.formHistoricoCursoInternoGrid)("hasDelete", true)("add", ctx.addHistoricoCursoInterno.bind(ctx))("load", ctx.loadHistoricoCursoInterno.bind(ctx))("remove", ctx.removeHistoricoCursoInterno.bind(ctx))("save", ctx.saveHistoricoCursoInterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r20)("editTemplate", _r22);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r24)("editTemplate", _r26);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_curso_externo)("minHeight", 150)("form", ctx.formHistoricoCursoExternoGrid)("hasDelete", true)("add", ctx.addHistoricoCursoExterno.bind(ctx))("load", ctx.loadHistoricoCursoExterno.bind(ctx))("remove", ctx.removeHistoricoCursoExterno.bind(ctx))("save", ctx.saveHistoricoCursoExterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r20)("editTemplate", _r22);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r32)("editTemplate", _r34);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r36)("editTemplate", _r38);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r40.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.viagem_nacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r41.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.viagem_internacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r42.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.interesse_bnt);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r43.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioProgramaGestao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r45.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseProgramaGestao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteresseProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteresseProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r48.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.remocao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_41__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_28__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_29__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_30__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_31__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_32__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_33__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_34__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_35__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_36__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_37__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_38__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_39__.SeparatorComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJpY3VsdW0tcHJvZmlzc2lvbmFsLWZvcm0vY3VycmljdWx1bS1wcm9maXNzaW9uYWwtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGVBQUE7QUFERjs7QUFLQTtFQUNFLHdCQUFBO0VBQ0EsaUJBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBRkY7O0FBTUE7RUFDRSxtQkFBQTtBQUhGIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9uZXV0cmEtdGV4dC1hbHQnKTtcblxuXG4jaW1nQmlnSWNvLCNpbWdCaWdJY29BbWFyZWxve1xuICBtYXgtd2lkdGg6IDMwcHg7XG5cbn1cblxuLmg0LCAuY2FyZC10aXRsZXtcbiAgZm9udC1mYW1pbHk6IG5ldXRyYSB0ZXh0O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmNhcmQtaW1nLXRvcHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDkwcHg7XG4gLy8gYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjdmYTtcbn1cblxuLmNhcmR7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 43872);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../home/home.component */ 34269);
/* harmony import */ var _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./currriculum-atributos/currriculum-atributos.component */ 64169);
/* harmony import */ var _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component */ 11229);
/* harmony import */ var _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component */ 28366);
/* harmony import */ var _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component */ 50090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
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
  component: _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'soft',
  component: _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_7__.CurriculumAtributossoftFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'atributos',
  component: _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_6__.CurrriculumAtributosComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'disc',
  component: _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_8__.CurriculumAtributosdiscFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'dass',
  component: _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_9__.CurriculumAtributosDassFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
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
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](CurriculumRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curriculum-routing.module */ 26447);
/* harmony import */ var _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 43872);
/* harmony import */ var _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currriculum-atributos/currriculum-atributos.component */ 64169);
/* harmony import */ var _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component */ 11229);
/* harmony import */ var _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component */ 28366);
/* harmony import */ var _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component */ 50090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;












class CurriculumModule {}
_class = CurriculumModule;
_class.ɵfac = function CurriculumModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](CurriculumModule, {
    declarations: [
    //CurriculumListComponent,
    _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_5__.CurrriculumAtributosComponent, _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__.CurriculumFormComponent, _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalFormComponent, _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent, _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_6__.CurriculumAtributossoftFormComponent, _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_7__.CurriculumAtributosdiscFormComponent, _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_8__.CurriculumAtributosDassFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
  });
})();

/***/ }),

/***/ 50090:
/*!*************************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosDassFormComponent: () => (/* binding */ CurriculumAtributosDassFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;

class CurriculumAtributosDassFormComponent {}
_class = CurriculumAtributosDassFormComponent;
_class.ɵfac = function CurriculumAtributosDassFormComponent_Factory(t) {
  return new (t || _class)();
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributos-dass-form"]],
  decls: 2,
  vars: 0,
  template: function CurriculumAtributosDassFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "curriculum-atributos-dass-form works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 43872:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosbig5FormComponent: () => (/* binding */ CurriculumAtributosbig5FormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/questionario-resposta.model */ 86920);
/* harmony import */ var src_app_models_questionario_resposta_pergunta_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/questionario-resposta-pergunta.model */ 56260);
/* harmony import */ var src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/questionario-resposta-dao.service */ 54771);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);

var _class;











const _c0 = ["divb5"];
const _c1 = ["divextroversao"];
const _c2 = ["lblextroversao"];
const _c3 = ["btnv"];
const _c4 = ["btne"];
const _c5 = ["radio"];
function CurriculumAtributosbig5FormComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " Formul\u00E1rio de Big Five n\u00E3o encontrado no banco de dados. Contate o suporte! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function CurriculumAtributosbig5FormComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "separator", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 4)(2, "div", 5)(3, "div", 6, 7)(5, "label", 8)(6, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 9)(9, "div", 10)(10, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_div_change_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r15.onRadioChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "Muito Inadequado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](16, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "Relativamente Inadequado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](20, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, "Nem Adequado, Nem Inadequado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](24, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, "Relativamente Adequado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](28, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](30, "Muito Adequado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "div", 23)(32, "div", 24)(33, "div", 25)(34, "button", 26, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_button_click_34_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r17.voltar($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](36, "Voltar");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 25)(38, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_button_click_38_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r18.enviar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39, "Enviar");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](40, "div", 29)(41, "div", 30)(42, "div", 31)(43, "separator")(44, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](45, "Pontua\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](46, "label", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](47, "A pontua\u00E7\u00E3o calculada dever\u00E1 ficar entre ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](48, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](49, "0 e 40");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](50, " pontos.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](51, "div", 33)(52, "div", 31)(53, "separator", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_53_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r19.onClickDivB5("divgraficob5", "lblgrafico", "igrafico"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](54, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](55, "Resultados");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](56, "i", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](57, "label", 36)(58, "i", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](59, "div", 38)(60, "div", 39)(61, "canvas", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](62);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](63, "div", 41)(64, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](65, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](66, "div", 44)(67, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](69, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](70);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](71, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](72, "Introvers\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](73, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](74, "Extroversao");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](75, "div", 49)(76, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](77);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](78, "separator", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_78_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r20.onClickDivB5("divextroversao", "lblextroversao", "iextroversao"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](79, "div", 24)(80, "div", 52)(81, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](82, "i", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](83, " Extrovers\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](84, "div", 52)(85, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](86, "label", 54, 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](88, "div", 56, 57)(90, "div", 58)(91, "p", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](92, " \u00C9 o tra\u00E7o pessoal caracterizado por emo\u00E7\u00F5es positivas e pela tend\u00EAncia para procurar est\u00EDmulos. Al\u00E9m disso, \u00E9 marcado pela busca da companhia das outras pessoas e pelo profundo envolvimento com o mundo exterior. Individuos com pontua\u00E7\u00E3o alta tendem a ser muito sociais, enquanto com pontua\u00E7\u00F5es mais baixas tendem a trabalhar sozinhas em seus projetos. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](93, "div", 60)(94, "div", 61)(95, "label", 62)(96, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](97, "Seus pontos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](98, "div", 63)(99, "h4")(100, "label", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](101);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](102, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](103, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](104, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](105, "div", 44)(106, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](107);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](108, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](109);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](110, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](111, "Desconfian\u00E7a");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](112, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](113, "Agradabilidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](114, "div", 49)(115, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](116);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](117, "separator", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_117_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r21.onClickDivB5("divagradabilidade", "lblagradabilidade", "iagradabilidade"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](118, "div", 24)(119, "div", 52)(120, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](121, "i", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](122, " Agradabilidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](123, "i", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](124, "div", 52)(125, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](126, "label", 69, 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](128, "div", 71, 72)(130, "div", 58)(131, "p", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](132, " A agradabilidade \u00E9 um tra\u00E7o de personalidade que se manifesta em caracter\u00EDsticas comportamentais individuais que s\u00E3o percebidas como am\u00E1veis, simp\u00E1ticas, cooperativas, calorosas e atenciosas.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](133, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](134, " Pessoas com pontua\u00E7\u00E3o alta nesta dimens\u00E3o s\u00E3o emp\u00E1ticas e altru\u00EDstas, enquanto uma pontua\u00E7\u00E3o baixa de afabilidade est\u00E1 relacionada a comportamento ego\u00EDsta e falta de empatia.Aqueles com pontua\u00E7\u00E3o muito baixa em agradabilidade mostram sinais de comportamento da tr\u00EDade obscura, como manipula\u00E7\u00E3o e competi\u00E7\u00E3o com os outros em vez de coopera\u00E7\u00E3o. A agradabilidade \u00E9 considerada um tra\u00E7o superordenado, o que significa que \u00E9 um agrupamento de sub-tra\u00E7os de personalidade que se agrupam estatisticamente. Os tra\u00E7os ou facetas de n\u00EDvel inferior agrupados sob a agradabilidade s\u00E3o: confian\u00E7a, franqueza, altru\u00EDsmo, submiss\u00E3o, mod\u00E9stia e ternura. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](135, "div", 74)(136, "div", 61)(137, "label", 62)(138, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](139, "Seus pontos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](140, "div", 63)(141, "h4")(142, "label", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](143);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](144, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](145, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](146, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](147, "div", 44)(148, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](149);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](150, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](151);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](152, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](153, "Comportamento Esp\u00F4ntaneo");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](154, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](155, "Comportamento Planejado");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](156, "div", 49)(157, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](158);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](159, "separator", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_159_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r22.onClickDivB5("divconscienciosidade", "lblconscienciosidade", "iconscienciosidade"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](160, "div", 24)(161, "div", 52)(162, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](163, "i", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](164, " Conscienciosidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](165, "i", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](166, "div", 52)(167, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](168, "label", 80, 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](170, "div", 82, 83)(172, "div", 58)(173, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](174, " Conscienciosidade \u00E9 o tra\u00E7o de personalidade de ser cuidadoso ou diligente. A conscienciosidade implica o desejo de executar bem uma tarefa e levar a s\u00E9rio as obriga\u00E7\u00F5es para com os outros. Pessoas com pontua\u00E7\u00E3o alta tendem a ser eficientes e organizadas, pontua\u00E7\u00F5es baixas tendem a ser descontra\u00EDdas e desordenadas. Eles exibem uma tend\u00EAncia a mostrar autodisciplina, agir obedientemente e almejar a conquista; eles exibem comportamento planejado, e n\u00E3o espont\u00E2neo; e eles geralmente s\u00E3o confi\u00E1veis. Ela se manifesta em comportamentos caracter\u00EDsticos, como ser elegante e sistem\u00E1tico; incluindo tamb\u00E9m elementos como cuidado, rigor e delibera\u00E7\u00E3o (a tend\u00EAncia de pensar cuidadosamente antes de agir) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](175, "div", 85)(176, "div", 61)(177, "label", 62)(178, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](179, "Seus pontos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](180, "div", 63)(181, "label", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](182);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](183, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](184, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](185, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](186, "div", 44)(187, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](188);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](189, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](190);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](191, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](192, "Calmos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](193, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](194, "Reativos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](195, "div", 49)(196, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](197);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](198, "separator", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_198_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r23.onClickDivB5("divestabilidade", "lblestabilidade", "iestabilidade"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](199, "div", 24)(200, "div", 52)(201, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](202, "i", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](203, " Estabilidade Emocional");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](204, "i", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](205, "div", 52)(206, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](207, "label", 92, 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](209, "div", 94, 95)(211, "div", 96)(212, "p", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](213, " \u00C9 a tend\u00EAncia para experienciar emo\u00E7\u00F5es negativas, como raiva, ansiedade ou depress\u00E3o, as quais tendem a persistir por per\u00EDodos longos. Por vezes, a Estabilidade Emocional tamb\u00E9m \u00E9 chamada de neuroticismo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](214, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](215, " Pessoas com pontua\u00E7\u00F5es altas s\u00E3o mais dif\u00EDceis de serem perturbados e s\u00E3o menos reativos emocionalmente. Eles tendem a ser calmos, emocionalmente est\u00E1veis e livres de sentimentos negativos persistentes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](216, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](217, " Pessoas com pontua\u00E7\u00E3o baixa s\u00E3o emocionalmente reativos e vulner\u00E1veis ao estresse. S\u00E3o predispostos a interpretar situa\u00E7\u00F5es normais como sendo amea\u00E7adoras e pequenas frustra\u00E7\u00F5es como dificuldades sem esperan\u00E7a.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](218, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](219, " Por esses motivos, essas pessoas podem apresentar uma capacidade reduzida para pensar claramente, tomar decis\u00F5es ou lidar de forma apropriada com o estresse. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](220, "div", 98)(221, "div", 61)(222, "label", 62)(223, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](224, "Seus pontos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](225, "div", 63)(226, "label", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](227);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](228, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](229, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](230, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](231, "div", 44)(232, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](233);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](234, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](235);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](236, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](237, "Conservadorismo");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](238, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](239, "Novas Experi\u00EAncias");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](240, "div", 49)(241, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](242);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](243, "separator", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_ng_template_2_Template_separator_click_243_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r24.onClickDivB5("divabertura", "lblabertura", "iabertura"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](244, "div", 24)(245, "div", 52)(246, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](247, "i", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](248, " Abertura");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](249, "i", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](250, "div", 52)(251, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](252, "label", 104, 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](254, "div", 106, 107)(256, "div", 108)(257, "p", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](258, " \u00C9 o tra\u00E7o da personalidade marcado pelo interesse por novas experi\u00EAncias emocionais, pela aventura, por ideias incomuns, pela arte, pelo amplo uso da imagina\u00E7\u00E3o e alto grau de curiosidade.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](259, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](260, " Pessoas com pontua\u00E7\u00F5es altas s\u00E3o imaginativas, criativas, curiosas, apreciadoras da arte e sens\u00EDveis \u00E0 beleza. Essas pessoas tendem a levar em conta os seus sentimentos e a terem opini\u00F5es n\u00E3o convencionais.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](261, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](262, " Pessoas com pontua\u00E7\u00E3o baixa t\u00EAm uma menor abertura para experi\u00EAncias costumam ter interesses mais convencionais e tradicionais. Eles preferem o simples, claro e \u00F3bvio ao complexo, amb\u00EDguo e sutil. Al\u00E9m disso, podem ver as artes e as ci\u00EAncias com suspeitas, ach\u00E1-las \u201Cdesinteressantes\u201D e n\u00E3o gostarem de correr riscos ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](263, "div", 110)(264, "div", 61)(265, "label", 62)(266, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](267, "Seus pontos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](268, "div", 63)(269, "h4")(270, "label", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](271);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](272, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("bold", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", ctx_r2.numeroPergunta, ". ", ctx_r2.showPergunta, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.chart);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.max);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.valueTrack);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.extroversao);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.max);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.valueTrack);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.agradabilidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.max);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.valueTrack);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.conscienciosidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.max);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.valueTrack);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.estabilidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.max);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.valueTrack);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r2.abertura);
  }
}
class CurriculumAtributosbig5FormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta, src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_7__.QuestionarioRespostaDaoService);
    this.injector = injector;
    this.perguntas = [];
    this.respostas = [];
    this.opcoesEscolha = [{
      'key': 1,
      'value': 'Muito Inadequado.'
    }, {
      'key': 2,
      'value': 'Relativamente Inadequado'
    }, {
      'key': 3,
      'value': 'Nem Adequado, Nem Inadequado'
    }, {
      'key': 4,
      'value': 'Relativamente Adequado'
    }, {
      'key': 5,
      'value': 'Muito Adequado'
    }];
    this.controleP = 0;
    this.controleV = 0;
    this.controle = 0;
    this.showPergunta = '';
    this.numeroPergunta = 1;
    this.total = 0;
    this.valorEscolhido = '';
    this.respostasB5 = [];
    this.arrayLabel = '';
    this.extroversao = 0;
    this.agradabilidade = 0;
    this.conscienciosidade = 0;
    this.estabilidade = 0;
    this.abertura = 0;
    this.respondido = false;
    this.min = '';
    this.max = '';
    this.valueTrack = '';
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get(src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__.QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__.QuestionarioPerguntaDaoService);
    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";
    this.form = this.fh.FormBuilder({
      radiob5: {
        default: false
      },
      lbl_extroversao: {
        default: ''
      },
      divextroversao: {
        default: ''
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  initializeData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const questionario = yield _this.questionarioDao?.query({
        where: [['codigo', '==', 'B5']],
        join: ['perguntas']
      }).asPromise();
      if (questionario?.length) {
        questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
        _this.perguntas = questionario[0].perguntas;
        _this.showPergunta = _this.perguntas[_this.controle].pergunta;
        _this.questionario = questionario[0];
        const questionarioResposta = yield _this.dao?.query({
          where: [['questionario_id', '==', _this.questionario.id], ['usuario_id', '==', _this.auth.usuario?.id]],
          join: ['questionario_resposta_pergunta']
        }).asPromise();
        _this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
        let respostas = [];
        if (_this.entity) {
          _this.questionario.perguntas.forEach((pergunta, index) => {
            _this.entity.questionario_resposta_pergunta.forEach((resposta, index) => {
              if (pergunta.id == resposta.questionario_pergunta_id) respostas.push(resposta.resposta);
            });
          });
          _this.respondido = true;
          _this.resposta(respostas);
        }
      } else {
        _this.dialog.alert("Teste Soft-Skills não localizado", "Teste não localizado");
      }
      yield _this.loadData(_this.entity, form);
    })();
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.questionario) return false;
      if (_this2.respondido) {
        _this2.dialog.alert("Gravação não efetuada", "Teste já respondido");
        return false;
      }
      if (_this2.respostasB5.length < 50) {
        _this2.dialog.alert("Gravação não efetuada", "Para gravação o teste deve ser respondido por completo");
        return false;
      }
      let questionarioResposta = _this2.util.fill(new src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta(), _this2.entity || {});
      questionarioResposta.usuario_id = _this2.auth.usuario?.id;
      questionarioResposta.editavel = 0;
      questionarioResposta.questionario_id = _this2.questionario.id;
      let respostas = _this2.entity?.questionario_resposta_pergunta || _this2.respostasB5.map((x, i) => new src_app_models_questionario_resposta_pergunta_model__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRespostaPergunta({
        questionario_pergunta_id: _this2.questionario.perguntas[i].id,
        resposta: x,
        _status: "ADD"
      }));
      respostas.forEach((x, i) => {
        if (x._status != "ADD" && x.resposta != _this2.respostasB5[i]) {
          x.resposta = _this2.respostasB5[i];
          x._status = "EDIT";
        }
      });
      questionarioResposta.questionario_resposta_pergunta = respostas;
      return questionarioResposta;
    })();
  }
  valorSoftChange(control) {
    control.value == '' ? control.setValue(0) : '';
    const comunica = this.form?.controls.comunica.value;
    const lideranca = this.form?.controls.lideranca.value;
    const resolucao = this.form?.controls.resolucao.value;
    const criatividade = this.form?.controls.criatividade.value;
    const pensamento = this.form?.controls.pensamento.value;
    const habilidade = this.form?.controls.habilidade.value;
    const adaptabilidade = this.form?.controls.adaptabilidade.value;
    const etica = this.form?.controls.etica.value;
    const array = [comunica, lideranca, resolucao, criatividade, pensamento, habilidade, adaptabilidade, etica];
    let soma = 0;
    for (const val of array) {
      //console.log('SUM SEQUENCIA', sum)
      soma = soma + parseInt(val);
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
  onRadioChange(event) {
    console.log(event.srcElement.value);
    this.valorEscolhido = event.srcElement.value;
    this.proximo(event);
  }
  voltar(event) {
    // console.log(event)
    const btnEnviar = document.querySelector('.btnenviar');
    const btnVoltar = document.querySelector('.btnvoltar');
    const div = document.querySelector('.divb5');
    const radio = document.querySelector('.radio');
    radio?.removeAttribute('checked');
    if (this.respostasB5.length == 50) {
      this.controle--;
      this.total = this.total - this.respostasB5[this.controle];
      this.respostasB5.splice(this.controle, 1);
      this.arrayLabel = this.respostasB5.toString();
      btnEnviar?.setAttribute('disabled', '');
      radio?.setAttribute('disabled', '');
      $('input[name="radiob5"]').prop('disabled', false);
      //$('input[name="radioB"]').prop('disabled', false);
    }

    if (this.controle > 0) {
      this.controle--;
      this.controle == 0 ? btnVoltar?.setAttribute('disabled', '') : btnVoltar?.removeAttribute('disabled');
      if (this.controle >= 0) {
        this.showPergunta = this.perguntas[this.controle].pergunta;
        this.numeroPergunta--;
        this.total = this.total - this.respostasB5[this.controle];
        this.respostasB5.splice(this.controle, 1);
        this.arrayLabel = this.respostasB5.toString();
      }
      console.log(this.respostasB5, ' - ', this.total, ' - ', this.controle);
    } else {
      btnVoltar?.setAttribute('disabled', '');
    }
    $('input[name="radiob5"]').prop('checked', false);
    //$('input[name="radioB"]').prop('checked', false);
  }

  proximo(event) {
    const btnEnviar = document.querySelector('.btnenviar');
    const btnVoltar = document.querySelector('.btnvoltar');
    const div = document.querySelector('.divb5');
    const radio = document.querySelector('.radio');
    if (this.controle < 50) {
      this.valorEscolhido == '' ? this.valorEscolhido = '1' : '';
      this.respostasB5.push(parseInt(this.valorEscolhido));
      this.total = this.total + parseInt(this.valorEscolhido);
      this.controle >= 0 ? btnVoltar?.removeAttribute('disabled') : btnVoltar?.setAttribute('disabled', '');
      this.controle++;
      if (this.controle <= 49) {
        this.numeroPergunta++;
        this.showPergunta = this.perguntas[this.controle].pergunta;
        document.querySelector('.cardb5')?.hasAttribute('hidden') ? document.querySelector('.cardb5')?.removeAttribute('hidden') : '';
      }
      console.log(this.respostasB5, ' - ', this.total, ' - ', this.controle);
    }
    if (this.controle >= 50) {
      //btnEnviar?.setAttribute('disabled',"");
      //btnEnviar?.setAttribute('value','Enviar');
      btnEnviar?.removeAttribute('disabled');
      radio?.setAttribute('disabled', '');
      $('input[name="radiob5"]').prop('disabled', true);
      // $('input[name="radioB"]').prop('disabled', true);
      this.controle = 50;
      //this.resposta(this.respostasB5);
    } /*else{
      btnEnviar?.removeAttribute('disabled');
      }
      /* let radio1 = document.getElementsByName('flexRadioDefault');
      radio1?.forEach(x =>{ x.removeAttribute('checked')})*/
    $('input[name="radiob5"]').prop('checked', false);
    // $('input[name="radioB"]').prop('checked', false);
  }

  enviar() {
    this.resposta(this.respostasB5);
  }
  resposta(resp) {
    //resp=[5,5,5,5,5,4,3,2,4,5,2,1,2,3,4,3,4,4,4,4,3,3,3,3,4,4,4,4,5,5,5,4,3,2,3,3,4,4,4,4,4,5,5,5,5,4,4,4,4,4]
    let eM = 20 + resp[0] + resp[10] + resp[20] + resp[30] + resp[40];
    let aM = 14 + resp[6] + resp[16] + resp[26] + resp[36] + resp[41] + resp[46];
    let cM = 14 + resp[2] + resp[12] + resp[22] + resp[32] + resp[42] + resp[47];
    let nM = 38 + resp[8] + resp[18];
    let oM = 8 + resp[4] + resp[14] + resp[24] + resp[34] + resp[39] + resp[44] + resp[49];
    let extroversao = resp[5] + resp[15] + resp[25] + resp[35] + resp[45];
    let agradabilidade = resp[1] + resp[11] + resp[21] + resp[31];
    let concienciosidade = resp[7] + resp[17] + resp[27] + resp[37];
    let estabilidade = resp[3] + resp[13] + resp[23] + resp[28] + resp[33] + resp[38] + resp[43] + resp[48];
    let abertura = resp[9] + resp[19] + resp[29];
    //console.log(nD)
    //console.log(oD)
    let e,
      a,
      c,
      n,
      o = 0;
    this.extroversao = eM - extroversao;
    this.agradabilidade = aM - agradabilidade;
    this.conscienciosidade = cM - concienciosidade;
    this.estabilidade = nM - estabilidade;
    this.abertura = oM - abertura;
    console.log('e ', this.extroversao, ' - a ', this.agradabilidade, ' - c ', this.conscienciosidade, ' - n ', this.estabilidade, ' - o ', this.abertura);
    this.chartb5([this.extroversao, this.agradabilidade, this.conscienciosidade, this.estabilidade, this.abertura]);
  }
  chartb5(dados = []) {
    //(document.querySelector('.divgraficob5')?.hasAttribute('hidden')) ? document.querySelector('.divgraficob5')?.removeAttribute('hidden') : '';
    document.querySelector('.resultado')?.hasAttribute('hidden') ? document.querySelector('.resultado')?.removeAttribute('hidden') : '';
    document.querySelector('.cardb5')?.setAttribute('hidden', '');
    document.querySelector('.cardb52')?.setAttribute('hidden', '');
    /*
        this.chart ? this.chart.destroy() : '';
    
        this.chart = new Chart("MyChart", {
          type: "bar",
          data: {
            labels: ["Extroversão", "Agradabilidade", "Conciensciosidade", "Estabilidade", "Abertura"],
            datasets: [
              {
                label: "Pontuação",
                data: dados,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                 
                ],
                borderWidth: 1
              }
            ]
          },
          options : {
            scales: {
              
              },
          },
        });
    */
    const sliders = document.querySelectorAll(".slider-ui");
    sliders.forEach((slider, index) => {
      console.log(index);
      this.min = '0';
      this.max = '40';
      const trackId = slider.querySelector(".value").id;
      let track = document.getElementById(trackId);
      track.style.left = dados[index] / 40 * 100 + '%';
      track.textContent = dados[index].toString();
    });
  }
  /**this.chart = new Chart("MyChart", {
        type: 'pie', //this denotes tha type of chart
         data: {// values on X-Axis
          labels: ['Extroversão', 'Agradabilidade','Conscienciosidade','Estabilidade','Abertura'],
          datasets: [{
      label: 'Pontuação',
      data: dados,
      backgroundColor: [
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
      ],
      hoverOffset: 4
    }],
        },
        options: {
          aspectRatio:2.5,
          responsive:true,
        }
       });
  }*/
  onClickDivB5(div, lbl, icon) {
    document.querySelector('.' + div)?.hasAttribute('hidden') ? document.querySelector('.' + div)?.removeAttribute('hidden') : document.querySelector('.' + div)?.setAttribute('hidden', '');
    document.querySelector('.' + lbl)?.hasAttribute('hidden') ? document.querySelector('.' + lbl)?.removeAttribute('hidden') : document.querySelector('.' + lbl)?.setAttribute('hidden', '');
    if (document.getElementById(icon)?.classList.contains('fa-arrow-down')) {
      document.getElementById(icon)?.classList.remove('fa-arrow-down');
      document.getElementById(icon)?.classList.add('fa-arrow-up');
    } else {
      document.getElementById(icon)?.classList.remove('fa-arrow-up');
      document.getElementById(icon)?.classList.add('fa-arrow-down');
    }
  }
}
_class = CurriculumAtributosbig5FormComponent;
_class.ɵfac = function CurriculumAtributosbig5FormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributosbig5-form"]],
  viewQuery: function CurriculumAtributosbig5FormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c5, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.divb5 = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.divextroversao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.lblextroversao = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.btnv = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.btne = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.radio = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 5,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [4, "ngIf", "ngIfElse"], ["bigfive", ""], ["title", "Voc\u00EA quer se conhecer melhor? Este teste de personalidade ir\u00E1 ajud\u00E1-lo a compreender as formas de seu comportamento e os motivos de suas a\u00E7\u00F5es.", 1, "my-5", 3, "bold"], ["id", "cardpergb5", 1, "card", "cardb52", "my-3"], [1, "card-header"], [1, "row", "tex-center", "divb5"], ["divb5", ""], [1, "text-center", "fw-bold"], [1, "card-body", "text-wrap"], [1, "row", "my-2"], ["id", "divradiob5", 1, "col-md-12", 3, "change"], [1, "form-check"], ["type", "radio", "name", "radiob5", "id", "radiob51", "value", "1", 1, "form-check-input"], ["for", "radiob51", 1, "form-check-label"], ["type", "radio", "name", "radiob5", "id", "radiob52", "value", "2", 1, "form-check-input"], ["for", "radiob52", 1, "form-check-label"], ["type", "radio", "name", "radiob5", "id", "radiob53", "value", "3", 1, "form-check-input"], ["for", "radiob53", 1, "form-check-label"], ["type", "radio", "name", "radiob5", "id", "radiob54", "value", "4", 1, "form-check-input"], ["for", "radiob54", 1, "form-check-label"], ["type", "radio", "name", "radiob5", "id", "radiob55", "value", "5", 1, "form-check-input"], ["for", "radiob55", 1, "form-check-label"], [1, "card-footer"], [1, "row", "d-flex", "justify-content-between"], [1, "col-md-3"], ["type", "button", "id", "btnv", "name", "btnv2", "disabled", "", 1, "btn", "btn-primary", "btnvoltar", 3, "click"], ["btnv", ""], ["type", "button", "id", "btne", "name", "btne2", "disabled", "", 1, "btn", "btn-primary", "btnenviar", 3, "click"], ["hidden", "", 1, "resultado"], [1, "row", "mb-4"], [1, "col-md-12"], ["id", "lblexppt"], [1, "row", "mb-1"], [3, "click"], ["id", "icodivgraf5", 1, "fa-solid", "fa-square-plus"], [1, "lblgrafico"], ["id", "igrafico"], ["hidden", "", 1, "divgraficob5", "mb-5"], [1, "chart-container"], ["id", "MyChart"], [1, "slider-container"], [1, "slider-ui", "color1"], ["type", "range", "min", "0", "max", "40", "step", "1"], [1, "bar"], [1, "min"], [1, "max"], [1, "sp1"], [1, "sp2"], [1, "track"], ["id", "track1", 1, "value"], ["icon", "fas fa-arrow-down", 1, "mt-5", 3, "click"], [1, "col"], ["id", "iextroversao", 1, "fas", "fa-arrow-down"], ["id", "lbl_extroversao", "controlName", "lbl_extroversao", 1, "lblextroversao", "fw-bolder"], ["lblextroversao", ""], ["controlName", "divextroversao", "hidden", "", 1, "divextroversao"], ["divextroversao", ""], [1, "row"], ["id", "p_extroversao", 1, "text-justify"], ["id", "div_pontos_extroversao", 1, "row", "my-1"], [1, "col-md-6", "d-flex", "justify-content-start"], [1, ""], [1, "col-md-4", "d-flex", "justify-content-start"], ["id", "lblextroversao ", 1, ""], [1, "slider-ui", "color2"], ["id", "track2", 1, "value"], ["id", "iagradabilidade", 1, "fas", "fa-arrow-down"], ["id", "icon_agradabilidade", 1, "fa-solid", "fa-square-plus"], ["id", "lbl_agradabilidade", 1, "lblagradabilidade", "fw-bolder"], ["lblagradabilidade", ""], ["hidden", "", 1, "divagradabilidade"], ["divagradabilidade", ""], ["id", "p_agradabilidade", 1, "text-justify"], ["id", "div_pontos_agradabilidade", 1, "row", "my-1"], ["id", "lblagradabilidade", 1, ""], [1, "slider-ui", "color3"], ["id", "track3", 1, "value"], ["id", "iconscienciosidade", 1, "fas", "fa-arrow-down"], ["id", "icon_conscienciosidade", 1, "fa-solid", "fa-square-plus"], ["id", "lbl_conscienciosidade", 1, "lblconscienciosidade", "fw-bolder"], ["lblconscienciosidade", ""], ["hidden", "", 1, "divconscienciosidade"], ["divconscienciosidade", ""], ["id", "p_conscienciosidade", 1, "text-justify"], ["id", "div_conscienciosidade", 1, "row", "my-1"], ["id", "lblconscienciosidade", 1, "valor"], [1, "slider-ui", "color4"], ["id", "track4", 1, "value"], [1, "mb-1", 3, "click"], ["id", "iestabilidade", 1, "fas", "fa-arrow-down"], ["id", "icon_estabilidade", 1, "fa-solid", "fa-square-plus"], ["id", "lbl_estabilidade", 1, "lblestabilidade", "fw-bolder"], ["lblestabilidade", ""], ["hidden", "", 1, "divestabilidade"], ["divestabilidade", ""], ["id", "div_estabilidade", 1, "row"], ["id", "p_estabilidade", 1, "text-justify"], ["id", "div_pontos_estabilidade", 1, "row", "my-1"], ["id", "lblestabilidade", 1, ""], [1, "slider-ui", "color5"], ["id", "track5", 1, "value"], ["id", "iabertura", 1, "fas", "fa-arrow-down"], ["id", "icon_abertura", 1, "fa-solid", "fa-square-plus"], ["id", "lbl_abertura", 1, "lblabertura", "fw-bolder"], ["lblabertura", ""], ["hidden", "", 1, "divabertura"], ["divabertura", ""], ["id", "div_abertura", 1, "row"], ["id", "p_abertura", 1, "text-justify"], ["id", "div_pontos_abertura", 1, "row", "my-1"], ["id", "lblabertura", 1, ""]],
  template: function CurriculumAtributosbig5FormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function CurriculumAtributosbig5FormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumAtributosbig5FormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, CurriculumAtributosbig5FormComponent_div_1_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, CurriculumAtributosbig5FormComponent_ng_template_2_Template, 273, 24, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.questionario)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__.SeparatorComponent],
  styles: [".h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.card-footer[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.chart-container[_ngcontent-%COMP%], .divgraficob5[_ngcontent-%COMP%] {\n  position: relative;\n  height: 40vh;\n  width: 80vw;\n}\n\n.fas[_ngcontent-%COMP%] {\n  width: 20px !important;\n}\n\n\n\n\n\n\n\n\n\n\n\n.slider-ui[_ngcontent-%COMP%] {\n  position: relative;\n  width: 500px;\n  height: 50px;\n  margin: 35px 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  cursor: pointer;\n  opacity: 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #000;\n  border-radius: 50px;\n  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);\n}\n\n.slider-ui[_ngcontent-%COMP%]   .min[_ngcontent-%COMP%], .slider-ui[_ngcontent-%COMP%]   .max[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 14px;\n  font-weight: 800;\n  color: #fff;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .min[_ngcontent-%COMP%] {\n  left: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .max[_ngcontent-%COMP%] {\n  right: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp1[_ngcontent-%COMP%], .slider-ui[_ngcontent-%COMP%]   .sp2[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 120%;\n  font-size: 14px;\n  font-weight: 800;\n  color: #000000;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp1[_ngcontent-%COMP%] {\n  left: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp2[_ngcontent-%COMP%] {\n  right: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .track[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  left: 25px;\n  right: 25px;\n  top: 0;\n  bottom: 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  width: 50px;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 800;\n  color: #000000;\n  background-color: #fff;\n  border: 2px solid #000;\n  border-radius: 100%;\n  box-sizing: border-box;\n  transform: translateX(-50%);\n  transition: top 0.3s ease-in-out, color 0.3s ease-in-out;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .value.up[_ngcontent-%COMP%] {\n  color: #000;\n}\n\n.slider-ui.color1[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color2[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color3[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color4[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color5[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  background-image: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);\n}\n\n.slider-ui.color1[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color2[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color3[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color4[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color5[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  border-color: #000000;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJyaWN1bHVtLWF0cmlidXRvcy9jdXJyaWN1bHVtLWF0cmlidXRvc2JpZzUtZm9ybS9jdXJyaWN1bHVtLWF0cmlidXRvc2JpZzUtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHdCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0csa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUNIOztBQUVFO0VBQ0Usc0JBQUE7QUFDSjs7QUFHQzs7Ozs7Ozs7R0FBQTtBQVdDO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFGSjs7QUFJRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0FBREo7O0FBR0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0FBQUo7O0FBRUU7O0VBRUUsa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNFO0VBQ0UsUUFBQTtBQUVKOztBQUFFO0VBQ0UsU0FBQTtBQUdKOztBQUFFOztFQUVFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBR0o7O0FBREU7RUFDRSxRQUFBO0FBSUo7O0FBRkU7RUFDRSxTQUFBO0FBS0o7O0FBSEU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0FBTUo7O0FBSkU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0Esd0RBQUE7QUFPSjs7QUFMRTtFQUVFLFdBQUE7QUFPSjs7QUFMRTtFQUNFLCtFQUFBO0FBUUo7O0FBTkU7RUFDRSxxQkFBQTtBQVNKIiwic291cmNlc0NvbnRlbnQiOlsiLmg0LCAuY2FyZC10aXRsZXtcbiAgICBmb250LWZhbWlseTogbmV1dHJhIHRleHQ7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbiAgXG4uY2FyZHtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbi5jYXJkLWZvb3RlcntcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbi5jaGFydC1jb250YWluZXIsIC5kaXZncmFmaWNvYjV7XG4gICBwb3NpdGlvbjogcmVsYXRpdmU7IFxuICAgaGVpZ2h0OjQwdmg7IFxuICAgd2lkdGg6ODB2d1xuICB9XG5cbiAgLmZhc3tcbiAgICB3aWR0aDogMjBweCAhaW1wb3J0YW50O1xuICB9XG5cblxuIC8qIGJvZHkge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIH0qL1xuICBcblxuICAuc2xpZGVyLXVpIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDUwMHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBtYXJnaW46IDM1cHggMDtcbiAgfVxuICAuc2xpZGVyLXVpIGlucHV0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogMTA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAuc2xpZGVyLXVpIC5iYXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gICAgYm94LXNoYWRvdzogMCA1cHggMCByZ2JhKDAsMCwwLC4xKTtcbiAgfVxuICAuc2xpZGVyLXVpIC5taW4sXG4gIC5zbGlkZXItdWkgLm1heCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDI7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogODAwO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG4gIC5zbGlkZXItdWkgLm1pbiB7XG4gICAgbGVmdDogMiU7XG4gIH1cbiAgLnNsaWRlci11aSAubWF4IHtcbiAgICByaWdodDogMiU7XG4gIH1cblxuICAuc2xpZGVyLXVpIC5zcDEsXG4gIC5zbGlkZXItdWkgLnNwMiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDI7XG4gICAgdG9wOiAxMjAlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogODAwO1xuICAgIGNvbG9yOiAjMDAwMDAwO1xuICB9XG4gIC5zbGlkZXItdWkgLnNwMSB7XG4gICAgbGVmdDogMiU7XG4gIH1cbiAgLnNsaWRlci11aSAuc3AyIHtcbiAgICByaWdodDogMiU7XG4gIH1cbiAgLnNsaWRlci11aSAudHJhY2sge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAzO1xuICAgIGxlZnQ6IDI1cHg7XG4gICAgcmlnaHQ6IDI1cHg7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgfVxuICAuc2xpZGVyLXVpIC52YWx1ZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB0cmFuc2l0aW9uOiB0b3AgLjNzIGVhc2UtaW4tb3V0LCBjb2xvciAuM3MgZWFzZS1pbi1vdXQ7XG4gIH1cbiAgLnNsaWRlci11aSAudmFsdWUudXAge1xuICAgIC8vdG9wOiAtMTEwJTtcbiAgICBjb2xvcjogIzAwMDtcbiAgfVxuICAuc2xpZGVyLXVpLmNvbG9yMSAuYmFyLCAuc2xpZGVyLXVpLmNvbG9yMiAuYmFyICwuc2xpZGVyLXVpLmNvbG9yMyAuYmFyLC5zbGlkZXItdWkuY29sb3I0IC5iYXIgLC5zbGlkZXItdWkuY29sb3I1IC5iYXIgIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMjAwMjQgMCUsICMwOTA5NzkgMzUlLCAjMDBkNGZmIDEwMCUpO1xuICB9XG4gIC5zbGlkZXItdWkuY29sb3IxIC52YWx1ZSwgLnNsaWRlci11aS5jb2xvcjIgLnZhbHVlLCAuc2xpZGVyLXVpLmNvbG9yMyAudmFsdWUsIC5zbGlkZXItdWkuY29sb3I0IC52YWx1ZSwgLnNsaWRlci11aS5jb2xvcjUgLnZhbHVlIHtcbiAgICBib3JkZXItY29sb3I6ICMwMDAwMDA7XG4gIH1cbiAgXG4gIFxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 28366:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosdiscFormComponent: () => (/* binding */ CurriculumAtributosdiscFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/questionario-resposta.model */ 86920);
/* harmony import */ var src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/questionario-resposta-dao.service */ 54771);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);

var _class;








class CurriculumAtributosdiscFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta, src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRespostaDaoService);
    this.injector = injector;
    this.respostas = [];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get(src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__.QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__.QuestionarioPerguntaDaoService);
    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";
    this.form = this.fh.FormBuilder({
      comunica: {
        default: 0
      },
      lideranca: {
        default: 0
      },
      resolucao: {
        default: 0
      },
      criatividade: {
        default: 0
      },
      pensamento: {
        default: 0
      },
      habilidade: {
        default: 0
      },
      adaptabilidade: {
        default: 0
      },
      etica: {
        default: 0
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  initializeData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const questionario = yield _this.questionarioDao?.query({
        where: [['codigo', '==', 'SOFTSKILLS']],
        join: ['perguntas']
      }).asPromise();
      if (questionario?.length) {
        questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
        _this.questionario = questionario[0];
        const questionarioResposta = yield _this.dao?.query({
          where: [['questionario_id', '==', _this.questionario.id], ['usuario_id', '==', _this.auth.usuario?.id]],
          join: ['questionario_resposta_pergunta']
        }).asPromise();
        _this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
        let respostas = [];
        if (_this.entity) {
          _this.questionario.perguntas.forEach((pergunta, index) => {
            _this.entity.questionario_resposta_pergunta.forEach((resposta, index) => {
              if (pergunta.id == resposta.questionario_pergunta_id) respostas.push(resposta.resposta);
            });
          });
          _this.form.controls.comunica.setValue(respostas[0]);
          _this.form.controls.lideranca.setValue(respostas[1]);
          _this.form.controls.resolucao.setValue(respostas[2]);
          _this.form.controls.criatividade.setValue(respostas[3]);
          _this.form.controls.pensamento.setValue(respostas[4]);
          _this.form.controls.habilidade.setValue(respostas[5]);
          _this.form.controls.adaptabilidade.setValue(respostas[6]);
          _this.form.controls.etica.setValue(respostas[7]);
        }
      } else {
        _this.dialog.alert("Teste Soft-Skills não localizado", "Teste não localizado");
      }
      yield _this.loadData(_this.entity, form);
    })();
  }
  saveData(form) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log('curriculum-atributosdisc-form');
      return false;
    })();
  }
  valorSoftChange(control) {
    control.value == '' ? control.setValue(0) : '';
    const comunica = this.form?.controls.comunica.value;
    const lideranca = this.form?.controls.lideranca.value;
    const resolucao = this.form?.controls.resolucao.value;
    const criatividade = this.form?.controls.criatividade.value;
    const pensamento = this.form?.controls.pensamento.value;
    const habilidade = this.form?.controls.habilidade.value;
    const adaptabilidade = this.form?.controls.adaptabilidade.value;
    const etica = this.form?.controls.etica.value;
    const array = [comunica, lideranca, resolucao, criatividade, pensamento, habilidade, adaptabilidade, etica];
    let soma = 0;
    for (const val of array) {
      //console.log('SUM SEQUENCIA', sum)
      soma = soma + parseInt(val);
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
}
_class = CurriculumAtributosdiscFormComponent;
_class.ɵfac = function CurriculumAtributosdiscFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributosdisc-form"]],
  viewQuery: function CurriculumAtributosdiscFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 3,
  vars: 3,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"]],
  template: function CurriculumAtributosdiscFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "curriculum-atributosdisc-form works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function CurriculumAtributosdiscFormComponent_Template_editable_form_submit_2_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumAtributosdiscFormComponent_Template_editable_form_cancel_2_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 11229:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributossoftFormComponent: () => (/* binding */ CurriculumAtributossoftFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/questionario-resposta.model */ 86920);
/* harmony import */ var src_app_models_questionario_resposta_pergunta_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/questionario-resposta-pergunta.model */ 56260);
/* harmony import */ var src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/questionario-resposta-dao.service */ 54771);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);

var _class;











function CurriculumAtributossoftFormComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " Formul\u00E1rio de SoftSkill n\u00E3o encontrado no banco de dados. Contate o suporte! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function CurriculumAtributossoftFormComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h4", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Compet\u00EAncias Gerenciais, distribua 20 pontos entre as habilidades abaixo: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 4)(3, "div", 5)(4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 8)(7, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, "Comunica\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "div", 10)(10, "div", 11)(11, "p", 12)(12, "input-number", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r11.valorSoftChange(ctx_r11.form.controls.comunica));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 5)(15, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](16, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "div", 8)(18, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, "Lideran\u00E7a");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "div", 10)(21, "div", 11)(22, "p", 12)(23, "input-number", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r13.valorSoftChange(ctx_r13.form.controls.lideranca));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "div", 5)(26, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](27, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "div", 8)(29, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](30, "Resolu\u00E7\u00E3o de Problemas");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "div", 10)(32, "div", 19)(33, "p", 12)(34, "input-number", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_34_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r14.valorSoftChange(ctx_r14.form.controls.resolucao));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](36, "div", 5)(37, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](38, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](39, "div", 8)(40, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](41, "Criatividade e Curiosidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](42, "div", 10)(43, "div", 19)(44, "p", 12)(45, "input-number", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_45_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r15.valorSoftChange(ctx_r15.form.controls.criatividade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](47, "div", 25)(48, "div", 5)(49, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](50, "img", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](51, "div", 8)(52, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](53, "Pensamento Cr\u00EDtico");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](54, "div", 10)(55, "div", 19)(56, "p", 12)(57, "input-number", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r16.valorSoftChange(ctx_r16.form.controls.pensamento));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](59, "div", 5)(60, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](61, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](62, "div", 8)(63, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](64, "Habilidade com Pessoas e Equipes");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](65, "div", 10)(66, "div", 19)(67, "p", 12)(68, "input-number", 30, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_68_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r17.valorSoftChange(ctx_r17.form.controls.habilidade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](70, "div", 5)(71, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](72, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](73, "div", 8)(74, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](75, "Adaptabilidade e Resili\u00EAncia");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](76, "div", 10)(77, "div", 19)(78, "p", 12)(79, "input-number", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_79_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r18.valorSoftChange(ctx_r18.form.controls.adaptabilidade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](81, "div", 5)(82, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](83, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](84, "div", 8)(85, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](86, "\u00C9tica");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](87, "div", 10)(88, "div", 11)(89, "p", 12)(90, "input-number", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_90_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r19.valorSoftChange(ctx_r19.form.controls.etica));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("control", ctx_r2.form.controls.comunica)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.lideranca)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.resolucao)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.criatividade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.pensamento)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.habilidade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.adaptabilidade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("control", ctx_r2.form.controls.etica)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("min", 0);
  }
}
class CurriculumAtributossoftFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  //public formSoftSkills: FormGroup;
  constructor(injector) {
    super(injector, src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta, src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_7__.QuestionarioRespostaDaoService);
    this.injector = injector;
    this.respostas = [];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get(src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__.QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__.QuestionarioPerguntaDaoService);
    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";
    this.form = this.fh.FormBuilder({
      comunica: {
        default: 0
      },
      lideranca: {
        default: 0
      },
      resolucao: {
        default: 0
      },
      criatividade: {
        default: 0
      },
      pensamento: {
        default: 0
      },
      habilidade: {
        default: 0
      },
      adaptabilidade: {
        default: 0
      },
      etica: {
        default: 0
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  }
  initializeData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const questionario = yield _this.questionarioDao?.query({
        where: [['codigo', '==', 'SOFTSKILLS']],
        join: ['perguntas']
      }).asPromise();
      if (questionario?.length) {
        questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
        _this.questionario = questionario[0];
        const questionarioResposta = yield _this.dao?.query({
          where: [['questionario_id', '==', _this.questionario.id], ['usuario_id', '==', _this.auth.usuario?.id]],
          join: ['questionario_resposta_pergunta']
        }).asPromise();
        _this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
        let respostas = [];
        if (_this.entity) {
          _this.questionario.perguntas.forEach((pergunta, index) => {
            _this.entity.questionario_resposta_pergunta.forEach((resposta, index) => {
              if (pergunta.id == resposta.questionario_pergunta_id) respostas.push(resposta.resposta);
            });
          });
          _this.form.controls.comunica.setValue(respostas[0]);
          _this.form.controls.lideranca.setValue(respostas[1]);
          _this.form.controls.resolucao.setValue(respostas[2]);
          _this.form.controls.criatividade.setValue(respostas[3]);
          _this.form.controls.pensamento.setValue(respostas[4]);
          _this.form.controls.habilidade.setValue(respostas[5]);
          _this.form.controls.adaptabilidade.setValue(respostas[6]);
          _this.form.controls.etica.setValue(respostas[7]);
        }
      } else {
        _this.dialog.alert("Teste Soft-Skills não localizado", "Teste não localizado");
      }
      yield _this.loadData(_this.entity, form);
    })();
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.questionario) return false;
      let questionarioResposta = _this2.util.fill(new src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta(), _this2.entity || {});
      questionarioResposta.usuario_id = _this2.auth.usuario?.id;
      questionarioResposta.editavel = 1;
      questionarioResposta.questionario_id = _this2.questionario.id;
      //questionarioResposta.data_resposta = new Date();;
      const valores = [_this2.form.controls.comunica.value, _this2.form.controls.lideranca.value, _this2.form.controls.resolucao.value, _this2.form.controls.criatividade.value, _this2.form.controls.pensamento.value, _this2.form.controls.habilidade.value, _this2.form.controls.adaptabilidade.value, _this2.form.controls.etica.value];
      /*let array : any=[];
      let respostas = this.entity?.questionario_resposta_pergunta;
      respostas?.forEach((x,i)=>{
        let arrayQRP = new QuestionarioRespostaPergunta();
        arrayQRP.questionario_pergunta_id = x.questionario_pergunta_id;
        arrayQRP.resposta = x.resposta;
        arrayQRP._status = "ADD";
        array.push(arrayQRP)
      })
           array?.forEach((x : any,i: number)=>{
        if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))){
          x.resposta = parseInt(valores[i]);
          x._status = "EDIT";
        }
      })*/
      let respostas = _this2.entity?.questionario_resposta_pergunta || valores.map((x, i) => new src_app_models_questionario_resposta_pergunta_model__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRespostaPergunta({
        questionario_pergunta_id: _this2.questionario.perguntas[i].id,
        resposta: parseInt(x),
        _status: "ADD"
      }));
      respostas.forEach((x, i) => {
        if (x._status != "ADD" && parseInt(x.resposta) != parseInt(valores[i])) {
          x.resposta = parseInt(valores[i]);
          x._status = "EDIT";
        }
      });
      questionarioResposta.questionario_resposta_pergunta = respostas;
      return questionarioResposta;
    })();
  }
  valorSoftChange(control) {
    control.value == '' ? control.setValue(0) : '';
    const comunica = this.form?.controls.comunica.value;
    const lideranca = this.form?.controls.lideranca.value;
    const resolucao = this.form?.controls.resolucao.value;
    const criatividade = this.form?.controls.criatividade.value;
    const pensamento = this.form?.controls.pensamento.value;
    const habilidade = this.form?.controls.habilidade.value;
    const adaptabilidade = this.form?.controls.adaptabilidade.value;
    const etica = this.form?.controls.etica.value;
    const array = [comunica, lideranca, resolucao, criatividade, pensamento, habilidade, adaptabilidade, etica];
    let soma = 0;
    for (const val of array) {
      //console.log('SUM SEQUENCIA', sum)
      soma = soma + parseInt(val);
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
}
_class = CurriculumAtributossoftFormComponent;
_class.ɵfac = function CurriculumAtributossoftFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributossoft-form"]],
  viewQuery: function CurriculumAtributossoftFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 5,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [4, "ngIf", "ngIfElse"], ["softskills", ""], [1, "my-5"], [1, "row", "justify-content-between", "g-4"], [1, "col-lg-3"], [1, "card", "h-100"], ["src", "/assets/icons/icone_comunicacao.png", "id", "imgComunica", "alt", "...", 1, "card-img-top"], [1, "card-body"], [1, "card-title", "text-center"], [1, "row", "justify-content-center"], [1, "col-md-12"], [1, "card-text"], ["controlName", "comunica", 3, "control", "minValue", "maxValue", "change"], ["comunicaV", ""], ["src", "/assets/icons/icone_lideranca.png", "id", "imgLideranca", "alt", "...", 1, "card-img-top"], ["controlName", "lideranca", 3, "size", "control", "minValue", "maxValue", "change"], ["liderancaV", ""], ["src", "/assets/icons/icone_resolucao.png", "id", "imgResolucao", "alt", "...", 1, "card-img-top"], [1, "col-md-8"], ["controlName", "resolucao", 3, "size", "control", "minValue", "maxValue", "change"], ["resolucaoV", ""], ["src", "/assets/icons/icone_criatividade.png", "id", "imgCriatividade", "alt", "...", 1, "card-img-top"], ["controlName", "criatividade", 3, "size", "control", "minValue", "maxValue", "change"], ["criatividadeV", ""], [1, "row", "justify-content-between", "g-4", "mt-3"], ["src", "/assets/icons/icone_pensamento.png", "id", "imgPensamento", "alt", "...", 1, "card-img-top"], ["controlName", "pensamento", 3, "size", "control", "minValue", "maxValue", "change"], ["pensamentoV", ""], ["src", "/assets/icons/icone_habilidades.png", "id", "imgHabilidade", "alt", "...", 1, "card-img-top"], ["controlName", "habilidade", 3, "size", "control", "minValue", "maxValue", "change"], ["habilidadeV", ""], ["src", "/assets/icons/icone_adaptabilidade.png", "id", "imgAdaptabilidade", "alt", "...", 1, "card-img-top"], ["controlName", "adaptabilidade", 3, "size", "control", "minValue", "maxValue", "change"], ["adaptabilidadeV", ""], ["src", "/assets/icons/icone_etica.png", "id", "imgEtica", "alt", "...", 1, "card-img-top"], ["controlName", "etica", 3, "control", "minValue", "maxValue", "change"], ["eticaV", ""]],
  template: function CurriculumAtributossoftFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function CurriculumAtributossoftFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumAtributossoftFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, CurriculumAtributossoftFormComponent_div_1_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, CurriculumAtributossoftFormComponent_ng_template_2_Template, 92, 38, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.questionario)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_8__.InputNumberComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);.h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJyaWN1bHVtLWF0cmlidXRvcy9jdXJyaWN1bHVtLWF0cmlidXRvc3NvZnQtZm9ybS9jdXJyaWN1bHVtLWF0cmlidXRvc3NvZnQtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLHdCQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBQUY7O0FBSUE7RUFDRSxtQkFBQTtBQURGIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9uZXV0cmEtdGV4dC1hbHQnKTtcblxuLmg0LCAuY2FyZC10aXRsZXtcbiAgZm9udC1mYW1pbHk6IG5ldXRyYSB0ZXh0O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmNhcmQtaW1nLXRvcHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDkwcHg7XG4gLy8gYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjdmYTtcbn1cblxuLmNhcmR7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 64169:
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/currriculum-atributos.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrriculumAtributosComponent: () => (/* binding */ CurrriculumAtributosComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 43872);
/* harmony import */ var _curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-atributossoft-form/curriculum-atributossoft-form.component */ 11229);
/* harmony import */ var _curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curriculum-atributosdisc-form/curriculum-atributosdisc-form.component */ 28366);
/* harmony import */ var _curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./curriculum-atributos-dass-form/curriculum-atributos-dass-form.component */ 50090);
var _class;








class CurrriculumAtributosComponent {
  constructor(injector) {
    this.injector = injector;
  }
}
_class = CurrriculumAtributosComponent;
_class.ɵfac = function CurrriculumAtributosComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-currriculum-atributos"]],
  viewQuery: function CurrriculumAtributosComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  decls: 9,
  vars: 0,
  consts: [["display", "", "right", "", 1, "my-5"], ["key", "BIG5", "label", "Big-Five", 1, "fw-bold"], ["key", "SOFTSKILLS", "label", "Soft-Skills", 1, "fw-bold"], ["key", "DASS21", "label", "DASS-21", 1, "fw-bold"], ["key", "DISC", "label", "Disc", 1, "fw-bold"]],
  template: function CurrriculumAtributosComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "curriculum-atributosbig5-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "curriculum-atributossoft-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "curriculum-atributos-dass-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "tab", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "curriculum-atributosdisc-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__.TabComponent, _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumAtributosbig5FormComponent, _curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributossoftFormComponent, _curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_5__.CurriculumAtributosdiscFormComponent, _curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_6__.CurriculumAtributosDassFormComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=4515.js.map