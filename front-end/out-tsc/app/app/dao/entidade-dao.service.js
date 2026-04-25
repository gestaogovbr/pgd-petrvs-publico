import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { CidadeDaoService } from './cidade-dao.service';
import { DaoBaseService } from './dao-base.service';
import { UsuarioDaoService } from './usuario-dao.service';
let EntidadeDaoService = class EntidadeDaoService extends DaoBaseService {
    constructor(injector) {
        super("Entidade", injector);
        this.injector = injector;
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.cidadeDao = injector.get(CidadeDaoService);
        this.inputSearchConfig.searchFields = ["sigla", "nome"];
    }
    dataset(deeps) {
        return this.deepsFilter([
            { field: "sigla", label: "Sigla" },
            { field: "nome", label: "Nome" },
            { field: "gestor", label: "Gestor", fields: this.usuarioDao.dataset([]) },
            { field: "gestores_substitutos", label: "Gestor substituto", fields: this.usuarioDao.dataset([]), type: "ARRAY" },
            { field: "cidade", label: "Cidade", dao: this.cidadeDao }
        ], deeps);
    }
    generateApiKey(entidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/generate-api-key', { entidade_id }).subscribe(response => {
                resolve(response?.api_public_key);
            }, error => reject(error));
        });
    }
    forcaEnvio(entidade_id) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/forcar-envio', {
                id: entidade_id,
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
EntidadeDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EntidadeDaoService);
export { EntidadeDaoService };
//# sourceMappingURL=entidade-dao.service.js.map