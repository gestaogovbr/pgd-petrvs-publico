import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let SiapeBlacklistUnidadeDaoService = class SiapeBlacklistUnidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super('SiapeBlacklistUnidade', injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ['codigo'];
    }
    removerUnidade(codigo) {
        return new Promise((resolve, reject) => {
            this.server.post('api/unidade/remover-blacklist', { codigo }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    queryBlacklist(options = {}) {
        return this.server.post('api/SiapeBlacklistUnidade/query', options);
    }
};
SiapeBlacklistUnidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SiapeBlacklistUnidadeDaoService);
export { SiapeBlacklistUnidadeDaoService };
//# sourceMappingURL=siape-blacklist-unidade-dao.service.js.map