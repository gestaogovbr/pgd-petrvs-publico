import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let RelatorioUnidadeDaoService = class RelatorioUnidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("RelatorioUnidade", injector);
        this.injector = injector;
    }
    exportarXls(queryOptions) {
        return this.server.getBlobWithReponse('api/RelatorioUnidade/xls', queryOptions);
    }
};
RelatorioUnidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioUnidadeDaoService);
export { RelatorioUnidadeDaoService };
//# sourceMappingURL=relatorio-unidade-dao.service.js.map