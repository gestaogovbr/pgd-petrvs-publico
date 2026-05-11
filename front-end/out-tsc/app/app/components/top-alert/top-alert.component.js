import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
let TopAlertComponent = class TopAlertComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.type = "alert";
        this.id = this.util.md5();
    }
    ngOnInit() {
    }
    get isClosable() {
        return this.closable != undefined;
    }
    get alertClass() {
        return "mt-2 alert alert-" +
            (this.type == "alert" ? "primary" :
                this.type == "success" ? "success" :
                    this.type == "warning" ? "warning" : "danger") +
            (this.isClosable ? " alert-dismissible fade show" : "");
    }
    get iconClass() {
        return "me-2 bi bi-" +
            (this.type == "alert" ? "info-circle-fill" :
                this.type == "success" ? "check-circle-fill" :
                    this.type == "warning" ? "exclamation-circle-fill" : "exclamation-triangle-fill");
    }
    onCloseClick(event) {
        this.lastMessage = this.message;
        if (this.close)
            this.close(this.id);
    }
};
__decorate([
    Input()
], TopAlertComponent.prototype, "message", void 0);
__decorate([
    Input()
], TopAlertComponent.prototype, "type", void 0);
__decorate([
    Input()
], TopAlertComponent.prototype, "closable", void 0);
__decorate([
    Input()
], TopAlertComponent.prototype, "id", void 0);
__decorate([
    Input()
], TopAlertComponent.prototype, "close", void 0);
TopAlertComponent = __decorate([
    Component({
        selector: 'top-alert',
        templateUrl: './top-alert.component.html',
        styleUrls: ['./top-alert.component.scss'],
        standalone: false
    })
], TopAlertComponent);
export { TopAlertComponent };
//# sourceMappingURL=top-alert.component.js.map