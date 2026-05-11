import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
let CollapseCardComponent = class CollapseCardComponent extends ComponentBase {
    set class(value) { if (this._class != value)
        this._class = value; }
    get class() { return "card m-3 " + this.getClassBorderColor(this.color) + this._class; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.collapsed = true;
    }
    ngOnInit() {
    }
    onHeaderClick() {
        this.collapsed = !this.collapsed;
        this.cdRef.detectChanges();
    }
    get style() {
        return this.getStyleBgColor(this.color);
    }
};
__decorate([
    Input()
], CollapseCardComponent.prototype, "title", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "data", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "icon", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "collapsed", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "color", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "template", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "titleTemplate", void 0);
__decorate([
    Input()
], CollapseCardComponent.prototype, "class", null);
CollapseCardComponent = __decorate([
    Component({
        selector: 'collapse-card',
        templateUrl: './collapse-card.component.html',
        styleUrls: ['./collapse-card.component.scss'],
        standalone: false
    })
], CollapseCardComponent);
export { CollapseCardComponent };
//# sourceMappingURL=collapse-card.component.js.map