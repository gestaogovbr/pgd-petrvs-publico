import {Component, Injector, OnInit} from "@angular/core";
import {PageBase} from "../../base/page-base";
import {AuthPanelService} from "src/app/services/auth-panel.service";
import { Collapse } from 'bootstrap';
import { QueueDaoService } from "src/app/dao/queue-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";


@Component({
	selector: "panel-layout",
	templateUrl: "./panel-layout.component.html",
	styleUrls: ["./panel-layout.component.scss"],
})
export class PanelLayoutComponent extends PageBase implements OnInit {
	public currentUser: any;

	constructor(
		public injector: Injector,
		private authService: AuthPanelService,
		private dao: QueueDaoService,
		private tenantDao: TenantDaoService,
	) {
		super(injector);
		this.setTitleUser();
	}

	ngOnInit(): void {}

	private setTitleUser() {
		this.authService.detailUser().then((user) => {
			this.currentUser = user;
			this.title =
				"Bem-vindo, " + user.nome + "! Você está em ambiente " + this.gb.ENV;
		});
	}

	public logout() {
		this.authService.logout().then(() => {
			this.router.navigate(["/panel-login"]);
		});
	}

	public changePassword(){
		this.go.navigate({route: ["/panel/change-password"]}, {modal: true });
	}

	toggleNavbar() {
		const navbar = document.getElementById('navbarSupportedContent');
		if (navbar) {
		const bsCollapse = new Collapse(navbar, {
			toggle: true
		});
		bsCollapse.toggle();
		}
	}

	public resetQueues() {
		const self = this;
		this.dialog
			.confirm("Deseja Resetar as Queues?", "Deseja realmente executar o reset?")
			.then((confirm) => {
				if (confirm) {
					self.loading = true;
					this.dao!.resetQueues()
						.then(function () {
							self.loading = false;
							self.dialog.alert("Sucesso", "Executado com sucesso!");
						})
						.catch(function (error) {
							self.loading = false;
							self.dialog.alert(
								"Erro",
								"Erro ao executar: " + error?.message ? error?.message : error
							);
						});
				}
			});
	}

	public executaMigrations(row: any) {
		const self = this;
		this.dialog
			.confirm(
				"Executar Migration?",
				"Deseja realmente executar as migrations?"
			)
			.then((confirm) => {
				if (confirm) {
					this.tenantDao!.migrations(row)
						.then(function () {
							self.dialog.alert("Sucesso", "Migration executada com sucesso!");
						})
						.catch(function (error) {
							self.dialog.alert(
								"Erro",
								"Erro ao executar a migration: " + error?.message
									? error?.message
									: error
							);
						});
				}
			});
	}
}
