import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
import { Envio } from 'src/app/models/envio.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let EnvioConsultComponent = class EnvioConsultComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Envio, EnvioDaoService);
        this.injector = injector;
        this.form = this.fh.FormBuilder({
            erros: { default: "" },
            created_at: { default: null },
            finished_at: { default: null }
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
        form.patchValue(new Envio());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const envio = this.util.fill(new Envio(), this.entity);
            resolve(this.util.fillForm(envio, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EnvioConsultComponent.prototype, "editableForm", void 0);
EnvioConsultComponent = __decorate([
    Component({
        selector: 'envio-consult',
        templateUrl: './envio-consult.component.html',
        styleUrls: ['./envio-consult.component.scss'],
        standalone: false
    })
], EnvioConsultComponent);
export { EnvioConsultComponent };
//# sourceMappingURL=envio-consult.component.js.map