import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let SiapeBlacklistServidorDaoService = class SiapeBlacklistServidorDaoService extends DaoBaseService {
    constructor(injector) {
        super("SiapeBlacklistServidor", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["cpf"];
    }
    removerCpf(cpf) {
        return new Promise((resolve, reject) => {
            this.server.post('api/siape-blacklist/remover-cpf', { cpf }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    queryByCpf(cpf) {
        return this.server.post('api/SiapeBlacklistServidor/query', {
            page: 1,
            limit: 50,
            where: [["cpf", "==", cpf]]
        });
    }
};
SiapeBlacklistServidorDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SiapeBlacklistServidorDaoService);
export { SiapeBlacklistServidorDaoService };
//# sourceMappingURL=siape-blacklist-servidor-dao.service.js.map