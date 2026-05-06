import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
import moment from 'moment';
import { UtilService } from 'src/app/services/util.service';
let InputDatetimeComponent = class InputDatetimeComponent extends InputBase {
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
    set date(value) {
        if (this._date != value) {
            this._date = value;
            this.detectChanges();
            this.updateInputs();
        }
    }
    get date() {
        return this._date;
    }
    set time(value) {
        if (this._time != value) {
            this._time = value;
            this.detectChanges();
            this.updateInputs();
        }
    }
    get time() {
        return this._time;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = 'form-group';
        this.buttonClick = new EventEmitter();
        this.change = new EventEmitter();
        this.blur = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "bi bi-calendar-date";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this.value = "";
        this.util = injector.get(UtilService);
    }
    get isDate() {
        return this.date !== undefined;
    }
    get isTime() {
        return this.time !== undefined;
    }
    get isTime24hours() {
        return this.time24hours !== undefined;
    }
    get isNoIcon() {
        return this.noIcon !== undefined;
    }
    get isNoIndicator() {
        return this.noIndicator !== undefined;
    }
    ngOnInit() {
        super.ngOnInit();
        this.minDate = (moment().subtract(100, 'years').format("YYYY-MM-DD")).toString();
        this.maxDate = (moment().add(10, 'years').format("YYYY-MM-DD")).toString();
    }
    updateInputs() {
        if (this.viewInit) {
            if (this.dateInput)
                this.dateInput.nativeElement.value = this.getDateValue();
            if (this.hasTimeInput && this.timeInput) {
                this.timeInput.nativeElement.value = this.getTimeValue();
                this.timeInput.nativeElement.dispatchEvent(new Event("input"));
            }
            this.cdRef.detectChanges();
        }
    }
    get hasTimeInput() {
        return !this.isDate && (this.isTime || this.isTime24hours);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe(newValue => {
                if (this.value != newValue) {
                    this.value = newValue;
                    this.updateInputs();
                }
            });
            this.value = this.control.value;
        }
        this.updateInputs();
    }
    onChangeDateTime(event) {
        const strDate = this.dateInput?.nativeElement.value || "";
        const strTime = this.timeInput?.nativeElement.value || "00:00:00";
        let value = this.value;
        try {
            if (this.isTime) {
                value = strTime;
            }
            else {
                const dateTimeStr = strDate + (strDate.includes("T") ? "" : "T" + strTime);
                const m = moment(dateTimeStr);
                if (!m.isValid())
                    throw new Error("Data inválida");
                value = m.toDate();
            }
            if ((this.isTime && !this.util.isTimeValid(value)) || (!this.isTime && !this.util.isDataValid(value))) {
                throw new Error("Data inválida");
            }
        }
        catch (e) {
            value = null;
        }
        finally {
            if (!!value != !!this.value || value?.toString() != this.value?.toString()) {
                this.value = value;
                this.control?.setValue(value, { emitEvent: false });
                if (this.change)
                    this.change.emit(event);
                this.cdRef.detectChanges();
            }
        }
    }
    getDateValue() {
        if (!this.value)
            return null;
        const date = moment(this.value);
        if (!date.isValid())
            return null;
        if (this.isDate || this.isTime24hours) {
            return date.format("YYYY-MM-DD");
        }
        else {
            return date.format("YYYY-MM-DDTHH:mm");
        }
    }
    getTimeValue() {
        const strTime = this.timeInput?.nativeElement.value || "00:00:00";
        return !this.value ? null : this.value instanceof Date ? moment(this.value).format("HH:mm") : this.util.isTimeValid(this.value) ? this.value.substr(0, 5) : null;
    }
    formattedDateTime(dataHora, apenasData = false) {
        apenasData = apenasData ? true : this.isDate;
        return dataHora ? moment(dataHora).format(apenasData ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm") : "";
    }
    onBlur(event) {
        if (this.blur)
            this.blur.emit(event);
    }
};
__decorate([
    HostBinding('class')
], InputDatetimeComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputDatetimeComponent.prototype, "inputElement", void 0);
__decorate([
    ViewChild('dateInput')
], InputDatetimeComponent.prototype, "dateInput", void 0);
__decorate([
    ViewChild('timeInput')
], InputDatetimeComponent.prototype, "timeInput", void 0);
__decorate([
    Output()
], InputDatetimeComponent.prototype, "buttonClick", void 0);
__decorate([
    Output()
], InputDatetimeComponent.prototype, "change", void 0);
__decorate([
    Output()
], InputDatetimeComponent.prototype, "blur", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "prefix", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "sufix", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "time24hours", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "noIcon", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "noIndicator", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "control", null);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "size", null);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "date", null);
__decorate([
    Input()
], InputDatetimeComponent.prototype, "time", null);
InputDatetimeComponent = __decorate([
    Component({
        selector: 'input-datetime',
        templateUrl: './input-datetime.component.html',
        styleUrls: ['./input-datetime.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputDatetimeComponent);
export { InputDatetimeComponent };
//# sourceMappingURL=input-datetime.component.js.map