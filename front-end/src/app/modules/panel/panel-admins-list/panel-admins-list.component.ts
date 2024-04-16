import { UserPanel } from "src/app/models/user-panel.model";
import { PageListBase } from "../../base/page-list-base";
import { UsersPanelDaoService } from "src/app/dao/users-panel-dao.service";
import { Component, Injector, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";


@Component({
  selector: 'panel-admins-list',
  templateUrl: './panel-admins-list.component.html',
  styleUrls: ['./panel-admins-list.component.scss']
})

export class PanelAdminsListComponent extends PageListBase<UserPanel, UsersPanelDaoService>  {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public admins: UserPanel[] = [];
  public usersPanelDao?: UsersPanelDaoService;

  constructor(public injector: Injector){
    super(injector, UserPanel, UsersPanelDaoService);
    this.usersPanelDao = injector.get<UsersPanelDaoService>(UsersPanelDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];

    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
 
    return result;
  }


}
