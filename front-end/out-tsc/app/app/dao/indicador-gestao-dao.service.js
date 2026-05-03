import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let IndicadorGestaoDaoService = class IndicadorGestaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Indicadores/gestao", injector);
        this.injector = injector;
    }
};
IndicadorGestaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IndicadorGestaoDaoService);
export { IndicadorGestaoDaoService };
//# sourceMappingURL=indicador-gestao-dao.service.js.map