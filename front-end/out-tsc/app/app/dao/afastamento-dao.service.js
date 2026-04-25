import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let AfastamentoDaoService = class AfastamentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Afastamento", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["observacoes"];
    }
};
AfastamentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AfastamentoDaoService);
export { AfastamentoDaoService };
//# sourceMappingURL=afastamento-dao.service.js.map