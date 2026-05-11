import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ServerService } from '../services/server.service';
let QueueDaoService = class QueueDaoService {
    constructor(injector, http) {
        this.injector = injector;
        this.http = http;
    }
    get server() {
        this._server =
            this._server || this.injector.get(ServerService);
        return this._server;
    }
    resetQueues() {
        return new Promise((resolve, reject) => {
            this.server.get('config/resetqueues').subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
};
QueueDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], QueueDaoService);
export { QueueDaoService };
//# sourceMappingURL=queue-dao.service.js.map