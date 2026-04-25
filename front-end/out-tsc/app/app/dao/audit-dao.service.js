import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let AuditDaoService = class AuditDaoService extends DaoBaseService {
    constructor(injector, http) {
        super("Audit", injector);
        this.injector = injector;
        this.http = http;
    }
    getAll(tenantId, search) {
        const url = `api/${this.collection}/getAll?search=` + search + '&tenant_id=' + tenantId;
        return new Promise((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(this.loadAuditDados(response));
            }, error => {
                console.log("Erro ao obter os dados!", error);
                reject(error);
            });
        });
    }
    loadAuditDados(response) {
        let dados = response;
        return dados;
    }
};
AuditDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuditDaoService);
export { AuditDaoService };
//# sourceMappingURL=audit-dao.service.js.map