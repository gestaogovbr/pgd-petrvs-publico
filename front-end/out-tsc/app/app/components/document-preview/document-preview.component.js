import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DocumentPreviewComponent = class DocumentPreviewComponent {
    constructor() { }
    ngOnInit() {
    }
    get isNoMargin() {
        return this.noMargin != undefined;
    }
};
__decorate([
    Input()
], DocumentPreviewComponent.prototype, "html", void 0);
__decorate([
    Input()
], DocumentPreviewComponent.prototype, "emptyDocumentMensage", void 0);
__decorate([
    Input()
], DocumentPreviewComponent.prototype, "noMargin", void 0);
DocumentPreviewComponent = __decorate([
    Component({
        selector: 'document-preview',
        templateUrl: './document-preview.component.html',
        styleUrls: ['./document-preview.component.scss'],
        standalone: false
    })
], DocumentPreviewComponent);
export { DocumentPreviewComponent };
//# sourceMappingURL=document-preview.component.js.map