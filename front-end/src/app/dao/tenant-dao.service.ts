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


  public seeders(item: TipoCapacidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/seeders', { 
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

  public migrations(item: TipoCapacidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/migrations', { 
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

  public usuarioSeeder(item: Cidade) {
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

  public entidadeSeeder(item: Cidade) {
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

  public databaseSeeder(item: Cidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/database', { 
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
}

