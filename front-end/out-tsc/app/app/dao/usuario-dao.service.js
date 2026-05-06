import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { LookupService } from '../services/lookup.service';
import { DaoBaseService } from './dao-base.service';
import { firstValueFrom } from 'rxjs';
let UsuarioDaoService = class UsuarioDaoService extends DaoBaseService {
    constructor(injector) {
        super("Usuario", injector);
        this.injector = injector;
        this.lookup = injector.get(LookupService);
        this.inputSearchConfig.searchFields = ["matricula", "nome"];
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "nome", label: "Nome" },
            { field: "email", label: "E-mail" },
            { field: "cpf", label: "CPF" },
            { field: "matricula", label: "Matrícula" },
            { field: "apelido", label: "Apelido" },
            { field: "telefone", label: "Telefone" },
            { field: "sexo", label: "Sexo", lookup: this.lookup.SEXO },
            { field: "situacao_funcional", label: "Situação Funcional", lookup: this.lookup.USUARIO_SITUACAO_FUNCIONAL },
            { field: "situacao_siape", label: "Situação SIAPE", lookup: this.lookup.USUARIO_SITUACAO_SIAPE },
            { field: "texto_complementar_plano", label: "Mensagem do Plano de trabalho", type: "TEMPLATE" }
        ], deeps);
    }
    calculaDataTempoUnidade(inicio, fimOuTempo, cargaHoraria, unidade_id, tipo, pausas, afastamentos) {
        return new Promise((resolve, reject) => {
            this.server.post('api/Teste/calculaDataTempoUnidade', { inicio: inicio, fimOuTempo: fimOuTempo, cargaHoraria: cargaHoraria, unidade_id: unidade_id, tipo: tipo, pausas: pausas, afastamentos: afastamentos })
                .subscribe(response => {
                resolve(response.data);
            }, error => {
                console.log("Erro no cálculo das Efemerides pelo servidor!", error);
                resolve(undefined);
            });
        });
    }
    exportarCPFSIAPE(cpf) {
        return this.server.postDownload('api/usuario/exportar-cpf-siape', { cpf });
    }
    baixaLogSiape(cpf) {
        return this.server.postDownload('api/usuario/download-cpf-siape', { cpf });
    }
    consultarSIAPE(cpf) {
        return this.server.post('api/usuario/consultar-cpf-siape', { cpf });
    }
    atualizaPedagio(data) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/atualiza-pedagio', { data }).subscribe({
                next: (response) => {
                    const usuario = response?.data;
                    if (usuario) {
                        resolve(usuario);
                    }
                    else {
                        reject(new Error('Invalid response data'));
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
    removePedagio(usuarioId) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/remove-pedagio', { data: { usuario_id: usuarioId } }).subscribe({
                next: (response) => {
                    const usuario = response?.data;
                    if (usuario) {
                        resolve(usuario);
                    }
                    else {
                        reject(new Error('Invalid response data'));
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
    sincronizarSIAPE(cpf) {
        return this.server.post('api/usuario/processar-siape', { cpf });
    }
    ativarTemporariamente(usuario_id, justificativa) {
        return firstValueFrom(this.server.post('api/Usuario/ativar-temporariamente', {
            data: { usuario_id: usuario_id, justificativa: justificativa }
        }));
    }
    getPendenciasChefe() {
        return firstValueFrom(this.server.post('api/Usuario/pendencias-chefe', {}));
    }
};
UsuarioDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsuarioDaoService);
export { UsuarioDaoService };
//# sourceMappingURL=usuario-dao.service.js.map