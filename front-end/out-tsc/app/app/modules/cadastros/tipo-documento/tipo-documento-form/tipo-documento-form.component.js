import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoDocumentoFormComponent = class TipoDocumentoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoDocumento, TipoDocumentoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Documento") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            entregavel: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoDocumento());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoDocumento = this.util.fill(new TipoDocumento(), this.entity);
            resolve(this.util.fillForm(tipoDocumento, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoDocumentoFormComponent.prototype, "editableForm", void 0);
TipoDocumentoFormComponent = __decorate([
    Component({
        selector: 'app-tipo-documento-form',
        templateUrl: './tipo-documento-form.component.html',
        styleUrls: ['./tipo-documento-form.component.scss'],
        standalone: false
    })
], TipoDocumentoFormComponent);
export { TipoDocumentoFormComponent };
//# sourceMappingURL=tipo-documento-form.component.js.map