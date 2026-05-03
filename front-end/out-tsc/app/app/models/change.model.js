import { Base } from './base.model';
export class Change extends Base {
    constructor(data) {
        super();
        this.id = "";
        this.auditable_id = "";
        this.auditable_type = "";
        this.user_id = "";
        this.user_type = "";
        this.usuario = "";
        this.created_at = new Date();
        this.event = "";
        this.new_values = {};
        this.old_values = {};
        this.initialization(data);
    }
}
//# sourceMappingURL=change.model.js.map