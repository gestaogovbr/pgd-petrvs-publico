import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UsuarioDaoService } from './usuario-dao.service';
let ProgramaParticipanteDaoService = class ProgramaParticipanteDaoService extends DaoBaseService {
    constructor(injector) {
        super("ProgramaParticipante", injector);
        this.injector = injector;
        this.usuarioDao = injector.get(UsuarioDaoService);
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "habilitado", label: "Habilitado" },
            { field: "usuario", label: "Usuário", fields: this.usuarioDao.dataset(), type: "OBJECT" }
        ], deeps);
    }
    quantidadePlanosTrabalhoAtivos(ids) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/quantidade-planos-trabalho-ativos', { ids: ids }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response.count);
                }
            }, error => reject(error));
        });
    }
    habilitar(participantesIds, programaId, habilitar, suspenderPlanoTrabalho) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/habilitar', {
                participantes_ids: participantesIds,
                programa_id: programaId,
                habilitar: habilitar,
                suspender_plano_trabalho: suspenderPlanoTrabalho
            }).subscribe({
                next: response => {
                    if (response.error) {
                        reject(response.error);
                    }
                    else {
                        resolve(!!response?.success);
                    }
                },
                error: error => reject(error)
            });
        });
    }
    notificar(item) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/notificar', {
                participantes_ids: item.id,
                programa_id: item.programa_id,
                habilitado: item.habilitado
            }).subscribe(response => {
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
ProgramaParticipanteDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProgramaParticipanteDaoService);
export { ProgramaParticipanteDaoService };
//# sourceMappingURL=programa-participante-dao.service.js.map