import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let RelatorioPlanoEntregaDaoService = class RelatorioPlanoEntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("Relatorio/planos-entrega", injector);
        this.injector = injector;
    }
    exportarXls(queryOptions) {
        return this.server.getBlobWithReponse('api/Relatorio/planos-entrega/xls', queryOptions);
    }
};
RelatorioPlanoEntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioPlanoEntregaDaoService);
export { RelatorioPlanoEntregaDaoService };
//# sourceMappingURL=relatorio-plano-entrega-dao.service.js.map