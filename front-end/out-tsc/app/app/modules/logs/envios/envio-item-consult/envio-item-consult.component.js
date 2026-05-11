import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioItemDaoService } from 'src/app/dao/envio-item-dao.service';
import { EnvioItem } from 'src/app/models/envio-item.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let EnvioItemConsultComponent = class EnvioItemConsultComponent extends PageFormBase {
    constructor(injector) {
        super(injector, EnvioItem, EnvioItemDaoService);
        this.injector = injector;
        this.form = this.fh.FormBuilder({
            tipo: { default: "" },
            uid: { default: "" },
            sucesso: { default: false },
            erros: { default: "" },
            created_at: { default: null },
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
        form.patchValue(new EnvioItem());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const envio = this.util.fill(new EnvioItem(), this.entity);
            resolve(this.util.fillForm(envio, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EnvioItemConsultComponent.prototype, "editableForm", void 0);
EnvioItemConsultComponent = __decorate([
    Component({
        selector: 'envio-item-consult',
        templateUrl: './envio-item-consult.component.html',
        styleUrls: ['./envio-item-consult.component.scss'],
        standalone: false
    })
], EnvioItemConsultComponent);
export { EnvioItemConsultComponent };
//# sourceMappingURL=envio-item-consult.component.js.map