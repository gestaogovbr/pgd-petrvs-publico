import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, ContentChildren, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
import { SectionComponent } from './section/section.component';
let AccordionComponent = class AccordionComponent extends ComponentBase {
    set active(value) {
        if (this._active != value && (!value || this.items.find(x => (x.id || x.key) == value))) {
            this._active = value;
            this.cdRef.detectChanges();
        }
    }
    get active() {
        return this._active;
    }
    set loading(value) {
        if (this._loading != value) {
            this._loading = value;
            this.cdRef.detectChanges();
        }
    }
    get loading() {
        return this._loading;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.selectedIndex = 0;
        this._active = undefined;
        this._loading = false;
        this.cdRef = injector.get(ChangeDetectorRef);
    }
    ngOnInit() {
    }
    ngAfterContentInit() {
        this.loadSections();
        this.sectionsRef?.changes.subscribe((changes) => this.loadSections());
        if (this.active == undefined && this.items.length) {
            this.active = this.items[0].id || this.items[0].key;
        }
    }
    loadSections() {
        this.sectionsRef?.forEach(sec => {
            // DO THINGS
        });
    }
};
__decorate([
    ContentChildren(SectionComponent, { descendants: true })
], AccordionComponent.prototype, "sectionsRef", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "load", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "items", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "selectedIndex", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "template", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "titleTemplate", void 0);
__decorate([
    Input()
], AccordionComponent.prototype, "active", null);
__decorate([
    Input()
], AccordionComponent.prototype, "loading", null);
AccordionComponent = __decorate([
    Component({
        selector: 'accordion',
        templateUrl: './accordion.component.html',
        styleUrls: ['./accordion.component.scss'],
        standalone: false
    })
], AccordionComponent);
export { AccordionComponent };
//# sourceMappingURL=accordion.component.js.map