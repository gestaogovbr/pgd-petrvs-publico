import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let ChangeDaoService = class ChangeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Change", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["type", "date_time", "user_id", "row_id", "table_name"];
    }
    showTables() {
        return new Promise((resolve, reject) => {
            this.server.post('api/Petrvs/showTables', []).subscribe(response => {
                resolve(response.tabelas);
            }, error => {
                console.log("Erro ao buscar a lista das tabelas do banco de dados!", error);
                resolve([]);
            });
        });
    }
    showResponsaveis() {
        return new Promise((resolve, reject) => {
            this.server.post('api/Change/showResponsaveis', []).subscribe(response => {
                resolve(response.responsaveis);
            }, error => {
                console.log("Erro ao buscar a lista dos responsáveis pelas alterações no Banco de Dados-!", error);
                resolve([]);
            });
        });
    }
    listModels() {
        return new Promise((resolve, reject) => {
            this.server.post('api/Change/list-models', []).subscribe(response => {
                resolve(response.models);
            }, error => {
                console.log("Erro ao buscar a lista de Modelos!", error);
                resolve([]);
            });
        });
    }
};
ChangeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ChangeDaoService);
export { ChangeDaoService };
//# sourceMappingURL=change-dao.service.js.map