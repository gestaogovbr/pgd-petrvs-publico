import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TenantLogsDaoService = class TenantLogsDaoService extends DaoBaseService {
    constructor(injector) {
        super("Logs", injector);
        this.injector = injector;
        this.PREFIX_URL = "config";
    }
    getAllLogs(tenant_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/Logs/list', {
                tenant_id: tenant_id ? tenant_id : '',
            }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    console.log(response.data);
                    resolve(response.data);
                }
            }, error => reject(error));
        });
    }
};
TenantLogsDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TenantLogsDaoService);
export { TenantLogsDaoService };
//# sourceMappingURL=tenant-logs-dao.service.js.map