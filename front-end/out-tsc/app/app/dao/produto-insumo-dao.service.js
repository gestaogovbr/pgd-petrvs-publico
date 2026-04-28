import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let ProdutoInsumoDaoService = class ProdutoInsumoDaoService extends DaoBaseService {
    constructor(injector) {
        super("ProdutoInsumo", injector);
        this.injector = injector;
    }
};
ProdutoInsumoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoInsumoDaoService);
export { ProdutoInsumoDaoService };
//# sourceMappingURL=produto-insumo-dao.service.js.map