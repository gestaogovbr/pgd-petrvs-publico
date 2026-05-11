import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoAvaliacaoDaoService = class TipoAvaliacaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoAvaliacao", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoAvaliacaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoAvaliacaoDaoService);
export { TipoAvaliacaoDaoService };
//# sourceMappingURL=tipo-avaliacao-dao.service.js.map