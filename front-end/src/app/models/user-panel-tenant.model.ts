import { Base } from './base.model';
import { Tenant } from './tenant.model';

export class UserPanelTenant extends Base {
  public users_panel_id: number = 0;
  public tenant_id: string = "";
  public constructor(data?: any) { super(); this.initialization(data); }
}