import { Component, Injector } from '@angular/core';
import { TenantLogsDaoService } from 'src/app/dao/tenant-logs-dao.service';
import { TenantLogs } from 'src/app/models/tenant-logs.model';
import { PageListBase } from '../../base/page-list-base';

@Component({
  selector: 'panel-list-logs',
  templateUrl: './panel-list-logs.component.html',
  styleUrls: ['./panel-list-logs.component.scss']
})
export class PanelListLogsComponent extends PageListBase<TenantLogs, TenantLogsDaoService> {

  constructor(public injector: Injector, dao: TenantLogsDaoService) {
    super(injector, TenantLogs, TenantLogsDaoService);
    /* Inicializações */
    this.title = "Painel de Logs Petrvs";
    this.code = "PANEL_LOGS";
    this.filter = this.fh.FormBuilder({});
  }
}