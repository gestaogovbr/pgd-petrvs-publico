import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoAvaliacaoNotaDaoService = class TipoAvaliacaoNotaDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoAvaliacaoNota", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoAvaliacaoNotaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoAvaliacaoNotaDaoService);
export { TipoAvaliacaoNotaDaoService };
//# sourceMappingURL=tipo-avaliacao-nota-dao.service.js.map