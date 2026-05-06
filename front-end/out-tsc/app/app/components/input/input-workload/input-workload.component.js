import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputWorkloadComponent = class InputWorkloadComponent extends InputBase {
    set unit(value) {
        if (this._unit != value) {
            this._unit = value;
            this.maxValue = this.unit == "day" ? 24 : this.unit == "week" ? 120 : 480;
            this.valueToWork();
            this.detectChanges();
        }
    }
    get unit() {
        return this._unit;
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
        this.value = 0;
        this.loading = false;
        this.workControl = new FormControl();
        this.maxValue = 24;
        this._unit = "day";
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe(value => this.valueToWork());
            this.valueToWork();
        }
    }
    onButtonClick(event) {
        const next = this.isDaysOrHours ? (this.unit == "day" ? "hour" : "day") : (this.unit == "day" ? "week" : this.unit == "week" ? "mouth" : "day");
        console.log(this.unit, next);
        this.unit = next;
        if (this.unitChange)
            this.unitChange(next);
    }
    get isDaysOrHours() {
        return this.daysOrHours != undefined;
    }
    get iconWork() {
        return this.unit == "hour" ? "bi bi-clock" : this.unit == "day" ? "bi bi-calendar3-event" : this.unit == "week" ? "bi bi-calendar3-week" : "bi bi-calendar3";
    }
    get unitWork() {
        return this.unit == "hour" ? "horas" : this.unit == "day" ? (this.isDaysOrHours ? "dias" : "h/dia") : this.unit == "week" ? "h/semana" : "h/mês";
    }
    onChange(event) {
        this.workToValue();
        if (this.change)
            this.change.emit(event);
    }
    valueToWork() {
        const factor = ["hour", "day"].includes(this.unit) ? 1 : this.unit == "week" ? 5 : 20;
        const value = this.control ? this.control.value * factor : this.value * factor;
        if (this.workControl.value != value)
            this.workControl.setValue(value);
    }
    workToValue() {
        const factor = ["hour", "day"].includes(this.unit) ? 1 : this.unit == "week" ? 5 : 20;
        const value = this.workControl.value / factor;
        if (this.control) {
            if (this.control.value != value)
                this.control.setValue(value);
        }
        else {
            if (this.value != value)
                this.value = value;
        }
    }
};
__decorate([
    HostBinding('class')
], InputWorkloadComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputWorkloadComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputWorkloadComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "daysOrHours", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "maxLength", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "unitChange", void 0);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "unit", null);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "control", null);
__decorate([
    Input()
], InputWorkloadComponent.prototype, "size", null);
InputWorkloadComponent = __decorate([
    Component({
        selector: 'input-workload',
        templateUrl: './input-workload.component.html',
        styleUrls: ['./input-workload.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputWorkloadComponent);
export { InputWorkloadComponent };
//# sourceMappingURL=input-workload.component.js.map