import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let CapacidadeTecnicaDaoService = class CapacidadeTecnicaDaoService extends DaoBaseService {
    constructor(injector) {
        super("CapacidadeTecnica", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
CapacidadeTecnicaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CapacidadeTecnicaDaoService);
export { CapacidadeTecnicaDaoService };
//# sourceMappingURL=capacidade-tecnica-dao.service.js.map