(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "4IcU":
/*!******************************************!*\
  !*** ./src/app/models/entidade.model.ts ***!
  \******************************************/
/*! exports provided: EntidadeNotificacoes, Entidade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeNotificacoes", function() { return EntidadeNotificacoes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entidade", function() { return Entidade; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class EntidadeNotificacoes {
    constructor() {
        this.enviar_email = true;
        this.enviar_whatsapp = true;
        this.notifica_demanda_distribuicao = true;
        this.notifica_demanda_conclusao = true;
        this.notifica_demanda_avaliacao = true;
        this.notifica_demanda_modificacao = true;
        this.notifica_demanda_comentario = true;
        this.template_demanda_distribuicao = "Uma nova demanda foi atribuída a você, acesse o PETRVS para visualizá-la! (ID: #{{demanda_numero}})";
        this.template_demanda_conclusao = "A demanda #{{demanda_numero}}, atribuída à\ao {{demanda_responsavel}}, foi concluída, acesse o PETRVS para visualizá-la!";
        this.template_demanda_avaliacao = "Sua demanda #{{demanda_numero}} foi avaliada, acesse o PETRVS para avaliá-la!";
        this.template_demanda_modificacao = "A demanda #{{demanda_numero}}, atribuída à {{demanda_responsavel}}, foi atualizada, acesse o PETRVS para visualizá-la!";
        this.template_demanda_comentario = "Foi inserido um comentário na demanda #{{demanda_numero}}, atribuída a {{demanda_responsavel}}, acesse o PETRVS para visualizá-la!";
    }
}
class Entidade extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.sigla = ""; // Sigla da entidade
        this.nome = ""; // Nome da entidade
        this.abrangencia = "NACIONAL"; //["NACIONAL", "ESTADUAL", "MUNICIPAL" // ("Abrangência da entidade
        this.codigo_ibge = null; //Código da UF ou do município (IBGE)
        this.carga_horaria_padrao = 8; //default(8) //Carga horária utilizada ao criar plano de trabalho
        this.gravar_historico_processo = 0; //default(0) //Se grava andamento da demanda dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
        this.layout_formulario_demanda = "COMPLETO"; //["COMPLETO", "SIMPLIFICADO"]) default("COMPLETO") //Layout para a tela do formulário de demandas (cadastro simplificado ou completo)
        this.campos_ocultos_demanda = []; //Campos que se deseja ocultar do formulário de daemanda, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco"
        this.tipo_modalidade_id = null; //Tipo de modalidade utilizada ao criar plano de trabalho
        this.cidade_id = null;
        this.uf = null; /* UF para abrangencia estadual */
        this.nomenclatura = []; /* Nomenclatura da entidade */
        this.notificacoes = new EntidadeNotificacoes();
        this.url_sei = ""; /* Url base do sei */
        this.gestor_id = null; // Usuário gestor da unidade
        this.gestor_substituto_id = null; // Usuário gestor substituto da unidade
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
    }
}


/***/ }),

/***/ "LYCz":
/*!***************************************************!*\
  !*** ./src/app/dao/tipo-atividade-dao.service.ts ***!
  \***************************************************/
/*! exports provided: TipoAtividadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAtividadeDaoService", function() { return TipoAtividadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TipoAtividadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("TipoAtividade", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
TipoAtividadeDaoService.ɵfac = function TipoAtividadeDaoService_Factory(t) { return new (t || TipoAtividadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
TipoAtividadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TipoAtividadeDaoService, factory: TipoAtividadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Lsi6":
/*!****************************************************!*\
  !*** ./src/app/models/tipo-justificativa.model.ts ***!
  \****************************************************/
/*! exports provided: TipoJustificativa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoJustificativa", function() { return TipoJustificativa; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class TipoJustificativa extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor() {
        super();
        this.nome = ""; /* Descrição do tipo da justificativa */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
    }
}


/***/ }),

/***/ "aPFm":
/*!*********************************************!*\
  !*** ./src/app/dao/entidade-dao.service.ts ***!
  \*********************************************/
/*! exports provided: EntidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntidadeDaoService", function() { return EntidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EntidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Entidade", injector);
        this.injector = injector;
        this.searchFields = ["sigla", "nome"];
    }
}
EntidadeDaoService.ɵfac = function EntidadeDaoService_Factory(t) { return new (t || EntidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
EntidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EntidadeDaoService, factory: EntidadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "gFTY":
/*!************************************************************!*\
  !*** ./src/app/dao/tipo-motivo-afastamento-dao.service.ts ***!
  \************************************************************/
/*! exports provided: TipoMotivoAfastamentoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoMotivoAfastamentoDaoService", function() { return TipoMotivoAfastamentoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TipoMotivoAfastamentoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("TipoMotivoAfastamento", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
TipoMotivoAfastamentoDaoService.ɵfac = function TipoMotivoAfastamentoDaoService_Factory(t) { return new (t || TipoMotivoAfastamentoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
TipoMotivoAfastamentoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TipoMotivoAfastamentoDaoService, factory: TipoMotivoAfastamentoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "lbnZ":
/*!*******************************************!*\
  !*** ./src/app/dao/cidade-dao.service.ts ***!
  \*******************************************/
/*! exports provided: CidadeDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CidadeDaoService", function() { return CidadeDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CidadeDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Cidade", injector);
        this.injector = injector;
        this.searchFields = ["uf", "nome"];
    }
}
CidadeDaoService.ɵfac = function CidadeDaoService_Factory(t) { return new (t || CidadeDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CidadeDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CidadeDaoService, factory: CidadeDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "pWMB":
/*!*******************************************!*\
  !*** ./src/app/dao/perfil-dao.service.ts ***!
  \*******************************************/
/*! exports provided: PerfilDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerfilDaoService", function() { return PerfilDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PerfilDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Perfil", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
PerfilDaoService.ɵfac = function PerfilDaoService_Factory(t) { return new (t || PerfilDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PerfilDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PerfilDaoService, factory: PerfilDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "qnvs":
/*!*******************************************************!*\
  !*** ./src/app/dao/tipo-justificativa-dao.service.ts ***!
  \*******************************************************/
/*! exports provided: TipoJustificativaDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoJustificativaDaoService", function() { return TipoJustificativaDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TipoJustificativaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("TipoJustificativa", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
TipoJustificativaDaoService.ɵfac = function TipoJustificativaDaoService_Factory(t) { return new (t || TipoJustificativaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
TipoJustificativaDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TipoJustificativaDaoService, factory: TipoJustificativaDaoService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=common.js.map