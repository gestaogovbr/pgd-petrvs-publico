import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input } from '@angular/core';
let SpinnerOverlayComponent = class SpinnerOverlayComponent {
    get cdRef() { this._cdRef = this._cdRef || this.injector.get(ChangeDetectorRef); return this._cdRef; }
    constructor(injector) {
        this.injector = injector;
        this.message = "";
        this.show = false;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], SpinnerOverlayComponent.prototype, "message", void 0);
__decorate([
    Input()
], SpinnerOverlayComponent.prototype, "show", void 0);
SpinnerOverlayComponent = __decorate([
    Component({
        selector: 'app-spinner-overlay',
        templateUrl: './spinner-overlay.component.html',
        styleUrls: ['./spinner-overlay.component.scss'],
        standalone: false
    })
], SpinnerOverlayComponent);
export { SpinnerOverlayComponent };
//# sourceMappingURL=spinner-overlay.component.js.map