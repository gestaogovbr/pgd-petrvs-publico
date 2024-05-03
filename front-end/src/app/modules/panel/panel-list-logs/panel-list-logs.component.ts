import { Component, Injector } from '@angular/core';
import { TenantLogsDaoService } from 'src/app/dao/tenant-logs-dao.service';
import { TenantLogs } from 'src/app/models/tenant-logs.model';
import { PageListBase } from '../../base/page-list-base';
import { FormGroup } from '@angular/forms';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
import { QueryOptions } from 'src/app/dao/query-options';

@Component({
  selector: 'panel-list-logs',
  templateUrl: './panel-list-logs.component.html',
  styleUrls: ['./panel-list-logs.component.scss']
})
export class PanelListLogsComponent extends PageListBase<TenantLogs, TenantLogsDaoService> {

  public tenantLogsDaoService: TenantLogsDaoService;
  public tenantDao: TenantDaoService;

  constructor(public injector: Injector) {
    super(injector, TenantLogs, TenantLogsDaoService);
    this.tenantLogsDaoService = injector.get<TenantLogsDaoService>(TenantLogsDaoService);
    this.tenantDao = injector.get<TenantDaoService>(TenantDaoService);
    /* Inicializações */
    this.title = "Painel de Logs Petrvs";
    this.code = "PANEL_LOGS";
    this.filter = this.fh.FormBuilder({
      tenant_id: {default: ""},
    });
    
  }

  public filterClear(filter: FormGroup) {
    filter.controls.tenant_id.setValue("");
    super.filterClear(filter);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  public filterWhere = (filter: FormGroup) => {
    let result: any[] = this.fixedFilter || [];
    let form: any = filter.value;


    if (form.tenant_id?.length) {
      result.push(["tenant_id", "==", form.tenant_id]);
    }
    return result
  }

  public filterSubmit(filter: FormGroup): QueryOptions {
    return this.queryOptions;
  }
 
}