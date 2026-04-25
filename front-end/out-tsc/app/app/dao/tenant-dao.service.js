import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let TenantDaoService = class TenantDaoService extends DaoBaseService {
    constructor(injector, http) {
        super("Tenant", injector);
        this.injector = injector;
        this.http = http;
        this.PREFIX_URL = "config";
    }
    cidadesSeeder(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/cidades', {
                tenant_id: item.id
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
    tiposCapacidadesSeeder(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/tipo-capacidade', {
                tenant_id: item.id,
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
    forcaSiape(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/forcar-siape', {
                tenant_id: item.id,
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
    forcaEnvio(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/forcar-envio', {
                tenant_id: item.id,
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
    forcarEnvio(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/forcar-reenvio', {
                tenant_id: item.id,
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
    deleteTenant(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/delete-tenant', {
                tenant_id: item.id,
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
    generateCertificateKeys() {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/generate-certificate-keys', {}).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response.data);
                }
            }, error => reject(error));
        });
    }
    seeders(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/seeders', {
                tenant_id: item.id,
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
    migrations(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/migrations', {
                tenant_id: item.id,
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
    cleanDB(row) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/cleandb', {
                tenant_id: row.id,
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
    resetQueues() {
        return new Promise((resolve, reject) => {
            this.server.get('config/' + this.collection + '/resetqueues').subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    resetDB() {
        return new Promise((resolve, reject) => {
            this.server.get('config/' + this.collection + '/resetdb').subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
    usuarioSeeder(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/cidades', {
                tenant_id: item.id
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
    entidadeSeeder(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/cidades', {
                tenant_id: item.id
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
    databaseSeeder(item) {
        return new Promise((resolve, reject) => {
            this.server.post('config/' + this.collection + '/database', {
                tenant_id: item.id
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
    databaseDump(item) {
        const url = `config/${this.collection}/dumpdb`;
        return this.server.getBlob(url, { tenant_id: item.id });
    }
    countUsersInPGD() {
        return new Promise((resolve, reject) => {
            this.server.get('config/' + this.collection + '/users-in-PGD').subscribe(response => {
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response.data);
                }
            }, error => reject(error));
        });
    }
};
TenantDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TenantDaoService);
export { TenantDaoService };
//# sourceMappingURL=tenant-dao.service.js.map