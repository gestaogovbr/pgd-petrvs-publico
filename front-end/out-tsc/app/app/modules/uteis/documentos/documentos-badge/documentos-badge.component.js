import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DocumentosBadgeComponent = class DocumentosBadgeComponent {
    constructor(documentoService) {
        this.documentoService = documentoService;
        this.color = "light";
    }
    get show() {
        return (this.isOnlyLink && (this.isLinkSei || this.isLinkUrl)) || (!this.isOnlyLink && (!!this.documento || !!this.emptyMessage?.length));
    }
    get icon() {
        return this.isLinkUrl ? "bi bi-link-45deg" :
            this.isLinkSei ? (this.documento?.link?.numero_processo?.length ? 'bi bi-folder-symlink' : 'bi bi-x-lg') :
                this.isPdf ? "bi bi-file-earmark-pdf" : "bi bi-filetype-html";
    }
    get linkIcon() {
        return this.documento?.link?.tipo == "SEI" ? (this.documento?.link?.numero_processo?.length ? 'bi bi-folder-symlink' : 'bi bi-x-lg') : "bi bi-link-45deg";
    }
    get hasLink() {
        return ["SEI", "URL"].includes(this.documento?.link?.tipo || "");
    }
    get isLinkSei() {
        return this.documento?.tipo == "LINK" && this.documento?.link?.tipo == "SEI";
    }
    get isLinkUrl() {
        return this.documento?.tipo == "LINK" && this.documento?.link?.tipo == "URL";
    }
    get isHtml() {
        return this.documento?.tipo == "HTML";
    }
    get isPdf() {
        return this.documento?.tipo == "PDF";
    }
    get isSignatures() {
        return this.signatures != undefined;
    }
    get isNoRounded() {
        return this.noRounded != undefined;
    }
    get isWithLink() {
        return this.withLink != undefined;
    }
    get isOnlyLink() {
        return this.onlyLink != undefined;
    }
};
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "documento", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "emptyMessage", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "signatures", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "maxWidth", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "noRounded", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "withLink", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "onlyLink", void 0);
__decorate([
    Input()
], DocumentosBadgeComponent.prototype, "color", void 0);
DocumentosBadgeComponent = __decorate([
    Component({
        selector: 'documentos-badge',
        templateUrl: './documentos-badge.component.html',
        styleUrls: ['./documentos-badge.component.scss'],
        standalone: false
    })
], DocumentosBadgeComponent);
export { DocumentosBadgeComponent };
//# sourceMappingURL=documentos-badge.component.js.map