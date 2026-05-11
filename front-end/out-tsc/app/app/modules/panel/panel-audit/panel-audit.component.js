import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AuditDaoService } from 'src/app/dao/audit-dao.service';
import { PageListBase } from '../../base/page-list-base';
import { Tenant } from "../../../models/tenant.model";
import { TenantDaoService } from "../../../dao/tenant-dao.service";
let PanelAuditComponent = class PanelAuditComponent extends PageListBase {
    constructor(injector) {
        super(injector, Tenant, TenantDaoService);
        this.injector = injector;
        this.audits = [];
        this.search = "";
        this.auditDaoService = injector.get(AuditDaoService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.title = "Audit - Tenant " + this.metadata?.tenant_id;
        this.tenant_id = this.metadata?.tenant_id || null;
        this.loadAudits();
    }
    async loadAudits() {
        try {
            const result = await this.auditDaoService.getAll(this.tenant_id, this.search);
            if (result) {
                this.audits = result.data;
            }
        }
        catch (error) {
            console.error("Erro ao carregar os audits: ", error);
        }
    }
};
PanelAuditComponent = __decorate([
    Component({
        selector: 'panel-audit',
        templateUrl: './panel-audit.component.html',
        styleUrls: ['./panel-audit.component.scss'],
        standalone: false
    })
], PanelAuditComponent);
export { PanelAuditComponent };
//# sourceMappingURL=panel-audit.component.js.map