import { Component, Injector, OnInit } from "@angular/core";
import { PageBase } from "../../base/page-base";
import { MenuItem } from "primeng/api/menuitem";


@Component({
  selector: 'panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})

export class PanelLayoutComponent extends PageBase implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Tenants',
      routerLink: '/panel/tenants'
    },
    {
      label: 'Usuários do painel',
      routerLink: '/panel/admins'
    }
  ]

  constructor(public injector: Injector){
    super(injector);
  }

  ngOnInit(): void {
    
  }
}