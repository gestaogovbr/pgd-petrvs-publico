import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputRateComponent = class InputRateComponent extends InputBase {
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set max(value) {
        if (this._max != value) {
            this._max = value;
            this.stars = Array(value).fill(false);
            this.stars.map((x, i) => this.stars[i] = i < this.value);
            this.detectChanges();
        }
    }
    get max() {
        return this._max;
    }
    set size(value) {
        this.setSize(value);
    }
    get size() {
        return this.getSize();
    }
    startClass(index) {
        return 'float-start mx-' + this.starMargin + ' ' + (index < this.value ? this.starFillIcon : this.starIcon) + (this.small ? '' : ' h4');
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
        this.value = 0;
        this.loading = false;
        this.starMargin = 2;
        this.starSize = 4;
        this.starIcon = "bi bi-star text-secondary";
        this.starFillIcon = "bi bi-star-fill text-warning";
        this.align = "center";
        this.stars = Array(10).fill(false);
        this._max = 10;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe(this.controlChange.bind(this));
            this.controlChange(this.control.value);
        }
    }
    get isSmall() {
        return this.small != undefined;
    }
    controlChange(value) {
        if (this.value != value) {
            this.value = value;
            if (this.change)
                this.change.emit(new Event("change"));
            this.stars.map((x, i) => this.stars[i] = i < this.value);
            this.cdRef.detectChanges();
        }
    }
    onClick(index) {
        if (!this.isDisabled) {
            const newValue = (index + 1) == this.value && this.stars[index] ? 0 : index + 1;
            this.control?.setValue(newValue);
            this.controlChange(newValue);
            this.cdRef.detectChanges();
        }
    }
};
__decorate([
    HostBinding('class')
], InputRateComponent.prototype, "class", void 0);
__decorate([
    Output()
], InputRateComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "starMargin", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "starSize", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "starIcon", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "starFillIcon", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "small", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "align", void 0);
__decorate([
    Input()
], InputRateComponent.prototype, "control", null);
__decorate([
    Input()
], InputRateComponent.prototype, "max", null);
__decorate([
    Input()
], InputRateComponent.prototype, "size", null);
InputRateComponent = __decorate([
    Component({
        selector: 'input-rate',
        templateUrl: './input-rate.component.html',
        styleUrls: ['./input-rate.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputRateComponent);
export { InputRateComponent };
//# sourceMappingURL=input-rate.component.js.map