import { Base } from './base.model';
export class UserPanelTenant extends Base {
    constructor(data) {
        super();
        this.users_panel_id = 0;
        this.tenant_id = "";
        this.initialization(data);
    }
}
//# sourceMappingURL=user-panel-tenant.model.js.map