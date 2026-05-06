import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoCapacidadeDaoService = class TipoCapacidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoCapacidade", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["descricao"];
    }
};
TipoCapacidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoCapacidadeDaoService);
export { TipoCapacidadeDaoService };
//# sourceMappingURL=tipo-capacidade-dao.service.js.map