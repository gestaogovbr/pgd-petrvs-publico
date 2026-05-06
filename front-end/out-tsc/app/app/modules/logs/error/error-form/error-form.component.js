import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ErrorDaoService } from 'src/app/dao/error-dao.service';
import { Error } from 'src/app/models/error.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let ErrorFormComponent = class ErrorFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Error, ErrorDaoService);
        this.injector = injector;
        this.form = this.fh.FormBuilder({
            message: { default: "" },
            data: { default: "" },
            trace: { default: "" },
            user_id: { default: "" },
            user_email: { default: "" },
            user_nome: { default: "" },
            date_time: { default: null },
            type: { default: "" }
        }, this.cdRef);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new Error());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const error = this.util.fill(new Error(), this.entity);
            resolve(this.util.fillForm(error, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ErrorFormComponent.prototype, "editableForm", void 0);
ErrorFormComponent = __decorate([
    Component({
        selector: 'error-form',
        templateUrl: './error-form.component.html',
        styleUrls: ['./error-form.component.scss'],
        standalone: false
    })
], ErrorFormComponent);
export { ErrorFormComponent };
//# sourceMappingURL=error-form.component.js.map