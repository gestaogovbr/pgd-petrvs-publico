import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let IndicadorEquipeDaoService = class IndicadorEquipeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Indicadores/equipe", injector);
        this.injector = injector;
    }
    queryHoras(queryOptions) {
        return this.server.post(this.PREFIX_URL + '/' + this.collection + '/horas', queryOptions);
    }
};
IndicadorEquipeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IndicadorEquipeDaoService);
export { IndicadorEquipeDaoService };
//# sourceMappingURL=indicador-equipe-dao.service.js.map