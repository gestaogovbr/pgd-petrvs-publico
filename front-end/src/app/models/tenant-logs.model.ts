import { Base } from './base.model';

export class TenantLogs extends Base {

    public tenant_id: string = ""; //Nome da funcao
    public log_type: string = ""; //Nível da funcao
    public output: string = ""; //Descrição da funcao
    
    public constructor(data?: any) { super(); this.initialization(data); }
}
