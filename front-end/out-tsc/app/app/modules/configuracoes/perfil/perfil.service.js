import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PerfilService = class PerfilService {
    constructor(lookup) {
        this.lookup = lookup;
    }
    ordenarTiposCapacidade(tipos) {
        return tipos.sort((a, b) => {
            const codigoA = a.codigo.toUpperCase();
            const codigoB = b.codigo.toUpperCase();
            return codigoA < codigoB ? -1 : 1;
        });
    }
};
PerfilService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PerfilService);
export { PerfilService };
//# sourceMappingURL=perfil.service.js.map