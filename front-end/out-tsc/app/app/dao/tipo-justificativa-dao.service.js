import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoJustificativaDaoService = class TipoJustificativaDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoJustificativa", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoJustificativaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoJustificativaDaoService);
export { TipoJustificativaDaoService };
//# sourceMappingURL=tipo-justificativa-dao.service.js.map