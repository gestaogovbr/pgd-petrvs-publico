import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { PlanoEntregaEntregaDaoService } from './plano-entrega-entrega-dao.service';
let PlanoTrabalhoEntregaDaoService = class PlanoTrabalhoEntregaDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoTrabalhoEntrega", injector);
        this.injector = injector;
        this.programaEntregaEntregaDao = injector.get(PlanoEntregaEntregaDaoService);
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "descricao", label: "Descrição da entrega" },
            { field: "forca_trabalho", label: "Percentual da força de trabalho" },
            { field: "orgao", label: "Orgão externo vinculado a entrega" },
            { field: "meta", label: "Meta extipulada para a entrega" },
            { field: "entrega", label: "Entrega do plano de entrega", fields: this.programaEntregaEntregaDao.dataset(), type: "OBJECT" },
        ], deeps);
    }
};
PlanoTrabalhoEntregaDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoTrabalhoEntregaDaoService);
export { PlanoTrabalhoEntregaDaoService };
//# sourceMappingURL=plano-trabalho-entrega-dao.service.js.map