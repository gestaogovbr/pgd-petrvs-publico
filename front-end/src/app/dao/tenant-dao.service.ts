import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { Tenant } from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantDaoService extends DaoBaseService<Tenant> {
  public PREFIX_URL: string = "config";

  constructor(protected injector: Injector) { 
    super("Tenant", injector);
  }
}

