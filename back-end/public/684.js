"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[684],{

/***/ 80684:
/*!*************************************************************************!*\
  !*** ./src/app/modules/gestao/plano-trabalho/plano-trabalho.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanoTrabalhoService: () => (/* binding */ PlanoTrabalhoService)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/documento.model */ 43972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ 32333);
/* harmony import */ var src_app_services_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/util.service */ 49193);
/* harmony import */ var src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/navigate.service */ 92307);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
/* harmony import */ var src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/plano-trabalho-dao.service */ 87744);
/* harmony import */ var src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/avaliacao-dao.service */ 41095);
/* harmony import */ var _uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../uteis/templates/template.service */ 49367);










class PlanoTrabalhoService {
  constructor(auth, util, go, lookup, dao, avaliacaoDao, templateService, planoTrabalhoDao) {
    this.auth = auth;
    this.util = util;
    this.go = go;
    this.lookup = lookup;
    this.dao = dao;
    this.avaliacaoDao = avaliacaoDao;
    this.templateService = templateService;
    this.planoTrabalhoDao = planoTrabalhoDao;
  }
  template(plano) {
    return plano.programa?.template_tcr;
  }
  metadados(plano) {
    return {
      needSign: this.needSign.bind(this),
      extraTags: this.extraTags.bind(this),
      especie: "TCR",
      titulo: "Termo de Ciência e Responsabilidade",
      dataset: this.planoTrabalhoDao.dataset(),
      datasource: this.planoTrabalhoDao.datasource(plano),
      template: plano.programa?.template_tcr,
      template_id: plano.programa?.template_tcr_id
    };
  }
  needSign(parent, item) {
    const plano = parent;
    const documento = item || (plano?.documentos || []).find(x => plano?.documento_id?.length && x.id == plano?.documento_id) || plano?.documento;
    if (parent && documento && !documento.assinaturas?.find(x => x.usuario_id == this.auth.usuario.id)) {
      const tipoModalidade = plano.tipo_modalidade;
      const programa = plano.programa;
      const entidade = this.auth.entidade;
      let ids = [];
      if (programa?.plano_trabalho_assinatura_participante) ids.push(plano.usuario_id);
      if (programa?.plano_trabalho_assinatura_gestor_lotacao) ids.push(...this.auth.gestoresLotacao.map(x => x.id));
      if (programa?.plano_trabalho_assinatura_gestor_unidade) ids.push(plano.unidade?.gestor?.id || "", ...(plano.unidade?.gestores_substitutos?.map(x => x.id) || ""));
      if (programa?.plano_trabalho_assinatura_gestor_entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
      return !!tipoModalidade && ids.includes(this.auth.usuario.id);
    }
    return false;
  }
  extraTags(parent, documento, metadado) {
    const plano = parent;
    let tags = [];
    if (plano?.documento_id == documento.id) tags.push({
      key: documento.id,
      value: "Vigente",
      icon: "bi bi-check-all",
      color: "primary"
    });
    if (JSON.stringify(metadado.tags) != JSON.stringify(tags)) metadado.tags = tags;
    return metadado.tags;
  }
  /**
   * Método retorna um badge de acordo com o tipo de entrega recebida no parâmetro 'planoTrabalhoEntrega'. Esse tipo poderá ser 'entrega associada a uma entrega da própria unidade',
   * 'entrega associada a uma entrega de outra unidade', 'entrega associada a outro órgão/entidade', ou ainda 'entrega não vinculada'.
   * @param planoTrabalhoEntrega  Entrega do Plano de Trabalho cujo tipo será analisado.
   * @param planoTrabalho         Plano de Trabalho ao qual pertence a entrega a ser analisada. Se não for informado, o método tentará obtê-lo diretamente da própria entrega recebida.
   * @returns
   */
  tipoEntrega(planoTrabalhoEntrega, planoTrabalho) {
    /* Se planoTrabalhoEntrega for uma entrega vinda do banco de dados, e pertencer a alguma unidade (seja ela a própria do plano de trabalho, ou outra), ela traz consigo planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega?.unidade_id,
       que será usado para definir a qual tipo de unidade ela está vinculada (própria ou outra). Se planoTrabalhoEntrega não estiver vinculada a nenhuma unidade, ela poderá possuir planoTrabalhoEntrega.orgao
       (caso em que estará 'vinculada a outro órgão/entidade'), ou não (caso em que será uma 'entrega não vinculada').
       Se planoTrabalhoEntrega não vier do banco, ou seja, acabou de ser incluída no grid, ela passou pelo método saveEntrega() e lá foi anexado o objeto 'plano?._metadata?.novaEntrega'. */
    let plano = planoTrabalho || planoTrabalhoEntrega.plano_trabalho;
    let key = planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega?.unidade_id == plano.unidade_id ? "PROPRIA_UNIDADE" : planoTrabalhoEntrega.plano_entrega_entrega ? "OUTRA_UNIDADE" : !!planoTrabalhoEntrega.orgao?.length ? "OUTRO_ORGAO" : "SEM_ENTREGA";
    let result = this.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO.find(x => x.key == key) || {
      key: "",
      value: "Desconhecido1"
    };
    let nome = plano?._metadata?.novaEntrega?.plano_entrega_entrega?.entrega?.nome || planoTrabalhoEntrega.plano_entrega_entrega?.entrega?.nome || "Desconhecido2";
    let descricao = plano?._metadata?.novaEntrega?.plano_entrega_entrega?.descricao || planoTrabalhoEntrega.plano_entrega_entrega?.descricao || "";
    return {
      titulo: result.value,
      cor: result.color || "danger",
      nome: nome,
      tipo: key,
      descricao: descricao
    };
  }
  /**
   * Método atualiza o TCR caso ele exista (possivelmente obrigatório pelo programa), e caso ele não esteja assinado.
   * Em caso de estar assinado ou ser obrigatório e não exista ainda, será gerado um novo documento.
   * @param planoReferencia  Plano de trabalho para comparação (contendo as entregas)
   * @param planoNovo        Plano de trabalho modificado, com as novas informações (contendo as entregas, programa.template_tcr e documentos)
   * @param ?textUsuario     Texto complementar do usuário, caso não seja informado, irá utilizar o do planoNovo.usuario.texto_complementar_plano
   * @param ?textUnidade     Texto complementar da unidade, caso não seja informado, irá utilizar o do planoNovo.unidade.texto_complementar_plano
   * @returns                Documento gerado ou modificado (observar o _status)
   */
  atualizarTcr(planoReferencia, planoNovo, textUsuario, textUnidade) {
    if (planoNovo.usuario && planoNovo.unidade) {
      let dsReferencia = this.dao.datasource(planoReferencia);
      let dsNovo = this.dao.datasource(planoNovo);
      let programa = planoNovo.programa;
      /* Atualiza os campos de texto complementar do usuário e da unidade */
      dsNovo.usuario.texto_complementar_plano = textUsuario || planoNovo.usuario?.texto_complementar_plano || "";
      dsNovo.unidade.texto_complementar_plano = textUnidade || planoNovo.unidade?.texto_complementar_plano || "";
      /* Se tiver modificações e o termo for obrigatório ou já exista um documento */
      if ((programa?.termo_obrigatorio || planoNovo.documento_id?.length) && JSON.stringify(dsNovo) != JSON.stringify(dsReferencia) && programa?.template_tcr) {
        let documento = planoNovo.documentos?.find(x => x.id == planoNovo.documento_id);
        if (!planoNovo.documento_id?.length || !documento || documento.assinaturas?.length || documento.tipo == "LINK") {
          documento = new src_app_models_documento_model__WEBPACK_IMPORTED_MODULE_1__.Documento({
            id: this.dao?.generateUuid(),
            tipo: "HTML",
            especie: "TCR",
            titulo: "Termo de Ciência e Responsabilidade",
            conteudo: this.templateService.renderTemplate(programa?.template_tcr?.conteudo || "", dsNovo),
            status: "GERADO",
            _status: "ADD",
            template: programa?.template_tcr?.conteudo,
            dataset: this.dao.dataset(),
            datasource: dsNovo,
            entidade_id: this.auth.entidade?.id,
            plano_trabalho_id: planoNovo.id,
            template_id: programa?.template_tcr_id
          });
          planoNovo.documentos.push(documento);
        } else {
          documento.conteudo = this.templateService.renderTemplate(programa?.template_tcr?.conteudo || "", dsNovo);
          documento.dataset = this.dao.dataset();
          documento.datasource = dsNovo;
          documento._status = documento._status == "ADD" ? "ADD" : "EDIT";
        }
        planoNovo.documento = documento;
        planoNovo.documento_id = documento?.id || null;
      }
    }
    return planoNovo.documento;
  }
  /**
   * Informa a situação do plano de trabalho recebido como parâmetro, ou seja, se foi EXCLUIDO ou ARQUIVADO, ou, caso contrário, o seu status atual.
   * @param planoTrabalho
   * @returns
   */
  situacaoPlano(planoTrabalho) {
    if (planoTrabalho.deleted_at) return "EXCLUIDO";else if (planoTrabalho.data_arquivamento) return "ARQUIVADO";else return planoTrabalho.status;
  }
  /**
   * Informa se o plano de trabalho recebido como parâmetro é válido, ou seja, não foi deletado, não foi cancelado nem foi arquivado.
   * @param planoTrabalho
   * @returns
   */
  isValido(planoTrabalho) {
    return !planoTrabalho.deleted_at && planoTrabalho.status != 'CANCELADO' && !planoTrabalho.data_arquivamento;
  }
  /**
   * Calcula a quantidade de dias para concluir a consolidação considerando a tolerância configurada no programa.
   * @param consolidacao  Consolidacao do plano de trabalho
   * @param programa      Programa
   * @returns             Quantidade de dias para conclusão (Retorna números negativos caso tenha passado o prazo)
   */
  diasParaConcluirConsolidacao(consolidacao, programa) {
    return !consolidacao || !programa ? -1 : this.util.daystamp(consolidacao.data_fim) + programa.dias_tolerancia_avaliacao - this.util.daystamp(this.auth.hora);
  }
  /**
   * Faz avaliação da consolidação
   * @param consolidacao
   * @param programa
   * @param refresh
   */
  avaliar(consolidacao, programa, refresh) {
    this.go.navigate({
      route: ['gestao', 'plano-trabalho', 'consolidacao', consolidacao.id, 'avaliar']
    }, {
      modal: true,
      metadata: {
        consolidacao: consolidacao,
        programa: programa
      },
      modalClose: modalResult => {
        if (modalResult) {
          consolidacao.status = "AVALIADO";
          consolidacao.avaliacao_id = modalResult.id;
          consolidacao.avaliacao = modalResult;
          refresh(consolidacao);
        }
      }
    });
  }
  /**
   * Fas recurso contra avaliação
   * @param consolidacao
   * @param programa
   * @param refresh
   */
  fazerRecurso(consolidacao, programa, refresh) {
    this.go.navigate({
      route: ['gestao', 'plano-trabalho', 'consolidacao', consolidacao.id, 'recurso']
    }, {
      modal: true,
      metadata: {
        recurso: true,
        consolidacao: consolidacao,
        programa: programa
      },
      modalClose: modalResult => {
        if (modalResult) {
          consolidacao.avaliacao = modalResult;
          refresh(consolidacao);
        }
      }
    });
  }
  cancelarAvaliacao(consolidacao, page, refresh) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      page.submitting = true;
      try {
        let response = yield _this.avaliacaoDao.cancelarAvaliacao(consolidacao.avaliacao.id);
        if (response) {
          consolidacao.status = "CONCLUIDO";
          consolidacao.avaliacao_id = null;
          consolidacao.avaliacao = undefined;
          refresh(consolidacao);
        }
      } catch (error) {
        page.error(error.message || error);
      } finally {
        page.submitting = false;
      }
    })();
  }
  assinaturasFaltantes(exigidas, assinaram) {
    return {
      "participante": exigidas.participante.filter(x => !assinaram.participante.includes(x)),
      "gestores_unidade_executora": !exigidas.gestores_unidade_executora.length ? [] : exigidas.gestores_unidade_executora.filter(x => assinaram.gestores_unidade_executora.includes(x)).length ? [] : exigidas.gestores_unidade_executora,
      "gestores_unidade_lotacao": !exigidas.gestores_unidade_lotacao.length ? [] : exigidas.gestores_unidade_lotacao.filter(x => assinaram.gestores_unidade_lotacao.includes(x)).length ? [] : exigidas.gestores_unidade_lotacao,
      "gestores_entidade": !exigidas.gestores_entidade.length ? [] : exigidas.gestores_entidade.filter(x => assinaram.gestores_entidade.includes(x)).length ? [] : exigidas.gestores_entidade
    };
  }
  static #_ = this.ɵfac = function PlanoTrabalhoService_Factory(t) {
    return new (t || PlanoTrabalhoService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_services_util_service__WEBPACK_IMPORTED_MODULE_3__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_services_navigate_service__WEBPACK_IMPORTED_MODULE_4__.NavigateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_5__.LookupService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_dao_avaliacao_dao_service__WEBPACK_IMPORTED_MODULE_7__.AvaliacaoDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_uteis_templates_template_service__WEBPACK_IMPORTED_MODULE_8__.TemplateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_dao_plano_trabalho_dao_service__WEBPACK_IMPORTED_MODULE_6__.PlanoTrabalhoDaoService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
    token: PlanoTrabalhoService,
    factory: PlanoTrabalhoService.ɵfac,
    providedIn: 'root'
  });
}

/***/ })

}]);
//# sourceMappingURL=684.js.map