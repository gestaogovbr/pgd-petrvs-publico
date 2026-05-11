import { __decorate } from "tslib";
import { TipoCliente } from "src/app/models/tipo-cliente.model";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoClienteDaoService } from "src/app/dao/tipo-cliente-dao.service";
let TipoClienteFormComponent = class TipoClienteFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoCliente, TipoClienteDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" }
        }, this.cdRef, this.validate);
        this.title = "Tipo de Cliente";
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoCliente());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoCliente = this.util.fill(new TipoCliente(), this.entity);
            resolve(this.util.fillForm(tipoCliente, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoClienteFormComponent.prototype, "editableForm", void 0);
TipoClienteFormComponent = __decorate([
    Component({
        selector: 'app-tipo-cliente-form',
        templateUrl: './tipo-cliente-form.component.html',
        styleUrls: ['./tipo-cliente-form.component.scss'],
        standalone: false
    })
], TipoClienteFormComponent);
export { TipoClienteFormComponent };
//# sourceMappingURL=tipo-cliente-form.component.js.map