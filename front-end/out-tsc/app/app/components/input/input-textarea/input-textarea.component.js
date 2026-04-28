import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputTextareaComponent = class InputTextareaComponent extends InputBase {
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
        this.icon = "bi bi-textarea";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.loading = false;
        this.textCase = "";
        this.rows = 0;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    onChange(event) {
        if (this.change)
            this.change.emit(event);
    }
};
__decorate([
    HostBinding('class')
], InputTextareaComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputTextareaComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputTextareaComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "textCase", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "rows", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputTextareaComponent.prototype, "control", null);
__decorate([
    Input()
], InputTextareaComponent.prototype, "size", null);
InputTextareaComponent = __decorate([
    Component({
        selector: 'input-textarea',
        templateUrl: './input-textarea.component.html',
        styleUrls: ['./input-textarea.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputTextareaComponent);
export { InputTextareaComponent };
//# sourceMappingURL=input-textarea.component.js.map