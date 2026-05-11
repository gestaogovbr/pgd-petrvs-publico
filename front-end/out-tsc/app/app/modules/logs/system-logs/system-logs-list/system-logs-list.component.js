import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SystemLog } from 'src/app/models/system-log.model';
import { SystemLogDaoService } from 'src/app/dao/system-log-dao.service';
let SystemLogsListComponent = class SystemLogsListComponent extends PageListBase {
    constructor(injector) {
        super(injector, SystemLog, SystemLogDaoService);
        this.injector = injector;
        this.title = this.lex.translate("Logs do Sistema");
        this.join = [];
        this.orderBy = [['last_modified', 'desc']];
    }
    ngOnInit() {
        super.ngOnInit();
    }
    download(log) {
        if (log.filename) {
            this.dao?.download(log.filename);
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], SystemLogsListComponent.prototype, "grid", void 0);
SystemLogsListComponent = __decorate([
    Component({
        selector: 'app-system-logs-list',
        templateUrl: './system-logs-list.component.html',
        styleUrls: ['./system-logs-list.component.scss'],
        standalone: false
    })
], SystemLogsListComponent);
export { SystemLogsListComponent };
//# sourceMappingURL=system-logs-list.component.js.map