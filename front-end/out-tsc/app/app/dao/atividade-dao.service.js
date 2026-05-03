import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Atividade } from '../models/atividade.model';
import { UtilService } from '../services/util.service';
import { DaoBaseService } from './dao-base.service';
import { Planejamento } from '../models/planejamento.model';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { PlanoEntregaEntrega } from '../models/plano-entrega-entrega.model';
import { PlanejamentoObjetivo } from '../models/planejamento-objetivo.model';
import { CadeiaValorProcesso } from '../models/cadeia-valor-processo.model';
import { CadeiaValor } from '../models/cadeia-valor.model';
let AtividadeDaoService = class AtividadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Atividade", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["numero", "descricao"];
    }
    prazo(inicio_data, horas, carga_horaria, unidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/prazo', {
                inicio_data: UtilService.dateToIso8601(inicio_data),
                horas: horas,
                carga_horaria: carga_horaria,
                unidade_id: unidade_id
            }).subscribe(response => {
                resolve(UtilService.iso8601ToDate(response?.date));
            }, error => reject(error));
        });
    }
    getAtividade(id) {
        return this.getById(id, ["pausas", "unidade", "tipo_atividade", "comentarios.usuario", "plano_trabalho.entregas.entrega:id,nome", "plano_trabalho.documento:id,metadados", "usuario", "usuario.afastamentos", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario"]);
    }
    getHierarquia(atividade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/hierarquia', {
                atividade_id: atividade_id
            }).subscribe(response => {
                resolve(this.loadHierarquiaDados(response));
            }, error => {
                console.log("Erro ao montar a hierarquia da atividade!", error);
                resolve([]);
            });
        });
    }
    loadHierarquiaDados(response) {
        let dados = response?.hierarquia;
        dados.planejamento = new Planejamento(this.getRow(dados.planejamento));
        dados.cadeiaValor = new CadeiaValor(this.getRow(dados.cadeiaValor));
        dados.entregaPlanoTrabalho = new PlanoTrabalhoEntrega(this.getRow(dados.entregaPlanoTrabalho));
        dados.entregasPlanoEntrega = dados.entregasPlanoEntrega?.map(x => new PlanoEntregaEntrega(Object.assign(this.getRow(x)))).reverse();
        dados.objetivos = dados.objetivos?.map(x => new PlanejamentoObjetivo(Object.assign(this.getRow(x)))).reverse();
        dados.processos = dados.processos?.map(x => new CadeiaValorProcesso(Object.assign(this.getRow(x))));
        dados.atividade = new Atividade(this.getRow(dados.atividade));
        return dados;
    }
    iniciadas(usuario_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/iniciadas', {
                usuario_id: usuario_id
            }).subscribe(response => {
                resolve(response?.iniciadas || []);
            }, error => reject(error));
        });
    }
    iniciar(atividade) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/iniciar', this.prepareToSave(atividade)).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    concluir(atividade) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/concluir', this.prepareToSave(atividade)).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    pausar(pausa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/pausar', this.prepareToSave(pausa)).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    reiniciar(pausa) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/reiniciar', this.prepareToSave(pausa)).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarInicio(atividade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-inicio', { id: atividade_id }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    cancelarConclusao(atividade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/cancelar-conclusao', { id: atividade_id }).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    prorrogar(prorrogar) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/prorrogar', this.prepareToSave(prorrogar)).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    arquivar(atividade_id, arquivar) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/arquivar', { id: atividade_id, arquivar: arquivar }).subscribe(response => {
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
AtividadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AtividadeDaoService);
export { AtividadeDaoService };
//# sourceMappingURL=atividade-dao.service.js.map