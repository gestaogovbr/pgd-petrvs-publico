import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Tenant } from '../models/tenant.model';
import { TipoCapacidade } from '../models/tipo-capacidade.model';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class TenantDaoService extends DaoBaseService<Tenant> {
  public PREFIX_URL: string = "config";

  constructor(protected injector: Injector) { 
    super("Tenant", injector);
  }


  public cidadesSeeder(item: Cidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/cidades', { 
        tenant_id: item.id
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public tiposCapacidadesSeeder(item: TipoCapacidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/tipo-capacidade', { 
        tenant_id: item.id,
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

}

