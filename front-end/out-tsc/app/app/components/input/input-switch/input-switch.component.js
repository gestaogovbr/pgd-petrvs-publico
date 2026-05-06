import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputSwitchComponent = class InputSwitchComponent extends InputBase {
    set value(value) {
        this.setValue(value);
    }
    get value() {
        return this.getValue();
    }
    setValue(value) {
        super.setValue(value);
        if (this.checkbox)
            this.checkbox.nativeElement.checked = this.valueOn ? this.valueOn == value : !!value;
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
        this.change = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this.scale = "medium";
    }
    get scaleClass() {
        return this.scale == "large" ? "switch-lg" : this.scale == "small" ? "switch-sm" : "switch-md";
    }
    get containerClass() {
        return "form-check form-switch d-flex align-items-center" + (this.labelPosition == "left" ? " p-0 text-end justify-content-end me-2" : "");
    }
    updateValue(value) {
        this.value = value;
        //console.log("UPDATEVALUE", this.controlName, this.valueOn, this.valueOff, value, this.control?.value);
        if (this.checkbox)
            this.checkbox.nativeElement.checked = this.valueOn ? this.valueOn == value : !!value; //this.value;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe(this.updateValue.bind(this));
            this.value = this.control.value;
        }
        this.updateValue(this.value);
    }
    get isButton() {
        return this.button != undefined;
    }
    onChange(event) {
        console.log('onChange');
        const value = event.target.checked ? this.valueOn || true : this.valueOff || false;
        //console.log("CHANGED", this.controlName, value);
        this.control?.setValue(value);
        this.updateValue(value);
        if (this.change)
            this.change.emit(event);
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    HostBinding('class')
], InputSwitchComponent.prototype, "class", void 0);
__decorate([
    ViewChild('checkbox')
], InputSwitchComponent.prototype, "checkbox", void 0);
__decorate([
    Output()
], InputSwitchComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "valueOn", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "valueOff", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "button", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "buttonIcon", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "buttonColor", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "buttonCaption", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "scale", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputSwitchComponent.prototype, "value", null);
__decorate([
    Input()
], InputSwitchComponent.prototype, "control", null);
__decorate([
    Input()
], InputSwitchComponent.prototype, "size", null);
InputSwitchComponent = __decorate([
    Component({
        selector: 'input-switch',
        templateUrl: './input-switch.component.html',
        styleUrls: ['./input-switch.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputSwitchComponent);
export { InputSwitchComponent };
//# sourceMappingURL=input-switch.component.js.map