import { __decorate } from "tslib";
import { Component, ContentChildren } from "@angular/core";
import { HeaderGroupComponent } from "../header-group/header-group.component";
let HeaderGroupsComponent = class HeaderGroupsComponent {
};
__decorate([
    ContentChildren(HeaderGroupComponent, { descendants: true })
], HeaderGroupsComponent.prototype, "headersRef", void 0);
HeaderGroupsComponent = __decorate([
    Component({
        selector: 'header-groups',
        templateUrl: './header-groups.component.html',
        standalone: false
    })
], HeaderGroupsComponent);
export { HeaderGroupsComponent };
//# sourceMappingURL=header-groups.component.js.map