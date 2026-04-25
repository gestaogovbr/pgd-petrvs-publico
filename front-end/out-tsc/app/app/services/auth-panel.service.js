import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { ServerService } from "./server.service";
let AuthPanelService = class AuthPanelService {
    get server() {
        this._server =
            this._server || this.injector.get(ServerService);
        return this._server;
    }
    constructor(injector) {
        this.injector = injector;
    }
    isAuthenticated() {
        return this.server
            .get("api/panel-login-check")
            .toPromise()
            .then((response) => {
            if (response && response.authenticated !== undefined) {
                return response.authenticated;
            }
            else {
                throw new Error("Resposta inválida do servidor");
            }
        })
            .catch((error) => {
            console.error("Erro ao verificar autenticação:", error);
            return false;
        });
    }
    loginPanel(email, password) {
        return this.server
            .post("api/panel-login", { email: email, password: password })
            .toPromise()
            .then((response) => {
            return response;
        });
    }
    logout() {
        return this.server
            .get("api/panel-logout")
            .toPromise()
            .then((response) => {
            return response;
        })
            .catch((error) => {
            console.error("Erro ao verificar autenticação:", error);
            return false;
        });
    }
    detailUser() {
        return this.server
            .get("api/panel-login-detail")
            .toPromise()
            .then((response) => {
            if (response) {
                return response;
            }
            else {
                throw new Error("Resposta inválida do servidor");
            }
        })
            .catch((error) => {
            console.error("Erro ao verificar autenticação:", error);
            return false;
        });
    }
    updatePassword(newPassword) {
        return this.server.post("api/panel-update-password", { password: newPassword })
            .toPromise() // Utiliza toPromise para converter Observable em Promise
            .then((response) => {
            if (response.error) {
                return Promise.reject(response.error);
            }
            return response;
        })
            .catch((error) => {
            return Promise.reject(error);
        });
    }
};
AuthPanelService = __decorate([
    Injectable({
        providedIn: "root",
    })
], AuthPanelService);
export { AuthPanelService };
//# sourceMappingURL=auth-panel.service.js.map