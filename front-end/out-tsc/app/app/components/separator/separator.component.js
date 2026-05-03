import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentBase } from '../component-base';
let SeparatorComponent = class SeparatorComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.buttonClick = new EventEmitter();
        this.change = new EventEmitter();
        this.title = "";
        this.bold = false;
        this.icon = undefined;
        this.collapse = undefined;
        this.transparent = undefined;
        this.small = undefined;
        this.bottom = undefined;
        this.button = undefined;
        this.collapsed = true;
        this.margin = 0;
    }
    get formControl() {
        return this.control;
    }
    get isCollapse() {
        return this.collapse !== undefined;
    }
    get isSmall() {
        return this.small !== undefined;
    }
    get isCollapsed() {
        return this.isCollapse && this.collapsed;
    }
    get isTransparent() {
        return this.transparent !== undefined;
    }
    get isBottom() {
        return this.bottom !== undefined;
    }
    onButtonClick() {
        if (this.buttonClick)
            this.buttonClick.emit();
    }
    onExpandClick() {
        if (this.isCollapse) {
            this.collapsed = !this.collapsed;
            this.cdRef.detectChanges();
        }
    }
    onChange(event) {
        if (this.change)
            this.change.emit(event);
    }
};
__decorate([
    Output()
], SeparatorComponent.prototype, "buttonClick", void 0);
__decorate([
    Output()
], SeparatorComponent.prototype, "change", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "title", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "bold", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "icon", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "collapse", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "transparent", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "small", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "bottom", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "button", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "collapsed", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "control", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], SeparatorComponent.prototype, "margin", void 0);
SeparatorComponent = __decorate([
    Component({
        selector: 'separator',
        templateUrl: './separator.component.html',
        styleUrls: ['./separator.component.scss'],
        standalone: false
    })
], SeparatorComponent);
export { SeparatorComponent };
//# sourceMappingURL=separator.component.js.map