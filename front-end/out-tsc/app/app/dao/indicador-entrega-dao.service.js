import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let IndicadorEntregaDaoService = class IndicadorEntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("Indicadores/entrega", injector);
        this.injector = injector;
    }
};
IndicadorEntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IndicadorEntregaDaoService);
export { IndicadorEntregaDaoService };
//# sourceMappingURL=indicador-entrega-dao.service.js.map