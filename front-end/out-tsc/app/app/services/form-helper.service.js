import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let FormHelperService = class FormHelperService {
    get fb() { this._fb = this._fb || this.injector.get(FormBuilder); return this._fb; }
    ;
    constructor(injector) {
        this.injector = injector;
    }
    FormBuilder(fields, cdRef, validate, asyncValidate) {
        let result = {};
        let initialState = {};
        Object.entries(fields).forEach(([key, value]) => {
            const validation = value.async ? { asyncValidators: this.asyncValidate(key, cdRef, asyncValidate), updateOn: "blur" } : this.validate(key, cdRef, validate);
            result[key] = [value.default, validation];
            initialState[key] = value.default;
            if (value.values) {
                value.values.forEach(item => {
                    const itemValidation = value.async ? { asyncValidators: this.asyncValidate(key + "$" + item.key, cdRef, asyncValidate), updateOn: "blur" } : this.validate(key + "$" + item.key, cdRef, validate);
                    result[key + "$" + item.key] = [value.default.indexOf(item.key) >= 0, itemValidation];
                });
            }
        });
        return Object.assign(this.fb.group(result), { initialState });
    }
    validate(controlName, cdRef, validate) {
        return (control) => {
            let result = validate ? validate(control, controlName) : null;
            cdRef?.markForCheck();
            return !result ? null : { errorMessage: result };
        };
    }
    revalidate(form) {
        form.markAllAsTouched();
        Object.values(form.controls || {}).forEach(x => x.updateValueAndValidity({ emitEvent: false }));
    }
    asyncValidate(controlName, cdRef, asyncValidate) {
        return (control) => {
            return new Promise((resolve, reject) => {
                if (asyncValidate) {
                    asyncValidate(control, controlName).then(result => {
                        cdRef?.markForCheck();
                        resolve(!result ? null : { errorMessage: result });
                    });
                }
                else {
                    resolve(null);
                }
            });
        };
    }
};
FormHelperService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FormHelperService);
export { FormHelperService };
//# sourceMappingURL=form-helper.service.js.map