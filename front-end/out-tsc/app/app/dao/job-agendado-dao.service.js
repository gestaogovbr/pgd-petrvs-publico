import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let JobAgendadoDaoService = class JobAgendadoDaoService extends DaoBaseService {
    constructor(injector, http) {
        super("JobAgendado", injector);
        this.injector = injector;
        this.http = http;
        this.inputSearchConfig.searchFields = ["nome_do_job"];
    }
    getAllJobs(tenantId) {
        const url = `api/${this.collection}/getAll`;
        const params = tenantId ? { params: { tenant_id: tenantId } } : {};
        return new Promise((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(this.loadJobAgendadoDados(response));
            }, error => {
                console.log("Erro ao obter os jobs!", error);
                reject(error);
            });
        });
    }
    getClassJobs() {
        const url = `api/${this.collection}/getClassJobs`;
        return new Promise((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.log("Erro ao obter os jobs!", error);
                reject(error);
            });
        });
    }
    loadJobAgendadoDados(response) {
        let dados = response;
        return dados;
    }
    createJob(jobData, tenantId) {
        const url = `api/${this.collection}/create`;
        return new Promise((resolve, reject) => {
            this.server.post(url, jobData).subscribe(response => {
                resolve(response);
            }, error => {
                console.error("Erro ao criar o job!", error);
                reject(error);
            });
        });
    }
    deleteJob(jobId) {
        const url = `api/${this.collection}/delete/${jobId}`;
        return new Promise((resolve, reject) => {
            this.server.delete(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.error("Erro ao deletar o job!", error);
                reject(error);
            });
        });
    }
};
JobAgendadoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], JobAgendadoDaoService);
export { JobAgendadoDaoService };
//# sourceMappingURL=job-agendado-dao.service.js.map