import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MapComponent = class MapComponent {
    set items(value) {
        if (this._items != value) {
            this._items = value;
            this.cdRef.detectChanges();
        }
    }
    get items() {
        let items = this._items || [];
        if (this.updateHash(items))
            this.cdRef.markForCheck();
        return items;
    }
    constructor(cdRef, util) {
        this.cdRef = cdRef;
        this.util = util;
    }
    ngOnInit() { }
    updateHash(items) {
        let result = false;
        for (let item of items) {
            let hash = this.hash(item);
            if (item.hash != hash) {
                item.hash = hash;
                result = true;
            }
        }
        return result;
    }
    hash(item) {
        return this.util.md5(JSON.stringify({
            data: item.data,
            metadata: item.metadata
        }));
    }
};
__decorate([
    Input()
], MapComponent.prototype, "items", null);
MapComponent = __decorate([
    Component({
        selector: 'map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.scss'],
        standalone: false
    })
], MapComponent);
export { MapComponent };
//# sourceMappingURL=map.component.js.map