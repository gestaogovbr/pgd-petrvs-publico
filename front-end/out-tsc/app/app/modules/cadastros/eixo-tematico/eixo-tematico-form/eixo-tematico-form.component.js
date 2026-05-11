import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let EixoTematicoFormComponent = class EixoTematicoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, EixoTematico, EixoTematicoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Eixo Temático") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            icone: { default: "" },
            cor: { default: "" },
            descricao: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new EixoTematico());
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            const eixo = this.util.fill(new EixoTematico(), this.entity);
            resolve(this.util.fillForm(eixo, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], EixoTematicoFormComponent.prototype, "editableForm", void 0);
EixoTematicoFormComponent = __decorate([
    Component({
        selector: 'app-eixo-tematico-form',
        templateUrl: './eixo-tematico-form.component.html',
        styleUrls: ['./eixo-tematico-form.component.scss'],
        standalone: false
    })
], EixoTematicoFormComponent);
export { EixoTematicoFormComponent };
//# sourceMappingURL=eixo-tematico-form.component.js.map