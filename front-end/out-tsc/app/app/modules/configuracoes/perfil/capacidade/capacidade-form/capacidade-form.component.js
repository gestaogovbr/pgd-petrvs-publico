import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CapacidadeDaoService } from 'src/app/dao/capacidade-dao.service';
import { Capacidade } from 'src/app/models/capacidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
let CapacidadeFormComponent = class CapacidadeFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Capacidade, CapacidadeDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['perfil_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Capacidade") + ': ' + (entity?.perfil?.nome || "") + ': ' + (entity?.tipo_capacidade?.codigo || "");
        };
        this.tipoCapacidadeDao = injector.get(TipoCapacidadeDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        this.form = this.fh.FormBuilder({
            perfil_id: { default: "" },
            tipo_capacidade_id: { default: "" }
        }, this.cdRef, this.validate);
        this.join = ["tipo_capacidade"];
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        await Promise.all([
            this.tipoCapacidade.loadSearch(entity.tipo_capacidade || entity.tipo_capacidade_id)
        ]);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new Capacidade());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const capacidade = this.util.fill(new Capacidade(), this.entity);
            resolve(this.util.fillForm(capacidade, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], CapacidadeFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('tipo_capacidade', { static: false })
], CapacidadeFormComponent.prototype, "tipoCapacidade", void 0);
CapacidadeFormComponent = __decorate([
    Component({
        selector: 'app-capacidade-form',
        templateUrl: './capacidade-form.component.html',
        styleUrls: ['./capacidade-form.component.scss'],
        standalone: false
    })
], CapacidadeFormComponent);
export { CapacidadeFormComponent };
//# sourceMappingURL=capacidade-form.component.js.map