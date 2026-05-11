import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoJustificativa } from 'src/app/models/tipo-justificativa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoJustificativaFormComponent = class TipoJustificativaFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoJustificativa, TipoJustificativaDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Justificativa") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoJustificativa());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoJustificativa = this.util.fill(new TipoJustificativa(), this.entity);
            resolve(this.util.fillForm(tipoJustificativa, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoJustificativaFormComponent.prototype, "editableForm", void 0);
TipoJustificativaFormComponent = __decorate([
    Component({
        selector: 'app-entidade-form',
        templateUrl: './tipo-justificativa-form.component.html',
        styleUrls: ['./tipo-justificativa-form.component.scss'],
        standalone: false
    })
], TipoJustificativaFormComponent);
export { TipoJustificativaFormComponent };
//# sourceMappingURL=tipo-justificativa-form.component.js.map