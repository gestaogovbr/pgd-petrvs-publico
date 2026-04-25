import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { RelatorioPlanoTrabalhoDaoService } from './relatorio-plano-trabalho-dao.service';
let RelatorioPlanoTrabalhoDetalhadoDaoService = class RelatorioPlanoTrabalhoDetalhadoDaoService extends RelatorioPlanoTrabalhoDaoService {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.collection = "Relatorio/planos-trabalho-detalhado";
    }
};
RelatorioPlanoTrabalhoDetalhadoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioPlanoTrabalhoDetalhadoDaoService);
export { RelatorioPlanoTrabalhoDetalhadoDaoService };
//# sourceMappingURL=relatorio-plano-trabalho-detalhado-dao.service.js.map