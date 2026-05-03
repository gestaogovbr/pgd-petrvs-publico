import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { PageBase } from "../../base/page-base";
import { Collapse } from 'bootstrap';
let PanelLayoutComponent = class PanelLayoutComponent extends PageBase {
    constructor(injector, authService, dao, tenantDao) {
        super(injector);
        this.injector = injector;
        this.authService = authService;
        this.dao = dao;
        this.tenantDao = tenantDao;
        this.setTitleUser();
    }
    ngOnInit() { }
    setTitleUser() {
        this.authService.detailUser().then((user) => {
            this.currentUser = user;
            this.title =
                "Bem-vindo, " + user.nome + "! Você está em ambiente " + this.gb.ENV;
        });
    }
    logout() {
        this.authService.logout().then(() => {
            this.router.navigate(["/panel-login"]);
        });
    }
    changePassword() {
        this.go.navigate({ route: ["/panel/change-password"] }, { modal: true });
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
    resetQueues() {
        const self = this;
        this.dialog
            .confirm("Deseja Resetar as Queues?", "Deseja realmente executar o reset?")
            .then((confirm) => {
            if (confirm) {
                self.loading = true;
                this.dao.resetQueues()
                    .then(function () {
                    self.loading = false;
                    self.dialog.alert("Sucesso", "Executado com sucesso!");
                })
                    .catch(function (error) {
                    self.loading = false;
                    self.dialog.alert("Erro", "Erro ao executar: " + error?.message ? error?.message : error);
                });
            }
        });
    }
    executaMigrations(row) {
        const self = this;
        this.dialog
            .confirm("Executar Migration?", "Deseja realmente executar as migrations?")
            .then((confirm) => {
            if (confirm) {
                this.tenantDao.migrations(row)
                    .then(function () {
                    self.dialog.alert("Sucesso", "Migration executada com sucesso!");
                })
                    .catch(function (error) {
                    self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message
                        ? error?.message
                        : error);
                });
            }
        });
    }
};
PanelLayoutComponent = __decorate([
    Component({
        selector: "panel-layout",
        templateUrl: "./panel-layout.component.html",
        styleUrls: ["./panel-layout.component.scss"],
        standalone: false
    })
], PanelLayoutComponent);
export { PanelLayoutComponent };
//# sourceMappingURL=panel-layout.component.js.map