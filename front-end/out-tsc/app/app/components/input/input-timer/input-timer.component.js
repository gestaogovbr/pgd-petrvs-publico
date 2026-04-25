import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { UtilService } from 'src/app/services/util.service';
import { InputBase } from '../input-base';
let InputTimerComponent = class InputTimerComponent extends InputBase {
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set hoursPerDay(value) {
        this._hoursPerDay = value;
        this.updateForm(this.value);
        this.detectChanges();
    }
    ;
    get hoursPerDay() {
        return this._hoursPerDay;
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
        this.icon = "bi bi-clock";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this._hoursPerDay = 24;
        this.util = injector.get(UtilService);
        this.fh = injector.get(FormHelperService);
        this.formDropdown = this.fh.FormBuilder({
            days: { default: 0 },
            hours: { default: 0 },
            minutes: { default: 0 }
        });
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            const controlChange = (newValue) => {
                this.updateValue(newValue);
                this.updateForm(newValue);
            };
            this.control.valueChanges.subscribe(controlChange);
            controlChange(this.control.value);
        }
        this.formDropdown.valueChanges.subscribe(valueChanged => {
            const form = valueChanged; //this.formDropdown.value;
            const newValue = (form.days * this.hoursPerDay) + form.hours + Math.round(form.minutes * (100 / 60)) / 100;
            this.updateValue(Math.max(newValue, 0));
        });
    }
    get isOnlyHours() {
        return this.onlyHours !== undefined;
    }
    get isOnlyDays() {
        return this.onlyDays !== undefined;
    }
    getDaysInHours() {
        const days = this.formDropdown.controls.days.value;
        return days ? days * this.hoursPerDay + " horas" : " - Nenhum - ";
    }
    updateValue(value) {
        if (this.value != value) {
            this.value = value;
            if (this.control && this.control.value != value) {
                this.control.setValue(value, { emitEvent: false });
            }
            if (this.change)
                this.change.emit(new Event("change"));
            this.cdRef.detectChanges();
        }
    }
    updateForm(value) {
        const newValue = value ? this.util.decimalToTimer(value, this.isOnlyHours, this.hoursPerDay) : {
            days: 0,
            hours: 0,
            minutes: 0
        };
        const formValue = {
            days: this.formDropdown.controls.days.value,
            hours: this.formDropdown.controls.hours.value,
            minutes: this.formDropdown.controls.minutes.value
        };
        if (JSON.stringify(formValue) != JSON.stringify(newValue))
            this.formDropdown.patchValue(newValue, { emitEvent: false });
    }
    getButtonText() {
        return this.value != undefined ? this.util.decimalToTimerFormated(this.value, this.isOnlyHours, this.hoursPerDay) : " - Vazio - ";
    }
};
__decorate([
    HostBinding('class')
], InputTimerComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputTimerComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputTimerComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "onlyHours", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "onlyDays", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputTimerComponent.prototype, "control", null);
__decorate([
    Input()
], InputTimerComponent.prototype, "hoursPerDay", null);
__decorate([
    Input()
], InputTimerComponent.prototype, "size", null);
InputTimerComponent = __decorate([
    Component({
        selector: 'input-timer',
        templateUrl: './input-timer.component.html',
        styleUrls: ['./input-timer.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputTimerComponent);
export { InputTimerComponent };
//# sourceMappingURL=input-timer.component.js.map