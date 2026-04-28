import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputTextComponent = class InputTextComponent extends InputBase {
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
        this.blur = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "bi bi-textarea-t";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.loading = false;
        this.textCase = "";
        this.maxLength = 250;
        this.maskDropSpecialCharacters = false;
        this.maskSpecialCharacters = ["-", "/", "(", ")", ".", ":", " ", "+", ",", "@", "[", "]", '"', "'"];
    }
    get isNumbers() {
        return this.numbers !== undefined;
    }
    get isRight() {
        return this.right !== undefined;
    }
    get isPassword() {
        return this.password !== undefined;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    onChange(event) {
        if (this.change)
            this.change.emit(event);
    }
    onBlur(event) {
        if (this.blur)
            this.blur.emit(event);
    }
    onKeyUp(event) {
        let inputValue = this.inputElement.nativeElement.value;
        if (this.buffer != inputValue) {
            this.buffer = inputValue;
            if (this.change)
                this.change.emit(event);
        }
    }
};
__decorate([
    HostBinding('class')
], InputTextComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputTextComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputTextComponent.prototype, "change", void 0);
__decorate([
    Output()
], InputTextComponent.prototype, "blur", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "numbers", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "password", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "textCase", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "minValue", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "maxValue", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "stepValue", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "prefix", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "sufix", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "maxLength", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "maskFormat", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "right", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "maskDropSpecialCharacters", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "maskSpecialCharacters", void 0);
__decorate([
    Input()
], InputTextComponent.prototype, "control", null);
__decorate([
    Input()
], InputTextComponent.prototype, "size", null);
InputTextComponent = __decorate([
    Component({
        selector: 'input-text',
        templateUrl: './input-text.component.html',
        styleUrls: ['./input-text.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputTextComponent);
export { InputTextComponent };
//# sourceMappingURL=input-text.component.js.map