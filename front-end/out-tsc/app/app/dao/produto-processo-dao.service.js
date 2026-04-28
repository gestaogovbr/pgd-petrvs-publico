import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let ProdutoProcessoDaoService = class ProdutoProcessoDaoService extends DaoBaseService {
    constructor(injector) {
        super("ProdutoProcesso", injector);
        this.injector = injector;
    }
};
ProdutoProcessoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoProcessoDaoService);
export { ProdutoProcessoDaoService };
//# sourceMappingURL=produto-processo-dao.service.js.map