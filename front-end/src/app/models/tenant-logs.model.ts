import { Base } from './base.model';

export class TenantLogs extends Base {

    public id: string = ""; //Nome da funcao
    public tenant_id: string = ""; //Nome da funcao
    public level: string = ""; //Nível da funcao
    public message: string = ""; //Descrição da funcao
    
    public constructor(data?: any) { super(); this.initialization(data); }
}
