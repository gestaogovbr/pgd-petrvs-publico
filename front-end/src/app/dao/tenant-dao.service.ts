import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Tenant } from '../models/tenant.model';
import { TipoCapacidade } from '../models/tipo-capacidade.model';
import { Cidade } from '../models/cidade.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export type CertificateKeys = {
  public_key: string,
  private_key: string
}

@Injectable({
  providedIn: 'root'
})
export class TenantDaoService extends DaoBaseService<Tenant> {
  public PREFIX_URL: string = "config";

  constructor(protected injector: Injector,private http: HttpClient) {
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

  public forcaSiape(item: TipoCapacidade) {
      return new Promise<boolean>((resolve, reject) => {
        this.server.post('config/' + this.collection + '/forcar-siape', {
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

  public forcaEnvio(item: TipoCapacidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/forcar-envio', {
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

  public deleteTenant(item: TipoCapacidade) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/delete-tenant', {
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

  public generateCertificateKeys() {
    return new Promise<CertificateKeys>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/generate-certificate-keys', {}).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.data);
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

  public cleanDB(row: any) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('config/' + this.collection + '/cleandb', {
        tenant_id: row.id,
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }

  public resetQueues() {
    return new Promise<boolean>((resolve, reject) => {
      this.server.get('config/' + this.collection + '/resetqueues').subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
  public resetDB() {
    return new Promise<boolean>((resolve, reject) => {
      this.server.get('config/' + this.collection + '/resetdb').subscribe(response => {
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

  public databaseDump(item: Cidade){
    const url = `config/${this.collection}/dumpdb`;
    return  this.server.getBlob(url, { tenant_id: item.id }) ;
  }

  public countUsersInPGD(){
    return new Promise<number>((resolve, reject) => {
      this.server.get('config/' + this.collection + '/users-in-PGD').subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.data);
        }
      }, error => reject(error));
    });
  }

}

