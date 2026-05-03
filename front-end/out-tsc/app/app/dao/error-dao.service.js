import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ErrorDaoService = class ErrorDaoService extends DaoBaseService {
    constructor(injector) {
        super("Error", injector);
        this.injector = injector;
    }
    showResponsaveis() {
        return new Promise((resolve, reject) => {
            this.server.post('api/Error/showResponsaveis', []).subscribe(response => {
                resolve(response.responsaveis);
            }, error => {
                console.log("Erro ao buscar a lista dos responsáveis pelos registros de erros no Banco de Dados!", error);
                resolve([]);
            });
        });
    }
};
ErrorDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ErrorDaoService);
export { ErrorDaoService };
//# sourceMappingURL=error-dao.service.js.map