import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MapItemComponent = class MapItemComponent {
    set item(value) {
        if (this._item != value) {
            this._item = value;
            this.cdRef.detectChanges();
        }
    }
    get item() {
        if (this._item && this.map.hash(this._item) != this._item.hash) {
            this._item.hash = this.map.hash(this._item);
            this.cdRef.markForCheck();
        }
        return this._item;
    }
    constructor(viewContainerRef, cdRef, map) {
        this.viewContainerRef = viewContainerRef;
        this.cdRef = cdRef;
        this.map = map;
        this.level = 0;
        this.context = {
            self: this,
            get item() { return this.self.item; },
            get metadata() { return this.self.item?.metadata; },
            get data() { return this.self.item?.data; },
            get level() { return this.self.level; },
            get parent() { return this.self.item?.parent; },
            get children() { return this.self.item?.children; }
        };
    }
    ngOnInit() {
        if (this.template)
            this.viewContainerRef.createEmbeddedView(this.template, this.context);
    }
};
__decorate([
    Input()
], MapItemComponent.prototype, "template", void 0);
__decorate([
    Input()
], MapItemComponent.prototype, "level", void 0);
__decorate([
    Input()
], MapItemComponent.prototype, "item", null);
MapItemComponent = __decorate([
    Component({
        selector: 'map-item, [map-item]',
        templateUrl: './map-item.component.html',
        styleUrls: ['./map-item.component.scss'],
        standalone: false
    })
], MapItemComponent);
export { MapItemComponent };
//# sourceMappingURL=map-item.component.js.map