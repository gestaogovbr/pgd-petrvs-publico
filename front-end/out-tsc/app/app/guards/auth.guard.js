import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GlobalsService } from '../services/globals.service';
let AuthGuard = class AuthGuard {
    get gb() { this._gb = this._gb || this.injector.get(GlobalsService); return this._gb; }
    get auth() { this._auth = this._auth || this.injector.get(AuthService); return this._auth; }
    get dialogs() { this._dialogs = this._dialogs || this.injector.get(DialogService); return this._dialogs; }
    get router() { this._router = this._router || this.injector.get(Router); return this._router; }
    constructor(injector) {
        this.injector = injector;
    }
    canActivate(route, state) {
        const logged = !!this.auth.usuario;
        let result = logged;
        if (route.data.login) {
            result = logged ? this.router.parseUrl(this.gb.initialRoute.join("/")) : true;
        }
        else {
            if (!logged && this.gb.requireLogged) {
                result = new Promise((resolve, reject) => {
                    const handle = (success) => {
                        if (success) {
                            resolve(true);
                        }
                        else {
                            if (!this.gb.isToolbar) {
                                let redirectUrl = this.router.parseUrl('/login');
                                const qParams = Object.entries(route.queryParams || {}).reduce((acumulador, valorAtual) => {
                                    if (valorAtual[0] != "idroute")
                                        acumulador[valorAtual[0]] = valorAtual[1];
                                    return acumulador;
                                }, {});
                                let redirectTo = {
                                    route: route.url.map(x => x.path),
                                    params: qParams
                                };
                                redirectUrl.queryParams = { redirectTo: JSON.stringify(redirectTo), noSession: true };
                                resolve(redirectUrl);
                            }
                            else {
                                /* Caso seja toolbar, ficará o botão de login disponível caso globals.requireLogged */
                                resolve(!this.gb.requireLogged);
                            }
                        }
                    };
                    if (route.queryParams?.context)
                        this.gb.setContexto(route.queryParams?.context, false);
                    this.auth.authSession().then(handle).catch(error => handle(false));
                });
            }
            else if (route.data.permission && !this.auth.hasPermissionTo(route.data.permission)) {
                this.dialogs.alert("Permissão negada", "O usuário não tem permissão para acessar esse recurso");
                result = false;
            }
        }
        return result;
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map