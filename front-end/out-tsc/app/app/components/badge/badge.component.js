import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
let BadgeComponent = class BadgeComponent extends ComponentBase {
    set badge(value) { if (this._badge != value)
        this._badge = value; this._badge.id = this._badge.id || this.generatedButtonId(this._badge); }
    get badge() { return this._badge; }
    set lookup(value) { if (this._lookup != value)
        this._lookup = value; this.fromLookup(); }
    get lookup() { return this._lookup; }
    set click(value) { if (this._badge.click != value)
        this._badge.click = value; }
    get click() { return this._badge.click; }
    set data(value) { if (this._badge.data != value)
        this._badge.data = value; }
    get data() { return this._badge.data; }
    set hint(value) { if (this._badge.hint != value)
        this._badge.hint = value; }
    get hint() { return this._badge.hint; }
    set icon(value) { if (this._badge.icon != value)
        this._badge.icon = value; }
    get icon() { return this._badge.icon; }
    set img(value) { if (this._badge.img != value)
        this._badge.img = value; }
    get img() { return this._badge.img; }
    set label(value) { if (this._badge.label != value)
        this._badge.label = value; }
    get label() { return this._badge.label; }
    set textValue(value) { if (this._badge.textValue != value)
        this._badge.textValue = value; }
    get textValue() { return this._badge.textValue; }
    set color(value) { if (this._badge.color != value)
        this._badge.color = value; }
    get color() { return this._badge.color; }
    set class(value) { if (this._badge.class != value)
        this._badge.class = value; }
    get class() { return "badge " + (this.rounded ? "rounded-pill " : "") + (this.maxWidth ? "text-break text-wrap " : "") + this.getClassBgColor(this.color) + (this._badge.class ? " " + this._badge.class : ""); }
    set maxWidth(value) { if (this._badge.maxWidth != value)
        this._badge.maxWidth = value; }
    get maxWidth() { return this._badge.maxWidth || 150; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.rounded = true;
        this._badge = {};
    }
    ngOnInit() {
    }
    generatedBadgeId(button, relativeId) {
        return this.generatedId((button.label || button.hint || button.icon || "_badge") + (relativeId || ""));
    }
    onBadgeClick(event) {
        if (this.click)
            this.click(this.data);
    }
    fromLookup() {
        if (this._lookup) {
            Object.assign(this._badge, {
                color: this._lookup.color,
                icon: this._lookup.icon,
                label: this._lookup.value,
                data: this._lookup
            });
            this._badge.id = this.generatedButtonId(this._badge);
            this.detectChanges();
        }
    }
    get style() {
        return this.getStyleBgColor(this.color);
    }
};
__decorate([
    Input()
], BadgeComponent.prototype, "badge", null);
__decorate([
    Input()
], BadgeComponent.prototype, "lookup", null);
__decorate([
    Input()
], BadgeComponent.prototype, "click", null);
__decorate([
    Input()
], BadgeComponent.prototype, "data", null);
__decorate([
    Input()
], BadgeComponent.prototype, "hint", null);
__decorate([
    Input()
], BadgeComponent.prototype, "icon", null);
__decorate([
    Input()
], BadgeComponent.prototype, "img", null);
__decorate([
    Input()
], BadgeComponent.prototype, "label", null);
__decorate([
    Input()
], BadgeComponent.prototype, "textValue", null);
__decorate([
    Input()
], BadgeComponent.prototype, "color", null);
__decorate([
    Input()
], BadgeComponent.prototype, "class", null);
__decorate([
    Input()
], BadgeComponent.prototype, "maxWidth", null);
__decorate([
    Input()
], BadgeComponent.prototype, "rounded", void 0);
BadgeComponent = __decorate([
    Component({
        selector: 'badge',
        templateUrl: './badge.component.html',
        styleUrls: ['./badge.component.scss'],
        standalone: false
    })
], BadgeComponent);
export { BadgeComponent };
//# sourceMappingURL=badge.component.js.map