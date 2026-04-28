import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputButtonComponent = class InputButtonComponent extends InputBase {
    set value(value) {
        this.formControl.setValue(value);
    }
    get value() {
        return this.formControl.value;
    }
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
        this.buttonClick = new EventEmitter();
        this.change = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this.textCase = "";
        this.iconButton = "bi-search";
    }
    get isNumbers() {
        return this.numbers !== undefined;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    onButtonClick(event) {
        if (this.buttonClick)
            this.buttonClick.emit(event);
    }
    onChange(event) {
        if (this.change)
            this.change.emit(event);
    }
};
__decorate([
    HostBinding('class')
], InputButtonComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputButtonComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputButtonComponent.prototype, "buttonClick", void 0);
__decorate([
    Output()
], InputButtonComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "numbers", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "textCase", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "iconButton", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "maxLength", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "maskFormat", void 0);
__decorate([
    Input()
], InputButtonComponent.prototype, "value", null);
__decorate([
    Input()
], InputButtonComponent.prototype, "control", null);
__decorate([
    Input()
], InputButtonComponent.prototype, "size", null);
InputButtonComponent = __decorate([
    Component({
        selector: 'input-button',
        templateUrl: './input-button.component.html',
        styleUrls: ['./input-button.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputButtonComponent);
export { InputButtonComponent };
//# sourceMappingURL=input-button.component.js.map