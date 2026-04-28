import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoProcessoFormComponent = class TipoProcessoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoProcesso, TipoProcessoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'codigo'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Processo") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            codigo: { default: "" },
            etiquetas: { default: [] },
            checklist: { default: [] },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            checklist_texto: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoProcesso());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoProcesso = this.util.fill(new TipoProcesso(), this.entity);
            resolve(this.util.fillForm(tipoProcesso, this.form.value));
        });
    }
    addItemHandleChecklist() {
        let result = undefined;
        const value = this.form.controls.checklist_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.checklist.value, key)) {
            result = {
                key: key,
                value: this.form.controls.checklist_texto.value
            };
            this.form.controls.checklist_texto.setValue("");
        }
        return result;
    }
    ;
    addItemHandleEtiquetas() {
        let result = undefined;
        const value = this.form.controls.etiqueta_texto.value;
        const key = this.util.textHash(value);
        if (value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
            result = {
                key: key,
                value: this.form.controls.etiqueta_texto.value,
                color: this.form.controls.etiqueta_cor.value,
                icon: this.form.controls.etiqueta_icone.value
            };
            this.form.controls.etiqueta_texto.setValue("");
            this.form.controls.etiqueta_icone.setValue(null);
            this.form.controls.etiqueta_cor.setValue(null);
        }
        return result;
    }
    ;
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoProcessoFormComponent.prototype, "editableForm", void 0);
TipoProcessoFormComponent = __decorate([
    Component({
        selector: 'app-tipo-processo-form',
        templateUrl: './tipo-processo-form.component.html',
        styleUrls: ['./tipo-processo-form.component.scss'],
        standalone: false
    })
], TipoProcessoFormComponent);
export { TipoProcessoFormComponent };
//# sourceMappingURL=tipo-processo-form.component.js.map