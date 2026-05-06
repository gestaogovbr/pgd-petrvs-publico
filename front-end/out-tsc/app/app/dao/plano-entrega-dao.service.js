import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaDaoService = class PlanoEntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntrega", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["numero", "nome"];
    }
    arquivar(planoEntrega) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/arquivar', { id: planoEntrega.id, arquivar: planoEntrega.arquivar }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    avaliar(planoEntrega) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/avaliar', { id: planoEntrega.id, arquivar: planoEntrega.arquivar }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarAvaliacao(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-avaliacao', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarConclusao(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-conclusao', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarHomologacao(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-homologacao', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarPlano(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-plano', { id: planoEntrega.id, justificativa: justificativa, arquivar: planoEntrega.arquivar }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    concluir(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/concluir', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    homologar(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/homologar', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    liberarHomologacao(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/liberar-homologacao', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    reativar(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/reativar', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    retirarHomologacao(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/retirar-homologacao', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    suspender(planoEntrega, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/suspender', { id: planoEntrega.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    planosImpactadosPorAlteracaoEntrega(planoEntregaEntrega) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/planos-impactados-por-alteracao-entrega', { entrega: planoEntregaEntrega }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response?.planos_trabalhos || []);
                }
            }, error => reject(error));
        });
    }
    permissaoIncluir(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/permissao-incluir', {
                unidade_id: unidade_id
            }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
};
PlanoEntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaDaoService);
export { PlanoEntregaDaoService };
//# sourceMappingURL=plano-entrega-dao.service.js.map