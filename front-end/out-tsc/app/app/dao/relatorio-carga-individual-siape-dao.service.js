import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServerService } from '../services/server.service';
let RelatorioCargaIndividualSiapeDaoService = class RelatorioCargaIndividualSiapeDaoService {
    constructor(injector) {
        this.injector = injector;
        this.server = injector.get(ServerService);
    }
    async obterPorId(id) {
        const response = await firstValueFrom(this.server.post('api/siape/relatorio-carga-individual', { id }));
        return response?.relatorio ?? null;
    }
    async listarRecentes(tipo, chave, limit = 20) {
        const response = await firstValueFrom(this.server.post('api/siape/relatorio-carga-individual', { tipo: tipo || undefined, chave: chave || undefined, limit }));
        return response?.relatorios ?? [];
    }
};
RelatorioCargaIndividualSiapeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RelatorioCargaIndividualSiapeDaoService);
export { RelatorioCargaIndividualSiapeDaoService };
//# sourceMappingURL=relatorio-carga-individual-siape-dao.service.js.map