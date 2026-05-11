import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let AvaliacaoDaoService = class AvaliacaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Avaliacao", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = [];
    }
    cancelarAvaliacao(id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-avaliacao', { id }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(true);
                }
            }, error => reject(error));
        });
    }
    recorrer(avaliacao, recurso) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/recorrer', { id: avaliacao.id, recurso }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    avaliacao.recurso = recurso;
                    resolve(true);
                }
            }, error => reject(error));
        });
    }
};
AvaliacaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AvaliacaoDaoService);
export { AvaliacaoDaoService };
//# sourceMappingURL=avaliacao-dao.service.js.map