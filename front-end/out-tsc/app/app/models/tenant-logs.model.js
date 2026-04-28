import { Base } from './base.model';
export class TenantLogs extends Base {
    constructor(data) {
        super();
        this.id = ""; //Nome da funcao
        this.tenant_id = ""; //Nome da funcao
        this.level = ""; //Nível da funcao
        this.message = ""; //Descrição da funcao
        this.initialization(data);
    }
}
//# sourceMappingURL=tenant-logs.model.js.map