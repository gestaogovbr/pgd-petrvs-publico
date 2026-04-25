import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { Entidade } from 'src/app/models/entidade.model';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
let PreferenciaFormPetrvsComponent = class PreferenciaFormPetrvsComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Entidade, EntidadeDaoService);
        this.injector = injector;
        this.carregando = false;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Preferência") + ' ' + this.lex.translate("da Entidade") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    }
    get isPanel() {
        return this.panel != undefined;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async initializeData(form) {
        this.carregando = true;
        try {
            this.entity = new Entidade();
            await this.loadData(this.entity, form);
        }
        finally {
            this.carregando = false;
        }
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            resolve(!this.isPanel);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PreferenciaFormPetrvsComponent.prototype, "editableForm", void 0);
__decorate([
    Input()
], PreferenciaFormPetrvsComponent.prototype, "panel", void 0);
PreferenciaFormPetrvsComponent = __decorate([
    Component({
        selector: 'preferencia-form-petrvs',
        templateUrl: './preferencia-form-petrvs.component.html',
        styleUrls: ['./preferencia-form-petrvs.component.scss'],
        standalone: false
    })
], PreferenciaFormPetrvsComponent);
export { PreferenciaFormPetrvsComponent };
//# sourceMappingURL=preferencia-form-petrvs.component.js.map