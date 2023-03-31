(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

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
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo da justificativa */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.initialization(data);
    }
}


/***/ }),

/***/ "QUyP":
/*!*************************************************!*\
  !*** ./src/app/services/notificacao.service.ts ***!
  \*************************************************/
/*! exports provided: NotificacaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificacaoService", function() { return NotificacaoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class NotificacaoService {
    constructor() { }
    get hintDemandaDistribuicao() {
        return "Variáveis disponíveis:\n{{demanda_numero}}";
    }
    get hintDemandaConclusao() {
        return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
    }
    get hintDemandaAvaliacao() {
        return "Variáveis disponíveis:\n{{demanda_numero}}";
    }
    get hintDemandaModificacao() {
        return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
    }
    get hintDemandaComentario() {
        return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
    }
}
NotificacaoService.ɵfac = function NotificacaoService_Factory(t) { return new (t || NotificacaoService)(); };
NotificacaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificacaoService, factory: NotificacaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "lKXT":
/*!**************************************************!*\
  !*** ./src/app/dao/plano-entrega-dao.service.ts ***!
  \**************************************************/
/*! exports provided: PlanoEntregaDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanoEntregaDaoService", function() { return PlanoEntregaDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PlanoEntregaDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("PlanoEntrega", injector);
        this.injector = injector;
    }
    needHomologate(plano) {
    }
}
PlanoEntregaDaoService.ɵfac = function PlanoEntregaDaoService_Factory(t) { return new (t || PlanoEntregaDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PlanoEntregaDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PlanoEntregaDaoService, factory: PlanoEntregaDaoService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=common.js.map