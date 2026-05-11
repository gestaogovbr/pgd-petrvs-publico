import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { StatusService } from './status.service';
import { LookupService } from 'src/app/services/lookup.service';
let StatusFormComponent = class StatusFormComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.novoStatus = "";
        this.tipo = "";
        this._exigeJustificativa = false;
        this.validate = (control, controlName) => {
            let result = null;
            let valueLength = control.value?.trim().length;
            if (controlName == 'justificativa' && this._exigeJustificativa) {
                if (!valueLength)
                    result = "Obrigatório";
                else {
                    if (valueLength < this.MIN_LENGTH_TEXT)
                        result = "Texto muito curto. Mínimo: " + this.MIN_LENGTH_TEXT + " caracteres.";
                    if (valueLength > this.MAX_LENGTH_TEXT)
                        result = "Conteúdo (" + valueLength + " caracteres) excede o comprimento máximo: " + this.MAX_LENGTH_TEXT + ".";
                }
            }
            return result;
        };
        this.statusService = injector.get(StatusService);
        this.lookup = injector.get(LookupService);
        this.modalWidth = 450;
        this.form = this.fh.FormBuilder({
            justificativa: { default: '' },
            novo_status: { default: null }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        this.tipo = this.metadata?.tipo; //; || this.tipo;
        this.entity = this.metadata?.entity || this.entity;
        this._exigeJustificativa = this.metadata?.exigeJustificativa || this._exigeJustificativa;
        this.novoStatus = this.metadata?.novoStatus || this.novoStatus;
        if (this.novoStatus.length)
            this.form?.controls.novo_status?.setValue(this.novoStatus);
    }
    async onSubmitClick() {
        if (this.metadata.onClick) {
            this.loading = true;
            try {
                let response = await this.metadata.onClick(this.entity, this.form?.controls.justificativa.value);
                this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
                this.close();
            }
            catch (error) {
                this.error(error?.message || error?.error || error || "Erro desconhecido");
            }
            finally {
                this.loading = false;
            }
        }
    }
    /**
     * Com base no novo status pretendido para a entidade, obtém um array com os status de origem que exigem justificativa e por fim verifica-se
     * se o status atual é um deles.
     * @returns boolean
     */
    get exigeJustificativa() {
        if (this._exigeJustificativa)
            return true;
        let result = this.lookup.getData(this.statusService.getItem(this.tipo), this.form?.controls.novo_status?.value);
        this._exigeJustificativa = (result?.justificar || []).includes(this.entity?.status);
        return this._exigeJustificativa;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], StatusFormComponent.prototype, "editableForm", void 0);
StatusFormComponent = __decorate([
    Component({
        selector: 'app-status',
        templateUrl: './status-form.component.html',
        styleUrls: ['./status-form.component.scss'],
        standalone: false
    })
], StatusFormComponent);
export { StatusFormComponent };
//# sourceMappingURL=status-form.component.js.map