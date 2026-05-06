import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
let HeaderGroupComponent = class HeaderGroupComponent {
    constructor() {
        this.title = "";
        this.colspan = "1";
        this.style = {};
    }
};
__decorate([
    Input()
], HeaderGroupComponent.prototype, "title", void 0);
__decorate([
    Input()
], HeaderGroupComponent.prototype, "colspan", void 0);
__decorate([
    Input()
], HeaderGroupComponent.prototype, "align", void 0);
__decorate([
    Input()
], HeaderGroupComponent.prototype, "style", void 0);
HeaderGroupComponent = __decorate([
    Component({
        selector: 'header-group',
        templateUrl: './header-group.component.html',
        standalone: false
    })
], HeaderGroupComponent);
export { HeaderGroupComponent };
//# sourceMappingURL=header-group.component.js.map