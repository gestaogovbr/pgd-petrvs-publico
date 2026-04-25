import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { PageFormBase } from "../../../base/page-form-base";
import { CadeiaValor } from "../../../../models/cadeia-valor.model";
import { CadeiaValorDaoService } from "../../../../dao/cadeia-valor-dao.service";
import { EditableFormComponent } from "../../../../components/editable-form/editable-form.component";
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
let CadeiaValorFormComponent = class CadeiaValorFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, CadeiaValor, CadeiaValorDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = (form) => {
            let result = null;
            if (this.form.controls.data_fim.value && this.form.controls.data_inicio.value > this.form.controls.data_fim.value) {
                return "A data do início não pode ser maior que a data do fim!";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Cadeia de Valor") + ': ' + (entity?.nome || "");
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.join = ['processos'];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: null },
            unidade_id: { default: "" },
            moveFilhos: { default: false }
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        this.entity = new CadeiaValor();
        this.loadData(this.entity, form);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            // this.processos!.grid!.confirm();
            let cadeiaValor = this.util.fill(new CadeiaValor(), this.entity);
            this.form.value.entidade_id = this.auth.entidade?.id;
            //this.form!.value.unidade_id = this.auth.unidade?.id
            cadeiaValor = this.util.fillForm(cadeiaValor, this.form.value);
            resolve(cadeiaValor);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], CadeiaValorFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('processos', { static: false })
], CadeiaValorFormComponent.prototype, "processos", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], CadeiaValorFormComponent.prototype, "unidade", void 0);
CadeiaValorFormComponent = __decorate([
    Component({
        selector: 'app-cadeia-valor-form',
        templateUrl: './cadeia-valor-form.component.html',
        styleUrls: ['./cadeia-valor-form.component.scss'],
        standalone: false
    })
], CadeiaValorFormComponent);
export { CadeiaValorFormComponent };
//# sourceMappingURL=cadeia-valor-form.component.js.map