import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { Feriado } from 'src/app/models/feriado.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
let FeriadoFormComponent = class FeriadoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Feriado, FeriadoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (controlName == "ano" && this.form?.controls.recorrente.value == 0 && !this.util.between(parseInt(control.value || 0), { start: 2000, end: 2100 })) {
                result = "Inválido";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Feriado") + ': ' + (entity?.nome || "");
        };
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.cidadeDao = injector.get(CidadeDaoService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            dia: { default: "" },
            mes: { default: "" },
            ano: { default: null },
            recorrente: { default: 1 },
            abrangencia: { default: "NACIONAL" },
            codigo_ibge: { default: null },
            cidade_id: { default: null },
            uf: { default: null },
            entidade_id: { default: null },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() }
        }, this.cdRef, this.validate);
        this.join = ["cidade", "entidade"];
    }
    checkAnoDisabled() {
        const enable = !this.form?.controls.recorrente.value;
        if (!enable && this.form?.controls.ano.value != null) {
            this.form?.controls.ano.setValue(null);
            this.cdRef.markForCheck();
        }
        return !enable ? 'true' : undefined;
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        let feriado = (this.util.fillForm(formValue, entity));
        await Promise.all([
            this.cidade?.loadSearch(entity.cidade || entity.cidade_id),
            this.entidade.loadSearch(entity.entidade || entity.entidade_id)
        ]);
        form.patchValue(feriado);
    }
    initializeData(form) {
        this.loadData(new Feriado(), form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let feriado = this.util.fill(new Feriado(), this.entity);
            feriado = this.util.fillForm(feriado, this.form.value);
            if (feriado.abrangencia == "MUNICIPAL" && this.cidade?.selectedEntity) {
                feriado.codigo_ibge = (this.cidade?.selectedEntity).codigo_ibge;
            }
            else if (feriado.abrangencia == "ESTADUAL") {
                feriado.codigo_ibge = this.lookup.UF.find(x => x.key == feriado.uf)?.code;
            }
            else {
                feriado.codigo_ibge = null;
            }
            resolve(feriado);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], FeriadoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('cidade', { static: false })
], FeriadoFormComponent.prototype, "cidade", void 0);
__decorate([
    ViewChild('entidade', { static: false })
], FeriadoFormComponent.prototype, "entidade", void 0);
FeriadoFormComponent = __decorate([
    Component({
        selector: 'app-feriado-form',
        templateUrl: './feriado-form.component.html',
        styleUrls: ['./feriado-form.component.scss'],
        standalone: false
    })
], FeriadoFormComponent);
export { FeriadoFormComponent };
//# sourceMappingURL=feriado-form.component.js.map