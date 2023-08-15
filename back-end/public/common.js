"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[592],{

/***/ 65296:
/*!****************************************************!*\
  !*** ./src/app/models/tipo-justificativa.model.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TipoJustificativa: () => (/* binding */ TipoJustificativa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TipoJustificativa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Descrição do tipo da justificativa */
    this.initialization(data);
  }
}

/***/ }),

/***/ 77447:
/*!***********************************************************************!*\
  !*** ./src/app/modules/gestao/plano-entrega/plano-entrega.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoEntregaService: () => (/* binding */ PlanoEntregaService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
var _class;


class PlanoEntregaService {
  constructor(lookup) {
    this.lookup = lookup;
  }
  getValorMeta(entrega) {
    let result = "";
    switch (entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM":
        result = entrega.meta.porcentagem + " %";
        break;
      case "QUANTIDADE":
        result = entrega.meta.quantitativo + "";
        break;
      case "VALOR":
        result = entrega.meta.valor + "";
        break;
      case "QUALITATIVO":
        result = this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.meta.qualitativo);
        break;
      default:
        result = "Indicador desconhecido";
    }
    return result;
  }
  getValorRealizado(entrega) {
    let result = "";
    switch (entrega.entrega?.tipo_indicador) {
      case "PORCENTAGEM":
        result = entrega.realizado.porcentagem + " %";
        break;
      case "QUANTIDADE":
        result = entrega.realizado.quantitativo + "";
        break;
      case "VALOR":
        result = entrega.realizado.valor + "";
        break;
      case "QUALITATIVO":
        result = this.lookup.getValue(entrega.entrega.lista_qualitativos, entrega.realizado.qualitativo);
        break;
      default:
        result = "Indicador desconhecido";
    }
    return result;
  }
  getValor(entregaValor) {
    return typeof entregaValor.porcentagem != "undefined" ? entregaValor.porcentagem : typeof entregaValor.qualitativo != "undefined" ? entregaValor.qualitativo : typeof entregaValor.quantitativo != "undefined" ? entregaValor.quantitativo : typeof entregaValor.valor != "undefined" ? entregaValor.valor : 0;
  }
  getEntregaValor(entrega, valor) {
    let result = {};
    if (entrega.tipo_indicador == "PORCENTAGEM") result.porcentagem = valor;
    if (entrega.tipo_indicador == "QUALITATIVO") result.qualitativo = valor;
    if (entrega.tipo_indicador == "QUANTIDADE") result.quantitativo = valor;
    if (entrega.tipo_indicador == "VALOR") result.valor = valor;
    return result;
  }
  isPorcentagem(entrega) {
    return entrega.entrega?.tipo_indicador == "PORCENTAGEM";
  }
  /**
   * Informa se o plano de entregas repassado como parâmetro está ativo, ou seja: é um plano válido (não foi deletado, não foi cancelado,
   * não foi arquivado) e possui o status ATIVO.
   * @param planoEntrega
   * @returns
   */
  isAtivo(planoEntrega) {
    return this.isValido(planoEntrega) && planoEntrega.status_atual?.codigo == 'ATIVO';
  }
  /**
   * Informa se o plano de entregas repassado como parâmetro é válido, ou seja, não foi deletado, não foi cancelado nem foi arquivado.
   * @param planoEntrega
   * @returns
   */
  isValido(planoEntrega) {
    return !planoEntrega.deleted_at && planoEntrega.status_atual?.codigo != 'CANCELADO' && !planoEntrega.data_arquivamento;
  }
}
_class = PlanoEntregaService;
_class.ɵfac = function PlanoEntregaService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_0__.LookupService));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);
//# sourceMappingURL=common.js.map