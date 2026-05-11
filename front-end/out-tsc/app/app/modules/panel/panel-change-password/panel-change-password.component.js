import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageFormBase } from "../../base/page-form-base";
let PanelChangePasswordComponent = class PanelChangePasswordComponent extends PageFormBase {
    constructor(injector, authService) {
        super(injector, UserPanel, UsersPanelDaoService);
        this.injector = injector;
        this.authService = authService;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.usersPanelDao = injector.get(UsersPanelDaoService);
        this.form = this.fh.FormBuilder({
            id: { default: "" },
            nome: { default: "" },
            email: { default: '' },
            password: { default: '' },
        }, this.cdRef, this.validate);
    }
    initializeData(form) {
        this.entity = new UserPanel();
        this.authService.detailUser().then((user) => {
            this.loadData(user, form);
        });
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async saveData(form) {
        let usuario = this.util.fill(new UserPanel(), this.entity);
        return this.util.fillForm(usuario, this.form.value);
    }
    async alteraSenha() {
        try {
            let usuario = this.util.fill(new UserPanel(), this.entity);
            this.util.fillForm(usuario, this.form.value);
            let response = await this.authService.updatePassword(usuario.password);
            if (response.success) {
                await this.authService.logout();
                this.dialog.closeAll();
                this.router.navigate(["/panel-login"]);
            }
            else {
                this.dialog.alert("Error", response.error);
            }
        }
        catch (error) {
            this.dialog.alert("Error", String(error));
        }
    }
};
PanelChangePasswordComponent = __decorate([
    Component({
        selector: 'panel-change-password',
        templateUrl: './panel-change-password.component.html',
        styleUrls: ['./panel-change-password.component.scss'],
        standalone: false
    })
], PanelChangePasswordComponent);
export { PanelChangePasswordComponent };
//# sourceMappingURL=panel-change-password.component.js.map