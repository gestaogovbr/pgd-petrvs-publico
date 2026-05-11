import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { PageFrameBase } from "../../base/page-frame-base";
let ColunasComponent = class ColunasComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.colunas = [];
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    Input()
], ColunasComponent.prototype, "colunas", void 0);
ColunasComponent = __decorate([
    Component({
        selector: 'app-colunas',
        templateUrl: './colunas.component.html',
        styleUrls: ['./colunas.component.scss'],
        standalone: false
    })
], ColunasComponent);
export { ColunasComponent };
//# sourceMappingURL=colunas.component.js.map