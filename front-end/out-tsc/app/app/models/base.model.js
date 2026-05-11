;
export class Base {
    constructor() {
        this.id = "";
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = null;
    }
    initialization(data) {
        if (data)
            Object.assign(this, data);
    }
}
//# sourceMappingURL=base.model.js.map