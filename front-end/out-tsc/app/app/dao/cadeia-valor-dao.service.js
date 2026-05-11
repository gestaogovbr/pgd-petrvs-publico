import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let CadeiaValorDaoService = class CadeiaValorDaoService extends DaoBaseService {
    constructor(injector) {
        super("CadeiaValor", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
CadeiaValorDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CadeiaValorDaoService);
export { CadeiaValorDaoService };
//# sourceMappingURL=cadeia-valor-dao.service.js.map