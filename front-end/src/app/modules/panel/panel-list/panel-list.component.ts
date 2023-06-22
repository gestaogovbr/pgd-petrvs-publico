import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
import { Tenant } from 'src/app/models/tenant.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent extends PageListBase<Tenant, TenantDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector, dao: TenantDaoService) {
    super(injector, Tenant, TenantDaoService);
    /* Inicializações */
    this.title = "Panel Petrvs";
    this.code = "PANEL";
    this.filter = this.fh.FormBuilder({});
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    return result;
  }
}

