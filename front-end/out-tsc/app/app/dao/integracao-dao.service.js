import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let IntegracaoDaoService = class IntegracaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Integracao", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["usuario_id", "data_execucao", "atualizar_unidades", "atualizar_servidores", "atualizar_gestores"];
    }
    showResponsaveis() {
        return new Promise((resolve, reject) => {
            this.server.post('api/Integracao/showResponsaveis', []).subscribe(response => {
                resolve(response.responsaveis);
            }, error => {
                console.log("Erro ao buscar a lista dos responsáveis pela execução da Rotina de Integração!", error);
                resolve([]);
            });
        });
    }
    buscaProcessamentosPendentes() {
        return new Promise((resolve, reject) => {
            this.server.get('api/Integracao/busca-processamentos-pendentes').subscribe(response => {
                resolve(response);
            }, error => {
                console.log("Erro ao buscar os processamentos pendentes!", error);
                resolve([]);
            });
        });
    }
};
IntegracaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IntegracaoDaoService);
export { IntegracaoDaoService };
//# sourceMappingURL=integracao-dao.service.js.map