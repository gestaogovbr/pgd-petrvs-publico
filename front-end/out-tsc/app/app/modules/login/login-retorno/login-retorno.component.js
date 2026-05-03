import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginRetornoComponent = class LoginRetornoComponent {
    constructor() { }
    ngOnInit() {
        this.bc = new BroadcastChannel('petrvs_login_popup');
        this.bc?.postMessage("COMPLETAR_LOGIN");
        setTimeout(() => window.close(), 1000);
    }
};
LoginRetornoComponent = __decorate([
    Component({
        selector: 'app-login-retorno',
        templateUrl: './login-retorno.component.html',
        styleUrls: ['./login-retorno.component.scss'],
        standalone: false
    })
], LoginRetornoComponent);
export { LoginRetornoComponent };
//# sourceMappingURL=login-retorno.component.js.map