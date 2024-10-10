import {Injectable, Injector} from "@angular/core";
import {ServerService} from "./server.service";

@Injectable({
	providedIn: "root",
})
export class AuthPanelService {
	private _server?: ServerService;
	public get server(): ServerService {
		this._server =
			this._server || this.injector.get<ServerService>(ServerService);
		return <ServerService>this._server;
	}

	constructor(public injector: Injector) {}

	isAuthenticated(): Promise<boolean> {
		return this.server
			.get("api/panel-login-check")
			.toPromise()
			.then((response) => {
				if (response && response.authenticated !== undefined) {
					return response.authenticated;
				} else {
					throw new Error("Resposta inválida do servidor");
				}
			})
			.catch((error) => {
				console.error("Erro ao verificar autenticação:", error);
				return false;
			});
	}

	public loginPanel(email: string, password: string) {
		return this.server
			.post("api/panel-login", {email: email, password: password})
			.toPromise()
			.then((response) => {
				return response;
			});
	}

	public logout() {
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

	public detailUser() {
		return this.server
			.get("api/panel-login-detail")
			.toPromise()
			.then((response) => {
				if (response) {
					return response;
				} else {
					throw new Error("Resposta inválida do servidor");
				}
			})
			.catch((error) => {
				console.error("Erro ao verificar autenticação:", error);
				return false;
			});
	}

	public updatePassword(newPassword: string): Promise<any> {
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
}
