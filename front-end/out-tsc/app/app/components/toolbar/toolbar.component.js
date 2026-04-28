import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ComponentBase } from '../component-base';
import { GlobalsService } from 'src/app/services/globals.service';
let ToolbarComponent = class ToolbarComponent extends ComponentBase {
    get title() {
        return this._title;
    }
    set title(value) {
        if (this._title != value) {
            this._title = value;
            this.cdRef.detectChanges();
        }
    }
    get buttons() {
        return this._buttons;
    }
    ;
    set buttons(value) {
        this._buttons = value;
        this.cdRef.detectChanges();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.icon = "";
        this.visible = true;
        this._title = "";
        this.go = injector.get(NavigateService);
        this.gb = injector.get(GlobalsService);
    }
    ngOnInit() {
    }
    buttonDisabled(button) {
        return typeof button.disabled == "function" ? button.disabled() : !!button.disabled;
    }
    buttonPressed(button) {
        return !!button.toggle && (!button.pressed || typeof button.pressed == "boolean" ? !!button.pressed : !!button.pressed(this));
    }
    onButtonClick(button) {
        if (button.toggle && typeof button.pressed == "boolean")
            button.pressed = !button.pressed;
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            button.onClick(button);
        }
        this.cdRef.detectChanges();
    }
};
__decorate([
    Input()
], ToolbarComponent.prototype, "icon", void 0);
__decorate([
    Input()
], ToolbarComponent.prototype, "options", void 0);
__decorate([
    Input()
], ToolbarComponent.prototype, "visible", void 0);
__decorate([
    Input()
], ToolbarComponent.prototype, "title", null);
__decorate([
    Input()
], ToolbarComponent.prototype, "buttons", null);
ToolbarComponent = __decorate([
    Component({
        selector: 'toolbar',
        templateUrl: './toolbar.component.html',
        styleUrls: ['./toolbar.component.scss'],
        standalone: false
    })
], ToolbarComponent);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map