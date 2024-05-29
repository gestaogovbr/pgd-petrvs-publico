import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobAgendado } from '../models/job-agendado.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class JobAgendadoDaoService extends DaoBaseService<JobAgendado> {

    constructor(protected injector: Injector, private http: HttpClient) {
        super("JobAgendado", injector);
        this.inputSearchConfig.searchFields = ["nome_do_job"];
    }

    public getAllJobs(tenantId: string | null): Promise<any> {
        const url = `api/${this.collection}/getAll`;
        const params = tenantId ? { params: { tenant_id: tenantId } } : {};
    
        return new Promise<any>((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(this.loadJobAgendadoDados(response));
            }, error => {
                console.log("Erro ao obter os jobs!", error);
                reject(error);
            });
        });
    }

    public getClassJobs(): Promise<any> {
        const url = `api/${this.collection}/getClassJobs`;
    
        return new Promise<any>((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.log("Erro ao obter os jobs!", error);
                reject(error);
            });
        });
    }
    private loadJobAgendadoDados(response: any): JobAgendado {
        let dados = response as JobAgendado;
        return dados;
    }

    public createJob(jobData: any, tenantId: string | null): Promise<any> {
        const url = `api/${this.collection}/create`;
        return new Promise<any>((resolve, reject) => {
            this.server.post(url, jobData).subscribe(response => {
                resolve(response);
            }, error => {
                console.error("Erro ao criar o job!", error);
                reject(error);
            });
        });
    }
    
    public deleteJob(jobId: string): Promise<any> {
        const url = `api/${this.collection}/delete/${jobId}`;
    
        return new Promise<any>((resolve, reject) => {
            this.server.delete(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.error("Erro ao deletar o job!", error);
                reject(error);
            });
        });
    }
}
