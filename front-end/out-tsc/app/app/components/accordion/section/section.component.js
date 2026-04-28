import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../../component-base';
let SectionComponent = class SectionComponent extends ComponentBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.item = undefined;
        this.index = 0;
        this.selected = false;
        this.parentId = this.generatedId('accordion');
        this.loading = false;
        this.loaded = false;
    }
    ngOnInit() {
    }
    async onClick() {
        if (this.item?.accordionDisabled) {
            return;
        }
        this.selected = true;
        if (this.accordion)
            this.accordion.selectedIndex = this.index;
        if (this.load) {
            this.loading = true;
            try {
                this.cdRef.detectChanges();
                this.data = await this.load(this.item);
            }
            finally {
                this.loading = false;
                this.cdRef.detectChanges();
            }
        }
        this.accordion?.cdRef.detectChanges();
    }
};
__decorate([
    Input()
], SectionComponent.prototype, "item", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "load", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "template", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "titleTemplate", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "accordion", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "index", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "selected", void 0);
__decorate([
    Input()
], SectionComponent.prototype, "parentId", void 0);
SectionComponent = __decorate([
    Component({
        selector: 'section',
        templateUrl: './section.component.html',
        styleUrls: ['./section.component.scss'],
        standalone: false
    })
], SectionComponent);
export { SectionComponent };
//# sourceMappingURL=section.component.js.map