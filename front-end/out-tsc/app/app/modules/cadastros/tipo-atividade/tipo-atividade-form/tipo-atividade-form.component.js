import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoAtividadeFormComponent = class TipoAtividadeFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoAtividade, TipoAtividadeDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length)
                result = "Obrigatório";
            /*else if(['esforco'].indexOf(controlName) >= 0 && !control.value) {
              result = "Valor não pode ser zero.";
            }*/
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Atividade") + ': ' + (entity?.nome || "");
        };
        this.title = this.lex.translate("Tipo de Atividade");
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            esforco: { default: 48 },
            dias_planejado: { default: "" },
            etiquetas: { default: [] },
            checklist: { default: [] },
            comentario: { default: "" },
            etiqueta_texto: { default: "" },
            etiqueta_icone: { default: null },
            etiqueta_cor: { default: null },
            checklist_texto: { default: "" },
        }, this.cdRef, this.validate);
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
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new TipoAtividade();
        this.loadData(this.entity, form);
    }
    async saveData(form) {
        let tipoAtividade = this.util.fill(new TipoAtividade(), this.entity);
        return this.util.fillForm(tipoAtividade, this.form.value);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoAtividadeFormComponent.prototype, "editableForm", void 0);
TipoAtividadeFormComponent = __decorate([
    Component({
        selector: 'app-tipo-atividade-form',
        templateUrl: './tipo-atividade-form.component.html',
        styleUrls: ['./tipo-atividade-form.component.scss'],
        standalone: false
    })
], TipoAtividadeFormComponent);
export { TipoAtividadeFormComponent };
//# sourceMappingURL=tipo-atividade-form.component.js.map