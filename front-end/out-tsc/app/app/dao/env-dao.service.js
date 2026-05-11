import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let EnvDaoService = class EnvDaoService extends DaoBaseService {
    constructor(injector, http) {
        super("Env", injector);
        this.injector = injector;
        this.http = http;
        this.inputSearchConfig.searchFields = ["nome_do_env"];
    }
    getEnvs() {
        const url = `api/${this.collection}/query`;
        return new Promise((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.log("Erro ao obter os env!", error);
                reject(error);
            });
        });
    }
    updateEnv(item) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/update', item).subscribe(response => {
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
EnvDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EnvDaoService);
export { EnvDaoService };
//# sourceMappingURL=env-dao.service.js.map