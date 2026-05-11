import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
let MapForeachComponent = class MapForeachComponent {
    set items(value) {
        if (this._items != value) {
            this._items = value;
            this.cdRef.detectChanges();
        }
    }
    get items() {
        let items = this._items || this.map.items || [];
        if (this.map.updateHash(items))
            this.cdRef.markForCheck();
        return items;
    }
    constructor(viewContainerRef, map, cdRef) {
        this.viewContainerRef = viewContainerRef;
        this.map = map;
        this.cdRef = cdRef;
        this.level = 0;
        this.JSON = JSON;
        this._items = undefined;
        this.context = {
            self: this,
            get items() { return this.self.items; }
        };
    }
    ngOnInit() {
        if (this.foreach)
            this.viewContainerRef.createEmbeddedView(this.foreach, this.context);
    }
};
__decorate([
    ViewChild('foreach', { static: true })
], MapForeachComponent.prototype, "foreach", void 0);
__decorate([
    Input()
], MapForeachComponent.prototype, "template", void 0);
__decorate([
    Input()
], MapForeachComponent.prototype, "level", void 0);
__decorate([
    Input()
], MapForeachComponent.prototype, "items", null);
MapForeachComponent = __decorate([
    Component({
        selector: 'map-foreach, [map-foreach]',
        templateUrl: './map-foreach.component.html',
        styleUrls: ['./map-foreach.component.scss'],
        standalone: false
    })
], MapForeachComponent);
export { MapForeachComponent };
//# sourceMappingURL=map-foreach.component.js.map