import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { PlanoTrabalho } from '../models/plano-trabalho.model';
import { DaoBaseService } from './dao-base.service';
import { UnidadeDaoService } from './unidade-dao.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { ProgramaDaoService } from './programa-dao.service';
import { LookupService } from '../services/lookup.service';
import { PlanoTrabalhoEntregaDaoService } from './plano-trabalho-entrega-dao.service';
import { Programa } from '../models/programa.model';
let PlanoTrabalhoDaoService = class PlanoTrabalhoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoTrabalho", injector);
        this.injector = injector;
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.programaDao = injector.get(ProgramaDaoService);
        this.planoTrabalhoEntregaDao = injector.get(PlanoTrabalhoEntregaDaoService);
        this.lookup = injector.get(LookupService);
        this.inputSearchConfig.searchFields = ["numero", "data_inicio", "data_fim"];
        this.inputSearchConfig.display = (data) => "#" + data[0] + ": " + this.util.getDateFormatted(data[1]) + " a " + this.util.getDateFormatted(data[2]) + " - " + data[3];
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "carga_horaria", label: "Carga horária diária" },
            { field: "tempo_total", label: "Tempo total do plano" },
            { field: "tempo_proporcional", label: "Tempo proporcional (descontando afastamentos)" },
            { field: "data_inicio", label: "Data inicial do plano", type: "DATETIME" },
            { field: "data_fim", label: "Data final do plano", type: "DATETIME" },
            { field: "modalidade_pgd", label: "Modalidade" },
            { field: "unidade", label: "Unidade", fields: this.unidadeDao.dataset(), type: "OBJECT" },
            { field: "usuario", label: "Usuário", fields: this.usuarioDao.dataset(), type: "OBJECT" },
            { field: "programa", label: "Programa", fields: this.programaDao.dataset(), type: "OBJECT" },
            { field: "entregas", label: "Entregas", fields: this.planoTrabalhoEntregaDao.dataset(), type: "ARRAY" },
            { field: "criterios_avaliacao", label: "Critérios de avaliação", fields: [{ field: "value", label: "Critério" }], type: "ARRAY" }
        ], deeps);
    }
    metadadosPlano(planoTrabalhoId, inicioPeriodo, fimPeriodo) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/metadados-plano', { plano_trabalho_id: planoTrabalhoId, inicioPeriodo, fimPeriodo }).subscribe(response => {
                resolve(response?.metadadosPlano || []);
            }, error => reject(error));
        });
    }
    getByUsuario(usuarioId, arquivados, planoTrabalhoId = null) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/get-by-usuario', { usuario_id: usuarioId, arquivados, plano_trabalho_id: planoTrabalhoId }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    let dados = response?.dados;
                    dados.planos = dados.planos.map(x => new PlanoTrabalho(this.getRow(x)));
                    dados.programas = dados.programas.map(x => new Programa(this.getRow(x)));
                    dados.planos.forEach(x => x.programa = dados.programas.find(y => y.id == x.programa_id));
                    resolve(dados);
                }
            }, error => reject(error));
        });
    }
    arquivar(planoTrabalho) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/arquivar', { id: planoTrabalho.id, arquivar: planoTrabalho.arquivar }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    ativar(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/ativar', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarAssinatura(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-assinatura', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarPlano(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-plano', { id: planoTrabalho.id, justificativa: justificativa, arquivar: planoTrabalho.arquivar }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    enviarParaAssinatura(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/enviar-para-assinatura', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    reativar(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/reativar', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    suspender(planoTrabalho, justificativa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/suspender', { id: planoTrabalho.id, justificativa: justificativa }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    planosUsuarioComPendencias(usuarioId) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/planos-usuario-com-pendencias', { usuario_id: usuarioId }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response?.dados || false);
                }
            }, error => reject(error));
        });
    }
};
PlanoTrabalhoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoTrabalhoDaoService);
export { PlanoTrabalhoDaoService };
//# sourceMappingURL=plano-trabalho-dao.service.js.map