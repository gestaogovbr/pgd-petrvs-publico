import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let RelatorioAgenteDaoService = class RelatorioAgenteDaoService extends DaoBaseService {
    constructor(injector) {
        super("RelatorioAgente", injector);
        this.injector = injector;
    }
    exportarXls(queryOptions) {
        return this.server.getBlobWithReponse('api/RelatorioAgente/xls', queryOptions);
    }
};
RelatorioAgenteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioAgenteDaoService);
export { RelatorioAgenteDaoService };
//# sourceMappingURL=relatorio-agente-dao.service.js.map