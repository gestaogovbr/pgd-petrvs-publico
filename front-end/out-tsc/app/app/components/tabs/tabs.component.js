import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, ContentChildren, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
import { TabComponent } from './tab/tab.component';
let TabsComponent = class TabsComponent extends ComponentBase {
    set active(value) {
        if (this._active != value) {
            let selected = this.items.find(x => x.key == value);
            if (selected) {
                this._active = value;
                this.cdRef.detectChanges();
                if (this.select && selected)
                    this.select(selected);
            }
        }
    }
    get active() {
        return this._active;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.title = "";
        this.class_span = "h3";
        this._active = undefined;
        this.cdRef = injector.get(ChangeDetectorRef);
    }
    get isDisplay() {
        return this.display != undefined;
    }
    get isHidden() {
        return this.hidden != undefined;
    }
    get isRight() {
        return this.right != undefined;
    }
    ngOnInit() {
    }
    ngAfterContentInit() {
        this.loadTabs();
        this.tabsRef?.changes.subscribe((changes) => this.loadTabs());
        if (this.active == undefined && this.items.length) {
            this.active = this.items[0].key;
        }
    }
    loadTabs() {
        this.items.splice(0, this.items.length);
        this.tabsRef?.forEach(tab => {
            tab.tabs = this;
            this.items.push({
                key: tab.key,
                value: tab.label,
                icon: tab.icon
            });
        });
        this.cdRef.detectChanges();
    }
    onClick(tab) {
        this.active = tab.key;
    }
};
__decorate([
    ContentChildren(TabComponent, { descendants: true })
], TabsComponent.prototype, "tabsRef", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "select", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "items", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "title", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "class_span", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "active", null);
__decorate([
    Input()
], TabsComponent.prototype, "display", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "hidden", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "right", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "cdRef", void 0);
TabsComponent = __decorate([
    Component({
        selector: 'tabs',
        templateUrl: './tabs.component.html',
        styleUrls: ['./tabs.component.scss'],
        standalone: false
    })
], TabsComponent);
export { TabsComponent };
//# sourceMappingURL=tabs.component.js.map