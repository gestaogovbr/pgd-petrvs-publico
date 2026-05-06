import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ComponentBase } from '../../component-base';
let CardComponent = class CardComponent extends ComponentBase {
    set template(value) {
        if (this._template != value) {
            this._template = value;
        }
    }
    get template() {
        return this._template || this.kanban?.template;
    }
    set placeholderTemplate(value) {
        if (this._placeholderTemplate != value) {
            this._placeholderTemplate = value;
        }
    }
    get placeholderTemplate() {
        return this._placeholderTemplate || this.kanban?.placeholderTemplate;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = 'draggable-card';
        this.metadata = {};
        this.go = injector.get(NavigateService);
    }
    ngOnInit() {
    }
    hasButtonItems(button) {
        return !!button.items || !!button.dynamicItems;
    }
    get hasMenu() {
        return !!this.item?.menu || !!this.item?.dynamicMenu;
    }
    get menu() {
        return (this.item?.dynamicMenu && this.item?.dynamicMenu(this.item)) || this.item?.menu || [];
    }
    get isUseCardData() {
        return this.kanban?.useCardData != undefined;
    }
    onButtonClick(button) {
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            button.onClick(this.isUseCardData ? this.item?.data : this.item, this.docker);
        }
    }
    getButtonItems(optionButton, button) {
        return optionButton.className.includes("show") ? (button.dynamicItems && button.dynamicItems(this.item)) || button.items || [] : [];
    }
};
__decorate([
    HostBinding('class')
], CardComponent.prototype, "class", void 0);
__decorate([
    Input()
], CardComponent.prototype, "item", void 0);
__decorate([
    Input()
], CardComponent.prototype, "docker", void 0);
__decorate([
    Input()
], CardComponent.prototype, "kanban", void 0);
__decorate([
    Input()
], CardComponent.prototype, "template", null);
__decorate([
    Input()
], CardComponent.prototype, "placeholderTemplate", null);
CardComponent = __decorate([
    Component({
        selector: 'card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss'],
        standalone: false
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=card.component.js.map