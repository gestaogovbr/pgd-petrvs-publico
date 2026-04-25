import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let SidePanelComponent = class SidePanelComponent {
    constructor() {
        this.title = "";
        this.size = 6;
    }
    ngOnInit() {
    }
    get isFullSizeOnEdit() {
        return this.fullSizeOnEdit != undefined;
    }
    get isNoToolbar() {
        return this.noToolbar != undefined;
    }
};
__decorate([
    Input()
], SidePanelComponent.prototype, "template", void 0);
__decorate([
    Input()
], SidePanelComponent.prototype, "editTemplate", void 0);
__decorate([
    Input()
], SidePanelComponent.prototype, "fullSizeOnEdit", void 0);
__decorate([
    Input()
], SidePanelComponent.prototype, "noToolbar", void 0);
__decorate([
    Input()
], SidePanelComponent.prototype, "title", void 0);
__decorate([
    Input()
], SidePanelComponent.prototype, "size", void 0);
SidePanelComponent = __decorate([
    Component({
        selector: 'side-panel',
        templateUrl: './side-panel.component.html',
        styleUrls: ['./side-panel.component.scss'],
        standalone: false
    })
], SidePanelComponent);
export { SidePanelComponent };
//# sourceMappingURL=side-panel.component.js.map