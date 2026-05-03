import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { Cidade } from 'src/app/models/cidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let CidadeFormComponent = class CidadeFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Cidade, CidadeDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (['timezone'].indexOf(controlName) >= 0 && !control.value) {
                result = "Valor não pode ser zero.";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Cidade") + ': ' + (entity?.nome || "");
        };
        this.form = this.fh.FormBuilder({
            codigo_ibge: { default: "" },
            nome: { default: "" },
            tipo: { default: "" },
            uf: { default: "" },
            timezone: { default: "" }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new Cidade());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const cidade = this.util.fill(new Cidade(), this.entity);
            resolve(this.util.fillForm(cidade, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], CidadeFormComponent.prototype, "editableForm", void 0);
CidadeFormComponent = __decorate([
    Component({
        selector: 'app-cidade-form',
        templateUrl: './cidade-form.component.html',
        styleUrls: ['./cidade-form.component.scss'],
        standalone: false
    })
], CidadeFormComponent);
export { CidadeFormComponent };
//# sourceMappingURL=cidade-form.component.js.map