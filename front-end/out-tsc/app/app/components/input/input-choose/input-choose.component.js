import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputChooseComponent = class InputChooseComponent extends InputBase {
    set value(value) {
        if (value != this._value) {
            this._value = value;
            this.detectChanges();
            this.control?.setValue(value);
            if (this.change)
                this.change(value);
        }
    }
    get value() {
        return this._value;
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
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "bi bi-toggle-on";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this.items = [];
        this._value = "";
    }
    ngOnInit() {
        super.ngOnInit();
    }
    isChecked(item) {
        return this.value == item.key;
    }
    onClick(item) {
        if (!this.isDisabled)
            this.value = item.key;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.value = this.control.value;
            this.control.valueChanges.subscribe(newValue => {
                this.value = newValue;
            });
        }
    }
};
__decorate([
    HostBinding('class')
], InputChooseComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "items", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputChooseComponent.prototype, "value", null);
__decorate([
    Input()
], InputChooseComponent.prototype, "control", null);
__decorate([
    Input()
], InputChooseComponent.prototype, "size", null);
InputChooseComponent = __decorate([
    Component({
        selector: 'input-choose',
        templateUrl: './input-choose.component.html',
        styleUrls: ['./input-choose.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputChooseComponent);
export { InputChooseComponent };
//# sourceMappingURL=input-choose.component.js.map