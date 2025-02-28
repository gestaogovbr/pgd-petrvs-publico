import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audit } from '../models/audit.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuditDaoService extends DaoBaseService<Audit> {

    constructor(protected injector: Injector, private http: HttpClient) {
        super("Audit", injector);
    }

    public getAll(tenantId: string | null, search: string | null): Promise<any> {
        const url = `api/${this.collection}/getAll?search=`+search+'&tenant_id='+tenantId;

        return new Promise<any>((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(this.loadAuditDados(response));
            }, error => {
                console.log("Erro ao obter os dados!", error);
                reject(error);
            });
        });
    }

    private loadAuditDados(response: any): Audit {
        let dados = response as Audit;
        return dados;
    }

}
