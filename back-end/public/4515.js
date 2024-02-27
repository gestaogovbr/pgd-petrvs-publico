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
    this.unidade_id = "";
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
      if (['cidade_id', 'estados', 'apresentacao', 'telefone'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } /*else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
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
      //console.log('CIDADE',cidade)
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
    return new Promise((resolve, reject) => {
      let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_7__.Curriculum(), this.entity);
      curriculum.id = this.id;
      // curriculum.quantidade_filhos == "" ? (curriculum.quantidade_filhos = 0) : (curriculum.quantidade_filhos = 2);
      curriculum = this.util.fillForm(curriculum, this.form.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      //curriculum.cidade_id = "86297f92-d919-e12f-476d-6aff99c46809";
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
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.radioFalaIdioma);
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

/***/ 57461:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-pesquisa-list-usuario/curriculum-pesquisa-list-usuario.component.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumPesquisaListUsuarioComponent: () => (/* binding */ CurriculumPesquisaListUsuarioComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/profile-picture/profile-picture.component */ 2729);
var _class;










function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Quantidade: ", row_r2.curriculum.quantidade_filhos, "");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_57_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "small")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, " Fala: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, "Escrita: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, " Entendimento: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const idioma_r39 = ctx.$implicit;
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("- ", ctx_r38.lookup.getValue(ctx_r38.lookup.IDIOMAS, idioma_r39.idioma), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r38.lookup.getValue(ctx_r38.lookup.NIVEL_IDIOMA, idioma_r39.idiomaFala), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r38.lookup.getValue(ctx_r38.lookup.NIVEL_IDIOMA, idioma_r39.idiomaEscrita), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r38.lookup.getValue(ctx_r38.lookup.NIVEL_IDIOMA, idioma_r39.idiomaEntendimento));
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_57_span_1_Template, 16, 4, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.curriculum.idiomas);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem idiomas ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_64_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "small")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Area: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, "Titulo: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "Curso: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const graduacao_r42 = ctx.$implicit;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](graduacao_r42.pretensao == 0 ? "Finalizado" : "Pretendo Fazer");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", graduacao_r42.curso.area_conhecimento.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r41.lookup.getValue(ctx_r41.lookup.TITULOS_CURSOS, graduacao_r42.curso.titulo), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](graduacao_r42.curso.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_64_span_1_Template, 16, 4, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.curriculum.graduacoes);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem graduacao ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_71_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "span");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_71_span_1_Template, 1, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.curriculum.pos);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem p\u00F3s ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_78_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "span");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_78_span_1_Template, 1, 0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.curriculum.mestrado);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem mestrado ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_87_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const funcao_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](funcao_r51.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_87_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_87_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_funcao);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_88_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem funcao ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_99_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lotacao_r54 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](lotacao_r54.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_99_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_99_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_lotacao);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_100_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem hist\u00F3rico ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_106_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span")(1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const interno_r57 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"]("", interno_r57.curso.titulo, " : ", interno_r57.curso.nome, "");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_106_span_1_Template, 3, 2, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_docencia_interna);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_107_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " N\u00E3o \u00E9 docente na PRF ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_110_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const externo_r60 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](externo_r60.area_atividade_externa.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_110_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_110_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_docencia_externa);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_111_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " N\u00E3o \u00E9 docente fora da PRF ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_119_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const atividade_r63 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](atividade_r63.capacidade_tecnica.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_119_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_119_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_atividade_interna);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_120_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem capacita\u00E7\u00F5es internas ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_126_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const atividade_r66 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](atividade_r66.area_atividade_externa == null ? null : atividade_r66.area_atividade_externa.nome);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_126_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_126_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.historico_atividade_externa);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_127_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem capacita\u00E7\u00F5es externas ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_133_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const habilidade_r69 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](habilidade_r69.value);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_div_133_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_133_span_1_Template, 2, 1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", row_r2.especifique_habilidades);
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_134_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0, " Sem habilidades ");
  }
}
function CurriculumPesquisaListUsuarioComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "profile-picture", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 7)(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "separator", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 10)(11, "separator", 11)(12, "div", 12)(13, "div", 13)(14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](15, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "div", 13)(19, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](20, "Telefone");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](21, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "div", 13)(24, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25, "Estado civil");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](26, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 13)(29, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30, "Filhos");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](31, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](33, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_33_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 12)(35, "div", 13)(36, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](37, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](38, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](40, "div", 13)(41, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](42, "Cidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](43, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "div", 13)(46, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](47, "Ano de ingresso");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](48, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](50, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "separator", 15)(52, "div", 12)(53, "div", 13)(54, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](55, "Idiomas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](56, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](57, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_57_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](58, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_58_Template, 1, 0, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](60, "div", 13)(61, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](62, "Gradua\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](63, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](64, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_64_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](65, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_65_Template, 1, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](67, "div", 13)(68, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](69, "P\u00F3s gradua\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](70, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](71, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_71_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](72, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_72_Template, 1, 0, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](74, "div", 13)(75, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](76, "Mestrado");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](77, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](78, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_78_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](79, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_79_Template, 1, 0, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](81, "separator", 21)(82, "div", 12)(83, "div", 13)(84, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](85, "Fun\u00E7\u00F5es exercidas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](86, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](87, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_87_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](88, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_88_Template, 1, 0, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](90, "div", 13)(91, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](92, "Grupos especializados");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](93, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](94);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](95, "div", 13)(96, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](97, "Hist\u00F3rico de lota\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](98, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](99, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_99_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](100, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_100_Template, 1, 0, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](102, "div", 13)(103, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](104, "Instrutor?");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](105, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](106, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_106_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](107, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_107_Template, 1, 0, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](109, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](110, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_110_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](111, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_111_Template, 1, 0, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](113, "separator", 26)(114, "div", 12)(115, "div", 27)(116, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](117, "Capacita\u00E7\u00F5es internas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](118, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](119, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_119_Template, 2, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](120, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_120_Template, 1, 0, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](122, "div", 30)(123, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](124, "Capacita\u00E7\u00F5es externas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](125, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](126, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_126_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](127, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_127_Template, 1, 0, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](129, "div", 13)(130, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](131, "Habilidades");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](132, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](133, CurriculumPesquisaListUsuarioComponent_ng_template_3_div_133_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](134, CurriculumPesquisaListUsuarioComponent_ng_template_3_ng_template_134_Template, 1, 0, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](136, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const row_r2 = ctx.row;
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](59);
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](66);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](73);
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](80);
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](89);
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](101);
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](108);
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](112);
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](121);
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](128);
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](135);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("url", row_r2.curriculum.usuario.url_foto)("size", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r2.curriculum.usuario.nome.toUpperCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.curriculum.apresentacao, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.curriculum.usuario.email || "Sem email", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r2.curriculum == null ? null : row_r2.curriculum.telefone) || "Sem telefone", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r2.curriculum == null ? null : row_r2.curriculum.estado_civil) || "Sem estado civil", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.curriculum.quantidade_filhos > 0 ? ctx_r1.lookup.getValue(ctx_r1.lookup.SIMNAO, 1) : ctx_r1.lookup.getValue(ctx_r1.lookup.SIMNAO, 2), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.curriculum.quantidade_filhos > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.curriculum.cidade.uf || "Sem estado", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.curriculum.cidade.nome || "Sem cidade", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r2.ano_ingresso || "Sem ingresso", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.curriculum.idiomas.length)("ngIfElse", _r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.curriculum.graduacoes.length)("ngIfElse", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", false)("ngIfElse", _r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", false)("ngIfElse", _r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_funcao.length)("ngIfElse", _r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", (row_r2.grupo_especializado == null ? null : row_r2.grupo_especializado.nome) || "Sem grupo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_lotacao.length)("ngIfElse", _r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_docencia_interna.length)("ngIfElse", _r23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_docencia_externa.length)("ngIfElse", _r26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_atividade_interna.length)("ngIfElse", _r29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.historico_atividade_externa.length)("ngIfElse", _r32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r2.especifique_habilidades.length)("ngIfElse", _r35);
  }
}
class CurriculumPesquisaListUsuarioComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  //@Input() cdRef: ChangeDetectorRef;
  set noPersist(value) {
    super.noPersist = value;
  }
  get noPersist() {
    return super.noPersist;
  }
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
  get items() {
    return [this.curriculum];
    //return [this.gridControl.value];
  }

  getRow(row) {
    console.log('get row', row);
  }
  ngOnInit() {
    super.ngOnInit();
    this.curriculum = this.metadata?.curriculum;
    console.log('THIS CURRICULUM', this.curriculum);
  }
}
_class = CurriculumPesquisaListUsuarioComponent;
_class.ɵfac = /*@__PURE__*/function () {
  let ɵCurriculumPesquisaListUsuarioComponent_BaseFactory;
  return function CurriculumPesquisaListUsuarioComponent_Factory(t) {
    return (ɵCurriculumPesquisaListUsuarioComponent_BaseFactory || (ɵCurriculumPesquisaListUsuarioComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetInheritedFactory"](_class)))(t || _class);
  };
}();
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-pesquisa-list-usuario"]],
  viewQuery: function CurriculumPesquisaListUsuarioComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    noPersist: "noPersist",
    control: "control",
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 5,
  vars: 3,
  consts: [[3, "items", "title"], ["title", "Curr\u00EDculum", 3, "template"], ["columnDados", ""], [1, "row"], [1, "col-2", "text-center"], [1, "p-4"], [3, "url", "size"], [1, "p-2", "mt-3"], [2, "text-align", "left"], ["title", "Apresenta\u00E7\u00E3o pessoal"], [1, "col-10", "my-2"], ["title", "Dados pessoais"], [1, "row", "my-2"], [1, "col-3"], [4, "ngIf"], ["title", "Dados acad\u00EAmicos"], [4, "ngIf", "ngIfElse"], ["semIdiomas", ""], ["semGraduacao", ""], ["semPos", ""], ["semMestrado", ""], ["title", "Dados profissionais"], ["semFuncao", ""], ["semLotacao", ""], ["semInstrucaoInterna", ""], ["semInstrucaoExterna", ""], ["title", "Hard skills"], [1, "col-5"], ["class", "one-per-line", 4, "ngIf", "ngIfElse"], ["semCapacInterna", ""], [1, "col-4"], ["semCapacExterna", ""], ["semHabilidades", ""], [4, "ngFor", "ngForOf"], [1, "one-per-line"]],
  template: function CurriculumPesquisaListUsuarioComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0)(1, "columns")(2, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, CurriculumPesquisaListUsuarioComponent_ng_template_3_Template, 137, 35, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.items)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_3__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_4__.ColumnComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_5__.SeparatorComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_6__.ProfilePictureComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 65258:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-pesquisa-list/curriculum-pesquisa-list.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumPesquisaListComponent: () => (/* binding */ CurriculumPesquisaListComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _base_page_list_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/page-list-base */ 78509);
/* harmony import */ var src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/curriculum-profissional-dao.service */ 60978);
/* harmony import */ var src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/currriculum-profissional.model */ 46722);
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ 20497);
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ 24997);
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ 34406);
/* harmony import */ var src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/grupo-especializado-dao.service */ 51353);
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ 37598);
/* harmony import */ var src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/capacidade-tecnica-dao.service */ 53399);
/* harmony import */ var src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/dao/area-tematica-dao.service */ 88653);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/grid/order/order.component */ 61915);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);

var _class;






















function CurriculumPesquisaListComponent_ng_template_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "span", 42);
  }
}
function CurriculumPesquisaListComponent_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1, "Nome");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2, "/");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "order", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4, "Ingresso");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](6, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](7, "E-mail");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const header_r15 = ctx.header;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("header", header_r15);
  }
}
function CurriculumPesquisaListComponent_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "badge", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](4, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", row_r16.curriculum.usuario.nome, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](row_r16.ano_ingresso);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](row_r16.curriculum.usuario.email);
  }
}
function CurriculumPesquisaListComponent_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1, "Cidade/Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
}
function CurriculumPesquisaListComponent_ng_template_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate2"]("", row_r18.curriculum.cidade.nome, "/", row_r18.curriculum.cidade.uf, "");
  }
}
function CurriculumPesquisaListComponent_ng_template_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](row_r19.curriculum.apresentacao);
  }
}
function CurriculumPesquisaListComponent_ng_template_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CurriculumPesquisaListComponent_ng_template_65_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r22);
      const row_r20 = restoredCtx.row;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r21.showCurriculumDetalhes2(row_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "i", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a2) {
  return ["uf", "==", a2];
};
class CurriculumPesquisaListComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_2__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_4__.CurriculumProfissional, src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalDaoService);
    this.injector = injector;
    this.areaTematicaWhere = [["id", "==", null]];
    this.cursoWhere = [["id", "==", null]];
    this.filterWhere = filter => {
      let form = filter.value;
      let result = [];
      if (form.estado?.length) {
        result.push(["uf", "==", form.estado]);
      }
      if (form.cidade?.length) {
        result.push(["cidade_id", "==", form.cidade_id]);
      }
      if (form.estado_civil?.length) {
        result.push(["estado_civil", "==", form.estado_civil]);
      }
      if (form.filhos?.length) {
        result.push(["filhos", "==", form.filhos]);
      }
      if (form.idioma?.length) {
        result.push(["idioma", "==", form.idioma]);
      }
      if (form.area_conhecimento_id?.length) {
        result.push(["area_conhecimento_id", "==", form.area_conhecimento_id]);
      }
      if (form.curso_id?.length) {
        result.push(["curso_id", "==", form.curso_id]);
      }
      if (form.titulo_id?.length) {
        result.push(["titulo_id", "==", form.titulo_id]);
      }
      if (form.grupo_especializado_id?.length) {
        result.push(["grupo_especializado_id", "==", form.grupo_especializado_id]);
      }
      if (form.funcao_id?.length) {
        result.push(["funcao_id", "==", form.funcao_id]);
      }
      if (form.area_tematica_id?.length) {
        result.push(["area_tematica_id", "==", form.area_tematica_id]);
      }
      if (form.capacidade_tecnica_id?.length) {
        result.push(["capacidade_tecnica_id", "==", form.capacidade_tecnica_id]);
      }
      return result;
    };
    this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.CidadeDaoService);
    this.areaDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_6__.AreaConhecimentoDaoService);
    this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_7__.CursoDaoService);
    this.grupoDao = injector.get(src_app_dao_grupo_especializado_dao_service__WEBPACK_IMPORTED_MODULE_8__.GrupoEspecializadoDaoService);
    this.funcaoDao = injector.get(src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_9__.FuncaoDaoService);
    this.capacidadeTecnicaDao = injector.get(src_app_dao_capacidade_tecnica_dao_service__WEBPACK_IMPORTED_MODULE_10__.CapacidadeTecnicaDaoService);
    this.areaTematicaDao = injector.get(src_app_dao_area_tematica_dao_service__WEBPACK_IMPORTED_MODULE_11__.AreaTematicaDaoService);
    this.filter = this.fh.FormBuilder({
      estado: {
        default: ""
      },
      cidade_id: {
        default: ""
      },
      estado_civil: {
        default: ""
      },
      filhos: {
        default: false
      },
      idioma: {
        default: ""
      },
      area_conhecimento_id: {
        default: ""
      },
      curso_id: {
        default: ""
      },
      titulo_id: {
        default: ""
      },
      grupo_especializado_id: {
        default: ""
      },
      funcao_id: {
        default: ""
      },
      area_tematica_id: {
        default: ""
      },
      capacidade_tecnica_id: {
        default: ""
      }
    });
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso', 'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso', 'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao', 'historico_funcao.unidade', 'historico_lotacao.unidade', 'curriculum', 'curriculum.usuario', 'curriculum.cidade', 'curriculum.graduacoes', 'curriculum.graduacoes.curso', 'curriculum.graduacoes.curso.area_conhecimento', 'grupo_especializado'];
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  filterClear(filter) {
    filter.controls.estado.setValue("");
    filter.controls.cidade.setValue("");
    filter.controls.estado_civil.setValue("");
    filter.controls.filhos.setValue(false);
    filter.controls.idioma.setValue("");
    filter.controls.area_conhecimento_id.setValue("");
    filter.controls.curso_id.setValue("");
    filter.controls.titulo_id.setValue("");
    filter.controls.grupo_especializado_id.setValue("");
    filter.controls.funcao_id.setValue("");
    filter.controls.area_tematica_id.setValue("");
    filter.controls.capacidade_tecnica_id.setValue("");
    super.filterClear(filter);
  }
  onGridLoad(rows) {
    this.cdRef.detectChanges();
  }
  onAreaTematicaChange() {
    this.areaTematicaWhere = [['area_tematica_id', '==', this.filter.controls.area_tematica_id.value]];
    this.cdRef.detectChanges();
  }
  onAreaConhecimentoChange() {
    this.cursoWhere = [['area_id', '==', this.filter.controls.area_conhecimento_id.value]];
    this.cdRef.detectChanges();
  }
  onTituloChange() {
    let titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.filter.controls.titulo_id.value);
    this.cursoWhere = [['area_id', '==', this.filter.controls.area_conhecimento_id.value], ['titulo', '==', titulo?.key]];
    this.cdRef.detectChanges();
  }
  dynamicButtons(row) {
    const btns = [];
    btns.push({
      label: "Detalhes",
      icon: "bi bi-eye",
      color: 'btn-outline-success',
      onClick: this.showDetalhesCurriculum.bind(this)
    });
    return btns;
  }
  showDetalhesCurriculum(curriculum) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.go.navigate({
        route: ['raiox', 'detalhe-pesquisa']
      }, {
        modal: true,
        metadata: {
          //entity: this.entity!,
          curriculum: curriculum
        }
      });
    })();
  }
  showCurriculumDetalhes2(row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      console.log(row);
      _this2.go.navigate({
        route: ['raiox', 'detalhe-pesquisa']
      }, {
        modal: true,
        metadata: {
          curriculum: row
        }
      });
    })();
  }
}
_class = CurriculumPesquisaListComponent;
_class.ɵfac = function CurriculumPesquisaListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_21__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-curriculum-pesquisa-list"]],
  viewQuery: function CurriculumPesquisaListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵInheritDefinitionFeature"]],
  decls: 68,
  vars: 66,
  consts: [["title", "Ca\u00E7a Talentos - Raio X", 3, "dao", "hasEdit", "hasDelete", "join", "loadList", "selectable", "select"], [3, "form", "where", "submit", "clear", "collapsed"], ["title", "Dados Pessoais", "collapse", "", 3, "collapsed"], [1, "row"], [1, "col-6"], ["title", "Resid\u00EAncia"], ["label", "Estado", "icon", "fas fa-flag", "controlName", "estado", 3, "size", "control", "items"], ["label", "Cidade", "icon", "far fa-flag", "controlName", "cidade_id", 3, "size", "control", "dao", "where"], ["title", "Estado Civil"], ["label", "Estado Civil", "icon", "fas fa-ring", "controlName", "estado_civil", 3, "size", "control", "items"], ["label", "Possui Filhos?", "icon", "fas fa-child", "controlName", "filhos", 3, "size", "control"], ["title", "Conhecimento", "collapse", "", 3, "collapsed"], [1, "col-4"], ["title", "Idiomas"], ["label", "Idioma", "icon", "fas fa-language", "controlName", "idioma", 3, "size", "control", "items"], [1, "col-8"], ["title", "Forma\u00E7\u00E3o Acad\u00EAmica"], ["label", "\u00C1rea de conhecimento", "icon", "fas fa-user-graduate", "controlName", "area_conhecimento_id", 3, "size", "control", "dao", "change"], ["label", "Titulo", "icon", "bi bi-mortarboard-fill", "controlName", "titulo_id", 3, "size", "control", "items", "change"], ["label", "Curso", "icon", "fas fa-graduation-cap", "controlName", "curso_id", 3, "size", "control", "dao", "where"], ["title", "Dados Profissionais", "collapse", "", 3, "collapsed"], ["title", "Experi\u00EAncia"], ["label", "Grupo especializado", "icon", "bi bi-award", "controlName", "grupo_especializado_id", 3, "size", "control", "dao"], ["label", "Fun\u00E7\u00E3o j\u00E1 exercida", "icon", "bi bi-hammer", "controlName", "funcao_id", 3, "size", "control", "dao"], ["title", "Hard Skills"], ["label", "\u00C1rea t\u00E9cnica das capacidades", "icon", "fas fa-graduation-cap", "controlName", "area_tematica_id", 3, "size", "control", "dao", "change"], ["label", "Capacidades", "icon", "fas fa-graduation-cap", "controlName", "capacidade_tecnica_id", 3, "size", "control", "dao", "where"], ["title", "Atributos Comportamentais", "collapse", "", 3, "collapsed"], ["title", "Soft Skills"], ["title", "Mente"], ["icon", "bi bi-person-bounding-box", 3, "align", "hint", "template"], ["columnDetalhamento", ""], [3, "titleTemplate", "template"], ["titleNome", ""], ["columnNome", ""], ["titleEstado", ""], ["columnEstado", ""], ["title", "Apresenta\u00E7\u00E3o Pessoal", 3, "template"], ["columnApresentacao", ""], ["title", "Detalhes", 3, "template"], ["columnDetalhes", ""], ["type", "options", 3, "onEdit", "dynamicButtons"], [1, "badge", "rounded-pill", "bg-light", "text-dark"], ["by", "", 3, "header"], [1, "text-nowrap", "d-block"], ["color", "gray"], [1, "micro-text", "fw-ligh"], [1, "d-block"], [1, "btn", "btn-sm", "btn-outline-info", "me-2", 3, "click"], [1, "bi", "bi-eye"]],
  template: function CurriculumPesquisaListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("select", function CurriculumPesquisaListComponent_Template_grid_select_0_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "filter", 1)(3, "separator", 2)(4, "div", 3)(5, "div", 4)(6, "separator", 5)(7, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](8, "input-select", 6)(9, "input-select", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](10, "div", 4)(11, "separator", 8)(12, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](13, "input-select", 9)(14, "input-switch", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](15, "separator", 11)(16, "div", 3)(17, "div", 12)(18, "separator", 13)(19, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](20, "input-select", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](21, "div", 15)(22, "separator", 16)(23, "div", 3)(24, "input-select", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumPesquisaListComponent_Template_input_select_change_24_listener() {
        return ctx.onAreaConhecimentoChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](25, "input-select", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumPesquisaListComponent_Template_input_select_change_25_listener() {
        return ctx.onTituloChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](26, "input-select", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](27, "separator", 20)(28, "div", 3)(29, "div", 4)(30, "separator", 21)(31, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](32, "input-select", 22)(33, "input-select", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](34, "div", 4)(35, "separator", 24)(36, "div", 3)(37, "input-select", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CurriculumPesquisaListComponent_Template_input_select_change_37_listener() {
        return ctx.onAreaTematicaChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](38, "input-select", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](39, "separator", 27)(40, "div", 3)(41, "div", 4)(42, "separator", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](43, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](44, "div", 4)(45, "separator", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](46, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](47, "columns")(48, "column", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](49, CurriculumPesquisaListComponent_ng_template_49_Template, 1, 0, "ng-template", null, 31, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](51, "column", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](52, CurriculumPesquisaListComponent_ng_template_52_Template, 8, 1, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](54, CurriculumPesquisaListComponent_ng_template_54_Template, 6, 3, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](56, "column", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](57, CurriculumPesquisaListComponent_ng_template_57_Template, 2, 0, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](59, CurriculumPesquisaListComponent_ng_template_59_Template, 2, 2, "ng-template", null, 36, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](61, "column", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](62, CurriculumPesquisaListComponent_ng_template_62_Template, 2, 1, "ng-template", null, 38, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](64, "column", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](65, CurriculumPesquisaListComponent_ng_template_65_Template, 2, 0, "ng-template", null, 40, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](67, "column", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](50);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](53);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](55);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](58);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](60);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](63);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵreference"](66);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("dao", ctx.dao)("hasEdit", false)("hasDelete", false)("join", ctx.join)("loadList", ctx.onGridLoad.bind(ctx))("selectable", ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapsed", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.estado)("items", ctx.lookup.UF);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.cidade_id)("dao", ctx.cidadeDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpureFunction1"](64, _c0, ctx.filter.controls.estado.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 9)("control", ctx.filter.controls.estado_civil)("items", ctx.lookup.ESTADO_CIVIL);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 3)("control", ctx.filter.controls.filhos);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 12)("control", ctx.filter.controls.idioma)("items", ctx.lookup.IDIOMAS);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.area_conhecimento_id)("dao", ctx.areaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.titulo_id)("items", ctx.lookup.TITULOS_CURSOS);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.curso_id)("dao", ctx.cursoDao)("where", ctx.cursoWhere);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.grupo_especializado_id)("dao", ctx.grupoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.funcao_id)("dao", ctx.funcaoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.area_tematica_id)("dao", ctx.areaTematicaDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("size", 6)("control", ctx.filter.controls.capacidade_tecnica_id)("dao", ctx.capacidadeTecnicaDao)("where", ctx.areaTematicaWhere);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("align", "center")("hint", "Detalhamento")("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("titleTemplate", _r2)("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("titleTemplate", _r6)("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r10);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("template", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("onEdit", ctx.edit.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
    }
  },
  dependencies: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_1__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_12__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_13__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_14__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_15__.ToolbarComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_16__.InputSwitchComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_17__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_18__.SeparatorComponent, _components_grid_order_order_component__WEBPACK_IMPORTED_MODULE_19__.OrderComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_20__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
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
const _c14 = ["unidadeChefia"];
const _c15 = ["lotacaoAtual"];
const _c16 = ["gruposEspecializados"];
const _c17 = ["centroTreinamento"];
const _c18 = ["cargos"];
const _c19 = ["selecionaLotacao"];
const _c20 = ["areaAtividadeExterna"];
const _c21 = ["areaAtividadeExternaDocencia"];
const _c22 = ["areaCursoInterno"];
const _c23 = ["areaCursoExterno"];
const _c24 = ["cursoDocenciaInterna"];
const _c25 = ["cursoInterno"];
const _c26 = ["areaHistoricoCursoExterno"];
const _c27 = ["areaAtividadeInterna"];
const _c28 = ["selectDocenciaInterna"];
const _c29 = ["selectCursosInternos"];
const _c30 = ["area_tematica"];
const _c31 = ["capacidade_tecnica"];
function CurriculumProfissionalFormComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r51 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r51.funcao == null ? null : row_r51.funcao.nome) || "Desconhecido", " ");
  }
}
const _c32 = function () {
  return ["raiox", "cadastros", "funcao", "new"];
};
const _c33 = function (a0) {
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
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r5.funcaoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c32)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r54 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r54.unidade == null ? null : row_r54.unidade.nome) || "Desconhecido", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 85, 86);
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r9.unidadeDao);
  }
}
function CurriculumProfissionalFormComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r57 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r57.unidade == null ? null : row_r57.unidade.nome) || "Desconhecido", " ");
  }
}
const _c34 = function () {
  return ["historico_lotacao"];
};
function CurriculumProfissionalFormComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 87, 88);
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("dao", ctx_r14.unidadeDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c34));
  }
}
function CurriculumProfissionalFormComponent_grid_45_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r64 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r64.area_atividade_externa == null ? null : row_r64.area_atividade_externa.nome) || "Desconhecido", " ");
  }
}
const _c35 = function () {
  return ["historico_atividade_externa", "historico_curso_externo", "historico_docencia_externa"];
};
const _c36 = function () {
  return ["raiox", "cadastros", "areaatividadeexterna", "new"];
};
function CurriculumProfissionalFormComponent_grid_45_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 92, 93);
  }
  if (rf & 2) {
    const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("dao", ctx_r63.areaAtividadeExternaDao)("join", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c35))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](6, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](5, _c36)));
  }
}
function CurriculumProfissionalFormComponent_grid_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_45_ng_template_3_Template, 1, 1, "ng-template", null, 90, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_45_ng_template_5_Template, 2, 8, "ng-template", null, 91, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r17.form.controls.historico_atividade_externa)("minHeight", 150)("form", ctx_r17.formHistoricoAtividadeExternaGrid)("hasDelete", true)("add", ctx_r17.addHistoricoAtividadeExterna.bind(ctx_r17))("load", ctx_r17.loadHistoricoAtividadeExterna.bind(ctx_r17))("remove", ctx_r17.removeHistoricoAtividadeExterna.bind(ctx_r17))("save", ctx_r17.saveHistoricoAtividadeExterna.bind(ctx_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r60)("editTemplate", _r62);
  }
}
function CurriculumProfissionalFormComponent_grid_50_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r79 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r79.capacidade_tecnica == null ? null : row_r79.capacidade_tecnica.area_tematica == null ? null : row_r79.capacidade_tecnica.area_tematica.nome) || (row_r79.area_tematica == null ? null : row_r79.area_tematica.nome) || "Desconhecido", " ");
  }
}
const _c37 = function () {
  return ["raiox", "cadastros", "areatematica", "new"];
};
function CurriculumProfissionalFormComponent_grid_50_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "input-search", 103, 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_grid_50_ng_template_5_Template_input_search_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵrestoreView"](_r83);
      const ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵresetView"](ctx_r82.onAreaAtividadeInternaChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r70.areaTematicaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c37)));
  }
}
function CurriculumProfissionalFormComponent_grid_50_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r84 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r84.capacidade_tecnica == null ? null : row_r84.capacidade_tecnica.nome) || "Desconhecido", " ");
  }
}
const _c38 = function () {
  return ["raiox", "cadastros", "capacidadetecnica", "new"];
};
function CurriculumProfissionalFormComponent_grid_50_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 105, 106);
  }
  if (rf & 2) {
    const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r74.capacidadeTecnicaDao)("where", ctx_r74.areaTematicaWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](5, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c38)));
  }
}
function CurriculumProfissionalFormComponent_grid_50_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r87 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r87.atividade_desempenhada, " ");
  }
}
function CurriculumProfissionalFormComponent_grid_50_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 107);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4);
  }
}
function CurriculumProfissionalFormComponent_grid_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_50_ng_template_3_Template, 1, 1, "ng-template", null, 95, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_50_ng_template_5_Template, 2, 6, "ng-template", null, 96, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](7, "column", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](8, CurriculumProfissionalFormComponent_grid_50_ng_template_8_Template, 1, 1, "ng-template", null, 98, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](10, CurriculumProfissionalFormComponent_grid_50_ng_template_10_Template, 2, 7, "ng-template", null, 99, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](12, "column", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](13, CurriculumProfissionalFormComponent_grid_50_ng_template_13_Template, 1, 1, "ng-template", null, 101, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](15, CurriculumProfissionalFormComponent_grid_50_ng_template_15_Template, 1, 1, "ng-template", null, 102, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](17, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r69 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](9);
    const _r73 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](11);
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](14);
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](16);
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r19.form.controls.historico_atividade_interna)("minHeight", 150)("form", ctx_r19.formHistoricoAtividadeInternaGrid)("hasDelete", true)("add", ctx_r19.addHistoricoAtividadeInterna.bind(ctx_r19))("load", ctx_r19.loadHistoricoAtividadeInterna.bind(ctx_r19))("remove", ctx_r19.removeHistoricoAtividadeInterna.bind(ctx_r19))("save", ctx_r19.saveHistoricoAtividadeInterna.bind(ctx_r19));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r67)("editTemplate", _r69);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r71)("editTemplate", _r73);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r75)("editTemplate", _r77);
  }
}
function CurriculumProfissionalFormComponent_grid_60_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r93 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r93.area_atividade_externa == null ? null : row_r93.area_atividade_externa.nome) || "Desconhecido", " ");
  }
}
function CurriculumProfissionalFormComponent_grid_60_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 111, 112);
  }
  if (rf & 2) {
    const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r92.areaAtividadeExternaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c36)));
  }
}
function CurriculumProfissionalFormComponent_grid_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_60_ng_template_3_Template, 1, 1, "ng-template", null, 109, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_60_ng_template_5_Template, 2, 6, "ng-template", null, 110, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r89 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r91 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r21.form.controls.historico_docencia_externa)("minHeight", 150)("form", ctx_r21.formHistoricoDocenciaExternaGrid)("hasDelete", true)("add", ctx_r21.addHistoricoDocenciaExterna.bind(ctx_r21))("load", ctx_r21.loadHistoricoDocenciaExterna.bind(ctx_r21))("remove", ctx_r21.removeHistoricoDocenciaExterna.bind(ctx_r21))("save", ctx_r21.saveHistoricoDocenciaExterna.bind(ctx_r21));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r89)("editTemplate", _r91);
  }
}
function CurriculumProfissionalFormComponent_grid_65_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r100 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r100.curso == null ? null : row_r100.curso.nome) || "Desconhecido", " ");
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
function CurriculumProfissionalFormComponent_grid_65_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 116, 117);
  }
  if (rf & 2) {
    const ctx_r99 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 3)("control", ctx_r99.form.controls.curso_id)("dao", ctx_r99.cursoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](6, _c40, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](5, _c39)))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](9, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](8, _c41)));
  }
}
function CurriculumProfissionalFormComponent_grid_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "grid", 11)(1, "columns")(2, "column", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](3, CurriculumProfissionalFormComponent_grid_65_ng_template_3_Template, 1, 1, "ng-template", null, 114, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_grid_65_ng_template_5_Template, 2, 11, "ng-template", null, 115, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](7, "column", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r96 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](4);
    const _r98 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](6);
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx_r23.form.controls.historico_docencia_interna)("minHeight", 150)("form", ctx_r23.formHistoricoDocenciaInternaGrid)("hasDelete", true)("add", ctx_r23.addHistoricoDocenciaInterna.bind(ctx_r23))("load", ctx_r23.loadHistoricoDocenciaInterna.bind(ctx_r23))("remove", ctx_r23.removeHistoricoDocenciaInterna.bind(ctx_r23))("save", ctx_r23.saveHistoricoDocenciaInterna.bind(ctx_r23));
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r96)("editTemplate", _r98);
  }
}
function CurriculumProfissionalFormComponent_ng_template_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r103 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r103.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-switch", 118);
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", ctx_r27.formHistoricoCursoInternoGrid.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r27.form.controls.pretensao);
  }
}
function CurriculumProfissionalFormComponent_ng_template_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r105 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r105.curso == null ? null : row_r105.curso.nome) || "Desconhecido", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_79_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-select", 119, 120);
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 3)("dao", ctx_r31.cursoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](5, _c40, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](4, _c39)))("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](8, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](7, _c41)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_87_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r108 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r108.pretensao == 0 ? "Finalizado" : "Pretendo Fazer", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-switch", 118);
  }
  if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", ctx_r35.formHistoricoCursoExternoGrid.controls.pretensao.value ? "Sim" : "Conclu\u00EDdo")("control", ctx_r35.formHistoricoCursoExternoGrid.controls.pretensao);
  }
}
function CurriculumProfissionalFormComponent_ng_template_92_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r110 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", (row_r110.area_atividade_externa == null ? null : row_r110.area_atividade_externa.nome) || "Desconhecido", " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_94_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-search", 121, 122);
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("dao", ctx_r39.areaAtividadeExternaDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](4, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](3, _c36)));
  }
}
function CurriculumProfissionalFormComponent_ng_template_97_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const row_r113 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtextInterpolate1"](" ", row_r113.nome, " ");
  }
}
function CurriculumProfissionalFormComponent_ng_template_99_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 123);
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 8)("control", ctx_r43.formHistoricoCursoExternoGrid.controls.nome);
  }
}
function CurriculumProfissionalFormComponent_input_radio_125_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-radio", 124, 125);
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("items", ctx_r48.lookup.PG_PRF)("control", ctx_r48.form.controls.pgd_inserido);
  }
}
function CurriculumProfissionalFormComponent_div_126_input_radio_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-radio", 131, 132);
  }
  if (rf & 2) {
    const ctx_r117 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("items", ctx_r117.lookup.PG_PRF)("control", ctx_r117.form.controls.pgd_interesse);
  }
}
function CurriculumProfissionalFormComponent_div_126_input_text_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](0, "input-text", 133);
  }
  if (rf & 2) {
    const ctx_r118 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx_r118.form.controls.telefone)("maskFormat", "(00) 0000-0000 || (00) 0 0000-0000");
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵattribute"]("maxlength", 250);
  }
}
function CurriculumProfissionalFormComponent_div_126_Template(rf, ctx) {
  if (rf & 1) {
    const _r121 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](1, "separator", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](2, "input-switch", 127, 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_div_126_Template_input_switch_change_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵrestoreView"](_r121);
      const ctx_r120 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵresetView"](ctx_r120.onChangeEscolheInteressePG());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](4, CurriculumProfissionalFormComponent_div_126_input_radio_4_Template, 2, 3, "input-radio", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](5, CurriculumProfissionalFormComponent_div_126_input_text_5_Template, 1, 4, "input-text", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r116 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](3);
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r116.value ? "Sim" : "N\u00E3o")("control", ctx_r49.form.controls.radioInteresseProgramaGestao);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx_r49.form.controls.radioInteresseProgramaGestao.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx_r49.form.controls.radioInteresseProgramaGestao.value);
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
    this.curriculumProfissionalID = "";
    this.curriculuns = [];
    this.validate = (control, controlName) => {
      let result = null;
      if (['centro_treinamento_id', 'cargo_id', 'grupo_especializado_id', 'ano_ingresso'].indexOf(controlName) >= 0 && !control.value) {
        result = "Obrigatório";
      }
      return result;
    };
    this.formValidation = form => {
      let result = null;
      return result;
    };
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso', 'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso', 'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao', 'historico_funcao.unidade', 'historico_lotacao.unidade', 'curriculum'];
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
        default: []
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
      },
      unidade_id: {
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
      //areaAtividadeInterna: { default: "" },
      //inputAtividadeInterna: { default: "" },
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
      curriculunsProfissional?.length ? _this3.curriculumProfissionalID = curriculunsProfissional[0].id : "";
      let entity = curriculunsProfissional?.length ? curriculunsProfissional[0] : new src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_8__.CurriculumProfissional(); //this.entity
      //curriculunsProfissional?.length ? (this.id = curriculunsProfissional[0].id) : (this.id = "");
      entity.historico_atividade_interna.length > 0 ? _this3.form?.controls.radioAtividadeInterna.setValue(true) : _this3.form?.controls.radioAtividadeInterna.setValue(false);
      entity.historico_atividade_externa.length > 0 ? _this3.form?.controls.radioAtividadeExterna.setValue(true) : _this3.form?.controls.radioAtividadeExterna.setValue(false);
      entity.historico_docencia_interna.length > 0 ? _this3.form?.controls.radioDocenciaInterna.setValue(true) : _this3.form?.controls.radioDocenciaInterna.setValue(false);
      entity.historico_docencia_externa.length > 0 ? _this3.form?.controls.radioDocenciaExterna.setValue(true) : _this3.form?.controls.radioDocenciaExterna.setValue(false);
      if (entity.pgd_interesse != '') {
        const interesse = _this3.lookup.getLookup(_this3.lookup.PG_PRF, entity.pgd_interesse);
        _this3.form?.controls.radioInteresseProgramaGestao.setValue(true);
        _this3.escolhaInteresseProgramaGestao?.setValue(interesse?.key);
      } else {
        _this3.form?.controls.radioInteresseBNT.setValue(false);
      }
      if (entity.pgd_inserido != '') {
        const inserido = _this3.lookup.getLookup(_this3.lookup.PG_PRF, entity.pgd_inserido);
        _this3.form?.controls.radioProgramaGestao.setValue(true);
        _this3.escolhaRadioProgramaGestao?.setValue(inserido?.key);
      } else {
        _this3.form?.controls.radioProgramaGestao.setValue(false);
      }
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
        _this4.curriculumProfissionalID != "" ? curriculumProfissional.id = _this4.curriculumProfissionalID : '';
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
      let values = form.value;
      row.funcao = this.funcao?.selectedItem?.data;
      row.unidade = this.unidadeChefia?.selectedEntity;
      row.unidade_id = values.unidade_id;
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
      _this5.formHistoricoFuncaoGrid.controls.funcao_id.setValue(row.funcao_id);
      _this5.formHistoricoFuncaoGrid.controls.unidade_id.setValue(row.unidade_id);
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
      row.unidade = this.unidade.selectedEntity;
      row.unidade_id = values.unidade_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoLotacao(form, row) {
    var _this7 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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
      row.area_atividade_externa = this.areaAtividadeExterna.selectedEntity;
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
      console.log('ROW->', row);
      row.area_tematica = this.area_tematica?.selectedEntity;
      console.log('Area->', row.area_tematica);
      row.area_tematica_id = values.area_tematica_id;
      row.capacidade_tecnica = this.capacidade_tecnica.selectedItem?.data;
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
      _this11.formHistoricoAtividadeInternaGrid.controls.area_tematica_id.setValue(row.capacidade_tecnica?.area_tematica_id);
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
      row.area_atividade_externa = this.areaAtividadeExternaDocencia.selectedEntity;
      console.log('area_atividade_externa', row.area_atividade_externa);
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  loadHistoricoDocenciaExterna(form, row) {
    var _this13 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
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
      row.curso = this.cursoDocenciaInterna?.selectedItem?.data;
      console.log(row.curso);
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
      //this.area?.setValue(row.curso?.area_id)*/
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
      row.curso = this.cursoInterno?.selectedItem?.data;
      console.log('CursoInterno', row.curso);
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
      row.area_atividade_externa = this.areaHistoricoCursoExterno?.selectedEntity;
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
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵviewQuery"](_c31, 5);
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
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.unidadeChefia = _t.first);
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
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.cursoInterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaHistoricoCursoExterno = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.areaAtividadeInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.selectDocenciaInterna = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.selectCursosInternos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.area_tematica = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵloadQuery"]()) && (ctx.capacidade_tecnica = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵInheritDefinitionFeature"]],
  decls: 132,
  vars: 125,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "left", ""], ["key", "FUNCIONAIS", "label", "Funcionais", 1, "fw-bold"], [1, "row", "my-4"], ["label", "Ingresso na Institui\u00E7\u00E3o", "icon", "bi bi-calendar-check-fill", "controlName", "ano_ingresso", "required", "", 3, "size", "control", "items"], ["label", "Centro de Treinamento", "icon", "bi bi-building-fill", "controlName", "centro_treinamento_id", "fullEntity", "", "liveSearch", "", "required", "", 3, "size", "control", "dao", "addRoute"], ["centroTreinamento", ""], ["label", "Cargo", "controlName", "cargo_id", "required", "", 3, "size", "control", "dao"], ["cargos", ""], [1, "row", "mt-3"], [1, "col-md-8"], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save"], ["title", "Hist\u00F3rico de Fun\u00E7\u00F5es", "titleHint", "Fun\u00E7\u00F5es ocupadas como titular ou substituto.", 3, "template", "editTemplate"], ["columnFuncao", ""], ["editFuncao", ""], ["title", "Unidade", "titleHint", "Unidade", 3, "template", "editTemplate"], ["columnUnidadeChefe", ""], ["editColumnUnidadeChefe", ""], ["type", "options"], [1, "col-md-6"], ["label", "Voc\u00EA faz parte de algum grupo especializado?", "icon", "bi bi-check-circle", "controlName", "grupo_especializado_id", "fullEntity", "", "liveSearch", "", "required", "", 3, "size", "control", "dao", "addRoute"], ["gruposEspecializados", ""], ["title", "Hist\u00F3rico de Lota\u00E7\u00F5es", "titleHint", "Escolha a lota\u00E7\u00E3o.", 3, "template", "editTemplate"], ["columnLotacao", ""], ["editLotacao", ""], ["label", "Lota\u00E7\u00E3o atual", "controlName", "lotacao_atual", 3, "size", "control", "dao"], ["lotacaoAtual", ""], ["key", "HARD_SKILLS", "label", "Hard Skills", 1, "fw-bold"], ["title", "Desempenhou atividades externamente e que podem contribuir para a institui\u00E7\u00E3o?", 1, "mb-3", "mt-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeExterna", 3, "size", "label", "control"], ["radioAtividadeExterna", ""], ["editable", "", 3, "control", "minHeight", "form", "hasDelete", "add", "load", "remove", "save", 4, "ngIf"], ["title", "Desempenhou atividades internamente que podem contribuir ou contribuiram para a institui\u00E7\u00E3o?", 1, "mb-3", "mt-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioAtividadeInterna", 3, "size", "label", "control"], ["radioAtividadeInterna", ""], [1, "row", "mb-2", "mt-3"], ["title", "Informe as suas habilidades", 1, "mb-3", 3, "bold"], ["controlName", "especifique_habilidades", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Especifique", "icon", "bi bi-list-stars", "controlName", "inputEspecifiqueHabilidade", 3, "size", "control"], ["key", "DOCENCIA", "label", "Doc\u00EAncia", 1, "fw-bold", "mb-3"], ["title", "Voc\u00EA j\u00E1 realizou algum trabalho de doc\u00EAncia fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaExterna", 3, "size", "label", "control"], ["radioDocenciaExterna", ""], ["title", "Voc\u00EA \u00E9 docente ou instrutor da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaInterna", 3, "size", "label", "control"], ["radioDocenciaInterna", ""], ["key", "CURSOS", "label", "Cursos", 1, "fw-bold", "mb-3"], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer na Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["title", "Pretende Cursar?", "titleHint", "Pretende cursar ou j\u00E1 esta concluido.", 3, "template", "editTemplate"], ["columnPretende", ""], ["editPretende", ""], ["title", "Curso Institucional", "titleHint", "Escolha o curso.", 3, "template", "editTemplate"], ["columnCurso", ""], ["editCurso", ""], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["title", "\u00C1rea Externa", "titleHint", "Escolha a \u00E1rea externa.", 3, "template", "editTemplate"], ["columnArea", ""], ["editArea", ""], ["title", "Nome do Curso", "titleHint", "Informe o nome do curso.", 3, "template", "editTemplate"], ["columnNome", ""], ["editNome", ""], ["key", "DISPONIBILIDADE", "label", "Disponibilidade", 1, "fw-bold", "mb-3"], [1, "row"], ["title", "Viagens", 1, "mb-3", "mt-3", 3, "bold"], [1, "col-lg-6"], [1, "bi", "bi-flag-fill"], ["labelPosition", "right", "controlName", "viagem_nacional", 3, "size", "label", "control"], ["radioViajemNacional", ""], [1, "bi", "bi-globe-americas"], ["labelPosition", "right", "controlName", " viagem_internacional", 3, "size", "label", "control"], ["radioViajemInternacional", ""], ["title", "Voc\u00EA tem interesse na participa\u00E7\u00E3o do Banco Nacional de Talentos (BNT IN PRF N\u00BA 58 de 27 de agosto de 2021) SEI 35010079?", 1, "my-3", 3, "bold"], ["icon", "bi bi-universal-access", "controlName", "interesse_bnt", 3, "size", "label", "control"], ["radioInteresseBNT", ""], ["title", "Voc\u00EA est\u00E1 inserido no programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-calendar2-check", "controlName", "radioProgramaGestao", 3, "size", "label", "control", "change"], ["radioProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_inserido", 3, "size", "items", "control", 4, "ngIf"], ["class", "row", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em remo\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-house-door-fill", "controlName", "remocao", 3, "size", "label", "control"], ["radioInteresseRemocao", ""], [1, "mb-5"], ["label", "", "icon", "", "controlName", "funcao_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "addRoute"], ["funcao", ""], ["label", "", "icon", "", "controlName", "unidade_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao"], ["unidadeChefia", ""], ["controlName", "unidade_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "join"], ["unidade", ""], ["title", "Hist\u00F3rico de Atividades Externas", "titleHint", "Escolha a atividade.", 3, "template", "editTemplate"], ["columnAtividadeExterna", ""], ["editAtividadeExterna", ""], ["label", "", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "join", "addRoute"], ["areaAtividadeExterna", ""], ["title", "\u00C1rea tem\u00E1tica", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnAtividadeInterna", ""], ["editAtividadeInterna", ""], ["title", "Capacidade", "titleHint", "Escolha a capacidade.", 3, "template", "editTemplate"], ["columnCapacidade", ""], ["editCapacidade", ""], ["title", "Atividade desempenhada", "titleHint", "Informe a atividade.", 3, "template", "editTemplate"], ["columnAtividadeDesempenhada", ""], ["editAtividadeDesempenhada", ""], ["label", "Escolha a \u00E1rea tem\u00E1tica", "controlName", "area_tematica_id", "fullEntity", "", 3, "size", "dao", "addRoute", "change"], ["area_tematica", ""], ["label", "Capacidade", "icon", "fas fa-graduation-cap", "controlName", "capacidade_tecnica_id", "fullEntity", "", "liveSearch", "", 3, "size", "dao", "where", "addRoute"], ["capacidade_tecnica", ""], ["label", "Informe a atividade desempenhada", "icon", "", "controlName", "atividade_desempenhada", 3, "size"], ["title", "\u00C1rea Externa", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnDocenciaExterna", ""], ["editDocenciaExterna", ""], ["label", "Escolha a \u00E1rea externa", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "addRoute"], ["areaAtividadeExternaDocencia", ""], ["title", "Curso", "titleHint", "Escolha a \u00E1rea.", 3, "template", "editTemplate"], ["columnDocenciaInterna", ""], ["editDocenciaInterna", ""], ["label", "Curso", "icon", "", "controlName", "curso_id", "fullEntity", "", "orderBy", "[['nome', 'asc']]", 3, "size", "control", "dao", "where", "addRoute"], ["cursoDocenciaInterna", ""], ["icon", "fas fa-user-graduate", "controlName", "pretensao", 3, "size", "label", "control"], ["label", "Curso", "icon", "", "controlName", "curso_id", "orderBy", "[['nome', 'asc']]", 3, "size", "dao", "where", "addRoute"], ["cursoInterno", ""], ["label", "\u00C1rea/Institui\u00E7\u00E3o/Coorpora\u00E7\u00E3o", "controlName", "area_atividade_externa_id", "fullEntity", "", 3, "size", "dao", "addRoute"], ["areaHistoricoCursoExterno", ""], ["label", "Nome do Curso", "icon", "", "controlName", "nome", "liveSearch", "", 3, "size", "control"], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_inserido", 3, "size", "items", "control"], ["escolhaRadioProgramaGestao", ""], ["title", "Voc\u00EA tem interesse em participar do programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-bookmark-check", "controlName", "radioInteresseProgramaGestao", 3, "size", "label", "control", "change"], ["radioInteresseProgramaGestao", ""], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_interesse", 3, "size", "items", "control", 4, "ngIf"], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat", 4, "ngIf"], ["label", "Op\u00E7\u00F5es", "controlName", "pgd_interesse", 3, "size", "items", "control"], ["escolhaInteresseProgramaGestao", ""], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"]],
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
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](18, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](19, CurriculumProfissionalFormComponent_ng_template_19_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](21, CurriculumProfissionalFormComponent_ng_template_21_Template, 2, 2, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](23, "column", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](24, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](25, "input-select", 20, 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](27, "div", 9)(28, "div", 19)(29, "grid", 11)(30, "columns")(31, "column", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](32, CurriculumProfissionalFormComponent_ng_template_32_Template, 1, 1, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](34, CurriculumProfissionalFormComponent_ng_template_34_Template, 2, 4, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](36, "column", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](37, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](38, "input-search", 25, 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](40, "tab", 27)(41, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](42, "separator", 28)(43, "input-switch", 29, 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](45, CurriculumProfissionalFormComponent_grid_45_Template, 8, 10, "grid", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](46, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](47, "separator", 32)(48, "input-switch", 33, 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](50, CurriculumProfissionalFormComponent_grid_50_Template, 18, 14, "grid", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](51, "div", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](52, "separator", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](53, "input-multiselect", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](54, "input-text", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](55, "tab", 39)(56, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](57, "separator", 40)(58, "input-switch", 41, 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](60, CurriculumProfissionalFormComponent_grid_60_Template, 8, 10, "grid", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](61, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](62, "separator", 43)(63, "input-switch", 44, 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](65, CurriculumProfissionalFormComponent_grid_65_Template, 8, 10, "grid", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](66, "tab", 46)(67, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](68, "separator", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](69, "grid", 11)(70, "columns")(71, "column", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](72, CurriculumProfissionalFormComponent_ng_template_72_Template, 1, 1, "ng-template", null, 49, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](74, CurriculumProfissionalFormComponent_ng_template_74_Template, 1, 3, "ng-template", null, 50, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](76, "column", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](77, CurriculumProfissionalFormComponent_ng_template_77_Template, 1, 1, "ng-template", null, 52, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](79, CurriculumProfissionalFormComponent_ng_template_79_Template, 2, 10, "ng-template", null, 53, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](81, "column", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](82, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](83, "separator", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](84, "grid", 11)(85, "columns")(86, "column", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](87, CurriculumProfissionalFormComponent_ng_template_87_Template, 1, 1, "ng-template", null, 49, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](89, CurriculumProfissionalFormComponent_ng_template_89_Template, 1, 3, "ng-template", null, 50, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](91, "column", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](92, CurriculumProfissionalFormComponent_ng_template_92_Template, 1, 1, "ng-template", null, 56, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](94, CurriculumProfissionalFormComponent_ng_template_94_Template, 2, 6, "ng-template", null, 57, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](96, "column", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](97, CurriculumProfissionalFormComponent_ng_template_97_Template, 1, 1, "ng-template", null, 59, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](99, CurriculumProfissionalFormComponent_ng_template_99_Template, 1, 2, "ng-template", null, 60, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](101, "column", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](102, "tab", 61)(103, "div", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](104, "separator", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](105, "div", 64)(106, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](107, "i", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](108, " J\u00E1 fez viagem nacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](109, "input-switch", 66, 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](111, "div", 64)(112, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](113, "i", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtext"](114, " J\u00E1 fez viagem internacional a trabalho?");
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](115, "input-switch", 69, 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](117, "div", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](118, "separator", 71)(119, "input-switch", 72, 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](121, "div", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](122, "separator", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](123, "input-switch", 75, 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_123_listener() {
        return ctx.onChangeEscolhePG();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](125, CurriculumProfissionalFormComponent_input_radio_125_Template, 2, 3, "input-radio", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵtemplate"](126, CurriculumProfissionalFormComponent_div_126_Template, 6, 6, "div", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementStart"](127, "div", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](128, "separator", 79)(129, "input-switch", 80, 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelement"](131, "separator", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](15);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](17);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](20);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](22);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](33);
      const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](35);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](44);
      const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](49);
      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](59);
      const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](64);
      const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](73);
      const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](75);
      const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](78);
      const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](80);
      const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](93);
      const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](95);
      const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](98);
      const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](100);
      const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](110);
      const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](116);
      const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](120);
      const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](124);
      const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵreference"](130);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.ano_ingresso)("items", ctx.anos);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.centro_treinamento_id)("dao", ctx.centroTreinamentoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](120, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](119, _c42)));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cargo_id)("dao", ctx.cargoDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_funcao)("minHeight", 150)("form", ctx.formHistoricoFuncaoGrid)("hasDelete", true)("add", ctx.addHistoricoFuncao.bind(ctx))("load", ctx.loadHistoricoFuncao.bind(ctx))("remove", ctx.removeHistoricoFuncao.bind(ctx))("save", ctx.saveHistoricoFuncao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.grupo_especializado_id)("dao", ctx.grupoDao)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction1"](123, _c33, _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵpureFunction0"](122, _c43)));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_lotacao)("minHeight", 150)("form", ctx.formHistoricoLotacaoGrid)("hasDelete", true)("add", ctx.addHistoricoLotacao.bind(ctx))("load", ctx.loadHistoricoLotacao.bind(ctx))("remove", ctx.removeHistoricoLotacao.bind(ctx))("save", ctx.saveHistoricoLotacao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r11)("editTemplate", _r13);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotacao_atual)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r16.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioAtividadeExterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioAtividadeExterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r18.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioAtividadeInterna);
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
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r20.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaExterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioDocenciaExterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r22.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaInterna);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioDocenciaInterna.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_curso_interno)("minHeight", 150)("form", ctx.formHistoricoCursoInternoGrid)("hasDelete", true)("add", ctx.addHistoricoCursoInterno.bind(ctx))("load", ctx.loadHistoricoCursoInterno.bind(ctx))("remove", ctx.removeHistoricoCursoInterno.bind(ctx))("save", ctx.saveHistoricoCursoInterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r24)("editTemplate", _r26);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r28)("editTemplate", _r30);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("control", ctx.form.controls.historico_curso_externo)("minHeight", 150)("form", ctx.formHistoricoCursoExternoGrid)("hasDelete", true)("add", ctx.addHistoricoCursoExterno.bind(ctx))("load", ctx.loadHistoricoCursoExterno.bind(ctx))("remove", ctx.removeHistoricoCursoExterno.bind(ctx))("save", ctx.saveHistoricoCursoExterno.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r24)("editTemplate", _r26);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r36)("editTemplate", _r38);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("template", _r40)("editTemplate", _r42);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r44.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.viagem_nacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 2)("label", _r45.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.viagem_internacional);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r46.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.interesse_bnt);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r47.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioProgramaGestao);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", ctx.form.controls.radioProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("ngIf", !ctx.form.controls.radioProgramaGestao.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("bold", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_40__["ɵɵproperty"]("size", 1)("label", _r50.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.remocao);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_41__.NgIf, _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_28__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_29__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_30__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_31__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_32__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_33__.InputTextComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_34__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_35__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_36__.InputMultiselectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_37__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_38__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_39__.SeparatorComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJpY3VsdW0tcHJvZmlzc2lvbmFsLWZvcm0vY3VycmljdWx1bS1wcm9maXNzaW9uYWwtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGVBQUE7QUFERjs7QUFLQTtFQUNFLHdCQUFBO0VBQ0EsaUJBQUE7QUFGRjs7QUFLQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBRkY7O0FBTUE7RUFDRSxtQkFBQTtBQUhGIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9uZXV0cmEtdGV4dC1hbHQnKTtcclxuXHJcblxyXG4jaW1nQmlnSWNvLCNpbWdCaWdJY29BbWFyZWxve1xyXG4gIG1heC13aWR0aDogMzBweDtcclxuXHJcbn1cclxuXHJcbi5oNCwgLmNhcmQtdGl0bGV7XHJcbiAgZm9udC1mYW1pbHk6IG5ldXRyYSB0ZXh0O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uY2FyZC1pbWctdG9we1xyXG4gIGhlaWdodDogYXV0bztcclxuICBtYXgtd2lkdGg6IDkwcHg7XHJcbiAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmN2ZhO1xyXG59XHJcblxyXG4uY2FyZHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 82454);
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
/* harmony import */ var _currriculum_atributos_curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component */ 47512);
/* harmony import */ var _curriculum_pesquisa_list_curriculum_pesquisa_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./curriculum-pesquisa-list/curriculum-pesquisa-list.component */ 65258);
/* harmony import */ var _curriculum_pesquisa_list_usuario_curriculum_pesquisa_list_usuario_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./curriculum-pesquisa-list-usuario/curriculum-pesquisa-list-usuario.component */ 57461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
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
  path: 'dass',
  component: _currriculum_atributos_curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_10__.CurriculumAtributosQvtFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  data: {
    title: ""
  }
}, {
  path: 'pesquisa',
  component: _curriculum_pesquisa_list_curriculum_pesquisa_list_component__WEBPACK_IMPORTED_MODULE_11__.CurriculumPesquisaListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Pesquisa"
  }
}, {
  path: 'detalhe-pesquisa',
  component: _curriculum_pesquisa_list_usuario_curriculum_pesquisa_list_usuario_component__WEBPACK_IMPORTED_MODULE_12__.CurriculumPesquisaListUsuarioComponent,
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
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](CurriculumRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curriculum-routing.module */ 26447);
/* harmony import */ var _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curriculum-form/curriculum-form.component */ 97733);
/* harmony import */ var _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ 26832);
/* harmony import */ var _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 43872);
/* harmony import */ var _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currriculum-atributos/currriculum-atributos.component */ 64169);
/* harmony import */ var _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component */ 11229);
/* harmony import */ var _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component */ 28366);
/* harmony import */ var _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component */ 50090);
/* harmony import */ var _currriculum_atributos_curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component */ 47512);
/* harmony import */ var _curriculum_pesquisa_list_curriculum_pesquisa_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./curriculum-pesquisa-list/curriculum-pesquisa-list.component */ 65258);
/* harmony import */ var _currriculum_atributos_curriculum_pergunta_card_curriculum_pergunta_card_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./currriculum-atributos/curriculum-pergunta-card/curriculum-pergunta-card.component */ 80314);
/* harmony import */ var _curriculum_pesquisa_list_usuario_curriculum_pesquisa_list_usuario_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./curriculum-pesquisa-list-usuario/curriculum-pesquisa-list-usuario.component */ 57461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;
















class CurriculumModule {}
_class = CurriculumModule;
_class.ɵfac = function CurriculumModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](CurriculumModule, {
    declarations: [
    //CurriculumListComponent,
    _currriculum_atributos_currriculum_atributos_component__WEBPACK_IMPORTED_MODULE_5__.CurrriculumAtributosComponent, _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_2__.CurriculumFormComponent, _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumProfissionalFormComponent, _currriculum_atributos_curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributosbig5FormComponent, _currriculum_atributos_curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_6__.CurriculumAtributossoftFormComponent, _currriculum_atributos_curriculum_atributosdisc_form_curriculum_atributosdisc_form_component__WEBPACK_IMPORTED_MODULE_7__.CurriculumAtributosdiscFormComponent, _currriculum_atributos_curriculum_atributos_dass_form_curriculum_atributos_dass_form_component__WEBPACK_IMPORTED_MODULE_8__.CurriculumAtributosDassFormComponent, _currriculum_atributos_curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_9__.CurriculumAtributosQvtFormComponent, _curriculum_pesquisa_list_curriculum_pesquisa_list_component__WEBPACK_IMPORTED_MODULE_10__.CurriculumPesquisaListComponent, _currriculum_atributos_curriculum_pergunta_card_curriculum_pergunta_card_component__WEBPACK_IMPORTED_MODULE_11__.CurriculumPerguntaCardComponent, _curriculum_pesquisa_list_usuario_curriculum_pesquisa_list_usuario_component__WEBPACK_IMPORTED_MODULE_12__.CurriculumPesquisaListUsuarioComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule, _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_1__.CurriculumRoutingModule]
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

/***/ 47512:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumAtributosQvtFormComponent: () => (/* binding */ CurriculumAtributosQvtFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../base/page-form-base */ 1184);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/questionario-dao.service */ 10535);
/* harmony import */ var src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/questionario-pergunta-dao.service */ 8305);
/* harmony import */ var src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/questionario-resposta.model */ 86920);
/* harmony import */ var src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/questionario-resposta-dao.service */ 54771);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _curriculum_pergunta_card_curriculum_pergunta_card_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../curriculum-pergunta-card/curriculum-pergunta-card.component */ 80314);

var _class;












function CurriculumAtributosQvtFormComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Formul\u00E1rio do teste QVT n\u00E3o encontrado no banco de dados. Contate o suporte! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "curriculum-pergunta-card", 9);
  }
  if (rf & 2) {
    const idx_r8 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("indice", idx_r8 + 1)("pergunta", ctx_r3.perguntas[idx_r8])("control", ctx_r3.perguntas[idx_r8]._metadata.control);
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "curriculum-pergunta-card", 9);
  }
  if (rf & 2) {
    const idx_r9 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("indice", idx_r9 + 1)("pergunta", ctx_r4.perguntas[idx_r9])("control", ctx_r4.perguntas[idx_r9]._metadata.control);
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "curriculum-pergunta-card", 9);
  }
  if (rf & 2) {
    const idx_r10 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("indice", idx_r10 + 1)("pergunta", ctx_r5.perguntas[idx_r10])("control", ctx_r5.perguntas[idx_r10]._metadata.control);
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "curriculum-pergunta-card", 9);
  }
  if (rf & 2) {
    const idx_r11 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("indice", idx_r11 + 1)("pergunta", ctx_r6.perguntas[idx_r11])("control", ctx_r6.perguntas[idx_r11]._metadata.control);
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "curriculum-pergunta-card", 9);
  }
  if (rf & 2) {
    const idx_r12 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("indice", idx_r12 + 1)("pergunta", ctx_r7.perguntas[idx_r12])("control", ctx_r7.perguntas[idx_r12]._metadata.control);
  }
}
function CurriculumAtributosQvtFormComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "h3", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Pesquisa de Qualidade de Vida no Trabalho - QVT");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, " Bem-vindo(a),");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "br")(5, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, " Esta pesquisa \u00E9 100% an\u00F4nima. E sua participa\u00E7\u00E3o \u00E9 fundamental para que seja poss\u00EDvel uma an\u00E1lise representativa, em termos quantitativos e qualitativos, da situa\u00E7\u00E3o existente na Institui\u00E7\u00E3o. Valorizamos a sua opini\u00E3o e agradecemos pela disponibilidade em responder a pesquisa.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "br")(8, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9, " Desta forma, por n\u00E3o podermos identificar , solicitamos que seja gravado apenas uma vez. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_11_Template, 1, 3, "curriculum-pergunta-card", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](12, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "Qualidade de Vida no Trabalho, segundo Richard Walton (1973)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "separator", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_16_Template, 1, 3, "curriculum-pergunta-card", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](17, "separator")(18, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_19_Template, 1, 3, "curriculum-pergunta-card", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](20, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22, "Dass-21");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](23, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25, " Essa pesquisa \u00E9 an\u00F4nima, portanto, as informa\u00E7\u00F5es coletadas servir\u00E3o apenas para medir como esses estados emocionais est\u00E3o presentes na amostra em estudo. Essa se\u00E7\u00E3o n\u00E3o se presta a realizar qualquer tipo de diagn\u00F3stico cl\u00EDnico dos indiv\u00EDduos pesquisados.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](26, "br")(27, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, " (1) Lovibond, S.H. & Lovibond, P.F. (1995). Manual for the Depression Anxiety & Stress Scales. (2nd Ed.)Sydney: Psychology Foundation.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](29, "br")(30, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31, " (2) Henry, J. D., & Crawford, J. R. (2005). The short-form version of the Depression Anxiety Stress Scales (DASS-21): Construct validity and normative data in a large non-clinical sample. British Journal of Clinical Psychology, 44(2), 227-239.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](32, "br")(33, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "separator", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_35_Template, 1, 3, "curriculum-pergunta-card", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](36, "separator");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](38, "PGD");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](39, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](41, "Assinale uma das op\u00E7\u00F5es abaixo, em rela\u00E7\u00E3o ao Programa de Gest\u00E3o e Desempenho - PGD.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](42, "separator", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, CurriculumAtributosQvtFormComponent_ng_template_2_curriculum_pergunta_card_43_Template, 1, 3, "curriculum-pergunta-card", 6);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.range(0, 14));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.range(15, 39));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.range(40, 45));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.range(46, 66));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r2.range(67, 74));
  }
}
class CurriculumAtributosQvtFormComponent extends _base_page_form_base__WEBPACK_IMPORTED_MODULE_1__.PageFormBase {
  /*public questionario?: Questionario;
  public respostas: QuestionarioRespostaPergunta[] = [];
  public opcoesRichard: LookupItem[] = [{ 'key': 'Concordo Totalmente', 'value': 'Concordo Totalmente' }, { 'key': "Concordo", 'value': 'Concordo' }, { 'key': 'Neutro', 'value': 'Neutro' }, { 'key': 'Discordo', 'value': 'Discordo' }, { 'key': 'Discordo Totalmente', 'value': 'Discordo Totalmente' }];
  public opcoesDass: LookupItem[] = [{ 'key': 0, 'value': 'Não se aplicou de maneira alguma' }, { 'key': 1, 'value': 'Aplicou-se em algum grau, ou por pouco tempo' }, { 'key': 2, 'value': 'Aplicou-se em um grau considerável, ou por uma boa parte do tempo' }, { 'key': 3, 'value': 'Aplicou-se muito, ou na maioria do tempo.' }];
  public opcoesDiscriminacao: LookupItem[] = [{ 'key': 0, 'value': 'Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais.' }, { 'key': 1, 'value': 'Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição.' }, { 'key': 2, 'value': 'Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos.' }, { 'key': 3, 'value': 'Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas..' }];
  public subopcoes: string[] = ['Social', 'Racial', 'Religiosa', 'Sexual', 'Politica']
  public checkItens: string[] = [];
  public chart: any;
  public min: string = '';
  public max: string = '';
  public valueTrack: string = '';*/
  constructor(injector) {
    super(injector, src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta, src_app_dao_questionario_resposta_dao_service__WEBPACK_IMPORTED_MODULE_6__.QuestionarioRespostaDaoService);
    this.injector = injector;
    this.perguntas = [];
    this.indice0a9 = Array.from(new Array(10), (x, i) => i + 0);
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get(src_app_dao_questionario_dao_service__WEBPACK_IMPORTED_MODULE_3__.QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get(src_app_dao_questionario_pergunta_dao_service__WEBPACK_IMPORTED_MODULE_4__.QuestionarioPerguntaDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_7__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      concorda: {
        default: false
      },
      idade: {
        default: 0
      },
      sexo: {
        default: ''
      },
      concordaSexo: {
        default: true
      },
      raca: {
        default: ''
      },
      estadoCivil: {
        default: ''
      },
      escolaridade: {
        default: ''
      },
      ufExercicio: {
        default: ''
      },
      situacaoFuncional: {
        default: ''
      },
      anosInstituicao: {
        default: 0
      },
      unidade_id: {
        default: ''
      },
      necessitaAtencao: {
        default: false
      },
      cuidadoCrianca: {
        default: false
      },
      numeroCrianca: {
        default: 0
      },
      deficiencia: {
        default: false
      },
      satisfeitoRemuneracao: {
        default: ''
      },
      satisfeitoBeneficio: {
        default: ''
      },
      comparaRemuneracao: {
        default: ''
      },
      satisfeitoMeios: {
        default: ''
      },
      satisfeitoCarga: {
        default: ''
      },
      satisfeitoTarefas: {
        default: ''
      },
      satisfeitoHabilidades: {
        default: ''
      },
      satisfeitoRelevancia: {
        default: ''
      },
      satisfeitoAutonomia: {
        default: ''
      },
      satisfetoAvaliacao: {
        default: ''
      },
      satisfeitoCrescimento: {
        default: ''
      },
      satisfeitoIncentivo: {
        default: ''
      },
      satisfeitoiniciativas: {
        default: ''
      },
      satisfeitoColegas: {
        default: ''
      },
      satisfeitoChefia: {
        default: ''
      },
      comunicacaoChefia: {
        default: ''
      },
      satisfeitoLeis: {
        default: ''
      },
      satisfeitoIndividualidade: {
        default: ''
      },
      satisfeitoExpressao: {
        default: ''
      },
      satisfeitoPreocupacao: {
        default: ''
      },
      satisfeitoInfluencia: {
        default: ''
      },
      satisfeitoLazer: {
        default: ''
      },
      satisfeitoEntrega: {
        default: ''
      },
      oportunidades: {
        default: ''
      },
      orgulho: {
        default: ''
      },
      etarismo: {
        default: false
      },
      discriminacao: {
        default: false
      },
      assedio: {
        default: false
      },
      discriminacaoTrabalho: {
        default: false
      },
      formasDiscriminacao: {
        default: []
      },
      perecebeDiscriminacao: {
        default: ''
      },
      dass1: {
        default: ''
      },
      dass2: {
        default: ''
      },
      dass3: {
        default: ''
      },
      dass4: {
        default: ''
      },
      dass5: {
        default: ''
      },
      dass6: {
        default: ''
      },
      dass7: {
        default: ''
      },
      dass8: {
        default: ''
      },
      dass9: {
        default: ''
      },
      dass10: {
        default: ''
      },
      dass11: {
        default: ''
      },
      dass12: {
        default: ''
      },
      dass13: {
        default: ''
      },
      dass14: {
        default: ''
      },
      dass15: {
        default: ''
      },
      dass16: {
        default: ''
      },
      dass17: {
        default: ''
      },
      dass18: {
        default: ''
      },
      dass19: {
        default: ''
      },
      dass20: {
        default: ''
      },
      dass21: {
        default: ''
      },
      participaPGD: {
        default: ''
      },
      regimePGD: {
        default: ''
      },
      qualidadeVidaPGD: {
        default: ''
      },
      produtividadePGD: {
        default: ''
      },
      qualidadeTrabalhoPGD: {
        default: ''
      },
      entregaPGD: {
        default: false
      },
      chefia: {
        default: ''
      },
      colaboradoresPGD: {
        default: false
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const questionario = yield _this.questionarioDao?.query({
        where: [['codigo', '==', 'QVT']],
        join: ['perguntas.questionario_resposta_pergunta']
      }).asPromise();
      _this.questionario = questionario?.length ? questionario[0] : undefined;
      if (_this.questionario) {
        /* Ordena as perguntas */
        _this.questionario.perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
        _this.perguntas = _this.questionario.perguntas || [];
        /* Adiona metadatas */
        for (let pergunta of _this.perguntas) {
          pergunta._metadata = {
            control: _this.form.controls[pergunta.codigo || ""]
          };
        }
      } else {
        _this.dialog.alert("Questionário QVT não localizado", "Questionário não localizado");
      }
    })();
  }
  initializeData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.loadData(_this2.entity, form);
    })();
  }
  saveData(form) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.questionario) return false;
      /* if(this.respondido){
         this.dialog.alert("Gravação não efetuada", "Teste já respondido");
         return false;
       }*/
      let questionarioResposta = _this3.util.fill(new src_app_models_questionario_resposta_model__WEBPACK_IMPORTED_MODULE_5__.QuestionarioResposta(), _this3.entity || {});
      questionarioResposta.usuario_id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeee";
      questionarioResposta.editavel = 0;
      questionarioResposta.questionario_id = _this3.questionario.id;
      /*let respostas = this.entity?.questionario_resposta_pergunta || this.respostasB5.map((x, i) => new QuestionarioRespostaPergunta({
        questionario_pergunta_id: this.questionario!.perguntas[i].id,
        resposta: x,
        _status: "ADD"
      }));
      respostas.forEach((x, i) => {
        if (x._status != "ADD" && x.resposta != this.respostasB5[i]){
          x.resposta = this.respostasB5[i];
          x._status = "EDIT";
        }
      });*/
      //questionarioResposta.questionario_resposta_pergunta = respostas;
      return questionarioResposta;
    })();
  }
  range(start, end) {
    let result = [];
    for (let idx = start; idx <= end; idx++) result.push(idx);
    return result;
  }
}
_class = CurriculumAtributosQvtFormComponent;
_class.ɵfac = function CurriculumAtributosQvtFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributos-qvt-form"]],
  viewQuery: function CurriculumAtributosQvtFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 5,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [4, "ngIf", "ngIfElse"], ["qvt", ""], [1, "mb-3", "fw-bold"], ["id", "p_abertura", 1, "text-justify", "mb-3"], [1, "mt-3"], [3, "indice", "pergunta", "control", 4, "ngFor", "ngForOf"], [1, "mb-3", "mt-3"], [1, "text-justify", "mb-3"], [3, "indice", "pergunta", "control"]],
  template: function CurriculumAtributosQvtFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function CurriculumAtributosQvtFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumAtributosQvtFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, CurriculumAtributosQvtFormComponent_div_1_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, CurriculumAtributosQvtFormComponent_ng_template_2_Template, 44, 5, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.questionario)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__.SeparatorComponent, _curriculum_pergunta_card_curriculum_pergunta_card_component__WEBPACK_IMPORTED_MODULE_9__.CurriculumPerguntaCardComponent],
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
      } // else {
      //this.dialog.alert("Teste B5 deste usuário não localizado", "Teste não localizado");
      //}
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
  styles: [".h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.card-footer[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.chart-container[_ngcontent-%COMP%], .divgraficob5[_ngcontent-%COMP%] {\n  position: relative;\n  height: 40vh;\n  width: 80vw;\n}\n\n.fas[_ngcontent-%COMP%] {\n  width: 20px !important;\n}\n\n\n\n\n\n\n\n\n\n\n\n.slider-ui[_ngcontent-%COMP%] {\n  position: relative;\n  width: 500px;\n  height: 50px;\n  margin: 35px 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  cursor: pointer;\n  opacity: 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #000;\n  border-radius: 50px;\n  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);\n}\n\n.slider-ui[_ngcontent-%COMP%]   .min[_ngcontent-%COMP%], .slider-ui[_ngcontent-%COMP%]   .max[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 14px;\n  font-weight: 800;\n  color: #fff;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .min[_ngcontent-%COMP%] {\n  left: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .max[_ngcontent-%COMP%] {\n  right: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp1[_ngcontent-%COMP%], .slider-ui[_ngcontent-%COMP%]   .sp2[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 2;\n  top: 120%;\n  font-size: 14px;\n  font-weight: 800;\n  color: #000000;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp1[_ngcontent-%COMP%] {\n  left: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .sp2[_ngcontent-%COMP%] {\n  right: 2%;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .track[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 3;\n  left: 25px;\n  right: 25px;\n  top: 0;\n  bottom: 0;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  width: 50px;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 800;\n  color: #000000;\n  background-color: #fff;\n  border: 2px solid #000;\n  border-radius: 100%;\n  box-sizing: border-box;\n  transform: translateX(-50%);\n  transition: top 0.3s ease-in-out, color 0.3s ease-in-out;\n}\n\n.slider-ui[_ngcontent-%COMP%]   .value.up[_ngcontent-%COMP%] {\n  color: #000;\n}\n\n.slider-ui.color1[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color2[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color3[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color4[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%], .slider-ui.color5[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  background-image: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);\n}\n\n.slider-ui.color1[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color2[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color3[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color4[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%], .slider-ui.color5[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  border-color: #000000;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJyaWN1bHVtLWF0cmlidXRvcy9jdXJyaWN1bHVtLWF0cmlidXRvc2JpZzUtZm9ybS9jdXJyaWN1bHVtLWF0cmlidXRvc2JpZzUtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHdCQUFBO0VBQ0EsaUJBQUE7QUFDSjs7QUFFQTtFQUNJLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxtQkFBQTtBQUNKOztBQUVBO0VBQ0csa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUNIOztBQUVFO0VBQ0Usc0JBQUE7QUFDSjs7QUFHQzs7Ozs7Ozs7R0FBQTtBQVdDO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFGSjs7QUFJRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0FBREo7O0FBR0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0FBQUo7O0FBRUU7O0VBRUUsa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNFO0VBQ0UsUUFBQTtBQUVKOztBQUFFO0VBQ0UsU0FBQTtBQUdKOztBQUFFOztFQUVFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBR0o7O0FBREU7RUFDRSxRQUFBO0FBSUo7O0FBRkU7RUFDRSxTQUFBO0FBS0o7O0FBSEU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0FBTUo7O0FBSkU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0Esd0RBQUE7QUFPSjs7QUFMRTtFQUVFLFdBQUE7QUFPSjs7QUFMRTtFQUNFLCtFQUFBO0FBUUo7O0FBTkU7RUFDRSxxQkFBQTtBQVNKIiwic291cmNlc0NvbnRlbnQiOlsiLmg0LCAuY2FyZC10aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiBuZXV0cmEgdGV4dDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuICBcclxuLmNhcmR7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbi5jYXJkLWZvb3RlcntcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuLmNoYXJ0LWNvbnRhaW5lciwgLmRpdmdyYWZpY29iNXtcclxuICAgcG9zaXRpb246IHJlbGF0aXZlOyBcclxuICAgaGVpZ2h0OjQwdmg7IFxyXG4gICB3aWR0aDo4MHZ3XHJcbiAgfVxyXG5cclxuICAuZmFze1xyXG4gICAgd2lkdGg6IDIwcHggIWltcG9ydGFudDtcclxuICB9XHJcblxyXG5cclxuIC8qIGJvZHkge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICB9Ki9cclxuICBcclxuXHJcbiAgLnNsaWRlci11aSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogNTAwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW46IDM1cHggMDtcclxuICB9XHJcbiAgLnNsaWRlci11aSBpbnB1dCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB6LWluZGV4OiAxMDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbiAgLnNsaWRlci11aSAuYmFyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGJveC1zaGFkb3c6IDAgNXB4IDAgcmdiYSgwLDAsMCwuMSk7XHJcbiAgfVxyXG4gIC5zbGlkZXItdWkgLm1pbixcclxuICAuc2xpZGVyLXVpIC5tYXgge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgei1pbmRleDogMjtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAuc2xpZGVyLXVpIC5taW4ge1xyXG4gICAgbGVmdDogMiU7XHJcbiAgfVxyXG4gIC5zbGlkZXItdWkgLm1heCB7XHJcbiAgICByaWdodDogMiU7XHJcbiAgfVxyXG5cclxuICAuc2xpZGVyLXVpIC5zcDEsXHJcbiAgLnNsaWRlci11aSAuc3AyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICB0b3A6IDEyMCU7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogODAwO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG4gIC5zbGlkZXItdWkgLnNwMSB7XHJcbiAgICBsZWZ0OiAyJTtcclxuICB9XHJcbiAgLnNsaWRlci11aSAuc3AyIHtcclxuICAgIHJpZ2h0OiAyJTtcclxuICB9XHJcbiAgLnNsaWRlci11aSAudHJhY2sge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgei1pbmRleDogMztcclxuICAgIGxlZnQ6IDI1cHg7XHJcbiAgICByaWdodDogMjVweDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICB9XHJcbiAgLnNsaWRlci11aSAudmFsdWUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICAgIHRyYW5zaXRpb246IHRvcCAuM3MgZWFzZS1pbi1vdXQsIGNvbG9yIC4zcyBlYXNlLWluLW91dDtcclxuICB9XHJcbiAgLnNsaWRlci11aSAudmFsdWUudXAge1xyXG4gICAgLy90b3A6IC0xMTAlO1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgfVxyXG4gIC5zbGlkZXItdWkuY29sb3IxIC5iYXIsIC5zbGlkZXItdWkuY29sb3IyIC5iYXIgLC5zbGlkZXItdWkuY29sb3IzIC5iYXIsLnNsaWRlci11aS5jb2xvcjQgLmJhciAsLnNsaWRlci11aS5jb2xvcjUgLmJhciAge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDIwMDI0IDAlLCAjMDkwOTc5IDM1JSwgIzAwZDRmZiAxMDAlKTtcclxuICB9XHJcbiAgLnNsaWRlci11aS5jb2xvcjEgLnZhbHVlLCAuc2xpZGVyLXVpLmNvbG9yMiAudmFsdWUsIC5zbGlkZXItdWkuY29sb3IzIC52YWx1ZSwgLnNsaWRlci11aS5jb2xvcjQgLnZhbHVlLCAuc2xpZGVyLXVpLmNvbG9yNSAudmFsdWUge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjMDAwMDAwO1xyXG4gIH1cclxuICBcclxuICBcclxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/top-alert/top-alert.component */ 50933);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);

var _class;












function CurriculumAtributossoftFormComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Formul\u00E1rio de SoftSkill n\u00E3o encontrado no banco de dados. Contate o suporte! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function CurriculumAtributossoftFormComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "top-alert", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 4)(2, "div", 5)(3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 8)(6, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "Comunica\u00E7\u00E3o");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 10)(9, "div", 11)(10, "p", 12)(11, "input-number", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r11.valorSoftChange(ctx_r11.form.controls.comunica));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "div", 5)(14, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 8)(17, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "Lideran\u00E7a");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 10)(20, "div", 11)(21, "p", 12)(22, "input-number", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r13.valorSoftChange(ctx_r13.form.controls.lideranca));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "div", 5)(25, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](26, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 8)(28, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](29, "Resolu\u00E7\u00E3o de Problemas");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "div", 10)(31, "div", 19)(32, "p", 12)(33, "input-number", 20, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r14.valorSoftChange(ctx_r14.form.controls.resolucao));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "div", 5)(36, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](37, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "div", 8)(39, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](40, "Criatividade e Curiosidade");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "div", 10)(42, "div", 19)(43, "p", 12)(44, "input-number", 23, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_44_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r15.valorSoftChange(ctx_r15.form.controls.criatividade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](46, "div", 25)(47, "div", 5)(48, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](49, "img", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](50, "div", 8)(51, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](52, "Pensamento Cr\u00EDtico");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "div", 10)(54, "div", 19)(55, "p", 12)(56, "input-number", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_56_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r16.valorSoftChange(ctx_r16.form.controls.pensamento));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](58, "div", 5)(59, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](60, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](61, "div", 8)(62, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](63, "Habilidade com Pessoas e Equipes");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](64, "div", 10)(65, "div", 19)(66, "p", 12)(67, "input-number", 30, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_67_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r17.valorSoftChange(ctx_r17.form.controls.habilidade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](69, "div", 5)(70, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](71, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](72, "div", 8)(73, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](74, "Adaptabilidade e Resili\u00EAncia");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](75, "div", 10)(76, "div", 19)(77, "p", 12)(78, "input-number", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_78_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r18.valorSoftChange(ctx_r18.form.controls.adaptabilidade));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](80, "div", 5)(81, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](82, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](83, "div", 8)(84, "h5", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](85, "\u00C9tica");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](86, "div", 10)(87, "div", 11)(88, "p", 12)(89, "input-number", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function CurriculumAtributossoftFormComponent_ng_template_2_Template_input_number_change_89_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r19.valorSoftChange(ctx_r19.form.controls.etica));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("message", "Compet\u00EAncias Gerenciais, distribua 20 pontos entre as habilidades abaixo. Restam " + ctx_r2.restante + " pontos.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("control", ctx_r2.form.controls.comunica)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.lideranca)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.resolucao)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.criatividade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.pensamento)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.habilidade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12)("control", ctx_r2.form.controls.adaptabilidade)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("control", ctx_r2.form.controls.etica)("minValue", 0)("maxValue", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("min", 0);
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
    this.restante = 20;
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
        where: [['codigo', '==', 'SOFTSKILL']],
        join: ['perguntas']
      }).asPromise();
      if (questionario?.length) {
        questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia < b.sequencia ? -1 : 1);
        _this.questionario = questionario[0];
        const questionarioResposta = yield _this.dao?.query({
          where: [['questionario_id', '==', _this.questionario.id], ['usuario_id', '==', _this.auth.usuario?.id]],
          join: ['questionario_resposta_pergunta']
        }).asPromise();
        if (questionarioResposta?.length) {
          let questionarioRespostaOrdenado = [];
          let respostas = [];
          let indice = 0;
          _this.questionario.perguntas.forEach(pergunta => {
            questionarioResposta[0].questionario_resposta_pergunta.forEach((resposta, i) => {
              if (pergunta.id == resposta.questionario_pergunta_id) {
                respostas.push(resposta.resposta);
                indice = i;
              }
            });
            questionarioRespostaOrdenado.push(questionarioResposta[0].questionario_resposta_pergunta[indice]);
          });
          questionarioResposta[0].questionario_resposta_pergunta = questionarioRespostaOrdenado;
          _this.entity = questionarioResposta[0];
          _this.form.controls.comunica.setValue(respostas[0]);
          _this.form.controls.lideranca.setValue(respostas[1]);
          _this.form.controls.resolucao.setValue(respostas[2]);
          _this.form.controls.criatividade.setValue(respostas[3]);
          _this.form.controls.pensamento.setValue(respostas[4]);
          _this.form.controls.habilidade.setValue(respostas[5]);
          _this.form.controls.adaptabilidade.setValue(respostas[6]);
          _this.form.controls.etica.setValue(respostas[7]);
          _this.restante = 20 - respostas.reduce((soma, a) => soma + a, 0);
        } else {
          _this.entity = undefined;
        }
      } // else {
      //this.dialog.alert("Teste Soft-Skills deste usuário não localizado", "Teste não localizado");
      //}
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
      this.restante = 20 - soma;
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
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-atributossoft-form"]],
  viewQuery: function CurriculumAtributossoftFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 5,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], [4, "ngIf", "ngIfElse"], ["softskills", ""], ["type", "warning", 3, "message"], [1, "row", "justify-content-between", "g-4"], [1, "col-lg-3"], [1, "card", "h-100"], ["src", "/assets/icons/icone_comunicacao.png", "id", "imgComunica", "alt", "...", 1, "card-img-top"], [1, "card-body"], [1, "card-title", "text-center"], [1, "row", "justify-content-center"], [1, "col-md-12"], [1, "card-text"], ["controlName", "comunica", 3, "control", "minValue", "maxValue", "change"], ["comunicaV", ""], ["src", "/assets/icons/icone_lideranca.png", "id", "imgLideranca", "alt", "...", 1, "card-img-top"], ["controlName", "lideranca", 3, "size", "control", "minValue", "maxValue", "change"], ["liderancaV", ""], ["src", "/assets/icons/icone_resolucao.png", "id", "imgResolucao", "alt", "...", 1, "card-img-top"], [1, "col-md-8"], ["controlName", "resolucao", 3, "size", "control", "minValue", "maxValue", "change"], ["resolucaoV", ""], ["src", "/assets/icons/icone_criatividade.png", "id", "imgCriatividade", "alt", "...", 1, "card-img-top"], ["controlName", "criatividade", 3, "size", "control", "minValue", "maxValue", "change"], ["criatividadeV", ""], [1, "row", "justify-content-between", "g-4", "mt-3"], ["src", "/assets/icons/icone_pensamento.png", "id", "imgPensamento", "alt", "...", 1, "card-img-top"], ["controlName", "pensamento", 3, "size", "control", "minValue", "maxValue", "change"], ["pensamentoV", ""], ["src", "/assets/icons/icone_habilidades.png", "id", "imgHabilidade", "alt", "...", 1, "card-img-top"], ["controlName", "habilidade", 3, "size", "control", "minValue", "maxValue", "change"], ["habilidadeV", ""], ["src", "/assets/icons/icone_adaptabilidade.png", "id", "imgAdaptabilidade", "alt", "...", 1, "card-img-top"], ["controlName", "adaptabilidade", 3, "size", "control", "minValue", "maxValue", "change"], ["adaptabilidadeV", ""], ["src", "/assets/icons/icone_etica.png", "id", "imgEtica", "alt", "...", 1, "card-img-top"], ["controlName", "etica", 3, "control", "minValue", "maxValue", "change"], ["eticaV", ""]],
  template: function CurriculumAtributossoftFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function CurriculumAtributossoftFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function CurriculumAtributossoftFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, CurriculumAtributossoftFormComponent_div_1_Template, 2, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, CurriculumAtributossoftFormComponent_ng_template_2_Template, 91, 39, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.questionario)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, _components_top_alert_top_alert_component__WEBPACK_IMPORTED_MODULE_8__.TopAlertComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_9__.InputNumberComponent],
  styles: ["@import url(https://fonts.cdnfonts.com/css/neutra-text-alt);.h4[_ngcontent-%COMP%], .card-title[_ngcontent-%COMP%] {\n  font-family: neutra text;\n  font-weight: bold;\n}\n\n.card-img-top[_ngcontent-%COMP%] {\n  height: auto;\n  max-width: 90px;\n}\n\n.card[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9jdXJyaWN1bHVtL2N1cnJyaWN1bHVtLWF0cmlidXRvcy9jdXJyaWN1bHVtLWF0cmlidXRvc3NvZnQtZm9ybS9jdXJyaWN1bHVtLWF0cmlidXRvc3NvZnQtZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLHdCQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBQUY7O0FBSUE7RUFDRSxtQkFBQTtBQURGIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9uZXV0cmEtdGV4dC1hbHQnKTtcclxuXHJcbi5oNCwgLmNhcmQtdGl0bGV7XHJcbiAgZm9udC1mYW1pbHk6IG5ldXRyYSB0ZXh0O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uY2FyZC1pbWctdG9we1xyXG4gIGhlaWdodDogYXV0bztcclxuICBtYXgtd2lkdGg6IDkwcHg7XHJcbiAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmN2ZhO1xyXG59XHJcblxyXG4uY2FyZHtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 80314:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/currriculum-atributos/curriculum-pergunta-card/curriculum-pergunta-card.component.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurriculumPerguntaCardComponent: () => (/* binding */ CurriculumPerguntaCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
/* harmony import */ var src_app_services_entity_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/entity.service */ 30811);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-timer/input-timer.component */ 53085);
/* harmony import */ var _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-rate/input-rate.component */ 40052);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_input_input_check_input_check_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-check/input-check.component */ 58642);
var _class;

















function CurriculumPerguntaCardComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵprojection"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
}
function CurriculumPerguntaCardComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r1.size || 6)("controlName", (ctx_r1.pergunta == null ? null : ctx_r1.pergunta.codigo) || null)("control", ctx_r1.control)("items", ctx_r1.lookup.ICONES);
  }
}
function CurriculumPerguntaCardComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-search", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r2.size || 12)("controlName", (ctx_r2.pergunta == null ? null : ctx_r2.pergunta.codigo) || null)("control", ctx_r2.control)("dao", ctx_r2.getDao(ctx_r2.pergunta));
  }
}
function CurriculumPerguntaCardComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r3.size || 6)("controlName", (ctx_r3.pergunta == null ? null : ctx_r3.pergunta.codigo) || null)("control", ctx_r3.control)("items", ctx_r3.asLookupItem(ctx_r3.pergunta == null ? null : ctx_r3.pergunta.respostas));
  }
}
function CurriculumPerguntaCardComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-multiselect", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r4.size || 12)("controlName", (ctx_r4.pergunta == null ? null : ctx_r4.pergunta.codigo) || null)("control", ctx_r4.control)("items", ctx_r4.asLookupItem(ctx_r4.pergunta == null ? null : ctx_r4.pergunta.respostas));
  }
}
function CurriculumPerguntaCardComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-text", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r5.size || 12)("controlName", (ctx_r5.pergunta == null ? null : ctx_r5.pergunta.codigo) || null)("control", ctx_r5.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-textarea", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r6.size || 12)("rows", 2)("controlName", (ctx_r6.pergunta == null ? null : ctx_r6.pergunta.codigo) || null)("control", ctx_r6.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-timer", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r7.size || 6)("controlName", (ctx_r7.pergunta == null ? null : ctx_r7.pergunta.codigo) || null)("control", ctx_r7.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-datetime", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("date", ctx_r8.checkDateTimeTipo(ctx_r8.pergunta, "DATE") ? "true" : undefined)("time", ctx_r8.checkDateTimeTipo(ctx_r8.pergunta, "TIME") ? "true" : undefined)("size", ctx_r8.size || 6)("controlName", (ctx_r8.pergunta == null ? null : ctx_r8.pergunta.codigo) || null)("control", ctx_r8.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-switch", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_16_Template_input_switch_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r16.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r9.size || 6)("controlName", (ctx_r9.pergunta == null ? null : ctx_r9.pergunta.codigo) || null)("control", ctx_r9.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-number", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_17_Template_input_number_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r18.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r10.size || 4)("controlName", (ctx_r10.pergunta == null ? null : ctx_r10.pergunta.codigo) || null)("control", ctx_r10.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "input-rate", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r11.size || 6)("controlName", (ctx_r11.pergunta == null ? null : ctx_r11.pergunta.codigo) || null)("control", ctx_r11.control);
  }
}
function CurriculumPerguntaCardComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-radio", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_19_Template_input_radio_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r20.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r12.size || 12)("controlName", (ctx_r12.pergunta == null ? null : ctx_r12.pergunta.codigo) || null)("control", ctx_r12.control)("items", ctx_r12.asLookupItem(ctx_r12.pergunta == null ? null : ctx_r12.pergunta.respostas));
  }
}
function CurriculumPerguntaCardComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-radio", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_20_Template_input_radio_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r22.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r13.size || 12)("controlName", (ctx_r13.pergunta == null ? null : ctx_r13.pergunta.codigo) || null)("control", ctx_r13.control)("items", ctx_r13.asLookupItem(ctx_r13.pergunta == null ? null : ctx_r13.pergunta.respostas));
  }
}
function CurriculumPerguntaCardComponent_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-radio", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_21_Template_input_radio_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r24.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r14.size || 12)("controlName", (ctx_r14.pergunta == null ? null : ctx_r14.pergunta.codigo) || null)("control", ctx_r14.control)("items", ctx_r14.asLookupItem(ctx_r14.pergunta == null ? null : ctx_r14.pergunta.respostas));
  }
}
function CurriculumPerguntaCardComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "input-check", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("change", function CurriculumPerguntaCardComponent_ng_container_22_Template_input_check_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r26.onChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("size", ctx_r15.size || 12)("controlName", (ctx_r15.pergunta == null ? null : ctx_r15.pergunta.codigo) || null)("control", ctx_r15.control)("items", ctx_r15.asLookupItem(ctx_r15.pergunta == null ? null : ctx_r15.pergunta.respostas));
  }
}
const _c0 = ["*"];
class CurriculumPerguntaCardComponent {
  constructor(lookup, entityService) {
    this.lookup = lookup;
    this.entityService = entityService;
    this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_14__.EventEmitter();
    this.indice = undefined;
    this.size = undefined;
    this.JSON = JSON;
  }
  ngOnInit() {}
  onChange(event) {
    this.change.emit(event);
  }
  getDao(pergunta) {
    return this.entityService.getDao((pergunta?.respostas).entity);
  }
  asLookupItem(items) {
    return items || [];
  }
  checkDateTimeTipo(pergunta, tipo) {
    return pergunta?.respostas?.tipo == tipo;
  }
}
_class = CurriculumPerguntaCardComponent;
_class.ɵfac = function CurriculumPerguntaCardComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_0__.LookupService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_services_entity_service__WEBPACK_IMPORTED_MODULE_1__.EntityService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["curriculum-pergunta-card"]],
  inputs: {
    indice: "indice",
    pergunta: "pergunta",
    control: "control",
    titulo: "titulo",
    size: "size"
  },
  outputs: {
    change: "change"
  },
  ngContentSelectors: _c0,
  decls: 23,
  vars: 18,
  consts: [["id", "cardIdade", 1, "card", "my-3", "cardIdade"], [1, "card-header"], [1, "row"], ["name", "lblIdade", "id", "lblIdade", 1, "fw-bold"], [1, "card-body", "text-wrap"], [1, "col-md-12"], [4, "ngIf"], [3, "size", "controlName", "control", "items"], [3, "size", "controlName", "control", "dao"], [3, "size", "controlName", "control"], [3, "size", "rows", "controlName", "control"], [3, "date", "time", "size", "controlName", "control"], ["labelPosition", "right", 3, "size", "controlName", "control", "change"], [3, "size", "controlName", "control", "change"], ["circle", "", 3, "size", "controlName", "control", "items", "change"], ["circle", "", "inline", "", 3, "size", "controlName", "control", "items", "change"], [3, "size", "controlName", "control", "items", "change"]],
  template: function CurriculumPerguntaCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "div", 4)(6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](7, CurriculumPerguntaCardComponent_ng_container_7_Template, 2, 0, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](8, CurriculumPerguntaCardComponent_ng_container_8_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, CurriculumPerguntaCardComponent_ng_container_9_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](10, CurriculumPerguntaCardComponent_ng_container_10_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](11, CurriculumPerguntaCardComponent_ng_container_11_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](12, CurriculumPerguntaCardComponent_ng_container_12_Template, 2, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](13, CurriculumPerguntaCardComponent_ng_container_13_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](14, CurriculumPerguntaCardComponent_ng_container_14_Template, 2, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](15, CurriculumPerguntaCardComponent_ng_container_15_Template, 2, 5, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](16, CurriculumPerguntaCardComponent_ng_container_16_Template, 2, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](17, CurriculumPerguntaCardComponent_ng_container_17_Template, 2, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](18, CurriculumPerguntaCardComponent_ng_container_18_Template, 2, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](19, CurriculumPerguntaCardComponent_ng_container_19_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](20, CurriculumPerguntaCardComponent_ng_container_20_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](21, CurriculumPerguntaCardComponent_ng_container_21_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](22, CurriculumPerguntaCardComponent_ng_container_22_Template, 2, 4, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate2"](" ", !ctx.indice ? "" : ctx.indice + ". ", "", (ctx.pergunta == null ? null : ctx.pergunta.pergunta) || ctx.titulo || "", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !ctx.pergunta);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "EMOJI");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "SEARCH");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "SELECT");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "MULTI_SELECT");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "TEXT");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "TEXT_AREA");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "TIMER");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "DATE_TIME");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "SWITCH");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "NUMBER");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "RATE");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "RADIO");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "RADIO_INLINE");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "RADIO_BUTTON");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.pergunta == null ? null : ctx.pergunta.tipo) == "CHECK");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_2__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_3__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_4__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_5__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_6__.InputDatetimeComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_7__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_8__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_9__.InputMultiselectComponent, _components_input_input_timer_input_timer_component__WEBPACK_IMPORTED_MODULE_10__.InputTimerComponent, _components_input_input_rate_input_rate_component__WEBPACK_IMPORTED_MODULE_11__.InputRateComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_12__.InputNumberComponent, _components_input_input_check_input_check_component__WEBPACK_IMPORTED_MODULE_13__.InputCheckComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ 43872);
/* harmony import */ var _curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-atributossoft-form/curriculum-atributossoft-form.component */ 11229);
/* harmony import */ var _curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component */ 47512);
var _class;







class CurrriculumAtributosComponent {
  constructor(injector) {
    this.injector = injector;
  }
}
_class = CurrriculumAtributosComponent;
_class.ɵfac = function CurrriculumAtributosComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-currriculum-atributos"]],
  viewQuery: function CurrriculumAtributosComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  decls: 7,
  vars: 0,
  consts: [["display", "", "right", "", 1, "my-5"], ["key", "QVT", "label", "QVT", 1, "fw-bold"], ["key", "BIG5", "label", "Big-Five", 1, "fw-bold"], ["key", "SOFTSKILLS", "label", "Soft-Skills", 1, "fw-bold"]],
  template: function CurrriculumAtributosComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tabs", 0)(1, "tab", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "curriculum-atributos-qvt-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "curriculum-atributosbig5-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "curriculum-atributossoft-form");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_1__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_2__.TabComponent, _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_3__.CurriculumAtributosbig5FormComponent, _curriculum_atributossoft_form_curriculum_atributossoft_form_component__WEBPACK_IMPORTED_MODULE_4__.CurriculumAtributossoftFormComponent, _curriculum_atributos_qvt_form_curriculum_atributos_qvt_form_component__WEBPACK_IMPORTED_MODULE_5__.CurriculumAtributosQvtFormComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ })

}]);
//# sourceMappingURL=4515.js.map