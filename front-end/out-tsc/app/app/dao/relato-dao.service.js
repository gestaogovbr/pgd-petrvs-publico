import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let RelatoDaoService = class RelatoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Relato", injector);
        this.injector = injector;
    }
    enviar(opcao, usuario_id, unidade_id, nome, cpf, matricula, descricao) {
        return this.server.post('api/Relato/store', { opcao, usuario_id, unidade_id, nome, cpf, matricula, descricao });
    }
};
RelatoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatoDaoService);
export { RelatoDaoService };
//# sourceMappingURL=relato-dao.service.js.map