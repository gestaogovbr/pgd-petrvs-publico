import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TenantLogs } from '../models/tenant-logs.model';
import { TipoCapacidade } from '../models/tipo-capacidade.model';

@Injectable({
  providedIn: 'root'
})
export class TenantLogsDaoService extends DaoBaseService<TenantLogs> {
  public PREFIX_URL: string = "config";

  constructor(protected injector: Injector) { 
    super("TenantLogs", injector);
  }
  

  public getAllLogs(tenant_id : string|null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/Logs/list', {
        tenant_id: tenant_id ? tenant_id: '',
      }).subscribe(response => {
          if (response.error) {
            reject(response.error);
          } else {
            console.log(response.data);
            resolve(response.data);
          }
        }, error => reject(error));
    });
  }


 

}

