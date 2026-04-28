import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoTarefaDaoService = class TipoTarefaDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoTarefa", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
TipoTarefaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoTarefaDaoService);
export { TipoTarefaDaoService };
//# sourceMappingURL=tipo-tarefa-dao.service.js.map