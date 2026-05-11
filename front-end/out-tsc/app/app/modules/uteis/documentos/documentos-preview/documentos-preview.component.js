import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let DocumentosPreviewComponent = class DocumentosPreviewComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.documentoSalvo = false;
        this.buttons = [
            { icon: "bi bi-floppy", hint: "Salvar documento", color: "btn-outline-info border-0", onClick: () => this.salvarParaUsuario(), id: 'salvarDocumento' },
            { icon: "bi bi-printer", hint: "Imprimir", color: "btn-outline-secondary border-0", onClick: () => this.imprimir() },
            { icon: "bi bi-envelope-at", hint: "Enviar E-mail", color: "btn-outline-warning border-0" },
            { icon: "bi bi-file-earmark-pdf", hint: "Exportar PDF", color: "btn-outline-danger border-0", onClick: () => this.geraPDF() },
            { icon: "bi bi-whatsapp", hint: "Enviar WhatsApp", color: "btn-outline-success border-0" },
            { img: "assets/images/sei_icon.png", hint: "Enviar SEI", color: "btn-outline-primary border-0" }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.documentoDao = injector.get(DocumentoDaoService);
        this.modalWidth = 1000;
        this.form = this.fh.FormBuilder({
            conteudo: { default: "" }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        (async () => {
            this.loading = true;
            try {
                this.documentoId = this.documentoId || this.metadata?.documentoId || this.urlParams?.get("documentoId");
                this.documento = this.documento || this.metadata?.documento || await this.dao.getById(this.documentoId);
                if (this.documento?.assinaturas?.length) {
                    let assinaturas = "<div style='display:block; '><br><hr><h5>Assinatura(s):</h5>";
                    this.documento?.assinaturas.forEach(assinatura => {
                        assinaturas += `<div class='mb-2'><p class="m-0"><b>${assinatura.usuario?.nome}</b></p><small>${this.util.getDateTimeFormatted(assinatura.data_assinatura)}<br>${assinatura.assinatura}</small></div>`;
                    });
                    assinaturas += "</div>";
                    if (!this.documento.conteudo?.includes(assinaturas))
                        this.documento.conteudo = this.documento.conteudo?.concat(assinaturas) || null;
                }
                this.cdRef.detectChanges();
            }
            finally {
                this.loading = false;
            }
        })();
    }
    salvarParaUsuario() {
        if (this.documento) {
            this.documentoDao.update(this.documento.id, { usuario_id: this.auth.usuario?.id }).then(doc => {
                this.documentoSalvo = true;
                const botaoSalvar = this.buttons.find(b => b.id == 'salvarDocumento');
                if (botaoSalvar)
                    botaoSalvar.disabled = true;
            });
        }
    }
    geraPDF() {
        if (this.documento) {
            this.documentoDao.gerarPDF(this.documento.id).then(res => {
            });
        }
    }
    imprimir() {
        window.print();
    }
};
__decorate([
    Input()
], DocumentosPreviewComponent.prototype, "documentoId", void 0);
__decorate([
    Input()
], DocumentosPreviewComponent.prototype, "documento", void 0);
DocumentosPreviewComponent = __decorate([
    Component({
        selector: 'documentos-preview',
        templateUrl: './documentos-preview.component.html',
        styleUrls: ['./documentos-preview.component.scss'],
        standalone: false
    })
], DocumentosPreviewComponent);
export { DocumentosPreviewComponent };
//# sourceMappingURL=documentos-preview.component.js.map