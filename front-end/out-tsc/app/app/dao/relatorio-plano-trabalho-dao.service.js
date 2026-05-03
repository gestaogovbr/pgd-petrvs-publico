import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let RelatorioPlanoTrabalhoDaoService = class RelatorioPlanoTrabalhoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Relatorio/planos-trabalho", injector);
        this.injector = injector;
    }
    exportarCsv(resumido, queryOptions) {
        if (resumido) {
            return this.server.postDownload('api/Relatorio/planos-trabalho/csv', queryOptions);
        }
        else {
            return this.server.postDownload('api/Relatorio/planos-trabalho-detalhado/csv', queryOptions);
        }
    }
    exportarXls(resumido, queryOptions) {
        if (resumido) {
            return this.server.getBlobWithReponse('api/Relatorio/planos-trabalho/xls', queryOptions);
        }
        else {
            return this.server.getBlobWithReponse('api/Relatorio/planos-trabalho-detalhado/xls', queryOptions);
        }
    }
};
RelatorioPlanoTrabalhoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioPlanoTrabalhoDaoService);
export { RelatorioPlanoTrabalhoDaoService };
//# sourceMappingURL=relatorio-plano-trabalho-dao.service.js.map