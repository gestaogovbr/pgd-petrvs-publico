import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ChefiaGuard = class ChefiaGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(route, state) {
        return this.auth.isUsuarioDeveloper() || this.auth.isGestorAlgumaAreaTrabalho(false);
    }
};
ChefiaGuard = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ChefiaGuard);
export { ChefiaGuard };
//# sourceMappingURL=chefia.guard.js.map