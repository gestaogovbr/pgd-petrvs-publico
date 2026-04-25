import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaEntregaProgressoDaoService = class PlanoEntregaEntregaProgressoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntregaEntregaProgresso", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["data_progresso"];
    }
};
PlanoEntregaEntregaProgressoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaEntregaProgressoDaoService);
export { PlanoEntregaEntregaProgressoDaoService };
//# sourceMappingURL=plano-entrega-entrega-progresso-dao.service.js.map