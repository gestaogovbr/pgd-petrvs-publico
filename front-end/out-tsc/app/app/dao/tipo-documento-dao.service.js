import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TipoDocumentoDaoService = class TipoDocumentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("TipoDocumento", injector);
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
TipoDocumentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoDocumentoDaoService);
export { TipoDocumentoDaoService };
//# sourceMappingURL=tipo-documento-dao.service.js.map