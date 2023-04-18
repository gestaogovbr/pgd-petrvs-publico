(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "2u95":
/*!**********************************************************!*\
  !*** ./src/app/dao/planejamento-objetivo-dao.service.ts ***!
  \**********************************************************/
/*! exports provided: PlanejamentoObjetivoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoObjetivoDaoService", function() { return PlanejamentoObjetivoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PlanejamentoObjetivoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("PlanejamentoObjetivo", injector);
        this.injector = injector;
        this.searchFields = ["nome", "planejamento_id", "eixo_tematico_id"];
    }
}
PlanejamentoObjetivoDaoService.ɵfac = function PlanejamentoObjetivoDaoService_Factory(t) { return new (t || PlanejamentoObjetivoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
PlanejamentoObjetivoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PlanejamentoObjetivoDaoService, factory: PlanejamentoObjetivoDaoService.ɵfac, providedIn: 'root' });


/***/ }),

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
/* harmony import */ var _expediente_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expediente.model */ "e8A4");


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
    constructor(data) {
        super();
        this.sigla = ""; // Sigla da entidade
        this.nome = ""; // Nome da entidade
        this.abrangencia = "NACIONAL"; //["NACIONAL", "ESTADUAL", "MUNICIPAL" // ("Abrangência da entidade
        this.codigo_ibge = null; //Código da UF ou do município (IBGE)
        this.carga_horaria_padrao = 8; //default(8) //Carga horária utilizada ao criar plano de trabalho
        this.gravar_historico_processo = 0; //default(0) //Se grava andamento da demanda dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
        this.layout_formulario_demanda = "COMPLETO"; //["COMPLETO", "SIMPLIFICADO"]) default("COMPLETO") //Layout para a tela do formulário de demandas (cadastro simplificado ou completo)
        this.campos_ocultos_demanda = []; //Campos que se deseja ocultar do formulário de demanda, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco"
        this.uf = null; /* UF para abrangencia estadual */
        this.nomenclatura = []; /* Nomenclatura da entidade */
        this.notificacoes = new EntidadeNotificacoes();
        this.url_sei = ""; /* Url base do sei */
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.expediente = new _expediente_model__WEBPACK_IMPORTED_MODULE_1__["Expediente"](); // Expediente (Não nulo)
        this.gestor_id = null; // Usuário gestor da unidade
        this.gestor_substituto_id = null; // Usuário gestor substituto da unidade
        this.cidade_id = null;
        this.tipo_modalidade_id = null; //Tipo de modalidade utilizada ao criar plano de trabalho
        this.template_adesao_id = null; //Templeta utilizado no documento da adesão
        this.template_adesao_cancelamento_id = null; //Templeta utilizado no documento de cancelamento da adesão
        this.initialization(data);
    }
}


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
    constructor(data) {
        super();
        this.nome = ""; /* Descrição do tipo da justificativa */
        this.data_inicio = new Date(); /* Data de início */
        this.data_fim = null; /* Data do fim */
        this.initialization(data);
    }
}


/***/ }),

/***/ "M+Kp":
/*!**************************************************!*\
  !*** ./src/app/dao/eixo-tematico-dao.service.ts ***!
  \**************************************************/
/*! exports provided: EixoTematicoDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EixoTematicoDaoService", function() { return EixoTematicoDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EixoTematicoDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("EixoTematico", injector);
        this.injector = injector;
        this.searchFields = ["nome"];
    }
}
EixoTematicoDaoService.ɵfac = function EixoTematicoDaoService_Factory(t) { return new (t || EixoTematicoDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
EixoTematicoDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EixoTematicoDaoService, factory: EixoTematicoDaoService.ɵfac, providedIn: 'root' });


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

/***/ "ncVk":
/*!*******************************************************!*\
  !*** ./src/app/models/planejamento-objetivo.model.ts ***!
  \*******************************************************/
/*! exports provided: PlanejamentoObjetivo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanejamentoObjetivo", function() { return PlanejamentoObjetivo; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class PlanejamentoObjetivo extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.data_inicio = new Date(); /* Data de criação */
        this.data_fim = null; /* Data final do registro */
        this.nome = ""; /* Nome do objetivo */
        this.fundamentacao = ""; /* Fundamentação para a definição do objetivo */
        this.planejamento_id = null;
        this.eixo_tematico_id = null;
        this.objetivo_superior_id = null;
        this.initialization(data);
    }
}


/***/ })

}]);
//# sourceMappingURL=common.js.map