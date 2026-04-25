import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let UsersPanelDaoService = class UsersPanelDaoService extends DaoBaseService {
    constructor(injector) {
        super("UserPanel", injector);
        this.injector = injector;
    }
    getAllAdmins() {
        return new Promise((resolve, reject) => {
            this.server.get('api/' + this.collection + '/getAllAdmins').subscribe(response => {
                resolve(response?.data || []);
            }, error => reject(error));
        });
    }
};
UsersPanelDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsersPanelDaoService);
export { UsersPanelDaoService };
//# sourceMappingURL=users-panel-dao.service.js.map