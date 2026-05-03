import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginUnicoComponent = class LoginUnicoComponent {
    constructor(auth, route) {
        this.auth = auth;
        this.route = route;
        this.code = "";
        this.state = "";
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.code = params['code'];
            this.state = params['state'];
        });
        if (this.code) {
            this.auth.authLoginUnico(this.code, this.state, this.redirectTo);
        }
    }
};
LoginUnicoComponent = __decorate([
    Component({
        selector: 'app-login-unico',
        templateUrl: './login-unico.component.html',
        styleUrls: ['./login-unico.component.scss'],
        standalone: false
    })
], LoginUnicoComponent);
export { LoginUnicoComponent };
//# sourceMappingURL=login-unico.component.js.map