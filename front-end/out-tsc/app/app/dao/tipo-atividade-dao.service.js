import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoAtividadeDaoService = class TipoAtividadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoAtividade", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoAtividadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoAtividadeDaoService);
export { TipoAtividadeDaoService };
//# sourceMappingURL=tipo-atividade-dao.service.js.map