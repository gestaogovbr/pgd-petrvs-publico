import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let SeederDaoService = class SeederDaoService extends DaoBaseService {
    constructor(injector) {
        super("Seeder", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    getAllSeeder() {
        return new Promise((resolve, reject) => {
            this.server.get('api/' + this.collection + '/getAll').subscribe(response => {
                resolve(this.loadSeederDados(response));
            }, error => {
                console.log("Erro ao montar a hierarquia da atividade!", error);
                resolve([]);
            });
        });
    }
    loadSeederDados(response) {
        let dados = response;
        return dados;
    }
    executeSeeder(seederName, tenant) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/execute', {
                seeder: seederName,
                id: tenant
            }).subscribe(response => {
                resolve(response || []);
            }, error => reject(error));
        });
    }
};
SeederDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SeederDaoService);
export { SeederDaoService };
//# sourceMappingURL=seeder-dao.service.js.map