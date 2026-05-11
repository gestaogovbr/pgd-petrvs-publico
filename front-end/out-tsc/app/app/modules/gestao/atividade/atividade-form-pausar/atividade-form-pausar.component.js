import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
let AtividadeFormPausarComponent = class AtividadeFormPausarComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Atividade, AtividadeDaoService);
        this.injector = injector;
        this.reiniciar = false;
        this.modalWidth = 400;
        this.validate = (control, controlName) => {
            let result = null;
            let pausado = this.entity?.pausas?.find(x => !x.data_fim);
            if (controlName == "data") {
                if (this.reiniciar && !pausado) {
                    result = "Não á pausa!";
                }
                else if (!this.util.isDataValid(control.value)) {
                    result = "Obrigatório";
                }
                else if (pausado && this.entity && control.value.getTime() < this.entity.data_inicio.getTime()) {
                    result = "Menor que início!";
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            data_inicio: { default: undefined },
            data: { default: new Date() }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        this.reiniciar = !!this.queryParams?.reiniciar;
        this.title = this.reiniciar ? "Reiniciar" : "Suspender";
        super.ngAfterViewInit();
    }
    async loadData(entity, form) {
        //this.reiniciar = !!this.queryParams?.reiniciar;
        let pausado = this.entity?.pausas?.find(x => !x.data_fim);
        if (this.reiniciar && !pausado) {
            this.error("Não há pausa ativa para ser reiniciada.");
        }
        let formValue = {
            inicio: this.reiniciar ? pausado?.data_inicio : undefined,
            data: this.util.setStrTime(new Date(), this.auth.unidadeHora)
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
            let pausa = {
                atividade_id: this.entity.id,
                data: this.form.controls.data.value
            };
            if (this.reiniciar) {
                this.dao.reiniciar(pausa).then(saved => resolve(saved)).catch(reject);
            }
            else {
                this.dao.pausar(pausa).then(saved => resolve(saved)).catch(reject);
            }
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], AtividadeFormPausarComponent.prototype, "editableForm", void 0);
AtividadeFormPausarComponent = __decorate([
    Component({
        selector: 'app-atividade-form-pausar',
        templateUrl: './atividade-form-pausar.component.html',
        styleUrls: ['./atividade-form-pausar.component.scss'],
        standalone: false
    })
], AtividadeFormPausarComponent);
export { AtividadeFormPausarComponent };
//# sourceMappingURL=atividade-form-pausar.component.js.map