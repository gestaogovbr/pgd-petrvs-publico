import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { DaoBaseService } from "./dao-base.service";
let ProdutoDaoService = class ProdutoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Produto", injector);
        this.injector = injector;
        this.inputSearchConfig.searchFields = ["nome"];
    }
    ativarTodos() {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/ativar-todos', {}).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    desativarTodos() {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/desativar-todos', {}).subscribe(response => {
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
ProdutoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoDaoService);
export { ProdutoDaoService };
//# sourceMappingURL=produto-dao.service.js.map