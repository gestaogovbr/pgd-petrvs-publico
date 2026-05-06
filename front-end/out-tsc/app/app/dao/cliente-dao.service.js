import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ClienteDaoService = class ClienteDaoService extends DaoBaseService {
    constructor(injector) {
        super("Cliente", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
ClienteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClienteDaoService);
export { ClienteDaoService };
//# sourceMappingURL=cliente-dao.service.js.map