import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let UnidadeIntegranteDaoService = class UnidadeIntegranteDaoService extends DaoBaseService {
    constructor(injector) {
        super("UnidadeIntegrante", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = [];
    }
    /**
     *
     * @param unidade_id
     * @param usuario_id
     * @returns
     */
    carregarIntegrantes(unidade_id, usuario_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/carregar-integrantes', { unidade_id, usuario_id }).subscribe(response => {
                resolve({
                    integrantes: response?.rows || [],
                    //unidade: response?.unidade,
                    //usuario: response?.usuario
                });
            }, error => reject(error));
        });
    }
    /**
     *
     * @param integrantesConsolidados
     * @returns
     */
    salvarIntegrantes(integrantesConsolidados, metadata) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/salvar-integrantes', { integrantesConsolidados, metadata }).subscribe(response => {
                if (response?.error)
                    reject(response.error);
                else
                    resolve(response?.data || null);
            }, error => reject(error));
        });
    }
};
UnidadeIntegranteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UnidadeIntegranteDaoService);
export { UnidadeIntegranteDaoService };
//# sourceMappingURL=unidade-integrante-dao.service.js.map