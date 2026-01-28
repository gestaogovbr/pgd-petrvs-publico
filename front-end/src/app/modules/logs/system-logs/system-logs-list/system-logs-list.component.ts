import { Component, Injector, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SystemLog } from 'src/app/models/system-log.model';
import { SystemLogDaoService } from 'src/app/dao/system-log-dao.service';

@Component({
  selector: 'app-system-logs-list',
  templateUrl: './system-logs-list.component.html',
  styleUrls: ['./system-logs-list.component.scss']
})
export class SystemLogsListComponent extends PageListBase<SystemLog, SystemLogDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, SystemLog, SystemLogDaoService);
    this.title = this.lex.translate("Logs do Sistema");
    this.join = [];
    this.orderBy = [['last_modified', 'desc']];
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public download(log: SystemLog) {
      if(log.filename) {
          this.dao?.download(log.filename);
      }
  }
}
