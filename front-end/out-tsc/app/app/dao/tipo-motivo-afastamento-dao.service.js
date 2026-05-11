import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoMotivoAfastamentoDaoService = class TipoMotivoAfastamentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoMotivoAfastamento", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoMotivoAfastamentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoMotivoAfastamentoDaoService);
export { TipoMotivoAfastamentoDaoService };
//# sourceMappingURL=tipo-motivo-afastamento-dao.service.js.map