import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let CapacidadeDaoService = class CapacidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Capacidade", injector);
        this.injector = injector;
    }
};
CapacidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CapacidadeDaoService);
export { CapacidadeDaoService };
//# sourceMappingURL=capacidade-dao.service.js.map