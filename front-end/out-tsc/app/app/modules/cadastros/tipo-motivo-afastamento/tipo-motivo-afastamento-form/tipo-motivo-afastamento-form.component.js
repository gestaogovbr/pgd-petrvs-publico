import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoMotivoAfastamento } from 'src/app/models/tipo-motivo-afastamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let TipoMotivoAfastamentoFormComponent = class TipoMotivoAfastamentoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (['integracao'].indexOf(controlName) >= 0 && control.value == 1) {
                result = "A integração é feita automaticamente.";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Tipo de Motivo de Afastamento") + ': ' + (entity?.nome || "");
        };
        this.title = this.lex.translate("Motivos de Afastamento");
        this.form = this.fh.FormBuilder({
            codigo: { default: null },
            nome: { default: "" },
            sigla: { default: "" },
            icone: { default: "" },
            situacao: { default: "S" },
            calculo: { default: this.lookup.CALCULO[0].value },
            cor: { default: "" },
            horas: { default: 0 },
            data_inicio: { default: Date.now() },
            data_fim: { default: Date.now() },
            integracao: { default: 0 }
        }, this.cdRef, this.validate);
    }
    checkIntegracao() {
        const enable = !this.form?.controls.integracao.value;
        if (enable && this.form?.controls.codigo.value != null) {
            this.form?.controls.codigo.setValue(null);
            this.cdRef.markForCheck();
        }
        return enable ? 'disable' : undefined;
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new TipoMotivoAfastamento());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const tipoMotivoAfastamento = this.util.fill(new TipoMotivoAfastamento(), this.entity);
            resolve(this.util.fillForm(tipoMotivoAfastamento, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], TipoMotivoAfastamentoFormComponent.prototype, "editableForm", void 0);
TipoMotivoAfastamentoFormComponent = __decorate([
    Component({
        selector: 'app-tipo-motivo-afastamento-form',
        templateUrl: './tipo-motivo-afastamento-form.component.html',
        styleUrls: ['./tipo-motivo-afastamento-form.component.scss'],
        standalone: false
    })
], TipoMotivoAfastamentoFormComponent);
export { TipoMotivoAfastamentoFormComponent };
//# sourceMappingURL=tipo-motivo-afastamento-form.component.js.map