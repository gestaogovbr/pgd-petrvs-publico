import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ComparecimentoDaoService = class ComparecimentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Comparecimento", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["data_comparecimento"];
    }
};
ComparecimentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ComparecimentoDaoService);
export { ComparecimentoDaoService };
//# sourceMappingURL=comparecimento-dao.service.js.map