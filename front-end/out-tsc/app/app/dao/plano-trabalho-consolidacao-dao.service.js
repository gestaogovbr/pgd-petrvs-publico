import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Atividade } from '../models/atividade.model';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { Afastamento } from '../models/afastamento.model';
import { PlanoTrabalho } from '../models/plano-trabalho.model';
import { Programa } from '../models/programa.model';
import { Comparecimento } from '../models/comparecimento.model';
import { Ocorrencia } from '../models/ocorrencia.model';
let PlanoTrabalhoConsolidacaoDaoService = class PlanoTrabalhoConsolidacaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("PlanoTrabalhoConsolidacao", injector);
        this.injector = injector;
    }
    dataset(deeps) {
        return this.deepsFilter([], deeps);
    }
    loadConsolidacaoDados(response) {
        let dados = response?.dados;
        dados.programa = new Programa(this.getRow(dados.programa));
        dados.planoTrabalho = new PlanoTrabalho(this.getRow(dados.planoTrabalho));
        dados.planoTrabalho.entregas = (dados.planoTrabalho.entregas || []).map(x => new PlanoTrabalhoEntrega(this.getRow(x)));
        dados.afastamentos = dados.afastamentos.map(x => new Afastamento(this.getRow(x)));
        dados.atividades = dados.atividades.map(x => new Atividade(Object.assign(this.getRow(x), { plano_trabalho: dados.planoTrabalho })));
        dados.entregas = dados.planoTrabalho.entregas;
        dados.ocorrencias = dados.ocorrencias.map(x => new Ocorrencia(this.getRow(x)));
        dados.comparecimentos = dados.comparecimentos.map(x => new Comparecimento(this.getRow(x)));
        return dados;
    }
    dadosConsolidacao(id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/consolidacao-dados', { id }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(this.loadConsolidacaoDados(response));
                }
            }, error => reject(error));
        });
    }
    concluir(id, justificativa_conclusao) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/concluir', { id, justificativa_conclusao }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(this.loadConsolidacaoDados(response));
                }
            }, error => reject(error));
        });
    }
    cancelarConclusao(id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-conclusao', { id }).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(this.loadConsolidacaoDados(response));
                }
            }, error => reject(error));
        });
    }
    pendenciasUsuario() {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pendencias-usuario', {}).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(response?.dados || []);
                }
            }, error => reject(error));
        });
    }
    inconsistencias(usuarioId) {
        return new Promise((resolve, reject) => {
            const data = usuarioId ? { usuario_id: usuarioId } : {};
            this.server.post('api/' + this.collection + '/inconsistencias', data).subscribe(response => {
                if (response?.error) {
                    reject(response?.error);
                }
                else {
                    resolve(response?.dados || []);
                }
            }, error => reject(error));
        });
    }
};
PlanoTrabalhoConsolidacaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoTrabalhoConsolidacaoDaoService);
export { PlanoTrabalhoConsolidacaoDaoService };
//# sourceMappingURL=plano-trabalho-consolidacao-dao.service.js.map