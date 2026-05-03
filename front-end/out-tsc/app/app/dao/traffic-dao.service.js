import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TrafficDaoService = class TrafficDaoService extends DaoBaseService {
    constructor(injector) {
        super("Traffic", injector);
        this.injector = injector;
    }
};
TrafficDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TrafficDaoService);
export { TrafficDaoService };
//# sourceMappingURL=traffic-dao.service.js.map