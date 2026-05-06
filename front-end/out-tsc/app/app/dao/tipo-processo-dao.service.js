import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoProcessoDaoService = class TipoProcessoDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoProcesso", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    atualizar(lista) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/atualizar', {
                lista: lista
            }).subscribe(response => {
                resolve(response?.success);
            }, error => reject(error));
        });
    }
};
TipoProcessoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoProcessoDaoService);
export { TipoProcessoDaoService };
//# sourceMappingURL=tipo-processo-dao.service.js.map