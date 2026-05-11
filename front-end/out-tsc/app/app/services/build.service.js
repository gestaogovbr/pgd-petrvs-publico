import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let BuildInfoService = class BuildInfoService {
    constructor(http) {
        this.http = http;
    }
    getBuildInfo() {
        return this.http.get('/assets/build-info.json');
    }
};
BuildInfoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BuildInfoService);
export { BuildInfoService };
//# sourceMappingURL=build.service.js.map