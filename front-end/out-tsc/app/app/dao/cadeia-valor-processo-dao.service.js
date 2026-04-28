import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let CadeiaValorProcessoDaoService = class CadeiaValorProcessoDaoService extends DaoBaseService {
    constructor(injector) {
        super("CadeiaValorProcesso", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    async ordenar(processos) {
        const result = await this.server.post('api/' + this.collection + '/ordenar', { processos }).toPromise();
        return result?.data || [];
    }
};
CadeiaValorProcessoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CadeiaValorProcessoDaoService);
export { CadeiaValorProcessoDaoService };
//# sourceMappingURL=cadeia-valor-processo-dao.service.js.map