import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let DocumentoDaoService = class DocumentoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Documento", injector);
        this.injector = injector;
    }
    documentoPendenteSei(id_documento) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pendente-sei', { id_documento }).subscribe(response => {
                response.error ? reject(response.error) : resolve(response?.data ? this.getRow(response?.data) : undefined);
            }, error => reject(error));
        });
    }
    assinar(documentosIds) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/assinar', { documentos_ids: documentosIds }).subscribe(response => {
                if (response.error)
                    reject(response.error);
                resolve(response?.rows ? this.getRows(response) : undefined);
            }, error => reject(error));
        });
    }
    gerarPDF(documento_id) {
        return new Promise((resolve, reject) => {
            this.server.getPDF('api/' + this.collection + '/gerarPDF', { documento_id }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(this.toPDF(response));
                }
            }, error => reject(error));
        });
    }
};
DocumentoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DocumentoDaoService);
export { DocumentoDaoService };
//# sourceMappingURL=documento-dao-service.js.map