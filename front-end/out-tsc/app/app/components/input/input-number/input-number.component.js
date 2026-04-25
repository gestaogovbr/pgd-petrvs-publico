import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputNumberComponent = class InputNumberComponent extends InputBase {
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set currency(value) {
        if (this._currency != value) {
            this._currency = value;
            if (value != undefined) {
                this.prefix = "R$";
                this.decimals = 2;
            }
        }
    }
    ;
    get currency() {
        return this._currency;
    }
    set decimals(value) {
        if (this._decimals != value) {
            this._decimals = value;
            //this.maskOptions.precision = value;
            this.maskFormat = value ? "0*." + '0'.repeat(value) : ""; //"separator." + value : "";
            //this.maskFormat = value ? "separator." + value : undefined; //"separator." + value : "";     
        }
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
        this.value = "";
        this.loading = false;
        this._decimals = 0;
    }
    get isAllowNegative() {
        return this.allowNegative != undefined;
    }
    get isInteger() {
        return this._decimals == 0;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    onChange(event) {
        if (this.change)
            this.change.emit(event);
    }
    converteNumero(event) {
        let value = event.target.value;
        if (value && !isNaN(value * 1))
            this.formControl.patchValue((this.isInteger ? parseInt(value) : parseFloat(value)) * 1);
    }
};
__decorate([
    HostBinding('class')
], InputNumberComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputNumberComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputNumberComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "minValue", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "maxValue", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "stepValue", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "prefix", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "sufix", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "allowNegative", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputNumberComponent.prototype, "control", null);
__decorate([
    Input()
], InputNumberComponent.prototype, "currency", null);
__decorate([
    Input()
], InputNumberComponent.prototype, "decimals", null);
__decorate([
    Input()
], InputNumberComponent.prototype, "size", null);
InputNumberComponent = __decorate([
    Component({
        selector: 'input-number',
        templateUrl: './input-number.component.html',
        styleUrls: ['./input-number.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputNumberComponent);
export { InputNumberComponent };
//# sourceMappingURL=input-number.component.js.map