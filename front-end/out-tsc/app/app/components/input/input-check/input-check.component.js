import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputCheckComponent = class InputCheckComponent extends InputBase {
    set value(value) {
        if (value != this._value) {
            this._value = value;
            this.updateValue();
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
        this.inline = false;
        this._value = "";
    }
    ngOnInit() {
        super.ngOnInit();
    }
    updateValue() {
        this.detectChanges();
        for (let item of this.items) {
            const element = document.getElementById(this.controlName + item.key);
            if (element)
                element.checked = (this.value || []).includes(item.key);
        }
    }
    onCheckChange(event) {
        const target = event.target;
        const selected = this.items.find(x => x.key.toString() == target.value);
        let list = this.control?.value || [];
        if (target.checked && !list.includes(target.value) && selected) {
            list.push(selected.key);
        }
        else if (!target.checked) {
            const index = list.findIndex((x) => x.toString() == target.value);
            if (index >= 0)
                list.splice(index, 1);
        }
        this.control?.setValue(list);
        if (this.change)
            this.change(selected?.key);
    }
    isChecked(item) {
        return (this.value || []).includes(item.key) ? "" : undefined;
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
], InputCheckComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "items", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "inline", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputCheckComponent.prototype, "value", null);
__decorate([
    Input()
], InputCheckComponent.prototype, "control", null);
__decorate([
    Input()
], InputCheckComponent.prototype, "size", null);
InputCheckComponent = __decorate([
    Component({
        selector: 'input-check',
        templateUrl: './input-check.component.html',
        styleUrls: ['./input-check.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputCheckComponent);
export { InputCheckComponent };
//# sourceMappingURL=input-check.component.js.map