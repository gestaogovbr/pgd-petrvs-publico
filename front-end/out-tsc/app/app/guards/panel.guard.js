import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PanelGuard = class PanelGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    canActivate(route, state) {
        return this.auth.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            }
            else {
                this.router.navigate(['/panel-login']); // Redireciona para a página de login se o usuário não estiver autenticado
                return false;
            }
        });
    }
};
PanelGuard = __decorate([
    Injectable({
        providedIn: 'root',
    })
], PanelGuard);
export { PanelGuard };
//# sourceMappingURL=panel.guard.js.map