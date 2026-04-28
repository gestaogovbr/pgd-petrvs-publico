import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TemplateDaoService = class TemplateDaoService extends DaoBaseService {
    constructor(injector) {
        super("Template", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["titulo"];
    }
    getDataset(especie, codigo) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/carrega-dataset', {
                codigo: codigo,
                especie: especie
            }).subscribe(response => {
                resolve(response?.dataset);
            }, error => reject(error));
        });
    }
    getReport(entidadeId, codigo, options) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/gera-relatorio', {
                entidade: entidadeId,
                codigo: codigo,
                params: options || []
            }).subscribe(response => {
                resolve(response?.report);
            }, error => reject(error));
        });
    }
};
TemplateDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TemplateDaoService);
export { TemplateDaoService };
//# sourceMappingURL=template-dao.service.js.map