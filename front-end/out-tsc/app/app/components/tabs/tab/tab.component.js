import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let TabComponent = class TabComponent {
    constructor() {
        this.label = "";
    }
    get isActive() {
        return this.tabs?.active == this.key;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], TabComponent.prototype, "template", void 0);
__decorate([
    Input()
], TabComponent.prototype, "key", void 0);
__decorate([
    Input()
], TabComponent.prototype, "label", void 0);
__decorate([
    Input()
], TabComponent.prototype, "icon", void 0);
TabComponent = __decorate([
    Component({
        selector: 'tab',
        templateUrl: './tab.component.html',
        styleUrls: ['./tab.component.scss'],
        standalone: false
    })
], TabComponent);
export { TabComponent };
//# sourceMappingURL=tab.component.js.map