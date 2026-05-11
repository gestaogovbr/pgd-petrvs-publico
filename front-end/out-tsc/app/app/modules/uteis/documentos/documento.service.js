import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DocumentoService = class DocumentoService {
    constructor(dialog, templateService, documentoDao, go) {
        this.dialog = dialog;
        this.templateService = templateService;
        this.documentoDao = documentoDao;
        this.go = go;
    }
    /*public selectRoute(especie: TemplateEspecie): FullRoute {
      return {route: ['uteis', 'templates'], params: {filter: {especie}}};
    }*/
    preview(data) {
        const documento = data;
        this.go.navigate({ route: ['uteis', 'documentos', 'preview', documento.id] }, { metadata: { documento } });
        //this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, documento.conteudo!, []);
    }
    onLinkClick(link) {
        if (link?.tipo == "URL") {
            this.go.openNewTab(link?.url || "#");
        }
    }
    onDocumentoClick(documento) {
        if (documento.tipo == "LINK" && documento.link) {
            this.onLinkClick(documento.link);
        }
        else if (documento.tipo == "HTML") {
            this.preview(documento);
        }
    }
    sign(documentos) {
        return new Promise((resolve, reject) => {
            this.go.navigate({ route: ["uteis", "documentos", "assinar"] }, {
                metadata: { documentos },
                modalClose: resolve
            });
        });
    }
};
DocumentoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DocumentoService);
export { DocumentoService };
//# sourceMappingURL=documento.service.js.map