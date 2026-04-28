import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ReacaoDaoService = class ReacaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Reacao", injector);
        this.injector = injector;
    }
};
ReacaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ReacaoDaoService);
export { ReacaoDaoService };
//# sourceMappingURL=reacao-dao.service.js.map