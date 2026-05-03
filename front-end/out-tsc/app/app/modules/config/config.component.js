import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageBase } from '../base/page-base';
let ConfigComponent = class ConfigComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
    }
};
ConfigComponent = __decorate([
    Component({
        selector: 'app-config',
        templateUrl: './config.component.html',
        styleUrls: ['./config.component.scss'],
        standalone: false
    })
], ConfigComponent);
export { ConfigComponent };
//# sourceMappingURL=config.component.js.map