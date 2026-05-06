import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let EntregaDaoService = class EntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("Entrega", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
EntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EntregaDaoService);
export { EntregaDaoService };
//# sourceMappingURL=entrega-dao.service.js.map