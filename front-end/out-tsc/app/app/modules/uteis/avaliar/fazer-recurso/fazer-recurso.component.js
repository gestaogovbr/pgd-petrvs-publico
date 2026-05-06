import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NavigateResult } from 'src/app/services/navigate.service';
let FazerRecursoComponent = class FazerRecursoComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Avaliacao, AvaliacaoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == 'recurso' && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            recurso: { default: "" },
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        console.log(this.metadata);
        await this.dao.getById(entity.id);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async initializeData(form) {
        this.avaliacao = this.metadata?.avaliacao;
        if (!this.avaliacao) {
            this.go.back();
            return;
        }
        this.form.patchValue(this.util.fillForm(form.value, this.avaliacao));
    }
    async saveData(form) {
        await this.dao.recorrer(this.avaliacao, form.recurso);
        return new NavigateResult(this.avaliacao);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], FazerRecursoComponent.prototype, "editableForm", void 0);
FazerRecursoComponent = __decorate([
    Component({
        selector: 'app-fazer-recurso',
        standalone: false,
        templateUrl: './fazer-recurso.component.html',
        styleUrl: './fazer-recurso.component.scss'
    })
], FazerRecursoComponent);
export { FazerRecursoComponent };
//# sourceMappingURL=fazer-recurso.component.js.map