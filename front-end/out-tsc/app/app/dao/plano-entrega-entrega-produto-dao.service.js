import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanoEntregaEntregaProdutoDaoService = class PlanoEntregaEntregaProdutoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoEntregaEntregaProduto", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["produto.nome"];
    }
};
PlanoEntregaEntregaProdutoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaEntregaProdutoDaoService);
export { PlanoEntregaEntregaProdutoDaoService };
//# sourceMappingURL=plano-entrega-entrega-produto-dao.service.js.map