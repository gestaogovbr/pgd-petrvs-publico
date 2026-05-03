import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ProgramaDaoService = class ProgramaDaoService extends DaoBaseService {
    constructor(injector) {
        super("Programa", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "nome", label: "Nome" },
            { field: "normativa", label: "Normativa" },
            { field: "data_inicio", label: "Data início" },
            { field: "data_fim", label: "Data término" }
        ], deeps);
    }
    concluir(programa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/concluir', { programa_id: programa.id }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
};
ProgramaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProgramaDaoService);
export { ProgramaDaoService };
//# sourceMappingURL=programa-dao.service.js.map