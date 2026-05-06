import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoAvaliacaoJustificativaDaoService = class TipoAvaliacaoJustificativaDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoAvaliacaoJustificativa", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoAvaliacaoJustificativaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoAvaliacaoJustificativaDaoService);
export { TipoAvaliacaoJustificativaDaoService };
//# sourceMappingURL=tipo-avaliacao-justificativa-dao.service.js.map