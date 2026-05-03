import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaEntregaProcessoDaoService = class PlanoEntregaEntregaProcessoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntregaEntregaProcesso", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["processo.nome"];
    }
};
PlanoEntregaEntregaProcessoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaEntregaProcessoDaoService);
export { PlanoEntregaEntregaProcessoDaoService };
//# sourceMappingURL=plano-entrega-entrega-processo-dao.service.js.map