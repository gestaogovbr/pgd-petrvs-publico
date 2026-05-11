import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StatusService = class StatusService {
    getItem(tipo) {
        return this.itens[tipo];
    }
    constructor(lookup) {
        this.lookup = lookup;
        this.itens = {
            "PlanoTrabalho": this.lookup.PLANO_TRABALHO_STATUS,
            "PlanoEntrega": this.lookup.PLANO_ENTREGA_STATUS,
            "Atividade": this.lookup.ATIVIDADE_STATUS,
            "Consolidacao": this.lookup.CONSOLIDACAO_STATUS
        };
    }
};
StatusService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StatusService);
export { StatusService };
//# sourceMappingURL=status.service.js.map