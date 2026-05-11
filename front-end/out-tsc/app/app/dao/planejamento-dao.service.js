import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanejamentoDaoService = class PlanejamentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Planejamento", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
PlanejamentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanejamentoDaoService);
export { PlanejamentoDaoService };
//# sourceMappingURL=planejamento-dao.service.js.map