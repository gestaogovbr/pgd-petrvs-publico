import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
import { NavigateService } from 'src/app/services/navigate.service';
import { ServerService } from 'src/app/services/server.service';
let ButtonDashboardComponent = class ButtonDashboardComponent extends ComponentBase {
    set imgIcon(value) {
        if (this._imgIcon != value) {
            this._imgIcon = value;
            this.loadSvg();
        }
    }
    get imgIcon() {
        return this._imgIcon;
    }
    constructor(injector, sanitizer) {
        super(injector);
        this.injector = injector;
        this.sanitizer = sanitizer;
        this.title = "";
        this.textColor = "#ddd";
        this.borderColor = "#000";
        this.externalLink = false;
        this._imgIcon = false;
        this.go = injector.get(NavigateService);
        this.server = injector.get(ServerService);
    }
    ngOnInit() { }
    async loadSvg() {
        this.seuCodigoSvg$ = await this.server.getSvg(this.imgIcon);
    }
    onClick() {
        if (this.route) {
            this.externalLink ? window.open(this.route.route.toString(), '_blank') : this.go.navigate(this.route, this.metadata);
        }
    }
};
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "title", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "textColor", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "borderColor", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "route", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "metadata", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "externalLink", void 0);
__decorate([
    Input()
], ButtonDashboardComponent.prototype, "imgIcon", null);
ButtonDashboardComponent = __decorate([
    Component({
        selector: 'app-button-dashboard',
        templateUrl: './button-dashboard.component.html',
        styleUrls: ['./button-dashboard.component.scss'],
        standalone: false
    })
], ButtonDashboardComponent);
export { ButtonDashboardComponent };
//# sourceMappingURL=button-dashboard.component.js.map