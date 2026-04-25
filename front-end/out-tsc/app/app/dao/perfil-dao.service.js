import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PerfilDaoService = class PerfilDaoService extends DaoBaseService {
    constructor(injector) {
        super("Perfil", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
PerfilDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PerfilDaoService);
export { PerfilDaoService };
//# sourceMappingURL=perfil-dao.service.js.map