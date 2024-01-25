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

  public tenantLogsDaoService: TenantLogsDaoService;
  public items: TenantLogs[] = [];

  constructor(public injector: Injector) {
    super(injector, TenantLogs, TenantLogsDaoService);
    this.tenantLogsDaoService = injector.get<TenantLogsDaoService>(TenantLogsDaoService);
    /* Inicializações */
    this.title = "Painel de Logs Petrvs";
    this.code = "PANEL_LOGS";
    this.filter = this.fh.FormBuilder({});
    
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }

  private async loadData() {
    let tenat_id = this.urlParams!.get("id");
    const result = await this.tenantLogsDaoService.getAllLogs(tenat_id);
    if(result){
      this.items = result
    }
    
  }



}