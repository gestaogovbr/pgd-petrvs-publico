import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let FeriadoDaoService = class FeriadoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Feriado", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
FeriadoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FeriadoDaoService);
export { FeriadoDaoService };
//# sourceMappingURL=feriado-dao.service.js.map