import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let CidadeDaoService = class CidadeDaoService extends DaoBaseService {
    dataset(deeps) {
        return this.deepsFilter([
            { field: "codigo_ibge", label: "Código" },
            { field: "nome", label: "Nome" },
            { field: "uf", label: "UF" }
        ], deeps);
    }
    constructor(injector) {
        super("Cidade", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
};
CidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CidadeDaoService);
export { CidadeDaoService };
//# sourceMappingURL=cidade-dao.service.js.map