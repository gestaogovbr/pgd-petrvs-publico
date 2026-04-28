import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaEntregaObjetivoDaoService = class PlanoEntregaEntregaObjetivoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntregaEntregaObjetivo", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["objetivo.nome"];
    }
};
PlanoEntregaEntregaObjetivoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaEntregaObjetivoDaoService);
export { PlanoEntregaEntregaObjetivoDaoService };
//# sourceMappingURL=plano-entrega-entrega-objetivo-dao.service.js.map