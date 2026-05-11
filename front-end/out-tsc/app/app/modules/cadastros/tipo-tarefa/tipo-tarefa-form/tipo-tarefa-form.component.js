import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { TipoTarefa } from 'src/app/models/tipo-tarefa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoTarefaFormComponent = class TipoTarefaFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoTarefa, TipoTarefaDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Tarefa") + ': ' + (entity?.nome || "");
        };
        this.modalWidth = 800;
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            tempo_estimado: { default: 0 },
            documental: { default: false },
            comentario_predefinido: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoTarefa());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tarefa = this.util.fill(new TipoTarefa(), this.entity);
            resolve(this.util.fillForm(tarefa, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoTarefaFormComponent.prototype, "editableForm", void 0);
TipoTarefaFormComponent = __decorate([
    Component({
        selector: 'tipo-tarefa-form',
        templateUrl: './tipo-tarefa-form.component.html',
        styleUrls: ['./tipo-tarefa-form.component.scss'],
        standalone: false
    })
], TipoTarefaFormComponent);
export { TipoTarefaFormComponent };
//# sourceMappingURL=tipo-tarefa-form.component.js.map