import { __decorate } from "tslib";
import { UserPanel } from "src/app/models/user-panel.model";
import { PageListBase } from "../../base/page-list-base";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
let PanelAdminsListComponent = class PanelAdminsListComponent extends PageListBase {
    constructor(injector) {
        super(injector, UserPanel, UsersPanelDaoService);
        this.injector = injector;
        this.admins = [];
        this.usersPanelDao = injector.get(UsersPanelDaoService);
        this.join = ['tenants'];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    dynamicOptions(row) {
        let result = [];
        return result;
    }
    dynamicButtons(row) {
        let result = [];
        result.push({ label: "Apagar dados", icon: 'bi bi-database-dash', color: 'danger', onClick: this.delete });
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], PanelAdminsListComponent.prototype, "grid", void 0);
PanelAdminsListComponent = __decorate([
    Component({
        selector: 'panel-admins-list',
        templateUrl: './panel-admins-list.component.html',
        styleUrls: ['./panel-admins-list.component.scss'],
        standalone: false
    })
], PanelAdminsListComponent);
export { PanelAdminsListComponent };
//# sourceMappingURL=panel-admins-list.component.js.map