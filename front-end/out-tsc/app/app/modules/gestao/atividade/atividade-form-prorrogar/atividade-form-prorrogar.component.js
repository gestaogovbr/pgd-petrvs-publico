import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let AtividadeFormProrrogarComponent = class AtividadeFormProrrogarComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Atividade, AtividadeDaoService);
        this.injector = injector;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "data_estipulada_entrega") {
                if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (this.entity?.data_distribuicao && control.value.getTime() < this.entity.data_distribuicao.getTime()) {
                    result = "Menor que distribuição!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            data_distribuicao: { default: new Date() },
            data_estipulada_entrega: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        let formValue = {
            data_distribuicao: entity.data_distribuicao,
            data_estipulada_entrega: entity.data_estipulada_entrega
        };
        if (entity.unidade_id != this.auth.unidade.id) {
            await this.auth.selecionaUnidade(entity.unidade_id, undefined);
        }
        form.patchValue(formValue);
    }
    async initializeData(form) {
        this.entity = (await this.dao.getAtividade(this.urlParams.get("id")));
        await this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let prorrogar = {
                id: this.entity.id,
                data_estipulada_entrega: this.form.controls.data_estipulada_entrega.value
            };
            this.dao.prorrogar(prorrogar).then(saved => resolve(saved)).catch(reject);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AtividadeFormProrrogarComponent.prototype, "editableForm", void 0);
AtividadeFormProrrogarComponent = __decorate([
    Component({
        selector: 'app-atividade-form-prorrogar',
        templateUrl: './atividade-form-prorrogar.component.html',
        styleUrls: ['./atividade-form-prorrogar.component.scss'],
        standalone: false
    })
], AtividadeFormProrrogarComponent);
export { AtividadeFormProrrogarComponent };
//# sourceMappingURL=atividade-form-prorrogar.component.js.map