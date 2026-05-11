import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let SolucaoUnidadeDaoService = class SolucaoUnidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("SolucaoUnidade", injector);
        this.injector = injector;
    }
};
SolucaoUnidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SolucaoUnidadeDaoService);
export { SolucaoUnidadeDaoService };
//# sourceMappingURL=solucao-unidade-dao.service.js.map