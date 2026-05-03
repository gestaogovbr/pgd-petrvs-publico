import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let AtividadeTarefaDaoService = class AtividadeTarefaDaoService extends DaoBaseService {
    constructor(injector) {
        super("AtividadeTarefa", injector);
        this.injector = injector;
    }
};
AtividadeTarefaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AtividadeTarefaDaoService);
export { AtividadeTarefaDaoService };
//# sourceMappingURL=atividade-tarefa-dao.service.js.map