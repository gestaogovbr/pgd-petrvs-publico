import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let DocumentosAssinarComponent = class DocumentosAssinarComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.textoConfirmar = "confirmo";
        this.documentos = [];
        this.TIPO_ASSINATURA = [
            { key: "ELETRONICA", value: "Assinatura Eletrônica" },
            { key: "DIGITAL", value: "Assinatura Digital" }
        ];
        this.isProcessandoClique = false;
        this.validate = (control, controlName) => {
            let result = null;
            if (this.form?.controls.tipo.value == "ELETRONICA" && controlName == "confirmacao" && control.value.toLowerCase() != this.textoConfirmar.toLowerCase()) {
                result = "Valor deverá ser " + this.textoConfirmar;
            }
            else if (this.form?.controls.tipo.value == "DIGITAL" && controlName == "certificado_id" && !control.value?.length) {
                result = "Obrigatório selecionar um certificado";
            }
            return result;
        };
        this.documentoDao = injector.get(DocumentoDaoService);
        this.modalWidth = 450;
        this.form = this.fh.FormBuilder({
            tipo: { default: "ELETRONICA" },
            confirmacao: { default: "" },
            certificado_id: { default: null }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        this.documentos = this.metadata?.documentos;
    }
    async onAssinarClick() {
        if (this.isProcessandoClique)
            return;
        this.isProcessandoClique = true;
        this.dialog.showSppinerOverlay("Assinando . . .");
        try {
            let response = await this.documentoDao.assinar(this.documentos.map(x => x.id));
            response?.forEach(atualizado => {
                const documento = this.documentos.find(x => x.id == atualizado.id);
                if (documento)
                    documento.assinaturas = atualizado.assinaturas;
            });
            this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
            this.close();
        }
        catch (error) {
            this.error(error?.error.message || error?.message || error || "Erro desconhecido");
        }
        finally {
            this.dialog.closeSppinerOverlay();
            this.isProcessandoClique = false;
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], DocumentosAssinarComponent.prototype, "editableForm", void 0);
DocumentosAssinarComponent = __decorate([
    Component({
        selector: 'app-assinar',
        templateUrl: './documentos-assinar.component.html',
        styleUrls: ['./documentos-assinar.component.scss'],
        standalone: false
    })
], DocumentosAssinarComponent);
export { DocumentosAssinarComponent };
//# sourceMappingURL=documentos-assinar.component.js.map