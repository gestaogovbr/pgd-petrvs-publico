import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Env } from '../models/env.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class EnvDaoService extends DaoBaseService<Env> {

    constructor(protected injector: Injector, private http: HttpClient) {
        super("Env", injector);
        this.inputSearchConfig.searchFields = ["nome_do_env"];
    }


    public getEnvs(): Promise<any> {
        const url = `api/${this.collection}/query`;
    
        return new Promise<any>((resolve, reject) => {
            this.server.get(url).subscribe(response => {
                resolve(response);
            }, error => {
                console.log("Erro ao obter os env!", error);
                reject(error);
            });
        });
    }


    public updateEnv(item: any) {
        return new Promise<boolean>((resolve, reject) => {
            this.server.post('api/' + this.collection + '/update', item).subscribe(response => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(!!response?.success);
                }
            }, error => reject(error));
        });
    }
}
