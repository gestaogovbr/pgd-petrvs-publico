import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let FuncaoDaoService = class FuncaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Funcao", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
FuncaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FuncaoDaoService);
export { FuncaoDaoService };
//# sourceMappingURL=funcao-dao.service.js.map