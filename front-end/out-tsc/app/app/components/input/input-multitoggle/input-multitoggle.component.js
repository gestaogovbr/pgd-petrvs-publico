import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputMultitoggleComponent = class InputMultitoggleComponent extends InputBase {
    set value(value) {
        if (JSON.stringify(this._value) != JSON.stringify(value)) {
            this._value = value;
            this.control?.setValue(this.value);
        }
        this.cdRef.markForCheck();
    }
    get value() {
        return this._value;
    }
    set items(value) {
        this._items = value || [];
        this.value = this.value.filter(x => !!this._items?.find(y => y.key == x.key));
        this.cdRef.detectChanges();
    }
    get items() {
        return this._items;
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
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        // Propriedades privadas e motodos get e set
        this._items = [];
        this._value = [];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            const controlChange = (newValue) => {
                this.value = newValue?.filter(x => !!this._items?.find(y => y.key == x.key)) || [];
            };
            this.control.valueChanges.subscribe(controlChange);
            controlChange(this.control.value);
        }
    }
    onButtonToggle(item) {
        const index = this.value.findIndex(x => x.key == item.key);
        let values = [...this.value];
        if (index >= 0) {
            values.splice(index, 1);
        }
        else {
            values.push(item);
        }
        this.value = values;
    }
    isChecked(item) {
        return !!this.value.find(x => x.key == item.key);
    }
    classButton(item) {
        return this.isDisabled && !this.isChecked(item) ? "btn-outline-secundary" : "btn-outline-primary";
    }
};
__decorate([
    HostBinding('class')
], InputMultitoggleComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "value", null);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "items", null);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "control", null);
__decorate([
    Input()
], InputMultitoggleComponent.prototype, "size", null);
InputMultitoggleComponent = __decorate([
    Component({
        selector: 'input-multitoggle',
        templateUrl: './input-multitoggle.component.html',
        styleUrls: ['./input-multitoggle.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputMultitoggleComponent);
export { InputMultitoggleComponent };
//# sourceMappingURL=input-multitoggle.component.js.map