export class GridGroupSeparator {
    constructor(group) {
        this.group = group;
        this.metadata = undefined;
    }
    get text() {
        return this.group.map((x) => x.value).join(" - ");
    }
}
//# sourceMappingURL=grid-types.js.map