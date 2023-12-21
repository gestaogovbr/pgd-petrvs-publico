import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { TenantLogs } from '../models/tenant-logs.model';

@Injectable({
  providedIn: 'root'
})
export class TenantLogsDaoService extends DaoBaseService<TenantLogs> {
  public PREFIX_URL: string = "config";

  constructor(protected injector: Injector) { 
    super("TenantLogs", injector);
  }

}

