import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let EnvioDaoService = class EnvioDaoService extends DaoBaseService {
    constructor(injector) {
        super("Envio", injector);
        this.injector = injector;
    }
    reiniciar() {
        return this.server.post('api/Envio/reiniciar');
    }
    forcar(entidade_id) {
        return this.server.post('api/Envio/forcar', { id: entidade_id });
    }
};
EnvioDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EnvioDaoService);
export { EnvioDaoService };
//# sourceMappingURL=envio-dao.service.js.map