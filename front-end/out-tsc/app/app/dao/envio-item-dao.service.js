import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let EnvioItemDaoService = class EnvioItemDaoService extends DaoBaseService {
    constructor(injector) {
        super("EnvioItem", injector);
        this.injector = injector;
    }
};
EnvioItemDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EnvioItemDaoService);
export { EnvioItemDaoService };
//# sourceMappingURL=envio-item-dao.service.js.map