export class GridColumn {
    constructor() {
        this.title = "";
        this.type = "display";
        this.field = "";
        this.orderBy = "";
        this.editable = false;
        this.items = [];
        this.editing = false;
        this.align = "none";
        this.verticalAlign = "bottom";
        this.minWidth = undefined;
        this.maxWidth = undefined;
        this.width = undefined;
        this.style = {};
    }
    isType(type) {
        return (this.type + ":").startsWith(type + ":");
    }
    inType(types) {
        return !!types.find(x => (this.type + ":").startsWith(x + ":"));
    }
    isSubType(type) {
        return (":" + this.type).endsWith(":" + type);
    }
    inSubType(types) {
        return !!types.find(x => (":" + this.type).endsWith(":" + x));
    }
    isColumnEditable(row) {
        return !!this.save &&
            ((!!row && typeof this.editable != "boolean" && !!this.editable && this.editable(row)) ||
                (typeof this.editable == "boolean" && (this.editable || !!this.columnEditTemplate)));
    }
    get isAlways() {
        return this.always != undefined;
    }
}
;
//# sourceMappingURL=grid-column.js.map