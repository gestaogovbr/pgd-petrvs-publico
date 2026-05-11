import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroupDirective } from "@angular/forms";
import { ComponentBase } from "../component-base";
let InputBase = class InputBase extends ComponentBase {
    getValue() {
        const value = this.source && this.path ? this.util.getNested(this.source, this.path) : this._value;
        return value;
    }
    setValue(value) {
        if (this.source && this.path) {
            this.util.setNested(this.source, this.path, value);
        }
        else {
            this._value = value;
        }
    }
    getSize() {
        return this._size;
    }
    setSize(size) {
        if (size != this._size) {
            this._size = size;
            this.class = this.class.replace(/col\-md\-[0-9]+/g, "col-md-" + size);
        }
    }
    focus() {
        setTimeout(() => {
            document.getElementById(this.inputElement?.nativeElement.id)?.focus();
        }, 1000);
    }
    onEnterKeyDown(e) {
        e.preventDefault();
        let current = e.srcElement;
        const elements = document.querySelectorAll('input,select,button,textarea');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] == current) {
                const next = elements[i + 1];
                if (next) {
                    if (next.focus) {
                        next.focus();
                        break;
                    }
                    else {
                        current = next;
                    }
                }
            }
        }
        console.log("Enter");
        //@ ts-ignore
        //e.srcElement?.nextElementSibling?.focus();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.JSON = JSON;
        this.validators = [];
        this._fakeControl = new FormControl();
        this._size = 12;
        this.fb = injector.get(FormBuilder);
    }
    ngOnInit() {
        if (this.size > 0)
            this.class += " " + this.hostClass + " col-md-" + this.size;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        try {
            this.formDirective = this.injector.get(FormGroupDirective);
        }
        catch { }
        this.form = this.form || this.formDirective?.form;
        if (this.isRequired) {
            this.validators.push(this.requiredValidator.bind(this));
            if (this.control.validator)
                this.validators.push(this.control.validator);
            this.control.setValidators(this.proxyValidator.bind(this));
            this.control?.updateValueAndValidity();
        }
        this.cdRef.detectChanges();
    }
    proxyValidator(control) {
        for (let validator of this.validators) {
            let result = validator(control);
            if (result)
                return result;
        }
        return null;
    }
    requiredValidator(control) {
        return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
    }
    get isDisabled() {
        return this.disabled != undefined;
    }
    get isRequired() {
        return this.required != undefined;
    }
    get formControl() {
        return this.getControl() || this._fakeControl;
    }
    getControl() {
        return this._control || (this.controlName?.length && this.form ? this.form.controls[this.controlName] : undefined);
    }
    isInvalid() {
        return this.isDisabled ? false : !this.control ? true : this.control.invalid && (this.control.dirty || this.control.touched);
    }
    hasError() {
        return !this.control || this.isDisabled ? false : !!this.control?.errors;
    }
    errorMessage() {
        return this.control.errors?.errorMessage;
    }
};
InputBase = __decorate([
    Injectable()
], InputBase);
export { InputBase };
//# sourceMappingURL=input-base.js.map