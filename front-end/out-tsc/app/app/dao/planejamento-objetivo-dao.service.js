import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let PlanejamentoObjetivoDaoService = class PlanejamentoObjetivoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanejamentoObjetivo", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    ordenar(objetivos) {
        return new Promise((resolve, reject) => {
            this.server.post('api/PlanejamentoObjetivo/ordenar', { objetivos: objetivos }).subscribe(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            });
        });
    }
};
PlanejamentoObjetivoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanejamentoObjetivoDaoService);
export { PlanejamentoObjetivoDaoService };
//# sourceMappingURL=planejamento-objetivo-dao.service.js.map