import { __decorate, __param } from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
let PanelLoginComponent = class PanelLoginComponent {
    constructor(globals, router, authService, dialog, fh, formBuilder, cdRef, document) {
        this.globals = globals;
        this.router = router;
        this.authService = authService;
        this.dialog = dialog;
        this.fh = fh;
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.document = document;
        this.validate = (control, controlName) => {
            let result = null;
            if (['email', 'password'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.document.body.classList.add('login');
        this.login = this.fh.FormBuilder({
            email: { default: "" },
            password: { default: "" }
        }, this.cdRef, this.validate);
    }
    submitForm() {
        if (this.loginForm) {
            this.loginForm.onSubmit();
        }
    }
    loginPanel() {
        const form = this.login.controls;
        this.authService.loginPanel(form.email.value, form.password.value)
            .then(() => {
            this.router.navigate(['/panel']);
        })
            .catch(error => {
            const message = error?.error?.error || 'Não foi possível realizar o login.';
            this.dialog.alert('Atenção', message);
            console.error('Erro durante o login:', error);
        });
    }
};
__decorate([
    ViewChild('loginForm')
], PanelLoginComponent.prototype, "loginForm", void 0);
PanelLoginComponent = __decorate([
    Component({
        selector: 'app-panel-login',
        templateUrl: './panel-login.component.html',
        styleUrls: ['./panel-login.component.scss'],
        standalone: false
    }),
    __param(7, Inject(DOCUMENT))
], PanelLoginComponent);
export { PanelLoginComponent };
//# sourceMappingURL=panel-login.component.js.map