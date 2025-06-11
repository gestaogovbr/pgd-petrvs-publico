import { Base } from './base.model';

export class Change extends Base {

    public id: string = "";
    public auditable_id: string = "";
    public auditable_type: string = "";
    public user_id: string = "";
    public user_type: string = "";
    public usuario: string = "";
    public created_at: Date = new Date();
    public event: string = "";
    public new_values: {[key: string]: any } = {};
    public old_values: {[key: string]: any } = {};

    public constructor(data?: any) { super(); this.initialization(data); }
}
