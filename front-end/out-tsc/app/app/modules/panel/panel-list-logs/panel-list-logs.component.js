import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { TenantLogsDaoService } from 'src/app/dao/tenant-logs-dao.service';
import { TenantLogs } from 'src/app/models/tenant-logs.model';
import { PageListBase } from '../../base/page-list-base';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
let PanelListLogsComponent = class PanelListLogsComponent extends PageListBase {
    constructor(injector) {
        super(injector, TenantLogs, TenantLogsDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = this.fixedFilter || [];
            let form = filter.value;
            if (form.tenant_id?.length) {
                result.push(["tenant_id", "==", form.tenant_id]);
            }
            return result;
        };
        this.tenantLogsDaoService = injector.get(TenantLogsDaoService);
        this.tenantDao = injector.get(TenantDaoService);
        /* Inicializações */
        this.title = "Painel de Logs Petrvs";
        this.code = "PANEL_LOGS";
        this.filter = this.fh.FormBuilder({
            tenant_id: { default: "" },
        });
    }
    filterClear(filter) {
        filter.controls.tenant_id.setValue("");
        super.filterClear(filter);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    filterSubmit(filter) {
        return this.queryOptions;
    }
};
PanelListLogsComponent = __decorate([
    Component({
        selector: 'panel-list-logs',
        templateUrl: './panel-list-logs.component.html',
        styleUrls: ['./panel-list-logs.component.scss'],
        standalone: false
    })
], PanelListLogsComponent);
export { PanelListLogsComponent };
//# sourceMappingURL=panel-list-logs.component.js.map