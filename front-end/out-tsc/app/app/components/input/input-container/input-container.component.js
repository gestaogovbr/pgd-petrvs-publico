import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputContainerComponent = class InputContainerComponent extends InputBase {
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set size(value) {
        this.setSize(value);
    }
    get size() {
        return this.getSize();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = '';
        this.hostClass = "mt-2";
        this.labelPosition = "top";
        this.controlName = null;
        this.isRadio = false;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
};
__decorate([
    HostBinding('class')
], InputContainerComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "isRadio", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "errorMessageIcon", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputContainerComponent.prototype, "control", null);
__decorate([
    Input()
], InputContainerComponent.prototype, "size", null);
InputContainerComponent = __decorate([
    Component({
        selector: 'input-container',
        templateUrl: './input-container.component.html',
        styleUrls: ['./input-container.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputContainerComponent);
export { InputContainerComponent };
//# sourceMappingURL=input-container.component.js.map