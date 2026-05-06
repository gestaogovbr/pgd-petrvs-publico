import { __decorate } from "tslib";
import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputDisplayComponent = class InputDisplayComponent extends InputBase {
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set size(value) {
        this.setSize(value);
    }
    get size() {
        return this.getSize();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = 'form-group';
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.loading = false;
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    HostBinding('class')
], InputDisplayComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputDisplayComponent.prototype, "inputElement", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputDisplayComponent.prototype, "control", null);
__decorate([
    Input()
], InputDisplayComponent.prototype, "size", null);
InputDisplayComponent = __decorate([
    Component({
        selector: 'input-display',
        templateUrl: './input-display.component.html',
        styleUrls: ['./input-display.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputDisplayComponent);
export { InputDisplayComponent };
//# sourceMappingURL=input-display.component.js.map