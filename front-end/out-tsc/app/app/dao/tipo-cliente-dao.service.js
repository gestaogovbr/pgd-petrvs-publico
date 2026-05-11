import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoClienteDaoService = class TipoClienteDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoCliente", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoClienteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoClienteDaoService);
export { TipoClienteDaoService };
//# sourceMappingURL=tipo-cliente-dao.service.js.map