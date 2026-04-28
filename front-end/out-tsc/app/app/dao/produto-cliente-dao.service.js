import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let ProdutoClienteDaoService = class ProdutoClienteDaoService extends DaoBaseService {
    constructor(injector) {
        super("ProdutoCliente", injector);
        this.injector = injector;
    }
};
ProdutoClienteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoClienteDaoService);
export { ProdutoClienteDaoService };
//# sourceMappingURL=produto-cliente-dao.service.js.map