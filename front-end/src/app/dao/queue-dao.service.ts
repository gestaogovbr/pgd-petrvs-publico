import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Tenant } from '../models/tenant.model';
import { TipoCapacidade } from '../models/tipo-capacidade.model';
import { Cidade } from '../models/cidade.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerService } from '../services/server.service';
export type CertificateKeys = {
  public_key: string,
  private_key: string
}

@Injectable({
  providedIn: 'root'
})
export class QueueDaoService {

  private _server?: ServerService;

  constructor(protected injector: Injector,private http: HttpClient) {
  }

  public get server(): ServerService {
      this._server =
        this._server || this.injector.get<ServerService>(ServerService);
      return this._server;
    }

  public resetQueues() {
    return new Promise<boolean>((resolve, reject) => {
      this.server.get('config/resetqueues').subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
}

