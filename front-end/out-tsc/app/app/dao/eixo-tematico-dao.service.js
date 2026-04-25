import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let EixoTematicoDaoService = class EixoTematicoDaoService extends DaoBaseService {
    constructor(injector) {
        super("EixoTematico", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
EixoTematicoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EixoTematicoDaoService);
export { EixoTematicoDaoService };
//# sourceMappingURL=eixo-tematico-dao.service.js.map