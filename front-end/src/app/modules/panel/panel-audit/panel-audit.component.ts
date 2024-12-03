import { Component, Injector } from '@angular/core';
import { AuditDaoService } from 'src/app/dao/audit-dao.service';
import { Audit } from 'src/app/models/audit.model';
import { PageListBase } from '../../base/page-list-base';
import {Tenant} from "../../../models/tenant.model";
import {TenantDaoService} from "../../../dao/tenant-dao.service";

@Component({
  selector: 'panel-audit',
  templateUrl: './panel-audit.component.html',
  styleUrls: ['./panel-audit.component.scss']
})
export class PanelAuditComponent extends PageListBase<Tenant, TenantDaoService> {
  audits: Audit[] = [];
  public auditDaoService: AuditDaoService;
  public tenant_id!: string | null;
  public metadata?: any;
  constructor(public injector: Injector) {
    super(injector, Tenant, TenantDaoService);
    this.auditDaoService = injector.get<AuditDaoService>(AuditDaoService);
    /* Inicializações */
    this.title = "Executar Seeder em todos os Tenants";

  }



  ngOnInit() {
    console.log( this.metadata);
    this.loadAudits();
  }

  private async loadAudits() {
    this.tenant_id = this.metadata?.tenant_id || null;
    try {
      const result = await this.auditDaoService.getAll(this.tenant_id);
      if (result) {
        this.audits = result.data;
      }
    } catch (error) {
      console.error("Erro ao carregar os audits: ", error);
    }
  }
 
}