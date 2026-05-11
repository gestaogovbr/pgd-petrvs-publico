import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let PanelAdminGuard = class PanelAdminGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    canActivate(route, state) {
        return this.auth.detailUser().then((user) => {
            if (user && user.nivel == 1) {
                return true;
            }
            else {
                this.router.navigate(['/panel']);
                return false;
            }
        });
    }
};
PanelAdminGuard = __decorate([
    Injectable({
        providedIn: 'root',
    })
], PanelAdminGuard);
export { PanelAdminGuard };
//# sourceMappingURL=panel_admin.guard.js.map