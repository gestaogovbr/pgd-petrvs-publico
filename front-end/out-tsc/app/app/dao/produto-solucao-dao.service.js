import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let ProdutoSolucaoDaoService = class ProdutoSolucaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("ProdutoSolucao", injector);
        this.injector = injector;
    }
};
ProdutoSolucaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoSolucaoDaoService);
export { ProdutoSolucaoDaoService };
//# sourceMappingURL=produto-solucao-dao.service.js.map