import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ProgramaService = class ProgramaService {
    constructor(auth) {
        this.auth = auth;
        this.programa = [];
    }
    programaVigente(programa) {
        if (!programa)
            return true;
        const hoje = new Date();
        const inicio = new Date(programa.data_inicio);
        const fim = new Date(programa.data_fim);
        return inicio <= hoje && fim >= hoje;
    }
    selecionaProgramaVigente(programas) {
        return programas.find((prog) => this.programaVigente(prog));
    }
};
ProgramaService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProgramaService);
export { ProgramaService };
//# sourceMappingURL=programa.service.js.map