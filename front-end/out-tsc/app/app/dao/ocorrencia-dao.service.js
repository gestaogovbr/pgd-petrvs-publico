import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let OcorrenciaDaoService = class OcorrenciaDaoService extends DaoBaseService {
    constructor(injector) {
        super("Ocorrencia", injector);
        this.injector = injector;
    }
    dataset(deeps) {
        return this.deepsFilter([], deeps);
    }
};
OcorrenciaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OcorrenciaDaoService);
export { OcorrenciaDaoService };
//# sourceMappingURL=ocorrencia-dao.service.js.map