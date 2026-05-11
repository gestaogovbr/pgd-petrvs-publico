import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let SolucaoDaoService = class SolucaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Solucao", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    ativarTodas(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/ativar-todos', { unidade_id }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    desativarTodas(unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/desativar-todos', { unidade_id }).subscribe(response => {
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
SolucaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SolucaoDaoService);
export { SolucaoDaoService };
//# sourceMappingURL=solucao-dao.service.js.map