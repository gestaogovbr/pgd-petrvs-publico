import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputRadioComponent = class InputRadioComponent extends InputBase {
    set value(value) {
        if (value != this._value) {
            this._value = value;
            this.detectChanges();
            const element = document.getElementById(this.controlName + value);
            if (element)
                element.checked = true;
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
    onRadioChange(event) {
        const target = event.target;
        const selected = this.items.find(x => x.key.toString() == target.value);
        this.control?.setValue(selected?.key);
        if (this.change)
            this.change(selected?.key);
    }
    isChecked(item) {
        return this.value == item.key ? "" : undefined;
    }
    get isCircle() {
        return this.circle != undefined;
    }
    get isInline() {
        return this.inline != undefined;
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
], InputRadioComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "items", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "circle", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "inline", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputRadioComponent.prototype, "value", null);
__decorate([
    Input()
], InputRadioComponent.prototype, "control", null);
__decorate([
    Input()
], InputRadioComponent.prototype, "size", null);
InputRadioComponent = __decorate([
    Component({
        selector: 'input-radio',
        templateUrl: './input-radio.component.html',
        styleUrls: ['./input-radio.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputRadioComponent);
export { InputRadioComponent };
//# sourceMappingURL=input-radio.component.js.map