import { Base } from './base.model';
import { Tenant } from './tenant.model';
import { UserPanelTenant } from './user-panel-tenant.model';

export class UserPanel extends Base {
  public email: string = "";
  public nome: string = "";
  public cpf: string = "";
  public nivel: number = 1;
  public password: string = "";
  public email_verified_at?: Date;
  public tenants?: Tenant[];

  public constructor(data?: any) { super(); this.initialization(data); }
}