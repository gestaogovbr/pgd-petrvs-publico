import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ComponentBase } from '../component-base';
let ActionButtonComponent = class ActionButtonComponent extends ComponentBase {
    set button(value) { if (this._button != value)
        this._button = value; this._button.id = this.generatedButtonId(this._button); }
    get button() { return this._button; }
    set route(value) { if (this._button.route != value)
        this._button.route = value; }
    get route() { return this._button.route; }
    set metadata(value) { if (this._button.metadata != value)
        this._button.metadata = value; }
    get metadata() { return this._button.metadata; }
    set class(value) { if (this._button.class != value)
        this._button.class = value; }
    get class() { return this._button.class; }
    set icon(value) { if (this._button.icon != value)
        this._button.icon = value; this._button.id = this.generatedButtonId(this._button); }
    get icon() { return this._button.icon; }
    set label(value) { if (this._button.label != value)
        this._button.label = value; this._button.id = this.generatedButtonId(this._button); }
    get label() { return this._button.label; }
    set hint(value) { if (this._button.hint != value)
        this._button.hint = value; this._button.id = this.generatedButtonId(this._button); }
    get hint() { return this._button.hint; }
    set disabled(value) { if (this._button.disabled != value)
        this._button.disabled = value; }
    get disabled() { return this._button.disabled; }
    set iconChar(value) { if (this._button.iconChar != value)
        this._button.iconChar = value; }
    get iconChar() { return this._button.iconChar; }
    set color(value) { if (this._button.color != value)
        this._button.color = value; }
    get color() { return this._button.color; }
    set running(value) { if (this._button.running != value)
        this._button.running = value; }
    get running() { return this._button.running; }
    set toggle(value) { if (this._button.toggle != value)
        this._button.toggle = value; }
    get toggle() { return this._button.toggle; }
    set badge(value) { if (this._button.badge != value)
        this._button.badge = value; }
    get badge() { return this._button.badge; }
    set pressed(value) { if (this._button.pressed != value)
        this._button.pressed = value; }
    get pressed() { return this._button.pressed; }
    set items(value) { if (this._button.items != value)
        this._button.items = value; }
    get items() { return this._button.items; }
    set hidden(value) { if (this._button.hidden != value)
        this._button.hidden = value; }
    get hidden() { return this._button.hidden; }
    set dynamicItems(value) { if (this._button.dynamicItems != value)
        this._button.dynamicItems = value; }
    get dynamicItems() { return this._button.dynamicItems; }
    set dynamicVisible(value) { if (this._button.dynamicVisible != value)
        this._button.dynamicVisible = value; }
    get dynamicVisible() { return this._button.dynamicVisible; }
    set onClick(value) { if (this._button.onClick != value)
        this._button.onClick = value; }
    get onClick() { return this._button.onClick; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this._button = {};
        this.go = injector.get(NavigateService);
        this.button.id = this.generatedButtonId(this.button, this.util.md5());
    }
    get isFullWidth() {
        return this.fullWidth != undefined;
    }
    get isNoArrow() {
        return this.noArrow != undefined;
    }
    get isPlaceholder() {
        return this.placeholder != undefined;
    }
    get buttonClass() {
        return (this.isPlaceholder ? "placeholder " : "") +
            (this.buttonPressed(this.button) ? "active " : "") +
            (this.isNoArrow ? "no-arrow " : "") +
            (this.button.items && !this.button.toggle ? "dropdown-toggle " : "") +
            ('btn ' + (this.button.color || 'btn-outline-primary'));
    }
    buttonDisabled(button) {
        return this.isPlaceholder || (typeof button.disabled == "function" ? button.disabled() : !!button.disabled);
    }
    buttonPressed(button) {
        return !!button.toggle && (!button.pressed || typeof button.pressed == "boolean" ? !!button.pressed : !!button.pressed(this));
    }
    async onButtonClick(button) {
        if (button.toggle && typeof button.pressed == "boolean")
            button.pressed = !button.pressed;
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            await button.onClick(this.data, button);
        }
        this.cdRef.detectChanges();
    }
};
__decorate([
    Input()
], ActionButtonComponent.prototype, "button", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "route", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "metadata", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "class", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "icon", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "label", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "hint", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "disabled", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "iconChar", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "color", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "running", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "toggle", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "badge", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "pressed", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "items", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "hidden", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "dynamicItems", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "dynamicVisible", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "onClick", null);
__decorate([
    Input()
], ActionButtonComponent.prototype, "data", void 0);
__decorate([
    Input()
], ActionButtonComponent.prototype, "noArrow", void 0);
__decorate([
    Input()
], ActionButtonComponent.prototype, "fullWidth", void 0);
__decorate([
    Input()
], ActionButtonComponent.prototype, "placeholder", void 0);
ActionButtonComponent = __decorate([
    Component({
        selector: 'action-button',
        templateUrl: './action-button.component.html',
        styleUrls: ['./action-button.component.scss'],
        standalone: false
    })
], ActionButtonComponent);
export { ActionButtonComponent };
//# sourceMappingURL=action-button.component.js.map