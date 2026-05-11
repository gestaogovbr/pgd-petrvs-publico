import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { GlobalsService } from '../services/globals.service';
import { NavigateService } from '../services/navigate.service';
let ConfigResolver = class ConfigResolver {
    get gb() { this._gb = this._gb || this.injector.get(GlobalsService); return this._gb; }
    ;
    get go() { this._go = this._go || this.injector.get(NavigateService); return this._go; }
    ;
    get dialog() { this._dialog = this._dialog || this.injector.get(DialogService); return this._dialog; }
    ;
    constructor(injector) {
        this.injector = injector;
    }
    resolve(route, state) {
        let result = of(true);
        let modal = false;
        if (route.queryParams?.idroute?.length) {
            if (!this.go.first && ((route.data.modal && this.gb.useModals) || route.queryParams?.modal)) {
                this.dialog.modal(route);
                modal = true;
                result = EMPTY;
            }
            this.go.config(route.queryParams?.idroute, {
                title: route.data.title,
                modal: modal,
                path: route.pathFromRoot.map(o => o.routeConfig?.path || "").join('/')
            });
        }
        return result;
    }
};
ConfigResolver = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ConfigResolver);
export { ConfigResolver };
//# sourceMappingURL=config.resolver.js.map